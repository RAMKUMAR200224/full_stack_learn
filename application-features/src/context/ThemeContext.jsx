import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme')

    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.body.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setDarkMode(previous => {
      const newTheme = !previous

      document.body.classList.toggle(
        'dark',
        newTheme
      )

      localStorage.setItem(
        'theme',
        newTheme ? 'dark' : 'light'
      )

      return newTheme
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}