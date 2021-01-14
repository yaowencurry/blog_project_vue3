<template>
  <el-carousel
    :interval="5000"
    arrow="always"
    height="360px"
    type="card"
    class="banner"
  >
    <el-carousel-item
      v-for="(item,index) in bannerList"
      :key="index"
    >
      <!-- <div
        :style="{
        backgroundImage: `url(${item.src})`
      }"
        class="banner-box"
      ></div> -->
      <img :src="item.src" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import {  ElCarousel,
  ElCarouselItem,} from 'element-plus'
export default {
  name: 'Banner',
  components: {
    'el-carousel': ElCarousel,
    'el-carousel-item': ElCarouselItem
  },
  data () {
    return {
      bannerList: [
        { src: 'https://s3.ax1x.com/2020/12/11/rkfjDs.jpg' },
        { src: 'https://s3.ax1x.com/2020/12/11/rkfzEq.jpg' },
        { src: 'https://s3.ax1x.com/2020/12/11/rkfLvQ.jpg' },
        { src: 'https://s3.ax1x.com/2020/12/11/rkfHC8.jpg' },
      ]
    }
  },
}

</script>
<style  scoped>
.banner {
  width: 100%;
  margin: 20px auto;
}
.el-carousel__mask {
  opacity: 0.5;
  background-color: #000;
}
.el-carousel__item--card {
  border-radius: 30px;
}
.banner-box {
  height: 300px;
  background-size: cover;
}
</style>