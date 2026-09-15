import { useState } from 'react'

const Notifications = () => {
  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        message:
          'Welcome to the application!',
        read: false
      },
      {
        id: 2,
        message:
          'Your profile was updated.',
        read: false
      },
      {
        id: 3,
        message:
          'New system update available.',
        read: true
      }
    ])

  const markAsRead = id => {
    setNotifications(previous =>
      previous.map(notification =>
        notification.id === id
          ? {
              ...notification,
              read: true
            }
          : notification
      )
    )
  }

  return (
    <div>

      <h2 className="page-title">
        Notifications
      </h2>

      <div className="notification-list">

        {notifications.map(
          notification => (

            <div
              key={notification.id}
              className={
                notification.read
                  ? 'notification read'
                  : 'notification'
              }
            >

              <div>

                <h4>
                  🔔 Notification
                </h4>

                <p>
                  {notification.message}
                </p>

              </div>

              {!notification.read && (

                <button
                  onClick={() =>
                    markAsRead(
                      notification.id
                    )
                  }
                >
                  Mark as Read
                </button>

              )}

            </div>

          )
        )}

      </div>

    </div>
  )
}

export default Notifications