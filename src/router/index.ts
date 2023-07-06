import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

// メニューに出すようにするのは、src\components\AppBar.vue
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ProductList',
    name: 'ProductList',
    component: () => import('../views/ProductList.vue')
  },
  {
    path: '/NewsList',
    name: 'NewsList',
    component: () => import('../views/NewsList.vue')
  },
  {
    path: '/UserList',
    name: 'UserList',
    component: () => import('../views/UserList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
