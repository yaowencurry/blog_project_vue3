<template>
  <div>
    <div
      class="artical-list p-top-20 p-bottom-20 m-top-20 m-bottom-20"
      v-for="(item) in articalList"
      :key="item.id"
      @click="handleDetail(item)"
    >
      <h2 class="pointer white title">{{item.title}}</h2>
      <div
        class="artical-cal"
        v-if="screeWidth <= 480"
      >
        <span class="white tips">发表时间：{{item.ctime}}</span>
        <span class="white tips"> | </span>
        <span class="white tips">作者：{{item.author}}</span>
      </div>
      <div
        class="artical-cal"
        v-if="screeWidth > 480"
      >
        <span class="white tips">发表时间：{{item.ctime}}</span>
        <span class="white tips"> | </span>
        <span class="white tips">作者：{{item.author}}</span>
        <span class="white tips"> | </span>
        <span class="white tips">字数统计：{{item.count}}</span>
        <span class="white tips"> | </span>
        <span class="white tips">阅读时长：{{item.timer}}</span>
      </div>
      <!-- <p class="artical-list__content p-20 border-box white">{{ screeWidth > 480 ? item.detail : item.detail.slice(0,40) + '...'}}</p> -->
      <p class="artical-list__content p-20 border-box white">{{ screeWidth > 480 ? item.detail : item.detail.slice(0,60) + '...'}}</p>
      <!-- <div
        v-if="screeWidth > 480"
        class="m-auto btn detail-btn"
        @click="handleDetail(item)"
      >查看详情</div> -->
      <!-- <artical-comment
        :data="{...item,index}"
        @save="handleSave"
      ></artical-comment> -->
    </div>
  </div>
</template>

<script>
// import ArticalComment from '../artical/artical-comment'
import { mapGetters } from 'vuex'

export default {
  name: 'artical-list',
  // components: {
  //   ArticalComment
  // },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'articalList', 'screeWidth'
    ])
  },
  methods: {
    handleDetail ({ id }) {
      this.$router.push({ name: 'ArticalDetail', query: { id } })
    },
    handleSave (index) {
      this.$emit('save', index)
    }
  }
}

</script>
<style  scoped>
span.tips {
  color: #999;
}
.artical-list:hover {
  background: #fdfdfd;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
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
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  padding: 10px 0;
}
.detail-btn {
  background-color: #333;
  color: #fff;
  text-align: center;
}
.white {
  color: #333;
}
.title {
  text-align: left;
  font-weight: 500;
  margin-bottom: 5px;
  color: #000;
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
