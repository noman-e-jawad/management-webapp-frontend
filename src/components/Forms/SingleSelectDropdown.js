import { useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'

import { useThemeContext } from '../../contexts/ThemeContext'
import styles from '../../styles/MultiSelectDropdown.module.css'

const SingleSelectDropdown = ({
  options,
  className,
  onChange,
  name,
  value,
}) => {
  const { theme } = useThemeContext()
  const [selectedOption, setSelectedOption] = useState(value || '')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.closest(`.${styles.multiDropdownSelect}`)) {
        return
      }
      setIsOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    onChange({
      target: {
        name,
        value: selectedOption,
      },
    })
  }, [name, selectedOption])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  return (
    <div
      className={
        theme.mode === 'dark'
          ? `${styles.dark__select} ${styles.multiDropdownSelect} ${className}`
          : `${styles.multiDropdownSelect} ${className}`
      }
    >
      <div
        className={`${styles.selectedOptions} ${isOpen ? styles.open : ''}`}
        onClick={toggleDropdown}
      >
        {selectedOption === '' ? 'Select option' : selectedOption}
        <span>
          <HiChevronDown size={22} />
        </span>
      </div>
      {isOpen && (
        <div className={`${styles.optionsList} ${isOpen ? styles.open : ''}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${
                selectedOption.includes(option.value) ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SingleSelectDropdown
