import React, { createContext, useState } from 'react'
import { setOverflowHidden } from 'utils/helpers'

const initialState = {
  isMenuOpen: false,
  darkTheme: false
}

const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  return (
    <AppContext.Provider
      value={{
        state: state,
        actions: {
          toggleDarkTheme: () => {
            setState({
              ...state,
              darkTheme: !state.darkTheme
            })
          },
          toggleMenu: condition => {
            const toggledState = !state.isMenuOpen
            setOverflowHidden(condition ? condition : toggledState)
            setState({
              ...state,
              isMenuOpen: condition ? condition : toggledState
            })
          }
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
