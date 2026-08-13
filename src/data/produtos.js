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
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 28,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 29,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 30,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 31,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 32,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        //Pet Shop
        {
          id: 33,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 34,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 35,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 36,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 37,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 38,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 39,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 40,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        //Brinquedos
        {
          id: 41,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 42,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 43,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 44,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 45,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 46,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 47,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 48,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        //Tecnologia
        {
          id: 49,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 50,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 51,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 52,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 53,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 54,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 55,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 56,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        //Acessórios
        {
          id: 57,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 58,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 59,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 60,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 61,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 62,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 63,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
        {
          id: 64,
          titulo: "",
          descricao: "",
          imagem: "/images/.png",
          preco: "R$ "
        },
      ]

  export {produtos as listaProdutos};
/* 

        {
          id: 1,
          titulo: "PlayStation 5",
          descricao: "Console em perfeito estado com 2 controles. Aceito troca por PC Gamer.",
          imagem: "/images/ps5.jpg"
        },
        {
          id: 2,
          titulo: "iPhone 13 Pro",
          descricao: "Bateria 85%, sem marcas de uso. Troco por celular mais recente com volta.",
          imagem: ""
        },
        {
          id: 3,
          titulo: "Bicicleta Aro 29",
          descricao: "Bicicleta de trilha semi-nova. Interessa trocar por instrumento musical.",
          imagem: ""
        },
        {
          id: 4,
          titulo: "Notebook Gamer",
          descricao: "RTX 3060, 16GB RAM. Busco MacBook M1 ou superior para trabalho.",
          imagem: ""
        }
*/