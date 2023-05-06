import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HiCheckCircle, HiExclamation } from 'react-icons/hi'
import { useThemeContext } from '../../contexts/ThemeContext'
import {
  createLead,
  getAllCampaigns,
  getAllCenters,
  updateLead,
} from '../../http/http'
import styles from '../../styles/FormStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'
import MultiSelectDropdown from './MultiSelectDropdown'
import SingleSelectDropdown from './SingleSelectDropdown'
const initFormValues = () => ({
  centerName: '',
  campaignName: '',
  agentName: '',
  companyName: '',
  contactPerson: '',
  companyAddress: '',
  zipCode: '',
  email: '',
  phone: '',
  altPhone: '',
  appointmentDate: '',
  appointmentTime: '',
  activelySeeking: [],
  otherActivelySeeking: '',
  currentFrequency: [],
  otherCurrentFrequency: '',
})

const CreateLeadForm = ({ lead }) => {
  const [formValues, setFormValues] = useState(lead || initFormValues())
  const [notification, setNotification] = useState({ type: '', text: '' })
  const [centers, setCenters] = useState([])
  const [campaign, setCampaign] = useState([])
  const router = useRouter()
  const { theme } = useThemeContext()

  useEffect(() => {
    getAllCenters()
      .then((res) => {
        setCenters(res.data)
      })
      .catch()
    getAllCampaigns()
      .then((res) => {
        setCampaign(res.data)
      })
      .catch()
  }, [])

  /*   const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({
      ...prev,
      [name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())]: value,
    }))
  } */
  const handleChange = (event) => {
    const { name, value } = event.target
    let newFormValues = {
      ...formValues,
      [name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())]: value,
    }
    if (name === 'activelySeeking' || name === 'currentFrequency') {
      newFormValues = updateFormValues(newFormValues)
    } else if (name === 'otherCurrentFrequency') {
      newFormValues = updateFormValues(newFormValues, 'currentFrequency')
    }
    setFormValues(newFormValues)
  }
  const updateFormValues = (nformValues) => {
    const newFormValues = { ...nformValues }
    if (
      nformValues.activelySeeking.includes('other') &&
      nformValues.otherActivelySeeking
    ) {
      const otherValue = nformValues.otherActivelySeeking
      const updatedValue = nformValues.activelySeeking.map((value) =>
        value === 'other' ? otherValue : value,
      )
      newFormValues.activelySeeking = updatedValue
      // delete newFormValues.otherActivelySeeking
    }
    if (
      nformValues.currentFrequency.includes('other') &&
      nformValues.otherCurrentFrequency
    ) {
      const otherValue = nformValues.otherCurrentFrequency
      const updatedValue = nformValues.currentFrequency.map((value) =>
        value === 'other' ? otherValue : value,
      )
      newFormValues.currentFrequency = updatedValue
      // delete newFormValues.otherCurrentFrequency
    }
    return newFormValues
  }

  console.log(formValues)
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (lead) {
        const response = await updateLead(lead._id, formValues)
        const { success, message } = response

        if (success) {
          setNotification({ type: 'success', text: message })
        } else {
          setNotification({ type: 'error', text: message })
        }
      } else {
        const response = await createLead(formValues)
        const { success, message } = response

        if (success) {
          setNotification({ type: 'success', text: message })
        } else {
          setNotification({ type: 'error', text: message })
        }
        router.reload()
      }
    } catch (error) {
      setNotification({ type: 'error', text: error.message })
    }
  }
  return (
    <div
      className={
        theme.mode === 'dark'
          ? `${styles.wrapper} ${styles.dark__wrapper}`
          : `${styles.wrapper}`
      }
    >
      <div className={styles.formTitle}>
        <h2>{lead ? 'Update Lead' : 'Create Lead'}</h2>
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
          <SingleSelectDropdown
            name="centerName"
            options={centers.map((item) => ({
              label: item.centerName,
              value: item.centerName,
            }))}
            value={formValues.centerName}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="campaignName">Campaign Name</label>
          <SingleSelectDropdown
            name="campaignName"
            options={campaign.map((item) => ({
              label: item.codeName,
              value: item.codeName,
            }))}
            value={formValues.campaignName}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="agentName">Agent Name</label>
          <input
            type="text"
            id="agentName"
            name="agentName"
            value={formValues.agentName}
            placeholder="Enter Agent Name"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formValues.companyName}
            placeholder="Enter Company Name"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="contactPerson">Contact Person</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formValues.contactPerson}
            placeholder="Enter Contact Person Name"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="companyAddress">Company Address</label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={formValues.companyAddress}
            placeholder="Enter Company Address"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="number"
            id="zipCode"
            name="zipCode"
            value={formValues.zipCode}
            placeholder="Enter Zip Code"
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
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formValues.phone}
            placeholder="+880 1XXX XXXXXX"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="altPhone">Alternative Phone Numer</label>
          <input
            type="number"
            id="altPhone"
            name="altPhone"
            value={formValues.altPhone}
            placeholder="+880 1XXX XXXXXX"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="appointmentDate">Appointment Date</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formValues.appointmentDate}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="appointmentTime">Enter Appointment Time</label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={formValues.appointmentTime}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="activelySeeking">Actively Seeking</label>
          <MultiSelectDropdown
            options={[
              { label: '1x/week', value: '1x/week' },
              { label: '2x/week', value: '2x/week' },
              { label: '3x/week', value: '3x/week' },
              { label: '4x/week', value: '4x/week' },
              { label: '5x/week', value: '5x/week' },
              { label: '6x/week', value: '6x/week' },
              { label: '7x/week', value: '7x/week' },
              { label: 'other', value: 'other' },
            ]}
            name="activelySeeking"
            onChange={(event) => handleChange(event)}
            value={formValues.activelySeeking}
          />
        </div>
        {/* Dyamic Hidden Field */}
        {formValues?.activelySeeking?.includes('other') ? (
          <div className={styles.formControl}>
            <label htmlFor="otherActivelySeeking">Enter Other Frequency</label>
            <input
              type="text"
              id="otherActivelySeeking"
              name="otherActivelySeeking"
              value={formValues.otherActivelySeeking}
              placeholder="Enter Other Frequency"
              onChange={handleChange}
              required
            />
          </div>
        ) : null}
        {/* Dyamic Hidden Field */}
        <div className={styles.formControl}>
          <label htmlFor="currentFrequency">Current Frequency</label>
          <MultiSelectDropdown
            options={[
              { label: '1x/week', value: '1x/week' },
              { label: '2x/week', value: '2x/week' },
              { label: '3x/week', value: '3x/week' },
              { label: '4x/week', value: '4x/week' },
              { label: '5x/week', value: '5x/week' },
              { label: '6x/week', value: '6x/week' },
              { label: '7x/week', value: '7x/week' },
              { label: 'other', value: 'other' },
            ]}
            value={formValues.currentFrequency}
            name="currentFrequency"
            onChange={(event) => handleChange(event)}
          />
        </div>
        {/* Dyamic Hidden Field */}
        {formValues?.currentFrequency?.includes('other') ? (
          <div className={styles.formControl}>
            <label htmlFor="otherCurrentFrequency">Enter Other Frequency</label>
            <input
              type="text"
              id="otherCurrentFrequency"
              name="otherCurrentFrequency"
              value={formValues.otherCurrentFrequency}
              placeholder="Enter Other Frequency"
              onChange={handleChange}
              required
            />
          </div>
        ) : null}
        {/* Dyamic Hidden Field */}
        <div className={styles.formControl}>
          <button type="submit" className={themeStyles.primaryButton}>
            {lead ? 'Update Lead' : 'Create Lead'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateLeadForm
