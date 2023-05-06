import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CreateCampaignForm from '../../../components/Forms/CreateCampaignForm'
import { getCampaignById } from '../../../http/http'

const EditCampaign = () => {
  const router = useRouter()
  const [campaign, setCampaign] = useState(null)

  useEffect(() => {
    if (router.query) {
      getCampaignById(router.query.id).then((res) => {
        setCampaign(res.data)
      })
    }
  }, [router.query])

  return campaign ? <CreateCampaignForm campaign={campaign} /> : null
}

export default EditCampaign
