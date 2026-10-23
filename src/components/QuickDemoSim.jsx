import React from 'react';
import { PlayCircle, Sparkles, Info, ShieldAlert } from 'lucide-react';

const SAMPLE_DEMO_SIGNS = [
  { name: "Hello", phrase: "Hello", confidence: 0.96, emoji: "👋" },
  { name: "Thank you", phrase: "Thank you", confidence: 0.94, emoji: "🙏" },
  { name: "Help me", phrase: "Help me", confidence: 0.92, emoji: "🆘" },
  { name: "How are you?", phrase: "How are you?", confidence: 0.89, emoji: "🤝" },
  { name: "I need water", phrase: "I need water", confidence: 0.91, emoji: "💧" },
  { name: "Yes", phrase: "Yes", confidence: 0.97, emoji: "👍" },
  { name: "No", phrase: "No", confidence: 0.95, emoji: "👎" },
  { name: "I love you", phrase: "I love you", confidence: 0.98, emoji: "🤟" }
];

export default function QuickDemoSim({ onSimulateSign, isDemoActive, onToggleDemo }) {
  return (
    <div className="demo-sim-card">
      <div className="demo-sim-header">
        <div className="demo-header-left">
          <div className="demo-badge">
            <Sparkles size={14} className="text-amber-500" />
            <span>Evaluation Demo Mode</span>
          </div>
          <span className="demo-header-sub">
            Simulate recognized sign gestures to evaluate text & speech without camera
          </span>
        </div>

        <button
          type="button"
          className={`btn-toggle-demo ${isDemoActive ? 'is-active' : ''}`}
          onClick={onToggleDemo}
          aria-label="Toggle Demo Simulation Panel"
        >
          {isDemoActive ? "Hide Simulator" : "Show Simulator"}
        </button>
      </div>

      {isDemoActive && (
        <div className="demo-sim-body">
          <div className="demo-disclaimer-banner">
            <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="demo-disclaimer-text">
              <strong>Simulated Examples Notice:</strong> Clicking these buttons simulates sample predictions through the translation buffer and browser speech synthesis. These are clearly marked as <code>[Simulated Example]</code> to maintain transparency with hackathon judges. Real camera recognition uses the MediaPipe panel above.
            </p>
          </div>

          <div className="demo-chips-grid">
            {SAMPLE_DEMO_SIGNS.map((item) => (
              <button
                key={item.name}
                type="button"
                className="demo-chip-btn"
                onClick={() => onSimulateSign(item.name, item.confidence)}
                title={`Simulate sign for "${item.name}"`}
              >
                <span className="demo-chip-emoji">{item.emoji}</span>
                <span className="demo-chip-text">{item.name}</span>
                <span className="demo-chip-sim">Simulate</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
