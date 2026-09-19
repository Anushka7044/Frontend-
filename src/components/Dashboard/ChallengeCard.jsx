import React, { useState } from 'react';
import { Target, Flame, Calendar, Clock, CheckSquare, Square, ArrowRight, Play } from 'lucide-react';
import { CURRENT_CHALLENGE } from '../../data/dashboardData';
import './ChallengeCard.css';

export default function ChallengeCard({ onSelectFeature, challenges = [], onNavigate }) {
  const activeChallenge = challenges.find(c => c.status === 'active') || challenges[0] || CURRENT_CHALLENGE;
  const initialTasks = activeChallenge.todayTasks || activeChallenge.tasks || CURRENT_CHALLENGE.tasks;
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="glass-card dashboard-card challenge-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon-tag amber">
            <Target size={18} />
          </div>
          <div>
            <h3 className="card-title">{activeChallenge.title}</h3>
            <p className="card-subtitle">{activeChallenge.goal || activeChallenge.subtitle}</p>
          </div>
        </div>

        <div className="challenge-streak-tag">
          <Flame size={14} className="streak-flame" />
          <span>{activeChallenge.streak || 12} Day Streak</span>
        </div>
      </div>

      {/* Challenge Metrics Row */}
      <div className="challenge-metrics-grid">
        <div className="challenge-metric-item">
          <span className="c-metric-label">Current Progress</span>
          <span className="c-metric-val">{activeChallenge.progress}%</span>
        </div>
        <div className="challenge-metric-item">
          <span className="c-metric-label">Timeline</span>
          <span className="c-metric-val">Day {activeChallenge.currentDay || 1} / {activeChallenge.durationDays || activeChallenge.totalDays || 30}</span>
        </div>
        <div className="challenge-metric-item">
          <span className="c-metric-label">Remaining</span>
          <span className="c-metric-val">{activeChallenge.daysRemaining} days</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="challenge-bar-wrapper">
        <div className="challenge-track">
          <div 
            className="challenge-fill"
            style={{ width: `${activeChallenge.progress}%` }}
          />
        </div>
        <div className="challenge-bar-meta">
          <span>Sprint {activeChallenge.progress}% Completed</span>
          <span>Target: 100% by Day {activeChallenge.durationDays || 30}</span>
        </div>
      </div>

      {/* Daily Task Checklist Preview */}
      <div className="daily-tasks-box">
        <div className="daily-tasks-header">
          <span className="daily-tasks-title">Today's Tasks ({completedCount}/{tasks.length})</span>
          <span className="daily-tasks-sub">Click to toggle</span>
        </div>

        <div className="tasks-interactive-list">
          {tasks.map(task => (
            <button 
              key={task.id}
              className={`task-checkbox-item ${task.completed ? 'completed' : ''}`}
              onClick={() => toggleTask(task.id)}
              aria-label={`Toggle ${task.title}`}
            >
              {task.completed ? (
                <CheckSquare size={17} className="task-icon checked" />
              ) : (
                <Square size={17} className="task-icon" />
              )}
              <span className="task-text">{task.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="challenge-cta-row">
        <button 
          className="btn btn-primary btn-block"
          onClick={() => {
            if (onNavigate) {
              onNavigate('challenges');
            } else if (onSelectFeature) {
              onSelectFeature({ label: activeChallenge.title, stage: 'Stage 5', icon: 'Target' });
            }
          }}
        >
          <Play size={16} />
          <span>Continue Challenge</span>
        </button>
      </div>
    </div>
  );
}
