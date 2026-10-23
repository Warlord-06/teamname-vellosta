# SignBridge 🌉
> **"Every gesture deserves to be understood."**  
> Real-Time, Two-Way Sign Language Communication Assistant — Client-Side Web Application

![SignBridge Version](https://img.shields.io/badge/SignBridge-v1.0.0%20MVP-4F46E5?style=for-the-badge)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Tasks%20Vision-0EA5E9?style=for-the-badge&logo=google)
![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)
![On-Device AI](https://img.shields.io/badge/AI-100%25%20On--Device%20Privacy-10B981?style=for-the-badge)

---

## 1. Project Overview

**SignBridge** is a web-based accessibility application designed to enable immediate two-way communication between Deaf / Hard-of-Hearing individuals who communicate in sign language and hearing individuals who do not know sign language.

Built with pure front-end technologies, SignBridge requires **zero backend servers**, **zero API keys**, and **zero external account credentials**. All video processing and classification occurs strictly within the user's browser, ensuring complete privacy.

---

## 2. Core Functional Modules

### 🖐️ Mode A — Sign to Speech (Signer &rarr; Listener)
- **Webcam Capture with Explicit Permission:** The camera activates exclusively upon clicking `Start Camera`. It is never accessed silently on page load.
- **On-Device 3D Hand Tracking:** Uses Google's **MediaPipe Tasks Vision** (`GestureRecognizer` / `HandLandmarker`) compiled to WebAssembly to track 21 3D hand joints per hand for up to 2 hands in real time.
- **Canvas Landmark Overlay:** An HTML5 canvas renders glowing bones with color-coded anatomical finger groups (Palm, Thumb, Index, Middle, Ring, Pinky).
- **Hybrid Real-Time Sign Classification:**
  - *MediaPipe Pre-trained Neural Classes:* Leverages MediaPipe's pre-trained deep learning gesture model (`Open_Palm`, `Thumb_Up`, `Thumb_Down`, `Victory`, `ILoveYou`).
  - *3D Landmark Geometry Analyzer:* Computes Euclidean joint distances, finger extension and curl states, two-handed proximity vectors, and spatial positions across 31+ additional signs.
  - *Temporal Stability Filter:* Implements a sliding window filter (requiring 4 matching votes out of 7 consecutive frames with a 1300ms cooldown) to eliminate transient noise and jitter.
- **Live Hand Anatomy Inspector HUD:** Real-time visual readout displaying the extension, curl, and pinch states of each individual finger, providing transparent feedback on how the AI interprets hand geometry.
- **⚡ Hands-Free Action Gestures:**
  - 👈 **Point Left:** Deletes the last word from the sentence buffer (Backspace).
  - 🤏 **Small Pinch ("A little bit"):** Inserts a space between words.
  - ✊ **Strong Fist (or Peace held):** Speaks the current sentence aloud.
  - ✋ **Stop (Open Palm barrier):** Clears the sentence buffer.
- **Editable Translated Output:** An interactive textarea allows manual corrections, typo fixes, clipboard copying, and clear actions.
- **Speech Synthesis (TTS):** Vocalizes confirmed words and sentences using the browser's native `SpeechSynthesis API` with configurable pitch, speed (0.7x–1.3x), voice selection, and auto-speak toggle.
- **Evaluation Gesture Simulator:** Category-filtered chips allowing users or evaluators to test text buffer updates, action gestures, and speech synthesis without requiring an active webcam.

### 💬 Mode B — Text to Sign (Listener &rarr; Signer)
- **Phrase Lookup:** Case-insensitive, punctuation-tolerant search matching exact phrases, IDs, or aliases (e.g. searching `"water"` or `"thirsty"` resolves to `"I need water"`).
- **Curated Starter Library:** Category filters covering 36 phrases across Greetings, Courtesy, Daily Needs, Emergency, Conversation, Responses, Expressions, and Numbers.
- **Sign Video Player:** Supports Play, Pause, Seek, Replay (`↺`), Loop, and Slow-Motion playback speeds (`0.5x`, `0.75x`, `1.0x`, `1.25x`).
- **Linguistic & Motion Guide:** Handshape specifications, 3-step motion breakdowns (Starting Position &rarr; Contact/Movement &rarr; Finish), and non-manual grammatical marker notes.
- **Ethical Fallback Notice:** In compliance with ethical sign language principles, SignBridge refuses to invent or substitute unrelated stock videos. If an `.mp4` video file is not yet placed in `public/videos/`, the player displays a *"Verified Video Awaited"* notice alongside the authentic linguistic guide.

### 🎮 Mode C — Gesture Trainer & Accuracy Quiz
- **Gamified Practice Decks:** Curated challenge playlists including Everyday Essentials, Daily Needs & Help, Expressions & Friendship, Two-Handed Mastery, and Numbers & Shapes.
- **Real-Time Accuracy Validation:** Requires the signer to hold the target gesture steadily for 1.0 second. A progress bar animates from 0% to 100%.
- **Instant Rewards:** Awards 25 XP points, tracks daily streak counters (🔥), plays synthesized audio praise, and auto-advances to the next sign.
- **Cheat Sheet Reference:** Quick access to the complete 36-gesture reference directory with 1-hand vs 2-hand badges and handshape descriptions.

---

## 3. Technology Stack Confirmed by Repository

| Layer / Concern | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **UI Framework** | React | `^19.3.1` | Declarative UI rendering, custom hooks, and state management |
| **DOM Renderer** | React DOM | `^19.3.1` | Mounts root component into `#root` |
| **Bundler & Dev Server** | Vite | `^8.3.4` | Fast development server (`localhost:5173`) and production bundler |
| **AI / Vision Engine** | `@mediapipe/tasks-vision` | `^1.1.1` | WebAssembly-based 3D hand tracking and gesture recognition |
| **Icons** | `lucide-react` | `^1.61.0` | SVG icons across navigation, controls, and status pills |
| **Linter** | `oxlint` | `^1.88.0` | High-speed Rust-based JavaScript/React linter |
| **Styling** | Vanilla CSS (CSS3) | Custom | Design system in `src/index.css` with CSS custom properties |
| **Audio Output** | Web SpeechSynthesis API | Native Browser | Text-to-speech audio synthesis |
| **Video Input** | WebRTC `getUserMedia` | Native Browser | Monocular camera video stream |

---

## 4. Supported Vocabulary Inventory (36 Phrases)

The repository defines 36 phrases in [`src/data/signPhrases.js`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/data/signPhrases.js):

| Phrase | Category | Sign Basis | Mode A (Sign &rarr; Speech) | Mode B (Text &rarr; Sign) | Video File Target |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hello** | Greetings | ASL | ✅ Pretrained Open Palm / Wave | ✅ Motion Guide & Player | `/videos/hello.mp4` |
| **Namaste** | Greetings | Universal / ISL | ✅ Two-hand vertical press | ✅ Motion Guide & Player | `/videos/namaste.mp4` |
| **Later** | Greetings | ASL | ✅ ASL 'L' 90° wrist tilt | ✅ Motion Guide & Player | `/videos/later.mp4` |
| **Thank you** | Courtesy | ASL | ✅ Flat hand chin-to-front arc | ✅ Motion Guide & Player | `/videos/thank_you.mp4` |
| **Please** | Courtesy | ASL | ✅ Flat hand chest circle | ✅ Motion Guide & Player | `/videos/please.mp4` |
| **Sorry** | Courtesy | ASL | ✅ 'A' fist chest circle | ✅ Motion Guide & Player | `/videos/sorry.mp4` |
| **Good** | Courtesy | ASL | ✅ Flat hand chin to palm | ✅ Motion Guide & Player | `/videos/good.mp4` |
| **Help me** | Emergency | ASL | ✅ Two-handed fist on base lift | ✅ Motion Guide & Player | `/videos/help_me.mp4` |
| **Bathroom** | Emergency | ASL | ✅ Shaking ASL 'T' fist | ✅ Motion Guide & Player | `/videos/bathroom.mp4` |
| **Stop** | Emergency | ASL | ✅ Vertical blade / barrier palm | ✅ Motion Guide & Player | `/videos/stop.mp4` |
| **How are you?** | Conversation | ASL | ✅ Curved knuckles to pointing | ✅ Motion Guide & Player | `/videos/how_are_you.mp4` |
| **Friend** | Conversation | ASL | ✅ Linked index finger hooks | ✅ Motion Guide & Player | `/videos/friend.mp4` |
| **Call me** | Conversation | ASL | ✅ 'Y' phone handshape | ✅ Motion Guide & Player | `/videos/call_me.mp4` |
| **You** | Conversation | ASL | ✅ Index pointing forward | ✅ Motion Guide & Player | `/videos/you.mp4` |
| **Point Left** | Conversation | Universal | ✅ Index pointing left (Backspace) | ✅ Motion Guide & Player | `/videos/point_left.mp4` |
| **I need water** | Daily Needs | ASL | ✅ ASL 'W' chin double tap | ✅ Motion Guide & Player | `/videos/need_water.mp4` |
| **I want food** | Daily Needs | ASL | ✅ Flattened 'O' lips double tap | ✅ Motion Guide & Player | `/videos/eat_food.mp4` |
| **House** | Daily Needs | ASL | ✅ Two hands roof peak triangle | ✅ Motion Guide & Player | `/videos/house.mp4` |
| **Time** | Daily Needs | ASL | ✅ Index tapping wrist | ✅ Motion Guide & Player | `/videos/time.mp4` |
| **A little bit** | Daily Needs | Universal | ✅ Small pinch gap (Space action) | ✅ Motion Guide & Player | `/videos/small_bit.mp4` |
| **More** | Daily Needs | ASL | ✅ Both pinched hands tapping | ✅ Motion Guide & Player | `/videos/more.mp4` |
| **Yes** | Responses | ASL | ✅ Pretrained Thumb Up / Nod | ✅ Motion Guide & Player | `/videos/yes.mp4` |
| **No** | Responses | ASL | ✅ Pretrained Thumb Down / Snap | ✅ Motion Guide & Player | `/videos/no.mp4` |
| **Okay** | Responses | ASL | ✅ ASL 'F' / OK circle | ✅ Motion Guide & Player | `/videos/okay.mp4` |
| **All done** | Responses | ASL | ✅ Two hands open outward flip | ✅ Motion Guide & Player | `/videos/all_done.mp4` |
| **Bad** | Responses | ASL | ✅ Downward chin flip | ✅ Motion Guide & Player | `/videos/bad.mp4` |
| **I love you** | Expressions | ASL | ✅ Pretrained ILY handshape | ✅ Motion Guide & Player | `/videos/i_love_you.mp4` |
| **Heart** | Expressions | Universal | ✅ Two hands arched heart | ✅ Motion Guide & Player | `/videos/heart.mp4` |
| **Peace** | Expressions | ASL / Universal | ✅ Pretrained Victory / V-sign | ✅ Motion Guide & Player | `/videos/peace.mp4` |
| **Rock on** | Expressions | Universal | ✅ Horns (Index & Pinky up) | ✅ Motion Guide & Player | `/videos/rock_on.mp4` |
| **Good luck** | Expressions | ASL | ✅ Crossed fingers (ASL 'R') | ✅ Motion Guide & Player | `/videos/good_luck.mp4` |
| **Applause** | Expressions | Deaf Culture | ✅ Both hands raised high waving | ✅ Motion Guide & Player | `/videos/applause.mp4` |
| **Strong** | Expressions | ASL | ✅ Closed upright firm fist | ✅ Motion Guide & Player | `/videos/strong.mp4` |
| **Number 1** | Numbers | ASL | ✅ Index finger upright | ✅ Motion Guide & Player | `/videos/number_1.mp4` |
| **Number 3** | Numbers | ASL | ✅ Thumb, Index, Middle upright | ✅ Motion Guide & Player | `/videos/number_3.mp4` |
| **Number 4** | Numbers | ASL | ✅ 4 fingers up, thumb folded | ✅ Motion Guide & Player | `/videos/number_4.mp4` |

### 4.1 Hand Sign Reference Charts & Expanded Catalogue (25 Signs)

In addition to the 36 verified core signs, SignBridge integrates two visual reference charts and an expanded 25-sign structured catalogue in [`src/data/signReferenceCatalogue.js`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/data/signReferenceCatalogue.js):

- **Reference Chart 1 (Popular Hand Signs):** Located at [`public/charts/hand-signs-reference-chart-1.jpg`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/public/charts/hand-signs-reference-chart-1.jpg). 20 line-drawn cultural, everyday conversational, and informal hand gestures.
- **Reference Chart 2 (Common Hand Signs & Their Meanings):** Located at [`public/charts/common-hand-signs-meanings-chart-2.jpg`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/public/charts/common-hand-signs-meanings-chart-2.jpg). 10 color illustrated cross-cultural and ASL gestures with meanings.
- **Accessing the Hand Sign Library:** Click **"Guide"** in the camera toolbar or **"Reference Charts"** in the Text-to-Sign panel, then switch to the **"Reference Charts & Catalogue"** tab. Includes interactive image zoom lightbox, search, and status filters:
  - **Live AI Supported (15 Signs):** Mapped to verified MediaPipe neural classes or 3D geometric heuristics (`Thumbs Up`, `Peace`, `OK Sign`, `Shaka / Call Me`, `I Love You`, `Rock On`, `Good Luck`, `Heart Hands`, `You`, `Number 1`, `High-Five / Hello`, `Power Fist`, `Loser / Later`, `Dislike / No`).
  - **Reference-Only (10 Signs):** Documented cultural, slang, or dynamic gestures that require future dataset collection and model training before live recognition can be enabled safely (`Vulcan Salute`, `Pinched Fingers / Che Vuoi`, `Come Here`, `Finger Gun`, `Check Please`, `World's Smallest Violin`, `Hitchin' a Ride`, `The Shocker`, `A-Hole`, `The Middle Finger`).

---

## 5. Prerequisites & Environment Setup

### Prerequisites
- **Node.js:** `v18.0.0` or higher (`v20+` or `v22+` recommended).
- **npm:** `v9.0.0` or higher.
- **Hardware:** Webcam supporting at least 720p resolution at 20+ FPS.
- **Operating System:** Windows, macOS, or Linux.
- **Browser:** Google Chrome (recommended), Microsoft Edge, Mozilla Firefox, or Brave with WebAssembly and WebGL enabled.

### Environment & Assets
- **Environment Variables:** No `.env` files or API keys are required.
- **AI Models:** MediaPipe WASM binaries (`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm`) and the pre-trained `gesture_recognizer.task` model (`https://storage.googleapis.com/mediapipe-models/...`) are fetched dynamically from Google CDNs upon first load. Internet access is required during initial initialization.
- **Video Files:** The directory `public/videos/` is designed to hold `.mp4` video files for Mode B. No video files are included in the repository by default; see [Section 8](#8-adding-verified-sign-video-files) for instructions.

---

## 6. Installation & Execution Commands

All commands are derived directly from [`package.json`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/package.json):

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Start Development Server
```powershell
npm run dev
```
Starts the Vite dev server bound to all network interfaces:
- **Local:** `http://localhost:5173/`
- **Network:** `http://<your-lan-ip>:5173/`

### Step 3: Lint the Source Code
```powershell
npm run lint
```
Runs Oxlint across all JavaScript and JSX source files.

### Step 4: Build for Production
```powershell
npm run build
```
Compiles and bundles the application into the `dist/` directory using Vite.

### Step 5: Preview Production Build
```powershell
npm run preview
```
Spins up a local web server to preview the compiled `dist/` bundle.

> [!NOTE]
> **Automated Testing Script Status:**
> The repository currently has no automated test runner configured in `package.json` (such as Vitest, Jest, or Playwright). Automated test scripts must be added in a future phase. See [`TESTING.md`](./TESTING.md) for the manual testing procedures and testing strategy.

---

## 7. Camera Permissions & Troubleshooting

### Camera Lifecycle
1. The camera stream is activated **only** when the user clicks the `Start Camera` button in the UI.
2. Clicking `Stop Camera` or unmounting the component immediately stops all media tracks (`stream.getTracks().forEach(t => t.stop())`) and turns off the hardware indicator light.

### Troubleshooting Guide

| Issue / Symptom | Root Cause | Resolution Steps |
| :--- | :--- | :--- |
| **"Camera Permission Blocked"** | Browser denied access or permission was revoked. | Click the camera/lock icon in your browser address bar &rarr; Set Camera to **Allow** &rarr; Click **Try Again**. |
| **"Camera Device Unavailable"** | Another application (Zoom, Teams, OBS) is holding an exclusive lock on the camera. | Close other video applications &rarr; Unplug and reconnect external webcam if applicable &rarr; Click **Retry Connection**. |
| **"Insecure Context" Error** | WebRTC requires a secure context (HTTPS or `localhost`). | When accessing over a local network (`http://192.168.x.x:5173`), modern browsers block `getUserMedia`. Access via `http://localhost:5173` or set up an HTTPS tunnel. |
| **Low FPS / Video Stutter** | Browser running with software rendering instead of WebGL GPU acceleration. | In Chrome/Edge, navigate to `chrome://settings/system` &rarr; Ensure **"Use graphics acceleration when available"** is toggled ON. |
| **Hand Not Detected** | Hand is too close, too far, or ambient lighting is insufficient. | Position your hand 1.5 to 3 feet from the lens. Ensure the hand is evenly illuminated and not silhouetted against a bright window. |

---

## 8. Adding Verified Sign Video Files

For Mode B video playback, place authentic sign video recordings in `public/videos/`:

```
public/videos/
├── hello.mp4
├── namaste.mp4
├── thank_you.mp4
├── help_me.mp4
└── ...
```

- **Format:** H.264 encoded `.mp4` or VP9/AV1 `.webm`.
- **Framing:** Centered, head-to-waist framing against a clean, neutral background.
- **Framerate:** 30 or 60 FPS for smooth slow-motion playback.

If an `.mp4` file is not present, `SignVideoPlayer` automatically displays a **Verified Video Awaited** notification alongside step-by-step linguistic motion instructions.

---

## 9. Repository Structure

```
SIH/
├── .oxlintrc.json              # Oxlint linter configuration
├── .gitignore                  # Git ignore rules (node_modules, dist, certs)
├── index.html                  # HTML5 entry point and Google Fonts preload
├── package.json                # Project dependencies, metadata, and npm scripts
├── package-lock.json           # Locked dependency tree
├── vite.config.js              # Vite bundler configuration (@vitejs/plugin-react)
├── PRD.md                      # Product Requirements Document
├── README.md                   # This overview, setup, and operations guide
├── ARCHITECTURE.md             # System architecture, data flow, and components
├── IMPLEMENTATION_PLAN.md      # Phased development roadmap
├── TASKS.md                    # Project task tracker and verification status
├── TESTING.md                  # Comprehensive manual and planned test strategies
├── CHANGELOG.md                # Version history and change tracking
├── public/
│   ├── favicon.svg             # Application favicon
│   ├── icons.svg               # SVG asset definitions
│   └── videos/
│       └── README.md           # Instructions for acquiring authentic video clips
└── src/
    ├── main.jsx                # Application root mounting with React.StrictMode
    ├── App.jsx                 # Main state coordinator, mode tabs, action gestures
    ├── App.css                 # Legacy base styles
    ├── index.css               # Core design system tokens, responsive grid, animations
    ├── classifier/
    │   └── signClassifier.js   # 3D geometric analyzer, heuristics, temporal stability
    ├── components/
    │   ├── AboutModal.jsx      # Technical overview and full vocabulary modal
    │   ├── CameraPanel.jsx     # Live video, canvas overlay, Hand Anatomy HUD
    │   ├── Footer.jsx          # Educational disclaimer and vocabulary pills
    │   ├── GestureCheatSheetModal.jsx # Searchable 36-gesture directory modal
    │   ├── Header.jsx          # Brand header and status badges
    │   ├── ModeTabs.jsx        # Switcher for Sign->Speech, Text->Sign, Trainer
    │   ├── PracticeMode.jsx    # Interactive gesture challenge & quiz trainer
    │   ├── QuickDemoSim.jsx    # Evaluation gesture simulator
    │   ├── RecognizedText.jsx  # Translated textarea, TTS controls, action gestures
    │   ├── SignVideoPlayer.jsx # Video playback controls and linguistic breakdown
    │   ├── StatusMessage.jsx   # Alert callouts
    │   └── TextToSignPanel.jsx # Phrase search bar, category chips, video viewer
    ├── data/
    │   └── signPhrases.js      # 36-phrase dictionary with linguistic breakdowns
    ├── hooks/
    │   ├── useHandLandmarker.js  # MediaPipe Tasks Vision lifecycle & stream loop
    │   └── useSpeechSynthesis.js # Web SpeechSynthesis API integration
    └── utils/
        └── drawLandmarks.js    # Canvas rendering utilities for glowing 3D skeleton
```

---

## 10. Current Status, Limitations & Ethical Scope

1. **Static Gesture Focus:** SignBridge currently evaluates static handshapes and position-based gestures. It does not parse continuous grammatical sentences or rapid fingerspelling sequences.
2. **Facial Expression (Non-Manual Markers):** Natural sign languages rely on facial morphology (e.g. raised eyebrows for questions). Current classification analyzes 3D hand joints only.
3. **Hardware & Environment Dependency:** Accurate joint estimation requires adequate lighting and unimpeded camera framing.
4. **Offline Capability:** Initial load requires network access to fetch CDN-hosted WebAssembly and model assets.

---

## 11. Contribution Guidance

1. **Documentation First:** All functional changes must be documented in `PRD.md`, `ARCHITECTURE.md`, and `CHANGELOG.md`.
2. **Lint Cleanliness:** Run `npm run lint` before committing any code changes.
3. **No Hallucinated Signs:** Do not invent sign language gestures or add arbitrary handshapes without authentic linguistic documentation.
