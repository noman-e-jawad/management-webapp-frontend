import {
  HiBadgeCheck,
  HiDocument,
  HiEye,
  HiPlusCircle,
  HiShieldCheck,
  HiSpeakerphone,
  HiUpload,
  HiUserAdd,
  HiViewGrid,
} from 'react-icons/hi'

const menu = {
  dashboard: {
    icon: <HiViewGrid />,
    title: 'Dashboard',
    to: '/',
    onActive: '',
  },

  salesLeads: {
    icon: <HiDocument />,
    title: 'Sales Leads',
    to: '',
    items: [
      {
        icon: <HiPlusCircle />,
        title: 'Create',
        to: '/add-lead',
        onActive: '',
      },
      {
        icon: <HiUpload />,
        title: 'Import',
        to: '/import-lead',
        onActive: '',
      },
      {
        icon: <HiEye />,
        title: 'View',
        to: '/view-leads',
        onActive: '',
      },
      {
        icon: <HiBadgeCheck />,
        title: 'View Verified ',
        to: '/view-leads/verified',
        onActive: '',
      },
    ],
  },

  stuffs: {
    icon: <HiShieldCheck />,
    title: 'Stuffs',
    to: '',
    items: [
      {
        icon: <HiPlusCircle />,
        title: 'Create',
        to: '/create-stuff',
        onActive: '',
      },
      {
        icon: <HiEye />,
        title: 'View',
        to: '/view-stuffs',
        onActive: '',
      },
    ],
  },

  clients: {
    icon: <HiUserAdd />,
    title: 'Clients',
    to: '',
    items: [
      {
        icon: <HiPlusCircle />,
        title: 'Create',
        to: '/create-client',
        onActive: '',
      },
      {
        icon: <HiEye />,
        title: 'View',
        to: '/view-clients',
        onActive: '',
      },
    ],
  },

  centers: {
    icon: <HiBadgeCheck />,
    title: 'Centers',
    to: '',
    items: [
      {
        icon: <HiPlusCircle />,
        title: 'Create ',
        to: '/centers/create',
        onActive: '',
      },
      {
        icon: <HiEye />,
        title: 'View',
        to: '/centers',
        onActive: '',
      },
    ],
  },
  campaigns: {
    icon: <HiSpeakerphone />,
    title: 'Campaigns',
    to: '',
    items: [
      {
        icon: <HiPlusCircle />,
        title: 'Create ',
        to: '/campaigns/create',
        onActive: '',
      },
      {
        icon: <HiEye />,
        title: 'View',
        to: '/campaigns',
        onActive: '',
      },
    ],
  },
  filter: {
    icon: <HiDocument />,
    title: 'Filtering',
    to: '/filter-data',
  },
}

const { dashboard, salesLeads, stuffs, clients, centers, campaigns, filter } =
  menu

export const adminOptions = [
  dashboard,
  salesLeads,
  stuffs,
  clients,
  centers,
  campaigns,
  filter,
]

export const qcOptions = [dashboard, salesLeads.items[2], salesLeads.items[3]]

export const managerOptions = [
  dashboard,
  salesLeads,
  stuffs,
  clients,
  centers,
  campaigns,
]

export const clientOptions = [dashboard, salesLeads.items[2]]
