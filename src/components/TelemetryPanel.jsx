export default function TelemetryPanel({ telemetry }) {
  // Helper to colorize specific tactical states
  const getStatusColor = (val) => {
    if (val.includes('↓') || val.includes('Severe') || val.includes('Flaccid')) return '#ff4d4d'; // Red
    if (val.includes('↑') || val.includes('Spastic') || val.includes('Positive') || val.includes('Present')) return '#ffaa00'; // Warning Orange
    return '#00d4ff'; // Baseline Neon Blue
  };

  return (
    <div style={{ flex: 1, padding: '30px' }}>
      <h2 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '2px' }}>
        Clinical Telemetry
      </h2>
      <p style={{ color: '#888', marginBottom: '30px' }}>Live symptom output from effector organs.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {Object.entries(telemetry).map(([key, value]) => (
          <div key={key} style={{ backgroundColor: '#111', padding: '20px', borderRadius: '4px', border: '1px solid #333' }}>
            <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: getStatusColor(value) }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}