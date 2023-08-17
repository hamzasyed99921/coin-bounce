import React from 'react'
import styles from './TextInput.module.scss'

const TextInput = (props) => {
  return (
    <div className={styles.textInputWrapper}>
        <input {...props} />
       {props.error && (
        <p className={styles.errorMessage}>** {props.errormessage}</p>
      )}
    </div>
  )
}

export default TextInput