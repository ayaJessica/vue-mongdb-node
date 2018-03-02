import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);
const store = new Vuex.Store({
  state : {
    isHome : true,
    videos : [],
    limitNum: 15,
    current: 1,
    all: 0,
    //判断是登录还是注册
    signType : 'signin',
    message : {},
    showSignDialog : false,
    token : localStorage.getItem('vn-token')
  },
  mutations,
  actions,
  getters
})
export default store
