<template>
    <div class="carrinho-page">
        <header class="carrinho-header">
            <div class="header-top">
                <div class="logo">
                    <RouterLink to="/">Trade<span>Hub</span></RouterLink>
                </div>
            </div>
        </header>

        <main v-if="carrinho.length === 0" class="cart-empty">
            <div class="cart-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </div>
            <div class="cart-empty-text">
                <p>Seu carrinho ainda está vazio...</p>
                <p>Volte ao início e escolha seus produtos.</p>
            </div>
        </main>

        <main v-else class="cart-items">
            <router-link to="/" class="voltar">← Voltar</router-link>

           

            <article v-for="item in carrinho" :key="item.id" class="cart-item">
                <img :src="item.imagem" :alt="item.titulo">
                <div class="cart-item-info">
                    <span class="item-status">{{ item.status }}</span>
                    <h1>{{ item.titulo }}</h1>
                    <div class="quantity-controls">
                        <button type="button" @click="diminuirQuantidade(item.id)"
                            :aria-label="`Diminuir quantidade de ${item.titulo}`">
                            −
                        </button>
                        <span>{{ item.quantidade }}</span>
                        <button type="button" @click="aumentarQuantidade(item.id)"
                            :aria-label="`Aumentar quantidade de ${item.titulo}`">
                            +
                        </button>
                    </div>
                    <strong>R$ {{ (item.preco * item.quantidade).toFixed(2).replace('.', ',') }}</strong>
                </div>
                <div class="item-actions">
                    <RouterLink
                        v-if="permiteProposta(item)"
                        :to="{ name: 'propostaTroca', params: { id: item.id } }"
                        class="proposal-button"
                    >
                        Fazer proposta de troca
                    </RouterLink>
                    <button type="button" class="remove-button" @click="removerDoCarrinho(item.id)">
                        Remover
                    </button>
                </div>
            </article>
             <div class="cart-header-actions">
                <strong>Total: R$ {{ totalCarrinho.toFixed(2).replace('.', ',') }}</strong>
                <div class="cart-actions">
                    <button type="button" class="clear-button" @click="limparCarrinho">
                        Limpar carrinho
                    </button>
                    <button type="button" class="checkout-button" @click="finalizarCompra">
                        Finalizar compra
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
defineOptions({ name: 'PaginaCarrinho' })
import {
    aumentarQuantidade,
    carrinho,
    diminuirQuantidade,
    limparCarrinho,
    removerDoCarrinho,
    totalCarrinho,
    finalizarCompra
} from '@/data/carrinho'

function permiteProposta(item) {
    return item.status === 'Troca' || item.status === 'Troca/Venda'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

.carrinho-page {
    --blue: #2952e3;
    --blue-dark: #1e3fc0;
    --text: #1a1a2e;
    --muted: #8a8a9a;
    --border: #ececf2;
    --bg: #ffffff;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.carrinho-header {
    font-family: sans-serif;
    border-bottom: 1px solid var(--border);
}

.carrinho-header * {
    text-decoration: none;
}

.header-top {
    display: flex;
    margin: 1.75vw 1.75vw;
    align-items: center;
    gap: 0;
}

.logo {
    font-size: 2rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}

.logo a {
    color: black;
}

.logo a span {
    color: #185AEE;
}

.voltar {
    display: inline-block;
    margin-bottom: 8px;
    color: #075ed9;
    font-weight: 600;
    text-decoration: none;
    font-size: 1,15rem;
}

.voltar:hover {
    text-decoration: underline;
}

.cart-empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 24px;
    gap: 18px;
}

.cart-empty-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
}

.cart-empty-text p {
    font-size: 13px;
    line-height: 1.6;
    color: var(--muted);
    max-width: 260px;
}

.cart-empty-text p:first-child {
    color: var(--text);
    font-weight: 500;
}

.cart-items {
    display: grid;
    gap: 16px;
    padding: 32px 24px;
}

.cart-header-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.cart-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 16px;
    border: 1px solid var(--border);
    border-radius: 12px;
}

.cart-item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

.cart-item h1 {
    margin: 0 0 8px;
    font-size: 18px;
}

.cart-item-info {
    flex: 1;
    min-width: 0;
}

.item-status {
    display: inline-block;
    margin-bottom: 8px;
    padding: 4px 9px;
    color: var(--blue-dark);
    background: #e9efff;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
}

.item-actions {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 9px;
    margin-left: auto;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.quantity-controls button,
.remove-button,
.clear-button {
    padding: 6px 12px;
    color: var(--text);
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
}

.checkout-button {
    padding: 8px 16px;
    color: #ffffff;
    background: var(--blue);
    border: 1px solid var(--blue);
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
}

.proposal-button {
    padding: 9px 14px;
    color: #ffffff;
    background: var(--blue);
    border: 1px solid var(--blue);
    border-radius: 7px;
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.2s, transform 0.2s;
}

.proposal-button:hover {
    background: var(--blue-dark);
    transform: translateY(-1px);
}

.remove-button,
.clear-button {
    color: #c62828;
    border-color: #f0b8b8;
    transition: background-color 0.5s, color 0.5s, border-color 0.5s;
}

.quantity-controls button:hover,
.quantity-controls button:hover {
    background: #f5f5f8;
}

.remove-button:hover,
.clear-button:hover {
    color: #ffffff;
    background: #c62828;
    border-color: #c62828;
}

.checkout-button:hover {
    background: var(--blue-dark);
    border-color: var(--blue-dark);
}

@media (max-width: 720px) {
    .cart-header-actions,
    .cart-item {
        align-items: stretch;
        flex-direction: column;
    }

    .cart-actions,
    .item-actions {
        width: 100%;
    }

    .cart-actions > *,
    .item-actions > * {
        flex: 1;
    }

    .cart-item img {
        width: 100%;
        height: 180px;
    }
}
</style>
