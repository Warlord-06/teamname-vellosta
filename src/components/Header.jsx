import { Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Header({ onOpenInfo }) {
  return (
    <header className="header-container">
      <div className="header-content">
        {/* Brand identity */}
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <HeartHandshake className="brand-icon" size={28} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">SignBridge</h1>
              <span className="badge-demo">
                <span className="badge-dot"></span>
                MVP Demo
              </span>
            </div>
            <p className="brand-tagline">Every gesture deserves to be understood.</p>
          </div>
        </div>

        {/* Header badges and actions */}
        <div className="header-actions">
          <div className="feature-pill" title="100% Client-Side Privacy: Camera feed never leaves your device">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>On-Device AI</span>
          </div>

          <button 
            type="button" 
            className="info-btn"
            onClick={onOpenInfo}
            aria-label="View Project Information and Supported Vocabulary"
          >
            <Sparkles size={16} />
            <span>About & Vocabulary</span>
          </button>
        </div>
      </div>
    </header>
  );
}
