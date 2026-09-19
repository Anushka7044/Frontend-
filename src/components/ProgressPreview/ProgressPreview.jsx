import React from 'react';
import { Flame, Trophy, CheckCircle2, Code2, Award, ArrowUpRight } from 'lucide-react';
import { PROGRESS_METRICS } from '../../data/mockData';
import './ProgressPreview.css';

export default function ProgressPreview({ onNavigate, user }) {
  return (
    <section className="section progress-preview-section" id="preview">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">Student Analytics</span>
          <h2>
            Visual Proof of <span className="gradient-text">Your Progression</span>
          </h2>
          <p>
            Never wonder where you stand. StudyHub aggregates your skill mastery, coding streaks, 
            and project milestones into one intuitive command center.
          </p>
        </div>

        <div className="preview-showcase-grid">
          {/* Card 1: Technical Skills Mastery */}
          <div className="glass-card preview-card skills-card">
            <div className="card-header-flex">
              <div>
                <span className="card-sub">Core Competency</span>
                <h3 className="card-title">Technical Skill Tree</h3>
              </div>
              <div className="card-badge-icon blue">
                <Code2 size={20} />
              </div>
            </div>

            <div className="skills-bar-list">
              {PROGRESS_METRICS.skills.map((skill) => (
                <div key={skill.name} className="skill-meter-item">
                  <div className="skill-meter-meta">
                    <span className="skill-title">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="meter-track">
                    <div 
                      className="meter-fill" 
                      style={{ 
                        width: `${skill.level}%`, 
                        backgroundColor: skill.color 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="card-note">
              * Skills level up automatically as challenge projects are completed and verified.
            </p>
          </div>

          {/* Card 2: Streak & Consistency */}
          <div className="glass-card preview-card streak-card">
            <div className="card-header-flex">
              <div>
                <span className="card-sub">Habit Building</span>
                <h3 className="card-title">Daily Streak & Focus</h3>
              </div>
              <div className="card-badge-icon orange">
                <Flame size={20} />
              </div>
            </div>

            <div className="streak-main-display">
              <span className="streak-number">{PROGRESS_METRICS.streak.current}</span>
              <span className="streak-unit">Days Active Streak 🔥</span>
            </div>

            <div className="streak-stats-row">
              <div className="streak-stat-box">
                <span className="box-val">{PROGRESS_METRICS.streak.longest} Days</span>
                <span className="box-label">Longest Streak</span>
              </div>
              <div className="streak-stat-box">
                <span className="box-val">{PROGRESS_METRICS.streak.activityDays} Days</span>
                <span className="box-label">Total Days Active</span>
              </div>
            </div>

            {/* Visual Heatmap representation */}
            <div className="heatmap-preview">
              <span className="heatmap-label">Recent Activity Heatmap</span>
              <div className="heatmap-grid">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`heatmap-cell ${i % 3 === 0 ? 'level-3' : i % 2 === 0 ? 'level-2' : 'level-1'}`}
                    title={`Day ${i + 1}: Completed study & coding tasks`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Practical Projects */}
          <div className="glass-card preview-card projects-card">
            <div className="card-header-flex">
              <div>
                <span className="card-sub">Proof of Work</span>
                <h3 className="card-title">Completed Projects</h3>
              </div>
              <div className="card-badge-icon purple">
                <CheckCircle2 size={20} />
              </div>
            </div>

            <div className="projects-metrics-box">
              <div className="p-stat">
                <span className="p-num">{PROGRESS_METRICS.projects.completed}</span>
                <span className="p-text">Completed & Documented</span>
              </div>
              <div className="p-stat">
                <span className="p-num in-progress">{PROGRESS_METRICS.projects.inProgress}</span>
                <span className="p-text">Currently In Progress</span>
              </div>
            </div>

            <div className="project-mini-list">
              <div className="project-mini-item">
                <span className="p-dot" />
                <span className="p-name">Responsive Portfolio Website</span>
                <span className="p-tag">Frontend</span>
              </div>
              <div className="project-mini-item">
                <span className="p-dot" />
                <span className="p-name">CLI Task & Expense Manager</span>
                <span className="p-tag">Python</span>
              </div>
              <div className="project-mini-item">
                <span className="p-dot" />
                <span className="p-name">Academic GPA Calculator</span>
                <span className="p-tag">JavaScript</span>
              </div>
            </div>
          </div>

          {/* Card 4: Milestones & Badges */}
          <div className="glass-card preview-card badges-card">
            <div className="card-header-flex">
              <div>
                <span className="card-sub">Recognition</span>
                <h3 className="card-title">Earned Badges</h3>
              </div>
              <div className="card-badge-icon yellow">
                <Trophy size={20} />
              </div>
            </div>

            <div className="badges-count-banner">
              <span className="badge-big-number">{PROGRESS_METRICS.achievementsCount}</span>
              <span className="badge-big-label">Verified Milestones Unlocked</span>
            </div>

            <div className="badges-mini-grid">
              <div className="badge-item-pill">
                <Award size={16} className="badge-icon-gold" />
                <span>Project Builder</span>
              </div>
              <div className="badge-item-pill">
                <Flame size={16} className="badge-icon-orange" />
                <span>10-Day Streak</span>
              </div>
              <div className="badge-item-pill">
                <Code2 size={16} className="badge-icon-cyan" />
                <span>JS Pioneer</span>
              </div>
              <div className="badge-item-pill">
                <CheckCircle2 size={16} className="badge-icon-emerald" />
                <span>First Deploy</span>
              </div>
            </div>

            <button 
              className="btn btn-outline btn-block btn-sm unlock-all-btn"
              onClick={() => onNavigate(user ? 'dashboard' : 'signup')}
            >
              <span>{user ? 'Open your personal dashboard' : 'Unlock your personal dashboard'}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
