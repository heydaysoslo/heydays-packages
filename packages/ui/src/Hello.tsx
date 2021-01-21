import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div(
  () => css`
    background: orange;
  `
)

const Hello = () => {
  return <Wrapper>hello</Wrapper>
}

export default Hello
