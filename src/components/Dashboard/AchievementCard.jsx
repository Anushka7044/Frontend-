import React, { useState } from 'react';
import { Trophy, Flame, Rocket, Award, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { RECENT_ACHIEVEMENTS } from '../../data/dashboardData';
import './AchievementCard.css';

const BADGE_ICONS = {
  Trophy,
  Flame,
  Rocket,
  Award
};

export default function AchievementCard({ onSelectFeature, achievements = [], onNavigate }) {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const unlockedBadges = achievements && achievements.length > 0 
    ? achievements.filter(a => a.unlocked) 
    : RECENT_ACHIEVEMENTS;
  const displayBadges = unlockedBadges.slice(0, 3);

  return (
    <div className="glass-card dashboard-card achievement-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon-tag amber">
            <Trophy size={18} />
          </div>
          <div>
            <h3 className="card-title">Recent Achievements</h3>
            <p className="card-subtitle">{unlockedBadges.length} Badges Unlocked</p>
          </div>
        </div>

        <span className="achieve-tier-badge">Tier 2 Scholar</span>
      </div>

      {/* Achievement Badges List */}
      <div className="achievements-list">
        {displayBadges.map(badge => {
          const Icon = BADGE_ICONS[badge.icon] || Trophy;

          return (
            <div 
              key={badge.id}
              className="achievement-item-row"
              onClick={() => setSelectedBadge(badge)}
              title="Click to view badge credentials"
            >
              <div 
                className="badge-icon-box"
                style={{ 
                  backgroundColor: `${badge.badgeColor || '#F59E0B'}18`, 
                  borderColor: `${badge.badgeColor || '#F59E0B'}40`,
                  color: badge.badgeColor || '#F59E0B'
                }}
              >
                <Icon size={20} />
              </div>

              <div className="badge-text-content">
                <div className="badge-name-row">
                  <h4 className="badge-name">{badge.title}</h4>
                  <span className="badge-date">{badge.unlockedDate || badge.date || 'Earned'}</span>
                </div>
                <p className="badge-desc">{badge.description}</p>
              </div>

              <div className="badge-verified-tag">
                <CheckCircle2 size={14} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Popup Preview when clicked */}
      {selectedBadge && (
        <div className="badge-quick-modal" onClick={() => setSelectedBadge(null)}>
          <div className="badge-modal-bubble glass-card" onClick={e => e.stopPropagation()}>
            <div className="badge-bubble-header">
              <Sparkles size={16} className="sparkle-gold" />
              <span>Verified Proof of Work Badge</span>
            </div>
            <h5>{selectedBadge.title}</h5>
            <p>{selectedBadge.description}</p>
            <span className="badge-issue-time">Verified on platform • {selectedBadge.unlockedDate || selectedBadge.date || 'Earned'}</span>
            <button className="btn btn-outline btn-sm btn-block" onClick={() => setSelectedBadge(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="card-footer-action">
        <button 
          className="card-text-btn"
          onClick={() => {
            if (onNavigate) {
              onNavigate('achievements');
            } else if (onSelectFeature) {
              onSelectFeature({ label: 'Achievements', stage: 'Stage 5', icon: 'Trophy' });
            }
          }}
        >
          <span>View all {unlockedBadges.length} unlocked badges</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
