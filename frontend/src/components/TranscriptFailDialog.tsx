import { useTranscriptStore } from '@/hooks/useTranscriptStore';
import MessageDialog from './MessageDialog';

/**
 * 文字起こしエラーダイアログ
 * @description エラーメッセージが存在する場合にダイアログを表示する。
 * ダイアログを閉じるとエラーメッセージがクリアされる
 */
const TranscriptFailDialog = () => {
    const errorMessage = useTranscriptStore((state) => state.errorMessage);
    const clearErrorMessage = useTranscriptStore((state) => state.clearErrorMessage);

    return (
        <MessageDialog
            open={Boolean(errorMessage)}
            onOpenChange={(e) => {
                if (!e.open) {
                    clearErrorMessage();
                }
            }}
            role='alertdialog'
        >{errorMessage}</MessageDialog>
    );
};

export default TranscriptFailDialog;