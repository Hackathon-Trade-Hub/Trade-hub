<template>
  <div class="pagina-perfil">
    <div class="perfil-topo">
      <div class="avatar">
        <img :src="usuarioCadastrado.imagem" alt="Sem Foto">
      </div>

      <div class="usuario">
        <h2>{{ usuarioCadastrado.usuario }}</h2>
        <p>{{ usuarioCadastrado.email }}</p>
      </div>

      <RouterLink to="/editarperfil" class="btn-editar">Editar</RouterLink>
    </div>

    <div class="informacoes">
      <div class="info-item">
        <span class="label">Usuário</span>
        <span class="valor">{{ usuarioCadastrado.usuario }}</span>
      </div>

      <div class="info-item">
        <span class="label">Email</span>
        <span class="valor">{{ usuarioCadastrado.email }}</span>
      </div>

      <div class="info-item">
        <span class="label">Senha</span>
        <span class="valor">••••••••</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usuarioCadastrado } from '@/data/usuario.js'
</script>

<style scoped>
.pagina-perfil {
  width: 100%;
  min-height: 100vh;
  padding: 1vw 5vw;
  background: #fff;
  font-family: Arial, sans-serif;
  color: #222;
  box-sizing: border-box;
}

.perfil-topo {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 2vw;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.usuario {
  flex: 1;
}

.usuario h2 {
  margin: 0 0 4px;
  font-size: 2rem;
  font-weight: 400;
}

.usuario p {
  margin: 0;
  font-size: 1rem;
  color: #777;
}

.btn-editar {
  padding: 10px 24px;
  height: 40px;
  border-radius: 20px;
  background: #008cff;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.informacoes {
  max-width: 480px;
  display: grid;
  gap: 16px;
  margin-top: 30px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 18px;
  background: #f5f5f5;
  border-radius: 12px;
}

.label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #888;
}

.valor {
  font-size: 1.05rem;
  color: #222;
}
</style>
