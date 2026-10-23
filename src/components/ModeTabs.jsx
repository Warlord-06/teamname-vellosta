import { Camera, Film, Trophy } from 'lucide-react';

export default function ModeTabs({ activeMode, onSelectMode, vocabularyCount = 35 }) {
  return (
    <div className="mode-tabs-wrapper">
      <div className="mode-tabs-container" role="tablist" aria-label="SignBridge Communication Modes">
        <button
          role="tab"
          id="tab-sign-to-speech"
          aria-selected={activeMode === 'sign-to-speech'}
          aria-controls="panel-sign-to-speech"
          className={`mode-tab ${activeMode === 'sign-to-speech' ? 'mode-tab-active' : ''}`}
          onClick={() => onSelectMode('sign-to-speech')}
        >
          <div className="mode-tab-icon">
            <Camera size={20} />
          </div>
          <div className="mode-tab-text">
            <div className="mode-tab-title">
              Sign &rarr; Speech
              <span className="mode-badge-live">Live AI</span>
            </div>
            <div className="mode-tab-sub">Webcam tracking &rarr; text &amp; audio speech</div>
          </div>
        </button>

        <button
          role="tab"
          id="tab-text-to-sign"
          aria-selected={activeMode === 'text-to-sign'}
          aria-controls="panel-text-to-sign"
          className={`mode-tab ${activeMode === 'text-to-sign' ? 'mode-tab-active' : ''}`}
          onClick={() => onSelectMode('text-to-sign')}
        >
          <div className="mode-tab-icon">
            <Film size={20} />
          </div>
          <div className="mode-tab-text">
            <div className="mode-tab-title">
              Text &rarr; Sign
              <span className="mode-badge-library">{vocabularyCount} Signs</span>
            </div>
            <div className="mode-tab-sub">Phrase search &rarr; verified sign guides</div>
          </div>
        </button>

        <button
          role="tab"
          id="tab-practice"
          aria-selected={activeMode === 'practice'}
          aria-controls="panel-practice"
          className={`mode-tab ${activeMode === 'practice' ? 'mode-tab-active' : ''}`}
          onClick={() => onSelectMode('practice')}
        >
          <div className="mode-tab-icon">
            <Trophy size={20} />
          </div>
          <div className="mode-tab-text">
            <div className="mode-tab-title">
              Gesture Trainer
              <span className="mode-badge-trainer">Interactive</span>
            </div>
            <div className="mode-tab-sub">Practice signs &amp; quiz live AI accuracy</div>
          </div>
        </button>
      </div>
    </div>
  );
}
