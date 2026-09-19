import React, { useState, useMemo, useEffect } from 'react';
import { 
  Target, Flame, Calendar, Clock, Plus, CheckCircle2, 
  Play, Pause, X, ArrowRight, CheckSquare, Square, 
  Sparkles, Award, AlertCircle, RefreshCw, Zap, Rocket 
} from 'lucide-react';
import { 
  CHALLENGE_DURATIONS, 
  CHALLENGE_DIFFICULTIES, 
  STREAK_STATS, 
  generateDefaultTasks, 
  generateTimeline 
} from '../data/challengesData';
import './Challenges.css';

export default function Challenges({ 
  challenges, 
  setChallenges, 
  skills = [], 
  onNavigate, 
  onChallengeCompleted,
  initialSkillToStart = null
}) {
  // Tabs State
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'completed' | 'all'

  // Modal States
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailChallenge, setDetailChallenge] = useState(null);
  const [pauseConfirmChallenge, setPauseConfirmChallenge] = useState(null);
  const [completedCelebration, setCompletedCelebration] = useState(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Form State for Creating Challenge
  const [selectedSkill, setSelectedSkill] = useState(skills[0]?.name || 'Python');
  const [selectedDuration, setSelectedDuration] = useState('30'); // '7' | '14' | '30' | 'custom'
  const [customDays, setCustomDays] = useState(21);
  const [goalText, setGoalText] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [formError, setFormError] = useState('');

  // Auto-open creation modal if requested with initial skill (e.g. from Skills page)
  useEffect(() => {
    if (initialSkillToStart) {
      setSelectedSkill(initialSkillToStart);
      setGoalText(`Master ${initialSkillToStart} core fundamentals and build a working capstone project.`);
      setCreateModalOpen(true);
    }
  }, [initialSkillToStart]);

  // Derived Statistics
  const activeCount = challenges.filter(c => c.status === 'active').length;
  const completedCount = challenges.filter(c => c.status === 'completed').length;
  const totalCount = challenges.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filtered Challenges List
  const filteredChallenges = useMemo(() => {
    if (activeTab === 'active') return challenges.filter(c => c.status === 'active' || c.status === 'paused');
    if (activeTab === 'completed') return challenges.filter(c => c.status === 'completed');
    return challenges;
  }, [challenges, activeTab]);

  // Available skills list for dropdown
  const skillOptions = useMemo(() => {
    if (skills && skills.length > 0) {
      return skills.map(s => s.name);
    }
    return ['Python', 'JavaScript', 'HTML & CSS', 'React.js', 'Git & GitHub', 'SQL & Databases', 'Java'];
  }, [skills]);

  // Duration in number of days
  const actualDurationDays = selectedDuration === 'custom' ? Number(customDays) : Number(selectedDuration);

  // Handle Challenge Creation
  const handleStartChallenge = (e) => {
    e.preventDefault();
    setFormError('');

    if (!goalText.trim()) {
      setFormError('Please define what you want to achieve with this challenge.');
      return;
    }

    if (selectedDuration === 'custom') {
      if (!customDays || customDays < 3 || customDays > 90) {
        setFormError('Custom duration must be between 3 and 90 days.');
        return;
      }
    }

    const newChallenge = {
      id: `chal-${Date.now()}`,
      title: `${actualDurationDays}-Day ${selectedSkill} Challenge`,
      skill: selectedSkill,
      goal: goalText.trim(),
      difficulty,
      durationDays: actualDurationDays,
      currentDay: 1,
      daysRemaining: actualDurationDays,
      progress: 0,
      streak: 1,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + actualDurationDays * 86400000).toISOString().split('T')[0],
      color: '#F97316',
      dailyCommitment: '30–60 minutes',
      relatedProject: `${selectedSkill} Portfolio Solution`,
      todayTasks: generateDefaultTasks(selectedSkill, 1),
      timeline: generateTimeline(actualDurationDays)
    };

    setChallenges(prev => [newChallenge, ...prev]);
    setCreateModalOpen(false);
    setGoalText('');
    showToast(`🎉 Your ${actualDurationDays}-day ${selectedSkill} challenge has started! Keep showing up every day.`);
  };

  // Toggle Daily Task Completion
  const handleToggleTask = (challengeId, taskId) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id !== challengeId) return ch;

      const updatedTasks = ch.todayTasks.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      const completedTasksCount = updatedTasks.filter(t => t.completed).length;
      const taskPct = Math.round((completedTasksCount / updatedTasks.length) * 100);

      // Recalculate challenge overall progress
      const baseProgress = Math.round(((ch.currentDay - 1) / ch.durationDays) * 100);
      const dayProgressContribution = Math.round((1 / ch.durationDays) * taskPct);
      const newProgress = Math.min(100, baseProgress + dayProgressContribution);

      const updated = {
        ...ch,
        todayTasks: updatedTasks,
        progress: newProgress
      };

      if (detailChallenge && detailChallenge.id === challengeId) {
        setDetailChallenge(updated);
      }
      return updated;
    }));
  };

  // Toggle Pause / Resume Challenge
  const handleTogglePause = (challenge) => {
    const newStatus = challenge.status === 'paused' ? 'active' : 'paused';
    setChallenges(prev => prev.map(c => c.id === challenge.id ? { ...c, status: newStatus } : c));
    setPauseConfirmChallenge(null);
    if (detailChallenge && detailChallenge.id === challenge.id) {
      setDetailChallenge(prev => ({ ...prev, status: newStatus }));
    }
    showToast(newStatus === 'paused' ? 'Challenge paused. Take a breath and resume whenever you are ready.' : 'Challenge resumed! Keep up the momentum.');
  };

  // Trigger Challenge Completion
  const handleCompleteChallenge = (challenge) => {
    const completed = {
      ...challenge,
      status: 'completed',
      progress: 100,
      daysRemaining: 0
    };

    setChallenges(prev => prev.map(c => c.id === challenge.id ? completed : c));
    setDetailChallenge(null);
    setCompletedCelebration(completed);

    if (onChallengeCompleted) {
      onChallengeCompleted(completed);
    }
  };

  return (
    <div className="challenges-page-container">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="notes-toast-notification" role="status" aria-live="polite">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="challenges-header-row">
        <div className="challenges-title-area">
          <div className="challenges-header-icon">
            <Target size={24} />
          </div>
          <div>
            <h1 className="challenges-page-title">My Challenges</h1>
            <p className="challenges-page-subtitle">
              Turn your learning goals into focused, time-based challenges.
            </p>
          </div>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => {
            setGoalText('');
            setFormError('');
            setCreateModalOpen(true);
          }}
        >
          <Plus size={18} />
          <span>Start New Challenge</span>
        </button>
      </div>

      {/* 4 Summary Statistics Cards */}
      <div className="challenges-stats-grid">
        <div className="glass-card challenge-stat-card">
          <div className="c-stat-icon-wrapper orange">
            <Target size={20} />
          </div>
          <div>
            <span className="c-stat-label">Active</span>
            <div className="c-stat-val">{activeCount}</div>
          </div>
        </div>

        <div className="glass-card challenge-stat-card">
          <div className="c-stat-icon-wrapper emerald">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="c-stat-label">Completed</span>
            <div className="c-stat-val">{completedCount}</div>
          </div>
        </div>

        <div className="glass-card challenge-stat-card">
          <div className="c-stat-icon-wrapper amber">
            <Flame size={20} />
          </div>
          <div>
            <span className="c-stat-label">Current Streak</span>
            <div className="c-stat-val">{STREAK_STATS.currentStreak} Days</div>
          </div>
        </div>

        <div className="glass-card challenge-stat-card">
          <div className="c-stat-icon-wrapper purple">
            <Zap size={20} />
          </div>
          <div>
            <span className="c-stat-label">Completion Rate</span>
            <div className="c-stat-val">{completionRate}%</div>
          </div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="challenges-controls-bar">
        <div className="challenges-tabs-row" role="tablist">
          <button 
            role="tab"
            aria-selected={activeTab === 'active'}
            className={`challenge-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            <span>Active Challenges</span>
            <span className="tab-badge-pill">{activeCount}</span>
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'completed'}
            className={`challenge-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <span>Completed Challenges</span>
            <span className="tab-badge-pill">{completedCount}</span>
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'all'}
            className={`challenge-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span>All Challenges</span>
            <span className="tab-badge-pill">{totalCount}</span>
          </button>
        </div>
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length > 0 ? (
        <div className="challenges-cards-grid">
          {filteredChallenges.map(challenge => {
            const isPaused = challenge.status === 'paused';
            const isDone = challenge.status === 'completed';

            return (
              <div 
                key={challenge.id} 
                className={`glass-card challenge-item-card ${isPaused ? 'paused' : ''}`}
              >
                <div>
                  <div className="challenge-card-header">
                    <span className="c-skill-badge">
                      <Sparkles size={12} />
                      <span>{challenge.skill}</span>
                    </span>
                    <span className={`c-status-pill ${challenge.status}`}>
                      {challenge.status}
                    </span>
                  </div>

                  <h3 className="challenge-card-title">{challenge.title}</h3>
                  <p className="challenge-card-goal">"{challenge.goal}"</p>

                  {/* Metrics 3-Col */}
                  <div className="challenge-card-metrics">
                    <div className="c-m-item">
                      <span className="c-m-label">Timeline</span>
                      <span className="c-m-value">
                        {isDone ? 'Completed' : `Day ${challenge.currentDay} / ${challenge.durationDays}`}
                      </span>
                    </div>
                    <div className="c-m-item">
                      <span className="c-m-label">Remaining</span>
                      <span className="c-m-value">
                        {isDone ? '0 days' : `${challenge.daysRemaining} days`}
                      </span>
                    </div>
                    <div className="c-m-item">
                      <span className="c-m-label">Streak</span>
                      <span className="c-m-value streak-orange">
                        <Flame size={14} />
                        <span>{challenge.streak}d</span>
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="c-progress-block">
                    <div className="c-progress-header">
                      <span>Overall Progress</span>
                      <span className="c-progress-pct">{challenge.progress}%</span>
                    </div>
                    <div className="c-progress-track">
                      <div 
                        className="c-progress-fill"
                        style={{ 
                          width: `${challenge.progress}%`,
                          background: isDone 
                            ? 'linear-gradient(90deg, #10B981, #34D399)'
                            : isPaused 
                              ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                              : 'linear-gradient(90deg, #F97316, #FB923C)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="challenge-card-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setDetailChallenge(challenge)}
                  >
                    <Play size={15} />
                    <span>{isDone ? 'Review Challenge' : 'Continue Challenge'}</span>
                  </button>
                  {!isDone && (
                    <button 
                      className="btn btn-outline btn-icon-only"
                      onClick={() => setPauseConfirmChallenge(challenge)}
                      title={isPaused ? 'Resume Challenge' : 'Pause Challenge'}
                    >
                      {isPaused ? <Play size={16} /> : <Pause size={16} />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="challenges-empty-state">
          <div className="empty-icon-halo">
            <Target size={32} />
          </div>
          <h3 className="empty-title">No active challenges yet.</h3>
          <p className="empty-sub">
            Pick a skill you want to master and turn it into an achievable daily sprint.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus size={16} />
            <span>Start Your First Challenge</span>
          </button>
        </div>
      )}

      {/* --- MODAL 1: START NEW CHALLENGE WIZARD --- */}
      {createModalOpen && (
        <div className="challenge-modal-backdrop" onClick={() => setCreateModalOpen(false)}>
          <div className="challenge-modal-card" onClick={e => e.stopPropagation()}>
            <div className="challenge-modal-header">
              <div className="c-modal-title-group">
                <h3>Start a New Learning Challenge</h3>
                <p>Set a dedicated target, define your duration, and commit to daily progress.</p>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setCreateModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleStartChallenge}>
              {formError && (
                <div className="missed-day-banner" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#F87171' }}>
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Skill Selection */}
              <div className="form-field-group">
                <label htmlFor="challenge-skill-select">Select Skill to Challenge</label>
                <select 
                  id="challenge-skill-select"
                  className="form-select-control"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  {skillOptions.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              {/* 2. Duration Selection */}
              <div className="form-field-group">
                <label>Challenge Duration</label>
                <div className="duration-pills-row">
                  {CHALLENGE_DURATIONS.map(dur => (
                    <button 
                      key={dur.id}
                      type="button"
                      className={`duration-pill-btn ${selectedDuration === dur.id ? 'active' : ''}`}
                      onClick={() => setSelectedDuration(dur.id)}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>

                {selectedDuration === 'custom' && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Number of Days (Min: 3, Max: 90)</label>
                    <input 
                      type="number"
                      min={3}
                      max={90}
                      className="form-input-control"
                      value={customDays}
                      onChange={(e) => setCustomDays(e.target.value)}
                      placeholder="e.g. 21"
                    />
                  </div>
                )}
              </div>

              {/* 3. Challenge Goal */}
              <div className="form-field-group">
                <label htmlFor="challenge-goal">What do you want to achieve? *</label>
                <textarea 
                  id="challenge-goal"
                  className="form-textarea-control"
                  rows={3}
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                  placeholder="Example: Learn Python functions and solve 20 practice algorithm problems."
                  required
                />
              </div>

              {/* 4. Difficulty */}
              <div className="form-field-group">
                <label>Challenge Difficulty</label>
                <div className="difficulty-pills-row">
                  {CHALLENGE_DIFFICULTIES.map(diff => (
                    <button 
                      key={diff}
                      type="button"
                      className={`difficulty-pill-btn ${difficulty === diff ? 'active' : ''}`}
                      onClick={() => setDifficulty(diff)}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Challenge Preview */}
              <div className="challenge-preview-box">
                <div className="preview-box-title">
                  <Sparkles size={14} />
                  <span>Challenge Preview</span>
                </div>
                <div className="preview-grid">
                  <div>
                    <span className="p-item-label">Skill: </span>
                    <span className="p-item-val">{selectedSkill}</span>
                  </div>
                  <div>
                    <span className="p-item-label">Duration: </span>
                    <span className="p-item-val">{actualDurationDays || 30} Days</span>
                  </div>
                  <div>
                    <span className="p-item-label">Difficulty: </span>
                    <span className="p-item-val">{difficulty}</span>
                  </div>
                  <div>
                    <span className="p-item-label">Commitment: </span>
                    <span className="p-item-val">30–60 minutes daily</span>
                  </div>
                </div>
              </div>

              <div className="challenge-modal-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Play size={16} />
                  <span>Start Challenge</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: CHALLENGE DETAIL VIEW --- */}
      {detailChallenge && (
        <div className="challenge-modal-backdrop" onClick={() => setDetailChallenge(null)}>
          <div className="challenge-modal-card" style={{ maxWidth: '720px' }} onClick={e => e.stopPropagation()}>
            <div className="challenge-modal-header">
              <div className="c-modal-title-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="c-skill-badge">{detailChallenge.skill}</span>
                  <span className={`c-status-pill ${detailChallenge.status}`}>{detailChallenge.status}</span>
                </div>
                <h3>{detailChallenge.title}</h3>
                <p>"{detailChallenge.goal}"</p>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setDetailChallenge(null)}
                aria-label="Close detail modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Meta 4-Col Grid */}
            <div className="detail-meta-grid">
              <div className="detail-meta-card">
                <span className="detail-m-label">Current Progress</span>
                <span className="detail-m-val">{detailChallenge.progress}%</span>
              </div>
              <div className="detail-meta-card">
                <span className="detail-m-label">Timeline</span>
                <span className="detail-m-val">Day {detailChallenge.currentDay} / {detailChallenge.durationDays}</span>
              </div>
              <div className="detail-meta-card">
                <span className="detail-m-label">Days Left</span>
                <span className="detail-m-val">{detailChallenge.daysRemaining} days</span>
              </div>
              <div className="detail-meta-card">
                <span className="detail-m-label">Active Streak</span>
                <span className="detail-m-val" style={{ color: '#F97316' }}>🔥 {detailChallenge.streak}d</span>
              </div>
            </div>

            {/* Missed Day Encouragement State */}
            {detailChallenge.status === 'active' && (
              <div className="missed-day-banner">
                <Flame size={18} />
                <span>
                  <strong>Daily Consistency:</strong> Showing up every day builds compound learning. Complete today's tasks to advance your streak!
                </span>
              </div>
            )}

            {/* Daily Challenge Tasks Checklist */}
            <div className="daily-tasks-section">
              <div className="daily-tasks-header-row">
                <h4 className="daily-tasks-title">
                  <CheckSquare size={18} style={{ color: '#10B981' }} />
                  <span>Day {detailChallenge.currentDay} Tasks Checklist</span>
                </h4>
                <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  {detailChallenge.todayTasks?.filter(t => t.completed).length || 0} / {detailChallenge.todayTasks?.length || 0} completed
                </span>
              </div>

              <div className="tasks-checklist-list">
                {detailChallenge.todayTasks?.map(task => (
                  <button
                    key={task.id}
                    className={`task-interactive-row ${task.completed ? 'completed' : ''}`}
                    onClick={() => handleToggleTask(detailChallenge.id, task.id)}
                    aria-label={`Toggle task ${task.title}`}
                  >
                    {task.completed ? (
                      <CheckSquare size={18} className="task-chk-icon checked" />
                    ) : (
                      <Square size={18} className="task-chk-icon" />
                    )}
                    <span>{task.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Timeline Day Tracker */}
            <div className="challenge-timeline-section">
              <h4 className="timeline-section-title">Visual Day Tracker ({detailChallenge.durationDays} Days)</h4>
              <div className="timeline-days-matrix">
                {detailChallenge.timeline?.map(dayItem => (
                  <div 
                    key={dayItem.day}
                    className={`timeline-day-chip ${dayItem.state}`}
                    title={`Day ${dayItem.day}: ${dayItem.state}`}
                  >
                    <span>D{dayItem.day}</span>
                    <span>{dayItem.state === 'completed' ? '✓' : dayItem.state === 'current' ? '→' : '·'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="challenge-modal-actions">
              <button 
                className="btn btn-outline"
                onClick={() => handleTogglePause(detailChallenge)}
              >
                {detailChallenge.status === 'paused' ? (
                  <>
                    <Play size={15} />
                    <span>Resume Challenge</span>
                  </>
                ) : (
                  <>
                    <Pause size={15} />
                    <span>Pause Challenge</span>
                  </>
                )}
              </button>

              {detailChallenge.status !== 'completed' && (
                <button 
                  className="btn btn-primary"
                  onClick={() => handleCompleteChallenge(detailChallenge)}
                >
                  <CheckCircle2 size={16} />
                  <span>Mark as Completed</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: PAUSE CONFIRMATION --- */}
      {pauseConfirmChallenge && (
        <div className="challenge-modal-backdrop" onClick={() => setPauseConfirmChallenge(null)}>
          <div className="challenge-modal-card" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
            <div className="c-modal-title-group" style={{ marginBottom: '1rem' }}>
              <h3>Pause this Challenge?</h3>
              <p>
                Pausing freezes your daily task checklist. You can resume at any time without losing your completed milestones.
              </p>
            </div>
            <div className="challenge-modal-actions">
              <button 
                className="btn btn-outline"
                onClick={() => setPauseConfirmChallenge(null)}
              >
                Continue Challenge
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => handleTogglePause(pauseConfirmChallenge)}
              >
                Pause Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: CHALLENGE COMPLETED CELEBRATION --- */}
      {completedCelebration && (
        <div className="challenge-modal-backdrop" onClick={() => setCompletedCelebration(null)}>
          <div className="challenge-modal-card" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="challenge-completed-dialog">
              <div className="c-celebrate-icon">
                <Award size={38} />
              </div>
              <h2 className="challenges-page-title" style={{ fontSize: '1.65rem' }}>
                🎉 Challenge Complete!
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: '0.75rem 0 1.5rem', lineHeight: '1.6' }}>
                You completed your <strong>{completedCelebration.title}</strong>!
                <br />
                <span style={{ color: '#10B981', fontWeight: '600' }}>Skill completed: {completedCelebration.skill}</span>
                <br />
                <span style={{ color: '#A855F7' }}>Achievement progress: Ready to build your practical capstone project.</span>
              </p>

              <button 
                className="btn btn-primary btn-block"
                onClick={() => {
                  setCompletedCelebration(null);
                  if (onNavigate) onNavigate('projects');
                }}
              >
                <Rocket size={16} />
                <span>View Your Practical Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
