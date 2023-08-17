import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PageNotFound.module.scss'

const PageNotFound = () => {
  return (
    <>
        <div className={[styles.page_not_found]}>
            <div className="text d-flex justify-content-center flex-column  align-items-center ">
                <h2>Error 404 - Page not found</h2>
                <p>Go back to <Link to="/">Home</Link></p>
            </div>
        </div>
    </>
  )
}

export default PageNotFound