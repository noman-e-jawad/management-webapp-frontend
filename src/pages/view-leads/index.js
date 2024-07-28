import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import SingleSelectDropdown from '../../components/Forms/SingleSelectDropdown'
import { useUserContext } from '../../contexts/UserContext'
import {
  getAllCampaigns,
  getAllCenters,
  getAllLeads,
  getFiltersFromSalesleads,
  getLeadsByEmail,
  getSortSalesLeads,
} from '../../http/http'
import filterStyles from '../../styles/FilterStyles.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'
import { leadActions, viewLeadsColumns } from '../../utils/dataTableColumns'

const ViewLeads = () => {
  const router = useRouter()
  const { user } = useUserContext()
  const [data, setData] = useState([])
  const [sortFilter, setSortFilter] = useState([])
  const [centers, setCenters] = useState([])
  const [campaign, setCampaign] = useState([])
  const [agentName, setAgentName] = useState([])
  const [zipCode, setZipCode] = useState([])
  const [message, setMessage] = useState('') // success massege
  const [reset, setReset] = useState(false) // <-- add reset state
  const [filterFormValues, setFilterFormValues] = useState({})

  useEffect(() => {
    if (user.role === 'client') {
      getLeadsByEmail(user.email)
        .then((res) => {
          if (res.success) {
            setData(res.data)
          }
        })
        .catch()
    } else {
      getAllLeads()
        .then((res) => {
          if (res.success) {
            setData(res.data)
          }
        })
        .catch()
    }
  }, [user.email, user.role])

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

    getFiltersFromSalesleads({ salesFilter: 'agentName' })
      .then((res) => {
        setAgentName(res.data)
      })
      .catch()

    getFiltersFromSalesleads({ salesFilter: 'zipCode' })
      .then((res) => {
        setZipCode(res.data)
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
  return (
    <>
      <div className="page__title__container">
        <h2 className="page__title">View Sales Leads</h2>
      </div>
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
          <div className={filterStyles.filterContainer}>
            <h2>Zip Code</h2>
            <SingleSelectDropdown
              key={`zipCode-${reset}`} // <-- add key to trigger re-render
              name="zipCode"
              options={zipCode.map((item) => ({
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
      <h3>
        {message ? (
          <h1 className={filterStyles.errorMessage}>{message}</h1>
        ) : (
          ''
        )}
      </h3>
      {sortFilter && sortFilter.length !== 0 ? (
        <DataTable
          columns={viewLeadsColumns}
          tableData={sortFilter}
          actions={leadActions}
        />
      ) : (
        data && (
          <DataTable
            columns={viewLeadsColumns}
            tableData={data}
            actions={leadActions}
          />
        )
      )}
    </>
  )
}

export default ViewLeads
