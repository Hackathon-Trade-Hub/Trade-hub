<template>
    <div class="sino">
        <button class="botao-sino" @click="aberto = !aberto">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22m7-5v-6a7 7 0 0 0-5.5-6.83V3a1.5 1.5 0 0 0-3 0v1.17A7 7 0 0 0 5 11v6l-1.7 1.7a1 1 0 0 0 .7 1.3h16a1 1 0 0 0 .7-1.3z" />
            </svg>
            <span v-if="naoLidas" class="contador">{{ naoLidas }}</span>
        </button>

        <div v-if="aberto" class="painel">
            <div class="topo-painel">
                <strong>Notificações</strong>
                <button class="fechar" @click="aberto = false">×</button>
            </div>

            <div class="cartao">
                <span class="etiqueta recebida">Proposta aceita</span>
                <p><b>Rian Davi</b> aceitou sua proposta de troca pelo <b>Relógio Casio</b>!</p>
                <button v-if="!propostaVista" class="aceitar" @click="propostaVista = true">Ver detalhes</button>
                <p v-else class="aviso ok">Combine a entrega com o Rian pelo chat.</p>
            </div>

            <div class="cartao">
                <span class="etiqueta enviada">Nova mensagem</span>
                <p><b>Felipe Castro</b> respondeu no chat da sua proposta pelo <b>Fone JBL Tune 510</b>.</p>
                <button v-if="!chatVisto" class="aceitar" @click="chatVisto = true">Abrir chat</button>
                <p v-else class="aviso">"Combinado, te mando o endereço!"</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const aberto = ref(false)
const propostaVista = ref(false)
const chatVisto = ref(false)

const naoLidas = computed(() => (propostaVista.value ? 0 : 1) + (chatVisto.value ? 0 : 1))
</script>

<style scoped>
.sino { position: relative; }

.botao-sino {
    position: relative;
    font-size: 1.6rem;
    color: #185AEE;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
}

.contador {
    position: absolute;
    top: -4px;
    right: -4px;
    background: #e63946;
    color: white;
    font-size: 0.7rem;
    border-radius: 50%;
    padding: 1px 5px;
}

.painel {
    position: absolute;
    top: 130%;
    right: 0;
    width: 320px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    padding: 12px;
    z-index: 1000;
}

.topo-painel {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.fechar {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
}

.cartao {
    background: #f5f7fb;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 0.88rem;
}

.cartao p { margin: 6px 0; }

.etiqueta {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 20px;
    color: white;
}

.recebida { background: #185AEE; }
.enviada { background: #363636; }

.aceitar {
    padding: 7px 12px;
    border-radius: 8px;
    background: #185AEE;
    color: white;
    border: none;
    font: inherit;
    font-size: 0.8rem;
    cursor: pointer;
}

.aviso {
    background: #eee;
    border-radius: 8px;
    padding: 6px;
    font-size: 0.8rem;
}

.ok {
    background: #e3f2e6;
    color: #1d7a3c;
}
</style>
