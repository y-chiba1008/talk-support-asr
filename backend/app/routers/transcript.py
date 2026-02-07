import io
import logging

import librosa
from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter()
logger = logging.getLogger('uvicorn')

@router.post('/')
async def transcript(file: UploadFile = File(...)):
    '''文字起こしAPI
    '''
    # バリデーション
    if file.content_type not in ['audio/wav']:
        raise HTTPException(status_code=400, detail='対応していないファイル形式です。')
    
    try:
        # ファイルをメモリ上に読み込む
        content = await file.read()
        file_like_obj = io.BytesIO(content)

        # librosaで読み込み(同時にサンプリングレートを16000に変換)
        y, sr = librosa.load(file_like_obj, sr=16000)

        # 長さ（秒）を計算
        duration = librosa.get_duration(y=y, sr=sr)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f'解析に失敗しました: {str(e)}')
    finally:
        await file.close()
    
    logger.info(f'duration: {duration}')
    logger.info(f'sr: {sr}')

    response = {
        'sentence': 'ダミー from FastAPI',
    }
    
    return response
