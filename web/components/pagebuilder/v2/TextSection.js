import React from 'react'
import Container from '@heydays/Container'
import Editor from '../../editor/'
import Spacer from '@heydays/Spacer'

const TextSection = ({ className, body }) => {
  return (
    <div className={className}>
      <Spacer />
      <Container>
        <Editor blocks={body} />
      </Container>
    </div>
  )
}

export default TextSection
