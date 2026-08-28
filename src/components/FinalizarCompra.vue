<template>
    <div class="tela-pagamento">
        <div class="pagamento-card">
            <button
                type="button"
                class="fechar"
                @click="$emit('fechar')"
            >
                ×
            </button>

            <h1>Finalizar compra</h1>

            <p class="descricao">
                Escaneie o QR Code abaixo para realizar o pagamento.
            </p>

            <div class="qrcode-container">
                <img
                    src="/images/qrcode.png"
                    alt="QR Code para pagamento"
                    class="qrcode"
                >
            </div>

            <div class="valor">
                <span>Total da compra</span>

                <strong>
                    R$ {{ total.toFixed(2).replace('.', ',') }}
                </strong>
            </div>

            <button
                type="button"
                class="pagamento-button"
                @click="$emit('pagamentoRealizado')"
            >
                Pagamento realizado
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    total: {
        type: Number,
        required: true
    }
})

defineEmits([
    'fechar',
    'pagamentoRealizado'
])
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
    max-width: 430px;
    padding: 35px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    text-align: center;
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
}

.descricao {
    margin: 0 auto 25px;
    color: #8a8a9a;
    font-size: 14px;
    line-height: 1.5;
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
    flex-direction: column;
    gap: 5px;
    padding: 15px;
    margin-bottom: 20px;
    background: #f5f7ff;
    border-radius: 10px;
}

.valor span {
    color: #8a8a9a;
    font-size: 13px;
}

.valor strong {
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
</style>