<template>
    <section class="sobre">
        <h1>Sobre Nós</h1>
        <p>Somos uma equipe participante do Hackathon 2026, formada por alunos da turma 2INFO3, que se uniu com o
            objetivo de desenvolver uma plataforma de compra, venda e troca de produtos de forma mais prática e mais segura. <br><br>
            A ideia surgiu a partir de uma situação cada vez mais comum: muitas pessoas possuem produtos que não
            utilizam mais e gostariam de vendê-los ou trocá-los, mas acabam deixando de fazer isso por medo de golpes,
            produtos falsos ou de não receber aquilo que foi combinado. <br><br>
            Pensando nisso, criamos este site com o propósito de tornar essas negociações mais confiáveis, oferecendo um
            espaço onde os usuários possam anunciar seus produtos, encontrar itens de seu interesse e realizar
            negociações com mais segurança e tranquilidade. <br><br>
            Além de facilitar a compra e a venda, queremos incentivar a troca e o reaproveitamento de produtos, dando
            uma nova utilidade para aquilo que já não é mais utilizado por uma pessoa, mas pode ser exatamente o que
            outra está procurando.</p>
        <div class="membros">
            <h1>Membros</h1>
            <ul>
                <li>
                    <h2><span>Enzo</span><br>Bernardes</h2>
                    <img src="/images/Enzo.jpg" alt="Enzo">
                </li>
                <li>
                    <h2><span>Felipe</span><br>de Castro</h2>
                    <img src="/images/Felipe.jpeg" alt="Felipe">
                </li>
                <li>
                    <h2><span>Gustavo</span><br>Bittencourt</h2>
                    <img src="/images/Gustavo.jpg" alt="Gustavo">
                </li>
                <li>
                    <h2><span>Pedro</span><br>Schetz</h2>
                    <img src="/images/Pedro.jpeg" alt="Pedro">
                </li>
                <li>
                    <h2><span>Rian</span><br>Oliveira</h2>
                    <img src="/images/Rian.jpg" alt="Rian">
                </li>
                <li>
                    <h2><span>Wesley</span><br>Madeira</h2>
                    <img src="/images/Wesley.jpg" alt="Wesley">
                </li>
            </ul>
        </div>
    </section>
</template>
<script setup>
defineOptions({ name: 'SobreNos' })
</script>
<style scoped>
.sobre {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 4vw;
    color: #185AEE;
}

p {
    color: #185AEE;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.8vw;
    font-weight: 600;
    text-align: center;
    max-width: 54vw;
}

.membros {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 4vw 0;
}

ul {
    list-style: none;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1vw 7vw;
    max-width: 80vw;
    background: #185AEE;
    padding: 4vw 0;
    border-radius: 30px;
}

li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h2 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    text-align: center;
    font-size: 1.5vw;
}

h2 span {
    font-size: 2.5vw;
    color: white;
}

img {
    width: 15vw;
    height: 18vw;
    object-fit: cover;
    border-radius: 10px;
    border: 4px solid white;
}
</style>
