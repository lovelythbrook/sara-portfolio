import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { Filter, Search, Sparkles } from 'lucide-react';

export default function Gallery({ projects, onSelectProject }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = useMemo(() => {
    const list = ['All'];
    projects.forEach((p) => {
      if (p.category && !list.includes(p.category)) {
        list.push(p.category);
      }
    });
    return list;
  }, [projects]);

  // Filter projects by category and search
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCat = selectedCategory === 'All' || project.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags && project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="works" className="gallery-section">
      <div className="container">
        {/* Section Header */}
        <div className="gallery-header">
          <div>
            <span className="editorial-tag">Selected Works & Explorations</span>
            <h2 className="section-title">Design Portfolio & Form Inquiries</h2>
            <p className="section-subtitle">
              A curated selection of observational sketches, physical prototypes, material experiments, 
              and visual systems illustrating iterative design thinking for B.Des admission.
            </p>
          </div>

          {/* Filtering and Search Controls */}
          <div className="gallery-controls">
            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-muted)' 
                }} 
              />
              <input 
                type="text"
                placeholder="Search medium, concept..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ 
                  paddingLeft: '2.4rem', 
                  paddingTop: '0.5rem', 
                  paddingBottom: '0.5rem', 
                  fontSize: '0.82rem', 
                  width: '100%',
                  borderRadius: 'var(--radius-pill)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredProjects.length > 0 ? (
          <div className="gallery-grid">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onSelect={onSelectProject} 
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)'
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              No design projects match "{searchQuery}" in this category.
            </p>
            <button 
              className="btn-secondary" 
              style={{ marginTop: '1rem' }}
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
