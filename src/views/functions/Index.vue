<template>
  <div class="height-full-screen main-bg p-20 border-box">
    <el-input
      placeholder="请输入内容"
      v-model="condition"
      class="input-with-select m-bottom-10"
      @keyup.enter="handleSearch(getFunctionsList)"
    >
      <template #append>
        <el-button
          icon="el-icon-search"
          @click="handleSearch(getFunctionsList)"
        ></el-button>
      </template>
    </el-input>
    <FunctionItem
      v-for="item in data"
      :key="item.articalid"
      :info="item"
    />
  </div>
</template>

<script>
import FunctionItem from './components/FunctionItem'
import { createSearch } from '@/utils/help'

export default {
  name: 'Functions',
  setup () {
    const { condition, handleSearch } = createSearch();

    return {
      condition,
      handleSearch,
    }
  },
  components: {
    FunctionItem
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.getFunctionsList();
  },
  methods: {
    getFunctionsList () {
      this.$api.GET_ARTICAL_LIST({ articalclass: '2', condition: this.condition }).then((res) => {
        if (res) {
          this.data = res;
          console.log(res);
        }
      });
    },
  }
}

</script>
<style scoped>
</style>