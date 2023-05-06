import {
  adminPermissions,
  clientPermissions,
  managerPermissions,
  qcPermissions,
} from './premissions'

export const authorize = (role, route) => {
  if (role === 'admin') {
    return adminPermissions.includes(route)
  }
  if (role === 'manager') {
    return managerPermissions.includes(route)
  }
  if (role === 'qc') {
    return qcPermissions.includes(route)
  }
  if (role === 'client') {
    return clientPermissions.includes(route)
  }
  return false
}
