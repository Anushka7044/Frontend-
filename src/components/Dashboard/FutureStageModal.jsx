import React from 'react';
import { Sparkles, X, ArrowRight, ShieldAlert, Rocket, BookOpen, BarChart3, Brain, Target, GitBranch, Trophy, Flame, FileText, Settings, User } from 'lucide-react';
import './FutureStageModal.css';

const ICON_MAP = {
  BookOpen,
  BarChart3,
  Brain,
  Target,
  Rocket,
  GitBranch,
  Trophy,
  Flame,
  FileText,
  Settings,
  User
};

export default function FutureStageModal({ feature, onClose }) {
  if (!feature) return null;

  const IconComponent = ICON_MAP[feature.icon] || Sparkles;

  return (
    <div className="future-modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="future-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="future-modal-close" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        <div className="future-modal-icon-badge">
          <IconComponent size={28} />
        </div>

        <div className="future-modal-stage-pill">
          <Sparkles size={14} />
          <span>{feature.stage || 'Upcoming Stage'}</span>
        </div>

        <h3 className="future-modal-title">{feature.label} Feature</h3>
        
        <p className="future-modal-text">
          <strong>This feature will be available in a future stage.</strong>
        </p>

        <p className="future-modal-subtext">
          Stage 3 focuses exclusively on the <strong>Student Dashboard & Command Center</strong>. 
          The full interactive <em>{feature.label}</em> system will be built in {feature.stage || 'the upcoming stages'}.
        </p>

        <div className="future-modal-actions">
          <button className="btn btn-primary btn-block" onClick={onClose}>
            <span>Return to Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
