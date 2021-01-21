import React from 'react'
import Editor from '../editor'
import { P, H2 } from '@heydays/Typography'
import styled, { css } from 'styled-components'
import Animate from '@heydays/animation/Animate'
import Container from '@heydays/Container'

type Props = {
  label: string
  title: string
  content: any
  link: any
  className?: string
}

const Section: React.FC<Props> = ({
  label,
  title,
  content,
  link,
  className
}) => {
  return (
    <Animate className={className}>
      <Container>
        {label && (
          <P modifiers="small" className="label">
            {label}
          </P>
        )}
        {title && <H2 className="title">{title}</H2>}
        {content && <Editor className="content" blocks={content} />}
      </Container>
    </Animate>
  )
}

export default styled(Section)(
  ({ theme }) => css`
    ${theme.spacing.section('mt')}
  `
)
