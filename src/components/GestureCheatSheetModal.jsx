import { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Search, 
  Sparkles, 
  Image as ImageIcon, 
  CheckCircle2, 
  Info, 
  ExternalLink,
  Layers,
  Camera,
  ZoomIn
} from 'lucide-react';
import { SIGN_PHRASES } from '../data/signPhrases';
import { 
  REFERENCE_CHARTS, 
  SIGN_CATALOGUE, 
  getSupportedSignsCount, 
  getReferenceOnlySignsCount 
} from '../data/signReferenceCatalogue';

export default function GestureCheatSheetModal({ 
  isOpen, 
  onClose, 
  onSelectSignToPractice,
  initialTab = "vocabulary"
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // "vocabulary" | "reference-charts"
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [catalogueFilter, setCatalogueFilter] = useState("all"); // "all" | "supported" | "reference"
  const [selectedChartImage, setSelectedChartImage] = useState(null);

  if (!isOpen) return null;

  // Tab 1: 36 Verified Signs
  const categories = ["All", ...Array.from(new Set(SIGN_PHRASES.map(p => p.category)))];
  const filteredPhrases = SIGN_PHRASES.filter(p => {
    const matchesCat = filterCat === "All" || p.category === filterCat;
    const matchesSearch = !search.trim() ||
      p.phrase.toLowerCase().includes(search.toLowerCase()) ||
      p.handshape.toLowerCase().includes(search.toLowerCase()) ||
      (p.aliases && p.aliases.some(a => a.toLowerCase().includes(search.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  // Tab 2: Reference Catalogue
  const filteredCatalogue = SIGN_CATALOGUE.filter(item => {
    const matchesStatus = 
      catalogueFilter === "all" ||
      (catalogueFilter === "supported" && item.isSupported) ||
      (catalogueFilter === "reference" && !item.isSupported);
    const matchesSearch = !search.trim() ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.meaning.toLowerCase().includes(search.toLowerCase()) ||
      item.handshape.toLowerCase().includes(search.toLowerCase()) ||
      item.sources.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const supportedCount = getSupportedSignsCount();
  const referenceCount = getReferenceOnlySignsCount();

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-card-wide" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <BookOpen className="text-indigo-600" size={24} />
            <div>
              <h2 className="modal-title">Hand Sign Library &amp; Reference Guide</h2>
              <p className="modal-sub">
                Explore verified sign vocabulary, user-provided visual reference charts, and recognition capabilities
              </p>
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

        {/* Primary View Switcher Tabs */}
        <div className="library-nav-tabs">
          <button
            type="button"
            className={`lib-tab-btn ${activeTab === 'vocabulary' ? 'is-active' : ''}`}
            onClick={() => { setActiveTab('vocabulary'); setSearch(''); }}
          >
            <Layers size={16} />
            <span>Verified Sign Vocabulary ({SIGN_PHRASES.length} Signs)</span>
          </button>

          <button
            type="button"
            className={`lib-tab-btn ${activeTab === 'reference-charts' ? 'is-active' : ''}`}
            onClick={() => { setActiveTab('reference-charts'); setSearch(''); }}
          >
            <ImageIcon size={16} />
            <span>Reference Charts &amp; Catalogue ({SIGN_CATALOGUE.length} Signs)</span>
            <span className="tab-pill-badge">{supportedCount} Live / {referenceCount} Ref</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: VERIFIED VOCABULARY
            ========================================================================= */}
        {activeTab === 'vocabulary' && (
          <>
            {/* Search & Filter Bar */}
            <div className="cheat-sheet-controls">
              <div className="cheat-search-wrapper">
                <Search size={16} className="cheat-search-icon" />
                <input
                  type="text"
                  placeholder="Search by sign, category, or handshape (e.g. 'fist', 'namaste', 'W')..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="cheat-search-input"
                />
              </div>

              <div className="cheat-cat-pills">
                {categories.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`cheat-cat-pill ${filterCat === c ? 'is-active' : ''}`}
                    onClick={() => setFilterCat(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Verified Signs */}
            <div className="modal-body cheat-sheet-grid">
              {filteredPhrases.map(sign => {
                const isTwoHanded = sign.movementSummary.toLowerCase().includes("both") || 
                  sign.handshape.toLowerCase().includes("both") ||
                  (sign.category === "Greetings" && sign.id === "namaste") ||
                  sign.id === "heart" || sign.id === "house" || sign.id === "friend" || 
                  sign.id === "applause" || sign.id === "more" || sign.id === "help_me";

                return (
                  <div key={sign.id} className="cheat-card">
                    <div className="cheat-card-top">
                      <div className="cheat-card-emoji-box">
                        <span className="cheat-card-emoji">{sign.emoji || "✋"}</span>
                      </div>
                      <div className="cheat-card-title-group">
                        <h3 className="cheat-card-title">{sign.phrase}</h3>
                        <div className="cheat-badges-row">
                          <span className="cheat-badge-cat">{sign.category}</span>
                          <span className={`cheat-badge-hands ${isTwoHanded ? 'badge-two-hands' : 'badge-one-hand'}`}>
                            {isTwoHanded ? "👐 2 Hands" : "🖐️ 1 Hand"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="cheat-card-body">
                      <div className="cheat-info-row">
                        <span className="cheat-label">Handshape:</span>
                        <span className="cheat-value">{sign.handshape}</span>
                      </div>

                      <p className="cheat-movement-desc">{sign.movementSummary}</p>

                      {sign.steps && sign.steps.length > 0 && (
                        <div className="cheat-steps-list">
                          {sign.steps.slice(0, 2).map(s => (
                            <div key={s.step} className="cheat-step-item">
                              <span className="step-num">{s.step}</span>
                              <span className="step-text">{s.detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {onSelectSignToPractice && (
                      <div className="cheat-card-footer">
                        <button
                          type="button"
                          className="btn-practice-this"
                          onClick={() => {
                            onSelectSignToPractice(sign);
                            onClose();
                          }}
                        >
                          <Sparkles size={14} />
                          <span>Practice in Trainer</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* =========================================================================
            TAB 2: HAND SIGN REFERENCE CHARTS & STRUCTURED CATALOGUE
            ========================================================================= */}
        {activeTab === 'reference-charts' && (
          <div className="modal-body reference-charts-container">
            {/* Visual Charts Showcase */}
            <div className="reference-charts-showcase">
              <div className="section-title-row">
                <ImageIcon size={18} className="text-indigo-600" />
                <h3 className="section-heading">User-Provided Reference Charts</h3>
                <span className="section-badge">2 Reference Sheets</span>
              </div>

              <div className="charts-cards-grid">
                {REFERENCE_CHARTS.map(chart => (
                  <div key={chart.id} className="chart-preview-card">
                    <div 
                      className="chart-image-frame"
                      onClick={() => setSelectedChartImage(chart)}
                      title="Click to view full image in high resolution"
                    >
                      <img 
                        src={chart.imagePath} 
                        alt={chart.title}
                        className="chart-img-thumbnail"
                        loading="lazy"
                      />
                      <div className="chart-overlay-hover">
                        <ZoomIn size={24} className="text-white" />
                        <span className="overlay-text">Click to Zoom</span>
                      </div>
                    </div>

                    <div className="chart-card-meta">
                      <h4 className="chart-title">{chart.title}</h4>
                      <p className="chart-subtitle">{chart.subtitle}</p>
                      
                      <div className="chart-tags-row">
                        <span className="chart-tag-pill">{chart.signCount} Gestures</span>
                        <span className="chart-tag-pill">{chart.layout}</span>
                      </div>

                      <p className="chart-desc">{chart.description}</p>
                      <p className="chart-attribution">{chart.attribution}</p>

                      <button
                        type="button"
                        className="btn-view-chart-full"
                        onClick={() => setSelectedChartImage(chart)}
                      >
                        <ExternalLink size={14} />
                        <span>Inspect Chart Image</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Catalogue Filter Controls */}
            <div className="catalogue-controls-section">
              <div className="section-title-row">
                <BookOpen size={18} className="text-indigo-600" />
                <h3 className="section-heading">Extracted Sign Catalogue ({SIGN_CATALOGUE.length} Unique Gestures)</h3>
              </div>

              <div className="catalogue-filter-toolbar">
                <div className="cheat-search-wrapper flex-grow">
                  <Search size={16} className="cheat-search-icon" />
                  <input
                    type="text"
                    placeholder="Search catalogue by name, meaning, or source (e.g. 'shaka', 'thumbs', 'vulcan')..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="cheat-search-input"
                  />
                </div>

                <div className="catalogue-status-pills">
                  <button
                    type="button"
                    className={`status-filter-pill ${catalogueFilter === 'all' ? 'is-active' : ''}`}
                    onClick={() => setCatalogueFilter('all')}
                  >
                    All ({SIGN_CATALOGUE.length})
                  </button>
                  <button
                    type="button"
                    className={`status-filter-pill pill-green ${catalogueFilter === 'supported' ? 'is-active' : ''}`}
                    onClick={() => setCatalogueFilter('supported')}
                  >
                    <CheckCircle2 size={13} />
                    <span>Live AI Supported ({supportedCount})</span>
                  </button>
                  <button
                    type="button"
                    className={`status-filter-pill pill-amber ${catalogueFilter === 'reference' ? 'is-active' : ''}`}
                    onClick={() => setCatalogueFilter('reference')}
                  >
                    <Info size={13} />
                    <span>Reference-Only ({referenceCount})</span>
                  </button>
                </div>
              </div>

              <div className="catalogue-explainer-banner">
                <Info size={16} className="text-indigo-400 flex-shrink-0" />
                <p className="banner-text">
                  <strong>Architectural Safety Guard:</strong> Gestures marked <span className="text-emerald-400 font-semibold">Live AI Supported</span> are mapped directly to verified MediaPipe neural classes or geometric classifiers. Gestures marked <span className="text-amber-400 font-semibold">Reference-Only</span> are documented cultural or dynamic gestures that require future dataset collection and model training before live recognition can be enabled safely.
                </p>
              </div>
            </div>

            {/* Catalogue Entries Grid */}
            <div className="catalogue-cards-grid">
              {filteredCatalogue.map(item => {
                // Find matching verified sign in dictionary if supported
                const verifiedMatch = item.isSupported 
                  ? SIGN_PHRASES.find(p => p.phrase.toLowerCase() === item.name.toLowerCase() || p.id === item.id)
                  : null;

                return (
                  <div key={item.id} className={`catalogue-card ${item.isSupported ? 'card-supported' : 'card-reference'}`}>
                    <div className="cat-card-header">
                      <div className="cat-title-block">
                        <h4 className="cat-sign-name">{item.name}</h4>
                        <div className="cat-sources-list">
                          {item.sources.map(src => (
                            <span key={src} className="cat-source-pill">{src}</span>
                          ))}
                        </div>
                      </div>

                      <div className="cat-status-badge">
                        {item.isSupported ? (
                          <span className="badge-live-supported">
                            <CheckCircle2 size={13} />
                            <span>Live AI Supported</span>
                          </span>
                        ) : (
                          <span className="badge-ref-only">
                            <Info size={13} />
                            <span>Reference-Only</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="cat-card-body">
                      <div className="cat-info-row">
                        <span className="cat-label">Meaning:</span>
                        <span className="cat-val-meaning">{item.meaning}</span>
                      </div>

                      <div className="cat-info-row">
                        <span className="cat-label">Handshape:</span>
                        <span className="cat-val">{item.handshape}</span>
                      </div>

                      <div className="cat-info-row">
                        <span className="cat-label">Model Status:</span>
                        <span className="cat-val-model">
                          {item.isSupported ? (
                            item.modelMapping?.type === 'mediapipe-neural' 
                              ? `MediaPipe Pretrained Neural (${item.modelMapping.className})` 
                              : `Heuristic 3D Classifier (${item.modelMapping?.className})`
                          ) : (
                            "Not Supported (Requires Dataset / Retraining)"
                          )}
                        </span>
                      </div>

                      <p className="cat-cultural-notes">{item.culturalNotes}</p>
                    </div>

                    <div className="cat-card-footer">
                      {item.isSupported && onSelectSignToPractice && verifiedMatch ? (
                        <button
                          type="button"
                          className="btn-practice-this"
                          onClick={() => {
                            onSelectSignToPractice(verifiedMatch);
                            onClose();
                          }}
                        >
                          <Sparkles size={14} />
                          <span>Practice in Live Trainer</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-return-cam"
                          onClick={onClose}
                        >
                          <Camera size={14} />
                          <span>Return to Live Camera</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* High-Resolution Chart Viewer Lightbox Modal */}
        {selectedChartImage && (
          <div className="lightbox-backdrop" onClick={() => setSelectedChartImage(null)}>
            <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-header">
                <div>
                  <h3 className="lightbox-title">{selectedChartImage.title}</h3>
                  <p className="lightbox-sub">{selectedChartImage.attribution}</p>
                </div>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setSelectedChartImage(null)}
                  aria-label="Close image viewer"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="lightbox-body">
                <img 
                  src={selectedChartImage.imagePath} 
                  alt={selectedChartImage.title}
                  className="lightbox-full-img"
                />
              </div>

              <div className="lightbox-footer">
                <span className="lightbox-desc">{selectedChartImage.description}</span>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setSelectedChartImage(null)}
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
