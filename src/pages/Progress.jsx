import React from 'react';
import { 
  Flame, Brain, Rocket, Trophy, Calendar, Zap, 
  CheckCircle2, Target, GitBranch, Quote, ArrowRight,
  Briefcase, FileText, Github, Linkedin, Bot, Sparkles 
} from 'lucide-react';
import { calculateTotalXP } from '../data/achievementsData';
import { INITIAL_GROWTH_TIMELINE, GROWTH_QUOTE } from '../data/growthData';
import './Progress.css';

const TIMELINE_ICONS = {
  Trophy,
  Rocket,
  Flame,
  Brain,
  Target,
  GitBranch,
  Briefcase,
  FileText,
  Github,
  Linkedin,
  Bot,
  Sparkles
};

export default function Progress({ 
  challenges = [], 
  projects = [], 
  skills = [], 
  achievements = [],
  growthTimeline = INITIAL_GROWTH_TIMELINE,
  githubData = {},
  resumeData = {},
  linkedinData = {},
  onNavigate 
}) {
  // Compute tallies
  const skillsCompleted = skills.filter(s => (s.progress || 0) >= 80).length;
  const skillsInProgress = skills.filter(s => (s.progress || 0) > 0 && (s.progress || 0) < 80).length;
  const challengesCompleted = challenges.filter(c => c.status === 'completed').length;

  const projectsCompleted = projects.filter(p => p.status === 'completed').length;
  const projectsInProgress = projects.filter(p => p.status === 'in_progress' || p.status === 'assigned').length;

  const earnedAchievements = achievements.filter(a => a.unlocked).length;
  const totalXP = calculateTotalXP(achievements);

  return (
    <div className="progress-page-container">
      {/* Page Header */}
      <div className="progress-header-row">
        <div className="progress-title-area">
          <div className="progress-header-icon">
            <Flame size={24} />
          </div>
          <div>
            <h1 className="progress-page-title">Progress & Consistency</h1>
            <p className="progress-page-subtitle">
              Track your consistency, active streaks, and learning milestones.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Category Summary Blocks */}
      <div className="growth-categories-grid">
        {/* 1. Learning */}
        <div className="glass-card growth-cat-card">
          <div className="growth-cat-header">
            <div className="growth-cat-icon blue">
              <Brain size={18} />
            </div>
            <h3 className="growth-cat-title">Learning</h3>
          </div>
          <div className="growth-metrics-list">
            <div className="growth-metric-line">
              <span className="growth-metric-label">Skills Completed:</span>
              <span className="growth-metric-number">{skillsCompleted}</span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">Skills In Progress:</span>
              <span className="growth-metric-number">{skillsInProgress}</span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">Challenges Done:</span>
              <span className="growth-metric-number">{challengesCompleted}</span>
            </div>
          </div>
        </div>

        {/* 2. Projects */}
        <div className="glass-card growth-cat-card">
          <div className="growth-cat-header">
            <div className="growth-cat-icon purple">
              <Rocket size={18} />
            </div>
            <h3 className="growth-cat-title">Projects</h3>
          </div>
          <div className="growth-metrics-list">
            <div className="growth-metric-line">
              <span className="growth-metric-label">Projects Completed:</span>
              <span className="growth-metric-number">{projectsCompleted}</span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">In Progress / Assigned:</span>
              <span className="growth-metric-number">{projectsInProgress}</span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">Submitted:</span>
              <span className="growth-metric-number">
                {projects.filter(p => p.status === 'submitted').length}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Consistency */}
        <div className="glass-card growth-cat-card">
          <div className="growth-cat-header">
            <div className="growth-cat-icon orange">
              <Flame size={18} />
            </div>
            <h3 className="growth-cat-title">Consistency</h3>
          </div>
          <div className="growth-metrics-list">
            <div className="growth-metric-line">
              <span className="growth-metric-label">Current Streak:</span>
              <span className="growth-metric-number" style={{ color: '#F97316' }}>12 Days</span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">Longest Streak:</span>
              <span className="growth-metric-number">28 Days</span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">Total Active Days:</span>
              <span className="growth-metric-number">42 Days</span>
            </div>
          </div>
        </div>

        {/* 4. Achievements */}
        <div className="glass-card growth-cat-card">
          <div className="growth-cat-header">
            <div className="growth-cat-icon amber">
              <Trophy size={18} />
            </div>
            <h3 className="growth-cat-title">Achievements</h3>
          </div>
          <div className="growth-metrics-list">
            <div className="growth-metric-line">
              <span className="growth-metric-label">Badges Earned:</span>
              <span className="growth-metric-number">{earnedAchievements}</span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">Total Platform XP:</span>
              <span className="growth-metric-number" style={{ color: '#F59E0B' }}>
                {totalXP.toLocaleString()} XP
              </span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">Current Scholar Tier:</span>
              <span className="growth-metric-number">Tier 2</span>
            </div>
          </div>
        </div>

        {/* 5. Career Readiness */}
        <div className="glass-card growth-cat-card">
          <div className="growth-cat-header">
            <div className="growth-cat-icon cyan">
              <Briefcase size={18} />
            </div>
            <h3 className="growth-cat-title">Career</h3>
          </div>
          <div className="growth-metrics-list">
            <div className="growth-metric-line">
              <span className="growth-metric-label">Resume ATS:</span>
              <span className="growth-metric-number" style={{ color: '#818CF8' }}>82%</span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">LinkedIn Strength:</span>
              <span className="growth-metric-number" style={{ color: '#0EA5E9' }}>72%</span>
            </div>
            <div className="growth-metric-line">
              <span className="growth-metric-label">GitHub Sync:</span>
              <span className="growth-metric-number" style={{ color: '#10B981' }}>Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Content: Timeline & Journey Summary */}
      <div className="growth-content-columns">
        {/* Left Column: Growth Timeline */}
        <div className="glass-card growth-timeline-card">
          <div className="growth-timeline-header">
            <h3 className="growth-timeline-title">Growth & Milestone Timeline</h3>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Recent Milestones</span>
          </div>

          <div className="timeline-items-flow">
            {growthTimeline.map(item => {
              const Icon = TIMELINE_ICONS[item.icon] || Trophy;

              return (
                <div key={item.id} className="timeline-event-node">
                  <div 
                    className="timeline-node-pin"
                    style={{ borderColor: item.badgeColor, color: item.badgeColor }}
                  >
                    <Icon size={12} />
                  </div>
                  <div className="timeline-event-content">
                    <div className="timeline-event-date">{item.date}</div>
                    <h4 className="timeline-event-title">{item.title}</h4>
                    <p className="timeline-event-sub">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Journey Summary */}
        <div className="glass-card journey-summary-card">
          <div>
            <h3 className="journey-summary-title">Your Journey So Far</h3>
            <p className="journey-summary-sub">
              A permanent record of every technical and academic achievement.
            </p>

            <div className="journey-tallies-grid">
              <div className="journey-tally-item">
                <span className="j-tally-num">{skills.length}</span>
                <span className="j-tally-label">Skills Tracked</span>
              </div>
              <div className="journey-tally-item">
                <span className="j-tally-num">{challengesCompleted}</span>
                <span className="j-tally-label">Challenges Done</span>
              </div>
              <div className="journey-tally-item">
                <span className="j-tally-num">{projectsCompleted}</span>
                <span className="j-tally-label">Projects Built</span>
              </div>
              <div className="journey-tally-item">
                <span className="j-tally-num">{earnedAchievements}</span>
                <span className="j-tally-label">Badges Unlocked</span>
              </div>
            </div>

            <div className="journey-quote-box">
              <Quote size={20} style={{ color: '#818CF8', marginBottom: '6px' }} />
              <p className="quote-subtext">"{GROWTH_QUOTE}"</p>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button 
              className="btn btn-outline btn-block"
              onClick={() => onNavigate && onNavigate('challenges')}
            >
              <span>Explore Active Challenges</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
