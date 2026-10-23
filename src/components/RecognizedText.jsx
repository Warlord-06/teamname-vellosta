import { useState } from 'react';
import { 
  Volume2, 
  Trash2, 
  Copy, 
  Check, 
  Settings2, 
  Edit3, 
  Plus
} from 'lucide-react';

export default function RecognizedText({
  activeSign,
  textBuffer,
  setTextBuffer,
  onClear,
  onSpeak,
  isSpeaking,
  ttsConfig
}) {
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleCopy = () => {
    if (!textBuffer) return;
    navigator.clipboard.writeText(textBuffer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddWord = (word) => {
    if (!word) return;
    setTextBuffer(prev => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${word}` : word;
    });
  };

  return (
    <div className="recognized-card">
      {/* Header */}
      <div className="card-header-bar">
        <div className="card-title-group">
          <div className="card-icon-pill icon-indigo">
            <Volume2 size={18} />
          </div>
          <div>
            <h2 className="card-heading">Recognized Speech & Text</h2>
            <p className="card-subheading">Live gesture classification to speech synthesis</p>
          </div>
        </div>

        <button
          type="button"
          className={`btn-settings-toggle ${showSettings ? 'is-active' : ''}`}
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Toggle Voice & Speech Settings"
          title="Speech Settings"
        >
          <Settings2 size={16} />
          <span>Voice Controls</span>
        </button>
      </div>

      {/* Voice & TTS Settings Drawer */}
      {showSettings && (
        <div className="tts-settings-panel">
          <h4 className="settings-panel-title">Speech Synthesis Configuration</h4>
          <div className="settings-grid">
            {/* Voice Picker */}
            <div className="setting-control">
              <label htmlFor="voice-select" className="setting-label">Voice</label>
              <select
                id="voice-select"
                className="select-input"
                value={ttsConfig.selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = ttsConfig.voices.find(v => v.name === e.target.value);
                  if (voice) ttsConfig.setSelectedVoice(voice);
                }}
              >
                {ttsConfig.voices.map((v, i) => (
                  <option key={i} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Speech Rate */}
            <div className="setting-control">
              <div className="setting-label-row">
                <label htmlFor="speech-rate" className="setting-label">Speed: {ttsConfig.rate}x</label>
              </div>
              <input
                id="speech-rate"
                type="range"
                min="0.7"
                max="1.3"
                step="0.05"
                value={ttsConfig.rate}
                onChange={(e) => ttsConfig.setRate(parseFloat(e.target.value))}
                className="range-slider"
              />
            </div>

            {/* Auto Speak Toggle */}
            <div className="setting-control-checkbox">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={ttsConfig.autoSpeak}
                  onChange={(e) => ttsConfig.setAutoSpeak(e.target.checked)}
                />
                <span className="checkbox-text">Auto-speak confirmed signs immediately</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Current Sign Live Indicator */}
      <div className="active-sign-banner">
        <div className="active-sign-left">
          <span className="active-sign-label">Active Detection:</span>
          {activeSign && activeSign.name ? (
            <div className="active-sign-val-group">
              <span className="active-sign-val">{activeSign.name}</span>
              <span className={`method-badge method-${activeSign.method}`}>
                {activeSign.method === 'simulated-demo' ? 'Simulated Example' :
                 activeSign.method === 'ai-pretrained' ? 'MediaPipe AI' :
                 activeSign.method === 'ai-geometric' ? 'Landmark Geometry' : 'AI'}
              </span>
            </div>
          ) : (
            <span className="active-sign-none">No active sign gesture recognized</span>
          )}
        </div>

        {activeSign && activeSign.confidence > 0 && (
          <div className="confidence-meter-box" title={`Confidence: ${Math.round(activeSign.confidence * 100)}%`}>
            <span className="confidence-num">{Math.round(activeSign.confidence * 100)}%</span>
            <div className="confidence-bar-bg">
              <div 
                className="confidence-bar-fill" 
                style={{ width: `${Math.round(activeSign.confidence * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Editable Sentence Area with Text Correction */}
      <div className="text-editor-container">
        <div className="text-editor-header">
          <label htmlFor="recognized-text-input" className="editor-label">
            <Edit3 size={14} />
            <span>Translated Output (Click to edit or correct):</span>
          </label>
          <span className="char-count">{textBuffer.length} chars</span>
        </div>

        <textarea
          id="recognized-text-input"
          className="recognized-textarea"
          rows={3}
          value={textBuffer}
          onChange={(e) => setTextBuffer(e.target.value)}
          placeholder="Recognized signs will appear here. You can also type or edit text directly..."
          aria-label="Recognized Text"
        />

        {/* Action Buttons Toolbar */}
        <div className="editor-actions-bar">
          <div className="editor-left-actions">
            <button
              type="button"
              className={`btn-speak ${isSpeaking ? 'is-speaking' : ''}`}
              onClick={() => onSpeak(textBuffer)}
              disabled={!textBuffer.trim()}
              aria-label="Speak text aloud"
            >
              {isSpeaking ? (
                <>
                  <Volume2 className="animate-pulse text-indigo-200" size={18} />
                  <span>Speaking...</span>
                </>
              ) : (
                <>
                  <Volume2 size={18} />
                  <span>Speak Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => handleAddWord(" ")}
              title="Add space between words"
            >
              <Plus size={15} />
              <span>Space</span>
            </button>
          </div>

          <div className="editor-right-actions">
            <button
              type="button"
              className="btn-ghost"
              onClick={handleCopy}
              disabled={!textBuffer.trim()}
              title="Copy text to clipboard"
              aria-label="Copy translated text"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-500" />
                  <span className="text-emerald-600 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn-ghost text-rose-600 hover:text-rose-700"
              onClick={onClear}
              disabled={!textBuffer.trim()}
              title="Clear recognized text"
              aria-label="Clear translated text"
            >
              <Trash2 size={16} />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
