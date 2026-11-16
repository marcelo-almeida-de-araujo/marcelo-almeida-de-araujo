/*
 * Dados do portfólio.
 * Todo o conteúdo do site é gerado a partir deste objeto pelo main.js,
 * então para atualizar o portfólio basta editar este arquivo.
 */
const portfolioData = {
    personalInfo: {
        fullName: "Marcelo Almeida de Araujo",
        firstName: "Marcelo",
        location: "São Paulo, SP — Brasil",
        email: "almeidadearaujomarcelo@gmail.com",
        linkedin: "https://www.linkedin.com/in/marcelo-almeida-de-araujo/",
        github: "https://github.com/marcelo-almeida-de-araujo",
        githubUser: "marcelo-almeida-de-araujo",
        profilePicture: "assets/img/profile.jpg",
        // Frases exibidas no efeito de digitação do topo da página
        roles: [
            "Consultor de Tecnologia",
            "Desenvolvedor Full Stack",
            "Monitor de Desenvolvimento Web",
            "Apaixonado por lógica e desafios"
        ],
        aboutText: [
            "Sou formado em Desenvolvimento de Software Multiplataforma pela Fatec Itaquera, atuo como Consultor de Tecnologia na Konia Tecnologia e curso o Técnico em Desenvolvimento de Sistemas na Etec.",
            "Entrei na programação porque ela é, essencialmente, uma área de lógica. Gosto de resolver quebra-cabeças, encarar problemas e desafiar a mente constantemente em busca de soluções criativas — e é essa liberdade de transformar ideias em algo concreto, construído do zero, que me motiva todos os dias."
        ]
    },

    // Habilidades com nível (0–100) usado nas barras animadas
    skills: [
        { name: "HTML & CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React / Next.js", level: 75 },
        { name: "PHP", level: 70 },
        { name: "SQL / Banco de dados", level: 80 },
        { name: "Java / Spring Boot", level: 65 },
        { name: "Python", level: 65 },
        { name: "Git & GitHub", level: 85 }
    ],

    // Ícones de tecnologias (devicon)
    technologies: [
        { name: "HTML5", icon: "html5/html5-original.svg" },
        { name: "CSS3", icon: "css3/css3-original.svg" },
        { name: "JavaScript", icon: "javascript/javascript-original.svg" },
        { name: "Bootstrap", icon: "bootstrap/bootstrap-original.svg" },
        { name: "React", icon: "react/react-original.svg" },
        { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
        { name: "Python", icon: "python/python-original.svg" },
        { name: "PHP", icon: "php/php-original.svg" },
        { name: "Java", icon: "java/java-original.svg" },
        { name: "C#", icon: "csharp/csharp-original.svg" },
        { name: ".NET", icon: "dotnetcore/dotnetcore-original.svg" },
        { name: "MySQL", icon: "mysql/mysql-original.svg" },
        { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
        { name: "Git", icon: "git/git-original.svg" }
    ],

    softSkills: [
        "Arquitetura de informação",
        "Desenvolvimento de aplicativos móveis",
        "UX / prototipação",
        "Documentação técnica",
        "Didática e mentoria",
        "Trabalho em equipe"
    ],

    languages: [
        { language: "Português", level: "Nativo", percent: 100 },
        { language: "Inglês", level: "Profissional completo (TOEIC)", percent: 85 }
    ],

    experience: [
        {
            company: "Konia Tecnologia",
            position: "Consultor de Tecnologia",
            period: "jun 2025 — presente",
            location: "São Paulo, Brasil",
            activities: [
                "Ingressei como Estagiário/Trainee em tecnologia e hoje atuo como Consultor de Tecnologia",
                "Desenvolvimento e manutenção de sistemas",
                "Documentação técnica e suporte ao sistema de engenharia",
                "Produção de materiais para treinamentos"
            ]
        },
        {
            company: "Fatec Itaquera",
            position: "Estagiário Voluntário de Back-end",
            period: "set 2024 — dez 2024",
            location: "São Paulo, Brasil",
            activities: [
                "Modelei o banco de dados da seção de pesquisa com queries SQL",
                "Desenvolvi uma API CRUD RESTful em PHP",
                "Estruturei o front-end inicial com React",
                "Desenvolvi e integrei o front-end completo da seção de pesquisa"
            ]
        },
        {
            company: "Fatec Itaquera",
            position: "Monitor Voluntário de Desenvolvimento Web I",
            period: "ago 2024 — dez 2024",
            location: "São Paulo, Brasil",
            activities: [
                "Apoio aos alunos em HTML, CSS e JavaScript",
                "Orientação no desenvolvimento de projetos práticos",
                "Feedback sobre trabalhos e códigos",
                "Criação de tutoriais e exemplos de código"
            ]
        },
        {
            company: "Fatec Itaquera",
            position: "Estagiário Voluntário de Front-end",
            period: "set 2023 — ago 2024",
            location: "São Paulo, Brasil",
            activities: [
                "Desenvolvimento do novo website da Fatec Itaquera (HTML, CSS e JavaScript)",
                "Pesquisa de referências, personas e jornada do usuário",
                "Protótipos de baixa, média e alta fidelidade",
                "Colaboração na implantação do novo site"
            ]
        }
    ],

    education: [
        {
            institution: "Etec",
            course: "Técnico em Desenvolvimento de Sistemas",
            period: "Em andamento"
        },
        {
            institution: "Fatec Itaquera",
            course: "Tecnólogo em Desenvolvimento de Software Multiplataforma",
            period: "2023 — 2025"
        },
        {
            institution: "Universidade Anhembi Morumbi",
            course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
            period: "2022 — 2024"
        },
        {
            institution: "Escola SENAI Anchieta",
            course: "Técnico em Eletrônica",
            period: "2018 — 2019"
        },
        {
            institution: "Escola SENAI Roberto Simonsen",
            course: "Aprendizagem Industrial em Manutenção Elétrica",
            period: "2016 — 2017"
        }
    ],

    certifications: [
        { name: "AWS Academy Graduate — Cloud Architecture", issuer: "AWS Academy", icon: "bi-cloud-check" },
        { name: "Test of English for International Communication (TOEIC)", issuer: "ETS", icon: "bi-translate" },
        { name: "Desenvolvedor Back-End", issuer: "Formação", icon: "bi-server" },
        { name: "Git e GitHub: compartilhando e colaborando em projetos", issuer: "Alura", icon: "bi-git" },
        { name: "Git e GitHub: controle e compartilhe seu código", issuer: "Alura", icon: "bi-github" }
    ],

    projects: [
        {
            id: "fatec",
            name: "Website Fatec Itaquera",
            tagline: "Redesign do site institucional com foco em UX/UI",
            description: "Redesign do website institucional da Fatec Itaquera, desenvolvido pela equipe de estágio de front-end, com pesquisa de usuários, personas e protótipos de várias fidelidades.",
            categories: ["front"],
            technologies: ["HTML", "CSS", "JavaScript"],
            githubLink: "https://github.com/marcelo-almeida-de-araujo/dgm-sa-site-fatec-itaquera",
            screenshots: ["fatec-1.png", "fatec-2.png", "fatec-3.png", "fatec-4.png"],
            participation: "Desenvolvi o front-end do projeto, criei protótipos de diferentes fidelidades e realizei, com a equipe, pesquisas de usuário para definir personas e jornadas."
        },
        {
            id: "dashboard",
            name: "Dashboard de Assessoria",
            tagline: "Gestão de informações de clientes",
            description: "Sistema web para gerenciamento de informações de clientes de uma assessoria, com API própria e banco NoSQL.",
            categories: ["back", "front"],
            technologies: ["Java", "Spring Boot", "MongoDB", "HTML", "CSS", "JavaScript"],
            githubLink: "https://github.com/marcelo-almeida-de-araujo/mada-wb-dashboard",
            screenshots: ["dashboard-1.png", "dashboard-2.png", "dashboard-3.png"],
            participation: "Implementei todo o back-end e atuei no front-end para deixá-lo funcional e integrado à API."
        },
        {
            id: "conecta",
            name: "Novo Conecta ONGs",
            tagline: "Plataforma para ONGs/OSCs e voluntários",
            description: "Sistema para gerenciamento de informações sobre ONGs/OSCs e seus voluntários.",
            categories: ["back", "front"],
            technologies: ["Next.js", "Node.js", "MySQL", "CSS"],
            githubLink: "https://github.com/marcelo-almeida-de-araujo/mada-novo-conecta-ongs",
            screenshots: ["conecta-1.png", "conecta-2.png", "conecta-3.png", "conecta-4.png", "conecta-5.png"],
            participation: "Atuei tanto no back-end quanto no front-end para deixar o projeto funcional."
        },
        {
            id: "gamevault",
            name: "Game Vault",
            tagline: "App de loja de keys de jogos digitais",
            description: "Aplicativo mobile de loja de keys de jogos digitais, inspirado em lojas como Nuuvem e G2A.",
            categories: ["mobile", "back"],
            technologies: ["React Native", "Node.js", "SQLite"],
            githubLink: "https://github.com/marcelo-almeida-de-araujo/mada-game-vault",
            screenshots: ["gamevault-1.png", "gamevault-2.png", "gamevault-3.png", "gamevault-4.png", "gamevault-5.png", "gamevault-6.png"],
            participation: "Atuei tanto no back-end quanto no front-end para deixar o aplicativo funcional."
        }
    ]
};
