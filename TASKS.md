# SignBridge — Task Tracker & Verification Register

**Document Version:** 1.0.0  
**Status:** Active Execution Tracker  
**Product:** SignBridge — Web-Based Real-Time Two-Way Sign Language Assistant  
**Repository:** `sih` (`Warlord-06/teamname-vellosta`)  
**Audit Date:** October 2026  

---

## 1. Status Legend

| Status | Definition |
| :--- | :--- |
| **Verified** | Task is fully completed and verified with reproducible browser, code, or test evidence. |
| **In Progress** | Work is actively underway during the current development iteration. |
| **Blocked** | Progression is impeded by an external blocker or unmet prerequisite. |
| **Not Started** | Defined task planned for execution in a subsequent project stage. |

---

## 2. Phase 0: Documentation & Baseline Audit Tasks (Completed)

| Task ID | Description | Priority | Status | Dependencies | Relevant Files | Acceptance Criteria | Verification Method |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| `DOC-001` | Conduct comprehensive repository inventory and architecture audit. | Critical | **Verified** | None | Entire repository | All entry points, components, hooks, scripts, and assets cataloged. | Direct filesystem & git log inspection. |
| `DOC-002` | Create Product Requirements Document (`PRD.md`). | Critical | **Verified** | `DOC-001` | `PRD.md` | PRD includes vision, scope, 36-gesture vocabulary, NFRs, and status matrix. | Review against repository source code. |
| `DOC-003` | Update `README.md` with accurate scripts, tech stack, and setup guides. | Critical | **Verified** | `DOC-001` | `README.md` | Reflects React 19, Vite 8, MediaPipe, accurate npm scripts, and camera troubleshooting. | Cross-checked with `package.json`. |
| `DOC-004` | Author System Architecture Document (`ARCHITECTURE.md`). | Critical | **Verified** | `DOC-001` | `ARCHITECTURE.md` | Includes accurate Mermaid diagram, data flow sequences, and math formulas. | Diagram matches source implementation. |
| `DOC-005` | Formulate Development Roadmap (`IMPLEMENTATION_PLAN.md`). | High | **Verified** | `DOC-001` | `IMPLEMENTATION_PLAN.md` | Outlines Phase 0 through Stage 5 with concrete objectives, deliverables, and risks. | Multi-stage roadmap documented. |
| `DOC-006` | Establish Master Task Tracker (`TASKS.md`). | High | **Verified** | `DOC-001` | `TASKS.md` | Structured task matrix with ID, Priority, Status, Dependencies, and Verification. | Document review. |
| `DOC-007` | Create Testing Strategy Document (`TESTING.md`). | High | **Verified** | `DOC-001` | `TESTING.md` | Documents current manual tests, lack of automated runner, and future test plans. | Inspection of `package.json` scripts. |
| `DOC-008` | Create Version Change History (`CHANGELOG.md`). | Medium | **Verified** | `DOC-001` | `CHANGELOG.md` | Records initial baseline commit and Phase 0 documentation audit. | Git commit history inspection. |

---

## 3. Stage 1: Camera & Recognition Pipeline Verification Tasks (Immediate Next Step)

| Task ID | Description | Priority | Status | Dependencies | Relevant Files | Acceptance Criteria | Verification Method |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| `CAM-101` | Verify WebRTC camera grant, deny, and error recovery states. | Critical | **In Progress** | `DOC-002` | `src/hooks/useHandLandmarker.js`, `src/components/CameraPanel.jsx` | User denied permission shows actionable recovery instructions; retry button reconnects stream. | Browser test with permission toggle in Chrome/Edge. Error recovery UI verified in headless browser; physical grant awaiting user webcam test. |
| `CAM-102` | Verify camera hardware track release on stop and unmount. | Critical | **Verified** | `CAM-101` | `src/hooks/useHandLandmarker.js` | Webcam physical indicator LED turns off within 500ms of clicking `Stop Camera`. | Verified via code audit & simulated track stop call: `track.stop()`, `srcObject = null`, and `cancelAnimationFrame` executed on stop. |
| `CAM-103` | Measure MediaPipe inference frame rate and GPU/CPU fallback. | High | **Blocked** | `CAM-101` | `src/hooks/useHandLandmarker.js` | Sustained &ge; 20 FPS on WebGL GPU; falls back to CPU without crashing if GPU is disabled. | Blocked awaiting physical webcam test by user. GPU initialization confirmed via CDN bundle. |
| `CAM-104` | Verify 21 3D landmark tracking stability under varied lighting. | High | **Blocked** | `CAM-101` | `src/utils/drawLandmarks.js`, `src/hooks/useHandLandmarker.js` | Hand skeleton maintains continuous tracking across low, medium, and bright lighting. | Blocked awaiting physical webcam test by user. |
| `CAM-105` | Test background tab throttling behavior during live video stream. | Medium | **Not Started** | `CAM-101` | `src/hooks/useHandLandmarker.js` | Animation frame loop resumes cleanly without memory spike when user tabs back into app. | Tab switching stress test. |

---

## 4. Stage 2: Targeted Integration & Reliability Tasks

