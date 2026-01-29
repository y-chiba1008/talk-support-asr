import { create } from "zustand";

/**
 * @summary 文字起こしステータス
 * @description
 *  - idle: 待機中
 *  - in_progress: 進行中（API応答待ちなど）
 */
export type TranscriptStatus = 'idle' | 'in_progress';

interface TranscriptStatusStore {
    transcriptStatus: TranscriptStatus;
    switchToIdle: () => void;
    switchToInProgress: () => void;
}

/**
 * 文字起こしステータスストア
 */
export const useTranscriptStatusStore = create<TranscriptStatusStore>((set) => ({
    transcriptStatus: 'idle',
    switchToIdle: () => set(({ transcriptStatus: 'idle' })),
    switchToInProgress: () => set(({ transcriptStatus: 'in_progress' })),
}));