import { useState } from "react"
import { CloseButton, Dialog, IconButton, Portal } from "@chakra-ui/react"
import { FaQuestionCircle } from "react-icons/fa"
import { Tooltip } from "./ui/tooltip"

/**
 * ヘルプモーダル
 * @description クエスチョンマークアイコンをクリックすると使い方の説明モーダルを表示する
 */
const HelpModal = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Tooltip content="使い方">
                <IconButton
                    variant="ghost"
                    aria-label="使い方"
                    size="sm"
                    onClick={() => setOpen(true)}
                    css={{
                        _icon: {
                            width: "5",
                            height: "5",
                        },
                    }}
                >
                    <FaQuestionCircle />
                </IconButton>
            </Tooltip>

            <Dialog.Root
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>使い方</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body />
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default HelpModal
