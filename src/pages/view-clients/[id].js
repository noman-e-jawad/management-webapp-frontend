import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ClientDetails from '../../components/ClientDetails'
import { getClientById } from '../../http/http'

const SingleClient = () => {
  const router = useRouter()
  const [client, setClient] = useState(null)

  useEffect(() => {
    getClientById(router.query.id).then((res) => {
      setClient(res.data)
    })
  }, [router.query.id])

  return client ? <ClientDetails client={client} /> : null
}

export default SingleClient
