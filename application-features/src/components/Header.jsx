import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { darkMode, toggleTheme } =
    useTheme()

  const { user } = useAuth()

  return (
    <header className="header">

      <div>
        <h1>
          Welcome, {user?.name}
        </h1>

        <p>
          Manage your application from one place
        </p>
      </div>

      <button
        className="theme-button"
        onClick={toggleTheme}
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>

    </header>
  )
}

export default Header