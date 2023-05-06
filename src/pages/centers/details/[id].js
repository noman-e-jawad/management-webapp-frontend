import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CenterDetails from '../../../components/CenterDetails'
import { getCenterById } from '../../../http/http'

const SingleCenter = () => {
  const router = useRouter()
  const [center, setCenter] = useState(null)

  useEffect(() => {
    if (router.query) {
      getCenterById(router.query.id).then((res) => {
        setCenter(res.data)
      })
    }
  }, [router.query])

  return center ? <CenterDetails center={center} /> : null
}

export default SingleCenter
