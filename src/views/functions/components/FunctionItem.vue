<template>
  <div class="function border-bottom">
    <div
      class="function-title w-flex p-10 cursor-p font-size-14"
      @click="handleDetail"
    >
      <p class="bolder">{{info.title}}
        <EditButton :articalid="info.articalid" />
      </p>
      <p class="greay-color font-size-12">{{info.ctime}}</p>
    </div>
    <div :style="{maxHeight: height + 'px', overflow: 'hidden'}">
      <FunctionDetail
        v-show="detailShow"
        :content="detail.content"
      />
    </div>
  </div>
</template>

<script>
import FunctionDetail from './FunctionDetail'
import EditButton from '@/components/artical/EditButton'
export default {
  name: 'FunctionItem',
  components: {
    FunctionDetail,
    EditButton
  },
  props: {
    info: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false,
      detail: {},
      height: 0
    }
  },
  methods: {
    handleDetail () {
      this.detailShow = !this.detailShow;
      if (this.detailShow) {
        this.height = 99999;
      } else {
        this.height = 0;
      }
      if (!this.detailShow) return;
      this.$api.GET_ARTICAL_DETAIL({ articalid: this.info.articalid })
        .then((res) => {
          if (res.code === 200) {
            this.detail = res.data;
          }
        })
    }
  }
}

</script>

<style scoped>
.function-title:hover {
  background-color: #eee;
}
</style>