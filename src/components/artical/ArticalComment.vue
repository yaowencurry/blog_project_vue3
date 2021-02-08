<template>
  <div class="comment main-bg p-top-10 p-bottom-10 p-left-20 p-right-20 border-top">
    <div class="w-flex">
      <el-input
        v-model="content"
        type="textarea"
        :rows="2"
        class="comment-input"
        placeholder="说点什么吧..."
      ></el-input>
      <el-button
        type="primary"
        style="width: 100px"
        @click="handleSave"
      >发表评论</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  name: 'artical-comment',
  props: {
    articalid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    handleSave () {
      if (this.content.length < 3) {
        return ElMessage.error('少于3个字的评论，多说点吧...');
      }
      if(this.content.length > 500) {
        return ElMessage.error('最多可发表200字评论，要不分两条发一下吧...');
      }
      this.$api.ADD_COMMENT({ articalid: this.articalid, content: this.content })
        .then(res => {
          if (res.code === 200) {
            ElMessage.success('评论发表成功');
            this.content = '';
            this.$emit('comment')
          }
        })
    }
  }
}

</script>
<style  scoped>
.white {
  color: #333;
}
.comment-input {
  margin-right: 10px;
  width: 80%;
  height: auto;
}

.comment {
  position: sticky;
  bottom: 0;
}
@media screen and (max-width: 480px) {
  .comment {
    text-align: left;
    padding: 10px 0;
  }
}
</style>
