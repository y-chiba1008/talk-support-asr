import logging
from typing import Any, cast

from fastapi import APIRouter, File, HTTPException, UploadFile
from transformers import AutomaticSpeechRecognitionPipeline, WhisperFeatureExtractor, WhisperForConditionalGeneration, WhisperTokenizer, pipeline

from app.config import CONFIG

router = APIRouter()
logger = logging.getLogger('uvicorn')

def load_model(base_model: str, adapter_path: str) -> AutomaticSpeechRecognitionPipeline:
    '''
    推論用モデルを読み込む
    サーバ起動時に一度だけ呼び出される事を想定
    
    :param base_model: ベースモデル名
    :type base_model: str
    :param adapter_path: アダプタの保存先
    :type adapter_path: str
    :return: 推論パイプライン
    :rtype: AutomaticSpeechRecognitionPipeline
    '''

    # ベースモデルの読み込み
    logger.info(f'[load model] Loading base model ... ({base_model})')
    model = WhisperForConditionalGeneration.from_pretrained(base_model)

    # アダプタ（LoRA）の読み込み
    logger.info(f'[load model] Loading LoRA adapter ... ({adapter_path})')
    model.load_adapter(adapter_path)

    # プロセッサの読み込み
    logger.info(f'[load model] Loading Tokenizer and FeatureExtractor ... ({adapter_path})')
    tokenizer = WhisperTokenizer.from_pretrained(adapter_path)
    feature_extractor = WhisperFeatureExtractor.from_pretrained(adapter_path)

    # pipelineの作成
    pipe = pipeline(
        'automatic-speech-recognition',
        model=model,
        tokenizer=tokenizer,
        feature_extractor=feature_extractor,
        device=CONFIG.DEVICE,
    )

    logger.info('[load model] complete')
    return pipe

# モデルの読み込み
pipe = load_model(
    base_model=CONFIG.BASE_MODEL,
    adapter_path=CONFIG.ADAPTER_PATH,
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
    result = pipe(audio_bytes, generate_kwargs={'language': 'japanese', 'task': 'transcribe'})
    result = cast(dict[str, Any], result)
    if not isinstance(result, dict):
        raise HTTPException(status_code=500, detail='Unexpected model output format')

    response = {
        'sentence': result['text'],
    }
    
    return response
