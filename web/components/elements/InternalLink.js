import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { resolveRoute } from 'routes'

const InternalLink = ({ className, children, reference, linkText }) => {
  if (!reference?._type) {
    return children || null
  }
  const router = useRouter()
  const href = resolveRoute(reference)
  const isActive = router.asPath === href
  return (
    <Link href={href}>
      <a aria-current={isActive && 'page'} className={className}>
        {linkText || children || reference?.title}
      </a>
    </Link>
  )
}

export default InternalLink
