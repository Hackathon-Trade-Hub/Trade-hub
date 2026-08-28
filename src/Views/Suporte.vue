<template>
  <section class="suporte">
    <div class="suporte-card">
      <span class="etiqueta">SUPORTE TRADEHUB</span>
      <h1>Como podemos ajudar?</h1>
      <p>
        Encontrou algum problema ou quer falar com a equipe? Envie uma mensagem e retornaremos assim que
        possível.
      </p>

      <form class="formulario" @submit.prevent="enviarMensagem">
        <label for="nome">Seu nome</label>
        <input id="nome" v-model.trim="nome" required autocomplete="name" />

        <label for="email">Seu e-mail</label>
        <input id="email" v-model.trim="email" type="email" required autocomplete="email" />

        <label for="mensagem">Mensagem</label>
        <textarea id="mensagem" v-model.trim="mensagem" rows="5" required></textarea>

        <button type="submit">Enviar mensagem</button>
      </form>

      <p v-if="enviado" class="confirmacao" role="status">
        Mensagem registrada. Obrigado por entrar em contato!
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'SiteSupport' })

const nome = ref('')
const email = ref('')
const mensagem = ref('')
const enviado = ref(false)

function enviarMensagem() {
  enviado.value = true
  mensagem.value = ''
}
</script>

<style scoped>
.suporte {
  min-height: 100%;
  padding: 56px 20px 80px;
  background: linear-gradient(180deg, #edf4ff, #fff 420px);
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.suporte-card {
  width: min(100%, 620px);
  margin: 0 auto;
  padding: 38px;
  background: #fff;
  border: 1px solid #d7e4fa;
  border-radius: 22px;
  box-shadow: 0 16px 40px rgba(21, 74, 156, 0.12);
}

.etiqueta {
  color: #185aee;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

h1 {
  margin: 12px 0;
  color: #10233e;
  font-size: clamp(1.9rem, 4vw, 2.7rem);
}

.suporte-card > p {
  color: #5c6b80;
  line-height: 1.6;
}

.formulario {
  display: grid;
  gap: 9px;
  margin-top: 26px;
}

label {
  color: #233955;
  font-size: 0.92rem;
  font-weight: 700;
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 13px;
  border: 1px solid #c7d7ef;
  border-radius: 10px;
  color: #1b2c43;
  font: inherit;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: 2px solid rgba(24, 90, 238, 0.2);
  border-color: #185aee;
}

button {
  margin-top: 12px;
  padding: 13px 20px;
  border: 0;
  border-radius: 10px;
  color: #fff;
  background: #185aee;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  background: #0f49c9;
}

.confirmacao {
  margin-bottom: 0;
  color: #197344 !important;
  font-weight: 700;
}

@media (max-width: 520px) {
  .suporte-card {
    padding: 26px 20px;
  }
}
</style>
