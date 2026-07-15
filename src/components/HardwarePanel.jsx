export default function HardwarePanel({ nodes, dispatch }) {
  return (
    <div style={{ flex: 1, padding: '30px', borderRight: '2px solid #333' }}>
      <h2 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '2px' }}>
        Hardware: Corticospinal Tract
      </h2>
      <p style={{ color: '#888', marginBottom: '30px' }}>Click a node to sever the connection.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {nodes.map(node => (
          <button
            key={node.id}
            onClick={() => dispatch({ type: 'SEVER_NODE', payload: node.id })}
            style={{
              padding: '18px',
              backgroundColor: node.isDamaged ? '#3a0000' : '#111',
              color: node.isDamaged ? '#ff4d4d' : '#00d4ff',
              border: `1px solid ${node.isDamaged ? '#ff4d4d' : '#00d4ff'}`,
              borderRadius: '4px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'monospace',
              fontSize: '14px',
              transition: 'all 0.15s ease-in-out'
            }}
          >
            <strong>[{node.classification}]</strong> {node.label} 
            {node.isDamaged ? " [ !! OFFLINE !! ]" : ""}
          </button>
        ))}
      </div>

      <button
        onClick={() => dispatch({ type: 'HEAL_SYSTEM' })}
        style={{ 
          marginTop: '40px', padding: '12px 24px', backgroundColor: '#00d4ff', 
          color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' 
        }}
      >
        INITIATE REPAIR PROTOCOL
      </button>
    </div>
  );
}