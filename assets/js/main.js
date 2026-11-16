/* =========================================================
   Portfólio — Marcelo Almeida de Araujo
   Renderiza o conteúdo a partir de data.js e controla os
   recursos interativos (tema, animações, carousel, filtros...).
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
   1. RENDERIZAÇÃO DO CONTEÚDO
   ========================================================= */
function renderSocial(container) {
    const p = portfolioData.personalInfo;
    container.innerHTML = `
        <a class="social-btn" href="${p.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
        <a class="social-btn" href="${p.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="bi bi-github"></i></a>
        <a class="social-btn" href="mailto:${p.email}" aria-label="E-mail"><i class="bi bi-envelope-fill"></i></a>
    `;
}

function renderStats() {
    const d = portfolioData;
    const stats = [
        { value: d.projects.length, suffix: "+", label: "Projetos acadêmicos" },
        { value: d.experience.length, suffix: "", label: "Experiências" },
        { value: d.certifications.length, suffix: "", label: "Certificações" },
        { value: d.technologies.length, suffix: "+", label: "Tecnologias" }
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
    $("#aboutText").innerHTML = p.aboutText.map(t => `<p>${t}</p>`).join("");
    $("#infoList").innerHTML = `
        <li><i class="bi bi-geo-alt-fill"></i>${p.location}</li>
        <li><i class="bi bi-briefcase-fill"></i>${portfolioData.experience[0].position} · ${portfolioData.experience[0].company}</li>
        <li><i class="bi bi-mortarboard-fill"></i>${portfolioData.education[1].course} · ${portfolioData.education[1].institution}</li>
    `;
    $("#languagesContainer").innerHTML = portfolioData.languages.map(l => `
        <div class="skill">
            <div class="skill-top"><span>${l.language}</span><span>${l.level}</span></div>
            <div class="skill-track"><div class="skill-fill" data-width="${l.percent}"></div></div>
        </div>`).join("");
    $("#softSkills").innerHTML = portfolioData.softSkills.map(s => `<span class="chip">${s}</span>`).join("");
}

function renderSkills() {
    $("#skillBars").innerHTML = portfolioData.skills.map(s => `
        <div class="skill">
            <div class="skill-top"><span>${s.name}</span><span class="skill-value" data-target="${s.level}">0%</span></div>
            <div class="skill-track" role="progressbar" aria-label="${s.name}" aria-valuenow="${s.level}" aria-valuemin="0" aria-valuemax="100">
                <div class="skill-fill" data-width="${s.level}"></div>
            </div>
        </div>`).join("");

    $("#techGrid").innerHTML = portfolioData.technologies.map(t => `
        <div class="tech-item" title="${t.name}">
            <img src="${DEVICON}${t.icon}" alt="" loading="lazy">
            <span>${t.name}</span>
        </div>`).join("");
}

function renderTimeline() {
    $("#experienceTimeline").innerHTML = portfolioData.experience.map(e => `
        <div class="timeline-item">
            <div class="timeline-date"><i class="bi bi-calendar3 me-1"></i>${e.period}</div>
            <h3>${e.position}</h3>
            <div class="meta"><i class="bi bi-building me-1"></i>${e.company} · ${e.location}</div>
            <ul>${e.activities.map(a => `<li>${a}</li>`).join("")}</ul>
        </div>`).join("");

    $("#educationTimeline").innerHTML = portfolioData.education.map(e => `
        <div class="timeline-item">
            <div class="timeline-date"><i class="bi bi-calendar3 me-1"></i>${e.period}</div>
            <h3>${e.course}</h3>
            <div class="meta"><i class="bi bi-bank me-1"></i>${e.institution}</div>
        </div>`).join("");

    $("#certificationsGrid").innerHTML = portfolioData.certifications.map(c => `
        <div class="col-md-6">
            <div class="cert-card">
                <div class="cert-icon"><i class="bi ${c.icon}"></i></div>
                <div>
                    <strong>${c.name}</strong>
                    <div class="small text-body-secondary">${c.issuer}</div>
                </div>
            </div>
        </div>`).join("");
}

function renderFeaturedCarousel() {
    const projects = portfolioData.projects;
    $("#featuredIndicators").innerHTML = projects.map((p, i) => `
        <button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}"
            ${i === 0 ? 'class="active" aria-current="true"' : ""} aria-label="${p.name}"></button>`).join("");

    $("#featuredInner").innerHTML = projects.map((p, i) => `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
            <img src="${IMG_PATH}${p.screenshots[0]}" alt="Tela do projeto ${p.name}">
            <div class="carousel-caption">
                <span class="badge rounded-pill text-bg-danger mb-2">Projeto ${String(i + 1).padStart(2, "0")}</span>
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <div>
                    ${p.technologies.slice(0, 4).map(t => `<span class="badge badge-tech me-1">${t}</span>`).join("")}
                    <button class="btn btn-sm btn-accent ms-2" data-open-project="${p.id}">Detalhes <i class="bi bi-arrow-right"></i></button>
                </div>
            </div>
        </div>`).join("");

    // Barra de tempo do slide: reinicia a cada troca
    const carouselEl = $("#featuredCarousel");
    const bar = carouselEl.querySelector(".carousel-progress span");
    const restartBar = () => {
        bar.classList.remove("run");
        void bar.offsetWidth; // força reflow para reiniciar a animação
        bar.classList.add("run");
    };
    carouselEl.addEventListener("slid.bs.carousel", restartBar);
    restartBar();
}

function renderProjects() {
    $("#projectsGrid").innerHTML = portfolioData.projects.map((p, i) => `
        <div class="col-md-6 project-col reveal" data-categories="${p.categories.join(" ")}" style="transition-delay:${(i % 2) * 0.1}s">
            <article class="project-card" data-open-project="${p.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${p.name}">
                <div class="project-thumb">
                    <img src="${IMG_PATH}${p.screenshots[0]}" alt="Tela do projeto ${p.name}" loading="lazy">
                    <div class="project-overlay"><span><i class="bi bi-images me-2"></i>Ver ${p.screenshots.length} telas</span></div>
                </div>
                <div class="project-body">
                    <h3>${p.name}</h3>
                    <p>${p.tagline}</p>
                    <div>${p.technologies.map(t => `<span class="tech-badge">${t}</span>`).join("")}</div>
                </div>
            </article>
        </div>`).join("");
}

function renderContact() {
    const p = portfolioData.personalInfo;
    $("#contactCards").innerHTML = `
        <div class="contact-card">
            <div class="cert-icon"><i class="bi bi-envelope-fill"></i></div>
            <a href="mailto:${p.email}" class="text-reset text-decoration-none"><small>E-mail</small><span class="value">${p.email}</span></a>
            <button class="btn btn-link copy-btn" id="copyEmail" aria-label="Copiar e-mail"><i class="bi bi-clipboard"></i></button>
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

/* =========================================================
   2. MODAL DE PROJETO COM CAROUSEL DE TELAS
   ========================================================= */
let modalCount = 0;
function openProjectModal(id) {
    const p = portfolioData.projects.find(x => x.id === id);
    if (!p) return;
    const cid = `modalCarousel${++modalCount}`;

    $("#projectModalTitle").textContent = p.name;
    $("#projectModalBody").innerHTML = `
        <div id="${cid}" class="carousel slide modal-carousel">
            <div class="carousel-inner">
                ${p.screenshots.map((s, i) => `
                    <div class="carousel-item ${i === 0 ? "active" : ""}">
                        <img src="${IMG_PATH}${s}" alt="Tela ${i + 1} do projeto ${p.name}">
                    </div>`).join("")}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${cid}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span><span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${cid}" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span><span class="visually-hidden">Próximo</span>
            </button>
        </div>
        <div class="modal-thumbs">
            ${p.screenshots.map((s, i) => `
                <button type="button" data-bs-target="#${cid}" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}" aria-label="Tela ${i + 1}">
                    <img src="${IMG_PATH}${s}" alt="">
                </button>`).join("")}
        </div>
        <div class="row g-4 mt-1">
            <div class="col-md-8">
                <h3 class="h6 text-accent text-uppercase">Sobre o projeto</h3>
                <p>${p.description}</p>
                <h3 class="h6 text-accent text-uppercase mt-3">Minha participação</h3>
                <p class="mb-0">${p.participation}</p>
            </div>
            <div class="col-md-4">
                <h3 class="h6 text-accent text-uppercase">Tecnologias</h3>
                <div class="mb-3">${p.technologies.map(t => `<span class="tech-badge">${t}</span>`).join("")}</div>
                <a href="${p.githubLink}" target="_blank" rel="noopener" class="btn btn-accent w-100">
                    <i class="bi bi-github me-2"></i>Ver código
                </a>
            </div>
        </div>
    `;

    // Sincroniza as miniaturas com o slide ativo
    const carouselEl = document.getElementById(cid);
    const thumbs = $("#projectModalBody").querySelectorAll(".modal-thumbs button");
    carouselEl.addEventListener("slid.bs.carousel", (e) => {
        thumbs.forEach((t, i) => t.classList.toggle("active", i === e.to));
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

/* Efeito de digitação no topo */
function initTyping() {
    const el = $("#typedText");
    const roles = portfolioData.personalInfo.roles;
    if (reduceMotion) { el.textContent = roles[0]; return; }
    let roleIndex = 0, charIndex = 0, deleting = false;
    (function tick() {
        const word = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        el.textContent = word.slice(0, charIndex);
        let delay = deleting ? 40 : 85;
        if (!deleting && charIndex === word.length) { delay = 1800; deleting = true; }
        else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
        setTimeout(tick, delay);
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
function initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add("visible");
            el.querySelectorAll(".skill-fill").forEach(bar => { bar.style.width = bar.dataset.width + "%"; });
            el.querySelectorAll(".skill-value").forEach(v => animateCounter(v, +v.dataset.target, "%"));
            el.querySelectorAll(".counter").forEach(c => animateCounter(c, +c.dataset.target));
            observer.unobserve(el);
        });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
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
}

/* Filtro de projetos por categoria */
function initFilters() {
    const buttons = document.querySelectorAll(".btn-filter");
    const cols = document.querySelectorAll(".project-col");
    buttons.forEach(btn => btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.toggle("active", b === btn));
        const filter = btn.dataset.filter;
        cols.forEach(col => {
            const match = filter === "all" || col.dataset.categories.split(" ").includes(filter);
            if (match) {
                col.classList.remove("d-none-filter");
                void col.offsetWidth; // reflow: garante que a transição de entrada aconteça
                col.classList.remove("hide");
            } else {
                col.classList.add("hide");
                setTimeout(() => { if (col.classList.contains("hide")) col.classList.add("d-none-filter"); }, 350);
            }
        });
    }));
}

/* Inclinação 3D dos cards de projeto acompanhando o mouse */
function initTilt() {
    if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-6px)`;
        });
        card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
}

