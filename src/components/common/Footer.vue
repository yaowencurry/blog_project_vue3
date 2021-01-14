<template>
  <div>
    <div class="mine-git">
      <i
        class="iconfont icon-github"
        @click="handleOpen"
      ></i>
      <i
        class="iconfont icon-weixin"
        @mouseenter="isHoverWeinxin = true"
        @mouseleave="isHoverWeinxin = false"
      ></i>
      <img
        class="weixin-logo"
        src="../../assets/image/weixin.jpg"
        alt=""
        v-if="isHoverWeinxin"
      >
    </div>
    <p class="title">—— 友情链接 ——</p>
    <ul class="footer">
      <li
        v-for="(item,index) in list"
        :key="index"
      >
        <a
          :href="item.href"
          target="_blank"
        >{{item.name}}</a>
      </li>

    </ul>
    <div class="design">
      <span class="tips">人间值得</span><br>
      <span class="tips">Copyright ©yaowen 2020</span>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

function createList () {
  const state = reactive({
    list: [
      { name: 'Github', href: 'https://github.com/' },
      { name: 'Vue官方', href: 'https://cn.vuejs.org/' },
      { name: 'React官方', href: 'https://react.docschina.org/' },
      { name: 'Element UI', href: 'https://element.eleme.cn/#/zh-CN' },
      { name: '菜鸟教程', href: 'https://www.runoob.com/typescript/ts-tutorial.html' },
    ]
  })

  return state
}

export default {
  name: 'MyFooter',
  setup () {
    const { list } = createList();
    const isHoverWeinxin = ref(false);
    return {
      list,
      isHoverWeinxin
    }
  },
  methods: {
    handleOpen () {
      window.open('https://github.com/yaowencurry')
    }
  }
}

</script>
<style scoped>
.title {
  color: #999;
  padding-bottom: 10px;
}
.footer {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  color: #999;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 10001;
}
li {
  padding: 5px;
}
a:hover {
  color: #fff;
  text-decoration: underline;
}
.design {
  margin: 30px 0;
  display: block;
}
.mine-git {
  margin-top: 10%;
  position: relative;
}
.mine-git i {
  font-size: 26px;
  padding: 0 8px;
  cursor: pointer;
  color: #ddd;
}
.mine-git i:hover {
  color: #fff;
}
.icon-weixin {
  color: #06ac2c !important;
}
.weixin-logo {
  position: absolute;
  top: 0;
  width: 120px;
  height: 120px;
  margin-top: -50px;
}
</style>