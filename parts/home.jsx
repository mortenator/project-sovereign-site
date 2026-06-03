// Home page composition.

// --- Hero copy variants (tweakable) ---
const HERO_COPY = {
  residency: {
    eyebrow: "PROJECT SOVEREIGN · A EUROPEAN MISSION",
    title: ["Best-in-class software,", "built for a sovereign Europe"],
    titleEm: 1, // index of the line that gets the italic emphasis (whole line)
    sub: "Project Sovereign is an open-source initiative to put a world-class document suite back in European hands. Hosted on European infrastructure, governed by European rules, owned by the institutions that use it. Apache 2.0, free forever, made to outlast its makers.",
    cta1: "Self-host the suite",
    cta2: "Read the manifesto",
  },
  compliance: {
    eyebrow: "COMPLIANCE BUILT IN, NOT BOLTED ON",
    title: ["The Word alternative", "Europe's regulators already trust"],
    titleEm: 1,
    sub: "GDPR, NIS2, DORA, and the EU AI Act mapped to the product, line by line. A complete audit trail. A stack made of components your auditors recognise, and a project with a public charter Europe can rely on.",
    cta1: "See the control mapping",
    cta2: "Talk to the maintainers",
  },
  ownership: {
    eyebrow: "OPEN · PUBLIC · EUROPEAN",
    title: ["European software,", "in European hands"],
    titleEm: 1,
    sub: "A complete office suite, editor, real-time collaboration, storage, identity, that you install in an afternoon and own forever. Apache 2.0. No per-seat tax. No vendor on the other side of the Atlantic. No exit clause to negotiate, ever.",
    cta1: "git clone & docker compose up",
    cta2: "Read the source",
  },
};

function HomePage() {
  const [editorMode, setEditorMode] = React.useState("live");
  const [heroAngle, setHeroAngle] = React.useState("residency");
  const [docAngle, setDocAngle] = React.useState("residency");

  const tweaks = window.__psTweaks || {};
  React.useEffect(() => {
    function onTweak(e) {
      const t = e.detail || {};
      if (t.editorMode) setEditorMode(t.editorMode);
      if (t.heroAngle) { setHeroAngle(t.heroAngle); setDocAngle(t.heroAngle); }
    }
    window.addEventListener("ps-tweak", onTweak);
    return () => window.removeEventListener("ps-tweak", onTweak);
  }, []);

  const copy = HERO_COPY[heroAngle] || HERO_COPY.residency;

  return (
    <div>
      <NavBar current="home" />
      <Hero copy={copy} editorMode={editorMode} docAngle={docAngle} />
      <ComplianceStrip />
      <Manifesto />
      <FeatureSpotlights />
      <StackSection />
      <DocxCompatSection />
      <UseCases />
      <FAQ />
      <FooterCTA />
      <Footer />

      {/* Tweaks panel */}
      <PSTweaks
        editorMode={editorMode} setEditorMode={setEditorMode}
        heroAngle={heroAngle} setHeroAngle={setHeroAngle}
        setDocAngle={setDocAngle}
      />
    </div>
  );
}

