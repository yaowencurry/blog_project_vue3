<template>
  <ul class="menu-list m-bottom-20">
    <li
      v-for="(item,index) in state.menuList"
      :key="index"
      :class="{'menu-list-active': item.route == activeRoute}"
      @click="handleMenu(item.route)"
    >{{item.text}}</li>
  </ul>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'IndexMenu',
  setup () {
    const state = reactive({
      menuList: [
        {
          route: 'HomeIndex',
          text: '首页'
        },
        {
          route: 'BookIndex',
          text: '电子书'
        },
        {
          route: 'EditArtical',
          text: '发布文章'
        },
      ],
    })

    return {
      state
    }
  },
  data () {
    return {
      activeRoute: this.$route.name
    }
  },
  computed: {
    defaultActive () {
      return this.$route.name || 'HomeIndex'
    }
  },
  watch: {
    '$route': {
      handler (newVal) {
        this.activeRoute = newVal.name;
      }
    }
  },
  methods: {
    handleMenu (route) {
      this.$router.push({ name: route });
    }
  }
}

</script>
<style  scoped>
.menu-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
li {
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
  line-height: 30px;
  padding: 7px 0;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  text-align: center;
  
}
li:hover,
li:active {
  background-color: #fafafa;
  color: #333 !important;
}
.menu-list-active {
  font-weight: 500;
  background-color: #fafafa;
  color: #333 !important;
}
</style>
