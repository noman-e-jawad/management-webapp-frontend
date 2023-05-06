import styles from '../../styles/DataTable.module.css'
const Pagination = ({ rowsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / rowsPerPage); i += 1) {
    pageNumbers.push(i)
  }

  return (
    <nav className={styles.pagination}>
      {pageNumbers.map((number) => (
        <span
          className={number === currentPage ? styles.active : ''}
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </span>
      ))}
    </nav>
  )
}

export default Pagination
