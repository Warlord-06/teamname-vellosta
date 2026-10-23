import { useState } from 'react';
import { Sparkles, Info, Search, Filter } from 'lucide-react';
import { SIGN_PHRASES } from '../data/signPhrases';

const CATEGORIES = [
  "All",
  "Greetings",
  "Courtesy",
  "Daily Needs",
  "Emergency & Assistance",
  "Expressions",
  "Responses",
  "Numbers",
  "Conversation"
];

export default function QuickDemoSim({ onSimulateSign, isDemoActive, onToggleDemo }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSigns = SIGN_PHRASES.filter(item => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() || 
      item.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.aliases && item.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="demo-sim-card">
      <div className="demo-sim-header">
        <div className="demo-header-left">
          <div className="demo-badge">
            <Sparkles size={14} className="text-amber-500" />
            <span>Evaluation & Gesture Simulator</span>
          </div>
          <span className="demo-header-sub">
            Simulate any of the {SIGN_PHRASES.length} supported gestures to test translation, actions & speech synthesis without camera
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
              <strong>Evaluation Simulator:</strong> Clicking any gesture below simulates the AI classification output into the translation buffer, action engine, and SpeechSynthesis voice. These are clearly marked as <code>[Simulated Example]</code> for academic transparency. Real-time camera tracking uses the MediaPipe panel above.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="demo-filters-row">
            <div className="demo-search-box">
              <Search size={15} className="demo-search-icon" />
              <input
                type="text"
                placeholder="Search gesture to simulate (e.g. Namaste, Water, Heart)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="demo-search-input"
              />
            </div>

            <div className="demo-category-pills">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`demo-cat-pill ${selectedCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Chips Grid */}
          <div className="demo-chips-grid">
            {filteredSigns.map((item) => (
              <button
                key={item.id}
                type="button"
                className="demo-chip-btn"
                onClick={() => onSimulateSign(item.phrase, 0.94, item.category)}
                title={`Simulate sign for "${item.phrase}" (${item.category})`}
              >
                <span className="demo-chip-emoji">{item.emoji || "✋"}</span>
                <span className="demo-chip-text">{item.phrase}</span>
                <span className="demo-chip-sim">Simulate</span>
              </button>
            ))}
          </div>

          {filteredSigns.length === 0 && (
            <div className="demo-empty-results">
              <Filter size={18} className="text-slate-400" />
              <span>No gestures matched &ldquo;{searchQuery}&rdquo;. Try another term or reset the category filter.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
