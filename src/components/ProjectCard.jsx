import React from 'react';
import { Maximize2, Layers, Sparkles } from 'lucide-react';

export default function ProjectCard({ project, onSelect }) {
  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  const hasMultiple = images.length > 1;
  const hasThree = images.length > 2;

  return (
    <article 
      className={`project-card ${hasMultiple ? 'is-stacked' : ''}`}
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      aria-label={`View case study: ${project.title}`}
    >
      {/* 2nd Stack Layer (if 3+ images) */}
      {hasThree && (
        <div className="card-stack-layer-2" aria-hidden="true">
          <img 
            src={images[2]} 
            alt="" 
            loading="lazy"
            onError={(e) => { e.target.src = 'portfolio/hands_sketch.jpg'; }}
          />
        </div>
      )}

      {/* 1st Stack Layer (if 2+ images) */}
      {hasMultiple && (
        <div className="card-stack-layer" aria-hidden="true">
          <img 
            src={images[1]} 
            alt="" 
            loading="lazy"
            onError={(e) => { e.target.src = 'portfolio/hands_sketch.jpg'; }}
          />
        </div>
      )}

      {/* Top Main Card Frame */}
      <div className="card-inner-frame">
        {/* Visual Asset Showcase (Top Layer) */}
        <div className="card-image-wrap">
          <img 
            src={images[0]} 
            alt={project.title}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'portfolio/hands_sketch.jpg';
            }}
          />
          
          {/* Stack Indicator Badge */}
          {hasMultiple && (
            <span className="card-stack-badge">
              <Layers size={12} />
              <span>{images.length} Stacked Studies</span>
            </span>
          )}

          {/* Native Resolution Pill */}
          {project.resolution && (
            <span className="card-res-badge">
              {project.resolution}
            </span>
          )}

          {/* Category Pill */}
          <span className="card-category-tag">
            {project.category}
          </span>
        </div>

        {/* Card Content & Rationale */}
        <div className="card-content">
          <div className="card-meta-top">
            <span>{project.medium || project.discipline}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="card-title">{project.title}</h3>

          <p className="card-concept-snip">
            {project.concept}
          </p>

          {/* Tags */}
          <div className="card-tags">
            {project.tags && project.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="card-tag">#{tag}</span>
            ))}
            <span 
              className="card-tag" 
              style={{ 
                marginLeft: 'auto', 
                color: 'var(--accent-terracotta)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Maximize2 size={11} /> {hasMultiple ? `Explore (${images.length})` : 'Case Study'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
