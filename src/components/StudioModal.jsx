import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Upload, Image as ImageIcon, Sparkles, Plus, Trash2, 
  Download, CheckCircle, AlertCircle, RefreshCw, Lock, Mail, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function StudioModal({ isOpen, onClose, projects, onProjectAdded, onProjectDeleted }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('sara_studio_auth') === 'true';
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authError, setAuthError] = useState('');

  // Active tab: 'upload' or 'manage'
  const [activeTab, setActiveTab] = useState('upload');

  // Server status state
  const [serverOnline, setServerOnline] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');

  // Form states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [detectedResolution, setDetectedResolution] = useState('');
  const [fileSizeBytes, setFileSizeBytes] = useState(0);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sketches & Studies');
  const [discipline, setDiscipline] = useState('');
  const [medium, setMedium] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [concept, setConcept] = useState('');
  const [tags, setTags] = useState('');
  const [processSteps, setProcessSteps] = useState([
    { title: 'Research & Observation', description: '' },
    { title: 'Material / Form Prototyping', description: '' },
    { title: 'Refinement & Documentation', description: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fileInputRef = useRef(null);

  // Check if local studio server is running
  useEffect(() => {
    if (!isOpen) return;

    fetch('http://localhost:3001/api/status')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'online') {
          setServerOnline(true);
        }
      })
      .catch(() => {
        setServerOnline(false);
      });
  }, [isOpen]);

  // Handle Google / Gmail authentication simulation
  const handleLogin = (e) => {
    e.preventDefault();
    if (!authEmail.trim() || !authEmail.includes('@')) {
      setAuthError('Please enter a valid Gmail address.');
      return;
    }
    // Set authenticated
    localStorage.setItem('sara_studio_auth', 'true');
    localStorage.setItem('sara_studio_email', authEmail.trim());
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('sara_studio_auth');
    localStorage.removeItem('sara_studio_email');
    setIsAuthenticated(false);
  };

  // Handle image selection and calculate resolution
  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP, etc.).');
      return;
    }

    setImageFile(file);
    setFileSizeBytes(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImagePreview(dataUrl);

      // Detect resolution using HTML Image
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const mp = ((w * h) / 1000000).toFixed(1);
        const resString = `${w} × ${h} px (${mp} MP)`;
        setDetectedResolution(resString);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleStepChange = (index, field, value) => {
    const updated = [...processSteps];
    updated[index][field] = value;
    setProcessSteps(updated);
  };

  const addStep = () => {
    setProcessSteps([...processSteps, { title: '', description: '' }]);
  };

  const removeStep = (index) => {
    setProcessSteps(processSteps.filter((_, i) => i !== index));
  };

  // Submit new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a title for the project.');
      return;
    }
    if (!imagePreview) {
      alert('Please upload an image or sketch for the project.');
      return;
    }

    setIsSubmitting(true);
    setFeedbackMsg('');

    try {
      let finalImageUrl = imagePreview;

      // If local server is running, upload file to /public/portfolio/
      if (serverOnline && imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadRes = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          finalImageUrl = uploadData.url;
        }
      }

      const newProject = {
        id: `proj-${Date.now()}`,
        title: title.trim(),
        category,
        discipline: discipline.trim() || category,
        year: year.trim() || new Date().getFullYear().toString(),
        medium: medium.trim() || 'Mixed Media',
        dimensions: dimensions.trim() || 'Variable',
        resolution: detectedResolution || 'Custom Resolution',
        image: finalImageUrl,
        featured: false,
        concept: concept.trim() || 'Observational study and concept exploration.',
        processSteps: processSteps.filter(s => s.title.trim() !== ''),
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      // If server is online, save directly to projects.json
      if (serverOnline) {
        await fetch('http://localhost:3001/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject),
        });
      }

      // Update state in client
      onProjectAdded(newProject);
      setFeedbackMsg('Project successfully added to portfolio!');

      // Reset form
      setTitle('');
      setDiscipline('');
      setMedium('');
      setDimensions('');
      setConcept('');
      setTags('');
      setImageFile(null);
      setImagePreview('');
      setDetectedResolution('');
    } catch (err) {
      alert('Error saving project: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Export updated projects.json file for Git commit
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "projects.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="studio-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Studio Header */}
        <div className="studio-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800 }}>
                Sara’s Creator Studio
              </h3>
              <span className="studio-status-indicator" style={{
                color: serverOnline ? '#10b981' : '#f59e0b',
                background: serverOnline ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                borderColor: serverOnline ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.25)'
              }}>
                {serverOnline ? '● Local Studio Server Active (Git-Ready)' : '○ Client Studio Mode'}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Upload high-resolution design work, document process rationale, and sync to Git for GitHub Pages.
            </p>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close Creator Studio">
            <X size={20} />
          </button>
        </div>

        {/* Auth Barrier if not logged in */}
        {!isAuthenticated ? (
          <div className="studio-body" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--accent-terracotta-glow)',
              color: 'var(--accent-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <ShieldCheck size={32} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Sara's Studio Sign-In
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 2rem', fontSize: '0.9rem' }}>
              Sign in with your Gmail account to manage your B.Des portfolio, upload artwork, and document design concepts.
            </p>

            <form onSubmit={handleLogin} style={{ maxWidth: '380px', margin: '0 auto', textAlign: 'left' }}>
              <div className="form-group">
                <label className="form-label">Gmail / Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    required
                    placeholder="sara.design@gmail.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', width: '100%' }}
                  />
                </div>
              </div>

              {authError && (
                <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{authError}</p>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <span>Access Studio Portal</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Studio Portal */
          <div className="studio-body">
            {/* Tabs & Sign Out */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  Upload New Concept
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
                  onClick={() => setActiveTab('manage')}
                >
                  Manage Portfolio ({projects.length})
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Logged in as <strong style={{ color: 'var(--text-primary)' }}>{localStorage.getItem('sara_studio_email') || 'Sara'}</strong>
                </span>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-terracotta)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>

            {feedbackMsg && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                color: '#10b981',
                fontSize: '0.88rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle size={16} />
                <span>{feedbackMsg}</span>
              </div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' ? (
              <form onSubmit={handleSubmit}>
                {/* Image Dropzone */}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageFile(e.target.files[0]);
                    }
                  }}
                />

                {!imagePreview ? (
                  <div 
                    className="dropzone"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleImageFile(e.dataTransfer.files[0]);
                      }
                    }}
                  >
                    <div className="dropzone-icon">
                      <Upload size={24} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.35rem' }}>
                      Drag & Drop high-resolution design image here
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Supports ultra-high resolution JPG, PNG, WebP, SVG • Dimensions will be auto-calculated
                    </p>
                  </div>
                ) : (
                  <div className="upload-preview-box">
                    <img src={imagePreview} alt="Upload preview" />
                    {detectedResolution && (
                      <div className="detected-res-overlay">
                        📐 Detected Resolution: {detectedResolution} • {(fileSizeBytes / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    )}
                    <button 
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                        setDetectedResolution('');
                      }}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(0,0,0,0.7)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Replace image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Metadata Fields */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Project / Artwork Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Kinetic Shadow Study"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select"
                    >
                      <option value="Sketches & Studies">Sketches & Studies</option>
                      <option value="Form & 3D">Form & 3D</option>
                      <option value="Product & Concept">Product & Concept</option>
                      <option value="Visual Communication">Visual Communication</option>
                      <option value="Experimental Media">Experimental Media</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Discipline / Sub-Category</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Observational Drawing, Clay Form"
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Medium & Materials Used</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Charcoal on 200gsm paper"
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Dimensions / Scale</label>
                    <input 
                      type="text" 
                      placeholder="e.g. A2 Sheet (420 × 594 mm)"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Creation Year</label>
                    <input 
                      type="text" 
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Concept Rationale & Design Problem *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Describe the problem, creative spark, materials, and human interaction..."
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                {/* Process Steps */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Design Thinking & Process Steps (B.Des Focus)</label>
                    <button 
                      type="button" 
                      onClick={addStep}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-terracotta)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Plus size={14} /> Add Step
                    </button>
                  </div>

                  {processSteps.map((step, idx) => (
                    <div key={idx} style={{
                      display: 'grid',
                      gridTemplateColumns: '1.5fr 2.5fr auto',
                      gap: '0.75rem',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <input 
                        type="text"
                        placeholder={`Step ${idx + 1} Title`}
                        value={step.title}
                        onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                        className="form-input"
                        style={{ fontSize: '0.85rem' }}
                      />
                      <input 
                        type="text"
                        placeholder="Description of methodology or experiment"
                        value={step.description}
                        onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
                        className="form-input"
                        style={{ fontSize: '0.85rem' }}
                      />
                      {processSteps.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeStep(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="Anatomy, Form, Charcoal, Prototyping"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Footer Submit Buttons */}
                <div className="studio-footer-actions">
                  <button 
                    type="button"
                    onClick={handleExportJSON}
                    className="btn-secondary"
                    style={{ fontSize: '0.85rem' }}
                    title="Export projects.json to commit to Git"
                  >
                    <Download size={15} />
                    <span>Download projects.json</span>
                  </button>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        <span>Publish Artwork to Portfolio</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Manage Tab */
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Manage existing showcase projects. You can download the updated `projects.json` anytime for Git.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {projects.map((p) => (
                    <div 
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1.25rem',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                          onError={(e) => { e.target.src = 'portfolio/hands_sketch.jpg'; }}
                        />
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{p.title}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-terracotta)' }}>{p.category} • {p.year}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          if (confirm(`Remove "${p.title}" from portfolio?`)) {
                            onProjectDeleted(p.id);
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: 'var(--radius-sm)'
                        }}
                        title="Delete project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                  <button onClick={handleExportJSON} className="btn-secondary">
                    <Download size={16} />
                    <span>Export Latest projects.json</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
