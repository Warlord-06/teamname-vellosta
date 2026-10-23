import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Repeat, 
  Gauge, 
  BookOpen, 
  Sparkles, 
  FileVideo
} from 'lucide-react';

const PLAYBACK_RATES = [0.5, 0.75, 1.0, 1.25];

export default function SignVideoPlayer({ phraseData }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isLooping, setIsLooping] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeStepTab, setActiveStepTab] = useState(0);

  // Reset video state when phraseData changes
  useEffect(() => {
    setVideoError(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveStepTab(0);

    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
      videoRef.current.load();
    }
  }, [phraseData, playbackRate]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Video playback catch:", err);
        setVideoError(true);
      });
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.warn("Replay failed:", err);
    });
  };

  const handleRateChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  return (
    <div className="sign-player-card">
      {/* Phrase Meta Header */}
      <div className="player-meta-header">
        <div className="phrase-badge-group">
          <span className="phrase-category-badge">{phraseData.category}</span>
          <span className="phrase-asl-badge">{phraseData.aslType}</span>
          <span className="phrase-difficulty-badge">{phraseData.difficulty}</span>
        </div>

        <h3 className="phrase-main-title">
          Sign: <span className="highlight-phrase">"{phraseData.phrase}"</span>
        </h3>
        <p className="phrase-quick-summary">{phraseData.movementSummary}</p>
      </div>

      <div className="player-content-grid">
        {/* Left Column: Video Player / Video State */}
        <div className="video-player-column">
          <div className="video-container-frame">
            {/* The actual HTML5 Video Element */}
            <video
              ref={videoRef}
              src={phraseData.videoPath}
              className={`sign-video-element ${videoError ? 'is-errored' : ''}`}
              loop={isLooping}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setVideoError(true)}
            />

            {/* Overlay Play/Pause Button on Hover */}
            {!videoError && (
              <button
                type="button"
                className={`video-play-overlay ${isPlaying ? 'overlay-playing' : ''}`}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
              </button>
            )}

            {/* Awaiting Video Fallback Card */}
            {videoError && (
              <div className="video-missing-overlay">
                <div className="missing-icon-box">
                  <FileVideo size={36} className="text-indigo-400" />
                </div>
                <h4 className="missing-title">Verified Video File Awaited</h4>
                <p className="missing-path">
                  Expected location: <code>public{phraseData.videoPath}</code>
                </p>
                <div className="missing-notice-box">
                  <p className="missing-desc">
                    To preserve translation integrity, SignBridge does not guess or substitute unrelated footage. Check <code>public/videos/README.md</code> for how to drop verified ASL clips.
                  </p>
                </div>

                <div className="missing-guide-prompt">
                  <span>Interactive step-by-step visual motion guide available below &rarr;</span>
                </div>
              </div>
            )}
          </div>

          {/* Video Control Bar */}
          <div className="video-controls-bar">
            <div className="controls-left">
              <button
                type="button"
                className="btn-control-icon"
                onClick={togglePlay}
                disabled={videoError}
                aria-label={isPlaying ? "Pause" : "Play"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                type="button"
                className="btn-control-icon"
                onClick={handleReplay}
                disabled={videoError}
                aria-label="Replay from start"
                title="Replay"
              >
                <RotateCcw size={18} />
              </button>

              <button
                type="button"
                className={`btn-control-icon ${isLooping ? 'is-active' : ''}`}
                onClick={() => setIsLooping(!isLooping)}
                aria-label="Toggle loop"
                title={isLooping ? "Loop On" : "Loop Off"}
              >
                <Repeat size={18} />
              </button>

              {duration > 0 && (
                <span className="text-xs text-slate-500 font-mono ml-1">
                  {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                </span>
              )}
            </div>

            {/* Speed Selector */}
            <div className="controls-right">
              <div className="speed-selector-group">
                <Gauge size={15} className="text-slate-400" />
                <span className="speed-label">Speed:</span>
                {PLAYBACK_RATES.map(rate => (
                  <button
                    key={rate}
                    type="button"
                    className={`btn-speed-pill ${playbackRate === rate ? 'is-active' : ''}`}
                    onClick={() => handleRateChange(rate)}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Motion Guide & Linguistic Breakdown */}
        <div className="motion-guide-column">
          <div className="guide-header-bar">
            <div className="guide-title-row">
              <BookOpen size={18} className="text-indigo-600" />
              <h4 className="guide-heading">ASL Linguistic & Motion Guide</h4>
            </div>
            <span className="handshape-pill" title="Required Handshape">
              {phraseData.handshape}
            </span>
          </div>

          {/* Step Timeline */}
          <div className="steps-container">
            {phraseData.steps && phraseData.steps.map((st, idx) => (
              <div 
                key={st.step} 
                className={`step-item ${activeStepTab === idx ? 'step-item-active' : ''}`}
                onClick={() => setActiveStepTab(idx)}
              >
                <div className="step-num-circle">
                  <span>{st.step}</span>
                </div>
                <div className="step-body">
                  <div className="step-title">{st.title}</div>
                  <div className="step-detail">{st.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Linguistic Notes Alert Box */}
          <div className="linguistic-notes-box">
            <div className="notes-header">
              <Sparkles size={15} className="text-indigo-600" />
              <span className="notes-title">Grammar & Cultural Notes</span>
            </div>
            <p className="notes-text">{phraseData.linguisticNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
