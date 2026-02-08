from dataclasses import dataclass
import os
from pathlib import Path
from dotenv import load_dotenv

@dataclass(frozen=True)
class _Config:
    """
    config格納クラス
    """
    FRONT_ORIGIN: str
    MODEL_PATH: Path

def _load_config() -> _Config:
    """
    .envから設定を読み込む
    環境変数'ENV'に環境名が設定されている場合は、「.env.<環境名>」から読み込む
    例）.env.development
    """

    # .envのファイル名
    envfile = '.env'
    env = os.getenv('ENV')
    if env is not None:
        envfile += f'.{env}'

    # .env読み込み
    load_dotenv(envfile, verbose=True)

    # 設定値読み込み
    # 未設定時にKeyErrorを出す為にos.getenvではなくos.environを使用する
    return _Config(
        FRONT_ORIGIN=os.environ['FRONT_ORIGIN'],
        MODEL_PATH=Path(os.environ['MODEL_PATH']),
    )

CONFIG = _load_config()