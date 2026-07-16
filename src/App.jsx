import { useState, useEffect } from 'react';
import { useNeuroLogic } from './state/useNeuroLogic';
import HardwarePanel from './components/HardwarePanel';
import TelemetryPanel from './components/TelemetryPanel';
import TestingPanel from './components/TestingPanel';
import Sidebar from './components/Sidebar';

export default function App() {
  const [state, dispatch] = useNeuroLogic();
  const [lang, setLang] = useState('ka'); 
  const [view, setView] = useState('LEARNING'); // 'LEARNING' | 'TESTING'
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkViewport);
    checkViewport(); 
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  if (isMobile) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#00d4ff', marginBottom: '20px' }}>NEUROLOGIC OS</h2>
        <p style={{ fontSize: '16px', color: '#aaa', maxWidth: '400px' }}>
          {lang === 'ka' ? "სიმულატორი ოპტიმიზებულია მხოლოდ დესკტოპისთვის ან ტაბლეტისთვის. გთხოვთ გამოიყენოთ კომპიუტერი კლინიკური სიზუსტისთვის." : "This simulator is optimized for desktop and tablet use only. Please access on a larger screen for clinical precision."}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* THE SCROLLBAR KILLER */}
      <style>{`
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        * { scrollbar-width: none; }
      `}</style>
      
      <div style={{ backgroundColor: '#0a0a0a', height: '100vh', display: 'flex', fontFamily: 'monospace', margin: 0, overflow: 'hidden' }}>
        
        {/* Left Navigation */}
        <Sidebar view={view} setView={setView} lang={lang} setLang={setLang} />
        
        {/* Dynamic Main Workspace */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {view === 'LEARNING' ? (
            <HardwarePanel nodes={state.nodes} arteries={state.arteries} dispatch={dispatch} lang={lang} />
          ) : (
            <TestingPanel state={state} dispatch={dispatch} lang={lang} />
          )}

          {/* Telemetry is omnipresent in both modes */}
          <TelemetryPanel telemetry={state.telemetry} lang={lang} />
          
        </div>
      </div>
    </>
  );
}