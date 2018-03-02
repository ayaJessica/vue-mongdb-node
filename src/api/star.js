import axios from 'axios'

export const getReposStar = (user,repo) => {
  return axios.get(`https://api.github.com/repos/${user}/${repo}`)
}
