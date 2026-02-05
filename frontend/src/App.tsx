import {
    AbsoluteCenter, Heading, VStack,
    createSystem, defineConfig, defaultConfig, ChakraProvider,
} from "@chakra-ui/react"
import AudioButton from "./components/AudioButton"
import SentenceArea from "./components/SentenceArea"

// 背景色の設定
const config = defineConfig({
    globalCss: {
        body: {
            bg: "gray.50",
        },
    },
});
const system = createSystem(defaultConfig, config);

function App() {
    return (
        <ChakraProvider value={system}>
            {/* ヘッダ */}
            <Heading
                textAlign="center" padding={3}
                textDecoration="underline"
                textDecorationColor="cyan.fg"
                textDecorationThickness="2px"
                textUnderlineOffset="3px"
            >会話サポートアプリ</Heading>

            {/* コンテンツ */}
            <AbsoluteCenter height="80vh">
                <VStack width="500px" height="100%">
                    <AudioButton width="100%" />
                    <SentenceArea
                        width="100%" height="100%"
                        backgroundColor="bg.panel"
                        borderWidth="1px"
                        borderColor="border"
                    />
                </VStack>
            </AbsoluteCenter>
        </ChakraProvider>
    )
}

export default App
