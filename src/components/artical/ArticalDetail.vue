<template>
  <div class="detail">
    <div class="artical-detail">
      <bread-crumb></bread-crumb>
      <h1>{{data.title}}</h1>
      <span class="p-bottom-20 d-block tips">{{data.ctime}}</span>
      <div v-html="data.content"></div>
      <artical-comment :data="data"></artical-comment>
    </div>
    <ArticalMenu
      :mark-down="data.content"
      :menuList="menuList"
      v-if="screeWidth > 900"
    />
  </div>
</template>

<script>
import BreadCrumb from '../bread-crumb/BreadCrumb'
import ArticalComment from './artical-comment'
import { mapGetters } from 'vuex'
import ArticalMenu from './ArticalMenu'

export default {
  name: 'artical-detail',
  components: {
    BreadCrumb,
    ArticalComment,
    ArticalMenu
  },
  computed: {
    ...mapGetters([
      'articalList', 'screeWidth'
    ]),
    data () {
      let obj = {}
      const id = this.$route.query.id
      this.articalList.map(item => {
        if (item.id === id) {
          obj = item
        }
      })
      return obj
    }
  },
  data () {
    return {
      menuList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      const titleList = Array.from(this.$el.querySelectorAll('h2,h3,h4'));
      let menuList = [];
      titleList.forEach((item, index) => {
        let obj = {
          h3Name: '',
          h4Children: []
        }
        if (item.nodeName == 'H3') {
          obj.h3Name = item.innerHTML;
          obj.href = '#data-h3-' + index;
          item.setAttribute('id', 'data-h3-' + index);
          menuList.push(obj);
          // if (index < titleList.length - 1) {
          //   for (let i = index; i++; i < titleList.length) {
          //     if (titleList[index + 1].nodeName == 'H3') break
          //     // if (titleList[i].nodeName == 'H4') {
          //     //   let h4Obj = {
          //     //     h4Name: titleList[i].innerHTML,
          //     //     h4Children: []
          //     //   }
          //     //   obj.h4Children.push(h4Obj)
          //     //   menuList.push(obj);
          //     // }
          //   }
          // }
        }
      })
      this.menuList = menuList;
    })
  }
}

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
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
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
