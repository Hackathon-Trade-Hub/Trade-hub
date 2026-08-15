const produtos = [
        //Casa e Móveis
        {
          id: 1,
          titulo: "Sofá Casa Sofá Roma 3 Lugares Suede",
          descricao: "",
          imagem: "/images/sofa.png",
          preco: "R$ 575,91"
        },
        {
          id: 2,
          titulo: "Moval Cômoda 8 Gavetas Georgia",
          descricao: "",
          imagem: "/images/comoda.png",
          preco: "R$ 764,91"
        },
        {
          id: 3,
          titulo: "Mesa de Jantar Cone Oval Base Madeira Tampo",
          descricao: "",
          imagem: "/images/mesa.png",
          preco: "R$ 2.523,00"
        },
        {
          id: 4,
          titulo: "Mesa Eiffel Quadrado Tampo de Madeira 90cm 4 Cadeiras Katrina",
          descricao: "",
          imagem: "/images/mesa_eiffel.png",
          preco: "R$ 1.700,00"
        },
        {
          id: 5,
          titulo: "Aparador Buffet Sala Gold 4 Portas com Pés de Madeira Maciça Cinza/mel",
          descricao: "",
          imagem: "/images/aparador.png",
          preco: "R$ 429,52"
        },
        {
          id: 6,
          titulo: "Cadeira de Cozinha Sofia Kit 6 Un Ipe",
          descricao: "",
          imagem: "/images/cadeira.png",
          preco: "R$ 2.005,00"
        },
        {
          id: 7,
          titulo: "Cozinha Modulada 4 Peças com Tampo 2 Aéreos 2 Balcões Arizona Cabecasa",
          descricao: "",
          imagem: "/images/cozinha.png",
          preco: "R$ 2.774,00"
        },
        {
          id: 8,
          titulo: "Home Nassau Madeira Maciça 1,70 M / 2,00 M (Castanho, 170x123x40)",
          descricao: "",
          imagem: "/images/home.png",
          preco: "R$ 2.369,00"
        },
        //Eletrodomésticos
        {
          id: 9,
          titulo: "Geladeira Brastemp BRM46MB 385 Litros Frost Free Duplex",
          descricao: "",
          imagem: "/images/geladeira.png",
          preco: "R$ 2.595,00"
        },
        {
          id: 10,
          titulo: "Fischer Forno Elétrico Bancada Gourmet Grill 44L",
          descricao: "",
          imagem: "/images/fischer.png",
          preco: "R$ 749,70"
        },
        {
          id: 11,
          titulo: "Air Fryer 4,2 Litros 1500w-220v Preta Multi ce191out",
          descricao: "",
          imagem: "/images/air.png",
          preco: "R$ 279,92"
        },
        {
          id: 12,
          titulo: "Fogão Mueller 4 Bocas com Mesa de Vidro MFV4BB",
          descricao: "",
          imagem: "/images/fogao.png",
          preco: "R$ 802,78"
        },
        {
          id: 13,
          titulo: "Combo Ariete Linha Moderna Vermelho Liquidificador + Chaleira + Torradeira E Cafeteira",
          descricao: "",
          imagem: "/images/combo.png",
          preco: "R$ 2.205,22"
        },
        {
          id: 14,
          titulo: "Secadora de Roupas Solaris 8Kg Mueller",
          descricao: "",
          imagem: "/images/secadora.png",
          preco: "R$ 539,91"
        },
        {
          id: 15,
          titulo: "Cafeteira Elétrica Mondial Dolce Arome C-33JT-24X",
          descricao: "",
          imagem: "/images/cafeteira.png",
          preco: "R$ 242,91"
        },
        {
          id: 16,
          titulo: "WAP Aspirador de Pó e Água Barril GTW INOX 12, Compacto, 12 Litros, com Filtro Lavável, 160mbar 1400W 127V",
          descricao: "",
          imagem: "/images/wap.png",
          preco: "R$ 324,83"
        },
        //Esportes
        {
          id: 17,
          titulo: "Bola Penalty VP 5000 X Vôlei",
          descricao: "",
          imagem: "/images/bola.png",
          preco: "R$ 129,90"
        },
        {
          id: 18,
          titulo: "Altmayer Aro/cesta de Basquete Profissional Com Mola Super Reforçado",
          descricao: "",
          imagem: "/images/altmayer.png",
          preco: "R$ 638,03"
        },
        {
          id: 19,
          titulo: "Kit Vôlei & Futvôlei Profissional Linha Premium",
          descricao: "",
          imagem: "/images/kit.png",
          preco: "R$ 837,90"
        },
        {
          id: 20,
          titulo: "Kit Boxe Luva Dourado + Protetor Bucal + Bandagem",
          descricao: "",
          imagem: "/images/kit_boxe.png",
          preco: "R$ 389,90"
        },
        {
          id: 21,
          titulo: "Kit Futebol Profissional Gears",
          descricao: "",
          imagem: "/images/kit_futebol.png",
          preco: "R$ 2.999,00"
        },
        {
          id: 22,
          titulo: "Raquete de Tênis Ama Kids 21 - Amarelo e Laranja",
          descricao: "",
          imagem: "/images/raquete.png",
          preco: "R$ 269,91"
        },
        {
          id: 23,
          titulo: "Bola Campo Penalty Bravo XXVI",
          descricao: "",
          imagem: "/images/bola_campo.png",
          preco: "R$ 149,94"
        },
        {
          id: 24,
          titulo: "Kit De Natação Para Treinamento Com 3 Itens Modelo 3 Rythmoon",
          descricao: "",
          imagem: "/images/kit_natacao.png",
          preco: "R$ 206,10"
        },
        //Ferramentas
        {
          id: 25,
          titulo: "Jogo Ferramentas Manuais C/ Maleta de Alumínio 186 Pçs Lith lt2010",
          descricao: "",
          imagem: "/images/jogo.png",
          preco: "R$ 639,90"
        },
        {
          id: 26,
          titulo: "Kit Ferramentas Chave Soquetes Sextavados 108pcs de QUALIDADE - nakaza",
          descricao: "",
          imagem: "/images/kit_ferramentas.png",
          preco: "R$ 353,40"
        },
        {
          id: 27,
          titulo: "Jogo de Chaves de Fenda e Phillips 7 Peças Em Cr-v -fortgpro fotgpro",
          descricao: "",
          imagem: "/images/jogo_chaves.png",
          preco: "R$ 37,56"
        },
        {
          id: 28,
          titulo: "Furadeira de Impacto 760W HP1640 220V Makita",
          descricao: "",
          imagem: "/images/furadeira.png",
          preco: "R$ 404,91"
        },
        {
          id: 29,
          titulo: "Martelo Bola Gedore Red",
          descricao: "",
          imagem: "/images/martelo.png",
          preco: "R$ 71,93"
        },
        {
          id: 30,
          titulo: "Alicate de Bico Meia Cana 6 Noll",
          descricao: "",
          imagem: "/images/alicate.png",
          preco: "R$ 22,96"
        },
        {
          id: 31,
          titulo: "Serrote Jack Bi-Material Irwin",
          descricao: "",
          imagem: "/images/serrote.png",
          preco: "R$ 85,50"
        },
        {
          id: 32,
          titulo: "Nakazaki Serra Mármore 110 1200w",
          descricao: "",
          imagem: "/images/nakazaki.png",
          preco: "R$ 246,45"
        },
        //Espaço Pet
        {
          id: 33,
          titulo: "Coleira Para Cachorro Amorosso",
          descricao: "",
          imagem: "/images/coleira.png",
          preco: "R$ 180,41"
        },
        {
          id: 34,
          titulo: "Osso Natural Bona Pet",
          descricao: "",
          imagem: "/images/osso.png",
          preco: "R$ 6,29"
        },
        {
          id: 35,
          titulo: "Cama Pet Redonda Unic",
          descricao: "",
          imagem: "/images/cama.png",
          preco: "R$ 114,99"
        },
        {
          id: 36,
          titulo: "Arranhador para gatos - Petshop",
          descricao: "",
          imagem: "/images/arranhador.png",
          preco: "R$ 66,49"
        },
        {
          id: 37,
          titulo: "Brinquedo Líder Pet Halteres Pequeno para Cães 12455",
          descricao: "",
          imagem: "/images/brinquedo.png",
          preco: "R$ 17,99"
        },
        {
          id: 38,
          titulo: "Casa Casinha Cachorro Cães Plástico Raças Porte Pequeno 2 em 1 N4 Azul",
          descricao: "",
          imagem: "/images/casa.png",
          preco: "R$ 142,18"
        },
        {
          id: 39,
          titulo: "Enforcador Redondo São Pet",
          descricao: "",
          imagem: "/images/enforcador.png",
          preco: "R$ 18,00"
        },
        {
          id: 40,
          titulo: "Brinquedo Mordedor Napi Corda Clean para Cães",
          descricao: "",
          imagem: "/images/brinquedo_mordedor.png",
          preco: "R$ 34,99"
        },
        //Brinquedos
        {
          id: 41,
          titulo: "Usual Caminhão Truck Basculante 2.5",
          descricao: "",
          imagem: "/images/usual.png",
          preco: "R$ 59,99"
        },
        {
          id: 42,
          titulo: "Candide Barbie Laptop Infantil",
          descricao: "",
          imagem: "/images/candide.png",
          preco: "R$ 58,80"
        },
        {
          id: 43,
          titulo: "Kit Balde Castelinho Aventuras Radicais Brinquedos de Praia",
          descricao: "",
          imagem: "/images/kit_balde.png",
          preco: "R$ 45,66"
        },
        {
          id: 44,
          titulo: "Hot Wheels City Pista Mega Garagem",
          descricao: "",
          imagem: "/images/hot.png",
          preco: "R$ 519,99"
        },
        {
          id: 45,
          titulo: "Brinquedo Trator Escavadeira Articulável Coleção Mamute Pc",
          descricao: "",
          imagem: "/images/brinquedo_trator.png",
          preco: "R$ 47,77"
        },
        {
          id: 46,
          titulo: "Brinquedo Dinossauro Triceratops Com Som E Luz Com Movimento 23cm",
          descricao: "",
          imagem: "/images/brinquedo_dinossauro.png",
          preco: "R$ 49,90"
        },
        {
          id: 47,
          titulo: "Caminhão Cegonha T-Rex Pista Maleta Com 4 Carrinhos",
          descricao: "",
          imagem: "/images/caminhao.png",
          preco: "R$ 200,00"
        },
        {
          id: 48,
          titulo: "Bichichinhos Unicornio Fenix",
          descricao: "",
          imagem: "/images/bichinhos.png",
          preco: "R$ 45,08"
        },
        //Tecnologia
        {
          id: 49,
          titulo: "Fone de Ouvido Bluetooth Tws Mdm Air Dots Para Pilates Com Estojo Recarregável Preto",
          descricao: "",
          imagem: "/images/fone.png",
          preco: "R$ 73,47"
        },
        {
          id: 50,
          titulo: "Apple iPhone 16 Pro",
          descricao: "",
          imagem: "/images/apple.png",
          preco: "R$ 4.750,00"
        },
        {
          id: 51,
          titulo: "Console PlayStation 5 Pro Sony SSD 2TB",
          descricao: "",
          imagem: "/images/console.png",
          preco: "R$ 6.974,07"
        },
        {
          id: 52,
          titulo: "Bettdow SmartWatch, relogio smartwatch com 1.91 Ecrã tátil e AI, à prova d'água IP68",
          descricao: "",
          imagem: "/images/relogio.png",
          preco: "R$ 157,70"
        },
        {
          id: 53,
          titulo: "Caixa de Som Bluetooth JBL Go Essential 2",
          descricao: "",
          imagem: "/images/caixa.png",
          preco: "R$ 120,12"
        },
        {
          id: 54,
          titulo: "Smart TV 32 AOC HD 32S5155/78G Roku TV",
          descricao: "",
          imagem: "/images/smart.png",
          preco: "R$ 949,00"
        },
        {
          id: 55,
          titulo: "Fone de Ouvido Bluetooth 5.0 Bateria Longa Duração Sem Fio Headphone E",
          descricao: "",
          imagem: "/images/fone_ouvido.png",
          preco: "R$ 39,90"
        },
        {
          id: 56,
          titulo: "Roku Streaming Stick TV HD",
          descricao: "",
          imagem: "/images/roku.png",
          preco: "R$ 284,05"
        },
        //Acessórios
        {
          id: 57,
          titulo: "Conjunto de Colar Médio e Brincos com Enfeite de Pedras | Feminino | Accessories | Dourado | U",
          descricao: "",
          imagem: "/images/conjunto.png",
          preco: "R$ 49,90"
        },
        {
          id: 58,
          titulo: "Colar curto quartzo verde",
          descricao: "",
          imagem: "/images/colar.png",
          preco: "R$ 199,00"
        },
        {
          id: 59,
          titulo: "Cinto Couro Com Passantes de Metal E Couro Patricia",
          descricao: "",
          imagem: "/images/cinto.png",
          preco: "R$ 69,90"
        },
        {
          id: 60,
          titulo: "Anel Chapa Prata 925",
          descricao: "",
          imagem: "/images/anel.png",
          preco: "R$ 99,90"
        },
        {
          id: 61,
          titulo: "Colar Cordão Ajustável Cruz Com Pentagrama Prata Grande Punk Rock Gótico",
          descricao: "",
          imagem: "/images/colar_cordao.png",
          preco: "R$ 29,99"
        },
        {
          id: 62,
          titulo: "Pulseira em Ouro Amarelo 18k Estilo Corrente Amarelo",
          descricao: "",
          imagem: "/images/pulseira.png",
          preco: "R$ 44.661,00"
        },
        {
          id: 63,
          titulo: "Colar Longo Medalha Sou um com Deus Elos Folheado",
          descricao: "",
          imagem: "/images/colar_longo.png",
          preco: "R$ 89,90"
        },
        {
          id: 64,
          titulo: "Colar Gota Rosa Claro",
          descricao: "",
          imagem: "/images/colar_gota.png",
          preco: "R$ 89,99"
        },
      ]

  export {produtos as listaProdutos};