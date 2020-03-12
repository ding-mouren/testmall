<template>
  <div id="home">
    <!--home购物街-->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"></tab-control>
    <!--滚动-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--推荐-->
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <!--内容-->
      <feature></feature>
      <!--选项卡-->
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <!--商品列表-->
      <goods-list :goods="shoeGoods"></goods-list>
    </scroll>
    <!--回到顶点-->
    <!--组件不能直接监听点击-->
    <!--要加.native-->
    <!--v-show="isShowBackTop"：按钮的显示与隐藏-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  //子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import Feature from './childComps/Feature'

  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    data(){
      return{
        //保存数据（网络请求的数据）
        // result:null
        //轮播图数据
        banners:[],
        //轮播图下面（推荐信息）的数据
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      shoeGoods(){
        return this.goods[this.currentType].list;
      }
    },
    components:{
      Scroll,
      HomeSwiper,
      HomeRecommendView,
      Feature,
      BackTop,

      NavBar,
      TabControl,
      GoodsList
    },
    created() {
      //1、请求多个数据
      this.getHomeMultidata()

      //2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      //1、监听item中图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('itemImageLoad',()=>{
        refresh();
      })
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods:{
      /**
       * 事件监听相关的方法
       */

      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentType = index;
        this.$refs.tabControl2.currentType = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        // position.y >1000;
        //1、判断按钮的显示与隐藏
        this.isShowBackTop = (-position.y) > 1000

        //2、判断tabControl是否吸顶（position：fixed）
        this.isLoad = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)

        // this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad(){

        //2、获取tabControl的topOffsetTop
        //所有组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */

      //1、请求多个数据
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          // console.log(res);
          //箭头函数中的this
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      //2、请求商品数据
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;

    /*//子绝父相*/
    /*position: relative;*/
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #f6f6f6;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content{
    /*height: 300px;*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom:49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

  /*.content{*/
    /*height: calc(100% - 50px);*/
    /*overflow: hidden;*/
    /*!*margin-top: 44px;*!*/
  /*}*/
</style>
