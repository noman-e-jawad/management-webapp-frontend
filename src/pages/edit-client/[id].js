import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CreateClientForm from '../../components/Forms/CreateClientForm'
import { getClientById } from '../../http/http'

const EditClient = () => {
  const router = useRouter()
  const [client, setClient] = useState(null)

  useEffect(() => {
    getClientById(router.query.id).then((res) => {
      setClient(res.data)
    })
  }, [router.query.id])

  return client ? <CreateClientForm client={client} /> : null
}

export default EditClient
