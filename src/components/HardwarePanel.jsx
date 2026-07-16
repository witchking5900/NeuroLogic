import { useState, useEffect, useRef } from 'react';
import { t } from '../i18n';

const CONNECTIONS = [
  { from: 'cortex_L', to: 'bs_midbrain_L', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_L'] },
  { from: 'bs_midbrain_L', to: 'cn_3_L', tract: 'CN', color: '#00d4ff', dash: 'none', dependsOn: ['bs_midbrain_L'] },
  { from: 'bs_midbrain_L', to: 'bs_pons_L', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_L', 'bs_midbrain_L'] },
  { from: 'bs_pons_L', to: 'cn_7_L', tract: 'CN', color: '#00d4ff', dash: 'none', dependsOn: ['bs_pons_L'] },
  { from: 'bs_pons_L', to: 'bs_medulla_L', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_L', 'bs_midbrain_L', 'bs_pons_L'] },
  { from: 'bs_medulla_L', to: 'cn_12_L', tract: 'CN', color: '#00d4ff', dash: 'none', dependsOn: ['bs_medulla_L'] },
  { from: 'bs_medulla_L', to: 'cord_motor_R', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_L', 'bs_midbrain_L', 'bs_pons_L', 'bs_medulla_L'] },
  { from: 'cord_motor_R', to: 'periph_motor_R', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_L', 'bs_midbrain_L', 'bs_pons_L', 'bs_medulla_L', 'cord_motor_R'] },
  { from: 'cortex_R', to: 'bs_midbrain_R', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_R'] },
  { from: 'bs_midbrain_R', to: 'cn_3_R', tract: 'CN', color: '#00d4ff', dash: 'none', dependsOn: ['bs_midbrain_R'] },
  { from: 'bs_midbrain_R', to: 'bs_pons_R', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_R', 'bs_midbrain_R'] },
  { from: 'bs_pons_R', to: 'cn_7_R', tract: 'CN', color: '#00d4ff', dash: 'none', dependsOn: ['bs_pons_R'] },
  { from: 'bs_pons_R', to: 'bs_medulla_R', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_R', 'bs_midbrain_R', 'bs_pons_R'] },
  { from: 'bs_medulla_R', to: 'cn_12_R', tract: 'CN', color: '#00d4ff', dash: 'none', dependsOn: ['bs_medulla_R'] },
  { from: 'bs_medulla_R', to: 'cord_motor_L', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_R', 'bs_midbrain_R', 'bs_pons_R', 'bs_medulla_R'] },
  { from: 'cord_motor_L', to: 'periph_motor_L', tract: 'MOTOR', color: '#00d4ff', dash: 'none', dependsOn: ['cortex_R', 'bs_midbrain_R', 'bs_pons_R', 'bs_medulla_R', 'cord_motor_L'] },
  { from: 'periph_sensory_L', to: 'cord_dcml_L', tract: 'DCML', color: '#b800ff', dash: '8,6', dependsOn: ['periph_sensory_L'] },
  { from: 'cord_dcml_L', to: 'thalamus_R', tract: 'DCML', color: '#b800ff', dash: '8,6', dependsOn: ['periph_sensory_L', 'cord_dcml_L'] },
  { from: 'periph_sensory_R', to: 'cord_dcml_R', tract: 'DCML', color: '#b800ff', dash: '8,6', dependsOn: ['periph_sensory_R'] },
  { from: 'cord_dcml_R', to: 'thalamus_L', tract: 'DCML', color: '#b800ff', dash: '8,6', dependsOn: ['periph_sensory_R', 'cord_dcml_R'] },
  { from: 'periph_sensory_L', to: 'cord_stt_R', tract: 'STT', color: '#ffaa00', dash: '2,4', dependsOn: ['periph_sensory_L'] },
  { from: 'cord_stt_R', to: 'thalamus_R', tract: 'STT', color: '#ffaa00', dash: '2,4', dependsOn: ['periph_sensory_L', 'cord_stt_R'] },
  { from: 'periph_sensory_R', to: 'cord_stt_L', tract: 'STT', color: '#ffaa00', dash: '2,4', dependsOn: ['periph_sensory_R'] },
  { from: 'cord_stt_L', to: 'thalamus_L', tract: 'STT', color: '#ffaa00', dash: '2,4', dependsOn: ['periph_sensory_R', 'cord_stt_L'] },
  { from: 'cortex_L', to: 'striatum_L', tract: 'EXTRAPYRAMIDAL', color: '#00ffaa', dash: '4,4', dependsOn: ['cortex_L'] },
  { from: 'striatum_L', to: 'nigra_L', tract: 'EXTRAPYRAMIDAL', color: '#00ffaa', dash: '4,4', dependsOn: ['cortex_L', 'striatum_L'] },
  { from: 'nigra_L', to: 'thalamus_L', tract: 'EXTRAPYRAMIDAL', color: '#00ffaa', dash: '4,4', dependsOn: ['cortex_L', 'striatum_L', 'nigra_L'] },
  { from: 'cortex_R', to: 'striatum_R', tract: 'EXTRAPYRAMIDAL', color: '#00ffaa', dash: '4,4', dependsOn: ['cortex_R'] },
  { from: 'striatum_R', to: 'nigra_R', tract: 'EXTRAPYRAMIDAL', color: '#00ffaa', dash: '4,4', dependsOn: ['cortex_R', 'striatum_R'] },
  { from: 'nigra_R', to: 'thalamus_R', tract: 'EXTRAPYRAMIDAL', color: '#00ffaa', dash: '4,4', dependsOn: ['cortex_R', 'striatum_R', 'nigra_R'] },
  { from: 'cord_dcml_L', to: 'cerebellum_L', tract: 'CEREBELLAR', color: '#00ffaa', dash: '4,4', dependsOn: ['periph_sensory_L', 'cord_dcml_L'] },
  { from: 'cord_dcml_R', to: 'cerebellum_R', tract: 'CEREBELLAR', color: '#00ffaa', dash: '4,4', dependsOn: ['periph_sensory_R', 'cord_dcml_R'] }
];

const UPSTREAM_DEPENDENCIES = {
  'bs_midbrain_L': ['cortex_L'], 'bs_pons_L': ['cortex_L', 'bs_midbrain_L'], 'bs_medulla_L': ['cortex_L', 'bs_midbrain_L', 'bs_pons_L'],
  'cn_3_L': ['bs_midbrain_L'], 'cn_7_L': ['bs_pons_L'], 'cn_12_L': ['bs_medulla_L'],
  'cord_motor_R': ['cortex_L', 'bs_midbrain_L', 'bs_pons_L', 'bs_medulla_L'],
  'periph_motor_R': ['cortex_L', 'bs_midbrain_L', 'bs_pons_L', 'bs_medulla_L', 'cord_motor_R'],
  'bs_midbrain_R': ['cortex_R'], 'bs_pons_R': ['cortex_R', 'bs_midbrain_R'], 'bs_medulla_R': ['cortex_R', 'bs_midbrain_R', 'bs_pons_R'],
  'cn_3_R': ['bs_midbrain_R'], 'cn_7_R': ['bs_pons_R'], 'cn_12_R': ['bs_medulla_R'],
  'cord_motor_L': ['cortex_R', 'bs_midbrain_R', 'bs_pons_R', 'bs_medulla_R'],
  'periph_motor_L': ['cortex_R', 'bs_midbrain_R', 'bs_pons_R', 'bs_medulla_R', 'cord_motor_L'],
  'cord_dcml_L': ['periph_sensory_L'], 'cord_stt_R': ['periph_sensory_L'], 'thalamus_R': ['periph_sensory_L', 'cord_dcml_L', 'cord_stt_R'],
  'cord_dcml_R': ['periph_sensory_R'], 'cord_stt_L': ['periph_sensory_R'], 'thalamus_L': ['periph_sensory_R', 'cord_dcml_R', 'cord_stt_L'],
  'striatum_L': ['cortex_L'], 'nigra_L': ['cortex_L', 'striatum_L'], 'cerebellum_L': ['periph_sensory_L', 'cord_dcml_L'],
  'striatum_R': ['cortex_R'], 'nigra_R': ['cortex_R', 'striatum_R'], 'cerebellum_R': ['periph_sensory_R', 'cord_dcml_R']
};

export default function HardwarePanel({ nodes, dispatch, lang, arteries, state, isExamMode }) {
  const containerRef = useRef(null);
  const [wires, setWires] = useState([]);
  const [lesionCount, setLesionCount] = useState('RANDOM');

  const updateWiring = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const calculatedWires = CONNECTIONS.map((conn, index) => {
      const fromEl = document.getElementById(conn.from);
      const toEl = document.getElementById(conn.to);
      if (!fromEl || !toEl) return null;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const x1 = fromRect.left - containerRect.left + (fromRect.width / 2);
      const y1 = fromRect.top - containerRect.top + (fromRect.height / 2);
      const x2 = toRect.left - containerRect.left + (toRect.width / 2);
      const y2 = toRect.top - containerRect.top + (toRect.height / 2);

      const isDead = conn.dependsOn.some(nodeId => {
        const n = nodes.find(x => x.id === nodeId);
        return n && (n.isDamaged || n.isIschemic);
      });

      return { ...conn, x1, y1, x2, y2, isDead, id: `wire-${index}` };
    }).filter(Boolean);

    setWires(calculatedWires);
  };

  useEffect(() => {
    const timer = setTimeout(() => updateWiring(), 50); 
    window.addEventListener('resize', updateWiring);
    return () => { clearTimeout(timer); window.removeEventListener('resize', updateWiring); };
  }, [nodes, arteries]); 

  const ArteryButton = ({ id }) => {
    const artery = arteries.find(a => a.id === id);
    if (!artery) return null;
    const isOccluded = artery.isOccluded;
    const baseColor = isOccluded ? '#00e5ff' : '#ff2a2a'; 
    const bgColor = isOccluded ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 42, 42, 0.08)';
    return (
      <button onClick={() => dispatch({ type: 'OCCLUDE_ARTERY', payload: artery.id })}
        style={{
          position: 'relative', zIndex: 10, padding: '12px', backgroundColor: bgColor, color: baseColor,
          border: `1px solid ${baseColor}`, borderRadius: '4px', cursor: 'pointer', textAlign: 'center',
          fontFamily: 'monospace', width: '100%', boxShadow: isOccluded ? '0 0 12px rgba(0, 229, 255, 0.5)' : 'inset 0 0 10px rgba(255, 42, 42, 0.1)', 
          transition: 'all 0.15s ease-in-out', borderStyle: isOccluded ? 'dashed' : 'solid', backdropFilter: 'blur(4px)' 
        }}>
        <div style={{ fontSize: '9px', opacity: 0.8, letterSpacing: '1px' }}>{t("ARTERY", lang)}</div>
        <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '4px' }}>{t(artery.label, lang)}</div>
        {isOccluded && ( <div style={{ fontSize: '10px', marginTop: '6px', color: baseColor, fontWeight: 'bold' }}>{t("[ OCCLUDED ]", lang)}</div> )}
      </button>
    );
  };

  const NodeButton = ({ id }) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return null;
    const upstreamIds = UPSTREAM_DEPENDENCIES[id] || [];
    const isAffected = !(node.isDamaged || node.isIschemic) && upstreamIds.some(upstreamId => {
       const n = nodes.find(x => x.id === upstreamId);
       return n && (n.isDamaged || n.isIschemic);
    });

    let baseColor = '#00d4ff'; let bgColor = 'rgba(0, 212, 255, 0.05)'; let statusText = ''; let boxShadow = 'inset 0 0 10px rgba(0, 212, 255, 0.05)';
    if (node.isDamaged) { baseColor = '#ff4d4d'; bgColor = 'rgba(255, 77, 77, 0.15)'; statusText = t('[ LESION ]', lang); boxShadow = '0 0 12px rgba(255, 77, 77, 0.5)'; }
    else if (node.isIschemic) { baseColor = '#a700ff'; bgColor = 'rgba(167, 0, 255, 0.15)'; statusText = t('[ ISCHEMIC ]', lang); boxShadow = '0 0 12px rgba(167, 0, 255, 0.5)'; }
    else if (isAffected) { baseColor = '#ffcc00'; bgColor = 'rgba(255, 204, 0, 0.1)'; statusText = t('[ OFFLINE ]', lang); boxShadow = '0 0 12px rgba(255, 204, 0, 0.3)'; }

    return (
      <button id={id} onClick={() => dispatch({ type: 'SEVER_NODE', payload: node.id })}
        style={{
          position: 'relative', zIndex: 10, padding: '12px', backgroundColor: bgColor, color: baseColor,
          border: `1px solid ${baseColor}`, borderRadius: '4px', cursor: 'pointer', textAlign: 'center',
          fontFamily: 'monospace', width: '100%', boxShadow: boxShadow, transition: 'all 0.15s ease-in-out', backdropFilter: 'blur(4px)' 
        }}>
        <div style={{ fontSize: '9px', opacity: 0.8, letterSpacing: '1px' }}>{t(node.tract, lang)} | {t(node.type, lang)}</div>
        <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '4px' }}>{t(node.label, lang)}</div>
        {(node.isDamaged || node.isIschemic || isAffected) && ( <div style={{ fontSize: '10px', marginTop: '6px', color: baseColor, fontWeight: 'bold' }}>{statusText}</div> )}
      </button>
    );
  };

  const AnatomicalLevel = ({ title, leftNodes, rightNodes, centerNodes, isVascular }) => (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ textAlign: 'center', color: isVascular ? '#ff4d4d' : '#b3b3b3', fontSize: '13px', fontWeight: 'bold', letterSpacing: '3px', marginBottom: '15px', textShadow: '0 0 8px rgba(0,0,0,0.8)' }}>
        --- {t(title, lang)} ---
      </div>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>{leftNodes.map(id => isVascular ? <ArteryButton key={id} id={id} /> : <NodeButton key={id} id={id} />)}</div>
        {centerNodes && <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>{centerNodes.map(id => isVascular ? <ArteryButton key={id} id={id} /> : <NodeButton key={id} id={id} />)}</div>}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>{rightNodes.map(id => isVascular ? <ArteryButton key={id} id={id} /> : <NodeButton key={id} id={id} />)}</div>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', borderRight: '2px solid #222', backgroundColor: '#050505', position: 'relative' }}>
      
      {/* 1. SCROLLABLE MAP AREA */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div ref={containerRef} style={{ position: 'relative', width: '100%', minHeight: '100%' }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
            {wires.map(wire => {
              const midY = (wire.y1 + wire.y2) / 2;
              const path = `M ${wire.x1},${wire.y1} C ${wire.x1},${midY} ${wire.x2},${midY} ${wire.x2},${wire.y2}`;
              return (
                <path key={wire.id} d={path} fill="none" stroke={wire.isDead ? '#ff0000' : wire.color} strokeWidth={wire.isDead ? "3.5" : "2.5"} strokeDasharray={wire.dash} opacity={wire.isDead ? 1 : 0.6} 
                  style={{ filter: wire.isDead ? 'drop-shadow(0 0 10px #ff0000)' : `drop-shadow(0 0 4px ${wire.color})`, transition: 'all 0.3s ease-in-out' }} />
              )
            })}
          </svg>

          <div style={{ position: 'relative', zIndex: 10, paddingBottom: '20px' }}>
            <h2 style={{ color: '#fff', margin: '0 0 30px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>{t("Neural Hardware Map", lang)}</h2>
            <AnatomicalLevel title="VASCULAR NETWORK" isVascular={true} leftNodes={['mca_L', 'pca_L', 'basilar_L', 'pica_L']} centerNodes={['asa_spine']} rightNodes={['mca_R', 'pca_R', 'basilar_R', 'pica_R']} />
            <AnatomicalLevel title="CEREBRUM" leftNodes={['cortex_L', 'thalamus_L']} rightNodes={['cortex_R', 'thalamus_R']} />
            <AnatomicalLevel title="EXTRAPYRAMIDAL & CEREBELLUM" leftNodes={['striatum_L', 'nigra_L', 'cerebellum_L']} rightNodes={['striatum_R', 'nigra_R', 'cerebellum_R']} />
            <AnatomicalLevel title="BRAINSTEM (Midbrain, Pons, Medulla)" leftNodes={['bs_midbrain_L', 'cn_3_L', 'bs_pons_L', 'cn_7_L', 'bs_medulla_L', 'cn_12_L']} rightNodes={['bs_midbrain_R', 'cn_3_R', 'bs_pons_R', 'cn_7_R', 'bs_medulla_R', 'cn_12_R']} />
            <AnatomicalLevel title="SPINAL CORD" leftNodes={['cord_motor_L', 'cord_dcml_L', 'cord_stt_L']} rightNodes={['cord_motor_R', 'cord_dcml_R', 'cord_stt_R']} />
            <AnatomicalLevel title="PERIPHERY" leftNodes={['periph_motor_L', 'periph_sensory_L']} rightNodes={['periph_motor_R', 'periph_sensory_R']} />
          </div>
        </div>
      </div>

      {/* 2. STICKY FOOTER AREA (Always Visible at Bottom) */}
      <div style={{ padding: '20px', backgroundColor: '#0a0a0a', borderTop: '2px solid #222', zIndex: 20 }}>
        {isExamMode ? (
          <div>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>{t("Number of Lesions", lang)}</label>
                <select value={lesionCount} onChange={(e) => setLesionCount(e.target.value)} style={{ width: '100%', padding: '14px', backgroundColor: '#000', color: '#fff', border: '1px solid #555', borderRadius: '4px', outline: 'none', fontSize: '14px' }}>
                  <option value="RANDOM">{t("Random (Very Hard)", lang)}</option>
                  <option value="1">{t("1 Lesion (Standard)", lang)}</option>
                  <option value="2">{t("2 Lesions (Hard)", lang)}</option>
                  <option value="3">{t("3 Lesions (Extreme)", lang)}</option>
                </select>
              </div>
              <button onClick={() => dispatch({ type: 'GENERATE_RANDOM_PATHO', payload: lesionCount })}
                style={{ flex: 2, padding: '14px', backgroundColor: '#ffaa00', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', alignSelf: 'flex-end', boxShadow: '0 0 10px rgba(255, 170, 0, 0.2)' }}>
                {t("Generate Random Patient (Pathophysiology)", lang)}
              </button>
            </div>

            <button onClick={() => dispatch({ type: 'SUBMIT_PATHO' })}
              style={{ width: '100%', padding: '14px', backgroundColor: '#00d4ff', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>
              {t("Confirm Pathophysiology", lang)}
            </button>

            {state?.missionStatus === 'SUCCESS' && (
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(0, 255, 0, 0.1)', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '4px', fontWeight: 'bold', textAlign: 'center', letterSpacing: '1px' }}>
                ✓ {t("CORRECT", lang)}
              </div>
            )}

            {state?.missionStatus === 'FAILED' && state?.feedback && (
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1a0a0a', border: '1px solid #ff4d4d', borderRadius: '4px', textAlign: 'left', lineHeight: '1.6' }}>
                <div style={{ color: '#ff4d4d', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                  ❌ {t("INCORRECT", lang)}
                </div>
                <div style={{ color: '#aaa', fontSize: '12px' }}>
                  <span style={{ color: '#ffaa00' }}>{t("Your selection:", lang)}</span> {t(state.feedback.userSelection, lang)}
                </div>
                <div style={{ color: '#fff', fontSize: '12px', marginTop: '5px' }}>
                  <span style={{ color: '#00ff00' }}>{t("Correct lesion(s):", lang)}</span> {t(state.feedback.correctSelection, lang)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => dispatch({ type: 'HEAL_SYSTEM' })}
            style={{ padding: '16px', backgroundColor: '#00d4ff', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', width: '100%', boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)' }}>
            {t("INITIATE REPAIR PROTOCOL", lang)}
          </button>
        )}
      </div>
    </div>
  );
}