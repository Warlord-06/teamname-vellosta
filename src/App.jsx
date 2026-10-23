import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ModeTabs from './components/ModeTabs';
import CameraPanel from './components/CameraPanel';
import RecognizedText from './components/RecognizedText';
import QuickDemoSim from './components/QuickDemoSim';
import TextToSignPanel from './components/TextToSignPanel';
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
  const [isDemoActive, setIsDemoActive] = useState(true);

  // Custom Hooks
  const handTracker = useHandLandmarker();
  const tts = useSpeechSynthesis();

  const lastConfirmedTimestampRef = useRef(0);

  // Automatically update textBuffer and handle autoSpeak when a stable sign is confirmed
  useEffect(() => {
    if (handTracker.confirmedSign && handTracker.confirmedSign.timestamp !== lastConfirmedTimestampRef.current) {
      lastConfirmedTimestampRef.current = handTracker.confirmedSign.timestamp;
      const word = handTracker.confirmedSign.name || handTracker.confirmedSign.phrase;

      if (word) {
        setTextBuffer(prev => {
          const trimmed = prev.trim();
          return trimmed ? `${trimmed} ${word}` : word;
        });

        if (tts.autoSpeak) {
          tts.speak(word);
        }
      }
    }
  }, [handTracker.confirmedSign, tts]);

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
  const handleSimulateSign = (signName, confidence = 0.95) => {
    handTracker.simulateSign(signName, confidence);
  };

  return (
    <div className="app-shell">
      {/* Top Banner / Announcement */}
      <div className="announcement-bar">
        <span>🚀 <strong>SignBridge MVP:</strong> Real-Time Two-Way Sign Language Assistant | 100% On-Device Processing</span>
      </div>

      {/* Main Header */}
      <Header onOpenInfo={() => setIsInfoModalOpen(true)} />

      {/* Main Application Container */}
      <main className="main-container">
        {/* Mode Selector Tabs */}
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
              {/* Left Column: Live Camera & Landmark Overlay */}
              <div className="grid-col-camera">
                <CameraPanel
                  videoRef={handTracker.videoRef}
                  canvasRef={handTracker.canvasRef}
                  isCameraActive={handTracker.isCameraActive}
                  isModelLoading={handTracker.isModelLoading}
                  modelError={handTracker.modelError}
                  cameraError={handTracker.cameraError}
                  permissionDenied={handTracker.permissionDenied}
                  status={handTracker.status}
                  handDetected={handTracker.handDetected}
                  fps={handTracker.fps}
                  isMirrored={handTracker.isMirrored}
                  setIsMirrored={handTracker.setIsMirrored}
                  showLandmarks={handTracker.showLandmarks}
                  setShowLandmarks={handTracker.setShowLandmarks}
                  onStartCamera={handTracker.startCamera}
                  onStopCamera={handTracker.stopCamera}
                  activeSign={handTracker.activeSign}
                />
              </div>

              {/* Right Column: Recognized Text & Speech Synthesis */}
              <div className="grid-col-speech">
                <RecognizedText
                  activeSign={handTracker.activeSign}
                  confirmedSign={handTracker.confirmedSign}
                  textBuffer={textBuffer}
                  setTextBuffer={setTextBuffer}
                  onClear={handleClearText}
                  onSpeak={handleSpeakText}
                  isSpeaking={tts.isSpeaking}
                  ttsConfig={tts}
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
            <TextToSignPanel />
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
    </div>
  );
}
