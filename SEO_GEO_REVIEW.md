# Project Sovereign SEO and GEO Review

Audit date: 2026-06-03  
Site reviewed: https://www.projectsovereign.eu/  
Scope: live public pages, headers, robots, sitemap, metadata, structured data, source files, and current search landscape signals. No Search Console, analytics, server logs, backlink tool, or paid keyword database access was available.

Implementation note: this review describes the pre-migration live site. The repo now contains a custom static generator, complete generated HTML output under `dist/`, a Vercel contact function, and expanded SEO/GEO pages based on the recommendations below.

## Executive Summary

Project Sovereign has a strong strategic position: "self-hostable European document suite for sovereign institutions" is differentiated, timely, and well matched to current EU sovereignty, DORA, NIS2, GDPR, Schrems II, and AI governance demand. The site copy is much better than average; the `llms.txt` and `llms-full.txt` files are unusually crisp.

The biggest ranking blockers are not brand voice. They are crawl/index hygiene, production rendering, content depth, and trust evidence.

Top priorities:

1. Fix the apex domain immediately. `https://projectsovereign.eu/` is not redirecting to `https://www.projectsovereign.eu/`; it serves a JavaScript redirect to `/lander`, and `/lander` is a parked-domain page. This can split authority, confuse crawlers, and damage trust.
2. Replace client-side Babel/development React with production-built static HTML or server-rendered/pre-rendered pages. Interior pages currently send almost no body content without JavaScript.
3. Create dedicated landing pages for high-intent search clusters instead of asking five pages to rank for everything.
4. Add proof pages: security brief, architecture, compliance mappings, changelog, governance, maintainers, release artifacts, SBOM, compatibility methodology, and comparison pages.
5. Expand structured data from generic WebPage markup to a richer entity graph: Organization, SoftwareApplication, Product/Service, FAQPage, Article/BlogPosting, BreadcrumbList, and potentially Dataset/TechArticle where appropriate.
6. Make resources real pages, not a visual index with `href="#"`. The content calendar already exists in the UI; each article needs a canonical URL.
7. Set up Search Console and Bing Webmaster Tools, submit the sitemap, request indexing of the main pages, and use IndexNow for Bing if publishing frequent updates.

## Current Strengths

- Clear niche: a sovereign European document suite, not generic SaaS.
- Strong home-page narrative and buyer-specific use cases: government, banks, hospitals, defence, universities, law firms.
- Robots on `www` allows crawling and points to the sitemap.
- Sitemap on `www` includes the main public URLs.
- Clean canonical URLs on the `www` pages.
- Useful page separation already exists: home, editor, deploy, security, resources.
- `llms.txt` and `llms-full.txt` give AI systems a concise product framing.
- Open Graph is present.
- JSON-LD exists on all main pages.
- Security headers are present on `www`.
- The page has unusually memorable copy, which helps when earning links and citations.

## Critical Technical Findings

### 1. Apex Domain Is Parked / Misrouted

Observed:

- `https://www.projectsovereign.eu/` returns the intended Vercel site.
- `https://projectsovereign.eu/` returns a 200 HTML page containing only JavaScript that redirects to `/lander`.
- `https://projectsovereign.eu/lander` returns a GoDaddy-style parking lander with ad scripts.
- `https://projectsovereign.eu/sitemap.xml` lists only `https://projectsovereign.eu/lander`.
- `http://www.projectsovereign.eu/` correctly 308 redirects to `https://www.projectsovereign.eu/`.

Impact:

- Search engines may treat the apex and `www` as separate hosts.
- The parked page can be crawled as the brand's root domain.
- AI systems and procurement reviewers may follow the apex and see a parked page.
- Link equity from anyone linking to `projectsovereign.eu` may not consolidate to `www`.

Fix:

- Point the apex domain to Vercel or the intended host.
- Add a permanent server-side redirect from all apex paths to matching `www` paths:
  - `https://projectsovereign.eu/` -> `https://www.projectsovereign.eu/`
  - `https://projectsovereign.eu/security` -> `https://www.projectsovereign.eu/security`
- Replace any parking DNS/registrar forwarding.
- Verify both HTTP and HTTPS apex in Search Console.
- After fixing, request recrawl for apex and `www`.

Priority: P0.

### 2. Interior Pages Are Almost Empty Without JavaScript

