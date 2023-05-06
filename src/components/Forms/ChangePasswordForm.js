import { useState } from 'react'
import { HiCheckCircle, HiExclamation } from 'react-icons/hi'
import { useUserContext } from '../../contexts/UserContext'
import { changePassword } from '../../http/http'
import styles from '../../styles/FormStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'

const initFormValues = () => ({
  newPassword: '',
  confirmPassword: '',
})

const ChangePasswordForm = ({ token, id }) => {
  const [formValues, setFormValues] = useState(initFormValues())
  const [notification, setNotification] = useState({ type: '', text: '' })
  const { login } = useUserContext()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({
      ...prev,
      [name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (formValues.newPassword !== formValues.confirmPassword) {
      setNotification({ type: 'error', text: 'Passwords Do not Match' })
    } else {
      try {
        const response = await changePassword(token, id, formValues.newPassword)
        const { success, data, message } = response
        if (success) {
          await login(data)
          setNotification({ type: 'success', text: message })
        } else {
          setNotification({ type: 'error', text: message })
        }
      } catch (error) {
        setNotification({ type: 'error', text: error.message })
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formTitle}>
        <h2>Change Password</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formControl}>
          {notification.text !== '' && (
            <div
              className={
                notification.type === 'success'
                  ? `${styles.formMessage} ${styles.success}`
                  : styles.formMessage
              }
            >
              {notification.type === 'success' ? (
                <HiCheckCircle />
              ) : (
                <HiExclamation />
              )}
              <span>{notification.text} </span>
            </div>
          )}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="email">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formValues.newPassword}
            placeholder="Enter Your New Password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="email">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formValues.confirmPassword}
            placeholder="Confirm Your New Password"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formControl}>
          <button type="submit" className={themeStyles.primaryButton}>
            Change Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordForm
