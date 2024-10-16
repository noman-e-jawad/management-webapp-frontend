import Link from 'next/link'
import { useState } from 'react'
import { HiChevronDown, HiChevronRight } from 'react-icons/hi'
import { useThemeContext } from '../../contexts/ThemeContext'
import styles from '../../styles/Sidebar.module.css'
import themeStyles from '../../styles/ThemeStyles.module.css'
import { hasChildren } from '../../utils/checkHasChildren'
const Sidebar = ({ menu }) => {
  const { theme } = useThemeContext()
  return (
    <div className={styles.wrapper}>
      <div
        className={
          theme.mode === 'dark'
            ? `${styles.container} ${styles.containerDark} `
            : `${styles.container}`
        }
      >
        <div className={styles.brand}>
          <h2
            className={theme.mode === 'dark' ? `${themeStyles.textLight} ` : ``}
          >
            SkyManage
          </h2>
        </div>

        {/* Main Menu */}
        <Menu items={menu} />
      </div>
    </div>
  )
}

export default Sidebar

const Menu = ({ items }) => (
  <>
    {items.map((item, key) => (
      <MenuItem childrens={item} key={key} />
    ))}
  </>
)

const MenuItem = ({ childrens }) =>
  hasChildren(childrens) ? (
    <MultiLevel item={childrens} />
  ) : (
    <SingleLevel item={childrens} />
  )

const SingleLevel = ({ item }) => {
  const { theme } = useThemeContext()
  return (
    <Link href={item.to} passHref>
      <div
        className={
          theme.mode === 'dark'
            ? `${styles.menuItem} ${styles.menuItemDark} ${themeStyles.textLight} `
            : `${styles.menuItem}`
        }
      >
        {item?.icon}
        <span>{item?.title}</span>
      </div>
    </Link>
  )
}

const MultiLevel = ({ item }) => {
  const { theme } = useThemeContext()
  const [open, setOpen] = useState(false)
  const { items: childrens } = item

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div>
      <div
        className={
          theme.mode === 'dark'
            ? `${styles.menuItem} ${styles.menuItemDark} ${themeStyles.textLight} `
            : `${styles.menuItem}`
        }
        onClick={handleClick}
      >
        {item?.icon}
        <span className={styles.parentItem}>
          {item?.title}
          {open ? <HiChevronDown /> : <HiChevronRight />}
        </span>
      </div>
      <div
        className={
          open ? `${styles.submenu} ${styles.open}` : `${styles.submenu}`
        }
      >
        {childrens.map((child, key) => (
          <MenuItem childrens={child} key={key} />
        ))}
      </div>
    </div>
  )
}
