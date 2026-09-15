import React from 'react';
import { GraduationCap, Award, Compass, Heart, Sparkles, BookOpen, Leaf, Box } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Portrait & Credentials */}
          <div>
            <div className="about-portrait-card">
              <div className="about-portrait-wrap">
                <img 
                  src="portfolio/portrait_sara.jpg" 
                  alt="Sagarika (Sara) in her studio workspace" 
                  loading="lazy"
                />
              </div>

              <div className="about-credentials">
                <div className="credential-item">
                  <GraduationCap size={18} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Candidate for Bachelor of Design (B.Des)</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Class of 2025–2029 Admissions</span>
                  </div>
                </div>

                <div className="credential-item">
                  <Compass size={18} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Core Disciplines</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Industrial Form, Structural Drawing, Typography</span>
                  </div>
                </div>

                <div className="credential-item">
                  <Award size={18} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Studio Practice</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Clay, Charcoal, Pulp Casting & Digital Prototyping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Story, Future Aspirations & Philosophy */}
          <div>
            <span className="editorial-tag">Candidate Profile & Statement of Purpose</span>
            <h2 className="section-title">About Sagarika (Sara)</h2>

            <blockquote id="philosophy" className="philosophy-quote">
              “Design is never merely the cosmetic finish of a thought; it is the physical dialogue between material honesty, human ergonomics, and environmental responsibility.”
            </blockquote>

            <div className="about-body-text">
              <p style={{ marginBottom: '1rem' }}>
                I am an aspiring design student driven by a deep curiosity about how everyday objects and visual languages shape human behavior. Throughout my secondary education and independent studio practice, I have dedicated myself to mastering foundational observational drawing, spatial geometry, and hands-on material prototyping.
              </p>
              <p>
                My goal in pursuing a <strong>Bachelor of Design (B.Des)</strong> is to bridge intuitive craft with rigorous design methodology. I believe design education is where raw creative instincts are tested against real-world constraints—transforming personal inquiries into meaningful solutions for people and our living planet.
              </p>
            </div>

            {/* Future Interests & Areas of Study */}
            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.25rem', 
                fontWeight: 700,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <Sparkles size={18} color="var(--accent-terracotta)" />
                Future Inquiries & Academic Interests
              </h3>

              <div className="aspirations-grid">
                <div className="aspiration-card">
                  <div style={{ color: 'var(--accent-terracotta)', marginBottom: '0.5rem' }}>
                    <Leaf size={22} />
                  </div>
                  <h4 className="aspiration-title">Biomimicry & Circular Materials</h4>
                  <p className="aspiration-desc">
                    Investigating natural structures (seed hulls, mycelium, cellulose fibers) to replace single-use petroleum polymers with restorative material cycles.
                  </p>
                </div>

                <div className="aspiration-card">
                  <div style={{ color: 'var(--accent-terracotta)', marginBottom: '0.5rem' }}>
                    <Box size={22} />
                  </div>
                  <h4 className="aspiration-title">Tangible Form & Ergonomics</h4>
                  <p className="aspiration-desc">
                    Exploring how anthropometry and tactile feedback guide unconscious human comfort in domestic products and physical tools.
                  </p>
                </div>

                <div className="aspiration-card">
                  <div style={{ color: 'var(--accent-terracotta)', marginBottom: '0.5rem' }}>
                    <BookOpen size={22} />
                  </div>
                  <h4 className="aspiration-title">Visual Systems & Typography</h4>
                  <p className="aspiration-desc">
                    Studying multi-script typographic architecture and visual clarity in public information design and publishing.
                  </p>
                </div>

                <div className="aspiration-card">
                  <div style={{ color: 'var(--accent-terracotta)', marginBottom: '0.5rem' }}>
                    <Heart size={22} />
                  </div>
                  <h4 className="aspiration-title">Design for Social Impact</h4>
                  <p className="aspiration-desc">
                    Applying participatory design research to craft affordable, dignified tools and systems for underserved communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
