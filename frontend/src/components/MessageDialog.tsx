import { CloseButton, Dialog, Portal, Text } from "@chakra-ui/react"

interface MessageDialogProps extends Dialog.RootProps {
    title?: string; // 任意のタイトルを指定可能にする
}

/**
 * 汎用メッセージダイアログ
 */
const MessageDialog = ({ children, title, ...rootProps }: MessageDialogProps) => {
    // タイトル
    const titleText = title ?? (rootProps.role === 'alertdialog' ? 'Error' : 'Info');

    return (
        <Dialog.Root {...rootProps}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{titleText}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>{children}</Text>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default MessageDialog;