import React from 'react'
// import styled, { css } from 'styled-components'

export type Props = {
  className?: string
  size?: any
  custom?: string
}

// const StyledSpacer = styled.div<Props>(
//   ({ theme, size = 'md', custom }) => css`
//     ${!custom && theme.spacing[size]('height')};
//     ${custom && `height: ${custom}`};
//   `
// )

const Spacer: React.FC<Props> = () => {
  return <div>hello</div>
}

export default Spacer
