export const setOverflowHidden = state => {
  document.body.style.overflow = state ? 'hidden' : ''
  // document.querySelector('html').style.overflow = state ? 'hidden' : ''
}

export const random = (min, max, { float = false } = {}) =>
  float
    ? Math.random() * (max - min) + min
    : Math.floor(Math.random() * (max - min)) + min

export const uniq: (arr: any[]) => any[] = arr => [...new Set(arr)]

export const removeTrailingSlash = string => {
  return string.replace(/\/$/, '')
}

export const toPlainText = (blocks, opts = {}) => {
  const options = Object.assign({}, { nonTextBehavior: 'remove' }, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}
