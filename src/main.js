import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { carregarProdutos } from './data/produtos'
import { carregarUsuarios } from './data/auth'

const app = createApp(App)

await Promise.allSettled([carregarProdutos(), carregarUsuarios()])

app.use(router).mount('#app')
