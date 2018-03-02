import Vue from 'vue'
import Router from 'vue-router'

const Home =  r => require.ensure([], () => r(require('../views/home/Home')), 'Home');
const VideoList =  r => require.ensure([], () => r(require('../views/videolist/VideoList')), 'VideoList');
const VideoPlayer = r => require.ensure([], () => r(require('../views/videoplayer/VideoPlayer')), 'VideoPlayer');

Vue.use(Router)

export default new Router({
//  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path : '/home',
      component : Home
    },
    {
      path : '/videolist',
      name : 'videolist',
      component : VideoList
    },
    {
      path :'/video/:id',
      name : 'videoPlayer',
      component : VideoPlayer
    }
  ]
})
