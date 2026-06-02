// Nav, footer, theme toggle. Used by all pages.

function ThemeToggle({ onImage = false }) {
  const [mode, setMode] = React.useState(() => {
    if (typeof document === "undefined") return "light";
    // localStorage is the source of truth; the HTML attr is just a default.
    try {
      const stored = localStorage.getItem("ps-theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {}
    return document.documentElement.getAttribute("data-theme") || "light";
  });
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    try { localStorage.setItem("ps-theme", mode); } catch {}
    window.dispatchEvent(new CustomEvent("ps-theme-change", { detail: { mode } }));
  }, [mode]);
  const isDark = mode === "dark";
  const controlColor = onImage ? "rgb(42, 45, 43)" : "var(--ink-2)";
  const controlRule = onImage ? "rgba(0, 0, 0, 0.12)" : "var(--rule)";
  return (
    <button
      type="button"
      onClick={() => setMode(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="ps-nav-btn"
      style={{
        width: 36, height: 36,
        border: `1px solid ${controlRule}`,
        background: "transparent",
        display: "grid", placeItems: "center",
        cursor: "pointer", color: controlColor,
        transition: "color 200ms ease, background 200ms ease",
        borderRadius: 999,
      }}
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2 V4 M12 20 V22 M4.93 4.93 L6.34 6.34 M17.66 17.66 L19.07 19.07 M2 12 H4 M20 12 H22 M4.93 19.07 L6.34 17.66 M17.66 6.34 L19.07 4.93" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8 A9 9 0 1 1 11.2 3 a7 7 0 0 0 9.8 9.8 Z" />
        </svg>
      )}
    </button>
  );
}

function Logo({ size = 22, ink = "var(--ink)", bg = "var(--bg)" }) {
  // Eleven-style: tiny solid square mark + tight wordmark.
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{
        width: size, height: size,
        background: ink,
        display: "grid", placeItems: "center",
        color: bg,
        fontFamily: "var(--font-display)",
        fontSize: size * 0.55,
        fontWeight: 600,
        letterSpacing: "-0.02em",
      }}>S</span>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 18,
        fontWeight: 500, letterSpacing: "-0.02em",
        color: ink,
      }}>
        Sovereign
      </span>
    </div>
  );
}

