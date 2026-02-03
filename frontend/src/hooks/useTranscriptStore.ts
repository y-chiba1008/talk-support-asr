import { sendTranscriptRequestDummy } from "@/utils/webApi";
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
export const useTranscriptStore = create<TranscriptStore>((set) => ({
    transcriptStatus: 'idle',
    sentence: null,
    errorMessage: null,
    startTranscript: async (blob: Blob): Promise<void> => {
        // ステータスを進行中にセット
        set(({ transcriptStatus: 'in_progress' }));
        try {
            // リクエスト送信
            const result = await sendTranscriptRequestDummy(blob);

            // 文字起こし結果をセット
            set(({ sentence: result.sentence }));
            set(({ errorMessage: null }));
        } catch {
            // エラーメッセージをセット
            // TODO: エラーメッセージを詳細に定義
            set(({ sentence: null }));
            set(({ errorMessage: 'エラーが発生しました' }));
        } finally {
            // ステータスを待機中にセット
            set(({ transcriptStatus: 'idle' }));
        }
    },
}));