/**
 * SignBridge - Verified Sign Language Phrase Library
 * 
 * Starter dictionary of verified sign language phrases.
 * To add a new phrase:
 * 1. Add an entry here with unique id, phrase, aliases, and description.
 * 2. Place the verified MP4/WebM video in public/videos/{videoFile}.
 * 3. Never substitute unrelated gestures for authentic sign language signs.
 */

export const SIGN_PHRASES = [
  {
    id: "hello",
    phrase: "Hello",
    aliases: ["hi", "hey", "greetings", "hello there", "good morning"],
    category: "Greetings",
    videoPath: "/videos/hello.mp4",
    videoFile: "hello.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Open B-handshape (flat hand, fingers together, thumb alongside)",
    movementSummary: "Dominant hand touches near temple/forehead, then moves smoothly outward with a friendly greeting motion (similar to a gentle salute).",
    steps: [
      { step: 1, title: "Starting Handshape", detail: "Form a flat 'B' hand with fingers together and thumb resting lightly at the side." },
      { step: 2, title: "Initial Position", detail: "Raise your dominant hand so your fingertips touch lightly near your temple or forehead." },
      { step: 3, title: "Outward Movement", detail: "Move your hand smoothly up and outward away from your face with an open, friendly facial expression." }
    ],
    linguisticNotes: "The sign for 'Hello' in ASL resembles an open-hand salute originating near the temple. Facial expression should be welcoming and warm.",
    difficulty: "Beginner"
  },
  {
    id: "thank_you",
    phrase: "Thank you",
    aliases: ["thanks", "thank u", "many thanks", "appreciate it"],
    category: "Courtesy",
    videoPath: "/videos/thank_you.mp4",
    videoFile: "thank_you.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Flat Open B-handshape with fingertips together",
    movementSummary: "Fingertips of dominant flat hand touch chin or lower lip, then move forward and slightly downward toward the listener.",
    steps: [
      { step: 1, title: "Starting Handshape", detail: "Open dominant hand flat with fingers together." },
      { step: 2, title: "Chin Contact", detail: "Touch the tips of your fingers lightly to your chin or lower lip." },
      { step: 3, title: "Forward Arc", detail: "Move your hand outward toward the person you are thanking, finishing palm slightly upward." }
    ],
    linguisticNotes: "Do not blow a kiss. The hand moves straight out from the chin toward the receiver with a slight head nod of gratitude.",
    difficulty: "Beginner"
  },
  {
    id: "help_me",
    phrase: "Help me",
    aliases: ["help", "i need help", "assist me", "please help", "emergency"],
    category: "Emergency & Assistance",
    videoPath: "/videos/help_me.mp4",
    videoFile: "help_me.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Dominant hand forms an 'A' fist with thumb upright; non-dominant hand is a flat 'B' palm facing up.",
    movementSummary: "Dominant 'A' fist rests on flat non-dominant palm, and both hands lift together upward toward the signer.",
    steps: [
      { step: 1, title: "Non-dominant Base", detail: "Place non-dominant hand flat, palm facing upward at chest height." },
      { step: 2, title: "Dominant Fist", detail: "Form a fist with dominant hand, thumb extended upright ('A' handshape), and rest it on the base palm." },
      { step: 3, title: "Upward Lift Toward Body", detail: "Lift both hands upward together, bringing them slightly toward yourself to specify 'help ME'." }
    ],
    linguisticNotes: "'Help' is a directional verb in ASL. Moving the lifted sign toward yourself means 'help me'; moving it toward the other person means 'I help you'.",
    difficulty: "Intermediate"
  },
  {
    id: "how_are_you",
    phrase: "How are you?",
    aliases: ["how are you", "how are u", "how you doing", "how are things"],
    category: "Conversation",
    videoPath: "/videos/how_are_you.mp4",
    videoFile: "how_are_you.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Both hands curved with knuckles touching, thumbs pointing upward; then transition to pointing forward.",
    movementSummary: "Both curved hands start with backs of fingers touching, roll outward toward the front, followed by pointing toward the listener ('YOU').",
    steps: [
      { step: 1, title: "Curved Hands", detail: "Bring both hands together with curved fingers, knuckles touching, thumbs up." },
      { step: 2, title: "Roll Outward ('HOW')", detail: "Roll both hands outward so palms face upward." },
      { step: 3, title: "Point to Person ('YOU')", detail: "Point dominant index finger toward the conversational partner while lowering eyebrows (WH-question facial marker)." }
    ],
    linguisticNotes: "In ASL, WH-questions like 'How are you?' require lowered eyebrows and a slight forward head tilt during the question.",
    difficulty: "Intermediate"
  },
  {
    id: "need_water",
    phrase: "I need water",
    aliases: ["water", "i want water", "drink water", "thirsty", "need water"],
    category: "Daily Needs",
    videoPath: "/videos/need_water.mp4",
    videoFile: "need_water.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "'W' handshape (Index, Middle, and Ring fingers held up spread; thumb holds pinky tip down).",
    movementSummary: "Form the 'W' handshape and tap the index finger twice lightly against your chin/lower lip.",
    steps: [
      { step: 1, title: "Form 'W' Handshape", detail: "Extend your index, middle, and ring fingers upright. Hold your pinky down with your thumb." },
      { step: 2, title: "Position at Chin", detail: "Bring the side of the index finger close to the center of your chin." },
      { step: 3, title: "Double Tap", detail: "Tap the side of your index finger twice against your chin gently." }
    ],
    linguisticNotes: "The sign for 'WATER' uses the ASL 'W' hand tapping the chin twice. Context clarifies 'I need water' or 'water please'.",
    difficulty: "Beginner"
  },
  {
    id: "yes",
    phrase: "Yes",
    aliases: ["yeah", "yep", "correct", "agree", "affirmative"],
    category: "Responses",
    videoPath: "/videos/yes.mp4",
    videoFile: "yes.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "'S' fist (closed fist, thumb wrapped over fingers).",
    movementSummary: "Hold closed fist at shoulder level and nod the wrist up and down twice, mimicking a nodding head.",
    steps: [
      { step: 1, title: "Form Fist", detail: "Close your dominant hand into a loose 'S' fist." },
      { step: 2, title: "Wrist Nod", detail: "Bend your wrist forward and back twice, as if the fist is a person nodding their head." }
    ],
    linguisticNotes: "The sign for 'YES' is an iconic representation of head nodding. Pair with an agreeable head nod.",
    difficulty: "Beginner"
  },
  {
    id: "no",
    phrase: "No",
    aliases: ["nope", "nah", "negative", "disagree"],
    category: "Responses",
    videoPath: "/videos/no.mp4",
    videoFile: "no.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Index and middle fingers extended together; thumb extended below them.",
    movementSummary: "Snap index and middle fingers down quickly onto the thumb pad twice, resembling a mouth closing firmly.",
    steps: [
      { step: 1, title: "Finger Setup", detail: "Hold index and middle fingers together, with thumb beneath." },
      { step: 2, title: "Snap Down", detail: "Snap the two fingers down firmly to pinch against the thumb." },
      { step: 3, title: "Repetition", detail: "Perform a quick double pinch with a slight head shake." }
    ],
    linguisticNotes: "The sign represents the letters N and O closing together. Use a clear, firm negative head shake.",
    difficulty: "Beginner"
  },
  {
    id: "i_love_you",
    phrase: "I love you",
    aliases: ["ily", "love you", "love"],
    category: "Expressions",
    videoPath: "/videos/i_love_you.mp4",
    videoFile: "i_love_you.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "ILY handshape: Thumb, Index, and Pinky extended; Middle and Ring folded down.",
    movementSummary: "Extend dominant hand with thumb, index, and pinky up (combining letters I, L, and Y) facing forward toward the recipient.",
    steps: [
      { step: 1, title: "Fold Middle & Ring", detail: "Curl your middle and ring fingers down into your palm." },
      { step: 2, title: "Extend Others", detail: "Keep thumb, index finger, and pinky finger fully extended." },
      { step: 3, title: "Present Hand", detail: "Hold hand upright with palm facing forward at chest/shoulder level." }
    ],
    linguisticNotes: "Universal ASL sign combining fingerspelled 'I', 'L', and 'Y'. Recognized worldwide as an emblem of affection and community.",
    difficulty: "Beginner"
  }
];

/**
 * Searches the phrase library case-insensitively with alias support
 */
export function findSignPhrase(query) {
  if (!query || typeof query !== "string") return null;
  const clean = query.trim().toLowerCase().replace(/[?!.,]/g, "");
  if (!clean) return null;

  // Direct match
  const exact = SIGN_PHRASES.find(p => p.phrase.toLowerCase().replace(/[?!.,]/g, "") === clean);
  if (exact) return exact;

  // Alias match
  const aliasMatch = SIGN_PHRASES.find(p => 
    p.aliases.some(a => a.toLowerCase().replace(/[?!.,]/g, "") === clean)
  );
  if (aliasMatch) return aliasMatch;

  // Partial / contains match
  const partial = SIGN_PHRASES.find(p => 
    clean.includes(p.phrase.toLowerCase().replace(/[?!.,]/g, "")) ||
    p.aliases.some(a => clean.includes(a.toLowerCase()))
  );
  if (partial) return partial;

  return null;
}
