import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import directive from '@/directive'

const app = createApp(App)

// 注册全局指令
app.use(directive)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')