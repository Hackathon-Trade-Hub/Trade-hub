import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/Views/HomeView.vue'
import CadProduto from '@/Views/CadProduto.vue'
import EditPerf from '@/Views/EditarPerfil.vue'
import Login from '@/Views/Login.vue'
import Cadastrar from '@/Views/Cadastrar.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cadastrarP',
      name: 'cadProd',
      component: CadProduto
    },
    {
      path: '/editarperfil',
      name: 'editPerf',
      component: EditPerf
    },
    {
      path: '/entrar',
      name: 'login',
      component: Login
    },
    {
      path: '/registrar',
      name: 'cadastrar',
      component: Cadastrar
    },
  ]

})

export default router
