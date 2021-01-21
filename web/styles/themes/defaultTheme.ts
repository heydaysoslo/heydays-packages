import { createTheme, remSize } from 'heydays-styled'

import { DefaultTheme } from 'styled-components'

export const colors = {
  primary: 'red',
  secondary: 'green',
  text: 'white',
  border: 'black',
  background: 'white'
}

export const breakpoints = {
  xs: 0,
  sm: 550,
  md: 870,
  lg: 1200,
  xl: 1600,
  xxl: 1800
}

export const spacingUnit = {
  xs: remSize(5),
  sm: remSize(10),
  md: remSize(15),
  lg: remSize(40),
  section: remSize(160),
  gutter: remSize(40),
  gap: remSize(20),
  container: remSize(1440)
}

export const responsiveSpacing = {
  xs: {
    xs: remSize(5),
    lg: remSize(10)
  },
  sm: {
    xs: remSize(10),
    lg: remSize(15)
  },
  md: {
    xs: remSize(15),
    lg: 'lg'
  },
  lg: {
    xs: 'lg',
    lg: '12rem'
  },
  section: {
    xs: remSize(100)
  },
  gutter: {
    xs: 'md',
    lg: 'gutter'
  },
  container: {
    xs: '20px',
    sm: '40px',
    md: '5vw'
  },
  pixel: {
    xs: '1px'
  },
  header: {
    xs: 'var(--header-height)'
  }
}

export const grid = {
  columns: 12
}

export const fontFamily = {
  sans: `'SuisseIntl', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`,
  serif: `'Suisse Works', times, serif`
}

const fontDefs = {
  xs: '16px/1.2'
}

export const responsiveFonts = {
  small: fontDefs.xs,
  body: {
    xs: fontDefs.xs,
    lg: '18px/1.43'
  },
  title: {
    xs: fontDefs.xs,
    lg: '24px/1.2'
  },
  h1: {
    xs: '30px/1.2',
    md: '45px/1.2',
    lg: '70px/1.2'
  },
  h2: {
    xs: '24px/1.2',
    lg: '40px/1.2'
  },
  h3: {
    xs: fontDefs.xs,
    lg: '24px/1.2'
  }
}

export const aspect = {
  portrait: 6 / 7,
  landscape: 3 / 2,
  square: 1,
  widescreen: 16 / 9,
  panorama: 16 / 11
}

export const elevation = {
  1: 9,
  2: 99,
  3: 999,
  4: 9999
}

export const contentWidth = {
  small: remSize(600),
  large: remSize(1200)
}

export const icons = {
  small: remSize(40),
  medium: remSize(80),
  large: remSize(160)
}

export const trans = {
  fast: `0.1s ease`,
  slow: `1s ease`
}

export const borderWidth = {
  small: remSize(1),
  large: remSize(3)
}

/**
 * Usage:
 * {
 *  border-left: ${theme.border.large()}
 * }
 */
export const border = {
  large: () => ({ theme }) =>
    `${theme.borderWidth.large} solid ${theme.colors.border};`,
  small: () => ({ theme }) =>
    `${theme.borderWidth.small} solid ${theme.colors.border};`
}

const theme: DefaultTheme = {
  name: 'defaultTheme',
  colors,
  breakpoints,
  spacingUnit,
  grid,
  fontFamily,
  aspect,
  elevation,
  responsiveFonts,
  responsiveSpacing,
  contentWidth,
  trans,
  icons,
  borderWidth,
  border
}

export default createTheme({ theme })
