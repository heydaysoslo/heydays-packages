import { DefaultTheme } from 'styled-components'
import { bp, breakpointsFactory } from './breakpointsFactory'
import spacingFactory, { SpacingFuncs } from './spacingFactory'
import fontFactory, { fontFuncs } from './fontFactory'
export * from './converters'

type initOptions = { theme: DefaultTheme }

const initializeTheme = (theme: DefaultTheme) => {
  const { responsiveSpacing, responsiveFonts } = theme
  const bp: bp = breakpointsFactory(theme.breakpoints)
  const spacing: SpacingFuncs = spacingFactory({
    responsiveSpacing,
    bp: {
      sm: bp.sm,
      md: bp.md,
      lg: bp.lg,
      xl: bp.xl,
      xxl: bp.xxl,
    },
  })
  const fonts: fontFuncs = fontFactory({ responsiveFonts, bp })
  return {
    bp,
    spacing,
    fonts,
    ...theme,
  }
}

export const createTheme = (options: initOptions) => {
  return initializeTheme(options?.theme)
}
