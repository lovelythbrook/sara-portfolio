import React, { useState, useEffect } from 'react';
import { 
  X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Layers, 
  Calendar, Compass, Ruler, Image as ImageIcon, Sparkles 
} from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = project?.images && project.images.length > 0 
    ? project.images 
    : (project?.image ? [project.image] : []);

  const hasMultiple = images.length > 1;

  // Reset image index when project changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsZoomed(false);
  }, [project]);

  // Handle keyboard navigation: Escape to close, Left/Right arrows to cycle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultiple) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && hasMultiple) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, currentIndex, hasMultiple]);

  if (!project) return null;

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close case study viewer"
        >
          <X size={20} />
        </button>

        <div className="modal-body">
          {/* Main Artwork / Presentation View with Carousel */}
          <div className="modal-image-carousel-wrap">
            <div 
              className={`modal-image-display ${isZoomed ? 'zoomed' : ''}`}
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? 'Click to fit image' : 'Click to zoom in on details'}
            >
              <img 
                src={images[currentIndex]} 
                alt={`${project.title} - View ${currentIndex + 1}`} 
                key={currentIndex}
              />

              {/* Zoom badge */}
              <div className="zoom-hint-badge">
                {isZoomed ? <ZoomOut size={13} /> : <ZoomIn size={13} />}
                <span>{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
              </div>

              {/* Multiple Images Indicator Badge */}
              {hasMultiple && (
                <div className="carousel-counter-badge">
                  <Layers size={12} />
                  <span>Study {currentIndex + 1} of {images.length}</span>
                </div>
              )}

              {/* Prev Button (<) */}
              {hasMultiple && (
                <button 
                  className="carousel-nav-btn prev"
                  onClick={handlePrev}
                  aria-label="Previous study view"
                  title="Previous image (Left Arrow)"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Next Button (>) */}
              {hasMultiple && (
                <button 
                  className="carousel-nav-btn next"
                  onClick={handleNext}
                  aria-label="Next study view"
                  title="Next image (Right Arrow)"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Thumbnail Strip if multiple images */}
            {hasMultiple && (
              <div className="modal-thumbnail-strip">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      setIsZoomed(false);
                      setCurrentIndex(idx);
                    }}
                    title={`Switch to study ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Case Study Breakdown */}
          <div className="modal-details-grid">
            {/* Left Column: Concept & Design Process */}
            <div>
              <span className="editorial-tag">{project.category}</span>
              <h2 className="modal-title" style={{ marginTop: '0.5rem' }}>{project.title}</h2>
              <p style={{ color: 'var(--accent-terracotta)', fontWeight: '600', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
                {project.discipline}
              </p>

              {/* Design Concept Box */}
              <div className="concept-box">
                <h4 className="concept-title">Design Concept & Thought Process</h4>
                <p className="concept-text">{project.concept}</p>
              </div>

              {/* Process & Methodology */}
              {project.processSteps && project.processSteps.length > 0 && (
                <div>
                  <h4 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '1.05rem', 
                    fontWeight: 700, 
                    marginBottom: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Layers size={17} color="var(--accent-terracotta)" />
                    Iterative Methodology & Process
                  </h4>

                  <div className="process-steps-list">
                    {project.processSteps.map((step, idx) => (
                      <div key={idx} className="process-step-card">
                        <div className="step-header">
                          <span className="step-num">{idx + 1}</span>
                          <span className="step-title">{step.title}</span>
                        </div>
                        <p className="step-desc">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Technical Specifications Sidebar */}
            <div>
              <div className="modal-specs-card">
                <h4 className="specs-title">Technical Specifications</h4>

                <div className="spec-row">
                  <span className="spec-key">Medium & Materials</span>
                  <span className="spec-val">{project.medium || 'Mixed Media'}</span>
                </div>

                <div className="spec-row">
                  <span className="spec-key">Physical Dimensions / Scale</span>
                  <span className="spec-val">{project.dimensions || 'Standard Studio Scale'}</span>
                </div>

                <div className="spec-row">
                  <span className="spec-key">Native Digital Resolution</span>
                  <span className="spec-val" style={{ color: 'var(--accent-terracotta)', fontWeight: '700' }}>
                    {project.resolution || 'High-Res Studio Scan'}
                  </span>
                </div>

                <div className="spec-row">
                  <span className="spec-key">Creation Year</span>
                  <span className="spec-val">{project.year || '2024'}</span>
                </div>

                <div className="spec-row" style={{ marginBottom: 0 }}>
                  <span className="spec-key">Focus Areas</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
                    {project.tags && project.tags.map((tag, i) => (
                      <span key={i} className="card-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* B.Des Applicant Rationale Note */}
              <div style={{
                marginTop: '1.25rem',
                padding: '1.15rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55
              }}>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>
                  🎓 B.Des Evaluator Context:
                </strong>
                This project demonstrates foundational aptitude in structural visualization, material honesty, 
                and conceptual clarity requested by leading design institutions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
