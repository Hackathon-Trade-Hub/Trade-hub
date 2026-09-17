<template>
    <header ref="headerEl">
        <div class="header-top">
            <div class="logo">
                <RouterLink to="/">Trade<span>Hub</span></RouterLink>
            </div>

            <label class="pesquisa">
                <img src="/images/lupa.png" alt="">
                <input type="search" placeholder="O que você está buscando?" v-model="termoBusca"
                    @keyup.enter="buscarProdutos">
            </label>

            <div class="botoes">
                <template v-if="usuarioAtual">
                    <RouterLink to="/paginaUsuario" class="usuario-logado">
                        <img :src="usuarioAtual.foto" :alt="`Foto de ${usuarioAtual.nome}`">
                        <span>{{ usuarioAtual.nome }}</span>
                    </RouterLink>
                    <button class="sair" type="button" @click="fazerLogout">Sair</button>
                </template>
                <template v-else>
                    <RouterLink to="/login" class="entrar">Entrar</RouterLink>
                    <RouterLink to="/cadastrar" class="cadastrar">Cadastrar-se</RouterLink>
                </template>
            </div>
        </div>

        <div class="header-bottom">
            <nav>
                <div class="categorias" ref="categoriasEl">
                    <button type="button" @click="menuAberto = !menuAberto">
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
                        <RouterLink v-if="!estaNaHome" :to="{ name: 'home' }" @click="menuAberto = false">
                            Início
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Casa e Móveis' } }"
                            @click="menuAberto = false">
                            Casa e Móveis
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Eletrodomésticos' } }"
                            @click="menuAberto = false">
                            Eletrodomésticos
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Esportes' } }"
                            @click="menuAberto = false">
                            Esportes
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Ferramentas' } }"
                            @click="menuAberto = false">
                            Ferramentas
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Espaço Pet' } }"
                            @click="menuAberto = false">
                            Espaço Pet
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Brinquedos' } }"
                            @click="menuAberto = false">
                            Brinquedos
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Tecnologia' } }"
                            @click="menuAberto = false">
                            Tecnologia
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Acessórios' } }"
                            @click="menuAberto = false">
                            Acessórios
                        </RouterLink>
                        <RouterLink :to="{ name: 'catProd', params: { categoria: 'Outros' } }"
                            @click="menuAberto = false">
                            Outros
                        </RouterLink>
                    </div>
                </div>

                <RouterLink :to="{ name: 'trocar' }" class="nav-link">Trocar</RouterLink>
                <RouterLink :to="{ name: 'comprar' }" class="nav-link">Comprar</RouterLink>
                <RouterLink :to="{ name: 'cadProd' }" class="nav-link">Cadastrar produtos</RouterLink>
                <RouterLink :to="{ name: 'carrinho' }" class="carrinho" aria-label="Carrinho">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.15em" height="1.15em" viewBox="0 0 50 50">
                        <path d="M0 0h50v50H0z" fill="none" />
                        <circle cx="44" cy="42" r="4" fill="currentColor" />
                        <circle cx="15" cy="42" r="4" fill="currentColor" />
                        <path fill="currentColor"
                            d="M47 33H15.771l.667-1.082c.286-.464.37-1.025.233-1.553l-.651-2.506l28.983-1.506C46.102 26.297 47 25.35 47 24.25V11c0-1.1-.9-2-2-2H11.119l-.391-1.503A2 2 0 0 0 8.792 6H2a2 2 0 0 0 0 4h5.246l5.34 20.545l-2.1 3.405a2 2 0 0 0-.043 2.024A2 2 0 0 0 12.188 37H47a2 2 0 0 0 0-4" />
                    </svg>
                </RouterLink>
            </nav>
        </div>

        <div class="hero" v-if="estaNaHome">
            <p class="hero-eyebrow">Troca e venda de usados</p>
            <h1>O que você quer <span>trocar</span> hoje?</h1>
            <p class="hero-sub">O maior site de troca e venda do Brasil.</p>
        </div>
    </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { termoBusca } from './Filter.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { sair, usuarioAtual } from '@/data/auth.js'

defineOptions({ name: 'SiteHeader' })

const menuAberto = ref(false)
const categoriasEl = ref(null)
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

function aoClicarFora(evento) {
    if (menuAberto.value && categoriasEl.value && !categoriasEl.value.contains(evento.target)) {
        menuAberto.value = false
    }
}

