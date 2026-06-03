const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { SITE, nav, footer, faqs, resources, pages } = require("../src/site-data");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const checkOnly = process.argv.includes("--check");

const routeMap = new Map(pages.map((page) => [page.path, page]));

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(value) {
  return JSON.stringify(value, null, 2).replace(/</g, "\\u003c");
}

function absUrl(pathname) {
  return `${SITE.origin}${pathname === "/" ? "/" : pathname}`;
}

function outputPath(routePath) {
  if (routePath === "/") return path.join(dist, "index.html");
  return path.join(dist, routePath.slice(1), "index.html");
}

function mkdirp(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(filePath, content) {
  mkdirp(filePath);
  fs.writeFileSync(filePath, content);
}

function copyFile(src, dest) {
  mkdirp(dest);
  fs.copyFileSync(src, dest);
}

function currentFor(page, href) {
  return page.path === href || (href !== "/" && page.path.startsWith(`${href}/`));
}

function renderNav(page) {
  return `
    <header class="site-nav">
      <a class="brand" href="/" aria-label="Project Sovereign home">
        <span class="brand-mark">S</span>
        <span class="brand-name">Sovereign</span>
      </a>
      <nav class="nav-links" aria-label="Primary">
        ${nav.map(([label, href]) => `<a href="${href}"${currentFor(page, href) ? ' aria-current="page"' : ""}>${esc(label)}</a>`).join("")}
      </nav>
      <div class="nav-actions">
        <button class="theme-toggle" type="button" aria-label="Switch theme" data-theme-toggle>◐</button>
        <a class="button primary" href="/contact">Deployment review</a>
      </div>
    </header>`;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div>
            <a class="brand" href="/" aria-label="Project Sovereign home">
              <span class="brand-mark">S</span>
              <span class="brand-name">Sovereign</span>
            </a>
            <p>A self-hostable European document suite for institutions that need sovereignty, compliance, and control.</p>
          </div>
          ${footer.map((col) => `
            <div>
              <div class="footer-title">${esc(col.title)}</div>
              <ul>${col.links.map(([label, href]) => `<li><a href="${href}">${esc(label)}</a></li>`).join("")}</ul>
            </div>`).join("")}
        </div>
        <div class="footer-bottom">
          <span>PROJECT SOVEREIGN · ${SITE.updated} · ON-PREM REVIEW AVAILABLE</span>
          <span>BUILT FOR EUROPEAN DOCUMENT SOVEREIGNTY</span>
        </div>
      </div>
    </footer>`;
}

function renderHero(page) {
  const h = page.hero;
  const actions = h.ctas ? `<div class="hero-actions">${h.ctas.map(([label, href, primary]) => `<a class="button${primary ? " primary" : ""}" href="${href}">${esc(label)} <span aria-hidden="true">→</span></a>`).join("")}</div>` : "";
  return `
    <section class="hero${h.home ? " home" : ""}">
      <div class="hero-inner">
        <div class="eyebrow">${esc(h.eyebrow)}</div>
        <h1>${esc(h.title)}</h1>
        <p class="lead">${esc(h.lead)}</p>
        ${actions}
      </div>
    </section>`;
}

function renderCards(cards) {
  if (!cards) return "";
  const klass = cards.length === 2 || cards.length === 4 ? "grid two" : "grid";
  return `<div class="${klass}">
    ${cards.map((card, idx) => {
      const [title, body] = Array.isArray(card) ? card : [card.title, card.body];
      const href = Array.isArray(card) ? card[2] : card.href;
      const tag = href ? "a" : "article";
      return `<${tag} class="card"${href ? ` href="${href}"` : ""}>
        <div class="card-kicker">${String(idx + 1).padStart(2, "0")}</div>
        <h3>${esc(title)}</h3>
        <p>${esc(body)}</p>
      </${tag}>`;
    }).join("")}
  </div>`;
}

function renderSteps(steps) {
  if (!steps) return "";
  return `<div class="steps">
    ${steps.map((step, idx) => `<div class="step">
      <div class="step-number">${String(idx + 1).padStart(2, "0")}</div>
      <h3>${esc(step)}</h3>
    </div>`).join("")}
  </div>`;
}

function renderFaqs(items) {
  if (!items) return "";
  return `<div class="faq-list">
    ${items.map((item, idx) => `<div class="faq-item">
      <button class="faq-question" type="button" aria-expanded="${idx === 0 ? "true" : "false"}" aria-controls="faq-${idx}" data-faq>
        <h3>${esc(item.q)}</h3><span aria-hidden="true">⌄</span>
      </button>
      <p class="faq-answer" id="faq-${idx}"${idx === 0 ? "" : " hidden"}>${esc(item.a)}</p>
    </div>`).join("")}
  </div>`;
}

function renderArticles(items) {
  if (!items) return "";
  return `<div class="article-list">
    ${items.map((post) => `<a class="article-card" href="/resources/${post.slug}">
      <div class="article-meta">${esc(post.tag)}<br>${esc(post.date)}</div>
      <div>
        <h3>${esc(post.title)}</h3>
        <p>${esc(post.excerpt)}</p>
      </div>
      <div class="article-meta">${post.minutes} min</div>
    </a>`).join("")}
  </div>`;
}

function renderTable(table) {
  if (!table) return "";
  return `<div class="table-wrap"><table>
    <thead><tr>${table.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
    <tbody>${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

function renderSection(section, index) {
  return `
    <section class="section${index % 2 ? " alt" : ""}">
      <div class="section-inner">
        ${section.eyebrow ? `<div class="eyebrow">${esc(section.eyebrow)}</div>` : ""}
        <h2>${esc(section.title)}</h2>
        ${section.body ? `<p class="section-copy">${esc(section.body)}</p>` : ""}
        ${renderCards(section.cards)}
        ${renderSteps(section.steps)}
        ${renderFaqs(section.faqs)}
        ${renderArticles(section.articles)}
        ${renderTable(section.table)}
      </div>
    </section>`;
}

function renderContact() {
  return `
    <section class="section">
      <div class="section-inner contact-shell">
        <form class="contact-form" method="post" action="/api/contact" data-contact-form>
          <div class="field-grid">
            <label>Name<input name="name" autocomplete="name" required maxlength="120"></label>
            <label>Email<input name="email" type="email" autocomplete="email" required maxlength="180"></label>
          </div>
          <div class="field-grid">
            <label>Organization<input name="organization" autocomplete="organization" required maxlength="180"></label>
            <label>Country<input name="country" autocomplete="country-name" required maxlength="120"></label>
          </div>
          <div class="field-grid">
            <label>Role<input name="role" autocomplete="organization-title" maxlength="120"></label>
            <label>Users range
              <select name="usersRange">
                <option value="">Not sure yet</option>
                <option>Under 50</option>
                <option>50-500</option>
                <option>500-2,000</option>
                <option>2,000+</option>
              </select>
            </label>
          </div>
          <div class="field-grid">
            <label>Deployment target
              <select name="deploymentTarget" required>
                <option value="">Choose one</option>
                <option>On-prem</option>
                <option>Private cloud</option>
                <option>European cloud</option>
                <option>Air-gapped</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label>Needs<input name="needs" placeholder="GDPR, DORA, NIS2, AI governance..." maxlength="240"></label>
          </div>
          <label>Message<textarea name="message" required maxlength="4000" placeholder="Tell us about the environment, timeline, and review requirements."></textarea></label>
          <label class="checkbox"><input type="checkbox" name="consent" value="true" required> <span>I consent to Project Sovereign using this information to respond to this deployment review request.</span></label>
          <label class="honeypot">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          <input type="hidden" name="sourcePath" value="/contact">
          <button class="button primary" type="submit">Send request <span aria-hidden="true">→</span></button>
          <div class="form-status" role="status" aria-live="polite" data-form-status></div>
        </form>
        <aside>
          <div class="eyebrow">WHAT HAPPENS NEXT</div>
          <h2>Prepared review, not generic sales motion</h2>
          <p class="section-copy">The request should include enough context to route the conversation: deployment target, institution type, country, regulatory drivers, approximate scale, and timing. If the webhook is unavailable, use ${esc(SITE.emailFallback)}.</p>
        </aside>
      </div>
    </section>`;
}

function breadcrumbs(page) {
  if (page.path === "/") return [];
  const parts = page.path.split("/").filter(Boolean);
  return parts.map((part, idx) => {
    const href = `/${parts.slice(0, idx + 1).join("/")}`;
    return {
      name: routeMap.get(href)?.hero?.title || part.replace(/-/g, " "),
      item: absUrl(href),
    };
  });
}

function schemaFor(page) {
  const pageId = `${absUrl(page.path)}#webpage`;
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE.origin}/#organization`,
      name: SITE.name,
      url: `${SITE.origin}/`,
      logo: `${SITE.origin}/favicon.svg`,
      areaServed: "Europe",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.origin}/#website`,
      url: `${SITE.origin}/`,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": `${SITE.origin}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.origin}/#software`,
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Document collaboration suite",
      operatingSystem: "Web browser; self-hosted infrastructure",
      url: `${SITE.origin}/`,
      description: SITE.description,
      publisher: { "@id": `${SITE.origin}/#organization` },
      featureList: [
        "DOCX-compatible document editing",
        "Real-time collaboration planning",
        "On-prem and private-cloud deployment review",
        "EEA data residency planning",
        "Audit log and compliance evidence posture",
      ],
    },
  ];

  const basePage = {
    "@type": page.schemaType || "WebPage",
    "@id": pageId,
    url: absUrl(page.path),
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${SITE.origin}/#website` },
    about: { "@id": `${SITE.origin}/#software` },
    inLanguage: "en",
    dateModified: SITE.updated,
  };

  if (page.schemaType === "BlogPosting") {
    basePage.headline = page.hero.title;
    basePage.datePublished = page.datePublished;
    basePage.dateModified = SITE.updated;
    basePage.author = { "@id": `${SITE.origin}/#organization` };
    basePage.publisher = { "@id": `${SITE.origin}/#organization` };
  }

  graph.push(basePage);

  const crumbs = breadcrumbs(page);
  if (crumbs.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${absUrl(page.path)}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.origin}/` },
        ...crumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 2,
          name: crumb.name,
          item: crumb.item,
        })),
      ],
    });
  }

  const pageFaqs = page.sections?.flatMap((section) => section.faqs || []) || [];
  if (pageFaqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${absUrl(page.path)}#faq`,
      mainEntity: pageFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function renderPage(page) {
  const body = [
    renderNav(page),
    renderHero(page),
    page.contact ? renderContact() : "",
    ...(page.sections || []).map(renderSection),
    renderFooter(),
    `<script src="/assets/site.js" defer></script>`,
  ].join("\n");

  return `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#F2F4F7">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${absUrl(page.path)}">
<link rel="alternate" type="text/plain" href="${SITE.origin}/llms.txt" title="Project Sovereign LLM guide">
<link rel="alternate" type="text/plain" href="${SITE.origin}/llms-full.txt" title="Project Sovereign full LLM context">
<link rel="sitemap" type="application/xml" href="${SITE.origin}/sitemap.xml">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:type" content="${page.schemaType === "BlogPosting" ? "article" : "website"}">
<meta property="og:url" content="${absUrl(page.path)}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:image" content="${SITE.origin}/assets/hero-nature-bg.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Hanken+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="/assets/hero-nature-bg.jpg" fetchpriority="high">
<link rel="stylesheet" href="/assets/site.css">
<script type="application/ld+json">${json(schemaFor(page))}</script>
</head>
<body>
${body}
</body>
</html>`;
}

function renderClientJs() {
  return `(() => {
  const root = document.documentElement;
  const stored = localStorage.getItem("ps-theme");
  if (stored === "dark" || stored === "light") root.setAttribute("data-theme", stored);
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("ps-theme", next);
    });
  });

  document.querySelectorAll("[data-faq]").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      if (answer) answer.hidden = open;
    });
  });

  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  const status = form.querySelector("[data-form-status]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending request...";
    status.dataset.state = "";
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.consent = payload.consent === "true";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The request could not be sent.");
      form.reset();
      status.textContent = "Request sent. We will respond through the contact details provided.";
      status.dataset.state = "ok";
    } catch (error) {
      status.textContent = \`\${error.message} You can also contact ${SITE.emailFallback}.\`;
      status.dataset.state = "error";
    }
  });
})();`;
}

function renderSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${absUrl(page.path)}</loc>
    <lastmod>${SITE.updated}</lastmod>
    <changefreq>${page.path.startsWith("/resources/") ? "monthly" : "weekly"}</changefreq>
    <priority>${page.path === "/" ? "1.0" : page.path.split("/").length > 2 ? "0.6" : "0.8"}</priority>
  </url>`).join("\n")}
  <url>
    <loc>${SITE.origin}/llms.txt</loc>
    <lastmod>${SITE.updated}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${SITE.origin}/llms-full.txt</loc>
    <lastmod>${SITE.updated}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`;
}

