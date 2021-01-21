import {
  css,
  DefaultTheme,
  FlattenSimpleInterpolation,
} from 'styled-components'
import { remSize } from './converters'

export const addProps = (propsString, value) => {
  const props = propsString.split(',').map(prop => prop.trim())
  return css`
    ${props.map(
      prop => css`
        ${prop}: ${value};
      `
    )}
  `
}

/**
 * Parses css unit and returns object with number and unit separated
 * @param {string|number} cssUnit CSS length unit (1em, 2rem, 3vh, 4vw, 100%, ...)
 * @returns {object} float and unit separated {number:float, unit:string}
 */
export const parseCssUnit = cssUnit => {
  const number = parseFloat(cssUnit)
  // Leave early if a unitless number is passed
  if (!isNaN(cssUnit)) {
    return { number, unit: '' }
  }
  const unit = cssUnit.replace(/^[-\d.]+/, '')
  return { number, unit }
}

type applyModifier = (
  modifier: string,
  css: FlattenSimpleInterpolation
) => (args: {
  theme: DefaultTheme
  modifiers?: string[] | string | null | undefined
}) => FlattenSimpleInterpolation | null

export const applyModifier: applyModifier = (modifier, css) => ({
  modifiers,
}) => {
  if (!modifiers) return null
  return modifiers === modifier || modifiers.includes(modifier) ? css : null
}

const px2LineHeight = (size: string, lineheight: string) => {
  if (!size.includes('px') || !lineheight.includes('px')) {
    console.warn(
      `px2LineHeight() assumes px values. Size or lineheight is not spesified in px. Was ${size} ${lineheight}`
    )
  }
  return (
    Math.round(
      (parseFloat(lineheight) / parseFloat(size) + Number.EPSILON) * 100
    ) / 100
  )
}

export const createFontSizeAndLineHeight = size => {
  const [fz, lh] =
    typeof size === 'object' ? size.size.split('/') : size.split('/')
  const fzUnit = fz.replace(/[0-9]/g, '').trim()
  const fzVal = parseFloat(fz)
  const lhUnit = lh.replace(/[0-9]/g, '').trim()
  return css`
    font-size: ${fzUnit === 'px' ? remSize(fzVal) : fz};
    line-height: ${lhUnit === 'px' ? px2LineHeight(fz, lh) : lh};
    ${size.css && size.css};
  `
}
