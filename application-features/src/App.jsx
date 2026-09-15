import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import Unauthorized from './pages/Unauthorized'

const AppLayout = ({
  children
}) => {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="page-content">
          {children}
        </div>

      </main>

    </div>
  )
}

const App = () => {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute
            roles={[
              'admin',
              'user'
            ]}
          >
            <AppLayout>
              <Users />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Notifications />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Settings />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
          />
        }
      />

    </Routes>
  )
}

export default App