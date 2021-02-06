<template>
  <div>
    <div
      class="text-center border-top p-top-10"
      style="color: #007fff"
    >热门文章</div>
    <ul class="p-right-10 p-left-10 p-bottom-10">
      <li
        v-for="item in list"
        :key="item.article_id"
        class="line-clamp-1 p-top-10"
      >
        <a
          :href="`https://juejin.cn/post/${item.article_id}`"
          target="__blank"
          class="main-color artical-title"
        >{{item.article_info.title}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getHotList()
  },
  methods: {
    getHotList () {
      this.$api.GET_HOT_ARTICAL_LIST().then(res => {
        this.list = res.splice(0, 10)
      })
    }
  }
}

</script>
<style scoped>
.artical-title:hover {
  color: #007fff;
}
</style>