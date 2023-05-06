import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StuffDetails from '../../components/StuffDetails'
import { getStuffById } from '../../http/http'

const SingleStuff = () => {
  const router = useRouter()
  const [stuff, setStuff] = useState(null)

  useEffect(() => {
    getStuffById(router.query.id).then((res) => {
      setStuff(res.data)
    })
  }, [router.query.id])

  return stuff ? <StuffDetails stuff={stuff} /> : null
}

export default SingleStuff
