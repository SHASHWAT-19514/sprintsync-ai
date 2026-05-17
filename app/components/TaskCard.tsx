// type TaskCardProps = {
//   title: string;
//   owner: string;
//   priority: string;
//   deadline: string;
// };

// export default function TaskCard({
//   title,
//   owner,
//   priority,
//   deadline,
// }: TaskCardProps) {
//   const getPriorityClass = (priority: string) => {
//     const priorityLower = priority.toLowerCase();
//     if (priorityLower.includes('high')) {
//       return 'is-error';
//     } else if (priorityLower.includes('medium')) {
//       return 'is-warning';
//     } else if (priorityLower.includes('low')) {
//       return 'is-success';
//     }
//     return 'is-dark';
//   };

//   const getPriorityIcon = (priority: string) => {
//     const priorityLower = priority.toLowerCase();
//     if (priorityLower.includes('high')) {
//       return 'heart';
//     } else if (priorityLower.includes('medium')) {
//       return 'star';
//     } else if (priorityLower.includes('low')) {
//       return 'trophy';
//     }
//     return 'coin';
//   };

//   return (
//     <div className="nes-container is-dark with-title" style={{ marginBottom: '1rem' }}>
//       <p className="title" style={{ fontSize: '0.6rem' }}>
//         <i className={`nes-icon ${getPriorityIcon(priority)} is-small`}></i> {priority.toUpperCase()} PRIORITY
//       </p>
      
//       <h3 style={{ fontSize: '0.8rem', marginBottom: '1rem', color: '#fff' }}>
//         {title}
//       </h3>

//       <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.7rem' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//           <span style={{ color: '#94a3b8' }}>Owner:</span>
//           <span style={{ color: '#fff' }}>{owner}</span>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//           <span style={{ color: '#94a3b8' }}>Deadline:</span>
//           <span style={{ color: '#fff' }}>{deadline}</span>
//         </div>
//       </div>

//       <div style={{ marginTop: '1rem' }}>
//         <span className={`nes-badge ${getPriorityClass(priority)}`}>
//           <span className="is-dark" style={{ fontSize: '0.5rem' }}>AI Generated</span>
//         </span>
//       </div>
//     </div>
//   );
// }

// // Made with Bob
type TaskCardProps = {
  title: string;
  owner: string;
  priority: string;
  deadline: string;
};

export default function TaskCard({ title, owner, priority, deadline }: TaskCardProps) {
  const getPriorityMeta = (priority: string) => {
    const p = priority.toLowerCase();
    if (p.includes("high"))   return { cls: "badge-high",   dot: "#F87171", label: "High"   };
    if (p.includes("medium")) return { cls: "badge-medium", dot: "#FBBF24", label: "Medium" };
    if (p.includes("low"))    return { cls: "badge-low",    dot: "#34D399", label: "Low"    };
    return { cls: "badge-ai", dot: "#5EEAD4", label: priority };
  };

  const meta = getPriorityMeta(priority);

  const getInitials = (name: string) =>
    name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const avatarColors = [
    ["#A78BFA", "rgba(167,139,250,0.15)"],
    ["#5EEAD4", "rgba(94,234,212,0.15)"],
    ["#60A5FA", "rgba(96,165,250,0.15)"],
    ["#F87171", "rgba(248,113,113,0.15)"],
    ["#FBBF24", "rgba(251,191,36,0.15)"],
  ];
  const ownerStr = owner || "U";
  const colorPair = avatarColors[ownerStr.charCodeAt(0) % avatarColors.length];

  return (
    <div
      className="glass-card animate-fade-up"
      style={{ marginBottom: "10px", padding: "16px 18px", position: "relative", overflow: "hidden" }}
    >
      {/* Accent bar */}
      <div style={{
        position: "absolute",
        left: 0,
        top: "14px",
        bottom: "14px",
        width: "3px",
        borderRadius: "0 3px 3px 0",
        background: meta.dot,
        opacity: 0.8,
      }} />

      <div style={{ paddingLeft: "10px" }}>
        {/* Priority badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <span className={`badge ${meta.cls}`}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: meta.dot, display: "inline-block" }} />
            {meta.label} Priority
          </span>
          <span className="badge badge-ai">AI</span>
        </div>

        {/* Task title */}
        <h3 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--text-primary)",
          lineHeight: 1.45,
          marginBottom: "12px",
        }}>
          {title}
        </h3>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Owner */}
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: colorPair[1],
              border: `1px solid ${colorPair[0]}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "9px",
              fontWeight: 700,
              color: colorPair[0],
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.03em",
              flexShrink: 0,
            }}>
              {getInitials(ownerStr)}
            </div>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{owner}</span>
          </div>

          <div style={{ width: "1px", height: "14px", background: "var(--border-default)" }} />

          {/* Deadline */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
              <rect x="2" y="3" width="12" height="11" rx="2" stroke="var(--text-muted)" strokeWidth="1.4"/>
              <path d="M5 1v2M11 1v2" stroke="var(--text-muted)" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M2 7h12" stroke="var(--text-muted)" strokeWidth="1.4"/>
            </svg>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{deadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob