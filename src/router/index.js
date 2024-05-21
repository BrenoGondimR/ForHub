import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Home from '../views/Home/index.vue'
import Login from '../views/Login/index.vue'
import Register from '../views/Register/index.vue'
import Coworkings from '../views/Coworkings/index.vue'
import Support from '../views/Support/index.vue'
import Planos from '@/views/Planos/index.vue'
import CoworkingInfo from '@/views/CoworkingsInfo/index.vue'
import Dashboard from '@/views/Dashboard/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/coworkings',
    name: 'coworkings',
    component: Coworkings
  },
  {
    path: '/support',
    name: 'support',
    component: Support
  },
  {
    path: '/planos',
    name: 'planos',
    component: Planos
  },
  {
    path: '/coworkinginfo/:id',
    name: 'coworkinginfo',
    component: CoworkingInfo
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});



export default router
