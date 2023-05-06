import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LeadDetails from '../../components/LeadDetails'
import { getLeadById } from '../../http/http'

const SingleLead = () => {
  const router = useRouter()
  const [lead, setLead] = useState(null)

  useEffect(() => {
    getLeadById(router.query.id).then((res) => {
      setLead(res.data)
    })
  }, [router.query.id])

  return lead ? <LeadDetails lead={lead} /> : <h1>No Lead Found</h1>
}

export default SingleLead
