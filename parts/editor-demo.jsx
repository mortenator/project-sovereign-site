// The live document editor demo, centerpiece of the hero.
// Three modes:
//   "live"    , fully editable contenteditable area with working toolbar
//   "animated", types itself, applies formatting on a timeline
//   "static"  , pre-rendered, no caret, no animation

// Inject editor-specific styles once.
(function injectEditorCss() {
  if (typeof document === "undefined" || document.getElementById("ps-editor-css")) return;
  const s = document.createElement("style");
  s.id = "ps-editor-css";
  s.textContent = `
    .ps-editor-doc {
      outline: none;
      font-family: 'Crimson Pro', Georgia, serif;
      font-size: 16px;
      line-height: 1.65;
      color: var(--ink);
      caret-color: var(--accent);
      letter-spacing: -0.003em;
    }
    .ps-editor-doc h1 {
      font-family: 'Crimson Pro', Georgia, serif;
      font-size: 30px;
      font-weight: 400;
      letter-spacing: -0.02em;
      margin: 0 0 6px;
      line-height: 1.15;
    }
    .ps-editor-doc h2 {
      font-family: 'Crimson Pro', Georgia, serif;
      font-size: 20px;
      font-weight: 400;
      letter-spacing: -0.015em;
      margin: 22px 0 6px;
      line-height: 1.25;
    }
    .ps-editor-doc p {
      margin: 0 0 14px;
    }
    .ps-editor-doc ul, .ps-editor-doc ol {
      margin: 4px 0 16px;
      padding-left: 22px;
    }
    .ps-editor-doc li { margin: 4px 0; }
    .ps-editor-doc .doc-subtitle {
      font-family: 'Inter Tight', system-ui, sans-serif;
      font-size: 12px;
      letter-spacing: 0.16em;
      color: var(--ink-2);
      text-transform: uppercase;
      margin: 0 0 22px;
    }
    .ps-editor-doc .doc-hl {
      background: oklch(0.85 0.13 86 / 0.4);
      padding: 0 2px;
      border-radius: 1px;
    }
    html[data-theme="dark"] .ps-editor-doc .doc-hl {
      background: oklch(0.55 0.13 86 / 0.35);
    }
    .ps-editor-doc .doc-comment-mark {
      background: oklch(0.85 0.06 60 / 0.55);
      border-bottom: 2px solid oklch(0.78 0.13 86);
      padding: 1px 1px;
      cursor: help;
    }
    html[data-theme="dark"] .ps-editor-doc .doc-comment-mark {
      background: oklch(0.5 0.08 60 / 0.35);
    }
    .ps-toolbtn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--ink-2);
      cursor: pointer;
      transition: background 160ms, color 160ms, border-color 160ms;
    }
    .ps-toolbtn:hover { background: var(--chip); color: var(--ink); }
    .ps-toolbtn.is-active { background: var(--accent-soft); color: var(--accent); }
    .ps-toolbtn.is-active.dark-flip { color: var(--ink); }
    .ps-toolsep { width: 1px; height: 18px; background: var(--rule); margin: 0 4px; }

    /* Animated caret for the "animated" mode */
    .ps-caret {
      display: inline-block;
      width: 1.5px;
      height: 1.05em;
      background: var(--accent);
      vertical-align: text-bottom;
      margin-left: 1px;
      animation: ps-blink 1.05s steps(1) infinite;
    }
    @keyframes ps-blink { 50% { opacity: 0; } }

    /* Subtle "fresh edit" flash for animated formatting */
    .ps-flash {
      animation: ps-flash-anim 600ms ease-out;
    }
    @keyframes ps-flash-anim {
      0% { background-color: oklch(0.85 0.13 250 / 0.35); }
      100% { background-color: transparent; }
    }
  `;
  document.head.appendChild(s);
})();

function ToolButton({ active, onClick, title, children, darkFlip }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`ps-toolbtn ${active ? "is-active" : ""} ${darkFlip ? "dark-flip" : ""}`}
    >
      {children}
    </button>
  );
}

function ToolSep() { return <span className="ps-toolsep" />; }

// ----- Document content presets -----

