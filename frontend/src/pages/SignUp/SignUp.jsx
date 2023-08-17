import React, { useState } from 'react'
import styles from "./SignUp.module.scss";
import TextInput from '../../components/TextInput/TextInput';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import signupSchema from '../../schema/signupSchema'
import { useDispatch } from 'react-redux';
import { signup } from '../../api/internal';
import { setUser } from '../../store/slices/userSlice';


const SignUp = () => {
  const [error, setError] = useState('')
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });

  const handleSignUp = async () => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword
    }
    try {
      const response = await signup(data);
        if(response.status === 201){
          //1. setUser
        const user = {
          _id: response.data.user._id,
          email: response.data.user.email,
          username: response.data.user.username,
          auth: response.data.auth,
        }
        dispatch(setUser(user))
        // 2. redirect to home
        navigate('/')
        } else if(response.code === 'ERR_BAD_REQUEST'){
          // Display error
          setError(response.response.data.message)
        }
    } catch (error) {
      
    }
  }

  const navigate =useNavigate()
  const dispatch = useDispatch()

  return (
    <>
       <div className={styles.signupWrapper}>
        <h2 className={styles.signupHeader}>SignUp to your account</h2>
        <TextInput
          type="text"
          values={values.name}
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Name"
          error={errors.name && touched.name ? 1 : undefined}
          errormessage={errors.name}
        />
        <TextInput
          type="text"
          values={values.username}
          name="username"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Username"
          error={errors.username && touched.username ? 1 : undefined}
          errormessage={errors.username}
        />
        <TextInput
          type="email"
          values={values.email}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email && touched.email ? 1 : undefined}
          errormessage={errors.email}
        />
        <TextInput
           type="password"
           values={values.password}
           name="password"
           onBlur={handleBlur}
           onChange={handleChange}
           placeholder="Password"
           error={errors.password && touched.password ? 1 : undefined}
           errormessage={errors.password}
        />
        <TextInput
           type="password"
           values={values.confirmPassword}
           name="confirmPassword"
           onBlur={handleBlur}
           onChange={handleChange}
           placeholder="Confirm Password"
           error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
           errormessage={errors.confirmPassword}
        />
        <div className="d-flex justify-content-center align-items-center">
        <button className={styles.signupBtn} onClick={handleSignUp}
        disabled={
          !values.name || !values.username || !values.email || !values.password || !values.confirmPassword 
          || errors.name || errors.username || errors.email || errors.password || errors.confirmPassword
        }
        >Sign Up</button>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        {error !== '' ? <p className={styles.errorMessage}>**{error}</p> : ''}
        <span>
          Already have an account? <button className={styles.createAccount} onClick={() => navigate('/login')}>Login</button>
        </span>
        </div>
      </div>
    </>
  )
}

export default SignUp