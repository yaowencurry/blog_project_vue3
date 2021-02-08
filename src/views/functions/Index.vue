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
    <el-skeleton
      :rows="8"
      animated
      v-if="isLoging"
    />
    <template v-else>
      <FunctionItem
        v-for="item in data"
        :key="item.articalid"
        :info="item"
      />
    </template>
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
      data: [],
      isLoging: true
    }
  },
  mounted () {
    this.getFunctionsList();
  },
  methods: {
    getFunctionsList () {
      this.isLoging = true;
      this.$api.GET_ARTICAL_LIST({ articalclass: '2', condition: this.condition }).then((res) => {
        if (res) {
          this.data = res;
          this.isLoging = false;
        }
      });
    },
  }
}

</script>
<style scoped>
</style>