# Changelog

All notable changes to the **SignBridge** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.3-charts-catalogue] - 2026-10-23

### Hand Sign Reference Charts Integration & Structured Catalogue

This milestone integrates the two user-provided hand sign reference charts into the application, introduces an expanded 25-sign structured catalogue, and enforces safety boundaries between live recognized signs and reference-only candidate gestures.

### Added
- **Reference Chart Assets**: Copied and preserved both user-supplied charts to `public/charts/`:
  - `hand-signs-reference-chart-1.jpg`: 20 line-drawn cultural, everyday conversational, and informal hand gestures.
  - `common-hand-signs-meanings-chart-2.jpg`: 10 color illustrated cross-cultural and ASL gestures with meanings.
- **Structured Sign Catalogue Data Module** ([`src/data/signReferenceCatalogue.js`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/data/signReferenceCatalogue.js)):
  - Deduplicated master inventory of 25 distinct signs extracted from Chart 1 and Chart 2.
  - Strict classification into **Live AI Supported (15 Signs)** vs **Reference-Only (10 Signs)**.
  - Complete model mapping metadata (`mediapipe-neural` class indices vs `ai-geometric` rule IDs).
  - Cultural, linguistic, and historical context notes for every entry.
- **Hand Sign Library UI** ([`src/components/GestureCheatSheetModal.jsx`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/GestureCheatSheetModal.jsx)):
  - Tabbed interface switching between 36 verified core signs and the new Reference Charts & Catalogue.
  - Visual charts showcase with responsive thumbnail frames, attribution notices, and a high-resolution zoom lightbox modal.
  - Searchable catalogue with status filter pills (`All`, `Live AI Supported`, `Reference-Only`).
  - Action buttons to practice supported signs in the interactive Trainer or return to live camera streaming.
- **Cross-Component Navigation**: Added "Reference Charts" action button to [`src/components/TextToSignPanel.jsx`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/components/TextToSignPanel.jsx) and wired to modal state in [`src/App.jsx`](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/src/App.jsx).

### Architectural Safety Enforced
- **Zero Fabricated Recognition**: Reference-only gestures (e.g. *Vulcan Salute*, *Pinched Fingers*, *Come Here*, *Finger Gun*, *Check Please*) are explicitly displayed with amber reference badges and cannot generate false or simulated predictions.
- **Model Integrity Preserved**: Existing MediaPipe model (`gesture_recognizer.task`) and weights remain completely untouched.

---

## [0.1.2-accuracy-audit] - 2026-10-23

### Recognition Accuracy Audit & Rule Collision Resolution

This milestone resolves core geometric collisions and inverts priority ordering to favor MediaPipe's deep-learning pretrained neural recognizer over fallible heuristics.

### Diagnosed & Fixed
- **Pretrained Neural Priority Inversion**: Placed MediaPipe's deep-learning gesture checks (`ILoveYou`, `Victory`, `Thumb_Up`, `Thumb_Down`, `Pointing_Up`, `Open_Palm`) at the top of Section B with confidence $\ge 0.65$. High-confidence neural inferences now evaluate before lower-priority heuristic approximations.
- **Omitted Pointing_Up Class**: Connected MediaPipe's pre-trained `Pointing_Up` class directly to "Number 1", eliminating false-positive fall-throughs into "You" caused by natural finger tilt.
- **"I Love You" Hijacking by "Rock On"**: Corrected `isRockOn` to strictly require `!isThumbExtended`. Previously, thumb-to-middle proximity allowed extended thumbs to trigger "Rock On", intercepting "I Love You".
- **Two-Handed "Help Me" False Positives**: Added handshape verification (`hasFist && hasBasePalm`) to Two-Handed Rule 8 ("Help me"). Previously, any two hands within proximity triggered "Help me" regardless of hand pose.
- **Open Palm "Hello" vs "Stop" Buffer Erasure**: Relaxed "Hello" head-height threshold from $y < 0.38$ to $y < 0.52$. Open palm greetings in natural camera view now recognize as "Hello" instead of falling into "Stop" and accidentally wiping the sentence buffer.

### Preserved
- No models replaced, switched, or retrained.
- Preserved existing `@mediapipe/tasks-vision` baseline model (`gesture_recognizer.task`).
- Retained all 36 gesture library entries, UI components, and camera streaming logic.

---

## [0.1.1-stage1-audit] - 2026-10-23

### Stage 1: Camera & Recognition Pipeline Verification Audit

This milestone completes the static and live runtime audit of the camera-to-prediction pipeline in the development environment.

