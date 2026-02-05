import { createSystem, defineConfig, defaultConfig, } from "@chakra-ui/react"

const config = defineConfig({
    globalCss: {
        body: {
            // 背景色
            bg: "gray.50",
        },
    },
});

export const system = createSystem(defaultConfig, config);