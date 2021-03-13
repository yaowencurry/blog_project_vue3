<template>
  <div class="height-full-screen main-bg p-20 border-box">
    <p class="font-size-16 p-0 border-bottom p-bottom-10 bolder">热门资源</p>
    <div
      class="w-flex text-center m-top-20"
      style="flex-wrap: wrap"
    >
      <a
        v-for="(item,index) in hotList"
        :key="index"
        class="w-18 d-inline-bolck main-active-color font-size-14 border-box p-top-10 p-bottom-10 cursor-p border-radius-5 m-bottom-10"
        :style="{background: item.color}"
        :href="item.href"
        target="_blank"
      >{{item.name}}</a>
    </div>
    <p class="font-size-16 m-top-20 border-bottom p-bottom-10 bolder">电子书资源</p>
    <ul>
      <li
        v-for="(item,index) in bookList"
        :key="index"
        class="p-top-10 book-list"
      ><a :href="item.url" target="_blank">{{item.name}}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ApiDoc',
  data () {
    return {
      hotList: [
        { name: 'Vue', href: 'https://cn.vuejs.org/', color: '#007ffb' },
        { name: 'React', href: 'https://react.docschina.org/', color: '#007ffb' },
        { name: 'Angular', href: 'https://angular.cn/', color: '#007ffb' },
        { name: 'UNI-APP', href: 'https://uniapp.dcloud.io/api/request/network-file', color: '#007ffb' },
        { name: 'Element UI', href: 'https://uniapp.dcloud.io/api/request/network-file', color: '#007ffb' },
        { name: 'Webpack', href: 'https://www.webpackjs.com/', color: '#007ffb' },
        { name: 'Echarts', href: 'https://echarts.apache.org/zh/tutorial.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9E%84%E5%BB%BA%20ECharts', color: '#007ffb' },
        { name: 'Node js', href: 'http://nodejs.cn/learn/', color: '#007ffb' },
        { name: 'Ant Design', href: 'https://ant.design/docs/react/introduce-cn', color: '#007ffb' },
        { name: 'Antv', href: 'https://antv.vision/zh', color: '#007ffb' },
        { name: 'Bootcdn', href: 'https://www.bootcdn.cn/', color: '#007ffb' },
      ],
      bookList: [
        { name: '《Learning JavaScript Design Patterns》作者：Addy Osmani', url: 'https://addyosmani.com/resources/essentialjsdesignpatterns/book/' },
        { name: '《你不懂 JavaScript》系列', url: 'https://github.com/getify/You-Dont-Know-JS' },
        { name: '《JavaScript 秘密花园》', url: 'http://bonsaiden.github.io/JavaScript-Garden/zh/' },
        { name: '《jQuery 基础》', url: 'http://jqfundamentals.com/' },
        { name: '《Speaking JavaScript》', url: 'http://speakingjs.com/es5/' },
        { name: '《DOM Enlightenment》', url: 'http://domenlightenment.com/' },
        { name: '《Learn CSS Layout the pedantic way》', url: 'http://book.mixu.net/css/' },
        { name: '《Node 的艺术》', url: 'https://github.com/maxogden/art-of-node/blob/master/readme.zh-cn.md' },
        { name: '《深入 HTML 画布》', url: 'https://joshondesign.com/p/books/canvasdeepdive/toc.html' },
      ]
    }
  }
}

</script>
<style scoped>
li {
  list-style: none;
}
.book-list a {
  color: #333 !important;
}

.book-list a:hover {
  color: rgb(0, 127, 251) !important;
}

</style>