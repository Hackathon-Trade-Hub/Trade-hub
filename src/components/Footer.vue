<template>
  <footer class="main-footer">
    <div class="footer-container">

      <div class="footer-brand">
        <h2>Trade<span>Hub</span></h2>
      </div>

      <div class="footer-columns">
        <div class="footer-col">
          <h3>Início</h3>
          <RouterLink to="/trocar">Trocar</RouterLink>
          <RouterLink to="/comprar">Comprar</RouterLink>
          <RouterLink to="/cadastrarP">Cadastrar</RouterLink>
        </div>

        <div class="footer-col">
          <h3>Sobre nós</h3>
          <RouterLink to="/sobre">Informações</RouterLink>
        </div>

        <div class="footer-col">
          <h3>Suporte</h3>
          <RouterLink to="/suporte">Contato</RouterLink>
        </div>
      </div>

      <div class="footer-right">
        <div class="footer-socials">
          <a href="#" aria-label="X">X</a>
          <a href="#" aria-label="F">F</a>
          <a href="#" aria-label="I">I</a>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <p>© 2026 TrocaHub Marketplace - Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script>
  import { RouterLink } from 'vue-router';
  import router from '@/router';
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.main-footer {
  background-color: #0052cc;
  color: #ffffff;
  padding: 60px 40px 30px 40px;
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
}

.footer-brand h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.footer-brand h2 span {
  color: #0d1b2a;
}

.footer-columns {
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-col h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.footer-col a {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.footer-col a:hover {
  opacity: 1;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}

.footer-socials {
  display: flex;
  gap: 20px;
}

.footer-socials a {
  color: #ffffff;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  transition: opacity 0.2s;
}

.footer-socials a:hover {
  opacity: 0.7;
}

.btn-contact {
  background-color: #ffffff;
  color: #000000;
  text-decoration: none;
  font-weight: 600;
  padding: 12px 35px;
  border-radius: 25px;
  font-size: 15px;
  text-align: center;
  transition: background-color 0.2s;
}

.btn-contact:hover {
  background-color: #e6e6e6;
}

.footer-bottom {
  text-align: center;
  margin-top: 50px;
  font-size: 13px;
  opacity: 0.9;
  width: 100%;
}
</style>
