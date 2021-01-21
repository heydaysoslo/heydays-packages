import React from 'react'
import styled, { css } from 'styled-components'

import NavItemResolver from '@heydays/NavItemResolver'
import useSanity from '@heydays/useSanity'
import { AnimateSharedLayout } from 'framer-motion'

type Props = {
  className?: string
}

const Navigation: React.FC<Props> = ({ className }) => {
  const cms = useSanity()
  const mainMenuItems = cms?.data?.global?.siteSettings?.primaryMenu?.item
  if (!mainMenuItems) return null
  return (
    <nav className={className}>
      <AnimateSharedLayout type="crossfade">
        {mainMenuItems.map((item: any) => {
          return <NavItem key={item._key} item={item} />
        })}
      </AnimateSharedLayout>
    </nav>
  )
}

const NavItem = styled(NavItemResolver)``

export default styled(Navigation)(
  ({ theme }) => css`
    // Shared styling
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    // Mobile styling
    ${theme.bp.below.md} {
      flex-flow: column;
      padding-bottom: 20px;
      background: white;
      ${NavItem} {
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
        }
      }
    }

    // Desktop styling
    ${theme.bp.md} {
      flex-flow: row;
      ${NavItem} {
        margin-left: 2rem;
      }
    }
  `
)
