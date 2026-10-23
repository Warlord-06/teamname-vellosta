# SignBridge 🌉
> **"Every gesture deserves to be understood."**
> Real-Time, Two-Way Sign Language Communication Assistant — University Hackathon MVP

![SignBridge Header](https://img.shields.io/badge/SignBridge-v1.0%20MVP-4F46E5?style=for-the-badge)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Tasks%20Vision-0EA5E9?style=for-the-badge&logo=google)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![On-Device AI](https://img.shields.io/badge/AI-100%25%20On--Device%20Privacy-10B981?style=for-the-badge)

---

## 1. Project Overview

**SignBridge** is a web-based communication assistant designed to bridge interactions between Deaf / Hard-of-Hearing individuals who use sign language and hearing individuals who do not know sign language. 

Built for an 8-hour hackathon scope, SignBridge provides an accessible, two-way communication loop with **zero backend dependencies**, **zero API keys**, and **100% on-device privacy**.

---

## 2. Core Communication Modes

### 🖐️ Mode A — Sign to Speech (Signer &rarr; Listener)
- **Webcam Access with Permission**: Camera activates only after explicit user interaction (`Start Camera`).
- **Live 3D Hand Tracking**: Uses **Google MediaPipe Tasks Vision (`GestureRecognizer` / `HandLandmarker`)** running in WebAssembly to detect 21 3D joint landmarks for up to 2 hands in real-time.
- **Glowing Landmark Skeleton**: High-DPI canvas overlay with color-coded anatomical finger groups (Thumb, Index, Middle, Ring, Pinky, Palm).
- **Hybrid Real-Time Sign Classification**:
  - **MediaPipe Pretrained Neural Model**: Detects foundational gesture categories (`Open_Palm`, `Thumb_Up`, `Thumb_Down`, `Victory`, `ILoveYou`).
  - **Geometric Landmark Pose Analyzer**: Computes finger curl ratios, inter-fingertip distances, angles, and face proximity.
  - **Temporal Stability Filter**: Multi-frame voting buffer (5 of 8 frames) to debounce noise and prevent flickering.
- **Editable Translated Output**: Live text area allows quick manual correction, typo fixes, space insertion, and clipboard copy.
- **Speech Synthesis (Text-to-Speech)**: Speaks the recognized text using the browser's native `SpeechSynthesis API` with configurable pitch, speed (0.7x–1.3x), voice selection, and auto-speak toggle.
- **Evaluation Demo Mode**: Clearly labeled simulated predictions allowing hackathon judges to test the translation buffer and audio speech pipeline without needing a live camera.

### 💬 Mode B — Text to Sign (Listener &rarr; Signer)
- **Interactive Phrase Search**: Case-insensitive, punctuation-tolerant search with alias expansion (e.g., searching `"hi"` or `"hey"` resolves to `"Hello"`, `"water"` resolves to `"I need water"`).
- **Curated Starter Library**: Category pills and chips for 8 essential daily communication phrases.
- **Video Player**:
  - Play, pause, seek, loop, and instant replay (`↺`).
  - Playback speed control (`0.5x`, `0.75x`, `1.0x`, `1.25x`) — indispensable for sign learners to review subtle finger movements.
- **Linguistic & Motion Guide**:
  - Handshape classification (e.g. *Flat B Handshape*, *W Handshape*, *ILY Handshape*).
  - Step-by-step breakdown: Starting Handshape &rarr; Location/Contact &rarr; Motion Arc.
  - Non-manual marker and cultural notes (facial expressions, head tilts, directionality).
- **Strict Accuracy & Missing-Asset Notice**:
  - SignBridge strictly avoids inventing signs or substituting unrelated stock videos.
  - If a verified video file is not yet placed in `public/videos/`, the UI presents a **Verified Video File Awaited** notification alongside the exact step-by-step motion guide.

---

## 3. Supported Vocabulary

| Phrase | Category | ASL Handshape | Mode A (Sign &rarr; Speech) | Mode B (Text &rarr; Sign) | Target Video Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hello** | Greetings | Flat Open B hand | ✅ Open Palm / Wave | ✅ Motion Guide & Player | `/videos/hello.mp4` |
| **Thank you** | Courtesy | Flat B touching chin | ✅ Chin-to-front arc | ✅ Motion Guide & Player | `/videos/thank_you.mp4` |
| **Help me** | Emergency | 'A' fist on flat base | ✅ Two-hand lift | ✅ Motion Guide & Player | `/videos/help_me.mp4` |
| **How are you?** | Conversation | Curved knuckles & point | ✅ Question handshape | ✅ Motion Guide & Player | `/videos/how_are_you.mp4` |
| **I need water** | Daily Needs | 'W' handshape at chin | ✅ W double tap | ✅ Motion Guide & Player | `/videos/need_water.mp4` |
| **Yes** | Responses | 'S' fist nodding | ✅ Thumb Up / Nod | ✅ Motion Guide & Player | `/videos/yes.mp4` |
| **No** | Responses | Index & middle snapping | ✅ Thumb Down / Snap | ✅ Motion Guide & Player | `/videos/no.mp4` |
| **I love you** | Expressions | ILY handshape | ✅ Pretrained ILY | ✅ Motion Guide & Player | `/videos/i_love_you.mp4` |

---

## 4. Prerequisites

- **Node.js**: `v18.0.0` or higher (`v22+` recommended)
- **npm**: `v9.0.0` or higher
- **Modern Browser**: Chrome, Edge, Brave, or Firefox with webcam and WebAssembly support.

---

## 5. Installation & Run Commands

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Step 3: (Optional) Build for Production
```bash
npm run build
npm run preview
```

---

## 6. How to Add Verified Sign-Language Video Files

To add genuine sign language recordings for Mode B:
1. Obtain an authentic ASL clip (from verified educational sources such as *Lifeprint / ASL University*, *SpreadTheSign*, or record a fluent signer).
2. Save the video file in `public/videos/` with the appropriate name:
   - `public/videos/hello.mp4`
   - `public/videos/thank_you.mp4`
   - `public/videos/help_me.mp4`
   - `public/videos/how_are_you.mp4`
   - `public/videos/need_water.mp4`
   - `public/videos/yes.mp4`
   - `public/videos/no.mp4`
   - `public/videos/i_love_you.mp4`
3. The video player will instantly detect the file and enable smooth video playback with slow-motion speed controls!

### Adding New Phrases to the Library
Open `src/data/signPhrases.js` and add a new dictionary entry:
```javascript
{
  id: "please",
  phrase: "Please",
  aliases: ["pls", "if you please"],
  category: "Courtesy",
  videoPath: "/videos/please.mp4",
  videoFile: "please.mp4",
  aslType: "ASL (American Sign Language)",
  handshape: "Flat B Handshape",
  movementSummary: "Rub flat dominant hand in circular clockwise motion over chest.",
  steps: [
    { step: 1, title: "Position", detail: "Place flat open hand over center chest." },
    { step: 2, title: "Circular Motion", detail: "Move hand in a gentle circle twice." }
  ],
  linguisticNotes: "Keep shoulders relaxed and smile warmly.",
  difficulty: "Beginner"
}
```

---

## 7. How to Connect a Custom Machine Learning Model

The sign classification pipeline is modularized in `src/classifier/signClassifier.js`. To plug in a custom trained deep learning model (e.g. TensorFlow.js MLP / CNN / LSTM trained on WLASL):

1. **Install TensorFlow.js**:
   ```bash
   npm install @tensorflow/tfjs
   ```
2. **Export your trained weights** to JSON format (`model.json` + `group1-shard1of1.bin`) and place them in `public/models/`.
3. **Connect the Hook** in `src/classifier/signClassifier.js`:
   ```javascript
   import * as tf from '@tensorflow/tfjs';

   let customModel = null;
   export async function loadCustomSignModel() {
     if (!customModel) {
       customModel = await tf.loadLayersModel('/models/sign_model.json');
     }
     return customModel;
   }

   export async function runCustomMLClassifier(landmarks, customModelInstance) {
     if (!customModelInstance || !landmarks) return null;
     
     // 1. Flatten 21 landmarks [x0, y0, z0, ..., x20, y20, z20] (63 features)
     const flattened = landmarks.flatMap(pt => [pt.x, pt.y, pt.z]);
     
     // 2. Predict
     const tensor = tf.tensor2d([flattened]);
     const prediction = customModelInstance.predict(tensor);
     const probabilities = await prediction.data();
     
     // 3. Map argmax index to vocabulary phrase
     // return { name, phrase, confidence, method: 'custom-ml' };
   }
   ```

---

## 8. Current Limitations & Honest AI Scope

SignBridge is committed to technical and ethical honesty:
1. **Hand Landmarks &ne; Full Sign Language**:
   - MediaPipe extracts 3D hand positions and finger orientations. Natural sign languages also rely heavily on facial grammar (raised/furrowed eyebrows), mouth morphemes, body posture, and continuous 3D transition space.
2. **Vocabulary Scope**:
   - The initial MVP is calibrated for an explicitly defined vocabulary of 8 essential phrases. It does not perform unconstrained sentence translation.
3. **Lighting & Background**:
   - Video hand detection requires adequate lighting and hand visibility against non-cluttered backgrounds.
4. **Single Camera 2D Projection**:
   - Depth (Z-axis) is estimated by MediaPipe from standard monocular webcams and may have slight drift under extreme angles.

---

## 9. Hackathon Demo Flow (Judge Presentation Script)

Follow this 2-minute demonstration flow when presenting to judges:

1. **Introduce SignBridge**:
   - Show the header: *"SignBridge: Every gesture deserves to be understood."*
   - Mention the core value: Two-way communication assistant with 100% on-device client privacy.

2. **Demonstrate Mode A (Sign to Speech)**:
   - Click **Start Camera** &rarr; observe webcam stream and glowing 21 3D landmarks.
   - Show **"Hello"** (Open palm raised facing camera) &rarr; see status change to *"Recognizing: Hello"* &rarr; text buffer updates.
   - Show **"Yes"** (Thumbs up) &rarr; text updates.
   - Show **"I love you"** (Thumb, index, pinky extended) &rarr; text updates.
   - Click **Speak Text** &rarr; hear browser speech synthesis vocalize the phrase clearly.
   - Click **Voice Controls** to show speed and voice customization.
   - Click a **Simulate Chip** in the *Evaluation Demo Mode* to show judges how the fallback simulator works even without camera access.

3. **Demonstrate Mode B (Text to Sign)**:
   - Click the **Text &rarr; Sign** tab.
   - Click a suggested phrase chip (e.g. *"Thank you"* or *"I need water"*).
   - Show the video player controls: Play, Pause, Replay, and especially **0.5x / 0.75x Slow Motion**.
   - Show the **Linguistic & Motion Guide**: Explain the handshape, step 1-2-3 motion, and non-manual facial marker notes.
   - Type an unlisted phrase (e.g., *"quantum physics"*) &rarr; show the friendly fallback explaining why SignBridge refuses to invent signs.

4. **Show Architectural Modularity**:
   - Highlight `src/classifier/signClassifier.js` and `src/data/signPhrases.js` showing how easily developers can expand the vocabulary or plug in custom ML models.

---

## 10. Project Structure

```
├── public/
│   ├── videos/
│   │   ├── README.md               # Video specifications & acquisition guide
│   │   ├── hello.mp4               # Verified sign video clips
│   │   ├── thank_you.mp4
│   │   └── ...
├── src/
│   ├── classifier/
│   │   └── signClassifier.js       # Geometric analysis, MediaPipe gestures & ML hook
│   ├── components/
│   │   ├── Header.jsx              # Navigation & branding
│   │   ├── ModeTabs.jsx            # Two-way communication switcher
│   │   ├── CameraPanel.jsx         # Webcam preview, canvas overlay, controls
│   │   ├── RecognizedText.jsx      # Translated output, manual correction, TTS controls
│   │   ├── QuickDemoSim.jsx        # Honest simulation demo panel for evaluators
│   │   ├── TextToSignPanel.jsx     # Search bar, category filters, phrase pills
│   │   ├── SignVideoPlayer.jsx     # Video player, slow-motion, linguistic motion guide
│   │   ├── StatusMessage.jsx       # Alert banners
│   │   ├── AboutModal.jsx          # Architecture & vocabulary overview
│   │   └── Footer.jsx              # Prototype limitations notice & privacy badge
│   ├── data/
│   │   └── signPhrases.js          # Configurable phrase dictionary & alias matcher
│   ├── hooks/
│   │   ├── useHandLandmarker.js    # MediaPipe Tasks Vision lifecycle & stream management
│   │   └── useSpeechSynthesis.js   # Browser SpeechSynthesis API wrapper
│   ├── utils/
│   │   └── drawLandmarks.js        # High-performance canvas skeleton rendering
│   ├── App.jsx                     # Root application coordinator
│   ├── index.css                   # Responsive design system & micro-animations
│   └── main.jsx                    # Vite entry point
├── package.json
└── vite.config.js
```

---

## 11. License & Attribution

- **MediaPipe Tasks Vision**: Apache 2.0 (Google LLC)
- **Icons**: Lucide React
- Built for University Hackathon Demo.
