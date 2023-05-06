import { useState } from 'react'
import { HiCheckCircle, HiExclamation } from 'react-icons/hi'
import { useThemeContext } from '../../contexts/ThemeContext'
import { createStuff, updateStuff } from '../../http/http'
import styles from '../../styles/FormStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'

const initFormValues = () => ({
  name: '',
  email: '',
  password: '',
  role: '',
})

const CreateStuffForm = ({ stuff }) => {
  const [formValues, setFormValues] = useState(stuff || initFormValues())
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
      if (stuff) {
        const response = await updateStuff(stuff._id, formValues)
        const { success, message } = response

        if (success) {
          setNotification({ type: 'success', text: message })
        } else {
          setNotification({ type: 'error', text: message })
        }
      } else {
        const initValues = initFormValues()
        setFormValues((prev) => ({ ...prev, ...initValues }))
        const response = await createStuff(formValues)
        const { success, message } = response

        if (success) {
          setNotification({ type: 'success', text: message })
        } else {
          setNotification({ type: 'error', text: message })
        }
      }
    } catch (error) {
      setNotification({ type: 'error', text: error.message })
    }
  }
  const { theme } = useThemeContext()
  return (
    <div
      className={
        theme.mode === 'dark'
          ? `${styles.wrapper} ${styles.dark__wrapper}`
          : `${styles.wrapper}`
      }
    >
      <div className={styles.formTitle}>
        <h2>{stuff ? 'Update Stuff' : 'Create Stuff'}</h2>
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            placeholder="John Doe"
            onChange={handleChange}
          />
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
          <label htmlFor="role">Role</label>
          <select name="role" value={formValues.role} onChange={handleChange}>
            <option value="" hidden>
              Select A Role
            </option>
            <option value="qc">Quality Control Manager</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <button type="submit" className={themeStyles.primaryButton}>
            {stuff ? 'Update Stuff' : 'Create Stuff'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateStuffForm
