<template>
    <div class="carrinho-page">
        <header class="carrinho-header">
            <div class="logo">Trade<span>Hub</span></div>

            <div class="search-bar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" placeholder="Buscar produtos..." />
            </div>

            <div class="header-actions">
                <a href="#" class="cart-link" aria-label="Carrinho">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </a>
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

            <article v-for="item in carrinho" :key="item.id" class="cart-item">
                <img :src="item.imagem" :alt="item.titulo">
                <div>
                    <h1>{{ item.titulo }}</h1>
                    <div class="quantity-controls">
                        <button type="button" @click="diminuirQuantidade(item.id)" :aria-label="`Diminuir quantidade de ${item.titulo}`">
                            −
                        </button>
                        <span>{{ item.quantidade }}</span>
                        <button type="button" @click="aumentarQuantidade(item.id)" :aria-label="`Aumentar quantidade de ${item.titulo}`">
                            +
                        </button>
                    </div>
                    <strong>R$ {{ (item.preco * item.quantidade).toFixed(2).replace('.', ',') }}</strong>
                </div>
                <button type="button" class="remove-button" @click="removerDoCarrinho(item.id)">
                    Remover
                </button>
            </article>
        </main>
    </div>
</template>

<script setup>
import {
    aumentarQuantidade,
    carrinho,
    diminuirQuantidade,
    limparCarrinho,
    removerDoCarrinho,
    totalCarrinho,
    finalizarCompra
} from '@/data/carrinho'

</script>

<style scoped>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
}

.logo {
    font-size: 18px;
    font-weight: 800;
    white-space: nowrap;
    letter-spacing: -0.02em;
}

.logo span {
    color: var(--blue);
}

.search-bar {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f5f5f8;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 8px 14px;
    max-width: 420px;
}

.search-bar svg {
    flex-shrink: 0;
    color: var(--muted);
}

.search-bar input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 13px;
    width: 100%;
    color: var(--text);
}

.search-bar input::placeholder {
    color: var(--muted);
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-shrink: 0;
}

.cart-link {
    color: var(--muted);
    display: flex;
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
</style>