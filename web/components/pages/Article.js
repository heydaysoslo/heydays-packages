import React from 'react'

import { H1 } from '@heydays/Typography'
import Container from '@heydays/Container'
import Spacer from '@heydays/Spacer'
import { getReadTime } from '../../utils/sanityHelpers'
import Editor from '../editor'
import PageBuilder from '../pagebuilder/Pagebuilder'
import Author from '../elements/Author'
import Animate from '@heydays/animation/Animate'

const Article = page => {
  const { title, body, authors, publishDate, pagebuilder } = page
  return (
    <article>
      <Spacer size="header" />
      <header>
        <Container>
          <Animate>
            {title && <H1>{title}</H1>}
            <p>
              {body && `Read time: ${getReadTime(body)}min`}
              {publishDate && <span>Published: {publishDate}</span>}
            </p>
          </Animate>
        </Container>
      </header>
      {body && (
        <Container>
          <Editor blocks={body} />
        </Container>
      )}
      {authors &&
        authors.map(author => <Author key={author._key} {...author} />)}
      {pagebuilder?.sections && <PageBuilder sections={pagebuilder.sections} />}
    </article>
  )
}

export default Article
