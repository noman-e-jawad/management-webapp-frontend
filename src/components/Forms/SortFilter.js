import { useEffect, useState } from 'react'
import {
  getAllAgentNames,
  getAllCampaigns,
  getAllCenters,
  getSortSalesLeads,
} from '../../http/http'
import filterStyles from '../../styles/FilterStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'
import { leadActions, viewLeadsColumns } from '../../utils/dataTableColumns'
import DataTable from '../DataTable/DataTable'
import SingleSelectDropdown from './SingleSelectDropdown'

const SortFilter = ({ tableDatas }) => {
  const [sortFilter, setSortFilter] = useState([])
  const [centers, setCenters] = useState([])
  const [campaign, setCampaign] = useState([])
  const [agentName, setAgentName] = useState([])
  const [message, setMessage] = useState('') // success massege
  const [reset, setReset] = useState(false) // <-- add reset state

  const [filterFormValues, setFilterFormValues] = useState({})
  useEffect(() => {
    getAllCenters()
      .then((res) => {
        setCenters(res.data)
      })
      .catch()

    getAllCampaigns()
      .then((res) => {
        setCampaign(res.data)
      })
      .catch()

    getAllAgentNames()
      .then((res) => {
        setAgentName(res.data)
      })
      .catch()
    const fetchData = async () => {
      getSortSalesLeads(filterFormValues)
        .then((res) => {
          setSortFilter(res.data)
          setMessage(res.message)
        })
        .catch(Error)
    }
    fetchData()
  }, [filterFormValues])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilterFormValues((prev) => {
      const newState = {
        ...prev,
        [name]: value,
      }
      Object.keys(newState).forEach((key) => {
        if (!newState[key]) {
          delete newState[key]
        }
      })
      return newState
    })
  }
  const handleClear = () => {
    setFilterFormValues({})
    setReset(!reset) // <-- toggle reset state
  }
  // console.log(filterFormValues)

  // console.log(sortFilter)
  return (
    <>
      <div className={filterStyles.filter}>
        <form>
          <div className={filterStyles.filterContainer}>
            <h2>Center Name</h2>
            <SingleSelectDropdown
              key={`centerName-${reset}`} // <-- add key to trigger re-render
              name="centerName"
              options={centers.map((item) => ({
                label: item.centerName,
                value: item.centerName,
              }))}
              onChange={(event) => handleFilterChange(event)}
            />
          </div>
          <div className={filterStyles.filterContainer}>
            <h2>Campaign Name</h2>
            <SingleSelectDropdown
              key={`campaignName-${reset}`} // <-- add key to trigger re-render
              name="campaignName"
              options={campaign.map((item) => ({
                label: item.codeName,
                value: item.codeName,
              }))}
              onChange={(event) => handleFilterChange(event)}
            />
          </div>
          <div className={filterStyles.filterContainer}>
            <h2>Agent Name</h2>
            <SingleSelectDropdown
              key={`agentName-${reset}`} // <-- add key to trigger re-render
              name="agentName"
              options={agentName.map((item) => ({
                label: item,
                value: item,
              }))}
              onChange={(event) => handleFilterChange(event)}
            />
          </div>
        </form>
        <button
          type="button"
          onClick={handleClear}
          className={themeStyles.primaryButton}
        >
          Clear
        </button>
      </div>
      {message ? <h1 className={filterStyles.errorMessage}>{message}</h1> : ''}

      {sortFilter && sortFilter.length !== 0 ? (
        <DataTable
          columns={viewLeadsColumns}
          tableData={sortFilter}
          actions={leadActions}
        />
      ) : (
        <DataTable
          columns={viewLeadsColumns}
          tableData={tableDatas}
          actions={leadActions}
        />
      )}
    </>
  )
}
export default SortFilter