Observed:

- `/editor`, `/deploy`, `/security`, and `/resources` ship title, meta, JSON-LD, then `<div id="root"></div>`.
- The meaningful body content lives in JSX loaded at runtime.
- The homepage has a fallback hero, but most of the deeper content is also React-rendered.

Impact:

- Google can render JavaScript, but it requires an additional rendering phase.
- AI retrievers, link preview bots, procurement scanners, and many secondary crawlers often rely on initial HTML.
- Snippet quality suffers because crawl-time HTML does not contain the page's best paragraphs, FAQs, tables, or claims.
- Internal links and article links that are injected later are less robust.

Fix:

- Best option: move to a build step that pre-renders each route to static HTML.
- Good static approach: use Astro, Eleventy, Next.js static export, Vite SSG, or a simple Node render script.
- At minimum: inline each page's hero, H1, core sections, FAQs, and links in the HTML fallback.
- Ensure all important content exists in source HTML before hydration.

Priority: P0/P1.

### 3. Production Site Loads Development React and Babel

Observed external payloads:

- `react.development.js`: about 110 KB.
- `react-dom.development.js`: about 1.08 MB.
- `@babel/standalone`: about 3.14 MB.
- Hero image: about 884 KB.
- The browser transpiles JSX on every visit.

Impact:

- Slower first render, especially on mobile and public-sector networks.
- More JavaScript for crawlers to process.
- Avoidable performance loss and possible Core Web Vitals drag.
- Production trust signal is weaker because dev dependencies are visible in source.

Fix:

- Compile JSX ahead of time.
- Use production React builds or remove React runtime from static marketing pages after pre-rendering.
- Bundle and minify local scripts.
- Convert the hero image to AVIF/WebP with responsive variants and dimensions.
- Use `font-display: swap` unless the visual tradeoff is unacceptable.

Priority: P1.

### 4. Placeholder Links Create Dead Ends

Observed:

- `/resources` article links use `href="#"`.
- `/security` CTAs for "Download the security brief (PDF)" and "Request a SOC-2 type II report" use `href="#"`.
- Footer links include placeholders for Documentation, About, Contact, Pilot programme.

Impact:

- Wasted crawl paths.
- Trust loss for procurement/security buyers.
- Broken conversion intent.
- AI systems cannot cite or retrieve the promised evidence.

Fix:

- Make every promised artifact a real URL, even if early-stage:
  - `/security-brief`
  - `/compliance/nis2-article-21`
  - `/compliance/dora`
  - `/architecture`
  - `/governance`
  - `/contact`
  - `/resources/why-we-picked-onlyoffice`
- If a document is not available, remove or reword the CTA.

Priority: P1.

## Metadata Review

Current title tags:

- Home: `Project Sovereign, Best-in-class software, for a sovereign Europe` (65 chars)
- Editor: `Editor, Project Sovereign` (25)
- Deploy: `Deploy, Project Sovereign` (25)
- Security: `Security, Project Sovereign` (27)
- Resources: `Resources, Project Sovereign` (28)

Issue:

The inner-page titles are clean but too generic. They underuse buyer-intent terms.

Recommended titles:

- Home: `Project Sovereign | Self-Hosted European Document Suite`
- Editor: `DOCX-Compatible Document Editor for Sovereign Work | Project Sovereign`
- Deploy: `Self-Host a European Office Suite On-Prem or Private Cloud`
- Security: `GDPR, NIS2, DORA and EU AI Act Controls for Document Workflows`
- Resources: `European Document Sovereignty Resources | Project Sovereign`

Current meta descriptions are generally good, but the home description is long at 225 characters. Shorten and sharpen around the query:

Recommended home description:

`Project Sovereign is a self-hostable European document suite for institutions that need DOCX editing, EEA residency, audit logs, key custody, and regulatory control.`

## Structured Data Review

Current:

- Home includes Organization, WebSite, SoftwareApplication, WebPage.
- Inner pages include WebPage or CollectionPage.
- JSON-LD uses clean IDs and canonical URLs.

Improvements:

- Add richer Organization fields once true:
  - `sameAs`
  - `email`
  - `foundingDate`
  - `founder` or `maintainer`
  - `address` or `areaServed`
  - `logo` as a crawlable PNG/SVG plus recommended image sizes.