// ---------- Hero ----------
function Hero({ copy, editorMode, docAngle }) {
  return (
    <section className="ps-nature-hero">
      <div className="ps-nature-bg" aria-hidden="true"></div>
      <div className="ps-nature-grid" aria-hidden="true"></div>
      <div className="ps-nature-veil" aria-hidden="true"></div>

      <div className="ps-nature-content">
        {/* Eyebrow */}
        <Reveal y={12}>
          <div className="ps-hero-eyebrow">
            <span></span>
            <strong>{copy.eyebrow}</strong>
          </div>
        </Reveal>

        {/* Title */}
        <Reveal y={18} delay={80}>
          <h1 className="ps-hero-title">
            {copy.title.map((line, i) => (
              <span key={i}>
                {i === copy.titleEm ? (
                  <em>{line}</em>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
        </Reveal>

        {/* Sub */}
        <Reveal y={14} delay={160}>
          <p className="ps-hero-sub">
            {copy.sub}
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal y={12} delay={220}>
          <div className="ps-hero-actions">
            <a className="ps-hero-primary" href="#cta">
              {copy.cta1} <Icon.Arrow size={13} color="var(--bg)" />
            </a>
            <a className="ps-hero-secondary" href="security.html">
              {copy.cta2}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Editor demo */}
      <div className="ps-hero-demo-wrap">
        <Reveal y={24} delay={120}>
          <div className="ps-hero-demo-card">
            <EditorDemo mode={editorMode} angle={docAngle} height={500} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Manifesto ----------
function Manifesto() {
  return (
    <section className="ps-manifesto-section" style={{ padding: "140px 48px 120px", borderBottom: `1px solid var(--rule)`, position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em",
          color: "var(--ink-2)", marginBottom: 32, whiteSpace: "nowrap",
        }}>
          <span style={{ width: 16, height: 1, background: "var(--ink)" }}></span>
          THE MISSION
        </div>

        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: 56, fontWeight: 400,
          lineHeight: 1.12, letterSpacing: "-0.025em",
          margin: 0, textWrap: "balance",
          color: "var(--ink)",
        }}>
          Software is infrastructure. The infrastructure that holds
          {" "}<em style={{ fontStyle: "italic", fontWeight: 400 }}>Europe's documents</em>{" "} -
          its contracts, its case files, its ministerial briefings,
          its hospital records, its scientific papers, should be built,
          owned, and governed{" "}
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>here</em>.
        </p>

        <div className="ps-manifesto-grid" style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 1,
          background: "var(--rule)",
          border: `1px solid var(--rule)`,
        }}>
          {[
            {
              k: "AMBITION",
              h: "Best-in-class, not second-best",
              p: "Europe has spent two decades importing every productive tool it uses. We are setting out to build one, an office suite, to a standard that does not require a footnote.",
            },
            {
              k: "OWNERSHIP",
              h: "Public-good infrastructure",
              p: "Apache 2.0. Public roadmap. A foundation-style governance model in the works. Any institution that wants to run it for itself can; any developer who wants to improve it has the keys.",
            },
            {
              k: "RESIDENCY",
              h: "EU-only, by construction",
              p: "Every byte, every dependency, every sub-processor lives inside the European Economic Area. Not as a region setting, as a constraint baked into the codebase and verified in CI.",
            },
          ].map(c => (
            <div className="ps-manifesto-card" key={c.k} style={{ padding: "36px 32px", background: "var(--bg)" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em",
                color: "var(--ink-2)", marginBottom: 18,
              }}>{c.k}</div>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400,
                letterSpacing: "-0.015em", marginBottom: 10, textWrap: "balance",
              }}>{c.h}</div>
              <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                {c.p}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 32,
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
          color: "var(--ink-3)",
        }}>
         , PROJECT SOVEREIGN · CHARTER · v0.4
        </div>
      </div>
    </section>
  );
}

// ---------- Compliance strip ----------
function ComplianceStrip() {
  const items = [
    { key: "GDPR",     full: "General Data Protection Regulation",       ref: "Reg. (EU) 2016/679" },
    { key: "NIS2",     full: "Network & Information Security Directive", ref: "Dir. (EU) 2022/2555" },
    { key: "DORA",     full: "Digital Operational Resilience Act",       ref: "Reg. (EU) 2022/2554" },
    { key: "EU AI Act", full: "Artificial Intelligence Act",             ref: "Reg. (EU) 2024/1689" },
    { key: "Schrems II", full: "EU–US data transfer ruling",             ref: "C-311/18" },
  ];
  return (
    <section style={{
      borderTop: `1px solid var(--rule)`,
      borderBottom: `1px solid var(--rule)`,
      padding: "26px 48px",
      background: "var(--surface-2)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
          color: "var(--ink-2)",
        }}>
          COMPLIANT BY DESIGN, NOT BY AFFIDAVIT
        </span>
        <div style={{ flex: 1, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {items.map(it => (
            <div key={it.key} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 14px",
              border: `1px solid var(--rule-strong)`,
              background: "var(--surface)",
            }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500,
                color: "var(--ink)", letterSpacing: "-0.01em",
              }}>{it.key}</span>
              <span style={{ width: 1, height: 14, background: "var(--rule)" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--ink-2)" }}>
                {it.ref}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Feature spotlights ----------
function FeatureSpotlights() {
  const features = [
    {
      n: "01",
      tag: "WORD-CLASS EDITOR",
      title: "Software Europe doesn't have to apologise for",
      body: "Built on the OnlyOffice engine, the open editor with the best DOCX fidelity outside of Microsoft itself. Wrapped in a modern React shell that holds its own next to any product shipped from San Francisco. A quiet ribbon. A command palette. Real-time presence. Comments, suggestions, version history.",
      bullets: [
        "Pixel-faithful DOCX, XLSX, PPTX round-tripping",
        "Real-time collaboration via Yjs CRDT",
        "Command palette, ⌘K, all the modern conveniences",
        "Comments, suggestions, change tracking",
      ],
      visual: "editor",
    },
    {
      n: "02",
      tag: "SELF-HOSTABLE",
      title: "One install command from running your own stack",
      body: "Eight services, one private network, zero phone-home. The deployment kit is the same one we ship to ministries and large enterprises, Traefik, Postgres, MinIO, Keycloak, Redis, OnlyOffice, the editor shell, the collaboration server. Standard parts an SRE can read on a Friday, in a stack a board can sign off on.",
      bullets: [
        "Docker Compose for small orgs, Helm for ministries and enterprises",
        "Bring your own cloud, Hetzner, OVH, Scaleway, IONOS, on-prem",
        "Bring your own keys, KMS, HSM, smart-card, or local",
        "One-line backup + restore. Tested weekly in CI.",
      ],
      visual: "stack",
    },
    {
      n: "03",
      tag: "OPEN · PUBLIC · APACHE 2.0",
      title: "Public infrastructure, read the source",
      body: "Every line is on GitHub. No closed enterprise edition with the features you actually need behind a wall. Public roadmap. Public RFCs. A licence that lets anyone, a startup, a ministry, a co-operative, run it for themselves. Europe's digital infrastructure has been opaque for thirty years; that ends here.",
      bullets: [
        "Apache 2.0, commercial use, no friction",
        "Roadmap maintained in the open",
        "Public RFCs for breaking changes",
        "Sponsorship, not seat-licensing",
      ],
      visual: "code",
    },
    {
      n: "04",
      tag: "EU-ONLY DATA PATH",
      title: "Your work never crosses the Atlantic",
      body: "Every service runs inside the EEA. Every dependency is on an allow-list of EEA-resident providers. No US CDN, no US analytics pixel, no US font server in the data path. We document the data flow line by line so your DPO, and your auditor, and your minister, can sign it off in one read.",
      bullets: [
        "Hosted only in EU regions: Frankfurt, Stockholm, Paris, Dublin",
        "Sub-processor list, fewer than ten, all EEA-resident",
        "No US CDN, no Google Fonts, no Cloudflare in the document path",
        "Customer-managed encryption keys, on European soil",
      ],
      visual: "map",
    },
  ];
  return (
    <section style={{ padding: "120px 48px 60px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal y={14}>
          <SectionHeader
            eyebrow="WHAT EUROPE GETS"
            title={["A modern office suite, ", "made in Europe,", { em: "for Europe" }]}
            sub="Four commitments the rest of the page elaborates on. None of them are marketing, every one is a constraint baked into the codebase."
          />
        </Reveal>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr", gap: 1, background: "var(--rule)", border: `1px solid var(--rule)` }}>
          {features.map((f, i) => (
            <FeatureRow key={f.n} f={f} flip={i % 2 === 1} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ f, flip, delay }) {
  return (
    <Reveal y={20} delay={delay}>
      <div style={{
        display: "grid",
        gridTemplateColumns: flip ? "1fr 1fr" : "1fr 1fr",
        background: "var(--bg)",
        padding: "60px 56px",
        gap: 56,
      }}>
        <div style={{ order: flip ? 2 : 1 }}>
          <CivicNumeral n={parseInt(f.n)} color="var(--accent)" />
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.18em",
            color: "var(--ink-2)", marginTop: 14, marginBottom: 28,
          }}>{f.tag}</div>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 42, lineHeight: 1.1, letterSpacing: "-0.025em",
            margin: "0 0 18px", textWrap: "balance",
          }}>
            {f.title}
          </h3>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 22px", maxWidth: 540 }}>
            {f.body}
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {f.bullets.map((b, i) => (
              <li key={i} style={{
                display: "flex", gap: 12, padding: "10px 0",
                borderTop: i ? `1px dashed var(--rule)` : `1px solid var(--rule)`,
                fontSize: 14,
              }}>
                <span style={{ color: "var(--accent)", marginTop: 1 }}>
                  <Icon.Check size={14} color="var(--accent)" />
                </span>
                <span style={{ color: "var(--ink)" }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ order: flip ? 1 : 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FeatureVisual kind={f.visual} />
        </div>
      </div>
    </Reveal>
  );
}

// --- Visual mocks for each feature ---
function FeatureVisual({ kind }) {
  if (kind === "editor") return <EditorVisual />;
  if (kind === "stack")  return <StackVisual />;
  if (kind === "code")   return <CodeVisual />;
  if (kind === "map")    return <MapVisual />;
  return null;
}

function EditorVisual() {
  // Mini command-palette overlay floating on a faded editor
  return (
    <div style={{
      width: "100%", maxWidth: 480,
      border: `1px solid var(--rule)`,
      background: "var(--surface)",
      padding: 20,
      position: "relative",
    }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--rule-strong)" }}></span>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--rule-strong)" }}></span>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--rule-strong)" }}></span>
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
        2026-Q1 Operating Plan
      </div>
      {[1,0.7,0.85,0.65].map((w, i) => (
        <div key={i} style={{
          height: 8, background: "var(--rule)", marginBottom: 8,
          width: `${w * 100}%`,
        }} />
      ))}
      {/* Command palette */}
      <div style={{
        position: "absolute", left: "10%", right: "10%", top: "32%",
        background: "var(--surface)",
        border: `1px solid var(--rule-strong)`,
        boxShadow: "0 30px 60px -20px rgba(11,18,32,0.25)",
        padding: 12,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 8px", borderBottom: `1px solid var(--rule)`, marginBottom: 8,
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>⌘K</span>
          <span style={{ fontSize: 13, color: "var(--ink)" }}>insert table</span>
          <span style={{ flex: 1 }} />
          <span className="ps-caret" style={{ height: "0.9em" }}></span>
        </div>
        {["Insert table",  "Insert page break", "Insert footnote", "Insert citation"].map((c, i) => (
          <div key={c} style={{
            display: "flex", justifyContent: "space-between",
            padding: "6px 8px",
            background: i === 0 ? "var(--accent-soft)" : "transparent",
            fontSize: 13,
            color: i === 0 ? "var(--accent)" : "var(--ink)",
          }}>
            <span>{c}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)" }}>
              {i === 0 ? "⌘⇧T" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackVisual() {
  return (
    <StackBlocks
      rows={[
        { name: "apps/web, React + Vite",           role: "UI" },
        { name: "services/collab, HocusPocus",       role: "CRDT" },
        { name: "OnlyOffice Document Server",         role: "ENGINE" },
        { name: "Keycloak, SSO, SAML, OIDC",         role: "AUTH" },
        { name: "MinIO, S3-compatible storage",      role: "BLOBS" },
        { name: "PostgreSQL 16",                      role: "DB" },
        { name: "Redis, cache + sessions",           role: "CACHE" },
        { name: "Traefik v3, TLS + routing",         role: "EDGE" },
      ]}
      ink="var(--ink)" ink2="var(--ink-2)" rule="var(--rule)"
    />
  );
}

function CodeVisual() {
  const lines = [
    { c: "$", t: "git clone https://github.com/mortenator/project-sovereign-site" },
    { c: "$", t: "cd project-sovereign-site/deploy/docker-compose" },
    { c: "$", t: "./scripts/setup.sh" },
    { c: "→", t: "generating passwords... done" },
    { c: "→", t: "pulling images... done" },
    { c: "→", t: "starting 8 services... done" },
    { c: "✓", t: "sovereign is running at https://docs.your.eu" },
    { c: " ", t: "" },
    { c: "$", t: "" },
  ];
  return (
    <div style={{
      width: "100%", maxWidth: 480,
      background: "var(--ink)", color: "var(--bg)",
      padding: "20px 22px",
      fontFamily: "var(--font-mono)", fontSize: 12.5,
      lineHeight: 1.7,
    }}>
      {/* Window chrome */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, opacity: 0.5 }}>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--bg)" }}></span>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--bg)" }}></span>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--bg)" }}></span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11 }}>~/sovereign</span>
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{ display: "flex", gap: 12, whiteSpace: "nowrap" }}>
          <span style={{ opacity: l.c === "✓" ? 1 : 0.45, color: l.c === "✓" ? "oklch(0.78 0.13 145)" : undefined }}>{l.c}</span>
          <span style={{ color: l.c === "→" ? "oklch(0.8 0 0 / 0.55)" : "var(--bg)", overflow: "hidden", textOverflow: "ellipsis" }}>{l.t}{i === lines.length - 1 ? <span className="ps-caret" style={{ background: "var(--bg)" }}></span> : null}</span>
        </div>
      ))}
    </div>
  );
}

function MapVisual() {
  // Big version of the europe dots with annotations for the regions we host in
  const points = [
    { x: 0.42, y: 0.55, label: "FRANKFURT", code: "eu-central-1", primary: true },
    { x: 0.50, y: 0.30, label: "STOCKHOLM", code: "eu-north-1" },
    { x: 0.36, y: 0.58, label: "PARIS",     code: "eu-west-3" },
    { x: 0.24, y: 0.40, label: "DUBLIN",    code: "eu-west-1" },
  ];
  return (
    <div style={{
      width: "100%", maxWidth: 480,
      aspectRatio: "4 / 3",
      background: "var(--surface)",
      border: `1px solid var(--rule)`,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.7 }}>
        <EuropeDots width={480} height={360} color="var(--ink)" />
      </div>
      {points.map(p => (
        <div key={p.code} style={{
          position: "absolute",
          left: `${p.x * 100}%`, top: `${p.y * 100}%`,
          transform: "translate(-50%, -50%)",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{
            width: p.primary ? 14 : 10, height: p.primary ? 14 : 10,
            borderRadius: 999,
            background: p.primary ? "var(--accent)" : "var(--ink)",
            boxShadow: p.primary ? "0 0 0 4px var(--accent-soft)" : "none",
            border: `2px solid var(--surface)`,
          }}></span>
          <div style={{ background: "var(--surface)", border: `1px solid var(--rule)`, padding: "2px 6px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em" }}>
            <div style={{ color: "var(--ink)" }}>{p.label}</div>
            <div style={{ color: "var(--ink-3)", fontSize: 9 }}>{p.code}</div>
          </div>
        </div>
      ))}
      <div style={{
        position: "absolute", bottom: 12, left: 12,
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
        color: "var(--ink-3)",
      }}>
        DATA PATH · EEA ONLY
      </div>
    </div>
  );
}

// ---------- Stack section (text-forward, mono) ----------
function StackSection() {
  return (
    <section style={{ padding: "100px 48px", borderTop: `1px solid var(--rule)`, background: "var(--surface-2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80 }}>
          <Reveal y={16}>
            <SectionHeader
              eyebrow="THE STACK"
              title={["Boring, well-known,", { em: "auditable" }, " components"]}
              sub="Every piece your auditor will ask about, and nothing they won't recognise. No proprietary runtime, no opaque blob in the data path."
              compact
            />
          </Reveal>
          <Reveal y={20} delay={140}>
            <StackVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- DOCX compatibility ----------
function DocxCompatSection() {
  const tests = [
    { name: "Body text + character formatting",  ours: "100", theirs: "100" },
    { name: "Headings + outline level",          ours: "100", theirs: "100" },
    { name: "Lists (nested, mixed bullets)",     ours: "100", theirs: " 98" },
    { name: "Tables (merged cells, headers)",    ours: " 99", theirs: " 92" },
    { name: "Track changes, comments",           ours: "100", theirs: " 88" },
    { name: "Footnotes, endnotes, citations",    ours: " 99", theirs: " 94" },
    { name: "Page breaks, sections, columns",    ours: " 98", theirs: " 81" },
    { name: "Drop caps, text frames",            ours: " 96", theirs: " 70" },
    { name: "Embedded images, inline + wrapped", ours: " 99", theirs: " 90" },
    { name: "Equations (Office Math)",           ours: " 97", theirs: " 65" },
    { name: "Macros (intentionally not run)",    ours: "-",   theirs: "-" },
    { name: "Signed documents (digital sig.)",   ours: "100", theirs: " 60" },
  ];
  return (
    <section id="compat" style={{ padding: "120px 48px", borderTop: `1px solid var(--rule)` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal y={16}>
          <SectionHeader
            eyebrow="DOCX COMPATIBILITY"
            title={["The world runs on .docx.", { em: "We don't break it" }, "."]}
            sub="A 5,000-document test corpus from real EU public-sector and finance archives, round-tripped through every release. Numbers reflect our current main branch vs. the most popular open alternative. Both are open-source."
          />
        </Reveal>

        <Reveal y={20} delay={140}>
          <div style={{
            marginTop: 56,
            border: `1px solid var(--rule)`,
            background: "var(--surface)",
            overflow: "hidden",
          }}>
            {/* Header row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 140px 140px 80px",
              padding: "14px 20px",
              borderBottom: `1px solid var(--rule)`,
              fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.15em",
              color: "var(--ink-2)",
              background: "var(--surface-2)",
            }}>
              <span>TEST</span>
              <span style={{ textAlign: "right", color: "var(--accent)" }}>SOVEREIGN</span>
              <span style={{ textAlign: "right" }}>OTHER OSS</span>
              <span style={{ textAlign: "right" }}>STATUS</span>
            </div>
            {tests.map((t, i) => {
              const ours = parseInt(t.ours, 10);
              const theirs = parseInt(t.theirs, 10);
              const status = isNaN(ours) ? "skip" : ours >= 99 ? "pass" : "warn";
              return (
                <div key={t.name} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 140px 140px 80px",
                  padding: "14px 20px",
                  borderTop: i ? `1px solid var(--rule)` : "none",
                  alignItems: "center",
                  fontSize: 14,
                }}>
                  <span style={{ color: "var(--ink)" }}>{t.name}</span>
                  <span style={{
                    textAlign: "right", fontFamily: "var(--font-mono)", fontSize: 13,
                    color: "var(--accent)", fontWeight: 500,
                  }}>{t.ours}{!isNaN(ours) && "%"}</span>
                  <span style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-2)" }}>
                    {t.theirs}{!isNaN(theirs) && "%"}
                  </span>
                  <span style={{ textAlign: "right" }}>
                    {status === "pass" && <span style={{ color: "var(--green)" }}><Icon.Check size={14} color="var(--green)" /></span>}
                    {status === "warn" && <span style={{ color: "var(--gold)", fontFamily: "var(--font-mono)", fontSize: 11 }}>·  ·  ·</span>}
                    {status === "skip" && <span style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)", fontSize: 11 }}>N/A</span>}
                  </span>
                </div>
              );
            })}
            <div style={{
              padding: "12px 20px",
              borderTop: `1px solid var(--rule)`,
              background: "var(--surface-2)",
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em",
              color: "var(--ink-2)",
              display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
            }}>
              <span>RUN-ID 2026.04.117 · CORPUS 5,128 DOCS · 12 LOCALES</span>
              <a href="editor.html#compat" style={{ color: "var(--accent)", textDecoration: "none" }}>READ THE METHODOLOGY →</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Use cases ----------
function UseCases() {
  const cases = [
    { who: "Federal & regional government", what: "Replace SaaS office tooling with an in-country deployment under public-sector key management." },
    { who: "Banks and insurers (DORA scope)", what: "Document workflows that are auditable line-by-line and exit-strategy ready." },
    { who: "Hospitals and clinical research",  what: "Patient-record-adjacent drafting that never touches a US sub-processor." },
    { who: "Defence and dual-use industry",    what: "Air-gapped deployments with documented supply chains and pinned images." },
    { who: "Universities and research consortia", what: "Federated identity via SAML, EduGAIN-ready, no per-seat negotiation." },
    { who: "Law firms with client data",       what: "Per-matter encryption keys and a complete chain of custody for every revision." },
  ];
  return (
    <section style={{ padding: "120px 48px", borderTop: `1px solid var(--rule)`, background: "var(--surface-2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal y={14}>
          <SectionHeader
            eyebrow="WHO IT IS FOR"
            title={["Where European", { em: "sovereignty" }, " meets daily work"]}
            sub="The institutions where document sovereignty is non-negotiable. If your work falls under one of these, you already know why this project exists."
          />
        </Reveal>
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 1,
          background: "var(--rule)",
          border: `1px solid var(--rule)`,
        }}>
          {cases.map((c, i) => (
            <Reveal key={c.who} y={16} delay={i * 60} style={{
              background: "var(--bg)",
              padding: "36px 32px",
              minHeight: 200,
            }}>
              <CivicNumeral n={i + 1} color="var(--accent)" />
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500,
                margin: "20px 0 12px", letterSpacing: "-0.015em", textWrap: "balance",
              }}>{c.who}</div>
              <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
                {c.what}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FAQ() {
  const items = [
    {
      q: "Is this really a Word replacement, or do I still need Office?",
      a: "For 95% of teams, this is the only office suite they need. DOCX is the lingua franca and we round-trip it pixel-faithfully via OnlyOffice. The 5% that still need Office are typically using macro-heavy spreadsheets, we don't run those by design.",
    },
    {
      q: "Why not just use LibreOffice?",
      a: "We love LibreOffice and ship some of its code. But it was designed for the desktop, not the modern collaboration workflow. Sovereign is built around real-time co-editing, comments, presence, and a web-first UX. Think Google Docs ergonomics on your own servers.",
    },
    {
      q: "How does this compare to Nextcloud / Collabora?",
      a: "Same compliance posture, different focus. Nextcloud is a file sync platform that bolts on editing. Sovereign is an editor-first product, the UX, the collaboration server, and the deployment kit are tuned for document work, not file sync.",
    },
    {
      q: "What about audit logs and forensics?",
      a: "Every edit, comment, permission change, and login is recorded with the actor, the time, the IP, the session, and the document version it affected. Logs are append-only, exported in CEF and JSON, and retained for the period you configure.",
    },
    {
      q: "Can it run air-gapped?",
      a: "Yes. We publish a signed offline bundle every quarter. Pre-pull images, mirror the package registry, and you have a fully working deployment with no internet access. Defence and critical-infra deployments do this routinely.",
    },
    {
      q: "What about AI features?",
      a: "Optional, opt-in, and bring-your-own model. Plug in Mistral, Aleph Alpha, or a local Llama via vLLM, wherever it runs, that's where your prose goes. No default cloud AI provider.",
    },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: "120px 48px", borderTop: `1px solid var(--rule)` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80 }}>
        <Reveal y={14}>
          <SectionHeader
            eyebrow="QUESTIONS"
            title={["What buyers", { em: "ask" }, " before they sign"]}
            compact
          />
        </Reveal>
        <Reveal y={14} delay={120}>
          <div style={{ borderTop: `1px solid var(--rule)` }}>
            {items.map((it, i) => {
              const isOpen = i === open;
              return (
                <div key={it.q} style={{ borderBottom: `1px solid var(--rule)` }}>
                  <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} style={{
                    width: "100%", border: "none", background: "transparent",
                    padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
                    cursor: "pointer", color: "var(--ink)", textAlign: "left",
                  }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.015em" }}>{it.q}</span>
                    <span style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 280ms ease" }}>
                      <Icon.Chevron color="var(--ink-2)" size={16} />
                    </span>
                  </button>
                  <div style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 380ms cubic-bezier(0.2, 0.7, 0.3, 1)",
                  }}>
                    <div style={{ overflow: "hidden" }}>
                      <p style={{ paddingBottom: 24, color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6, maxWidth: 720, margin: 0 }}>
                        {it.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Footer CTA ----------
function FooterCTA() {
  return (
    <section id="cta" style={{ padding: "140px 48px 100px", borderTop: `1px solid var(--rule)`, position: "relative", overflow: "hidden", background: "var(--surface-2)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.14, pointerEvents: "none", display: "grid", placeItems: "center" }}>
        <EuropeDots width={900} height={680} color="var(--ink)" />
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <Reveal y={24}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 110, lineHeight: 1.02, letterSpacing: "-0.04em",
            margin: 0, textWrap: "balance",
          }}>
            Build Europe's <em style={{ fontStyle: "italic", fontWeight: 400 }}>own stack</em>.<br />
            Start here.
          </h2>
        </Reveal>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 56, gap: 40, flexWrap: "wrap" }}>
          <p style={{ maxWidth: 560, color: "var(--ink-2)", fontSize: 19, margin: 0, lineHeight: 1.5 }}>
            One install command. Two hours to get the stack up. A generation to remember what it felt like, in Europe, to make our own things, and to keep them.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://github.com/mortenator/project-sovereign-site" target="_blank" rel="noopener noreferrer" style={{
              padding: "14px 22px",
              borderRadius: 999,
              background: "var(--ink)", color: "var(--bg)",
              fontSize: 14.5, fontWeight: 500, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              <Icon.Github size={15} color="var(--bg)" /> github.com/mortenator/project-sovereign-site
            </a>
            <a href="deploy.html" style={{
              padding: "14px 22px",
              borderRadius: 999,
              border: `1px solid var(--rule-strong)`,
              color: "var(--ink)", fontSize: 14.5, fontWeight: 500,
              textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "var(--surface)",
            }}>
              Read the deployment guide
            </a>
          </div>
        </div>

        {/* Quick start one-liner */}
        <div style={{
          marginTop: 56, padding: "20px 24px",
          border: `1px solid var(--rule-strong)`,
          background: "var(--surface)",
          fontFamily: "var(--font-mono)", fontSize: 14,
          display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
        }}>
          <span style={{ color: "var(--ink-3)" }}>$</span>
          <span style={{ color: "var(--ink)" }}>curl -fsSL projectsovereign.eu/install.sh | bash</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-2)" }}>
            ≈ 8 MINUTES TO YOUR FIRST DOCUMENT
          </span>
        </div>
      </div>
    </section>
  );
}

// ---------- Section header ----------
// title items can be strings or { em: "..." } to italicize
function SectionHeader({ eyebrow, title, sub, compact }) {
  return (
    <div>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em",
        color: "var(--ink-2)", marginBottom: 18, whiteSpace: "nowrap",
      }}>
        <span style={{ width: 16, height: 1, background: "var(--accent)" }}></span>
        {eyebrow}
      </div>
      <h2 style={{
        fontFamily: "var(--font-display)", fontWeight: 400,
        fontSize: compact ? 42 : 56, lineHeight: 1.05, letterSpacing: "-0.028em",
        margin: 0, textWrap: "balance", maxWidth: 920,
      }}>
        {title.map((t, i) => typeof t === "string"
          ? <span key={i}>{t}</span>
          : <em key={i} style={{ fontStyle: "italic", fontWeight: 400 }}> {t.em} </em>
        )}
      </h2>
      {sub && (
        <p style={{
          marginTop: 22, fontSize: 18, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 700,
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ---------- Tweaks Panel ----------
function PSTweaks({ editorMode, setEditorMode, heroAngle, setHeroAngle, setDocAngle }) {
  const defaults = /*EDITMODE-BEGIN*/{
    "editorMode": "live",
    "heroAngle": "residency"
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = useTweaks(defaults);

  // Sync tweaks down to component state
  React.useEffect(() => {
    if (tweaks.editorMode !== editorMode) setEditorMode(tweaks.editorMode);
    if (tweaks.heroAngle !== heroAngle) { setHeroAngle(tweaks.heroAngle); setDocAngle(tweaks.heroAngle); }
  }, [tweaks.editorMode, tweaks.heroAngle]);

  return (
    <TweaksPanel>
      <TweakSection label="Editor demo">
        <TweakRadio
          label="Mode"
          value={tweaks.editorMode}
          onChange={(v) => setTweak("editorMode", v)}
          options={[
            { value: "live",     label: "Live" },
            { value: "animated", label: "Auto" },
            { value: "static",   label: "Static" },
          ]}
        />
      </TweakSection>
      <TweakSection label="Hero copy">
        <TweakSelect
          label="Angle"
          value={tweaks.heroAngle}
          onChange={(v) => setTweak("heroAngle", v)}
          options={[
            { value: "residency",  label: "Data residency" },
            { value: "compliance", label: "Compliance-first" },
            { value: "ownership",  label: "Open / ownership" },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

Object.assign(window, { HomePage });
