<template>
  <div v-if="usuarioAtual" class="pagina-perfil">
    <div class="perfil-topo">
      <div class="avatar">
        <img :src="usuarioAtual.foto" :alt="`Foto de ${usuarioAtual.nome}`" />
      </div>

      <div class="usuario">
        <h2>{{ usuarioAtual.nome }}</h2>
        <p>{{ usuarioAtual.email }}</p>
      </div>
    </div>

    <div class="informacoes">
      <div class="info-item">
        <span class="label">Nome</span>
        <span class="valor">{{ usuarioAtual.nome }}</span>
      </div>

      <div class="info-item">
        <span class="label">Email</span>
        <span class="valor">{{ usuarioAtual.email }}</span>
      </div>

      <div class="info-item">
        <span class="label">Telefone</span>
        <span class="valor">{{ usuarioAtual.telefone }}</span>
      </div>
      <RouterLink to="/editarperfil" class="btn-editar">Editar</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { usuarioAtual } from '@/data/auth.js'
</script>

<style scoped>
.pagina-perfil {
  width: calc(100% - 48px);
  max-width: 980px;
  margin: 48px auto 72px;
  padding: 32px;
  color: #24324a;
  background: #ffffff;
  border: 1px solid #dce3ee;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(24, 39, 75, 0.07);
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.perfil-topo {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 28px;
  border-bottom: 1px solid #e3e8f0;
}

.avatar {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: #edf3ff;
  border: 3px solid #dce8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.usuario {
  flex: 1;
}

.usuario h2 {
  margin: 0 0 6px;
  color: #18243a;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
}

.usuario p {
  margin: 0;
  color: #667085;
  font-size: 0.95rem;
}

.btn-editar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: end;
  min-width: 120px;
  padding: 11px 20px;
  color: #ffffff;
  background: #185aee;
  border: 1px solid #185aee;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.2s;
}

.btn-editar:hover {
  background: #0d47bd;
}

.informacoes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 28px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
  padding: 16px;
  background: #f7f9fc;
  border: 1px solid #e3e8f0;
  border-radius: 8px;
}

.label {
  color: #667085;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.valor {
  overflow: hidden;
  color: #24324a;
  font-size: 1rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.informacoes .btn-editar {
  grid-column: 1 / -1;
  margin-top: 6px;
}

@media (max-width: 720px) {
  .pagina-perfil {
    width: calc(100% - 32px);
    margin: 32px auto 56px;
    padding: 24px;
  }

  .informacoes {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .perfil-topo {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 96px;
    height: 96px;
  }

  .usuario h2 {
    font-size: 1.5rem;
  }

  .btn-editar {
    width: 100%;
  }
}
</style>
