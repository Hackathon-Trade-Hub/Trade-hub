<template>
    <header>
        <div class="logo">
            <RouterLink to="/">Trade<span>Hub</span></RouterLink>
        </div>

        <div class="pesquisa">
            <img src="../../public/images/lupa.png">
            <input type="text" placeholder="Digite...">
        </div>

        <div class="botoes">
            <RouterLink to="/entrar" class="entrar">Entrar</RouterLink>
            <RouterLink to="/registrar" class="login">Login</RouterLink>
            <i class="fa-solid fa-circle-user"></i>
            <i class="fa-solid fa-gear"></i>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
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
header {
    background-color: #ffffff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 15px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo a {
    font-size: 3vw;
    font-weight: 700;
    color: #0b1a30;
    text-decoration: none;
}
.logo a span {
    color: #0066ff;
}
.pesquisa {
    display: flex;
    align-items: center;
}
.pesquisa img {
    width: 3vw;
    height: 3vw;
}
.pesquisa input{
    border-radius: 30px;
    border: 1px solid black;
    padding: 4px 16px;
    
}
.botoes {
    display: flex;
    align-items: center;
    gap: 15px;
}
.entrar {
    color: #0066ff;
    font-weight: 600;
    padding: 8px 16px;
    text-decoration: none;
    border: 1px solid #0066ff;
    padding: 10px 20px;
    border-radius: 6px;
    transition: 0.3s;
}
.entrar:hover {
    background: #f5f5f5;
}
.login {
    background-color: #0066ff;
    color: #ffffff;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 6px;
    text-decoration: none;
    transition: 0.3s;
}
.login:hover {
    background-color: #004ecc;
}
i{
    font-size: 2vw;
}
</style>
