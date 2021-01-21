import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './init'

const Layout: React.FC = ({ children }) => {
  console.log('🚀 ~ file: Layout.tsx ~ line 4 ~ theme', theme)
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Layout
