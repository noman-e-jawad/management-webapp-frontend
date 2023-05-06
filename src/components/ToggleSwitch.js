import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'
import { useThemeContext } from '../contexts/ThemeContext'
import styles from '../styles/ToggleSwitch.module.css'

const ToggleSwitch = () => {
  const { setTheme, theme } = useThemeContext()
  const toggleChecked = () => {
    setTheme((prev) =>
      prev.mode === 'light'
        ? { ...prev, mode: 'dark' }
        : { ...prev, mode: 'light' },
    )
    localStorage.setItem('theme', theme.mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={styles.container} onClick={toggleChecked}>
      <div
        className={
          theme.mode === 'dark'
            ? `${styles.theme_toggle} ${styles.night}`
            : `${styles.theme_toggle} ${styles.day}`
        }
      >
        <div
          className={
            theme.mode === 'dark'
              ? `${styles.theme_icon} ${styles.active}`
              : styles.theme_icon
          }
        >
          {theme.mode === 'dark' ? (
            <IoMoonOutline className={`${styles.theme__icon}`} />
          ) : (
            <IoSunnyOutline className={styles.theme__icon} />
          )}
        </div>
        <span className={styles.theme_name}>
          {theme.mode === 'dark' ? 'Dark' : 'Light'}
        </span>
      </div>
    </div>
  )
}

export default ToggleSwitch
