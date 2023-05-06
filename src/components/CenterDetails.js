import styles from '../styles/LeadDetails.module.css'

const CenterDetails = ({ center }) => (
  <div className={styles.container}>
    <div className={styles.details_left__container}>
      <h2 className={styles.page__title}>Stuff Details</h2>
      <div className={styles.details__row}>
        <h3>Key</h3>
        <h3>Value</h3>
      </div>

      <div className={styles.details__row}>
        <p>Center Name</p>
        <p>{center.centerName}</p>
      </div>
    </div>
  </div>
)
export default CenterDetails
