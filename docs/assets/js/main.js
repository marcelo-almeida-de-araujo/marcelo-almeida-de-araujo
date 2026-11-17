/* =========================================================
   Portfólio — Marcelo Almeida de Araujo
   Renderiza o conteúdo a partir de data.js (no idioma atual)
   e controla os recursos interativos (idioma, tema, animações,
   carousel, filtros...).
   ========================================================= */

const IMG_PATH = "assets/img/projects/";
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel) => document.querySelector(sel);

/* ---------- Utilitários ---------- */
function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}
function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* armazenamento indisponível */ }
}
function showToast(message) {
    $("#toastBody").textContent = message;
    bootstrap.Toast.getOrCreateInstance($("#feedbackToast"), { delay: 3500 }).show();
}

/* =========================================================
   0. IDIOMA (i18n)
   ========================================================= */

/*
 * Idioma inicial: se o visitante já escolheu um idioma no seletor, ele é mantido.
 * Caso contrário, usa o idioma do navegador: português (pt, pt-BR, pt-PT...) → pt;
 * qualquer outro → en.
 */
function detectLanguage() {
    const saved = storageGet("lang");
    if (saved && translations[saved]) return saved;
    const browserLang = (navigator.language || "").toLowerCase();
    return browserLang.startsWith("pt") ? "pt" : "en";
}

let currentLang = detectLanguage();

/* Texto da interface (i18n.js). Ex.: t("projects.screens", { n: 4 }) */
function t(key, params = {}) {
    const text = (translations[currentLang] && translations[currentLang][key]) || translations.pt[key] || key;
    return text.replace(/\{(\w+)\}/g, (_, name) => (name in params ? params[name] : `{${name}}`));
}

/* Valor bilíngue do data.js: { pt, en } → texto do idioma atual; strings simples passam direto */
function tr(value) {
    if (value && typeof value === "object" && !Array.isArray(value) && ("pt" in value || "en" in value)) {
        return value[currentLang] !== undefined ? value[currentLang] : value.pt;
    }
    return value;
}

function langInfo(code = currentLang) {
    return availableLanguages.find(l => l.code === code) || availableLanguages[0];
}

/* Aplica as traduções nos elementos estáticos marcados no HTML */
function applyStaticTranslations() {
    const info = langInfo();
    document.documentElement.lang = info.htmlLang;
    document.title = t("meta.title");

    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    const attrMap = { i18nPlaceholder: "placeholder", i18nAriaLabel: "aria-label", i18nTitle: "title", i18nAlt: "alt", i18nContent: "content" };
    Object.entries(attrMap).forEach(([dataKey, attr]) => {
        const selector = `[data-${dataKey.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}]`;
        document.querySelectorAll(selector).forEach(el => el.setAttribute(attr, t(el.dataset[dataKey])));
    });
}

/* Seletor de idioma customizado (acessível por mouse, toque e teclado) */
function initLanguageSelect() {
    const wrapper = $("#langSelect");
    const toggle = $("#langToggle");
    const list = $("#langList");

    list.innerHTML = availableLanguages.map(l => `
        <li class="lang-option" role="option" id="lang-opt-${l.code}" data-lang="${l.code}" aria-selected="false">
            <img class="lang-flag" src="${l.flag}" alt="">
            <span class="lang-label">${l.label}</span>
            <span class="lang-short">${l.short}</span>
            <i class="bi bi-check2 lang-check"></i>
        </li>`).join("");
    const options = [...list.querySelectorAll(".lang-option")];
    let activeIndex = 0;

    const setActive = (i) => {
        activeIndex = (i + options.length) % options.length;
        options.forEach((o, idx) => o.classList.toggle("focused", idx === activeIndex));
        list.setAttribute("aria-activedescendant", options[activeIndex].id);
    };
    const open = () => {
        wrapper.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        setActive(options.findIndex(o => o.dataset.lang === currentLang));
        list.focus();
    };
    const close = (focusToggle = true) => {
        wrapper.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        if (focusToggle) toggle.focus();
    };
    const choose = (code) => {
        close();
        if (code !== currentLang) {
            storageSet("lang", code);
            setLanguage(code);
            showToast(t("toast.language"));
        }
    };

    toggle.addEventListener("click", () => (wrapper.classList.contains("open") ? close() : open()));
    toggle.addEventListener("keydown", (e) => {
        if (["ArrowDown", "ArrowUp"].includes(e.key)) { e.preventDefault(); open(); }
    });
    list.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); setActive(activeIndex + 1); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActive(activeIndex - 1); }
        else if (e.key === "Home") { e.preventDefault(); setActive(0); }
        else if (e.key === "End") { e.preventDefault(); setActive(options.length - 1); }
        else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(options[activeIndex].dataset.lang); }
        else if (e.key === "Escape") { e.preventDefault(); close(); }
        else if (e.key === "Tab") { close(false); }
    });
    options.forEach((o, i) => {
        o.addEventListener("click", () => choose(o.dataset.lang));
        o.addEventListener("mousemove", () => setActive(i));
    });
    document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target) && wrapper.classList.contains("open")) close(false);
    });
}

