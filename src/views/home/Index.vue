<template>
  <div class="index">
    <artical-list
      :data="data"
      @save="handleSave"
    ></artical-list>
  </div>
</template>

<script>
import ArticalList from '../../components/artical/artical-list'
import { mapMutations, mapGetters } from 'vuex';
export default {
  name: 'HomeIndex',
  components: {
    ArticalList,
  },
  data () {
    return {
      data: require('../../store/artical.json'),
      list: []
    }
  },
  computed: {
    ...mapGetters(['articalList'])
  },
  mounted () {
    // localStorage.setItem('articalList', JSON.stringify([]));
    if (this.articalList.length < 1) {
      this.data.map(item => {
        this.SAVE_ARTICAL(item)
      })
    }
  },
  methods: {
    ...mapMutations(['SAVE_ARTICAL']),
    handleSave (index) {
      if (this.articalList[index].isSave === '0') {
        this.articalList[index].isSave = '1'
        this.articalList[index].save = this.articalList[index].save * 1 + 1
      }
    }
  }
}

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