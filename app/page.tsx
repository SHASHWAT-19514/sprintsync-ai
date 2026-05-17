// "use client";

// import { useState } from "react";
// import TranscriptInput from "@/app/components/TranscriptInput";
// import TaskCard from "@/app/components/TaskCard";
// import BobInsightCard from "@/app/components/BobInsightCard";
// import jsPDF from "jspdf";

// export default function Home() {
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [summary, setSummary] = useState<string>("");
//   const [loading, setLoading] = useState(false);

//   // Analytics calculation logic
//   const analytics = {
//     totalTasks: tasks.length,
//     highPriority: tasks.filter(t => t.priority?.toLowerCase().includes('high')).length,
//     mediumPriority: tasks.filter(t => t.priority?.toLowerCase().includes('medium')).length,
//     lowPriority: tasks.filter(t => t.priority?.toLowerCase().includes('low')).length,
//     backendTasks: tasks.filter(t => {
//       const title = t.title?.toLowerCase() || '';
//       return title.includes('backend') || title.includes('api') || title.includes('database') ||
//              title.includes('server') || title.includes('oauth') || title.includes('jwt');
//     }).length,
//     frontendTasks: tasks.filter(t => {
//       const title = t.title?.toLowerCase() || '';
//       return title.includes('frontend') || title.includes('ui') || title.includes('component') ||
//              title.includes('form') || title.includes('page') || title.includes('design');
//     }).length,
//     qaTasks: tasks.filter(t => {
//       const title = t.title?.toLowerCase() || '';
//       const owner = t.owner?.toLowerCase() || '';
//       return title.includes('test') || title.includes('qa') || owner.includes('qa') ||
//              title.includes('testing') || owner.includes('test');
//     }).length,
//     teamMembers: new Set(tasks.map(t => t.owner)).size,
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
    
//     doc.setFontSize(20);
//     doc.setFont("helvetica", "bold");
//     doc.text("SprintSync AI - Generated Tasks", 20, 20);
    
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");
//     doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    
//     if (summary) {
//       doc.setFontSize(14);
//       doc.setFont("helvetica", "bold");
//       doc.text("Meeting Summary:", 20, 45);
      
//       doc.setFontSize(10);
//       doc.setFont("helvetica", "normal");
//       const summaryLines = doc.splitTextToSize(summary, 170);
//       doc.text(summaryLines, 20, 55);
//     }
    
//     let yPosition = summary ? 75 : 45;
    
//     doc.setFontSize(14);
//     doc.setFont("helvetica", "bold");
//     doc.text("Tasks:", 20, yPosition);
//     yPosition += 10;
    
//     tasks.forEach((task, index) => {
//       if (yPosition > 270) {
//         doc.addPage();
//         yPosition = 20;
//       }
      
//       doc.setFontSize(12);
//       doc.setFont("helvetica", "bold");
//       doc.text(`${index + 1}. ${task.title || "Untitled Task"}`, 20, yPosition);
//       yPosition += 7;
      
//       doc.setFontSize(10);
//       doc.setFont("helvetica", "normal");
//       doc.text(`Owner: ${task.owner || "Unassigned"}`, 25, yPosition);
//       yPosition += 5;
      
//       doc.text(`Priority: ${task.priority || "Medium"}`, 25, yPosition);
//       yPosition += 5;
      
//       doc.text(`Deadline: ${task.deadline || "TBD"}`, 25, yPosition);
//       yPosition += 10;
//     });
    
//     doc.save("sprintsync-tasks.pdf");
//   };

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: '#212529' }}>
//       {/* Retro Header */}
//       <header className="nes-container is-dark with-title" style={{ margin: '2rem', marginBottom: '1rem' }}>
//         <p className="title" style={{ fontSize: '0.8rem' }}>SPRINTSYNC AI v1.0</p>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <i className="nes-icon trophy is-large"></i>
//             <div>
//               <h1 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>SprintSync AI</h1>
//               <p style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Powered by IBM WatsonX</p>
//             </div>
//           </div>
          
//           {tasks.length > 0 && (
//             <button 
//               type="button" 
//               className="nes-btn is-success"
//               onClick={exportToPDF}
//               style={{ fontSize: '0.7rem' }}
//             >
//               <i className="nes-icon star is-small"></i> Export PDF
//             </button>
//           )}
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="nes-container is-dark" style={{ margin: '2rem', textAlign: 'center' }}>
//         <h2 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>
//           <i className="nes-icon coin is-small"></i> Transform Meetings into Action <i className="nes-icon coin is-small"></i>
//         </h2>
//         <p style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: '1.8' }}>
//           AI-powered meeting analysis that extracts tasks, assigns owners, and sets priorities automatically
//         </p>
//       </div>

