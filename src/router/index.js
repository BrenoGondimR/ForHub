import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Home from '../views/Home/index.vue'
import Login from '../views/Login/index.vue'
import Register from '../views/Register/index.vue'
import Coworkings from '../views/Coworkings/index.vue'
import Support from '../views/Support/index.vue'
import Planos from '@/views/Planos/index.vue'
import CoworkingInfo from '@/views/CoworkingsInfo/index.vue'
import Dashboard from '@/views/Dashboard/index.vue'
import Clientes from '@/views/Clientes/index.vue'
import CadastroClientes from '@/views/Clientes/cadastro.vue'
import Reservas from '@/views/Reservas/index.vue'
import CadastroCoworking from '@/views/Coworkings/cadastro.vue'
import EditCoworking from '@/views/Coworkings/editar.vue'
import Financeiro from '@/views/Financeiro/index.vue'
import ListCoworkings from '@/views/Coworkings/listcoworkings.vue'
import ReservasCadastro from '@/views/Reservas/cadastro.vue';
import ReservasIndex from '@/views/Reservas/index.vue';

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
  {
    path: '/dashboard/clientes',
    name: 'clientes',
    component: Clientes
  },
  {
    path: '/dashboard/clientes/cadastro',
    name: 'cadastro_clientes',
    component: CadastroClientes
  },
  {
    path: '/dashboard/reservas',
    name: 'reservas_index',
    component: ReservasIndex
  },
  {
    path: '/dashboard/reservas/cadastro',
    name: 'reservas_cadastro',
    component: ReservasCadastro
  },
  {
    path: '/dashboard/reservas',
    name: 'reservas',
    component: Reservas
  },
  {
    path: '/dashboard/financas',
    name: 'financas',
    component: Financeiro
  },
  {
    path: '/dashboard/coworkings/cadastro',
    name: 'cadastro_coworking',
    component: CadastroCoworking
  },
  {
    path: '/dashboard/coworkings/edit/:id',
    name: 'edit',
    component: EditCoworking
  },
  {
    path: '/dashboard/coworkings/espacos',
    name: 'espacos',
    component: ListCoworkings
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router
