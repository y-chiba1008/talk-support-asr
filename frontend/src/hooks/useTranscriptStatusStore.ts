import { create } from "zustand";

/**
 * @summary 文字起こしステータス
 * @description
 *  - idle: 待機中
 *  - in_progress: 進行中（API応答待ちなど）
 */
type TranscriptStatus = 'idle' | 'in_progress';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    switchToIdle: () => set((_state) => ({ transcriptStatus: 'idle' })),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    switchToInProgress: () => set((_state) => ({ transcriptStatus: 'in_progress' })),
}));