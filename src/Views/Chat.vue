<template>
  <div class="chat">
    <div class="cabecalho">
      <button aria-label="Voltar" type="button" class="botao-icone botao-voltar" @click="voltarParaHome">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>
      <div class="avatar">{{ iniciais }}</div>
      <div class="info-cabecalho">
        <div class="nome">{{ produtoExibido.seller }}</div>
        <div class="status">visto por último há 5 min</div>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FB3F0" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    </div>

    <div class="produto">
      <img :src="produtoExibido.image" :alt="produtoExibido.title" />
      <div class="info-produto">
        <div class="titulo">{{ produtoExibido.title }}</div>
        <div class="precos">
          <span class="preco-antigo">{{ formatarMoeda(produtoExibido.originalPrice) }}</span>
          <span class="preco-oferta">{{ formatarMoeda(produtoExibido.offerPrice) }}</span>
        </div>
      </div>
      <span class="etiqueta-status" :class="statusOferta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
          <circle cx="7" cy="7" r="1" />
        </svg>
        {{ statusOferta === "aceita" ? "Aceita" : "Aguardando" }}
      </span>
    </div>

    <div class="mensagens" ref="areaMensagens">
      <div class="data-mensagens">Hoje</div>

      <template v-for="msg in mensagens" :key="msg.id">
        <div v-if="msg.tipo === 'sistema'" class="linha centralizada">
          <div class="balao-sistema">{{ msg.texto }}</div>
        </div>

        <div v-else class="linha" :class="msg.tipo === 'minha' ? 'final' : 'inicial'">
          <div class="envoltorio-mensagem" :class="msg.tipo === 'minha' ? 'minha' : 'dele'">
            <div class="balao" :class="msg.tipo === 'minha' ? 'minha' : 'dele'">
              {{ msg.texto }}
            </div>
            <div class="metadados">
              <span class="horario">{{ formatarHora(msg.horario) }}</span>
              <svg v-if="msg.tipo === 'minha'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A56DB"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 6 7 17 2 12" />
                <polyline points="22 6 11 17 9 15" />
              </svg>
            </div>
          </div>
        </div>
      </template>

      <div v-if="digitando" class="linha inicial">
        <div class="digitando">
          <span class="ponto"></span><span class="ponto"></span><span class="ponto"></span>
        </div>
      </div>
    </div>

    <div v-if="statusOferta === 'aguardando'" class="acoes-rapidas">
      <button v-for="message in mensagensProntas" :key="message" type="button" @click="selecionarMensagem(message)">
        {{ message }}
      </button>
    </div>

    <form class="barra-entrada" @submit.prevent="enviarMensagem">
      <input v-model="rascunho" type="text" placeholder="Escreva uma mensagem" autocomplete="off" enterkeyhint="send" />
      <button class="botao-enviar" type="submit" :disabled="!rascunho.trim()" aria-label="Enviar">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { listaProdutos } from "@/data/produtos";
import { propostasTroca } from "@/data/propostas";
import { usuarioAtual } from "@/data/auth";

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      title: "iPhone 12 128GB Azul",
      originalPrice: 2200,
      offerPrice: 1850,
      image:
        "https://images.unsplash.com/photo-1592286927505-1def25115558?q=80&w=200&auto=format&fit=crop",
      seller: "Marcos Vinícius",
    }),
  },
});

const route = useRoute();
const router = useRouter();
const proposta = computed(() =>
  propostasTroca.value.find(
    (item) => item.id === route.params.id && item.usuarioId === usuarioAtual.value?.id,
  ),
);
const produtoDaProposta = computed(() =>
  listaProdutos.find((item) => item.id === proposta.value?.produtoAlvoId),
);
const produtoExibido = computed(() => {
  const item = produtoDaProposta.value;

  if (!item) return props.product;

  const preco = Number.parseFloat(
    item.preco.replace("R$", "").replace(".", "").replace(",", "."),
  );

  return {
    title: item.titulo,
    image: item.imagem,
    originalPrice: preco,
    offerPrice: preco,
    seller: "Vendedor do anúncio",
  };
});

const iniciais = computed(() => produtoExibido.value.seller
  .split(" ")
  .slice(0, 2)
  .map((w) => w[0])
  .join(""));

const mensagens = reactive([]);
const rascunho = ref("");
const digitando = ref(false);
const statusOferta = ref("aguardando");
const areaMensagens = ref(null);
const mensagensProntas = [
  "Você aceita a minha proposta?",
  "Podemos combinar a entrega?",
];

let proximoId = 1;

function voltarParaHome() {
  router.push({ name: "home" });
}

