<template>
  <div class="comment">
    <span class="m-right-20 pointer white tips">
      <i class="iconfont icon-prew"></i>
      <span class="white tips">{{data.prew}}</span>
    </span>
    <span class="m-right-20 pointer white">
      <i class="iconfont icon-comment"></i>
      <span class="white tips">{{data.comment}}</span>
    </span>
    <span
      class="m-right-20 pointer white tips"
      @click="handleSave"
    >
      <i
        class="iconfont icon-save"
        v-if="data.isSave == '0'"
      ></i>
      <i
        class="iconfont icon-saved"
        v-else
      ></i>
      <span class="white tips">{{data.save}}</span>
    </span>
    <span class="pointer white tips">
      <i class="iconfont icon-share"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'artical-comment',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    handleSave () {
      this.$emit('save', this.data.index)
    }
  }
}

</script>
<style  scoped>
.white {
  color: #333;
}
.comment {
  border-top: 1px solid #eee;
  padding: 15px 0;
}
@media screen and (max-width: 480px) {
  .comment {
    text-align: left;
    padding: 10px 0;
  }
}
</style>