/* Atualiza o botão do seletor com o idioma atual */
function updateLanguageSelect() {
    const info = langInfo();
    $("#langCurrentFlag").src = info.flag;
    $("#langCurrentCode").textContent = info.short;
    document.querySelectorAll(".lang-option").forEach(o => o.setAttribute("aria-selected", String(o.dataset.lang === currentLang)));
}

/* Troca o idioma e redesenha tudo sem recarregar a página */
function setLanguage(code) {
    currentLang = code;
    applyStaticTranslations();
    updateLanguageSelect();
    renderAll();
    finishVisibleAnimations();
    restartTyping();
    renderGithubRepos();
    if (openProjectId && $("#projectModal").classList.contains("show")) openProjectModal(openProjectId);
}

/* =========================================================
   1. RENDERIZAÇÃO DO CONTEÚDO
   ========================================================= */
function renderSocial(container) {
    const p = portfolioData.personalInfo;
    container.innerHTML = `
        <a class="social-btn" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
        <a class="social-btn" href="${p.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="bi bi-github"></i></a>
        <a class="social-btn" href="mailto:${p.email}" aria-label="${t("contact.email")}"><i class="bi bi-envelope-fill"></i></a>
    `;
}

function renderStats() {
    const d = portfolioData;
    const stats = [
        { value: d.projects.length, suffix: "+", label: t("stats.projects") },
        { value: d.experience.length, suffix: "", label: t("stats.experience") },
        { value: d.certifications.length, suffix: "", label: t("stats.certifications") },
        { value: d.technologies.length, suffix: "+", label: t("stats.technologies") }
    ];
    $("#stats").innerHTML = stats.map((s, i) => `
        <div class="col-6 col-md-3 reveal" style="transition-delay:${i * 0.1}s">
            <div class="stat">
                <div class="stat-number"><span class="counter" data-target="${s.value}">0</span>${s.suffix}</div>
                <div class="stat-label">${s.label}</div>
            </div>
        </div>`).join("");
}

function renderProfile() {
    const p = portfolioData.personalInfo;
    const job = portfolioData.experience[0];
    const degree = portfolioData.education[1];
    $("#aboutText").innerHTML = tr(p.aboutText).map(text => `<p>${text}</p>`).join("");
    $("#infoList").innerHTML = `
        <li><i class="bi bi-geo-alt-fill"></i>${tr(p.location)}</li>
        <li><i class="bi bi-briefcase-fill"></i>${tr(job.position)} · ${job.company}</li>
        <li><i class="bi bi-mortarboard-fill"></i>${tr(degree.course)} · ${degree.institution}</li>
    `;
    $("#languagesContainer").innerHTML = portfolioData.languages.map(l => `
        <div class="skill">
            <div class="skill-top"><span>${tr(l.language)}</span><span>${tr(l.level)}</span></div>
            <div class="skill-track"><div class="skill-fill" data-width="${l.percent}"></div></div>
        </div>`).join("");
    $("#softSkills").innerHTML = portfolioData.softSkills.map(s => `<span class="chip">${tr(s)}</span>`).join("");
}

