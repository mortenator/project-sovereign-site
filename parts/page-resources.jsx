// Resources / blog index page.

const POSTS = [
  {
    tag: "ARCHITECTURE",
    date: "2026-04-12",
    title: "Why we picked OnlyOffice as the engine",
    excerpt: "An honest comparison of the three open document engines we evaluated, OnlyOffice, LibreOffice, and Collabora, and the trade-offs we made.",
    minutes: 7,
  },
  {
    tag: "COMPLIANCE",
    date: "2026-04-02",
    title: "NIS2 Article 21, mapped to Sovereign in one page",
    excerpt: "The single-page PDF we ship with every release. What's in it, why we wrote it like a control mapping rather than a marketing brief.",
    minutes: 5,
  },
  {
    tag: "ENGINEERING",
    date: "2026-03-25",
    title: "Round-tripping 5,128 DOCX files on every commit",
    excerpt: "How we built the regression suite that catches a layout drift in a public-sector document before it ships. Self-hosted CI in Frankfurt.",
    minutes: 9,
  },
  {
    tag: "FIELD NOTES",
    date: "2026-03-18",
    title: "Eleven days to migrate a 700-person organisation",
    excerpt: "A pilot customer's account, written by their head of operations. What worked, what surprised them, and what we still need to fix.",
    minutes: 12,
  },
  {
    tag: "PRODUCT",
    date: "2026-03-04",
    title: "What we chose not to build, and why",
    excerpt: "The internal list of features we deliberately said no to. Free-form drawing, embedded chatbots, a Notion-style outliner, presence avatars in the page margin.",
    minutes: 6,
  },
  {
    tag: "OPS",
    date: "2026-02-21",
    title: "Backups, restores, and the Friday afternoon test",
    excerpt: "Our internal SOP for testing a backup. Run on the last working Friday of each month. The output is a dated PDF you can show your auditor.",
    minutes: 4,
  },
  {
    tag: "COMPLIANCE",
    date: "2026-02-08",
    title: "Schrems II is still the law that matters",
    excerpt: "It's the ruling that keeps GDPR meaningful. What it means for your office suite if part of the pipeline touches a US sub-processor.",
    minutes: 8,
  },
  {
    tag: "RELEASE",
    date: "2026-01-30",
    title: "Sovereign 0.4, comments, mentions, audit-log search",
    excerpt: "What landed in the latest release, with screenshots and the upgrade path. Backward-compatible at the DOCX layer; one DB migration; minimal downtime.",
    minutes: 5,
  },
];

function PageResources() {
  return (
    <div>
      <NavBar current="resources" />
      <PageHero
        eyebrow="RESOURCES"
        title={["Notes from", { em: "the project" }]}
        sub="Engineering posts, field notes, release write-ups, and the occasional opinion. Written by the people building Sovereign, not a content team."
      />

      {/* Featured */}
      <section style={{ padding: "20px 48px 60px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal y={14}>
            <a href="#" style={{
              display: "grid", gridTemplateColumns: "1.4fr 1fr",
              gap: 40, padding: "40px",
              border: `1px solid var(--rule)`, background: "var(--surface)",
              textDecoration: "none", color: "var(--ink)",
            }}>
              <div>
                <div style={{
                  display: "flex", gap: 14, alignItems: "center", marginBottom: 18,
                  fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
                  color: "var(--ink-2)",
                }}>
                  <span style={{ color: "var(--accent)" }}>FEATURED · {POSTS[0].tag}</span>
                  <span>·</span>
                  <span>{POSTS[0].date}</span>
                  <span>·</span>
                  <span>{POSTS[0].minutes} MIN READ</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontWeight: 400,
                  fontSize: 44, lineHeight: 1.08, letterSpacing: "-0.025em",
                  margin: "0 0 16px", textWrap: "balance",
                }}>
                  {POSTS[0].title}
                </h2>
                <p style={{ color: "var(--ink-2)", fontSize: 17, lineHeight: 1.55, margin: 0, maxWidth: 560 }}>
                  {POSTS[0].excerpt}
                </p>
                <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 14, fontWeight: 500 }}>
                  Read the post <Icon.Arrow size={12} color="var(--accent)" />
                </div>
              </div>
              <div style={{
                background: "var(--surface-2)",
                border: `1px solid var(--rule)`,
                position: "relative",
                minHeight: 280,
                overflow: "hidden",
              }}>
                {/* Stylised quote */}
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 32 }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontStyle: "italic",
                    fontSize: 28, lineHeight: 1.25, color: "var(--ink)",
                    letterSpacing: "-0.015em", textAlign: "center",
                    maxWidth: 360,
                  }}>
                    "We didn't pick the engine because it was the most advanced, we picked it because we could read every line of the code."
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 16, right: 16, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--ink-3)" }}>
                  EXCERPT
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Index */}
      <section style={{ padding: "20px 48px 100px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24,
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
            color: "var(--ink-2)", borderBottom: `1px solid var(--rule)`, paddingBottom: 12,
          }}>
            <span>ALL POSTS · {POSTS.length}</span>
            <span>FILTER: ALL · ENGINEERING · COMPLIANCE · FIELD NOTES · RELEASE</span>
          </div>
          <div>
            {POSTS.slice(1).map((p, i) => (
              <Reveal key={p.title} y={10} delay={i * 40}>
                <a href="#" style={{
                  display: "grid",
                  gridTemplateColumns: "100px 130px 1fr 80px",
                  padding: "26px 0",
                  borderBottom: `1px solid var(--rule)`,
                  alignItems: "baseline",
                  textDecoration: "none", color: "var(--ink)",
                  gap: 24,
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)" }}>
                    {p.tag}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--ink-2)" }}>
                    {p.date}
                  </span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 6, textWrap: "balance" }}>
                      {p.title}
                    </div>
                    <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.55, margin: 0, maxWidth: 720 }}>
                      {p.excerpt}
                    </p>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", textAlign: "right" }}>
                    {p.minutes} MIN
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </div>
  );
}

Object.assign(window, { PageResources });
