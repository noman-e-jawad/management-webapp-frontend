import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HiSpeakerphone } from 'react-icons/hi'
import { useUserContext } from '../contexts/UserContext'
import {
  getAllClients,
  getEntityClientCounts,
  getEntityCounts,
} from '../http/http'
// import { handleAuthSSR } from '../utils/auth'
import styles from '../styles/Dashboard.module.css'
import detailsStyles from '../styles/LeadDetails.module.css'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [campaigns, setCampaigns] = useState([])
  const { user } = useUserContext()

  useEffect(() => {
    if (user.role === 'client') {
      // do something
      getEntityClientCounts(user.email)
        .then((res) => setStats(res.data))
        .catch()
    } else {
      getEntityCounts()
        .then((res) => setStats(res.data))
        .catch()

      getAllClients().then((res) => setCampaigns(res.data))
    }
  }, [user.email, user.role])

  return (
    <>
      {user.role === 'client' ? (
        <div className={styles.statisticsContainer}>
          <div className={styles.box}>
            <h4>{stats.leads} leads</h4>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.statisticsContainer}>
            <div className={styles.box}>
              <h4>{stats.clients} clients</h4>
            </div>
            <div className={styles.box}>
              <h4>{stats.stuffs} stuffs</h4>
            </div>
            <div className={styles.box}>
              <h4>{stats.leads} leads</h4>
            </div>
            <div className={styles.box}>
              <h4>{stats.verifiedLeads} verified leads</h4>
            </div>
          </div>

          <div className={styles.campaignsContainer}>
            <h4>
              <HiSpeakerphone /> Available Campaigns
            </h4>
            {/* <div className={styles.campaigns}>
          {campaigns.map((campaign) => (
            <div className={styles.campaign__row}>
              <Link href={`/campaigns/${campaign._id}`} key={campaign._id}>
                <a>{campaign.campaignName}</a>
              </Link>
              <div className={styles.chip}>
                <span>{campaign.name}</span>
              </div>
            </div>
          ))}
        </div> */}
            <div>
              <div className={detailsStyles.details__row}>
                <h3>Campaign Name</h3>
                <h3>Client Name</h3>
                <h3>Company Name</h3>
                <h3>Company Email</h3>
              </div>
              {campaigns.map((campaign) => (
                <div className={detailsStyles.details__row} key={campaign._id}>
                  <Link href={`/campaigns/${campaign._id}`}>
                    <p className={styles.campaign__name}>
                      {campaign.campaignName}
                    </p>
                  </Link>
                  <p className={styles.chip}>
                    <span>{campaign.name}</span>
                  </p>
                  <p className={styles.chip}>
                    <span>{campaign.companyName}</span>
                  </p>
                  <p className={styles.chip}>
                    <span style={{ textTransform: 'lowercase' }}>
                      {campaign.email}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default Dashboard