function renderSkills() {
    $("#skillBars").innerHTML = portfolioData.skills.map(s => `
        <div class="skill">
            <div class="skill-top"><span>${tr(s.name)}</span><span class="skill-value" data-target="${s.level}">0%</span></div>
            <div class="skill-track" role="progressbar" aria-label="${tr(s.name)}" aria-valuenow="${s.level}" aria-valuemin="0" aria-valuemax="100">
                <div class="skill-fill" data-width="${s.level}"></div>
            </div>
        </div>`).join("");

    $("#techGrid").innerHTML = portfolioData.technologies.map(tech => `
        <div class="tech-item" title="${tech.name}">
            <img src="${DEVICON}${tech.icon}" alt="" loading="lazy">
            <span>${tech.name}</span>
        </div>`).join("");
}

function renderTimeline() {
    $("#experienceTimeline").innerHTML = portfolioData.experience.map(e => `
        <div class="timeline-item">
            <div class="timeline-date"><i class="bi bi-calendar3 me-1"></i>${tr(e.period)}</div>
            <h3>${tr(e.position)}</h3>
            <div class="meta"><i class="bi bi-building me-1"></i>${e.company} · ${tr(e.location)}</div>
            <ul>${tr(e.activities).map(a => `<li>${a}</li>`).join("")}</ul>
        </div>`).join("");

    $("#educationTimeline").innerHTML = portfolioData.education.map(e => `
        <div class="timeline-item">
            <div class="timeline-date"><i class="bi bi-calendar3 me-1"></i>${tr(e.period)}</div>
            <h3>${tr(e.course)}</h3>
            <div class="meta"><i class="bi bi-bank me-1"></i>${e.institution}</div>
        </div>`).join("");

    $("#certificationsGrid").innerHTML = portfolioData.certifications.map(c => `
        <div class="col-md-6">
            <div class="cert-card">
                <div class="cert-icon"><i class="bi ${c.icon}"></i></div>
                <div>
                    <strong>${tr(c.name)}</strong>
                    <div class="small text-body-secondary">${tr(c.issuer)}</div>
                </div>
            </div>
        </div>`).join("");
}

/* Carousel de destaque: recriado a cada troca de idioma, mantendo o slide atual */
let featuredIndex = 0;
function renderFeaturedCarousel() {
    const carouselEl = $("#featuredCarousel");
    const old = bootstrap.Carousel.getInstance(carouselEl);
    if (old) old.dispose();

    const projects = portfolioData.projects;
    $("#featuredIndicators").innerHTML = projects.map((p, i) => `
        <button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}"
            ${i === featuredIndex ? 'class="active" aria-current="true"' : ""} aria-label="${tr(p.name)}"></button>`).join("");

    $("#featuredInner").innerHTML = projects.map((p, i) => `
        <div class="carousel-item ${i === featuredIndex ? "active" : ""}">
            <img src="${IMG_PATH}${p.screenshots[0]}" alt="${t("projects.screenAlt", { n: tr(p.name) })}">
            <div class="carousel-caption">
                <span class="badge rounded-pill text-bg-danger mb-2">${t("projects.badge", { n: String(i + 1).padStart(2, "0") })}</span>
                <h3>${tr(p.name)}</h3>
                <p>${tr(p.description)}</p>
                <div>
                    ${p.technologies.slice(0, 4).map(tech => `<span class="badge badge-tech me-1">${tech}</span>`).join("")}
                    <button class="btn btn-sm btn-accent ms-2" data-open-project="${p.id}">${t("projects.details")} <i class="bi bi-arrow-right"></i></button>
                </div>
            </div>
        </div>`).join("");

    new bootstrap.Carousel(carouselEl, { interval: 5000, ride: "carousel", pause: "hover" });
    restartCarouselBar();
}

function restartCarouselBar() {
    const bar = $("#featuredCarousel .carousel-progress span");
    bar.classList.remove("run");
    void bar.offsetWidth; // força reflow para reiniciar a animação
    bar.classList.add("run");
}

function renderProjects() {
    $("#projectsGrid").innerHTML = portfolioData.projects.map((p, i) => `
        <div class="col-md-6 project-col reveal" data-categories="${p.categories.join(" ")}" style="transition-delay:${(i % 2) * 0.1}s">
            <article class="project-card" data-open-project="${p.id}" tabindex="0" role="button" aria-label="${t("projects.openAria", { n: tr(p.name) })}">
                <div class="project-thumb">
                    <img src="${IMG_PATH}${p.screenshots[0]}" alt="${t("projects.screenAlt", { n: tr(p.name) })}" loading="lazy">
                    <div class="project-overlay"><span><i class="bi bi-images me-2"></i>${t("projects.screens", { n: p.screenshots.length })}</span></div>
                </div>
                <div class="project-body">
                    <h3>${tr(p.name)}</h3>
                    <p>${tr(p.tagline)}</p>
                    <div>${p.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join("")}</div>
                </div>
            </article>
        </div>`).join("");
    applyFilter(currentFilter, false);
}

