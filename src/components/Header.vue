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
                <RouterLink to="/registrar" class="login">FAZER LOGIN</RouterLink>
                <!-- <i class="fa-solid fa-circle-user"></i> -->
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
                <RouterLink to="#">Cadastrar Produtos</RouterLink>
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

header {
    font-family: sans-serif;
}

.header-top {
    display: flex;
    margin: 1.75vw 1.75vw;
    align-items: center;
    gap: 0
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

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

.fa-circle-user {
    font-size: 2.2rem;
}

.fa-gear {
    font-size: 2.2rem;
}
</style>
