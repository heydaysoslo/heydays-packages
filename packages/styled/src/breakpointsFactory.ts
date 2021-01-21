import { DefaultTheme } from 'styled-components'
import { emSize } from './converters'

type Breakpoints = DefaultTheme['breakpoints']
export type BreakpointKeys = keyof Breakpoints

export type BreakpointSizes = Record<keyof Breakpoints, string>
export type BreakpointSizesWithoutXs = Omit<BreakpointSizes, 'xs'>
export type BreakpointKeysWithoutXs = keyof BreakpointSizesWithoutXs

export type bp = BreakpointSizesWithoutXs & {
  below: BreakpointSizesWithoutXs
  only: BreakpointSizes
}

type breakpointsFactory = (breakpoints: Breakpoints) => bp

export const breakpointsFactory: breakpointsFactory = breakpoints => ({
  xs: `@media (min-width: ${emSize(breakpoints.xs)})`,
  sm: `@media (min-width: ${emSize(breakpoints.sm)})`,
  md: `@media (min-width: ${emSize(breakpoints.md)})`,
  lg: `@media (min-width: ${emSize(breakpoints.lg)})`,
  xl: `@media (min-width: ${emSize(breakpoints.xl)})`,
  xxl: `@media (min-width: ${emSize(breakpoints.xxl)})`,

  below: {
    sm: `@media (max-width: ${emSize(breakpoints.sm - 1)})`,
    md: `@media (max-width: ${emSize(breakpoints.md - 1)})`,
    lg: `@media (max-width: ${emSize(breakpoints.lg - 1)})`,
    xl: `@media (max-width: ${emSize(breakpoints.xl - 1)})`,
    xxl: `@media (max-width: ${emSize(breakpoints.xxl - 1)})`,
  },

  only: {
    xs: `@media (max-width: ${emSize(breakpoints.sm - 1)})`,
    sm: `@media (min-width: ${emSize(breakpoints.sm)}) and (max-width: ${emSize(
      breakpoints.md - 1
    )})`,
    md: `@media (min-width: ${emSize(breakpoints.md)}) and (max-width: ${emSize(
      breakpoints.lg - 1
    )})`,
    lg: `@media (min-width: ${emSize(breakpoints.lg)}) and (max-width: ${emSize(
      breakpoints.xl - 1
    )})`,
    xl: `@media (min-width: ${emSize(breakpoints.xl)}) and (max-width: ${emSize(
      breakpoints.xxl - 1
    )})`,
    xxl: `@media (min-width: ${emSize(breakpoints.xxl)})`,
  },
})

export default breakpointsFactory