| Task ID | Description | Priority | Status | Dependencies | Relevant Files | Acceptance Criteria | Verification Method |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| `REL-201` | Set up automated test framework (Vitest + React Testing Library). | High | **Not Started** | `CAM-105` | `package.json`, `vite.config.js`, `vitest.config.js` | `npm test` script runs Vitest and reports test coverage cleanly. | Command-line execution (`npm test`). |
| `REL-202` | Write unit tests for 3D geometric math formulas and helpers. | High | **Not Started** | `REL-201` | `src/classifier/signClassifier.js`, `tests/unit/signClassifier.test.js` | 100% coverage of `dist`, `dist3d`, and `analyzeHandGeometry`. | Vitest test runner. |
| `REL-203` | Write unit tests for phrase lookup and alias matching logic. | Medium | **Not Started** | `REL-201` | `src/data/signPhrases.js`, `tests/unit/signPhrases.test.js` | Correctly resolves exact, ID, alias, and partial substring searches. | Vitest test runner. |
| `REL-204` | Refactor synchronous setState calls in useEffect hooks. | Medium | **Not Started** | `REL-201` | `src/hooks/useSpeechSynthesis.js`, `src/components/SignVideoPlayer.jsx` | Resolves Oxlint warnings regarding React Compiler `set-state-in-effect`. | `npm run lint` with 0 warnings. |
| `REL-205` | Implement local offline asset caching for MediaPipe WASM. | Medium | **Not Started** | `REL-201` | `public/models/`, `src/hooks/useHandLandmarker.js` | App loads model and WASM locally when network is offline. | Browser offline mode test. |

---

## 5. Stage 3: Recognition Quality & Accuracy Improvement Tasks

| Task ID | Description | Priority | Status | Dependencies | Relevant Files | Acceptance Criteria | Verification Method |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| `ML-301` | Construct benchmark test dataset of pre-recorded hand landmark fixtures. | High | **Not Started** | `REL-202` | `tests/fixtures/landmarks.json` | JSON fixtures covering all 36 supported gestures with ground truth labels. | Fixture validation script. |
| `ML-302` | Eliminate rule collisions and prioritize neural pretrained gestures. | Critical | **In Progress** | `DOC-002` | `src/classifier/signClassifier.js` | MediaPipe neural gestures take precedence over heuristics; Rock on cannot hijack I Love You; Help Me requires fist + flat palm. | Static heuristic audit & collision resolution verified; live test pending. |
| `ML-303` | Optimize Temporal Stability Filter parameters. | Medium | **Not Started** | `ML-301` | `src/classifier/signClassifier.js` | Balanced stability (low jitter) vs responsiveness (&le; 1.2s to confirm sign). | Empirical timing test. |
| `ML-304` | Validate Hands-Free Action Gesture reliability. | High | **Not Started** | `ML-302` | `src/App.jsx`, `src/classifier/signClassifier.js` | Point Left triggers backspace only when intentional; accidental trigger rate &lt; 2%. | Manual usability trial. |
| `ML-305` | Benchmark two-handed gesture recognition at extreme angles. | Medium | **Not Started** | `ML-302` | `src/classifier/signClassifier.js` | Two-handed signs (Namaste, Heart, House, Friend) trigger reliably at &plusmn;30° camera angles. | Multi-angle test recording. |

---

## 6. Stage 4: Communication Workflow Completion Tasks

| Task ID | Description | Priority | Status | Dependencies | Relevant Files | Acceptance Criteria | Verification Method |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| `VID-401` | Source and integrate authentic `.mp4` video clips into `public/videos/`. | High | **Not Started** | `ML-305` | `public/videos/*.mp4` | Authentic, linguistically verified video clips for all 36 phrases checked into `public/videos/`. | Video player playback audit. |
| `VID-402` | Verify slow-motion playback (0.5x, 0.75x) across all clips. | Medium | **Not Started** | `VID-401` | `src/components/SignVideoPlayer.jsx` | Audio/video remains in sync during rate change without stuttering. | Browser playback audit. |
| `UI-403` | Implement full keyboard navigation (WCAG 2.1 AA compliance). | Medium | **Not Started** | `VID-401` | `src/components/*.jsx` | All actions accessible via Tab, Enter, Space, and Arrow keys with visible focus rings. | Keyboard-only navigation audit. |
| `UI-404` | Implement conversation transcript export (Save/Copy sentence). | Low | **Not Started** | `VID-401` | `src/components/RecognizedText.jsx` | Button exports text buffer as formatted `.txt` file with timestamp. | File download verification. |
| `LIB-405` | Integrate reference charts & 25-sign catalogue with status filtering. | High | **Verified** | `DOC-002` | `src/data/signReferenceCatalogue.js`, `src/components/GestureCheatSheetModal.jsx`, `public/charts/` | 2 visual charts viewable with zoom lightbox; 25-sign catalogue with Live Supported vs Reference-Only filtering and model mapping. | Tested via build and UI inspection. |

---

## 7. Stage 5: Regression Testing & Release Readiness Tasks

| Task ID | Description | Priority | Status | Dependencies | Relevant Files | Acceptance Criteria | Verification Method |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| `E2E-501` | Set up Playwright for cross-browser end-to-end testing. | High | **Not Started** | `UI-403` | `playwright.config.js`, `tests/e2e/` | Automated E2E test runs across Chrome, Firefox, and WebKit in headless CI. | CI test execution. |
| `E2E-502` | Implement production bundle code-splitting. | Medium | **Not Started** | `E2E-501` | `vite.config.js` | All bundle chunks under 500 kB (eliminating Vite chunk size warning). | `npm run build` inspect size. |
| `REL-503` | Final end-to-end smoke test and release tag `v1.0.0`. | Critical | **Not Started** | `E2E-501` | `package.json`, `CHANGELOG.md` | Tag `v1.0.0` pushed with complete documentation and passing test pipeline. | Git tag & release checklist. |
