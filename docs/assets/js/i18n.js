/*
 * Textos fixos da interface em português (pt) e inglês (en).
 * No HTML, elementos com data-i18n="chave" recebem o texto correspondente.
 * Variações: data-i18n-placeholder, data-i18n-aria-label e data-i18n-title.
 * Textos com {n} recebem valores dinâmicos pela função t(chave, { n: ... }).
 */
const translations = {
    pt: {
        "meta.title": "Marcelo Almeida de Araujo | Portfólio",
        "meta.description": "Portfólio de Marcelo Almeida de Araujo — Consultor de Tecnologia e Desenvolvedor Full Stack.",

        "nav.home": "Início",
        "nav.profile": "Perfil",
        "nav.skills": "Habilidades",
        "nav.journey": "Trajetória",
        "nav.projects": "Projetos",
        "nav.contact": "Contato",
        "nav.menu": "Abrir menu",
        "nav.theme": "Alternar tema claro/escuro",
        "nav.language": "Selecionar idioma",

        "hero.greeting": "Olá, eu sou",
        "hero.lead": "Transformo problemas em soluções com lógica, código e muita curiosidade.",
        "hero.ctaProjects": "Ver projetos",
        "hero.ctaContact": "Fale comigo",
        "hero.photoAlt": "Foto de Marcelo Almeida de Araujo",
        "hero.status": "Disponível para conversar",
        "hero.scrollHint": "Rolar para o perfil",

        "stats.projects": "Projetos acadêmicos",
        "stats.experience": "Experiências",
        "stats.certifications": "Certificações",
        "stats.technologies": "Tecnologias",

        "profile.title": "Perfil",
        "profile.about": "Sobre mim",
        "profile.languages": "Idiomas",
        "profile.competencies": "Competências",

        "skills.title": "Habilidades",
        "skills.level": "Nível técnico",
        "skills.tech": "Tecnologias",

        "journey.title": "Trajetória",
        "journey.experience": "Experiência",
        "journey.education": "Formação",
        "journey.certifications": "Certificações",

        "projects.title": "Projetos",
        "projects.badge": "Projeto {n}",
        "projects.details": "Detalhes",
        "projects.screens": "Ver {n} telas",
        "projects.openAria": "Ver detalhes de {n}",
        "projects.screenAlt": "Tela do projeto {n}",
        "projects.screenN": "Tela {n}",
        "projects.about": "Sobre o projeto",
        "projects.participation": "Minha participação",
        "projects.technologies": "Tecnologias",
        "projects.code": "Ver código",
        "filter.all": "Todos",
        "filter.front": "Front-end",
        "filter.back": "Back-end",
        "filter.mobile": "Mobile",
        "carousel.prev": "Anterior",
        "carousel.next": "Próximo",

        "github.title": "Atividade recente no GitHub",
        "github.note": "Carregado em tempo real pela API do GitHub",
        "github.loading": "Carregando...",
        "github.noDescription": "Repositório público",
        "github.error": "Não foi possível carregar agora — veja todos os repositórios no GitHub",

        "contact.title": "Contato",
        "contact.lead": "Tem um projeto, uma vaga ou só quer trocar uma ideia? Me mande uma mensagem!",
        "contact.email": "E-mail",
        "contact.copy": "Copiar e-mail",
        "contact.mapTitle": "Mapa de São Paulo",
        "contact.formTitle": "Envie uma mensagem",
        "contact.name": "Nome",
        "contact.namePh": "Seu nome",
        "contact.nameError": "Informe seu nome.",
        "contact.emailPh": "voce@email.com",
        "contact.emailError": "Informe um e-mail válido.",
        "contact.subject": "Assunto",
        "contact.choose": "Escolha...",
        "contact.subjectJob": "Oportunidade de trabalho",
        "contact.subjectProject": "Proposta de projeto",
        "contact.subjectMentoring": "Dúvida / mentoria",
        "contact.subjectOther": "Outro assunto",
        "contact.subjectError": "Escolha um assunto.",
        "contact.message": "Mensagem",
        "contact.messageError": "Escreva uma mensagem com pelo menos 10 caracteres.",
        "contact.send": "Enviar mensagem",
        "contact.mailPrefix": "[Portfólio]",

        "toast.invalid": "Confira os campos destacados.",
        "toast.sent": "Abrindo seu aplicativo de e-mail... Obrigado pelo contato!",
        "toast.copied": "E-mail copiado para a área de transferência!",
        "toast.language": "Idioma alterado para Português",

        "footer.made": "Feito com HTML, CSS, JavaScript e Bootstrap",
        "common.close": "Fechar",
        "common.backToTop": "Voltar ao topo"
    },

    en: {
        "meta.title": "Marcelo Almeida de Araujo | Portfolio",
        "meta.description": "Portfolio of Marcelo Almeida de Araujo — Technology Consultant and Full Stack Developer.",

        "nav.home": "Home",
        "nav.profile": "Profile",
        "nav.skills": "Skills",
        "nav.journey": "Journey",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "nav.menu": "Open menu",
        "nav.theme": "Toggle light/dark theme",
        "nav.language": "Select language",

        "hero.greeting": "Hi, I'm",
        "hero.lead": "I turn problems into solutions with logic, code and plenty of curiosity.",
        "hero.ctaProjects": "See projects",
        "hero.ctaContact": "Get in touch",
        "hero.photoAlt": "Photo of Marcelo Almeida de Araujo",
        "hero.status": "Open to chat",
        "hero.scrollHint": "Scroll to profile",

        "stats.projects": "Academic projects",
        "stats.experience": "Experiences",
        "stats.certifications": "Certifications",
        "stats.technologies": "Technologies",

        "profile.title": "Profile",
        "profile.about": "About me",
        "profile.languages": "Languages",
        "profile.competencies": "Competencies",

        "skills.title": "Skills",
        "skills.level": "Technical level",
        "skills.tech": "Technologies",

        "journey.title": "Journey",
        "journey.experience": "Experience",
        "journey.education": "Education",
        "journey.certifications": "Certifications",

        "projects.title": "Projects",
        "projects.badge": "Project {n}",
        "projects.details": "Details",
        "projects.screens": "View {n} screens",
        "projects.openAria": "View details of {n}",
        "projects.screenAlt": "Screen of the {n} project",
        "projects.screenN": "Screen {n}",
        "projects.about": "About the project",
        "projects.participation": "My role",
        "projects.technologies": "Technologies",
        "projects.code": "View code",
        "filter.all": "All",
        "filter.front": "Front-end",
        "filter.back": "Back-end",
        "filter.mobile": "Mobile",
        "carousel.prev": "Previous",
        "carousel.next": "Next",

        "github.title": "Recent activity on GitHub",
        "github.note": "Loaded in real time from the GitHub API",
        "github.loading": "Loading...",
        "github.noDescription": "Public repository",
        "github.error": "Couldn't load right now — see all repositories on GitHub",

        "contact.title": "Contact",
        "contact.lead": "Have a project, a job opening or just want to chat? Send me a message!",
        "contact.email": "Email",
        "contact.copy": "Copy email",
        "contact.mapTitle": "Map of São Paulo",
        "contact.formTitle": "Send a message",
        "contact.name": "Name",
        "contact.namePh": "Your name",
        "contact.nameError": "Please enter your name.",
        "contact.emailPh": "you@email.com",
        "contact.emailError": "Please enter a valid email.",
        "contact.subject": "Subject",
        "contact.choose": "Choose...",
        "contact.subjectJob": "Job opportunity",
        "contact.subjectProject": "Project proposal",
        "contact.subjectMentoring": "Question / mentoring",
        "contact.subjectOther": "Something else",
        "contact.subjectError": "Please choose a subject.",
        "contact.message": "Message",
        "contact.messageError": "Write a message with at least 10 characters.",
        "contact.send": "Send message",
        "contact.mailPrefix": "[Portfolio]",

        "toast.invalid": "Please check the highlighted fields.",
        "toast.sent": "Opening your email app... Thanks for reaching out!",
        "toast.copied": "Email copied to clipboard!",
        "toast.language": "Language changed to English",

        "footer.made": "Made with HTML, CSS, JavaScript and Bootstrap",
        "common.close": "Close",
        "common.backToTop": "Back to top"
    }
};

/* Idiomas disponíveis no seletor */
const availableLanguages = [
    { code: "pt", label: "Português", short: "PT", flag: "assets/img/flags/br.svg", htmlLang: "pt-BR", locale: "pt-BR" },
    { code: "en", label: "English", short: "EN", flag: "assets/img/flags/us.svg", htmlLang: "en", locale: "en-US" }
];
