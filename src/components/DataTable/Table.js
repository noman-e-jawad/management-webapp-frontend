/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useMemo, useState } from 'react'
import {
  HiChat,
  HiCheckCircle,
  HiEye,
  HiPencil,
  HiStar,
  HiTrash,
} from 'react-icons/hi'
import { useThemeContext } from '../../contexts/ThemeContext'

import styles from '../../styles/DataTable.module.css'
import { Comment, Delete, Edit, Star, Verify, View } from './ActionButtons'

const Table = ({ columns, data, actions }) => {
  const { theme } = useThemeContext()
  const [tableData, setTableData] = useState([])

  useMemo(() => {
    setTableData(data)
  }, [data])

  return (
    <table className={styles.contentTable}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.Header}</th>
          ))}
          {actions ? <th>Actions</th> : null}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          // <th key={index}>{column.Header}</th>
          <tr
            key={index}
            id={row._id}
            className={theme.mode === 'dark' ? `${styles.dark__row} ` : ``}
          >
            {columns.map((column, key) => (
              <td key={key}>{row[column.accessor]}</td>
            ))}

            {/* Actions */}
            {actions ? (
              <td>
                {actions.map((action) => {
                  switch (action.name) {
                    case 'view':
                      return (
                        <View
                          icon={<HiEye />}
                          title="View"
                          link={`${action.link}/${row._id}`}
                          key={action.name}
                        />
                      )
                    case 'edit':
                      return (
                        <Edit
                          icon={<HiPencil />}
                          title="Edit"
                          link={`${action.link}/${row._id}`}
                          key={action.name}
                        />
                      )
                    case 'verify':
                      return (
                        <Verify
                          icon={<HiCheckCircle />}
                          title="Verify"
                          id={row._id}
                          isVerified={row.isVerified}
                          handleVerify={(id) => {
                            action.trigger(id, setTableData)
                          }}
                          key={action.name}
                        />
                      )
                    case 'delete':
                      return (
                        <Delete
                          icon={<HiTrash />}
                          title="Delete"
                          id={row._id}
                          handleDelete={(id) => {
                            action.trigger(id, tableData, setTableData)
                          }}
                          key={action.name}
                        />
                      )
                    case 'star':
                      return (
                        <Star
                          icon={<HiStar />}
                          title="Star"
                          id={row._id}
                          isStarred={row.isStarred}
                          handleStar={(id) => {
                            action.trigger(id, setTableData)
                          }}
                          key={action.name}
                        />
                      )
                    case 'comment':
                      return (
                        <Comment
                          icon={<HiChat />}
                          title="Comment"
                          id={row._id}
                          agentComments={row.agentComments}
                          handleComment={(id, commentText) => {
                            action.trigger(id, commentText, setTableData)
                          }}
                          key={action.name}
                        />
                      )
                    default:
                      return null
                  }
                })}
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
