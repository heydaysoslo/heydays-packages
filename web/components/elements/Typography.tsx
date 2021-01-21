import styled, { css, DefaultTheme } from 'styled-components'

import { applyModifier } from '../../styles/utilities'

type Modifiers = 'large' | 'small'

type PModifiers = {
  theme: DefaultTheme
  modifiers?: Modifiers | Modifiers[] | null | undefined
}

export const P = styled.p<PModifiers>(
  ({ theme, modifiers = null }) => css`
    ${!modifiers &&
      css`
        ${theme.fonts.body()}
      `}
    ${applyModifier(
      'small',
      css`
        ${theme.fonts.small()};
      `
    )}
    ${applyModifier(
      'large',
      css`
        ${theme.fonts.title()};
        text-transform: uppercase;
      `
    )}
  `
)

export const H1 = styled.h1(
  ({ theme }) => css`
    ${theme.fonts.h1()}
  `
)

export const H2 = styled.h2(
  ({ theme }) => css`
    ${theme.fonts.h2()}
  `
)

export const H3 = styled.h3(
  ({ theme }) => css`
    ${theme.fonts.title?.()}
  `
)

/**
 * LISTS
 */
const StyledOL = styled.ol(
  ({ theme }) => css`
    list-style: decimal;
    padding-left: 1em;
  `
)

const StyledOLItem = styled.li(({ theme }) => css``)

export const OL = StyledOL
export const OLItem = StyledOLItem

const StyledUL = styled.ul(
  ({ theme }) => css`
    padding-left: 1.2em;
  `
)

const StyledULItem = styled.li(
  ({ theme }) => css`
    &:before {
      content: '';
      display: inline-block;
      width: 1rem;
      height: 1rem;
      left: -1rem;
      margin-left: -1rem;
      background-color: ${theme.colors.text};
      position: relative;
      border-radius: 99px;
    }
  `
)

export const UL = StyledUL
export const ULItem = StyledULItem
