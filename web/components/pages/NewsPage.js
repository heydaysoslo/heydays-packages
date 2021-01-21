import Animate from '@heydays/animation/Animate'
import Container from '@heydays/Container'
import InternalLink from '@heydays/InternalLink'
import Spacer from '@heydays/Spacer'
import { H1, H2 } from '@heydays/Typography'
import Editor from 'components/editor'
import React from 'react'

const NewsPage = ({
  title,
  content,
  pagebuilder,
  articles,
  posts,
  ...props
}) => {
  return (
    <article>
      <Spacer size="header" />
      <Container as="header">
        <Animate>
          <H1>All articles will render here</H1>
        </Animate>
      </Container>
      {posts?.map(node => {
        const { _id, title, excerpt } = node
        return (
          <article key={`article-${_id}`}>
            <Container>
              <InternalLink reference={node}>
                <H2>{title}</H2>
              </InternalLink>
              {excerpt && <Editor blocks={excerpt} />}
              <InternalLink reference={node}>Les mer</InternalLink>
            </Container>
          </article>
        )
      })}
    </article>
  )
}

export default NewsPage
