from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/")
def create_item(echo: str | None = None):
    response = {
        'status': 'ok',
        'message': 'It\'s working!!',
    }

    if echo is not None:
        response['echo'] = echo
    
    return response