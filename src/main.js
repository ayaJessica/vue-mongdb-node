// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import vueLogger from 'vue-logger'
import moment from 'moment'
import VueLazyload from 'vue-lazyload'

import './assets/scss/index.scss'

Vue.config.productionTip = false;

moment.locale('zh-cn');

Vue.use(VueLazyload,{
  loading : require('./assets/img/placeholder.png')
})

Vue.use(vueLogger, {
  prefix: new Date(),
  dev: true,
  shortname: true,
  levels: ['log', 'warn', 'debug', 'error', 'dir']
})
//处理时间的全局过滤器
Vue.filter('timeAgo',timestamp => {
  return moment(timestamp).startOf('hour').fromNow();
})

// 处理视频时长的过滤器
Vue.filter('durationFormat', duration => {
  const min = parseInt(duration / 60)
  const s = duration % 60
  const time = s >= 10 ? `${min}:${s}` : `${min}:0${s}`
  return time
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
