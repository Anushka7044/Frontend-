import React, { useState } from 'react';
import { GitBranch, GitCommit, FolderGit, Flame, ExternalLink, Unlink, RefreshCw } from 'lucide-react';
import { GITHUB_ACTIVITY } from '../../data/dashboardData';
import './GitHubCard.css';

export default function GitHubCard({ onSelectFeature, onNavigate }) {
  // Allow toggling empty/disconnected state to demonstrate Stage 3 Requirement #20
  const [isConnected, setIsConnected] = useState(true);

  const handleGoToGitHub = () => {
    if (onNavigate) onNavigate('github');
    else if (onSelectFeature) onSelectFeature({ label: 'GitHub Profile Showcase', stage: 'Stage 6', icon: 'GitBranch' });
  };

  return (
    <div className="glass-card dashboard-card github-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon-tag cyan">
            <GitBranch size={18} />
          </div>
          <div>
            <h3 className="card-title">GitHub Activity</h3>
            <p className="card-subtitle">Source Code & Proof of Work</p>
          </div>
        </div>

        {/* State Toggle for demonstration */}
        <button 
          className="demo-toggle-btn"
          onClick={() => setIsConnected(!isConnected)}
          title="Toggle between Connected state and Empty / Disconnected state"
        >
          <RefreshCw size={12} />
          <span>{isConnected ? 'Show Disconnected' : 'Show Connected'}</span>
        </button>
      </div>

      {isConnected ? (
        <>
          {/* Top Metrics Row */}
          <div className="github-stats-grid">
            <div className="github-stat-item">
              <span className="g-stat-label">Contributions</span>
              <div className="g-stat-val-row">
                <GitCommit size={16} className="g-icon" />
                <span className="g-stat-num">{GITHUB_ACTIVITY.contributions}</span>
              </div>
              <span className="g-stat-sub">This semester</span>
            </div>

            <div className="github-stat-item">
              <span className="g-stat-label">Coding Streak</span>
              <div className="g-stat-val-row">
                <Flame size={16} className="g-icon orange" />
                <span className="g-stat-num">{GITHUB_ACTIVITY.streakDays}</span>
                <span className="g-stat-unit">days</span>
              </div>
              <span className="g-stat-sub">Continuous commits</span>
            </div>

            <div className="github-stat-item">
              <span className="g-stat-label">Repositories</span>
              <div className="g-stat-val-row">
                <FolderGit size={16} className="g-icon purple" />
                <span className="g-stat-num">{GITHUB_ACTIVITY.repositoriesCount}</span>
              </div>
              <span className="g-stat-sub">Public projects</span>
            </div>
          </div>

          {/* Language Breakdown */}
          <div className="language-breakdown-box">
            <div className="lang-header">
              <span className="lang-title">Most Active Languages</span>
              <span className="lang-primary-badge">Top: {GITHUB_ACTIVITY.primaryLanguage}</span>
            </div>

            {/* Segmented language progress bar */}
            <div className="lang-segmented-bar">
              {GITHUB_ACTIVITY.languageBreakdown.map(lang => (
                <div 
                  key={lang.name}
                  className="lang-segment"
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            <div className="lang-legend-row">
              {GITHUB_ACTIVITY.languageBreakdown.map(lang => (
                <div key={lang.name} className="lang-legend-item">
                  <span className="lang-dot" style={{ backgroundColor: lang.color }} />
                  <span className="lang-name-text">{lang.name}</span>
                  <span className="lang-pct-text">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Commits List */}
          <div className="recent-commits-box">
            <span className="commits-box-title">Recent Commit Feed</span>
            <div className="commits-mini-feed">
              {GITHUB_ACTIVITY.recentCommits.map((cmt, idx) => (
                <div key={idx} className="commit-feed-item">
                  <GitCommit size={13} className="commit-icon" />
                  <div className="commit-info">
                    <span className="commit-repo">{cmt.repo}</span>
                    <p className="commit-msg">{cmt.msg}</p>
                  </div>
                  <span className="commit-time">{cmt.time}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Empty / Disconnected State Placeholder (Requirement #20) */
        <div className="github-empty-state">
          <div className="empty-icon-box">
            <Unlink size={28} />
          </div>
          <h4 className="empty-state-title">GitHub Not Connected Yet</h4>
          <p className="empty-state-text">
            Connect your GitHub account in Stage 6 to automatically sync your repositories, 
            commit streaks, and code contributions directly into your student dashboard.
          </p>
          <button 
            className="btn btn-outline btn-sm"
            onClick={handleGoToGitHub}
          >
            <span>Preview GitHub Sync</span>
            <ExternalLink size={13} />
          </button>
        </div>
      )}

      <div className="card-footer-action">
        <button 
          className="card-text-btn"
          onClick={handleGoToGitHub}
        >
          <span>Explore synced repositories</span>
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
