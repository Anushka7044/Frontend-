import React from 'react';
import { ArrowRight, Sparkles, Flame, Trophy, GitCommit, Code2, CheckCircle, TrendingUp } from 'lucide-react';
import './Hero.css';

export default function Hero({ onNavigate, user }) {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <div className="badge badge-primary hero-badge">
            <Sparkles size={14} />
            <span>The All-In-One Student Growth Ecosystem</span>
          </div>

          <h1 className="hero-title">
            <span className="gradient-text">Learn. Build.</span>
            <br />
            <span className="gradient-text-accent">Achieve. Grow.</span>
          </h1>

          <p className="hero-description">
            A unified platform engineered for college students to master technical skills, 
            complete time-based challenges, ship real projects, and build verifiable proof of work 
            that stands out to top recruiters.
          </p>

          <div className="hero-cta-group">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate(user ? 'dashboard' : 'signup')}
            >
              <span>{user ? 'Go to Dashboard' : 'Get Started Free'}</span>
              <ArrowRight size={18} />
            </button>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={scrollToFeatures}
            >
              Explore Features
            </button>
          </div>

          {/* Social Proof / Trust Metric */}
          <div className="hero-metrics-row">
            <div className="hero-metric-item">
              <span className="metric-val">10+</span>
              <span className="metric-label">Integrated Tools</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-label">Proof of Work</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <span className="metric-val">Free</span>
              <span className="metric-label">For Students</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Product Preview with Floating Cards */}
        <div className="hero-visual-wrapper">
          <div className="hero-glow-backdrop" />

          {/* Main Central Card (Dashboard Preview Snapshot) */}
          <div className="glass-card main-dashboard-card">
            <div className="dashboard-card-header">
              <div className="window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="window-title">Student Growth Terminal</span>
            </div>

            <div className="dashboard-card-body">
              <div className="profile-snippet">
                <div className="avatar-placeholder">CS</div>
                <div>
                  <h4 className="student-name">Anushka S.</h4>
                  <p className="student-branch">B.Tech CSE • 2nd Year</p>
                </div>
                <span className="status-pill">Active Sprint</span>
              </div>

              {/* Progress Summary Bars */}
              <div className="terminal-stats">
                <div className="stat-line">
                  <div className="stat-line-meta">
                    <span>Overall Goal Completion</span>
                    <span>72%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '72%' }} />
                  </div>
                </div>

                <div className="stat-line">
                  <div className="stat-line-meta">
                    <span>Current Challenge: Web Dev Sprint</span>
                    <span>Day 9 / 14</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill fill-cyan" style={{ width: '64%' }} />
                  </div>
                </div>
              </div>

              {/* Recent Activity List */}
              <div className="recent-activity-list">
                <div className="activity-item">
                  <CheckCircle size={15} className="activity-icon-check" />
                  <span>Submitted Project: Responsive Portfolio</span>
                </div>
                <div className="activity-item">
                  <TrendingUp size={15} className="activity-icon-trend" />
                  <span>Mastery in JavaScript increased to 65%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 1: Skill Progress */}
          <div className="floating-card float-top-left">
            <div className="floating-icon-box yellow">
              <Code2 size={16} />
            </div>
            <div>
              <span className="floating-label">Skill Progress</span>
              <p className="floating-title">JavaScript ES6+</p>
              <div className="mini-progress-bar">
                <div className="mini-progress-fill" style={{ width: '65%' }} />
              </div>
            </div>
            <span className="floating-stat">65%</span>
          </div>

          {/* Floating Card 2: Streak */}
          <div className="floating-card float-top-right">
            <div className="floating-icon-box orange">
              <Flame size={16} />
            </div>
            <div>
              <span className="floating-label">Learning Streak</span>
              <p className="floating-title">12 Days Active</p>
            </div>
          </div>

          {/* Floating Card 3: Project Progress */}
          <div className="floating-card float-bottom-left">
            <div className="floating-icon-box purple">
              <Code2 size={16} />
            </div>
            <div>
              <span className="floating-label">Active Project</span>
              <p className="floating-title">Portfolio Website</p>
              <span className="floating-sub">75% Completed</span>
            </div>
          </div>

          {/* Floating Card 4: Achievement */}
          <div className="floating-card float-bottom-right">
            <div className="floating-icon-box gold">
              <Trophy size={16} />
            </div>
            <div>
              <span className="floating-label">Achievement</span>
              <p className="floating-title">Project Builder</p>
              <span className="floating-sub">Tier II Unlocked</span>
            </div>
          </div>

          {/* Floating Card 5: GitHub commits */}
          <div className="floating-card float-middle-right">
            <div className="floating-icon-box cyan">
              <GitCommit size={16} />
            </div>
            <div>
              <span className="floating-label">GitHub Activity</span>
              <p className="floating-title">18 Commits This Week</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
