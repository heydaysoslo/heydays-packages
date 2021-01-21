import { useEffect, useState } from 'react'

const useIsDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null)

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  return isDarkMode
}

export default useIsDarkMode
