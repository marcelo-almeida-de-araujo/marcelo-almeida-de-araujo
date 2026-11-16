# Portfólio Pessoal — Marcelo Almeida de Araujo

**Aluno:** Marcelo Almeida de Araujo

**Site publicado:** https://marcelo-almeida-de-araujo.github.io/marcelo-almeida-de-araujo/

---

## Descrição do portfólio

Portfólio pessoal e profissional que apresenta quem eu sou, minha trajetória e os projetos que desenvolvi.
Sou formado em Desenvolvimento de Software Multiplataforma pela [Fatec Itaquera](https://fatecitaquera.cps.sp.gov.br/), atuo como Consultor de Tecnologia na [Konia Tecnologia](https://konia.com.br/) e curso o Técnico em Desenvolvimento de Sistemas na [Etec](https://www.cps.sp.gov.br/etec/).

O site é uma evolução do projeto construído em aula ([mada-portfolio](https://github.com/marcelo-almeida-de-araujo/mada-portfolio)): o layout foi refeito com **Bootstrap 5**, ganhou novas seções e vários recursos interativos, mantendo a identidade visual vermelho/preto da versão original.

### Seções

| Seção | Conteúdo |
|---|---|
| **Início** | Foto, nome, cargo com efeito de digitação, botões de ação, redes sociais e contadores animados |
| **Perfil** | Sobre mim, localização, cargo atual, idiomas e competências |
| **Habilidades** *(nova)* | Barras de nível animadas e grade de tecnologias com ícones |
| **Trajetória** *(nova)* | Abas com Experiência, Formação e Certificações em linha do tempo |
| **Projetos** | Carousel de destaques, filtro por categoria, cards com modal de detalhes e repositórios recentes do GitHub |
| **Contato** | Formulário com validação, cartões de contato, botão de copiar e-mail e mapa (iframe) |

## Tecnologias utilizadas

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" alt="HTML5" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" alt="CSS3" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" alt="JavaScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" width="40" alt="Bootstrap" />
</p>

- **HTML5** — estrutura semântica (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — variáveis CSS, Flexbox, Grid, transições, `@keyframes` e media queries
- **JavaScript (ES6+)** — renderização dinâmica, `IntersectionObserver`, `fetch`, Clipboard API, `localStorage`
- **Bootstrap 5.3** — grid, navbar, collapse, scrollspy, carousel, modal, tabs, toast e validação de formulários
- **Bootstrap Icons**, **Devicon** e **Google Fonts** (Inter e Space Grotesk)
- **API pública do GitHub** e **Google Maps (iframe)**
- **GitHub Pages** — hospedagem

## Como o projeto funciona

```
├── index.html          # Estrutura das seções e componentes Bootstrap
├── assets/
│   ├── css/style.css   # Tema (claro/escuro), layout e todas as animações
│   ├── js/data.js      # Todos os dados do portfólio (perfil, projetos, experiências...)
│   ├── js/main.js      # Renderização do conteúdo e recursos interativos
│   └── img/            # Foto de perfil e telas dos projetos
└── README.md
```

1. O `index.html` define a estrutura de cada seção com contêineres vazios (`#skillBars`, `#projectsGrid`, `#experienceTimeline`...).
2. O `data.js` guarda todo o conteúdo em um único objeto `portfolioData`. Para atualizar o portfólio basta editar esse arquivo — não é preciso mexer no HTML.
3. Ao carregar a página (`DOMContentLoaded`), o `main.js` percorre os dados e gera o HTML de cada seção com *template strings*, depois ativa os recursos interativos.
4. O menu é fixo, muda de aparência ao rolar e destaca a seção atual com o **ScrollSpy** do Bootstrap. No celular ele vira um menu "hambúrguer" que fecha sozinho ao escolher uma seção.
5. Para rodar localmente basta abrir o `index.html` no navegador (ou usar um servidor estático, como a extensão Live Server).

## Recursos novos adicionados

Além do que foi feito em aula, o portfólio recebeu os seguintes recursos — todos visíveis e funcionais no site:

| # | Recurso | Onde ver |
|---|---|---|
| 1 | **Tema claro/escuro** com preferência salva | Botão ☀/🌙 no menu |
| 2 | **Efeito de digitação** com os cargos | Topo da página |
| 3 | **Animações ao rolar** (elementos surgem na tela) | Todas as seções |
| 4 | **Contadores e barras de habilidade animados** | Topo e seção Habilidades |
| 5 | **Novas seções**: Habilidades e Trajetória (com abas) | Menu → Habilidades / Trajetória |
| 6 | **Carousel com efeitos visuais**: fade, zoom "Ken Burns", legenda animada e barra de tempo | Seção Projetos |
| 7 | **Filtro de projetos** por categoria | Botões Todos / Front-end / Back-end / Mobile |
| 8 | **Cards com inclinação 3D** e overlay no hover | Cards de projeto |
| 9 | **Modal de projeto com galeria** (carousel + miniaturas) | Clique em um projeto |
| 10 | **Repositórios do GitHub em tempo real** (API) | Final da seção Projetos |
| 11 | **Formulário de contato com validação** + botão de copiar e-mail | Seção Contato |
| 12 | **Mapa incorporado (iframe)** | Seção Contato |
| 13 | **Barra de progresso de leitura** e **botão voltar ao topo** | Topo e canto inferior da tela |
| 14 | **Fundo animado** e **anel giratório na foto** | Topo da página |

## Como os recursos foram implementados

### 1. Tema claro/escuro
As cores ficam em **variáveis CSS** definidas duas vezes: em `[data-bs-theme="dark"]` e em `[data-bs-theme="light"]`. O botão troca o atributo `data-bs-theme` da tag `<html>` (o mesmo que o Bootstrap 5.3 usa para seus componentes) e salva a escolha no `localStorage`. Um pequeno script no `<head>` aplica o tema salvo antes da página aparecer, evitando que ela "pisque".

```js
document.documentElement.setAttribute("data-bs-theme", next);
localStorage.setItem("theme", next);
```

### 2. Efeito de digitação
A função `initTyping()` usa `setTimeout` recursivo: adiciona uma letra por vez da frase atual, pausa ao completar, apaga letra por letra e passa para a próxima frase do array `roles`. O cursor piscante é um `<span>` com animação `@keyframes blink`.

### 3. Animações ao rolar (scroll reveal)
Elementos com a classe `.reveal` começam invisíveis e deslocados (`opacity: 0; transform: translateY(40px)`). Um **`IntersectionObserver`** detecta quando cada elemento entra na tela e adiciona a classe `.visible`, que dispara a transição CSS. Cada elemento é observado só uma vez.

### 4. Contadores e barras animadas
O mesmo observer, ao revelar um bloco, define a largura de cada `.skill-fill` a partir do atributo `data-width` (a transição CSS faz a barra "encher") e chama `animateCounter()`, que usa `requestAnimationFrame` com uma curva *ease-out* para contar de 0 até o valor final.

### 5. Novas seções
**Habilidades** combina barras de progresso com uma grade de ícones (Devicon) que giram no hover (`rotateY(360deg)`). **Trajetória** usa os componentes **Nav Pills + Tab Content** do Bootstrap para alternar entre Experiência, Formação e Certificações, com uma linha do tempo feita em CSS puro (pseudo-elementos `::before`).

### 6. Efeitos visuais no carousel
O carousel de destaque usa a classe **`carousel-fade`** do Bootstrap (transição por esmaecimento) e recebe efeitos extras em CSS:
- **Ken Burns:** a imagem do slide ativo recebe `animation: kenburns`, um zoom lento de `scale(1.15)` até `scale(1)`;
- **Legenda em cascata:** os itens da legenda sobem um após o outro com `animation-delay` diferentes;
- **Barra de tempo:** uma barra na base é reiniciada a cada evento `slid.bs.carousel` e mostra quanto falta para o próximo slide;
- **Indicadores** em forma de traço que se alongam quando ativos e setas que só aparecem no hover.

### 7. Filtro de projetos
Cada card tem um atributo `data-categories`. Ao clicar em um botão de filtro, o JavaScript compara a categoria e aplica a classe `.hide` (que esmaece e diminui o card) aos que não combinam; depois da transição eles saem do layout.

### 8. Cards com inclinação 3D
No evento `mousemove`, `initTilt()` calcula a posição do mouse dentro do card e aplica `perspective() rotateX() rotateY()`. Ao sair, o `transform` é limpo. O efeito só é ativado em dispositivos com mouse.

### 9. Modal com galeria
Ao clicar em um projeto, `openProjectModal()` monta dentro do **Modal** do Bootstrap um **Carousel** com todas as telas e uma faixa de miniaturas. As miniaturas usam `data-bs-slide-to` e ficam sincronizadas com o slide atual pelo evento `slid.bs.carousel`.

### 10. Repositórios em tempo real
`loadGithubRepos()` usa `fetch` com `async/await` na API pública `https://api.github.com/users/<usuário>/repos`, ordenando pelos mais atualizados e ignorando forks. Enquanto carrega aparece um *spinner* do Bootstrap; se a API falhar, é exibido um link para o perfil no GitHub.

### 11. Formulário de contato
Usa a **validação nativa do HTML** (`required`, `type="email"`, `minlength`) com o estilo de validação do Bootstrap (`.was-validated`). Se tudo estiver correto, o script monta um link `mailto:` com assunto e mensagem codificados por `encodeURIComponent`, abrindo o aplicativo de e-mail do visitante. Um **Toast** do Bootstrap confirma a ação. O botão de copiar usa a **Clipboard API** (`navigator.clipboard.writeText`).

### 12. Mapa (iframe)
Um `<iframe>` do Google Maps mostra a cidade de São Paulo. No tema escuro, um `filter: invert() hue-rotate()` deixa o mapa escuro para combinar com o site.

### 13. Barra de progresso e voltar ao topo
Um único listener de `scroll` calcula a porcentagem rolada da página para a largura da barra no topo, mostra o botão "voltar ao topo" depois de 600px e deixa a navbar translúcida com `backdrop-filter: blur()`.

### 14. Acessibilidade e responsividade
O layout usa o grid do Bootstrap e funciona do celular ao desktop. Todas as animações são desativadas para quem ativou "reduzir movimento" no sistema (`prefers-reduced-motion`), e os cards de projeto também podem ser abertos pelo teclado (Enter/Espaço).

---

## Contato

<p align="left">
  <a href="https://www.linkedin.com/in/marcelo-almeida-de-araujo/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="40" alt="LinkedIn" />
  </a>
  <a href="mailto:almeidadearaujomarcelo@gmail.com">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" width="40" alt="E-mail" />
  </a>
</p>
