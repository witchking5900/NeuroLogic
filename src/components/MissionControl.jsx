import { MISSIONS } from '../state/useNeuroLogic';
import { t } from '../i18n';

export default function MissionControl({ state, dispatch, lang, setLang }) {
  return (
    <div style={{ backgroundColor: '#111', padding: '15px 20px', borderBottom: '2px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
      
      {/* Left Side: Simulation & Testing Controls */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button 
          onClick={() => dispatch({ type: 'HEAL_SYSTEM' })}
          style={{ padding: '10px 15px', backgroundColor: '#333', color: '#fff', border: '1px solid #555', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {t("[ SANDBOX MODE ]", lang)}
        </button>
        
        {/* NEW: Auto-Simulate Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid #444', paddingLeft: '15px', gap: '10px' }}>
          <span style={{ color: '#aaa', fontSize: '12px', fontWeight: 'bold' }}>
            {t("Simulate Clinical Condition", lang)}:
          </span>
          <select 
            onChange={(e) => {
              if (e.target.value) dispatch({ type: 'AUTO_SIMULATE', payload: e.target.value });
            }}
            value={state.gameMode === 'DEMO' && state.activeMission ? state.activeMission.id : ""}
            style={{ 
              padding: '8px 12px', backgroundColor: '#050505', color: '#a700ff', 
              border: '1px solid #a700ff', cursor: 'pointer', outline: 'none', fontWeight: 'bold', borderRadius: '3px' 
            }}
          >
            <option value="">-- {t("Select Condition", lang)} --</option>
            {MISSIONS.map(m => (
              <option key={`auto-${m.id}`} value={m.id}>{t(m.title, lang)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Middle: Exam / Verification Status (Only shows in SIMULATOR testing mode) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {state.gameMode === 'SIMULATOR' && (
          <>
            <button 
              onClick={() => dispatch({ type: 'VERIFY_SOLUTION' })}
              style={{ padding: '10px 20px', backgroundColor: '#ffaa00', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap', borderRadius: '3px' }}
            >
              {t("VERIFY LESION", lang)}
            </button>
            
            {state.missionStatus === 'SUCCESS' && <span style={{ color: '#00ff00', fontWeight: 'bold', letterSpacing: '1px' }}>{t("MISSION ACCOMPLISHED", lang)}</span>}
            {state.missionStatus === 'FAILED' && <span style={{ color: '#ff4d4d', fontWeight: 'bold', letterSpacing: '1px' }}>{t("PATIENT DECEASED (INCORRECT)", lang)}</span>}
          </>
        )}
      </div>

      {/* Right Side: Master Language Switch */}
      <button 
        onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}
        style={{
          padding: '8px 16px', backgroundColor: '#050505', color: '#00d4ff', border: '1px solid #00d4ff',
          borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px', transition: 'all 0.2s ease'
        }}
      >
        {lang === 'ka' ? '🇬🇪 KA' : '🇬🇧 EN'}
      </button>

    </div>
  );
}