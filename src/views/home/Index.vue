<template>
  <div class="index">
    <artical-list :data="data" @save="handleSave"></artical-list>
  </div>
</template>

<script>
import ArticalList from "../../components/artical/artical-list";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "HomeIndex",
  components: {
    ArticalList,
  },
  data() {
    return {
      data: [],
      list: [],
    };
  },
  computed: {
    ...mapGetters(["articalList"]),
  },
  mounted() {
    this.getArticalList()
  },
  methods: {
    ...mapMutations(["SAVE_ARTICAL"]),
    getArticalList() {
      this.$api.GET_ARTICAL_LIST().then((res) => {
        if (res) {
          console.log(res)
          this.data = res;
        }
      });
    },
    handleSave(index) {
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
  background-color: #fff;
  min-height: calc(100vh - 60px);
  padding: 20px 0;
  box-sizing: border-box;
}
@media screen and (max-width: 480px) {
  .index {
    padding: 0;
  }
}
</style>