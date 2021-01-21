import React from 'react'
import styled, { css } from 'styled-components'
// import dynamic from 'next/dynamic'
import Section from './v2/Section'
import CardSection from './v2/CardSection'
import TextSection from './v2/TextSection'
import CarouselSection from './v2/CarouselSection'

const NotFound = ({ _type }) => {
  return <p style={{ background: 'yellow' }}>Component "{_type}" not found</p>
}

const sectionTypes = {
  error: NotFound,
  section: Section,
  cardSection: CardSection,
  textSection: TextSection,
  carousel: CarouselSection
  // section: dynamic(() => import('./Section')),
  // cardSection: dynamic(() => import('./CardSection')),
  // textSection: dynamic(() => import('./TextSection')),
  // imageSection: dynamic(() => import('./FullImageSection')),
  // textImageSplit: dynamic(() => import('./TextImageSplit')),
  // carousel: dynamic(() => import('./CarouselSection')),
  // tabs: dynamic(() => import('../elements/Tabs')),
  // videoSection: dynamic(() => import('./VideoSection')),
}

const StyledPageBuilder = styled.div(
  ({ theme }) => css`
    .Pagebuilder__item {
      border-top: 1px solid red;
    }
  `
)

const PageBuilder = ({ sections, className }) => {
  return (
    <StyledPageBuilder className={className}>
      {sections.map((section, index) => {
        const Component = sectionTypes[section._type] || sectionTypes.error
        return (
          <Component
            className="Pagebuilder__item"
            key={section._key}
            {...section}
          />
        )
      })}
    </StyledPageBuilder>
  )
}

// const PageBuilder: React.FC<Props> = ({ sections }) => {
//   return (
//     <StyledPageBuilder>
//       <Stagger>
//         {sections?.map((section, index) => {
//           const Component = sectionTypes[section._type] || null
//           return Component ? (
//             <div key={section._key} className="PageBuilder__item">
//               <Component
//                 {...section}
//                 prevComp={sections[index - 1] ? sections[index - 1] : null}
//                 nextComp={sections[index + 1] ? sections[index + 1] : null}
//               />
//             </div>
//           ) : (
//             <p key={section._key} style={{ background: 'yellow' }}>
//               Component {section._type} not found
//             </p>
//           )
//         })}
//       </Stagger>
//     </StyledPageBuilder>
//   )
// }

export default PageBuilder
