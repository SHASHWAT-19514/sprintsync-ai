// type BobInsightCardProps = {
//   files: string[];
//   suggestion: string;
// };

// export default function BobInsightCard({
//   files,
//   suggestion,
// }: BobInsightCardProps) {
//   return (
//     <div className="nes-container is-warning with-title">
//       <p className="title" style={{ fontSize: '0.7rem' }}>
//         <i className="nes-icon trophy is-small"></i> IBM BOB INSIGHTS
//       </p>

//       <div style={{ marginBottom: '1rem' }}>
//         <h3 style={{ fontSize: '0.7rem', marginBottom: '0.5rem', color: '#000' }}>
//           Affected Files:
//         </h3>
//         <div className="nes-list is-disc" style={{ fontSize: '0.6rem' }}>
//           {files.map((file, index) => (
//             <li key={index}>{file}</li>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3 style={{ fontSize: '0.7rem', marginBottom: '0.5rem', color: '#000' }}>
//           Debugging Insight:
//         </h3>
//         <p style={{ fontSize: '0.7rem', lineHeight: '1.6', color: '#000' }}>
//           {suggestion}
//         </p>
//       </div>
//     </div>
//   );
// }

// // Made with Bob
type BobInsightCardProps = {
  files: string[];
  suggestion: string;
};

export default function BobInsightCard({ files, suggestion }: BobInsightCardProps) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "20px 24px",
        borderColor: "rgba(167,139,250,0.2)",
        background: "linear-gradient(135deg, rgba(167,139,250,0.04) 0%, var(--bg-card) 60%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow blob */}
      <div style={{
        position: "absolute",
        top: -40,
        right: -40,
        width: 140,
        height: 140,
        borderRadius: "50%",
        background: "rgba(167,139,250,0.07)",
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          background: "rgba(167,139,250,0.15)",
          border: "1px solid rgba(167,139,250,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#A78BFA" strokeWidth="1.8" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5" stroke="#A78BFA" strokeWidth="1.8" strokeLinejoin="round"/>
            <path d="M2 12l10 5 10-5" stroke="#A78BFA" strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="section-label" style={{ color: "#A78BFA", marginBottom: "1px" }}>IBM Bob Insights</p>
          <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Codebase analysis</p>
        </div>
      </div>

      <hr className="divider" style={{ borderColor: "rgba(167,139,250,0.1)" }} />

      {/* Affected files */}
      <div style={{ marginBottom: "16px" }}>
        <p className="section-label" style={{ marginBottom: "10px" }}>Affected Files</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {files.map((file, index) => (
            <span
              key={index}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 10px",
                borderRadius: "var(--radius-sm)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border-default)",
                fontSize: "11px",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.01em",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#5EEAD4" strokeWidth="1.4"/>
                <path d="M9 2v4h4" stroke="#5EEAD4" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
              {file}
            </span>
          ))}
        </div>
      </div>

      {/* Insight */}
      <div style={{
        padding: "12px 14px",
        borderRadius: "var(--radius-md)",
        background: "rgba(167,139,250,0.06)",
        border: "1px solid rgba(167,139,250,0.15)",
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flexShrink: 0, marginTop: "2px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="#A78BFA" strokeWidth="1.8"/>
              <path d="M12 8v4M12 16v.5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
            {suggestion}
          </p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob