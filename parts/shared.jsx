// Shared utilities: icons, palette helpers, small reusable bits.

const Icon = {
  Arrow: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12 H19" />
      <path d="M13 6 L19 12 L13 18" />
    </svg>
  ),
  Dot: ({ size = 8, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 8 8" style={{ display: "inline-block" }}><circle cx="4" cy="4" r="3" fill={color} /></svg>
  ),
  Lock: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="1.5" />
      <path d="M8 11 V7 a4 4 0 0 1 8 0 V11" />
    </svg>
  ),
  Shield: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L20 6 V12 Q20 18 12 21 Q4 18 4 12 V6 Z" />
    </svg>
  ),
  Server: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="6" rx="1" />
      <rect x="3" y="14" width="18" height="6" rx="1" />
      <circle cx="7" cy="7" r="0.5" fill={color} />
      <circle cx="7" cy="17" r="0.5" fill={color} />
    </svg>
  ),
  Code: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 7 L4 12 L9 17" />
      <path d="M15 7 L20 12 L15 17" />
    </svg>
  ),
  Doc: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3 H15 L19 7 V21 H6 Z" />
      <path d="M15 3 V7 H19" />
    </svg>
  ),
  Users: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3.5" />
      <path d="M3 20 a6 6 0 0 1 12 0" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M15 20 a4 4 0 0 1 6.5 -3" />
    </svg>
  ),
  Globe: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12 H21" />
      <path d="M12 3 Q17 7.5 17 12 Q17 16.5 12 21 Q7 16.5 7 12 Q7 7.5 12 3 Z" />
    </svg>
  ),
  Check: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12 L10 18 L20 6" />
    </svg>
  ),
  X: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  ),
  Bold: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4 H13 a4 4 0 0 1 0 8 H7 Z" />
      <path d="M7 12 H14.5 a4 4 0 0 1 0 8 H7 Z" />
    </svg>
  ),
  Italic: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4 H18" />
      <path d="M6 20 H14" />
      <path d="M14 4 L10 20" />
    </svg>
  ),
  Underline: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4 V12 a5 5 0 0 0 10 0 V4" />
      <path d="M5 20 H19" />
    </svg>
  ),
  ListBullet: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6" r="1" fill={color} />
      <circle cx="5" cy="12" r="1" fill={color} />
      <circle cx="5" cy="18" r="1" fill={color} />
      <path d="M10 6 H20" />
      <path d="M10 12 H20" />
      <path d="M10 18 H20" />
    </svg>
  ),
  ListNumber: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5 H5 V9" />
      <path d="M3 9 H6" />
      <path d="M4 13 a1 1 0 1 1 2 0 c0 1 -2 1.5 -2 3 H6" />
      <path d="M4 18 a1 1 0 1 1 0 2 a1 1 0 1 1 0 -2" />
      <path d="M10 6 H20" />
      <path d="M10 12 H20" />
      <path d="M10 18 H20" />
    </svg>
  ),
  Quote: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7 V12 a3 3 0 0 1 -3 3" />
      <path d="M16 7 V12 a3 3 0 0 1 -3 3" />
    </svg>
  ),
  Link: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14 a4 4 0 0 1 0 -5.6 L13 5 a4 4 0 0 1 5.6 5.6 L17 12" />
      <path d="M14 10 a4 4 0 0 1 0 5.6 L11 19 a4 4 0 0 1 -5.6 -5.6 L7 12" />
    </svg>
  ),
  Comment: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6 a2 2 0 0 1 2 -2 H18 a2 2 0 0 1 2 2 V15 a2 2 0 0 1 -2 2 H10 L6 21 V17 H6 a2 2 0 0 1 -2 -2 Z" />
    </svg>
  ),
  Chevron: ({ size = 14, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9 L12 15 L18 9" />
    </svg>
  ),
};

// "Civic" classification stamp, gives the page a sovereign-document feel
function ClassificationStamp({ label = "EU // SOVEREIGN", code = "DOC-CLS-01", color }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "4px 10px",
      border: `1px solid ${color || "currentColor"}`,
      color: color || "currentColor",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      lineHeight: 1.4,
      whiteSpace: "nowrap",
    }}>
      <span>{label}</span>
      <span style={{ opacity: 0.55 }}>·</span>
      <span style={{ opacity: 0.7 }}>{code}</span>
    </span>
  );
}

// Civic numbering, large display numerals with a thin rule
function CivicNumeral({ n, color = "var(--accent)" }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.2em",
      color: color,
      borderTop: `1px solid currentColor`,
      paddingTop: 8,
      width: 32,
      textAlign: "left",
      opacity: 0.85,
    }}>
      {String(n).padStart(2, "0")}
    </div>
  );
}

// Map of Europe, abstracted, made of dots. Used as a hero background motif.
function EuropeDots({ width = 320, height = 240, color, opacity = 1 }) {
  // Hand-coded sparse grid of dots roughly outlining western/central Europe
  // (purely decorative; not geographically accurate)
  const dots = [
    // British isles
    [2,3],[2,4],[3,3],[3,4],[3,5],[2,5],
    // Iberia
    [3,9],[4,9],[4,10],[5,9],[5,10],[3,10],
    // France
    [5,7],[6,7],[6,8],[7,7],[7,8],[5,8],
    // Italy
    [9,8],[9,9],[10,9],[10,10],[10,11],
    // Germany / Benelux
    [7,5],[7,6],[8,5],[8,6],[8,7],[9,6],
    // Nordics
    [9,2],[9,3],[10,2],[10,3],[11,3],[11,4],[8,3],
    // Eastern Europe
    [10,5],[10,6],[11,5],[11,6],[11,7],[12,5],[12,6],[13,6],[12,7],
    // Balkans
    [11,8],[12,8],[11,9],[12,9],[10,8],
    // Baltic / Poland
    [9,4],[10,4],[11,4],
  ];
  const cellW = width / 16;
  const cellH = height / 13;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ opacity }}>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x * cellW + cellW / 2} cy={y * cellH + cellH / 2} r={1.6} fill={color} />
      ))}
      {/* Star ring – nod to EU flag, twelve dots in a circle */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const cx = width / 2 + Math.cos(a) * (width * 0.18);
        const cy = height / 2 + Math.sin(a) * (height * 0.20);
        return <circle key={`s${i}`} cx={cx} cy={cy} r={2.2} fill={color} opacity={0.35} />;
      })}
    </svg>
  );
}

// A tiny "stack" diagram: rectangles, labels, monospaced. Used in features.
function StackBlocks({ rows, ink, ink2, rule }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      border: `1px solid ${rule}`,
    }}>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr 80px",
          padding: "10px 14px",
          background: "var(--surface)",
          borderTop: i ? `1px solid ${rule}` : "none",
          color: ink,
        }}>
          <span style={{ color: ink2, letterSpacing: "0.1em" }}>{String(i + 1).padStart(2, "0")}</span>
          <span>{r.name}</span>
          <span style={{ color: ink2, textAlign: "right", letterSpacing: "0.05em" }}>{r.role}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Icon, ClassificationStamp, CivicNumeral, EuropeDots, StackBlocks });