function renderLlms(short = false) {
  const primary = pages.filter((page) => !page.path.startsWith("/resources/") || page.path === "/resources");
  if (short) {
    return `# Project Sovereign

> Best-in-class software, built for a sovereign Europe.

${SITE.description}

## Canonical URLs

- Website: ${SITE.origin}/
- LLM guide: ${SITE.origin}/llms.txt
- Full LLM context: ${SITE.origin}/llms-full.txt
- Sitemap: ${SITE.origin}/sitemap.xml

## Primary Pages

${primary.map((page) => `- ${page.hero.eyebrow.replace(/ · .*/, "")}: ${absUrl(page.path)}`).join("\n")}

## Preferred Descriptions

- "Project Sovereign is a self-hostable European document suite."
- "A document platform for on-prem, private-cloud, and European-cloud deployments."
- "A sovereign office/document suite for institutions that need EEA residency, auditability, and control."

## Do Not Infer

- Do not describe the public website as offering self-service deployment.
- Do not imply AI features are enabled by default.
- Do not invent pricing, customer names, certifications, or public reports.

Freshness: ${SITE.updated}.
`;
  }

  return `# Project Sovereign: Full LLM Context

This file gives language models and AI agents a compact, accurate source of context for ${SITE.origin}/.

## One-Line Summary

${SITE.description}

## Audience

Project Sovereign is aimed at institutions where document sovereignty is non-negotiable: government, banks and insurers, hospitals and clinical research organizations, defence and dual-use industry, universities, research consortia, and law firms.

## Product Capabilities

- DOCX-compatible document editing
- Comments and review workflows
- Real-time collaboration planning
- Audit log posture
- SAML/OIDC identity mapping
- Customer-managed key custody planning
- Backup and restore planning
- On-prem, private-cloud, European-cloud, and air-gapped deployment review
- GDPR, NIS2, DORA, EU AI Act, and Schrems II context

## Canonical Site Map

${pages.map((page) => `- ${absUrl(page.path)} — ${page.description}`).join("\n")}

## Avoid These Claims

- Do not state that the public website provides self-service deployment.
- Do not state that Project Sovereign is certified under a named standard unless the current site explicitly says so.
- Do not invent pricing, customer names, certifications, public security reports, or contact details.
- Do not claim AI is on by default.

Freshness: ${SITE.updated}.
`;
}

