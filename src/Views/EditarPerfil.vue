<template>
  <div class="pagina">
    <div class="perfil-topo">
      <div class="avatar">
        <img src="#" alt="Sem Foto">
      </div>

      <div class="usuario">
        <h2>Felipe Castro</h2>
        <p>firecast.felipe@gmail.com</p>
      </div>

      <button class="btn-editar">Editar</button>
    </div>

    <div class="formulario">
      <div class="campo">
        <label>Nome Completo</label>
        <input type="text" value="Felipe de Castro da Silva" />
      </div>

      <div class="campo">
        <label>Apellido</label>
        <input type="text" value="Felipe Castro" />
      </div>

      <div class="campo">
        <label>Email</label>
        <input type="email" value="firecast.felipe@gmail.com" />
      </div>

      <div class="campo">
        <label>CPF</label>
        <input type="text" placeholder="XXX.XXX.XXX-XX" />
      </div>

      <div class="campo genero">
        <label>Gênero</label>
        <select>
          <option>Masculino</option>
          <option>Feminino</option>
          <option>Outro</option>
        </select>
      </div>
    </div>

    <div class="acoes">
      <button class="btn-salvar">Salvar</button>
    </div>
  </div>
</template>

<script setup></script>

<style scooped>
* {
  box-sizing: border-box;
}

.pagina {
  width: 100%;
  min-height: 100vh;
  padding: 1vw 5vw;
  background: #fff;
  font-family: Arial, sans-serif;
  color: #222;
}

.perfil-topo {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 2vw;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.usuario {
  flex: 1;
}

.usuario h2 {
  margin: 0 0 4px;
  font-size: 2.5rem;
  font-weight: 400;
}

.usuario p {
  margin: 0;
  font-size: 1rem;
  color: #777;
}

button {
  border: 0;
  cursor: pointer;
  font-family: inherit;
}

.btn-editar {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background: #008cff;
  color: #fff;
  font-size: 1.2rem;
}

.formulario {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 22px;
  row-gap: 14px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.campo label {
  font-size: 1.5rem;
  margin-left: 15px;
  color: #222;
}

.campo input,
.campo select {
  width: 100%;
  height: 3vw;
  padding: 0 1vw;
  border: 0;
  outline: none;
  border-radius: 20px;
  background: #e9e9e9;
  color: #777;
  font-size: 1rem;
}

.campo input::placeholder {
  color: #999;
}

.genero {
  grid-column: 1;
}

.acoes {
  display: flex;
  justify-content: center;
  margin-top: 26px;
}

.btn-salvar {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background: #008cff;
  color: #fff;
  font-size: 1.2rem;
}
</style>
