import React from 'react';
import { Flame, BookOpen, Brain, Rocket, Trophy, GitBranch, Sparkles } from 'lucide-react';
import './StatCard.css';

const STAT_ICONS = {
  Flame,
  BookOpen,
  Brain,
  Rocket,
  Trophy,
  GitBranch
};

export default function StatCard({ stat, onClick }) {
  const Icon = STAT_ICONS[stat.icon] || Sparkles;

  return (
    <div 
      className="glass-card stat-card"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="stat-card-top">
        <div 
          className="stat-icon-wrapper" 
          style={{ 
            backgroundColor: `${stat.color}15`, 
            color: stat.color,
            borderColor: `${stat.color}35`
          }}
        >
          <Icon size={22} />
        </div>
        <span className="stat-label">{stat.label}</span>
      </div>

      <div className="stat-card-bottom">
        <h3 className="stat-value">{stat.value}</h3>
        {stat.change && (
          <div className="stat-meta">
            <span className="stat-change-text">{stat.change}</span>
          </div>
        )}
      </div>

      <div 
        className="stat-card-glow" 
        style={{ background: `radial-gradient(circle, ${stat.color}20 0%, transparent 70%)` }}
      />
    </div>
  );
}