function renderContact() {
    const p = portfolioData.personalInfo;
    $("#contactCards").innerHTML = `
        <div class="contact-card">
            <div class="cert-icon"><i class="bi bi-envelope-fill"></i></div>
            <a href="mailto:${p.email}" class="text-reset text-decoration-none"><small>${t("contact.email")}</small><span class="value">${p.email}</span></a>
            <button class="btn btn-link copy-btn" id="copyEmail" aria-label="${t("contact.copy")}" title="${t("contact.copy")}"><i class="bi bi-clipboard"></i></button>
        </div>
        <a class="contact-card" href="${p.linkedin}" target="_blank" rel="noopener">
            <div class="cert-icon"><i class="bi bi-linkedin"></i></div>
            <div><small>LinkedIn</small><span class="value">in/${p.linkedin.split("/in/")[1].replace("/", "")}</span></div>
        </a>
        <a class="contact-card" href="${p.github}" target="_blank" rel="noopener">
            <div class="cert-icon"><i class="bi bi-github"></i></div>
            <div><small>GitHub</small><span class="value">@${p.githubUser}</span></div>
        </a>
    `;
}

function renderAll() {
    renderSocial($("#heroSocial"));
    renderSocial($("#footerSocial"));
    renderStats();
    renderProfile();
    renderSkills();
    renderTimeline();
    renderFeaturedCarousel();
    renderProjects();
    renderContact();
    observeReveals();
}

/* =========================================================
   2. MODAL DE PROJETO COM CAROUSEL DE TELAS
   ========================================================= */
let modalCount = 0;
let openProjectId = null;
function openProjectModal(id) {
    const p = portfolioData.projects.find(x => x.id === id);
    if (!p) return;
    openProjectId = id;
    const cid = `modalCarousel${++modalCount}`;
    const name = tr(p.name);

    $("#projectModalTitle").textContent = name;
    $("#projectModalBody").innerHTML = `
        <div id="${cid}" class="carousel slide modal-carousel">
            <div class="carousel-inner">
                ${p.screenshots.map((s, i) => `
                    <div class="carousel-item ${i === 0 ? "active" : ""}">
                        <img src="${IMG_PATH}${s}" alt="${t("projects.screenN", { n: i + 1 })} — ${name}">
                    </div>`).join("")}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${cid}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span><span class="visually-hidden">${t("carousel.prev")}</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${cid}" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span><span class="visually-hidden">${t("carousel.next")}</span>
            </button>
        </div>
        <div class="modal-thumbs">
            ${p.screenshots.map((s, i) => `
                <button type="button" data-bs-target="#${cid}" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}" aria-label="${t("projects.screenN", { n: i + 1 })}">
                    <img src="${IMG_PATH}${s}" alt="">
                </button>`).join("")}
        </div>
        <div class="row g-4 mt-1">
            <div class="col-md-8">
                <h3 class="h6 text-accent text-uppercase">${t("projects.about")}</h3>
                <p>${tr(p.description)}</p>
                <h3 class="h6 text-accent text-uppercase mt-3">${t("projects.participation")}</h3>
                <p class="mb-0">${tr(p.participation)}</p>
            </div>
            <div class="col-md-4">
                <h3 class="h6 text-accent text-uppercase">${t("projects.technologies")}</h3>
                <div class="mb-3">${p.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join("")}</div>
                <a href="${p.githubLink}" target="_blank" rel="noopener" class="btn btn-accent w-100">
                    <i class="bi bi-github me-2"></i>${t("projects.code")}
                </a>
            </div>
        </div>
    `;

    // Sincroniza as miniaturas com o slide ativo
    const carouselEl = document.getElementById(cid);
    const thumbs = $("#projectModalBody").querySelectorAll(".modal-thumbs button");
    carouselEl.addEventListener("slid.bs.carousel", (e) => {
        thumbs.forEach((thumb, i) => thumb.classList.toggle("active", i === e.to));
    });
    bootstrap.Carousel.getOrCreateInstance(carouselEl, { interval: false, touch: true });

    bootstrap.Modal.getOrCreateInstance($("#projectModal")).show();
}

