import { getSettings } from '@cms'
import React, { useEffect, useState } from 'react'
import styled, { css, ThemeProvider } from 'styled-components'
import defaultTheme, { bp } from 'styles/themes/defaultTheme'
import fontFactory from 'styles/utilities/fontFactory'
import spacingFactory from 'styles/utilities/spacingFactory'

const fromSanityToThemeSchema = theme => {
  if (!theme) return defaultTheme
  const colors = Object.entries(theme.colors).reduce((res, [key, value]) => {
    res[key] = value.hex
    return res
  }, {})
  const fonts =
    theme?.responsiveFonts &&
    fontFactory({ responsiveFonts: theme.responsiveFonts, bp: defaultTheme.bp })
  const spacing =
    theme?.responsiveSpacing &&
    spacingFactory({
      responsiveSpacing: theme.responsiveSpacing,
      bp: defaultTheme.bp
    })
  const newTheme = {
    fontFamily: theme?.fontFamily
      ? { ...defaultTheme.fontFamily, ...theme.fontFamily }
      : defaultTheme.fontFamily,
    colors: colors
      ? { ...defaultTheme.colors, ...colors }
      : defaultTheme.colors,
    fonts: fonts ? { ...defaultTheme.fonts, ...fonts } : defaultTheme.fonts,
    spacing: spacing
      ? { ...defaultTheme.spacing, ...spacing }
      : defaultTheme.spacing
  }
  return newTheme
}

const DesignTokens = ({ children }) => {
  const [theme, setTheme] = useState({})
  useEffect(() => {
    getSettings().then(res => {
      setTheme(fromSanityToThemeSchema(res?.designTokens?.theme))
    })
  }, [])
  if (process.env.NODE_ENV === 'production') return children
  return (
    <ThemeProvider theme={theme}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeProvider>
  )
}

const ThemeWrapper = styled.div(
  ({ theme }) => css`
    background: ${theme?.colors?.background};
    color: ${theme?.colors?.text};
    font-family: ${theme.fontFamily.sans};
    height: 100%;
    min-height: 100%;
    a {
      font-family: ${theme.fontFamily.serif};
    }
  `
)

export default DesignTokens
