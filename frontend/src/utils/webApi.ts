import { CONFIG } from '../config/config';

/** 文字起こしAPIのパス */
const TRANSCRIPT = 'transcript'

/**
 * API呼び出し共通関数
 * @param path URLのパス部分
 * @param method HTTPメソッド
 * @param data 送信データ
 * @returns APIのレスポンスボディ
 * @throws 通信エラー
 */
const sendRequest = async <T>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT',
    data: BodyInit | object,
): Promise<T> => {
    // URL整形
    const endpoint = CONFIG.API_BASE_URL;
    const url = new URL(path, endpoint);

    const options: RequestInit = {
        method,
    };

    if (data instanceof FormData) {
        // dataがFormDataの場合、Content-Typeは自動設定
        options.body = data;
    } else {
        // dataがobjectの場合、Content-Typeの設定とJSON文字列への変換を行う
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    try {
        // 送信
        console.log(`API 送信開始 [${url.href}]`);
        const response = await fetch(url, options);

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
