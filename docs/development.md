# 会話サポートアプリ 開発メモ

## プロジェクト構成
### フォルダ構成
- `backend/`: FastAPIを使用した音声認識・解析用バックエンドAPI
- `frontend/`: React + Chakra UI v3 を使用したフロントエンド・ユーザーインターフェース
- `docs/`: 開発・運用に関するドキュメント
- `label_studio_work/`: 音声データのラベリング（Label Studio）用設定・スクリプト
- `notebooks/`: データ分析、データセット作成、モデル学習用のJupyter Notebook
- `mise.toml`: プロジェクト全体のツール管理・タスクランナー設定

### 技術スタック
- **Frontend**
  - React 19
  - TypeScript
  - Vite
  - Chakra UI v3 (UIコンポーネントライブラリ)
  - Zustand (状態管理)
  - pnpm (パッケージマネージャー)
- **Backend**
  - Python 3.12
  - FastAPI (Webフレームワーク)
  - PyTorch / Transformers (推論・学習)
  - librosa / soundfile (音声信号処理)
  - uv (パッケージマネージャー / 仮想環境管理)
- **共通ツール・インフラ**
  - mise (ツール管理)
  - Render.com (ホスティング)

### ツール
- mise
- uv (on mise)
- pnpm (on mise)

## 開発環境セットアップ
- リポジトリのクローンとツールのインストール
    ```sh
    git clone <THIS REPOSITORY>
    cd <REPOSITORY ROOT>
    mise trust
    mise install
    ```

- パッケージのインストール
    ```sh
    mise run prepare
    ```

    **【注意】**
    backendのパッケージインストールは時間がかかる為、個別に行っても良い
    ```sh
    mise run prepare:frontend
    mise run prepare:backend
    ```

- 環境変数を設定する（[.env](#.env)セクションを参照）

- 開発サーバ起動
    ```sh
    mise run dev

    # または個別に
    mise run dev:frontend
    mise run dev:backend
    ```

## .env
frontendとbackend配下にそれぞれ下記のファイル名で作成する
- 開発環境: .env.development
- 本番環境: .env.production

### frontend
- VITE_API_PROTOCOl: "https" または "http"
- VITE_API_DOMAIN: APIのURLのドメイン部分
- COREPACK_ENABLE_STRICT: Renderのデプロイに必要（0固定）
- COREPACK_ENABLE_ENABLED Renderのデプロイに必要（1固定）

### backend
- FRONT_ORIGIN: フロントエンドのオリジン
- MODEL_PATH: モデルを格納しているディレクトリのパス（絶対パス or backend起点の相対パス）

## デプロイ
Render.comで公開する

### デモ版
- URL: https://talk-support-asr-demo.onrender.com
- Name: talk-support-asr-demo
- Branch: demo
- Root Directory: frontend
- Build Command: `pnpm install --frozen-lockfile; pnpm run build`
- Publish Directory frontend/dist