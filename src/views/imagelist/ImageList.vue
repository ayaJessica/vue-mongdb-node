<template>
<div class="imagelist">
  <div class="iamgesWrapper">
    <Loading :center="true" v-show="!images.lenght"></Loading>
    <ImageItem v-for="image in images" :key="images._id" :image="image"></ImageItem>
  </div>
  <a href="#" class="loadMore" @click.prevent="fetchMore" v-show="images.length && fetchCount <= 1">加载更多</a>
  <Loading v-show="this.$store.state.isFetch"></Loading>
  <!--<router-view></router-view>-->
  <AppFooter v-show="images.length"></AppFooter>
</div>
</template>
<script>
  import ImageItem from "../../components/imageitem/ImageItem"
import AppFooter from '../../components/footer/App-Footer'
  import Loading from '../../components/loading/loading'
  import { mapState } from 'vuex'
  export default{
    components : {
      ImageItem,
      AppFooter,
      Loading
    },
    created(){
      this.$store.commit('FETCH_IMAGES',this.fetchCount)
    },
    computed : {
      ...mapState({
        images : 'images',
        fetchCount : 'fetchCount'
      })
    },
  methods : {
    fetchCount (){

    }
  }
  }
</script>
<style lang="scss" scoped>
  @import 'src/assets/scss/mixins.scss';

  .imagelist {
    text-align: center;
    padding-top: 1rem;

  .imagesWrapper {
  @include stickFooter;
    width: 79rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  @include mediaQ(1365px) {
    width: 100%;
  }
  }

  .loadMore {
    display: inline-block;
    padding: .5rem;
    margin: 1rem;
    color: white;
    background: #999;
    border-radius: 5px;
  }
  }
</style>
