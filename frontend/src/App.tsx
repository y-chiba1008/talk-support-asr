import { AbsoluteCenter, Box, Heading, VStack, } from "@chakra-ui/react"
import AudioButton from "./components/AudioButton"
import SentenceArea from "./components/SentenceArea"
import ErrorDialog from "./components/ErrorDialog"
import HelpModal from "./components/HelpModal"
import { RecorderManager } from "./components/RecorderManager"
import VolumeBar from "./components/VolumeBar"

function App() {
    return (
        <>

            {/* ヘッダ */}
            <Box position="relative" py={4}>
                <Box position="absolute" top={4} right={4}>
                    <HelpModal />
                </Box>
                <Heading
                    as="h1" size="2xl"
                    textAlign="center"
                    textDecoration="underline"
                    textDecorationColor="cyan.fg"
                    textDecorationThickness="2px"
                    textUnderlineOffset="3px"
                >会話サポートアプリ</Heading>
            </Box>

            {/* コンテンツ */}
            <AbsoluteCenter height="80vh">
                <VStack
                    width={{ base: "90vw", md: "500px" }}
                    height="100%" align="stretch">
                    <AudioButton />
                    <VolumeBar />
                    <SentenceArea
                        flex="1"
                        backgroundColor="bg.panel"
                        borderWidth="1px"
                        borderColor="border"
                    />
                </VStack>
            </AbsoluteCenter>

            {/* エラーダイアログ */}
            <ErrorDialog />

            {/* オーディオ制御 */}
            <RecorderManager />
        </>
    )
}

export default App
