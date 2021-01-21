import React, { useRef, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { CloudinaryNode } from 'types'

import { cldGetVideoUrl } from '../../utils/cloudinary'
import Button from './Button'

/*

Media url format:
https://res.cloudinary.com/<cloud_name>/<resource_type>/<type>/<transformations>/<version>/<public_id>.<format>
Docs: https://cloudinary.com/documentation/image_transformations#delivering_media_assets_using_dynamic_urls


Video transformations:
https://cloudinary.com/documentation/video_transformation_reference


https://res.cloudinary.com/<cloud name>/video/upload/<public ID>.<video format file extension>
"https://res.cloudinary.com/handsomefrank/video/upload/v1590428051/animation/Abbey_Lossing_resolutions_pndo2d.mp4"
*/

type Props = {
  node: CloudinaryNode
  className?: string
  options: {
    blur?: boolean
  }
}

const CloudinaryVideo: React.FC<Props> = ({
  node,
  className,
  options = { blur: false }
}) => {
  const videoUrl = node ? cldGetVideoUrl(node, options) : ''
  const player = useRef<HTMLVideoElement>(null)
  const [shouldPlay, setShouldPlay] = useState(false)

  useEffect(() => {
    if (player?.current && shouldPlay) {
      player.current.play()
    }
  }, [shouldPlay, options])

  if (!node) return null

  return (
    <div className={className}>
      <Button onClick={() => setShouldPlay(true)}>Play</Button>
      {/* eslint-disable jsx-a11y/media-has-caption */}
      <video ref={player} width={node.width} height={node.height} controls>
        {Array.isArray(videoUrl) &&
          videoUrl.map(({ src, type }) => {
            return <source key={`${type}-${src}`} src={src} type={type} />
          })}
        Your browser does not support the video tag :(
      </video>
      {/* eslint-enable jsx-a11y/media-has-caption */}
    </div>
  )
}

export default styled(CloudinaryVideo)(
  ({ theme }) => css`
    position: relative;

    > video {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }

    ${Button} {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      border-radius: 0;
      border-width: 0;
      color: white;

      &:hover {
        background: transparent;
        color: white;
      }
    }
  `
)
