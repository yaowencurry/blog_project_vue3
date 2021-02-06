<template>
  <div class="index">
    <el-input
      placeholder="请输入内容"
      v-model="condition"
      class="input-with-select m-bottom-10"
      @keyup.enter="handleSearch(getArticalList)"
    >
      <template #append>
        <el-button
          icon="el-icon-search"
          @click="handleSearch(getArticalList)"
        ></el-button>
      </template>
    </el-input>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in menuList"
        :key="item"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <artical-list
      :data="data"
      @save="handleSave"
    ></artical-list>
  </div>
</template>

<script>
import ArticalList from "../../components/artical/artical-list";
import { mapMutations, mapGetters } from "vuex";

import { createSearch } from '@/utils/help'

export default {
  name: "HomeIndex",

  setup () {
    const { condition, handleSearch } = createSearch();

    return {
      condition,
      handleSearch,
    }
  },
  components: {
    ArticalList,
  },
  data () {
    return {
      data: [],
      list: [],
      activeName: '',
      menuList: [{
        label: 'HTML',
        name:'HTML'
      },{
        label: 'CSS',
        name:'CSS'
      },{
        label: 'JAVASCRIPT',
        name:'JAVASCRIPT'
      },{
        label: 'NODE JS',
        name:'NODE JS'
      }]
    };
  },
  computed: {
    ...mapGetters(["articalList"]),
  },
  mounted () {
    this.getArticalList()
  },
  methods: {
    ...mapMutations(["SAVE_ARTICAL"]),
    handleClick(val) {
      console.log(val.index)
      this.getArticalList(this.menuList[Number(val.index)].name)
    },
    getArticalList (condition) {
      this.$api.GET_ARTICAL_LIST({ condition }).then((res) => {
        if (res) {
          this.data = res;
        }
      });
    },
    handleSave (index) {
      if (this.articalList[index].isSave === "0") {
        this.articalList[index].isSave = "1";
        this.articalList[index].save = this.articalList[index].save * 1 + 1;
      }
    },
  },
};
</script>
<style scoped>
.index {
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
}
@media screen and (max-width: 480px) {
  .index {
    padding: 0;
  }
}
</style>