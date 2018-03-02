import * as types from './mutations-type'
import { fetchVideos } from '../api/video'

const mutations = {
  [types.FETCH_VIDEOS] (state,p) {
    //state.videos = ['a','b','c'];
    fetchVideos(p).then(
      res => {
      state.current = p;
      state.videos = res.data.videos;
      state.all = Math.ceil(res.data.total / state.limitNum)
    })
  },

  //弹出登录框
  [types.SHOW_SIGN_DIALOG] (state){
    state.showSignDialog = true;
  },
  //关闭登录框
  [types.CLOSE_SIGN_DIALOG] (state){
    state.showSignDialog = false;
  },
  //保存token
  [types.SET_TOKEN] (state,token){
    state.token = token;
  },
  [types.SET_MESSAGE] (state,message){
    state.message = message;
  },
  //将用户信息加至状态
  [types.SET_SIGNIN_USER](state,data){
    state.user = data;
  }
}
export default mutations
