import React from 'react';
import { Camera, Film, ArrowRightLeft, Sparkles } from 'lucide-react';

export default function ModeTabs({ activeMode, onSelectMode, vocabularyCount = 8 }) {
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
            <div className="mode-tab-sub">Webcam tracking &rarr; text & audio speech</div>
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
              <span className="mode-badge-library">{vocabularyCount} Phrases</span>
            </div>
            <div className="mode-tab-sub">Phrase search &rarr; verified sign clips</div>
          </div>
        </button>
      </div>
    </div>
  );
}
