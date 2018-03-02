import axios from 'axios'
import store from '../store/store'

let baseURL = '';
if(process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:8081'
}

//创建axios实例
const service = axios.create({
  baseURL : baseURL,
  timeout : 5000
})

// request拦截器
/*service.interceptors.request.use(config => {
  if (store.state.token) {
    // 让每个请求头部都携带token信息
    config.headers['AccessToken'] = store.state.token
  }
  return config
}, error => {
  Promise.resolve(error)
})*/

export default service
