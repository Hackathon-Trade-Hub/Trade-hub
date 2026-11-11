<template>
    <div class="tela-pagamento">
        <form class="pagamento-card" @submit.prevent="confirmarPagamento">
            <button
                type="button"
                class="fechar"
                @click="$emit('fechar')"
                aria-label="Fechar finalização da compra"
            >
                ×
            </button>

            <h1>Finalizar compra</h1>

            <p class="descricao">Escolha como seu pedido vai chegar e informe o endereço de entrega.</p>

            <section class="entrega">
                <h2>1. Escolha a entrega</h2>
                <label
                    v-for="opcao in transportadorasDisponiveis"
                    :key="opcao.id"
                    class="opcao-entrega"
                    :class="{ selecionada: transportadoraId === opcao.id }"
                >
                    <input v-model="transportadoraId" type="radio" :value="opcao.id" required>
                    <span class="opcao-detalhes">
                        <strong>{{ opcao.nome }}</strong>
                        <small>{{ opcao.descricao }}</small>
                        <small>Chega em {{ opcao.prazoMinimoDias }} a {{ opcao.prazoMaximoDias }} dias</small>
                    </span>
                    <strong class="preco-frete">{{ formatarMoeda(opcao.valorFrete) }}</strong>
                </label>
            </section>

            <section class="endereco-entrega">
                <h2>2. Endereço de entrega</h2>
                <div class="campos-endereco">
                    <label>
                        CEP
                        <input v-model.trim="endereco.cep" autocomplete="postal-code" placeholder="00000-000" required>
                    </label>
                    <label class="campo-largo">
                        Rua / avenida
                        <input v-model.trim="endereco.rua" autocomplete="address-line1" required>
                    </label>
                    <label>
                        Número
                        <input v-model.trim="endereco.numero" autocomplete="address-line2" required>
                    </label>
                    <label>
                        Complemento <span>(opcional)</span>
                        <input v-model.trim="endereco.complemento" autocomplete="address-line3">
                    </label>
                    <label>
                        Bairro
                        <input v-model.trim="endereco.bairro" required>
                    </label>
                    <label>
                        Cidade
                        <input v-model.trim="endereco.cidade" autocomplete="address-level2" required>
                    </label>
                    <label>
                        Estado
                        <input v-model.trim="endereco.estado" maxlength="2" autocomplete="address-level1" required>
                    </label>
                </div>
            </section>

            <div class="qrcode-container">
                <img
                    src="/images/qrcode.png"
                    alt="QR Code para pagamento"
                    class="qrcode"
                >
            </div>

            <div class="valor">
                <span>Produtos <strong>{{ formatarMoeda(total) }}</strong></span>
                <span>Frete <strong>{{ formatarMoeda(freteSelecionado) }}</strong></span>
                <span class="total-label">Total da compra</span>

                <strong class="total-compra">{{ formatarMoeda(total + freteSelecionado) }}</strong>
            </div>

            <button
                type="submit"
                class="pagamento-button"
            >
                Confirmar pagamento e pedido
            </button>
        </form>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { transportadorasDisponiveis } from '@/data/pedidos.js'

defineProps({
    total: {
        type: Number,
        required: true
    },
    erro: {
        type: String,
        default: '',
    }
})

const emit = defineEmits([
    'fechar',
    'pagamentoRealizado'
])

const transportadoraId = ref(transportadorasDisponiveis[0].id)
const endereco = reactive({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
})
const freteSelecionado = computed(
    () =>
        transportadorasDisponiveis.find((opcao) => opcao.id === transportadoraId.value)
            ?.valorFrete ?? 0,
)

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}

function confirmarPagamento() {
    const transportadora = transportadorasDisponiveis.find(
        (opcao) => opcao.id === transportadoraId.value,
    )

    if (!transportadora) return

    emit('pagamentoRealizado', {
        transportadoraId: transportadora.id,
        endereco: { ...endereco },
    })
}
</script>

<style scoped>
.tela-pagamento {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.65);
}

.pagamento-card {
    position: relative;
    width: 100%;
    max-width: 540px;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    padding: 35px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    text-align: left;
    box-sizing: border-box;
}

.fechar {
    position: absolute;
    top: 12px;
    right: 15px;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: #666;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
}

.pagamento-card h1 {
    margin: 0 0 10px;
    font-size: 26px;
    color: #1a1a2e;
    text-align: center;
}

.descricao {
    margin: 0 auto 22px;
    color: #8a8a9a;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
}

.erro-pagamento {
    padding: 10px 12px;
    margin: 0 0 14px;
    color: #a32121;
    background: #fff0f0;
    border-radius: 7px;
    font-size: 13px;
}

.entrega,
.endereco-entrega {
    margin-bottom: 20px;
}

.entrega h2,
.endereco-entrega h2 {
    margin: 0 0 11px;
    color: #1a1a2e;
    font-size: 16px;
}

.opcao-entrega {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 12px;
    margin-bottom: 8px;
    border: 1px solid #e1e6f0;
    border-radius: 9px;
    cursor: pointer;
}

.opcao-entrega.selecionada {
    border-color: #2952e3;
    background: #f5f7ff;
}

.opcao-detalhes {
    display: grid;
    flex: 1;
    gap: 3px;
    color: #1a1a2e;
}

.opcao-detalhes small,
.campos-endereco label span {
    color: #777f91;
    font-size: 12px;
    font-weight: 400;
}

.preco-frete {
    color: #1a1a2e;
    white-space: nowrap;
}

.campos-endereco {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
}

.campos-endereco label {
    display: grid;
    gap: 5px;
    color: #4b5568;
    font-size: 12px;
    font-weight: 650;
}

.campos-endereco input {
    width: 100%;
    min-width: 0;
    padding: 9px 10px;
    border: 1px solid #dce1ea;
    border-radius: 7px;
    box-sizing: border-box;
    font: inherit;
}

.campos-endereco input:focus {
    border-color: #2952e3;
    outline: 2px solid rgba(41, 82, 227, 0.14);
}

.campo-largo {
    grid-column: 1 / -1;
}

.qrcode-container {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
}

.qrcode {
    width: 230px;
    height: 230px;
    object-fit: contain;
}

.valor {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 7px 12px;
    padding: 15px;
    margin-bottom: 20px;
    background: #f5f7ff;
    border-radius: 10px;
}

.valor span {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #8a8a9a;
    font-size: 13px;
}

.valor span strong {
    color: #4b5568;
}

.valor .total-label {
    width: auto;
    margin-right: auto;
    color: #1a1a2e;
    font-weight: 700;
}

.valor .total-compra {
    color: #1a1a2e;
    font-size: 22px;
}

.pagamento-button {
    width: 100%;
    padding: 12px 18px;
    color: #ffffff;
    background: #2952e3;
    border: 1px solid #2952e3;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
}

.pagamento-button:hover {
    background: #1e3fc0;
    border-color: #1e3fc0;
}

@media (max-width: 520px) {
    .pagamento-card {
        padding: 30px 20px 22px;
    }

    .campos-endereco {
        grid-template-columns: 1fr;
    }

    .campos-endereco .campo-largo {
        grid-column: auto;
    }
}
</style>