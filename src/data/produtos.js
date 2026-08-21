const produtos = [
  //Casa e Móveis
  {
    id: 1,
    titulo: "Sofá Casa Sofá Roma 3 Lugares Suede",
    descricao: "Sofá usado, em bom estado de conservação. Possui pequenas marcas de uso no tecido, mas nada que comprometa a aparência ou o conforto. Estrutura firme e sem rasgos.",
    imagem: "/images/sofa.png",
    preco: "R$ 575,91",
    categoria: "Casa e Móveis",
    status: "Troca/Venda"
  },
  {
    id: 2,
    titulo: "Moval Cômoda 8 Gavetas Georgia",
    descricao: "Cômoda usada em bom estado. As gavetas estão funcionando normalmente e a estrutura está firme. Possui alguns riscos leves e sinais de uso nas laterais.",
    imagem: "/images/comoda.png",
    preco: "R$ 699,90",
    categoria: "Casa e Móveis",
    status: "Venda"
  },
  {
    id: 3,
    titulo: "Mesa de Jantar Cone Oval Base Madeira Tampo",
    descricao: "Mesa usada em ótimo estado de conservação. Pouquíssimas marcas de uso no tampo e estrutura bem conservada. Sem avarias ou partes quebradas.",
    imagem: "/images/mesa.png",
    preco: "R$ 2.523,00",
    categoria: "Casa e Móveis",
    status: "Troca"
  },
  {
    id: 4,
    titulo: "Mesa Eiffel Quadrado Tampo de Madeira 90cm 4 Cadeiras Katrina",
    descricao: "Conjunto usado, mas bem conservado. Mesa firme e cadeiras em bom estado. Possui pequenos sinais de uso nos pés e no tampo, conforme esperado pelo tempo de utilização.",
    imagem: "/images/mesa_eiffel.png",
    preco: "R$ 1.590,00",
    categoria: "Casa e Móveis",
    status: "Venda"
  },
  {
    id: 5,
    titulo: "Aparador Buffet Sala Gold 4 Portas com Pés de Madeira Maciça Cinza/mel",
    descricao: "Aparador usado em bom estado geral. Portas e dobradiças funcionando normalmente. Apresenta algumas marcas superficiais de uso, principalmente na parte superior.",
    imagem: "/images/aparador.png",
    preco: "R$ 399,90",
    categoria: "Casa e Móveis",
    status: "Troca/Venda"
  },
  {
    id: 6,
    titulo: "Cadeira de Cozinha Sofia Kit 6 Un Ipe",
    descricao: "Conjunto com 6 cadeiras usadas. Estrutura resistente e todas utilizáveis normalmente. Algumas possuem riscos e pequenas marcas de desgaste no acabamento.",
    imagem: "/images/cadeira.png",
    preco: "R$ 1.799,00",
    categoria: "Casa e Móveis",
    status: "Troca"
  },
  {
    id: 7,
    titulo: "Cozinha Modulada 4 Peças com Tampo 2 Aéreos 2 Balcões Arizona Cabecasa",
    descricao: "Cozinha usada em bom estado de conservação. Módulos firmes e portas funcionando normalmente. Possui pequenas marcas de uso e desgaste em alguns cantos.",
    imagem: "/images/cozinha.png",
    preco: "R$ 2.450,00",
    categoria: "Casa e Móveis",
    status: "Venda"
  },
  {
    id: 8,
    titulo: "Home Nassau Madeira Maciça 1,70 M / 2,00 M (Castanho, 170x123x40)",
    descricao: "Home usado, muito bem conservado. Madeira sem danos estruturais e com poucas marcas de uso. Possui apenas pequenos sinais de desgaste no acabamento.",
    imagem: "/images/home.png",
    preco: "R$ 2.369,00",
    categoria: "Casa e Móveis",
    status: "Troca/Venda"
  },

  //Eletrodomésticos
  {
    id: 9,
    titulo: "Geladeira Brastemp BRM46MB 385 Litros Frost Free Duplex",
    descricao: "Geladeira usada funcionando normalmente. Gela bem e o sistema Frost Free está funcionando. Possui algumas marcas e pequenos riscos na parte externa, mas nada que comprometa o funcionamento.",
    imagem: "/images/geladeira.png",
    preco: "R$ 2.350,00",
    categoria: "Eletrodomésticos",
    status: "Venda"
  },
  {
    id: 10,
    titulo: "Fischer Forno Elétrico Bancada Gourmet Grill 44L",
    descricao: "Forno usado em bom estado. Resistências funcionando normalmente e aquecimento uniforme. Possui pequenas marcas de uso na parte externa.",
    imagem: "/images/fischer.png",
    preco: "R$ 749,70",
    categoria: "Eletrodomésticos",
    status: "Troca"
  },
  {
    id: 11,
    titulo: "Air Fryer 4,2 Litros 1500w-220v Preta Multi ce191out",
    descricao: "Air Fryer usada e funcionando perfeitamente. Cesto em bom estado, com pequenas marcas de uso. Foi higienizada antes da venda.",
    imagem: "/images/air.png",
    preco: "R$ 279,92",
    categoria: "Eletrodomésticos",
    status: "Troca/Venda"
  },
  {
    id: 12,
    titulo: "Fogão Mueller 4 Bocas com Mesa de Vidro MFV4BB",
    descricao: "Fogão usado em estado razoável. Todas as bocas acendem e funcionam, porém apresenta manchas e riscos no vidro e sinais de uso mais aparentes. Precisa de uma boa limpeza.",
    imagem: "/images/fogao.png",
    preco: "R$ 680,00",
    categoria: "Eletrodomésticos",
    status: "Venda"
  },
  {
    id: 13,
    titulo: "Combo Ariete Linha Moderna Vermelho Liquidificador + Chaleira + Torradeira E Cafeteira",
    descricao: "Combo usado em ótimo estado de conservação. Todos os aparelhos foram testados e estão funcionando normalmente. Possui poucos sinais de uso.",
    imagem: "/images/combo.png",
    preco: "R$ 2.205,22",
    categoria: "Eletrodomésticos",
    status: "Troca"
  },
  {
    id: 14,
    titulo: "Secadora de Roupas Solaris 8Kg Mueller",
    descricao: "Secadora usada, funcionando normalmente. Possui alguns sinais de uso e pequenas manchas no acabamento externo, mas não apresenta problemas de funcionamento.",
    imagem: "/images/secadora.png",
    preco: "R$ 489,90",
    categoria: "Eletrodomésticos",
    status: "Troca/Venda"
  },
  {
    id: 15,
    titulo: "Cafeteira Elétrica Mondial Dolce Arome C-33JT-24X",
    descricao: "Cafeteira usada em bom estado. Funcionando perfeitamente e sem vazamentos. Possui pequenas marcas de uso no reservatório e na jarra.",
    imagem: "/images/cafeteira.png",
    preco: "R$ 242,91",
    categoria: "Eletrodomésticos",
    status: "Venda"
  },
  {
    id: 16,
    titulo: "WAP Aspirador de Pó e Água Barril GTW INOX 12, Compacto, 12 Litros, com Filtro Lavável, 160mbar 1400W 127V",
    descricao: "Aspirador usado em bom estado e funcionando normalmente. Potência preservada e filtro lavável. Possui alguns riscos no corpo devido ao uso.",
    imagem: "/images/wap.png",
    preco: "R$ 299,90",
    categoria: "Eletrodomésticos",
    status: "Troca"
  },

  //Esportes
  {
    id: 17,
    titulo: "Bola Penalty VP 5000 X Vôlei",
    descricao: "Bola usada em bom estado. Mantém a pressão e está apta para treinos e jogos. Possui algumas marcas de uso na superfície.",
    imagem: "/images/bola.png",
    preco: "R$ 99,90",
    categoria: "Esportes",
    status: "Venda"
  },
  {
    id: 18,
    titulo: "Altmayer Aro/cesta de Basquete Profissional Com Mola Super Reforçado",
    descricao: "Aro usado em bom estado, com estrutura firme e mola funcionando normalmente. Possui sinais de desgaste na pintura devido ao uso externo.",
    imagem: "/images/altmayer.png",
    preco: "R$ 550,00",
    categoria: "Esportes",
    status: "Troca/Venda"
  },
  {
    id: 19,
    titulo: "Kit Vôlei & Futvôlei Profissional Linha Premium",
    descricao: "Kit usado poucas vezes e muito bem conservado. Todos os itens estão em boas condições e sem danos significativos.",
    imagem: "/images/kit.png",
    preco: "R$ 837,90",
    categoria: "Esportes",
    status: "Troca"
  },
  {
    id: 20,
    titulo: "Kit Boxe Luva Dourado + Protetor Bucal + Bandagem",
    descricao: "Kit de boxe usado, mas bem conservado. Luvas apresentam pequenas marcas de uso e as bandagens possuem sinais normais de utilização. Protetor em bom estado.",
    imagem: "/images/kit_boxe.png",
    preco: "R$ 329,90",
    categoria: "Esportes",
    status: "Venda"
  },
  {
    id: 21,
    titulo: "Kit Futebol Profissional Gears",
    descricao: "Kit usado em ótimo estado. Equipamentos bem conservados, sem rasgos ou danos importantes. Possui apenas marcas normais de uso.",
    imagem: "/images/kit_futebol.png",
    preco: "R$ 2.999,00",
    categoria: "Esportes",
    status: "Troca/Venda"
  },
  {
    id: 22,
    titulo: "Raquete de Tênis Ama Kids 21 - Amarelo e Laranja",
    descricao: "Raquete infantil usada em bom estado. Estrutura firme e cordas em boas condições. Possui alguns riscos no aro causados pelo uso.",
    imagem: "/images/raquete.png",
    preco: "R$ 219,90",
    categoria: "Esportes",
    status: "Troca"
  },
  {
    id: 23,
    titulo: "Bola Campo Penalty Bravo XXVI",
    descricao: "Bola de futebol usada em condições razoáveis. Ainda pode ser utilizada normalmente, mas apresenta desgaste visível na pintura e algumas marcas de uso.",
    imagem: "/images/bola_campo.png",
    preco: "R$ 99,90",
    categoria: "Esportes",
    status: "Venda"
  },
  {
    id: 24,
    titulo: "Kit De Natação Para Treinamento Com 3 Itens Modelo 3 Rythmoon",
    descricao: "Kit de natação usado em bom estado. Itens higienizados e funcionando normalmente. Possui pequenas marcas de uso, mas nada que comprometa a utilização.",
    imagem: "/images/kit_natacao.png",
    preco: "R$ 179,90",
    categoria: "Esportes",
    status: "Troca/Venda"
  },

  //Ferramentas
  {
    id: 25,
    titulo: "Jogo Ferramentas Manuais C/ Maleta de Alumínio 186 Pçs Lith lt2010",
    descricao: "Jogo de ferramentas usado, porém muito bem conservado. A maioria das peças apresenta pouco uso. Maleta possui alguns riscos externos, mas está em boas condições.",
    imagem: "/images/jogo.png",
    preco: "R$ 639,90",
    categoria: "Ferramentas",
    status: "Venda"
  },
  {
    id: 26,
    titulo: "Kit Ferramentas Chave Soquetes Sextavados 108pcs de QUALIDADE - nakaza",
    descricao: "Kit usado em bom estado geral. Peças funcionando normalmente e sem sinais de ferrugem importantes. Algumas ferramentas possuem marcas de uso.",
    imagem: "/images/kit_ferramentas.png",
    preco: "R$ 319,90",
    categoria: "Ferramentas",
    status: "Troca"
  },
  {
    id: 27,
    titulo: "Jogo de Chaves de Fenda e Phillips 7 Peças Em Cr-v -fortgpro fotgpro",
    descricao: "Jogo de chaves usado, com sinais de uso nas pontas e nos cabos. Todas as peças continuam utilizáveis normalmente.",
    imagem: "/images/jogo_chaves.png",
    preco: "R$ 29,90",
    categoria: "Ferramentas",
    status: "Troca/Venda"
  },
  {
    id: 28,
    titulo: "Furadeira de Impacto 760W HP1640 220V Makita",
    descricao: "Furadeira usada em bom estado e funcionando normalmente. Possui marcas de uso no corpo e pequenas manchas, mas mantém boa potência.",
    imagem: "/images/furadeira.png",
    preco: "R$ 349,90",
    categoria: "Ferramentas",
    status: "Venda"
  },
  {
    id: 29,
    titulo: "Martelo Bola Gedore Red",
    descricao: "Martelo usado em bom estado. Cabeça firme e cabo conservado. Possui marcas e pequenos riscos decorrentes do uso.",
    imagem: "/images/martelo.png",
    preco: "R$ 59,90",
    categoria: "Ferramentas",
    status: "Troca"
  },
  {
    id: 30,
    titulo: "Alicate de Bico Meia Cana 6 Noll",
    descricao: "Alicate usado, com marcas de uso e pequenos sinais de oxidação na parte metálica. Ainda funciona normalmente e mantém boa abertura e fechamento.",
    imagem: "/images/alicate.png",
    preco: "R$ 17,90",
    categoria: "Ferramentas",
    status: "Venda"
  },
  {
    id: 31,
    titulo: "Serrote Jack Bi-Material Irwin",
    descricao: "Serrote usado em bom estado de conservação. Dentes ainda em boas condições e cabo firme. Possui riscos e marcas de uso.",
    imagem: "/images/serrote.png",
    preco: "R$ 69,90",
    categoria: "Ferramentas",
    status: "Troca/Venda"
  },
  {
    id: 32,
    titulo: "Nakazaki Serra Mármore 110 1200w",
    descricao: "Serra mármore usada e funcionando, porém apresenta bastante desgaste externo e marcas de uso. Recomenda-se uma revisão antes de utilização profissional.",
    imagem: "/images/nakazaki.png",
    preco: "R$ 199,90",
    categoria: "Ferramentas",
    status: "Troca"
  },

  //Espaço Pet
  {
    id: 33,
    titulo: "Coleira Para Cachorro Amorosso",
    descricao: "Coleira usada em bom estado. Fecho funcionando normalmente e material ainda resistente. Possui pequenas marcas de uso e desgaste na parte interna.",
    imagem: "/images/coleira.png",
    preco: "R$ 149,90",
    categoria: "Espaço Pet",
    status: "Venda"
  },
  {
    id: 34,
    titulo: "Osso Natural Bona Pet",
    descricao: "Produto usado, em bom estado de conservação e com pouco desgaste. Foi utilizado poucas vezes e está em boas condições para o uso.",
    imagem: "/images/osso.png",
    preco: "R$ 6,29",
    categoria: "Espaço Pet",
    status: "Troca"
  },
  {
    id: 35,
    titulo: "Cama Pet Redonda Unic",
    descricao: "Cama pet usada em bom estado. Almofada ainda confortável e estrutura sem danos. Apresenta algumas marcas de uso e pequeno desgaste no tecido.",
    imagem: "/images/cama.png",
    preco: "R$ 89,90",
    categoria: "Espaço Pet",
    status: "Troca/Venda"
  },
  {
    id: 36,
    titulo: "Arranhador para gatos - Petshop",
    descricao: "Arranhador usado com sinais de utilização. Algumas partes do sisal estão desgastadas e há marcas de arranhões, mas a estrutura permanece firme.",
    imagem: "/images/arranhador.png",
    preco: "R$ 49,90",
    categoria: "Espaço Pet",
    status: "Venda"
  },
  {
    id: 37,
    titulo: "Brinquedo Líder Pet Halteres Pequeno para Cães 12455",
    descricao: "Brinquedo usado poucas vezes e em bom estado. Possui pequenas marcas de mordidas, mas continua firme e próprio para uso.",
    imagem: "/images/brinquedo.png",
    preco: "R$ 14,90",
    categoria: "Espaço Pet",
    status: "Troca"
  },
  {
    id: 38,
    titulo: "Casa Casinha Cachorro Cães Plástico Raças Porte Pequeno 2 em 1 N4 Azul",
    descricao: "Casinha usada em bom estado. Estrutura firme e sem rachaduras. Possui alguns riscos e marcas de exposição ao tempo na parte externa.",
    imagem: "/images/casa.png",
    preco: "R$ 119,90",
    categoria: "Espaço Pet",
    status: "Troca/Venda"
  },
  {
    id: 39,
    titulo: "Enforcador Redondo São Pet",
    descricao: "Enforcador usado, com algumas marcas de desgaste no metal. Continua funcionando normalmente, mas apresenta sinais visíveis de uso.",
    imagem: "/images/enforcador.png",
    preco: "R$ 12,90",
    categoria: "Espaço Pet",
    status: "Venda"
  },
  {
    id: 40,
    titulo: "Brinquedo Mordedor Napi Corda Clean para Cães",
    descricao: "Mordedor usado e bastante utilizado. A corda apresenta desgaste e algumas pontas desfiadas, mas ainda pode ser utilizado. Preço reduzido devido ao estado.",
    imagem: "/images/brinquedo_mordedor.png",
    preco: "R$ 24,90",
    categoria: "Espaço Pet",
    status: "Troca"
  },

  //Brinquedos
  {
    id: 41,
    titulo: "Usual Caminhão Truck Basculante 2.5",
    descricao: "Caminhão de brinquedo usado em bom estado. Basculante funcionando normalmente. Possui alguns riscos e marcas de uso na carroceria.",
    imagem: "/images/usual.png",
    preco: "R$ 49,90",
    categoria: "Brinquedos",
    status: "Troca/Venda"
  },
  {
    id: 42,
    titulo: "Candide Barbie Laptop Infantil",
    descricao: "Laptop infantil usado em bom estado. Teclas e funções funcionando normalmente. Possui alguns riscos e marcas de uso na parte externa.",
    imagem: "/images/candide.png",
    preco: "R$ 49,90",
    categoria: "Brinquedos",
    status: "Venda"
  },
  {
    id: 43,
    titulo: "Kit Balde Castelinho Aventuras Radicais Brinquedos de Praia",
    descricao: "Kit de praia usado poucas vezes. Peças em bom estado e sem quebras. Possui pequenas marcas de uso e desgaste normal pelo contato com areia.",
    imagem: "/images/kit_balde.png",
    preco: "R$ 45,66",
    categoria: "Brinquedos",
    status: "Troca"
  },
  {
    id: 44,
    titulo: "Hot Wheels City Pista Mega Garagem",
    descricao: "Pista usada em bom estado geral. Estrutura conservada e peças principais presentes. Possui marcas de uso e pode apresentar pequenos riscos nas pistas.",
    imagem: "/images/hot.png",
    preco: "R$ 429,90",
    categoria: "Brinquedos",
    status: "Troca/Venda"
  },
  {
    id: 45,
    titulo: "Brinquedo Trator Escavadeira Articulável Coleção Mamute Pc",
    descricao: "Trator usado em bom estado. Articulações funcionando e sem peças quebradas. Possui riscos e marcas de uso na pintura.",
    imagem: "/images/brinquedo_trator.png",
    preco: "R$ 39,90",
    categoria: "Brinquedos",
    status: "Venda"
  },
  {
    id: 46,
    titulo: "Brinquedo Dinossauro Triceratops Com Som E Luz Com Movimento 23cm",
    descricao: "Dinossauro usado e funcionando. Som, luzes e movimento testados. Possui pequenas marcas de uso e riscos na pintura.",
    imagem: "/images/brinquedo_dinossauro.png",
    preco: "R$ 39,90",
    categoria: "Brinquedos",
    status: "Troca"
  },
  {
    id: 47,
    titulo: "Caminhão Cegonha T-Rex Pista Maleta Com 4 Carrinhos",
    descricao: "Brinquedo usado em bom estado. Caminhão e carrinhos conservados e com poucas marcas de uso. Algumas partes apresentam pequenos riscos.",
    imagem: "/images/caminhao.png",
    preco: "R$ 179,90",
    categoria: "Brinquedos",
    status: "Venda"
  },
  {
    id: 48,
    titulo: "Bichichinhos Unicornio Fenix",
    descricao: "Brinquedo usado em bom estado de conservação. Possui algumas marcas de uso e pequenos desgastes na pintura, mas sem danos estruturais.",
    imagem: "/images/bichinhos.png",
    preco: "R$ 39,90",
    categoria: "Brinquedos",
    status: "Troca/Venda"
  },

  //Tecnologia
  {
    id: 49,
    titulo: "Fone de Ouvido Bluetooth Tws Mdm Air Dots Para Pilates Com Estojo Recarregável Preto",
    descricao: "Fone usado em bom estado e funcionando normalmente. Ambos os lados reproduzem áudio e o estojo carrega corretamente. Possui pequenos riscos no estojo.",
    imagem: "/images/fone.png",
    preco: "R$ 59,90",
    categoria: "Tecnologia",
    status: "Troca"
  },
  {
    id: 50,
    titulo: "Apple iPhone 16 Pro",
    descricao: "iPhone usado em excelente estado de conservação. Funcionando perfeitamente, sem trincos na tela e com câmeras e Face ID funcionando normalmente. Possui apenas leves sinais de uso na lateral.",
    imagem: "/images/apple.png",
    preco: "R$ 4.750,00",
    categoria: "Tecnologia",
    status: "Venda"
  },
  {
    id: 51,
    titulo: "Console PlayStation 5 Pro Sony SSD 2TB",
    descricao: "PS5 Pro usado em ótimo estado. Console funcionando perfeitamente, sem problemas de desempenho. Possui leves marcas de uso na carcaça e acompanha os cabos.",
    imagem: "/images/console.png",
    preco: "R$ 6.974,07",
    categoria: "Tecnologia",
    status: "Troca/Venda"
  },
  {
    id: 52,
    titulo: "Bettdow SmartWatch, relogio smartwatch com 1.91 Ecrã tátil e AI, à prova d'água IP68",
    descricao: "Smartwatch usado em bom estado. Tela funcionando normalmente e bateria ainda com boa duração. Possui alguns riscos leves na tela e marcas na pulseira.",
    imagem: "/images/relogio.png",
    preco: "R$ 129,90",
    categoria: "Tecnologia",
    status: "Troca"
  },
  {
    id: 53,
    titulo: "Caixa de Som Bluetooth JBL Go Essential 2",
    descricao: "Caixa de som usada em bom estado e funcionando perfeitamente. Bluetooth conecta normalmente e o áudio está limpo. Possui pequenos sinais de uso na carcaça.",
    imagem: "/images/caixa.png",
    preco: "R$ 120,12",
    categoria: "Tecnologia",
    status: "Venda"
  },
  {
    id: 54,
    titulo: "Smart TV 32 AOC HD 32S5155/78G Roku TV",
    descricao: "Smart TV usada funcionando normalmente. Imagem e som em boas condições e Roku funcionando. Possui alguns riscos leves na parte traseira e sinais de uso.",
    imagem: "/images/smart.png",
    preco: "R$ 849,90",
    categoria: "Tecnologia",
    status: "Troca/Venda"
  },
  {
    id: 55,
    titulo: "Fone de Ouvido Bluetooth 5.0 Bateria Longa Duração Sem Fio Headphone E",
    descricao: "Fone usado em estado razoável. Funciona normalmente, porém apresenta desgaste nas almofadas e algumas marcas na estrutura. Bateria ainda segura carga.",
    imagem: "/images/fone_ouvido.png",
    preco: "R$ 29,90",
    categoria: "Tecnologia",
    status: "Venda"
  },
  {
    id: 56,
    titulo: "Roku Streaming Stick TV HD",
    descricao: "Roku usado em bom estado e funcionando normalmente. Conecta à internet e reproduz os aplicativos sem problemas. Possui pequenos sinais de uso.",
    imagem: "/images/roku.png",
    preco: "R$ 249,90",
    categoria: "Tecnologia",
    status: "Troca"
  },

  //Acessórios
  {
    id: 57,
    titulo: "Conjunto de Colar Médio e Brincos com Enfeite de Pedras | Feminino | Accessories | Dourado | U",
    descricao: "Conjunto usado poucas vezes e em ótimo estado. Pedras e acabamento bem conservados. Possui apenas pequenos sinais de uso no banho dourado.",
    imagem: "/images/conjunto.png",
    preco: "R$ 49,90",
    categoria: "Acessórios",
    status: "Troca/Venda"
  },
  {
    id: 58,
    titulo: "Colar curto quartzo verde",
    descricao: "Colar usado em bom estado. Pedra bem conservada e corrente sem danos. Possui pequenos sinais de uso no acabamento.",
    imagem: "/images/colar.png",
    preco: "R$ 179,90",
    categoria: "Acessórios",
    status: "Venda"
  },
  {
    id: 59,
    titulo: "Cinto Couro Com Passantes de Metal E Couro Patricia",
    descricao: "Cinto usado em bom estado de conservação. Couro ainda firme e fivela funcionando normalmente. Possui marcas leves de uso e pequenas dobras no couro.",
    imagem: "/images/cinto.png",
    preco: "R$ 59,90",
    categoria: "Acessórios",
    status: "Troca"
  },
  {
    id: 60,
    titulo: "Anel Chapa Prata 925",
    descricao: "Anel usado, bem conservado e sem deformações. Possui alguns riscos superficiais típicos do uso, mas o acabamento permanece em bom estado.",
    imagem: "/images/anel.png",
    preco: "R$ 89,90",
    categoria: "Acessórios",
    status: "Venda"
  },
  {
    id: 61,
    titulo: "Colar Cordão Ajustável Cruz Com Pentagrama Prata Grande Punk Rock Gótico",
    descricao: "Colar usado em bom estado. Corrente e pingente conservados, com pequenos sinais de uso. Fecho funcionando normalmente.",
    imagem: "/images/colar_cordao.png",
    preco: "R$ 24,90",
    categoria: "Acessórios",
    status: "Troca/Venda"
  },
  {
    id: 62,
    titulo: "Pulseira em Ouro Amarelo 18k Estilo Corrente Amarelo",
    descricao: "Pulseira usada em bom estado de conservação. Possui algumas marcas superficiais e pequenos sinais de uso no acabamento, mas sem danos estruturais.",
    imagem: "/images/pulseira.png",
    preco: "R$ 42.900,00",
    categoria: "Acessórios",
    status: "Venda"
  },
  {
    id: 63,
    titulo: "Colar Longo Medalha Sou um com Deus Elos Folheado",
    descricao: "Colar usado em bom estado. Medalha e elos conservados, com leves sinais de desgaste no folheado devido ao uso.",
    imagem: "/images/colar_longo.png",
    preco: "R$ 74,90",
    categoria: "Acessórios",
    status: "Troca"
  },
  {
    id: 64,
    titulo: "Colar Gota Rosa Claro",
    descricao: "Colar usado poucas vezes e em bom estado. Pingente sem riscos aparentes e corrente conservada. Possui apenas pequenos sinais de uso.",
    imagem: "/images/colar_gota.png",
    preco: "R$ 89,99",
    categoria: "Acessórios",
    status: "Troca/Venda"
  },
]

export { produtos as listaProdutos };