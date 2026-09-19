import React, { useState, useMemo } from 'react';
import { 
  Brain, Plus, Sparkles, Filter, CheckCircle2, 
  Circle, Clock, Target, Rocket, ArrowRight, Eye, 
  Edit3, Trash2, X, AlertCircle, ExternalLink, Award, 
  Compass, ChevronRight 
} from 'lucide-react';
import { SKILL_CATEGORIES, SKILL_STATUSES, SKILL_LEVELS } from '../data/skillsData';
import './Skills.css';

export default function Skills({ skills, setSkills, onNavigate, onSelectFeature, onStartChallengeForSkill }) {
  // Category & Filter State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailSkill, setDetailSkill] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [deletingSkill, setDeletingSkill] = useState(null);

  // Success Feedback Toast
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Web Development',
    level: 'Intermediate',
    progress: 50,
    status: 'In Progress',
    color: '#6366F1'
  });
  const [formErrors, setFormErrors] = useState({});

  // Summary Metrics
  const stats = useMemo(() => {
    const total = skills.length;
    const completed = skills.filter(s => s.status === 'Completed').length;
    const inProgress = skills.filter(s => s.status === 'In Progress').length;
    const notStarted = skills.filter(s => s.status === 'Not Started').length;
    return { total, completed, inProgress, notStarted };
  }, [skills]);

  // Filtered Skills
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || skill.name.toLowerCase().includes(q) || skill.category.toLowerCase().includes(q);
      const matchesCat = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || skill.status === selectedStatus;
      const matchesLevel = selectedLevel === 'All' || skill.level === selectedLevel;

      return matchesQuery && matchesCat && matchesStatus && matchesLevel;
    });
  }, [skills, searchQuery, selectedCategory, selectedStatus, selectedLevel]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Web Development',
      level: 'Intermediate',
      progress: 50,
      status: 'In Progress',
      color: '#6366F1'
    });
    setFormErrors({});
    setAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (skill, e) => {
    e?.stopPropagation();
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      progress: skill.progress,
      status: skill.status,
      color: skill.color || '#6366F1'
    });
    setFormErrors({});
    if (detailSkill) setDetailSkill(null);
    setAddModalOpen(true);
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Skill name is required.';
    const prog = Number(formData.progress);
    if (isNaN(prog) || prog < 0 || prog > 100) {
      errors.progress = 'Progress percentage must be between 0 and 100.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Add / Edit
  const handleSaveSkill = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const progNum = Number(formData.progress);
    const calculatedStatus = progNum === 100 ? 'Completed' : progNum > 0 ? 'In Progress' : 'Not Started';

    if (editingSkill) {
      setSkills(prev => prev.map(s => {
        if (s.id === editingSkill.id) {
          return {
            ...s,
            name: formData.name.trim(),
            category: formData.category,
            level: formData.level,
            progress: progNum,
            status: calculatedStatus,
            color: formData.color
          };
        }
        return s;
      }));
      showToast('Skill updated successfully!');
    } else {
      const newSkill = {
        id: `skill-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category,
        level: formData.level,
        progress: progNum,
        status: calculatedStatus,
        color: formData.color,
        relatedChallenge: 'Self-Paced Sprint',
        relatedProject: 'Capstone Project',
        completedCheckpoints: ['Foundational Syntax & Concepts'],
        roadmap: [
          { step: 1, title: 'Basics & Syntax', done: true },
          { step: 2, title: 'Core Mechanics', done: progNum >= 30 },
          { step: 3, title: 'Intermediate Concepts', done: progNum >= 60 },
          { step: 4, title: 'Advanced Architecture', done: progNum >= 85 },
          { step: 5, title: 'Capstone Implementation', done: progNum === 100 }
        ]
      };
      setSkills(prev => [newSkill, ...prev]);
      showToast('New skill added to your profile!');
    }

    setAddModalOpen(false);
  };

  // Delete Confirmation
  const handleDeleteConfirm = () => {
    if (!deletingSkill) return;
    setSkills(prev => prev.filter(s => s.id !== deletingSkill.id));
    if (detailSkill && detailSkill.id === deletingSkill.id) {
      setDetailSkill(null);
    }
    setDeletingSkill(null);
    showToast('Skill removed from current session.');
  };

  return (
    <div className="skills-page-container">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="skills-toast-banner" role="alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="skills-header-row">
        <div>
          <div className="page-breadcrumb">
            <span>Dashboard</span> / <span className="active">Technical Skills</span>
          </div>
          <h1 className="skills-page-title">My Skills</h1>
          <p className="skills-page-subtitle">
            Build, track, and improve the technical proficiencies that power your career portfolio.
          </p>
        </div>

        <div className="skills-cta-group">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('recommendations')}
          >
            <Compass size={16} />
            <span>Explore Recommendations</span>
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleOpenAdd}
          >
            <Plus size={16} />
            <span>Add Custom Skill</span>
          </button>
        </div>
      </div>

      {/* Summary Statistics Cards (4 Cards) */}
      <div className="skills-stats-grid">
        <div className="glass-card skill-metric-card">
          <div className="s-metric-icon emerald">
            <Brain size={20} />
          </div>
          <div>
            <span className="s-metric-label">Total Skills</span>
            <h3 className="s-metric-value">{stats.total}</h3>
          </div>
        </div>

        <div className="glass-card skill-metric-card">
          <div className="s-metric-icon cyan">
            <Award size={20} />
          </div>
          <div>
            <span className="s-metric-label">Completed</span>
            <h3 className="s-metric-value">{stats.completed}</h3>
          </div>
        </div>

        <div className="glass-card skill-metric-card">
          <div className="s-metric-icon amber">
            <Clock size={20} />
          </div>
          <div>
            <span className="s-metric-label">In Progress</span>
            <h3 className="s-metric-value">{stats.inProgress}</h3>
          </div>
        </div>

        <div className="glass-card skill-metric-card">
          <div className="s-metric-icon purple">
            <Circle size={20} />
          </div>
          <div>
            <span className="s-metric-label">Not Started</span>
            <h3 className="s-metric-value">{stats.notStarted}</h3>
          </div>
        </div>
      </div>

      {/* Category Pill Tabs */}
      <div className="category-tabs-bar">
        <div className="category-pills-row">
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Search & Filter Bar */}
      <div className="glass-card skills-filter-bar">
        <div className="skills-search-box">
          <input 
            type="text"
            placeholder="Search skills by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="skills-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="skills-filter-dropdowns">
          {/* Status Filter */}
          <div className="filter-select-box">
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="skills-select"
            >
              <option value="All">All Statuses</option>
              {SKILL_STATUSES.filter(s => s !== 'All').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="filter-select-box">
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="skills-select"
            >
              <option value="All">All Levels</option>
              {SKILL_LEVELS.filter(l => l !== 'All').map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Skills Cards Grid */}
      {filteredSkills.length > 0 ? (
        <div className="skills-cards-grid">
          {filteredSkills.map(skill => (
            <div 
              key={skill.id}
              className="glass-card skill-card"
              onClick={() => setDetailSkill(skill)}
            >
              <div className="skill-card-top">
                <div className="skill-meta-header">
                  <span className="skill-cat-badge">{skill.category}</span>
                  <span className={`skill-status-tag status-${skill.status.toLowerCase().replace(' ', '-')}`}>
                    {skill.status}
                  </span>
                </div>

                <div className="skill-name-row">
                  <h3 className="skill-card-name">{skill.name}</h3>
                  <span className={`skill-level-tag level-${skill.level.toLowerCase()}`}>
                    {skill.level}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="skill-progress-section">
                <div className="skill-progress-header">
                  <span className="prog-label">Mastery Progress</span>
                  <span className="prog-pct">{skill.progress}%</span>
                </div>
                <div className="skill-track">
                  <div 
                    className="skill-fill"
                    style={{ 
                      width: `${skill.progress}%`,
                      background: `linear-gradient(90deg, ${skill.color || '#6366F1'}90 0%, ${skill.color || '#6366F1'} 100%)`,
                      boxShadow: `0 0 10px ${skill.color || '#6366F1'}40`
                    }}
                  />
                </div>
                <span className="prog-subtext">{skill.progress}% Complete</span>
              </div>

              {/* Related Challenge / Project Tags */}
              <div className="skill-related-tags">
                {skill.relatedChallenge && (
                  <div className="related-item">
                    <Target size={12} className="rel-icon orange" />
                    <span>{skill.relatedChallenge}</span>
                  </div>
                )}
                {skill.relatedProject && (
                  <div className="related-item">
                    <Rocket size={12} className="rel-icon purple" />
                    <span>{skill.relatedProject}</span>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="skill-card-footer" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    className="card-text-btn"
                    onClick={() => setDetailSkill(skill)}
                  >
                    <span>View Details</span>
                    <ChevronRight size={14} />
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onStartChallengeForSkill) {
                        onStartChallengeForSkill(skill.name);
                      } else if (onNavigate) {
                        onNavigate('challenges');
                      }
                    }}
                    style={{ fontSize: '0.75rem', padding: '3px 8px', height: 'auto', borderColor: 'rgba(249, 115, 22, 0.4)', color: '#F97316' }}
                    title="Start a sprint challenge for this skill"
                  >
                    <Target size={12} />
                    <span>Start Challenge</span>
                  </button>
                </div>

                <div className="skill-actions-icons">
                  <button 
                    className="skill-icon-btn"
                    onClick={(e) => handleOpenEdit(skill, e)}
                    title="Edit skill"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    className="skill-icon-btn danger"
                    onClick={() => setDeletingSkill(skill)}
                    title="Remove skill"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-card skills-empty-state">
          <div className="empty-state-icon">
            <Brain size={36} />
          </div>
          <h3>No matching skills found</h3>
          <p>
            Try resetting your category or level filters to view all skills, or add a custom skill to your profile.
          </p>
          <div className="empty-state-actions">
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => { setSelectedCategory('All'); setSelectedStatus('All'); setSelectedLevel('All'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              <span>Add Custom Skill</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: SKILL DETAIL & ROADMAP
         ========================================================================= */}
      {detailSkill && (
        <div className="skills-modal-overlay" role="dialog" aria-modal="true" onClick={() => setDetailSkill(null)}>
          <div className="skill-detail-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="detail-modal-header">
              <div className="detail-title-block">
                <div className="detail-icon-badge" style={{ backgroundColor: `${detailSkill.color || '#6366F1'}20`, color: detailSkill.color || '#6366F1' }}>
                  <Brain size={24} />
                </div>
                <div>
                  <div className="detail-meta-pill-row">
                    <span className="detail-cat-badge">{detailSkill.category}</span>
                    <span className="detail-level-badge">{detailSkill.level}</span>
                  </div>
                  <h2 className="detail-skill-name">{detailSkill.name}</h2>
                </div>
              </div>

              <div className="detail-header-actions">
                <button 
                  className="preview-ctrl-btn"
                  onClick={(e) => handleOpenEdit(detailSkill, e)}
                  title="Edit skill"
                >
                  <Edit3 size={16} />
                </button>
                <button className="modal-close-btn" onClick={() => setDetailSkill(null)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="detail-modal-body">
              {/* Progress Bar */}
              <div className="detail-progress-box">
                <div className="detail-progress-top">
                  <span>Current Mastery Progress</span>
                  <span className="detail-pct">{detailSkill.progress}%</span>
                </div>
                <div className="detail-track">
                  <div 
                    className="detail-fill"
                    style={{ 
                      width: `${detailSkill.progress}%`,
                      backgroundColor: detailSkill.color || '#6366F1' 
                    }}
                  />
                </div>
              </div>

              {/* Completed Milestones Checkpoints */}
              <div className="detail-checkpoints-section">
                <h4 className="detail-section-title">Verified Completed Checkpoints</h4>
                <div className="checkpoints-list">
                  {detailSkill.completedCheckpoints?.map((chk, idx) => (
                    <div key={idx} className="checkpoint-item">
                      <CheckCircle2 size={16} className="chk-icon" />
                      <span>{chk}</span>
                    </div>
                  )) || (
                    <div className="checkpoint-item">
                      <CheckCircle2 size={16} className="chk-icon" />
                      <span>Foundations & Syntax verification</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual 5-Step Learning Roadmap */}
              <div className="detail-roadmap-section">
                <h4 className="detail-section-title">Suggested Learning Roadmap</h4>
                <div className="roadmap-timeline">
                  {detailSkill.roadmap?.map((step, idx) => (
                    <div key={idx} className={`roadmap-step-node ${step.done ? 'done' : 'pending'}`}>
                      <div className="step-circle">
                        {step.done ? <CheckCircle2 size={14} /> : <span>{step.step}</span>}
                      </div>
                      <div className="step-info">
                        <span className="step-name">{step.title}</span>
                        <span className="step-status-sub">{step.done ? 'Completed' : 'Upcoming Milestone'}</span>
                      </div>
                    </div>
                  )) || (
                    <div className="roadmap-step-node done">
                      <div className="step-circle"><CheckCircle2 size={14} /></div>
                      <div className="step-info"><span className="step-name">Fundamentals</span></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Placeholders */}
              <div className="detail-placeholders-grid">
                <div 
                  className="detail-placeholder-box"
                  onClick={() => {
                    const skillName = detailSkill.name;
                    setDetailSkill(null);
                    if (onStartChallengeForSkill) {
                      onStartChallengeForSkill(skillName);
                    } else if (onNavigate) {
                      onNavigate('challenges');
                    }
                  }}
                >
                  <div className="p-box-top">
                    <Target size={16} className="orange" />
                    <span className="p-box-title">Skill Challenge</span>
                  </div>
                  <p className="p-box-name">{detailSkill.relatedChallenge || `${detailSkill.name} Sprint`}</p>
                  <span className="p-box-action" style={{ color: '#F97316' }}>Start Challenge →</span>
                </div>

                <div 
                  className="detail-placeholder-box"
                  onClick={() => {
                    setDetailSkill(null);
                    if (onNavigate) {
                      onNavigate('projects');
                    }
                  }}
                >
                  <div className="p-box-top">
                    <Rocket size={16} className="purple" />
                    <span className="p-box-title">Practical Project</span>
                  </div>
                  <p className="p-box-name">{detailSkill.relatedProject || `${detailSkill.name} Capstone`}</p>
                  <span className="p-box-action" style={{ color: '#A855F7' }}>View Project Workspace →</span>
                </div>
              </div>
            </div>

            <div className="detail-modal-footer">
              <button className="btn btn-secondary btn-sm btn-block" onClick={() => setDetailSkill(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD / EDIT SKILL
         ========================================================================= */}
      {addModalOpen && (
        <div className="skills-modal-overlay" role="dialog" aria-modal="true" onClick={() => setAddModalOpen(false)}>
          <div className="skills-modal-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-group">
                <div className="modal-icon-badge emerald">
                  <Brain size={18} />
                </div>
                <div>
                  <h3 className="modal-title">{editingSkill ? 'Edit Technical Skill' : 'Add New Skill'}</h3>
                  <p className="modal-subtitle">Track your proficiency levels and percentage progress</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="skill-form-body">
              {/* Skill Name */}
              <div className="form-group">
                <label className="form-label">Skill Name <span className="req">*</span></label>
                <input 
                  type="text"
                  placeholder="e.g. Docker, TypeScript, Next.js"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`form-input ${formErrors.name ? 'has-error' : ''}`}
                />
                {formErrors.name && <span className="form-err-msg">{formErrors.name}</span>}
              </div>

              {/* Category & Level Row */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="form-select"
                  >
                    {SKILL_CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Proficiency Level</label>
                  <select 
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                    className="form-select"
                  >
                    {SKILL_LEVELS.filter(l => l !== 'All').map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Progress Slider / Number */}
              <div className="form-group">
                <div className="slider-label-row">
                  <label className="form-label">Mastery Progress <span className="req">*</span></label>
                  <span className="slider-val-badge">{formData.progress}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData(prev => ({ ...prev, progress: Number(e.target.value) }))}
                  className="form-slider"
                />
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  {editingSkill ? 'Save Skill Changes' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: DELETE CONFIRMATION
         ========================================================================= */}
      {deletingSkill && (
        <div className="skills-modal-overlay" role="dialog" aria-modal="true" onClick={() => setDeletingSkill(null)}>
          <div className="delete-dialog-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="delete-icon-box">
              <AlertCircle size={28} />
            </div>
            <h3>Remove this skill?</h3>
            <p className="delete-msg">
              <strong>"{deletingSkill.name}"</strong> will be removed from your active skills library in this session.
            </p>
            <div className="delete-actions-row">
              <button className="btn btn-outline btn-block" onClick={() => setDeletingSkill(null)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-block danger-btn" onClick={handleDeleteConfirm}>
                Remove Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
