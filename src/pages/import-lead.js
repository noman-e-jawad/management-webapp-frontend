import { useState } from 'react'
import DataTable from '../components/DataTable/DataTable'
import ImportLeadTool from '../components/ImportLeadTool'
import { importLead } from '../http/http'
import { viewLeadsColumns } from '../utils/dataTableColumns'

const ImportLead = () => {
  const [data, setData] = useState(null)

  const onFileUploaded = (sheetData) => {
    if (sheetData) {
      setData(sheetData)
    } else {
      setData(null)
    }
  }

  const importHandler = async () => {
    await importLead(data)
  }
  return (
    <>
      <ImportLeadTool
        onFileUploaded={onFileUploaded}
        enableImport={!!data}
        onImport={importHandler}
      />

      {data && <DataTable columns={viewLeadsColumns} tableData={data} />}
    </>
  )
}

export default ImportLead
