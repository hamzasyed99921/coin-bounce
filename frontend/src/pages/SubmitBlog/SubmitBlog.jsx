import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './SubmitBlog.module.scss'
import TextInput from '../../components/TextInput/TextInput'
import { submitBlog } from '../../api/internal'
import { useNavigate } from 'react-router-dom'

const SubmitBlog = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [photo, setPhoto] = useState('')

    const author = useSelector((state) => state.user._id)

    // const auth =  useSelector((state) => state.user.auth)
//   console.log(auth);
 

    const getPhoto = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        }
    }

    const submitHandler = async () => {
        const data = {
            author,
            title,
            content,
            photo,
        }
        const response = await submitBlog(data);

       if (response.status === 201) {
        navigate("/");
      }
    }

  return (
    <>
        <div className='container mb-5'>
            <h2 className='text-center my-5'>Create a Blog!</h2>
            <TextInput
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{width: '60%'}}
            />
            <div className='d-flex justify-content-center'>
            <textarea
                className={styles.content}
                name='content'
                placeholder='Your content goes here...'
                maxLength={400}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            </div>
            <div className='d-flex justify-content-center my-3'>
                <p className='mx-3'>Choose a Photo</p>
                <input type="file" name='photo' id='photo' 
                accept='image/jpg,image/jpeg,image/png' onChange={getPhoto} 
                />
                {photo !== '' ? <img src={photo} width={100} height={100} /> : ''}
            </div>
         
           <div className='d-flex justify-content-center'>
            <button className={styles.submit} onClick={submitHandler}
            // disabled={title === '' || content === '' || photo === ''}
            >Submit</button>
            </div>
        </div>
    </>
  )
}

export default SubmitBlog