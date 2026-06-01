// Security & compliance page.

function PageSecurity() {
  return (
    <div>
      <NavBar current="security" />
      <PageHero
        eyebrow="SECURITY & COMPLIANCE"
        title={["Built for the rules", { em: "Europe has chosen to live by" }]}
        sub="We've read GDPR, NIS2, DORA, and the EU AI Act so you don't have to read them again. The product is shaped around what they ask for, not retrofitted to satisfy them after the fact. The same rules that govern Europe govern this codebase."
        ctas={[
          { label: "Download the security brief (PDF)", href: "#", primary: true },
          { label: "Request a SOC-2 type II report",     href: "#" },
        ]}
      />

      {/* Compliance overview grid */}
      <section style={{ padding: "60px 48px 100px", borderTop: `1px solid var(--rule)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 1, border: `1px solid var(--rule)`, background: "var(--rule)",
          }}>
            {[
              {
                id: "gdpr",
                tag: "GDPR",
                ref: "Reg. (EU) 2016/679",
                title: "Built around data minimisation",
                body: "The product is designed so that the only personal data it touches is the data inside your documents. We do not collect product analytics. We do not enrich users from third parties. Access logs retain the actor and the action, not the contents of the request body.",
                rows: [
                  "Lawful basis: contract / legitimate interest, documented per record",
                  "Right to erasure: per-document, per-user, per-tenant tooling",
                  "Right to portability: all documents export as DOCX, an ISO open standard",
                  "DPIA template included; reviewed quarterly",
                ],
              },
              {
                id: "nis2",
                tag: "NIS2",
                ref: "Dir. (EU) 2022/2555",
                title: "Article 21 controls, line by line",
                body: "We publish a per-release mapping of the product's controls to each of the ten security measures listed in Article 21. The mapping is a single-page PDF; auditors tell us it's the shortest one they've ever had to read.",
                rows: [
                  "Risk analysis: annual + per-major-release",
                  "Incident handling: 24-hour notification template included",
                  "Business continuity: tested restore from backup, quarterly",
                  "Supply chain: SBOM published with every release, signed",
                  "Cryptography: AES-256 at rest, TLS 1.3 in transit",
                ],
              },
              {
                id: "dora",
                tag: "DORA",
                ref: "Reg. (EU) 2022/2554",
                title: "ICT vendor that wants to be auditable",
                body: "We provide what financial-services customers ask for: the right to audit, a tested exit strategy, concentration-risk language in the MSA, and ongoing operational-resilience evidence. The product itself supports the resilience drills your team has to run.",
                rows: [
                  "Right-to-audit clause included in all contracts",
                  "Exit strategy: DOCX is the storage format; no lock-in",
                  "Threat-led penetration testing supported (TLPT)",
                  "Sub-processor list short, EEA-only, and pinned",
                ],
              },
              {
                id: "ai-act",
                tag: "EU AI ACT",
                ref: "Reg. (EU) 2024/1689",
                title: "AI as an opt-in, not a fait accompli",
                body: "The editor ships with no AI features enabled by default. When you enable them, you choose the model provider, Mistral, Aleph Alpha, a local Llama via vLLM, and the data flow is yours alone. We don't sit in the AI loop.",
                rows: [
                  "Provider-agnostic: connect any model via OpenAI-shaped API",
                  "Per-tenant on/off switch for every AI surface",
                  "Audit trail records every prompt + model response",
                  "No default cloud AI provider",
                ],
              },
            ].map(c => (
              <div id={c.id} key={c.id} style={{ padding: "40px 36px", background: "var(--bg)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500,
                    letterSpacing: "-0.015em", color: "var(--accent)",
                  }}>{c.tag}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-2)", letterSpacing: "0.1em" }}>
                    {c.ref}
                  </span>
                </div>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500,
                  margin: "0 0 14px", letterSpacing: "-0.015em", textWrap: "balance",
                }}>
                  {c.title}
                </div>
                <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6, margin: "0 0 18px" }}>
                  {c.body}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {c.rows.map((r, i) => (
                    <li key={i} style={{
                      display: "flex", gap: 10, padding: "8px 0",
                      borderTop: `1px dashed var(--rule)`,
                      fontSize: 13.5,
                    }}>
                      <span style={{ color: "var(--accent)", marginTop: 2 }}><Icon.Check size={12} color="var(--accent)" /></span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data residency map + sub-processors */}
      <section id="residency" style={{ padding: "100px 48px", borderTop: `1px solid var(--rule)`, background: "var(--surface-2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="DATA RESIDENCY"
            title={["Where your documents", { em: "actually are" }]}
            sub="A short, named list of regions. Every byte of customer data, documents, comments, metadata, search indexes, audit logs, lives in one of these four locations."
          />

          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            <div style={{
              background: "var(--surface)", border: `1px solid var(--rule)`,
              aspectRatio: "5 / 4", position: "relative",
            }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.85 }}>
                <EuropeDots width={560} height={448} color="var(--ink)" />
              </div>
              {[
                { x: 0.42, y: 0.55, label: "FRANKFURT",  code: "eu-central-1", primary: true },
                { x: 0.50, y: 0.30, label: "STOCKHOLM",  code: "eu-north-1" },
                { x: 0.36, y: 0.58, label: "PARIS",      code: "eu-west-3" },
                { x: 0.24, y: 0.40, label: "DUBLIN",     code: "eu-west-1" },
              ].map(p => (
                <div key={p.code} style={{
                  position: "absolute", left: `${p.x * 100}%`, top: `${p.y * 100}%`,
                  transform: "translate(-50%, -50%)",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span style={{
                    width: p.primary ? 18 : 12, height: p.primary ? 18 : 12,
                    borderRadius: 999, background: p.primary ? "var(--accent)" : "var(--ink)",
                    boxShadow: p.primary ? "0 0 0 6px var(--accent-soft)" : "none",
                    border: `2px solid var(--surface)`,
                  }}></span>
                  <div style={{ background: "var(--surface)", border: `1px solid var(--rule)`, padding: "3px 8px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em" }}>
                    <div style={{ color: "var(--ink)" }}>{p.label}</div>
                    <div style={{ color: "var(--ink-3)", fontSize: 10 }}>{p.code}</div>
                  </div>
                </div>
              ))}
              <div style={{
                position: "absolute", bottom: 16, left: 16,
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
                color: "var(--ink-3)",
              }}>
                DATA PATH · EEA ONLY · NO CROSS-ATLANTIC TRANSFER
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, margin: "0 0 14px", letterSpacing: "-0.018em" }}>
                Sub-processor list
              </h3>
              <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.6, margin: "0 0 22px" }}>
                We try to keep this short. The list below is the complete set as of {new Date().toLocaleString("en-GB", { month: "short", year: "numeric" })}. We notify customers 30 days before adding anyone.
              </p>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr style={{ background: "var(--surface)" }}>
                    <th style={{ textAlign: "left", padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--ink-2)", border: `1px solid var(--rule)` }}>VENDOR</th>
                    <th style={{ textAlign: "left", padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--ink-2)", border: `1px solid var(--rule)` }}>PURPOSE</th>
                    <th style={{ textAlign: "left", padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--ink-2)", border: `1px solid var(--rule)` }}>REGION</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Hetzner Online GmbH",      "Compute, networking",        "DE / FI"],
                    ["OVHcloud SAS",             "Backup region",               "FR"],
                    ["Stripe Payments Europe",   "Billing (managed instance)",  "IE"],
                    ["Postmark (EU region)",     "Transactional email",         "DE"],
                    ["Crisp IM SAS",             "Support chat (opt-in)",       "FR"],
                  ].map(([v, p, r], i) => (
                    <tr key={v}>
                      <td style={{ padding: "10px 12px", border: `1px solid var(--rule)`, background: "var(--surface)" }}>{v}</td>
                      <td style={{ padding: "10px 12px", border: `1px solid var(--rule)`, color: "var(--ink-2)", background: "var(--surface)" }}>{p}</td>
                      <td style={{ padding: "10px 12px", border: `1px solid var(--rule)`, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", background: "var(--surface)" }}>{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}>
                5 SUB-PROCESSORS · ALL EEA-RESIDENT · LAST CHANGED 14 APR 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit log preview */}
      <section style={{ padding: "100px 48px", borderTop: `1px solid var(--rule)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="AUDIT LOG"
            title={["Every action,", { em: "every actor" }]}
            sub="Append-only, signed, exportable in CEF or JSON Lines. Below is a real fragment from a pilot deployment, names and IDs anonymised."
          />

          <div style={{
            marginTop: 56,
            background: "var(--ink)", color: "var(--bg)",
            padding: "24px 28px",
            fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7,
            overflow: "auto",
          }}>
            {[
              "2026-04-17T09:14:22Z | usr_8a2 | document.open       | doc_compliance-memo-q2  | 10.4.32.18 | ses_4c1f",
              "2026-04-17T09:14:43Z | usr_8a2 | document.edit       | doc_compliance-memo-q2  | 10.4.32.18 | +2 chars, p.7",
              "2026-04-17T09:15:01Z | usr_b91 | document.join       | doc_compliance-memo-q2  | 10.4.32.55 | role=editor",
              "2026-04-17T09:15:30Z | usr_b91 | comment.create      | doc_compliance-memo-q2  | 10.4.32.55 | cmt_7d8",
              "2026-04-17T09:16:11Z | usr_8a2 | comment.resolve     | doc_compliance-memo-q2  | 10.4.32.18 | cmt_7d8",
              "2026-04-17T09:17:02Z | sys     | document.autosave   | doc_compliance-memo-q2  | -          | v=0.4",
              "2026-04-17T09:18:50Z | usr_8a2 | document.share      | doc_compliance-memo-q2  | 10.4.32.18 | +usr_c44 role=viewer",
              "2026-04-17T09:21:14Z | usr_c44 | document.open       | doc_compliance-memo-q2  | 10.4.40.21 | ses_4f23",
              "2026-04-17T09:23:38Z | sys     | document.snapshot   | doc_compliance-memo-q2  | -          | hash=3f08…",
              "2026-04-17T09:31:00Z | usr_8a2 | document.export     | doc_compliance-memo-q2  | 10.4.32.18 | fmt=pdf",
            ].map((l, i) => (
              <div key={i} style={{ whiteSpace: "pre" }}>
                <span style={{ color: "oklch(0.65 0.06 250)" }}>{l.split(" | ")[0]}</span>
                <span style={{ opacity: 0.5 }}> | </span>
                <span style={{ color: "oklch(0.78 0.13 86)" }}>{l.split(" | ")[1]}</span>
                <span style={{ opacity: 0.5 }}> | </span>
                <span style={{ color: "oklch(0.78 0.13 145)" }}>{l.split(" | ")[2]}</span>
                <span style={{ opacity: 0.5 }}> | </span>
                <span>{l.split(" | ").slice(3).join(" | ")}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)", display: "flex", justifyContent: "space-between" }}>
            <span>10 ENTRIES SHOWN · 14,228 ENTRIES IN WINDOW</span>
            <span>EXPORT: CEF · JSONL · SYSLOG</span>
          </div>
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </div>
  );
}

Object.assign(window, { PageSecurity });
