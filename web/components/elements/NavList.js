import React from 'react'
import NavItemResolver from '@heydays/NavItemResolver'
import styled, { css } from 'styled-components'

const NavList = ({ className = '', items, direction }) => {
  return (
    <StyledNavList direction={direction} className={className}>
      {items.map(item => {
        return <NavItem key={item._key} item={item} />
      })}
    </StyledNavList>
  )
}

const NavItem = styled(NavItemResolver)(
  ({ theme }) => css`
    margin-bottom: 1.5rem;
  `
)

const StyledNavList = styled.nav(
  ({ theme, direction }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    ${direction === 'vertical' &&
      css`
        flex-direction: column;
      `}
  `
)

export default NavList
