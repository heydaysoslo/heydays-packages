import React from 'react'
import dynamic from 'next/dynamic'

const sectionTypes = {
  section: dynamic(() => import('./Section')),
  cardSection: dynamic(() => import('./CardSection')),
  textSection: dynamic(() => import('./TextSection')),
  imageSection: dynamic(() => import('./FullImageSection')),
  textImageSplit: dynamic(() => import('./TextImageSplit')),
  carousel: dynamic(() => import('./CarouselSection')),
  tabs: dynamic(() => import('../elements/Tabs')),
  videoSection: dynamic(() => import('./VideoSection')),
  reusableSectionReference: ({ reusableSection }) => (
    <PageBuilder sections={reusableSection?.pagebuilder?.sections} />
  ),
  split: dynamic(() => import('./Split')),
  heroSection: dynamic(() => import('./HeroSection'))
}

type section = {
  _type: keyof typeof sectionTypes
  _key: string
}

type Props = {
  sections: section[]
  className?: string
}

const PageBuilder: React.FC<Props> = ({ className, sections }) => {
  return (
    <div className={className}>
      {sections?.map((section, index) => {
        const Component = sectionTypes[section._type] || null
        return Component ? (
          <Component
            key={section._key}
            {...section}
            prevComp={sections[index - 1] ? sections[index - 1] : null}
            nextComp={sections[index + 1] ? sections[index + 1] : null}
          />
        ) : (
          <p key={section._key} style={{ background: 'yellow' }}>
            Component {section._type} not found
          </p>
        )
      })}
    </div>
  )
}

export default PageBuilder
