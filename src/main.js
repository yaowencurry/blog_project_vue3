import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import './assets/style/global.css'
import './assets/style/iconfont/iconfont.css'
import 'element-plus/lib/theme-chalk/index.css';
import axios from './utils/axios/index'
import axiosApi from './api/index'
// import 'github-markdown-css/github-markdown.css'
// import './assets/style/markdown.css'


const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$api = axiosApi;

app.use(store).use(axios).use(router).use(ElementPlus).mount('#app')
