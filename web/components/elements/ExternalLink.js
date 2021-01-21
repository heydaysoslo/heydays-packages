import React from 'react'

const ExternalLink = ({ className, href, blank, children, linkText }) => {
  const linkProps = {
    target: blank ? '_blank' : null,
    rel: blank ? 'nofollow noopener' : null
  }
  return (
    <a className={className} {...linkProps} href={href}>
      {linkText || children || href}
    </a>
  )
}

export default ExternalLink
