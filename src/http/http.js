import _axios from 'axios'
const BASE_URL = process.env.API_URL

export const axios = _axios.create({ baseURL: BASE_URL })

// login
export const loginUser = async (formValues) => {
  const response = await axios.post('/api/auth/login', formValues)
  return response.data
}
// logout
export const logoutUser = async () => {
  const response = await axios.post('/api/auth/logout')
  return response.data
}
// validate
export const validate = async () => {
  const response = await axios.get('/api/auth/validate')
  return response.data
}

export const changePassword = async (token, id, newPassword) => {
  const response = await axios.post('/api/auth/reset-password', {
    token,
    id,
    newPassword,
  })
  return response.data
}

// get user by id
export const getUserById = async (id) => {
  const response = await axios.get('/api/auth/get-user-by-id', {
    params: { id },
  })
  return response.data
}

// request password reset
export const requestPasswordReset = async (formValues) => {
  const response = await axios.post(
    '/api/auth/request-password-reset',
    formValues,
  )
  return response.data
}

// create stuff
export const createStuff = async (formValues) => {
  const response = await axios.post('/api/stuff/create', formValues)
  console.log(formValues)
  return response.data
}

// get all stuffs
export const getAllStuffs = async () => {
  const response = await axios.get('/api/stuff/all')
  return response.data
}

// get stuff by id
export const getStuffById = async (id) => {
  const response = await axios.get('/api/stuff/get-by-id', {
    params: { id },
  })
  return response.data
}

// update stuff
export const updateStuff = async (id, formValues) => {
  const response = await axios.put('/api/stuff/update', { id, ...formValues })
  return response.data
}

// delete stuff
export const deleteStuff = async (id) => {
  const response = await axios.delete('/api/stuff/delete', { params: { id } })
  return response.data
}

// create client
export const createClient = async (formValues) => {
  const response = await axios.post('/api/client/create', formValues)
  return response.data
}

// get all clients
export const getAllClients = async () => {
  const response = await axios.get('/api/client/all')
  return response.data
}

// get client by id
export const getClientById = async (id) => {
  const response = await axios.get('/api/client/get-by-id', {
    params: { id },
  })
  return response.data
}

// update client
export const updateClient = async (id, formValues) => {
  const response = await axios.put('/api/client/update', { id, ...formValues })
  return response.data
}

// delete client
export const deleteClient = async (id) => {
  const response = await axios.delete('/api/client/delete', { params: { id } })
  return response.data
}

// create sales-lead
export const createLead = async (formValues) => {
  const response = await axios.post('/api/sales-lead/create', formValues)
  return response.data
}

// import sales-lead
export const importLead = async (formValues) => {
  const response = await axios.post('/api/sales-lead/import', formValues)
  return response.data
}

// get all sales-leads
export const getAllLeads = async () => {
  const response = await axios.get('/api/sales-lead/all')
  return response.data
}

// get verified sales-leads
export const getVerifiedLeads = async () => {
  const response = await axios.get('/api/sales-lead/verified')
  return response.data
}

// get sales-lead by id
export const getLeadById = async (id) => {
  const response = await axios.get('/api/sales-lead/get-by-id', {
    params: { id },
  })
  return response.data
}

// get sales-lead by campaign
export const getLeadsByCampaign = async (campaignName) => {
  const response = await axios.get('/api/sales-lead/get-by-campaign', {
    params: { campaignName },
  })
  return response.data
}
// get sales-lead by email
export const getLeadsByEmail = async (email) => {
  const response = await axios.get('/api/sales-lead/get-by-email', {
    params: { email },
  })
  return response.data
}

// update sales-lead
export const updateLead = async (id, formValues) => {
  const response = await axios.put('/api/sales-lead/update', {
    id,
    ...formValues,
  })
  return response.data
}

// delete sales-lead
export const deleteLead = async (id) => {
  const response = await axios.delete('/api/sales-lead/delete', {
    params: { id },
  })
  return response.data
}

// verify sales-lead
export const verifyLead = async (id) => {
  const response = await axios.put('/api/sales-lead/verify', { id })
  return response.data
}

// star sales-lead
export const starLead = async (id) => {
  const response = await axios.put('/api/sales-lead/star', { id })
  return response.data
}

// add comment
export const addComment = async (id, commentText) => {
  const response = await axios.put('/api/sales-lead/update', {
    id,
    agentComments: commentText,
  })
  return response.data
}

// get entity counts
export const getEntityCounts = async () => {
  const response = await axios.get('/api/stats/get-entity-counts')
  return response.data
}

// get client entity counts

export const getEntityClientCounts = async (email) => {
  const response = await axios.get('/api/stats/get-client-entity-counts', {
    params: {
      email,
    },
  })
  return response.data
}

// center http requests
// create center
export const createCenter = async (formValues) => {
  const response = await axios.post('/api/centers/create', formValues)
  return response.data
}

// get all centers
export const getAllCenters = async () => {
  const response = await axios.get('/api/centers/all')
  return response.data
}

// get center by id
export const getCenterById = async (id) => {
  const response = await axios.get('/api/centers/get-by-id', {
    params: { id },
  })
  return response.data
}

// update center
export const updateCenter = async (id, formValues) => {
  const response = await axios.put('/api/centers/update', { id, ...formValues })
  return response.data
}

// delete center
export const deleteCenter = async (id) => {
  const response = await axios.delete('/api/centers/delete', { params: { id } })
  return response.data
}

// campaigns http requests
// create campaign
export const createCampaign = async (formValues) => {
  const response = await axios.post('/api/campaigns/create', formValues)
  return response.data
}

// get all campaigns
export const getAllCampaigns = async () => {
  const response = await axios.get('/api/campaigns/all')
  return response.data
}

// get campaign by id
export const getCampaignById = async (id) => {
  const response = await axios.get('/api/campaigns/get-by-id', {
    params: { id },
  })
  return response.data
}

// update campaign
export const updateCampaign = async (id, formValues) => {
  const response = await axios.put('/api/campaigns/update', {
    id,
    ...formValues,
  })
  return response.data
}

// delete campaign
export const deleteCampaign = async (id) => {
  const response = await axios.delete('/api/campaigns/delete', {
    params: { id },
  })
  return response.data
}

// filter data
export const getSortSalesLeads = async (filterFormValues) => {
  const response = await axios.get('/api/sales-lead/sorted', {
    params: filterFormValues,
  })
  return response.data
}

// get all agent-name
export const getFiltersFromSalesleads = async (salesFilter) => {
  const response = await axios.get('/api/sales-lead/filters-from-saleslead', {
    params: salesFilter,
  })
  return response.data
}
