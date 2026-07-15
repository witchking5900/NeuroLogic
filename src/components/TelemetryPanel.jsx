import { useState } from 'react';
import { t } from '../i18n';

export default function TelemetryPanel({ telemetry, lang }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const getStatusStyle = (val) => {
    if (val.includes('↓') || val.includes('Flaccid') || val.includes('Anesthesia') || val.includes('Droop') || val.includes('Palsy') || val.includes('Deviation')) {
      return { color: '#ff4d4d', shadow: '0 0 8px rgba(255, 77, 77, 0.4)' }; 
    }
    if (val.includes('↑') || val.includes('Spastic')) return { color: '#ffaa00', shadow: '0 0 8px rgba(255, 170, 0, 0.4)' }; 
    return { color: '#00d4ff', shadow: 'none' }; 
  };

  const getExplanation = (key, value) => {
    if (value.includes('Normal') || value.includes('Intact') || value.includes('None')) return "SYSTEM NOMINAL: Pathway operational.";
    if (key === 'cranialIII') return "PATHOPHYSIOLOGY: LMN or midbrain nucleus damage. Unopposed CN IV and VI pull the eye down and out. Loss of parasympathetics causes mydriasis (blown pupil), and levator palpebrae paralysis causes ptosis.";
    if (key === 'cranialVII') return "PATHOPHYSIOLOGY: LMN or pontine nucleus damage. Flaccid paralysis of the entire ipsilateral half of the face (Bell's palsy pattern), as opposed to a UMN lesion which spares the forehead.";
    if (key === 'cranialXII') return "PATHOPHYSIOLOGY: LMN or medullary nucleus damage. Unopposed action of the contralateral genioglossus muscle pushes the tongue toward the side of the lesion when protruded.";
    if (key === 'motor' || key === 'paralysis') return value.includes('Spastic') ? "PATHOPHYSIOLOGY: UMN lesion removes descending inhibitory control. Muscle spindles become hypersensitive, causing hypertonia." : "PATHOPHYSIOLOGY: LMN lesion severs the final common pathway. The muscle is completely disconnected (Flaccid).";
    if (key === 'reflexes') return value.includes('Hyperreflexia') ? "PATHOPHYSIOLOGY: Without UMN modulation, the localized spinal reflex arc is violently hypersensitive." : "PATHOPHYSIOLOGY: The reflex arc is physically shattered.";
    if (key === 'proprioception') return "PATHOPHYSIOLOGY: The DCML tract is severed. Somatosensory cortex is blind to joint position and vibration.";
    if (key === 'painTemp') return "PATHOPHYSIOLOGY: The STT is severed. Nociceptive and thermoreceptive action potentials are blocked.";
    return "Signal disruption detected.";
  };

  // --- BIOMETRIC HOMUNCULUS ENGINE (SURGICALLY REPAIRED) ---
  const getFaceColor = (data) => {
    const faceVals = [data.cranialIII, data.cranialVII, data.cranialXII];
    if (faceVals.some(v => v.includes('↓'))) return '#ff4d4d'; // Red (LMN Cranial Deficit)
    return '#00d4ff'; // Blue (Nominal)
  };

  const getBodyColor = (data) => {
    const bodyVals = [data.motor, data.reflexes, data.paralysis, data.proprioception, data.painTemp];
    if (bodyVals.some(v => v.includes('↓') || v.includes('Flaccid') || v.includes('Anesthesia'))) return '#ff4d4d'; // Red (Severe Deficit)
    if (bodyVals.some(v => v.includes('↑') || v.includes('Spastic'))) return '#ffaa00'; // Orange (UMN Warning)
    return '#00d4ff'; // Blue (Nominal)
  };

  const BiometricMap = ({ left, right }) => {
    const lFace = getFaceColor(left);
    const rFace = getFaceColor(right);
    const lBody = getBodyColor(left);
    const rBody = getBodyColor(right);

    return (
      <svg viewBox="0 0 120 280" style={{ width: '100%', height: '100%', maxHeight: '450px', marginTop: '10px' }}>
        
        {/* Defining the single, unified Head and Torso shapes as clipping masks */}
        <defs>
          <clipPath id="head-mask">
            <rect x="42" y="20" width="36" height="36" rx="18" />
          </clipPath>
          <clipPath id="torso-mask">
            <rect x="38" y="62" width="44" height="75" rx="10" />
          </clipPath>
        </defs>

        {/* Tactical Radar Grid */}
        <circle cx="60" cy="140" r="110" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="60" cy="140" r="65" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="60" y1="0" x2="60" y2="280" stroke="#333" strokeWidth="1" strokeDasharray="2 4" />
        
        {/* THE BASE OUTLINES (Creates a unified, glowing wireframe for the body) */}
        <g stroke="#1a3d4c" strokeWidth="2" fill="none" opacity="0.6">
          <rect x="42" y="20" width="36" height="36" rx="18" /> {/* Head */}
          <rect x="38" y="62" width="44" height="75" rx="10" /> {/* Torso */}
          <rect x="18" y="62" width="14" height="80" rx="7" />  {/* Left Arm */}
          <rect x="88" y="62" width="14" height="80" rx="7" />  {/* Right Arm */}
          <rect x="38" y="142" width="18" height="105" rx="8" /> {/* Left Leg */}
          <rect x="64" y="142" width="18" height="105" rx="8" /> {/* Right Leg */}
        </g>

        {/* --- LEFT SIDE DATA (Fills from x=0 to midline x=60) --- */}
        <g opacity="0.4" style={{ filter: `drop-shadow(0 0 6px ${lFace})`, transition: 'all 0.3s ease' }}>
          {/* Head Left Half */}
          <rect x="0" y="0" width="60" height="60" fill={lFace} clipPath="url(#head-mask)" />
        </g>
        <g opacity="0.4" style={{ filter: `drop-shadow(0 0 6px ${lBody})`, transition: 'all 0.3s ease' }}>
          {/* Torso Left Half */}
          <rect x="0" y="60" width="60" height="80" fill={lBody} clipPath="url(#torso-mask)" />
          {/* Left Limbs (Already separated) */}
          <rect x="18" y="62" width="14" height="80" rx="7" fill={lBody} />
          <rect x="38" y="142" width="18" height="105" rx="8" fill={lBody} />
        </g>

        {/* --- RIGHT SIDE DATA (Fills from midline x=60 to x=120) --- */}
        <g opacity="0.4" style={{ filter: `drop-shadow(0 0 6px ${rFace})`, transition: 'all 0.3s ease' }}>
          {/* Head Right Half */}
          <rect x="60" y="0" width="60" height="60" fill={rFace} clipPath="url(#head-mask)" />
        </g>
        <g opacity="0.4" style={{ filter: `drop-shadow(0 0 6px ${rBody})`, transition: 'all 0.3s ease' }}>
          {/* Torso Right Half */}
          <rect x="60" y="60" width="60" height="80" fill={rBody} clipPath="url(#torso-mask)" />
          {/* Right Limbs */}
          <rect x="88" y="62" width="14" height="80" rx="7" fill={rBody} />
          <rect x="64" y="142" width="18" height="105" rx="8" fill={rBody} />
        </g>
      </svg>
    );
  };

  const renderSidePanel = (sideName, data) => (
    <div style={{ flex: 1, backgroundColor: '#0d0d0d', padding: '20px', borderRadius: '6px', border: '1px solid #222', minWidth: '220px' }}>
      <h3 style={{ color: '#fff', textTransform: 'uppercase', borderBottom: '1px solid #333', paddingBottom: '12px', marginTop: 0, letterSpacing: '1.5px', fontSize: '13px' }}>
        {t(`${sideName} Side Deficits`, lang)}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
        {Object.entries(data).map(([key, value]) => {
          const style = getStatusStyle(value);
          const tooltipId = `${sideName}-${key}`;
          const isTooltipActive = activeTooltip === tooltipId;
          const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();

          return (
            <div key={key} style={{ backgroundColor: '#151515', padding: '12px', borderRadius: '4px', borderLeft: `3px solid ${style.color}`, transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ fontSize: '9px', color: '#777', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t(formattedKey, lang)}
                </div>
                <button onClick={() => setActiveTooltip(isTooltipActive ? null : tooltipId)}
                  style={{ background: isTooltipActive ? '#ffaa00' : 'transparent', border: `1px solid ${isTooltipActive ? '#ffaa00' : '#444'}`, color: isTooltipActive ? '#000' : '#888', borderRadius: '3px', cursor: 'pointer', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', marginLeft: 'auto' }}>
                  ?
                </button>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: style.color, textShadow: style.shadow }}>
                {t(value, lang)}
              </div>
              {isTooltipActive && (
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderLeft: `2px solid ${style.color}`, color: '#aaa', fontSize: '11px', lineHeight: '1.5', fontFamily: 'monospace' }}>
                  {t(getExplanation(key, value), lang)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1.5, padding: '30px', backgroundColor: '#0a0a0a', overflowY: 'auto' }}>
      <h2 style={{ color: '#fff', margin: '0 0 30px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>
        {t("Clinical Telemetry", lang)}
      </h2>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
        {renderSidePanel("Left", telemetry.LEFT)}
        
        <div style={{ width: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#050505', borderRadius: '6px', border: '1px solid #222', padding: '20px 10px' }}>
          <div style={{ color: '#555', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textAlign: 'center', marginBottom: '10px' }}>
            [ {t("BIOMETRIC SCAN", lang)} ]
          </div>
          <BiometricMap left={telemetry.LEFT} right={telemetry.RIGHT} />
        </div>

        {renderSidePanel("Right", telemetry.RIGHT)}
      </div>
    </div>
  );
}