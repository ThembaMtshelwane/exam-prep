// 1. Import `extendTheme`
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'

import { extendTheme } from "@chakra-ui/react"
import {Buttons} from './button'

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100:  "#265e9e",
    },
  },
  font:{
      body:"Open San, sans-serif",
   },
   styles:{
      global: () =>({
        body:{
          bg: "#91bff2"
        }
      })
   },
   componets:{ 
      Buttons,
   }
   
})
