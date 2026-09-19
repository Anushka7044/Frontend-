import React, { useState, useMemo } from 'react';
import { 
  Rocket, Layers, Clock, CheckCircle2, GitBranch, ExternalLink, 
  Plus, X, CheckSquare, Square, AlertCircle, Sparkles, Send, 
  Code2, FileText, ArrowRight, Eye, Check 
} from 'lucide-react';
import { 
  PROJECT_MILESTONES, 
  calculateProjectProgress 
} from '../data/projectsData';
import './Projects.css';

export default function Projects({ 
  projects, 
  setProjects, 
  onNavigate, 
  onProjectCompleted 
}) {
  // Tabs State
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'assigned' | 'in_progress' | 'submitted' | 'completed'

  // Modal States
  const [detailProject, setDetailProject] = useState(null);
  const [submitModalProject, setSubmitModalProject] = useState(null);
  const [submissionPreview, setSubmissionPreview] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Submission Form State
  const [submissionForm, setSubmissionForm] = useState({
    description: '',
    repoUrl: '',
    liveDemoUrl: '',
    whatILearned: '',
    selectedFiles: []
  });
  const [submitError, setSubmitError] = useState('');

  // Statistics
  const totalCount = projects.length;
  const inProgressCount = projects.filter(p => p.status === 'in_progress').length;
  const submittedCount = projects.filter(p => p.status === 'submitted').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projects;
    return projects.filter(p => p.status === activeTab);
  }, [projects, activeTab]);

  // Handle Toggling Checklist Requirement
  const handleToggleRequirement = (projectId, reqId) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      const updatedReqs = p.requirements.map(r => 
        r.id === reqId ? { ...r, completed: !r.completed } : r
      );
      const newProgress = calculateProjectProgress(updatedReqs);

      // Determine Milestone
      let currentMilestone = p.currentMilestone;
      if (newProgress === 0) currentMilestone = 'Planning';
      else if (newProgress < 60) currentMilestone = 'Development';
      else if (newProgress < 85) currentMilestone = 'Testing';
      else if (newProgress < 100) currentMilestone = 'Documentation';
      else currentMilestone = 'Submission';

      const updated = {
        ...p,
        requirements: updatedReqs,
        currentMilestone,
        status: p.status === 'assigned' && newProgress > 0 ? 'in_progress' : p.status
      };

      if (detailProject && detailProject.id === projectId) {
        setDetailProject(updated);
      }
      return updated;
    }));
  };

  // Open Submit Modal
  const handleOpenSubmitModal = (project) => {
    setSubmissionForm({
      description: project.description || '',
      repoUrl: project.submission?.repoUrl || '',
      liveDemoUrl: project.submission?.liveDemoUrl || '',
      whatILearned: project.submission?.whatILearned || '',
      selectedFiles: []
    });
    setSubmitError('');
    setSubmissionPreview(false);
    setSubmitModalProject(project);
  };

  // Validate and Proceed to Preview
  const handleProceedToPreview = (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!submissionForm.description.trim()) {
      setSubmitError('Please provide a short project overview description.');
      return;
    }

    if (!submissionForm.repoUrl.trim()) {
      setSubmitError('Please provide your GitHub repository link.');
      return;
    }

    // Reasonable GitHub URL validation
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/;
    if (!githubRegex.test(submissionForm.repoUrl.trim())) {
      setSubmitError('Please enter a valid GitHub repository URL (e.g. https://github.com/username/project).');
      return;
    }

    if (!submissionForm.whatILearned.trim()) {
      setSubmitError('Please write a brief reflection on "What I Learned".');
      return;
    }

    setSubmissionPreview(true);
  };

  // Submit Project Final Confirmation
  const handleFinalSubmit = () => {
    const today = new Date().toISOString().split('T')[0];

    setProjects(prev => prev.map(p => {
      if (p.id !== submitModalProject.id) return p;

      return {
        ...p,
        status: 'submitted',
        currentMilestone: 'Submission',
        submission: {
          repoUrl: submissionForm.repoUrl.trim(),
          liveDemoUrl: submissionForm.liveDemoUrl.trim(),
          whatILearned: submissionForm.whatILearned.trim(),
          submittedDate: today
        }
      };
    }));

    if (detailProject && detailProject.id === submitModalProject.id) {
      setDetailProject(prev => ({
        ...prev,
        status: 'submitted',
        currentMilestone: 'Submission',
        submission: {
          repoUrl: submissionForm.repoUrl.trim(),
          liveDemoUrl: submissionForm.liveDemoUrl.trim(),
          whatILearned: submissionForm.whatILearned.trim(),
          submittedDate: today
        }
      }));
    }

    setSubmitModalProject(null);
    setSubmissionPreview(false);
    showToast('🎉 Project Submitted! Your practical project has been recorded.');
  };

  // Simulate Reviewer Approval / Mark Completed
  const handleSimulateCompletion = (project) => {
    const today = new Date().toISOString().split('T')[0];

    const completed = {
      ...project,
      status: 'completed',
      currentMilestone: 'Submission',
      submission: {
        ...project.submission,
        completedDate: today
      }
    };

    setProjects(prev => prev.map(p => p.id === project.id ? completed : p));
    setDetailProject(completed);

    if (onProjectCompleted) {
      onProjectCompleted(completed);
    }
  };

  return (
    <div className="projects-page-container">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="notes-toast-notification" role="status" aria-live="polite">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="projects-header-row">
        <div className="projects-title-area">
          <div className="projects-header-icon">
            <Rocket size={24} />
          </div>
          <div>
            <h1 className="projects-page-title">My Projects</h1>
            <p className="projects-page-subtitle">
              Turn your skills into practical projects. Build your verified portfolio.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="projects-stats-grid">
        <div className="glass-card project-stat-card">
          <div className="p-stat-icon-wrapper purple">
            <Rocket size={20} />
          </div>
          <div>
            <span className="p-stat-label">Total Projects</span>
            <div className="p-stat-val">{totalCount}</div>
          </div>
        </div>

        <div className="glass-card project-stat-card">
          <div className="p-stat-icon-wrapper amber">
            <Layers size={20} />
          </div>
          <div>
            <span className="p-stat-label">In Progress</span>
            <div className="p-stat-val">{inProgressCount}</div>
          </div>
        </div>

        <div className="glass-card project-stat-card">
          <div className="p-stat-icon-wrapper cyan">
            <Send size={20} />
          </div>
          <div>
            <span className="p-stat-label">Submitted</span>
            <div className="p-stat-val">{submittedCount}</div>
          </div>
        </div>

        <div className="glass-card project-stat-card">
          <div className="p-stat-icon-wrapper emerald">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="p-stat-label">Completed</span>
            <div className="p-stat-val">{completedCount}</div>
          </div>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="projects-controls-bar">
        <div className="projects-tabs-row" role="tablist">
          <button 
            role="tab"
            aria-selected={activeTab === 'all'}
            className={`project-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span>All Projects</span>
            <span className="tab-badge-pill">{totalCount}</span>
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'in_progress'}
            className={`project-tab-btn ${activeTab === 'in_progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('in_progress')}
          >
            <span>In Progress</span>
            <span className="tab-badge-pill">{inProgressCount}</span>
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'assigned'}
            className={`project-tab-btn ${activeTab === 'assigned' ? 'active' : ''}`}
            onClick={() => setActiveTab('assigned')}
          >
            <span>Assigned</span>
            <span className="tab-badge-pill">{projects.filter(p => p.status === 'assigned').length}</span>
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'submitted'}
            className={`project-tab-btn ${activeTab === 'submitted' ? 'active' : ''}`}
            onClick={() => setActiveTab('submitted')}
          >
            <span>Submitted</span>
            <span className="tab-badge-pill">{submittedCount}</span>
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'completed'}
            className={`project-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <span>Completed</span>
            <span className="tab-badge-pill">{completedCount}</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="projects-cards-grid">
          {filteredProjects.map(project => {
            const progress = calculateProjectProgress(project.requirements);

            return (
              <div key={project.id} className="glass-card project-item-card">
                <div>
                  <div className="project-card-header">
                    <span className="p-skill-badge">
                      <Code2 size={13} />
                      <span>{project.relatedSkill}</span>
                    </span>
                    <span className={`p-status-pill ${project.status}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>

                  <div className="project-card-meta-row">
                    <span className="p-meta-diff">Difficulty: {project.difficulty}</span>
                    <div className="p-meta-deadline">
                      <Clock size={13} />
                      <span>
                        {project.status === 'completed' 
                          ? 'Verified' 
                          : project.daysRemaining > 0 
                            ? `${project.daysRemaining} days remaining` 
                            : 'Due today'}
                      </span>
                    </div>
                  </div>

                  {/* Optional GitHub Repository Field (Requirement 9) */}
                  {project.submission?.repoUrl && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#A5B4FC', marginTop: '0.4rem' }}>
                      <GitBranch size={13} />
                      <span style={{ fontWeight: 600 }}>GitHub:</span>
                      <a 
                        href={project.submission.repoUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ color: '#818CF8', textDecoration: 'underline', wordBreak: 'break-all' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.submission.repoUrl.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/')}
                      </a>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="c-progress-block">
                    <div className="c-progress-header">
                      <span>Checklist Completion</span>
                      <span className="c-progress-pct">{progress}%</span>
                    </div>
                    <div className="c-progress-track">
                      <div 
                        className="c-progress-fill"
                        style={{ 
                          width: `${progress}%`,
                          background: project.status === 'completed'
                            ? 'linear-gradient(90deg, #10B981, #34D399)'
                            : 'linear-gradient(90deg, #A855F7, #C084FC)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="challenge-card-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setDetailProject(project)}
                  >
                    <Eye size={15} />
                    <span>View Project</span>
                  </button>
                  {project.status === 'in_progress' && (
                    <button 
                      className="btn btn-outline"
                      onClick={() => handleOpenSubmitModal(project)}
                    >
                      <Send size={14} />
                      <span>Submit</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="challenges-empty-state">
          <div className="empty-icon-halo" style={{ color: '#A855F7', background: 'rgba(168, 85, 247, 0.1)' }}>
            <Rocket size={32} />
          </div>
          <h3 className="empty-title">Complete a skill challenge to unlock your first project.</h3>
          <p className="empty-sub">
            Practical projects are automatically unlocked as you finish time-boxed skill challenges.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('challenges')}
          >
            <ArrowRight size={16} />
            <span>Go to Challenges</span>
          </button>
        </div>
      )}

      {/* --- MODAL 1: PROJECT DETAIL VIEW --- */}
      {detailProject && (
        <div className="challenge-modal-backdrop" onClick={() => setDetailProject(null)}>
          <div className="challenge-modal-card" style={{ maxWidth: '750px' }} onClick={e => e.stopPropagation()}>
            <div className="challenge-modal-header">
              <div className="c-modal-title-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="p-skill-badge">{detailProject.relatedSkill}</span>
                  <span className={`p-status-pill ${detailProject.status}`}>
                    {detailProject.status.replace('_', ' ')}
                  </span>
                </div>
                <h3>{detailProject.title}</h3>
                <p>{detailProject.description}</p>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setDetailProject(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Congratulations Banner if Completed */}
            {detailProject.status === 'completed' && (
              <div className="project-congrats-banner">
                <h4 className="congrats-title">🎉 Congratulations!</h4>
                <p className="congrats-sub">
                  You completed your challenge and successfully built your project. This verified achievement has been added to your growth journey.
                </p>

                <div className="next-step-recommend-box">
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', textTransform: 'uppercase' }}>
                      What's Next?
                    </span>
                    <strong style={{ color: '#FFFFFF' }}>
                      You completed {detailProject.relatedSkill}. Suggested next skill: Git & GitHub or React.js.
                    </strong>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setDetailProject(null);
                      if (onNavigate) onNavigate('recommendations');
                    }}
                  >
                    <span>Explore Next Skill</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Milestone Pipeline Visual */}
            <div className="milestones-pipeline-track">
              {PROJECT_MILESTONES.map((m, idx) => {
                const milestoneNames = PROJECT_MILESTONES.map(x => x.label);
                const currentIdx = milestoneNames.indexOf(detailProject.currentMilestone || 'Planning');
                const isCompleted = idx < currentIdx || detailProject.status === 'completed';
                const isActive = idx === currentIdx && detailProject.status !== 'completed';

                return (
                  <div 
                    key={m.id}
                    className={`milestone-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                  >
                    <div className="m-circle">
                      {isCompleted ? <Check size={14} /> : m.order}
                    </div>
                    <span>{m.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Requirements Checklist */}
            <div className="requirements-checklist-section">
              <div className="req-header-row">
                <h4 className="req-title">
                  <CheckSquare size={18} style={{ color: '#A855F7' }} />
                  <span>Practical Requirements Checklist</span>
                </h4>
                <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  {detailProject.requirements?.filter(r => r.completed).length || 0} / {detailProject.requirements?.length || 0} complete ({calculateProjectProgress(detailProject.requirements)}%)
                </span>
              </div>

              <div className="req-checklist-list">
                {detailProject.requirements?.map(req => (
                  <button 
                    key={req.id}
                    className={`req-interactive-row ${req.completed ? 'completed' : ''}`}
                    onClick={() => handleToggleRequirement(detailProject.id, req.id)}
                    aria-label={`Toggle requirement ${req.text}`}
                  >
                    {req.completed ? (
                      <CheckSquare size={18} className="task-chk-icon checked" />
                    ) : (
                      <Square size={18} className="task-chk-icon" />
                    )}
                    <span>{req.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submitted Proof Details (if submitted or completed) */}
            {detailProject.submission?.repoUrl && (
              <div className="submitted-proof-box">
                <div className="proof-header">
                  <GitBranch size={16} />
                  <span>Submitted Project Repository</span>
                </div>
                <div className="proof-link-row">
                  <strong>GitHub:</strong>
                  <a 
                    href={detailProject.submission.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="proof-link"
                  >
                    {detailProject.submission.repoUrl}
                  </a>
                </div>
                {detailProject.submission.liveDemoUrl && (
                  <div className="proof-link-row">
                    <strong>Live Demo:</strong>
                    <a 
                      href={detailProject.submission.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="proof-link"
                    >
                      {detailProject.submission.liveDemoUrl}
                    </a>
                  </div>
                )}
                {detailProject.submission.whatILearned && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <strong style={{ color: '#E2E8F0', fontSize: '0.85rem' }}>What I Learned:</strong>
                    <p className="proof-learned-text">"{detailProject.submission.whatILearned}"</p>
                  </div>
                )}
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="challenge-modal-actions">
              {detailProject.status === 'in_progress' && (
                <button 
                  className="btn btn-primary"
                  onClick={() => handleOpenSubmitModal(detailProject)}
                >
                  <Send size={15} />
                  <span>Submit Project</span>
                </button>
              )}

              {detailProject.status === 'submitted' && (
                <button 
                  className="btn btn-primary"
                  onClick={() => handleSimulateCompletion(detailProject)}
                >
                  <CheckCircle2 size={16} />
                  <span>Simulate Approval & Mark Completed</span>
                </button>
              )}

              <button 
                className="btn btn-outline"
                onClick={() => setDetailProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: PROJECT SUBMISSION FORM & PREVIEW --- */}
      {submitModalProject && (
        <div className="challenge-modal-backdrop" onClick={() => setSubmitModalProject(null)}>
          <div className="challenge-modal-card" onClick={e => e.stopPropagation()}>
            <div className="challenge-modal-header">
              <div className="c-modal-title-group">
                <h3>{submissionPreview ? 'Review Your Project Submission' : `Submit: ${submitModalProject.title}`}</h3>
                <p>
                  {submissionPreview 
                    ? 'Review your repository links and reflection before finalizing submission.'
                    : 'Provide your GitHub repository and learnings to verify milestone completion.'}
                </p>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setSubmitModalProject(null)}
                aria-label="Close submission modal"
              >
                <X size={18} />
              </button>
            </div>

            {!submissionPreview ? (
              <form onSubmit={handleProceedToPreview}>
                {submitError && (
                  <div className="missed-day-banner" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#F87171' }}>
                    <AlertCircle size={16} />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="form-field-group">
                  <label htmlFor="submit-desc">Project Description *</label>
                  <textarea 
                    id="submit-desc"
                    rows={3}
                    className="form-textarea-control"
                    value={submissionForm.description}
                    onChange={(e) => setSubmissionForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what your project does..."
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="submit-repo">GitHub Repository Link *</label>
                  <input 
                    id="submit-repo"
                    type="url"
                    className="form-input-control"
                    value={submissionForm.repoUrl}
                    onChange={(e) => setSubmissionForm(prev => ({ ...prev, repoUrl: e.target.value }))}
                    placeholder="https://github.com/username/project-repo"
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="submit-demo">Live Demo URL (Optional)</label>
                  <input 
                    id="submit-demo"
                    type="url"
                    className="form-input-control"
                    value={submissionForm.liveDemoUrl}
                    onChange={(e) => setSubmissionForm(prev => ({ ...prev, liveDemoUrl: e.target.value }))}
                    placeholder="https://my-app.vercel.app (optional)"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="submit-learned">What I Learned *</label>
                  <textarea 
                    id="submit-learned"
                    rows={3}
                    className="form-textarea-control"
                    value={submissionForm.whatILearned}
                    onChange={(e) => setSubmissionForm(prev => ({ ...prev, whatILearned: e.target.value }))}
                    placeholder="What technical obstacles did you overcome? What was the biggest takeaway?"
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="submit-files">Upload Screenshots / Files (Preview Only)</label>
                  <input 
                    id="submit-files"
                    type="file"
                    multiple
                    className="form-input-control"
                    onChange={(e) => {
                      const fileNames = Array.from(e.target.files).map(f => f.name);
                      setSubmissionForm(prev => ({ ...prev, selectedFiles: fileNames }));
                    }}
                  />
                  {submissionForm.selectedFiles.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#38BDF8' }}>
                      Selected files for demo: {submissionForm.selectedFiles.join(', ')}
                    </div>
                  )}
                </div>

                <div className="challenge-modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setSubmitModalProject(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <span>Review Submission</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            ) : (
              /* Review / Preview View */
              <div>
                <div className="challenge-preview-box" style={{ background: 'rgba(168, 85, 247, 0.05)', borderColor: 'rgba(168, 85, 247, 0.25)' }}>
                  <div className="preview-box-title" style={{ color: '#C084FC' }}>
                    <Sparkles size={14} />
                    <span>Review Your Project</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                    <div>
                      <strong style={{ color: '#94A3B8' }}>Project:</strong>{' '}
                      <span style={{ color: '#FFFFFF' }}>{submitModalProject.title}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#94A3B8' }}>Description:</strong>{' '}
                      <p style={{ color: '#E2E8F0', marginTop: '3px' }}>{submissionForm.description}</p>
                    </div>
                    <div>
                      <strong style={{ color: '#94A3B8' }}>GitHub:</strong>{' '}
                      <span style={{ color: '#38BDF8', wordBreak: 'break-all' }}>{submissionForm.repoUrl}</span>
                    </div>
                    {submissionForm.liveDemoUrl && (
                      <div>
                        <strong style={{ color: '#94A3B8' }}>Live Demo:</strong>{' '}
                        <span style={{ color: '#38BDF8' }}>{submissionForm.liveDemoUrl}</span>
                      </div>
                    )}
                    <div>
                      <strong style={{ color: '#94A3B8' }}>What I Learned:</strong>{' '}
                      <p style={{ color: '#E2E8F0', fontStyle: 'italic', marginTop: '3px' }}>"{submissionForm.whatILearned}"</p>
                    </div>
                  </div>
                </div>

                <div className="challenge-modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setSubmissionPreview(false)}
                  >
                    Back to Edit
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleFinalSubmit}
                  >
                    <Send size={15} />
                    <span>Confirm & Submit Project</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
