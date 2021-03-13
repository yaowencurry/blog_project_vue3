import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementPlus from 'element-plus';
import {
  ElInput,
  ElButton,
  ElTabs,
  ElTabPane,
  ElSelect,
  ElSkeleton
} from 'element-plus';
import './assets/style/global.css'
import './assets/style/iconfont/iconfont.css'
import 'element-plus/lib/theme-chalk/index.css';
import axiosApi from './api/index'

const components = [
  ElInput,
  ElButton,
  ElTabs,
  ElTabPane,
  ElSelect,
  ElSkeleton
]

const app = createApp(App)
app.config.globalProperties.$api = axiosApi;
components.forEach(component => {
  app.component(component.name, component)
})
app
  .use(store)
  .use(router)
  .mount('#app')
// app.use(store).use(axios).use(router).use(ElementPlus).mount('#app')
