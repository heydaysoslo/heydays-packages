import React, { createContext } from 'react'

const defaultValue = {
  data: {}
}

const SanityContext = createContext(defaultValue)

export const SanityProvider = ({ data, children }) => {
  return (
    <SanityContext.Provider
      value={{
        data
      }}
    >
      {children}
    </SanityContext.Provider>
  )
}

export default SanityContext
