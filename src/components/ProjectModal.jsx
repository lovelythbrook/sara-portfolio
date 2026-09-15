import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, CheckCircle2, Layers, Calendar, Compass, Ruler, Image as ImageIcon } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

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
          {/* Main Artwork / Presentation View */}
          <div 
            className={`modal-image-display ${isZoomed ? 'zoomed' : ''}`}
            onClick={() => setIsZoomed(!isZoomed)}
            title={isZoomed ? 'Click to fit image' : 'Click to zoom in on details'}
          >
            <img 
              src={project.image} 
              alt={project.title} 
            />
            <div className="zoom-hint-badge">
              {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
              <span>{isZoomed ? 'Click to zoom out' : 'Click to inspect high-res detail'}</span>
            </div>
          </div>

          {/* Details & Case Study Breakdown */}
          <div className="modal-details-grid">
            {/* Left Column: Concept & Design Process */}
            <div>
              <span className="editorial-tag">{project.category}</span>
              <h2 className="modal-title" style={{ marginTop: '0.5rem' }}>{project.title}</h2>
              <p style={{ color: 'var(--accent-terracotta)', fontWeight: '600', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
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
                    fontSize: '1.1rem', 
                    fontWeight: 700, 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Layers size={18} color="var(--accent-terracotta)" />
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                    {project.tags && project.tags.map((tag, i) => (
                      <span key={i} className="card-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* B.Des Applicant Rationale Note */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
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
