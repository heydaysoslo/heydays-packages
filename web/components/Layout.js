import React from 'react'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import SEO from '../components/SEO'
import Footer from '@heydays/Footer'
import styled from 'styled-components'
import { SanityProvider } from 'components/context/sanityContext'

const AdminBar = dynamic(() => import('../components/cms/AdminBar'), {
  ssr: false
})

const Layout = ({ page, global, preview = false, children }) => {
  return (
    <SanityProvider data={{ global }}>
      <Wrapper>
        <SEO page={page} />
        {preview && <AdminBar />}
        <Content>
          <Header />
          {children}
        </Content>
        <StyledFooter />
      </Wrapper>
    </SanityProvider>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
`

const Content = styled.div`
  flex: 1 0 auto;
  position: relative;
`
const StyledFooter = styled(Footer)`
  flex-shrink: 0;
`

export default Layout
