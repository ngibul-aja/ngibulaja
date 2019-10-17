import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Settings from '@/views/Settings'

Vue.use(VueRouter)

const routes = [
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
