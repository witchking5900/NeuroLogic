import { MISSIONS } from '../state/useNeuroLogic';
import { t } from '../i18n';

export default function MissionControl({ state, dispatch, lang, setLang }) {
  return (
    <div style={{ backgroundColor: '#111', padding: '15px 20px', borderBottom: '2px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
      
      {/* Left Side: Auto-Simulate Dropdown ONLY */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ color: '#aaa', fontSize: '13px', fontWeight: 'bold' }}>
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
        
        {/* Reset button placed next to dropdown to quickly heal the simulated patient */}
        <button 
          onClick={() => dispatch({ type: 'HEAL_SYSTEM' })}
          style={{ padding: '8px 15px', backgroundColor: '#222', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold', marginLeft: '10px' }}
        >
          RESET
        </button>
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