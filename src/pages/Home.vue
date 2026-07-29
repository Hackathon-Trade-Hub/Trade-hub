<template>
  <div class="home-page">
    <main class="conteudo-principal">
      <section class="hero-section">
        <header class="hero-header">
          <div class="header-nav">
            <div class="dropdown-categorias">
              <a href="#">Categorias <span class="arrow-down">∨</span></a>
            </div>
            <nav class="nav-links">
              <a href="#">Trocar</a>
              <a href="#">Comprar</a>
              <a href="#">Cadastrar</a>
            </nav>
            <div class="cart-icon">
              <a href="#" aria-label="Carrinho">🛒</a>
            </div>
          </div>
        </header>

        <div class="hero-content">
          <h1>O que gostaria de trocar hoje?</h1>
          <p>O maior site de troca e venda do Brasil.</p>
        </div>

        <div class="white-gradient-fade"></div>
      </section>

      <section class="container my-5 produtos-container-wrapper">
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
          <div class="col d-flex justify-content-center" v-for="produto in produtos" :key="produto.id">
            <div class="card" style="width: 18rem;">
              <img :src="produto.imagem" class="card-img-top" :alt="produto.titulo">
              <div class="card-body">
                <h5 class="card-title">{{ produto.titulo }}</h5>
                <p class="card-text">{{ produto.descricao }}</p>
                <a href="#" class="btn btn-primary">Acessar</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      produtos: [
        {
          id: 1,
          titulo: "PlayStation 5",
          descricao: "Console em perfeito estado com 2 controles. Aceito troca por PC Gamer.",
          imagem: "/images/ps5.jpg"
        },
        {
          id: 2,
          titulo: "iPhone 13 Pro",
          descricao: "Bateria 85%, sem marcas de uso. Troco por celular mais recente com volta.",
          imagem: ""
        },
        {
          id: 3,
          titulo: "Bicicleta Aro 29",
          descricao: "Bicicleta de trilha semi-nova. Interessa trocar por instrumento musical.",
          imagem: ""
        },
        {
          id: 4,
          titulo: "Notebook Gamer",
          descricao: "RTX 3060, 16GB RAM. Busco MacBook M1 ou superior para trabalho.",
          imagem: ""
        }
      ]
    }
  }
}
</script>

<style scoped>
@import "bootstrap/dist/css/bootstrap.css";

.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.conteudo-principal {
  flex: 1;
}

.hero-section {
  background: #3b7fff;
  width: 100%;
  padding: 0 0 110px 0;
  position: relative;
  text-align: center;
  color: #ffffff;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.hero-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px 20px;
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-nav a {
  color: #ffffff !important;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  opacity: 0.95;
  transition: opacity 0.2s;
}

.header-nav a:hover {
  opacity: 1;
}

.nav-links {
  display: flex;
  gap: 40px;
}

.arrow-down {
  font-size: 12px;
  margin-left: 2px;
}

.cart-icon a {
  font-size: 22px;
}

.hero-content {
  max-width: 800px;
  margin: 60px auto 0 auto;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 15px;
  letter-spacing: -0.5px;
  color: #ffffff;
}

.hero-content p {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
  color: #ffffff;
}

.white-gradient-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: linear-gradient(to bottom, rgba(59, 127, 255, 0) 0%, #ffffff 100%);
  pointer-events: none;
}

.produtos-container-wrapper {
  position: relative;
  z-index: 5;
  margin-top: -50px !important;
}

.card-img-top {
  height: 180px;
  object-fit: cover;
}
</style>