onMounted(() => document.addEventListener('click', aoClicarFora))
onUnmounted(() => document.removeEventListener('click', aoClicarFora))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

header {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #ffffff;
}

header a {
    text-decoration: none;
}

/* header-top */

.header-top {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1rem 2.5rem;
    border-bottom: 1px solid #e6e8ec;
}

.logo {
    font-size: 1.6rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    white-space: nowrap;
}

.logo a {
    color: #14171f;
}

.logo a span {
    color: #185aee;
}

.pesquisa {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 40rem;
}

.pesquisa img {
    position: absolute;
    left: 0.9rem;
    width: 1rem;
    height: 1rem;
    opacity: 0.55;
}

.pesquisa input {
    width: 100%;
    height: 2.75rem;
    padding: 0 1rem 0 2.5rem;
    border: 1px solid #e6e8ec;
    background: #f6f7fb;
    border-radius: 999px;
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.15s ease, background 0.15s ease;
}

.pesquisa input:focus {
    border-color: #185aee;
    background: #ffffff;
}

.botoes {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: auto;
    white-space: nowrap;
}

.entrar,
.cadastrar,
.sair {
    border-radius: 10px;
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: inherit;
}

.entrar {
    border: 1px solid #e6e8ec;
    color: #4b5163;
}

.entrar:hover {
    border-color: #4b5163;
}

.cadastrar {
    border: 1px solid #185aee;
    color: #fff;
    background-color: #185aee;
}

.cadastrar:hover {
    background-color: #0f42b8;
    border-color: #0f42b8;
}

.usuario-logado {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 220px;
    color: #14171f;
    font-weight: 600;
}

.usuario-logado img {
    width: 2.4rem;
    height: 2.4rem;
    border: 2px solid #185aee;
    border-radius: 50%;
    object-fit: cover;
}

.usuario-logado span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.sair {
    color: #185aee;
    background: #fff;
    border: 1px solid #185aee;
    cursor: pointer;
}

.sair:hover {
    background: #eaf0fe;
}

/* header-bottom */

.header-bottom {
    background-color: #ffffff;
    border-bottom: 1px solid #e6e8ec;
}

.header-bottom nav {
    display: flex;
    align-items: center;
    height: 3rem;
    padding: 0 2.5rem;
    gap: 1.75rem;
    box-sizing: border-box;
}

.nav-link,
.categorias button {
    position: relative;
    color: #4b5163;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: inherit;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.nav-link::after,
.categorias button::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1rem;
    height: 2px;
    background: #185aee;
    transform: scaleX(0);
    transition: transform 0.15s ease;
}

.nav-link:hover,
.categorias button:hover {
    color: #185aee;
}

.nav-link:hover::after,
.categorias button:hover::after,
.router-link-active.nav-link::after {
    transform: scaleX(1);
}

.router-link-active.nav-link {
    color: #185aee;
}

.categorias {
    position: relative;
}

.categorias button span {
    display: inline-flex;
    margin-left: 4px;
    transition: transform 0.15s ease;
}

.categorias button span.aberto {
    transform: rotate(180deg);
}

.menu-categorias {
    position: absolute;
    top: calc(100% + 0.75rem);
    left: 0;
    width: 200px;
    background-color: #ffffff;
    border: 1px solid #e6e8ec;
    border-radius: 12px;
    box-shadow: 0 12px 28px rgba(20, 23, 31, 0.1);
    display: flex;
    flex-direction: column;
    padding: 8px;
    z-index: 1000;
}

.menu-categorias a {
    color: #4b5163;
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 500;
}

.menu-categorias a:hover {
    background-color: #f6f7fb;
    color: #185aee;
}

.carrinho {
    margin-left: auto;
    display: flex;
    color: #4b5163;
}

.carrinho:hover {
    color: #185aee;
}

/* hero */

.hero {
    position: relative;
    padding: 2.75rem 1.5rem 3rem;
    text-align: center;
    background: #ffffff;
}

.hero-eyebrow {
    margin: 0 0 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #185aee;
}

.hero h1 {
    margin: 0 0 0.6rem;
    font-size: 2.25rem;
    font-weight: 800;
    color: #14171f;
}

.hero h1 span {
    color: #185aee;
}

.hero-sub {
    margin: 0 0 1.5rem;
    font-size: 1.05rem;
    font-weight: 500;
    color: #4b5163;
}

</style>