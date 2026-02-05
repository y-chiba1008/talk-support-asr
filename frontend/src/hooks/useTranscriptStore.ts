import { sendTranscriptRequest } from "@/utils/webApi";
import { create } from "zustand";

/**
 * 文字起こしステータス
 * @description
 *  - idle: 待機中
 *  - in_progress: 進行中（API応答待ちなど）
 */
export type TranscriptStatus = 'idle' | 'in_progress';

interface TranscriptStore {
    transcriptStatus: TranscriptStatus;
    sentence: string | null;
    errorMessage: string | null;
    startTranscript: (blob: Blob) => Promise<void>;
}

/**
 * 文字起こしステータスストア
 */
export const useTranscriptStore = create<TranscriptStore>((set, get) => ({
    transcriptStatus: 'idle',
    sentence: null,
    errorMessage: null,
    startTranscript: async (blob: Blob): Promise<void> => {
        // 二重送信防止
        if (get().transcriptStatus === 'in_progress') {
            return;
        }

        // ステータスを進行中にセット
        set({
            transcriptStatus: 'in_progress',
            sentence: null,
            errorMessage: null,
        });
        try {
            // リクエスト送信
            const result = await sendTranscriptRequest(blob);

            // 文字起こし結果をセット
            set({
                transcriptStatus: 'idle',
                sentence: result.sentence,
                errorMessage: null,
            });
        } catch {
            // エラーメッセージをセット
            set({
                transcriptStatus: 'idle',
                sentence: null,
                errorMessage: '文字起こしに失敗しました。もう一度お試しください。',
            });
        }
    },
}));