import { useNeuroLogic } from './state/useNeuroLogic';
import HardwarePanel from './components/HardwarePanel';
import TelemetryPanel from './components/TelemetryPanel';

export default function App() {
  const [state, dispatch] = useNeuroLogic();

  return (
    <div style={{ 
      backgroundColor: '#0a0a0a', 
      minHeight: '100vh', 
      display: 'flex', 
      fontFamily: 'monospace',
      margin: 0
    }}>
      <HardwarePanel nodes={state.nodes} dispatch={dispatch} />
      <TelemetryPanel telemetry={state.telemetry} />
    </div>
  )
}