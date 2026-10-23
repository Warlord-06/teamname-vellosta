/**
 * SignBridge - Hand Sign Reference Charts & Structured Catalogue
 * 
 * Sourced directly from user-provided reference charts:
 * 1. Chart 1: Popular Hand Signs (20 line drawings, black & white)
 * 2. Chart 2: Common Hand Signs & Their Meanings (10 color illustrated poses)
 */

export const REFERENCE_CHARTS = [
  {
    id: "chart-1",
    title: "Hand Signs Reference Chart 1 (Popular Hand Gestures)",
    subtitle: "20 line-drawn cultural, conversational, and slang gestures",
    imagePath: "/charts/hand-signs-reference-chart-1.jpg",
    attribution: "Source: Community Reference Chart (Attribution: Ronnie James Dio for Rock gesture)",
    signCount: 20,
    layout: "4 columns × 5 rows (Grid Layout)",
    description: "Line-art reference sheet illustrating 20 widely recognized Western cultural, everyday conversational, and informal hand gestures."
  },
  {
    id: "chart-2",
    title: "Common Hand Signs & Their Meanings (Reference Chart 2)",
    subtitle: "10 color illustrated cross-cultural and ASL gestures with meanings",
    imagePath: "/charts/common-hand-signs-meanings-chart-2.jpg",
    attribution: "Source: Educational Infographic — Common Hand Signs & Their Meanings",
    signCount: 10,
    layout: "5 columns × 2 rows (Infographic Layout)",
    description: "Color-illustrated reference chart detailing 10 common symbolic hand gestures along with their cultural meanings and emotional intentions."
  }
];

