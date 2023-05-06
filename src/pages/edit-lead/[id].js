import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RiseLoader from 'react-spinners/RiseLoader'
import CreateLeadForm from '../../components/Forms/CreateLeadForm'
import { getLeadById } from '../../http/http'

const EditLead = () => {
  const [loading, setLoading] = useState(true)
  const [lead, setLead] = useState(null)
  const [notification, setNotification] = useState('')
  const router = useRouter()
  const { id } = router.query
  const getLead = async () => {
    const response = await getLeadById(id)
    return response
  }

  useEffect(() => {
    getLead()
      .then((res) => {
        if (res.success) {
          setLead(res.data)
        } else {
          setNotification(res.message)
        }
        setLoading(false)
      })
      .catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  }

  if (loading) {
    return <RiseLoader color="green" loading={loading} cssOverride={override} />
  }

  return !loading && lead ? (
    <CreateLeadForm lead={lead} />
  ) : (
    notification && notification !== '' && <h1>{notification}</h1>
  )
}

export default EditLead
