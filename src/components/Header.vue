<template>
    <header>
        <div class="header-top">
            <div class="logo">
                <RouterLink to="/">Trade<span>Hub</span></RouterLink>
            </div>

            <div class="pesquisa">
                <img src="/images/lupa.png" alt="Pesquisar">
                <input type="search" placeholder="Digite..." v-model="termoBusca" @keyup.enter="buscarProdutos">
            </div>

            <div class="botoes">
                <template v-if="usuarioAtual">
                    <RouterLink to="/paginaUsuario" class="usuario-logado">
                        <img :src="usuarioAtual.foto" :alt="`Foto de ${usuarioAtual.nome}`">
                        <span>{{ usuarioAtual.nome }}</span>
                    </RouterLink>
                    <button class="sair" type="button" @click="fazerLogout">SAIR</button>
                </template>
                <template v-else>
                    <RouterLink to="/login" class="entrar">ENTRAR</RouterLink>
                    <RouterLink to="/cadastrar" class="login">CADASTRAR-SE</RouterLink>
                </template>
            </div>
        </div>
        <div class="header-bottom">
            <nav>
                <div class="categorias">
                    <button @click="menuAberto = !menuAberto">
                        Categorias
                        <span :class="{ aberto: menuAberto }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                <path d="M0 0h16v16H0z" fill="none" />
                                <path fill="currentColor" fill-rule="non-zero"
                                    d="M13.069 5.157L8.384 9.768a.546.546 0 0 1-.768 0L2.93 5.158a.55.55 0 0 0-.771 0a.53.53 0 0 0 0 .759l4.684 4.61a1.65 1.65 0 0 0 2.312 0l4.684-4.61a.53.53 0 0 0 0-.76a.55.55 0 0 0-.771 0" />
                            </svg>

                        </span>
                    </button>

                    <div v-if="menuAberto" class="menu-categorias">
                        <RouterLink v-if="!estaNaHome" :to="{ name: 'home'}" @click="menuAberto = false">
                            Início
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Casa e Móveis' } }" @click="menuAberto = false">
                            Casa e Móveis
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Eletrodomésticos' } }" @click="menuAberto = false">
                            Eletrodomésticos
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Esportes' } }" @click="menuAberto = false">
                            Esportes
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Ferramentas' } }" @click="menuAberto = false">
                            Ferramentas
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Espaço Pet' } }" @click="menuAberto = false">
                            Espaço Pet
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Brinquedos' } }" @click="menuAberto = false">
                            Brinquedos
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Tecnologia' } }" @click="menuAberto = false">
                            Tecnologia
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Acessórios' } }" @click="menuAberto = false">
                            Acessórios
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Outros' } }" @click="menuAberto = false">
                            Outros
                        </RouterLink>
                    </div>
                </div>
                <RouterLink :to="{ name: 'trocar' }">Trocar</RouterLink>
                <RouterLink :to="{ name: 'comprar' }">Comprar</RouterLink>
                <RouterLink :to="{ name: 'cadProd' }">Cadastrar Produtos</RouterLink>
                <RouterLink :to="{ name: 'carrinho' }" class="img-carrinho">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50">
                        <path d="M0 0h50v50H0z" fill="none" />
                        <circle cx="44" cy="42" r="4" fill="currentColor" />
                        <circle cx="15" cy="42" r="4" fill="currentColor" />
                        <path fill="currentColor"
                            d="M47 33H15.771l.667-1.082c.286-.464.37-1.025.233-1.553l-.651-2.506l28.983-1.506C46.102 26.297 47 25.35 47 24.25V11c0-1.1-.9-2-2-2H11.119l-.391-1.503A2 2 0 0 0 8.792 6H2a2 2 0 0 0 0 4h5.246l5.34 20.545l-2.1 3.405a2 2 0 0 0-.043 2.024A2 2 0 0 0 12.188 37H47a2 2 0 0 0 0-4" />
                    </svg>
                </RouterLink>
            </nav>
        </div>
        <div class="hero">
            <h1>O que gostaria de trocar hoje?</h1>
            <p>O maior site de troca e venda do Brasil.</p>
        </div>
    </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { termoBusca } from './Filter.vue'