export const SIGN_CATALOGUE = [
  {
    id: "thumbs-up",
    name: "Thumbs Up",
    meaning: "Approval, agreement, contentment, or positive confirmation ('Good job / Yes')",
    sources: ["Chart 1 (good job)", "Chart 2 (Thumbs Up)"],
    chartLocations: [
      { chartId: "chart-1", label: "good job (Row 2, Col 2)" },
      { chartId: "chart-2", label: "Thumbs Up (Row 1, Col 1)" }
    ],
    handshape: "Closed fist with dominant thumb pointing vertically upward.",
    isSupported: true,
    modelMapping: {
      type: "mediapipe-neural",
      classIndex: 5,
      className: "Thumb_Up",
      internalPhrase: "Yes"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Universal sign of approval in Western culture. In ASL, serves as general affirmation ('Yes / Good')."
  },
  {
    id: "dislike-thumbs-down",
    name: "Thumbs Down / Dislike",
    meaning: "Disapproval, negative response, or rejection ('No / Dislike')",
    sources: ["Chart 1 (dislike)"],
    chartLocations: [
      { chartId: "chart-1", label: "dislike (Row 2, Col 4)" }
    ],
    handshape: "Closed fist with dominant thumb pointing vertically downward.",
    isSupported: true,
    modelMapping: {
      type: "mediapipe-neural",
      classIndex: 4,
      className: "Thumb_Down",
      internalPhrase: "No"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Universal negative emblem. Mapped to 'No' response in SignBridge."
  },
  {
    id: "peace-victory",
    name: "Peace Sign / Victory",
    meaning: "Positive symbol of peace, victory, harmony, or the number two",
    sources: ["Chart 1 (peace, man)", "Chart 2 (Peace Sign)"],
    chartLocations: [
      { chartId: "chart-1", label: "peace, man (Row 3, Col 2)" },
      { chartId: "chart-2", label: "Peace Sign (Row 1, Col 2)" }
    ],
    handshape: "Index and middle fingers extended upright spread in a 'V'; ring, pinky, and thumb folded down.",
    isSupported: true,
    modelMapping: {
      type: "mediapipe-neural",
      classIndex: 6,
      className: "Victory",
      internalPhrase: "Peace"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Originated as the WWII 'V for Victory' and popularized as the 1960s peace symbol. Also ASL Number 2."
  },
  {
    id: "i-love-you",
    name: "I Love You (ASL ILY)",
    meaning: "Expression of love, affection, and personal goodwill",
    sources: ["Chart 2 (I Love You)"],
    chartLocations: [
      { chartId: "chart-2", label: "I Love You (Row 2, Col 4)" }
    ],
    handshape: "Thumb, index, and pinky extended upright; middle and ring fingers folded into palm.",
    isSupported: true,
    modelMapping: {
      type: "mediapipe-neural",
      classIndex: 7,
      className: "ILoveYou",
      internalPhrase: "I love you"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Official ASL composite sign combining the fingerspelled letters 'I', 'L', and 'Y' into a single iconic emblem."
  },
  {
    id: "ok-sign",
    name: "OK Sign / A-OK",
    meaning: "Agreement, approval, safety, or 'okay / fine'",
    sources: ["Chart 1 (a-ok)", "Chart 2 (OK Sign)"],
    chartLocations: [
      { chartId: "chart-1", label: "a-ok (Row 4, Col 2)" },
      { chartId: "chart-2", label: "OK Sign (Row 1, Col 3)" }
    ],
    handshape: "Thumb and index tips touching to form a loop; middle, ring, and pinky extended upward.",
    isSupported: true,
    modelMapping: {
      type: "ai-geometric",
      classIndex: null,
      className: "Rule 5 (Okay)",
      internalPhrase: "Okay"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Corresponds to ASL 'F' handshape. Note: In certain regions (Brazil, Greece), this gesture carries offensive connotations."
  },
  {
    id: "shaka-hang-loose",
    name: "Shaka Sign / Hang Loose",
    meaning: "Camaraderie, positivity, chill/relax, surf culture greeting",
    sources: ["Chart 1 (hang loose)", "Chart 2 (Shaka Sign)"],
    chartLocations: [
      { chartId: "chart-1", label: "hang loose (Row 1, Col 1)" },
      { chartId: "chart-2", label: "Shaka Sign (Row 1, Col 4)" }
    ],
    handshape: "Thumb and pinky extended outward; index, middle, and ring curled flat into palm.",
    isSupported: true,
    modelMapping: {
      type: "ai-geometric",
      classIndex: null,
      className: "Rule 6 (Call me / ASL Y)",
      internalPhrase: "Call me"
    },
    verificationStatus: "Verified Working (Shares ASL 'Y' Handshape)",
    culturalNotes: "Hawaiian Shaka greeting. Uses the identical handshape as the ASL letter 'Y' and 'Call Me' gesture."
  },
  {
    id: "call-me",
    name: "Call Me",
    meaning: "Request or promise to telephone / contact someone",
    sources: ["Chart 1 (call me)"],
    chartLocations: [
      { chartId: "chart-1", label: "call me (Row 1, Col 2)" }
    ],
    handshape: "'Y' handshape placed near the ear and mouth like a telephone handset.",
    isSupported: true,
    modelMapping: {
      type: "ai-geometric",
      classIndex: null,
      className: "Rule 6 (Call me)",
      internalPhrase: "Call me"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Mimes an old-fashioned telephone receiver (thumb at ear, pinky at mouth)."
  },
  {
    id: "rock-on-horns",
    name: "Sign of the Horns / Rock On",
    meaning: "Rock music appreciation, excitement, solidarity, or warding off evil",
    sources: ["Chart 1 (ROCK)", "Chart 2 (Sign of the Horns)"],
    chartLocations: [
      { chartId: "chart-1", label: "ROCK (Row 5, Col 4)" },
      { chartId: "chart-2", label: "Sign of the Horns (Row 2, Col 3)" }
    ],
    handshape: "Index and pinky extended upright; middle and ring folded into palm and held down by thumb.",
    isSupported: true,
    modelMapping: {
      type: "ai-geometric",
      classIndex: null,
      className: "Rule 1 (Rock on)",
      internalPhrase: "Rock on"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Popularized in heavy metal culture by Ronnie James Dio (adapted from Italian 'corna' talisman)."
  },
  {
    id: "good-luck-crossed-fingers",
    name: "Good Luck / Crossed Fingers",
    meaning: "Wishing for good fortune, hope, or breaking a minor promise playfully",
    sources: ["Chart 1 (good luck)"],
    chartLocations: [
      { chartId: "chart-1", label: "good luck (Row 5, Col 3)" }
    ],
    handshape: "Middle finger crossed over index finger; other fingers curled into palm.",
    isSupported: true,
    modelMapping: {
      type: "ai-geometric",
      classIndex: null,
      className: "Rule 2 (Good luck / ASL R)",
      internalPhrase: "Good luck"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Identical to the ASL fingerspelled letter 'R'. Ancient Christian talisman of the cross."
  },
  {
    id: "heart-hands",
    name: "Heart Hands",
    meaning: "Love, adoration, friendship, gratitude, or warmth",
    sources: ["Chart 2 (Heart Hands)"],
    chartLocations: [
      { chartId: "chart-2", label: "Heart Hands (Row 2, Col 1)" }
    ],
    handshape: "Both hands curled with thumbs touching at bottom and curved index/middle fingers meeting at top to outline a heart.",
    isSupported: true,
    modelMapping: {
      type: "ai-geometric",
      classIndex: null,
      className: "Two-Handed Rule 2 (Heart)",
      internalPhrase: "Heart"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Popular contemporary two-handed gesture among youth, athletes, and pop culture."
  },
  {
    id: "you-pointing",
    name: "You / Deixis Pointing",
    meaning: "Indicating the listener, pointing out an object, or directing attention ('You / Look')",
    sources: ["Chart 1 (you)"],
    chartLocations: [
      { chartId: "chart-1", label: "you (Row 3, Col 4)" }
    ],
    handshape: "Index finger extended forward horizontally; other fingers curled with thumb alongside.",
    isSupported: true,
    modelMapping: {
      type: "ai-geometric",
      classIndex: null,
      className: "Rule 14 (You)",
      internalPhrase: "You"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Fundamental grammatical building block in ASL representing second-person pronominal reference ('You')."
  },
  {
    id: "number-1-pointing-up",
    name: "Number 1 / Pointing Up",
    meaning: "The quantity one, 'first', or drawing attention upward",
    sources: ["MediaPipe Class 3 (Pointing_Up)"],
    chartLocations: [
      { chartId: "chart-1", label: "Variant of you / single finger" }
    ],
    handshape: "Index finger extended straight up; middle, ring, pinky, and thumb curled.",
    isSupported: true,
    modelMapping: {
      type: "mediapipe-neural",
      classIndex: 3,
      className: "Pointing_Up",
      internalPhrase: "One"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Standard ASL and universal numerical indicator for the digit 1."
  },
  {
    id: "high-five-talk-to-hand",
    name: "High-Five / Talk to the Hand / Hello",
    meaning: "Greeting, celebratory slap ('High-Five'), or defensive barrier ('Talk to the hand / Stop')",
    sources: ["Chart 1 (high-five)", "Chart 1 (talk to the hand)"],
    chartLocations: [
      { chartId: "chart-1", label: "high-five (Row 1, Col 4)" },
      { chartId: "chart-1", label: "talk to the hand (Row 2, Col 1)" }
    ],
    handshape: "Flat open hand with all 5 fingers extended upward facing outward.",
    isSupported: true,
    modelMapping: {
      type: "mediapipe-neural",
      classIndex: 2,
      className: "Open_Palm",
      internalPhrase: "Hello / Stop"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "High-five is celebratory. 'Talk to the hand' indicates dismissive refusal. In SignBridge, raised open palm maps to 'Hello' and forward barrier maps to 'Stop'."
  },
  {
    id: "power-fist",
    name: "Raised Fist / Power To",
    meaning: "Solidarity, resistance, unity, strength, or power",
    sources: ["Chart 1 (power to (fill in the blank))"],
    chartLocations: [
      { chartId: "chart-1", label: "power to (fill in the blank) (Row 5, Col 1)" }
    ],
    handshape: "Tightly closed fist held upright.",
    isSupported: true,
    modelMapping: {
      type: "mediapipe-neural",
      classIndex: 1,
      className: "Closed_Fist",
      internalPhrase: "Strong"
    },
    verificationStatus: "Verified Working",
    culturalNotes: "Historic political and cultural emblem of resilience and empowerment."
  },
  {
    id: "loser-l-sign",
    name: "Loser / 'L' Handshape",
    meaning: "Pejorative slang ('Loser' when on forehead); ASL letter 'L' and sign for 'Later'",
    sources: ["Chart 1 (loser)"],
    chartLocations: [
      { chartId: "chart-1", label: "loser (Row 1, Col 3)" }
    ],
    handshape: "Thumb and index finger extended at a 90-degree right angle forming an 'L'; other three fingers curled.",
    isSupported: true,
    modelMapping: {
      type: "ai-geometric",
      classIndex: null,
      className: "Rule 3 (Later / ASL L)",
      internalPhrase: "Later"
    },
    verificationStatus: "Verified Working (L-Handshape recognized as 'Later')",
    culturalNotes: "Pop-culture taunt popularized in the 1990s. In ASL, it is the standard letter 'L' and root of 'Later'."
  },
  // ==========================================
  // REFERENCE-ONLY / CANDIDATE GESTURES
  // ==========================================
  {
    id: "vulcan-salute",
    name: "Vulcan Salute",
    meaning: "Benediction: 'Live long and prosper'",
    sources: ["Chart 2 (Vulcan Salute)"],
    chartLocations: [
      { chartId: "chart-2", label: "Vulcan Salute (Row 1, Col 5)" }
    ],
    handshape: "Palm open with fingers separated into two pairs: index + middle together, ring + pinky together, thumb extended out.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Not in current model vocabulary)",
    culturalNotes: "Sci-Fi gesture created by Leonard Nimoy (Spock in Star Trek), adapted from the Priestly Blessing in Jewish tradition. Requires inter-finger gap classifier to detect reliably."
  },
  {
    id: "pinched-fingers",
    name: "Pinched Fingers (Che Vuoi?)",
    meaning: "Italian inquiry gesture: 'What do you want?' or 'What are you talking about?'",
    sources: ["Chart 2 (Pinched Fingers)"],
    chartLocations: [
      { chartId: "chart-2", label: "Pinched Fingers (Row 2, Col 2)" }
    ],
    handshape: "All five fingertips gathered together pointing vertically upward, wrist oscillating up and down.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Not in current model vocabulary)",
    culturalNotes: "Iconic Italian hand gesture ('mano a borsa'). Dynamic hand oscillation is required to distinguish from static pinching."
  },
  {
    id: "come-here",
    name: "Come Here / Beckoning",
    meaning: "Calling or beckoning someone closer ('Come here')",
    sources: ["Chart 2 (Come Here)"],
    chartLocations: [
      { chartId: "chart-2", label: "Come Here (Row 2, Col 5)" }
    ],
    handshape: "Palm facing signer/upward, index finger repeatedly curling and extending toward the body.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Dynamic motion requires temporal video model)",
    culturalNotes: "Taboo or insulting in several cultures (e.g. Philippines, Singapore, Japan) where it is reserved exclusively for calling animals."
  },
  {
    id: "bang-bang-finger-gun",
    name: "Bang Bang / Finger Gun",
    meaning: "Playful gun gesture, acknowledgment, or 'gotcha'",
    sources: ["Chart 1 (bang bang)"],
    chartLocations: [
      { chartId: "chart-1", label: "bang bang (Row 4, Col 1)" }
    ],
    handshape: "Thumb upright ('hammer'), index finger pointing horizontally forward ('barrel'), other fingers curled.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Not in current model vocabulary)",
    culturalNotes: "Common informal greeting or playful mime. Can be misconstrued in sensitive environments."
  },
  {
    id: "check-please",
    name: "Check, Please / Bill Mime",
    meaning: "Non-verbal signal to waitstaff asking for the restaurant bill/check",
    sources: ["Chart 1 (check, please)"],
    chartLocations: [
      { chartId: "chart-1", label: "check, please (Row 4, Col 4)" }
    ],
    handshape: "Index finger or pinch gesture tracing a diagonal zig-zag in the air as if signing a receipt.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Trajectory-based dynamic gesture)",
    culturalNotes: "Universal dining gesture. Requires 2D spatial trajectory tracking across multiple seconds."
  },
  {
    id: "worlds-smallest-violin",
    name: "World's Smallest Violin",
    meaning: "Sarcastic sympathy for someone's minor or exaggerated complaint",
    sources: ["Chart 1 (world's smallest violin)"],
    chartLocations: [
      { chartId: "chart-1", label: "world's smallest violin (Row 3, Col 1)" }
    ],
    handshape: "Thumb and index fingertips pressed together and rubbed back and forth as if playing a miniature violin bow.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Micro-motion gesture)",
    culturalNotes: "Sarcastic cultural idiom originating in mid-20th century American comedy."
  },
  {
    id: "hitchin-a-ride",
    name: "Hitchin' a Ride / Hitchhiker Thumb",
    meaning: "Soliciting a ride from passing vehicles",
    sources: ["Chart 1 (hitchin' a ride)"],
    chartLocations: [
      { chartId: "chart-1", label: "hitchin' a ride (Row 2, Col 3)" }
    ],
    handshape: "Closed fist with thumb extended horizontally pointing outward toward traffic direction.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Orientation ambiguity with thumbs-up)",
    culturalNotes: "Shares thumb extension with thumbs-up, but requires horizontal wrist rotation. Unsafe to map to Thumbs Up without false positives."
  },
  {
    id: "shocker",
    name: "The Shocker",
    meaning: "Vulgar collegiate / pop-culture sexual slang gesture",
    sources: ["Chart 1 (shocker)"],
    chartLocations: [
      { chartId: "chart-1", label: "shocker (Row 3, Col 3)" }
    ],
    handshape: "Index, middle, and pinky extended; ring finger curled down into palm, thumb tucked.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Non-standard slang / Potentially offensive)",
    culturalNotes: "Slang hand pose. Documented for reference completeness, not included in assistive sign recognition."
  },
  {
    id: "a-hole-inverted-ok",
    name: "A-Hole (Inverted OK Sign)",
    meaning: "Vulgar pejorative gesture / The Circle Game",
    sources: ["Chart 1 (a-hole)"],
    chartLocations: [
      { chartId: "chart-1", label: "a-hole (Row 4, Col 3)" }
    ],
    handshape: "OK sign inverted with fingers pointing downward below the waist.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Vulgar slang / Potentially offensive)",
    culturalNotes: "Insulting hand gesture in Mediterranean and Latin cultures; also adapted into schoolyard 'circle game'."
  },
  {
    id: "f-you-middle-finger",
    name: "The Middle Finger / F-YOU",
    meaning: "Obscene gesture expressing extreme contempt, anger, or defiance",
    sources: ["Chart 1 (F-YOU)"],
    chartLocations: [
      { chartId: "chart-1", label: "F-YOU (Row 5, Col 2)" }
    ],
    handshape: "Middle finger extended upright while all other fingers and thumb are curled into a tight fist.",
    isSupported: false,
    modelMapping: null,
    verificationStatus: "Reference-Only (Obscene / Excluded from assistive vocabulary)",
    culturalNotes: "Ancient phallic emblem ('digitus impudicus') dating back to ancient Greece and Rome. Excluded from recognition outputs."
  }
];

export function getSupportedSignsCount() {
  return SIGN_CATALOGUE.filter(s => s.isSupported).length;
}

export function getReferenceOnlySignsCount() {
  return SIGN_CATALOGUE.filter(s => !s.isSupported).length;
}
