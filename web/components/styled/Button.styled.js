import styled, { css } from 'styled-components'

const StyledButton = styled.button(
  ({ theme, size, type }) => css`
    color: inherit;
    border: 2px solid black;
    padding: 5px 10px;
    display: inline-flex;
    border-radius: 0;
    appearance: none;
    font-family: sans-serif;
    cursor: pointer;
    &:hover {
      background-color: black;
      color: white;
      border-color: black;
    }
    ${size &&
      size === 'lg' &&
      css`
        padding: 20px 25px;
      `}
    ${size &&
      size === 'sm' &&
      css`
        padding: 2px 5px;
      `}
    ${type &&
      type === 'primary' &&
      css`
        background-color: black;
        color: white;
      `}
  `
)

export default StyledButton
