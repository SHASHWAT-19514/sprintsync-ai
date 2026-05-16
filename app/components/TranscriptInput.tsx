"use client";

import { useState } from "react";

type TranscriptInputProps = {
  setTasks: (tasks: any[]) => void;
  setSummary: (summary: string) => void;
  setLoading: (loading: boolean) => void;
};

export default function TranscriptInput({ setTasks, setSummary, setLoading }: TranscriptInputProps) {
  const [transcript, setTranscript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  // Demo transcript templates
  const templates = {
    frontendSprint: `Frontend Sprint Planning - May 16, 2026

Sarah (Product Manager): Let's plan our frontend sprint. We need to ship the new dashboard by Friday.

Mike (Frontend Lead): I'll handle the React dashboard components. High priority. Should take 4 days with proper testing.

Jessica (UI Designer): I'll work on the responsive design and mobile layouts. Medium priority, targeting Thursday completion.

David (Frontend Dev): I can implement the data visualization charts using D3.js. High priority, need it by Wednesday for integration.

Sarah: Great! We also need form validation improvements.

Mike: I'll add that to my plate. Medium priority, can do it alongside the dashboard work.

Jessica: Don't forget the accessibility audit. That's important but lower priority.

David: I'll handle that next week. Low priority for this sprint.

Sarah: Perfect! Any blockers?

Team: No blockers, we're good to go!`,

    backendIncident: `Backend Incident Response Meeting - May 16, 2026

Alex (DevOps): We had a production outage at 3 AM. Database connection pool exhausted.

Maria (Backend Lead): I'll implement connection pool monitoring. High priority, need it deployed by tomorrow.

James (Backend Dev): I'll add database query optimization for the slow queries we identified. High priority, targeting end of day.

Alex: We also need better alerting for connection pool metrics.

Maria: Agreed. Medium priority, I can set that up after the monitoring is in place.

James: Should we add rate limiting to prevent this from happening again?

Alex: Yes, high priority. Can you handle that James?

James: Sure, I'll implement API rate limiting by Wednesday.

Maria: Let's also review our backup strategy. Low priority but important.

Alex: I'll schedule that for next week. Any other concerns?

Team: All clear, let's get these fixes deployed!`,

    qaPlanning: `QA Sprint Planning - May 16, 2026

Rachel (QA Lead): Let's plan our testing strategy for the authentication system release.

Tom (QA Engineer): I'll create comprehensive test cases for OAuth flow. High priority, need them ready by Tuesday.

Lisa (QA Engineer): I'll handle the security testing and penetration tests. High priority, targeting Wednesday completion.

Rachel: We also need regression testing for the existing features.

Tom: I can do that. Medium priority, will run the full suite by Thursday.

Lisa: Don't forget load testing. We need to ensure the system can handle 10k concurrent users.

Rachel: Good point. Tom, can you set that up?

Tom: Yes, medium priority. I'll use JMeter for load testing by end of week.

Lisa: We should also test the password reset flow thoroughly.

Rachel: Agreed. Low priority but necessary. Lisa, add that to your list.

Lisa: Will do. Should be done by Friday.

Rachel: Excellent! Any testing blockers?

Team: No blockers, ready to test!`,

    productPlanning: `Product Planning Meeting - May 16, 2026

Emma (Product Manager): Let's discuss our Q2 roadmap priorities.

Chris (Engineering Lead): We need to prioritize the API v2 migration. High priority, it's blocking several features.

Emma: Agreed. Timeline?

Chris: Two weeks if we dedicate the full team. High priority.

Sarah (Designer): We should also redesign the onboarding flow. User feedback shows it's confusing.

Emma: Good point. Medium priority, let's target next month.

Chris: We have technical debt in the payment processing system that needs attention.

Emma: How critical is it?

Chris: Medium priority. Not urgent but should be addressed soon to avoid future issues.

Sarah: Can we add dark mode support? Users have been requesting it.

Emma: Low priority for now. Let's focus on core functionality first.

Chris: We also need to update our documentation.

Emma: Low priority. Assign it to the team for next quarter.

Sarah: What about mobile app improvements?

Emma: Medium priority. Let's scope that out after the API migration.

Chris: Sounds good. Any other priorities?

Team: That covers everything for Q2!`,
  };

  const loadTemplate = (templateKey: keyof typeof templates) => {
    setTranscript(templates[templateKey]);
    setError("");
  };

  const handleGenerate = async () => {
    if (!transcript.trim()) {
      setError("Please enter a transcript first");
      return;
    }

    setError("");
    setIsGenerating(true);
    setLoading(true);
    setTasks([]);
    setSummary("");

    try {
      const response = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        setError(data.error || "Failed to generate tasks. Please try again.");
        return;
      }

      if (data.summary) {
        setSummary(data.summary);
      }

      if (data.tasks) {
        if (Array.isArray(data.tasks.tasks)) {
          setTasks(data.tasks.tasks);
        } else if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          setTasks([data.tasks]);
        }
      } else if (data.error) {
        setError(data.error);
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError("Failed to generate tasks. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
      setLoading(false);
    }
  };

  return (
    <div className="nes-container is-dark with-title">
      <p className="title" style={{ fontSize: '0.7rem' }}>MEETING TRANSCRIPT</p>

      {/* Demo Template Buttons */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Quick Demo Templates:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => loadTemplate('frontendSprint')}
            disabled={isGenerating}
            className="nes-btn is-primary"
            style={{ fontSize: '0.6rem', padding: '0.5rem' }}
          >
            Frontend Sprint
          </button>
          <button
            type="button"
            onClick={() => loadTemplate('backendIncident')}
            disabled={isGenerating}
            className="nes-btn is-error"
            style={{ fontSize: '0.6rem', padding: '0.5rem' }}
          >
            Backend Incident
          </button>
          <button
            type="button"
            onClick={() => loadTemplate('qaPlanning')}
            disabled={isGenerating}
            className="nes-btn is-success"
            style={{ fontSize: '0.6rem', padding: '0.5rem' }}
          >
            QA Planning
          </button>
          <button
            type="button"
            onClick={() => loadTemplate('productPlanning')}
            disabled={isGenerating}
            className="nes-btn is-warning"
            style={{ fontSize: '0.6rem', padding: '0.5rem' }}
          >
            Product Planning
          </button>
        </div>
      </div>

      <div className="nes-field" style={{ marginBottom: '1rem' }}>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="nes-textarea is-dark"
          placeholder="Paste engineering meeting transcript here..."
          disabled={isGenerating}
          style={{
            minHeight: '300px',
            fontSize: '0.7rem',
            lineHeight: '1.6'
          }}
        />
      </div>

      <button
        type="button"
        className={`nes-btn ${isGenerating ? 'is-disabled' : 'is-success'}`}
        onClick={handleGenerate}
        disabled={isGenerating}
        style={{
          width: '100%',
          fontSize: '0.7rem'
        }}
      >
        {isGenerating ? (
          <>
            <i className="nes-icon trophy is-small"></i> Generating Tasks...
          </>
        ) : (
          <>
            <i className="nes-icon star is-small"></i> Generate Engineering Tasks
          </>
        )}
      </button>

      {error && (
        <div className="nes-container is-error" style={{ marginTop: '1rem', padding: '1rem' }}>
          <p style={{ fontSize: '0.6rem' }}>{error}</p>
        </div>
      )}
    </div>
  );
}

// Made with Bob
