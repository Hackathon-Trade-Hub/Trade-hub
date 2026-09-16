<template>
  <main v-if="usuarioAtual" class="pagina-usuario">
    <section class="pagina-perfil">
      <div class="perfil-topo">
        <div class="avatar">
          <img :src="usuarioAtual.foto" :alt="`Foto de ${usuarioAtual.nome}`" />
        </div>

        <div class="usuario">
          <span class="perfil-etiqueta">MEU PERFIL</span>
          <h2>{{ usuarioAtual.nome }}</h2>
          <p>{{ usuarioAtual.email }}</p>
        </div>

        <RouterLink to="/editarperfil" class="btn-editar">Editar perfil</RouterLink>
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
      </div>
    </section>

    <section class="favoritos" aria-labelledby="titulo-favoritos">
      <div class="favoritos-cabecalho">
        <div>
          <span class="favoritos-etiqueta">MINHA LISTA</span>
          <h2 id="titulo-favoritos">Produtos favoritos</h2>
          <p>Seus anúncios preferidos ficam reunidos aqui.</p>
        </div>
        <span class="favoritos-contador">
          {{ produtosFavoritos.length }}
          {{ produtosFavoritos.length === 1 ? 'item' : 'itens' }}
        </span>
      </div>

      <div v-if="produtosFavoritos.length" class="favoritos-grid">
        <ProdutoCard
          v-for="produto in produtosFavoritos"
          :key="produto.id"
          :id="produto.id"
          :titulo="produto.titulo"
          :descricao="produto.descricao"
          :imagem="produto.imagem"
          :preco="produto.preco"
          :status="produto.status"
          :categoria="produto.categoria"
        />
      </div>

      <div v-else class="favoritos-vazio">
        <div class="coracao-vazio" aria-hidden="true">♡</div>
        <h3>Você ainda não tem favoritos</h3>
        <p>Use o coração nos produtos para guardar os anúncios que mais interessam.</p>
        <RouterLink to="/" class="btn-explorar">Explorar produtos</RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { usuarioAtual } from '@/data/auth.js'
import { produtosFavoritos } from '@/data/favoritos.js'
import ProdutoCard from '@/components/ProdutoCard.vue'
</script>

<style scoped>
.pagina-usuario {
  --azul: #185aee;
  --azul-escuro: #0f4dcc;
  --azul-suave: #eef4ff;
  --texto: #17233b;
  --texto-suave: #667085;
  --borda: #e2e8f2;

  width: min(calc(100% - 48px), 1180px);
  margin: 52px auto 80px;
  color: var(--texto);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.pagina-perfil,
.favoritos {
  background: #ffffff;
  border: 1px solid rgba(209, 220, 235, 0.9);
  border-radius: 24px;
  box-shadow: 0 16px 44px rgba(31, 55, 92, 0.09);
  box-sizing: border-box;
}

.pagina-perfil {
  overflow: hidden;
}

.favoritos {
  margin-top: 32px;
  padding: 34px 36px 38px;
}

.perfil-topo {
  position: relative;
  display: flex;
  align-items: center;
  gap: 26px;
  min-height: 176px;
  padding: 34px 40px;
  overflow: hidden;
  background:
    radial-gradient(circle at 88% 12%, rgba(255, 255, 255, 0.2) 0 72px, transparent 73px),
    radial-gradient(circle at 76% 110%, rgba(255, 255, 255, 0.11) 0 115px, transparent 116px),
    linear-gradient(125deg, #164cc9 0%, #2064ef 55%, #6495ff 100%);
  box-sizing: border-box;
}

.perfil-topo::after {
  position: absolute;
  right: -58px;
  bottom: -92px;
  width: 240px;
  height: 240px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 50%;
  content: '';
}

.avatar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 116px;
  height: 116px;
  flex-shrink: 0;
  overflow: hidden;
  background: #edf3ff;
  border: 4px solid rgba(255, 255, 255, 0.94);
  border-radius: 50%;
  box-shadow: 0 10px 28px rgba(4, 35, 105, 0.24);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.usuario {
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 0;
}

.perfil-etiqueta {
  display: inline-block;
  margin-bottom: 9px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.usuario h2 {
  margin: 0 0 7px;
  overflow: hidden;
  color: #ffffff;
  font-size: clamp(1.65rem, 3vw, 2.1rem);
  font-weight: 750;
  letter-spacing: -0.025em;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.usuario p {
  margin: 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.96rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-editar {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 126px;
  padding: 12px 19px;
  color: #1249c0;
  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 11px;
  box-shadow: 0 8px 20px rgba(4, 35, 105, 0.16);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.btn-editar:hover {
  background: #f6f9ff;
  box-shadow: 0 11px 25px rgba(4, 35, 105, 0.22);
  transform: translateY(-2px);
}

.btn-editar:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.72);
  outline-offset: 3px;
}

.informacoes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  padding: 28px 32px 32px;
}

.info-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  padding: 18px 20px 18px 23px;
  overflow: hidden;
  background: linear-gradient(145deg, #f9fbff 0%, #f3f7fd 100%);
  border: 1px solid #e3eaf5;
  border-radius: 14px;
}

.info-item::before {
  position: absolute;
  top: 13px;
  bottom: 13px;
  left: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--azul), #7ba5ff);
  border-radius: 0 999px 999px 0;
  content: '';
}

.label {
  color: #738198;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.075em;
  text-transform: uppercase;
}

.valor {
  overflow: hidden;
  color: #22314a;
  font-size: 0.98rem;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.favoritos-cabecalho {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--borda);
}

.favoritos-etiqueta {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--azul);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.11em;
}

.favoritos-etiqueta::before {
  width: 7px;
  height: 7px;
  background: var(--azul);
  border-radius: 50%;
  box-shadow: 0 0 0 5px var(--azul-suave);
  content: '';
}

.favoritos-cabecalho h2 {
  margin: 9px 0 6px;
  color: var(--texto);
  font-size: clamp(1.4rem, 3vw, 1.7rem);
  letter-spacing: -0.02em;
}

.favoritos-cabecalho p {
  margin: 0;
  color: var(--texto-suave);
  line-height: 1.5;
}

.favoritos-contador {
  flex-shrink: 0;
  min-width: 62px;
  padding: 9px 13px;
  color: var(--azul);
  background: var(--azul-suave);
  border: 1px solid #d9e6ff;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 800;
  text-align: center;
}

.favoritos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  margin-top: 30px;
}

