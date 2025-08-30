import { FilmDetail } from "../../components/layout/film-details/film-details.component";

export const HEADER_TEXTS = [
  {
    largeText: "7 anos",
    smallText: "de excelência em aplicação de películas em residências e comércios"
  },
  {
    largeText: "1.500+",
    smallText: "janelas transformadas com películas de alta performance"
  },
  {
    largeText: "10 tipos +",
    smallText: "de películas para garantir proteção solar, privacidade, segurança e estética."
  }
]

export const FILM_DETAILS: FilmDetail[] = [
  {
    title: "Film 1",
    rate: 4.5,
    text: "Film 1 é uma solução inovadora para quem busca conforto térmico e proteção solar. Com tecnologia avançada, proporciona excelente redução de calor, bloqueando a maior parte dos raios UV prejudiciais. Ideal para residências e ambientes comerciais, oferece durabilidade e garantia estendida, tornando-se uma escolha confiável para quem valoriza qualidade e segurança.",
    info: [
      { large_text: "85%", small_text: "Redução de Calor" },
      { large_text: "99%", small_text: "Bloqueio de Raios UV" },
      { large_text: "15+", small_text: "Anos de Garantia" },
    ]
  },
  {
    title: "Film 2",
    rate: 3.8,
    text: "Film 2 destaca-se por sua eficiência em bloquear raios solares e proporcionar ambientes mais agradáveis. Sua aplicação é simples e rápida, garantindo proteção contra o desbotamento de móveis e maior privacidade. Com uma excelente relação custo-benefício, é recomendado para quem deseja aliar proteção, conforto e economia de energia.",
    info: [
      { large_text: "80%", small_text: "Redução de Calor" },
      { large_text: "95%", small_text: "Bloqueio de Raios UV" },
      { large_text: "10+", small_text: "Anos de Garantia" },
    ]
  },
  {
    title: "Film 3",
    rate: 4.2,
    text: "Film 3 combina estética e funcionalidade, oferecendo uma solução elegante para controle solar. Com uma variedade de opções de acabamento, permite personalizar ambientes sem comprometer a eficiência. É a escolha ideal para quem busca um produto que una design e desempenho.",
    info: [
      { large_text: "90%", small_text: "Redução de Calor" },
      { large_text: "97%", small_text: "Bloqueio de Raios UV" },
      { large_text: "12+", small_text: "Anos de Garantia" },
    ]
  }
];
