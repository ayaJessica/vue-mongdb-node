<template>
<div class="video-player">
  <div class="player-bg">
    <div class="player-wrapper">
      <video
      @timeupdate="updateBar"
      @ended="showReplayButton"
      @canplay="canplay"
      ref="video"
      class="player-viewer"
      :src="playUrl"
      autoplay
      >
      </video>
      <div class="slide">
        <div class="slide-top">
          <span class="collect" @click="handleCollect" :class="{ selected : selectedCol }">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jinlingyingcaiwangtubiao24"></use>
            </svg>
          </span>
          <span class="support" @click="handleSupport" :class="{ selected : selectedSup }">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zan2"></use>
            </svg>
          </span>
        </div>
        <div class="videoSrc">
          <span v-for="src in videoInfo.videosrc" :class="{ select : selectedSrc === src.name }" @click="switchSrc(src)">{{src.name}}</span>
        </div>
      </div>
      <div class="player-controls">

        <a class="player-button" @click="togglePlay()">{{playIcon}}</a>

        <div class="progress">
          <div ref="progress" class="progress-bar" @click="updateProgess">
            <span
              ref="progressBar"
              class="progress-rate"
            >
            </span>
          </div>
        </div>

        <span class="duration">
          <span class="curTime">{{ currentTime | durationFormat}}</span>
          {{ videoInfo.duration | durationFormat}}
        </span>

        <div class="player-volume">
          <svg v-show="!volumeoff" class="icon" aria-hidden="true" @click="volumeOff">
            <use xlink:href="#icon-yinliang"></use>
          </svg>

          <svg v-show="volumeoff" class="icon" aria-hidden="true" @click="volumeOn">
            <use xlink:href="#icon-volumeoff"></use>
          </svg>

          <div ref="volumeBar" class="volume-bar" @click="handleVolume">
            <span ref="volumeLevle" class="volume-levle"></span>
          </div>
        </div>

        <div class="player-rate">
          <span class="current-value">{{ currentSpeed }}</span>
          <div class="select">
            <span v-for="rate in wordSpeeds" @click="handleSpeed(rate)">
              {{rate}}
            </span>
          </div>
        </div>

        <a href="#" class="player-vote"></a>
        <a href="#" class="player-vote"></a>
      </div>
    </div>
  </div>
  <div class="loading" v-show="loading">
    <img src="../../assets/img/loading.jpg">
  </div>
  <AppFooter></AppFooter>