### Verified
- **MediaPipe CDN Asset Delivery**: Confirmed `vision_wasm_internal.wasm` (8.8 MB) and `gesture_recognizer.task` (9.5 MB) successfully load over CDN with HTTP 200.
- **Model Engine Initialization**: Confirmed `FilesetResolver.forVisionTasks` and `GestureRecognizer.createFromOptions` complete successfully; status transitions to `"AI engine ready. Click 'Start Camera' to begin."`.
- **UI State Machine & Error Recovery**: Confirmed that `getUserMedia` rejection/device absence triggers the error state cleanly, displays the "Camera Device Unavailable" card with recovery guidance, and enables the retry action button.
- **Resource Cleanup Sequence**: Verified that `stopCamera` cancels `requestAnimationFrame`, halts all active media stream tracks (`track.stop()`), resets canvas drawing context, and resets `TemporalStabilityFilter`.
- **Live Hand Anatomy HUD**: Verified component readiness to inspect 21 3D landmarks, curl ratios, and individual finger extension states.

### Identified Defects & Proposed Minimal Fixes
- **Timestamp Monotonicity**: Identified potential MediaPipe `recognizeForVideo` collision when animation frames fire < 1ms apart (`Math.round(now)`). Proposed enforcing monotonic increment: `Math.max((lastTimestampMsRef.current || 0) + 1, Math.round(now))`.
- **Hidden Video Element during Mount**: Identified that setting `srcObject` while `<video>` has `display: none !important` (`.hidden`) can delay `onloadedmetadata` on Chromium/WebKit. Proposed making video active immediately upon acquiring media stream.

### Blocked
- **Hardware Webcam Live Recognition**: Live landmark detection and 3D gesture evaluation are blocked awaiting physical user webcam testing, as automated browser environments lack attached video hardware.

---

## [0.1.0-docs] - 2026-10-23

### Phase 0: Documentation Completion & Architectural Consistency Audit

This release is a **documentation-only baseline update**. In strict compliance with the Phase 0 audit constraints, **no application source code, UI components, runtime configurations, build scripts, or dependencies were modified**.

### Added
- **[PRD.md](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/PRD.md)**: Product Requirements Document detailing:
  - Product vision, problem statement, target audiences, and dual-mode core workflows.
  - Complete 36-gesture inventory across 8 functional categories with exact recognition mechanisms (5 MediaPipe neural gestures, 31 heuristic geometric signs).
  - Explicit distinction between American Sign Language (ASL) and Indian Sign Language (ISL), documenting hybrid vocabulary status.
  - Functional requirements (FR-1 through FR-8) and Non-Functional Requirements (NFR-1 through NFR-5: Accessibility, Performance, Privacy, Reliability, Compatibility).
  - Current implementation status matrix (Implemented, Verified, Partially Implemented, Planned, Unverified).
  - Explicit scope boundaries, operational assumptions, and milestone acceptance criteria.
- **[ARCHITECTURE.md](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/ARCHITECTURE.md)**: Comprehensive system architecture specification detailing:
  - Actual repository structure and file-by-file component responsibilities.
  - Component boundary diagram (React UI, MediaPipe Vision Task, Heuristic Classification Engine, Browser Platform APIs).
  - Camera-to-prediction end-to-end dataflow sequence and 3D Euclidean landmark vector mathematics.
  - Two-handed interaction vector analysis (wrist proximity, mirror symmetry, relative hand coordinates).
  - Prediction stabilization pipeline (250ms debounce window, confidence gating, streak confirmation).
  - Component state lifecycle and resource cleanup matrices.
  - External CDN dependency inventory (`cdn.jsdelivr.net`, `storage.googleapis.com`).
- **[IMPLEMENTATION_PLAN.md](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/IMPLEMENTATION_PLAN.md)**: Structured 6-stage engineering roadmap:
  - Phase 0: Documentation and Integration Audit (Status: Complete).
  - Stage 1: Camera & Recognition Pipeline Verification (Status: Not Started — Gate to next step).
  - Stage 2: Targeted Integration & Reliability Fixes (Status: Not Started).
  - Stage 3: Recognition Quality Evaluation & Heuristic Refinement (Status: Not Started).
  - Stage 4: Communication Workflow & Media Asset Completion (Status: Not Started).
  - Stage 5: Regression Testing & Release Readiness (Status: Not Started).
- **[TASKS.md](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/TASKS.md)**: Practical engineering task tracker featuring:
  - 28 granular tasks indexed across all project phases (TASK-DOC-01 to TASK-DOC-07, TASK-S1-01 to TASK-S1-04, etc.).
  - Explicit priority ratings (P0 Blocker, P1 High, P2 Medium, P3 Low).
  - Real status indicators (`Verified`, `Not Started`, `Blocked`).
  - Strict separation between verified codebase facts and unverified runtime assumptions.
  - Module ownership, dependency chains, concrete acceptance criteria, and specific verification methods.
