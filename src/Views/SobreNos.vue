<template>
    <section class="sobre">
        <div class="sobre-hero">
            <span class="badge">Hackathon 2026 · TradeHub</span>
            <h1>Sobre <span>Nós</span></h1>

            <p>
                Somos uma equipe participante do Hackathon 2026, formada por alunos da turma 2INFO3, que se uniu com
                o objetivo de desenvolver uma plataforma de compra, venda e troca de produtos de forma mais prática e
                mais segura.
            </p>
            <p>
                A ideia surgiu a partir de uma situação cada vez mais comum: muitas pessoas possuem produtos que não
                utilizam mais e gostariam de vendê-los ou trocá-los, mas acabam deixando de fazer isso por medo de
                golpes, produtos falsos ou de não receber aquilo que foi combinado.
            </p>
            <p>
                Pensando nisso, criamos este site com o propósito de tornar essas negociações mais confiáveis,
                oferecendo um espaço onde os usuários possam anunciar seus produtos, encontrar itens de seu interesse
                e realizar negociações com mais segurança e tranquilidade.
            </p>
            <p>
                Além de facilitar a compra e a venda, queremos incentivar a troca e o reaproveitamento de produtos,
                dando uma nova utilidade para aquilo que já não é mais utilizado por uma pessoa, mas pode ser
                exatamente o que outra está procurando.
            </p>
        </div>

        <div class="membros">
            <div class="membros-header">
                <span class="badge">Nossa equipe</span>
                <h2>Membros</h2>
            </div>

            <ul>
                <li v-for="membro in membros" :key="membro.nome">
                    <div class="foto-wrap">
                        <img :src="membro.foto" :alt="`Foto de ${membro.nome} ${membro.sobrenome}`">
                    </div>
                    <h3><span>{{ membro.nome }}</span>{{ membro.sobrenome }}</h3>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
defineOptions({ name: 'SobreNos' })

const membros = [
    { nome: 'Enzo', sobrenome: 'Bernardes', foto: '/images/Enzo.jpg' },
    { nome: 'Felipe', sobrenome: 'de Castro', foto: '/images/Felipe.jpeg' },
    { nome: 'Gustavo', sobrenome: 'Bittencourt', foto: '/images/Gustavo.jpg' },
    { nome: 'Pedro', sobrenome: 'Schetz', foto: '/images/Pedro.jpeg' },
    { nome: 'Rian', sobrenome: 'Oliveira', foto: '/images/Rian.jpg' },
    { nome: 'Wesley', sobrenome: 'Madeira', foto: '/images/Wesley.jpg' },
]
</script>

<style scoped>
.sobre {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 72px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 56px 24px 88px;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.badge {
    display: inline-block;
    background: rgba(24, 90, 238, 0.1);
    color: #185aee;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.02em;
    padding: 6px 16px;
    border-radius: 999px;
}

.sobre-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    max-width: 720px;
    text-align: center;
}

.sobre-hero h1 {
    font-size: clamp(2rem, 1.4vw + 1.6rem, 3rem);
    color: #0d1b2a;
    margin: 8px 0 4px;
}

.sobre-hero h1 span {
    color: #185aee;
}

.sobre-hero p {
    color: #4b5563;
    font-size: 1.05rem;
    line-height: 1.75;
    text-align: left;
    margin: 0;
}

.membros {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}

.membros-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
}

.membros-header h2 {
    margin: 0;
    font-size: clamp(1.5rem, 1vw + 1.2rem, 2rem);
    color: #0d1b2a;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
}

li {
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(13, 27, 42, 0.08);
}

.foto-wrap {
    width: 100%;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: #e9eef7;
}

.foto-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
}

h3 {
    margin: 0;
    padding: 16px 12px 20px;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: #0d1b2a;
    line-height: 1.3;
}

h3 span {
    display: block;
    color: #185aee;
    font-size: 1.2rem;
    font-weight: 700;
}

</style>