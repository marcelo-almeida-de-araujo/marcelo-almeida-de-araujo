/*
 * Dados do portfólio (bilíngue).
 * Todo texto que muda de idioma é um objeto { pt: "...", en: "..." }.
 * O main.js escolhe a versão certa com a função tr() e gera o HTML de cada seção,
 * então para atualizar o portfólio basta editar este arquivo.
 */
const portfolioData = {
    personalInfo: {
        fullName: "Marcelo Almeida de Araujo",
        location: { pt: "São Paulo, SP — Brasil", en: "São Paulo, SP — Brazil" },
        email: "almeidadearaujomarcelo@gmail.com",
        linkedin: "https://www.linkedin.com/in/marcelo-almeida-de-araujo/",
        github: "https://github.com/marcelo-almeida-de-araujo",
        githubUser: "marcelo-almeida-de-araujo",
        profilePicture: "assets/img/profile.jpg",
        // Frases exibidas no efeito de digitação do topo da página
        roles: {
            pt: ["Consultor de Tecnologia", "Desenvolvedor Full Stack", "Monitor de Desenvolvimento Web", "Apaixonado por lógica e desafios"],
            en: ["Technology Consultant", "Full Stack Developer", "Web Development Teaching Assistant", "Passionate about logic and challenges"]
        },
        aboutText: {
            pt: [
                "Sou formado em Desenvolvimento de Software Multiplataforma pela Fatec Itaquera, atuo como Consultor de Tecnologia na Konia Tecnologia e curso o Técnico em Desenvolvimento de Sistemas na Etec.",
                "Entrei na programação porque ela é, essencialmente, uma área de lógica. Gosto de resolver quebra-cabeças, encarar problemas e desafiar a mente constantemente em busca de soluções criativas — e é essa liberdade de transformar ideias em algo concreto, construído do zero, que me motiva todos os dias."
            ],
            en: [
                "I'm a Multiplatform Software Development graduate from Fatec Itaquera, working as a Technology Consultant at Konia Tecnologia and studying Systems Development at Etec.",
                "I got into programming because it's fundamentally a logic-based field. I enjoy solving puzzles, tackling problems and constantly challenging my mind to find creative solutions — and it's this freedom to turn ideas into something real, built from scratch, that motivates me every day."
            ]
        }
    },

    // Habilidades com nível (0–100) usado nas barras animadas
    skills: [
        { name: "HTML & CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React / Next.js", level: 80 },
        { name: "C# / .NET", level: 75 },
        { name: { pt: "SQL / Banco de dados", en: "SQL / Databases" }, level: 80 },
        { name: "Python / Django", level: 65 },
        { name: "PHP", level: 70 },
        { name: "Java / Spring Boot", level: 65 },
        { name: { pt: "Automação (Power Automate / VBA)", en: "Automation (Power Automate / VBA)" }, level: 70 },
        { name: "Git & GitHub", level: 85 }
    ],

    // Ícones de tecnologias: "icon" usa o devicon; "bi" usa um ícone do Bootstrap Icons
    technologies: [
        { name: "C#", icon: "csharp/csharp-original.svg" },
        { name: ".NET", icon: "dotnetcore/dotnetcore-original.svg" },
        { name: "React", icon: "react/react-original.svg" },
        { name: "Supabase", icon: "supabase/supabase-original.svg" },
        { name: "Python", icon: "python/python-original.svg" },
        { name: "Django", icon: "django/django-plain.svg" },
        { name: "HTML5", icon: "html5/html5-original.svg" },
        { name: "CSS3", icon: "css3/css3-original.svg" },
        { name: "JavaScript", icon: "javascript/javascript-original.svg" },
        { name: "Bootstrap", icon: "bootstrap/bootstrap-original.svg" },
        { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
        { name: "PHP", icon: "php/php-original.svg" },
        { name: "Java", icon: "java/java-original.svg" },
        { name: "MySQL", icon: "mysql/mysql-original.svg" },
        { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
        { name: "Git", icon: "git/git-original.svg" },
        { name: "Power Automate", bi: "bi-lightning-charge-fill" },
        { name: "VBA", bi: "bi-file-earmark-code-fill" }
    ],

    softSkills: [
        { pt: "Arquitetura de informação", en: "Information architecture" },
        { pt: "Desenvolvimento de aplicativos móveis", en: "Mobile app development" },
        { pt: "UX / prototipação", en: "UX / prototyping" },
        { pt: "Documentação técnica", en: "Technical documentation" },
        { pt: "Didática e mentoria", en: "Teaching and mentoring" },
        { pt: "Trabalho em equipe", en: "Teamwork" }
    ],

    languages: [
        { language: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" }, percent: 100 },
        { language: { pt: "Inglês", en: "English" }, level: { pt: "Profissional completo (TOEIC)", en: "Full professional (TOEIC)" }, percent: 85 }
    ],

    experience: [
        {
            company: "Konia Tecnologia",
            position: { pt: "Consultor de Tecnologia", en: "Technology Consultant" },
            period: { pt: "jan 2026 — presente", en: "Jan 2026 — present" },
            location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
            activities: {
                pt: [
                    "Desenvolvimento de soluções para diferentes clientes e projetos, com back-end em C#/.NET e front-end web em React",
                    "Uso do Supabase como back-end e banco de dados em projeto de cliente e atuação em back-end Python/Django em outro cliente",
                    "Assessoria, consultoria e planejamento em TI, atuando individualmente e em equipes multidisciplinares com empresas parceiras"
                ],
                en: [
                    "Building solutions for different clients and projects, with C#/.NET back-ends and React web front-ends",
                    "Used Supabase as back-end and database on a client project and worked on a Python/Django back-end for another client",
                    "IT advisory, consulting and planning, working both independently and in multidisciplinary teams with partner companies"
                ]
            }
        },
        {
            company: "Konia Tecnologia",
            position: { pt: "Estagiário/Trainee em Tecnologia (Desenvolvedor)", en: "Technology Intern/Trainee (Developer)" },
            period: { pt: "jun 2025 — dez 2025", en: "Jun 2025 — Dec 2025" },
            location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
            activities: {
                pt: [
                    "Automatizei a formatação de documentos DOCX a partir de templates com Power Automate, VBA e VBScript (primeiro projeto na empresa)",
                    "Apoio no desenvolvimento e na manutenção de sistemas",
                    "Documentação técnica e suporte ao sistema de engenharia",
                    "Produção de materiais para treinamentos"
                ],
                en: [
                    "Automated DOCX document formatting from templates with Power Automate, VBA and VBScript (first project at the company)",
                    "Supported the development and maintenance of systems",
                    "Technical documentation and support for the engineering system",
                    "Creation of training materials"
                ]
            }
        },
        {
            company: "Fatec Itaquera",
            position: { pt: "Estagiário Voluntário de Back-end", en: "Volunteer Back-end Intern" },
            period: { pt: "set 2024 — dez 2024", en: "Sep 2024 — Dec 2024" },
            location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
            activities: {
                pt: [
                    "Modelei o banco de dados da seção de pesquisa com queries SQL",
                    "Desenvolvi uma API CRUD RESTful em PHP",
                    "Estruturei o front-end inicial com React",
                    "Desenvolvi e integrei o front-end completo da seção de pesquisa"
                ],
                en: [
                    "Modeled the research section's database with SQL queries",
                    "Built a RESTful CRUD API in PHP",
                    "Set up the initial front-end structure with React",
                    "Developed and integrated the complete front-end of the research section"
                ]
            }
        },
        {
            company: "Fatec Itaquera",
            position: { pt: "Monitor Voluntário de Desenvolvimento Web I", en: "Volunteer Teaching Assistant — Web Development I" },
            period: { pt: "ago 2024 — dez 2024", en: "Aug 2024 — Dec 2024" },
            location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
            activities: {
                pt: [
                    "Apoio aos alunos em HTML, CSS e JavaScript",
                    "Orientação no desenvolvimento de projetos práticos",
                    "Feedback sobre trabalhos e códigos",
                    "Criação de tutoriais e exemplos de código"
                ],
                en: [
                    "Helped students with HTML, CSS and JavaScript",
                    "Guided the development of hands-on projects",
                    "Gave feedback on assignments and code",
                    "Created tutorials and code examples"
                ]
            }
        },
        {
            company: "Fatec Itaquera",
            position: { pt: "Estagiário Voluntário de Front-end", en: "Volunteer Front-end Intern" },
            period: { pt: "set 2023 — ago 2024", en: "Sep 2023 — Aug 2024" },
            location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
            activities: {
                pt: [
                    "Desenvolvimento do novo website da Fatec Itaquera (HTML, CSS e JavaScript)",
                    "Pesquisa de referências, personas e jornada do usuário",
                    "Protótipos de baixa, média e alta fidelidade",
                    "Colaboração na implantação do novo site"
                ],
                en: [
                    "Developed Fatec Itaquera's new website (HTML, CSS and JavaScript)",
                    "Researched references, personas and user journeys",
                    "Built low, mid and high-fidelity prototypes",
                    "Collaborated on launching the new website"
                ]
            }
        }
    ],

    education: [
        {
            institution: "Etec",
            course: { pt: "Técnico em Desenvolvimento de Sistemas", en: "Systems Development Technician" },
            period: { pt: "Em andamento", en: "In progress" }
        },
        {
            institution: "Fatec Itaquera",
            course: { pt: "Tecnólogo em Desenvolvimento de Software Multiplataforma", en: "Associate Degree in Multiplatform Software Development" },
            period: "2023 — 2026"
        },
        {
            institution: "Universidade Anhembi Morumbi",
            course: { pt: "Tecnólogo em Análise e Desenvolvimento de Sistemas", en: "Associate Degree in Systems Analysis and Development" },
            period: "2022 — 2024"
        },
        {
            institution: "Escola SENAI Anchieta",
            course: { pt: "Técnico em Eletrônica", en: "Electronics Technician" },
            period: "2018 — 2019"
        },
        {
            institution: "Escola SENAI Roberto Simonsen",
            course: { pt: "Aprendizagem Industrial em Manutenção Elétrica", en: "Industrial Apprenticeship in Electrical Maintenance" },
            period: "2016 — 2017"
        }
    ],

    certifications: [
        { name: "AWS Academy Graduate — Cloud Architecture", issuer: "AWS Academy", icon: "bi-cloud-check" },
        { name: "Test of English for International Communication (TOEIC)", issuer: "ETS", icon: "bi-translate" },
        { name: { pt: "Desenvolvedor Back-End", en: "Back-End Developer" }, issuer: { pt: "Formação", en: "Training program" }, icon: "bi-server" },
        { name: { pt: "Git e GitHub: compartilhando e colaborando em projetos", en: "Git and GitHub: sharing and collaborating on projects" }, issuer: "Alura", icon: "bi-git" },
        { name: { pt: "Git e GitHub: controle e compartilhe seu código", en: "Git and GitHub: control and share your code" }, issuer: "Alura", icon: "bi-github" }
    ],

    projects: [
        {
            id: "fatec",
            name: { pt: "Website Fatec Itaquera", en: "Fatec Itaquera Website" },
            tagline: { pt: "Redesign do site institucional com foco em UX/UI", en: "Institutional website redesign focused on UX/UI" },
            description: {
                pt: "Redesign do website institucional da Fatec Itaquera, desenvolvido pela equipe de estágio de front-end, com pesquisa de usuários, personas e protótipos de várias fidelidades.",
                en: "Redesign of Fatec Itaquera's institutional website, built by the front-end internship team, with user research, personas and prototypes at several fidelity levels."
            },
            categories: ["front"],
            technologies: ["HTML", "CSS", "JavaScript"],
            githubLink: "https://github.com/marcelo-almeida-de-araujo/dgm-sa-site-fatec-itaquera",
            screenshots: ["fatec-1.png", "fatec-2.png", "fatec-3.png", "fatec-4.png"],
            participation: {
                pt: "Desenvolvi o front-end do projeto, criei protótipos de diferentes fidelidades e realizei, com a equipe, pesquisas de usuário para definir personas e jornadas.",
                en: "I developed the project's front-end, created prototypes at different fidelity levels and, together with the team, ran user research to define personas and journeys."
            }
        },
        {
            id: "dashboard",
            name: { pt: "Dashboard de Assessoria", en: "Advisory Dashboard" },
            tagline: { pt: "Gestão de informações de clientes", en: "Client information management" },
            description: {
                pt: "Sistema web para gerenciamento de informações de clientes de uma assessoria, com API própria e banco NoSQL.",
                en: "Web system for managing an advisory firm's client information, with its own API and a NoSQL database."
            },
            categories: ["back", "front"],
            technologies: ["Java", "Spring Boot", "MongoDB", "HTML", "CSS", "JavaScript"],
            githubLink: "https://github.com/marcelo-almeida-de-araujo/mada-wb-dashboard",
            screenshots: ["dashboard-1.png", "dashboard-2.png", "dashboard-3.png"],
            participation: {
                pt: "Implementei todo o back-end e atuei no front-end para deixá-lo funcional e integrado à API.",
                en: "I implemented the entire back-end and worked on the front-end to make it functional and integrated with the API."
            }
        },
        {
            id: "conecta",
            name: "Novo Conecta ONGs",
            tagline: { pt: "Plataforma para ONGs/OSCs e voluntários", en: "Platform for NGOs and volunteers" },
            description: {
                pt: "Sistema para gerenciamento de informações sobre ONGs/OSCs e seus voluntários.",
                en: "System for managing information about NGOs and their volunteers."
            },
            categories: ["back", "front"],
            technologies: ["Next.js", "Node.js", "MySQL", "CSS"],
            githubLink: "https://github.com/marcelo-almeida-de-araujo/mada-novo-conecta-ongs",
            screenshots: ["conecta-1.png", "conecta-2.png", "conecta-3.png", "conecta-4.png", "conecta-5.png"],
            participation: {
                pt: "Atuei tanto no back-end quanto no front-end para deixar o projeto funcional.",
                en: "I worked on both the back-end and the front-end to make the project functional."
            }
        },
        {
            id: "gamevault",
            name: "Game Vault",
            tagline: { pt: "App de loja de keys de jogos digitais", en: "Digital game key store app" },
            description: {
                pt: "Aplicativo mobile de loja de keys de jogos digitais, inspirado em lojas como Nuuvem e G2A.",
                en: "Mobile app for a digital game key store, inspired by stores such as Nuuvem and G2A."
            },
            categories: ["mobile", "back"],
            technologies: ["React Native", "Node.js", "SQLite"],
            githubLink: "https://github.com/marcelo-almeida-de-araujo/mada-game-vault",
            screenshots: ["gamevault-1.png", "gamevault-2.png", "gamevault-3.png", "gamevault-4.png", "gamevault-5.png", "gamevault-6.png"],
            participation: {
                pt: "Atuei tanto no back-end quanto no front-end para deixar o aplicativo funcional.",
                en: "I worked on both the back-end and the front-end to make the app functional."
            }
        }
    ]
};
