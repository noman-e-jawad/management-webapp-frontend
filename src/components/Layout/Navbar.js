import { HiUserCircle } from 'react-icons/hi'
import { useThemeContext } from '../../contexts/ThemeContext'
import { useUserContext } from '../../contexts/UserContext'
import { logoutUser } from '../../http/http'
import styles from '../../styles/Navbar.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'
import ToggleSwitch from '../ToggleSwitch'

const Navbar = () => {
  const { user, logout } = useUserContext()
  const { theme } = useThemeContext()

  const handleLogOut = () => {
    logoutUser()
    logout()
  }

  return (
    <>
      {user && (
        <div className={styles.wrapper}>
          <div
            className={
              theme.mode === 'dark'
                ? `${styles.container} ${styles.containerDark}`
                : `${styles.container}`
            }
          >
            <div className={styles.welcomeText__container}>
              <span
                className={
                  theme.mode === 'dark'
                    ? `${themeStyles.textLight} ${styles.welcomeText}`
                    : `${styles.welcomeText}`
                }
              >
                {`Welcome back! ${user?.name}`}
              </span>

              <span className={styles.role}>
                <HiUserCircle size={20} />
                <p>{user?.role}</p>
              </span>
            </div>
            <div className={styles.rightContainer}>
              <ToggleSwitch title="Dark Mode" />
              <button
                onClick={handleLogOut}
                className={themeStyles.primaryButton}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
