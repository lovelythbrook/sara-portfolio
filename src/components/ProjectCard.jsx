import React from 'react';
import { Maximize2, Sparkles, Layers } from 'lucide-react';

export default function ProjectCard({ project, onSelect }) {
  return (
    <article 
      className="project-card"
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
      {/* Visual Asset Showcase */}
      <div className="card-image-wrap">
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            // Graceful fallback if custom upload path needs adjustments
            e.target.src = 'portfolio/hands_sketch.jpg';
          }}
        />
        
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
            <Maximize2 size={11} /> Case Study
          </span>
        </div>
      </div>
    </article>
  );
}
