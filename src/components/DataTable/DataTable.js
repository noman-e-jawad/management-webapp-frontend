/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import styles from '../../styles/DataTable.module.css'
import Header from './Header'
import Pagination from './Pagination'
import RowsPerPage from './RowsPerPage'
import Table from './Table'

const initFormValues = () => ({
  query: '',
  startDate: '',
  endDate: '',
})

// get actions for current user
const getUserActions = (user, actions) => {
  let userActions = []

  if (user?.role === 'admin') {
    userActions = actions.admin
  } else if (user?.role === 'manager') {
    userActions = actions.manager
  } else if (user?.role === 'qc') {
    userActions = actions.qc
  } else if (user?.role === 'client') {
    userActions = actions.client
  }
  return userActions
}

const DataTable = ({ columns, tableData, actions }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [formValues, setFormValues] = useState(initFormValues())

  // Get current posts
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const [currentData, setCurrentData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const { user } = useUserContext()

  useEffect(() => {
    const filtered = filterData(tableData, formValues.query)
    const leads = filtered.slice(indexOfFirstRow, indexOfLastRow)
    setFilteredData(filtered)
    setCurrentData(leads)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tableData,
    formValues.query,
    currentPage,
    rowsPerPage,
    indexOfFirstRow,
    indexOfLastRow,
  ])

  const rowsPerPageOptions = [10, 20, 50, -1]

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Change RowsPerPage
  const handleRowsPerPageChange = (event) => {
    const value =
      event.target.value === '-1' ? tableData.length : event.target.value
    setRowsPerPage(value)
    setCurrentPage(1)
  }

  // set query in formvalue
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({
      ...prev,
      [name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())]: value,
    }))
  }

  // filter data
  const filterData = (_data, query) => {
    const keys = columns.map((column) => column.accessor)
    return tableData.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query)),
    )
  }

  return (
    <>
      <div className={styles.container}>
        <Header formValues={formValues} handleChange={handleChange} />
        <div className={styles.wrapper}>
          <Table
            columns={columns}
            data={currentData}
            actions={actions ? getUserActions(user, actions) : null}
          />
        </div>

        <div className={styles.footer}>
          <Pagination
            totalPosts={filteredData.length}
            paginate={paginate}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
          />
          {rowsPerPageOptions && (
            <RowsPerPage
              value={rowsPerPage}
              options={rowsPerPageOptions}
              onChangeHandler={handleRowsPerPageChange}
              totalRows={currentData.length}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default DataTable
