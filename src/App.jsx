import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import StudioModal from './components/StudioModal';

import initialProjects from './data/projects.json';

export default function App() {
  // Theme state: 'dark' (default) or 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sara_portfolio_theme') || 'dark';
  });

  // Projects state initialized with local storage cache or bundled JSON
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('sara_portfolio_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached projects', e);
      }
    }
    return initialProjects;
  });

  // Active modals
  const [selectedProject, setSelectedProject] = useState(null);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Sync theme changes to html data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sara_portfolio_theme', theme);
  }, [theme]);

  // Sync project changes to localStorage for offline persistence
  useEffect(() => {
    localStorage.setItem('sara_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleProjectAdded = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleProjectDeleted = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(null);
    }
  };

  return (
    <div className="portfolio-app">
      {/* Navigation Header */}
      <Navbar 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenStudio={() => setIsStudioOpen(true)}
        projectCount={projects.length}
      />

      <main>
        {/* Editorial Hero */}
        <Hero 
          onSelectFeatured={() => {
            const featured = projects.find(p => p.featured) || projects[0];
            setSelectedProject(featured);
          }}
        />

        {/* Selected Works Gallery */}
        <Gallery 
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* About Sara, Academic Vision & Statement of Purpose */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer onOpenStudio={() => setIsStudioOpen(true)} />

      {/* Project Case Study Viewer Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Sara's Creator Studio Modal */}
      <StudioModal 
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        projects={projects}
        onProjectAdded={handleProjectAdded}
        onProjectDeleted={handleProjectDeleted}
      />
    </div>
  );
}
