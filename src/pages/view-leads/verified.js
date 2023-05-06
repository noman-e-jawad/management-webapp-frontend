import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import { getVerifiedLeads } from '../../http/http'
import { viewLeadsColumns } from '../../utils/dataTableColumns'

const ViewLeads = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getVerifiedLeads()
      .then((res) => {
        if (res.success) {
          setData(res.data)
        }
      })
      .catch()
  }, [])

  return (
    <>
      {' '}
      <div className="page__title__container">
        <h2 className="page__title">View Verified Sales Leads</h2>
      </div>
      {data && <DataTable columns={viewLeadsColumns} tableData={data} />}
    </>
  )
}

export default ViewLeads
