import { useReducer } from 'react';

// --- VASCULAR TERRITORIES & NODES ---
const initialArteries = [
  { id: "mca_L", label: "Left MCA", type: "ARTERY", targets: ["cortex_L", "thalamus_L"], isOccluded: false },
  { id: "pca_L", label: "Left PCA", type: "ARTERY", targets: ["bs_midbrain_L"], isOccluded: false },
  { id: "basilar_L", label: "Left Basilar Branches", type: "ARTERY", targets: ["bs_pons_L"], isOccluded: false },
  { id: "pica_L", label: "Left PICA / Vertebral", type: "ARTERY", targets: ["bs_medulla_L"], isOccluded: false },
  { id: "mca_R", label: "Right MCA", type: "ARTERY", targets: ["cortex_R", "thalamus_R"], isOccluded: false },
  { id: "pca_R", label: "Right PCA", type: "ARTERY", targets: ["bs_midbrain_R"], isOccluded: false },
  { id: "basilar_R", label: "Right Basilar Branches", type: "ARTERY", targets: ["bs_pons_R"], isOccluded: false },
  { id: "pica_R", label: "Right PICA / Vertebral", type: "ARTERY", targets: ["bs_medulla_R"], isOccluded: false },
  { id: "asa_spine", label: "Anterior Spinal Artery (ASA)", type: "ARTERY", targets: ["cord_motor_L", "cord_motor_R", "cord_stt_L", "cord_stt_R"], isOccluded: false }
];

const initialNodesData = [
  { id: "cortex_L", label: "Left Motor Cortex", type: "UMN", tract: "MOTOR", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "thalamus_L", label: "Left Thalamus", type: "TRACT", tract: "SENSORY_SHARED", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "cortex_R", label: "Right Motor Cortex", type: "UMN", tract: "MOTOR", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "thalamus_R", label: "Right Thalamus", type: "TRACT", tract: "SENSORY_SHARED", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "bs_midbrain_L", label: "Left Midbrain", type: "BRAINSTEM", tract: "MOTOR", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "cn_3_L", label: "Left CN III (Oculomotor)", type: "CRANIAL", tract: "LMN", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "bs_pons_L", label: "Left Pons", type: "BRAINSTEM", tract: "MOTOR", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "cn_7_L", label: "Left CN VII (Facial)", type: "CRANIAL", tract: "LMN", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "bs_medulla_L", label: "Left Medulla", type: "BRAINSTEM", tract: "MOTOR", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "cn_12_L", label: "Left CN XII (Hypoglossal)", type: "CRANIAL", tract: "LMN", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "bs_midbrain_R", label: "Right Midbrain", type: "BRAINSTEM", tract: "MOTOR", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "cn_3_R", label: "Right CN III (Oculomotor)", type: "CRANIAL", tract: "LMN", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "bs_pons_R", label: "Right Pons", type: "BRAINSTEM", tract: "MOTOR", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "cn_7_R", label: "Right CN VII (Facial)", type: "CRANIAL", tract: "LMN", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "bs_medulla_R", label: "Right Medulla", type: "BRAINSTEM", tract: "MOTOR", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "cn_12_R", label: "Right CN XII (Hypoglossal)", type: "CRANIAL", tract: "LMN", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "cord_motor_L", label: "Left Corticospinal", type: "UMN", tract: "MOTOR", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "cord_dcml_L", label: "Left Dorsal Column", type: "TRACT", tract: "DCML", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "cord_stt_L", label: "Left Spinothalamic", type: "TRACT", tract: "STT", targets: "RIGHT", isDamaged: false, isIschemic: false }, 
  { id: "cord_motor_R", label: "Right Corticospinal", type: "UMN", tract: "MOTOR", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "cord_dcml_R", label: "Right Dorsal Column", type: "TRACT", tract: "DCML", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "cord_stt_R", label: "Right Spinothalamic", type: "TRACT", tract: "STT", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "periph_motor_L", label: "Left Peripheral Nerve", type: "LMN", tract: "MOTOR", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "periph_sensory_L", label: "Left Dorsal Root", type: "TRACT", tract: "SENSORY_SHARED", targets: "LEFT", isDamaged: false, isIschemic: false },
  { id: "periph_motor_R", label: "Right Peripheral Nerve", type: "LMN", tract: "MOTOR", targets: "RIGHT", isDamaged: false, isIschemic: false },
  { id: "periph_sensory_R", label: "Right Dorsal Root", type: "TRACT", tract: "SENSORY_SHARED", targets: "RIGHT", isDamaged: false, isIschemic: false }
];

export const MISSIONS = [
  { id: "m1", title: "Weber's Syndrome", brief: "Patient presents with a down-and-out left eye, blown left pupil, and right-sided spastic hemiparesis.", solution: ["bs_midbrain_L"] },
  { id: "m2", title: "Brown-Séquard", brief: "Penetrating trauma. Left-sided spastic paralysis and loss of vibration. Right-sided loss of pain/temp.", solution: ["cord_motor_L", "cord_dcml_L", "cord_stt_L"] },
  { id: "m3", title: "Left MCA Ischemia", brief: "Ischemic stroke causing right-sided spastic hemiparesis and right-sided total sensory loss.", solution: ["mca_L"] },
  { id: "m4", title: "ASA Syndrome", brief: "Spinal stroke. Bilateral spastic paralysis, bilateral loss of pain and temperature. Proprioception and vibration remain perfectly intact.", solution: ["asa_spine"] }
];

const defaultBodyState = { motor: "Normal", reflexes: "Normal", paralysis: "None", proprioception: "Intact", painTemp: "Intact", cranialIII: "Intact", cranialVII: "Intact", cranialXII: "Intact" };

