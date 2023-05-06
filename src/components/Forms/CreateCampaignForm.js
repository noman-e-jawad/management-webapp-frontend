import { useEffect, useState } from 'react'
import { HiCheckCircle, HiExclamation } from 'react-icons/hi'
import { useThemeContext } from '../../contexts/ThemeContext'
import { createCampaign, getAllClients, updateCampaign } from '../../http/http'
import styles from '../../styles/FormStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'
import SingleSelectDropdown from './SingleSelectDropdown'

const initFormValues = () => ({
  codeName: '',
  companyName: '',
})

const CreateCampaignForm = ({ campaign }) => {
  const [formValues, setFormValues] = useState(campaign || initFormValues())
  const [notification, setNotification] = useState({ type: '', text: '' })
  const [clients, setClients] = useState([])

  useEffect(() => {
    getAllClients()
      .then((res) => setClients(res.data))
      .catch()
  }, [])

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
      if (campaign) {
        // if campaign, update the existing campaign
        const response = await updateCampaign(campaign._id, {
          codeName: formValues.codeName,
        })
        const { success, message } = response

        if (success) {
          setNotification({ type: 'success', text: message })
        } else {
          setNotification({ type: 'error', text: message })
        }
      } else {
        // if campaign is false, create new campaign
        const initValues = initFormValues()
        setFormValues((prev) => ({ ...prev, ...initValues }))
        const response = await createCampaign(formValues)
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
        <h2>{campaign ? 'Update Campaign' : 'Create Campaign'}</h2>
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

        {campaign ? null : (
          <div className={styles.formControl}>
            <label htmlFor="client">Select Company</label>
            <SingleSelectDropdown
              name="companyName"
              options={clients.map((item) => ({
                label: item.companyName,
                value: item.companyName,
              }))}
              value={formValues.companyName}
              onChange={(event) => handleChange(event)}
              key={formValues.companyName}
            />
          </div>
        )}

        <div className={styles.formControl}>
          <label htmlFor="name">Campaign Code Name</label>
          <input
            type="text"
            id="codeName"
            name="codeName"
            value={formValues.codeName}
            placeholder="Enter Campaign Code Name"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formControl}>
          <button type="submit" className={themeStyles.primaryButton}>
            {campaign ? 'Update campaign' : 'Create campaign'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCampaignForm
