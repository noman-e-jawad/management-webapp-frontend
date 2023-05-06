import { useRouter } from 'next/router'
import RiseLoader from 'react-spinners/RiseLoader'
import { useThemeContext } from '../../contexts/ThemeContext'
import { useUserContext } from '../../contexts/UserContext'
import styles from '../../styles/Layout.module.css'
import {
  adminOptions,
  clientOptions,
  managerOptions,
  qcOptions,
} from '../../utils/sidebarOptions'
import LoginForm from '../Forms/LoginForm'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  const { theme } = useThemeContext()
  const router = useRouter()
  const { user, loading } = useUserContext()
  let menu = []
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  }

  if (loading) {
    return <RiseLoader color="green" loading={loading} cssOverride={override} />
  }
  if (user?.role === 'admin') {
    menu = adminOptions
  } else if (user?.role === 'manager') {
    menu = managerOptions
  } else if (user?.role === 'qc') {
    menu = qcOptions
  } else if (user?.role === 'client') {
    menu = clientOptions
  }

  if (
    router.pathname.includes('reset-password') ||
    router.pathname.includes('add-lead')
  ) {
    return <>{children}</>
  }

  if (!loading && user) {
    return (
      <div
        className={
          theme.mode === 'dark'
            ? `${styles.container} layout__dark`
            : styles.container
        }
      >
        <Sidebar menu={menu} />
        <div className={styles.main}>
          <Navbar />
          <main className={theme.mode === 'dark' ? 'dark__theme' : ''}>
            {children}
          </main>
        </div>
      </div>
    )
  }
  return <LoginForm />
}

export default Layout
