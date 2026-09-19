import React, { useState } from 'react';
import { 
  Sparkles, Compass, CheckCircle2, Clock, Gauge, 
  FolderGit2, ArrowRight, ArrowLeft, Plus, Check, 
  X, Layers, BookOpen, Brain, Lightbulb 
} from 'lucide-react';
import { RECOMMENDATION_GROUPS, LEARNING_PATH_STEPS } from '../data/recommendationsData';
import './Recommendations.css';

export default function Recommendations({ skills, setSkills, onNavigate }) {
  const [selectedRec, setSelectedRec] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Check if a recommended skill is already in active skills
  const isSkillAlreadyAdded = (skillName) => {
    return skills.some(s => s.name.toLowerCase() === skillName.toLowerCase());
  };

  // Add Recommended Skill to Active Profile
  const handleAddSkillToProfile = (rec) => {
    if (isSkillAlreadyAdded(rec.name)) {
      showToast(`"${rec.name}" is already in your skills library!`);
      return;
    }

    const newSkill = {
      id: `skill-${Date.now()}`,
      name: rec.name,
      category: rec.category,
      level: rec.difficulty.includes('Beginner') ? 'Beginner' : 'Intermediate',
      progress: 0,
      status: 'Not Started',
      color: rec.color || '#6366F1',
      relatedChallenge: `Self-Paced ${rec.name} Sprint`,
      relatedProject: rec.relatedProject,
      completedCheckpoints: ['Enrolled from AI Pathway Recommendation'],
      roadmap: rec.topics ? rec.topics.map((t, idx) => ({ step: idx + 1, title: t, done: false })) : [
        { step: 1, title: 'Basics & Setup', done: false },
        { step: 2, title: 'Core Foundations', done: false },
        { step: 3, title: 'Applied Projects', done: false }
      ]
    };

    setSkills(prev => [newSkill, ...prev]);
    showToast(`"${rec.name}" added to My Skills!`);
    if (selectedRec) setSelectedRec(null);
  };

  return (
    <div className="recs-page-container">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="recs-toast-banner" role="alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="recs-header-row">
        <div>
          <div className="page-breadcrumb">
            <span onClick={() => onNavigate('dashboard')} className="crumb-link">Dashboard</span> / 
            <span onClick={() => onNavigate('skills')} className="crumb-link"> My Skills</span> / 
            <span className="active"> Recommended Pathways</span>
          </div>
          <h1 className="recs-page-title">Recommended Skills</h1>
          <p className="recs-page-subtitle">
            Curated technical skills that logically complement what you are currently studying and building.
          </p>
        </div>

        <button 
          className="btn btn-outline btn-sm"
          onClick={() => onNavigate('skills')}
        >
          <ArrowLeft size={16} />
          <span>Back to My Skills</span>
        </button>
      </div>

      {/* Visual Learning Path Progression Flow */}
      <div className="glass-card learning-path-banner">
        <div className="path-banner-header">
          <div className="path-badge">
            <Sparkles size={15} />
            <span>Frontend & Fullstack Pathway</span>
          </div>
          <span className="path-subtext">Step-by-step verified curriculum</span>
        </div>

        <div className="path-nodes-flow">
          {LEARNING_PATH_STEPS.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className={`path-step-item ${step.status}`}>
                <div className="step-badge-indicator">
                  {step.status === 'completed' && <CheckCircle2 size={16} />}
                  {step.status === 'current' && <span className="pulsing-radar" />}
                  {step.status === 'recommended' && <Lightbulb size={16} />}
                  {step.status === 'locked' && <span className="locked-dot" />}
                  <span className="step-label-tag">{step.label}</span>
                </div>
                <h4 className="step-tech-name">{step.name}</h4>
                <span className="step-tier-text">{step.level}</span>
              </div>

              {idx < LEARNING_PATH_STEPS.length - 1 && (
                <div className={`path-connector-line ${step.status === 'completed' ? 'active' : ''}`}>
                  <ArrowRight size={18} className="connector-arrow" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Categorized Recommendation Groups */}
      <div className="recs-groups-container">
        {RECOMMENDATION_GROUPS.map(group => (
          <section key={group.groupId} className="rec-group-section">
            <div className="group-heading-block">
              <h2 className="group-title">{group.groupTitle}</h2>
              <p className="group-sub">{group.groupSubtitle}</p>
            </div>

            <div className="recommendations-grid">
              {group.items.map(rec => {
                const alreadyAdded = isSkillAlreadyAdded(rec.name);

                return (
                  <div key={rec.id} className="glass-card recommendation-card-item">
                    <div className="rec-card-top">
                      <div className="rec-category-row">
                        <span className="rec-cat-pill">{rec.category}</span>
                        <span className="rec-priority-tag">{rec.priority}</span>
                      </div>

                      <h3 className="rec-card-name">{rec.name}</h3>
                    </div>

                    {/* "Why This Skill?" Explanation Box */}
                    <div className="rec-why-box">
                      <div className="why-header">
                        <Lightbulb size={15} className="why-bulb-icon" />
                        <span className="why-title">Why this skill?</span>
                      </div>
                      <p className="why-text">{rec.why}</p>
                    </div>

                    {/* Specs Grid */}
                    <div className="rec-specs-list">
                      <div className="spec-row">
                        <Gauge size={14} className="spec-icon" />
                        <span className="spec-label">Difficulty:</span>
                        <span className="spec-val">{rec.difficulty}</span>
                      </div>
                      <div className="spec-row">
                        <Clock size={14} className="spec-icon" />
                        <span className="spec-label">Estimated:</span>
                        <span className="spec-val">{rec.duration}</span>
                      </div>
                      <div className="spec-row">
                        <FolderGit2 size={14} className="spec-icon" />
                        <span className="spec-label">Related Project:</span>
                        <span className="spec-val highlight">{rec.relatedProject}</span>
                      </div>
                    </div>

                    {/* Prerequisites */}
                    <div className="rec-prereqs-row">
                      <span className="prereq-label">Prerequisites:</span>
                      <div className="prereq-tags">
                        {rec.prerequisites.map(p => (
                          <span key={p} className="prereq-chip">{p}</span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="rec-card-footer">
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedRec(rec)}
                      >
                        Explore Curriculum
                      </button>

                      <button 
                        className={`btn btn-sm ${alreadyAdded ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => handleAddSkillToProfile(rec)}
                        disabled={alreadyAdded}
                      >
                        {alreadyAdded ? (
                          <>
                            <Check size={14} />
                            <span>In My Skills</span>
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            <span>Add to My Skills</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* =========================================================================
          MODAL: EXPLORE RECOMMENDATION DETAIL
         ========================================================================= */}
      {selectedRec && (
        <div className="recs-modal-overlay" role="dialog" aria-modal="true" onClick={() => setSelectedRec(null)}>
          <div className="rec-detail-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="rec-modal-header">
              <div className="rec-modal-title-group">
                <div className="rec-modal-icon-badge" style={{ backgroundColor: `${selectedRec.color || '#6366F1'}20`, color: selectedRec.color || '#6366F1' }}>
                  <Sparkles size={22} />
                </div>
                <div>
                  <div className="rec-modal-meta">
                    <span className="cat">{selectedRec.category}</span>
                    <span className="diff">{selectedRec.difficulty}</span>
                  </div>
                  <h3 className="rec-modal-name">{selectedRec.name} Curriculum</h3>
                </div>
              </div>

              <button className="modal-close-btn" onClick={() => setSelectedRec(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="rec-modal-body">
              {/* Rationale Banner */}
              <div className="rec-modal-rationale">
                <div className="rationale-header">
                  <Lightbulb size={16} />
                  <span>Recommendation Rationale</span>
                </div>
                <p>{selectedRec.why}</p>
              </div>

              {/* Topics / Modules Breakdown */}
              <div className="rec-topics-section">
                <h4 className="rec-section-title">Core Modules Included</h4>
                <div className="topics-pill-grid">
                  {selectedRec.topics?.map((topic, index) => (
                    <div key={topic} className="topic-grid-item">
                      <span className="topic-num">0{index + 1}</span>
                      <span className="topic-title">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Project Idea */}
              <div className="rec-project-idea-box">
                <div className="idea-header">
                  <FolderGit2 size={18} className="purple" />
                  <div>
                    <h5 className="idea-title">Target Portfolio Project</h5>
                    <span className="idea-sub">Hands-on application to verify your mastery</span>
                  </div>
                </div>
                <p className="idea-name"><strong>{selectedRec.relatedProject}</strong></p>
                <p className="idea-desc">
                  Building this project will demonstrate client-side scripting and asynchronous data handling directly in your developer resume.
                </p>
              </div>
            </div>

            <div className="rec-modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedRec(null)}>
                Close
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => handleAddSkillToProfile(selectedRec)}
                disabled={isSkillAlreadyAdded(selectedRec.name)}
              >
                {isSkillAlreadyAdded(selectedRec.name) ? 'Already Added to Profile' : 'Add to My Skills Tree'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
