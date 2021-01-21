import React from 'react'
import styled, { css } from 'styled-components'
import { aspect } from 'types'
import CloudinaryMediaResolver from '../resolvers/CloudinaryMediaResolver'

type Props = {
  node: any
  aspectRatio?: aspect
  className?: string
}

const Figure: React.FC<Props> = ({ node, aspectRatio, className }) => {
  if (!node?.cldImage) {
    return null
  }
  return (
    <figure className={`Figure ${className}`}>
      <CloudinaryMediaResolver node={node} aspectRatio={aspectRatio} />
      {node.caption && (
        <figcaption className="Figure__caption">{node.caption}</figcaption>
      )}
    </figure>
  )
}

export default styled(Figure)(
  () => css`
    width: 100%;
    max-width: 100%;
  `
)
