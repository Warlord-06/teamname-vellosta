/**
 * SignBridge - Real-Time Sign Language Classification Engine
 * 
 * ARCHITECTURE OVERVIEW:
 * 1. Geometric Hand Pose Analyzer: Extracts angles, curls, and spatial relationships from 21 3D landmarks.
 * 2. MediaPipe Pretrained Gesture Mapper: Leverages MediaPipe's deep learning gesture embeddings.
 * 3. Two-Handed Interaction Pipeline: Spatial and proximity math across both hands for complex ASL signs.
 * 4. Temporal Stability Filter: Requires gesture persistence over N frames to prevent jitter and accidental triggers.
 * 5. Action Gesture Dispatcher: Maps specific gestures to hands-free navigation and editing commands.
 */

// Distance between two 2D/3D points
export function dist(p1, p2) {
  if (!p1 || !p2) return 999;
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

// 3D Euclidean distance
export function dist3d(p1, p2) {
  if (!p1 || !p2) return 999;
  return Math.hypot(p1.x - p2.x, p1.y - p2.y, (p1.z || 0) - (p2.z || 0));
}

/**
 * Computes anatomical finger states (extended vs curled) from 21 landmarks.
 * Returns detailed telemetry for both the classification rules and the live Hand Anatomy HUD.
 */
export function analyzeHandGeometry(landmarks, handedness = "Right") {
  if (!landmarks || landmarks.length < 21) return null;

  const wrist = landmarks[0];
  const thumbCmc = landmarks[1];
  const thumbMcp = landmarks[2];
  const _thumbIp = landmarks[3];
  const thumbTip = landmarks[4];

  const indexMcp = landmarks[5];
  const indexPip = landmarks[6];
  const _indexDip = landmarks[7];
  const indexTip = landmarks[8];

  const middleMcp = landmarks[9];
  const middlePip = landmarks[10];
  const _middleDip = landmarks[11];
  const middleTip = landmarks[12];

  const ringMcp = landmarks[13];
  const ringPip = landmarks[14];
  const _ringDip = landmarks[15];
  const ringTip = landmarks[16];

  const pinkyMcp = landmarks[17];
  const pinkyPip = landmarks[18];
  const _pinkyDip = landmarks[19];
  const pinkyTip = landmarks[20];

  // Extension calculation: tip is further from wrist than PIP and MCP
  const isIndexExtended = dist(indexTip, wrist) > dist(indexPip, wrist) * 1.12 && 
    (indexTip.y < indexPip.y || dist(indexTip, indexMcp) > dist(indexPip, indexMcp));

  const isMiddleExtended = dist(middleTip, wrist) > dist(middlePip, wrist) * 1.12 && 
    (middleTip.y < middlePip.y || dist(middleTip, middleMcp) > dist(middlePip, middleMcp));

  const isRingExtended = dist(ringTip, wrist) > dist(ringPip, wrist) * 1.12 && 
    (ringTip.y < ringPip.y || dist(ringTip, ringMcp) > dist(ringPip, ringMcp));

  const isPinkyExtended = dist(pinkyTip, wrist) > dist(pinkyPip, wrist) * 1.12 && 
    (pinkyTip.y < pinkyPip.y || dist(pinkyTip, pinkyMcp) > dist(pinkyPip, pinkyMcp));

  // Thumb extension considers horizontal & vertical distance from wrist and MCP
  const thumbDistFromWrist = dist(thumbTip, wrist);
  const thumbMcpDist = dist(thumbMcp, wrist);
  const isThumbExtended = thumbDistFromWrist > thumbMcpDist * 1.15;
  const isThumbUp = thumbTip.y < indexMcp.y && thumbTip.y < middleMcp.y && thumbTip.y < thumbMcp.y && thumbTip.y < wrist.y;
  const isThumbDown = thumbTip.y > wrist.y && thumbTip.y > thumbMcp.y;

  // Inter-finger distances
  const thumbIndexDist = dist(thumbTip, indexTip);
  const thumbMiddleDist = dist(thumbTip, middleTip);
  const thumbRingDist = dist(thumbTip, ringTip);
  const thumbPinkyDist = dist(thumbTip, pinkyTip);

  const indexMiddleDist = dist(indexTip, middleTip);
  const middleRingDist = dist(middleTip, ringTip);
  const ringPinkyDist = dist(ringTip, pinkyTip);

  // Are fingers held together flat (ASL B-handshape)?
  const fingersClose = (indexMiddleDist < 0.08) && (middleRingDist < 0.08) && (ringPinkyDist < 0.08);

  // Is fist closed (all 4 main fingers curled)?
  const isFist = !isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended;

  // Pinched fingertips (flattened 'O' handshape for Eat / Food)
  const isPinchedO = (thumbIndexDist < 0.085) && (thumbMiddleDist < 0.085) && (thumbRingDist < 0.095);

  // Small pinch (measuring a small distance: thumb & index close parallel, others curled)
  const isPinchSmall = (thumbIndexDist < 0.052) && !isMiddleExtended && !isRingExtended && !isPinkyExtended;

  // Crossed fingers (ASL 'R' / Good Luck: index & middle extended and touching/crossing)
  const isCrossedFingers = isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended && 
    indexMiddleDist < 0.045 && Math.abs(indexTip.y - middleTip.y) < 0.045;

  // Horns / Rock On: index & pinky extended, middle & ring curled, thumb tucked across palm
  const isRockOn = isIndexExtended && isPinkyExtended && !isMiddleExtended && !isRingExtended && !isThumbExtended;

  // 'L' Handshape (Later / ASL 'L'): thumb & index extended at ~90 deg angle, others curled
  const isLShape = isThumbExtended && isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended &&
    dist(thumbTip, indexTip) > 0.11 && Math.abs(thumbTip.y - indexTip.y) > 0.06;

  // ASL Number 3: Thumb, Index, Middle extended; Ring & Pinky curled
  const isNumber3 = isThumbExtended && isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended;

  // ASL Number 4: 4 fingers extended upright, thumb curled against palm
  const isNumber4 = isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && 
    !isThumbExtended && thumbTip.y > indexMcp.y;

  // Directional pointing with index
  const isIndexPointingLeft = isIndexExtended && (indexTip.x < indexMcp.x - 0.08) && Math.abs(indexTip.y - indexMcp.y) < 0.11;
  const isIndexPointingRight = isIndexExtended && (indexTip.x > indexMcp.x + 0.08) && Math.abs(indexTip.y - indexMcp.y) < 0.11;
  const isIndexPointingUp = isIndexExtended && (indexTip.y < indexPip.y - 0.06) && Math.abs(indexTip.x - indexMcp.x) < 0.09;

  // ASL 'T' Handshape (Bathroom): thumb tucked between index & middle knuckles in a fist
  const isTHandshape = isFist && dist(thumbTip, indexPip) < 0.055;

  // Extended count
  const extendedCount = [isIndexExtended, isMiddleExtended, isRingExtended, isPinkyExtended].filter(Boolean).length + (isThumbExtended ? 1 : 0);

  // Finger states dictionary for UI HUD Inspector
  const fingerStates = {
    thumb: isThumbUp ? "Thumbs Up" : isThumbDown ? "Thumbs Down" : isThumbExtended ? "Extended" : "Curled",
    index: isIndexPointingLeft ? "Pointing Left" : isIndexPointingRight ? "Pointing Right" : isIndexExtended ? "Extended" : "Curled",
    middle: isMiddleExtended ? "Extended" : "Curled",
    ring: isRingExtended ? "Extended" : "Curled",
    pinky: isPinkyExtended ? "Extended" : "Curled"
  };

  return {
    wrist,
    thumbTip,
    thumbMcp,
    indexTip,
    indexMcp,
    middleTip,
    middleMcp,
    ringTip,
    ringMcp,
    pinkyTip,
    pinkyMcp,
    isThumbExtended,
    isThumbUp,
    isThumbDown,
    isIndexExtended,
    isMiddleExtended,
    isRingExtended,
    isPinkyExtended,
    fingersClose,
    isFist,
    isPinchedO,
    isPinchSmall,
    isCrossedFingers,
    isRockOn,
    isLShape,
    isNumber3,
    isNumber4,
    isIndexPointingLeft,
    isIndexPointingRight,
    isIndexPointingUp,
    isTHandshape,
    thumbIndexDist,
    thumbMiddleDist,
    thumbRingDist,
    thumbPinkyDist,
    indexMiddleDist,
    middleRingDist,
    ringPinkyDist,
    extendedCount,
    fingerStates
  };
}

/**
 * Classifies the active hand sign based on geometric rules and MediaPipe pretrained classification.
 * Supports an expanded 30+ sign vocabulary with high anatomical precision, temporal stability,
 * and two-handed interaction handling.
 * 
 * @param {Array} landmarks - 21 hand landmarks [{x, y, z}, ...]
 * @param {Array} builtInGestures - MediaPipe detected gestures [{categoryName, score}, ...]
 * @param {String} handedness - "Left" or "Right"
 * @param {Array} allHandsLandmarks - Array of all detected hands for two-handed signs
 * @returns {Object|null} - { name, phrase, confidence, method, description, category, action }
 */
export function classifyHandSign(landmarks, builtInGestures = [], handedness = "Right", allHandsLandmarks = []) {
  if (!landmarks || landmarks.length < 21) return null;

  const geo = analyzeHandGeometry(landmarks, handedness);
  if (!geo) return null;

  // MediaPipe built-in deep-learning classifications
  const topGesture = builtInGestures && builtInGestures.length > 0 ? builtInGestures[0] : null;
  const gestureName = topGesture?.categoryName || "";
  const gestureScore = topGesture?.score || 0;

  // ==========================================
  // SECTION A: TWO-HANDED SIGNS (Priority Check)
  // ==========================================
  if (allHandsLandmarks && allHandsLandmarks.length === 2) {
    const hand1 = allHandsLandmarks[0];
    const hand2 = allHandsLandmarks[1];

    const wristDist = dist(hand1[0], hand2[0]);
    const indexDist = dist(hand1[8], hand2[8]);
    const thumbDist = dist(hand1[4], hand2[4]);
    const middleDist = dist(hand1[12], hand2[12]);

    // TWO-HANDED RULE 1: Namaste / Pray / Respect (🙏)
    // Palms pressed together vertically at chest height, fingers upright
    if (hand1[8].y < hand1[0].y && hand2[8].y < hand2[0].y) {
      if (wristDist < 0.22 && indexDist < 0.14 && thumbDist < 0.14 && Math.abs(hand1[0].y - hand2[0].y) < 0.12) {
        return {
          name: "Namaste",
          phrase: "Namaste",
          confidence: 0.95,
          method: "ai-geometric",
          category: "Greetings",
          description: "Both palms pressed together upright at chest level ('Namaste / Respect')"
        };
      }
    }

    // TWO-HANDED RULE 2: Heart / Love (🫶)
    // Both hands form arched heart shape (thumbs meet at bottom, index/middle fingers meet at top)
    if (thumbDist < 0.10 && indexDist < 0.12) {
      if (hand1[4].y > hand1[8].y && hand2[4].y > hand2[8].y) {
        return {
          name: "Heart",
          phrase: "Heart",
          confidence: 0.94,
          method: "ai-geometric",
          category: "Expressions",
          description: "Two-handed heart shape ('Heart / Love')"
        };
      }
    }

    // TWO-HANDED RULE 3: House / Roof (🏠)
    // Fingertips meeting at peak forming a triangular roof, wrists spaced apart
    if (indexDist < 0.09 && middleDist < 0.09 && wristDist > 0.18) {
      if (hand1[8].y < hand1[0].y && hand2[8].y < hand2[0].y) {
        return {
          name: "House",
          phrase: "House",
          confidence: 0.92,
          method: "ai-geometric",
          category: "Daily Needs",
          description: "Two flat hands meeting at fingertips forming a roof peak ('House / Home')"
        };
      }
    }

    // TWO-HANDED RULE 4: Friend (🤝)
    // Both index fingers hooked or touching at chest center
    if (indexDist < 0.10 && wristDist > 0.14 && Math.abs(hand1[0].y - hand2[0].y) < 0.12) {
      return {
        name: "Friend",
        phrase: "Friend",
        confidence: 0.91,
        method: "ai-geometric",
        category: "Conversation",
        description: "Two index fingers linked at center ('Friend')"
      };
    }

    // TWO-HANDED RULE 5: Time / Clock (⌚)
    // Dominant index finger tapping the wrist of non-dominant hand
    const indexToWrist1 = dist(hand1[8], hand2[0]);
    const indexToWrist2 = dist(hand2[8], hand1[0]);
    if (indexToWrist1 < 0.12 || indexToWrist2 < 0.12) {
      return {
        name: "Time",
        phrase: "What time is it?",
        confidence: 0.91,
        method: "ai-geometric",
        category: "Daily Needs",
        description: "Index finger tapping opposite wrist ('Time / Watch')"
      };
    }

    // TWO-HANDED RULE 6: Deaf Applause / Cheer (🙌)
    // Both hands raised above shoulder/head with open fingers shaking
    if (hand1[0].y < 0.38 && hand2[0].y < 0.38 && hand1[8].y < hand1[0].y && hand2[8].y < hand2[0].y) {
      return {
        name: "Applause",
        phrase: "Applause",
        confidence: 0.93,
        method: "ai-geometric",
        category: "Expressions",
        description: "Both hands raised high with open waving fingers (Deaf applause / cheer)"
      };
    }

    // TWO-HANDED RULE 7: More (Both hands pinched, fingertips tapping together)
    if (indexDist < 0.16 && thumbDist < 0.16) {
      return {
        name: "More",
        phrase: "More",
        confidence: 0.92,
        method: "ai-geometric",
        category: "Daily Needs",
        description: "Two-handed ASL 'More' sign (fingertips tapping together)"
      };
    }

    const geo1 = analyzeHandGeometry(hand1);
    const geo2 = analyzeHandGeometry(hand2);

    // TWO-HANDED RULE 8: Help Me (Dominant 'A' fist resting on flat base palm)
    const verticalDist = Math.abs(hand1[0].y - hand2[0].y);
    const horizDist = Math.abs(hand1[0].x - hand2[0].x);
    const hasFist = (geo1 && geo1.isFist) || (geo2 && geo2.isFist);
    const hasBasePalm = (geo1 && geo1.extendedCount >= 3) || (geo2 && geo2.extendedCount >= 3);
    if (hasFist && hasBasePalm && verticalDist > 0.05 && verticalDist < 0.35 && horizDist < 0.28) {
      return {
        name: "Help me",
        phrase: "Help me",
        confidence: 0.90,
        method: "ai-geometric",
        category: "Emergency & Assistance",
        description: "Two-handed ASL 'Help' gesture (fist supported on flat palm)"
      };
    }

    // TWO-HANDED RULE 9: All Done / Finish (Both hands flat open spread)
    if (hand1[0].y > 0.38 && hand2[0].y > 0.38 && wristDist > 0.18 && wristDist < 0.50) {
      if (geo1 && geo2 && geo1.extendedCount >= 4 && geo2.extendedCount >= 4) {
        return {
          name: "All done",
          phrase: "All done",
          confidence: 0.89,
          method: "ai-geometric",
          category: "Responses",
          description: "Both hands open facing outward at chest level ('All done / Finished')"
        };
      }
    }
  }

  // ==========================================
  // SECTION B: HIGH-SPECIFICITY HANDSHAPES
  // ==========================================

  // PRIORITY 1: MediaPipe Pretrained Deep-Learning Gestures (Score >= 0.65)
  // Evaluated before heuristic rules to eliminate rule collisions and false-positive hijacking.
  if (gestureScore >= 0.65) {
    if (gestureName === "ILoveYou") {
      return {
        name: "I love you",
        phrase: "I love you",
        confidence: Math.min(0.99, gestureScore + 0.05),
        method: "ai-pretrained",
        category: "Expressions",
        description: "ASL 'I Love You' sign (Thumb, Index, Pinky extended)"
      };
    }
    if (gestureName === "Victory") {
      return {
        name: "Peace",
        phrase: "Peace",
        confidence: Math.min(0.99, gestureScore + 0.05),
        method: "ai-pretrained",
        category: "Expressions",
        action: "speak",
        description: "Peace / Victory sign (Index & Middle extended)"
      };
    }
    if (gestureName === "Thumb_Up") {
      return {
        name: "Yes",
        phrase: "Yes",
        confidence: Math.min(0.99, gestureScore + 0.05),
        method: "ai-pretrained",
        category: "Responses",
        description: "Thumbs-up affirmative gesture ('Yes')"
      };
    }
    if (gestureName === "Thumb_Down") {
      return {
        name: "No",
        phrase: "No",
        confidence: Math.min(0.99, gestureScore + 0.05),
        method: "ai-pretrained",
        category: "Responses",
        description: "Negative / No response gesture ('No')"
      };
    }
    if (gestureName === "Pointing_Up") {
      return {
        name: "Number 1",
        phrase: "One",
        confidence: Math.min(0.99, gestureScore + 0.05),
        method: "ai-pretrained",
        category: "Numbers",
        description: "Single index finger pointing straight up ('One')"
      };
    }
    if (gestureName === "Open_Palm" && landmarks[8].y < 0.52) {
      return {
        name: "Hello",
        phrase: "Hello",
        confidence: Math.min(0.98, gestureScore + 0.05),
        method: "ai-pretrained",
        category: "Greetings",
        description: "Raised open palm greeting ('Hello')"
      };
    }
  }

  // RULE 1: Rock On / Horns (🤘)
  // Index & Pinky extended; Middle & Ring curled; Thumb tucked across palm
  if (geo.isRockOn) {
    return {
      name: "Rock on",
      phrase: "Rock on",
      confidence: 0.94,
      method: "ai-geometric",
      category: "Expressions",
      description: "Sign of the horns (Index & Pinky extended, middle & ring curled)"
    };
  }

  // RULE 2: Good Luck / Fingers Crossed (🤞 / ASL 'R')
  // Index and Middle extended and crossed/overlapping; Ring & Pinky curled
  if (geo.isCrossedFingers) {
    return {
      name: "Good luck",
      phrase: "Good luck",
      confidence: 0.93,
      method: "ai-geometric",
      category: "Expressions",
      description: "Crossed fingers / ASL 'R' handshape ('Good luck / Hope')"
    };
  }

  // RULE 3: Later / 'L' Handshape (🕒 / ASL 'L')
  // Thumb & Index extended at 90 deg; Middle, Ring, Pinky curled
  if (geo.isLShape) {
    return {
      name: "Later",
      phrase: "See you later",
      confidence: 0.92,
      method: "ai-geometric",
      category: "Greetings",
      description: "ASL 'L' handshape ('Later / See you later')"
    };
  }

  // RULE 4: Small / A Little Bit (🤏 / Small Pinch)
  // Thumb & Index held close parallel, others curled
  if (geo.isPinchSmall) {
    return {
      name: "A little bit",
      phrase: "A little bit",
      confidence: 0.91,
      method: "ai-geometric",
      category: "Daily Needs",
      action: "space",
      description: "Small pinch gesture ('A little bit' / Action: Insert Space)"
    };
  }

  // RULE 5: Okay (ASL 'F' Handshape / OK Sign)
  // Thumb & Index tips touching; Middle, Ring, Pinky extended upward spread
  if (geo.thumbIndexDist < 0.075 && geo.isMiddleExtended && geo.isRingExtended && geo.isPinkyExtended && 
      dist(landmarks[8], landmarks[0]) < dist(landmarks[12], landmarks[0]) * 0.95) {
    return {
      name: "Okay",
      phrase: "Okay",
      confidence: 0.94,
      method: "ai-geometric",
      category: "Responses",
      description: "ASL 'F' handshape / OK sign (Thumb & Index touching, other 3 extended)"
    };
  }

  // RULE 6: Call Me (ASL 'Y' Handshape / Phone Sign)
  // Thumb & Pinky extended; Index, Middle, Ring curled into palm
  if (geo.isThumbExtended && geo.isPinkyExtended && !geo.isIndexExtended && !geo.isMiddleExtended && !geo.isRingExtended) {
    return {
      name: "Call me",
      phrase: "Call me",
      confidence: 0.94,
      method: "ai-geometric",
      category: "Conversation",
      description: "ASL 'Y' handshape for 'Call me' (Thumb & Pinky extended)"
    };
  }

  // RULE 7: I Love You (ASL ILY Sign)
  // Thumb + Index + Pinky extended; Middle + Ring curled down
  if (gestureName === "ILoveYou" && gestureScore > 0.6) {
    return {
      name: "I love you",
      phrase: "I love you",
      confidence: Math.min(0.98, gestureScore + 0.1),
      method: "ai-pretrained",
      category: "Expressions",
      description: "ASL 'I Love You' sign (Thumb, Index, Pinky extended)"
    };
  }
  if (geo.isThumbExtended && geo.isIndexExtended && !geo.isMiddleExtended && !geo.isRingExtended && geo.isPinkyExtended) {
    return {
      name: "I love you",
      phrase: "I love you",
      confidence: 0.93,
      method: "ai-geometric",
      category: "Expressions",
      description: "ASL 'I Love You' geometric handshape"
    };
  }

  // RULE 8: Peace / Number Two (V-Sign)
  // Index & Middle extended spread; Ring & Pinky curled down
  if (gestureName === "Victory" && gestureScore > 0.65) {
    return {
      name: "Peace",
      phrase: "Peace",
      confidence: Math.min(0.98, gestureScore + 0.05),
      method: "ai-pretrained",
      category: "Expressions",
      action: "speak",
      description: "Peace / Victory sign (Index & Middle extended)"
    };
  }
  if (geo.isIndexExtended && geo.isMiddleExtended && !geo.isRingExtended && !geo.isPinkyExtended && geo.indexMiddleDist >= 0.05) {
    return {
      name: "Peace",
      phrase: "Peace",
      confidence: 0.91,
      method: "ai-geometric",
      category: "Expressions",
      action: "speak",
      description: "V-Sign handshape (Peace / Number Two)"
    };
  }

  // RULE 9: ASL Number 3 (Thumb + Index + Middle Extended)
  // Universal ASL Three
  if (geo.isNumber3) {
    return {
      name: "Number 3",
      phrase: "Three",
      confidence: 0.92,
      method: "ai-geometric",
      category: "Numbers",
      description: "ASL Number 3 (Thumb, Index, and Middle extended upright)"
    };
  }

  // RULE 10: ASL Number 4 (Index, Middle, Ring, Pinky Extended, Thumb Folded)
  if (geo.isNumber4) {
    return {
      name: "Number 4",
      phrase: "Four",
      confidence: 0.92,
      method: "ai-geometric",
      category: "Numbers",
      description: "ASL Number 4 (Four fingers extended, thumb folded across palm)"
    };
  }

  // RULE 11: Number 1 (☝️ / Index pointing straight up)
  if (geo.isIndexPointingUp && !geo.isThumbExtended && !geo.isMiddleExtended && !geo.isRingExtended && !geo.isPinkyExtended) {
    return {
      name: "Number 1",
      phrase: "One",
      confidence: 0.91,
      method: "ai-geometric",
      category: "Numbers",
      description: "Single index finger pointing straight up ('One')"
    };
  }

  // RULE 12: Directional Point Left (👈 / Action: Backspace)
  if (geo.isIndexPointingLeft && !geo.isMiddleExtended && !geo.isRingExtended && !geo.isPinkyExtended) {
    return {
      name: "Point Left",
      phrase: "Left",
      confidence: 0.90,
      method: "ai-geometric",
      category: "Conversation",
      action: "backspace",
      description: "Index pointing left ('Left' / Action: Backspace last word)"
    };
  }

  // RULE 13: Directional Point Right (👉 / Next)
  if (geo.isIndexPointingRight && !geo.isMiddleExtended && !geo.isRingExtended && !geo.isPinkyExtended) {
    return {
      name: "Point Right",
      phrase: "Right",
      confidence: 0.90,
      method: "ai-geometric",
      category: "Conversation",
      description: "Index pointing right ('Right')"
    };
  }

  // RULE 14: You / Look (Pointing Index Finger Forward)
  if (geo.isIndexExtended && !geo.isMiddleExtended && !geo.isRingExtended && !geo.isPinkyExtended && 
      !geo.isThumbUp && !geo.isThumbExtended && !geo.isIndexPointingLeft && !geo.isIndexPointingRight) {
    return {
      name: "You",
      phrase: "You",
      confidence: 0.91,
      method: "ai-geometric",
      category: "Conversation",
      description: "Index pointing / ASL deixis ('You' / 'Look')"
    };
  }

  // RULE 15: Water (ASL 'W' Handshape)
  // Index, Middle, Ring extended upright; Pinky and Thumb folded together
  if (geo.isIndexExtended && geo.isMiddleExtended && geo.isRingExtended && !geo.isPinkyExtended && geo.thumbPinkyDist < 0.14) {
    return {
      name: "I need water",
      phrase: "I need water",
      confidence: 0.91,
      method: "ai-geometric",
      category: "Daily Needs",
      description: "ASL 'W' handshape for Water"
    };
  }

  // RULE 16: Eat / Food (Flattened 'O' at Chin/Mouth)
  if (geo.isPinchedO && landmarks[4].y < 0.52) {
    return {
      name: "I want food",
      phrase: "I want food",
      confidence: 0.91,
      method: "ai-geometric",
      category: "Daily Needs",
      description: "ASL 'Eat / Food' handshape (pinched fingertips at lips)"
    };
  }

  // RULE 17: Yes (Thumbs Up / ASL Affirmation)
  if (gestureName === "Thumb_Up" && gestureScore > 0.65) {
    return {
      name: "Yes",
      phrase: "Yes",
      confidence: Math.min(0.99, gestureScore + 0.05),
      method: "ai-pretrained",
      category: "Responses",
      description: "Thumbs-up affirmative gesture ('Yes')"
    };
  }
  if (geo.isThumbUp && !geo.isIndexExtended && !geo.isMiddleExtended && !geo.isRingExtended && !geo.isPinkyExtended) {
    return {
      name: "Yes",
      phrase: "Yes",
      confidence: 0.91,
      method: "ai-geometric",
      category: "Responses",
      description: "Thumbs up gesture ('Yes')"
    };
  }

  // RULE 18: No (Thumbs Down / ASL Double Snap)
  if (gestureName === "Thumb_Down" && gestureScore > 0.65) {
    return {
      name: "No",
      phrase: "No",
      confidence: Math.min(0.98, gestureScore + 0.05),
      method: "ai-pretrained",
      category: "Responses",
      description: "Negative / No response gesture ('No')"
    };
  }
  // Geometric ASL 'NO' finger snap (index + middle pinching against thumb)
  if (geo.thumbIndexDist < 0.08 && geo.thumbMiddleDist < 0.08 && !geo.isRingExtended && !geo.isPinkyExtended && landmarks[8].y > 0.35) {
    return {
      name: "No",
      phrase: "No",
      confidence: 0.89,
      method: "ai-geometric",
      category: "Responses",
      description: "ASL 'No' snapping finger handshape"
    };
  }

  // RULE 19: Bathroom / Restroom (ASL 'T' Handshape)
  if (geo.isTHandshape) {
    return {
      name: "Bathroom",
      phrase: "Bathroom please",
      confidence: 0.90,
      method: "ai-geometric",
      category: "Emergency & Assistance",
      description: "ASL 'T' handshape / Bathroom request (Thumb between index & middle knuckles)"
    };
  }

  // RULE 20: Strong / Solid / Power (Closed Fist Held Upright)
  if (geo.isFist && !geo.isThumbUp && !geo.isThumbDown && landmarks[0].y > 0.32 && landmarks[0].y < 0.75) {
    // If fist held at shoulder height away from center
    if (Math.abs(landmarks[0].x - 0.5) > 0.12) {
      return {
        name: "Strong",
        phrase: "Strong",
        confidence: 0.90,
        method: "ai-geometric",
        category: "Expressions",
        action: "speak",
        description: "Closed upright fist ('Strong / Power' / Action: Speak text aloud)"
      };
    }
  }

  // RULE 21: Sorry (Closed 'A' Fist Over Chest)
  if ((gestureName === "Closed_Fist" && gestureScore > 0.6) || (geo.isFist && !geo.isThumbUp)) {
    if (landmarks[0].y > 0.38 && landmarks[0].y < 0.85) {
      return {
        name: "Sorry",
        phrase: "Sorry",
        confidence: 0.89,
        method: gestureName === "Closed_Fist" ? "ai-pretrained" : "ai-geometric",
        category: "Courtesy",
        description: "ASL 'Sorry' gesture (fist over heart/chest)"
      };
    }
  }

  // ==========================================
  // SECTION C: FLAT & OPEN PALM HANDSHAPES
  // ==========================================

  // RULE 22: Thank You (Flat 'B' Hand Touching Chin / Lower Face)
  if (geo.isIndexExtended && geo.isMiddleExtended && geo.isRingExtended && geo.isPinkyExtended && geo.fingersClose) {
    if (landmarks[8].y >= 0.20 && landmarks[8].y < 0.44) {
      return {
        name: "Thank you",
        phrase: "Thank you",
        confidence: 0.91,
        method: "ai-geometric",
        category: "Courtesy",
        description: "Flat hand courtesy sign ('Thank you')"
      };
    }
  }

  // RULE 23: Good / Nice (Flat hand moving forward from chin/chest)
  if (geo.isIndexExtended && geo.isMiddleExtended && geo.isRingExtended && geo.isPinkyExtended && geo.fingersClose) {
    if (landmarks[8].y >= 0.35 && landmarks[8].y <= 0.60 && Math.abs(landmarks[8].y - landmarks[0].y) < 0.18) {
      return {
        name: "Good",
        phrase: "Good",
        confidence: 0.88,
        method: "ai-geometric",
        category: "Courtesy",
        description: "Flat open hand forward gesture ('Good / Nice')"
      };
    }
  }

  // RULE 24: Please (Flat Hand Over Center of Chest)
  if (geo.isIndexExtended && geo.isMiddleExtended && geo.isRingExtended && geo.isPinkyExtended && geo.fingersClose) {
    if (landmarks[8].y >= 0.44 && landmarks[8].y <= 0.82) {
      return {
        name: "Please",
        phrase: "Please",
        confidence: 0.89,
        method: "ai-geometric",
        category: "Courtesy",
        description: "Flat hand over chest / heart ('Please')"
      };
    }
  }

  // RULE 25: Stop / Wait (Open Hand Spread Wide at Chest Level)
  if (geo.extendedCount >= 4 && !geo.fingersClose) {
    if (landmarks[8].y >= 0.38 && landmarks[8].y <= 0.78) {
      return {
        name: "Stop",
        phrase: "Stop",
        confidence: 0.89,
        method: "ai-geometric",
        category: "Emergency & Assistance",
        action: "clear",
        description: "Open palm barrier gesture ('Stop / Wait' / Action: Clear text)"
      };
    }
  }

  // RULE 26: Hello (Raised Open Palm Greeting at Head Level)
  if (gestureName === "Open_Palm" && gestureScore > 0.65 && landmarks[8].y < 0.38) {
    return {
      name: "Hello",
      phrase: "Hello",
      confidence: Math.min(0.97, gestureScore + 0.05),
      method: "ai-pretrained",
      category: "Greetings",
      description: "Raised open palm greeting ('Hello')"
    };
  }
  if (geo.extendedCount >= 4 && landmarks[8].y < 0.38) {
    return {
      name: "Hello",
      phrase: "Hello",
      confidence: 0.91,
      method: "ai-geometric",
      category: "Greetings",
      description: "Raised open hand greeting ('Hello')"
    };
  }

  // Fallback: Hand detected, but position does not match our verified vocabulary
  return {
    name: null,
    phrase: null,
    confidence: 0,
    method: "unrecognized",
    category: null,
    description: "Hand detected, awaiting supported sign"
  };
}

/**
 * Temporal Stability Buffer:
 * Filters out single-frame noise. A sign must be continuously detected
 * across multiple consecutive frames to be confirmed.
 */
export class TemporalStabilityFilter {
  constructor(windowSize = 7, minVotes = 4, cooldownMs = 1300) {
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
 */
export async function runCustomMLClassifier(landmarks, customModelInstance = null) {
  if (!customModelInstance) {
    return null;
  }
  return null;
}