//       {/* Main Content */}
//       <main style={{ margin: '2rem' }}>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
//           {/* Left Column - Input */}
//           <div>
//             <TranscriptInput setTasks={setTasks} setSummary={setSummary} setLoading={setLoading} />
            
//             {/* Analytics Dashboard */}
//             {tasks.length > 0 && (
//               <div style={{ marginTop: '1rem' }}>
//                 <div className="nes-container is-dark with-title" style={{ marginBottom: '1rem' }}>
//                   <p className="title" style={{ fontSize: '0.7rem' }}>📊 ANALYTICS DASHBOARD</p>
                  
//                   {/* Priority Breakdown */}
//                   <div style={{ marginBottom: '1.5rem' }}>
//                     <h4 style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Priority Breakdown</h4>
//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
//                       <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}>
//                         <p style={{ fontSize: '1.2rem', color: '#ef4444', fontWeight: 'bold' }}>{analytics.highPriority}</p>
//                         <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>HIGH</p>
//                       </div>
//                       <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(234, 179, 8, 0.1)', borderRadius: '0.5rem' }}>
//                         <p style={{ fontSize: '1.2rem', color: '#eab308', fontWeight: 'bold' }}>{analytics.mediumPriority}</p>
//                         <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>MEDIUM</p>
//                       </div>
//                       <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '0.5rem' }}>
//                         <p style={{ fontSize: '1.2rem', color: '#22c55e', fontWeight: 'bold' }}>{analytics.lowPriority}</p>
//                         <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>LOW</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Task Type Breakdown */}
//                   <div style={{ marginBottom: '1.5rem' }}>
//                     <h4 style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Task Type Breakdown</h4>
//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
//                       <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem' }}>
//                         <p style={{ fontSize: '1.2rem', color: '#3b82f6', fontWeight: 'bold' }}>{analytics.backendTasks}</p>
//                         <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>BACKEND</p>
//                       </div>
//                       <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: '0.5rem' }}>
//                         <p style={{ fontSize: '1.2rem', color: '#a855f7', fontWeight: 'bold' }}>{analytics.frontendTasks}</p>
//                         <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>FRONTEND</p>
//                       </div>
//                       <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(236, 72, 153, 0.1)', borderRadius: '0.5rem' }}>
//                         <p style={{ fontSize: '1.2rem', color: '#ec4899', fontWeight: 'bold' }}>{analytics.qaTasks}</p>
//                         <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>QA/TEST</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Summary Stats */}
//                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
//                     <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '0.5rem' }}>
//                       <p style={{ fontSize: '1.5rem', color: '#22c55e', fontWeight: 'bold' }}>{analytics.totalTasks}</p>
//                       <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>TOTAL TASKS</p>
//                     </div>
//                     <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem' }}>
//                       <p style={{ fontSize: '1.5rem', color: '#3b82f6', fontWeight: 'bold' }}>{analytics.teamMembers}</p>
//                       <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>TEAM MEMBERS</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Output */}
//           <div>
//             {loading && (
//               <div className="nes-container is-dark" style={{ textAlign: 'center', padding: '3rem' }}>
//                 <i className="nes-icon trophy is-large"></i>
//                 <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: '#fff' }}>Analyzing Meeting...</p>
//                 <p style={{ fontSize: '0.6rem', marginTop: '0.5rem', color: '#94a3b8' }}>AI is extracting tasks</p>
//                 <progress className="nes-progress is-primary" value="50" max="100" style={{ marginTop: '1rem' }}></progress>
//               </div>
//             )}

//             {!loading && tasks.length === 0 && (
//               <div className="nes-container is-dark" style={{ textAlign: 'center', padding: '3rem' }}>
//                 <i className="nes-icon trophy is-large"></i>
//                 <h3 style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#fff' }}>Ready to Start</h3>
//                 <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', color: '#94a3b8', lineHeight: '1.8' }}>
//                   Paste a meeting transcript or load the demo to see AI-generated tasks
//                 </p>
//                 <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', fontSize: '0.6rem', color: '#64748b' }}>
//                   <span>Instant Analysis</span>
//                   <span>•</span>
//                   <span>Smart Extraction</span>
//                   <span>•</span>
//                   <span>Sprint Ready</span>
//                 </div>
//               </div>
//             )}

