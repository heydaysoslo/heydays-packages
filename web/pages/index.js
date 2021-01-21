import React from 'react'
import styled, { css } from 'styled-components'
// import { Hello, Wrapper } from 'ui'

const Home = ({ className }) => {
  return (
    <div className={className}>
      <h1>hello world</h1>
      {/* <Wrapper>hello</Wrapper> */}
      {/* <Hello size="lg" /> */}
    </div>
  )
}

export default styled(Home)(
  ({ theme }) => css`
    background: ${theme.colors.background};
    ${theme.spacing.sm('p')};
    ${theme.fonts.h1()};
    ${theme.bp.sm} {
      background: orange;
    }
    ${theme.bp.md} {
      background: blue;
    }
    ${theme.bp.lg} {
      background: red;
    }
    ${theme.bp.xl} {
      background: purple;
    }
    ${theme.bp.xxl} {
      background: green;
    }
  `
)
