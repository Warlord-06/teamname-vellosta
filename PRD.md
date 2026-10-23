# SignBridge — Product Requirements Document (PRD)

**Document Version:** 1.0.0  
**Status:** Baseline Documentation  
**Product:** SignBridge — Web-Based Real-Time Two-Way Sign Language Assistant  
**Repository:** `sih` (`Warlord-06/teamname-vellosta`)  
**Audit Date:** October 2026  

---

## 1. Executive Summary & Problem Statement

### 1.1 Problem Statement
More than 70 million Deaf and Hard-of-Hearing individuals globally use sign language as their primary means of communication. However, over 95% of hearing individuals do not understand sign language. Traditional communication workarounds—such as pen-and-paper writing, typing on phone screens, or hiring licensed human interpreters—are either cumbersome, slow, or prohibitively expensive for everyday spontaneous interactions (such as retail checkouts, public transit, hospital intake desks, and educational environments).

Furthermore, existing software solutions frequently suffer from:
1. **High Latency & Cloud Dependence:** Streaming live video frames to cloud servers introduces round-trip network delays and high operational bandwidth costs.
2. **Privacy Violations:** Deaf users are rightfully hesitant to stream unencrypted video of their homes, faces, and bodily gestures to third-party cloud servers.
3. **One-Way Asymmetry:** Many tools only attempt sign recognition (signer-to-hearing) while providing no reciprocal mechanism for the hearing conversation partner to respond in sign language (hearing-to-signer).

### 1.2 Product Vision
**SignBridge** bridges the gap between Deaf signers and hearing conversation partners via a lightweight, client-side web application. Operating with **100% on-device privacy** and **zero API key requirements**, SignBridge provides a two-way communication loop:
- **Signer &rarr; Listener:** Real-time webcam joint tracking, geometric handshape classification, sentence construction, and synthesized speech output.
- **Listener &rarr; Signer:** Punctuation-tolerant text/phrase search and verified step-by-step sign language motion breakdowns.
- **Interactive Practice:** A gamified trainer verifying user handshapes against live 3D joint telemetry.

---

## 2. Target Users & Persona Profiles

| User Persona | Context / Setting | Primary Needs | Critical Constraints |
| :--- | :--- | :--- | :--- |
| **Primary Signer** (Deaf / Hard-of-Hearing) | Daily errands, public counters, clinic visits, university campus | Quick, expressive recognition of foundational daily signs without typing; hands-free sentence editing. | Requires zero camera feed recording or cloud upload; cannot tolerate frame freezing or false trigger noise. |
| **Hearing Partner** (Retail clerk, doctor, peer, student) | Front desk, counter, classroom | Ability to type a response and clearly display the verified sign gesture back to the Deaf partner. | Does not know sign language; needs step-by-step motion breakdowns and speed control. |
| **Sign Learner / Student** | Self-paced study, hackathon demo | Gamified challenge to practice handshapes with immediate AI feedback on correctness. | Requires clear visual instructions and instant confidence/accuracy indicators. |

---

## 3. Supported Sign Language Systems & Vocabulary

> [!IMPORTANT]
> **Linguistic Authenticity & System Distinction:**
> Sign languages are independent, natural languages with unique grammars, spatial conventions, and vocabularies. American Sign Language (ASL) and Indian Sign Language (ISL) are **not mutually intelligible** and possess distinct fingerspelling and syntactic systems. SignBridge primarily targets ASL handshapes while explicitly documenting universal and ISL-specific gestures (such as *Namaste*).

### 3.1 Vocabulary Inventory (36 Configured Phrases)

The codebase defines 36 phrases across 8 categories in [`src/data/signPhrases.js`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/data/signPhrases.js):

