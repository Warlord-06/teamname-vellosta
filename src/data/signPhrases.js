/**
 * SignBridge - Verified Sign Language Phrase Library
 * 
 * Comprehensive dictionary of verified sign language signs & phrases.
 * Supports both Mode A (Sign -> Speech) and Mode B (Text -> Sign) search & video guides.
 */

export const SIGN_PHRASES = [
  {
    id: "hello",
    phrase: "Hello",
    emoji: "👋",
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
    id: "namaste",
    phrase: "Namaste",
    emoji: "🙏",
    aliases: ["pranam", "respect", "welcome", "greetings", "peace to you"],
    category: "Greetings",
    videoPath: "/videos/namaste.mp4",
    videoFile: "namaste.mp4",
    aslType: "Universal / ISL (Indian Sign Language)",
    handshape: "Both hands flat open, palms pressed together vertically at chest level.",
    movementSummary: "Bring both open palms together in front of the chest and bow slightly forward with reverence.",
    steps: [
      { step: 1, title: "Palms Meeting", detail: "Bring palms of both hands flat against each other, fingers pointing straight up." },
      { step: 2, title: "Chest Center", detail: "Position the pressed hands at the center of your chest/sternum." },
      { step: 3, title: "Gentle Bow", detail: "Bow your head slightly forward as a sign of mutual honor and respect." }
    ],
    linguisticNotes: "Universal emblem of greeting, peace, and spiritual respect recognized widely across South Asia and international sign communities.",
    difficulty: "Beginner"
  },
  {
    id: "later",
    phrase: "Later",
    emoji: "🕒",
    aliases: ["see you later", "bye", "catch you later", "afterwards"],
    category: "Greetings",
    videoPath: "/videos/later.mp4",
    videoFile: "later.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "ASL 'L' handshape (Thumb and index extended at a 90-degree right angle).",
    movementSummary: "Hold 'L' handshape with index pointing forward, then drop the wrist slightly downward forward.",
    steps: [
      { step: 1, title: "Form 'L'", detail: "Extend your thumb upward and index finger pointing forward, folding middle, ring, and pinky into your palm." },
      { step: 2, title: "Shoulder Height", detail: "Hold the sign forward at shoulder level." },
      { step: 3, title: "Wrist Flick", detail: "Bend your wrist forward so the index finger dips downward, indicating future time." }
    ],
    linguisticNotes: "The 'L' for later is signed with a subtle forward wrist tilt representing time moving onward.",
    difficulty: "Beginner"
  },
  {
    id: "thank_you",
    phrase: "Thank you",
    emoji: "🙏",
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
    id: "please",
    phrase: "Please",
    emoji: "🤲",
    aliases: ["pls", "kindly", "if you please"],
    category: "Courtesy",
    videoPath: "/videos/please.mp4",
    videoFile: "please.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Flat 'B' hand with fingers together, thumb alongside.",
    movementSummary: "Place flat open dominant palm against the center of the chest and make a gentle clockwise circular rubbing motion.",
    steps: [
      { step: 1, title: "Open Flat Hand", detail: "Hold dominant hand flat with fingers together." },
      { step: 2, title: "Chest Placement", detail: "Place palm against the center of your chest/heart." },
      { step: 3, title: "Circular Motion", detail: "Rub your hand in a gentle clockwise circle 2-3 times while maintaining a pleasant, sincere expression." }
    ],
    linguisticNotes: "The sign for 'PLEASE' circles over the heart, symbolizing heartfelt courtesy and sincerity.",
    difficulty: "Beginner"
  },
  {
    id: "sorry",
    phrase: "Sorry",
    emoji: "🥺",
    aliases: ["apologies", "apologize", "my fault", "excuse me", "pardon", "forgive me"],
    category: "Courtesy",
    videoPath: "/videos/sorry.mp4",
    videoFile: "sorry.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "'A' fist (closed fist with thumb resting vertically along the side of index finger).",
    movementSummary: "Place the 'A' fist over your chest/heart and rub in a gentle clockwise circle with a remorseful or apologetic expression.",
    steps: [
      { step: 1, title: "Form 'A' Fist", detail: "Close dominant hand into a fist with thumb resting against the index finger side." },
      { step: 2, title: "Chest Placement", detail: "Place the flat knuckle side of the fist over your sternum/heart." },
      { step: 3, title: "Circular Rub", detail: "Rub in small circular motions 2-3 times while maintaining a repentant facial expression." }
    ],
    linguisticNotes: "Shared placement with 'Please', but uses a closed 'A' fist instead of an open flat hand to signify remorse or sorrow.",
    difficulty: "Beginner"
  },
  {
    id: "good",
    phrase: "Good",
    emoji: "👌",
    aliases: ["nice", "great", "well done", "awesome"],
    category: "Courtesy",
    videoPath: "/videos/good.mp4",
    videoFile: "good.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Flat dominant hand touching chin, then resting into non-dominant palm.",
    movementSummary: "Dominant fingertips touch chin, then hand comes down to slap lightly onto the flat non-dominant palm.",
    steps: [
      { step: 1, title: "Fingertips to Chin", detail: "Place fingers of your flat dominant hand against your chin." },
      { step: 2, title: "Base Palm", detail: "Hold non-dominant hand flat, palm facing upward at waist level." },
      { step: 3, title: "Bring Down", detail: "Bring dominant hand down so the back rests into your open base palm." }
    ],
    linguisticNotes: "Affirmative sign representing satisfaction, high quality, or moral goodness.",
    difficulty: "Beginner"
  },
  {
    id: "help_me",
    phrase: "Help me",
    emoji: "🆘",
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
    id: "bathroom",
    phrase: "Bathroom",
    emoji: "🚻",
    aliases: ["toilet", "restroom", "washroom", "potty", "i need the bathroom"],
    category: "Emergency & Assistance",
    videoPath: "/videos/bathroom.mp4",
    videoFile: "bathroom.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "ASL 'T' handshape (Thumb tucked between index and middle fingers in a fist).",
    movementSummary: "Form the 'T' handshape and shake your hand gently side to side at shoulder level.",
    steps: [
      { step: 1, title: "Form 'T'", detail: "Make a fist, placing your thumb between your index and middle fingers so the thumb tip sticks up." },
      { step: 2, title: "Position", detail: "Hold hand upright in front of your shoulder." },
      { step: 3, title: "Shake", detail: "Shake hand side to side twice with an urgent or questioning expression." }
    ],
    linguisticNotes: "One of the most essential daily accessibility signs. The 'T' stands for 'Toilet'.",
    difficulty: "Beginner"
  },
  {
    id: "stop",
    phrase: "Stop",
    emoji: "🛑",
    aliases: ["wait", "hold on", "pause", "halt", "stop it", "cease"],
    category: "Emergency & Assistance",
    videoPath: "/videos/stop.mp4",
    videoFile: "stop.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Dominant flat hand held vertically as a 'blade'; non-dominant hand held flat palm-up as a base.",
    movementSummary: "Bring dominant hand down sharply like a blade onto the flat open palm of the non-dominant hand.",
    steps: [
      { step: 1, title: "Base Palm", detail: "Extend non-dominant hand flat, palm facing upward at waist height." },
      { step: 2, title: "Blade Hand", detail: "Dominant hand flat with pinky edge pointing downward." },
      { step: 3, title: "Decisive Strike", detail: "Bring pinky edge down firmly onto the center of the base palm and hold momentarily." }
    ],
    linguisticNotes: "The decisive downward stop motion signifies a definitive stop, boundary, or immediate cessation of an action.",
    difficulty: "Intermediate"
  },
  {
    id: "how_are_you",
    phrase: "How are you?",
    emoji: "🤝",
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
    id: "friend",
    phrase: "Friend",
    emoji: "🤝",
    aliases: ["buddy", "pal", "friendship", "best friend"],
    category: "Conversation",
    videoPath: "/videos/friend.mp4",
    videoFile: "friend.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Both hands with index fingers curved into hooks ('X' handshapes).",
    movementSummary: "Hook dominant index over non-dominant index finger, then reverse and hook the other way.",
    steps: [
      { step: 1, title: "Index Hooks", detail: "Extend index fingers of both hands and curve them slightly." },
      { step: 2, title: "Interlink", detail: "Hook dominant index over non-dominant index at chest level." },
      { step: 3, title: "Reverse Link", detail: "Flip and hook non-dominant index over dominant index to show reciprocal friendship." }
    ],
    linguisticNotes: "Represents two people linked together in a bond of mutual trust and camaraderie.",
    difficulty: "Intermediate"
  },
  {
    id: "call_me",
    phrase: "Call me",
    emoji: "📞",
    aliases: ["call", "phone", "contact me", "reach out", "telephone", "ring me"],
    category: "Conversation",
    videoPath: "/videos/call_me.mp4",
    videoFile: "call_me.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "'Y' handshape (Thumb and pinky extended, middle three fingers folded down).",
    movementSummary: "Hold 'Y' hand near your ear/cheek with thumb toward ear and pinky toward mouth, mimicking a telephone receiver.",
    steps: [
      { step: 1, title: "Form 'Y' Handshape", detail: "Extend your thumb and pinky outward while tucking index, middle, and ring fingers into your palm." },
      { step: 2, title: "Place by Cheek", detail: "Bring your thumb near your ear and pinky near your mouth corner." },
      { step: 3, title: "Directed Motion", detail: "Nod slightly or tilt your hand toward your conversation partner to specify 'Call me'." }
    ],
    linguisticNotes: "Directional indicator: held near ear means 'phone/call me'; moving from ear forward toward someone means 'I will call you'.",
    difficulty: "Beginner"
  },
  {
    id: "you",
    phrase: "You",
    emoji: "👉",
    aliases: ["pointing", "look", "there", "hey you", "you there", "yourself"],
    category: "Conversation",
    videoPath: "/videos/you.mp4",
    videoFile: "you.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Index finger extended, other fingers curled into a relaxed fist.",
    movementSummary: "Point the dominant index finger directly forward toward your conversational partner at mid-chest level.",
    steps: [
      { step: 1, title: "Index Setup", detail: "Extend index finger straight forward while holding other fingers relaxed in palm." },
      { step: 2, title: "Target Partner", detail: "Point directly at chest level toward the person you are addressing." },
      { step: 3, title: "Eye Contact", detail: "Maintain direct eye contact with the person you are pointing to." }
    ],
    linguisticNotes: "Pointing (deixis) is not rude in ASL; it is a fundamental grammatical pronoun marker for 'YOU', 'HE/SHE', and spatial referencing.",
    difficulty: "Beginner"
  },
  {
    id: "need_water",
    phrase: "I need water",
    emoji: "💧",
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
    id: "eat_food",
    phrase: "I want food",
    emoji: "🍱",
    aliases: ["eat", "food", "hungry", "meal", "dinner", "lunch", "eating", "food please"],
    category: "Daily Needs",
    videoPath: "/videos/eat_food.mp4",
    videoFile: "eat_food.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Flattened 'O' handshape (Thumb pad touches pads of all four fingertips together in a beak shape).",
    movementSummary: "Bring flattened 'O' hand to your mouth and tap the fingertips lightly against your lips twice.",
    steps: [
      { step: 1, title: "Form Flattened 'O'", detail: "Bring the tips of all four fingers together to meet the tip of your thumb." },
      { step: 2, title: "Approach Lips", detail: "Bring the fingertips toward the center of your lips." },
      { step: 3, title: "Double Tap", detail: "Tap your lips gently twice with the fingertips." }
    ],
    linguisticNotes: "In ASL noun-verb pairs: tapping once signifies the verb 'to eat'; tapping twice signifies the noun 'food'.",
    difficulty: "Beginner"
  },
  {
    id: "house",
    phrase: "House",
    emoji: "🏠",
    aliases: ["home", "building", "place", "my home"],
    category: "Daily Needs",
    videoPath: "/videos/house.mp4",
    videoFile: "house.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Both hands flat, fingertips touching to form a pitched roof, then moving down to form walls.",
    movementSummary: "Both flat hands touch fingertips at a 45-degree angle forming a roof, then separate and move down.",
    steps: [
      { step: 1, title: "Form Roof Peak", detail: "Touch fingertips of both flat hands together at an angle above chest." },
      { step: 2, title: "Slanted Roof", detail: "Keep wrists spaced apart so hands form an inverted 'V'." },
      { step: 3, title: "Form Walls", detail: "Move hands straight down to outline the walls of the house." }
    ],
    linguisticNotes: "Iconic sign visually drawing the architectural outline of a house roof and walls.",
    difficulty: "Intermediate"
  },
  {
    id: "time",
    phrase: "Time",
    emoji: "⌚",
    aliases: ["clock", "what time is it", "hour", "watch"],
    category: "Daily Needs",
    videoPath: "/videos/time.mp4",
    videoFile: "time.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Dominant index finger pointing down at non-dominant wrist.",
    movementSummary: "Tap your dominant index finger twice on the back of your non-dominant wrist where a wristwatch sits.",
    steps: [
      { step: 1, title: "Wrist Base", detail: "Hold non-dominant wrist in front of chest." },
      { step: 2, title: "Tap Index", detail: "Extend dominant index finger and tap twice gently on the wrist joint." }
    ],
    linguisticNotes: "Universal ASL sign indicating clock time or asking 'What time is it?' with furrowed brows.",
    difficulty: "Beginner"
  },
  {
    id: "small_bit",
    phrase: "A little bit",
    emoji: "🤏",
    aliases: ["small", "tiny", "little", "pinch", "a bit"],
    category: "Daily Needs",
    videoPath: "/videos/small_bit.mp4",
    videoFile: "small_bit.mp4",
    aslType: "Universal / ASL",
    handshape: "Thumb and index finger held close together in parallel pinch measuring a tiny space.",
    movementSummary: "Hold thumb and index finger a quarter-inch apart at chest height with an attentive expression.",
    steps: [
      { step: 1, title: "Pinch Formation", detail: "Bring thumb and index finger close together without touching." },
      { step: 2, title: "Curl Others", detail: "Keep middle, ring, and pinky fingers relaxed into the palm." }
    ],
    linguisticNotes: "Expresses small quantity, degree, or size. Also functions as a hands-free action gesture to insert a space.",
    difficulty: "Beginner"
  },
  {
    id: "more",
    phrase: "More",
    emoji: "➕",
    aliases: ["again", "add more", "repeat", "extra", "another"],
    category: "Daily Needs",
    videoPath: "/videos/more.mp4",
    videoFile: "more.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Both hands in flattened 'O' shapes (all fingertips pinched against thumb pads).",
    movementSummary: "Bring both hands together in front of chest so the fingertips tap each other repeatedly.",
    steps: [
      { step: 1, title: "Both Flattened 'O'", detail: "Form flattened 'O' handshapes with both hands (fingertips touching thumbs)." },
      { step: 2, title: "Chest Center", detail: "Position both hands at chest level with fingertips pointing toward each other." },
      { step: 3, title: "Double Tap", detail: "Tap the fingertips of both hands together twice gently." }
    ],
    linguisticNotes: "One of the most foundational functional signs in ASL, expressing a request for continuation or increase.",
    difficulty: "Beginner"
  },
  {
    id: "yes",
    phrase: "Yes",
    emoji: "👍",
    aliases: ["yeah", "yep", "correct", "agree", "affirmative"],
    category: "Responses",
    videoPath: "/videos/yes.mp4",
    videoFile: "yes.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "'S' fist (closed fist, thumb wrapped over fingers) or Thumbs Up.",
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
    emoji: "👎",
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
    id: "okay",
    phrase: "Okay",
    emoji: "👌",
    aliases: ["ok", "all good", "fine", "understood", "good", "alright"],
    category: "Responses",
    videoPath: "/videos/okay.mp4",
    videoFile: "okay.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "'F' handshape / OK sign (Index finger touches thumb to form circle, other 3 fingers extended upward spread).",
    movementSummary: "Hold 'F' handshape with palm facing forward at chest level, gently nodding hand forward once.",
    steps: [
      { step: 1, title: "Circle Formation", detail: "Touch the tip of your index finger to the tip of your thumb, creating an 'O' ring." },
      { step: 2, title: "Fingers Upward", detail: "Extend your middle, ring, and pinky fingers upright and slightly separated." },
      { step: 3, title: "Present Sign", detail: "Hold the sign forward at mid-chest level with an affirmative nod." }
    ],
    linguisticNotes: "The 'F' handshape functions both as the ASL fingerspelled letter F and the universal affirmation sign 'OK'.",
    difficulty: "Beginner"
  },
  {
    id: "all_done",
    phrase: "All done",
    emoji: "✅",
    aliases: ["finished", "complete", "done", "ended", "stop now"],
    category: "Responses",
    videoPath: "/videos/all_done.mp4",
    videoFile: "all_done.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Both hands in open '5' handshapes facing inward toward body.",
    movementSummary: "Both open 5 hands start facing the chest, then quickly flip outward so palms face forward.",
    steps: [
      { step: 1, title: "Open Hands Inward", detail: "Hold both hands open at chest height with palms facing your chest." },
      { step: 2, title: "Outward Flip", detail: "Rotate your wrists outward so palms now face away from you." },
      { step: 3, title: "Final Hold", detail: "Hold hands open with fingers spread to indicate total completion." }
    ],
    linguisticNotes: "Essential sign in Deaf culture and baby sign language denoting completion, cessation, or satisfaction.",
    difficulty: "Beginner"
  },
  {
    id: "bad",
    phrase: "Bad",
    emoji: "👎",
    aliases: ["poor", "terrible", "unpleasant", "not good"],
    category: "Responses",
    videoPath: "/videos/bad.mp4",
    videoFile: "bad.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Flat hand touching chin, then flipping downward forcefully.",
    movementSummary: "Place fingertips of flat hand against chin, then throw hand down away from face with palm down.",
    steps: [
      { step: 1, title: "Fingers to Chin", detail: "Fingertips of flat hand touch your chin." },
      { step: 2, title: "Flip Down", detail: "Turn palm sharply downward toward the floor with a dissatisfied facial grimace." }
    ],
    linguisticNotes: "Opposite of 'Good'. Facial expression should show clear disapproval or distaste.",
    difficulty: "Beginner"
  },
  {
    id: "i_love_you",
    phrase: "I love you",
    emoji: "🤟",
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
  },
  {
    id: "heart",
    phrase: "Heart",
    emoji: "🫶",
    aliases: ["love", "affection", "heart shape", "care"],
    category: "Expressions",
    videoPath: "/videos/heart.mp4",
    videoFile: "heart.mp4",
    aslType: "Universal Gesture",
    handshape: "Both hands forming an arched heart with thumbs touching at the bottom and fingertips at the top.",
    movementSummary: "Bring both hands together in front of chest, arching fingers to form a visible heart symbol.",
    steps: [
      { step: 1, title: "Thumbs Together", detail: "Touch the tips of your thumbs together pointing downward." },
      { step: 2, title: "Fingers Arched", detail: "Curve your index and middle fingers so the tips meet at the top curve." },
      { step: 3, title: "Chest Center", detail: "Present the heart shape centered over your heart with a warm smile." }
    ],
    linguisticNotes: "Contemporary international emblem of love and appreciation celebrated widely across modern sign and youth culture.",
    difficulty: "Beginner"
  },
  {
    id: "peace",
    phrase: "Peace",
    emoji: "✌️",
    aliases: ["two", "victory", "v-sign", "peace out", "calm"],
    category: "Expressions",
    videoPath: "/videos/peace.mp4",
    videoFile: "peace.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "'V' handshape (Index and middle fingers extended in a V-shape; thumb folds ring and pinky).",
    movementSummary: "Raise hand with index and middle fingers spread in a 'V' pointing upward, palm facing forward.",
    steps: [
      { step: 1, title: "Form 'V'", detail: "Extend index and middle fingers upward in a 'V' shape, tucking ring and pinky under thumb." },
      { step: 2, title: "Palm Forward", detail: "Hold hand upright at shoulder height with palm facing outward." },
      { step: 3, title: "Hold Steady", detail: "Keep hand stationary with a relaxed, friendly facial expression." }
    ],
    linguisticNotes: "The 'V' handshape corresponds to the ASL number 2 and the universal victory/peace sign.",
    difficulty: "Beginner"
  },
  {
    id: "rock_on",
    phrase: "Rock on",
    emoji: "🤘",
    aliases: ["horns", "heavy metal", "rock", "party"],
    category: "Expressions",
    videoPath: "/videos/rock_on.mp4",
    videoFile: "rock_on.mp4",
    aslType: "Universal Gesture",
    handshape: "Sign of the horns (Index and pinky extended, middle and ring curled, thumb holding fingers).",
    movementSummary: "Raise hand at shoulder level with index and pinky pointing up, palm facing forward.",
    steps: [
      { step: 1, title: "Fold Center Fingers", detail: "Curl middle and ring fingers down into palm." },
      { step: 2, title: "Extend Horns", detail: "Keep index and pinky pointing straight up." },
      { step: 3, title: "Thumb Inward", detail: "Thumb holds the middle and ring fingers securely down." }
    ],
    linguisticNotes: "Distinct from 'I Love You' because the thumb does NOT extend outward, forming the iconic horn shape.",
    difficulty: "Beginner"
  },
  {
    id: "good_luck",
    phrase: "Good luck",
    emoji: "🤞",
    aliases: ["hope", "fingers crossed", "wishing you well", "cross fingers"],
    category: "Expressions",
    videoPath: "/videos/good_luck.mp4",
    videoFile: "good_luck.mp4",
    aslType: "ASL 'R' / Universal",
    handshape: "Index and middle fingers extended upright and crossed over each other.",
    movementSummary: "Hold crossed fingers handshape at shoulder level with an optimistic facial expression.",
    steps: [
      { step: 1, title: "Extend Two Fingers", detail: "Extend index and middle fingers while folding ring and pinky." },
      { step: 2, title: "Cross Fingers", detail: "Cross your middle finger over your index finger." },
      { step: 3, title: "Present Sign", detail: "Hold upright facing forward to wish someone good luck or express hope." }
    ],
    linguisticNotes: "Corresponds to the ASL fingerspelled letter 'R' and the worldwide gesture for luck and wishing well.",
    difficulty: "Beginner"
  },
  {
    id: "applause",
    phrase: "Applause",
    emoji: "🙌",
    aliases: ["cheer", "clapping", "deaf applause", "bravo", "celebrate"],
    category: "Expressions",
    videoPath: "/videos/applause.mp4",
    videoFile: "applause.mp4",
    aslType: "Deaf Culture Universal",
    handshape: "Both hands raised high with open fingers spread wide.",
    movementSummary: "Raise both hands above head and twist wrists back and forth rapidly (visual clapping).",
    steps: [
      { step: 1, title: "Hands Up", detail: "Raise both hands up in the air above shoulder height." },
      { step: 2, title: "Open Fingers", detail: "Spread all 10 fingers wide." },
      { step: 3, title: "Twist Wrists", detail: "Twist both wrists back and forth rapidly to create visual excitement." }
    ],
    linguisticNotes: "The official Deaf applause gesture. Audible clapping cannot be heard by deaf performers, so visual waving allows everyone to share the applause.",
    difficulty: "Beginner"
  },
  {
    id: "strong",
    phrase: "Strong",
    emoji: "✊",
    aliases: ["power", "strength", "solid", "tough", "fist"],
    category: "Expressions",
    videoPath: "/videos/strong.mp4",
    videoFile: "strong.mp4",
    aslType: "ASL (American Sign Language)",
    handshape: "Tight closed fist held upright at shoulder height.",
    movementSummary: "Hold strong upright fist with firm posture and resolute facial expression.",
    steps: [
      { step: 1, title: "Firm Fist", detail: "Close fingers tightly into a solid fist with thumb across fingers." },
      { step: 2, title: "Shoulder Height", detail: "Hold fist upright at shoulder level to show strength." }
    ],
    linguisticNotes: "Universal sign of resilience, determination, solidarity, and personal power.",
    difficulty: "Beginner"
  },
  {
    id: "number_1",
    phrase: "Number 1",
    emoji: "☝️",
    aliases: ["one", "1", "first", "single"],
    category: "Numbers",
    videoPath: "/videos/number_1.mp4",
    videoFile: "number_1.mp4",
    aslType: "ASL Number System",
    handshape: "Index finger pointed straight up, other fingers folded into palm.",
    movementSummary: "Hold hand upright with index finger pointing to the sky, palm facing inward/forward.",
    steps: [
      { step: 1, title: "Extend Index", detail: "Point index finger straight up to the ceiling." },
      { step: 2, title: "Curl Others", detail: "Fold middle, ring, pinky, and thumb into a neat fist." }
    ],
    linguisticNotes: "Standard cardinal number 1 in American Sign Language.",
    difficulty: "Beginner"
  },
  {
    id: "number_3",
    phrase: "Number 3",
    emoji: "3️⃣",
    aliases: ["three", "3", "third"],
    category: "Numbers",
    videoPath: "/videos/number_3.mp4",
    videoFile: "number_3.mp4",
    aslType: "ASL Number System",
    handshape: "Thumb, Index, and Middle fingers extended upright; Ring and Pinky curled.",
    movementSummary: "Raise hand with thumb, index, and middle fingers extended upright at shoulder height.",
    steps: [
      { step: 1, title: "Extend Three", detail: "Extend your thumb, index finger, and middle finger." },
      { step: 2, title: "Fold Others", detail: "Curl your ring and pinky fingers down into your palm." },
      { step: 3, title: "Palm Inward/Forward", detail: "Hold hand upright facing forward." }
    ],
    linguisticNotes: "In ASL, 3 is signed with thumb, index, and middle fingers (NOT index, middle, ring like in spoken English cultures).",
    difficulty: "Beginner"
  },
  {
    id: "number_4",
    phrase: "Number 4",
    emoji: "4️⃣",
    aliases: ["four", "4", "fourth"],
    category: "Numbers",
    videoPath: "/videos/number_4.mp4",
    videoFile: "number_4.mp4",
    aslType: "ASL Number System",
    handshape: "Four fingers extended upright together, thumb folded across palm.",
    movementSummary: "Hold hand upright with all four fingers pointing up and thumb tucked tightly over palm.",
    steps: [
      { step: 1, title: "Extend Four Fingers", detail: "Hold index, middle, ring, and pinky fingers upright." },
      { step: 2, title: "Fold Thumb", detail: "Fold thumb across your palm." }
    ],
    linguisticNotes: "Standard cardinal number 4 in ASL.",
    difficulty: "Beginner"
  },
  {
    id: "point_left",
    phrase: "Point Left",
    emoji: "👈",
    aliases: ["left", "backspace", "delete", "previous", "go back"],
    category: "Conversation",
    videoPath: "/videos/point_left.mp4",
    videoFile: "point_left.mp4",
    aslType: "Directional / Action",
    handshape: "Index finger extended horizontally to the left.",
    movementSummary: "Point your index finger horizontally toward the left side.",
    steps: [
      { step: 1, title: "Point Left", detail: "Extend index finger pointing leftward across your chest." },
      { step: 2, title: "Action Gesture", detail: "In Hands-Free Mode, this gesture automatically backspaces the last word." }
    ],
    linguisticNotes: "Directional deixis indicating 'left' or spatial orientation. Doubles as the hands-free backspace action.",
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

  // Direct match on phrase
  const exact = SIGN_PHRASES.find(p => p.phrase.toLowerCase().replace(/[?!.,]/g, "") === clean);
  if (exact) return exact;

  // Exact match on id
  const idMatch = SIGN_PHRASES.find(p => p.id.toLowerCase() === clean);
  if (idMatch) return idMatch;

  // Alias match
  const aliasMatch = SIGN_PHRASES.find(p => 
    p.aliases && p.aliases.some(a => a.toLowerCase().replace(/[?!.,]/g, "") === clean)
  );
  if (aliasMatch) return aliasMatch;

  // Partial / contains match
  const partial = SIGN_PHRASES.find(p => 
    clean.includes(p.phrase.toLowerCase().replace(/[?!.,]/g, "")) ||
    (p.aliases && p.aliases.some(a => clean.includes(a.toLowerCase())))
  );
  if (partial) return partial;

  return null;
}
