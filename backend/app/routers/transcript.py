from fastapi import APIRouter

router = APIRouter()

@router.post('/')
async def transcript():
    """文字起こしAPI
    """
    response = {
        'sentence': 'ダミー from FastAPI',
    }
    
    return response
