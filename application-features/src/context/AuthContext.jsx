import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('app_user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const foundUser = users.find(
      user =>
        user.email === email &&
        user.password === password
    )

    if (!foundUser) {
      return {
        success: false,
        message: 'Invalid email or password'
      }
    }

    localStorage.setItem(
      'app_user',
      JSON.stringify(foundUser)
    )

    setUser(foundUser)

    return {
      success: true
    }
  }

  const signup = ({
    name,
    email,
    password
  }) => {
    const users =
      JSON.parse(localStorage.getItem('users')) || []

    const existingUser = users.find(
      user => user.email === email
    )

    if (existingUser) {
      return {
        success: false,
        message: 'User already exists'
      }
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user'
    }

    localStorage.setItem(
      'users',
      JSON.stringify([...users, newUser])
    )

    return {
      success: true
    }
  }

  const updateProfile = updatedData => {
    const users =
      JSON.parse(localStorage.getItem('users')) || []

    const updatedUser = {
      ...user,
      ...updatedData
    }

    const updatedUsers = users.map(item =>
      item.id === user.id
        ? updatedUser
        : item
    )

    localStorage.setItem(
      'users',
      JSON.stringify(updatedUsers)
    )

    localStorage.setItem(
      'app_user',
      JSON.stringify(updatedUser)
    )

    setUser(updatedUser)
  }

  const logout = () => {
    localStorage.removeItem('app_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}