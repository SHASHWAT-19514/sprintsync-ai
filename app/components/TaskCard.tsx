type TaskCardProps = {
  title: string;
  owner: string;
  priority: string;
  deadline: string;
};

export default function TaskCard({
  title,
  owner,
  priority,
  deadline,
}: TaskCardProps) {
  const getPriorityClass = (priority: string) => {
    const priorityLower = priority.toLowerCase();
    if (priorityLower.includes('high')) {
      return 'is-error';
    } else if (priorityLower.includes('medium')) {
      return 'is-warning';
    } else if (priorityLower.includes('low')) {
      return 'is-success';
    }
    return 'is-dark';
  };

  const getPriorityIcon = (priority: string) => {
    const priorityLower = priority.toLowerCase();
    if (priorityLower.includes('high')) {
      return 'heart';
    } else if (priorityLower.includes('medium')) {
      return 'star';
    } else if (priorityLower.includes('low')) {
      return 'trophy';
    }
    return 'coin';
  };

  return (
    <div className="nes-container is-dark with-title" style={{ marginBottom: '1rem' }}>
      <p className="title" style={{ fontSize: '0.6rem' }}>
        <i className={`nes-icon ${getPriorityIcon(priority)} is-small`}></i> {priority.toUpperCase()} PRIORITY
      </p>
      
      <h3 style={{ fontSize: '0.8rem', marginBottom: '1rem', color: '#fff' }}>
        {title}
      </h3>

      <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.7rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#94a3b8' }}>Owner:</span>
          <span style={{ color: '#fff' }}>{owner}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#94a3b8' }}>Deadline:</span>
          <span style={{ color: '#fff' }}>{deadline}</span>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <span className={`nes-badge ${getPriorityClass(priority)}`}>
          <span className="is-dark" style={{ fontSize: '0.5rem' }}>AI Generated</span>
        </span>
      </div>
    </div>
  );
}

// Made with Bob
