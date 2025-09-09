# Aju Films - Películas Residenciais

Este repositório contém o código-fonte do site institucional da **Aju Films**, uma empresa especializada na aplicação de películas residenciais e comerciais em Aracaju.

O projeto foi desenvolvido com um design único e sofisticado, buscando se diferenciar dos sites institucionais tradicionais. O grande destaque é um **mecanismo de comparação de imagens**, que permite ao usuário visualizar de forma interativa o "antes e depois" da aplicação das películas ofertadas, simplesmente arrastando o mouse sobre a imagem.

## 🚀 Acesso Rápido (Live Demo)

**Visualize o projeto em ação acessando o site oficial:**

### **[https://www.ajufilms.com.br/](https://www.ajufilms.com.br/)**

## ✨ Funcionalidades

  - **Comparador Interativo de Películas:** Visualize o efeito de diferentes películas (blackout, jateado, espelhado, etc.) em ambientes variados, como cozinhas, escritórios e áreas externas, através de um slider de comparação de imagens.
  - **Animações Modernas:** Animações de transição de rota e elementos que surgem na tela conforme o scroll do usuário, criando uma experiência de usuário fluida e dinâmica.
  - **Design Sofisticado:** Interface elegante e moderna, com foco na experiência do usuário e na apresentação visual dos produtos.
  - **Totalmente Responsivo:** O site é otimizado para uma experiência de visualização perfeita em qualquer dispositivo, seja desktop, tablet ou mobile.

## ⚙️ Tecnologias Utilizadas

  - **Angular:** Framework principal, utilizando **Standalone Components** para uma arquitetura mais limpa e modular.
  - **TypeScript:** Para um código mais robusto e de fácil manutenção.
  - **PrimeNG & PrimeFlex:** Biblioteca de componentes UI e utility-first CSS para agilizar o desenvolvimento da interface.
  - **SCSS/Sass:** Para estilização avançada e organizada.
  - **Angular Animations:** Utilizada para criar transições de rota personalizadas e fluidas.

## 🛠️ Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/edumoreiira/aju-films.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd aju-films
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    ng serve
    ```

    Acesse `http://localhost:4200/` no seu navegador.

## 🤝 Boas Práticas e Convenções

Este projeto foi desenvolvido com atenção especial à performance e à experiência do usuário, aplicando técnicas modernas de desenvolvimento front-end.

### Angular & Performance

  - **Animações de Rota Customizadas:** As transições entre as páginas utilizam o `trigger`, `transition` e `query` do `Angular Animations` para criar um efeito de *fade* suave, melhorando a percepção de fluidez na navegação.
  - **Preload de Imagens Estratégico:** Para garantir que as imagens do comparador interativo carreguem rapidamente, foi criado um `PreloadFilesService`. Este serviço pré-carrega as imagens essenciais em segundo plano assim que a aplicação é iniciada, evitando que o usuário espere o carregamento ao interagir com a funcionalidade.
  - **Diretiva com Intersection Observer API:** Foi desenvolvida uma diretiva customizada (`IntersectionObserveDirective`) que utiliza a `Intersection Observer API` do navegador. Ela monitora quando um elemento entra na tela (viewport) e aplica uma classe CSS para disparar animações de entrada, garantindo que as animações ocorram apenas quando o conteúdo se torna visível para o usuário, otimizando a performance.

### TypeScript & HTML

  - **Tipagem Forte com Interfaces:** O projeto utiliza `interfaces` (como `Card` e `VideoCard`) para garantir a consistência e a segurança dos tipos de dados utilizados nos componentes.
  - **HTML Semântico e Acessível:** A estrutura do HTML foi pensada para ser semântica e acessível, utilizando `aria-labels` e tags apropriadas para cada contexto.

## ⚖️ Licença

Este é um projeto de código fechado e de propriedade da **Aju Films**. Seu conteúdo está disponível neste repositório exclusivamente para fins de exibição e portfólio.

**É expressamente proibido o uso, cópia, modificação ou reaproveitamento de qualquer parte deste código para outros fins sem a autorização prévia e por escrito da Aju Films.**