function NavBar({ current = "home" }) {
  const isHome = current === "home";
  const [scrolled, setScrolled] = React.useState(() => (
    typeof window !== "undefined" ? window.scrollY > 12 : false
  ));
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "editor",   label: "Editor",     href: "editor.html" },
    { id: "deploy",   label: "Deploy",     href: "deploy.html" },
    { id: "security", label: "Security",   href: "security.html" },
    { id: "resources",label: "Resources",  href: "resources.html" },
  ];
  const onImage = isHome && !scrolled;
  const navInk = onImage ? "#000000" : "var(--ink)";
  const navInk2 = onImage ? "rgb(42, 45, 43)" : "var(--ink-2)";
  const navBg = onImage ? "#FDFCFC" : "var(--bg)";
  const navRule = onImage ? "rgba(0, 0, 0, 0.12)" : "var(--rule)";
  const navChip = onImage ? "rgba(253, 252, 252, 0.34)" : "var(--chip)";
  const navCtaBg = onImage ? "#000000" : "var(--ink)";
  const navCtaText = onImage ? "#FDFCFC" : "var(--bg)";
  return (
    <header className={`ps-site-nav ${onImage ? "is-on-image" : ""} ${scrolled ? "is-scrolled" : ""}`} style={{
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      padding: "22px 48px",
      borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
      background: scrolled ? "color-mix(in oklab, var(--bg) 78%, transparent)" : "transparent",
      backdropFilter: scrolled ? "blur(18px) saturate(1.08)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.08)" : "none",
      boxShadow: scrolled ? "0 16px 40px rgba(0, 0, 0, 0.055)" : "none",
      position: isHome ? "fixed" : "sticky",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transition: "background 220ms ease, border-color 220ms ease, box-shadow 220ms ease, backdrop-filter 220ms ease",
    }}>
      <a href="index.html" style={{ textDecoration: "none", justifySelf: "start" }}>
        <Logo ink={navInk} bg={navBg} />
      </a>
      <nav style={{ display: "flex", gap: 4, alignItems: "center", justifySelf: "center" }}>
        {links.map(l => {
          const active = current === l.id;
          return (
            <a key={l.id} href={l.href} style={{
              fontSize: 14,
              color: active ? navInk : navInk2,
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: 999,
              fontWeight: active ? 500 : 400,
              background: active ? navChip : "transparent",
              transition: "color 200ms ease, background 200ms ease",
            }}>
              {l.label}
            </a>
          );
        })}
      </nav>
      <div style={{ display: "flex", gap: 12, alignItems: "center", justifySelf: "end" }}>
        <a href="https://github.com/mortenator/project-sovereign-site" target="_blank" rel="noopener noreferrer"
           className="ps-nav-btn"
           style={{
             width: 36, height: 36,
             border: `1px solid ${navRule}`,
             display: "grid", placeItems: "center",
             color: navInk2,
             transition: "color 200ms ease",
             borderRadius: 999,
           }}
           aria-label="View on GitHub"
        >
          <Icon.Github size={15} />
        </a>
        <ThemeToggle onImage={onImage} />
        <a href="#cta" style={{
          padding: "10px 18px",
          borderRadius: 999,
          background: navCtaBg,
          color: navCtaText,
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
        }}>
          Self-host <Icon.Arrow size={12} color={navCtaText} />
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid var(--rule)`,
      padding: "64px 48px 36px",
      fontSize: 13,
      color: "var(--ink-2)",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, marginBottom: 56 }}>
        <div style={{ maxWidth: 360 }}>
          <Logo />
          <p style={{ marginTop: 16, lineHeight: 1.55 }}>
            An open-source mission to put a world-class document suite back in European hands. Apache 2.0. Made in Europe, owned wherever you run it.
          </p>
          <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <ClassificationStamp label="EU // OPEN" code="APACHE-2.0" color="var(--ink-2)" />
          </div>
        </div>
        {[
          { title: "Product", links: [["Editor", "editor.html"], ["Deploy", "deploy.html"], ["Security", "security.html"], ["DOCX compatibility", "editor.html#compat"]] },
          { title: "Resources", links: [["Documentation", "#"], ["GitHub", "https://github.com/mortenator/project-sovereign-site"], ["Roadmap", "#"], ["Blog", "resources.html"]] },
          { title: "Compliance", links: [["GDPR", "security.html#gdpr"], ["NIS2", "security.html#nis2"], ["DORA", "security.html#dora"], ["Data residency", "security.html#residency"]] },
          { title: "Project",   links: [["About", "#"], ["License", "#"], ["Contact", "#"], ["Sponsors", "#"]] },
        ].map(col => (
          <div key={col.title}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "var(--ink-2)", marginBottom: 14
            }}>
              {col.title}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {col.links.map(([label, href]) => (
                <li key={label}><a href={href} style={{ color: "var(--ink)", textDecoration: "none" }}>{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: `1px solid var(--rule)`,
        paddingTop: 24,
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--ink-2)",
      }}>
        <span style={{ whiteSpace: "nowrap" }}>PROJECT SOVEREIGN · 2026 · APACHE-2.0</span>
        <span style={{ display: "flex", gap: 18, whiteSpace: "nowrap" }}>
          <span>BUILT IN EUROPE</span>
          <span>·</span>
          <span>HOSTED WHERE YOU CHOOSE</span>
        </span>
      </div>
    </footer>
  );
}

// Hover styles for nav buttons – injected once
(function injectChromeCss() {
  if (typeof document === "undefined" || document.getElementById("ps-chrome-css")) return;
  const s = document.createElement("style");
  s.id = "ps-chrome-css";
  s.textContent = `
    .ps-nav-btn:hover { color: var(--ink) !important; background: var(--chip) !important; }
    .ps-site-nav.is-on-image .ps-nav-btn:hover { color: #000 !important; background: rgba(253, 252, 252, 0.28) !important; }
    a:hover { transition: color 200ms ease; }
  `;
  document.head.appendChild(s);
})();

// Title items can be strings or { em: "..." } to italicize
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

// PageHero, used by supporting pages (editor, deploy, security, resources).
// Smaller than the home hero, no editor embed.
function PageHero({ eyebrow, title, sub, ctas }) {
  return (
    <section style={{ padding: "70px 48px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <Reveal y={10}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em",
            color: "var(--ink-2)", marginBottom: 22, whiteSpace: "nowrap",
          }}>
            <span style={{ width: 16, height: 1, background: "var(--accent)" }}></span>
            {eyebrow}
          </div>
        </Reveal>
        <Reveal y={16} delay={80}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: 72, lineHeight: 1.0, letterSpacing: "-0.035em",
            margin: 0, textWrap: "balance", maxWidth: 1100,
          }}>
            {title.map((t, i) => typeof t === "string"
              ? <span key={i}>{t}</span>
              : <em key={i} style={{ fontStyle: "italic", fontWeight: 400 }}> {t.em} </em>
            )}
          </h1>
        </Reveal>
        {sub && (
          <Reveal y={12} delay={140}>
            <p style={{ maxWidth: 720, fontSize: 19, lineHeight: 1.5, color: "var(--ink-2)", margin: "30px 0 36px" }}>
              {sub}
            </p>
          </Reveal>
        )}
        {ctas && (
          <Reveal y={10} delay={200}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {ctas.map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
                  padding: "13px 22px",
              borderRadius: 999,
                  background: c.primary ? "var(--ink)" : "transparent",
                  color: c.primary ? "var(--bg)" : "var(--ink)",
                  border: c.primary ? "none" : `1px solid var(--rule-strong)`,
                  fontSize: 14.5, fontWeight: 500, textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: 10,
                  whiteSpace: "nowrap",
                }}>
                  {c.icon === "github" && <Icon.Github size={14} color={c.primary ? "var(--bg)" : "var(--ink)"} />}
                  {c.label} {!c.icon && <Icon.Arrow size={12} color={c.primary ? "var(--bg)" : "var(--ink)"} />}
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// FooterCTA, used by every page.
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

Object.assign(window, { NavBar, Footer, Logo, ThemeToggle, PageHero, SectionHeader, FooterCTA });