- Expand SoftwareApplication:
  - `applicationSubCategory`
  - `softwareRequirements`
  - `operatingSystem`
  - `license`
  - `isAccessibleForFree`
  - `featureList`
  - `offers` only if pricing/contact terms are real.
- Add `FAQPage` schema for visible FAQs on the homepage.
- Add `BreadcrumbList` to all non-home pages.
- Add `Article` or `BlogPosting` schema to each resource once resources have URLs.
- Consider `TechArticle` for deployment/security deep dives.
- Add `hasPart` links from WebSite to the main pages.

Important: structured data must match visible content. Do not mark up certifications, reviews, customers, or reports unless they are publicly visible and true.

## GEO / AI Search Review

Google's current guidance treats generative AI search visibility as an extension of SEO: AI features use indexed, crawlable pages, core ranking systems, retrieval, and query fan-out. That means Project Sovereign should optimize for answerability, entity clarity, and evidence, not AI-specific tricks.

Current GEO strengths:

- `llms.txt` and `llms-full.txt` are clear.
- The product entity is defined consistently.
- The site's best phrasing maps well to AI answers:
  - "self-hostable European document suite"
  - "EEA data residency"
  - "on-prem, private-cloud, European-cloud deployments"
  - "AI opt-in"
  - "GDPR, NIS2, DORA, EU AI Act"

Current GEO weaknesses:

- Main content is not reliably present in static HTML.
- Claims are often vivid but not backed by linkable evidence.
- No individual pages exist for the questions AI systems are likely to fan out into.
- No public author/maintainer/governance page.
- The `llms.txt` files are useful for some crawlers but should not substitute for HTML content.

Recommended GEO architecture:

- `/what-is-project-sovereign`
- `/use-cases/public-sector-document-suite`
- `/use-cases/dora-financial-services`
- `/use-cases/healthcare-document-sovereignty`
- `/security`
- `/security/subprocessors`
- `/security/data-residency`
- `/compliance/gdpr`
- `/compliance/nis2-article-21`
- `/compliance/dora`
- `/compliance/eu-ai-act`
- `/deployment/on-prem`
- `/deployment/private-cloud`
- `/deployment/air-gapped`
- `/compare/project-sovereign-vs-nextcloud-office`
- `/compare/project-sovereign-vs-onlyoffice`
- `/compare/project-sovereign-vs-microsoft-365`
- `/resources/why-we-picked-onlyoffice`
- `/resources/docx-compatibility-methodology`
- `/resources/schrems-ii-office-software`

Each page should answer one primary question in the first 100-150 words, then support it with specifics, tables, screenshots, and evidence links.

## Content Strategy Gaps

Project Sovereign has the language of a serious institution, but not yet the content footprint of one.

High-value pages to publish first:

1. Security brief page
   - Make the current PDF CTA real.
   - Include a short HTML summary plus PDF download.
   - Add revision date and version.

2. NIS2 Article 21 mapping
   - One page, one table.
   - Each Article 21 requirement mapped to product/process controls.

3. DORA ICT third-party risk page
   - Explain exit strategy, audit rights, resilience testing support, sub-processor review, and data portability.

4. DOCX compatibility methodology
   - The site claims 5,128-document round-tripping. This is powerful, but it needs a methodology page and, ideally, a public sample report.

5. Sub-processor and data residency page
   - Separate it from general security.
   - Keep a dated changelog.

6. Architecture page
   - Diagram the eight services.
   - Explain data flow, identity, storage, audit log, backup, and deployment boundary.

7. Governance page
   - Who operates the project?
   - What is the foundation-style governance model?
   - Who makes decisions?
   - What is the license and contribution model?

8. Comparison pages
   - Not attack pages.
   - Clear, factual positioning against Microsoft 365, Google Workspace, Nextcloud Office, Collabora, OnlyOffice, and Office EU.

9. Article pages for the existing resources list
   - The titles are already good.
   - They need real URLs, body content, author, date, and Article schema.

10. Contact / pilot programme page
   - Buyers need a real conversion path.
   - Add a non-JavaScript email or form fallback.

## Keyword and Intent Opportunities

Primary search cluster:

- self-hosted office suite Europe
- European office suite
- sovereign office suite
- European document suite
- self-hosted document collaboration
- on-prem document editor
- DOCX-compatible document editor
- GDPR compliant document collaboration
- EEA data residency document editor
- DORA compliant document workflow
- NIS2 document management
- EU AI Act document workflow
- Microsoft 365 alternative Europe
- Google Docs alternative Europe
- Nextcloud Office alternative
- OnlyOffice deployment for institutions

Long-tail question targets:

- What is a sovereign document suite?
- How can EU institutions replace Microsoft 365?
- Can collaborative document editing be self-hosted?
- What does DORA require from document software vendors?
- How do NIS2 Article 21 controls apply to document workflows?
- How do you keep collaborative documents inside the EEA?
- What is the best DOCX-compatible self-hosted editor?
- How should AI features be governed in regulated document workflows?

## Authority and Trust

Current trust gap:

The site makes strong institutional claims, but public proof is thin. The copy says "open-source", "Apache 2.0", "audit evidence", "foundation-style governance", "published every Monday", "pilot customers", and "SOC-2 type II report" language appears in CTAs. These must either be backed by accessible evidence or softened until the evidence exists.

Recommended trust assets:

- Public repository or source availability page, if compatible with strategy.
- License page.
- Security policy.
- Responsible disclosure page.
- SBOM/release artifact page.
- Changelog.
- Roadmap.
- Maintainers page.
- Governance charter.
- Public docs.
- Compatibility report archive.
- Sub-processor changelog.
- Dated security brief.

Avoid:

- Claiming certification before certification.
- Mentioning SOC 2 report if it is not available or in progress.
- Stating customer/pilot specifics unless permission exists.
- Making numeric compatibility claims without methodology.

## Indexing and Discovery

Recommended setup:

- Verify all four properties in Google Search Console:
  - `https://www.projectsovereign.eu/`
  - `https://projectsovereign.eu/`
  - `http://www.projectsovereign.eu/`
  - `http://projectsovereign.eu/`
- Submit `https://www.projectsovereign.eu/sitemap.xml`.
- After apex redirect is fixed, inspect the canonical homepage and request indexing.
- Verify in Bing Webmaster Tools.
- Submit sitemap to Bing.
- Consider IndexNow for new resource articles.
- Add the site to relevant European/open-source/software directories where appropriate.

## Performance and Page Experience

Biggest opportunities:

- Remove runtime Babel.
- Use production React or pre-rendered static HTML.
- Reduce JavaScript on marketing pages.
- Serve local bundled assets instead of external `unpkg.com`.
- Convert hero image to responsive AVIF/WebP.
- Add explicit image width/height.
- Consider self-hosting fonts or using system font fallbacks for critical text.
- Cache static assets with long immutable cache headers.
- Keep critical CSS small.

## Recommended 30-Day Action Plan

Week 1:

- Fix apex domain and redirects.
- Replace placeholder links.
- Add real contact page.
- Shorten and retarget title/meta tags.
- Submit sitemap in Google Search Console and Bing.

Week 2:

- Add static/pre-rendered HTML content for all pages.
- Compile production JS; remove Babel standalone and development React.
- Add FAQPage and BreadcrumbList schema.
- Optimize hero image.

Week 3:

- Publish security brief, sub-processor page, data residency page, and NIS2 mapping.
- Make resource posts real pages with Article schema.
- Add governance/about/maintainers page.

Week 4:

- Publish comparison pages and use-case pages.
- Build a small internal-linking system around compliance, deployment, editor, and alternatives.
- Start outreach for citations from EU digital sovereignty, open-source, govtech, procurement, and compliance communities.

## Best Next Pages to Build

Highest impact first:

1. `/compliance/nis2-article-21`
2. `/compliance/dora`
3. `/security/data-residency`
4. `/deployment/on-prem`
5. `/resources/docx-compatibility-methodology`
6. `/compare/project-sovereign-vs-microsoft-365`
7. `/compare/project-sovereign-vs-nextcloud-office`
8. `/governance`
9. `/contact`
10. `/security/subprocessors`

## Sources Used

- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central, optimizing for generative AI features: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google Search Central, title links: https://developers.google.com/search/docs/appearance/title-link
- Google Search Central, snippets/meta descriptions: https://developers.google.com/search/docs/appearance/snippet
- Google Search Central, structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google Search Central, Organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
