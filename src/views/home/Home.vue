<template>
  <div id="home">
    <!--home购物街-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--轮播图-->
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import HomeSwiper from './childComps/HomeSwiper'

  import HomeRecommendView from './childComps/HomeRecommendView'

  import {getHomeMultidata} from 'network/home'


  // import Swiper from 'components/common/swiper/Swiper'
  // import SwiperItem from 'components/common/swiper/SwiperItem'


  export default {
    name: "Home",
    data(){
      return{
        //保存数据（网络请求的数据）
        // result:null
        //轮播图数据
        banners:[],
        //轮播图下面（推荐信息）的数据
        recommends:[]
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommendView
    },
    created() {
      //1、请求多个数据
      getHomeMultidata().then(res =>{
        console.log(res);
        //箭头函数中的this
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #f6f6f6;
  }
</style>
