import React from 'react'
import BaseBlockContent from '@sanity/block-content-to-react'

import Quote from './Quote'
import Figure from './Figure'
import Oembed from '../Oembed'
import { H3, H2, P, UL, OL, ULItem, OLItem } from '@heydays/Typography'
import Accordion from '@heydays/Accordion'
import InternalLink from '@heydays/InternalLink'
import ExternalLink from '@heydays/ExternalLink'
import StyledLink from 'components/styled/Link.styled'
import SanityButton from '@heydays/SanityButton'
// import Container from '@heydays/Container'
import styled, { css } from 'styled-components'

export const serializers = {
  types: {
    block(props) {
      if (props.node.children.text && props.node.children.text.length === 0)
        return null
      switch (props.node.style) {
        case 'h2':
          return <H2>{props.children}</H2>

        case 'h3':
          return <H3>{props.children}</H3>

        case 'large':
          return <P modifiers="large">{props.children}</P>

        case 'small':
          return (
            <P as="small" modifiers="small">
              {props.children}
            </P>
          )

        case 'span':
          return <P as="span">{props.children}</P>

        default:
          return <P>{props.children}</P>
      }
    },
    button: ({ node }) => {
      // @ts-ignore
      const { event, ...props } = node
      return (
        <SanityButton event={event[0]} className="Editor__button" {...props} />
      )
    },
    quote(props) {
      if (!props.node.content) return null
      return <Quote quote={props.node} />
    },
    figure(props) {
      return <Figure node={props.node} />
    },
    oembed(props) {
      // @ts-ignore
      return <Oembed url={props.node.url} />
    },
    accordion(props) {
      // @ts-ignore
      return <Accordion items={props.node.items} exclusive defaultActive={2} />
    }
  },
  marks: {
    internalLink: ({ mark, children }) => {
      // @ts-ignore
      return (
        <StyledLink as={InternalLink} {...mark}>
          {children}
        </StyledLink>
      )
    },
    link: ({ mark, children }) => {
      // @ts-ignore
      return (
        <StyledLink as={ExternalLink} {...mark}>
          {children}
        </StyledLink>
      )
    },
    button: ({ mark, children }) => {
      // @ts-ignore
      const { event, ...props } = mark
      return (
        <SanityButton event={event[0]} {...props}>
          {children}
        </SanityButton>
      )
    }
  },
  list: ({ children, ...props }) => {
    return props.type === 'number' ? <OL>{children}</OL> : <UL>{children}</UL>
  },
  listItem: ({ children, ...props }) => {
    switch (props.node.listItem) {
      case 'bullet':
        return <ULItem>{children}</ULItem>

      case 'number':
        return <OLItem>{children}</OLItem>

      default:
        return <li>{children}</li>
    }
  }
}

type Props = {
  blocks: any
  className?: string
}

const Editor: React.FC<Props> = ({ blocks, className }) => {
  return (
    <BaseBlockContent
      className={className}
      blocks={blocks}
      serializers={serializers}
      renderContainerOnSingleChild={true}
    />
  )
}

export default styled(Editor)(
  ({ theme }) => css`
    ${H2}, ${H3} {
      margin-top: 4rem;
      max-width: 72rem;
    }

    ${P}, ${UL}, ${OL} {
      margin-top: 2rem;  
    }

    // Should contained items be wrapped in a <Container size="paragraph" /> ?
    // What are the potential problems? Nesting?
    // Could they be extended instead of wrapped?
    // Or is the current solution sufficient?
    ${H2}, ${H3}, ${P}, ${UL}, ${OL} {
      max-width: 72rem;
      margin-left: auto;
      margin-right: auto;
    }

    .Editor__button {
      margin-top: 2rem;
    }
    // Remove margin top from any first element
    
    > *:first-child {
      margin-top: 0 !important;
    }

  `
)
