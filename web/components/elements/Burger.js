import React from 'react'
import { StyledBurger } from 'components/styled/Burger.styled'

const Burger = ({ active, className = null }) => {
  return (
    <StyledBurger active={active} className={className}>
      <span className="box">
        <span className="inner" />
      </span>
    </StyledBurger>
  )
}

export default Burger
