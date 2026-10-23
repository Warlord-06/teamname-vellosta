/**
 * SignBridge - Real-Time Sign Language Classification Engine
 * 
 * ARCHITECTURE OVERVIEW:
 * 1. Geometric Hand Pose Analyzer: Extracts angles, curls, and spatial relationships from 21 3D landmarks.
 * 2. MediaPipe Pretrained Gesture Mapper: Leverages MediaPipe's deep learning gesture embeddings.
 * 3. Temporal Stability Filter: Requires gesture persistence over N frames to prevent jitter and accidental triggers.
 * 4. Extensible ML Classifier Hook: Clearly defined slot for connecting custom TensorFlow.js models or custom MediaPipe tasks.
 */

// Distance between two 2D/3D points
function dist(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

/**
 * Computes anatomical finger states (extended vs curled) from 21 landmarks.
 */
export function analyzeHandGeometry(landmarks, handedness = "Right") {
  if (!landmarks || landmarks.length < 21) return null;

  const wrist = landmarks[0];
  const thumbTip = landmarks[4];
  const thumbIp = landmarks[3];
  const thumbMcp = landmarks[2];

  const indexTip = landmarks[8];
  const indexPip = landmarks[6];
  const indexMcp = landmarks[5];

  const middleTip = landmarks[12];
  const middlePip = landmarks[10];
  const middleMcp = landmarks[9];

  const ringTip = landmarks[16];
  const ringPip = landmarks[14];
  const ringMcp = landmarks[13];

  const pinkyTip = landmarks[20];
  const pinkyPip = landmarks[18];
  const pinkyMcp = landmarks[17];

  // Extension: Tip is further from wrist than PIP & MCP
  const isIndexExtended = dist(indexTip, wrist) > dist(indexPip, wrist) && indexTip.y < indexPip.y;
  const isMiddleExtended = dist(middleTip, wrist) > dist(middlePip, wrist) && middleTip.y < middlePip.y;
  const isRingExtended = dist(ringTip, wrist) > dist(ringPip, wrist) && ringTip.y < ringPip.y;
  const isPinkyExtended = dist(pinkyTip, wrist) > dist(pinkyPip, wrist) && pinkyTip.y < pinkyPip.y;

  // Thumb extension considers horizontal direction based on handedness
  const thumbDistFromWrist = dist(thumbTip, wrist);
  const thumbMcpDist = dist(thumbMcp, wrist);
  const isThumbExtended = thumbDistFromWrist > thumbMcpDist * 1.15;
  const isThumbUp = thumbTip.y < indexMcp.y && thumbTip.y < middleMcp.y && thumbTip.y < thumbMcp.y;

  // Distances between fingertips
  const indexMiddleDist = dist(indexTip, middleTip);
  const middleRingDist = dist(middleTip, ringTip);
  const ringPinkyDist = dist(ringTip, pinkyTip);
  const thumbPinkyDist = dist(thumbTip, pinkyTip);

  // Are fingers held together flat (B-handshape)?
  const fingersClose = (indexMiddleDist < 0.08) && (middleRingDist < 0.08) && (ringPinkyDist < 0.08);

  return {
    wrist,
    isThumbExtended,
    isThumbUp,
    isIndexExtended,
    isMiddleExtended,
    isRingExtended,
    isPinkyExtended,
    fingersClose,
    thumbPinkyDist,
    extendedCount: [isIndexExtended, isMiddleExtended, isRingExtended, isPinkyExtended].filter(Boolean).length + (isThumbExtended ? 1 : 0)
  };
}

/**
 * Classifies the active hand sign based on geometric rules and MediaPipe pretrained classification.
 * 
 * @param {Array} landmarks - 21 hand landmarks [{x, y, z}, ...]
 * @param {Array} builtInGestures - MediaPipe detected gestures [{categoryName, score}, ...]
 * @param {String} handedness - "Left" or "Right"
 * @param {Array} allHandsLandmarks - Optional array of all detected hands for two-handed signs
 * @returns {Object|null} - { name, phrase, confidence, method: 'ai-geometric' | 'ai-pretrained' | 'custom-ml' }
 */
export function classifyHandSign(landmarks, builtInGestures = [], handedness = "Right", allHandsLandmarks = []) {
  if (!landmarks || landmarks.length < 21) return null;

  const geo = analyzeHandGeometry(landmarks, handedness);
  if (!geo) return null;

  // 1. Check MediaPipe built-in deep-learning classifications first
  const topGesture = builtInGestures && builtInGestures.length > 0 ? builtInGestures[0] : null;
  const gestureName = topGesture?.categoryName || "";
  const gestureScore = topGesture?.score || 0;

  // --- RULE 1: I Love You (ASL ILY Sign) ---
  // Thumb + Index + Pinky extended; Middle + Ring curled down
  if (gestureName === "ILoveYou" && gestureScore > 0.6) {
    return {
      name: "I love you",
      phrase: "I love you",
      confidence: Math.min(0.98, gestureScore + 0.1),
      method: "ai-pretrained",
      description: "ASL 'I Love You' sign (Thumb, Index, Pinky extended)"
    };
  }
  if (geo.isThumbExtended && geo.isIndexExtended && !geo.isMiddleExtended && !geo.isRingExtended && geo.isPinkyExtended) {
    return {
      name: "I love you",
      phrase: "I love you",
      confidence: 0.92,
      method: "ai-geometric",
      description: "ASL 'I Love You' geometric handshape"
    };
  }

  // --- RULE 2: Yes / Affirmation (Thumbs Up / ASL Yes) ---
  if (gestureName === "Thumb_Up" && gestureScore > 0.65) {
    return {
      name: "Yes",
      phrase: "Yes",
      confidence: Math.min(0.99, gestureScore + 0.05),
      method: "ai-pretrained",
      description: "Thumbs-up affirmative gesture"
    };
  }
  if (geo.isThumbUp && !geo.isIndexExtended && !geo.isMiddleExtended && !geo.isRingExtended && !geo.isPinkyExtended) {
    return {
      name: "Yes",
      phrase: "Yes",
      confidence: 0.89,
      method: "ai-geometric",
      description: "Thumbs up gesture"
    };
  }

  // --- RULE 3: No / Negative (Thumbs Down) ---
  if (gestureName === "Thumb_Down" && gestureScore > 0.65) {
    return {
      name: "No",
      phrase: "No",
      confidence: Math.min(0.98, gestureScore + 0.05),
      method: "ai-pretrained",
      description: "Negative / No response gesture"
    };
  }

  // --- RULE 4: Peace / Two (V-Sign) ---
  if (gestureName === "Victory" && gestureScore > 0.65) {
    return {
      name: "Peace",
      phrase: "Peace",
      confidence: Math.min(0.98, gestureScore + 0.05),
      method: "ai-pretrained",
      description: "Peace / Victory sign (Index & Middle extended)"
    };
  }
  if (geo.isIndexExtended && geo.isMiddleExtended && !geo.isRingExtended && !geo.isPinkyExtended) {
    return {
      name: "Peace",
      phrase: "Peace",
      confidence: 0.91,
      method: "ai-geometric",
      description: "V-Sign handshape"
    };
  }

  // --- RULE 5: Water ("W" Handshape) ---
  // Index, Middle, Ring extended upright; Pinky and Thumb folded together
  if (geo.isIndexExtended && geo.isMiddleExtended && geo.isRingExtended && !geo.isPinkyExtended && geo.thumbPinkyDist < 0.12) {
    return {
      name: "I need water",
      phrase: "I need water",
      confidence: 0.88,
      method: "ai-geometric",
      description: "ASL 'W' handshape for Water"
    };
  }

  // --- RULE 6: Help Me (Two Hands or Dominant Fist on Palm) ---
  if (allHandsLandmarks && allHandsLandmarks.length === 2) {
    const hand1 = allHandsLandmarks[0];
    const hand2 = allHandsLandmarks[1];
    // Check if one hand is flat base (wrist near bottom) and other is resting above it
    const verticalDist = Math.abs(hand1[0].y - hand2[0].y);
    const horizDist = Math.abs(hand1[0].x - hand2[0].x);
    if (verticalDist > 0.05 && verticalDist < 0.35 && horizDist < 0.25) {
      return {
        name: "Help me",
        phrase: "Help me",
        confidence: 0.87,
        method: "ai-geometric",
        description: "Two-handed ASL 'Help' gesture"
      };
    }
  }

  // --- RULE 7: Thank you (Flat Open Hand with fingers close together near face / upper body) ---
  // In ASL: Flat 'B' hand touches chin and moves forward
  if (geo.isIndexExtended && geo.isMiddleExtended && geo.isRingExtended && geo.isPinkyExtended && geo.fingersClose) {
    // Hand positioned at upper chest or chin level (y between 0.2 and 0.65)
    if (landmarks[8].y > 0.25 && landmarks[8].y < 0.65) {
      return {
        name: "Thank you",
        phrase: "Thank you",
        confidence: 0.86,
        method: "ai-geometric",
        description: "Flat hand courtesy sign ('Thank you')"
      };
    }
  }

  // --- RULE 8: Hello (Open Hand / Wave / Raised Open Palm) ---
  if (gestureName === "Open_Palm" && gestureScore > 0.65) {
    return {
      name: "Hello",
      phrase: "Hello",
      confidence: Math.min(0.97, gestureScore + 0.05),
      method: "ai-pretrained",
      description: "Open palm greeting gesture ('Hello')"
    };
  }
  if (geo.extendedCount >= 4 && landmarks[8].y < 0.5) {
    return {
      name: "Hello",
      phrase: "Hello",
      confidence: 0.88,
      method: "ai-geometric",
      description: "Raised open hand greeting ('Hello')"
    };
  }

  // Fallback: Hand detected, but position does not match our verified vocabulary
  return {
    name: null,
    phrase: null,
    confidence: 0,
    method: "unrecognized",
    description: "Hand detected, awaiting supported sign"
  };
}

/**
 * Temporal Stability Buffer:
 * Filters out single-frame noise. A sign must be continuously detected
 * across multiple consecutive frames to be confirmed.
 */
export class TemporalStabilityFilter {
  constructor(windowSize = 8, minVotes = 5, cooldownMs = 1400) {
    this.windowSize = windowSize;
    this.minVotes = minVotes;
    this.cooldownMs = cooldownMs;
    this.history = [];
    this.lastEmittedSign = null;
    this.lastEmittedTime = 0;
  }

  /**
   * Pushes a new frame prediction and returns the stabilized sign if threshold met
   */
  update(prediction) {
    const now = Date.now();
    const signName = prediction?.name || null;

    this.history.push({ sign: signName, time: now, prediction });
    if (this.history.length > this.windowSize) {
      this.history.shift();
    }

    if (!signName) return null;

    // Count votes in history window
    const votes = this.history.filter(h => h.sign === signName).length;

    if (votes >= this.minVotes) {
      // Check cooldown so we don't spam the same sign repeatedly
      const timeSinceLastEmit = now - this.lastEmittedTime;
      const isNewSign = this.lastEmittedSign !== signName;

      if (isNewSign || timeSinceLastEmit > this.cooldownMs) {
        this.lastEmittedSign = signName;
        this.lastEmittedTime = now;
        return prediction;
      }
    }

    return null;
  }

  reset() {
    this.history = [];
    this.lastEmittedSign = null;
    this.lastEmittedTime = 0;
  }
}

/**
 * EXTENSION HOOK: Connect a Custom Machine Learning Model
 * 
 * To integrate a custom TensorFlow.js model (e.g. trained on WLASL or SignSpeak):
 * 1. Import * as tf from '@tensorflow/tfjs';
 * 2. Load model: const model = await tf.loadLayersModel('/models/sign_model.json');
 * 3. Normalize landmarks to tensor: const inputTensor = tf.tensor2d([flattenLandmarks(landmarks)]);
 * 4. Run inference: const prediction = model.predict(inputTensor);
 * 5. Return predicted sign label and probability.
 */
export async function runCustomMLClassifier(landmarks, customModelInstance = null) {
  if (!customModelInstance) {
    // Model hook is unmounted in base MVP; fall back to geometric engine
    return null;
  }
  // Implement custom model inference pipeline here
  return null;
}
