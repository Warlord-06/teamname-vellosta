import { HeartHandshake, Shield, BookOpen } from 'lucide-react';
import { SIGN_PHRASES } from '../data/signPhrases';

export default function Footer({ onOpenInfo }) {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <HeartHandshake className="text-indigo-600" size={20} />
              <span className="footer-brand-title">SignBridge</span>
              <span className="footer-version">v1.0 Hackathon MVP</span>
            </div>
            <p className="footer-tagline">"Every gesture deserves to be understood."</p>
          </div>

          <div className="footer-vocab-summary">
            <span className="footer-vocab-title">Supported Starter Vocabulary:</span>
            <div className="footer-vocab-chips">
              {SIGN_PHRASES.map(p => (
                <span key={p.id} className="footer-chip">{p.phrase}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom-row">
          <p className="footer-notice">
            <strong>Prototype Scope Notice:</strong> SignBridge is an educational MVP demonstrating real-time on-device hand tracking and verified phrase retrieval. Natural sign languages possess rich spatial grammar, facial morphology, and dialectal depth. We do not claim unrestricted fluent translation.
          </p>

          <div className="footer-links">
            <button type="button" className="footer-link-btn" onClick={onOpenInfo}>
              <BookOpen size={14} />
              <span>Vocabulary & Guides</span>
            </button>
            <span className="footer-privacy-badge">
              <Shield size={13} className="text-emerald-600" />
              <span>Client-Side Only</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