| Category | Count | Signs & Phrases | Linguistic Standard |
| :--- | :---: | :--- | :--- |
| **Greetings** | 3 | Hello, Namaste, Later | ASL (Hello, Later), Universal/ISL (Namaste) |
| **Courtesy** | 4 | Thank you, Please, Sorry, Good | ASL |
| **Emergency & Assistance** | 3 | Help me, Bathroom, Stop | ASL |
| **Conversation** | 5 | How are you?, Friend, Call me, You, Point Left | ASL / Universal Deixis |
| **Daily Needs** | 6 | I need water, I want food, House, Time, A little bit, More | ASL / Universal |
| **Responses** | 5 | Yes, No, Okay, All done, Bad | ASL |
| **Expressions & Culture** | 6 | I love you, Heart, Peace, Rock on, Good luck, Applause, Strong | ASL / Universal Emblems / Deaf Culture |
| **Numbers & Counting** | 4 | Number 1, Peace (2), Number 3, Number 4 | ASL Cardinal Numbers |

---

## 4. Feature Implementation & Verification Status

Requirements and features are classified into five explicit statuses:
- **Verified:** Tested in the browser and confirmed operating against real or mock input.
- **Implemented (Needs Validation):** Implemented in source code; awaiting formal test suite execution or physical hardware validation.
- **Partially Implemented:** Functional components exist, but related assets, dependencies, or workflows are incomplete.
- **Planned:** Documented architectural goals or extensions not yet written in code.
- **Unverified:** Code exists but behavior under edge cases or missing hardware is unproven.

### 4.1 Feature Status Matrix

