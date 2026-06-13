import { useState } from "react"
import { CloseButton, Dialog, IconButton, Link, List, Portal, Text, VStack } from "@chakra-ui/react"
import { FaGithub, FaQuestionCircle } from "react-icons/fa"
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
                        <Dialog.Content maxW="md">
                            <Dialog.Header>
                                <Dialog.Title>使い方</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <VStack align="stretch" gap={4}>
                                    <Text>
                                        会話サポートアプリは、マイクで録音した音声を文字起こしし、
                                        テキストとして表示するアプリです。
                                    </Text>

                                    <VStack align="stretch" gap={2}>
                                        <Text fontWeight="semibold">基本的な使い方</Text>
                                        <List.Root as="ol" ps={5} gap={2}>
                                            <List.Item>
                                                「録音を開始する」ボタンを押します。
                                                初回はブラウザからマイクの使用許可を求められるので、「許可」を選んでください。
                                            </List.Item>
                                            <List.Item>
                                                マイクに向かって話します。
                                                録音中はボタンが「録音を終了する」に変わり、音量バーで入力レベルを確認できます。
                                            </List.Item>
                                            <List.Item>
                                                話し終えたら「録音を終了する」ボタンを押します。
                                                解析が完了すると、下の「解析結果」エリアに文字起こし結果が表示されます。
                                            </List.Item>
                                            <List.Item>
                                                解析結果の右側にあるコピーボタンで、テキストをクリップボードにコピーできます。
                                            </List.Item>
                                        </List.Root>
                                    </VStack>

                                    <VStack align="stretch" gap={2}>
                                        <Text fontWeight="semibold">うまくいかないとき</Text>
                                        <List.Root ps={5} gap={2}>
                                            <List.Item>
                                                音量バーが動かない場合は、マイクが正しく接続されているか、
                                                ブラウザのマイク設定でこのサイトの使用が許可されているかを確認してください。
                                            </List.Item>
                                            <List.Item>
                                                「文字起こしに失敗しました」と表示された場合は、
                                                通信環境を確認してから、もう一度録音をお試しください。
                                            </List.Item>
                                        </List.Root>
                                    </VStack>

                                    <Text textAlign="center" fontSize="sm">
                                        <Link
                                            href="https://github.com/y-chiba1008/talk-support-asr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            color="fg.info"
                                            display="inline-flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <FaGithub />
                                            GitHub リポジトリ
                                        </Link>
                                    </Text>
                                </VStack>
                            </Dialog.Body>
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
