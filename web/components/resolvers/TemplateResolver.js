import React from 'react'
import dynamic from 'next/dynamic'

const templates = {
  frontpage: dynamic(() => import('../pages/FrontPage')),
  contact: dynamic(() => import('../pages/ContactPage')),
  news: dynamic(() => import('../pages/NewsPage')),
  default: dynamic(() => import('../pages/Page'))
}

const types = {
  article: dynamic(() => import('../pages/Article'))
}

export default function TemplateResolver({ page }) {
  let Component = null

  // Check if we a page template is defined
  if (templates[page?.template]) {
    Component = templates[page.template]
  }

  // If no template name is set, resolve to type
  if (!Component) {
    if (page?._type && types[page._type]) {
      Component = types[page._type]
    }
  }

  // If we still don't have a component, resolve to default
  if (!Component) {
    Component = templates.default
  }

  return <Component {...page} />
}
