import styled, { css } from 'styled-components'

const StyledLink = styled.button(
  ({ theme }) => css`
    color: inherit;
    text-decoration: underline;
    &:hover {
      color: blue;
      text-decoration: none;
    }
    &:focus {
      color: blue;
    }
  `
)

export default StyledLink
