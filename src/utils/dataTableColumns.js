import {
  HiChat,
  HiCheckCircle,
  HiEye,
  HiPencilAlt,
  HiStar,
  HiTrash,
} from 'react-icons/hi'
import {
  handleCommentLead,
  handleDeleteCampaign,
  handleDeleteCenter,
  handleDeleteClient,
  handleDeleteLead,
  handleDeleteStuff,
  toggleStarLead,
  toggleVerifyLead,
} from './buttonActions'

export const viewLeadsColumns = [
  {
    Header: 'Center Name',
    accessor: 'centerName',
  },
  {
    Header: 'Campaign Name',
    accessor: 'campaignName',
  },
  {
    Header: 'Appointment Date',
    accessor: 'appointmentDate',
  },
  {
    Header: 'Appointment Time',
    accessor: 'appointmentTime',
  },
  {
    Header: 'Agent Name',
    accessor: 'agentName',
  },
  {
    Header: 'Zip Code',
    accessor: 'zipCode',
  },
  {
    Header: 'Actively Seeking',
    accessor: 'activelySeeking',
  },
  {
    Header: 'Currently Frequency',
    accessor: 'currentFrequency',
  },
]

export const viewStuffsColumns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
]

export const viewClientsColumns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Campaign Name',
    accessor: 'campaignName',
  },
  {
    Header: 'Company Name',
    accessor: 'companyName',
  },
]

export const viewCentersColumns = [
  {
    Header: 'Name',
    accessor: 'centerName',
  },
]

export const viewCampaignColumns = [
  {
    Header: 'Campaign Code Name',
    accessor: 'codeName',
  },
]

const actionIcons = {
  view: <HiEye />,
  verify: <HiCheckCircle />,
  edit: <HiPencilAlt />,
  delete: <HiTrash />,
  star: <HiStar />,
  comment: <HiChat />,
}

export const leadActions = {
  qc: [
    { name: 'view', icon: actionIcons.view, link: '/view-leads' },
    { name: 'verify', icon: actionIcons.verify, trigger: toggleVerifyLead },
    { name: 'edit', icon: actionIcons.edit, link: '/edit-lead' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteLead },
  ],
  manager: [{ name: 'view', icon: actionIcons.view, link: '/view-leads' }],
  admin: [
    { name: 'view', icon: actionIcons.view, link: '/view-leads' },
    { name: 'verify', icon: actionIcons.verify, trigger: toggleVerifyLead },
    { name: 'edit', icon: actionIcons.edit, link: '/edit-lead' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteLead },
    { name: 'star', icon: actionIcons.star, trigger: toggleStarLead },
    { name: 'comment', icon: actionIcons.comment, trigger: handleCommentLead },
  ],
  client: [
    { name: 'view', icon: actionIcons.view, link: '/view-leads' },
    { name: 'star', icon: actionIcons.star, trigger: toggleStarLead },
    { name: 'comment', icon: actionIcons.comment, trigger: handleCommentLead },
  ],
}
export const stuffActions = {
  qc: [],
  admin: [
    { name: 'view', icon: actionIcons.view, link: '/view-stuffs' },
    { name: 'edit', icon: actionIcons.edit, link: '/edit-stuff' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteStuff },
  ],
  manager: [
    { name: 'view', icon: actionIcons.view, link: '/view-stuffs' },
    { name: 'edit', icon: actionIcons.edit, link: '/edit-stuff' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteStuff },
  ],
  client: [],
}

export const clientActions = {
  qc: [],
  admin: [
    { name: 'view', icon: actionIcons.view, link: '/view-clients' },
    { name: 'edit', icon: actionIcons.edit, link: '/edit-client' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteClient },
  ],
  manager: [
    { name: 'view', icon: actionIcons.view, link: '/view-clients' },
    { name: 'edit', icon: actionIcons.edit, link: '/edit-client' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteClient },
  ],
  client: [],
}

export const centerActions = {
  qc: [],
  admin: [
    { name: 'view', icon: actionIcons.view, link: '/centers/details' },
    { name: 'edit', icon: actionIcons.edit, link: '/centers/edit' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteCenter },
  ],
  manager: [
    { name: 'view', icon: actionIcons.view, link: '/centers/details' },
    { name: 'edit', icon: actionIcons.edit, link: '/centers/edit' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteCenter },
  ],
  client: [],
}

export const campaignActions = {
  qc: [],
  admin: [
    { name: 'view', icon: actionIcons.view, link: '/campaigns/details' },
    { name: 'edit', icon: actionIcons.edit, link: '/campaigns/edit' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteCampaign },
  ],
  manager: [
    { name: 'view', icon: actionIcons.view, link: '/campaigns/details' },
    { name: 'edit', icon: actionIcons.edit, link: '/campaigns/edit' },
    { name: 'delete', icon: actionIcons.delete, trigger: handleDeleteCampaign },
  ],
  client: [],
}
