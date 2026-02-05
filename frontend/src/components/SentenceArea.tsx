import { Box, HStack, Separator, Text, Clipboard, IconButton, type BoxProps, Heading } from "@chakra-ui/react";
import { useTranscriptStore } from "../hooks/useTranscriptStore"
import { Tooltip } from "./ui/tooltip";

/**
 * 解析結果表示エリアコン
 * @description 文字起こし結果を出力する
 */
const SentenceArea = ({ children, ...boxProps }: BoxProps) => {
    const sentence = useTranscriptStore((state) => state.sentence);
    const hasSentence = Boolean(sentence && sentence.trim() !== '');

    // ヘッダのテキスト
    const titleContent = hasSentence ? '解析結果' : '録音してください'

    return (
        <Box {...boxProps}>
            {/* ヘッダ */}
            <HStack justifyContent="center" width="full" position="relative">
                {/* ヘッダのテキスト表示部 */}
                <Heading
                    size="sm" color="fg.info" width="full"
                    textAlign="center" padding={3} px={12}
                >{titleContent}</Heading>

                {/* クリップボードボタン */}
                <Box position="absolute" right={3}>
                    <Clipboard.Root value={sentence || ''}>
                        <Tooltip content="解析結果をコピー" disabled={!hasSentence}>
                            <Clipboard.Trigger asChild>
                                <IconButton variant="surface" size="xs" disabled={!hasSentence}>
                                    <Clipboard.Indicator />
                                </IconButton>
                            </Clipboard.Trigger>
                        </Tooltip>
                    </Clipboard.Root>
                </Box>
            </HStack>

            {/* 区切り線 */}
            <Separator></Separator>

            {/* 解析結果出力 */}
            <Text padding={3}>{children || sentence}</Text>
        </Box>
    );
};

export default SentenceArea;