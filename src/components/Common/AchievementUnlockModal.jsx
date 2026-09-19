import React from 'react';
import { Trophy, Sparkles, ArrowRight, Zap } from 'lucide-react';
import './AchievementUnlockModal.css';

export default function AchievementUnlockModal({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <div className="achievement-unlock-backdrop" onClick={onClose}>
      <div 
        className="achievement-unlock-card"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="unlock-title"
      >
        <div className="achievement-shimmer-beam" />

        <div className="achievement-trophy-halo">
          <Trophy size={42} className="trophy-icon-gold" />
        </div>

        <div className="achievement-banner-tag">
          <Sparkles size={13} />
          <span>Achievement Unlocked!</span>
        </div>

        <h3 id="unlock-title" className="achievement-unlock-title">
          {achievement.title}
        </h3>

        <p className="achievement-unlock-desc">
          {achievement.description}
        </p>

        <div className="achievement-reward-badge">
          <Zap size={16} />
          <span>+{achievement.xp || 100} XP Awarded</span>
        </div>

        <button 
          className="achievement-continue-btn"
          onClick={onClose}
          autoFocus
        >
          <span>Continue Journey</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
