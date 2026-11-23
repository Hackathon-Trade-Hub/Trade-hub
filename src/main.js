import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { carregarProdutos } from './data/produtos'
import { carregarUsuarios } from './data/auth'
import { carregarPropostas } from './data/propostas.js'
import { carregarPedidos } from './data/pedidos.js'

const app = createApp(App)

await Promise.allSettled([
    carregarProdutos(),
    carregarUsuarios(),
    carregarPropostas(),
    carregarPedidos()
    ])

app.use(router).mount('#app')
