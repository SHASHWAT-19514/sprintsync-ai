type BobInsightCardProps = {
  files: string[];
  suggestion: string;
};

export default function BobInsightCard({
  files,
  suggestion,
}: BobInsightCardProps) {
  return (
    <div className="nes-container is-warning with-title">
      <p className="title" style={{ fontSize: '0.7rem' }}>
        <i className="nes-icon trophy is-small"></i> IBM BOB INSIGHTS
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.7rem', marginBottom: '0.5rem', color: '#000' }}>
          Affected Files:
        </h3>
        <div className="nes-list is-disc" style={{ fontSize: '0.6rem' }}>
          {files.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '0.7rem', marginBottom: '0.5rem', color: '#000' }}>
          Debugging Insight:
        </h3>
        <p style={{ fontSize: '0.7rem', lineHeight: '1.6', color: '#000' }}>
          {suggestion}
        </p>
      </div>
    </div>
  );
}

// Made with Bob
