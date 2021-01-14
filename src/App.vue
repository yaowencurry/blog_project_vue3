<template>
  <div class="app">
    <template v-if="isEditArtical">
      <router-view></router-view>
    </template>
    <template v-else>
      <div class="app__left">
        <div
          class="app__left__fixed"
          v-if="screeWidth > 480 || mobileMenuShow"
        >
          <div>
            <img
              v-if="isLoad"
              class="app__left__fixed--logo"
              src="https://s3.ax1x.com/2020/12/11/rkhp5V.jpg"
              alt=""
            >
            <div
              class="app__left__fixed--logo default-logo"
              v-else
            >
              <i class="iconfont icon-account"></i>
            </div>
            <h4 class="app__left__fixed--title">我的博客</h4>
          </div>
          <my-menu></my-menu>
          <my-footer></my-footer>
        </div>
      </div>
      <div class="app__right">
        <my-time></my-time>
        <i
          class="iconfont icon-menu"
          v-if="screeWidth < 480"
          @click="handleMenuShow"
        ></i>
        <i
          class="iconfont icon-edit"
          v-if="screeWidth < 480 && $route.name === 'HomeIndex'"
          @click="handleEditArtical"
        ></i>
        <div
          class="app__right__box"
          @click="handleAppRight"
        >
          <router-view></router-view>
        </div>
        <div
          class="back-top"
          @click="backTop"
        >
          <i class="iconfont icon-top"></i>
          <span v-if="screeWidth > 480">顶部</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import MyMenu from './components/common/IndexMenu';
import MyFooter from './components/common/Footer';
import MyTime from './components/time/MyTime';
import { onMounted, ref } from 'vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    MyMenu,
    MyFooter,
    MyTime
  },
  setup () {
    const isLoad = ref(false);
    const isTop = ref(false);
    onMounted(() => {
      setTimeout(() => {
        isLoad.value = true;
      }, 2000)
    })
    function backTop () {
      scrollTo(0, 0);
    }
    return {
      backTop,
      isLoad,
      isTop,
    }
  },
  data () {
    return {
      isEditArtical: false,
      mobileMenuShow: false
    }
  },
  computed: {
    ...mapGetters(['screeWidth'])
  },
  created () {
    this.getScreeWidth();
    window.addEventListener('resize', this.getScreeWidth);
    if (this.$route.name == 'EditArtical') {
      this.isEditArtical = true;
    } else {
      this.isEditArtical = false;
    }
  },
  watch: {
    $route (to) {
      if (to.name === 'EditArtical') {
        this.isEditArtical = true;
      } else {
        this.isEditArtical = false;
      }
    }
  },
  methods: {
    handleAppRight () {
      this.mobileMenuShow = false;
      console.log(123);
    },
    handleMenuShow () {
      this.mobileMenuShow = !this.mobileMenuShow;
    },
    getScreeWidth () {
      const width = document.documentElement.clientWidth || document.body.clientWidth;

      this.$store.commit('SAVE_SCREEWIDTH', width);
    },
    handleEditArtical () {
      this.$router.push({ name: 'EditArtical' })
    }
  }
}
</script>

<style>
.app {
  display: flex;
  box-sizing: border-box;
}
.app__left {
  height: 100vh;
  width: 20%;
  max-width: 500px;
}
.app__left__fixed {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 500px;
  background-color: #333333;
  text-align: center;
}
.app__left__fixed--logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 20% 0 20px;
}
.default-logo {
  margin: 20% auto 20px auto;
  color: #999;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.default-logo i {
  font-size: 45px;
}
.app__left__fixed--title {
  color: #fff;
  font-weight: 500;
  margin: 0 0 15%;
}
.app__right {
  background-color: #f4f5f5;
  width: 80%;
  box-sizing: border-box;
}
.app__right__box {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
.back-top {
  position: fixed;
  bottom: 30px;
  right: 20px;
  cursor: pointer;
}
.back-top span,
.back-top i {
  color: #3f84f1;
  font-size: 12px;
  font-weight: 500;
}
@media screen and (max-width: 480px) {
  .app__left__fixed {
    width: 50%;
    z-index: 2;
  }
  .back-top {
    right: 29px;
  }
  .back-top i {
    font-size: 34px;
  }
  .app__left {
    width: 0%;
  }
  .app__right {
    width: 100%;
    background: #fff;
  }
  .app__right__box {
    width: 90%;
  }
  i.icon-edit,
  i.icon-menu {
    position: fixed;
    font-size: 28px;
    color: #3f84f1;
  }
  i.icon-menu {
    left: 10px;
    top: 5px;
    z-index: 10;
  }
  i.icon-edit {
    bottom: 70px;
    right: 30px;
    font-size: 34px;
  }
}
</style>
