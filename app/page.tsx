"use client";

import { useState } from "react";
import TranscriptInput from "@/app/components/TranscriptInput";
import TaskCard from "@/app/components/TaskCard";
import BobInsightCard from "@/app/components/BobInsightCard";
import jsPDF from "jspdf";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Analytics calculation logic
  const analytics = {
    totalTasks: tasks.length,
    highPriority: tasks.filter(t => t.priority?.toLowerCase().includes('high')).length,
    mediumPriority: tasks.filter(t => t.priority?.toLowerCase().includes('medium')).length,
    lowPriority: tasks.filter(t => t.priority?.toLowerCase().includes('low')).length,
    backendTasks: tasks.filter(t => {
      const title = t.title?.toLowerCase() || '';
      return title.includes('backend') || title.includes('api') || title.includes('database') ||
             title.includes('server') || title.includes('oauth') || title.includes('jwt');
    }).length,
    frontendTasks: tasks.filter(t => {
      const title = t.title?.toLowerCase() || '';
      return title.includes('frontend') || title.includes('ui') || title.includes('component') ||
             title.includes('form') || title.includes('page') || title.includes('design');
    }).length,
    qaTasks: tasks.filter(t => {
      const title = t.title?.toLowerCase() || '';
      const owner = t.owner?.toLowerCase() || '';
      return title.includes('test') || title.includes('qa') || owner.includes('qa') ||
             title.includes('testing') || owner.includes('test');
    }).length,
    teamMembers: new Set(tasks.map(t => t.owner)).size,
  };

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
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${task.title || "Untitled Task"}`, 20, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Owner: ${task.owner || "Unassigned"}`, 25, yPosition);
      yPosition += 5;
      
      doc.text(`Priority: ${task.priority || "Medium"}`, 25, yPosition);
      yPosition += 5;
      
      doc.text(`Deadline: ${task.deadline || "TBD"}`, 25, yPosition);
      yPosition += 10;
    });
    
    doc.save("sprintsync-tasks.pdf");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#212529' }}>
      {/* Retro Header */}
      <header className="nes-container is-dark with-title" style={{ margin: '2rem', marginBottom: '1rem' }}>
        <p className="title" style={{ fontSize: '0.8rem' }}>SPRINTSYNC AI v1.0</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <i className="nes-icon trophy is-large"></i>
            <div>
              <h1 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>SprintSync AI</h1>
              <p style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Powered by IBM WatsonX</p>
            </div>
          </div>
          
          {tasks.length > 0 && (
            <button 
              type="button" 
              className="nes-btn is-success"
              onClick={exportToPDF}
              style={{ fontSize: '0.7rem' }}
            >
              <i className="nes-icon star is-small"></i> Export PDF
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="nes-container is-dark" style={{ margin: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>
          <i className="nes-icon coin is-small"></i> Transform Meetings into Action <i className="nes-icon coin is-small"></i>
        </h2>
        <p style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: '1.8' }}>
          AI-powered meeting analysis that extracts tasks, assigns owners, and sets priorities automatically
        </p>
      </div>

      {/* Main Content */}
      <main style={{ margin: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Left Column - Input */}
          <div>
            <TranscriptInput setTasks={setTasks} setSummary={setSummary} setLoading={setLoading} />
            
            {/* Analytics Dashboard */}
            {tasks.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <div className="nes-container is-dark with-title" style={{ marginBottom: '1rem' }}>
                  <p className="title" style={{ fontSize: '0.7rem' }}>📊 ANALYTICS DASHBOARD</p>
                  
                  {/* Priority Breakdown */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Priority Breakdown</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                      <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}>
                        <p style={{ fontSize: '1.2rem', color: '#ef4444', fontWeight: 'bold' }}>{analytics.highPriority}</p>
                        <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>HIGH</p>
                      </div>
                      <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(234, 179, 8, 0.1)', borderRadius: '0.5rem' }}>
                        <p style={{ fontSize: '1.2rem', color: '#eab308', fontWeight: 'bold' }}>{analytics.mediumPriority}</p>
                        <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>MEDIUM</p>
                      </div>
                      <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '0.5rem' }}>
                        <p style={{ fontSize: '1.2rem', color: '#22c55e', fontWeight: 'bold' }}>{analytics.lowPriority}</p>
                        <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>LOW</p>
                      </div>
                    </div>
                  </div>

                  {/* Task Type Breakdown */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Task Type Breakdown</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                      <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem' }}>
                        <p style={{ fontSize: '1.2rem', color: '#3b82f6', fontWeight: 'bold' }}>{analytics.backendTasks}</p>
                        <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>BACKEND</p>
                      </div>
                      <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: '0.5rem' }}>
                        <p style={{ fontSize: '1.2rem', color: '#a855f7', fontWeight: 'bold' }}>{analytics.frontendTasks}</p>
                        <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>FRONTEND</p>
                      </div>
                      <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(236, 72, 153, 0.1)', borderRadius: '0.5rem' }}>
                        <p style={{ fontSize: '1.2rem', color: '#ec4899', fontWeight: 'bold' }}>{analytics.qaTasks}</p>
                        <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>QA/TEST</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '0.5rem' }}>
                      <p style={{ fontSize: '1.5rem', color: '#22c55e', fontWeight: 'bold' }}>{analytics.totalTasks}</p>
                      <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>TOTAL TASKS</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem' }}>
                      <p style={{ fontSize: '1.5rem', color: '#3b82f6', fontWeight: 'bold' }}>{analytics.teamMembers}</p>
                      <p style={{ fontSize: '0.5rem', color: '#94a3b8' }}>TEAM MEMBERS</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Output */}
          <div>
            {loading && (
              <div className="nes-container is-dark" style={{ textAlign: 'center', padding: '3rem' }}>
                <i className="nes-icon trophy is-large"></i>
                <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: '#fff' }}>Analyzing Meeting...</p>
                <p style={{ fontSize: '0.6rem', marginTop: '0.5rem', color: '#94a3b8' }}>AI is extracting tasks</p>
                <progress className="nes-progress is-primary" value="50" max="100" style={{ marginTop: '1rem' }}></progress>
              </div>
            )}

            {!loading && tasks.length === 0 && (
              <div className="nes-container is-dark" style={{ textAlign: 'center', padding: '3rem' }}>
                <i className="nes-icon trophy is-large"></i>
                <h3 style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#fff' }}>Ready to Start</h3>
                <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', color: '#94a3b8', lineHeight: '1.8' }}>
                  Paste a meeting transcript or load the demo to see AI-generated tasks
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', fontSize: '0.6rem', color: '#64748b' }}>
                  <span>Instant Analysis</span>
                  <span>•</span>
                  <span>Smart Extraction</span>
                  <span>•</span>
                  <span>Sprint Ready</span>
                </div>
              </div>
            )}

            {!loading && summary && (
              <div className="nes-container is-primary with-title" style={{ marginBottom: '1rem' }}>
                <p className="title" style={{ fontSize: '0.7rem' }}>MEETING SUMMARY</p>
                <p style={{ fontSize: '0.7rem', lineHeight: '1.8', color: '#fff' }}>{summary}</p>
              </div>
            )}

            {!loading && tasks.length > 0 && (
              <div>
                <div className="nes-container is-dark with-title">
                  <p className="title" style={{ fontSize: '0.7rem' }}>GENERATED TASKS ({tasks.length})</p>
                  <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    {tasks.map((task: any, index: number) => (
                      <TaskCard
                        key={index}
                        title={task.title || task.task || "Untitled Task"}
                        owner={task.owner || task.assignee || "Unassigned"}
                        priority={task.priority || "Medium"}
                        deadline={task.deadline || task.due_date || "TBD"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bob Insights */}
        {!loading && tasks.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <BobInsightCard
              files={[
                "authMiddleware.js",
                "loginController.ts",
                "sessionValidator.ts",
              ]}
              suggestion="Recent JWT validation changes may be causing session parsing failures."
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="nes-container is-dark" style={{ margin: '2rem', marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.6rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
          © 2026 SprintSync AI - Built for engineering teams
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#a78bfa' }}>IBM WatsonX</span>
          <span style={{ color: '#64748b' }}>•</span>
          <span style={{ color: '#ec4899' }}>Next.js</span>
          <span style={{ color: '#64748b' }}>•</span>
          <span style={{ color: '#3b82f6' }}>TypeScript</span>
        </div>
      </footer>
    </div>
  );
}

// Made with Bob
