<template>
    <div class="carrinho-page">
        <header class="carrinho-header">
            <div class="header-top">
                <div class="logo">
                    <RouterLink to="/">Trade<span>Hub</span></RouterLink>
                </div>

                <div class="pesquisa">
                    <img src="../../public/images/lupa.png" alt="lupa">
                    <input type="text" placeholder="Digite...">
                </div>

                <div class="icone-carrinho">
                    <RouterLink to="/carrinho" class="img-carrinho">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50">
                        <path d="M0 0h50v50H0z" fill="none" />
                        <circle cx="44" cy="42" r="4" fill="currentColor" />
                        <circle cx="15" cy="42" r="4" fill="currentColor" />
                        <path fill="currentColor"
                            d="M47 33H15.771l.667-1.082c.286-.464.37-1.025.233-1.553l-.651-2.506l28.983-1.506C46.102 26.297 47 25.35 47 24.25V11c0-1.1-.9-2-2-2H11.119l-.391-1.503A2 2 0 0 0 8.792 6H2a2 2 0 0 0 0 4h5.246l5.34 20.545l-2.1 3.405a2 2 0 0 0-.043 2.024A2 2 0 0 0 12.188 37H47a2 2 0 0 0 0-4" />
                    </svg>
                </RouterLink>
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

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

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

.pesquisa {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 20vw;
    flex: 1;
}

.pesquisa input {
    width: 35vw;
    height: 2.5vw;
    padding-left: 2.4vw;
    border: 1px solid black;
    border-radius: 16px;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
}

.pesquisa img {
    position: absolute;
    left: 0.8vw;
    width: 1.3vw;
    height: 1.3vw;
}

.icone-carrinho {
    margin-left: auto;
    display: flex;
    align-items: center;
}

.img-carrinho {
    color: black;
    font-size: 1.8rem;
    display: flex;
}

.img-carrinho:hover {
    color: #185AEE;
    transition: 0.3s;
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