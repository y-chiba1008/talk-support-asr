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
export const sendTranscriptRequest = async (_blob: Blob): Promise<TranscriptApiResult> => {
    // 通信時間をシミュレーション
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });

    return {
        sentence: '本アプリはデモ版です。正式版ではここに文字起こし結果が表示されます。'
    }
}
