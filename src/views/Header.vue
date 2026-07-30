<template>
  <header class="main-header">
    <div class="header-container">
      <div class="logo">
        <a href="../pages/Home.vue">Trade<span>Hub</span></a>
      </div>
      <nav class="main-navigation">
        <ul>
          <li><a href="../pages/Home.vue" class="active">Início</a></li>
          <li><a href="#">Sobre nós</a></li>
          <li><a href="#">Suporte</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <a href="#" class="btn-login">Entrar</a>
        <a href="#" class="btn-register">Cadastrar</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
.main-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo a {
  font-size: 24px;
  font-weight: 700;
  color: #0b1a30;
  text-decoration: none;
}
.logo a span {
  color: #0066ff;
}
.main-navigation ul {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
}
.main-navigation ul li a {
  color: #555555;
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s;
}
.main-navigation ul li a:hover,
.main-navigation ul li a.active {
  color: #0066ff;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}
.btn-login {
  color: #0066ff;
  font-weight: 600;
  padding: 8px 16px;
  text-decoration: none;
}
.btn-register {
  background-color: #0066ff;
  color: #ffffff;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.3s;
}
.btn-register:hover {
  background-color: #004ecc;
}
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 20px;
  }
  .main-navigation ul {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
}
</style>
