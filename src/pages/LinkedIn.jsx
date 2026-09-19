import React, { useState, useMemo } from 'react';
import { 
  Linkedin, CheckCircle2, AlertCircle, Plus, Trash2, 
  ExternalLink, Edit3, Eye, Save, Sparkles, MapPin, 
  GraduationCap, Rocket, Trophy, Award, Briefcase, 
  Code2, Target, Globe, Compass, CheckSquare, Square, Check
} from 'lucide-react';
import { calculateLinkedInStrength } from '../data/careerData';
import './LinkedIn.css';

export default function LinkedIn({ 
  linkedinData, 
  setLinkedinData, 
  skills = [], 
  projects = [], 
  achievements = [], 
  user,
  onNavigate 
}) {
  // Active Tab: 'preview' | 'editor'
  const [activeTab, setActiveTab] = useState('preview');

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Calculate Profile Strength & Suggestions
  const strengthInfo = useMemo(() => {
    return calculateLinkedInStrength(linkedinData);
  }, [linkedinData]);

  // Handle Basic Info Input
  const handleBasicChange = (field, value) => {
    setLinkedinData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
  };

  // Handle Career Interests Input
  const handleInterestChange = (field, value) => {
    setLinkedinData(prev => ({
      ...prev,
      careerInterests: {
        ...prev.careerInterests,
        [field]: value
      }
    }));
  };

  // Toggle Skills
  const handleToggleSkill = (skillName) => {
    setLinkedinData(prev => {
      const current = prev.selectedSkillIds || [];
      const updated = current.includes(skillName)
        ? current.filter(s => s !== skillName)
        : [...current, skillName];
      return { ...prev, selectedSkillIds: updated };
    });
  };

  // Toggle Projects
  const handleToggleProject = (projectId) => {
    setLinkedinData(prev => {
      const current = prev.selectedProjectIds || [];
      const updated = current.includes(projectId)
        ? current.filter(id => id !== projectId)
        : [...current, projectId];
      return { ...prev, selectedProjectIds: updated };
    });
  };

  // Toggle Achievements
  const handleToggleAchievement = (achId) => {
    setLinkedinData(prev => {
      const current = prev.selectedAchievementIds || [];
      const updated = current.includes(achId)
        ? current.filter(id => id !== achId)
        : [...current, achId];
      return { ...prev, selectedAchievementIds: updated };
    });
  };

  // Save LinkedIn Data
  const handleSave = () => {
    try {
      localStorage.setItem('studyhub_linkedin', JSON.stringify(linkedinData));
      showToast('LinkedIn profile saved successfully!');
    } catch {
      showToast('LinkedIn profile updated.');
    }
  };

  // Map selected projects and achievements
  const selectedProjects = useMemo(() => {
    const ids = linkedinData?.selectedProjectIds || [];
    return projects.filter(p => ids.includes(p.id));
  }, [projects, linkedinData?.selectedProjectIds]);

  const selectedAchievements = useMemo(() => {
    const ids = linkedinData?.selectedAchievementIds || [];
    return achievements.filter(a => ids.includes(a.id));
  }, [achievements, linkedinData?.selectedAchievementIds]);

  return (
    <div className="linkedin-page-container">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="linkedin-toast" role="status">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="linkedin-top-header">
        <div className="linkedin-title-block">
          <h1>
            <Linkedin size={26} color="#0EA5E9" />
            <span>LinkedIn Profile Optimizer</span>
          </h1>
          <p>
            Curate an industry-ready LinkedIn profile showcasing your growth journey, projects, and career interests.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {linkedinData?.basicInfo?.linkedinUrl && (
            <a 
              href={linkedinData.basicInfo.linkedinUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-outline btn-sm"
            >
              <Linkedin size={15} />
              <span>Open LinkedIn</span>
              <ExternalLink size={13} />
            </a>
          )}

          <button 
            className="btn btn-primary btn-sm"
            onClick={handleSave}
          >
            <Save size={14} />
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      {/* LinkedIn Profile Strength & Suggestions Card (Requirement 20) */}
      <section className="linkedin-strength-card" aria-label="LinkedIn Profile Strength">
        <div className="strength-top-row">
          <div className="strength-gauge-group">
            <div className="strength-pct-pill">
              <span>{strengthInfo.percentage}%</span>
            </div>

            <div className="strength-meta-text">
              <h3>LinkedIn Profile Strength</h3>
              <p>
                {strengthInfo.percentage >= 75 
                  ? 'All-Star status reached! Your profile stands out to tech recruiters.' 
                  : 'Intermediate strength. Complete the items below to reach recruiter benchmark.'}
              </p>
            </div>
          </div>
        </div>

        <div className="strength-progress-track">
          <div 
            className="strength-progress-fill" 
            style={{ width: `${strengthInfo.percentage}%` }}
          />
        </div>

        {/* Checklist & Improvement Suggestions */}
        <div className="strength-details-grid">
          <div className="checklist-column">
            <h4>Profile Checklist</h4>
            <div className="checklist-items-grid">
              {strengthInfo.checks.map((chk, i) => (
                <div key={i} className={`strength-check-item ${chk.valid ? 'valid' : ''}`}>
                  {chk.valid ? (
                    <CheckCircle2 size={15} color="#10B981" />
                  ) : (
                    <span style={{ color: '#64748B' }}>○</span>
                  )}
                  <span>{chk.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="suggestions-column">
            <h4>Suggestions to improve your profile</h4>
            <div className="suggestions-list">
              {strengthInfo.suggestions.map((sug, i) => (
                <div key={i} className="suggestion-item">
                  <Sparkles size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{sug}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* View Switch Tabs */}
      <div className="linkedin-view-tabs" role="tablist">
        <button 
          role="tab"
          aria-selected={activeTab === 'preview'}
          className={`linkedin-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye size={16} />
          <span>LinkedIn Preview</span>
        </button>

        <button 
          role="tab"
          aria-selected={activeTab === 'editor'}
          className={`linkedin-tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          <Edit3 size={16} />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* =================================================================
          VIEW 1: LINKEDIN-INSPIRED PROFILE PREVIEW (Requirement 19)
          ================================================================= */}
      {activeTab === 'preview' && (
        <div className="linkedin-preview-container">
          {/* Main Identity Card */}
          <article className="linkedin-main-card">
            <div className="linkedin-banner" />

            <div className="linkedin-avatar-container">
              <div className="linkedin-avatar-circle">
                <span>{linkedinData?.basicInfo?.fullName ? linkedinData.basicInfo.fullName.slice(0, 2).toUpperCase() : 'AR'}</span>
              </div>
            </div>

            <div className="linkedin-card-content">
              <div className="linkedin-identity-header">
                <div>
                  <h2 className="linkedin-fullname">{linkedinData?.basicInfo?.fullName || 'Anushka Ray'}</h2>
                  <p className="linkedin-headline-text">
                    {linkedinData?.basicInfo?.headline || 'CSE Student @ EIT | Full-Stack & Python Developer'}
                  </p>
                  <div className="linkedin-location-line">
                    <MapPin size={14} />
                    <span>{linkedinData?.basicInfo?.location || 'Kolkata, West Bengal, India'}</span>
                  </div>
                </div>

                <div className="linkedin-identity-actions">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveTab('editor')}
                  >
                    <Edit3 size={14} />
                    <span>Edit Profile</span>
                  </button>

                  {linkedinData?.basicInfo?.linkedinUrl && (
                    <a 
                      href={linkedinData.basicInfo.linkedinUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <span>Open LinkedIn</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>

              {/* Open to Work Badge */}
              <div className="linkedin-open-to-work-box">
                <span className="open-badge-title">Open to work</span>
                <span className="open-badge-detail">
                  Target roles: {linkedinData?.careerInterests?.interestedRoles || 'Software Engineering Intern, Frontend Developer'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  {linkedinData?.careerInterests?.preferredWorkType || 'Internship / Hybrid'}
                </span>
              </div>
            </div>
          </article>

          {/* About Card */}
          {linkedinData?.basicInfo?.about && (
            <article className="linkedin-section-card">
              <h3 className="section-card-title">About</h3>
              <p className="about-card-text">{linkedinData.basicInfo.about}</p>
            </article>
          )}

          {/* Career Interests Card */}
          <article className="linkedin-section-card">
            <h3 className="section-card-title">
              <Compass size={18} color="#0EA5E9" />
              <span>Career Interests & Aspirations</span>
            </h3>
            <div className="interests-preview-grid">
              <div className="interest-preview-item">
                <span className="interest-lbl">Interested Roles</span>
                <p className="interest-val">{linkedinData?.careerInterests?.interestedRoles || 'Software Engineer Intern'}</p>
              </div>

              <div className="interest-preview-item">
                <span className="interest-lbl">Preferred Domains</span>
                <p className="interest-val">{linkedinData?.careerInterests?.preferredDomains || 'Web Dev, Cloud'}</p>
              </div>

              <div className="interest-preview-item">
                <span className="interest-lbl">Preferred Work Type</span>
                <p className="interest-val">{linkedinData?.careerInterests?.preferredWorkType || 'Internship / Remote'}</p>
              </div>

              <div className="interest-preview-item">
                <span className="interest-lbl">Career Goal</span>
                <p className="interest-val">{linkedinData?.careerInterests?.careerGoal || 'Build production-scale software'}</p>
              </div>
            </div>
          </article>

          {/* Education Card */}
          <article className="linkedin-section-card">
            <h3 className="section-card-title">
              <GraduationCap size={18} color="#6366F1" />
              <span>Education</span>
            </h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', color: '#818CF8' }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F8FAFC' }}>
                  {user?.college || 'Engineering Institute of Technology'}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#94A3B8' }}>
                  {user?.course || 'B.Tech Computer Science & Engineering'}
                </p>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  2024 – 2028 (Expected) • Current CGPA: 8.42
                </span>
              </div>
            </div>
          </article>

          {/* Projects Card */}
          {selectedProjects.length > 0 && (
            <article className="linkedin-section-card">
              <h3 className="section-card-title">
                <Rocket size={18} color="#F59E0B" />
                <span>Featured Projects</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {selectedProjects.map((proj) => (
                  <div key={proj.id} className="linkedin-proj-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="proj-title-link">
                        <span>{proj.title}</span>
                        {proj.submission?.repoUrl && (
                          <a href={proj.submission.repoUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </span>
                      <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.06)', color: '#A5B4FC' }}>
                        {proj.relatedSkill}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.45 }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Skills Card */}
          {linkedinData?.selectedSkillIds && linkedinData.selectedSkillIds.length > 0 && (
            <article className="linkedin-section-card">
              <h3 className="section-card-title">
                <Code2 size={18} color="#10B981" />
                <span>Skills & Endorsements</span>
              </h3>
              <div className="linkedin-skills-flow">
                {linkedinData.selectedSkillIds.map((skillName, idx) => (
                  <div key={idx} className="linkedin-skill-badge">
                    <Check size={13} color="#10B981" />
                    <span>{skillName}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Honors & Awards Card */}
          {selectedAchievements.length > 0 && (
            <article className="linkedin-section-card">
              <h3 className="section-card-title">
                <Trophy size={18} color="#F97316" />
                <span>Honors & Awards</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedAchievements.map((ach) => (
                  <div key={ach.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(249, 115, 22, 0.1)', color: '#F97316' }}>
                      <Trophy size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F8FAFC' }}>{ach.title}</h4>
                      <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>{ach.description}</p>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Issued by Student Growth Platform</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          )}
        </div>
      )}

      {/* =================================================================
          VIEW 2: LINKEDIN PROFILE EDITOR (Requirement 18)
          ================================================================= */}
      {activeTab === 'editor' && (
        <div className="linkedin-editor-box">
          {/* Group 1: Basic Information */}
          <div className="editor-group-card">
            <div className="group-header-row">
              <Globe size={18} color="#0EA5E9" />
              <h3>Basic Information</h3>
            </div>

            <div className="form-grid-2">
              <div className="resume-form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  className="resume-input"
                  value={linkedinData?.basicInfo?.fullName || ''}
                  onChange={(e) => handleBasicChange('fullName', e.target.value)}
                />
              </div>

              <div className="resume-form-group">
                <label>LinkedIn Profile URL *</label>
                <input 
                  type="url" 
                  className="resume-input"
                  value={linkedinData?.basicInfo?.linkedinUrl || ''}
                  onChange={(e) => handleBasicChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/anushka-ray"
                />
              </div>
            </div>

            <div className="resume-form-group">
              <label>Professional Headline *</label>
              <input 
                type="text" 
                className="resume-input"
                value={linkedinData?.basicInfo?.headline || ''}
                onChange={(e) => handleBasicChange('headline', e.target.value)}
                placeholder="CSE Student @ EIT | Full-Stack & Python Developer"
              />
            </div>

            <div className="resume-form-group">
              <label>Location *</label>
              <input 
                type="text" 
                className="resume-input"
                value={linkedinData?.basicInfo?.location || ''}
                onChange={(e) => handleBasicChange('location', e.target.value)}
                placeholder="Kolkata, West Bengal, India"
              />
            </div>

            <div className="resume-form-group">
              <label>About Summary</label>
              <textarea 
                className="resume-textarea"
                rows={4}
                value={linkedinData?.basicInfo?.about || ''}
                onChange={(e) => handleBasicChange('about', e.target.value)}
                placeholder="Write an engaging overview of your technical interests and career ambition..."
              />
            </div>
          </div>

          {/* Group 2: Career Interests */}
          <div className="editor-group-card">
            <div className="group-header-row">
              <Compass size={18} color="#6366F1" />
              <h3>Career Interests</h3>
            </div>

            <div className="form-grid-2">
              <div className="resume-form-group">
                <label>Interested Roles</label>
                <input 
                  type="text" 
                  className="resume-input"
                  value={linkedinData?.careerInterests?.interestedRoles || ''}
                  onChange={(e) => handleInterestChange('interestedRoles', e.target.value)}
                  placeholder="Software Engineer Intern, Frontend Developer"
                />
              </div>

              <div className="resume-form-group">
                <label>Preferred Domains</label>
                <input 
                  type="text" 
                  className="resume-input"
                  value={linkedinData?.careerInterests?.preferredDomains || ''}
                  onChange={(e) => handleInterestChange('preferredDomains', e.target.value)}
                  placeholder="Web Development, Cloud, AI/ML"
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="resume-form-group">
                <label>Preferred Work Type</label>
                <input 
                  type="text" 
                  className="resume-input"
                  value={linkedinData?.careerInterests?.preferredWorkType || ''}
                  onChange={(e) => handleInterestChange('preferredWorkType', e.target.value)}
                  placeholder="Internship / Hybrid / Remote"
                />
              </div>

              <div className="resume-form-group">
                <label>Career Goal</label>
                <input 
                  type="text" 
                  className="resume-input"
                  value={linkedinData?.careerInterests?.careerGoal || ''}
                  onChange={(e) => handleInterestChange('careerGoal', e.target.value)}
                  placeholder="Secure a high-impact engineering internship"
                />
              </div>
            </div>
          </div>

          {/* Group 3: Select Skills from Stage 4 */}
          <div className="editor-group-card">
            <div className="group-header-row">
              <Code2 size={18} color="#10B981" />
              <h3>Skills & Endorsements</h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
              Select skills from your Stage 4 Learning System to display on LinkedIn:
            </p>

            <div className="skills-picker-box">
              {skills.map((skill) => {
                const isSelected = (linkedinData?.selectedSkillIds || []).includes(skill.name);
                return (
                  <button
                    key={skill.id}
                    type="button"
                    className={`skill-chip-select ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleSkill(skill.name)}
                  >
                    {isSelected ? <CheckCircle2 size={13} /> : <Plus size={13} />}
                    <span>{skill.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 4: Select Projects from Stage 5 */}
          <div className="editor-group-card">
            <div className="group-header-row">
              <Rocket size={18} color="#F59E0B" />
              <h3>Showcase Projects</h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
              Select completed projects from Stage 5 to showcase on your LinkedIn profile:
            </p>

            <div className="editor-items-list">
              {projects.map((proj) => {
                const isSelected = (linkedinData?.selectedProjectIds || []).includes(proj.id);
                return (
                  <div 
                    key={proj.id} 
                    className={`editor-item-card selectable ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleProject(proj.id)}
                  >
                    <div className="item-card-top-row">
                      <span className="item-card-title">
                        {isSelected ? <CheckSquare size={16} color="#0EA5E9" /> : <Square size={16} color="#64748B" />}
                        <span>{proj.title}</span>
                      </span>
                      <span className="editor-section-badge">{proj.relatedSkill}</span>
                    </div>
                    <p className="item-card-desc">{proj.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 5: Select Achievements from Stage 5 */}
          <div className="editor-group-card">
            <div className="group-header-row">
              <Trophy size={18} color="#F97316" />
              <h3>Honors & Awards</h3>
            </div>

            <div className="skills-picker-box">
              {achievements.filter(a => a.unlocked).map((ach) => {
                const isSelected = (linkedinData?.selectedAchievementIds || []).includes(ach.id);
                return (
                  <button
                    key={ach.id}
                    type="button"
                    className={`skill-chip-select ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleAchievement(ach.id)}
                  >
                    {isSelected ? <CheckCircle2 size={13} /> : <Plus size={13} />}
                    <span>{ach.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => setActiveTab('preview')}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => {
                handleSave();
                setActiveTab('preview');
              }}
            >
              <Save size={15} />
              <span>Save & View Profile</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
