import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SortFilter from '../components/Forms/SortFilter'
import { useUserContext } from '../contexts/UserContext'
import { getAllLeads, getLeadsByCampaign, getLeadsByEmail } from '../http/http'

const FilterData = () => {
  const [data, setData] = useState([])
  const router = useRouter()
  const { user } = useUserContext()

  useEffect(() => {
    if (user.role === 'client') {
      getLeadsByEmail(user.email)
        .then((res) => {
          if (res.success) {
            setData(res.data)
          }
        })
        .catch()
    } else {
      getAllLeads()
        .then((res) => {
          if (res.success) {
            setData(res.data)
          }
        })
        .catch()
    }
    if (router.query.campaign) {
      getLeadsByCampaign(router.query.campaign)
        .then((res) => {
          if (res.success) {
            setData(res.data)
          }
        })
        .catch()
    }
  }, [router.query.campaign, user.email, user.role])
  return (
    <>
      <div className="page__title__container">
        <h2 className="page__title">Filter</h2>
      </div>
      {data && <SortFilter tableDatas={data} />}
    </>
  )
}

export default FilterData
