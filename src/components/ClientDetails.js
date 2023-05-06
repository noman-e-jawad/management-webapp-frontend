import styles from '../styles/LeadDetails.module.css'
import { formatDate } from '../utils/formatDate'

const ClientDetails = ({ client }) => (
  <div className={styles.container}>
    <div className={styles.details_left__container}>
      <h2 className={styles.page__title}>Client Details</h2>
      <div className={styles.details__row}>
        <h3>Key</h3>
        <h3>Value</h3>
      </div>

      <div className={styles.details__row}>
        <p>Client Name</p>
        <p>{client.name}</p>
      </div>
      <div className={`${styles.details__row} ${styles.email__row}`}>
        <p>Client Email</p>
        <p>{client.email}</p>
      </div>
      <div className={styles.details__row}>
        <p>Company Name</p>
        <p>{client.companyName}</p>
      </div>
      <div className={styles.details__row}>
        <p>Company Address</p>
        <p>{client.companyAddress}</p>
      </div>
      <div className={styles.details__row}>
        <p>Campaign Name</p>
        <p>{client.campaignName}</p>
      </div>
      <div className={styles.details__row}>
        <p>Creation Date</p>
        <p>{formatDate(client.createdAt)}</p>
      </div>
    </div>
  </div>
)
export default ClientDetails
