import { MISSIONS } from '../state/useNeuroLogic';
import { t } from '../i18n';

export default function MissionControl({ state, dispatch, lang, setLang }) {
  return (
    <div style={{ backgroundColor: '#111', padding: '15px 20px', borderBottom: '2px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* Left Side: Simulation Controls */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button 
          onClick={() => dispatch({ type: 'HEAL_SYSTEM' })}
          style={{ padding: '10px 15px', backgroundColor: '#333', color: '#fff', border: '1px solid #555', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {t("[ SANDBOX MODE ]", lang)}
        </button>
        
        {MISSIONS.map(m => (
          <button 
            key={m.id}
            onClick={() => dispatch({ type: 'START_MISSION', payload: m.id })}
            style={{ 
              padding: '10px 15px', 
              backgroundColor: state.activeMission?.id === m.id ? '#00d4ff' : '#222', 
              color: state.activeMission?.id === m.id ? '#000' : '#00d4ff', 
              border: '1px solid #00d4ff', 
              cursor: 'pointer', 
              fontWeight: 'bold' 
            }}
          >
            {t(`Load: ${m.title}`, lang)}
          </button>
        ))}
      </div>

      {/* Middle: Verification Status */}
      {state.gameMode === 'SIMULATOR' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={() => dispatch({ type: 'VERIFY_SOLUTION' })}
            style={{ padding: '10px 20px', backgroundColor: '#ffaa00', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }}
          >
            {t("VERIFY LESION", lang)}
          </button>
          
          {state.missionStatus === 'SUCCESS' && <span style={{ color: '#00ff00', fontWeight: 'bold', letterSpacing: '1px' }}>{t("MISSION ACCOMPLISHED", lang)}</span>}
          {state.missionStatus === 'FAILED' && <span style={{ color: '#ff4d4d', fontWeight: 'bold', letterSpacing: '1px' }}>{t("PATIENT DECEASED (INCORRECT)", lang)}</span>}
        </div>
      )}

      {/* Right Side: Master Language Switch */}
      <button 
        onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#050505',
          color: '#00d4ff',
          border: '1px solid #00d4ff',
          borderRadius: '3px',
          cursor: 'pointer',
          fontWeight: 'bold',
          letterSpacing: '1px',
          transition: 'all 0.2s ease',
          marginLeft: '20px'
        }}
      >
        {lang === 'ka' ? '🇬🇪 KA' : '🇬🇧 EN'}
      </button>

    </div>
  );
}