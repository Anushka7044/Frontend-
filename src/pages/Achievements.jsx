import React, { useState, useMemo } from 'react';
import { 
  Trophy, Flame, Rocket, Award, GitBranch, BookOpen, 
  GraduationCap, Target, Zap, Brain, Compass, CheckCircle2, 
  Lock, X, Sparkles, Layers, ShieldCheck 
} from 'lucide-react';
import { 
  ACHIEVEMENT_CATEGORIES, 
  calculateTotalXP 
} from '../data/achievementsData';
import './Achievements.css';

const ICON_MAP = {
  Trophy,
  Flame,
  Rocket,
  Award,
  GitBranch,
  BookOpen,
  GraduationCap,
  Target,
  Zap,
  Brain,
  Compass,
  CheckCircle2,
  Layers
};

export default function Achievements({ achievements }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Statistics
  const earnedCount = achievements.filter(a => a.unlocked).length;
  const lockedCount = achievements.filter(a => !a.unlocked).length;
  const totalCount = achievements.length;
  const totalXP = calculateTotalXP(achievements);

  // Filtered Achievements
  const filteredAchievements = useMemo(() => {
    if (activeTab === 'All') return achievements;
    if (activeTab === 'Earned') return achievements.filter(a => a.unlocked);
    if (activeTab === 'Locked') return achievements.filter(a => !a.unlocked);
    return achievements.filter(a => a.category === activeTab);
  }, [achievements, activeTab]);

  return (
    <div className="achievements-page-container">
      {/* Page Header */}
      <div className="achievements-header-row">
        <div className="achievements-title-area">
          <div className="achievements-header-icon">
            <Trophy size={24} />
          </div>
          <div>
            <h1 className="achievements-page-title">Achievements</h1>
            <p className="achievements-page-subtitle">
              Celebrate the milestones you achieve along your learning journey.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Summary Statistics Cards */}
      <div className="achievements-stats-grid">
        <div className="glass-card achievement-stat-card">
          <div className="a-stat-icon-wrapper amber">
            <Trophy size={20} />
          </div>
          <div>
            <span className="a-stat-label">Earned</span>
            <div className="a-stat-val">{earnedCount}</div>
          </div>
        </div>

        <div className="glass-card achievement-stat-card">
          <div className="a-stat-icon-wrapper gray">
            <Lock size={20} />
          </div>
          <div>
            <span className="a-stat-label">Locked</span>
            <div className="a-stat-val">{lockedCount}</div>
          </div>
        </div>

        <div className="glass-card achievement-stat-card">
          <div className="a-stat-icon-wrapper blue">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="a-stat-label">Total Badges</span>
            <div className="a-stat-val">{totalCount}</div>
          </div>
        </div>

        <div className="glass-card achievement-stat-card">
          <div className="a-stat-icon-wrapper gold">
            <Zap size={20} />
          </div>
          <div>
            <span className="a-stat-label">Total Platform XP</span>
            <div className="a-stat-val">{totalXP.toLocaleString()} XP</div>
          </div>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="achievements-controls-bar">
        <div className="achievements-tabs-row" role="tablist">
          {['All', 'Earned', 'Locked', 'Mastery', 'Consistency', 'Projects', 'Academic'].map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`achievement-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span>{tab}</span>
              {tab === 'Earned' && <span className="tab-badge-pill">{earnedCount}</span>}
              {tab === 'Locked' && <span className="tab-badge-pill">{lockedCount}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Cards Grid */}
      <div className="achievements-cards-grid">
        {filteredAchievements.map(ach => {
          const Icon = ICON_MAP[ach.icon] || Trophy;
          const isUnlocked = ach.unlocked;

          return (
            <div 
              key={ach.id}
              className={`glass-card achievement-card-item ${isUnlocked ? 'unlocked' : 'locked'}`}
              onClick={() => setSelectedAchievement(ach)}
              title="Click to view badge credentials"
            >
              <div>
                <div className="a-card-top">
                  <div 
                    className="a-badge-icon-box"
                    style={{ 
                      backgroundColor: isUnlocked ? `${ach.badgeColor}18` : 'rgba(255, 255, 255, 0.04)',
                      borderColor: isUnlocked ? `${ach.badgeColor}40` : 'rgba(255, 255, 255, 0.08)',
                      color: isUnlocked ? ach.badgeColor : '#64748B'
                    }}
                  >
                    {isUnlocked ? <Icon size={24} /> : <Lock size={22} />}
                  </div>

                  <div className="a-card-info">
                    <h3>{ach.title}</h3>
                    <p className="a-card-desc">{ach.description}</p>
                  </div>
                </div>

                {/* Progress bar for locked achievements */}
                {!isUnlocked && ach.progress && (
                  <div className="locked-progress-box">
                    <div className="locked-progress-meta">
                      <span>Progress</span>
                      <span>{ach.progress.current} / {ach.progress.target}</span>
                    </div>
                    <div className="locked-progress-track">
                      <div 
                        className="locked-progress-fill"
                        style={{ 
                          width: `${Math.min(100, Math.round((ach.progress.current / ach.progress.target) * 100))}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="a-card-footer">
                <span className="a-xp-pill">
                  <Zap size={13} />
                  <span>+{ach.xp} XP</span>
                </span>
                <span className={`a-status-text ${isUnlocked ? 'earned' : ''}`}>
                  {isUnlocked ? `Earned • ${ach.unlockedDate}` : 'Locked Milestone'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedAchievement && (
        <div className="challenge-modal-backdrop" onClick={() => setSelectedAchievement(null)}>
          <div className="challenge-modal-card" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="achievement-detail-dialog">
              <div 
                className="a-detail-halo"
                style={{ 
                  backgroundColor: selectedAchievement.unlocked ? `${selectedAchievement.badgeColor}20` : 'rgba(255, 255, 255, 0.05)',
                  borderColor: selectedAchievement.unlocked ? selectedAchievement.badgeColor : 'rgba(255, 255, 255, 0.1)',
                  color: selectedAchievement.unlocked ? selectedAchievement.badgeColor : '#64748B'
                }}
              >
                {selectedAchievement.unlocked ? (
                  React.createElement(ICON_MAP[selectedAchievement.icon] || Trophy, { size: 40 })
                ) : (
                  <Lock size={36} />
                )}
              </div>

              <span className="a-detail-category-pill">{selectedAchievement.category} Milestone</span>
              <h3 className="a-detail-title">{selectedAchievement.title}</h3>
              <p className="a-detail-desc">{selectedAchievement.description}</p>

              <div className="a-detail-spec-box">
                <div className="a-spec-row">
                  <span className="a-spec-label">Unlock Criteria:</span>
                  <span className="a-spec-val">{selectedAchievement.requirement}</span>
                </div>
                <div className="a-spec-row">
                  <span className="a-spec-label">Reward Points:</span>
                  <span className="a-spec-val" style={{ color: '#F59E0B' }}>+{selectedAchievement.xp} XP</span>
                </div>
                <div className="a-spec-row">
                  <span className="a-spec-label">Status:</span>
                  <span className="a-spec-val" style={{ color: selectedAchievement.unlocked ? '#10B981' : '#94A3B8' }}>
                    {selectedAchievement.unlocked ? `Unlocked on ${selectedAchievement.unlockedDate}` : 'Incomplete'}
                  </span>
                </div>
                {selectedAchievement.relatedSkillOrProject && (
                  <div className="a-spec-row">
                    <span className="a-spec-label">Connected Subject:</span>
                    <span className="a-spec-val">{selectedAchievement.relatedSkillOrProject}</span>
                  </div>
                )}
              </div>

              <button 
                className="btn btn-outline btn-block"
                onClick={() => setSelectedAchievement(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
