<template>
  <div class="index w-flex">
    <div class="index_left">
      <router-view></router-view>
    </div>
    <div class="index_right main-bg p-top-10 border-box">
      <div class="p-top-10 p-left-10 p-right-10">
        <Clock />
        <MyTime />
      </div>
      <HotArticalList />
      <div
        class="text-center main-color p-top-10 p-bottom-10 border-top cursor-p"
        style="font-size: 12px;"
        @click="backTop"
      >回到顶部</div>
    </div>
  </div>
</template>

<script>

import MyTime from '../components/time/MyTime'
import Clock from '../components/time/Clock';
import HotArticalList from '../components/artical/HotArticalList';


export default {
  name: 'App',
  components: {
    MyTime,
    Clock,
    HotArticalList
  },
  setup () {
    function backTop () {
      scrollTo(0, 0);
    }
    return {
      backTop,
    }
  }
}
</script>

<style>
.index {
  align-items: flex-start;
  box-sizing: border-box;
}
.index_left {
  width: 75%;
  box-sizing: border-box;
  margin-right: 20px;
}
.index_right {
  position: sticky;
  top: 20px;
  width: 25%;
}
</style>
