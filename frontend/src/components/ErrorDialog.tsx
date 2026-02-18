import MessageDialog from './MessageDialog';
import { useNotificationStore } from '@/hooks/useNotificationStore';

/**
 * 文字起こしエラーダイアログ
 * @description エラーメッセージが存在する場合にダイアログを表示する。
 * ダイアログを閉じるとエラーメッセージがクリアされる
 */
const ErrorDialog = () => {
    const message = useNotificationStore((state) => state.message);
    const closeMessage = useNotificationStore((state) => state.closeMessage);

    return (
        <MessageDialog
            open={Boolean(message)}
            onOpenChange={(e) => {
                if (!e.open) {
                    closeMessage();
                }
            }}
            role='alertdialog'
        >{message}</MessageDialog>
    );
};

export default ErrorDialog;