const DOC_PRESETS = {
  // angle: residency
  residency: {
    title: "EU AI Act, Compliance Memo",
    subtitle: "DRAFT // INTERNAL // CLS-PUB-002",
    blocks: [
      { type: "p", html: `Under Article 16 of the AI Act, the provider is responsible for ensuring that high-risk systems undergo conformity assessment <b>before being placed on the market</b>. This document collects the evidence required by our DPO to sign the dossier.` },
      { type: "h2", text: "Scope of this memo" },
      { type: "ul", items: [
        `Data flows for <b>doc-class&nbsp;01</b> documents`,
        `Sub-processor list with EEA residency confirmations`,
        `Audit-log retention policy and access procedures`,
        `Incident-response runbook and exercise log`,
      ] },
      { type: "p", html: `All data referenced in this memo is stored in <span class="doc-comment-mark">Frankfurt (eu-central-1)</span> with cold-tier replication to Stockholm. No data is processed outside the EEA at any stage of the pipeline.` },
    ],
    comments: [
      { author: "Anja Berger", role: "DPO", on: "Frankfurt (eu-central-1)", body: "Please add the AWS subprocessor letter as an attachment before circulation.", time: "2m" },
    ],
  },
  // angle: compliance
  compliance: {
    title: "NIS2 Article 21, Control Mapping",
    subtitle: "DRAFT // INTERNAL // CLS-SEC-004",
    blocks: [
      { type: "p", html: `Mapping our existing controls to the ten security measures listed in <b>Article 21</b>. Each row in the table below links to an evidence artefact stored in this same document suite.` },
      { type: "h2", text: "Risk analysis (a)" },
      { type: "ul", items: [
        `Annual risk register, last reviewed Q1 2026`,
        `Quarterly tabletop exercises (next: 14 Mar)`,
        `Third-party penetration test commissioned`,
      ] },
      { type: "p", html: `Supply-chain controls are documented under <span class="doc-comment-mark">Annex C</span>. We use only open-source components with a known provenance and pinned versions.` },
    ],
    comments: [
      { author: "Luca Ferri", role: "CISO", on: "Annex C", body: "Add the SBOM diff against the previous release here.", time: "8m" },
    ],
  },
  // angle: ownership
  ownership: {
    title: "Q2 Board Letter, Document Sovereignty",
    subtitle: "DRAFT // BOARD // CLS-EXE-001",
    blocks: [
      { type: "p", html: `Last quarter we replaced our cloud office suite with a self-hosted instance of Project Sovereign. <b>The migration took eleven working days.</b> No documents were lost. Every paragraph in this letter was written, reviewed, and signed off in the new editor.` },
      { type: "h2", text: "What changed for the business" },
      { type: "ul", items: [
        `Per-seat costs fell by <b>62%</b> on a five-year horizon`,
        `All knowledge work now lives in Frankfurt, on our own keys`,
        `Procurement signed off the new vendor list in one meeting`,
      ] },
      { type: "p", html: `For the first time in a decade we own the place where our work happens. <span class="doc-comment-mark">That feels significant.</span>` },
    ],
    comments: [
      { author: "Eva Schramm", role: "CEO", on: "That feels significant.", body: "Let's keep this line. It's the whole point.", time: "just now" },
    ],
  },
};

