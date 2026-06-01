// Editor deep-dive page.

function PageEditor() {
  return (
    <div>
      <NavBar current="editor" />
      <PageHero
        eyebrow="THE EDITOR"
        title={["A Word-class editor,", { em: "made in Europe" }]}
        sub="Built on OnlyOffice, the open document engine with the best DOCX fidelity outside of Microsoft. Wrapped in a modern React shell tuned for keyboard-first writers, collaborative editing, and quiet ergonomics. Software Europe can ship without apologising for the runtime."
        ctas={[
          { label: "Self-host the suite", href: "deploy.html", primary: true },
          { label: "DOCX compatibility report", href: "#compat" },
        ]}
      />

      {/* Anatomy of the editor */}
      <section style={{ padding: "100px 48px", borderTop: `1px solid var(--rule)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="ANATOMY"
            title={["Quiet ribbon. Loud", { em: "command palette" }]}
            sub="Two interfaces, one for browsing, one for doing. The ribbon is there when you need it; the palette is one keystroke away when you don't."
          />

          <div style={{ marginTop: 56 }}>
            <EditorDemo mode="live" angle="residency" height={620} />
          </div>

          <div style={{
            marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24,
          }}>
            {[
              { tag: "RIBBON", title: "Five tabs, never more", body: "Home, Insert, Layout, Review, View. No mystery tabs, no contextual ones that shift under your cursor. The toolbar collapses to a single bar when you scroll." },
              { tag: "PALETTE",  title: "⌘K opens everything", body: "Every command, heading styles, formats, inserts, exports, is one fuzzy search away. No more hunting through menus for 'page break'." },
              { tag: "ZEN",     title: "Focus mode, F11", body: "Dim everything but the current paragraph. Useful for drafting; not the default. Returns to normal view on Esc." },
            ].map(c => (
              <div key={c.tag} style={{ padding: "24px 0", borderTop: `1px solid var(--rule)` }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.18em", color: "var(--ink-2)", marginBottom: 10 }}>
                  {c.tag}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 8, letterSpacing: "-0.015em" }}>
                  {c.title}
                </div>
                <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard cheat sheet */}
      <section style={{ padding: "100px 48px", borderTop: `1px solid var(--rule)`, background: "var(--surface-2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="KEYBOARD"
            title={["Every shortcut your hands", { em: "already know" }]}
            sub="If you've used Word, you can use Sovereign without reading anything. Every familiar shortcut is mapped exactly. Mac and Windows symbols supported."
            compact
          />
          <div style={{
            marginTop: 56,
            border: `1px solid var(--rule)`,
            background: "var(--surface)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
          }}>
            {[
              ["File", [
                ["New document",        "⌘N"],
                ["Open",                "⌘O"],
                ["Save",                "⌘S"],
                ["Save as",             "⌘⇧S"],
                ["Export PDF",          "⌘⇧E"],
                ["Print",               "⌘P"],
              ]],
              ["Format", [
                ["Bold",                "⌘B"],
                ["Italic",              "⌘I"],
                ["Underline",           "⌘U"],
                ["Heading 1 / 2 / 3",   "Alt 1 / 2 / 3"],
                ["Bullet list",         "⌘⇧7"],
                ["Numbered list",       "⌘⇧8"],
              ]],
              ["Navigation", [
                ["Command palette",     "⌘K"],
                ["Find in document",    "⌘F"],
                ["Replace",             "⌘⇧H"],
                ["Outline",             "⌘⇧O"],
                ["Comments rail",       "⌘⇧C"],
                ["Focus mode",          "F11"],
              ]],
              ["Editing", [
                ["Undo / Redo",         "⌘Z / ⌘Y"],
                ["Increase font size",  "⌘⇧>"],
                ["Decrease font size",  "⌘⇧<"],
                ["Justify",             "⌘J"],
                ["Center / left / right","⌘E / ⌘L / ⌘R"],
                ["Insert link",         "⌘K (in selection)"],
              ]],
            ].map(([groupName, rows], gi) => (
              <div key={groupName} style={{
                padding: "28px 32px",
                borderTop: gi >= 2 ? `1px solid var(--rule)` : "none",
                borderLeft: gi % 2 === 1 ? `1px solid var(--rule)` : "none",
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.18em", color: "var(--accent)", marginBottom: 16 }}>
                  {groupName.toUpperCase()}
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {rows.map(([action, key], i) => (
                      <tr key={action} style={{ borderTop: i ? `1px dashed var(--rule)` : "none" }}>
                        <td style={{ padding: "10px 0", color: "var(--ink)", fontSize: 14 }}>{action}</td>
                        <td style={{ padding: "10px 0", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-2)" }}>
                          <span style={{ padding: "3px 8px", border: `1px solid var(--rule)`, background: "var(--surface-2)" }}>{key}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCX compat deep dive */}
      <section id="compat" style={{ padding: "100px 48px", borderTop: `1px solid var(--rule)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="DOCX COMPATIBILITY"
            title={["Round-tripping 5,128 documents,", { em: "every commit" }]}
            sub="A real corpus from the German Bundestag's published proceedings, the European Court of Auditors' annual reports, six EU regulators' public consultations, and the Project Sovereign team's own pilot customers."
          />

          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.018em" }}>How we measure</h3>
              <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
                Each document is opened, re-serialized, and compared to the original at three levels: structural XML diff, semantic content diff, and pixel diff of every page rendered at 200&nbsp;DPI. A document only counts as "passing" if all three diffs are clean.
              </p>
              <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
                Failures are reproduced as the smallest possible test case and added to the regression suite. Every commit runs the full corpus on a self-hosted CI runner in Frankfurt. The current main branch's report is published every Monday at 09:00&nbsp;CET.
              </p>
              <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6 }}>
                We do not run macros. We do not interpret VBA. If a document depends on a macro for its appearance, we flag it and refuse to render it rather than render it incorrectly. We believe this is the right default for office documents in 2026.
              </p>
            </div>
            <div>
              <StackBlocks
                rows={[
                  { name: "Body text + character formatting", role: "100%" },
                  { name: "Headings + outline level",         role: "100%" },
                  { name: "Lists (mixed bullet styles)",       role: "100%" },
                  { name: "Tables (merged, headers, borders)", role: " 99%" },
                  { name: "Track changes, comments",           role: "100%" },
                  { name: "Footnotes, endnotes",               role: " 99%" },
                  { name: "Sections, columns, page breaks",    role: " 98%" },
                  { name: "Drop caps, text frames",            role: " 96%" },
                  { name: "Inline + wrapped images",           role: " 99%" },
                  { name: "Office Math equations",             role: " 97%" },
                  { name: "Macros",                            role: "  N/A" },
                  { name: "Digital signatures",                role: "100%" },
                ]}
                ink="var(--ink)" ink2="var(--ink-2)" rule="var(--rule)"
              />
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </div>
  );
}

Object.assign(window, { PageEditor });