/* Repositórios recentes pela API pública do GitHub */
async function loadGithubRepos() {
    const container = $("#githubRepos");
    const user = portfolioData.personalInfo.githubUser;
    const langColors = { JavaScript: "#f1e05a", Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219", PHP: "#4F5D95", TypeScript: "#3178c6" };
    try {
        const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=12`);
        if (!res.ok) throw new Error(res.status);
        const repos = (await res.json())
            .filter(r => !r.fork && r.name.toLowerCase() !== user.toLowerCase())
            .slice(0, 6);
        if (!repos.length) throw new Error("vazio");
        container.innerHTML = repos.map(r => `
            <div class="col-sm-6 col-lg-4">
                <a class="repo-card" href="${r.html_url}" target="_blank" rel="noopener">
                    <h4><i class="bi bi-journal-code me-2 text-accent"></i>${r.name}</h4>
                    <p class="small text-body-secondary mb-2">${r.description ? r.description : "Repositório público"}</p>
                    <div class="repo-meta">
                        ${r.language ? `<span><span class="lang-dot" style="background:${langColors[r.language] || "var(--accent-2)"}"></span>${r.language}</span>` : ""}
                        <span><i class="bi bi-clock-history me-1"></i>${new Date(r.pushed_at).toLocaleDateString("pt-BR")}</span>
                    </div>
                </a>
            </div>`).join("");
    } catch (err) {
        container.innerHTML = `
            <div class="col-12">
                <a class="repo-card text-center" href="${portfolioData.personalInfo.github}" target="_blank" rel="noopener">
                    <i class="bi bi-github me-2"></i>Não foi possível carregar agora — veja todos os repositórios no GitHub
                </a>
            </div>`;
    }
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
            showToast("Confira os campos destacados.");
            return;
        }
        const name = $("#contactName").value.trim();
        const email = $("#contactEmail").value.trim();
        const subject = $("#contactSubject").value;
        const body = `${message.value.trim()}\n\n— ${name} (${email})`;
        const to = portfolioData.personalInfo.email;
        window.location.href = `mailto:${to}?subject=${encodeURIComponent(`[Portfólio] ${subject}`)}&body=${encodeURIComponent(body)}`;
        showToast("Abrindo seu aplicativo de e-mail... Obrigado pelo contato!");
        form.reset();
        form.classList.remove("was-validated");
        $("#charCount").textContent = "0";
    });

    // Copiar e-mail para a área de transferência
    $("#copyEmail").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(portfolioData.personalInfo.email);
            showToast("E-mail copiado para a área de transferência!");
        } catch (err) {
            showToast(portfolioData.personalInfo.email);
        }
    });
}

/* =========================================================
   4. INICIALIZAÇÃO
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    renderSocial($("#heroSocial"));
    renderSocial($("#footerSocial"));
    renderStats();
    renderProfile();
    renderSkills();
    renderTimeline();
    renderFeaturedCarousel();
    renderProjects();
    renderContact();

    $("#year").textContent = new Date().getFullYear();

    initTheme();
    initTyping();
    initRevealObserver();
    initScrollUI();
    initFilters();
    initTilt();
    initContactForm();
    loadGithubRepos();

    // Atualiza o scrollspy após o conteúdo dinâmico mudar a altura da página
    const spy = bootstrap.ScrollSpy.getInstance(document.body);
    if (spy) spy.refresh();
});
