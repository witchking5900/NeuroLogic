import { useState } from 'react';
import { MISSIONS } from '../state/useNeuroLogic';
import { t } from '../i18n';

export default function TestingPanel({ state, dispatch, lang }) {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");

  const handleGenerate = () => {
    setSelectedDiagnosis("");
    dispatch({ type: 'GENERATE_RANDOM' });
  };

  const isTestingActive = state.gameMode === 'TESTING' && state.activeMission;

  return (
    <div style={{ flex: 1.2, padding: '40px', backgroundColor: '#050505', borderRight: '2px solid #222', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      <div style={{ backgroundColor: '#0d1117', border: '1px solid #333', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
        
        <h2 style={{ color: '#fff', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '30px' }}>
          {t("Testing Mode", lang)}
        </h2>

        <button 
          onClick={handleGenerate}
          style={{ padding: '16px 30px', backgroundColor: '#00d4ff', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px', width: '100%', marginBottom: '40px', boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)' }}
        >
          {t("Generate Random Patient", lang)}
        </button>

        {!isTestingActive ? (
          <div style={{ color: '#555', fontFamily: 'monospace', padding: '20px', border: '1px dashed #333' }}>
            [ {t("Awaiting Patient Generation...", lang)} ]
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <select 
              value={selectedDiagnosis}
              onChange={(e) => setSelectedDiagnosis(e.target.value)}
              style={{ padding: '14px', backgroundColor: '#000', color: '#fff', border: '1px solid #555', borderRadius: '4px', fontSize: '15px', outline: 'none' }}
            >
              <option value="">-- {t("Select Diagnosis", lang)} --</option>
              {MISSIONS.map(m => (
                <option key={`exam-${m.id}`} value={m.id}>{t(m.title, lang)}</option>
              ))}
            </select>

            <button 
              onClick={() => dispatch({ type: 'SUBMIT_DIAGNOSIS', payload: selectedDiagnosis })}
              disabled={!selectedDiagnosis}
              style={{ padding: '14px', backgroundColor: selectedDiagnosis ? '#ffaa00' : '#222', color: selectedDiagnosis ? '#000' : '#555', border: 'none', borderRadius: '4px', cursor: selectedDiagnosis ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '15px' }}
            >
              {t("Confirm Diagnosis", lang)}
            </button>

            {state.missionStatus === 'SUCCESS' && (
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(0, 255, 0, 0.1)', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '1px' }}>
                {t("CORRECT DIAGNOSIS", lang)}
              </div>
            )}
            
            {state.missionStatus === 'FAILED' && (
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', border: '1px solid #ff4d4d', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '1px' }}>
                {t("INCORRECT DIAGNOSIS", lang)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}