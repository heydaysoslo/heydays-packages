import styled, { css } from 'styled-components'

const StyledCardSection = styled.section(
  ({ theme }) => css`
    ${theme.spacing.md('mt')};
  `
)

StyledCardSection.Title = styled.h2`
  display: none;
`

export default StyledCardSection
