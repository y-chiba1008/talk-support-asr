from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import ping
from app.routers import transcript
from app.middlewares.logStartEndMiddleware import LogStartEndMiddleware
from app.config import CONFIG

app = FastAPI()

# ミドルウェアの設定
## CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CONFIG.FRONT_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
## 開始/終了ログ
app.add_middleware(LogStartEndMiddleware)

# ルータを追加
app.include_router(ping.router, prefix="/ping", tags=["ping"])
app.include_router(transcript.router, prefix="/transcript", tags=["transcript"])
