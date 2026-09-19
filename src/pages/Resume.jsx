import React, { useState, useMemo } from 'react';
import { 
  FileText, CheckCircle2, AlertCircle, Plus, Trash2, 
  ExternalLink, Download, Save, RefreshCw, Eye, Edit3, 
  Sparkles, ChevronDown, ChevronUp, Code2, Rocket, Trophy, 
  Award, Briefcase, GraduationCap, Globe, Mail, Phone, MapPin, 
  Github, Linkedin, CheckSquare, Square
} from 'lucide-react';
import { 
  INITIAL_RESUME_DATA, 
  calculateResumeCompleteness 
} from '../data/careerData';
import './Resume.css';

export default function Resume({ 
  resumeData, 
  setResumeData, 
  skills = [], 
  projects = [], 
  achievements = [], 
  user 
}) {
  // Mobile active tab: 'editor' | 'preview'
  const [mobileTab, setMobileTab] = useState('editor');

  // Accordion open/closed sections state
  const [openSections, setOpenSections] = useState({
    personal: true,
    summary: true,
    education: true,
    skills: true,
    projects: true,
    achievements: false,
    certifications: false,
    experience: false,
    extra: false
  });

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Completeness score
  const completeness = useMemo(() => {
    return calculateResumeCompleteness(resumeData);
  }, [resumeData]);

  // Handle Input Changes for Personal Info
  const handlePersonalInfoChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Handle Summary Change
  const handleSummaryChange = (value) => {
    setResumeData(prev => ({
      ...prev,
      professionalSummary: value
    }));
  };

  // Skill Selection Handlers
  const handleToggleSkill = (skillName) => {
    setResumeData(prev => {
      const current = prev.selectedSkillIds || [];
      const updated = current.includes(skillName)
        ? current.filter(s => s !== skillName)
        : [...current, skillName];
      return { ...prev, selectedSkillIds: updated };
    });
  };

  // Project Selection Handlers
  const handleToggleProject = (projectId) => {
    setResumeData(prev => {
      const current = prev.selectedProjectIds || [];
      const updated = current.includes(projectId)
        ? current.filter(id => id !== projectId)
        : [...current, projectId];
      return { ...prev, selectedProjectIds: updated };
    });
  };

  // Achievement Selection Handlers
  const handleToggleAchievement = (achId) => {
    setResumeData(prev => {
      const current = prev.selectedAchievementIds || [];
      const updated = current.includes(achId)
        ? current.filter(id => id !== achId)
        : [...current, achId];
      return { ...prev, selectedAchievementIds: updated };
    });
  };

  // Education Entry Handlers
  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      college: 'Engineering Institute of Technology',
      degree: 'B.Tech',
      course: 'Computer Science & Engineering',
      startYear: '2024',
      expectedGraduation: '2028',
      cgpa: '8.42 / 10.0',
      relevantCoursework: 'Data Structures, DBMS, Operating Systems'
    };
    setResumeData(prev => ({
      ...prev,
      education: [...(prev.education || []), newEdu]
    }));
  };

  const handleUpdateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: (prev.education || []).map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleDeleteEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: (prev.education || []).filter(edu => edu.id !== id)
    }));
  };

  // Certifications Handlers
  const handleAddCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: 'Cloud Foundations / Web Architecture',
      organization: 'AWS / Coursera',
      issueDate: '2026',
      credentialLink: 'https://verify.cert'
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert]
    }));
  };

  const handleUpdateCertification = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const handleDeleteCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter(cert => cert.id !== id)
    }));
  };

  // Experience Handlers
  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      organization: 'Technical Coding Club',
      role: 'Student Software Developer',
      startDate: '2025',
      endDate: 'Present',
      description: 'Developed automated problem testing scripts and organized peer hackathons.'
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...(prev.experience || []), newExp]
    }));
  };

  const handleUpdateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleDeleteExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).filter(exp => exp.id !== id)
    }));
  };

  // Save Resume Handler
  const handleSaveResume = () => {
    try {
      localStorage.setItem('studyhub_resume', JSON.stringify(resumeData));
      showToast('Resume saved successfully! All data synced with career profile.');
    } catch {
      showToast('Resume saved for this session.');
    }
  };

  // Reset to Platform Defaults
  const handleResetResume = () => {
    if (window.confirm('Reset resume to auto-populated platform defaults? Any custom edits will be replaced.')) {
      setResumeData(INITIAL_RESUME_DATA);
      showToast('Resume reset to platform defaults.');
    }
  };

  // Print PDF Trigger
  const handlePrintPDF = () => {
    window.print();
  };

  // Map selected project IDs to full project objects from Stage 5
  const selectedProjects = useMemo(() => {
    const selectedIds = resumeData?.selectedProjectIds || [];
    return projects.filter(p => selectedIds.includes(p.id));
  }, [projects, resumeData?.selectedProjectIds]);

  // Map selected achievement IDs to full achievement objects from Stage 5
  const selectedAchievements = useMemo(() => {
    const selectedIds = resumeData?.selectedAchievementIds || [];
    return achievements.filter(a => selectedIds.includes(a.id));
  }, [achievements, resumeData?.selectedAchievementIds]);

  return (
    <div className="resume-page-container">
      {/* Toast */}
      {toastMessage && (
        <div className="resume-toast" role="status">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="resume-top-header">
        <div className="resume-header-title-block">
          <h1>
            <FileText size={26} color="#6366F1" />
            <span>Resume Builder</span>
          </h1>
          <p>
            Convert your verified skills, projects, and achievements into an ATS-friendly software developer resume.
          </p>
        </div>

        <div className="resume-header-actions">
          <button 
            className="btn btn-outline btn-sm"
            onClick={handleResetResume}
            title="Reset to default platform data"
          >
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={handlePrintPDF}
            title="Download PDF or print via browser"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>

          <button 
            className="btn btn-primary btn-sm"
            onClick={handleSaveResume}
          >
            <Save size={14} />
            <span>Save Resume</span>
          </button>
        </div>
      </div>

      {/* Resume Completeness Gauge Card */}
      <section className="resume-completeness-card" aria-label="Resume Completeness Score">
        <div className="completeness-left">
          <div className="completeness-gauge-box">
            <span>{completeness.percentage}%</span>
          </div>

          <div className="completeness-info">
            <h4>Resume Completeness</h4>
            <p>
              {completeness.completedChecks} of {completeness.totalChecks} key ATS benchmark sections completed.
            </p>
            <div className="completeness-bar-track">
              <div 
                className="completeness-bar-fill" 
                style={{ width: `${completeness.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {completeness.missingItems.length > 0 && (
          <div className="completeness-missing-box">
            <span className="missing-tagline">Suggestions to reach 100%:</span>
            <div className="missing-pills-row">
              {completeness.missingItems.map((item, idx) => (
                <span key={idx} className="missing-pill">+ Add {item}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Mobile Toggle Tabs */}
      <div className="resume-mobile-view-tabs" role="tablist">
        <button 
          role="tab"
          aria-selected={mobileTab === 'editor'}
          className={`resume-mobile-tab-btn ${mobileTab === 'editor' ? 'active' : ''}`}
          onClick={() => setMobileTab('editor')}
        >
          <Edit3 size={15} />
          <span>Resume Editor</span>
        </button>
        <button 
          role="tab"
          aria-selected={mobileTab === 'preview'}
          className={`resume-mobile-tab-btn ${mobileTab === 'preview' ? 'active' : ''}`}
          onClick={() => setMobileTab('preview')}
        >
          <Eye size={15} />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main 2-Column Split View */}
      <div className="resume-split-view">
        {/* =================================================================
            LEFT COLUMN: RESUME EDITOR
            ================================================================= */}
        <div className={`resume-editor-pane ${mobileTab === 'preview' ? 'mobile-hidden' : ''}`}>
          {/* Section 1: Personal Information */}
          <div className="editor-section-card">
            <div 
              className={`editor-section-header ${openSections.personal ? 'open' : ''}`}
              onClick={() => toggleSection('personal')}
            >
              <div className="editor-header-title-group">
                <Globe size={18} color="#6366F1" />
                <h3>Personal Information</h3>
                <span className="editor-section-badge">Header & Contact</span>
              </div>
              {openSections.personal ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </div>

            {openSections.personal && (
              <div className="editor-section-body">
                <div className="form-grid-2">
                  <div className="resume-form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      className="resume-input"
                      value={resumeData?.personalInfo?.fullName || ''}
                      onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                      placeholder="Anushka Ray"
                    />
                  </div>

                  <div className="resume-form-group">
                    <label>Professional Headline *</label>
                    <input 
                      type="text" 
                      className="resume-input"
                      value={resumeData?.personalInfo?.headline || ''}
                      onChange={(e) => handlePersonalInfoChange('headline', e.target.value)}
                      placeholder="Computer Science Student | Software Developer"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="resume-form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      className="resume-input"
                      value={resumeData?.personalInfo?.email || ''}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      placeholder="anushka.ray@college.edu"
                    />
                  </div>

                  <div className="resume-form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      className="resume-input"
                      value={resumeData?.personalInfo?.phone || ''}
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="resume-form-group">
                    <label>Location *</label>
                    <input 
                      type="text" 
                      className="resume-input"
                      value={resumeData?.personalInfo?.location || ''}
                      onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                      placeholder="Kolkata, West Bengal, India"
                    />
                  </div>

                  <div className="resume-form-group">
                    <label>GitHub Profile *</label>
                    <input 
                      type="text" 
                      className="resume-input"
                      value={resumeData?.personalInfo?.github || ''}
                      onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                      placeholder="github.com/anushka-sharma"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="resume-form-group">
                    <label>LinkedIn Profile</label>
                    <input 
                      type="text" 
                      className="resume-input"
                      value={resumeData?.personalInfo?.linkedin || ''}
                      onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/anushka-ray"
                    />
                  </div>

                  <div className="resume-form-group">
                    <label>Portfolio / Website</label>
                    <input 
                      type="text" 
                      className="resume-input"
                      value={resumeData?.personalInfo?.portfolio || ''}
                      onChange={(e) => handlePersonalInfoChange('portfolio', e.target.value)}
                      placeholder="anushka-dev.pages.dev"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Professional Summary */}
          <div className="editor-section-card">
            <div 
              className={`editor-section-header ${openSections.summary ? 'open' : ''}`}
              onClick={() => toggleSection('summary')}
            >
              <div className="editor-header-title-group">
                <FileText size={18} color="#10B981" />
                <h3>Professional Summary</h3>
              </div>
              {openSections.summary ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </div>

            {openSections.summary && (
              <div className="editor-section-body">
                <div className="resume-form-group">
                  <label>Summary Statement</label>
                  <textarea 
                    className="resume-textarea"
                    rows={4}
                    value={resumeData?.professionalSummary || ''}
                    onChange={(e) => handleSummaryChange(e.target.value)}
                    placeholder="Write a short professional summary highlighting your technical strengths and career goals..."
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    A concise 2–3 sentence overview tailored for engineering internship recruiters.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Education */}
          <div className="editor-section-card">
            <div 
              className={`editor-section-header ${openSections.education ? 'open' : ''}`}
              onClick={() => toggleSection('education')}
            >
              <div className="editor-header-title-group">
                <GraduationCap size={18} color="#06B6D4" />
                <h3>Education</h3>
                <span className="editor-section-badge">{(resumeData?.education || []).length}</span>
              </div>
              {openSections.education ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </div>

            {openSections.education && (
              <div className="editor-section-body">
                <div className="editor-items-list">
                  {(resumeData?.education || []).map((edu) => (
                    <div key={edu.id} className="editor-item-card">
                      <div className="item-card-top-row">
                        <span className="item-card-title">{edu.college || 'Institution'}</span>
                        <button 
                          className="item-delete-btn"
                          onClick={() => handleDeleteEducation(edu.id)}
                          title="Delete education entry"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="form-grid-2">
                        <div className="resume-form-group">
                          <label>College / University</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={edu.college}
                            onChange={(e) => handleUpdateEducation(edu.id, 'college', e.target.value)}
                          />
                        </div>
                        <div className="resume-form-group">
                          <label>Degree & Major</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={edu.degree}
                            onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="resume-form-group">
                          <label>Field of Study</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={edu.course}
                            onChange={(e) => handleUpdateEducation(edu.id, 'course', e.target.value)}
                          />
                        </div>
                        <div className="resume-form-group">
                          <label>CGPA / Percentage</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={edu.cgpa}
                            onChange={(e) => handleUpdateEducation(edu.id, 'cgpa', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="resume-form-group">
                          <label>Start Year</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={edu.startYear}
                            onChange={(e) => handleUpdateEducation(edu.id, 'startYear', e.target.value)}
                          />
                        </div>
                        <div className="resume-form-group">
                          <label>Expected Graduation</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={edu.expectedGraduation}
                            onChange={(e) => handleUpdateEducation(edu.id, 'expectedGraduation', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="resume-form-group">
                        <label>Relevant Coursework</label>
                        <input 
                          type="text" 
                          className="resume-input"
                          value={edu.relevantCoursework}
                          onChange={(e) => handleUpdateEducation(edu.id, 'relevantCoursework', e.target.value)}
                          placeholder="e.g. DSA, DBMS, Operating Systems, Networks"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="btn btn-outline btn-sm"
                  onClick={handleAddEducation}
                >
                  <Plus size={14} />
                  <span>Add Education Entry</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 4: Technical Skills (Auto-populated from Stage 4) */}
          <div className="editor-section-card">
            <div 
              className={`editor-section-header ${openSections.skills ? 'open' : ''}`}
              onClick={() => toggleSection('skills')}
            >
              <div className="editor-header-title-group">
                <Code2 size={18} color="#A855F7" />
                <h3>Technical Skills</h3>
                <span className="editor-section-badge">
                  {(resumeData?.selectedSkillIds || []).length} Selected
                </span>
              </div>
              {openSections.skills ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </div>

            {openSections.skills && (
              <div className="editor-section-body">
                <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Click to select or unselect verified skills from your Stage 4 Learning System:
                </p>

                <div className="skills-picker-box">
                  {skills.map((skill) => {
                    const isSelected = (resumeData?.selectedSkillIds || []).includes(skill.name);
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

                <div className="resume-form-group">
                  <label>Additional Skills / Tools (Comma-separated)</label>
                  <input 
                    type="text" 
                    className="resume-input"
                    value={resumeData?.customSkills || ''}
                    onChange={(e) => setResumeData({ ...resumeData, customSkills: e.target.value })}
                    placeholder="REST APIs, Tailwind CSS, Docker, Linux"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Projects (Auto-populated from Stage 5) */}
          <div className="editor-section-card">
            <div 
              className={`editor-section-header ${openSections.projects ? 'open' : ''}`}
              onClick={() => toggleSection('projects')}
            >
              <div className="editor-header-title-group">
                <Rocket size={18} color="#F59E0B" />
                <h3>Projects</h3>
                <span className="editor-section-badge">
                  {(resumeData?.selectedProjectIds || []).length} Selected
                </span>
              </div>
              {openSections.projects ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </div>

            {openSections.projects && (
              <div className="editor-section-body">
                <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Select completed or active projects from your Stage 5 Project System:
                </p>

                <div className="editor-items-list">
                  {projects.map((proj) => {
                    const isSelected = (resumeData?.selectedProjectIds || []).includes(proj.id);
                    return (
                      <div 
                        key={proj.id} 
                        className={`editor-item-card selectable ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleToggleProject(proj.id)}
                      >
                        <div className="item-card-top-row">
                          <span className="item-card-title">
                            {isSelected ? (
                              <CheckSquare size={17} color="#6366F1" />
                            ) : (
                              <Square size={17} color="#64748B" />
                            )}
                            <span>{proj.title}</span>
                          </span>
                          <span className="editor-section-badge">{proj.relatedSkill}</span>
                        </div>
                        <p className="item-card-desc">{proj.description}</p>
                        {proj.submission?.repoUrl && (
                          <span style={{ fontSize: '0.75rem', color: '#818CF8' }}>
                            GitHub: {proj.submission.repoUrl}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Section 6: Achievements & Honors (Auto-populated from Stage 5) */}
          <div className="editor-section-card">
            <div 
              className={`editor-section-header ${openSections.achievements ? 'open' : ''}`}
              onClick={() => toggleSection('achievements')}
            >
              <div className="editor-header-title-group">
                <Trophy size={18} color="#F97316" />
                <h3>Achievements & Honors</h3>
                <span className="editor-section-badge">
                  {(resumeData?.selectedAchievementIds || []).length} Selected
                </span>
              </div>
              {openSections.achievements ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </div>

            {openSections.achievements && (
              <div className="editor-section-body">
                <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Select verified badges from your Stage 5 Achievement System:
                </p>

                <div className="skills-picker-box">
                  {achievements.filter(a => a.unlocked).map((ach) => {
                    const isSelected = (resumeData?.selectedAchievementIds || []).includes(ach.id);
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
            )}
          </div>

          {/* Section 7: Certifications */}
          <div className="editor-section-card">
            <div 
              className={`editor-section-header ${openSections.certifications ? 'open' : ''}`}
              onClick={() => toggleSection('certifications')}
            >
              <div className="editor-header-title-group">
                <Award size={18} color="#EC4899" />
                <h3>Certifications</h3>
                <span className="editor-section-badge">
                  {(resumeData?.certifications || []).length}
                </span>
              </div>
              {openSections.certifications ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </div>

            {openSections.certifications && (
              <div className="editor-section-body">
                <div className="editor-items-list">
                  {(resumeData?.certifications || []).map((cert) => (
                    <div key={cert.id} className="editor-item-card">
                      <div className="item-card-top-row">
                        <span className="item-card-title">{cert.name}</span>
                        <button 
                          className="item-delete-btn"
                          onClick={() => handleDeleteCertification(cert.id)}
                          title="Delete certification"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="form-grid-2">
                        <div className="resume-form-group">
                          <label>Certification Name</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={cert.name}
                            onChange={(e) => handleUpdateCertification(cert.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="resume-form-group">
                          <label>Issuing Organization</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={cert.organization}
                            onChange={(e) => handleUpdateCertification(cert.id, 'organization', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="resume-form-group">
                          <label>Issue Date</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={cert.issueDate}
                            onChange={(e) => handleUpdateCertification(cert.id, 'issueDate', e.target.value)}
                          />
                        </div>
                        <div className="resume-form-group">
                          <label>Credential Verification URL</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={cert.credentialLink}
                            onChange={(e) => handleUpdateCertification(cert.id, 'credentialLink', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="btn btn-outline btn-sm"
                  onClick={handleAddCertification}
                >
                  <Plus size={14} />
                  <span>Add Certification</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 8: Experience / Leadership */}
          <div className="editor-section-card">
            <div 
              className={`editor-section-header ${openSections.experience ? 'open' : ''}`}
              onClick={() => toggleSection('experience')}
            >
              <div className="editor-header-title-group">
                <Briefcase size={18} color="#38BDF8" />
                <h3>Experience & Leadership</h3>
                <span className="editor-section-badge">
                  {(resumeData?.experience || []).length}
                </span>
              </div>
              {openSections.experience ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </div>

            {openSections.experience && (
              <div className="editor-section-body">
                <div className="editor-items-list">
                  {(resumeData?.experience || []).map((exp) => (
                    <div key={exp.id} className="editor-item-card">
                      <div className="item-card-top-row">
                        <span className="item-card-title">{exp.role}</span>
                        <button 
                          className="item-delete-btn"
                          onClick={() => handleDeleteExperience(exp.id)}
                          title="Delete experience"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="form-grid-2">
                        <div className="resume-form-group">
                          <label>Role / Position</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={exp.role}
                            onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                          />
                        </div>
                        <div className="resume-form-group">
                          <label>Organization / Club</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={exp.organization}
                            onChange={(e) => handleUpdateExperience(exp.id, 'organization', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="resume-form-group">
                          <label>Start Date</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={exp.startDate}
                            onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="resume-form-group">
                          <label>End Date</label>
                          <input 
                            type="text" 
                            className="resume-input"
                            value={exp.endDate}
                            onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="resume-form-group">
                        <label>Description & Responsibilities</label>
                        <textarea 
                          className="resume-textarea"
                          rows={2}
                          value={exp.description}
                          onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="btn btn-outline btn-sm"
                  onClick={handleAddExperience}
                >
                  <Plus size={14} />
                  <span>Add Experience Entry</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 9: Extra Sections */}
          <div className="editor-section-card">
            <div 
              className={`editor-section-header ${openSections.extra ? 'open' : ''}`}
              onClick={() => toggleSection('extra')}
            >
              <div className="editor-header-title-group">
                <Sparkles size={18} color="#F43F5E" />
                <h3>Additional Information</h3>
                <span className="editor-section-badge">Optional</span>
              </div>
              {openSections.extra ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </div>

            {openSections.extra && (
              <div className="editor-section-body">
                <div className="resume-form-group">
                  <label>Languages</label>
                  <input 
                    type="text" 
                    className="resume-input"
                    value={resumeData?.extraSections?.languages || ''}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      extraSections: { ...resumeData.extraSections, languages: e.target.value }
                    })}
                    placeholder="English (Fluent), Hindi (Native), Bengali (Fluent)"
                  />
                </div>

                <div className="resume-form-group">
                  <label>Interests & Hobbies</label>
                  <input 
                    type="text" 
                    className="resume-input"
                    value={resumeData?.extraSections?.interests || ''}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      extraSections: { ...resumeData.extraSections, interests: e.target.value }
                    })}
                    placeholder="Open Source, Distributed Systems, UI/UX Design"
                  />
                </div>

                <div className="resume-form-group">
                  <label>Volunteer Experience</label>
                  <input 
                    type="text" 
                    className="resume-input"
                    value={resumeData?.extraSections?.volunteer || ''}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      extraSections: { ...resumeData.extraSections, volunteer: e.target.value }
                    })}
                    placeholder="Student Mentor for 1st Year Programming Lab"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =================================================================
            RIGHT COLUMN: LIVE ATS-FRIENDLY RESUME PREVIEW
            ================================================================= */}
        <div className={`resume-preview-pane ${mobileTab === 'editor' ? 'mobile-hidden' : ''}`}>
          <div className="preview-top-toolbar">
            <span>ATS-Friendly Developer Resume Format • Live Sync Active</span>
            <button 
              className="btn btn-outline btn-sm"
              onClick={handlePrintPDF}
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}
            >
              <Download size={13} />
              <span>Print / PDF</span>
            </button>
          </div>

          {/* White Paper Canvas */}
          <article className="preview-paper-card" id="printable-resume">
            {/* Header / Contact */}
            <header className="paper-header">
              <h1 className="paper-name">{resumeData?.personalInfo?.fullName || 'ANUSHKA RAY'}</h1>
              {resumeData?.personalInfo?.headline && (
                <div className="paper-headline">{resumeData.personalInfo.headline}</div>
              )}

              <div className="paper-contact-line">
                {resumeData?.personalInfo?.email && (
                  <span>{resumeData.personalInfo.email}</span>
                )}
                {resumeData?.personalInfo?.phone && (
                  <span>• {resumeData.personalInfo.phone}</span>
                )}
                {resumeData?.personalInfo?.location && (
                  <span>• {resumeData.personalInfo.location}</span>
                )}
                {resumeData?.personalInfo?.github && (
                  <span>• <a href={`https://${resumeData.personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">{resumeData.personalInfo.github}</a></span>
                )}
                {resumeData?.personalInfo?.linkedin && (
                  <span>• <a href={`https://${resumeData.personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">{resumeData.personalInfo.linkedin}</a></span>
                )}
                {resumeData?.personalInfo?.portfolio && (
                  <span>• <a href={`https://${resumeData.personalInfo.portfolio.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">{resumeData.personalInfo.portfolio}</a></span>
                )}
              </div>
            </header>

            {/* Summary */}
            {resumeData?.professionalSummary && (
              <section className="paper-section">
                <h2 className="paper-section-title">SUMMARY</h2>
                <p className="paper-summary-text">{resumeData.professionalSummary}</p>
              </section>
            )}

            {/* Education */}
            {resumeData?.education && resumeData.education.length > 0 && (
              <section className="paper-section">
                <h2 className="paper-section-title">EDUCATION</h2>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="paper-entry">
                    <div className="paper-entry-header">
                      <span className="paper-entry-left">{edu.college}</span>
                      <span className="paper-entry-right">
                        {edu.startYear} – {edu.expectedGraduation}
                      </span>
                    </div>
                    <div className="paper-entry-sub">
                      <span>{edu.degree} in {edu.course}</span>
                      <span>CGPA: {edu.cgpa}</span>
                    </div>
                    {edu.relevantCoursework && (
                      <div className="paper-entry-desc">
                        <strong>Coursework:</strong> {edu.relevantCoursework}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Technical Skills */}
            {((resumeData?.selectedSkillIds && resumeData.selectedSkillIds.length > 0) || resumeData?.customSkills) && (
              <section className="paper-section">
                <h2 className="paper-section-title">SKILLS</h2>
                <div className="paper-skills-list">
                  {resumeData?.selectedSkillIds && resumeData.selectedSkillIds.length > 0 && (
                    <div style={{ marginBottom: '0.2rem' }}>
                      <span className="paper-skills-category">Core Technologies: </span>
                      <span>{resumeData.selectedSkillIds.join(', ')}</span>
                    </div>
                  )}
                  {resumeData?.customSkills && (
                    <div>
                      <span className="paper-skills-category">Additional Skills & Tools: </span>
                      <span>{resumeData.customSkills}</span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Projects */}
            {selectedProjects.length > 0 && (
              <section className="paper-section">
                <h2 className="paper-section-title">PROJECTS</h2>
                {selectedProjects.map((proj) => (
                  <div key={proj.id} className="paper-entry">
                    <div className="paper-entry-header">
                      <span className="paper-entry-left">
                        {proj.title} | <span style={{ fontWeight: 400, fontStyle: 'italic', fontSize: '9.5pt' }}>{proj.relatedSkill}</span>
                      </span>
                      <span className="paper-entry-right">
                        {proj.submission?.repoUrl ? (
                          <a href={proj.submission.repoUrl} target="_blank" rel="noreferrer" style={{ color: '#1E3A8A' }}>
                            GitHub Link
                          </a>
                        ) : 'Verified Project'}
                      </span>
                    </div>
                    <p className="paper-entry-desc">{proj.description}</p>
                    {proj.submission?.liveDemoUrl && (
                      <div style={{ fontSize: '9.2pt', marginTop: '0.15rem' }}>
                        <strong>Live Demo: </strong>
                        <a href={proj.submission.liveDemoUrl} target="_blank" rel="noreferrer" style={{ color: '#1E3A8A' }}>
                          {proj.submission.liveDemoUrl}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Achievements */}
            {selectedAchievements.length > 0 && (
              <section className="paper-section">
                <h2 className="paper-section-title">HONORS & ACHIEVEMENTS</h2>
                <ul style={{ paddingLeft: '1.2rem', margin: '0.2rem 0', fontSize: '10pt' }}>
                  {selectedAchievements.map((ach) => (
                    <li key={ach.id} style={{ marginBottom: '0.25rem' }}>
                      <strong>{ach.title}</strong>: {ach.description} ({ach.unlockedDate || 'Verified'})
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Experience */}
            {resumeData?.experience && resumeData.experience.length > 0 && (
              <section className="paper-section">
                <h2 className="paper-section-title">EXPERIENCE & LEADERSHIP</h2>
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="paper-entry">
                    <div className="paper-entry-header">
                      <span className="paper-entry-left">{exp.role}</span>
                      <span className="paper-entry-right">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="paper-entry-sub">
                      <span>{exp.organization}</span>
                    </div>
                    <p className="paper-entry-desc">{exp.description}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {resumeData?.certifications && resumeData.certifications.length > 0 && (
              <section className="paper-section">
                <h2 className="paper-section-title">CERTIFICATIONS</h2>
                <ul style={{ paddingLeft: '1.2rem', margin: '0.2rem 0', fontSize: '10pt' }}>
                  {resumeData.certifications.map((cert) => (
                    <li key={cert.id} style={{ marginBottom: '0.25rem' }}>
                      <strong>{cert.name}</strong> — {cert.organization} ({cert.issueDate})
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Additional Information */}
            {(resumeData?.extraSections?.languages || resumeData?.extraSections?.interests || resumeData?.extraSections?.volunteer) && (
              <section className="paper-section">
                <h2 className="paper-section-title">ADDITIONAL INFORMATION</h2>
                <div style={{ fontSize: '9.8pt', lineHeight: 1.4 }}>
                  {resumeData.extraSections.languages && (
                    <div><strong>Languages:</strong> {resumeData.extraSections.languages}</div>
                  )}
                  {resumeData.extraSections.interests && (
                    <div><strong>Interests:</strong> {resumeData.extraSections.interests}</div>
                  )}
                  {resumeData.extraSections.volunteer && (
                    <div><strong>Volunteer:</strong> {resumeData.extraSections.volunteer}</div>
                  )}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
