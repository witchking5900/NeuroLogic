import { t } from '../i18n';

export default function Sidebar({ view, setView, lang, setLang }) {
  const MenuItem = ({ id, label, icon }) => {
    const isActive = view === id;
    return (
      <button 
        onClick={() => setView(id)}
        style={{
          width: '100%', textAlign: 'left', padding: '16px 20px', backgroundColor: isActive ? '#cc1a1a' : 'transparent',
          color: isActive ? '#fff' : '#888', border: 'none', borderRadius: '8px', cursor: 'pointer',
          fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '15px',
          transition: 'all 0.2s ease', marginBottom: '10px'
        }}
      >
        <span style={{ fontSize: '18px' }}>{icon}</span>
        {t(label, lang)}
      </button>
    );
  };

  return (
    <div style={{ width: '280px', backgroundColor: '#0d1117', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px', paddingLeft: '10px' }}>
        <div style={{ color: '#ff4d4d', fontSize: '24px', fontWeight: 'bold' }}>∿</div>
        <div>
          <div style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>NeuroLogic</div>
          <div style={{ color: '#888', fontSize: '12px' }}>სტუდენტური გამოცემა</div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <MenuItem id="LEARNING" label="Learning Mode" icon="📖" />
        <MenuItem id="TESTING_DIAGNOSIS" label="Test: Diagnosis" icon="🧠" />
        <MenuItem id="TESTING_PATHO" label="Test: Pathophysiology" icon="⚡" />
      </div>

      <button 
        onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}
        style={{ padding: '12px', backgroundColor: '#050505', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s ease' }}
      >
        {lang === 'ka' ? '🇬🇪 ქართული' : '🇬🇧 English'}
      </button>
    </div>
  );
}