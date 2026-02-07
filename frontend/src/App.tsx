import { AbsoluteCenter, Heading, VStack, ChakraProvider, } from "@chakra-ui/react"
import AudioButton from "./components/AudioButton"
import SentenceArea from "./components/SentenceArea"
import { system } from "@/config/theme"
import TranscriptFailDialog from "./components/TranscriptFailDialog"

function App() {
    return (
        <ChakraProvider value={system}>
            {/* ヘッダ */}
            <Heading
                as="h1" size="2xl"
                textAlign="center" py={4}
                textDecoration="underline"
                textDecorationColor="cyan.fg"
                textDecorationThickness="2px"
                textUnderlineOffset="3px"
            >会話サポートアプリ</Heading>

            {/* コンテンツ */}
            <AbsoluteCenter height="80vh">
                <VStack width="500px" height="100%" align="stretch">
                    <AudioButton />
                    <SentenceArea
                        flex="1"
                        backgroundColor="bg.panel"
                        borderWidth="1px"
                        borderColor="border"
                    />
                </VStack>
            </AbsoluteCenter>

            {/* エラーダイアログ */}
            <TranscriptFailDialog />
        </ChakraProvider>
    )
}

export default App
