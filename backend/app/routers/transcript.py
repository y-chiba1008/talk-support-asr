import logging
from pathlib import Path
import shutil

from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter()
logger = logging.getLogger('uvicorn')

UPLOAD_DIR = Path('uploads')
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post('')
async def transcript(audio: UploadFile = File(...)):
    logger.info('transcript start')
    '''文字起こしAPI
    '''
    # バリデーション
    if audio.content_type not in ['audio/wav']:
        raise HTTPException(status_code=400, detail='対応していないファイル形式です。')
    
    file_path = UPLOAD_DIR / 'test.wav'

    try:
        with file_path.open('wb') as buffer:
            shutil.copyfileobj(audio.file, buffer)
    finally:
        # 最後にファイルを閉じる
        await audio.close()

    response = {
        'sentence': 'ダミー from FastAPI',
    }
    
    return response
