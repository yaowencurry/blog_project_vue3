<template>
  <div class="app default-bg">
    <div class="app__left">
      <div
        class="app__left__fixed"
        v-if="screeWidth > 480 || mobileMenuShow"
      >
        <div>
          <img
            class="app__left__fixed--logo"
            src="./assets/image/logo.jpeg"
            alt=""
          >
          <h4 class="app__left__fixed--title">我的博客</h4>
        </div>
        <my-menu></my-menu>
        <my-footer></my-footer>
      </div>
    </div>
    <div class="app__right m-top-20 default-bg">
      <!-- <my-time></my-time> -->
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
        class="app__right__box default-bg"
        @click="handleAppRight"
      >
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"  transition-mode="in-out"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"  transition-mode="out-in"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MyMenu from './components/common/IndexMenu';
import MyFooter from './components/common/Footer';
import { mapGetters } from 'vuex';
// import createStar from './utils/createStar'

export default {
  name: 'App',
  components: {
    MyMenu,
    MyFooter,
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
  // mounted () {
  //   this.$nextTick(() => {
  //     // let appRight = document.querySelector('.app__right');

  //     window.addEventListener('click', (e) => {
  //       createStar(e.clientX, e.clientY);
  //     })
  //   }, false)
  // },
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
.app__left,
.app__left__fixed {
  height: 100vh;
  width: 17%;
  max-width: 250px;
}
.app__left__fixed {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  font-weight: 500;
  margin: 0 0 15%;
  color: #fff;
}
.app__right {
  width: 83%;
  box-sizing: border-box;
}
.app__right__box {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
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
