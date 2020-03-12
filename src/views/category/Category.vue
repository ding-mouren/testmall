<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <li>分类列表1</li>
      <li>分类列表2</li>
      <li>分类列表3</li>
      <li>分类列表4</li>
      <li>分类列表5</li>
      <li>分类列表6</li>
      <li>分类列表7</li>
      <li>分类列表8</li>
      <li>分类列表9</li>
      <li>分类列表10</li>
      <li>分类列表11</li>
      <li>分类列表12</li>
      <li>分类列表13</li>
      <li>分类列表14</li>
      <li>分类列表15</li>
      <li>分类列表16</li>
      <li>分类列表17</li>
      <li>分类列表18</li>
      <li>分类列表19</li>
      <li>分类列表20</li>
      <li>分类列表21</li>
      <li>分类列表22</li>
      <li>分类列表23</li>
      <li>分类列表24</li>
      <li>分类列表25</li>
      <li>分类列表26</li>
      <li>分类列表27</li>
      <li>分类列表28</li>
      <li>分类列表29</li>
      <li>分类列表30</li>
      <li>分类列表31</li>
      <li>分类列表32</li>
      <li>分类列表33</li>
      <li>分类列表34</li>
      <li>分类列表35</li>
      <li>分类列表36</li>
      <li>分类列表37</li>
      <li>分类列表38</li>
      <li>分类列表39</li>
      <li>分类列表40</li>
      <li>分类列表41</li>
      <li>分类列表42</li>
      <li>分类列表43</li>
      <li>分类列表44</li>
      <li>分类列表45</li>
      <li>分类列表46</li>
      <li>分类列表47</li>
      <li>分类列表48</li>
      <li>分类列表49</li>
      <li>分类列表50</li>
      <li>分类列表51</li>
      <li>分类列表52</li>
      <li>分类列表53</li>
      <li>分类列表54</li>
      <li>分类列表55</li>
      <li>分类列表56</li>
      <li>分类列表57</li>
      <li>分类列表58</li>
      <li>分类列表59</li>
      <li>分类列表60</li>
      <li>分类列表61</li>
      <li>分类列表62</li>
      <li>分类列表63</li>
      <li>分类列表64</li>
      <li>分类列表65</li>
      <li>分类列表66</li>
      <li>分类列表67</li>
      <li>分类列表68</li>
      <li>分类列表69</li>
      <li>分类列表70</li>
      <li>分类列表71</li>
      <li>分类列表72</li>
      <li>分类列表73</li>
      <li>分类列表74</li>
      <li>分类列表75</li>
      <li>分类列表76</li>
      <li>分类列表77</li>
      <li>分类列表78</li>
      <li>分类列表79</li>
      <li>分类列表80</li>
      <li>分类列表81</li>
      <li>分类列表82</li>
      <li>分类列表83</li>
      <li>分类列表84</li>
      <li>分类列表85</li>
      <li>分类列表86</li>
      <li>分类列表87</li>
      <li>分类列表88</li>
      <li>分类列表89</li>
      <li>分类列表90</li>
      <li>分类列表91</li>
      <li>分类列表92</li>
      <li>分类列表93</li>
      <li>分类列表94</li>
      <li>分类列表95</li>
      <li>分类列表96</li>
      <li>分类列表97</li>
      <li>分类列表98</li>
      <li>分类列表99</li>
      <li>分类列表100</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data(){
      return{
        scroll:null
      }
    },

    //组件创建完后使用
    //created不能引用document
    created() {
      //console.log(this.$refs.aaa); //undefined
      // console.log(document.querySelector('.wrapper'));
      // this.scroll = new BScroll(this.$refs.aaa,{
      //
      // })
    },
    mounted() {
      //默认情况下，BScroll不能实时监听滚动位置
      //probe：侦测（是否实时侦测）
      //probeType
      //0和1都是不侦测实时的位置
      //类型：Number
      //默认值：0
      //可选值：1、2、3
      //作用：有时候我们需要知道滚动的位置。
      // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
      // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
      // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，
      // 而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
      this.scroll = new BScroll(this.$refs.aaa,{
        probeType:2,
        pullUpLoad:true
      })

      this.scroll.on('scroll',(position) =>{
        // console.log(position);
      })

      this.scroll.on('pullingUp',() =>{
        console.log('上拉加载更多');
      })
    }

  }
</script>

<style scoped>
  /*<!--原生事项滚动（卡顿）-->*/
  .wrapper{
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*overflow-y:scroll ;*/
  }
</style>
