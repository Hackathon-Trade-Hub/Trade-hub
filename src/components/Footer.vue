<template>
  <footer>
    <div class="container">

      <div class="tradehub">
        <h2>Trade<span>Hub</span></h2>
      </div>

      <div class="links">
        <div class="coluna">
          <h3>Início</h3>
          <RouterLink to="/trocar">Trocar</RouterLink>
          <RouterLink to="/comprar">Comprar</RouterLink>
          <RouterLink to="/cadastrarP">Cadastrar</RouterLink>
        </div>

        <div class="coluna">
          <h3>Sobre nós</h3>
          <RouterLink to="/sobre">Informações</RouterLink>
        </div>

        <div class="coluna">
          <h3>Suporte</h3>
          <RouterLink to="/suporte">Contato</RouterLink>
        </div>
      </div>

      

    </div>

    <div class="direitos">
      <p>© 2026 TradeHub Marketplace - Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
defineOptions({ name: 'SiteFooter' })
</script>

<style scoped>
footer {
  background-color: #0052cc;
  color: #ffffff;
  padding: 30px 20px;
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container{
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  gap: 180px;
  align-items: center;
}

.tradehub h2 {
  font-size: 3vw;
  font-weight: 700;
  margin: 0;
  align-self: center;
}

.tradehub h2 span {
  color: #0d1b2a;
}

.links {
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
}

.coluna {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.coluna h3 {
  font-size: 2vw;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.coluna a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5vw;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.coluna a:hover {
  opacity: 1;
}

.icones {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.social {
  display: flex;
  gap: 20px;
}

.social a i{
  color: #ffffff;
  text-decoration: none;
  font-size: 2vw;
  transition: opacity 0.2s;
}

.social a:hover {
  opacity: 0.7;
}

.contato{
  color: black;
  background: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5vw;
  padding: 10px 25px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 10px;
}

.direitos{
  text-align: center;
  margin-top: 40px;
  font-size: 13px;
  opacity: 0.9;
  width: 100%;
}
</style>

