import { useState } from 'react';
import { MISSIONS } from '../state/useNeuroLogic';
import { t } from '../i18n';

export default function TestingPanel({ state, dispatch, lang }) {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");

  const handleGenerate = () => {
    setSelectedDiagnosis("");
    dispatch({ type: 'GENERATE_RANDOM_DIAGNOSIS' });
  };

  const isTestingActive = state.gameMode === 'TESTING_DIAGNOSIS' && state.activeMission;

  return (
    <div style={{ flex: 1.2, padding: '40px', backgroundColor: '#050505', borderRight: '2px solid #222', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#0d1117', border: '1px solid #333', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
        
        <h2 style={{ color: '#fff', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '30px' }}>
          {t("Test: Diagnosis", lang)}
        </h2>

        <button 
          onClick={handleGenerate}
          style={{ padding: '16px 30px', backgroundColor: '#b800ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', letterSpacing: '1px', width: '100%', marginBottom: '40px', boxShadow: '0 0 15px rgba(184, 0, 255, 0.3)' }}
        >
          {t("Generate Random Patient (Diagnosis)", lang)}
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
              style={{ padding: '14px', backgroundColor: selectedDiagnosis ? '#00d4ff' : '#222', color: selectedDiagnosis ? '#000' : '#555', border: 'none', borderRadius: '4px', cursor: selectedDiagnosis ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '15px' }}
            >
              {t("Confirm Diagnosis", lang)}
            </button>

            {state.missionStatus === 'SUCCESS' && (
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(0, 255, 0, 0.1)', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '1px' }}>
                {t("CORRECT DIAGNOSIS", lang)}
              </div>
            )}
            
            {state.missionStatus === 'FAILED' && state.feedback && (
              <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1a0a0a', border: '1px solid #ff4d4d', borderRadius: '4px', textAlign: 'left', lineHeight: '1.6' }}>
                <div style={{ color: '#ff4d4d', fontWeight: 'bold', marginBottom: '10px', fontSize: '16px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                  ❌ {t("INCORRECT DIAGNOSIS", lang)}
                </div>
                <div style={{ color: '#aaa', fontSize: '13px' }}>
                  <span style={{ color: '#ffaa00' }}>{t("Your diagnosis:", lang)}</span> {t(state.feedback.userSelection, lang)}
                </div>
                <div style={{ color: '#fff', fontSize: '13px', marginTop: '5px' }}>
                  <span style={{ color: '#00ff00' }}>{t("Correct diagnosis:", lang)}</span> {t(state.feedback.correctSelection, lang)}
                </div>
                <div style={{ color: '#00d4ff', fontSize: '13px', marginTop: '15px', fontStyle: 'italic' }}>
                  <span style={{ color: '#888', fontStyle: 'normal' }}>{t("Reasoning:", lang)}</span> {t(state.feedback.reason, lang)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}