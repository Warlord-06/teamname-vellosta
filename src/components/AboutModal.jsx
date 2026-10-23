import { X, Sparkles, BookOpen, ShieldCheck, Cpu } from 'lucide-react';
import { SIGN_PHRASES } from '../data/signPhrases';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-card-wide" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <Sparkles className="text-indigo-600" size={24} />
            <div>
              <h2 className="modal-title">About SignBridge AI</h2>
              <p className="modal-sub">Architecture, expanded 35+ gesture vocabulary, and hackathon documentation</p>
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
          {/* Section 1: Three Communication & Learning Modes */}
          <div className="modal-section">
            <h3 className="section-title">
              <Cpu size={18} className="text-indigo-600" />
              <span>Three Core System Modules</span>
            </h3>
            <div className="section-grid-3">
              <div className="info-card">
                <h4 className="info-card-title">1. Sign &rarr; Speech</h4>
                <p className="info-card-desc">
                  Captures webcam frames, tracks 21 3D hand joints via <strong>MediaPipe Tasks Vision</strong>, classifies signs with geometric &amp; neural algorithms, and supports hands-free action gestures.
                </p>
              </div>
              <div className="info-card">
                <h4 className="info-card-title">2. Text &rarr; Sign</h4>
                <p className="info-card-desc">
                  Allows conversational partners to type phrases, search case-insensitively across {SIGN_PHRASES.length} signs, and review step-by-step handshape breakdowns with video controls.
                </p>
              </div>
              <div className="info-card">
                <h4 className="info-card-title">3. Gesture Trainer &amp; Quiz</h4>
                <p className="info-card-desc">
                  Gamified practice challenge where the AI evaluates the signer&apos;s live handshape, providing instant feedback, streak tracking, XP points, and mastery badges.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Supported Starter Vocabulary */}
          <div className="modal-section">
            <h3 className="section-title">
              <BookOpen size={18} className="text-indigo-600" />
              <span>Full Supported Vocabulary ({SIGN_PHRASES.length} Gestures &amp; Signs)</span>
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
                      <td className="font-semibold text-slate-800">
                        <span className="mr-1.5">{p.emoji || "✋"}</span>
                        <span>{p.phrase}</span>
                      </td>
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
              <span>AI Implementation &amp; Transparency</span>
            </h3>
            <ul className="modal-list">
              <li>
                <strong>Real AI Processing:</strong> MediaPipe Hand Landmarker runs real-time 3D joint detection directly on your device using WebAssembly. Hand detection and skeleton tracking are 100% genuine on-device AI.
              </li>
              <li>
                <strong>Hybrid Classification:</strong> Combines MediaPipe&apos;s pre-trained deep learning gesture model (Open_Palm, Thumb_Up, Thumb_Down, Victory, ILoveYou) with custom geometric rule analysis of finger curls, angles, two-handed distance vectors, and facial proximity.
              </li>
              <li>
                <strong>Hands-Free Action Gestures:</strong> Real-time commands (👈 Point Left to Backspace, 🤏 Pinch to insert Space, ✊ Strong Fist to Speak, ✋ Stop to Clear) allow complete hands-free device control.
              </li>
              <li>
                <strong>Live Hand Anatomy Inspector:</strong> Real-time telemetry exposing finger states (Extended vs Curled) directly demystifies the AI classification for users and judges.
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