// Render a preset as HTML string (for static + initial state)
function renderPresetHtml(preset) {
  let html = `<div class="doc-subtitle">${preset.subtitle}</div>`;
  html += `<h1>${preset.title}</h1>`;
  for (const b of preset.blocks) {
    if (b.type === "p") html += `<p>${b.html}</p>`;
    if (b.type === "h2") html += `<h2>${b.text}</h2>`;
    if (b.type === "ul") html += `<ul>${b.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  }
  return html;
}

// ----- The editor itself -----

function EditorDemo({ mode = "live", angle = "residency", height = 560 }) {
  const docRef = React.useRef(null);
  const [activeStates, setActiveStates] = React.useState({ bold: false, italic: false, underline: false, ul: false, ol: false });
  const [wordCount, setWordCount] = React.useState(0);
  const [selectedRange, setSelectedRange] = React.useState(null);
  const [showLinkPopover, setShowLinkPopover] = React.useState(false);
  const preset = DOC_PRESETS[angle] || DOC_PRESETS.residency;

  // Mode flips: ensure the doc reflects the current angle when switching
  React.useEffect(() => {
    if (!docRef.current) return;
    if (mode === "static" || mode === "live") {
      docRef.current.innerHTML = renderPresetHtml(preset);
      updateWordCount();
    }
    // animated mode handled in its own effect
  }, [mode, angle]);

  function updateWordCount() {
    if (!docRef.current) return;
    const text = docRef.current.innerText || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }

  function refreshToolbarState() {
    if (typeof document === "undefined") return;
    try {
      setActiveStates({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        ul: document.queryCommandState("insertUnorderedList"),
        ol: document.queryCommandState("insertOrderedList"),
      });
    } catch {}
  }

  function exec(cmd, value = null) {
    if (mode !== "live") return;
    docRef.current?.focus();
    document.execCommand(cmd, false, value);
    refreshToolbarState();
    updateWordCount();
  }

  function applyHeading(tag) {
    if (mode !== "live") return;
    docRef.current?.focus();
    document.execCommand("formatBlock", false, tag);
    refreshToolbarState();
  }

  // Animated typewriter
  React.useEffect(() => {
    if (mode !== "animated") return;
    const el = docRef.current;
    if (!el) return;

    let cancelled = false;
    el.innerHTML = "";

    // Build a script of "ops": typeText, formatBlock, etc.
    // To keep it simple, we stream the full HTML char by char,
    // pausing on tags so they appear instantly.
    const fullHtml = renderPresetHtml(preset);

    // Insert an initial caret element
    const caret = document.createElement("span");
    caret.className = "ps-caret";

    let i = 0;
    let buffer = "";

    function tick() {
      if (cancelled) return;
      // Skip full tags instantly
      if (fullHtml[i] === "<") {
        const close = fullHtml.indexOf(">", i);
        buffer += fullHtml.slice(i, close + 1);
        i = close + 1;
      } else if (fullHtml[i] === "&") {
        const close = fullHtml.indexOf(";", i);
        buffer += fullHtml.slice(i, close + 1);
        i = close + 1;
      } else {
        buffer += fullHtml[i];
        i += 1;
      }
      // Render buffer + caret
      el.innerHTML = buffer;
      // Append caret at end
      // Find last text node and append caret after it
      const range = document.createRange();
      if (el.lastChild) {
        try {
          el.appendChild(caret);
        } catch {}
      }

      if (i < fullHtml.length) {
        // Variable delay – fast for spaces, slower for letters, pause on punctuation
        const c = fullHtml[i - 1] || "";
        let delay = 14;
        if (c === " ") delay = 8;
        else if (".!?".includes(c)) delay = 280;
        else if (",;:".includes(c)) delay = 140;
        else delay = 14 + Math.random() * 18;
        setTimeout(tick, delay);
      } else {
        // Done, remove caret after a beat, then loop
        setTimeout(() => {
          if (cancelled) return;
          caret.remove();
          setTimeout(() => {
            if (cancelled) return;
            // restart
            i = 0; buffer = "";
            tick();
          }, 4500);
        }, 800);
      }
      updateWordCount();
    }

    setTimeout(tick, 600);
    return () => {
      cancelled = true;
      caret.remove();
    };
  }, [mode, angle]);

  // Track selection in live mode for toolbar state + link popover positioning
  React.useEffect(() => {
    if (mode !== "live") return;
    function onSelect() {
      refreshToolbarState();
    }
    document.addEventListener("selectionchange", onSelect);
    return () => document.removeEventListener("selectionchange", onSelect);
  }, [mode]);

  // Catch enter on bullet exit etc.
  function onKeyDown(e) {
    if (mode !== "live") return;
    if (e.key === "b" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); exec("bold"); }
    else if (e.key === "i" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); exec("italic"); }
    else if (e.key === "u" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); exec("underline"); }
  }

  const interactable = mode === "live";

  // Avatar collaborators
  const collaborators = [
    { initial: "A", color: "oklch(0.55 0.16 250)", name: "Anja" },
    { initial: "L", color: "oklch(0.55 0.16 30)", name: "Luca" },
    { initial: "E", color: "oklch(0.55 0.14 145)", name: "Eva" },
  ];

  return (
    <div style={{
      background: "var(--surface)",
      border: `1px solid var(--rule)`,
      boxShadow: "0 30px 60px -20px rgba(11,18,32,0.18), 0 1px 0 rgba(255,255,255,0.6) inset",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: height,
    }}>

      {/* Top chrome, filename, share, collaborators */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: "12px 16px",
        borderBottom: `1px solid var(--rule)`,
        gap: 12, fontSize: 13,
        background: "var(--surface-2)",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "var(--rule-strong)" }}></span>
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "var(--rule-strong)" }}></span>
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "var(--rule-strong)" }}></span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, marginLeft: 6 }}>
          <Icon.Doc size={13} color="var(--ink-2)" />
          <span style={{ color: "var(--ink)", fontWeight: 500 }}>{preset.title}.docx</span>
          <span style={{ color: "var(--ink-3)", fontSize: 12, fontFamily: "var(--font-mono)" }}>· v0.4</span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em",
            color: "var(--accent)", border: `1px solid var(--accent)`, padding: "2px 6px",
            marginLeft: 6,
          }}>EEA-DE</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {collaborators.map((c, i) => (
            <span key={c.initial} title={c.name} style={{
              width: 24, height: 24, borderRadius: 999,
              display: "grid", placeItems: "center",
              background: c.color, color: "#fff",
              fontSize: 11, fontWeight: 600,
              border: `2px solid var(--surface-2)`,
              marginLeft: i ? -8 : 0,
              zIndex: 10 - i,
            }}>
              {c.initial}
            </span>
          ))}
        </div>
        <span style={{
          color: "var(--ink-2)", fontSize: 11.5,
          fontFamily: "var(--font-mono)", letterSpacing: "0.08em",
          marginLeft: 6,
        }}>
          <span style={{ color: "var(--green)" }}>●</span> SAVED
        </span>
      </div>

      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 2,
        padding: "8px 12px",
        borderBottom: `1px solid var(--rule)`,
        background: "var(--surface)",
        flexWrap: "wrap",
      }}>
        {/* Style dropdown (visual only) */}
        <button type="button" disabled={!interactable} className="ps-toolbtn" style={{ width: "auto", padding: "0 10px", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "var(--ink)" }}>Body</span>
          <Icon.Chevron size={11} color="var(--ink-2)" />
        </button>
        <ToolSep />
        <ToolButton active={activeStates.bold} onClick={() => exec("bold")} title="Bold (⌘B)"><Icon.Bold /></ToolButton>
        <ToolButton active={activeStates.italic} onClick={() => exec("italic")} title="Italic (⌘I)"><Icon.Italic /></ToolButton>
        <ToolButton active={activeStates.underline} onClick={() => exec("underline")} title="Underline (⌘U)"><Icon.Underline /></ToolButton>
        <ToolSep />
        <ToolButton onClick={() => applyHeading("H1")} title="Heading 1">
          <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 500 }}>H1</span>
        </ToolButton>
        <ToolButton onClick={() => applyHeading("H2")} title="Heading 2">
          <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 500 }}>H2</span>
        </ToolButton>
        <ToolButton onClick={() => applyHeading("P")} title="Paragraph">
          <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 500 }}>¶</span>
        </ToolButton>
        <ToolSep />
        <ToolButton active={activeStates.ul} onClick={() => exec("insertUnorderedList")} title="Bullet list"><Icon.ListBullet /></ToolButton>
        <ToolButton active={activeStates.ol} onClick={() => exec("insertOrderedList")} title="Numbered list"><Icon.ListNumber /></ToolButton>
        <ToolButton onClick={() => applyHeading("BLOCKQUOTE")} title="Quote"><Icon.Quote /></ToolButton>
        <ToolSep />
        <ToolButton onClick={() => {
          const url = window.prompt("Enter URL");
          if (url) exec("createLink", url);
        }} title="Insert link"><Icon.Link /></ToolButton>
        <ToolButton onClick={() => exec("hiliteColor", "#ffe487")} title="Highlight">
          <span style={{ width: 14, height: 14, background: "oklch(0.85 0.13 86 / 0.6)", display: "inline-block" }}></span>
        </ToolButton>
        <ToolButton onClick={() => alert("Comment added (demo).")} title="Comment"><Icon.Comment /></ToolButton>
        <ToolSep />
        <div style={{ flex: 1 }} />
        {/* Mode pill */}
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em",
          color: "var(--ink-2)", padding: "4px 8px",
          border: `1px solid var(--rule)`,
        }}>
          {mode === "live" ? "LIVE · TYPE HERE" : mode === "animated" ? "AUTOPLAY" : "PREVIEW"}
        </span>
      </div>

      {/* Document + comments */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", flex: 1, minHeight: 0 }}>
        <div style={{
          padding: "32px 56px 32px 56px",
          overflow: "auto",
          background: "var(--surface)",
        }}>
          {/* "Page" wrapper for the document feel, subtle ruled margin */}
          <div style={{ maxWidth: 620, margin: "0 auto", position: "relative" }}>
            <div
              ref={docRef}
              className="ps-editor-doc"
              contentEditable={interactable}
              suppressContentEditableWarning
              onKeyDown={onKeyDown}
              onInput={updateWordCount}
              onBlur={refreshToolbarState}
              spellCheck={false}
              style={{ minHeight: 360 }}
              dangerouslySetInnerHTML={{ __html: mode === "animated" ? "" : renderPresetHtml(preset) }}
            />
          </div>
        </div>

        {/* Comments rail */}
        <aside style={{
          borderLeft: `1px solid var(--rule)`,
          padding: "20px 18px",
          background: "var(--surface-2)",
          overflowY: "auto",
          fontSize: 12.5,
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em",
            color: "var(--ink-2)", textTransform: "uppercase", marginBottom: 14,
          }}>Comments · {preset.comments.length}</div>
          {preset.comments.map((c, i) => (
            <div key={i} style={{
              padding: 12,
              border: `1px solid var(--rule)`,
              background: "var(--surface)",
              marginBottom: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 999,
                  display: "grid", placeItems: "center",
                  background: "oklch(0.55 0.16 250)", color: "#fff",
                  fontSize: 10, fontWeight: 600,
                }}>{c.author[0]}</span>
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>{c.author}</span>
                <span style={{ color: "var(--ink-3)", fontSize: 11 }}>· {c.role}</span>
              </div>
              <div style={{
                fontSize: 11, color: "var(--ink-2)", fontFamily: "var(--font-mono)",
                marginBottom: 6,
                padding: "2px 6px", background: "var(--chip)", display: "inline-block",
              }}>
                on "{c.on}"
              </div>
              <div style={{ color: "var(--ink)", lineHeight: 1.5 }}>{c.body}</div>
              <div style={{ marginTop: 8, fontSize: 11, color: "var(--ink-3)" }}>{c.time}</div>
            </div>
          ))}

          <div style={{
            marginTop: 6, padding: 12,
            border: `1px dashed var(--rule)`,
            color: "var(--ink-2)", fontSize: 11.5, lineHeight: 1.55,
          }}>
            Real-time presence via Yjs CRDT. No central server holds your prose.
          </div>
        </aside>
      </div>

      {/* Status bar */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: "8px 16px",
        borderTop: `1px solid var(--rule)`,
        background: "var(--surface-2)",
        fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em",
        color: "var(--ink-2)",
        gap: 18,
      }}>
        <span>Page 1 / 4</span>
        <span>·</span>
        <span>{wordCount} WORDS</span>
        <span>·</span>
        <span>DOCX</span>
        <div style={{ flex: 1 }} />
        <span style={{ color: "var(--accent)" }}>
          <Icon.Globe size={11} color="var(--accent)" />&nbsp;&nbsp;FRANKFURT · EU-CENTRAL-1
        </span>
        <span>·</span>
        <span>AES-256 AT REST</span>
      </div>
    </div>
  );
}

Object.assign(window, { EditorDemo, DOC_PRESETS });
