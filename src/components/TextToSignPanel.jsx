import { useState } from 'react';
import { Search, Film, X, ArrowRight, AlertCircle, BookOpen } from 'lucide-react';
import { SIGN_PHRASES, findSignPhrase } from '../data/signPhrases';
import SignVideoPlayer from './SignVideoPlayer';

const CATEGORIES = ["All", "Greetings", "Courtesy", "Conversation", "Daily Needs", "Emergency & Assistance", "Responses", "Expressions", "Numbers"];

export default function TextToSignPanel({ onOpenReferenceCharts = null }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhrase, setSelectedPhrase] = useState(SIGN_PHRASES[0]); // Default to "Hello"
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchFailedQuery, setSearchFailedQuery] = useState(null);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const matched = findSignPhrase(searchQuery);

    if (matched) {
      setSelectedPhrase(matched);
      setSearchFailedQuery(null);
    } else {
      setSelectedPhrase(null);
      setSearchFailedQuery(searchQuery.trim());
    }
  };

  const handleSelectPhrase = (phrase) => {
    setSelectedPhrase(phrase);
    setSearchQuery(phrase.phrase);
    setSearchFailedQuery(null);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchFailedQuery(null);
  };

  const filteredPhrases = activeCategory === "All" 
    ? SIGN_PHRASES 
    : SIGN_PHRASES.filter(p => p.category === activeCategory);

  return (
    <div className="text-to-sign-container">
      {/* Search Input Bar */}
      <div className="search-card">
        <div className="card-header-bar">
          <div className="card-title-group">
            <div className="card-icon-pill icon-blue">
              <Film size={18} />
            </div>
            <div>
              <h2 className="card-heading">Text to Sign Translation</h2>
              <p className="card-subheading">Type or select a phrase to view verified sign recordings & motion guides</p>
            </div>
          </div>

          {onOpenReferenceCharts && (
            <button
              type="button"
              className="btn-icon-toggle is-active"
              onClick={onOpenReferenceCharts}
              title="Open Hand Sign Reference Charts & Catalogue"
              style={{ padding: '0.45rem 0.9rem', gap: '0.4rem' }}
            >
              <BookOpen size={16} />
              <span className="toggle-label font-medium">Reference Charts</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type phrase (e.g., 'Hello', 'Thank you', 'Help me', 'Water')..."
              aria-label="Search phrase for sign language video"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClear}
                aria-label="Clear search input"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary btn-search"
            aria-label="Find Sign Video"
          >
            <span>Find Sign</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Suggested Phrase Chips */}
        <div className="suggested-phrases-section">
          <div className="suggested-header">
            <span className="suggested-label">Verified Starter Library:</span>
            
            {/* Category Filter Pills */}
            <div className="category-pills">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="phrase-chips-grid">
            {filteredPhrases.map((item) => {
              const isSelected = selectedPhrase?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`phrase-chip ${isSelected ? 'phrase-chip-active' : ''}`}
                  onClick={() => handleSelectPhrase(item)}
                >
                  <span className="phrase-chip-text">{item.phrase}</span>
                  <span className="phrase-chip-category">{item.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video & Motion Display or Fallback Message */}
      {selectedPhrase ? (
        <SignVideoPlayer 
          phraseData={selectedPhrase} 
          onSelectAlternative={handleSelectPhrase}
        />
      ) : searchFailedQuery ? (
        <div className="search-fallback-card" role="alert">
          <div className="fallback-icon-box">
            <AlertCircle size={36} className="text-amber-500" />
          </div>
          <div className="fallback-content">
            <h3 className="fallback-heading">
              No verified sign video available for "{searchFailedQuery}"
            </h3>
            <p className="fallback-text">
              To prevent linguistic misrepresentation, <strong>SignBridge strictly plays verified sign recordings</strong> rather than generating invented or approximate gestures.
            </p>
            <p className="fallback-sub">
              Try searching one of our verified starter phrases below, or check <code>src/data/signPhrases.js</code> to add custom authentic recordings.
            </p>

            <div className="fallback-alternatives">
              <span className="fallback-alt-label">Available verified signs:</span>
              <div className="fallback-buttons-row">
                {SIGN_PHRASES.slice(0, 5).map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className="btn-alternative"
                    onClick={() => handleSelectPhrase(p)}
                  >
                    {p.phrase}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
