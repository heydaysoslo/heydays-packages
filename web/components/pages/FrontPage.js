import React from 'react'
import Pagebuilder from '../pagebuilder/Pagebuilder'
import HeroSection from '@heydays/HeroSection'

const FrontPage = ({ className, title, pagebuilder }) => {
  return (
    <article className={className}>
      {pagebuilder?.sections[0]?._type !== 'heroSection' && (
        <HeroSection title={title} />
      )}
      {pagebuilder?.sections && <Pagebuilder sections={pagebuilder.sections} />}
    </article>
  )
}

export default FrontPage
