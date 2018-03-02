import axios from '../utils/axiosService'

export const fetchVideos = (p) => {
  if(!p){
    return axios.get(`/aproxy/videos`)
  }
  else{
    return axios.get(`/aproxy/videos?p=${p}`)
  }
}

export const fetchVideoById = (id) => {
  return axios.get(`/aproxy/videos/${id}`)
}
