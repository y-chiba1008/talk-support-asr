import time
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger('uvicorn')

class LogStartEndMiddleware(BaseHTTPMiddleware):
    """開始/終了ログ出力ミドルウェア"""
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()

        # 開始ログ
        logger.info(f'PROCESS START [{request.url.path}]')
        
        # 処理の実行
        response = await call_next(request)
        
        # 処理時間の計算
        process_time = time.time() - start_time
        
        # 終了ログ
        logger.info(f'PROCESS END [{request.url.path}] process_time: {process_time: .3f} sec')
        
        return response
