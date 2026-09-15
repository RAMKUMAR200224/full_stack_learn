import {
  useState
} from 'react'

import {
  useAuth
} from '../context/AuthContext'

const Profile = () => {
  const {
    user,
    updateProfile
  } = useAuth()

  const [name, setName] =
    useState(user?.name || '')

  const [email, setEmail] =
    useState(user?.email || '')

  const [message, setMessage] =
    useState('')

  const handleSubmit = event => {
    event.preventDefault()

    updateProfile({
      name,
      email
    })

    setMessage(
      'Profile updated successfully!'
    )
  }

  return (
    <div>

      <h2 className="page-title">
        Profile Management
      </h2>

      <div className="profile-card">

        <div className="large-avatar">
          {user?.name?.charAt(0)}
        </div>

        <form
          onSubmit={handleSubmit}
        >

          <label>
            Full Name
          </label>

          <input
            value={name}
            onChange={event =>
              setName(event.target.value)
            }
          />

          <label>
            Email
          </label>

          <input
            value={email}
            onChange={event =>
              setEmail(event.target.value)
            }
          />

          <label>
            Role
          </label>

          <input
            value={user?.role}
            disabled
          />

          <button
            className="primary-button"
          >
            Update Profile
          </button>

          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

        </form>

      </div>

    </div>
  )
}

export default Profile