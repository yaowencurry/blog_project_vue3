<template>
  <div>
    <el-skeleton
      :rows="8"
      animated
      v-if="isLoging"
    />
    <template v-else>
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
            target="_blank"
            class="main-color artical-title"
          >{{item.article_info.title}}
          </a>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      isLoging: true
    }
  },
  mounted () {
    this.getHotList()
  },
  methods: {
    getHotList () {
      this.isLoging = true
      this.$api.GET_HOT_ARTICAL_LIST(null, false).then(res => {
        this.list = res.splice(0, 10)
        this.isLoging = false
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