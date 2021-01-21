import React from 'react'

import Editor from '../editor/'
import { H3 } from '@heydays/Typography'
import Grid, { GridItem } from '@heydays/Grid'
import styled, { css } from 'styled-components'
import CloudinaryMediaResolver from '../resolvers/CloudinaryMediaResolver'

const TextImageSplit = ({
  textOnTheRight = false,
  aspect,
  title,
  content,
  className,
  media
}) => {
  return (
    <div className={className}>
      <Grid
        reverse={textOnTheRight}
        columns={{ xs: 1, md: 2 }}
        gap={true}
        align="center"
      >
        <GridItem span={{ md: 6 }}>
          <div className="content">
            {title && <H3>{title}</H3>}
            {content && (
              <Editor className="TextImageSplit__content" blocks={content} />
            )}
          </div>
        </GridItem>
        <GridItem span={{ md: 6 }}>
          <div className="image">
            {media && (
              <CloudinaryMediaResolver
                className="TextImageSplit__image"
                node={media}
                aspectRatio={aspect}
              />
            )}
          </div>
        </GridItem>
      </Grid>
    </div>
  )
}

export default styled(TextImageSplit)(
  ({ theme }) => css`
    .TextImageSplit__content {
      ${theme.spacing.sm('mt')}
    }
    .TextImageSplit__button {
      ${theme.spacing.sm('mt')}
    }
  `
)
