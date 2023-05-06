import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import { getAllCampaigns } from '../../http/http'
import {
  campaignActions,
  viewCampaignColumns,
} from '../../utils/dataTableColumns'

const Campaigns = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getAllCampaigns()
      .then((res) => {
        if (res.success) {
          setData(res.data)
        }
      })
      .catch()
  }, [])

  return (
    <>
      <div className="page__title__container">
        <h2 className="page__title">View Campaign</h2>
      </div>
      {data && (
        <DataTable
          columns={viewCampaignColumns}
          tableData={data}
          actions={campaignActions}
        />
      )}
    </>
  )
}

export default Campaigns
