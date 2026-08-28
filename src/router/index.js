import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/Views/HomeView.vue'
import CadProduto from '@/Views/CadProduto.vue'
import EditPerf from '@/Views/EditarPerfil.vue'
import PaginaProduto from '@/Views/paginaProduto.vue'
import catProd from '@/Views/categoriaProduto.vue'
import CarrinhoView from '@/Views/carrinho.vue'
import Cadastrar from '@/Views/Cadastrar.vue'
import Login from '@/Views/Login.vue'
import PerfilVendedor from '@/Views/PerfilVendedor.vue'
import paginaUsuario from '@/Views/paginaUsuario.vue'
import paginaTroca from '@/Views/paginaTroca.vue'
import PropostaTroca from '@/Views/PropostaTroca.vue'
import Comprar from '@/Views/Comprar.vue'
import { usuarioAtual } from '@/data/auth.js'

import SobreNos from '@/Views/SobreNos.vue'
import Suporte from '@/Views/Suporte.vue'
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
      path: '/sobre',
      name: 'sobre',
      component: SobreNos
    },
    {
      path: '/suporte',
      name: 'suporte',
      component: Suporte
    },
    {
      path: '/paginaUsuario',
      name: 'paginaUsuario',
      component: paginaUsuario,
      meta: { requerLogin: true }
    },
    {
  path: '/perfilVendedor',
  name: 'perfilVendedor',
  component: PerfilVendedor
    },
    {
      path: '/comprar',
      name: 'comprar',
      component: Comprar
    },
    {
      path: '/trocar',
      name: 'trocar',
      component: paginaTroca
    },
    {
      path: '/paginaTroca/:status',
      name: 'paginaTroca',
      redirect: { name: 'trocar' }
    },
    {
      path: '/proposta-troca/:id',
      name: 'propostaTroca',
      component: PropostaTroca
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: { name: 'home' }
    }

  ]

})

router.beforeEach((to) => {
  if (to.meta.requerLogin && !usuarioAtual.value) {
    return { name: 'login' }
  }
})

export default router
