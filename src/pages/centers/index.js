import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import { getAllCenters } from '../../http/http'
import { centerActions, viewCentersColumns } from '../../utils/dataTableColumns'

const Centers = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getAllCenters()
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
        <h2 className="page__title">View Centers</h2>
      </div>
      {data && (
        <DataTable
          columns={viewCentersColumns}
          tableData={data}
          actions={centerActions}
        />
      )}
    </>
  )
}

export default Centers
