import { useThemeContext } from '../../contexts/ThemeContext'
import styles from '../../styles/DataTable.module.css'

const RowsPerPage = ({ value, options, onChangeHandler, totalRows }) => {
  const { theme } = useThemeContext()
  return (
    <div className={styles.formControl}>
      <label
        htmlFor="rowsPerPage"
        className={theme.mode === 'dark' ? `${styles.dark__lable}` : ``}
      >
        Post Per Page
      </label>
      <select
        name="rowsPerPage"
        id="rowsPerPage"
        onChange={onChangeHandler}
        value={value}
        className={theme.mode === 'dark' ? `${styles.dark__select}` : ``}
      >
        {options.map((option, key) => (
          <option key={key} value={option === -1 ? totalRows : option}>
            {option === -1 ? 'All' : option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RowsPerPage
