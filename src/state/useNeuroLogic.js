import { useReducer } from 'react';

// --- THE BLUEPRINT ---
const initialNodesData = [
  { id: "node_motor_cortex", label: "Primary Motor Cortex", classification: "UMN", isDamaged: false },
  { id: "node_internal_capsule", label: "Internal Capsule", classification: "UMN", isDamaged: false },
  { id: "node_medullary_pyramids", label: "Medullary Pyramids", classification: "UMN", isDamaged: false },
  { id: "node_anterior_horn", label: "Anterior Horn (Spinal)", classification: "LMN", isDamaged: false },
  { id: "node_peripheral_nerve", label: "Peripheral Nerve", classification: "LMN", isDamaged: false },
  { id: "node_nmj", label: "Neuromuscular Junction", classification: "EFFECTOR", isDamaged: false }
];

const initialState = {
  nodes: initialNodesData,
  telemetry: {
    muscleTone: "Normal", reflexes: "Normal", babinski: "Negative",
    atrophy: "None", fasciculations: "Absent", paralysis: "None"
  }
};

// --- THE PATHOPHYSIOLOGY LOGIC ---
const calculateTelemetry = (nodes) => {
  const isUmnDamaged = nodes.some(n => n.classification === 'UMN' && n.isDamaged);
  const isLmnDamaged = nodes.some(n => n.classification === 'LMN' && n.isDamaged);
  const isNmjDamaged = nodes.some(n => n.classification === 'EFFECTOR' && n.isDamaged);

  // Min-Max Rule: LMN overrides UMN
  if (isLmnDamaged || isNmjDamaged) {
    return {
      muscleTone: "Flaccidity (↓)", reflexes: "Hyporeflexia / Areflexia (↓)",
      babinski: "Negative", atrophy: "Severe (Denervation)",
      fasciculations: isLmnDamaged ? "Present" : "Absent", paralysis: "Flaccid"
    };
  }

  // UMN Loss of Inhibition
  if (isUmnDamaged) {
    return {
      muscleTone: "Spasticity / Hypertonia (↑)", reflexes: "Hyperreflexia / Clonus (↑)",
      babinski: "Positive (Upgoing toes)", atrophy: "Mild (Disuse)",
      fasciculations: "Absent", paralysis: "Spastic"
    };
  }

  return initialState.telemetry;
};

// --- THE REDUCER ---
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEVER_NODE': {
      const updatedNodes = state.nodes.map(node =>
        node.id === action.payload ? { ...node, isDamaged: !node.isDamaged } : node
      );
      return { nodes: updatedNodes, telemetry: calculateTelemetry(updatedNodes) };
    }
    case 'HEAL_SYSTEM': return initialState;
    default: return state;
  }
};

export const useNeuroLogic = () => useReducer(reducer, initialState);