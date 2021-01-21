import React from 'react'
import styled, { css } from 'styled-components'
import { BreakpointKeys } from 'styles/utilities/breakpointsFactory'

type Sticky = {
  className?: string
  /**
   * css value determines when to stick from top.
   *
   * @example var(--header-height) | 20px | 50rem
   */
  top: string
  /**
   * @note defaults to xs
   */
  from?: BreakpointKeys
}

const Sticky: React.FC<Sticky> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

export default styled(Sticky)(
  ({ theme, top, from = 'xs' }) => css`
    ${theme.bp[from]} {
      position: sticky;
    }
    ${top
      ? css`
          top: ${top};
        `
      : css`
          top: 0;
        `}
  `
)
