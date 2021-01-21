import HeroSection from '@heydays/HeroSection'
import React from 'react'
import styled, { css } from 'styled-components'

import Pagebuilder from '../pagebuilder/Pagebuilder'
// import Pagebuilder from '../pagebuilder/PageBuilderNew'
// import { H1 } from '@heydays/Typography'
// import Container from '@heydays/Container'

const Page = ({
  className,
  title,
  content,
  pagebuilder,
  excerpt,
  mainImage,
  ...props
}) => {
  return (
    <article className={className}>
      {/**
       * Use a hero section with the page content if no custom hero is added to the pagebuilder
       */}
      {pagebuilder?.sections[0]?._type !== 'heroSection' && (
        <HeroSection title={title} intro={excerpt} image={mainImage} />
      )}
      {pagebuilder?.sections && <Pagebuilder sections={pagebuilder.sections} />}
    </article>
  )
}

export default styled(Page)(({ theme }) => css``)