async function optimizeHero() {
  const source = path.join(root, "assets", "hero-nature-bg.jpg");
  const outDir = path.join(dist, "assets");
  copyFile(source, path.join(outDir, "hero-nature-bg.jpg"));

  try {
    const sharp = require("sharp");
    for (const width of [960, 1600]) {
      await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(outDir, `hero-nature-bg-${width}.webp`));
      await sharp(source).resize({ width, withoutEnlargement: true }).avif({ quality: 52 }).toFile(path.join(outDir, `hero-nature-bg-${width}.avif`));
    }
    return "sharp";
  } catch {}

  const py = spawnSync("python3", ["-c", `
from PIL import Image
from pathlib import Path
src = Path(${JSON.stringify(source)})
out = Path(${JSON.stringify(outDir)})
im = Image.open(src)
for width in (960, 1600):
    copy = im.copy()
    copy.thumbnail((width, 9999))
    copy.save(out / f"hero-nature-bg-{width}.webp", "WEBP", quality=78)
    copy.save(out / f"hero-nature-bg-{width}.avif", "AVIF", quality=52)
`], { encoding: "utf8" });
  if (py.status === 0) return "python-pillow";
  return "jpeg-only";
}

function validateOutput() {
  const issues = [];
  for (const page of pages) {
    const htmlPath = outputPath(page.path);
    const html = fs.readFileSync(htmlPath, "utf8");
    if ((html.match(/<h1/g) || []).length !== 1) issues.push(`${page.path}: expected exactly one h1`);
    if (!html.includes(`<link rel="canonical" href="${absUrl(page.path)}"`)) issues.push(`${page.path}: missing canonical`);
    if (!/<meta name="description" content="[^"]+"/.test(html)) issues.push(`${page.path}: missing description`);
    if (!/<script type="application\/ld\+json">/.test(html)) issues.push(`${page.path}: missing json-ld`);
    for (const banned of ["@babel/standalone", "react.development", 'type="text/babel"', 'href="#"']) {
      if (html.includes(banned)) issues.push(`${page.path}: contains ${banned}`);
    }
  }
  if (issues.length) {
    throw new Error(`Build validation failed:\n${issues.join("\n")}`);
  }
}