import { computed, ref } from 'vue'
import { sair, usuarioAtual } from '@/data/auth.js'

defineOptions({ name: 'SiteHeader' })

const menuAberto = ref(false)
const router = useRouter()
const route = useRoute()

const estaNaHome = computed(() => route.name === 'home')

function fazerLogout() {
    sair()
    router.push({ name: 'home' })
}

function buscarProdutos() {
    if (route.name !== 'home') {
        router.push({ name: 'home' })
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

* {
    text-decoration: none;
}

header {
    font-family: sans-serif;
}

/* header-top */

.header-top {
    display: flex;
    margin: 1.75vw 1.75vw;
    align-items: center;
    gap: 0
}

.logo {
    font-size: 2rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}

.logo a {
    color: black;
}

.logo a span {
    color: #185AEE;
}

.pesquisa {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 5vw;
    flex: 1;
}

.pesquisa input {
    width: 35vw;
    height: 2.5vw;
    padding-left: 2.5vw;
    border: 1px solid black;
    border-radius: 16px;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
}

.pesquisa img {
    position: absolute;
    left: 0.8vw;
    width: 1.3vw;
    height: 1.3vw;
}

.botoes {
    display: flex;
    align-items: center;
    gap: 1vw;
    margin-left: auto;
}


.entrar {
    border: 1px solid black;
    color: black;
    border-radius: 8px;
    padding: 0.75vw 1.75vw;
}

.login {
    border: 1px solid #185AEE;
    color: white;
    background-color: #185AEE;
    border-radius: 8px;
    padding: 0.75vw 1.75vw;
    margin: 0 4vw 0 0;
}

.usuario-logado {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 220px;
    color: #000;
    font-weight: 600;
}

.usuario-logado img {
    width: 38px;
    height: 38px;
    border: 2px solid #185AEE;
    border-radius: 50%;
    object-fit: cover;
}

.usuario-logado span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.sair {
    padding: 0.75vw 1.1vw;
    color: #185AEE;
    background: #fff;
    border: 1px solid #185AEE;
    border-radius: 8px;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
}

.fa-circle-user {
    font-size: 2.2rem;
}

.fa-gear {
    font-size: 2.2rem;
    transition: all 0.1s ease;
    cursor: pointer;
    &:hover{color: #185AEE;}
}

/* header-bottom */

.header-bottom {
    background-color: #185AEE;
    height: 70px;

}

.header-bottom nav {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    padding: 1vw 7vw 0 7vw;
    box-sizing: border-box;
}

.header-bottom nav>a,
.categorias button {
    color: white;
    font-size: 1.2rem;
}

.categorias {
    position: relative;
}

.categorias button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 1.2rem;
    padding: 10px;
}

.categorias button span {
    display: inline-block;
    margin-left: 4px;
    transition: transform 0.1s;
}

.categorias button span.aberto {
    transform: rotate(180deg);
}

.menu-categorias {
    position: absolute;
    top: 100%;
    left: 0;
    width: 180px;
    background-color: #363636;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    z-index: 1000;
}

.menu-categorias a {
    color: white;
    text-decoration: none;
    padding: 10px 14px;
    font-size: 0.9rem;
}

.menu-categorias a:hover {
    background-color: #444;
}

/* hero */

.hero {
    position: relative;
    height: 300px;
    background: linear-gradient( to bottom, #185AEE 0%, #185AEE 65%, #5d8cf0 75%, #a9c2f7 88%, #f5f5f5 100%);
    text-align: center;
    color: white;
    padding-top: 35px;
}

.hero h1 {
    font-size: 2.8rem;
    margin: 0;

}

.hero p {
    font-size: 1.2rem;
    font-weight: 600;
}
</style>
