import axios from '../utils/axiosService'

//注册和登录api，通过type判断
export const signByUsername = (username,password,type) => {
  const data = {
    username,
    password,
    type
  };
  return axios.post('/auth/users',data);
}

export const fetchSignUser = () => {
  return axios.get('/auth/users')
}

export const fetchUserById = (id) => {
  return axios.get(`/auth/users/${id}`)
}
