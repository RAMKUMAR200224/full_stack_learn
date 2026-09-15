import { useState } from 'react'
import {
  Link,
  useNavigate
} from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const navigate = useNavigate()

  const { signup } = useAuth()

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [error, setError] =
    useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const result = signup({
      name,
      email,
      password
    })

    if (result.success) {
      navigate('/login')
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

        <h1>Create Account</h1>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={event =>
            setName(event.target.value)
          }
          required
        />

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
          className="primary-button"
          type="submit"
        >
          Create Account
        </button>

        <p className="auth-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Signup