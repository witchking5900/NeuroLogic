import { useState } from 'react';
import { useNeuroLogic } from './state/useNeuroLogic';
import HardwarePanel from './components/HardwarePanel';
import TelemetryPanel from './components/TelemetryPanel';
import MissionControl from './components/MissionControl';

export default function App() {
  const [state, dispatch] = useNeuroLogic();
  // Georgian set as the primary operating language
  const [lang, setLang] = useState('ka'); 

  return (
    <div style={{ 
      backgroundColor: '#0a0a0a', 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column', 
      fontFamily: 'monospace',
      margin: 0
    }}>
      
      {/* Top Command Bar (Simulator & i18n) */}
      <MissionControl state={state} dispatch={dispatch} lang={lang} setLang={setLang} />
      
      {/* Split Screen Tactical HUD */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        <HardwarePanel 
          nodes={state.nodes} 
          arteries={state.arteries} 
          dispatch={dispatch} 
          lang={lang} 
        />
        
        <TelemetryPanel 
          telemetry={state.telemetry} 
          lang={lang} 
        />
      </div>
      
    </div>
  )
}