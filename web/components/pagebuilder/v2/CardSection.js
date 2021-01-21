import React from 'react'
import Grid, { GridItem } from '../../elements/Grid'
import Animate from '@heydays/animation/Animate'
import Card from '../../elements/Card'
import Container from '@heydays/Container'
import Spacer from '@heydays/Spacer'

const CardSection = ({ className, title, seeAllLink, cardsList = [] }) => {
  return (
    <div className={className}>
      <Spacer />
      <Container>
        <Grid gap>
          {cardsList.map(card => {
            return (
              <GridItem span={{ md: 4 }} key={card?._key}>
                <Animate>
                  <Card
                    title={card?.content?.title || card?.title}
                    image={card?.content?.mainImage || card?.image}
                    excerpt={card?.content?.excerpt || card?.editorMinimal}
                    link={card?.content}
                  />
                </Animate>
              </GridItem>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default CardSection
