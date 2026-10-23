import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  CameraOff, 
  Lightbulb, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';
import { SIGN_PHRASES } from '../data/signPhrases';

const DECKS = [
  {
    id: "essentials",
    name: "Everyday Essentials",
    description: "Foundational greetings and courtesy signs",
    signIds: ["hello", "thank_you", "yes", "no", "please", "sorry", "good", "namaste"]
  },
  {
    id: "needs",
    name: "Daily Needs & Help",
    description: "Emergency requests, water, food, and assistance",
    signIds: ["help_me", "need_water", "eat_food", "bathroom", "stop", "more", "time"]
  },
  {
    id: "expressions",
    name: "Expressions & Friendship",
    description: "Heart, love, peace, rock on, and applause",
    signIds: ["i_love_you", "heart", "peace", "rock_on", "good_luck", "friend", "applause", "strong"]
  },
  {
    id: "two_handed",
    name: "Two-Handed Mastery",
    description: "Complex signs involving coordinated two-hand geometry",
    signIds: ["namaste", "heart", "house", "friend", "help_me", "more", "applause", "all_done"]
  },
  {
    id: "numbers",
    name: "Numbers & Shapes",
    description: "ASL numbers, letters, and directional gestures",
    signIds: ["number_1", "peace", "number_3", "number_4", "later", "small_bit", "you", "point_left"]
  }
];