</div>
</template>
<script>
  import AppFooter from '../../components/footer/App-Footer'
  import { fetchVideoById } from '../../api/video'
  export default{
    data(){
      return {
        videoInfo : {},
        playIcon: 'Ⅱ',
        currentTime : 0,
        currentSpeed: '1.0x',
        wordSpeeds: ['2.0x', '1.5x', '1.0x', '0.5x'],
        selectedSrc: '标清',
        playUrl: '',
        selectedCol: false,
        selectedSup: false,
        loading: true,
        playend: false,
        volume: 0.5,
        volumeoff: false,
        comments: []
      }
    },
    components:{
      AppFooter
    },
    created(){
      const id = this.$route.params.id;
      console.info(id);
      fetchVideoById(id).then(res => {
        this.videoInfo = res.data;
        this.playUrl = this.videoInfo.playUrl
      })
    },
    methods :{
      updateBar(){

      },
      showReplayButton(){

      },
      //当视频可以播放时
      canplay(){
        const { video } = this.$refs;
        //隐藏加载
        this.loading = false;
        if(video){
          //将声音设置成默认0.5
          video.volume = this.volume;
        }
      },
      handleCollect(){

      },
      handleSupport(){

      },
      switchSrc(){

      },
      togglePlay(){

      },
      updateProgess(){

      },
      volumeOff(){

      },
      volumeOn(){

      },
      handleVolume(){

      },
      handleSpeed(){

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/mixins.scss';

  .video-player {
    width: 100%;
    min-height: 100vh;
    font-size: 1rem;
  }
  .player-bg {
    width: 100%;
    height: 39rem;
    background: linear-gradient(to right, #696453, #101014);
    padding: 4rem 0 2rem 0;
  @include mediaQ(480px) {
    height: 22rem;
    padding: 3.2rem 0 0 0;
    overflow: hidden;
  }
  @include mediaQ(768px, 481px) {
    padding: 3.7rem 0 0 0;
    height: 35rem;
  }
  @include mediaQ(960px, 769px) {
    height: 37rem;
  }
  }

  .player-wrapper {
    width: 62.5rem;
    height: 31.25rem;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  @include mediaQ(480px) {
    height: 22rem;
  }
  @include mediaQ(960px) {
    width: 100%;
  }

  &:hover > .slide {
     transform: translateX(0);
   }

  &:hover > .player-controls {
     transform: translateY(0);
   }



  .player-viewer {
    display: block;
    width: 62.5rem;
    height: 100%;
    cursor: pointer;
  @include mediaQ(480px) {
    position: absolute;
    top: -10%;
  }
  @include mediaQ(968px) {
    width: 100%;
  }
  }

  .slide {
    background: rgba(0, 0, 0, .2);
    position: absolute;
    top: 10%;
    right: 10%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    transform: translateX(375%);
    transition: all .3s;
  @include mediaQ(480px) {
    display: none;
  }

  &:hover {
     transform: translateY(0);
   }

  .silde-top {
    display: flex;
    flex-direction: column;
    align-items: center;
  // height:
     span {
       cursor: pointer;
       padding: .3rem 0;
     }
  svg {
    height: 2.5rem;
    width: 2.3rem;
    color: white;
  }

  .selected > svg {
    color: red;
  }
  }

  .videoSrc {
    display: flex;
    flex-direction: column;

  span {
    font-size: 1.2rem;
    color: white;
    padding: .5rem 1rem;
  // border: 1px solid rgba(0, 0, 0, .5);
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1px;

  &:hover {
     background: red;
   }
  }

  span.select {
    background: red;
  }
  }
  }

  .player-controls {
    position: absolute;
    height: 3rem;
    width: 55.5rem;
    background: rgba(0, 0, 0, .3);
    bottom: 0;
    left: calc(50% - (55.5rem / 2));
    display: flex;
    transform: translateY(100%);
    transition: all .3s;
  @include mediaQ(480px) {
    width: 100%;
    left: 0;
    bottom: 16%;
    height: 2.5rem;
  }

  .player-button {
    display: block;
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    cursor: pointer;
    font-size: 1.5rem;
  }

  .progress {
    width: 40rem;
    height: 100%;
    display: flex;
    align-items: center;
  @include mediaQ(480px) {
    width: 72%;
  }

  .progress-bar {
    width: 39rem;
    height: 5px;
    background: white;
    border-radius: 5px;
    position: relative;
    cursor: pointer;

  .progress-rate {
    position: absolute;
    border-radius: 5px;
    top:0;left: 0;bottom: 0;right: 100%;
    background: red;
  }
  }
  }

  .duration {
    display: block;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 .5rem;
    color: white;

  .curTime {
    color: red;
    font-size: 0.625rem;
    display: block;
    padding-right: .5rem;
  }
  }

  .player-volume {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
  @include mediaQ(960px) {
    display: none;
  }

  &:hover .volume-bar {
     display: block;
   }

  svg {
    width: 2rem;
    height: 2rem;
    color: white;
  }

  .volume-bar {
    position: absolute;
    display: none;
    width: 5px;
    height: 3.5rem;
    background: white;
    bottom: 72%;
    left: 50%;
    border-radius: 5px;
    transform: translateX(-50%);
    outline: 2px;
    transition: all .2s;
  }

  .volume-levle {
    position: absolute;
    bottom: 1%;
    left: 52%;
    width: 7px;
    height: 50%;
    background-color: red;
    border-radius: 5px;
    transform: translateX(-50%);
  }

  }

  .player-rate {
    align-self: center;
    color: white;
    width: 4rem;
    padding: .5rem .5rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 100%;
    transition: all .2s;
  @include mediaQ(480px) {
    display: none;
  }

  &:hover {
     background-color: rgba(0, 0, 0, .3);
   }

  &:hover > span {
     background: rgba(0, 0, 0, .3);
   }

  .current-value {
    display: block;
    width: 80%;
    height: 100%;
    font-size: 0.625rem;
    padding: 0 .4rem;
    text-align: center;
    height: 70%;
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: all .2s;
    background: red;
  }

  &:hover > .select {
     transform: translateY(-72%);
     display: block;
   }

  .select {
    width: 100%;
    position: absolute;
    left: 0;
    transform: translateY(40%);
    display: none;
    background: rgba(0, 0, 0, .4);
    transition: all .3s;

  span {
    display: block;
    width: 100%;
    text-align: center;
    padding: .3rem 0;
    transition: all .2s;

  &:hover {
     background: rgba(0, 0, 0, .4);
   }
  }
  }
  }
  }
  }

  .loading {
    height: 32rem;
    width: 63rem;
    background: #1A1A1A;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:9%;
    left: 10.8rem;
  @include mediaQ(480px) {
    height: 22rem;
    width: 100%;
    left: 0;
    top: 0;
  }
  @include mediaQ(768px, 481px) {
    height: 32rem;
    width: 100%;
    left: 0;
    top: 5%;
  }
  @include mediaQ(960px, 768px) {
    height: 32rem;
    width: 100%;
    left: 0;
    top: 5%;
  }
  @include mediaQ(1365px, 961px) {
    left: 5%;
    top: 5%;
  }

  img {
    width: 10%;
  }
  }

  .replay {
    width: 3rem;
    cursor: pointer;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  @include mediaQ(480px) {
    left: 50%;
    top: 15%;
    transform: translateX(-50%);
  }
  @include mediaQ(1365px, 481px) {
    top: 25%;
  }

  svg {
    width:3rem;
    height: 3rem;
  }

  .text {
    color: white;
    font-size: .625rem;
  }
  }

  .comments-frame {
    width: 63%;
    margin: 0 auto;
    display: flex;
    background: #F3F5F7;
    padding: 1rem;
  @include mediaQ(768px) {
    width: 100%;
  }
  @include mediaQ(960px, 769px) {
    width: 90%;
  }
  @include mediaQ(1365px, 961px) {
    width: 80%;
  }


  .avatar-wrapper {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  @include mediaQ(480px) {
    display: none;
  }
  }

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  }

  .comments-list-box {
    width: 63%;
    margin: 0 auto;
    margin-bottom: 1rem;
  @include mediaQ(768px) {
    width: 100%;
  }
  @include mediaQ(960px, 769px) {
    width: 90%;
  }
  @include mediaQ(1365px, 961px) {
    width: 80%;
  }

  h4 {
    border-bottom: 1px solid #777;
    padding: 1rem;
  }
  @include mediaQ(480px) {
    min-height: 25.5vh;
  }
  @include mediaQ(768px, 480px) {
    min-height: 19.5vh;
  }
  @include mediaQ(960px, 769px) {
    min-height: 27.5vh;
  }
  @include mediaQ(1365px, 961px) {
    min-height: 26vh;
  }
  }
</style>

