import {
  addComment,
  deleteCampaign,
  deleteCenter,
  deleteClient,
  deleteLead,
  deleteStuff,
  starLead,
  verifyLead,
} from '../http/http'

// Lead Actions
export const toggleVerifyLead = async (id, setTableData) => {
  await verifyLead(id)
  setTableData((prev) =>
    prev.map((row) => {
      if (row._id === id) {
        // eslint-disable-next-line no-param-reassign
        row.isVerified = row.isVerified === 'true' ? 'false' : 'true'
      }
      return row
    }),
  )
}

export const toggleStarLead = async (id, setTableData) => {
  await starLead(id)
  setTableData((prev) =>
    prev.map((row) => {
      if (row._id === id) {
        // eslint-disable-next-line no-param-reassign
        row.isStarred = row.isStarred === 'true' ? 'false' : 'true'
      }
      return row
    }),
  )
}

export const handleDeleteLead = async (id, tableData, setTableData) => {
  await deleteLead(id)
  const filteredData = tableData.filter((row) => row._id !== id)
  setTableData(filteredData)
}

export const handleCommentLead = async (id, commentText, setTableData) => {
  await addComment(id, commentText)

  setTableData((prev) =>
    prev.map((row) => {
      if (row._id === id) {
        // eslint-disable-next-line no-param-reassign
        row.agentComments = commentText
      }
      return row
    }),
  )
}

// Stuff Actions
export const handleDeleteStuff = async (id, tableData, setTableData) => {
  await deleteStuff(id)
  const filteredData = tableData.filter((row) => row._id !== id)
  setTableData(filteredData)
}

// Client Actions
export const handleDeleteClient = async (id, tableData, setTableData) => {
  await deleteClient(id)
  const filteredData = tableData.filter((row) => row._id !== id)
  setTableData(filteredData)
}

// Center Actions
export const handleDeleteCenter = async (id, tableData, setTableData) => {
  await deleteCenter(id)
  const filteredData = tableData.filter((row) => row._id !== id)
  setTableData(filteredData)
}
export const handleDeleteCampaign = async (id, tableData, setTableData) => {
  await deleteCampaign(id)
  const filteredData = tableData.filter((row) => row._id !== id)
  setTableData(filteredData)
}