//             {!loading && summary && (
//               <div className="nes-container is-primary with-title" style={{ marginBottom: '1rem' }}>
//                 <p className="title" style={{ fontSize: '0.7rem' }}>MEETING SUMMARY</p>
//                 <p style={{ fontSize: '0.7rem', lineHeight: '1.8', color: '#fff' }}>{summary}</p>
//               </div>
//             )}

//             {!loading && tasks.length > 0 && (
//               <div>
//                 <div className="nes-container is-dark with-title">
//                   <p className="title" style={{ fontSize: '0.7rem' }}>GENERATED TASKS ({tasks.length})</p>
//                   <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '0.5rem' }}>
//                     {tasks.map((task: any, index: number) => (
//                       <TaskCard
//                         key={index}
//                         title={task.title || task.task || "Untitled Task"}
//                         owner={task.owner || task.assignee || "Unassigned"}
//                         priority={task.priority || "Medium"}
//                         deadline={task.deadline || task.due_date || "TBD"}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bob Insights */}
//         {!loading && tasks.length > 0 && (
//           <div style={{ marginTop: '2rem' }}>
//             <BobInsightCard
//               files={[
//                 "authMiddleware.js",
//                 "loginController.ts",
//                 "sessionValidator.ts",
//               ]}
//               suggestion="Recent JWT validation changes may be causing session parsing failures."
//             />
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="nes-container is-dark" style={{ margin: '2rem', marginTop: '3rem', textAlign: 'center' }}>
//         <p style={{ fontSize: '0.6rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
//           © 2026 SprintSync AI - Built for engineering teams
//         </p>
//         <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.6rem', flexWrap: 'wrap' }}>
//           <span style={{ color: '#a78bfa' }}>IBM WatsonX</span>
//           <span style={{ color: '#64748b' }}>•</span>
//           <span style={{ color: '#ec4899' }}>Next.js</span>
//           <span style={{ color: '#64748b' }}>•</span>
//           <span style={{ color: '#3b82f6' }}>TypeScript</span>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // Made with Bob
"use client";

import { useState } from "react";
import TranscriptInput from "@/app/components/TranscriptInput";
import TaskCard from "@/app/components/TaskCard";
import BobInsightCard from "@/app/components/BobInsightCard";
import jsPDF from "jspdf";

interface Task {
  title?: string;
  task?: string;
  owner?: string;
  assignee?: string;
  priority?: string;
  deadline?: string;
  due_date?: string;
}

