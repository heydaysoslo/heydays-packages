import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
}

const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

export default styled(Container)(
  ({ theme }) => css`
    max-width: 160rem;
    margin-left: auto;
    margin-right: auto;
    ${theme.spacing.container('px')}
    // Remove outer padding from nested containers
    & & {
      padding-left: 0;
      padding-right: 0;
      max-width: none;
    }
  `
)
