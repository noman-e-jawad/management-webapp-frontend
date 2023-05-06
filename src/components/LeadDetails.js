import styles from '../styles/LeadDetails.module.css'

const LeadDetails = ({ lead }) => (
  <div className={styles.container}>
    <div className={styles.details_left__container}>
      <h2 className={styles.page__title}>Lead Details</h2>
      <div className={styles.details__row}>
        <h3>Key</h3>
        <h3>Value</h3>
      </div>

      <div className={styles.details__row}>
        <p>Center Name</p>
        <p>{lead.centerName}</p>
      </div>

      <div className={styles.details__row}>
        <p>Campaign Name</p>
        <p>{lead.campaignName}</p>
      </div>

      <div className={styles.details__row}>
        <p>agent Name</p>
        <p>{lead.agentName}</p>
      </div>

      <div className={styles.details__row}>
        <p>company Name</p>
        <p>{lead.companyName}</p>
      </div>

      <div className={styles.details__row}>
        <p>contact person</p>
        <p>{lead.contactPerson}</p>
      </div>

      <div className={styles.details__row}>
        <p>street address</p>
        <p>{lead.companyAddress}</p>
      </div>

      <div className={styles.details__row}>
        <p>Zip Code</p>
        <p>{lead.zipCode}</p>
      </div>

      <div className={styles.details__row}>
        <p>Phone no.</p>
        <p>{lead.phone}</p>
      </div>

      <div className={styles.details__row}>
        <p>Alternative Phone No.</p>
        <p>{lead.altPhone}</p>
      </div>

      <div className={`${styles.details__row} ${styles.email__row}`}>
        <p>Email</p>
        <p>{lead.email}</p>
      </div>

      <div className={styles.details__row}>
        <p>Appointment Date</p>
        <p>{lead.appointmentDate}</p>
      </div>

      <div className={styles.details__row}>
        <p>Appointment Time</p>
        <p>{lead.appointmentTime}</p>
      </div>

      <div className={styles.details__row}>
        <p>Actively Seeking</p>
        {lead.activelySeeking.map((item, i) => {
          if (item === 'other') {
            return null
          }

          return i === 0 ? (
            <span key={item}>{item},</span>
          ) : (
            <span key={item}>&nbsp;&nbsp; {item},</span>
          )
        })}
        {lead.otherActivelySeeking === '' ? null : (
          <span> &nbsp;&nbsp; {lead.otherActivelySeeking} </span>
        )}
      </div>

      <div className={styles.details__row}>
        <p>Current Frequency</p>
        {lead.currentFrequency.map((item, i) => {
          if (item === 'other') {
            return null
          }

          return i === 0 ? (
            <span key={item}>{item},</span>
          ) : (
            <span key={item}>&nbsp;&nbsp; {item},</span>
          )
        })}
        {lead.otherCurrentFrequency === '' ? null : (
          <span> &nbsp;&nbsp; {lead.otherCurrentFrequency} </span>
        )}
      </div>

      <div className={styles.details__row}>
        <p>Agent Comments</p>
        <p>{lead.agentComments}</p>
      </div>
    </div>
  </div>
)
export default LeadDetails
