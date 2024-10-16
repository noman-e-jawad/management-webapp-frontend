import styles from '../styles/LeadDetails.module.css'
import { formatDate } from '../utils/formatDate'

const StuffDetails = ({ stuff }) => (
  <div className={styles.container}>
    <div className={styles.details_left__container}>
      <h2 className={styles.page__title}>Stuff Details</h2>
      <div className={styles.details__row}>
        <h3>Key</h3>
        <h3>Value</h3>
      </div>

      <div className={styles.details__row}>
        <p>Staff Name</p>
        <p>{stuff.name}</p>
      </div>
      <div className={`${styles.details__row} ${styles.email__row}`}>
        <p>Staff Email</p>
        <p>{stuff.email.toLowerCase()}</p>
      </div>
      <div className={styles.details__row}>
        <p>Staff Role</p>
        <p>{stuff.role}</p>
      </div>
      <div className={styles.details__row}>
        <p>Creation Date</p>
        <p>{formatDate(stuff.createdAt)}</p>
      </div>
    </div>
  </div>
)
export default StuffDetails