function formatarMoeda(n) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarHora(data) {
  return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

async function rolarParaBaixo() {
  await nextTick();
  if (areaMensagens.value) {
    areaMensagens.value.scrollTop = areaMensagens.value.scrollHeight;
  }
}

function adicionarMensagemSistema(texto) {
  mensagens.push({ id: proximoId++, tipo: "sistema", texto, horario: new Date() });
  rolarParaBaixo();
}

function adicionarMensagem(texto, minha) {
  mensagens.push({
    id: proximoId++,
    tipo: minha ? "minha" : "dele",
    texto,
    horario: new Date(),
  });
  rolarParaBaixo();
}

function respostaPara(texto) {
  const mensagem = texto.toLowerCase();
  if (mensagem.includes("aceit") || mensagem.includes("fech")) {
    return {
      texto: `Fechado! Aceito sua oferta de ${formatarMoeda(
        produtoExibido.value.offerPrice
      )}. Bora combinar a entrega?`,
      aceita: true,
    };
  }
  return {
    texto: "Combinado! Consigo entregar amanhã à tarde, te passo o local por aqui.",
    aceita: false,
  };
}

function responderDepois(texto) {
  digitando.value = true;
  rolarParaBaixo();
  window.setTimeout(() => {
    digitando.value = false;
    const resposta = respostaPara(texto);
    adicionarMensagem(resposta.texto, false);
    if (resposta.aceita) statusOferta.value = "aceita";
  }, 1300);
}

function enviarMensagem() {
  const texto = rascunho.value.trim();
  if (!texto) return;
  adicionarMensagem(texto, true);
  rascunho.value = "";
  responderDepois(texto);
}

function selecionarMensagem(mensagem) {
  rascunho.value = mensagem;
}

onMounted(() => {
  adicionarMensagemSistema(`Você enviou uma proposta de troca por ${proposta.value?.nomeProduto ?? "seu produto"}`);
  adicionarMensagem("Oi! Recebi sua oferta aqui, deixa eu ver certinho e já te respondo 🙂", false);
});
</script>

<style scoped>
:root {
  --blue-deep: #0B3D91;
  --blue: #1A56DB;
  --blue-light: #EAF2FE;
  --blue-border: #D6E4FA;
  --bubble-bg: #F1F5FB;
  --ink: #0B1E3F;
  --muted: #9AA9C2;
}

* {
  box-sizing: border-box;
}

.chat {
  width: min(1180px, calc(100vw - 80px));
  max-width: none;
  height: min(780px, calc(100vh - 100px));
  min-height: 620px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(11, 61, 145, 0.14);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--blue-border);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.cabecalho {
  background: var(--blue-deep);
  color: #fff;
  min-height: 78px;
  padding: 18px 28px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.botao-voltar {
  color: #fff;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
}

.info-cabecalho {
  flex: 1;
  min-width: 0;
}

.info-cabecalho .nome {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-cabecalho .status {
  font-size: 12px;
  color: #BFD3F8;
  line-height: 1.2;
}

.produto {
  background: var(--blue-light);
  border-bottom: 1px solid var(--blue-border);
  padding: 18px 28px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.produto img {
  width: 68px;
  height: 68px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #C8DCFA;
  flex-shrink: 0;
}

.info-produto {
  flex: 1;
  min-width: 0;
}

.info-produto .titulo {
  font-size: 16px;
  font-weight: 500;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-produto .precos {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 2px;
}

.preco-antigo {
  font-size: 12px;
  color: #7C8DA8;
  text-decoration: line-through;
}

.preco-oferta {
  font-size: 13px;
  font-weight: 600;
  color: var(--blue);
}

.etiqueta-status {
  font-size: 10.5px;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  white-space: nowrap;
  background: #FFF3D6;
  color: #8A6A00;
}

.etiqueta-status.aceita {
  background: #DCF3E4;
  color: #166B3F;
}

.mensagens {
  flex: 1;
  overflow-y: auto;
  padding: 28px 12%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fff;
}

.data-mensagens {
  text-align: center;
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 6px;
}

.linha {
  width: 100%;
  display: flex;
}

.linha.centralizada {
  justify-content: center;
}

.linha.inicial {
  justify-content: flex-start;
}

.linha.final {
  justify-content: flex-end;
}

.balao-sistema {
  max-width: 85%;
  background: var(--blue-light);
  color: var(--blue);
  font-size: 12px;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: 999px;
  text-align: center;
}

.envoltorio-mensagem {
  display: flex;
  flex-direction: column;
  max-width: 78%;
}

.envoltorio-mensagem.minha {
  align-items: flex-end;
}

.envoltorio-mensagem.dele {
  align-items: flex-start;
}

.balao {
  padding: 12px 17px;
  font-size: 15px;
  line-height: 1.4;
  border-radius: 16px;
}

.balao.minha {
  background: var(--blue);
  color: #fff;
  border-bottom-right-radius: 4px;
}

.balao.dele {
  background: var(--bubble-bg);
  color: var(--ink);
  border-bottom-left-radius: 4px;
}

.metadados {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 3px;
  padding: 0 4px;
}

.metadados .horario {
  font-size: 10.5px;
  color: var(--muted);
}

.digitando {
  background: var(--bubble-bg);
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  padding: 10px 14px;
  display: flex;
  gap: 4px;
  align-items: center;
  width: fit-content;
}

.ponto {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #8FA6CE;
  animation: bounce 1.2s infinite;
}

.ponto:nth-child(2) {
  animation-delay: 0.15s;
}

.ponto:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {

  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }

  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

.acoes-rapidas {
  padding: 0 24px 14px;
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  background: #fff;
}

.acoes-rapidas button {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: var(--blue);
  background: #F5F9FF;
  border: 1px solid #C8DCFA;
  border-radius: 10px;
  padding: 9px;
  cursor: pointer;
}

.acoes-rapidas button:hover {
  background: var(--blue-light);
}

.barra-entrada {
  border-top: 1px solid #E7EEFB;
  padding: 16px 24px 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  background: #fff;
}

.botao-icone {
  background: none;
  border: none;
  cursor: pointer;
  color: #5B7BB3;
  padding: 8px;
  border-radius: 999px;
  display: flex;
  flex-shrink: 0;
}

.botao-icone:hover {
  background: var(--blue-light);
}

input[type="text"] {
  flex: 1;
  min-width: 0;
  background: var(--bubble-bg);
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 14px;
  color: var(--ink);
  outline: none;
}

input[type="text"]:focus {
  box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.2);
}

.botao-enviar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: var(--blue);
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.botao-enviar:hover {
  background: var(--blue-deep);
}

.botao-enviar:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

</style>