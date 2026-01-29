/** エンドポイント */
const ENDPOINT = 'http://localhost:8000';
const TRANSCRIPT = 'transcript'

/**
 * API呼び出し共通関数
 * @param path URLのパス部分
 * @param method HTTPメソッド
 * @param data 送信データ
 * @returns APIのレスポンスボディ
 * @throws 通信エラー
 */
const sendRequest = async <T>(path: string, method: string, data: BodyInit | object): Promise<T> => {
    // URL整形
    const url = new URL(path, ENDPOINT);

    // dataがobjectの場合、JSON文字列に変換
    const body = (typeof (data) === 'object') ? JSON.stringify(data) : data

    try {
        // 送信
        console.log(`API 送信開始 [${url.href}]`);
        const response = await fetch(url, {
            method: method,
            body: body,
        });

        if (response.ok) {
            console.log(`API 送信成功 [${url.href}]`);
            return await response.json();
        } else {
            throw new Error(`レスポンスエラー ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error(`API 送信失敗 [${url.href}]`);
        console.error(error);
        throw error;
    }
};

/** 文字起こしAPI レスポンスボディ */
export interface TranscriptApiResult {
    sentence: string
}

/**
 * 文字起こしAPI リクエスト送信
 * @param blob 音声データ
 * @returns レスポンスボディ
 * @throws 通信エラー
 */
export const sendTranscriptRequest = async (blob: Blob): Promise<TranscriptApiResult> => {
    // データ整形
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');

    // 送信
    const result = sendRequest<TranscriptApiResult>(TRANSCRIPT, 'POST', formData);
    return result;
}

/**
 * 文字起こしAPI リクエスト送信ダミー処理 （デバッグ用）
 * @param blob 音声データ
 * @returns レスポンスボディ
 * @throws 通信エラー
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendTranscriptRequestDummy = async (_blob: Blob): Promise<TranscriptApiResult> => {
    const url = new URL(TRANSCRIPT, ENDPOINT);
    console.log(`【ダミー】API 送信開始 [${url.href}]`);

    // 3秒待つ
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(`【ダミー】API 送信成功 [${url.href}]`);

    return {
        sentence: '文字起こしアプリ文字起こしアプリ文字起こしアプリ'
    };
}