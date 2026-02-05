import { Box, HStack, Separator, Text, Clipboard, IconButton, type BoxProps } from "@chakra-ui/react";
import { useTranscriptStore } from "../hooks/useTranscriptStore"
import { Tooltip } from "./ui/tooltip";

/**
 * 解析結果表示エリアコン
 * @description 文字起こし結果を出力する
 */
const ScentenceArea = (props: BoxProps) => {
    const sentence = useTranscriptStore((state) => state.sentence);

    // ヘッダのテキスト
    const titleContent = sentence ? '解析結果' : '録音してください'

    return (
        <Box {...props}>
            {/* ヘッダ */}
            <HStack justifyContent="space-between" width="full">
                <Text color="fg.info" padding={3}>{titleContent}</Text>
                <Clipboard.Root value={sentence || ''}>
                    <Tooltip content="解析結果をコピー" disabled={!sentence}>
                        <Clipboard.Trigger asChild>
                            <IconButton variant="surface" size="xs" marginEnd={3} disabled={!sentence}>
                                <Clipboard.Indicator />
                            </IconButton>
                        </Clipboard.Trigger>
                    </Tooltip>
                </Clipboard.Root>
            </HStack>

            {/* 区切り線 */}
            <Separator></Separator>

            {/* 解析結果出力 */}
            <Text padding={3}>{sentence}</Text>
        </Box>
    );
};

export default ScentenceArea;