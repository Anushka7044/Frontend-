import React from 'react';
import { Sparkles, ArrowRight, Clock, Gauge, FolderGit2, CheckCircle } from 'lucide-react';
import { RECOMMENDED_SKILL } from '../../data/dashboardData';
import './RecommendationCard.css';

export default function RecommendationCard({ onSelectFeature, onNavigate }) {
  return (
    <div className="glass-card dashboard-card recommendation-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon-tag indigo">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="card-title">Recommended For You</h3>
            <p className="card-subtitle">AI Skill Pathway</p>
          </div>
        </div>

        <span className="recommend-badge">Next Best Move</span>
      </div>

      {/* Main Feature Highlight */}
      <div className="recommend-hero-box">
        <div className="recommend-hero-header">
          <div>
            <h4 className="recommend-skill-name">{RECOMMENDED_SKILL.name}</h4>
            <p className="recommend-tagline">{RECOMMENDED_SKILL.tagline}</p>
          </div>
          <span className="recommend-status-pill">{RECOMMENDED_SKILL.status}</span>
        </div>

        <div className="recommend-reason-box">
          <CheckCircle size={15} className="reason-check-icon" />
          <p className="recommend-reason-text">
            <strong>Why now:</strong> {RECOMMENDED_SKILL.reason}
          </p>
        </div>
      </div>

      {/* Detail Specifications */}
      <div className="recommend-specs-grid">
        <div className="spec-box">
          <Gauge size={16} className="spec-icon" />
          <div>
            <span className="spec-label">Difficulty</span>
            <p className="spec-val">{RECOMMENDED_SKILL.difficulty}</p>
          </div>
        </div>

        <div className="spec-box">
          <Clock size={16} className="spec-icon" />
          <div>
            <span className="spec-label">Estimated Time</span>
            <p className="spec-val">{RECOMMENDED_SKILL.duration}</p>
          </div>
        </div>

        <div className="spec-box full-width">
          <FolderGit2 size={16} className="spec-icon" />
          <div>
            <span className="spec-label">Related Project</span>
            <p className="spec-val">{RECOMMENDED_SKILL.relatedProject}</p>
          </div>
        </div>
      </div>

      {/* Topic Badges */}
      <div className="recommend-topics">
        <span className="topics-label">Modules included:</span>
        <div className="topics-tags-row">
          {RECOMMENDED_SKILL.topics.map(topic => (
            <span key={topic} className="topic-pill">{topic}</span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="recommend-action-row">
        <button 
          className="btn btn-primary btn-block"
          onClick={() => {
            if (onNavigate) {
              onNavigate('recommendations');
            } else if (onSelectFeature) {
              onSelectFeature({ label: 'JavaScript Learning Module', stage: 'Stage 4', icon: 'Brain' });
            }
          }}
        >
          <span>Explore Skill Pathways</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
