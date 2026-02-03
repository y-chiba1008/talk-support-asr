import { AbsoluteCenter, Text, VStack } from "@chakra-ui/react"
import AudioButton from "./components/AudioButton"
import { useTranscriptStore } from "./hooks/useTranscriptStore";

function App() {
    const sentence = useTranscriptStore((state) => state.sentence);
    const errorMessage = useTranscriptStore((state) => state.errorMessage);

    return (
        <AbsoluteCenter>
            <VStack>
                <AudioButton></AudioButton>

                {/* デバッグ用 */}
                <Text>{sentence}</Text>
                <Text>{errorMessage}</Text>
            </VStack>
        </AbsoluteCenter>
    )
}

export default App
