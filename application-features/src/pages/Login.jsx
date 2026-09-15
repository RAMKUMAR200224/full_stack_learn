import { useState } from 'react'
import {
  Link,
  useNavigate
} from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()

  const { login } = useAuth()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [error, setError] =
    useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const result = login(
      email,
      password
    )

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-container">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h1>Welcome Back</h1>

        <p>
          Login to continue
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={event =>
            setEmail(event.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={event =>
            setPassword(event.target.value)
          }
          required
        />

        <button
          type="submit"
          className="primary-button"
        >
          Login
        </button>

        <p className="auth-link">
          Don't have an account?

          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </form>

    </div>
  )
}

export default Login