<template>
  <div>
    <template v-if="data.length > 0">
      <div
        class="artical-list p-top-20 p-bottom-20 m-top-20 m-bottom-20 main-bg"
        v-for="(item) in data"
        :key="item.id"
        @click="handleDetail(item)"
      >
        <h2 class="pointer main-color title">{{item.title}}</h2>
        <div
          class="artical-cal"
          v-if="screeWidth <= 480"
        >
          <span class="main-color tips">更新时间：{{item.ctime}}</span>
          <span class="main-color tips"> | </span>
          <span class="main-color tips">作者：{{item.author}}</span>
        </div>
        <div
          class="artical-cal"
          v-if="screeWidth > 480"
        >
          <span class="main-color tips">发表时间：{{item.ctime}}</span>
          <span class="main-color tips"> | </span>
          <span class="main-color tips">作者：{{item.author}}</span>
        </div>
        <p class="artical-list__content p-top-10 border-box main-color font-size-14">{{ screeWidth > 480 ? item.desc : item.desc.slice(0,60) + '...'}}</p>
      </div>
    </template>
    <div
      v-else
      class="p-20 text-center font-size-12"
    >我是有底线的，没有数据呢...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'artical-list',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'screeWidth'
    ])
  },
  methods: {
    handleDetail ({ articalid }) {
      this.$router.push({ name: 'ArticalDetail', query: { articalid } })
    },
  }
}

</script>
<style  scoped>
/* span.tips {
  color: #999;
} */
.artical-list:hover {
  background: #fdfdfd;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
@media (prefers-color-scheme: dark) {
  .artical-list:hover {
    background: #252526;
  }
}
.artical-list {
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  padding: 10px 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
.artical-list__content {
  /* height: 90px; */
  line-height: 1.7;
  /* color: #333; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  /* padding: 10px 0; */
}
.detail-btn {
  background-color: #333;
  text-align: center;
}
/* .main-color {
  color: #333;
} */
.title {
  text-align: left;
  font-weight: 500;
  margin-bottom: 5px;
  /* color: #000; */
  font-size: 18px;
}
@media screen and (max-width: 480px) {
  .artical-list__content {
    font-size: 14px;
    padding: 10px 0;
    height: auto;
  }
  .pointer {
    font-size: 16px;
    text-align: left;
    color: #000;
    font-weight: 500;
  }
  .artical-list {
    padding: 10px 0;
    border-bottom: 1px solid #eeeeee;
  }
}
</style>
