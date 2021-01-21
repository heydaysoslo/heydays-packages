import React from 'react'
import ExternalLink from '@heydays/ExternalLink'
import InternalLink from '@heydays/InternalLink'
import SanityButton from '@heydays/SanityButton'

const types = {
  button: SanityButton,
  internalLink: InternalLink,
  link: ExternalLink
}

const NavItemResolver = ({ className = '', item }) => {
  const Component = types[item._type] || null
  if (!Component) {
    console.warn(`Could not resolve nav item of type ${item._type}`)
    return null
  }
  return <Component className={className} {...item} />
}

export default NavItemResolver
