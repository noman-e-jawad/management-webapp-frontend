import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CreateCenterForm from '../../../components/Forms/CreateCenterForm'
import { getCenterById } from '../../../http/http'

const EditCenter = () => {
  const router = useRouter()
  const [center, setCenter] = useState(null)

  useEffect(() => {
    if (router.query) {
      getCenterById(router.query.id).then((res) => {
        setCenter(res.data)
      })
    }
  }, [router.query])

  return center ? <CreateCenterForm center={center} /> : null
}

export default EditCenter
