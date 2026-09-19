import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import StatCard from '../components/Dashboard/StatCard';
import AcademicCard from '../components/Dashboard/AcademicCard';
import SkillProgressCard from '../components/Dashboard/SkillProgressCard';
import ChallengeCard from '../components/Dashboard/ChallengeCard';
import StreakCard from '../components/Dashboard/StreakCard';
import RecommendationCard from '../components/Dashboard/RecommendationCard';
import ProjectCard from '../components/Dashboard/ProjectCard';
import GitHubCard from '../components/Dashboard/GitHubCard';
import AchievementCard from '../components/Dashboard/AchievementCard';
import GrowthSummaryCard from '../components/Dashboard/GrowthSummaryCard';
import AIAssistant from '../components/Dashboard/AIAssistant';
import FutureStageModal from '../components/Dashboard/FutureStageModal';
import { STUDENT_PROFILE, QUICK_STATS } from '../data/dashboardData';
import { 
  calculateResumeCompleteness, 
  calculateLinkedInStrength, 
  calculateProfileCompleteness 
} from '../data/careerData';
import { getDashboardAIFocusItems } from '../services/aiService';
import NextStepCard from '../components/Dashboard/NextStepCard';
import TodayPlanCard from '../components/Dashboard/TodayPlanCard';
import { Briefcase, FileText, Github, Linkedin, User, ArrowRight, Bot, Sparkles } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard({ 
  user, 
  onNavigate, 
  onLogout, 
  notes = [], 
  skills = [], 
  semesters = [], 
  challenges = [],
  projects = [],
  achievements = [],
  githubData,
  resumeData,
  linkedinData,
  onSelectFeature,
  embedded = false 
}) {
  // Navigation & layout state (for standalone mode)
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [futureModalFeature, setFutureModalFeature] = useState(null);

  // Active student user profile (merged with passed user if any)
  const activeUser = {
    ...STUDENT_PROFILE,
    ...user
  };

  const handleSelectFutureFeature = onSelectFeature || ((feature) => {
    setFutureModalFeature(feature);
  });

  const completedProjectsCount = projects.filter(p => p.status === 'completed').length;
  const earnedAchievementsCount = achievements.filter(a => a.unlocked).length;

  // Career Metrics for Dashboard (Requirement 25)
  const resumeCompleteness = useMemo(() => {
    return resumeData ? calculateResumeCompleteness(resumeData).percentage : 82;
  }, [resumeData]);

  const linkedinStrength = useMemo(() => {
    return linkedinData ? calculateLinkedInStrength(linkedinData).percentage : 72;
  }, [linkedinData]);

  const profileCompletion = useMemo(() => {
    return calculateProfileCompleteness(activeUser, resumeData, linkedinData, projects, skills).percentage;
  }, [activeUser, resumeData, linkedinData, projects, skills]);

  const githubStatus = githubData?.isConnected !== false ? 'Connected' : 'Disconnected';

  const aiFocusItems = useMemo(() => {
    return getDashboardAIFocusItems({
      skills,
      projects,
      challenges,
      resume: resumeData,
      github: githubData
    });
  }, [skills, projects, challenges, resumeData, githubData]);

  const dashboardContent = (
    <div className="dashboard-content-inner">
      {/* Quick Statistics Row (6 Cards) */}
      <section className="stats-section-grid" aria-label="Quick statistics">
        {QUICK_STATS.map(stat => {
          let statCopy = { ...stat };
          if (stat.id === 'notes' && notes && notes.length) {
            statCopy.value = `${notes.length} Notes`;
          }
          if (stat.id === 'skills' && skills && skills.length) {
            statCopy.value = `${skills.length} Skills`;
          }
          if (stat.id === 'projects') {
            statCopy.value = `${completedProjectsCount} Completed`;
          }
          if (stat.id === 'achievements') {
            statCopy.value = `${earnedAchievementsCount} Earned`;
          }
          if (stat.id === 'github' && githubData?.stats?.contributions) {
            statCopy.value = `${githubData.stats.contributions} Commits`;
          }
          return (
            <StatCard 
              key={stat.id}
              stat={statCopy}
              onClick={() => {
                if (stat.id === 'notes') onNavigate ? onNavigate('notes') : null;
                else if (stat.id === 'skills') onNavigate ? onNavigate('skills') : null;
                else if (stat.id === 'streak') onNavigate ? onNavigate('progress') : null;
                else if (stat.id === 'projects') onNavigate ? onNavigate('projects') : null;
                else if (stat.id === 'achievements') onNavigate ? onNavigate('achievements') : null;
                else if (stat.id === 'github') onNavigate ? onNavigate('github') : null;
              }}
            />
          );
        })}
      </section>

      {/* AI Growth Assistant Banner */}
      <section className="dashboard-ai-banner glass-card" aria-label="AI Growth Assistant">
        <div className="dashboard-ai-banner-header">
          <div className="ai-banner-title-group">
            <div className="ai-banner-avatar">
              <Bot size={24} />
            </div>
            <div>
              <div className="ai-banner-title-row">
                <h3 className="ai-banner-title">Your AI Growth Assistant</h3>
                <span className="ai-banner-tag">
                  <Sparkles size={11} />
                  <span>Real-Time Context Active</span>
                </span>
              </div>
              <p className="ai-banner-subtitle">
                Personalized guidance tuned to your Semester 4 academics, {skills.length} skills, and career preparation.
              </p>
            </div>
          </div>

          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate && onNavigate('ai')}
          >
            <Bot size={15} />
            <span>Open Full AI Assistant</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="dashboard-ai-items-grid">
          {aiFocusItems.map((item) => (
            <button
              key={item.id}
              className="ai-focus-card"
              onClick={() => onNavigate && onNavigate(item.route)}
            >
              <div className="ai-focus-top">
                <span className="ai-focus-category">{item.category}</span>
                <ArrowRight size={13} style={{ color: '#818CF8' }} />
              </div>
              <p className="ai-focus-text">{item.text}</p>
              <div className="ai-focus-footer">
                <span>Take Action</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Core 2-Column Content Grid */}
      <section className="dashboard-cards-grid" aria-label="Dashboard insights">
        {/* Row 1: Academic Performance & Skill Progress */}
        <div className="grid-card-item">
          <AcademicCard 
            onSelectFeature={handleSelectFutureFeature} 
            semesters={semesters}
            onNavigate={onNavigate}
          />
        </div>
        <div className="grid-card-item">
          <SkillProgressCard 
            onSelectFeature={handleSelectFutureFeature} 
            skills={skills}
            onNavigate={onNavigate}
          />
        </div>

        {/* Row 2: Today's Growth Plan & Smart Next Action */}
        <div className="grid-card-item">
          <TodayPlanCard onNavigate={onNavigate} />
        </div>
        <div className="grid-card-item">
          <NextStepCard 
            projects={projects}
            challenges={challenges}
            skills={skills}
            resumeData={resumeData}
            onNavigate={onNavigate}
          />
        </div>

        {/* Row 2: Current Challenge & Recommended Next Skill */}
        <div className="grid-card-item">
          <ChallengeCard 
            onSelectFeature={handleSelectFutureFeature}
            challenges={challenges}
            onNavigate={onNavigate}
          />
        </div>
        <div className="grid-card-item">
          <RecommendationCard 
            onSelectFeature={handleSelectFutureFeature} 
            onNavigate={onNavigate}
          />
        </div>

        {/* Row 3: Learning Streak & Current Active Project */}
        <div className="grid-card-item">
          <StreakCard 
            onSelectFeature={handleSelectFutureFeature} 
            onNavigate={onNavigate}
          />
        </div>
        <div className="grid-card-item">
          <ProjectCard 
            onSelectFeature={handleSelectFutureFeature}
            projects={projects}
            onNavigate={onNavigate}
          />
        </div>

        {/* Row 4: GitHub Activity & Recent Achievements */}
        <div className="grid-card-item">
          <GitHubCard 
            onSelectFeature={handleSelectFutureFeature} 
            onNavigate={onNavigate}
          />
        </div>
        <div className="grid-card-item">
          <AchievementCard 
            onSelectFeature={handleSelectFutureFeature}
            achievements={achievements}
            onNavigate={onNavigate}
          />
        </div>

        {/* Row 5: Dedicated Career Progress Section (Requirement 25) */}
        <div className="grid-card-item full-span">
          <div className="glass-card dashboard-card career-progress-dashboard-card">
            <div className="career-progress-header">
              <div className="card-title-group">
                <div className="card-icon-tag" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8' }}>
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="card-title">Career Progress</h3>
                  <p className="card-subtitle">Convert your academic and practical milestones into professional profiles</p>
                </div>
              </div>

              <button 
                className="btn btn-outline btn-sm"
                onClick={() => onNavigate && onNavigate('profile')}
              >
                <span>View Career Readiness</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="career-progress-metrics-row">
              <div className="career-metric-box">
                <span className="career-metric-lbl">Resume</span>
                <span className="career-metric-val" style={{ color: '#818CF8' }}>{resumeCompleteness}%</span>
              </div>
              <div className="career-metric-box">
                <span className="career-metric-lbl">GitHub</span>
                <span className="career-metric-val" style={{ color: '#10B981', fontSize: '1.2rem' }}>{githubStatus}</span>
              </div>
              <div className="career-metric-box">
                <span className="career-metric-lbl">LinkedIn</span>
                <span className="career-metric-val" style={{ color: '#0EA5E9' }}>{linkedinStrength}%</span>
              </div>
              <div className="career-metric-box">
                <span className="career-metric-lbl">Profile</span>
                <span className="career-metric-val" style={{ color: '#A855F7' }}>{profileCompletion}%</span>
              </div>
              <div className="career-metric-box">
                <span className="career-metric-lbl">Projects</span>
                <span className="career-metric-val">{completedProjectsCount || 4}</span>
              </div>
              <div className="career-metric-box">
                <span className="career-metric-lbl">Achievements</span>
                <span className="career-metric-val" style={{ color: '#F59E0B' }}>{earnedAchievementsCount || 7}</span>
              </div>
            </div>

            <div className="career-actions-bar">
              <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Quick Career Actions:</span>
              <div className="career-quick-btns">
                <button className="btn btn-primary btn-sm" onClick={() => onNavigate && onNavigate('resume')}>
                  <FileText size={14} />
                  <span>Build Resume</span>
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => onNavigate && onNavigate('profile')}>
                  <User size={14} />
                  <span>Improve Profile</span>
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => onNavigate && onNavigate('github')}>
                  <Github size={14} />
                  <span>View GitHub</span>
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => onNavigate && onNavigate('linkedin')}>
                  <Linkedin size={14} />
                  <span>Update LinkedIn</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 6: Full Width Overall Growth Summary */}
        <div className="grid-card-item full-span">
          <GrowthSummaryCard 
            onSelectFeature={handleSelectFutureFeature}
            onNavigate={onNavigate}
            skills={skills}
            projects={projects}
            challenges={challenges}
            achievements={achievements}
          />
        </div>
      </section>
    </div>
  );

  if (embedded) {
    return dashboardContent;
  }

  return (
    <div className="dashboard-app-layout">
      {/* 1. Sidebar Component (Responsive Persistent / Collapsible / Mobile Drawer) */}
      <Sidebar 
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onSelectFeature={handleSelectFutureFeature}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        user={activeUser}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* 2. Main Content Body */}
      <div className="dashboard-main-viewport">
        {/* Top Header */}
        <Header 
          user={activeUser}
          onLogout={onLogout}
          onSelectFeature={handleSelectFutureFeature}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Scrollable Dashboard Content Area */}
        <main className="dashboard-content-scroll">
          {dashboardContent}
        </main>
      </div>

      {/* 3. Floating Interactive AI Student Assistant */}
      <AIAssistant />

      {/* 4. Future Stage Notification Dialog */}
      {futureModalFeature && (
        <FutureStageModal 
          feature={futureModalFeature}
          onClose={() => setFutureModalFeature(null)}
        />
      )}
    </div>
  );
}
