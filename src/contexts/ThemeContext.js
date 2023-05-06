import { createContext, useContext, useEffect, useState } from 'react'

/* Context */
export const ThemeContext = createContext(null)

/* Provider */
export const ThemeProvider = ({ children }) => {
  /* Theme */
  const [theme, setTheme] = useState({
    mode: 'dark',
  })

  useEffect(() => {
    setTheme({ mode: localStorage.getItem('theme') || 'dark' })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/* Consumer Hook */
export const useThemeContext = () => useContext(ThemeContext)

export default ThemeProvider