.favoritos-grid :deep(.produto-card) {
  max-width: none;
  border-color: #e3e9f2;
  border-radius: 18px;
  box-shadow: 0 8px 22px rgba(31, 55, 92, 0.07);
}

.favoritos-vazio {
  margin-top: 28px;
  padding: 42px 24px;
  background:
    radial-gradient(circle at 50% 0%, rgba(24, 90, 238, 0.07), transparent 48%),
    #fafcff;
  border: 1px dashed #cbd9ee;
  border-radius: 18px;
  text-align: center;
}

.coracao-vazio {
  display: grid;
  width: 64px;
  height: 64px;
  margin: 0 auto 18px;
  color: var(--azul);
  background: #ffffff;
  border: 1px solid #dce7fa;
  border-radius: 50%;
  box-shadow: 0 10px 24px rgba(24, 90, 238, 0.12);
  place-items: center;
  font-size: 2.15rem;
}

.favoritos-vazio h3 {
  margin: 0 0 9px;
  color: var(--texto);
  font-size: 1.25rem;
}

.favoritos-vazio p {
  max-width: 480px;
  margin: 0 auto;
  color: var(--texto-suave);
  line-height: 1.55;
}

.btn-explorar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
  padding: 12px 20px;
  color: #ffffff;
  background: var(--azul);
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(24, 90, 238, 0.2);
  font-weight: 700;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.btn-explorar:hover {
  background: var(--azul-escuro);
  box-shadow: 0 11px 24px rgba(24, 90, 238, 0.27);
  transform: translateY(-2px);
}

.btn-explorar:focus-visible {
  outline: 3px solid rgba(24, 90, 238, 0.3);
  outline-offset: 3px;
}

@media (max-width: 820px) {
  .pagina-usuario {
    width: calc(100% - 32px);
    margin: 36px auto 60px;
  }

  .favoritos {
    padding: 28px;
  }

  .perfil-topo {
    padding: 30px;
  }

  .informacoes {
    grid-template-columns: 1fr;
    padding: 24px 28px 28px;
  }

  .favoritos-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 560px) {
  .pagina-usuario {
    width: calc(100% - 24px);
    margin: 24px auto 48px;
  }

  .pagina-perfil,
  .favoritos {
    border-radius: 18px;
  }

  .favoritos {
    margin-top: 20px;
    padding: 24px 20px;
  }

  .perfil-topo {
    gap: 16px;
    min-height: 0;
    padding: 28px 22px 24px;
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .usuario h2 {
    font-size: 1.5rem;
  }

  .btn-editar {
    width: 100%;
    margin-top: 6px;
  }

  .informacoes {
    gap: 12px;
    padding: 20px;
  }

  .favoritos-cabecalho {
    align-items: flex-start;
    flex-direction: column;
  }

  .favoritos-contador {
    min-width: 0;
  }

  .favoritos-grid {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-top: 24px;
  }

  .favoritos-vazio {
    margin-top: 22px;
    padding: 34px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-editar,
  .btn-explorar {
    transition: none;
  }
}
</style>
