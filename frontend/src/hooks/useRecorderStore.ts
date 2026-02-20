import type { StatusMessages } from 'react-media-recorder';
import { create } from 'zustand';

export interface RecorderStore {
    status: StatusMessages;
    volume: number;
    wavBlob: Blob | null;
    start: () => void;
    stop: () => void;
    updateStatus: (status: StatusMessages) => void;
    updateVolume: (volume: number) => void;
    updateWavBlob: (wavBlob: Blob | null) => void;
    setControls: (controlls: { start: () => void, stop: () => void }) => void;
}

export const useRecorderStore = create<RecorderStore>((set) => ({
    status: 'idle',
    volume: 0,
    wavBlob: null,

    // 録音操作用の関数を保持するプロパティ
    start: () => { },
    stop: () => { },

    // 更新用Actions
    updateStatus: (status) => set({ status }),
    updateVolume: (volume) => set({ volume }),
    updateWavBlob: (wavBlob: Blob | null) => set({ wavBlob }),
    setControls: (controls) => set({ start: controls.start, stop: controls.stop }),
}));