import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import './assets/style/global.css'
import './assets/style/iconfont/iconfont.css'
import 'element-plus/lib/theme-chalk/index.css';
// import 'github-markdown-css/github-markdown.css'
// import './assets/style/markdown.css'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
