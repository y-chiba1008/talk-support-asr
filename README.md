# 会話サポートアプリ

## 概要
TODO:後で書く

## プロジェクト構成
### フォルダ構成
TODO:後で書く

### 技術スタック
TODO:後で書く

### 必要ツール
- mise

## 開発環境セットアップ
- リポジトリのクローンとツールのインストール
    ```
    git clone <THIS REPOSITORY>
    cd <REPOSITORY ROOT>
    mise install
    ```

- 環境変数を設定する（[.env](#.env)）

## .env
frontendとbackend配下にそれぞれ下記のファイル名で作成する
- 開発環境: .env.development
- 本番環境: .env.production

### frontend
- VITE_API_BASE_URL: APIのベースURL

### backend
- FRONT_ORIGIN: フロントエンドのオリジン
- MODEL_PATH: モデルを格納しているディレクトリのパス（絶対パス or backend起点の相対パス）

## デプロイ
TODO:後で書く
