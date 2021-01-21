import React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { BreakpointKeys } from 'styles/utilities/breakpointsFactory'
import { SpacingSizes } from 'styles/utilities/spacingFactory'
import { FlexBoxAlignItems, FlexBoxJustifyContent } from '../../types'

type gapItem = boolean | number | SpacingSizes

type gap = Partial<Record<BreakpointKeys, gapItem>> | gapItem

type Props = {
  className?: string
  /**
   * Flips the order
   */
  reverse?: Partial<Record<BreakpointKeys, boolean>> | boolean
  /**
   * Align items
   */
  align?: FlexBoxAlignItems
  /**
   * Justify items
   */
  justify?: FlexBoxJustifyContent
  /**
   * Horizontal + Vertical gap on columns.
   *
   * Boolean sets gutter as spacing. If false it removes the gap.
   *
   * Number sets a pixel value.
   *
   * String must match a spacing function value eg. xs
   */
  gap?: gap
  /**
   * Vertical gap on columns.
   *
   * Boolean sets gutter as spacing. If false it removes the gap.
   *
   * Number sets a pixel value.
   *
   * String must match a spacing function value eg. xs
   */
  gapY?: gap
  /**
   * Horizontal gap on columns.
   *
   * Boolean sets gutter as spacing. If false it removes the gap.
   *
   * Number sets a pixel value.
   *
   * String must match a spacing function value eg. xs
   */
  gapX?: gap
}

type Columns = Partial<Record<BreakpointKeys, number>>

type GridItemProps = {
  /**
   * Amount of columns to span. Takes a reponsive object with values between 0 and usually 12
   * (the number set in your theme under grid.columns)
   *
   * @example
   * ```jsx
   * <Grid span={{xs: 6, md: 0}} />
   * ```
   *
   * xs defaults to full width
   */
  span: Columns
  className?: string
  /**
   * Amount of offset. Takes a reponsive object with values between 0 and usually 12
   * (the number set in your theme under grid.columns)
   *
   * eg:
   * <Grid offset={{md: 6}} />
   *
   * Offset only takes effect from where it begins eg. in case above xs && sm === 0
   */
  offset?: Columns
}

const BaseGrid: React.FC<Props> = ({ className, children }) => {
  if (!children) return null
  return <div className={className}>{children}</div>
}

const BaseGridItem: React.FC<GridItemProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

const setGridItemSpan: ({
  span: Columns,
  theme: DefaultTheme
}) => FlattenSimpleInterpolation | any[] | undefined = ({ span, theme }) => {
  if (span === 'auto') {
    return css`
      flex: 0 0 auto;
      width: auto;
      max-width: 100%;
    `
  }
  switch (typeof span) {
    case 'object':
      return Object.keys(span).map(key =>
        key === 'xs'
          ? css`
              ${setGridItemSpan({ span: span[key] || 12, theme })};
            `
          : css`
              ${theme.bp[key]} {
                ${setGridItemSpan({ span: span[key], theme })};
              }
            `
      )
    case 'number':
      if (span >= 1) {
        return css`
          flex-basis: ${(span / (theme?.grid?.columns || 12)) * 100}%;
          max-width: ${(span / (theme?.grid?.columns || 12)) * 100}%;
        `
      } else {
        return css`
          flex-basis: ${span * 100}%;
          max-width: ${span * 100}%;
        `
      }
  }
}

const setGridItemOffset = ({ offset, theme }) => {
  switch (typeof offset) {
    case 'object':
      return Object.keys(offset).map(key =>
        key === 'xs'
          ? css`
              ${setGridItemOffset({ offset: offset[key], theme })};
            `
          : css`
              ${theme.bp[key]} {
                ${setGridItemOffset({ offset: offset[key], theme })};
              }
            `
      )
    case 'number':
      if (offset >= 1) {
        return css`
          margin-left: ${(offset / (theme?.grid?.columns || 12)) * 100}%;
        `
      } else {
        return css`
          margin-left: ${offset * 100}%;
        `
      }
  }
}

export const GridItem = styled(BaseGridItem)<GridItemProps>(
  ({ theme, span, offset }) => css`
    box-sizing: border-box;
    flex: 1 1 0;
    max-width: 100%;
    /* Default to 100% mainly for xs screens */
    flex-basis: 100%;
    max-width: 100%;

    ${setGridItemSpan({ span, theme })};
    ${setGridItemOffset({ offset, theme })};
  `
)

/*
Possible to pass the following units:
- Theme spacing unit: 'gutter', 'lg'
- Boolean: true (default spacing unit), false (no gutter at all)
*/
const setResponsiveGaps = ({ gap, cssProps, multiplier }) => ({ theme }) => {
  switch (typeof gap) {
    case 'object':
      return Object.keys(gap).map(key =>
        key === 'xs'
          ? css`
              ${setResponsiveGaps({ gap: gap[key], multiplier, cssProps })}
            `
          : css`
              ${theme.bp[key]} {
                ${setResponsiveGaps({ gap: gap[key], multiplier, cssProps })}
              }
            `
      )
    case 'number':
      return theme.spacing.func({ val: `${gap}px`, cssProps, multiplier })
    case 'boolean':
      const defaultGapUnit = 'gutter'
      return theme.spacing[defaultGapUnit](cssProps, {
        multiplier: gap ? multiplier : 0
      })
    default:
      if (theme.spacing[gap]) {
        return theme.spacing[gap](cssProps, { multiplier })
      } else {
        return theme.spacing.func({ val: gap, cssProps, multiplier })
      }
  }
}

export default styled(BaseGrid)<Props>(
  ({ gap, gapY, gapX, reverse, align, justify, theme }) => css`
    display: flex;
    flex: 0 1 auto;
    flex-direction: ${reverse ? 'row-reverse' : 'row'};
    flex-wrap: wrap;
    align-items: ${align ? align : 'stretch'};
    justify-content: ${justify ? justify : 'flex-start'};
    min-height: 0;

    /* Add responsive negative margins to container */
    /* Vertical */
    ${gapY &&
      setResponsiveGaps({
        gap: gapY,
        multiplier: -1,
        cssProps: 'mb'
      })}

    /* Horizontal */
    ${gapX &&
      setResponsiveGaps({
        gap: gapX,
        multiplier: -0.5,
        cssProps: 'mx'
      })}

    /* Vertical + horizontal */
    ${gap &&
      setResponsiveGaps({
        gap,
        multiplier: -0.5,
        cssProps: 'mx'
      })}

    ${gap &&
      setResponsiveGaps({
        gap,
        multiplier: -1,
        cssProps: 'mb'
      })}

    > ${GridItem} {

      /* Add responsive margins to GridItem */
      /* Vertical */
      ${gapY &&
        setResponsiveGaps({
          gap: gapY,
          multiplier: 1,
          cssProps: 'pb'
        })}

      /* Horizontal */
      ${gapX &&
        setResponsiveGaps({
          gap: gapX,
          multiplier: 0.5,
          cssProps: 'px'
        })}

      /* Vertical + horizontal */
      ${gap &&
        setResponsiveGaps({
          gap,
          multiplier: 0.5,
          cssProps: 'px'
        })}

      ${gap &&
        setResponsiveGaps({
          gap,
          multiplier: 1,
          cssProps: 'pb'
        })}

    }
  `
)
