import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Switch from '@heydays/Switch'
import Container from './elements/Container'
import Navigation from './elements/Navigation'
import useAppContext from '@heydays/useAppContext'
import useDimension from '@heydays/useDimension'
import Burger from '@heydays/Burger'
import { useOnClickOutside } from '@heydays/useOnClickOutside'

type Props = {
  className?: string
  isDark: boolean
}

const Header: React.FC<Props> = ({ className }) => {
  const headerRef = useRef<HTMLElement | null>(null)
  const { state, actions } = useAppContext()
  const [open, setOpen] = useState(false)
  const { outerHeight: headerHeight } = useDimension(headerRef)

  /*
  Save the header height as a css variable.
  Helpful to:
  - create correct padding on Hero elements to prevent absolute or fixed menu overlap.
  - positioning mobile menu or modals
  Usage:
  .hero {
    padding-top: var(--header-height);
  }
  .mobileMenu {
    position: absolute;
    top: var(--header-height);
  }
  */
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--header-height',
      headerHeight + 'px'
    )
  }, [headerHeight])

  // Close menu if click outside of header element
  useOnClickOutside(headerRef, () => {
    setOpen(false)
  })

  return (
    <header className={className} ref={headerRef}>
      <Container>
        <div className="content">
          <Link href="/">
            <a className="branding">HEYDAYS STARTER</a>
          </Link>
          <DesktopNav>
            <Navigation />
            <Switch
              size={60}
              state={state.darkTheme}
              onClick={() => actions.toggleDarkTheme()}
            />
          </DesktopNav>
          <MobileMenuButton onClick={() => setOpen(!open)}>
            <Burger active={open} />
          </MobileMenuButton>
        </div>
      </Container>
      {open && (
        <MobileNav>
          <Container>
            <Navigation />
          </Container>
        </MobileNav>
      )}
    </header>
  )
}

const MobileMenuButton = styled.button(
  ({ theme: t }) => css`
    ${t.bp.md} {
      display: none;
    }
  `
)

const DesktopNav = styled.div(
  ({ theme: t }) => css`
    display: none;
    ${t.bp.md} {
      display: flex;
      align-items: center;
    }
  `
)

const MobileNav = styled.div(
  ({ theme: t }) => css`
    align-items: center;
    position: absolute;
    top: var(--header-height);
    width: 100%;
    border-bottom: 1px solid black;
    background: white;
    ${t.bp.md} {
      display: none;
    }
  `
)

export default styled(Header)(
  ({ theme: t }) => css`
    ${t.spacing.md('py')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    .content {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .Header__tools {
      display: flex;
      align-items: center;
    }
  `
)
