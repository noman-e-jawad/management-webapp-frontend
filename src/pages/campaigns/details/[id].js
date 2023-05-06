import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CampaignDetails from '../../../components/CampaignDetails'
import { getCampaignById, getClientById } from '../../../http/http'

const SingleCampaign = () => {
  const router = useRouter()
  const [campaign, setCampaign] = useState({})
  const [client, setClient] = useState({})

  useEffect(() => {
    if (router.query) {
      getCampaignById(router.query.id)
        .then((res) => {
          setCampaign(res.data)
          getClientById(res.data.client).then(({ data }) => setClient(data))
        })
        .catch()
    }
  }, [router.query])

  return campaign ? (
    <CampaignDetails campaign={campaign} client={client} />
  ) : null
}

export default SingleCampaign
