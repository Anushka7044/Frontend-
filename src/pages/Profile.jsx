import React, { useState, useMemo } from 'react';
import { 
  User, Edit3, Mail, Phone, MapPin, Globe, Github, 
  Linkedin, GraduationCap, Trophy, Rocket, Code2, 
  CheckCircle2, Compass, ArrowRight, ExternalLink, 
  Sparkles, X, Star, Calendar, BarChart3
} from 'lucide-react';
import { 
  calculateCareerReadiness, 
  calculateProfileCompleteness, 
  getCareerChecklist,
  calculateResumeCompleteness,
  calculateLinkedInStrength
} from '../data/careerData';
import './Profile.css';

export default function Profile({ 
  user, 
  setUser, 
  skills = [], 
  challenges = [], 
  projects = [], 
  achievements = [], 
  semesters = [],
  githubData, 
  resumeData, 
  linkedinData, 
  onNavigate 
}) {
  // Active showcase tab: 'skills' | 'projects' | 'achievements' | 'academics'
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('skills');

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || 'Anushka Ray',
    bio: user?.bio || 'CSE Student at Engineering Institute of Technology. Passionate about software architecture, algorithms, and practical web applications.',
    careerGoal: user?.careerGoal || 'Software Engineering Intern | Full Stack Developer',
    college: user?.college || 'Engineering Institute of Technology',
    course: user?.course || 'B.Tech Computer Science & Engineering',
    year: user?.year || '2nd Year',
    semester: user?.semester || 'Semester 4',
    email: user?.email || 'anushka.ray@college.edu',
    phone: user?.phone || '+91 98765 43210',
    github: resumeData?.personalInfo?.github || 'github.com/anushka-sharma',
    linkedin: resumeData?.personalInfo?.linkedin || 'linkedin.com/in/anushka-ray',
    portfolio: resumeData?.personalInfo?.portfolio || 'anushka-dev.pages.dev'
  });

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Profile Completeness
  const profileCompleteness = useMemo(() => {
    return calculateProfileCompleteness(user, resumeData, linkedinData, projects, skills);
  }, [user, resumeData, linkedinData, projects, skills]);

  // Career Readiness Pillar Metrics
  const readiness = useMemo(() => {
    const resumeScore = calculateResumeCompleteness(resumeData).percentage;
    const linkedinScore = calculateLinkedInStrength(linkedinData).percentage;
    return calculateCareerReadiness({
      skills,
      projects,
      achievements,
      githubData,
      resumeCompleteness: resumeScore,
      linkedinStrength: linkedinScore
    });
  }, [skills, projects, achievements, githubData, resumeData, linkedinData]);

  // 9-Step Career Checklist
  const careerChecklist = useMemo(() => {
    return getCareerChecklist({
      skills,
      challenges,
      projects,
      achievements,
      resumeData,
      linkedinData
    });
  }, [skills, challenges, projects, achievements, resumeData, linkedinData]);

  // Handle Edit Profile Submission
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name: editForm.name,
      bio: editForm.bio,
      careerGoal: editForm.careerGoal,
      college: editForm.college,
      course: editForm.course,
      year: editForm.year,
      semester: editForm.semester,
      email: editForm.email,
      phone: editForm.phone
    };

    if (setUser) setUser(updated);
    try {
      localStorage.setItem('studyhub_user', JSON.stringify(updated));
    } catch (e) {}

    setIsEditModalOpen(false);
    showToast('Professional career profile updated successfully!');
  };

  const studentName = user?.name || 'Anushka Ray';
  const completedProjects = projects.filter(p => p.status === 'completed');

  return (
    <div className="profile-page-container">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="notes-toast-notification" role="status">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile Hero Banner Card */}
      <section className="profile-hero-card" aria-label="Student Identity Card">
        <div className="profile-banner-bg" />

        <div className="profile-avatar-wrapper">
          <div className="profile-avatar-circle">
            <span>{studentName.slice(0, 2).toUpperCase()}</span>
          </div>
        </div>

        <div className="profile-hero-body">
          <div className="profile-main-meta-row">
            <div>
              <h1 className="profile-name-title">{studentName}</h1>
              <p className="profile-tagline">
                {user?.careerGoal || 'Computer Science Undergraduate • Aspiring Software Engineer'}
              </p>

              <div className="profile-meta-academic">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <GraduationCap size={15} color="#818CF8" />
                  <span>{user?.college || 'Engineering Institute of Technology'}</span>
                </span>
                <span>•</span>
                <span>{user?.course || 'B.Tech CSE'}</span>
                <span>•</span>
                <span>{user?.year || '2nd Year'} ({user?.semester || 'Semester 4'})</span>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit3 size={15} />
              <span>Edit Profile</span>
            </button>
          </div>

          <p className="profile-bio-text">
            {user?.bio || 'Proactive computer science undergraduate with hands-on experience in modern web development, Python scripting, and data structures. Dedicated to building verifiable proof-of-work software and maintaining a continuous daily learning streak.'}
          </p>

          {/* Contact & Social Links */}
          <div className="profile-social-links-row">
            {user?.email && (
              <span className="social-link-chip">
                <Mail size={13} />
                <span>{user.email}</span>
              </span>
            )}

            {user?.phone && (
              <span className="social-link-chip">
                <Phone size={13} />
                <span>{user.phone}</span>
              </span>
            )}

            <button 
              className="social-link-chip"
              onClick={() => onNavigate('github')}
            >
              <Github size={13} />
              <span>GitHub</span>
            </button>

            <button 
              className="social-link-chip"
              onClick={() => onNavigate('linkedin')}
            >
              <Linkedin size={13} />
              <span>LinkedIn</span>
            </button>

            <button 
              className="social-link-chip"
              onClick={() => onNavigate('resume')}
            >
              <User size={13} />
              <span>Resume Builder</span>
            </button>
          </div>
        </div>
      </section>

      {/* Middle Grid: Career Readiness Summary & Profile Completeness */}
      <div className="profile-insights-grid">
        {/* Career Readiness Summary (Requirement 23) */}
        <section className="readiness-card" aria-label="Career Readiness Summary">
          <div className="readiness-header-row">
            <div className="readiness-title-group">
              <h3>
                <Compass size={20} color="#6366F1" />
                <span>Career Readiness Summary</span>
              </h3>
              <p>Visual synthesis of your practical skills, projects, and career documents</p>
            </div>

            <div 
              className="readiness-badge-pill"
              style={{ 
                backgroundColor: `${readiness.badgeColor}20`, 
                color: readiness.badgeColor,
                border: `1px solid ${readiness.badgeColor}50`
              }}
            >
              <Sparkles size={14} />
              <span>{readiness.readinessLevel} ({readiness.overall}%)</span>
            </div>
          </div>

          <div className="readiness-pillars-grid">
            {readiness.pillars.map((pillar) => (
              <div key={pillar.name} className="pillar-stat-item">
                <div className="pillar-top-row">
                  <span>{pillar.name}</span>
                  <span style={{ color: pillar.color }}>{pillar.score}%</span>
                </div>

                <div className="pillar-progress-track">
                  <div 
                    className="pillar-progress-fill" 
                    style={{ width: `${pillar.score}%`, backgroundColor: pillar.color }}
                  />
                </div>

                <span className="pillar-target-sub">Target: {pillar.target}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Profile Completion (Requirement 22) */}
        <section className="completeness-profile-card" aria-label="Profile Completion System">
          <h3>Profile Completion</h3>

          <div className="completeness-summary-row">
            <div className="completeness-number-bubble">
              <span>{profileCompleteness.percentage}%</span>
            </div>

            <div>
              <h4 style={{ color: '#F8FAFC', fontSize: '1rem', fontWeight: 600 }}>Professional Identity</h4>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                Complete your core sections to present a verified profile to employers.
              </p>
            </div>
          </div>

          <div className="profile-checklist-container">
            {profileCompleteness.checks.map((chk, i) => (
              <div key={i} className={`profile-check-row ${chk.valid ? 'completed' : ''}`}>
                {chk.valid ? (
                  <CheckCircle2 size={16} color="#10B981" />
                ) : (
                  <span style={{ color: '#64748B' }}>○</span>
                )}
                <span>{chk.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Career Preparation Checklist (Requirement 24) */}
      <section className="career-checklist-section" aria-label="Career Preparation Checklist">
        <div className="checklist-section-header">
          <h3>
            <Target size={20} color="#10B981" />
            <span>Career Preparation Checklist</span>
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
            {careerChecklist.filter(c => c.completed).length} of {careerChecklist.length} Milestones Achieved
          </span>
        </div>

        <div className="checklist-cards-grid">
          {careerChecklist.map((item) => (
            <div key={item.id} className={`career-check-card ${item.completed ? 'done' : ''}`}>
              <div className="check-card-top">
                {item.completed ? (
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <span style={{ color: '#64748B', fontSize: '1.1rem', lineHeight: 1 }}>○</span>
                )}
                <div>
                  <h4 className="check-card-title">{item.title}</h4>
                  <p className="check-card-desc">{item.description}</p>
                </div>
              </div>

              <button 
                className="btn btn-outline check-card-btn"
                onClick={() => onNavigate(item.route)}
              >
                <span>{item.actionLabel}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Tabs: Skills, Projects, Achievements, Academics (Requirement 21) */}
      <section className="profile-showcase-section" aria-label="Showcased Portfolio">
        <div className="showcase-tabs-row" role="tablist">
          <button 
            role="tab"
            aria-selected={activeShowcaseTab === 'skills'}
            className={`showcase-tab-btn ${activeShowcaseTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveShowcaseTab('skills')}
          >
            <Code2 size={16} />
            <span>Showcased Skills ({skills.length})</span>
          </button>

          <button 
            role="tab"
            aria-selected={activeShowcaseTab === 'projects'}
            className={`showcase-tab-btn ${activeShowcaseTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveShowcaseTab('projects')}
          >
            <Rocket size={16} />
            <span>Projects Portfolio ({projects.length})</span>
          </button>

          <button 
            role="tab"
            aria-selected={activeShowcaseTab === 'achievements'}
            className={`showcase-tab-btn ${activeShowcaseTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveShowcaseTab('achievements')}
          >
            <Trophy size={16} />
            <span>Milestone Achievements ({achievements.filter(a => a.unlocked).length})</span>
          </button>

          <button 
            role="tab"
            aria-selected={activeShowcaseTab === 'academics'}
            className={`showcase-tab-btn ${activeShowcaseTab === 'academics' ? 'active' : ''}`}
            onClick={() => setActiveShowcaseTab('academics')}
          >
            <BarChart3 size={16} />
            <span>Academic Marksheets</span>
          </button>
        </div>

        {/* Tab 1: Skills */}
        {activeShowcaseTab === 'skills' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {skills.map((skill) => (
              <div key={skill.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', color: '#F8FAFC' }}>{skill.name}</h4>
                  <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: `${skill.color}20`, color: skill.color }}>
                    {skill.level}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '9999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ width: `${skill.progress}%`, height: '100%', backgroundColor: skill.color }} />
                </div>
                <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Progress: {skill.progress}% • {skill.category}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Projects */}
        {activeShowcaseTab === 'projects' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
            {projects.map((proj) => (
              <div key={proj.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#A5B4FC', fontWeight: 600 }}>{proj.relatedSkill}</span>
                    <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                      {proj.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', color: '#F8FAFC' }}>{proj.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.35rem', lineHeight: 1.4 }}>{proj.description}</p>
                </div>

                {proj.submission?.repoUrl && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#818CF8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
                    <Github size={13} />
                    <a href={proj.submission.repoUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                      Repository Link
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Achievements */}
        {activeShowcaseTab === 'achievements' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {achievements.filter(a => a.unlocked).map((ach) => (
              <div key={ach.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', borderRadius: '8px', background: `${ach.badgeColor}20`, color: ach.badgeColor }}>
                  <Trophy size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#F8FAFC' }}>{ach.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '0.2rem' }}>{ach.description}</p>
                  <span style={{ fontSize: '0.75rem', color: '#F59E0B', marginTop: '0.35rem', display: 'inline-block' }}>
                    +{ach.xp || 100} XP • Earned {ach.unlockedDate || 'Verified'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Academics */}
        {activeShowcaseTab === 'academics' && (
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#F8FAFC' }}>Cumulative Grade Point Average (CGPA)</h4>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>B.Tech Computer Science & Engineering • 4 Semesters Completed</p>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#10B981' }}>8.42 / 10.0</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
              {(semesters.length > 0 ? semesters : [
                { sem: 'Sem 1', sgpa: 7.40 },
                { sem: 'Sem 2', sgpa: 7.80 },
                { sem: 'Sem 3', sgpa: 8.10 },
                { sem: 'Sem 4', sgpa: 8.42 }
              ]).map((s, idx) => (
                <div key={idx} style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Semester {s.semester || s.sem}</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F8FAFC', marginTop: '0.2rem' }}>
                    {s.sgpa || '8.42'} SGPA
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Modal: Edit Profile */}
      {isEditModalOpen && (
        <div className="github-modal-backdrop" role="dialog" aria-modal="true">
          <div className="github-modal-card">
            <div className="github-modal-header">
              <h3>Edit Professional Profile</h3>
              <button 
                className="modal-close-icon"
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="github-modal-body">
                <div className="github-form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    className="github-input"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="github-form-group">
                  <label>Career Goal / Target Headline *</label>
                  <input 
                    type="text" 
                    className="github-input"
                    value={editForm.careerGoal}
                    onChange={(e) => setEditForm({ ...editForm, careerGoal: e.target.value })}
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="github-form-group">
                    <label>College / University</label>
                    <input 
                      type="text" 
                      className="github-input"
                      value={editForm.college}
                      onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                    />
                  </div>
                  <div className="github-form-group">
                    <label>Degree & Branch</label>
                    <input 
                      type="text" 
                      className="github-input"
                      value={editForm.course}
                      onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="github-form-group">
                    <label>Academic Year</label>
                    <input 
                      type="text" 
                      className="github-input"
                      value={editForm.year}
                      onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                    />
                  </div>
                  <div className="github-form-group">
                    <label>Current Semester</label>
                    <input 
                      type="text" 
                      className="github-input"
                      value={editForm.semester}
                      onChange={(e) => setEditForm({ ...editForm, semester: e.target.value })}
                    />
                  </div>
                </div>

                <div className="github-form-group">
                  <label>Professional Bio</label>
                  <textarea 
                    className="github-textarea"
                    rows={3}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  />
                </div>

                <div className="form-grid-2">
                  <div className="github-form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      className="github-input"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  </div>
                  <div className="github-form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      className="github-input"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="github-modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
