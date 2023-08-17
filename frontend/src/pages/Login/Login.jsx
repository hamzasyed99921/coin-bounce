import React,{useEffect, useState} from "react";
import styles from "./Login.module.scss";
import TextInput from "../../components/TextInput/TextInput";
import loginSchema from "../../schema/loginSchema";
import { useFormik } from "formik";
import { login } from "../../api/internal";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {setUser} from '../../store/slices/userSlice'

const Login = () => {
  const [error, setError] = useState('')
  
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
      const data = {
        username: values.username,
        password: values.password
      }
      const response = await login(data)

      if(response.status === 200){
        //1. setUser
        const user = {
          _id: response.data.user._id,
          email: response.data.user.email,
          username: response.data.user.username,
          auth: response.data.auth,
        }
        console.log(user);
        dispatch(setUser(user))
        // 2. redirect to home
        navigate('/')
      } else if(response.code === 'ERR_BAD_REQUEST'){
        // Display error
        setError(response.response.data.message)
      }
  }

  return (
    <>
      <div className={styles.loginWrapper}>
        <h2 className={styles.loginHeader}>LogIn to your account</h2>
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
           type="password"
           values={values.password}
           name="password"
           onBlur={handleBlur}
           onChange={handleChange}
           placeholder="Password"
           error={errors.password && touched.password ? 1 : undefined}
           errormessage={errors.password}
        />
        <div className="d-flex justify-content-center align-items-center">
        <button className={styles.loginBtn} onClick={handleLogin}
        disabled={!values.username || !values.password || errors.username || errors.password}
        >Login</button>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        {error !== '' ? <p className={styles.errorMessage}>**{error}</p> : ''}
        <span>
          Don't have an account? <button className={styles.createAccount} onClick={() => navigate('/signup')}>Register</button>
        </span>
        </div>
      </div>
    </>
  );
};

export default Login;
