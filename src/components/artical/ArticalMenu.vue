<template>
  <ul
    class="artical-menu"
    :style="{ height: menuHeight + 'px'}"
  >
    <p class="menu-title">目录</p>
    <li
      class="menu-item"
      v-for="(item,index) in menuList"
      :key="index"
    >
      <a :href="item.href">{{item.h3Name}}</a>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'ArticalMenu',
  props: {
    markDown: {
      type: String
    },
    menuList: {
      type: Array
    }
  },
  data () {
    return {
      menuHeight: 300
    }
  },
  mounted() {

  }
}

</script>
<style scoped>
.artical-menu {
  position: sticky;
  top: 50px;
  width: 24%;
  max-width: 400px;
  box-sizing: border-box;
  height: auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
.menu-title {
  font-size: 18px;
  margin-bottom: 0;
  padding: 10px;
  font-weight: 500;
}
.menu-item {
  padding: 3px 10px;
  margin: 0;
  font-weight: 500;
}
.menu-item:hover {
  background-color: #eeeeee;
}
.menu-item > a {
  color: #333;
}
.menu-item > a:hover {
  color: #333;
  text-decoration: none;
}
</style>