| ID | Feature Name | Description | Status | Verification Evidence / Reference |
| :--- | :--- | :--- | :--- | :--- |
| **FR-01** | **Camera Permission & Stream Lifecycle** | Explicit user activation (`Start Camera`), WebRTC stream handling, mirrored preview, permission denial handling. | **Verified** | [`useHandLandmarker.js:227-276`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/hooks/useHandLandmarker.js#L227-L276), [`CameraPanel.jsx:112-157`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/CameraPanel.jsx#L112-L157) |
| **FR-02** | **MediaPipe Joint Landmark Tracking** | Local WebAssembly inference extracting 21 3D joint landmarks for up to 2 hands simultaneously. | **Verified** | [`useHandLandmarker.js:64-74`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/hooks/useHandLandmarker.js#L64-L74), GPU/CPU fallback mechanism confirmed. |
| **FR-03** | **Canvas Landmark Skeleton Drawing** | Real-time HTML5 canvas rendering glowing bones and color-coded anatomical finger groups. | **Verified** | [`drawLandmarks.js:44-140`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/utils/drawLandmarks.js#L44-L140) |
| **FR-04** | **Hybrid Geometric & Pretrained Classifier** | Combines MediaPipe pre-trained classes (`Open_Palm`, `Thumb_Up`, `Thumb_Down`, `Victory`, `ILoveYou`) with 31+ deterministic geometric rules. | **Implemented (Needs Validation)** | [`signClassifier.js:104-384`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/classifier/signClassifier.js#L104-L384); physical signer accuracy testing required. |
| **FR-05** | **Temporal Stability Filtering** | Multi-frame sliding buffer (4 votes out of 7 consecutive frames with 1300ms cooldown) to debounce single-frame noise. | **Verified** | [`signClassifier.js:435-465`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/classifier/signClassifier.js#L435-L465) |
| **FR-06** | **Two-Handed Sign Recognition** | Spatial proximity and inter-hand distance vectors for signs like Namaste, Heart, House, Friend, Time, Applause, and More. | **Implemented (Needs Validation)** | [`signClassifier.js:125-215`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/classifier/signClassifier.js#L125-L215); dual-hand camera testing required. |
| **FR-07** | **Hands-Free Action Gestures** | Gesture shortcuts for editing: Point Left (Backspace), Pinch (Space), Strong Fist (Speak), Stop (Clear). | **Verified** | [`App.jsx:35-65`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/App.jsx#L35-L65); tested in browser environment. |
| **FR-08** | **Live Hand Anatomy HUD** | Visual telemetry panel showing real-time extension, curl, and pinch states for each individual finger. | **Verified** | [`CameraPanel.jsx:194-255`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/CameraPanel.jsx#L194-L255) |
| **FR-09** | **Text Buffer & Editing Toolbar** | Live editable textarea with word insertion, manual typing, space insertion, clipboard copy, and clear. | **Verified** | [`RecognizedText.jsx:154-242`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/RecognizedText.jsx#L154-L242) |
| **FR-10** | **Speech Synthesis (TTS)** | Native browser SpeechSynthesis integration with voice picker, speed rate (0.7x–1.3x), and auto-speak toggle. | **Verified** | [`useSpeechSynthesis.js:47-88`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/hooks/useSpeechSynthesis.js#L47-L88) |
| **FR-11** | **Evaluation Gesture Simulator** | Category-filtered chips allowing mock sign injection for testing text, audio, and action pipelines without camera. | **Verified** | [`QuickDemoSim.jsx:18-85`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/QuickDemoSim.jsx#L18-L85) |
| **FR-12** | **Text-to-Sign Phrase Search** | Case-insensitive, punctuation-tolerant search with alias expansion resolving user input to verified phrase guides. | **Verified** | [`TextToSignPanel.jsx:15-45`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/TextToSignPanel.jsx#L15-L45), [`signPhrases.js:338-364`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/data/signPhrases.js#L338-L364) |
| **FR-13** | **Sign Video Player & Speed Control** | Video playback component with play/pause, seek, replay (`↺`), loop, and 0.5x–1.25x speed toggles. | **Partially Implemented** | Player component is functional; `.mp4` video files are missing from `public/videos/`. Graceful fallback notice active. |
| **FR-14** | **Linguistic Step Breakdown** | Step-by-step text breakdown (Starting handshape, Location/Contact, Motion arc, Cultural notes) for all signs. | **Verified** | Rendered in [`SignVideoPlayer.jsx`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/SignVideoPlayer.jsx) and [`GestureCheatSheetModal.jsx`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/GestureCheatSheetModal.jsx). |
| **FR-15** | **Interactive Gesture Trainer & Quiz** | Gamified practice decks with live matching hold timer (1s), streak tracking, XP points, and audio praise. | **Verified** | [`PracticeMode.jsx:55-145`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/PracticeMode.jsx#L55-L145) |
| **FR-16** | **Gesture Guide & Cheat Sheet** | Searchable modal directory of all 36 signs with handshape descriptions and 1-hand vs 2-hand badges. | **Verified** | [`GestureCheatSheetModal.jsx`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/GestureCheatSheetModal.jsx) |
| **FR-17** | **Custom TensorFlow.js Model Hook** | Planned hook to connect trained neural network embeddings (e.g. WLASL models). | **Planned** | Stub function exists in [`signClassifier.js`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/classifier/signClassifier.js); currently unmounted. |
| **FR-18** | **Hand Sign Reference Charts & Expanded Catalogue** | Interactive library displaying 2 user-provided reference charts with zoom lightbox, plus a 25-sign structured catalogue distinguishing Live Supported vs Reference-Only candidate signs. | **Verified** | [`signReferenceCatalogue.js`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/data/signReferenceCatalogue.js), [`GestureCheatSheetModal.jsx`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/GestureCheatSheetModal.jsx), [`public/charts/`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/public/charts/) |

---

## 5. Non-Functional Requirements (NFRs)

### 5.1 Privacy & Security
- **NFR-P1 (Zero Server Video Streaming):** Under no circumstance shall camera image buffers, video frames, or audio streams be transmitted over any network socket or HTTP request. All inference must execute within the browser runtime.
- **NFR-P2 (Explicit Camera Consent):** The webcam shall never activate automatically upon page load. Activation strictly requires direct user interaction with the `Start Camera` button.
- **NFR-P3 (No Third-Party Analytics / Telemetry):** The client application contains no tracking scripts, telemetry beans, or external user tracking.

### 5.2 Performance & Responsiveness
- **NFR-T1 (Target Inference Frame Rate):** The MediaPipe detection loop shall sustain &ge; 20 FPS on modern desktop browsers (Chrome, Edge) with WebGL GPU acceleration.
- **NFR-T2 (Classification Latency):** Geometric hand pose analysis per frame shall complete in &le; 8 milliseconds on standard CPU hardware.
- **NFR-T3 (Debounce Cooldown):** Emitted words must enforce a minimum stability window (4/7 frames) and a cooldown (&ge; 1300ms) to eliminate accidental stutter and duplicate speech output.

### 5.3 Accessibility & Usability
- **NFR-A1 (High-Contrast Visual Indicators):** High-contrast HUD badges, status pills, and bounding boxes must be legible across diverse webcam lighting conditions.
- **NFR-A2 (Keyboard Accessibility):** Interactive buttons, sliders, tabs, and modals must provide standard keyboard focus indicators and ARIA roles.
- **NFR-A3 (Speech Customization):** Users must be able to adjust speech synthesis rate, pitch, and voice profile, or mute auto-speak entirely.

### 5.4 Compatibility & Deployment
- **NFR-C1 (Browser Support):** Modern evergreen browsers with WebAssembly, WebGL, WebRTC, and Web Speech API support (Google Chrome 110+, Microsoft Edge 110+, Mozilla Firefox 115+, Brave).
- **NFR-C2 (Zero Native Dependencies):** Pure Node.js / Vite build output (`dist/`) deployable to any static host (Vercel, Netlify, GitHub Pages) without specialized server runtimes.

---

## 6. Assumptions, Scope Boundaries & Out-of-Scope Items

### 6.1 Assumptions
1. The user operates a device equipped with a functional web camera supporting at least 720p at 24 FPS.
2. The user has an active internet connection on initial page load to fetch the MediaPipe Vision WebAssembly binary (`.wasm`) and the `.task` model asset from Google's CDN.
3. Ambient lighting is sufficient for hand boundary contrast against the background.

### 6.2 Scope Boundaries & Explicit Non-Goals
- **Non-Goal 1: Continuous Fluent Sign Language Translation:** SignBridge is an isolated sign and phrase recognition system. It does not parse continuous, rapid-fire sentence syntax, facial grammatical markers (e.g., grammatical eyebrow furrowing), or spatial indexing of arbitrary sign language discourse.
- **Non-Goal 2: Voice-to-Sign Speech Recognition (STT):** Mode B relies on typed text input. Real-time microphone audio transcription (speech-to-sign) is out of current scope.
- **Non-Goal 3: Custom Cloud Backend / User Accounts:** SignBridge operates without databases, authentication tokens, user accounts, or cloud persistence.

---

## 7. Known Risks & Technical Limitations

1. **Missing Video Files (`public/videos/*.mp4`):** Authentic video recordings for the 36 phrases have not yet been checked into the repository. Mode B displays an educational fallback guide instead of video playback.
2. **External Model CDN Dependency:** The MediaPipe WASM binary and model asset (`gesture_recognizer.task`) are fetched from `cdn.jsdelivr.net` and `storage.googleapis.com`. If the client is completely offline without cached assets, initialization fails.
3. **Lighting and Skin Tone Variance:** MediaPipe 21-landmark tracking accuracy degrades under low-light conditions, heavy motion blur, or severe backlighting.
4. **Heuristic Collision:** While 3D geometric heuristics are tuned for mutual exclusivity, extreme camera angles or partial hand occlusion may cause ambiguous detections.

---

## 8. Acceptance Criteria

| Feature Area | Criteria |
| :--- | :--- |
| **Camera Lifecycle** | Camera activates only upon explicit click; releases hardware indicator light upon clicking `Stop Camera` or navigating away. |
| **Landmark Detection** | Canvas overlays exactly 21 connected joints with color-coded finger groups when hand enters frame. |
| **Sign Classification** | Supported handshapes achieve stable confirmation when held steady for ~1 second without false triggers from passing motion. |
| **Action Gestures** | Point Left reliably removes the trailing word; Pinch appends space; Strong Fist triggers audio playback. |
| **Audio Speech** | Confirmed words speak aloud via Web Speech API when Auto-Speak is enabled. |
| **Phrase Lookup** | Typing common aliases (e.g. `"water"`, `"hungry"`, `"ok"`) accurately retrieves the corresponding phrase guide. |
| **Interactive Trainer** | Holding the target gesture for 1 second increments score by 25 XP, updates streak, and triggers audio celebration. |
