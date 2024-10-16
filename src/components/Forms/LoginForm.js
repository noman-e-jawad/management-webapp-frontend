import { useState } from 'react'
import { HiCheckCircle, HiExclamation } from 'react-icons/hi'
import { useUserContext } from '../../contexts/UserContext'
import { loginUser } from '../../http/http'
import styles from '../../styles/FormStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'

const initFormValues = () => ({
  email: '',
  password: '',
})

const LoginForm = () => {
  const [formValues, setFormValues] = useState(initFormValues())
  const [notification, setNotification] = useState({ type: '', text: '' })
  const { login } = useUserContext()

  const handleChange = (event) => {
    const { name, value } = event.target
    console.log(formValues)
    setFormValues((prev) => ({
      ...prev,
      [name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("this is handlesubmin")
    try {
      const response = await loginUser(formValues)
      console.log("Response from loginUser:", response)

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


  return (
    <div className={`${styles.wrapper} ${styles.hFull}`}>
      <div className={styles.formTitle}>
        <h2>Login to Dashboard</h2>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <button type="submit" className={themeStyles.primaryButton}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
