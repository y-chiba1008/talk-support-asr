import { create } from 'zustand';

interface NotificationState {
    message: string | null;
    isOpen: boolean;
    showMessage: (message: string) => void;
    closeMessage: () => void;
}

/**
 * 通知ストア
 */
export const useNotificationStore = create<NotificationState>((set) => ({
    message: null,
    isOpen: false,
    showMessage: (message) => set({ message: message, isOpen: true }),
    closeMessage: () => set({ message: null, isOpen: false }),
}));