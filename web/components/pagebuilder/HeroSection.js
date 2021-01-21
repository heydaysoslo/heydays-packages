import React from 'react'
import Spacer from '@heydays/Spacer'
import Container from '@heydays/Container'
import { H1 } from '@heydays/Typography'
import styled, { css } from 'styled-components'
import Editor from 'components/editor'
import Grid, { GridItem } from '@heydays/Grid'
import CloudinaryImage from '@heydays/CloudinaryImage'
import Animate from '@heydays/animation/Animate'

const HeroSection = ({ className, title, intro, image }) => {
  return (
    <header className={className}>
      <Spacer size="header" />
      <Container>
        <Grid align="center" justify="space-between">
          <GridItem span={{ xs: 12, md: 5 }} offset={{ xs: 0, md: 0 }}>
            <Animate>
              <H1>{title}</H1>
            </Animate>
            {intro && <Editor blocks={intro} />}
          </GridItem>
          <GridItem span={{ xs: 12, md: 6 }}>
            {image && <CloudinaryImage node={image} />}
          </GridItem>
        </Grid>
      </Container>
    </header>
  )
}

export default styled(HeroSection)(
  ({ theme }) => css`
    text-align: left;
  `
)
