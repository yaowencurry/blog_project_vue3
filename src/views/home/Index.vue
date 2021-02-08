<template>
  <div class="index">
    <div class="search-box p-top-10 p-left-10 p-right-10 m-bottom-10">
      <el-input
        placeholder="请输入内容"
        v-model="condition"
        class="input-with-select m-bottom-10"
        @keyup.enter="handleSearch(getSearchList)"
      >
        <template #append>
          <el-button
            icon="el-icon-search"
            @click="handleSearch(getSearchList)"
          ></el-button>
        </template>
      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="item in menuList"
          :key="item"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <el-skeleton
      :rows="20"
      animated
      v-if="isLoging"
    />
    <artical-list
      v-else
      :data="state.list"
    ></artical-list>
  </div>
</template>

<script>
import ArticalList from "../../components/artical/artical-list";
import { createSearch, articalListHelp } from '@/utils/help'
import { ref, onMounted, watch } from 'vue'

export default {
  name: "HomeIndex",

  setup () {
    const { condition, handleSearch } = createSearch()
    const activeName = ref('')
    const { state, getArticalList, isLoging } = articalListHelp()

    const getSearchList = () => {
      getArticalList({ condition: condition.value, type: activeName.value })
    }

    onMounted(getArticalList({ condition: condition.value }))

    watch(activeName, (newVal) => {
      getArticalList({ condition: condition.value, type: newVal === '0' ? '' : newVal })
    })

    return {
      condition,
      handleSearch,
      state,
      getArticalList,
      isLoging,
      activeName,
      getSearchList
    }
  },
  components: {
    ArticalList,
  },
  data () {
    return {
      menuList: Object.freeze([{
        label: '全部',
        name: ''
      }, {
        label: 'HTML',
        name: '1'
      }, {
        label: 'CSS',
        name: '2'
      }, {
        label: 'JAVASCRIPT',
        name: '3'
      }, {
        label: 'Vue',
        name: '5'
      }, {
        label: 'React',
        name: '6'
      }, {
        label: 'NODE JS',
        name: '4'
      }]),
      scroll: null
    }
  },
  // watch: {
  //   activeName (newVal) {
  //     this.getArticalList(this.condition, newVal)
  //   }
  // },
  // mounted () {
  //   this.getArticalList()
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  // activated () {
  //   console.log(this.scroll);
  //   if (this.scroll > 0) {
  //     window.scrollTo(0, this.scroll)
  //     this.scroll = 0
  //     window.addEventListener('scroll', this.handleScroll)
  //   }
  // },
  // beforeUnmount () {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
  // methods: {
  //   handleScroll () {
  //     this.scroll = document.documentElement && document.documentElement.scrollTop
  //   },
  //   getArticalList (condition, type) {
  //     this.isLoging = true;
  //     this.$api.GET_ARTICAL_LIST({ condition, type }, false).then((res) => {
  //       if (res) {
  //         this.data = res;
  //         this.isLoging = false;
  //       }
  //     });
  //   },
  // },
};
</script>
<style scoped>
.index {
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
}
.search-box {
  position: sticky;
  top: 0;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
}
@media (prefers-color-scheme: light) {
  .search-box {
    background-color: #fff;
  }
}
@media (prefers-color-scheme: dark) {
  .search-box {
    background-color: #666666;
  }
}
@media screen and (max-width: 480px) {
  .index {
    padding: 0;
  }
}
</style>