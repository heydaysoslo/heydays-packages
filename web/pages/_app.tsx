import React from 'react'
import { ThemeProvider, useTheme } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'
import { init } from 'ui'

import 'lazysizes'

import theme from 'styles/themes/defaultTheme'

import Favicon from 'components/Favicon'
import { AppProvider } from 'components/context/appContext'
import { GlobalStyle } from 'styles/Global'

const App = (props: AppProps) => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme || {}}>
        <Inner {...props} />
      </ThemeProvider>
    </AppProvider>
  )
}

const Inner = ({ Component, pageProps, router }: AppProps) => {
  const currTheme = useTheme()
  init({ theme: currTheme })
  return (
    <>
      <Favicon />
      <GlobalStyle />
      {/* Do not put anything inside Animate Presence or page transitions will fail */}
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  )
}

export default App
