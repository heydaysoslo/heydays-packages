import React from 'react'
import InternalLink from '@heydays/InternalLink'

const LinkResolver = ({ link, className, children, ...props }) => {
  if (link?._type) {
    return (
      <InternalLink className={className} reference={link}>
        {children}
      </InternalLink>
    )
  }
  // Currently no resolving for external link as it's not used anywhere
  return (children && <div className={className}>{children}</div>) || null
}

export default LinkResolver
