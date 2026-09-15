import React, { useState } from 'react';
import { Sparkles, Sun, Moon, Lock, Menu, X, Compass } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, onOpenStudio, projectCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        {/* Brand */}
        <a href="#hero" className="brand-logo">
          <div className="brand-monogram">S</div>
          <div className="brand-text">
            <span className="brand-name">Sagarika (Sara)</span>
            <span className="brand-badge">B.Des Candidate • Design Portfolio</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="#works" className="nav-link">Selected Works ({projectCount})</a>
          </li>
          <li>
            <a href="#about" className="nav-link">About Sara & Vision</a>
          </li>
          <li>
            <a href="#philosophy" className="nav-link">Design Philosophy</a>
          </li>
          <li>
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>

        {/* Actions (Theme + Studio Button) */}
        <div className="nav-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={onToggleTheme} 
            title={theme === 'dark' ? 'Switch to Warm Gallery Light' : 'Switch to Editorial Dark'}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            className="studio-access-btn" 
            onClick={onOpenStudio}
            title="Open Sara's Creator Studio (Upload artwork & concepts)"
          >
            <Lock size={13} />
            <span>Studio Access</span>
          </button>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#works" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>Selected Works</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-terracotta)' }}>{projectCount}</span>
          </a>
          <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>About Sara & Vision</span>
          </a>
          <a href="#philosophy" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>Design Philosophy</span>
          </a>
          <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>Contact & Connect</span>
          </a>
          <button 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.85rem' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenStudio();
            }}
          >
            <Lock size={14} /> Sara's Creator Studio
          </button>
        </div>
      )}
    </nav>
  );
}
