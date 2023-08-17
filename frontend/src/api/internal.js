import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const login = async(data) => {
    let response;

    try {
        response = await api.post("/login" , data);

    } catch (error) {
        return error
    }
    return response;
}

export const signup = async(data) => {
    let response;

    try {
        response =  await api.post('/register', data)
    } catch (error) {
        return error
    }

    return response
    
}

export const signout = async () => {
    let response;
    try {
        response = await api('/logout')
    } catch (error) {
        return error
    }
    return response
}

export const getAllBlogs = async () => {
    let response;
    try {
        response = await api('/blog/all')
    } catch (error) {
        return error
    }
    return response
}

export const submitBlog = async (data) => {
    let response;
    try {
        response = await api.post('/blog', data);
        console.log('api',response);
    } catch (error) {
        return error
    }
    return response
}

export const blogByID = async (id) => {
    let response;
    try {
        response = await api(`/blog/${id}`)
    } catch (error) {
        return error
    }

    return response
}

export const getCommentById = async (id) => {
    let response;
    try {
        response = await api(`/comment/${id}`,{
            validateStatus: false,

        })
        
    } catch (error) {
        return error
    }
    return response
}

export const postComment = async (data) => {
    let response
    try {
        response = await api.post('/comment',data)
    } catch (error) {
        return error
    }
    return response
}

export const deleteBlog = async (id) => {
    let response;
    try {
        response = await api.delete(`/blog/${id}`)
    } catch (error) {
        return error
    }
    return response
}

export const updateBlog = async (data) => {
    let response;
    try {
        // console.log(data);
      response = await api.put('/blog',data);
      console.log(response);
    } catch (error) {
      return error;
    }
    return response;
  };


  