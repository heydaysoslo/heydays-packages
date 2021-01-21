import seoConfig from 'lib/seoConfig'

// Routes for all generated pages
export const routes = {
  page: ({ slug }) => {
    return `/${slug.current}`
  },
  article: ({ slug }) => {
    return `/articles/${slug.current}`
  },
  frontpage: () => {
    return `/`
  }
}

export const resolveRoute = doc => {
  const type = doc?._type
  if (!type) {
    console.warn(`_type not defined`, doc)
    return null
  }

  const route = routes[type]
  if (route && typeof route === 'function') {
    return route(doc)
  }

  console.warn(`Could not resolve route`, doc)
  return '/'
}

export const getCanonical = doc => {
  return `${seoConfig.siteUrl}${resolveRoute(doc)}`
}

export const docTypes = {
  illustrator: {
    ogType: 'website'
  },
  page: {
    ogType: 'website'
  },
  post: {
    ogType: 'article'
  },
  article: {
    ogType: 'article'
  },
  blogCategory: {
    ogType: 'website'
  }
}

export const getOgType = node => {
  if (node._type && docTypes[node._type]) {
    return docTypes[node._type].ogType ? docTypes[node._type].ogType : 'website'
  }
}
