import useSanity from '@heydays/useSanity'
import React from 'react'
import styled from 'styled-components'
import Container from './Container'
import Grid, { GridItem } from './Grid'
import NavList from './NavList'
import Spacer from './Spacer'

const Footer = ({ className }) => {
  const cms = useSanity()
  const menus = cms?.data?.global?.siteSettings?.footerMenus
  const companyInfo = cms?.data?.global?.companyInfo
  return (
    <footer className={className}>
      <Spacer />
      <Container>
        <Grid gap>
          {menus &&
            menus.map((menu, i) => {
              return (
                <GridItem
                  key={`menu-${menu._id}-${i}`}
                  span={{ xs: 12, md: 6, lg: 3 }}
                >
                  <NavList items={menu?.item} direction="vertical" />
                </GridItem>
              )
            })}
          <GridItem span={{ xs: 12, md: 6, lg: 3 }}>
            {companyInfo && (
              <>
                <p>
                  {companyInfo.name}
                  <br />
                  {companyInfo?.address?.streetAddress}
                  <br />
                  {companyInfo?.address?.postCode} {companyInfo?.address?.city}
                </p>
                <p>
                  Org.nr {companyInfo?.orgNumber}
                  <br />
                  {companyInfo?.email}
                </p>
              </>
            )}
          </GridItem>
        </Grid>
      </Container>
      <Spacer />
    </footer>
  )
}

export default styled(Footer)`
  border-top: 1px solid black;
`
