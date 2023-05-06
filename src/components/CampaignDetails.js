import styles from '../styles/LeadDetails.module.css'

const CampaignDetails = ({ campaign, client }) => (
  <div className={styles.container}>
    <div className={styles.details_left__container}>
      <div className={styles.details__row}>
        <h3>Key</h3>
        <h3>Value</h3>
      </div>

      <div className={styles.details__row}>
        <p>Campaign Code Name</p>
        <p>{campaign.codeName}</p>
      </div>
      <div className={styles.details__row}>
        <p>Company Name</p>
        <p>{client.companyName}</p>
      </div>
    </div>
  </div>
)
export default CampaignDetails
