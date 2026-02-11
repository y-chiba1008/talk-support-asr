from dataclasses import dataclass, fields
import logging
import os
from dotenv import load_dotenv

@dataclass(frozen=True)
class _Config:
    """
    config格納クラス
    """
    FRONT_ORIGIN: str
    ADAPTER_PATH: str
    BASE_MODEL: str
    DEVICE: str

def _load_config() -> _Config:
    """
    .envから設定を読み込む
    環境変数'ENV'に環境名が設定されている場合は、「.env.<環境名>」から読み込む
    例）.env.development
    """

    logger = logging.getLogger('uvicorn')

    # .envのファイル名
    envfile = '.env'
    env = os.getenv('ENV')
    if env is not None:
        envfile += f'.{env}'

    logger.info(f'[config] load config from {envfile}')

    # .env読み込み
    load_dotenv(envfile, verbose=True)

    # 設定値読み込み
    config_dict = {field.name: os.environ[field.name] for field in fields(_Config)}
    config = _Config(**config_dict)

    # ログ出力
    for field in fields(config):
        logger.info(f'[config] {field.name} = {getattr(config, field.name)}')

    return config

CONFIG = _load_config()