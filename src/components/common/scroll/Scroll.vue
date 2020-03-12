<template>
  <!--ref/children：绑定在子组件上-->
  <!--div上ref也可以-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return{
        scroll:null
      }
    },
    props:{
      //scroll属性
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //1、创建BSroll对象
      //document.querySelector('.wrapper')(不推荐)
      //因为其他组件内也有class=wrapper
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2、监听滚动位置
      if (this.probeType === 2||this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
          // console.log(position);
          this.$emit('scroll',position)
        })
      }

      //3、监听上拉事件
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          // console.log('上拉加载更多');
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y :  0
      }
    }
  }
</script>

<style scoped>

</style>