- **[TESTING.md](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/TESTING.md)**: Exhaustive testing strategy and verification protocols:
  - Transparent documentation of current 0% automated test coverage (no test runner script configured).
  - Standardized manual smoke test protocols (Protocols A through G: Camera lifecycle, HandLandmarker initialization, Recognition accuracy, Speech synthesis, Speech recognition, Video playback fallback, Simulation mode).
  - Proposed automated testing roadmap using Vitest for mathematical unit tests and Playwright for synthetic canvas E2E tests.
  - Empirical accuracy evaluation methodology for 36 supported signs across environmental test matrices (lighting, camera resolution, skin tone contrast, background noise).
- **[CHANGELOG.md](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/CHANGELOG.md)**: Change history document tracking version baselines and audit milestones.

### Changed
- **[README.md](file:///c:/Users/MANISH%20KUMAR/OneDrive/Desktop/SIH/README.md)**: Completely audited and revised:
  - Verified technology stack (React 19.1.0, Vite 8.0.0, Lucide React 1.16.0, Canvas Confetti 1.9.4, Oxlint 1.45.0).
  - Verified npm scripts from `package.json` (`npm run dev`, `npm run build`, `npm run lint`, `npm run preview`).
  - Documented explicit absence of `npm test` script.
  - Added accurate 36-gesture inventory with category breakdown.
  - Documented missing local video asset limitation in `public/videos/`.
  - Added camera permission troubleshooting guide across Chrome, Edge, Brave, and Firefox.
  - Documented external CDN network dependency requirements for MediaPipe WASM and model assets.

### Discovered Limitations & Architectural Gaps Documented
- **Missing Prior Audit Report**: Recorded that no prior integration audit report file existed in the repository; audit was performed directly against active source code.
- **Zero Automated Tests**: Documented that the repository lacks any automated testing harness or CI test runner.
- **Missing Demonstration Videos**: Confirmed that `public/videos/` contains only `README.md` and no recorded `.mp4` video files, causing Text-to-Sign mode to rely on the static illustrated SVG fallback.
- **Unused Custom ML Classifier**: Identified that `runCustomMLClassifier` in `src/classifier/signClassifier.js` is a placeholder returning a static score rather than executing a trained model.
- **Offline Limitation**: Confirmed that `@mediapipe/tasks-vision` loads WASM binaries and model tasks from Google/jsDelivr CDNs dynamically at runtime, preventing fully offline initial loads without bundle localization.

---

## [0.0.0] - 2026-10-23 (Repository Baseline)

### Added
- Initial project scaffolding using Vite, React 19, and ECMAScript modules (`package.json`, `vite.config.js`).
- Linting configuration with Oxlint (`.oxlintrc.json`).
- Hand landmark extraction hook (`src/hooks/useHandLandmarker.js`) wrapping `@mediapipe/tasks-vision` `FilesetResolver` and `HandLandmarker`.
- Gesture classification engine (`src/classifier/signClassifier.js`) providing:
  - 5 MediaPipe neural recognizer gestures (`Open_Palm`, `Thumb_Up`, `Thumb_Down`, `Victory`, `ILoveYou`).
  - 31 geometric heuristic signs utilizing 3D landmark angle, finger extension, and two-handed spatial coordinates.
- Core UI components:
  - `CameraPanel.jsx`: Webcam streaming, canvas landmark overlay, mirror flip toggle, resolution selection, confidence gating, and recognition history buffer.
  - `TextToSignPanel.jsx`: Text and speech input to sign language translation, phrase dictionary picker, and sign visualizer.
  - `SignVideoPlayer.jsx`: Video playback player with fallback placeholder for missing media assets.
  - `QuickDemoSim.jsx`: Automated simulation mode cycling through demonstration phrases without requiring camera hardware.
  - `PracticeMode.jsx`: Interactive gesture training mode with real-time feedback, accuracy scoring, and celebratory confetti effects.
  - `GestureCheatSheetModal.jsx`: Modal popup providing visual guides and descriptions for all 36 gestures.
  - `AboutModal.jsx`: Project overview modal detailing dual-mode operation and accessibility mission.
  - `Header.jsx` & `Footer.jsx`: Top navigation with mode switching tabs and footer status displays.
- Speech service integration:
  - Text-to-speech voice synthesis via `window.speechSynthesis`.
  - Speech-to-text voice recognition via `window.SpeechRecognition` / `webkitSpeechRecognition`.
- Gesture dictionary (`src/data/signPhrases.js`) containing 36 defined gestures, categories, descriptive execution hints, and search tags.
- Commit history baseline:
  - `d28bf6d`: *feat: build SignBridge MVP - real-time two-way sign language assistant*
  - `8d88bab`: *chore: enhance .gitignore to exclude env files and certificates*
