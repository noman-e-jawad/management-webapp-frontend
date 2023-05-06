import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { axios, validate } from '../http/http'

// set up cookies

/* Context */
export const UserContext = createContext(null)

/* Provider */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(Cookies.get('token'))
  const router = useRouter()

  // setUser

  useEffect(() => {
    setLoading(true)
    if (token) {
      axios.defaults.headers.common.Authorization = token
      validate().then(({ success, data }) => {
        if (success) {
          setUser({ ...data })
        } else {
          setToken('')
        }
      })
    } else {
      // router.push('/')
    }
    setLoading(false)
  }, [token])

  const login = async (data) => {
    setLoading(true)
    Cookies.set('token', data.token)
    setToken(data.token)
    setLoading(false)
    router.push('/dashboard')
  }

  const logout = async () => {
    setLoading(true)
    setUser(null)
    Cookies.remove('token')
    setLoading(false)
    router.push('/')
  }

  return (
    <UserContext.Provider
      value={{ user, login, logout, loading, setLoading, setUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

/* Consumer Hook */
export const useUserContext = () => useContext(UserContext)

export default UserProvider
