import { createRouter, createWebHistory } from 'vue-router'

// 导入你的组件
import Home from '../components/LinkHome.vue'
// ...
import About from '../components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // ...其他路由配置
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes
})

export default router
