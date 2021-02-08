<template>
  <div
    id="detail"
    class="detail"
  >
    <div class="artical-detail main-bg">
      <div class="p-20">
        <el-skeleton
          :rows="15"
          animated
          v-if="isLoging"
        />
        <template v-else>
          <bread-crumb></bread-crumb>
          <h1>{{ detail.title }}</h1>
          <div class="w-flex flex-start m-bottom-10">
            <span class="d-block tips">{{ detail.ctime }}</span>
            <EditButton :articalid="detail.articalid" style="margin-left: 6px"/>
          </div>
          <DetailHtml :content="detail.content" />
        </template>
      </div>
      <ArticalComment
        :articalid="articalid"
        @comment="getCommentList(articalid)"
      />
      <div class="p-right-20 p-left-20 p-bottom-20">
        <CommentList
          v-for="item in commentList"
          :key="item.commentid"
          :info="item"
        />
      </div>
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
import { mapGetters } from "vuex";
import ArticalMenu from "./ArticalMenu";
import EditButton from '@/components/artical/EditButton'
import ArticalComment from './ArticalComment';
import CommentList from './CommentList';
import DetailHtml from './DetailHtml'

export default {
  name: "artical-detail",
  components: {
    BreadCrumb,
    ArticalComment,
    ArticalMenu,
    EditButton,
    CommentList,
    DetailHtml
  },

  computed: {
    ...mapGetters(["screeWidth"]),
    data () {
      let obj = {};
      const id = this.$route.query.id;
      this.articalList.map((item) => {
        if (item.id === id) {
          obj = item;
        }
      });
      return obj;
    },
    articalid () {
      return this.$route.query.articalid;
    }
  },
  data () {
    return {
      menuList: [],
      detail: {},
      commentList: [],
      isLoging: true
    };
  },
  async mounted () {
    await this.getArticalDetail(this.articalid);
    await this.getCommentList(this.articalid);
  },
  methods: {
    getCommentList (articalid) {
      this.$api.GET_COMMENT_LIST({ articalid })
        .then(res => {
          if (res.code === 200) {
            this.commentList = res.data;
          }
        })
    },
    getArticalDetail (articalid) {
      this.$api.GET_ARTICAL_DETAIL({ articalid })
        .then((res) => {
          if (res.code === 200) {
            this.detail = res.data;
          }
        })
        .then(() => {
          this.isLoging = false
          this.$nextTick(this.createMenuList)
        })
    },
    createMenuList () {
      let titleList = document.getElementById('detail').querySelectorAll('h2');
      if ([...titleList].length < 1) {
        titleList = document.getElementById('detail').querySelectorAll('h1');
      }
      titleList.forEach((item, index) => {
        let obj = {
          h3Name: "",
          h4Children: [],
        };
        if (item.nodeName == "H2") {
          obj.h3Name = item.innerHTML;
          obj.href = "#data-h3-" + index;
          item.setAttribute("id", "data-h3-" + index);
          this.menuList.push(obj);
        }
      });
    }
  },
};
</script>

<style scoped>
@media screen and (min-width: 480px) {
  .detail {
    display: flex;
    justify-content: flex-start;
  }
  .artical-detail {
    width: 70%;
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
