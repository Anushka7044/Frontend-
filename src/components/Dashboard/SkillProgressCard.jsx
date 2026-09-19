import React from 'react';
import { Brain, ArrowUpRight, Code, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILLS_DATA } from '../../data/dashboardData';
import './SkillProgressCard.css';

export default function SkillProgressCard({ onSelectFeature, skills, onNavigate }) {
  const displaySkills = skills && skills.length > 0 ? skills.slice(0, 5) : SKILLS_DATA;

  return (
    <div className="glass-card dashboard-card skill-progress-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon-tag emerald">
            <Brain size={18} />
          </div>
          <div>
            <h3 className="card-title">My Skill Progress</h3>
            <p className="card-subtitle">{displaySkills.length} Active Skills Tracked</p>
          </div>
        </div>

        <button 
          className="btn btn-outline btn-sm skill-add-btn"
          onClick={() => {
            if (onNavigate) {
              onNavigate('skills');
            } else if (onSelectFeature) {
              onSelectFeature({ label: 'Technical Skills Directory', stage: 'Stage 4', icon: 'Brain' });
            }
          }}
        >
          <span>Explore Tree</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Skill List */}
      <div className="skills-list">
        {displaySkills.map((skill) => (
          <div key={skill.id} className="skill-item">
            <div className="skill-header">
              <div className="skill-name-badge">
                <span className="skill-title">{skill.name}</span>
                <span className={`skill-level-pill ${skill.level.toLowerCase()}`}>
                  {skill.level}
                </span>
              </div>
              <span className="skill-pct-value">{skill.progress}%</span>
            </div>

            {/* Progress Bar Track */}
            <div className="skill-bar-track">
              <div 
                className="skill-bar-fill"
                style={{ 
                  width: `${skill.progress}%`,
                  background: `linear-gradient(90deg, ${skill.color || '#6366f1'}90 0%, ${skill.color || '#6366f1'} 100%)`,
                  boxShadow: `0 0 10px ${skill.color || '#6366f1'}40`
                }}
              />
            </div>

            <div className="skill-footer-meta">
              <span className="skill-category-text">{skill.category}</span>
              <span className="skill-next-checkpoint">
                {skill.progress >= 90 ? 'Mastery Reached' : `${100 - skill.progress}% to next tier`}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="card-footer-action">
        <button 
          className="card-text-btn"
          onClick={() => {
            if (onNavigate) {
              onNavigate('skills');
            } else if (onSelectFeature) {
              onSelectFeature({ label: 'Skill Assessments', stage: 'Stage 4', icon: 'Brain' });
            }
          }}
        >
          <span>View all skill roadmaps & assessments</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
