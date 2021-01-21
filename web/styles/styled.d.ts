// import {} from 'styled-components'
// import theme from '../themes/DefaultTheme'
// declare module 'styled-components' {
//   type Theme = typeof theme
//   export interface DefaultTheme extends Theme {}
// }

// import original module declarations
import 'styled-components'
// https://styled-components.com/docs/api#usage-with-typescript
import { FlattenSimpleInterpolation } from 'styled-components'
import { BreakpointKeysWithoutXs } from './breakpointsFactory'

type Object<T = string> = {
  [key: string]: T
}

type Breakpoints<T = number> = {
  xs: T
  sm: T
  md: T
  lg: T
  xl: T
  xxl: T
}

type ResponsiveSpacing = Record<
  'section' | 'gutter' | 'container',
  Breakpoints<number>
> &
  Record<keyof Breakpoints, Breakpoints<number>>

type FontSize = string | { size: string; css: FlattenSimpleInterpolation }
type FontDefs = Partial<
  Record<
    'small' | 'body' | 'title' | 'h1' | 'h2' | 'h3',
    Partial<Breakpoints<FontSize>>
  >
>
type FontSizes = keyof FontDefs
type RequiredFontSizes = {
  xs: FontSize
}
type AllFontSizes = RequiredFontSizes &
  {
    [bp in BreakpointKeysWithoutXs]?:
      | string
      | { size: string; css: FlattenSimpleInterpolation }
  }

export type ResponsiveFonts = {
  [size in FontSizes]: AllFontSizes | string
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    name: string
    colors: Object
    breakpoints: Breakpoints
    spacingUnit?: Object
    responsiveSpacing: ResponsiveSpacing
    responsiveFonts: ResponsiveFonts
    grid?: {
      columns: number
    }
    fontFamily: Object
    aspect: Object<number>
    elevation: Object<number>
    contentWidth: Object<number>
    icons: Object
    trans: Object
    borderWidth: Object
    border?: any
    defaultStyle?: ({ theme }: { theme: DefaultTheme | undefined }) => void
  }
}
