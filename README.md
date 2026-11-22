https://trade-hub-eosin-omega.vercel.app/

# TradeHub

**TEMA:** Troca e Venda

O objetivo do nosso site é atender um público que busca produtos dos mais variados tipos, ele permite o usuário comprar produtos, trocar produtos e vender produtos, de maneira segura, em um só lugar.

**Funcionalidades planejadas:** Troca, venda e compra de produtos; cadastro e login de usuário; cadastro de produtos novos; Perfil do usuário; edição de perfil; barra de pesquisa de produtos; categorias de produtos; carrinho que permite finalizar a compra.

**Funcionalidades implementadas:** Troca, venda e compra de produtos; cadastro e login de usuário; cadastro de produtos novos; Perfil do usuário; barra de pesquisa de produtos; categorias de produtos; carrinho que permite finalizar a compra.

**Dificuldades enfrentadas:** desenvolvimento das funcionalidades, as rotas, uso das branches, merges.

O grupo inicialmente, organizou e dividiu as tarefas com base no que cada um fez no figma, após o desenvolvimento dessas telas e suas funcionalidades, durante as aulas, discutiamos o que cada um deveria fazer, como adicionar uma tela ou funcionalidade nova que antes não tinha sido pensada.

**Nota dada pelo grupo:** 8,5.

O grupo acredita que esta nota seja justa pois, apesar de faltar algumas coisas, como o sistema de trocas, todo o resto está funcional. Sendo assim pelo menos 75% do site está pronto.

---

## Instruções para instalar e executar a aplicação e a API

### Pré-requisitos

1. Ter o Node.js instalado no computador.
2. Estar na pasta raiz do projeto (onde fica o arquivo `package.json`).

### Front-end

1. Abra o terminal (pode ser o prompt de comando, Git Bash ou o terminal integrado do VS Code).
2. Navegue até a pasta do projeto (use o comando `cd caminho/da/pasta`).
3. Instale as dependências com `npm install` (obrigatório se for a primeira vez que roda o projeto).
4. Execute o comando de desenvolvimento:

npm run dev

### Back-end (API com JSON Server)

1. Abra o terminal na pasta do projeto.
2. Instale as dependências (se ainda não instalou): `npm install`.
3. Execute a API:

npm run api

A API sobe em `http://localhost:3000` e usa o arquivo `db.json` como banco de dados. Versão do JSON Server: `^1.0.0-beta.15` (conforme o `package.json`).

O front-end e a API precisam estar rodando ao mesmo tempo, cada um em um terminal.

---

## Entidades, endpoints e relacionamentos

### Entidades

Cada entidade é uma coleção no `db.json`.

| Coleção | Finalidade | Campos |
|---|---|---|
| `usuarios` | Contas de quem compra, vende e troca produtos. | `id`, `nome`, `email`, `telefone`, `foto`, `senhaHash` |
| `produtos` | Anúncios de troca e venda. | `id`, `titulo`, `descricao`, `imagem`, `preco`, `categoria`, `status` (`Venda`, `Troca` ou `Troca/Venda`), `vendedorId`, `vendedorNome`, `vendedorFoto` |
| `carrinho` | Itens reservados para compra imediata pelo usuário. | `id` (texto), `usuarioId` (texto), `produtoId` (texto), `quantidade` (número) |
| `favoritos` | Produtos que o usuário marcou como favoritos. | `id`, `usuarioId`, `produtoId` [proposta: confirmar com o responsável] |
| `reviews` | Avaliações feitas pelos usuários. | [preencher pelo responsável] |
| `transporte` | Informações de entrega dos produtos. | [preencher pelo responsável] |

As regras dos campos (campo obrigatório, quantidade maior que zero etc.) são verificadas pela aplicação. O JSON Server não faz essas validações.

### Endpoints

O JSON Server cria os endpoints a partir de cada coleção. Abaixo estão os usados pelo front-end.

**usuarios**

| Método | Endpoint | Uso |
|---|---|---|
| GET | `/usuarios` | Listar usuários cadastrados. |
| GET | `/usuarios?email=:email&senhaHash=:hash` | Login: busca o usuário pelas credenciais. |
| POST | `/usuarios` | Cadastrar usuário. |
| PATCH | `/usuarios/:id` | Editar o perfil. |

**produtos**

| Método | Endpoint | Uso |
|---|---|---|
| GET | `/produtos` | Listar produtos. |
| POST | `/produtos` | Cadastrar produto. |
| PATCH | `/produtos/:id` | Editar produto. |
| DELETE | `/produtos/:id` | Excluir produto (somente o vendedor). |

**carrinho**

| Método | Endpoint | Uso |
|---|---|---|
| GET | `/carrinho?usuarioId=:id` | Listar os itens do carrinho do usuário atual. |
| GET | `/carrinho/:id` | Consultar um item específico. |
| POST | `/carrinho` | Adicionar produto ao carrinho. |
| PUT | `/carrinho/:id` | Alterar a quantidade do item. |
| DELETE | `/carrinho/:id` | Remover item do carrinho. |

**favoritos, reviews e transporte:** [preencher pelos responsáveis de cada CRUD].

### Relacionamentos

O JSON Server não aplica integridade referencial. Os vínculos abaixo são mantidos pela aplicação.

| Relação | Tipo | Descrição |
|---|---|---|
| `produtos.vendedorId` → `usuarios.id` | N:1 | Um usuário pode anunciar vários produtos. |
| `carrinho.usuarioId` → `usuarios.id` | N:1 | Cada usuário tem o próprio carrinho, filtrado por `usuarioId`. |
| `carrinho.produtoId` → `produtos.id` | N:1 | O item guarda só o `produtoId`; título, imagem e preço vêm da coleção `produtos`. |
| `favoritos.usuarioId` → `usuarios.id` e `favoritos.produtoId` → `produtos.id` | N:N | Um usuário favorita vários produtos e um produto pode ser favoritado por vários usuários [proposta]. |

Na prática, `carrinho` liga usuários e produtos (relação N:N com o campo `quantidade`). Itens cujo produto não existe mais não são exibidos no carrinho.

---

## Identificação do CRUD desenvolvido por cada integrante

| Entidade | Integrante responsável |
|---|---|
| Produtos | Pedro |
| Carrinho | Enzo |
| Favoritos | Gustavo |
| Usuário | Rian |
| Reviews | Wesley |
| Transporte | Felipe |
