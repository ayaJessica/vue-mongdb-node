<template>
  <div id="app">
    <header class="header" :class="{ headerBg: !isHome || scrolled}">
      <div class="navWrap" :class="{open: isOpen}">
        <div class="logoWrapper">
          <span class="logo"><router-link :to="'/'">vn-pasttime</router-link></span>
          <span class="menu-control" @click="openNav">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-menu"></use>
            </svg>
          </span>
        </div>
        <nav class="nav">
          <ul class="nav-list" @click="routerClick($event)">
            <li><router-link :to="'/home'">HOME</router-link></li>
            <li><router-link :to="'/videolist'">VIDEO</router-link></li>
            <li><router-link :to="'/b'">IMAGES</router-link></li>
            <li><router-link :to="'/c'">DISCUSSING</router-link></li>
            <li><router-link :to="'/d'">ABOUT</router-link></li>
            <li v-show="!token"><a href="#" @click.prevent="showSignDia">LOGIN</a></li>
          </ul>
        </nav>
        <div class="search" :class="{flex : isShow}">
          <svg @click="showSearch" class="icon" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
          </svg>
          <input ref="search" :class="{input : isShow}" @blure="showSearch" type="text" placeholder="search">
        </div>
      </div>
    </header>
    <router-view/>
    <SignDialog v-show="showSignDialog" :message="message">
      <h2 v-if="signType === 'signin'">SIGN &nbsp; IN</h2>
      <h2 v-else-if="signType === 'signup'">SIGN &nbsp; UP</h2>
    </SignDialog>
  </div>
</template>

<script>
  import SignDialog from './components/signin/SignDialog'
  import { mapState } from 'vuex'
export default {
  components : {
    SignDialog
  },
  data(){
    return {
      isShow : false,
      scrolled : false,
      isOpen : false
    }
  },
  computed : {
    ...mapState({
      isHome : 'isHome',
      message : 'message' ,
      signType : 'signType',
      showSignDialog : 'showSignDialog',
      token : 'token'
    })
  },
  methods : {
    openNav(){
      this.isOpen = !this.isOpen;
    },
    routerClick(e){
     if(e.target.tagName === 'LI' || e.target.tagName === 'A') {
       this.isOpen = false;
     }
    },
    showSearch(){

    },
    updateScrollTop(){
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      scrollTop > 0 ?this.scrolled = true : this.scrolled = false;
    },
    showSignDia(){
      this.$store.commit('SHOW_SIGN_DIALOG')
    }
  },
  mounted(){
    window.addEventListener('scroll',this.updateScrollTop)
  }
}
</script>
<style lang="scss" scoped>
  @import './assets/scss/variables.scss';
  @import './assets/scss/mixins.scss';

  #app {
    font-size: 1rem;
  }

  .headerBg {
    background-color: $mainBlack !important;
  }

  .header {
    width: 100%;
    height: 3.75rem;
    position: fixed;
    background: linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .3));
    padding: 0 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    z-index: 1;
    transition: background .3s;
  @include mediaQ(480px) {
    height: auto;
  }

  @include mediaQ(768px) {
    padding: 0;
  }

  }

  .navWrap {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  @include flexCenter;
  @include mediaQ(960px) {
    width: 100%;
  }

  &.open {
     height: auto;
     display: flex;
     flex-direction: column;

  .logoWrapper {
    display: flex;
    width: 100%;
    background: #111111;
    justify-content: space-between;
  }

  .nav {
    width: 100%;
    display: block;
    background: #111;
  }
  }

  .logoWrapper {
    flex: 1;
    flex-basis: 15%;
  @include mediaQ(480px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  @include mediaQ(768px, 481px) {
    display: none;
  }
  .logo {
    font-family:"Federant", cursive !important;
    font-size:1.875rem;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all .3s;
  @include mediaQ(768px, 481px) {
    display: none;
  }
  a {
    color: red;
  }
  }

  .menu-control {
    height: 3rem;
    display: none;
    flex-basis: 10%;
    cursor: pointer;
    transition: all .3s;

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
  @include mediaQ(480px) {
    display: block;
  }
  }
  }

  .nav {
    flex: 2;
    height: 100%;
    flex-basis: 50%;
    transition: all 1s;
    width: 100%;
    transition: all .3s;
  @include mediaQ(480px) {
    display: none;
  }

  .nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content:  space-around;
    align-items: center;
    transition: all .3s;
  @include mediaQ(480px) {
    flex-direction: column;
  }
  li {
    flex: 6;
    height: 100%;
    width: 100%;
  }

  .router-link-active {
    border-bottom: 3px solid red;
    background-color: rgba(0, 0, 0, .5);

  @include mediaQ(480px) {
    border-bottom: none;
    color: red;
  }
  }

  a {
    font-size: 1rem;
    color: #fff;
    display: inline-block;
    height: 100%;
    width: 100%;
  @include flexCenter;
    transition: all .2s;
    letter-spacing: 1px;
  @include mediaQ(480px) {
    padding: .5rem 0;
  }

  &:hover {
     border-bottom: 3px solid red;
     background-color: rgba(0, 0, 0, .5);
  @include mediaQ(480px) {
    border-bottom: none;
    color: red;
  }
  }
  }
  }
  }

  .flex {
    flex: 1;
  }

  .search {
    flex-basis: 14%;
    text-align: center;
    height: 100%;
  @include flexCenter;
    position: relative;
    transition: all .2s;
  @include mediaQ(960px) {
    display: none;
  }

  svg {
    cursor: pointer;
    position: absolute;
    right: 83%;
  }

  input {
    border: none;
    outline: none;
    color: rgba(255, 255, 255, .6);
    width: 0;
    background-color: rgba(0,0,0, .0);
    transition: all .2s;
  }

  .input {
    padding: 0.625rem 1.3rem;
    width: 80%;
    border-bottom: 2px solid #fff;
  }
  }

  .meun {
  @include mediaQ(480px) {
    display: none;
  }
  @include mediaQ(768px, 481px) {
    flex-basis: 15%;
    display: flex;
    justify-content: center;
  }
  @include mediaQ(960px, 769px) {
    flex-basis: 10%;
    display: flex;
    justify-content: center;
  }
  }
  }
</style>