document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-project]");
    if (trigger) openProjectModal(trigger.dataset.openProject);
});
document.addEventListener("keydown", (e) => {
    const card = e.target.closest && e.target.closest(".project-card");
    if (card && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        openProjectModal(card.dataset.openProject);
    }
});

/* =========================================================
   3. RECURSOS INTERATIVOS
   ========================================================= */

/* Tema claro/escuro com preferência salva */
function initTheme() {
    const btn = $("#themeToggle");
    const apply = (theme) => {
        document.documentElement.setAttribute("data-bs-theme", theme);
        btn.innerHTML = theme === "dark" ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    };
    apply(document.documentElement.getAttribute("data-bs-theme") || "dark");
    btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
        apply(next);
        storageSet("theme", next);
    });
}

/* Efeito de digitação no topo (reinicia ao trocar de idioma) */
let typingTimer = null;
function restartTyping() {
    const el = $("#typedText");
    const roles = tr(portfolioData.personalInfo.roles);
    clearTimeout(typingTimer);
    if (reduceMotion) { el.textContent = roles[0]; return; }
    let roleIndex = 0, charIndex = 0, deleting = false;
    (function tick() {
        const word = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        el.textContent = word.slice(0, charIndex);
        let delay = deleting ? 40 : 85;
        if (!deleting && charIndex === word.length) { delay = 1800; deleting = true; }
        else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
        typingTimer = setTimeout(tick, delay);
    })();
}

/* Contador numérico animado */
function animateCounter(el, target, suffix = "") {
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const duration = 1400;
    const start = performance.now();
    (function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    })(start);
}

/* Revela elementos ao rolar + dispara barras e contadores */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        el.querySelectorAll(".skill-fill").forEach(bar => { bar.style.width = bar.dataset.width + "%"; });
        el.querySelectorAll(".skill-value").forEach(v => animateCounter(v, +v.dataset.target, "%"));
        el.querySelectorAll(".counter").forEach(c => animateCounter(c, +c.dataset.target));
        revealObserver.unobserve(el);
    });
}, { threshold: 0.15 });

function observeReveals() {
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => revealObserver.observe(el));
}

/* Após trocar o idioma, o conteúdo de blocos já revelados é recriado:
   mostra barras e números já no valor final, sem repetir a animação */
function finishVisibleAnimations() {
    document.querySelectorAll(".reveal.visible .skill-fill").forEach(bar => { bar.style.width = bar.dataset.width + "%"; });
    document.querySelectorAll(".reveal.visible .skill-value").forEach(v => { v.textContent = v.dataset.target + "%"; });
}

/* Navbar que muda ao rolar, barra de progresso e botão de topo */
function initScrollUI() {
    const navbar = $("#navbar");
    const progress = $("#scrollProgress");
    const backToTop = $("#backToTop");
    const onScroll = () => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        navbar.classList.toggle("scrolled", y > 30);
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
        backToTop.classList.toggle("show", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

    // Fecha o menu mobile ao clicar em um link
    const menu = $("#navMenu");
    menu.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
        if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }));

    // Barra de tempo do carousel de destaque reinicia a cada troca de slide
    $("#featuredCarousel").addEventListener("slid.bs.carousel", (e) => {
        featuredIndex = e.to;
        restartCarouselBar();
    });
}

/* Filtro de projetos por categoria */
let currentFilter = "all";
function applyFilter(filter, animate = true) {
    currentFilter = filter;
    document.querySelectorAll(".btn-filter").forEach(b => b.classList.toggle("active", b.dataset.filter === filter));
    document.querySelectorAll(".project-col").forEach(col => {
        const match = filter === "all" || col.dataset.categories.split(" ").includes(filter);
        if (match) {
            col.classList.remove("d-none-filter");
            void col.offsetWidth; // reflow: garante que a transição de entrada aconteça
            col.classList.remove("hide");
        } else if (!animate) {
            col.classList.add("hide", "d-none-filter");
        } else {
            col.classList.add("hide");
            setTimeout(() => { if (col.classList.contains("hide")) col.classList.add("d-none-filter"); }, 350);
        }
    });
}
function initFilters() {
    document.querySelectorAll(".btn-filter").forEach(btn => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));
}

