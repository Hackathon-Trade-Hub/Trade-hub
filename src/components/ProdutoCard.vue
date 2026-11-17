<template>
  <RouterLink :to="{ name: 'paginaProduto', params: { id } }" class="produto-card">
    <div class="produto-media">
      <span v-if="status" class="produto-badge">{{ status }}</span>

      <button
        type="button"
        class="produto-fav"
        :class="{ 'produto-fav--ativo': favorito }"
        :aria-label="favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
        :aria-pressed="favorito"
        :disabled="salvando"
        :title="favorito ? 'Remover dos favoritos (prioridade ' + prioridadeAtual + ')' : 'Adicionar aos favoritos'"
        @click.prevent.stop="alterarFavorito"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
        </svg>
      </button>

      <div v-if="escolhendo" class="produto-prioridade" @click.prevent.stop>
        <p>Prioridade</p>
        <button
          v-for="nivel in prioridades"
          :key="nivel"
          type="button"
          class="prioridade-opcao"
          :class="'prioridade-opcao--' + classePrioridade(nivel)"
          :disabled="salvando"
          @click.prevent.stop="favoritarCom(nivel)"
        >
          {{ nivel }}
        </button>
      </div>

      <img :src="imagem" class="produto-img" :alt="titulo" loading="lazy" />
    </div>

    <div class="produto-info">
      <p v-if="categoria" class="produto-categoria">{{ categoria }}</p>
      <h3 class="produto-titulo">{{ titulo }}</h3>
      <p class="produto-preco">{{ preco }}</p>
    </div>
  </RouterLink>
</template>

<script>
import { usuarioAtual } from '@/data/auth.js'
import {
  PRIORIDADES,
  alternarFavorito,
  buscarFavoritoDoProduto,
  classePrioridade,
  produtoEstaNosFavoritos,
} from '@/data/favoritos.js'

export default {
  name: 'ProdutoCard',
  props: {
    id: [String, Number],
    titulo: String,
    descricao: String,
    imagem: String,
    preco: [String, Number],
    status: String,
    categoria: String,
  },
  data() {
    return {
      salvando: false,
      escolhendo: false,
      prioridades: PRIORIDADES,
    }
  },
  computed: {
    favorito() {
      return produtoEstaNosFavoritos(this.id)
    },
    prioridadeAtual() {
      const favorito = buscarFavoritoDoProduto(this.id)
      return favorito?.prioridade || 'Média'
    },
  },
  methods: {
    classePrioridade,
    async alterarFavorito() {
      if (!usuarioAtual.value) {
        this.$router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath },
        })
        return
      }

      if (!this.favorito) {
        this.escolhendo = !this.escolhendo
        return
      }

      const confirmou = confirm('Tem certeza que deseja remover este produto dos favoritos?')
      if (!confirmou) return

      await this.salvar()
    },
    async favoritarCom(prioridade) {
      await this.salvar(prioridade)
    },
    async salvar(prioridade) {
      this.salvando = true

      try {
        await alternarFavorito(this.id, prioridade)
      } catch (erro) {
        alert(erro.message || 'Não foi possível atualizar seus favoritos.')
      }

      this.salvando = false
      this.escolhendo = false
    },
  },
}
</script>

<style scoped>
.produto-card {
  --azul: #0758f5;
  --azul-suave: #eaf0fe;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 260px;

  background: #ffffff;
  border: 1px solid #e6e8ec;
  border-radius: 14px;
  overflow: hidden;

  text-decoration: none;
  color: inherit;
  cursor: pointer;

  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.produto-card:hover {
  border-color: var(--azul);
  box-shadow: 0 8px 24px rgba(7, 88, 245, 0.12);
  transform: translateY(-1px);
  transition: 0.4s;
}

.produto-card:focus-visible {
  outline: 2px solid var(--azul);
  outline-offset: 2px;
}

.produto-media {
  position: relative;
  aspect-ratio: 1 / 1;
  background: #f6f7fb;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
  box-sizing: border-box;
}

.produto-img {
  width: 60%;
  height: 100%;
  object-fit: contain;
}

.produto-badge {
  position: absolute;
  top: 10px;
  left: 10px;

  background: #ffffff;
  color: var(--azul);
  border: 1px solid var(--azul-suave);

  font-size: 0.72rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.produto-fav {
  position: absolute;
  top: 8px;
  right: 8px;

  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.92);
  color: #9aa1af;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;

  transition: color 0.2s ease;
}

.produto-fav:hover {
  color: var(--azul);
}

.produto-fav:disabled {
  opacity: 0.6;
  cursor: wait;
}

.produto-fav:focus-visible {
  outline: 2px solid var(--azul);
  outline-offset: 2px;
}

.produto-fav--ativo {
  color: #ef4444;
}

.produto-fav--ativo svg {
  fill: currentColor;
}

.produto-prioridade {
  position: absolute;
  top: 44px;
  right: 8px;
  z-index: 5;

  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 110px;
  padding: 10px;

  background: #ffffff;
  border: 1px solid #e6e8ec;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(23, 26, 33, 0.14);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.produto-prioridade p {
  margin: 0 0 2px;
  color: #8b93a3;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.prioridade-opcao {
  padding: 7px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: left;
}

.prioridade-opcao:disabled {
  opacity: 0.6;
  cursor: wait;
}

.prioridade-opcao--alta {
  color: #d92d20;
  background: #fff4f3;
  border-color: #f7b4ae;
}

.prioridade-opcao--media {
  color: #b54708;
  background: #fffaeb;
  border-color: #fedf89;
}

.prioridade-opcao--baixa {
  color: #15803d;
  background: #ecfdf3;
  border-color: #c7f0d9;
}

.produto-info {
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: 14px 16px 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.produto-categoria {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 500;
  color: #8b93a3;
}

.produto-titulo {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
  color: #171a21;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  min-height: 2.6em;
}

.produto-preco {
  margin: 4px 0 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #171a21;
}
</style>
