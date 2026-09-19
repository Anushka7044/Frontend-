import React, { useState } from 'react';
import { Flame, Award, Calendar, Zap, CheckCircle2 } from 'lucide-react';
import { STREAK_DATA } from '../../data/dashboardData';
import './StreakCard.css';

export default function StreakCard({ onSelectFeature, onNavigate }) {
  const [hoveredDay, setHoveredDay] = useState(null);

  const getIntensityClass = (val) => {
    if (val === 3) return 'intensity-high';
    if (val === 2) return 'intensity-med';
    if (val === 1) return 'intensity-low';
    return 'intensity-none';
  };

  return (
    <div className="glass-card dashboard-card streak-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon-tag orange">
            <Flame size={18} />
          </div>
          <div>
            <h3 className="card-title">Learning Streak & Consistency</h3>
            <p className="card-subtitle">Continuous Daily Practice</p>
          </div>
        </div>

        <span className="streak-rank-pill">
          <Zap size={13} />
          <span>Top 5%</span>
        </span>
      </div>

      {/* Streak Comparison Metrics */}
      <div className="streak-metrics-row">
        <div className="streak-box active-streak">
          <span className="streak-box-label">Current Streak</span>
          <div className="streak-box-val">
            <Flame size={20} className="flame-pulse" />
            <span className="big-streak-num">{STREAK_DATA.currentStreak}</span>
            <span className="streak-unit">Days</span>
          </div>
          <span className="streak-box-sub">Active today • Keep it going!</span>
        </div>

        <div className="streak-box">
          <span className="streak-box-label">All-Time Best</span>
          <div className="streak-box-val">
            <Award size={18} className="trophy-icon" />
            <span className="big-streak-num">{STREAK_DATA.longestStreak}</span>
            <span className="streak-unit">Days</span>
          </div>
          <span className="streak-box-sub">Personal record set in July</span>
        </div>

        <div className="streak-box">
          <span className="streak-box-label">Total Active Days</span>
          <div className="streak-box-val">
            <Calendar size={18} className="calendar-icon" />
            <span className="big-streak-num">{STREAK_DATA.totalDaysActive}</span>
            <span className="streak-unit">Days</span>
          </div>
          <span className="streak-box-sub">Across 2 semesters</span>
        </div>
      </div>

      {/* 4-Week Activity Heatmap */}
      <div className="heatmap-container">
        <div className="heatmap-header">
          <span className="heatmap-title">4-Week Activity Matrix</span>
          <div className="heatmap-legend">
            <span>Less</span>
            <span className="legend-cell intensity-none" />
            <span className="legend-cell intensity-low" />
            <span className="legend-cell intensity-med" />
            <span className="legend-cell intensity-high" />
            <span>More</span>
          </div>
        </div>

        {/* Day of week labels */}
        <div className="heatmap-days-header">
          {STREAK_DATA.dayNames.map(day => (
            <span key={day} className="heatmap-day-label">{day}</span>
          ))}
        </div>

        {/* Heatmap Grid Rows (Weeks) */}
        <div className="heatmap-matrix">
          {STREAK_DATA.heatmapWeeks.map((wk, wkIdx) => (
            <div key={wk.week} className="heatmap-week-row">
              {wk.days.map((dayVal, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`heatmap-cell ${getIntensityClass(dayVal)}`}
                  onMouseEnter={() => setHoveredDay(`${wk.week}, ${STREAK_DATA.dayNames[dayIdx]}: ${dayVal > 0 ? `${dayVal * 45} mins focused study` : 'Rest day'}`)}
                  onMouseLeave={() => setHoveredDay(null)}
                  title={`${wk.week}, ${STREAK_DATA.dayNames[dayIdx]}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Dynamic Tooltip / Status Display */}
        <div className="heatmap-tooltip-bar">
          <span className="tooltip-text">
            {hoveredDay ? hoveredDay : '🔥 Streak is safe! Completed today\'s Python study block.'}
          </span>
        </div>
      </div>

      <div className="card-footer-action">
        <button 
          className="card-text-btn"
          onClick={() => {
            if (onNavigate) {
              onNavigate('progress');
            } else if (onSelectFeature) {
              onSelectFeature({ label: 'Progress & Consistency Tracker', stage: 'Stage 5', icon: 'Flame' });
            }
          }}
        >
          <span>View monthly habit breakdown</span>
          <CheckCircle2 size={14} />
        </button>
      </div>
    </div>
  );
}
