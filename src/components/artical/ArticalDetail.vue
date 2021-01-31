<template>
  <div id="detail" class="detail">
    <div class="artical-detail">
      <bread-crumb></bread-crumb>
      <h1>{{ detail.title }}</h1>
      <span class="p-bottom-20 d-block tips">{{ detail.ctime }}</span>
      <div v-html="detail.content"></div>
      <artical-comment :data="detail"></artical-comment>
    </div>
    <ArticalMenu
      :mark-down="detail.originmarkdown"
      :menuList="menuList"
      v-if="screeWidth > 900"
    />
  </div>
</template>

<script>
import BreadCrumb from "../bread-crumb/BreadCrumb";
import ArticalComment from "./artical-comment";
import { mapGetters } from "vuex";
import ArticalMenu from "./ArticalMenu";
import { nextTick,reactive } from 'vue'

export default {
  name: "artical-detail",
  async setup() {
    await nextTick()
    const titleList = Array.from(document.getElementById('detail').querySelectorAll('h2'));
    console.log(titleList)
    const menuList=reactive([])
    titleList.forEach((item, index) => {
        let obj = {
          h3Name: "",
          h4Children: [],
        };
        if (item.nodeName == "H3") {
          obj.h3Name = item.innerHTML;
          obj.href = "#data-h3-" + index;
          item.setAttribute("id", "data-h3-" + index);
          menuList.push(obj);
        }
      });
      console.log(menuList)
    return {
      menuList
    }
  },
  components: {
    BreadCrumb,
    ArticalComment,
    ArticalMenu,
  },

  computed: {
    ...mapGetters(["articalList", "screeWidth"]),
    data() {
      let obj = {};
      const id = this.$route.query.id;
      this.articalList.map((item) => {
        if (item.id === id) {
          obj = item;
        }
      });
      return obj;
    },
  },
  data() {
    return {
      menuList: [],
      detail: {},
    };
  },
  mounted() {
    this.getArticalDetail(this.$route.query.articalid);
  },
  methods: {
    getArticalDetail(articalid) {
      this.$api.GET_ARTICAL_DETAIL({ articalid }).then((res) => {
        if (res.code === 200) {
          this.detail = res.data;
        }
      });
    },
  },
};
</script>
<style src="../../assets/style/markdown.css"  scoped>
</style>
<style scoped>
@media screen and (min-width: 480px) {
  .detail {
    display: flex;
    justify-content: flex-start;
  }
  .artical-detail {
    width: 70%;
    padding: 20px;
    background-color: #fff;
    margin-right: 20px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  img {
    width: 100% !important;
  }
}
@media screen and (max-width: 480px) {
  :deep(img) {
    width: 100%;
  }
  .artical-detail {
    padding: 0;
    width: 100%;
  }
}
</style>
