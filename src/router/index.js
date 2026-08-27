import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/Views/HomeView.vue'
import CadProduto from '@/Views/CadProduto.vue'
import EditPerf from '@/Views/EditarPerfil.vue'
import PaginaProduto from '@/Views/paginaProduto.vue'
import catProd from '@/Views/categoriaProduto.vue'
import CarrinhoView from '@/Views/carrinho.vue'
import Cadastrar from '@/Views/Cadastrar.vue'
import Login from '@/Views/Login.vue'
import paginaUsuario from '@/Views/paginaUsuario.vue'
import PerfilVendedor from '@/Views/PerfilVendedor.vue'

import { usuarioAtual } from '@/data/auth.js'
import PaginaUsuario from '@/Views/paginaUsuario.vue'
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
      component: CadProduto,
      meta: { requerLogin: true }
    },
    {
      path: '/editarperfil',
      name: 'editPerf',
      component: EditPerf,
      meta: { requerLogin: true }
    },
    {
      path: '/pagProd/:id',
      name: 'paginaProduto',
      component: PaginaProduto
    },
    {
      path: '/catProd/:categoria',
      name: 'catProd',
      component: catProd
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: CarrinhoView
    },
    {
      path: '/cadastrar',
      name: 'cadastrar',
      component: Cadastrar
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/paginaUsuario',
      name: 'paginaUsusario',
      component: PaginaUsuario
    },
    {
  path: '/perfilVendedor',
  name: 'perfilVendedor',
  component: PerfilVendedor
},
  ]

})

router.beforeEach((to) => {
  if (to.meta.requerLogin && !usuarioAtual.value) {
    return { name: 'login' }
  }
})

export default router
