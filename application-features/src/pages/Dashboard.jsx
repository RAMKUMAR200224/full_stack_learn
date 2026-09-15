const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,245',
      icon: '👥'
    },
    {
      title: 'Active Users',
      value: '1,018',
      icon: '🟢'
    },
    {
      title: 'Notifications',
      value: '24',
      icon: '🔔'
    },
    {
      title: 'System Status',
      value: 'Healthy',
      icon: '✅'
    }
  ]

  return (
    <div>

      <h2 className="page-title">
        Dashboard
      </h2>

      <div className="stats-grid">

        {stats.map(stat => (
          <div
            className="stat-card"
            key={stat.title}
          >

            <div className="stat-icon">
              {stat.icon}
            </div>

            <p>
              {stat.title}
            </p>

            <h2>
              {stat.value}
            </h2>

          </div>
        ))}

      </div>

      <div className="dashboard-card">

        <h3>
          Application Overview
        </h3>

        <p>
          Your application is running
          successfully. Use the sidebar to
          manage users, profile, settings
          and notifications.
        </p>

      </div>

    </div>
  )
}

export default Dashboard