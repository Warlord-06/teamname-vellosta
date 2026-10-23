import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ModeTabs from './components/ModeTabs';
import CameraPanel from './components/CameraPanel';
import RecognizedText from './components/RecognizedText';
import QuickDemoSim from './components/QuickDemoSim';
import TextToSignPanel from './components/TextToSignPanel';
import PracticeMode from './components/PracticeMode';
import GestureCheatSheetModal from './components/GestureCheatSheetModal';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import StatusMessage from './components/StatusMessage';
import { useHandLandmarker } from './hooks/useHandLandmarker';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { SIGN_PHRASES } from './data/signPhrases';

export default function App() {
  const [activeMode, setActiveMode] = useState('sign-to-speech');
  const [textBuffer, setTextBuffer] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(true);
  const [actionGesturesEnabled, setActionGesturesEnabled] = useState(true);
  const [actionNotice, setActionNotice] = useState(null);
  const [gestureHistory, setGestureHistory] = useState([]);
  const [preselectedSignForPractice, setPreselectedSignForPractice] = useState(null);

  // Custom Hooks
  const handTracker = useHandLandmarker();
  const tts = useSpeechSynthesis();

  const lastConfirmedTimestampRef = useRef(0);
  const actionTimeoutRef = useRef(null);

  // Automatically handle confirmed signs and hands-free action gestures
  useEffect(() => {
    if (handTracker.confirmedSign && handTracker.confirmedSign.timestamp !== lastConfirmedTimestampRef.current) {
      lastConfirmedTimestampRef.current = handTracker.confirmedSign.timestamp;
      const sign = handTracker.confirmedSign;
      const word = sign.name || sign.phrase;
      const action = sign.action;

      // Handle Hands-Free Action Gestures if enabled
      if (actionGesturesEnabled) {
        if (action === 'backspace' || word === 'Point Left') {
          setTextBuffer(prev => {
            const words = prev.trim().split(/\s+/);
            if (words.length <= 1) return '';
            return words.slice(0, -1).join(' ');
          });
          triggerActionToast("⚡ Backspaced last word (Point Left gesture)");
          return;
        }

        if (action === 'space' || word === 'A little bit') {
          setTextBuffer(prev => prev ? `${prev} ` : '');
          triggerActionToast("⚡ Added space (Small Pinch gesture)");
          return;
        }

        if (action === 'speak' && (word === 'Strong' || word === 'Peace')) {
          if (textBuffer.trim()) {
            tts.speak(textBuffer);
            triggerActionToast("⚡ Speaking aloud (Power / Peace gesture)");
          }
          return;
        }

        if (action === 'clear' && word === 'Stop') {
          setTextBuffer('');
          tts.stop();
          triggerActionToast("⚡ Cleared sentence (Stop gesture)");
          return;
        }
      }

      // Normal sign vocabulary processing
      if (word) {
        setTextBuffer(prev => {
          const trimmed = prev.trim();
          return trimmed ? `${trimmed} ${word}` : word;
        });

        // Add to recent gesture history
        setGestureHistory(prev => [
          ...prev.slice(-7),
          {
            name: word,
            confidence: sign.confidence || 0.9,
            time: Date.now()
          }
        ]);

        if (tts.autoSpeak) {
          tts.speak(word);
        }
      }
    }
  }, [handTracker.confirmedSign, actionGesturesEnabled, textBuffer, tts]);

  const triggerActionToast = (msg) => {
    setActionNotice(msg);
    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
    actionTimeoutRef.current = setTimeout(() => {
      setActionNotice(null);
    }, 2800);
  };

  // Handle manual clear
  const handleClearText = () => {
    setTextBuffer('');
    tts.stop();
  };

  // Handle manual speak
  const handleSpeakText = (customText) => {
    const textToSpeak = customText || textBuffer;
    if (textToSpeak.trim()) {
      tts.speak(textToSpeak);
    }
  };

  // Handle Demo Mode Simulation
  const handleSimulateSign = (signName, confidence = 0.95, category = "General") => {
    handTracker.simulateSign(signName, confidence, category);
  };

  // Jump to practice from Cheat Sheet
  const handleSelectSignToPractice = (sign) => {
    setPreselectedSignForPractice(sign);
    setActiveMode('practice');
  };

  return (
    <div className="app-shell">
      {/* Top Banner / Announcement */}
      <div className="announcement-bar">
        <span>🚀 <strong>SignBridge:</strong> Real-Time Two-Way Sign Language Assistant | 35+ Gestures &amp; Action Controls | 100% On-Device AI</span>
      </div>

      {/* Main Header */}
      <Header onOpenInfo={() => setIsInfoModalOpen(true)} />

      {/* Main Application Container */}
      <main className="main-container">
        {/* Mode Selector Tabs (3 Modes) */}
        <ModeTabs 
          activeMode={activeMode} 
          onSelectMode={setActiveMode} 
          vocabularyCount={SIGN_PHRASES.length} 
        />

        {/* Global Notices if Model Error */}
        {handTracker.modelError && (
          <StatusMessage
            type="warning"
            title="AI Engine Notice"
            message={handTracker.modelError}
          />
        )}

        {/* MODE A: Sign to Speech */}
        {activeMode === 'sign-to-speech' && (
          <div className="mode-panel mode-sign-to-speech animate-fade-in" id="panel-sign-to-speech" role="tabpanel">
            <div className="sign-to-speech-grid">
              {/* Left Column: Live Camera, Anatomy HUD & Action Overlays */}
              <div className="grid-col-camera">
                <CameraPanel
                  videoRef={handTracker.videoRef}
                  canvasRef={handTracker.canvasRef}
                  isCameraActive={handTracker.isCameraActive}
                  isModelLoading={handTracker.isModelLoading}
                  cameraError={handTracker.cameraError}
                  permissionDenied={handTracker.permissionDenied}
                  status={handTracker.status}
                  handDetected={handTracker.handDetected}
                  handCount={handTracker.handCount}
                  handGeometry={handTracker.handGeometry}
                  fps={handTracker.fps}
                  isMirrored={handTracker.isMirrored}
                  setIsMirrored={handTracker.setIsMirrored}
                  showLandmarks={handTracker.showLandmarks}
                  setShowLandmarks={handTracker.setShowLandmarks}
                  onStartCamera={handTracker.startCamera}
                  onStopCamera={handTracker.stopCamera}
                  activeSign={handTracker.activeSign}
                  actionNotice={actionNotice}
                  onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
                />
              </div>

              {/* Right Column: Recognized Text & Speech Synthesis */}
              <div className="grid-col-speech">
                <RecognizedText
                  activeSign={handTracker.activeSign}
                  textBuffer={textBuffer}
                  setTextBuffer={setTextBuffer}
                  onClear={handleClearText}
                  onSpeak={handleSpeakText}
                  isSpeaking={tts.isSpeaking}
                  ttsConfig={tts}
                  actionGesturesEnabled={actionGesturesEnabled}
                  setActionGesturesEnabled={setActionGesturesEnabled}
                  gestureHistory={gestureHistory}
                />
              </div>
            </div>

            {/* Quick Demo Simulator Section */}
            <div className="demo-sim-wrapper">
              <QuickDemoSim
                onSimulateSign={handleSimulateSign}
                isDemoActive={isDemoActive}
                onToggleDemo={() => setIsDemoActive(!isDemoActive)}
              />
            </div>
          </div>
        )}

        {/* MODE B: Text to Sign */}
        {activeMode === 'text-to-sign' && (
          <div className="mode-panel mode-text-to-sign animate-fade-in" id="panel-text-to-sign" role="tabpanel">
            <TextToSignPanel onOpenReferenceCharts={() => setIsCheatSheetOpen(true)} />
          </div>
        )}

        {/* MODE C: Gesture Trainer & Quiz */}
        {activeMode === 'practice' && (
          <div className="mode-panel mode-practice animate-fade-in" id="panel-practice" role="tabpanel">
            <PracticeMode
              videoRef={handTracker.videoRef}
              canvasRef={handTracker.canvasRef}
              isCameraActive={handTracker.isCameraActive}
              startCamera={handTracker.startCamera}
              stopCamera={handTracker.stopCamera}
              isModelLoading={handTracker.isModelLoading}
              isMirrored={handTracker.isMirrored}
              activeSign={handTracker.activeSign}
              handGeometry={handTracker.handGeometry}
              simulateSign={handleSimulateSign}
              tts={tts}
              onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
              preselectedSign={preselectedSignForPractice}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenInfo={() => setIsInfoModalOpen(true)} />

      {/* Educational & Vocabulary Modal */}
      <AboutModal 
        isOpen={isInfoModalOpen} 
        onClose={() => setIsInfoModalOpen(false)} 
      />

      {/* Full 35+ Gesture Guide & Cheat Sheet Drawer */}
      <GestureCheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        onSelectSignToPractice={handleSelectSignToPractice}
      />
    </div>
  );
}
