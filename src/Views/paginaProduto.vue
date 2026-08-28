<template>
  <section class="pagina-produto">
    <div v-if="produto" class="detalhes-produto">
      <router-link to="/" class="voltar">← Voltar</router-link>

      <article class="produto-card">
        <div class="imagem-container">
          <img :src="produto.imagem" :alt="produto.titulo" class="imagem-produto">
        </div>

        <div class="informacoes-produto">
          <span class="estado-produto">{{ produto.status }}</span>
          <h1>{{ produto.titulo }}</h1>
          <p class="preco">{{ produto.preco }}</p>
          <button class="botao-interesse" type="button" @click="adicionarProduto">
            Tenho interesse
          </button>
          <br>

          <RouterLink to="/perfilVendedor" class="nome-loja">{{ vendedor.nome }}</RouterLink>

          <div class="separador"></div>

          <h2>Descrição do produto</h2>
          <p class="descricao">{{ produto.descricao }}</p>

        </div>
      </article>
    </div>

    <div v-else class="produto-nao-encontrado">
      <h1>Produto não encontrado</h1>
      <p>Este anúncio pode ter sido removido ou o link está incorreto.</p>
      <router-link to="/" class="botao-voltar">Voltar para a Home</router-link>

    </div>

  <div v-if="mostrarNotificacao" class="notificacao">
    ✓ Produto adicionado ao carrinho!
    <br>
    <RouterLink to="/carrinho" class="botao-ver-carrinho">Ver carrinho!</RouterLink>
  </div>
  </section>
</template>


<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { listaProdutos } from '@/data/produtos';
import { adicionarAoCarrinho } from '@/data/carrinho';
import { vendedor } from '@/data/vendedor.js';

const route = useRoute();

const mostrarNotificacao = ref(false);

const produto = computed(() => {
  const idDaUrl = Number(route.params.id);

  return listaProdutos.find(item => item.id === idDaUrl);
});

function adicionarProduto() {
  adicionarAoCarrinho(produto.value);

  mostrarNotificacao.value = true;

  setTimeout(() => {
    mostrarNotificacao.value = false;
  }, 3000);
}
</script>

<style scoped>
.botao-ver-carrinho {
  text-decoration: underline;
  color: #ffffff;

}
.botao-ver-carrinho:hover {
  color: #e0e0e0;
}
.nome-loja{
  display: inline-block;
  margin-top: 25px;
  color: #075ed9;
  font-weight: 600;
  text-decoration: underline;
  font-size: 1.15vw;
}
.pagina-produto {
  min-height: 100%;
  padding: 56px 24px 80px;
  background: linear-gradient(180deg, #f3f7ff 0%, #ffffff 45%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}

.detalhes-produto {
  max-width: 1120px;
  margin: 0 auto;
}

.voltar {
  display: inline-block;
  margin-bottom: 24px;
  color: #075ed9;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.15vw;
}

.voltar:hover {
  text-decoration: underline;
}

.produto-card {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(320px, 1fr);
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #d9e5f7;
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(12, 66, 145, 0.12);
}

.imagem-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 460px;
  padding: 42px;
  background: #f5f8fd;
}

.imagem-produto {
  width: 100%;
  max-width: 430px;
  height: 370px;
  object-fit: contain;
}

.informacoes-produto {
  padding: 52px;
}

.estado-produto {
  display: inline-block;
  padding: 6px 12px;
  color: #075ed9;
  background: #e9f2ff;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
}

h1 {
  margin: 18px 0 14px;
  color: #10233e;
  font-size: clamp(28px, 3vw, 40px);
  line-height: 1.15;
}

.preco {
  margin: 0;
  color: #0066ff;
  font-size: 32px;
  font-weight: 800;
}

.separador {
  height: 1px;
  margin: 30px 0;
  background: #e2e8f2;
}

h2 {
  margin: 0 0 12px;
  color: #172b4d;
  font-size: 18px;
}

.descricao {
  margin: 0;
  color: #53657d;
  font-size: 16px;
  line-height: 1.7;
}

.botao-interesse,
.botao-voltar {
  display: inline-block;
  margin-top: 32px;
  padding: 14px 28px;
  color: #ffffff;
  background: #0066ff;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 102, 255, 0.22);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.2s;
}

.botao-interesse:hover,
.botao-voltar:hover {
  background: #0052cc;
  transform: translateY(-2px);
}

.produto-nao-encontrado {
  max-width: 560px;
  margin: 40px auto;
  padding: 44px;
  text-align: center;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 12px 35px rgba(12, 66, 145, 0.1);
}

.produto-nao-encontrado h1 {
  margin-top: 0;
}

.produto-nao-encontrado p {
  color: #53657d;
}

@media (max-width: 760px) {
  .pagina-produto {
    padding: 32px 16px 56px;
  }

  .produto-card {
    grid-template-columns: 1fr;
  }

  .imagem-container {
    min-height: 300px;
    padding: 28px;
  }

  .imagem-produto {
    height: 260px;
  }

  .informacoes-produto {
    padding: 32px 26px;
  }
}
.notificacao {
  position: fixed;
  bottom: 30px;
  right: 30px;

  padding: 16px 24px;

  color: #ffffff;
  background: green;

  border-radius: 12px;

  font-size: 16px;
  font-weight: 700;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);

  z-index: 9999;

  animation: aparecer 0.3s ease;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
