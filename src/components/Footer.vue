<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-top">
        <div class="brand">
          <h2 class="logo">Trade<span>Hub</span></h2>
          <p class="tagline">
            O maior site de troca e venda do Brasil. Encontre, troque e venda
            com quem está pertinho de você.
          </p>
          <div class="social">
            <a href="#" aria-label="Instagram" title="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#" aria-label="WhatsApp" title="WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
            <a href="#" aria-label="Facebook" title="Facebook">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="X (Twitter)" title="X (Twitter)">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>

        <div class="links">
          <div class="coluna">
            <h3>Início</h3>
            <RouterLink to="/trocar">Trocar</RouterLink>
            <RouterLink to="/comprar">Comprar</RouterLink>
            <RouterLink to="/cadastrarP">Cadastrar produto</RouterLink>
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

      <div class="divider"></div>

      <div class="footer-bottom">
        <p>© 2026 TradeHub Marketplace — Todos os direitos reservados.</p>

        <button class="topo" type="button" @click="voltarAoTopo" aria-label="Voltar ao topo" title="Voltar ao topo">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="6 11 12 5 18 11" />
          </svg>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineOptions({ name: 'SiteFooter' })

function voltarAoTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
footer {
  position: relative;
  width: 100%;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  background: linear-gradient(135deg, #0b1830 0%, #123b8f 55%, #185aee 100%);
  overflow: hidden;
}

footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #185aee, #8fb4ff, #185aee);
}

footer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 85% 0%, rgba(255, 255, 255, 0.12), transparent 45%);
  pointer-events: none;
}

.footer-inner {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 56px 24px 24px;
  box-sizing: border-box;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 48px;
}

.brand {
  flex: 1 1 280px;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.logo {
  font-size: clamp(1.6rem, 1vw + 1.3rem, 2.2rem);
  font-weight: 700;
  margin: 0;
}

.logo span {
  color: #5d91f3;
}

.tagline {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
}

.social {
  display: flex;
  gap: 12px;
}

.social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.social a i {
  font-size: 1.1rem;
}

.social a:hover {
  background: #ffffff;
  color: #185aee;
  transform: translateY(-3px);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  flex: 2 1 420px;
  justify-content: space-between;
}

.coluna {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 140px;
}

.coluna h3 {
  position: relative;
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 6px 0;
  padding-bottom: 10px;
}

.coluna h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 28px;
  height: 2px;
  border-radius: 2px;
  background: #9fc0ff;
}

.coluna a {
  position: relative;
  width: fit-content;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.coluna a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background: #ffffff;
  transition: width 0.25s ease;
}

.coluna a:hover {
  color: #ffffff;
}

.coluna a:hover::after {
  width: 100%;
}

.divider {
  margin-top: 40px;
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 20px;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.topo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 50%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.topo:hover {
  background: #ffffff;
  color: #185aee;
  transform: translateY(-3px);
}
</style>