/* Inclinação 3D dos cards de projeto acompanhando o mouse (delegação de eventos) */
function initTilt() {
    if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
    const grid = $("#projectsGrid");
    grid.addEventListener("mousemove", (e) => {
        const card = e.target.closest(".project-card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-6px)`;
    });
    grid.addEventListener("mouseout", (e) => {
        const card = e.target.closest(".project-card");
        if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
    });
}

/* Repositórios recentes pela API pública do GitHub (busca uma vez, redesenha por idioma) */
let githubRepos = null; // null = carregando, [] = erro
async function loadGithubRepos() {
    const user = portfolioData.personalInfo.githubUser;
    try {
        const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=12`);
        if (!res.ok) throw new Error(res.status);
        githubRepos = (await res.json())
            .filter(r => !r.fork && r.name.toLowerCase() !== user.toLowerCase())
            .slice(0, 6);
    } catch (err) {
        githubRepos = [];
    }
    renderGithubRepos();
}

function renderGithubRepos() {
    if (githubRepos === null) return; // ainda carregando: o spinner continua
    const container = $("#githubRepos");
    const langColors = { JavaScript: "#f1e05a", Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219", PHP: "#4F5D95", TypeScript: "#3178c6" };
    if (!githubRepos.length) {
        container.innerHTML = `
            <div class="col-12">
                <a class="repo-card text-center" href="${portfolioData.personalInfo.github}" target="_blank" rel="noopener">
                    <i class="bi bi-github me-2"></i>${t("github.error")}
                </a>
            </div>`;
        return;
    }
    container.innerHTML = githubRepos.map(r => `
        <div class="col-sm-6 col-lg-4">
            <a class="repo-card" href="${r.html_url}" target="_blank" rel="noopener">
                <h4><i class="bi bi-journal-code me-2 text-accent"></i>${r.name}</h4>
                <p class="small text-body-secondary mb-2">${r.description ? r.description : t("github.noDescription")}</p>
                <div class="repo-meta">
                    ${r.language ? `<span><span class="lang-dot" style="background:${langColors[r.language] || "var(--accent-2)"}"></span>${r.language}</span>` : ""}
                    <span><i class="bi bi-clock-history me-1"></i>${new Date(r.pushed_at).toLocaleDateString(langInfo().locale)}</span>
                </div>
            </a>
        </div>`).join("");
}

/* Formulário de contato com validação Bootstrap + envio via mailto */
function initContactForm() {
    const form = $("#contactForm");
    const message = $("#contactMessage");
    message.addEventListener("input", () => { $("#charCount").textContent = message.value.length; });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            showToast(t("toast.invalid"));
            return;
        }
        const select = $("#contactSubject");
        const name = $("#contactName").value.trim();
        const email = $("#contactEmail").value.trim();
        const subject = select.options[select.selectedIndex].text;
        const body = `${message.value.trim()}\n\n— ${name} (${email})`;
        const to = portfolioData.personalInfo.email;
        window.location.href = `mailto:${to}?subject=${encodeURIComponent(`${t("contact.mailPrefix")} ${subject}`)}&body=${encodeURIComponent(body)}`;
        showToast(t("toast.sent"));
        form.reset();
        form.classList.remove("was-validated");
        $("#charCount").textContent = "0";
    });

    // Copiar e-mail (delegação, pois o cartão é recriado ao trocar o idioma)
    $("#contactCards").addEventListener("click", async (e) => {
        if (!e.target.closest("#copyEmail")) return;
        try {
            await navigator.clipboard.writeText(portfolioData.personalInfo.email);
            showToast(t("toast.copied"));
        } catch (err) {
            showToast(portfolioData.personalInfo.email);
        }
    });
}

/* =========================================================
   4. INICIALIZAÇÃO
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    $("#year").textContent = new Date().getFullYear();

    initLanguageSelect();
    applyStaticTranslations();
    updateLanguageSelect();
    renderAll();

    initTheme();
    restartTyping();
    initScrollUI();
    initFilters();
    initTilt();
    initContactForm();
    loadGithubRepos();
});