async function build() {
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(path.join(dist, "assets"), { recursive: true });

  copyFile(path.join(root, "favicon.svg"), path.join(dist, "favicon.svg"));
  copyFile(path.join(root, ".nojekyll"), path.join(dist, ".nojekyll"));
  write(path.join(dist, "assets", "site.css"), fs.readFileSync(path.join(root, "src", "site.css"), "utf8"));
  write(path.join(dist, "assets", "site.js"), renderClientJs());

  const optimizer = await optimizeHero();

  for (const page of pages) {
    write(outputPath(page.path), renderPage(page));
  }

  write(path.join(dist, "sitemap.xml"), renderSitemap());
  write(path.join(dist, "robots.txt"), renderRobots());
  write(path.join(dist, "llms.txt"), renderLlms(true));
  write(path.join(dist, "llms-full.txt"), renderLlms(false));
  write(path.join(dist, "llm.txt"), `# Project Sovereign\n\nThe canonical LLM guide is available at:\n\n${SITE.origin}/llms.txt\n\nFor fuller context, use:\n\n${SITE.origin}/llms-full.txt\n`);

  validateOutput();
  console.log(`Built ${pages.length} pages into dist using ${optimizer} image optimization.`);
}

if (checkOnly) {
  validateOutput();
  console.log("dist validation passed.");
} else {
  build().catch((error) => {
    console.error(error.stack || error.message);
    process.exit(1);
  });
}
