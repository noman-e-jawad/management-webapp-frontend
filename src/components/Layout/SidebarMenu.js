/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { useState } from 'react'

import Link from 'next/link'
import styles from '../../styles/Sidebar.module.css'
import { hasChildren } from '../../utils/checkHasChildren'

export default function Sidebar({ menu }) {
  return (
    <div className={styles.sidebarContainer}>
      {menu.map((item, key) => (
        <MenuItem key={key} item={item} />
      ))}
    </div>
  )
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel
  return <Component item={item} />
}

const SingleLevel = ({ item }) => {
  const router = useRouter()
  const subUrls = router.pathname.split('/')
  const subUrl = subUrls[subUrls.length - 1]
  return (
    <Link href={item?.to || ''}>
      <li>
        {item.icon}
        <span>{item.title} </span>
      </li>
    </Link>
  )
}

const MultiLevel = ({ item }) => {
  const { items: childrens } = item
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <div>
        <div onClick={handleClick}>
          {item.icon}
          <span>{item.title}</span>
        </div>
        <div
          className={
            open
              ? `${styles.inner} ${styles.open}`
              : `${styles.inner} ${styles.close}`
          }
        >
          {childrens.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </div>
      </div>
    </>
  )
}
