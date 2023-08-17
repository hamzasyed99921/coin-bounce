import React, { useEffect, useState } from 'react'
import styles from './Blogs.module.scss'
import { getAllBlogs } from '../../api/internal'
import Loader from '../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (async function getAllBlogsApiCall(){
            const response = await getAllBlogs();
            if(response.status === 200){
                setBlogs(response.data.blogs)

            }
          })();
            // cleanup function
      
            setBlogs([]);
    },[])

    if(blogs.length === 0){
        return(
            <Loader text={'Blogspage'}/>
        )
    }

  return (
    <>
        <div className="container">
            <h2 className='my-5 text-center'>All Blogs</h2>
            <div className={styles.cardMain}>
                <div className="row d-flex justify-content-center mb-5">
                    {blogs.map((val) => {
                        return(
                            <div className="col-md-6 col-12 mt-4" >
                            <div className={styles.card} onClick={() => navigate(`/blog/${val._id}`)}>
                                <div className={styles.imgMain}>
                              <img src={val.photo} className="card-img-top" alt="..." />
                                </div>
                              <div className={styles.card_body}>
                                <h5 className="card-title">{val.title}</h5>
                                <p>{val.content}</p>
                              </div>
                            </div>
                          </div>
                        )
                    })}
                
               
                </div>
            </div>
        </div>
    </>
  )
}

export default Blogs