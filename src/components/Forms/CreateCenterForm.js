import { useState } from 'react'
import { HiCheckCircle, HiExclamation } from 'react-icons/hi'
import { useThemeContext } from '../../contexts/ThemeContext'
import { createCenter, updateCenter } from '../../http/http'
import styles from '../../styles/FormStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'

const initFormValues = () => ({
  centerName: '',
})

const CreateCenterForm = ({ center }) => {
  const [formValues, setFormValues] = useState(center || initFormValues())
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
      if (center) {
        // if center, update the existing center
        const response = await updateCenter(center._id, formValues)
        const { success, message } = response

        if (success) {
          setNotification({ type: 'success', text: message })
        } else {
          setNotification({ type: 'error', text: message })
        }
      } else {
        // if center is false, create new center
        const initValues = initFormValues()
        setFormValues((prev) => ({ ...prev, ...initValues }))
        const response = await createCenter(formValues)
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
        <h2>{center ? 'Update Center' : 'Create Center'}</h2>
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
          <label htmlFor="centerName">Center Name</label>
          <input
            type="text"
            id="name"
            name="centerName"
            value={formValues.centerName}
            placeholder="Enter Center Name"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formControl}>
          <button type="submit" className={themeStyles.primaryButton}>
            {center ? 'Update center' : 'Create center'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCenterForm
