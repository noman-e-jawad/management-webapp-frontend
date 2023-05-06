import styles from '../styles/Modal.module.css'
const Modal = ({ title, content, open, onClose, onSubmit }) => {
  const handleSubmit = async () => {
    await onSubmit()
    onClose()
  }

  if (open) {
    return (
      <div className={styles.container}>
        <h4 className={styles.modal__title}>{title}</h4>
        <p className={styles.modal__content}>{content}</p>

        <div className={styles.button__container}>
          <button className={styles.close__button} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.submit__button} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )
  }

  return <></>
}

export default Modal
