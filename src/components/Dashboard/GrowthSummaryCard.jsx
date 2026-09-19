import React from 'react';
import { TrendingUp, Quote, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { GROWTH_SUMMARY } from '../../data/dashboardData';
import './GrowthSummaryCard.css';

export default function GrowthSummaryCard({ onSelectFeature, onNavigate, skills = [], projects = [], challenges = [], achievements = [] }) {
  const skillsCompleted = skills.length > 0 ? skills.filter(s => (s.progress || 0) >= 80).length : 8;
  const projectsCompleted = projects.length > 0 ? projects.filter(p => p.status === 'completed').length : 5;
  const challengesDone = challenges.length > 0 ? challenges.filter(c => c.status === 'completed').length : 6;
  const badgesEarned = achievements.length > 0 ? achievements.filter(a => a.unlocked).length : 12;

  const dynamicMetrics = [
    { label: 'Skills Completed', value: skillsCompleted },
    { label: 'Projects Completed', value: projectsCompleted },
    { label: 'Challenges Completed', value: challengesDone },
    { label: 'Achievements', value: badgesEarned },
    { label: 'Learning Streak', value: '12 days' },
    { label: 'GitHub Contributions', value: 86 }
  ];

  return (
    <div className="glass-card dashboard-card growth-summary-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon-tag indigo">
            <TrendingUp size={18} />
          </div>
          <div>
            <h3 className="card-title">Your Overall Growth</h3>
            <p className="card-subtitle">Cumulative Academic & Technical Record</p>
          </div>
        </div>

        <span className="growth-level-badge">Level 4 Student Builder</span>
      </div>

      {/* Metrics Tally Grid */}
      <div className="growth-metrics-tally">
        {dynamicMetrics.map(metric => (
          <div key={metric.label} className="growth-tally-box">
            <span className="tally-val">{metric.value}</span>
            <span className="tally-label">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Motivational Message Banner */}
      <div className="growth-quote-banner">
        <Quote size={22} className="quote-icon" />
        <p className="quote-text">
          "{GROWTH_SUMMARY.quote}"
        </p>
      </div>

      <div className="card-footer-action">
        <button 
          className="card-text-btn"
          onClick={() => {
            if (onNavigate) {
              onNavigate('progress');
            } else if (onSelectFeature) {
              onSelectFeature({ label: 'Progress & Growth Timeline', stage: 'Stage 5', icon: 'Flame' });
            }
          }}
        >
          <span>View full growth timeline & consistency record</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
