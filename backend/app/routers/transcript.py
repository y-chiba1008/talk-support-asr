import gc
import logging
from typing import Any, cast

from fastapi import APIRouter, File, HTTPException, UploadFile
from huggingface_hub import login
from peft import PeftModel
import torch
from transformers import AutomaticSpeechRecognitionPipeline, WhisperFeatureExtractor, WhisperForConditionalGeneration, WhisperProcessor, WhisperTokenizer, pipeline

from app.config import CONFIG

router = APIRouter()
logger = logging.getLogger('uvicorn')

def load_model(base_model_id: str, lora_model_id: str, hf_token: str) -> AutomaticSpeechRecognitionPipeline:
    '''
    推論用モデルを読み込む
    サーバ起動時に一度だけ呼び出される事を想定
    
    :param base_model_id: ベースモデルのID
    :type base_model_id: str
    :param lora_model_id: LoRAアダプタのID
    :type lora_model_id: str
    :param hf_token: Hugging face hubのアクセストークン
    :type hf_token: str
    :return: 推論パイプライン
    :rtype: AutomaticSpeechRecognitionPipeline
    '''

    logger.info(f'[load model] Login to Hugging Face Hub ...')
    login(token=hf_token)

    # ベースモデルの読み込み
    logger.info(f'[load model] Loading base model ... ({base_model_id})')
    base_model = WhisperForConditionalGeneration.from_pretrained(
                            base_model_id,
                            low_cpu_mem_usage=True,
                            use_safetensors=True,
    )

    # アダプタ（LoRA）の読み込み
    logger.info(f'[load model] Loading LoRA adapter ... ({lora_model_id})')
    peft_model = PeftModel.from_pretrained(base_model, lora_model_id)

    # 軽量化（ベースモデルとLoRAのマージ、float16化）
    model = peft_model.merge_and_unload() # pyright: ignore[reportCallIssue]
    model = model.to(torch.float16)


    # デフォルトの生成設定をリセット（推論時の警告を消すため）
    model.generation_config.suppress_tokens = None
    model.generation_config.begin_suppress_tokens = None

    # プロセッサの読み込み
    logger.info(f'[load model] Loading Tokenizer and FeatureExtractor ... ({lora_model_id})')
    tokenizer = WhisperTokenizer.from_pretrained(lora_model_id)
    feature_extractor = WhisperFeatureExtractor.from_pretrained(lora_model_id)

    # pipelineの作成
    pipe = pipeline(
        'automatic-speech-recognition',
        model=model,
        tokenizer=tokenizer,
        feature_extractor=feature_extractor,
        device=CONFIG.DEVICE,
    )

    gc.collect()

    logger.info('[load model] complete')
    return pipe

# モデルの読み込み
pipe = load_model(
    base_model_id=CONFIG.BASE_MODEL_ID,
    lora_model_id=CONFIG.LORA_MODEL_ID,
    hf_token=CONFIG.HF_TOKEN,
)

@router.post('')
async def transcript(audio: UploadFile = File(...)):
    '''文字起こしAPI
    '''

    logger.info('transcript start')

    # バリデーション
    if audio.content_type not in ['audio/wav']:
        raise HTTPException(status_code=400, detail='対応していないファイル形式です。')

    # 音声ファイルをバイトとして読み込み
    try:
        audio_bytes = await audio.read()
    finally:
        await audio.close()
    
    # 推論実行
    result = pipe(audio_bytes, generate_kwargs={
        'language': 'japanese',
        'task': 'transcribe',
    })
    result = cast(dict[str, Any], result)
    if not isinstance(result, dict):
        raise HTTPException(status_code=500, detail='Unexpected model output format')

    response = {
        'sentence': result['text'],
    }
    
    return response
