import { HiSearch } from 'react-icons/hi'
import { useThemeContext } from '../../contexts/ThemeContext'
import styles from '../../styles/TableHeader.module.css'

const Header = ({ formValues, handleChange }) => {
  const { theme } = useThemeContext()
  return (
    <div className={styles.container}>
      <div className={styles.query}>
        <label htmlFor="search">
          <HiSearch size={20} color="#707070" />
        </label>
        <input
          type="text"
          id="query"
          name="query"
          value={formValues.password}
          placeholder="Search by center, agent or campaign"
          onChange={handleChange}
          className={theme.mode === 'dark' ? `${styles.dark__select}` : ``}
        />
      </div>
      <div className={styles.filter}>
        <select
          name="role"
          value={formValues.role}
          onChange={handleChange}
          className={theme.mode === 'dark' ? `${styles.dark__select}` : ``}
        >
          <option value="0d">Today</option>
          <option value="1d">Yesterday</option>
          <option value="7d">Last 7 Days</option>
        </select>
      </div>
    </div>
  )
}

export default Header
