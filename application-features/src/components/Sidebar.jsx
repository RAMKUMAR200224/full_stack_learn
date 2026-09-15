import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">
          ◈
        </div>

        <div>
          <h2>APP</h2>
          <span>Application Features</span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="avatar">
          {user?.name?.charAt(0)}
        </div>

        <div>
          <strong>{user?.name}</strong>
          <p>{user?.role}</p>
        </div>
      </div>

      <nav className="nav-menu">

        <NavLink to="/dashboard">
          📊 Dashboard
        </NavLink>

        <NavLink to="/profile">
          👤 Profile Management
        </NavLink>

        <NavLink to="/users">
          🗂 Create / Read / Update / Delete
        </NavLink>

        <NavLink to="/notifications">
          🔔 Notifications
        </NavLink>

        <NavLink to="/settings">
          ⚙️ Settings
        </NavLink>

      </nav>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </aside>
  )
}

export default Sidebar