const initialState = { 
  nodes: initialNodesData, 
  arteries: initialArteries, 
  telemetry: { LEFT: defaultBodyState, RIGHT: defaultBodyState }, 
  gameMode: "SANDBOX", activeMission: null, missionStatus: "IDLE"
};

const evaluateSide = (nodes, side) => {
  const deadNodes = nodes.filter(n => (n.isDamaged || n.isIschemic) && n.targets === side);
  const suffix = side === "LEFT" ? "L" : "R";
  
  const isUmn = deadNodes.some(n => n.type === 'UMN' || n.type === 'BRAINSTEM');
  const isLmn = deadNodes.some(n => n.type === 'LMN');
  const isDcml = deadNodes.some(n => n.tract === 'DCML' || n.tract === 'SENSORY_SHARED');
  const isStt = deadNodes.some(n => n.tract === 'STT' || n.tract === 'SENSORY_SHARED');

  const cn3 = nodes.some(n => (n.id === `cn_3_${suffix}` || n.id === `bs_midbrain_${suffix}`) && (n.isDamaged || n.isIschemic));
  const cn7 = nodes.some(n => (n.id === `cn_7_${suffix}` || n.id === `bs_pons_${suffix}`) && (n.isDamaged || n.isIschemic));
  const cn12 = nodes.some(n => (n.id === `cn_12_${suffix}` || n.id === `bs_medulla_${suffix}`) && (n.isDamaged || n.isIschemic));

  return {
    cranialIII: cn3 ? "Oculomotor Palsy (↓)" : "Intact", cranialVII: cn7 ? "Facial Droop (↓)" : "Intact", cranialXII: cn12 ? "Tongue Deviation (↓)" : "Intact",
    motor: isLmn ? "Flaccid (↓)" : isUmn ? "Spastic (↑)" : "Normal", reflexes: isLmn ? "Areflexia (↓)" : isUmn ? "Hyperreflexia (↑)" : "Normal", paralysis: isLmn ? "Flaccid" : isUmn ? "Spastic" : "None",
    proprioception: isDcml ? "Anesthesia (↓)" : "Intact", painTemp: isStt ? "Anesthesia (↓)" : "Intact"
  };
};

const calculateTelemetry = (nodes) => ({ LEFT: evaluateSide(nodes, "LEFT"), RIGHT: evaluateSide(nodes, "RIGHT") });

const reducer = (state, action) => {
  switch (action.type) { 
    case 'SEVER_NODE': 
    case 'OCCLUDE_ARTERY': {
      let nextNodes = [...state.nodes];
      let nextArteries = [...state.arteries];

      if (action.type === 'SEVER_NODE') {
        nextNodes = nextNodes.map(n => n.id === action.payload ? { ...n, isDamaged: !n.isDamaged } : n);
      } else {
        nextArteries = nextArteries.map(a => a.id === action.payload ? { ...a, isOccluded: !a.isOccluded } : a);
      }

      const occludedTargets = new Set();
      nextArteries.filter(a => a.isOccluded).forEach(a => a.targets.forEach(t => occludedTargets.add(t)));
      nextNodes = nextNodes.map(n => ({ ...n, isIschemic: occludedTargets.has(n.id) }));

      return { 
        ...state, nodes: nextNodes, arteries: nextArteries, 
        telemetry: calculateTelemetry(nextNodes), missionStatus: state.gameMode === 'SIMULATOR' ? 'PENDING' : 'IDLE'
      };
    }
    case 'START_MISSION': {
      const mission = MISSIONS.find(m => m.id === action.payload);
      return { 
        ...initialState, gameMode: "SIMULATOR", activeMission: mission, missionStatus: "PENDING"
      };
    }
    case 'AUTO_SIMULATE': {
      const mission = MISSIONS.find(m => m.id === action.payload);
      if (!mission) return state;

      // 1. Reset the board to a clean state
      let nextNodes = [...initialNodesData];
      let nextArteries = [...initialArteries];

      // 2. Automatically apply the damage/occlusion from the mission solution
      mission.solution.forEach(id => {
        const isArtery = nextArteries.some(a => a.id === id);
        if (isArtery) {
          nextArteries = nextArteries.map(a => a.id === id ? { ...a, isOccluded: true } : a);
        } else {
          nextNodes = nextNodes.map(n => n.id === id ? { ...n, isDamaged: true } : n);
        }
      });

      // 3. Cascade Ischemia
      const occludedTargets = new Set();
      nextArteries.filter(a => a.isOccluded).forEach(a => a.targets.forEach(t => occludedTargets.add(t)));
      nextNodes = nextNodes.map(n => ({ ...n, isIschemic: occludedTargets.has(n.id) }));

      return { 
        ...initialState, 
        nodes: nextNodes, 
        arteries: nextArteries, 
        telemetry: calculateTelemetry(nextNodes), 
        gameMode: "DEMO", 
        activeMission: mission 
      };
    }
    case 'VERIFY_SOLUTION': {
      const activeIds = [...state.nodes.filter(n => n.isDamaged).map(n => n.id), ...state.arteries.filter(a => a.isOccluded).map(a => a.id)].sort();
      const solutionIds = [...state.activeMission.solution].sort();
      const isSuccess = JSON.stringify(activeIds) === JSON.stringify(solutionIds);
      return { ...state, missionStatus: isSuccess ? "SUCCESS" : "FAILED" };
    }
    case 'HEAL_SYSTEM': 
      return initialState;
    default: 
      return state;
  }
};

export const useNeuroLogic = () => useReducer(reducer, initialState);