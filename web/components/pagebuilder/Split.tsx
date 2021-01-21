import CloudinaryMediaResolver from '@heydays/CloudinaryMediaResolver'
import Grid, { GridItem } from '@heydays/Grid'
import { H3 } from '@heydays/Typography'
import Editor from 'components/editor'
import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
  items: any[]
}

const Split: React.FC<Props> = ({ className, items, ...props }) => {
  console.log('props', items)
  return (
    <div className={className}>
      <Grid gap={true} align="center">
        {items.map(item => (
          <GridItem span={{ md: 6 }} key={item._key}>
            {item._type === 'content' && (
              <>
                {item?.title && <H3>{item.title}</H3>}
                {item?.editorMinimal && (
                  <Editor
                    className="TextImageSplit__content"
                    blocks={item.editorMinimal}
                  />
                )}
              </>
            )}
            {item._type === 'media' && item?.media && (
              <div className="image">
                <CloudinaryMediaResolver
                  node={item.media}
                  aspectRatio={item.aspect}
                />
              </div>
            )}
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}

export default styled(Split)(({ theme }) => css``)
