import { useState } from 'react'
import { HiCheckCircle, HiExclamation } from 'react-icons/hi'
import { requestPasswordReset } from '../../http/http'
import styles from '../../styles/FormStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'

const initFormValues = () => ({
  email: '',
})

const ResetPasswordRequestForm = () => {
  const [formValues, setFormValues] = useState(initFormValues())
  const [notification, setNotification] = useState({ type: '', text: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({
      ...prev,
      [name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await requestPasswordReset(formValues)
    } catch (error) {
      setNotification({ type: 'error', text: error.message })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formTitle}>
        <h2>Request A Reset Password Link</h2>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            placeholder="user@domain.tld"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formControl}>
          <button type="submit" className={themeStyles.primaryButton}>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordRequestForm
