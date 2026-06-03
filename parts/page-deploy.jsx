// Deploy / self-host page.

function PageDeploy() {
  return (
    <div>
      <NavBar current="deploy" />
      <PageHero
        eyebrow="SELF-HOST"
        title={["Two hours to", { em: "Europe's own office suite" }]}
        sub="Eight services, one private network, one config file. The deployment kit is the same one we ship to ministries and enterprises, and it's the same one you can read on your laptop in twenty minutes. No vendor on the other side of the Atlantic. No exit clause to negotiate."
        ctas={[
          { label: "Discuss an on-prem deployment", href: "#cta", primary: true },
          { label: "Production architecture",        href: "#helm" },
        ]}
      />

      {/* Quick start */}
      <section style={{ padding: "80px 48px", borderTop: `1px solid var(--rule)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="ZERO TO RUNNING"
            title={["Three checks.", { em: "Then we deploy" }, "."]}
            sub="Deployments are prepared with each institution so residency, keys, identity, and audit requirements are captured before the stack is handed over."
            compact
          />

          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56 }}>
            <div style={{
              background: "var(--ink)", color: "var(--bg)",
              padding: "28px 32px",
              fontFamily: "var(--font-mono)", fontSize: 13.5, lineHeight: 1.85,
            }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 16, opacity: 0.55 }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--bg)" }}></span>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--bg)" }}></span>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--bg)" }}></span>
              </div>
              <div><span style={{ opacity: 0.45 }}>$</span> sovereign preflight --target on-prem</div>
              <div><span style={{ opacity: 0.45 }}>$</span> sovereign configure --region eu-central-1</div>
              <div><span style={{ opacity: 0.45 }}>$</span> sovereign handover --with-audit-pack</div>
              <div style={{ marginTop: 14, opacity: 0.7 }}>
                <div>→ checking residency requirements… done</div>
                <div>→ mapping identity provider and roles… done</div>
                <div>→ confirming customer-managed keys… done</div>
                <div>→ preparing audit evidence pack… done</div>
                <div>→ validating backup and restore plan… done</div>
                <div>→ scheduling controlled handover… done</div>
              </div>
              <div style={{ marginTop: 14 }}>
                <span style={{ color: "oklch(0.78 0.13 145)" }}>✓</span>{" "}
                deployment bundle ready for your environment
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: "oklch(0.78 0.13 145)" }}>✓</span>{" "}
                audit pack prepared for DPO and security review
              </div>
              <div style={{ marginTop: 14, color: "var(--bg)" }}>
                <span style={{ opacity: 0.45 }}>$</span>
                <span className="ps-caret" style={{ background: "var(--bg)" }}></span>
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, margin: "0 0 14px", letterSpacing: "-0.018em" }}>What the deployment prep covers</h3>
              <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  ["Confirms on-prem, private-cloud, or EU-cloud target"],
                  ["Maps SAML/OIDC, roles, and administrative boundaries"],
                  ["Defines customer-managed key custody and rotation"],
                  ["Pins deployment components and supply-chain evidence"],
                  ["Plans object storage, database, and backup topology"],
                  ["Documents sub-processors and data residency controls"],
                  ["Prepares TLS, domain, and network requirements"],
                  ["Runs handover checklist with security and operations"],
                ].map(([t], i) => (
                  <li key={i} style={{
                    display: "grid", gridTemplateColumns: "44px 1fr",
                    padding: "12px 0", borderTop: `1px dashed var(--rule)`,
                    fontSize: 14, color: "var(--ink)",
                  }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.1em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* The stack */}
      <section className="ps-box-section" style={{ padding: "100px 48px", borderTop: `1px solid var(--rule)`, background: "var(--surface-2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="THE STACK"
            title={["Eight services your auditor", { em: "already trusts" }]}
            sub="Nothing exotic, nothing proprietary in the data path. Pinned versions, signed images, reproducible builds."
          />

          <div className="ps-box-grid" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1, border: `1px solid var(--rule)`, background: "var(--rule)" }}>
            {[
              { name: "OnlyOffice", role: "DOCUMENT ENGINE", ver: "v8.x", note: "MPL-2.0 · DOCX/XLSX/PPTX rendering" },
              { name: "HocusPocus", role: "COLLABORATION",   ver: "v2.x", note: "Yjs CRDT server, websocket transport" },
              { name: "Keycloak",   role: "IDENTITY",        ver: "v23",  note: "SAML / OIDC / LDAP, EU-hosted only" },
              { name: "MinIO",      role: "OBJECT STORAGE",  ver: "S3 API", note: "Self-hosted blob store, EU regions" },
              { name: "PostgreSQL", role: "DATABASE",        ver: "v16",  note: "All three logical DBs in one instance" },
              { name: "Redis",      role: "CACHE",           ver: "v7",   note: "Session store + websocket fanout" },
              { name: "Traefik",    role: "REVERSE PROXY",   ver: "v3",   note: "TLS termination, ACME, routing" },
              { name: "apps/web",   role: "FRONTEND",        ver: "React 18", note: "The shell. Built in apps/web, Vite + TS." },
            ].map(s => (
              <div className="ps-box-card" key={s.name} style={{
                padding: "22px 24px",
                border: `1px solid var(--rule)`,
                background: "var(--surface)",
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-2)", marginBottom: 10 }}>
                  {s.role}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.015em" }}>{s.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>{s.ver}</span>
                </div>
                <p style={{ margin: 0, color: "var(--ink-2)", fontSize: 13.5, lineHeight: 1.55 }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment options */}
      <section id="helm" style={{ padding: "100px 48px", borderTop: `1px solid var(--rule)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="DEPLOYMENT TARGETS"
            title={["Three sizes,", { em: "all real" }]}
            sub="We don't make up a fictional 'enterprise tier' with extra features. The same code runs at all three sizes, these are the three operating envelopes we test and support."
          />

          <div className="ps-box-grid" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, border: `1px solid var(--rule)`, background: "var(--rule)" }}>
            {[
              {
                n: "01", scale: "TEAM (≤ 50 users)",
                title: "Docker Compose on one box",
                cost: "≈ €60/mo Hetzner CX41",
                rows: [
                  "Single VM, 4 vCPU / 8 GB RAM",
                  "Daily snapshots + S3 backup",
                  "Manual upgrades on a Sunday",
                  "Adequate uptime, no HA",
                ],
              },
              {
                n: "02", scale: "ORG (50 – 2,000)",
                title: "Docker Compose, multi-VM",
                cost: "≈ €450/mo OVH / Hetzner",
                rows: [
                  "Editor + collab on app VMs",
                  "Postgres + MinIO on dedicated VMs",
                  "Traefik in front, RTT-aware",
                  "PITR backups, restore in <30 min",
                ],
              },
              {
                n: "03", scale: "ENTERPRISE (2,000+)",
                title: "Helm on Kubernetes",
                cost: "Bring your own cluster",
                rows: [
                  "Horizontal scaling per service",
                  "External Postgres (RDS-equiv) supported",
                  "Customer-managed encryption keys",
                  "SLA-backed support agreements",
                ],
              },
            ].map(t => (
              <div className="ps-box-card" key={t.n} style={{ padding: "36px 32px", background: "var(--bg)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                  <CivicNumeral n={parseInt(t.n)} color="var(--accent)" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.15em", color: "var(--ink-2)" }}>{t.scale}</span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8, textWrap: "balance" }}>
                  {t.title}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", marginBottom: 24, letterSpacing: "0.06em" }}>
                  {t.cost}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {t.rows.map((r, i) => (
                    <li key={i} style={{
                      display: "flex", gap: 12, padding: "10px 0",
                      borderTop: `1px dashed var(--rule)`,
                      fontSize: 14,
                    }}>
                      <span style={{ color: "var(--accent)" }}>
                        <Icon.Check size={13} color="var(--accent)" />
                      </span>
                      <span style={{ color: "var(--ink)" }}>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </div>
  );
}

Object.assign(window, { PageDeploy });
