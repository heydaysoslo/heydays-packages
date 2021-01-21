import { css, FlattenSimpleInterpolation } from 'styled-components'

import { bp } from './breakpointsFactory'
import { createFontSizeAndLineHeight } from './helpers'
import { FontSizes, ResponsiveFonts } from './styled'

export type fontFuncs = {
  [size in FontSizes]: () => FlattenSimpleInterpolation
}

type fontFactory = (args: {
  responsiveFonts: ResponsiveFonts
  bp: bp
}) => fontFuncs

const fontFactory: fontFactory = ({ responsiveFonts, bp }) =>
  Object.keys(responsiveFonts).reduce((acc, key) => {
    acc[key] = () => {
      if (responsiveFonts?.[key]) {
        const val = responsiveFonts[key]
        return typeof val === 'string'
          ? createFontSizeAndLineHeight(val)
          : Object.keys(val).map(bpKey => {
              return bpKey === 'xs'
                ? createFontSizeAndLineHeight(val[bpKey])
                : css`
                    ${bp[bpKey]} {
                      ${createFontSizeAndLineHeight(val[bpKey])}
                    }
                  `
            })
      } else {
        return null
      }
    }
    return acc
  }, {} as fontFuncs)

export default fontFactory
