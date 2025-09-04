import { FilmDetail } from "../src/app/components/layout/films-info/films-info.component";


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
    title: "Linha Semiprofissional",
    text: "Película Fumê bastante utilizada em instalações comerciais como linha tradicional, sem rejeição de calor, apenas para estética e privacidade em determinados ambientes, como por exemplo: portas e janelas internas de escritórios. Disponíveis em transparência 0,5% (G5), 20% (G20) e 35% (G35).",
    info: [
      { large_text: "Transparências", small_text: "(G5/G20/G35)" },
      { large_text: "Estética", small_text: "Foco principal" },
    ]
  },
  {
    title: "Linha Carbono",
    text: "Película Fumê de Carbono, com duplo poliéster e rejeição de calor. Proteção de até 99% contra os raios ultravioletas e até 41% infravermelho/calor (varia por modelo). Excelente visibilidade de dentro para fora. Disponíveis em transparência 0,5% (G5), 20% (G20), 35% (G35) e 50% (G50).",
    top_seller: true,
    info: [
      { large_text: "41%", small_text: "Redução de Calor (IR)" },
      { large_text: "99%", small_text: "Bloqueio de Raios UV" }
    ]
  },
  {
    title: "Linha Premium Nano Cerâmica",
    text: "Película Fumê de Alta Performance com Tecnologia Nanoceramic em sua composição. Oferece proteção superior contra raios UV e Infravermelho. Conservando os interiores e evitando desbotamentos e economia com uso do ar-condicionado. Disponíveis em transparência 0,5% (G5), 20% (G20), 35% (G35) e 50% (G50).",
    top_seller: true,
    info: [
      { large_text: "61%", small_text: "Rejeição IR (máx aprox.)" },
      { large_text: "99%", small_text: "Bloqueio de Raios UV" },
      { large_text: "Alta", small_text: "Performance térmica" },
    ]
  },
  {
    title: "Linha Blackout",
    text: "Película Blackout Preto, com 100% do bloqueio da luz, e rejeição de calor variável. Proteção de até 99% contra os raios ultravioletas. Ideal para substituição de cortinas e escurecimento total em quartos.",
    info: [
      { large_text: "100%", small_text: "Bloqueio de Luz" },
      { large_text: "99%", small_text: "Bloqueio de Raios UV" },
    ]
  },
  {
    title: "Linha Térmica Transparente",
    text: "Película Transparente com até 90% de transparência e bloqueio de Infravermelho/Calor (IR) de até 61% e UV de 99,9%. Utilizada em vitrines e vidros que não podem alterar a fachada, ideal para reduzir o Calor e Filtrar os Raios UV, evitando desbotamento de móveis e objetos.",
    info: [
      { large_text: "61%", small_text: "Redução de Calor (IR)" },
      { large_text: "99%", small_text: "Bloqueio de Raios UV" },
      { large_text: "90%", small_text: "Transparência (VLT)" },
    ]
  },
  {
    title: "Linha Espelhada",
    text: "Película Espelhada, proporciona ao ambiente um recurso privativo e estético valorizando o imóvel, além de reduzir significativamente o calor que passa pelos vidros nos ambientes até 84% em alguns produtos.",
    info: [
      { large_text: "84%", small_text: "Redução de Calor" },
      { large_text: "Privacidade", small_text: "Proteção durante o dia" },
    ]
  },
  {
    title: "Linha Segurança/Proteção",
    text: "Película de Segurança, oferece proteção contra vidros estilhaçados. Funciona mantendo o vidro quebrado no lugar, no caso de um impacto, aumenta a resistência do vidro, evitando acidentes graves, além de conter ações de vândalos.",
    info: [
      { large_text: "Alta", small_text: "Proteção contra estilhaçamento" },
      { large_text: "Segurança", small_text: "Reduz acidentes e vandalismo" },
    ]
  },
  {
    title: "Linha Decorativa",
    text: "Para criar ambientes privativos com formatos diferenciados, sem a perda de luz. Entre as opções: Jateado, White Out (Branco Leitoso).",
    info: [
      { large_text: "Privacidade", small_text: "Sem perda da luz natural" },
      { large_text: "Estética", small_text: "Ambientes personalizados" }
    ]
  },
];

export const IMAGES_PREVIEW_URL = {
  left: {
    interior: "images/window-preview/interior.webp",
    exterior: "images/window-preview/exterior.webp",
    cozinha: "images/window-preview/cozinha.webp",
    escritorio: "images/window-preview/escritorio.webp",
    playground: "images/window-preview/playground.webp"
  },
  right: {
    interior: {
      espelhado: "images/window-preview/interior-35.webp",
      blackout: "images/window-preview/interior-100.webp",
      transparente_termica: "images/window-preview/g70-interior.webp",
      G5: "images/window-preview/interior-50.webp",
      G20: "images/window-preview/interior-50.webp",
      G35: "images/window-preview/interior-35.webp",
      G50: "images/window-preview/interior-35.webp"
    },
    exterior: {
      espelhado: "images/window-preview/exterior-espelhado.webp",
      blackout: "images/window-preview/g5-exterior.webp",
      transparente_termica: "images/window-preview/g70-exterior.webp",
      G5: "images/window-preview/g5-exterior.webp",
      G20: "images/window-preview/g20-exterior.webp",
      G35: "images/window-preview/g35-exterior.webp",
      G50: "images/window-preview/g50-exterior.webp"
    },
    cozinha: "images/window-preview/cozinha-jateado-branco.webp",
    escritorio: "images/window-preview/escritorio-jateada-fosca2.webp",
    playground: "images/window-preview/playground-seguranca.webp"
  }
}