<template>
    <header>
        <div class="header-top">
            <div class="logo">
                <RouterLink to="/">Trade<span>Hub</span></RouterLink>
            </div>

            <div class="pesquisa">
                <img src="../../public/images/lupa.png" alt="lupa">
                <input type="text" placeholder="Digite...">
            </div>

            <div class="botoes">
                <RouterLink to="/entrar" class="entrar">ENTRAR</RouterLink>
                <RouterLink to="/registrar" class="login">Login</RouterLink>
                <i class="fa-solid fa-circle-user"></i>
                <i class="fa-solid fa-gear"></i>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            </div>
        </div>
        <div class="header-bottom">
            <nav>
                <div>
                    Categorias <span>></span>
                </div>
                <RouterLink to="#">Trocar</RouterLink>
                <RouterLink to="#">Comprar</RouterLink>
                <RouterLink to="#">Cadstrar Produtos</RouterLink>
            </nav>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import router from '@/router';
export default {
    name: 'HeaderComponent'
}
</script>

<style scoped>
* {
    text-decoration: none;
}


.header-top {
    display: flex;
    margin: 1vw 0 1.5vw 1vw;
    align-items: center;
}

.logo {
    font-size: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
}

.logo a {
    color: black;
}

.logo a span {
    color: blue;
}

.pesquisa {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 5vw;
}

.pesquisa input {
    width: 30vw;
    height: 2.5vw;
    padding-left: 2.5vw;
    border: 1px solid black;
    border-radius: 16px;
    font-size: 1rem;
}

.pesquisa img {
    position: absolute;
    left: 0.8vw;
    width: 1.3vw;
    height: 1.3vw;
}

.botoes {
    margin-left: 10vw;
}

.entrar{
    border: 1px solid black;
    color: black;
    border-radius: 8px;
    padding: 0.75vw 1.75vw;
}
</style>
