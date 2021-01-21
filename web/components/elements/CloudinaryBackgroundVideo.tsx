import React, { useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { cldGetVideoUrl } from '../../utils/cloudinary'
import { CloudinaryNode } from 'types'

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
  options?: {
    blur?: boolean
  }
}

const CloudinaryBackgroundVideo: React.FC<Props> = ({
  node,
  className,
  options
}) => {
  const videoUrl = node ? cldGetVideoUrl(node, options) : ''
  const player = useRef<HTMLVideoElement>(null)
  const [inViewRef, inView] = useInView()

  // Toggle play/pause on enter/leave view
  useEffect(() => {
    if (player?.current) {
      if (inView) {
        player.current.play()
      } else {
        player.current.pause()
      }
    }
  }, [inView])

  if (!node) return null

  return (
    <div ref={inViewRef} className={className}>
      <video
        ref={player}
        width={node.width}
        height={node.height}
        autoPlay={inView}
        loop
        muted
        playsInline
      >
        {Array.isArray(videoUrl) &&
          videoUrl.map(({ src, type }) => {
            return <source key={`${type}-${src}`} src={src} type={type} />
          })}
        Your browser does not support the video tag :(
      </video>
    </div>
  )
}

export default styled(CloudinaryBackgroundVideo)(
  ({ theme }) => css`
    position: relative;
    > video {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
  `
)
