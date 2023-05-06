import { useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

import styles from '../../styles/MultiSelectDropdown.module.css'

const MultiSelectDropdown = ({ options, className, onChange, name, value }) => {
  const [selectedOptions, setSelectedOptions] = useState(value || [])
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
        value: selectedOptions,
      },
    })
  }, [name, selectedOptions])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option))
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
  }

  return (
    <div className={`${styles.multiDropdownSelect} ${className}`}>
      <div
        className={`${styles.selectedOptions} ${isOpen ? styles.open : ''}`}
        onClick={toggleDropdown}
      >
        {selectedOptions.length
          ? `${selectedOptions.length} options selected`
          : 'Select options'}
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
                selectedOptions.includes(option.value) ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {selectedOptions.includes(option.value) ? (
                <ImCheckboxChecked
                  className={styles.checkbox}
                  size={16}
                  fill="var(--primary-color)"
                />
              ) : (
                <ImCheckboxUnchecked
                  className={styles.checkbox}
                  size={16}
                  fill="#c3c3c3"
                />
              )}

              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiSelectDropdown
