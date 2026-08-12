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
  const [mobileWarningDismissed, setMobileWarningDismissed] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkViewport);
    checkViewport(); 
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Auto-heal the system if the user switches modes mid-exam
  useEffect(() => {
    dispatch({ type: 'HEAL_SYSTEM' });
  }, [view, dispatch]);

  if (isMobile && !mobileWarningDismissed) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '40px', textAlign: 'center', fontFamily: 'monospace' }}>
        <h2 style={{ color: '#00d4ff', marginBottom: '30px', letterSpacing: '2px' }}>NEUROLOGIC OS</h2>
        
        <p style={{ fontSize: '14px', color: '#aaa', maxWidth: '400px', marginBottom: '15px', lineHeight: '1.6' }}>
          <span style={{color: '#ffaa00', fontWeight: 'bold'}}>[ KA ]</span> აპლიკაცია არ არის ადაპტირებული მცირე ეკრანებისთვის. საუკეთესო გამოცდილებისთვის გამოიყენეთ კომპიუტერი ან ლეპტოპი (რაც უფრო დიდია ეკრანი, მით უკეთესია).
        </p>

        <p style={{ fontSize: '14px', color: '#aaa', maxWidth: '400px', marginBottom: '40px', lineHeight: '1.6' }}>
          <span style={{color: '#ffaa00', fontWeight: 'bold'}}>[ EN ]</span> This app is not adapted for smaller screens. For the best experience, use a PC or laptop (the bigger the screen, the better).
        </p>

        <button 
          onClick={() => setMobileWarningDismissed(true)}
          style={{ padding: '16px 32px', backgroundColor: '#111', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)', transition: 'all 0.2s ease' }}
        >
          გაგრძელება / Proceed
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        * { scrollbar-width: none; }
      `}</style>
      
      <div style={{ backgroundColor: '#0a0a0a', height: '100vh', display: 'flex', fontFamily: 'monospace', margin: 0, overflow: 'hidden' }}>
        
        <Sidebar view={view} setView={setView} lang={lang} setLang={setLang} />
        
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {view === 'LEARNING' && <HardwarePanel nodes={state.nodes} arteries={state.arteries} dispatch={dispatch} lang={lang} state={state} isExamMode={false} />}
          {view === 'TESTING_PATHO' && <HardwarePanel nodes={state.nodes} arteries={state.arteries} dispatch={dispatch} lang={lang} state={state} isExamMode={true} />}
          
          {view === 'TESTING_DIAGNOSIS' && <TestingPanel state={state} dispatch={dispatch} lang={lang} />}

          <TelemetryPanel telemetry={state.telemetry} lang={lang} />
          
        </div>
      </div>
    </>
  );
}