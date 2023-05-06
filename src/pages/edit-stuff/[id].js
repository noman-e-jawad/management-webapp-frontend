import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CreateStuffForm from '../../components/Forms/CreateStuffForm'
import { getStuffById } from '../../http/http'

const EditStuff = () => {
  const router = useRouter()
  const [stuff, setStuff] = useState(null)

  useEffect(() => {
    getStuffById(router.query.id).then((res) => {
      setStuff(res.data)
    })
  }, [router.query.id])

  return stuff ? <CreateStuffForm stuff={stuff} /> : null
}

export default EditStuff
