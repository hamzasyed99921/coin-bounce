import * as yup from 'yup';

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const errorMessage = 'use lowercase, uppercase and digits';

const signupSchema = yup.object().shape({
    name: yup.string().max(30).required('name is required'),
    username: yup.string().min(5).max(30).required('username is required'),
    email: yup.string().email('enter a valid email').required('email is required'),
    password: yup.string().min(5).max(25).matches(passwordPattern, {message: errorMessage}).required('password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), 'Password must match']).required('confirm password is required')
})

export default signupSchema;