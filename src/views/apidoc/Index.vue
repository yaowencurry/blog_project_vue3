<template>
  <div class="height-full-screen main-bg p-20 border-box">
    <p class="font-size-16 p-0 border-bottom p-bottom-10 bolder">热门框架</p>
    <div class="w-flex text-center m-top-20">
      <a
        v-for="(item,index) in hotList"
        :key="index"
        class="w-18 d-inline-bolck main-active-color font-size-14 border-box p-top-10 p-bottom-10 cursor-p border-radius-5"
        :style="{background: item.color}"
        :href="item.href"
        target="__blank"
      >{{item.name}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiDoc',
  data () {
    return {
      hotList: [
        { name: 'Vue', href: 'https://cn.vuejs.org/', color: '#3bb885' },
        { name: 'React', href: 'https://react.docschina.org/', color: '#5bdaf9' },
        { name: 'Angular', href: 'https://angular.cn/', color: '#df0333' },
        { name: 'React', href: 'https://cn.vuejs.org/', color: '#3bb885' },
        { name: 'React', href: 'https://cn.vuejs.org/', color: '#3bb885' },
      ]
    }
  }
}

</script>
<style scoped>
</style>