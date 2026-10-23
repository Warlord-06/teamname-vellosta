import React from 'react';
import { X, Sparkles, BookOpen, ShieldCheck, Cpu, Film, ExternalLink } from 'lucide-react';
import { SIGN_PHRASES } from '../data/signPhrases';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <Sparkles className="text-indigo-600" size={24} />
            <div>
              <h2 className="modal-title">About SignBridge MVP</h2>
              <p className="modal-sub">Architecture, supported vocabulary, and hackathon documentation</p>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Section 1: Two Communication Modes */}
          <div className="modal-section">
            <h3 className="section-title">
              <Cpu size={18} className="text-indigo-600" />
              <span>Two-Way Communication System</span>
            </h3>
            <div className="section-grid-2">
              <div className="info-card">
                <h4 className="info-card-title">Mode A: Sign &rarr; Speech</h4>
                <p className="info-card-desc">
                  Captures webcam frames with explicit user consent, tracks 21 3D hand joints via <strong>MediaPipe Tasks Vision</strong>, classifies signs with geometric & pretrained algorithms, and speaks text through the browser's <strong>SpeechSynthesis API</strong>.
                </p>
              </div>
              <div className="info-card">
                <h4 className="info-card-title">Mode B: Text &rarr; Sign</h4>
                <p className="info-card-desc">
                  Allows conversational partners to type phrases, search case-insensitively, and review verified ASL sign video clips with speed controls (0.5x–1.25x), loop, and linguistic breakdowns.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Supported Starter Vocabulary */}
          <div className="modal-section">
            <h3 className="section-title">
              <BookOpen size={18} className="text-indigo-600" />
              <span>Supported Starter Vocabulary ({SIGN_PHRASES.length} Phrases)</span>
            </h3>
            <div className="vocab-table-container">
              <table className="vocab-table">
                <thead>
                  <tr>
                    <th>Phrase</th>
                    <th>Category</th>
                    <th>Handshape / Sign Basis</th>
                    <th>Mode A (Sign&rarr;Speech)</th>
                    <th>Mode B (Text&rarr;Sign)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIGN_PHRASES.map(p => (
                    <tr key={p.id}>
                      <td className="font-semibold text-slate-800">{p.phrase}</td>
                      <td><span className="table-cat-pill">{p.category}</span></td>
                      <td className="text-xs text-slate-600">{p.handshape}</td>
                      <td><span className="status-tag tag-ready">Real-time Ready</span></td>
                      <td><span className="status-tag tag-verified">Verified Guide</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: AI Honesty & Disclosure */}
          <div className="modal-section">
            <h3 className="section-title">
              <ShieldCheck size={18} className="text-emerald-600" />
              <span>AI Implementation & Transparency</span>
            </h3>
            <ul className="modal-list">
              <li>
                <strong>Real AI Processing:</strong> MediaPipe Hand Landmarker runs real-time 3D joint detection directly on your device using WebAssembly. Hand detection and skeleton tracking are 100% genuine AI.
              </li>
              <li>
                <strong>Classification Engine:</strong> Combines MediaPipe's pre-trained deep learning gesture model (Open_Palm, Thumb_Up, Thumb_Down, Victory, ILoveYou) with custom geometric rule analysis of finger curls, angles, and distances.
              </li>
              <li>
                <strong>Evaluation Demo Mode:</strong> For environments without a webcam or low lighting, the clearly labeled Demo Mode provides simulated predictions so judges can test the text-to-speech and translation pipeline.
              </li>
              <li>
                <strong>Zero Fake Translations:</strong> SignBridge never hallucinates or invents sign gestures. If a video or sign is unverified, it explicitly communicates the limitation.
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <p className="modal-footer-note">
            Built for accessibility. 100% client-side execution with zero external data transmission.
          </p>
          <button type="button" className="btn-primary" onClick={onClose}>
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
