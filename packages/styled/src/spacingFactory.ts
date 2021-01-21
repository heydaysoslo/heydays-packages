import {
  css,
  DefaultTheme,
  FlattenSimpleInterpolation,
} from 'styled-components'
import { bp } from './breakpointsFactory'
import { parseCssUnit } from './helpers'

const shorthandDefs = {
  // Margins
  m: ['margin'],
  ml: ['margin-left'],
  mt: ['margin-top'],
  mr: ['margin-right'],
  mb: ['margin-bottom'],
  my: ['margin-top', 'margin-bottom'],
  mx: ['margin-left', 'margin-right'],
  // Padding
  p: ['padding'],
  pl: ['padding-left'],
  pt: ['padding-top'],
  pr: ['padding-right'],
  pb: ['padding-bottom'],
  py: ['padding-top', 'padding-bottom'],
  px: ['padding-left', 'padding-right'],
  // Grid
  gap: ['grid-gap'],
  // Positions
  top: ['top'],
  bottom: ['bottom'],
  left: ['left'],
  right: ['right'],
  height: ['height'],
} as const

/**
 * Testing
 * https://www.typescriptlang.org/docs/handbook/utility-types.html
 */

const shorthands = Object.keys(shorthandDefs).reduce((acc, key) => {
  // @ts-ignore
  acc[key] = (value: string) => () => {
    return css`
      ${//@ts-ignore
      shorthandDefs[key].map(
        (prop: string) => css`
          ${prop}: ${value};
        `
      )}
    `
  }
  return acc
}, {})

export type spacingShorthands = keyof typeof shorthandDefs

type spacingFunctionOptions = {
  multiplier?: number
  negative?: boolean
}

export type spacingFunctionArgs = {
  val: string
  cssProps: spacingShorthands | spacingShorthands[]
  options?: spacingFunctionOptions
}

type addSpacingProps = (
  props: spacingShorthands | spacingShorthands[],
  value: any
) => FlattenSimpleInterpolation

const addSpacingProps: addSpacingProps = (props = 'mb', value) => {
  if (typeof props === 'string') {
    return shorthands[props](value)
  } else if (Array.isArray(props)) {
    return css`
      ${props.map(prop => {
        // @ts-ignore
        if (!shorthands[prop]) {
          console.warn(
            `addSpacingProp: the method ${prop} does not exist on spacing`
          )
          return null
        }
        // @ts-ignore
        return shorthands[prop](value)
      })}
    `
  }
}

// @ts-ignore
const applyPropValueOptions = (value, options) => {
  // Leave early if we don't have a value
  if (!value) {
    return value
  }
  // Apply multiplier if its a number
  if (!isNaN(options?.multiplier)) {
    const unitParsed = parseCssUnit(value)
    if (unitParsed.number) {
      return `${unitParsed.number * options.multiplier}${unitParsed.unit}`
    }
  }
  // Apply negative number
  if (options?.negative) {
    const { number, unit } = parseCssUnit(value)
    return `-${number}${unit}`
  }
  return value
}

export type SpacingSizes = keyof DefaultTheme['responsiveSpacing']

export type SpacingFuncs = {
  [size in SpacingSizes]: (
    props: spacingShorthands | spacingShorthands[],
    options?: spacingFunctionOptions
  ) => FlattenSimpleInterpolation
}

export type SpacingFuncsWithFunc = SpacingFuncs & {
  func: (args: spacingFunctionArgs) => FlattenSimpleInterpolation
}

export type spacingFactory = (args: {
  responsiveSpacing: DefaultTheme['responsiveSpacing']
  bp: Omit<bp, 'below' | 'only'>
}) => SpacingFuncsWithFunc

const spacingFactory: spacingFactory = ({ responsiveSpacing, bp }) => {
  // Generate spacing functions
  const spacingFunctions = Object.keys(responsiveSpacing).reduce((acc, key) => {
    // Make spacing key accessible as object (ie: spacing.gutter)
    // @ts-ignore
    acc[key] = (props, options = {}) => ({ theme }) => {
      // Map through all breakpoints for current spacing setting
      // @ts-ignore
      return Object.keys(responsiveSpacing[key]).map(bpKey => {
        // value can either be a theme.spacingUnit.key or a regular unit (like 10px)
        // @ts-ignore
        const value = responsiveSpacing[key][bpKey]
        const unit = theme?.spacingUnit?.[value] || value
        // @ts-ignore
        if (bp?.[bpKey]) {
          return css`
            ${// @ts-ignore
            bp[bpKey]} {
              ${addSpacingProps(props, applyPropValueOptions(unit, options))};
            }
          `
        } else {
          if (bpKey === 'xs') {
            return css`
              ${addSpacingProps(props, applyPropValueOptions(unit, options))}
            `
          } else {
            console.warn(`Breakpoint key: ${bpKey} does not exist.`)
            return null
          }
        }
      })
    }
    return acc
  }, {} as SpacingFuncs)

  // Make generic spacing function
  const spacingFunction = ({ val, cssProps, options }: spacingFunctionArgs) => {
    return css`
      ${addSpacingProps(cssProps, applyPropValueOptions(val, options))};
    `
  }

  // Export function object
  return {
    ...spacingFunctions,
    func: spacingFunction,
  }
}

export default spacingFactory
