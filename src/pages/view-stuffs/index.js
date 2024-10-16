import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import { getAllStuffs } from '../../http/http'
import { stuffActions, viewStuffsColumns } from '../../utils/dataTableColumns'

const ViewLeads = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getAllStuffs()
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
        <h2 className="page__title">View Staff</h2>
      </div>
      {data && (
        <DataTable
          columns={viewStuffsColumns}
          tableData={data}
          actions={stuffActions}
        />
      )}
    </>
  )
}

export default ViewLeads
