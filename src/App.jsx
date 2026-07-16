import { useState, useEffect } from 'react';
import { useNeuroLogic } from './state/useNeuroLogic';
import HardwarePanel from './components/HardwarePanel';
import TelemetryPanel from './components/TelemetryPanel';
import TestingPanel from './components/TestingPanel';
import Sidebar from './components/Sidebar';

export default function App() {
  const [state, dispatch] = useNeuroLogic();
  const [lang, setLang] = useState('ka'); 
  const [view, setView] = useState('LEARNING'); // 'LEARNING' | 'TESTING_DIAGNOSIS' | 'TESTING_PATHO'
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

  // Auto-heal the system if the user switches modes mid-exam
  useEffect(() => {
    dispatch({ type: 'HEAL_SYSTEM' });
  }, [view, dispatch]);

  return (
    <>
      <style>{`
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        * { scrollbar-width: none; }
      `}</style>
      
      <div style={{ backgroundColor: '#0a0a0a', height: '100vh', display: 'flex', fontFamily: 'monospace', margin: 0, overflow: 'hidden' }}>
        
        <Sidebar view={view} setView={setView} lang={lang} setLang={setLang} />
        
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* CRITICAL FIX: Passing isExamMode to the HardwarePanel */}
          {view === 'LEARNING' && <HardwarePanel nodes={state.nodes} arteries={state.arteries} dispatch={dispatch} lang={lang} state={state} isExamMode={false} />}
          {view === 'TESTING_PATHO' && <HardwarePanel nodes={state.nodes} arteries={state.arteries} dispatch={dispatch} lang={lang} state={state} isExamMode={true} />}
          
          {view === 'TESTING_DIAGNOSIS' && <TestingPanel state={state} dispatch={dispatch} lang={lang} />}

          <TelemetryPanel telemetry={state.telemetry} lang={lang} />
          
        </div>
      </div>
    </>
  );
}