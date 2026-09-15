import React from 'react';
import { ArrowDownRight, Layers, Eye, Sparkles, BookOpen } from 'lucide-react';

export default function Hero({ onSelectFeatured }) {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-wrapper">
        {/* Left Column: Editorial Statement */}
        <div className="hero-content">
          <div className="hero-status-pill">
            <span className="status-indicator"></span>
            <span>Bachelor of Design (B.Des) Applicant Portfolio • 2024–2025</span>
          </div>

          <h1 className="hero-headline">
            Designing at the intersection of <span className="serif-highlight">tactile materiality</span>, structural form & human empathy.
          </h1>

          <p className="hero-desc">
            Hi, I’m <strong>Sagarika (Sara)</strong>. I am an aspiring designer preparing for undergraduate design school. 
            This portfolio gathers my explorations in observational anatomy, biomimetic industrial concepts, 
            sculptural lighting, and experimental typography—with an emphasis on design thinking and process.
          </p>

          <div className="hero-ctas">
            <a href="#works" className="btn-primary">
              <span>Explore Works & Process</span>
              <ArrowDownRight size={18} />
            </a>
            <a href="#about" className="btn-secondary">
              <BookOpen size={17} />
              <span>Academic Vision & About</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Core Disciplines</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Process Documented</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">9</span>
              <span className="stat-label">Curated Studies</span>
            </div>
          </div>
        </div>

        {/* Right Column: Featured Hero Artwork Spotlight */}
        <div className="hero-visual-side">
          <div 
            className="hero-visual-card"
            onClick={onSelectFeatured}
            style={{ cursor: 'pointer' }}
            title="Click to view full case study & process"
          >
            <div className="hero-image-wrap">
              <img 
                src="portfolio/hands_sketch.jpg" 
                alt="Observational Drawing & Structural Anatomy by Sagarika" 
                loading="eager"
              />
            </div>
            <div className="hero-card-meta">
              <div>
                <h3 className="hero-card-title">Anatomy of Form & Perspective</h3>
                <span className="hero-card-discipline">Observational Drawing & Structural Geometry</span>
              </div>
              <span className="editorial-tag" style={{ fontSize: '0.68rem', padding: '0.25rem 0.65rem' }}>
                Featured Study
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
