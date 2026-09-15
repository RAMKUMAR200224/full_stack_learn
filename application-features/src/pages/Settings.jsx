import { useTheme } from '../context/ThemeContext'

const Settings = () => {
  const {
    darkMode,
    toggleTheme
  } = useTheme()

  return (
    <div>

      <h2 className="page-title">
        Settings
      </h2>

      <div className="settings-card">

        <div className="setting-item">

          <div>

            <h3>
              Appearance
            </h3>

            <p>
              Switch between light and
              dark mode.
            </p>

          </div>

          <button
            className="primary-button"
            onClick={toggleTheme}
          >

            {darkMode
              ? 'Switch to Light'
              : 'Switch to Dark'}

          </button>

        </div>

      </div>

    </div>
  )
}

export default Settings