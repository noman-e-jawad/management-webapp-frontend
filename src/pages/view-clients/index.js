import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import { getAllClients } from '../../http/http'
import { clientActions, viewClientsColumns } from '../../utils/dataTableColumns'

const ViewClients = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getAllClients()
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
        <h2 className="page__title">View Clients</h2>
      </div>
      {data ? (
        <DataTable
          columns={viewClientsColumns}
          tableData={data}
          actions={clientActions}
        />
      ) : null}
    </>
  )
}

export default ViewClients
