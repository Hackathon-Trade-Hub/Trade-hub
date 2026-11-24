https://trade-hub-eosin-omega.vercel.app/

TEMA: Troca e Venda
O objetivo do nosso site é atender um público que busca produtos dos mais variados tipos, ele permite o usuário comprar produtos, trocar produtos e vender produtos, de maneira segura, em um só lugar.

Funcionalidades planejadas: Troca, venda e compra de produtos; cadastro e login de usuário; cadastro de produtos novos; Perfil do usuário; edição de perfil; barra de pesquisa de produtos; categorias de produtos; carrinho que permite finalizar a compra.

Funcionalidades implementadas: Troca, venda e compra de produtos; cadastro e login de usuário; cadastro de produtos novos; Perfil do usuário; barra de pesquisa de produtos; categorias de produtos; carrinho que permite finalizar a compra.

Dificuldades enfrentadas: desenvolvimento das funcionalidades, as rotas, uso das branches, merges,

O grupo inicialmente, organizou e dividiu as tarefas com base no que cada um fez no figma, após o desenvolvimento dessas telas e suas funcionalidades, durante as aulas, discutiamos o que cada um deveria fazer, como adicionar uma tela ou funcionalidade nova que antes não tinha sido pensada

Nota dada pelo grupo: 8,5.
O grupo acredita que esta nota seja justa pois, apesar de faltar algumas coisas, como o sistema de trocas, todo o resto está funcional. Sendo assim pelo menos 75% do site está pronto

### Transporte

O transporte é definido na finalização da compra: o usuário seleciona uma transportadora e informa o endereço de entrega. Essas informações ficam registradas no pedido.

| Coleção | Finalidade | Campos |
|---|---|---|
| `pedidos` | Registrar compras e informações de entrega. | `id`, `usuarioId`, `criadoEm`, `status`, `produtos`, `subtotal`, `transportadora` (`id`, `nome`, `valorFrete`, `prazoMinimoDias`, `prazoMaximoDias`), `endereco`, `previsaoEntrega` |

**transporte / pedidos**

| Método | Endpoint | Uso |
|---|---|---|
| GET | `/pedidos` | Listar os pedidos; a aplicação filtra os pedidos do usuário atual. |
| GET | `/pedidos/:id` | Consultar um pedido pelo ID. |
| POST | `/pedidos` | Criar um pedido com produtos, transportadora e endereço de entrega. |
| PATCH | `/pedidos/:id` | Atualizar o endereço de entrega enquanto o pedido permitir alterações. |
| DELETE | `/pedidos/:id` | Excluir um pedido enquanto ele permitir alterações. |

Os pedidos são relacionados ao usuário por `pedidos.usuarioId` → `usuarios.id`. A aplicação impede alterações e exclusões de pedidos com status **Entregue** ou **Cancelado**.