export default function PracticeMode({
  videoRef,
  canvasRef,
  isCameraActive,
  startCamera,
  stopCamera,
  isModelLoading,
  isMirrored,
  activeSign,
  handGeometry,
  simulateSign,
  tts,
  onOpenCheatSheet,
  preselectedSign = null
}) {
  const [selectedDeckId, setSelectedDeckId] = useState("essentials");
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [masteredIds, setMasteredIds] = useState(new Set());
  const [matchProgress, setMatchProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const holdTimerRef = useRef(null);
  const holdStartTimeRef = useRef(null);

  // Get current deck signs
  const currentDeck = DECKS.find(d => d.id === selectedDeckId) || DECKS[0];
  const deckSigns = currentDeck.signIds
    .map(id => SIGN_PHRASES.find(p => p.id === id))
    .filter(Boolean);

  const targetSign = deckSigns[currentSignIndex] || deckSigns[0] || SIGN_PHRASES[0];

  // If a preselected sign was passed, jump to it
  useEffect(() => {
    if (preselectedSign) {
      const deckWithSign = DECKS.find(d => d.signIds.includes(preselectedSign.id));
      if (deckWithSign) {
        setSelectedDeckId(deckWithSign.id);
        const idx = deckWithSign.signIds.indexOf(preselectedSign.id);
        if (idx !== -1) {
          setCurrentSignIndex(idx);
        }
      }
    }
  }, [preselectedSign]);

  const handleNextSign = useCallback(() => {
    setIsSuccess(false);
    setMatchProgress(0);
    holdStartTimeRef.current = null;
    setCurrentSignIndex(prev => {
      if (prev < deckSigns.length - 1) {
        return prev + 1;
      }
      return 0;
    });
  }, [deckSigns.length]);

  const handlePrevSign = () => {
    setIsSuccess(false);
    setMatchProgress(0);
    holdStartTimeRef.current = null;
    if (currentSignIndex > 0) {
      setCurrentSignIndex(prev => prev - 1);
    }
  };

  // Check live AI detection against target sign
  useEffect(() => {
    if (isSuccess || !targetSign) return;

    const detected = activeSign?.name?.toLowerCase().trim() || "";
    const targetName = targetSign.phrase.toLowerCase().trim();
    const targetAliases = (targetSign.aliases || []).map(a => a.toLowerCase().trim());

    const isMatch = detected && (
      detected === targetName ||
      targetAliases.includes(detected) ||
      detected.includes(targetName) ||
      targetName.includes(detected)
    );

    if (isMatch) {
      if (!holdStartTimeRef.current) {
        holdStartTimeRef.current = Date.now();
      }

      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min(100, Math.round((elapsed / 1000) * 100));
      setMatchProgress(progress);

      if (elapsed >= 1000 && !isSuccess) {
        // Trigger Mastery!
        setIsSuccess(true);
        setScore(prev => prev + 25);
        setStreak(prev => prev + 1);
        setMasteredIds(prev => new Set([...prev, targetSign.id]));

        if (tts && tts.speak) {
          tts.speak(`Mastered! Great job with ${targetSign.phrase}!`);
        }

        // Auto-advance after 2 seconds
        holdTimerRef.current = setTimeout(() => {
          handleNextSign();
        }, 2000);
      }
    } else {
      holdStartTimeRef.current = null;
      setMatchProgress(0);
    }

    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, [activeSign, targetSign, isSuccess, tts, handleNextSign]);

  return (
    <div className="practice-mode-wrapper animate-fade-in">
      {/* Top Banner / Stats Header */}
      <div className="practice-header-card">
        <div className="practice-stats-cluster">
          <div className="practice-title-group">
            <div className="practice-badge">
              <Sparkles size={16} className="text-amber-400" />
              <span>Interactive Gesture Trainer &amp; Accuracy Quiz</span>
            </div>
            <h2 className="practice-main-title">Practice Sign Language Gestures</h2>
            <p className="practice-main-sub">
              Make the target gesture in front of your camera. Our AI validates hand geometry in real time.
            </p>
          </div>

          <div className="stats-counters-row">
            <div className="stat-pill stat-xp">
              <Trophy size={18} className="text-amber-500" />
              <div>
                <span className="stat-val">{score} XP</span>
                <span className="stat-lbl">Points</span>
              </div>
            </div>

            <div className="stat-pill stat-streak">
              <Flame size={18} className="text-orange-500" />
              <div>
                <span className="stat-val">{streak} 🔥</span>
                <span className="stat-lbl">Streak</span>
              </div>
            </div>

            <div className="stat-pill stat-mastered">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <div>
                <span className="stat-val">{masteredIds.size} / {deckSigns.length}</span>
                <span className="stat-lbl">Mastered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deck Selector Tabs */}
        <div className="deck-selector-row">
          <span className="deck-label">Training Deck:</span>
          <div className="deck-pills-list">
            {DECKS.map(deck => (
              <button
                key={deck.id}
                type="button"
                className={`deck-pill-btn ${selectedDeckId === deck.id ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedDeckId(deck.id);
                  setCurrentSignIndex(0);
                  setIsSuccess(false);
                  setMatchProgress(0);
                }}
              >
                <span>{deck.name}</span>
                <span className="deck-count">({deck.signIds.length})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Practice Workspace: 2-Column Layout */}
      <div className="practice-grid">
        {/* Left Column: Target Sign Card & Instructions */}
        <div className="practice-target-col">
          <div className={`practice-target-card ${isSuccess ? 'card-mastered' : ''}`}>
            {/* Card Header */}
            <div className="target-card-header">
              <div className="target-index-pill">
                Sign {currentSignIndex + 1} of {deckSigns.length}
              </div>
              <div className="target-diff-badge">
                {targetSign.difficulty || "Beginner"}
              </div>
            </div>

            {/* Target Big Visual */}
            <div className="target-visual-center">
              <div className="target-emoji-bubble">
                <span className="target-emoji">{targetSign.emoji || "✋"}</span>
              </div>
              <h3 className="target-sign-name">{targetSign.phrase}</h3>
              <span className="target-category-pill">{targetSign.category}</span>
            </div>

            {/* Hold & Match Progress Indicator */}
            <div className="match-progress-container">
              <div className="match-progress-header">
                <span className="match-status-text">
                  {isSuccess ? "🎉 Sign Mastered! (+25 XP)" :
                   matchProgress > 0 ? `Holding Gesture: ${matchProgress}%` :
                   "Hold gesture steady in front of camera"}
                </span>
                <span className="match-percent">{matchProgress}%</span>
              </div>

              <div className="match-progress-bar-bg">
                <div 
                  className={`match-progress-bar-fill ${isSuccess ? 'is-complete' : ''}`}
                  style={{ width: `${matchProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="target-instructions-box">
              <h4 className="instructions-title">
                <Lightbulb size={16} className="text-amber-500" />
                <span>How to Sign &ldquo;{targetSign.phrase}&rdquo;:</span>
              </h4>
              <p className="target-handshape-text">
                <strong>Handshape:</strong> {targetSign.handshape}
              </p>
              <p className="target-summary-text">{targetSign.movementSummary}</p>

              {targetSign.steps && (
                <div className="target-steps-mini">
                  {targetSign.steps.map(s => (
                    <div key={s.step} className="mini-step">
                      <span className="mini-step-num">{s.step}</span>
                      <span className="mini-step-text"><strong>{s.title}:</strong> {s.detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Card Navigation Footer */}
            <div className="target-card-actions">
              <div className="card-nav-buttons">
                <button
                  type="button"
                  className="btn-nav-step"
                  onClick={handlePrevSign}
                  disabled={currentSignIndex === 0}
                  title="Previous sign"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  className="btn-nav-step"
                  onClick={handleNextSign}
                  title="Next sign"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="trainer-secondary-actions">
                <button
                  type="button"
                  className="btn-sim-trainer"
                  onClick={() => simulateSign(targetSign.phrase, 0.95, targetSign.category)}
                  title="Simulate this sign to test completion without camera"
                >
                  <Sparkles size={14} />
                  <span>Simulate Sign</span>
                </button>

                {onOpenCheatSheet && (
                  <button
                    type="button"
                    className="btn-cheat-link"
                    onClick={onOpenCheatSheet}
                  >
                    <BookOpen size={14} />
                    <span>Cheat Sheet</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Video Stream & Real-Time AI Detection Feedback */}
        <div className="practice-camera-col">
          <div className="practice-camera-card">
            <div className="practice-cam-header">
              <div className="cam-header-left">
                <span className="pulse-indicator"></span>
                <span className="cam-header-title">Live AI Verification Feed</span>
              </div>

              <div className="cam-header-right">
                {isCameraActive ? (
                  <button
                    type="button"
                    className="btn-cam-control btn-cam-stop"
                    onClick={stopCamera}
                  >
                    <CameraOff size={15} />
                    <span>Stop Camera</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-cam-control btn-cam-start"
                    onClick={startCamera}
                    disabled={isModelLoading}
                  >
                    <Camera size={15} />
                    <span>Start Camera</span>
                  </button>
                )}
              </div>
            </div>

            {/* Viewport Box */}
            <div className="practice-viewport-box">
              <div className={`practice-viewport ${isMirrored ? 'is-mirrored' : ''}`}>
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`camera-video ${!isCameraActive ? 'hidden' : ''}`}
                />
                <canvas
                  ref={canvasRef}
                  className={`camera-canvas ${!isCameraActive ? 'hidden' : ''}`}
                />

                {!isCameraActive && (
                  <div className="practice-offline-state">
                    <Camera size={44} className="text-slate-400 mb-2" />
                    <h4>Camera is Offline</h4>
                    <p>Start your camera to begin practicing with live AI joint detection.</p>
                    <button
                      type="button"
                      className="btn-primary mt-3"
                      onClick={startCamera}
                    >
                      <Camera size={16} />
                      <span>Start Camera</span>
                    </button>
                  </div>
                )}

                {/* Real-time sign detected tag */}
                {isCameraActive && activeSign && activeSign.name && (
                  <div className={`practice-detection-overlay ${
                    activeSign.name.toLowerCase() === targetSign.phrase.toLowerCase()
                      ? 'overlay-matching' : 'overlay-other'
                  }`}>
                    <span className="overlay-label">AI Detected:</span>
                    <strong className="overlay-name">{activeSign.name}</strong>
                    <span className="overlay-conf">
                      {Math.round((activeSign.confidence || 0) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Live Hand Anatomy Quick HUD in Trainer */}
            {handGeometry && (
              <div className="practice-hud-strip">
                <span className="hud-title">Hand Anatomy:</span>
                <span className="hud-chip">Thumb: {handGeometry.fingerStates?.thumb}</span>
                <span className="hud-chip">Index: {handGeometry.fingerStates?.index}</span>
                <span className="hud-chip">Middle: {handGeometry.fingerStates?.middle}</span>
                <span className="hud-chip">Ring: {handGeometry.fingerStates?.ring}</span>
                <span className="hud-chip">Pinky: {handGeometry.fingerStates?.pinky}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
