import {
  useState
} from 'react'

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ram',
      email: 'ram@example.com',
      role: 'Admin'
    },
    {
      id: 2,
      name: 'Arun',
      email: 'arun@example.com',
      role: 'User'
    },
    {
      id: 3,
      name: 'Kumar',
      email: 'kumar@example.com',
      role: 'User'
    }
  ])

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [role, setRole] =
    useState('User')

  const [search, setSearch] =
    useState('')

  const [filterRole, setFilterRole] =
    useState('All')

  const [editingId, setEditingId] =
    useState(null)

  const handleSubmit = event => {
    event.preventDefault()

    if (editingId) {
      setUsers(previous =>
        previous.map(user =>
          user.id === editingId
            ? {
                ...user,
                name,
                email,
                role
              }
            : user
        )
      )

      setEditingId(null)

    } else {
      const newUser = {
        id: Date.now(),
        name,
        email,
        role
      }

      setUsers(previous => [
        ...previous,
        newUser
      ])
    }

    setName('')
    setEmail('')
    setRole('User')
  }

  const handleEdit = user => {
    setEditingId(user.id)

    setName(user.name)
    setEmail(user.email)
    setRole(user.role)
  }

  const handleDelete = id => {
    setUsers(previous =>
      previous.filter(
        user => user.id !== id
      )
    )
  }

  const filteredUsers =
    users.filter(user => {

      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesRole =
        filterRole === 'All' ||
        user.role === filterRole

      return (
        matchesSearch &&
        matchesRole
      )
    })

  return (
    <div>

      <h2 className="page-title">
        User Management
      </h2>

      <div className="crud-form">

        <h3>
          {editingId
            ? 'Update User'
            : 'Create User'}
        </h3>

        <form
          onSubmit={handleSubmit}
        >

          <input
            placeholder="Name"
            value={name}
            onChange={event =>
              setName(event.target.value)
            }
            required
          />

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={event =>
              setEmail(event.target.value)
            }
            required
          />

          <select
            value={role}
            onChange={event =>
              setRole(event.target.value)
            }
          >

            <option>
              User
            </option>

            <option>
              Admin
            </option>

          </select>

          <button
            className="primary-button"
          >
            {editingId
              ? 'Update'
              : 'Create'}
          </button>

        </form>

      </div>

      <div className="table-controls">

        <input
          placeholder="Search users..."
          value={search}
          onChange={event =>
            setSearch(event.target.value)
          }
        />

        <select
          value={filterRole}
          onChange={event =>
            setFilterRole(event.target.value)
          }
        >

          <option value="All">
            All Roles
          </option>

          <option value="Admin">
            Admin
          </option>

          <option value="User">
            User
          </option>

        </select>

      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.map(user => (

              <tr key={user.id}>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  <span className="role-badge">
                    {user.role}
                  </span>
                </td>

                <td>

                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEdit(user)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(user.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Users