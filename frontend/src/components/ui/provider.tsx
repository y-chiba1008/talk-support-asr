"use client"

import { ChakraProvider } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { HelmetProvider } from "react-helmet-async"
import { system } from "@/config/theme"

export function Provider(props: ColorModeProviderProps) {
  return (
    <HelmetProvider>
      <ChakraProvider value={system}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </HelmetProvider>
  )
}
