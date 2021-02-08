<template>
  <div class="w-flex flex-start comment border-bottom p-bottom-10 m-top-10">
    <img
      class="avatar"
      :src="info.avatar"
      :alt="头像"
    >
    <div class="comment-info m-left-10 border-box">
      <div class="w-flex">
        <h4
          class="m-0 p-0 main-color"
          style="font-size: 16px"
        >{{info.name}}</h4>
        <span class="color-grey font-size-12 greay-color">{{info.ctime}}</span>
      </div>
      <div class="font-size-14 main-color">{{info.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    info: {
      type: Object
    }
  }
}

</script>
<style scoped>
.comment {
  align-items: flex-start;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.comment-info {
  width: calc(100% - 50px);
}
</style>