// ── Stat pill helper component ─────────────────────────────────────────
const StatPill = ({
  value, label, color, bg,
}: { value: number; label: string; color: string; bg: string }) => (
  <div className="stat-pill" style={{ background: bg }}>
    <span style={{
      fontFamily: "var(--font-heading)",
      fontSize: "20px",
      fontWeight: 700,
      color,
      lineHeight: 1,
    }}>
      {value}
    </span>
    <span style={{ fontSize: "9px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>
      {label}
    </span>
  </div>
);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // ── Analytics calculation logic (untouched) ────────────────────────────
  const analytics = {
    totalTasks: tasks.length,
    highPriority:   tasks.filter(t => t.priority?.toLowerCase().includes("high")).length,
    mediumPriority: tasks.filter(t => t.priority?.toLowerCase().includes("medium")).length,
    lowPriority:    tasks.filter(t => t.priority?.toLowerCase().includes("low")).length,
    backendTasks: tasks.filter(t => {
      const title = t.title?.toLowerCase() || "";
      return title.includes("backend") || title.includes("api") || title.includes("database") ||
             title.includes("server")  || title.includes("oauth") || title.includes("jwt");
    }).length,
    frontendTasks: tasks.filter(t => {
      const title = t.title?.toLowerCase() || "";
      return title.includes("frontend") || title.includes("ui") || title.includes("component") ||
             title.includes("form")    || title.includes("page") || title.includes("design");
    }).length,
    qaTasks: tasks.filter(t => {
      const title = t.title?.toLowerCase() || "";
      const owner = t.owner?.toLowerCase() || "";
      return title.includes("test") || title.includes("qa") || owner.includes("qa") ||
             title.includes("testing") || owner.includes("test");
    }).length,
    teamMembers: new Set(tasks.map(t => t.owner)).size,
  };

  // ── PDF export (untouched) ─────────────────────────────────────────────
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("SprintSync AI - Generated Tasks", 20, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    if (summary) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Meeting Summary:", 20, 45);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const summaryLines = doc.splitTextToSize(summary, 170);
      doc.text(summaryLines, 20, 55);
    }
    let yPosition = summary ? 75 : 45;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Tasks:", 20, yPosition);
    yPosition += 10;
    tasks.forEach((task, index) => {
      if (yPosition > 270) { doc.addPage(); yPosition = 20; }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${task.title || "Untitled Task"}`, 20, yPosition);
      yPosition += 7;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Owner: ${task.owner || "Unassigned"}`, 25, yPosition); yPosition += 5;
      doc.text(`Priority: ${task.priority || "Medium"}`, 25, yPosition);     yPosition += 5;
      doc.text(`Deadline: ${task.deadline || "TBD"}`, 25, yPosition);        yPosition += 10;
    });
    doc.save("sprintsync-tasks.pdf");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>

      {/* ── Top nav ────────────────────────────────────────────────────── */}
      <header style={{
        borderBottom: "1px solid var(--border-subtle)",
        padding: "0 32px",
        height: "58px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(7,9,13,0.85)",
        backdropFilter: "blur(16px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Logo mark */}
          <div style={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            background: "linear-gradient(135deg, rgba(94,234,212,0.25) 0%, rgba(167,139,250,0.15) 100%)",
            border: "1px solid rgba(94,234,212,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#5EEAD4" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)" }}>
              SprintSync
            </span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "14px", color: "var(--accent-cyan)", marginLeft: "3px" }}>
              AI
            </span>
          </div>
          <div style={{
            padding: "2px 8px",
            borderRadius: "99px",
            background: "rgba(94,234,212,0.08)",
            border: "1px solid rgba(94,234,212,0.2)",
            fontSize: "9px",
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            color: "var(--accent-cyan)",
            letterSpacing: "0.06em",
          }}>
            v1.0
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Powered by IBM WatsonX</span>
          {tasks.length > 0 && (
            <button
              type="button"
              onClick={exportToPDF}
              style={{
                padding: "7px 14px",
                borderRadius: "var(--radius-sm)",
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.3)",
                color: "var(--success)",
                fontSize: "11px",
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(52,211,153,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(52,211,153,0.1)"; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3v12M8 11l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Export PDF
            </button>
          )}
        </div>
      </header>

      {/* ── Hero strip ─────────────────────────────────────────────────── */}
      <div style={{
        padding: "36px 32px 28px",
        borderBottom: "1px solid var(--border-subtle)",
        background: "linear-gradient(180deg, rgba(94,234,212,0.03) 0%, transparent 100%)",
      }}>
        <div style={{ maxWidth: "520px" }}>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1.25,
            marginBottom: "10px",
            letterSpacing: "-0.02em",
          }}>
            Transform meetings
            <br />
            <span style={{
              background: "linear-gradient(90deg, #5EEAD4, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              into action items.
            </span>
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            AI-powered analysis that extracts tasks, assigns owners, and sets priorities — from any engineering meeting transcript.
          </p>
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────── */}
      <main style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
        gap: "24px",
        padding: "28px 32px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TranscriptInput setTasks={setTasks} setSummary={setSummary} setLoading={setLoading} />

          {/* Analytics dashboard */}
          {tasks.length > 0 && (
            <div className="glass-card animate-fade-up" style={{ padding: "20px 24px" }}>
              <p className="section-label" style={{ marginBottom: "16px" }}>Analytics Dashboard</p>

              {/* Priority */}
              <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px", fontWeight: 500 }}>Priority</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "16px" }}>
                <StatPill value={analytics.highPriority}   label="High"   color="var(--danger)"  bg="var(--danger-dim)" />
                <StatPill value={analytics.mediumPriority} label="Medium" color="var(--warning)" bg="var(--warning-dim)" />
                <StatPill value={analytics.lowPriority}    label="Low"    color="var(--success)" bg="var(--success-dim)" />
              </div>

              <hr className="divider" />

              {/* Task types */}
              <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px", fontWeight: 500 }}>Task type</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "16px" }}>
                <StatPill value={analytics.backendTasks}  label="Backend"  color="var(--info)"           bg="var(--info-dim)" />
                <StatPill value={analytics.frontendTasks} label="Frontend" color="var(--accent-purple)"  bg="var(--accent-purple-dim)" />
                <StatPill value={analytics.qaTasks}       label="QA/Test"  color="#F472B6"               bg="rgba(244,114,182,0.1)" />
              </div>

              <hr className="divider" />

              {/* Totals */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "8px" }}>
                <StatPill value={analytics.totalTasks}   label="Total tasks"    color="var(--accent-cyan)"   bg="var(--accent-cyan-dim)" />
                <StatPill value={analytics.teamMembers}  label="Team members"   color="var(--info)"          bg="var(--info-dim)" />
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Loading state */}
          {loading && (
            <div className="glass-card" style={{ padding: "48px 24px", textAlign: "center" }}>
              <div style={{ position: "relative", display: "inline-flex", marginBottom: "20px" }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: "50%",
                  border: "2px solid rgba(94,234,212,0.15)",
                  borderTopColor: "var(--accent-cyan)",
                  animation: "spin 0.8s linear infinite",
                }} />
                <div style={{
                  position: "absolute",
                  inset: 8,
                  borderRadius: "50%",
                  border: "2px solid rgba(167,139,250,0.15)",
                  borderTopColor: "var(--accent-purple)",
                  animation: "spin 1.2s linear infinite reverse",
                }} />
              </div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
                Analyzing transcript…
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>AI is extracting tasks and priorities</p>
              <div style={{ marginTop: "20px", display: "flex", gap: "4px" }}>
                {[0,1,2,3,4,5,6].map(i => (
                  <div key={i} className="skeleton" style={{ height: "4px", flex: 1, opacity: 1 - i * 0.1 }} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && tasks.length === 0 && (
            <div className="glass-card" style={{ padding: "56px 32px", textAlign: "center" }}>
              <div style={{
                width: 56, height: 56,
                borderRadius: "14px",
                background: "var(--accent-cyan-dim)",
                border: "1px solid rgba(94,234,212,0.2)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="var(--accent-cyan)" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                Ready to extract tasks
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: "260px", margin: "0 auto 20px" }}>
                Paste a meeting transcript or pick a demo template to see AI-generated tasks appear here.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "11px", color: "var(--text-muted)" }}>
                {["Instant Analysis", "Smart Extraction", "Sprint Ready"].map((tag, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent-cyan)", display: "inline-block" }} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Summary card */}
          {!loading && summary && (
            <div
              className="glass-card animate-fade-up"
              style={{
                padding: "18px 20px",
                borderColor: "rgba(167,139,250,0.2)",
                background: "linear-gradient(135deg, rgba(167,139,250,0.05) 0%, var(--bg-card) 60%)",
              }}
            >
              <p className="section-label" style={{ color: "var(--accent-purple)", marginBottom: "10px" }}>
                Meeting Summary
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.75 }}>{summary}</p>
            </div>
          )}

          {/* Tasks list */}
          {!loading && tasks.length > 0 && (
            <div className="animate-fade-up">
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}>
                <p className="section-label">Generated Tasks</p>
                <span style={{
                  padding: "2px 10px",
                  borderRadius: "99px",
                  background: "var(--accent-cyan-dim)",
                  border: "1px solid rgba(94,234,212,0.2)",
                  fontSize: "10px",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  color: "var(--accent-cyan)",
                }}>
                  {tasks.length}
                </span>
              </div>

              <div style={{ maxHeight: "640px", overflowY: "auto", paddingRight: "4px" }}>
                {tasks.map((task: Task, index: number) => (
                  <div key={index} style={{ animationDelay: `${index * 0.04}s` }} className="animate-fade-up">
                    <TaskCard
                      title={task.title || task.task || "Untitled Task"}
                      owner={task.owner || task.assignee || "Unassigned"}
                      priority={task.priority || "Medium"}
                      deadline={task.deadline || task.due_date || "TBD"}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Bob Insights ───────────────────────────────────────────────── */}
      {!loading && tasks.length > 0 && (
        <div style={{ padding: "0 32px 32px", maxWidth: "1280px", margin: "0 auto" }} className="animate-fade-up">
          <BobInsightCard
            files={["authMiddleware.js", "loginController.ts", "sessionValidator.ts"]}
            suggestion="Recent JWT validation changes may be causing session parsing failures."
          />
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
          © 2026 SprintSync AI — Built for engineering teams
        </span>
        <div style={{ display: "flex", gap: "16px", fontSize: "11px" }}>
          {[["IBM WatsonX", "#A78BFA"], ["Next.js", "#5EEAD4"], ["TypeScript", "#60A5FA"]].map(([name, color]) => (
            <span key={name} style={{ color }}>{name}</span>
          ))}
        </div>
      </footer>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Made with Bob