import React from 'react';
import { Mail, Camera, Globe, Sparkles, ArrowUp, Lock } from 'lucide-react';

export default function Footer({ onOpenStudio }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="brand-monogram">S</div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
                  Sagarika (Sara)
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-terracotta)', fontWeight: 600 }}>
                  Bachelor of Design (B.Des) Candidate
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '380px', lineHeight: 1.6 }}>
              Observational sketching, structural geometry, biomimetic industrial concepts, and visual typography. Prepared with dedication for undergraduate design school admissions.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="footer-col-title">Navigation</h5>
            <ul className="footer-links">
              <li><a href="#hero" className="footer-link">Home / Overview</a></li>
              <li><a href="#works" className="footer-link">Selected Design Works</a></li>
              <li><a href="#about" className="footer-link">About Sara & Vision</a></li>
              <li><a href="#philosophy" className="footer-link">Design Philosophy</a></li>
              <li>
                <button 
                  onClick={onOpenStudio} 
                  className="footer-link" 
                  style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Lock size={12} /> Sara's Creator Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Admissions Contact & Socials */}
          <div>
            <h5 className="footer-col-title">Admissions & Connect</h5>
            <ul className="footer-links">
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                <Mail size={16} color="var(--accent-terracotta)" />
                <span>sara.designportfolio@gmail.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                <Camera size={16} color="var(--accent-terracotta)" />
                <span>@sara.sketches</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                <Globe size={16} color="var(--accent-terracotta)" />
                <span>Available for B.Des Portfolio Interviews</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sagarika (Sara). All artwork and concepts are original works created for B.Des evaluation.</p>
          
          <button 
            onClick={scrollToTop} 
            className="btn-secondary" 
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} /> Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
