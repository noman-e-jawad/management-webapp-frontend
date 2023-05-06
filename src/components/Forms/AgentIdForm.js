import { useState } from 'react'
import { HiCheckCircle, HiExclamation } from 'react-icons/hi'
import styles from '../../styles/FormStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'
import { checkStuffValidity } from '../../utils/checkStuffValidity'

const initFormValues = () => ({
  agentId: '',
})

const AgentIdForm = ({ setAgentId }) => {
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
    if (checkStuffValidity(formValues.agentId)) {
      localStorage.setItem('agentId', formValues.agentId)
      setAgentId(formValues.agentId)
    } else {
      setNotification({
        text: 'Invalid Agent Id',
        type: 'error',
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formTitle}>
        <h2>Enter Agent Id</h2>
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
          <label htmlFor="agentId">Enter Agent ID</label>
          <input
            type="text"
            id="agentId"
            name="agentId"
            value={formValues.agentId}
            placeholder="Enter Your Agent Id"
            onChange={handleChange}
            maxLength={5}
            minLength={5}
          />
        </div>

        <div className={styles.formControl}>
          <button type="submit" className={themeStyles.primaryButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AgentIdForm
