import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Circle, Calendar, Sparkles, ArrowRight, 
  Target, Rocket, BookOpen, GitBranch, RefreshCw 
} from 'lucide-react';
import './TodayPlanCard.css';

// Central icon map guaranteeing safe resolution for stored tasks
const TASK_ICONS = {
  Target,
  Rocket,
  BookOpen,
  GitBranch,
  CheckCircle2,
  Sparkles
};

// Default tasks with serializable string icon names
const DEFAULT_TODAY_TASKS = [
  {
    id: 'task-1',
    text: 'Solve 2 dictionary & set algorithmic problems',
    category: 'Challenge',
    route: 'challenges',
    icon: 'Target',
    iconColor: '#10B981',
    completed: true
  },
  {
    id: 'task-2',
    text: 'Work on Student Expense Tracker milestone',
    category: 'Project',
    route: 'projects',
    icon: 'Rocket',
    iconColor: '#A855F7',
    completed: false
  },
  {
    id: 'task-3',
    text: 'Revise Discrete Mathematics recurrence relations',
    category: 'Study',
    route: 'notes',
    icon: 'BookOpen',
    iconColor: '#6366F1',
    completed: false
  },
  {
    id: 'task-4',
    text: 'Make a code commit to keep 12-day streak alive',
    category: 'Streak',
    route: 'github',
    icon: 'GitBranch',
    iconColor: '#0EA5E9',
    completed: true
  }
];

/**
 * Safely resolves a task icon to a valid React component
 * Prevents "Element type is invalid: expected string or class/function but got: object"
 */
function resolveTaskIcon(iconVal) {
  // If already a valid function or component
  if (typeof iconVal === 'function') {
    return iconVal;
  }
  // If a string key in our known icon map
  if (typeof iconVal === 'string' && TASK_ICONS[iconVal]) {
    return TASK_ICONS[iconVal];
  }
  // If a valid React forwardRef element
  if (typeof iconVal === 'object' && iconVal !== null && iconVal.$$typeof) {
    return iconVal;
  }
  // Fallback icon
  return Target;
}

export default function TodayPlanCard({ onNavigate }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_today_plan');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize loaded tasks to guarantee icons are valid strings,
          // instantly healing any corrupted {} from prior JSON.stringify cycles.
          return parsed.map((item, idx) => {
            const fallback = DEFAULT_TODAY_TASKS[idx] || DEFAULT_TODAY_TASKS[0];
            return {
              ...fallback,
              ...item,
              icon: typeof item.icon === 'string' && TASK_ICONS[item.icon] 
                ? item.icon 
                : fallback.icon,
              completed: Boolean(item.completed)
            };
          });
        }
      }
      return DEFAULT_TODAY_TASKS;
    } catch {
      return DEFAULT_TODAY_TASKS;
    }
  });

  useEffect(() => {
    try {
      // Store tasks with serializable string icons
      const serializableTasks = tasks.map(t => ({
        id: t.id,
        text: t.text,
        category: t.category,
        route: t.route,
        icon: typeof t.icon === 'string' ? t.icon : 'Target',
        iconColor: t.iconColor,
        completed: Boolean(t.completed)
      }));
      localStorage.setItem('studyhub_today_plan', JSON.stringify(serializableTasks));
    } catch (e) {}
  }, [tasks]);

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const resetTasks = () => {
    setTasks(DEFAULT_TODAY_TASKS.map(t => ({ ...t, completed: false })));
  };

  const safeTasks = Array.isArray(tasks) && tasks.length > 0 ? tasks : DEFAULT_TODAY_TASKS;
  const completedCount = safeTasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / safeTasks.length) * 100);
  const isAllComplete = completedCount === safeTasks.length;

  return (
    <div className="glass-card today-plan-card">
      <div className="today-plan-header">
        <div className="plan-title-group">
          <div className="plan-icon-tag">
            <Calendar size={18} />
          </div>
          <div>
            <div className="plan-title-row">
              <h3 className="plan-title">Today's Growth Plan</h3>
              <span className="plan-date-pill">Today</span>
            </div>
            <p className="plan-subtitle">Your personalized 90-minute daily learning agenda</p>
          </div>
        </div>

        <div className="plan-header-controls">
          <button 
            className="plan-reset-btn" 
            onClick={resetTasks}
            title="Reset checklist"
          >
            <RefreshCw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="plan-progress-block">
        <div className="plan-progress-labels">
          <span className="plan-progress-stats">{completedCount} of {safeTasks.length} Completed</span>
          <span className="plan-progress-percent">{progressPercent}%</span>
        </div>
        <div className="plan-progress-track">
          <div 
            className="plan-progress-bar"
            style={{ 
              width: `${progressPercent}%`,
              background: isAllComplete 
                ? 'linear-gradient(90deg, #10B981, #059669)' 
                : 'linear-gradient(90deg, #6366F1, #A855F7)'
            }}
          />
        </div>
      </div>

      {/* All Complete Banner */}
      {isAllComplete && (
        <div className="plan-completed-banner">
          <Sparkles size={16} />
          <span>Awesome job! You finished today's growth agenda and reinforced your streak!</span>
        </div>
      )}

      {/* Tasks List */}
      <div className="plan-tasks-list">
        {safeTasks.map(task => {
          const TaskIcon = resolveTaskIcon(task.icon);
          return (
            <div 
              key={task.id} 
              className={`plan-task-item ${task.completed ? 'completed' : ''}`}
            >
              <button 
                className="plan-checkbox-btn"
                onClick={() => toggleTask(task.id)}
                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {task.completed ? (
                  <CheckCircle2 size={18} className="checkbox-icon checked" />
                ) : (
                  <Circle size={18} className="checkbox-icon" />
                )}
              </button>

              <div 
                className="plan-task-label-wrap"
                onClick={() => toggleTask(task.id)}
              >
                <span className="plan-task-text">{task.text}</span>
                <span className="plan-task-tag" style={{ color: task.iconColor }}>
                  {task.category}
                </span>
              </div>

              {task.route && onNavigate && (
                <button 
                  className="plan-jump-btn"
                  onClick={() => onNavigate(task.route)}
                  title={`Go to ${task.category}`}
                >
                  <TaskIcon size={14} style={{ color: task.iconColor }} />
                  <ArrowRight size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
