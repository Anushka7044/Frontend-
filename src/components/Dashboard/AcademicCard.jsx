import React, { useState } from 'react';
import { GraduationCap, TrendingUp, BarChart2, BookOpen, Award, ChevronRight } from 'lucide-react';
import { ACADEMIC_DATA } from '../../data/dashboardData';
import './AcademicCard.css';

export default function AcademicCard({ onSelectFeature, semesters: propSemesters, onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'subjects'

  const activeSemesters = propSemesters || ACADEMIC_DATA.semesters;
  const currentSem = activeSemesters[activeSemesters.length - 1];

  // Calculate live CGPA
  const calculatedCgpa = propSemesters
    ? (activeSemesters.reduce((a, b) => a + (b.sgpa * (b.credits || 20)), 0) / activeSemesters.reduce((a, b) => a + (b.credits || 20), 0)).toFixed(2)
    : ACADEMIC_DATA.cgpa;
  const calculatedPct = (calculatedCgpa * 10).toFixed(1);

  // Calculations for semester graph visualization (using clean SVG)
  const minVal = 7.0;
  const maxVal = 9.2;
  const width = 360;
  const height = 140;
  const paddingX = 40;
  const paddingY = 25;

  const points = activeSemesters.map((item, index) => {
    const x = paddingX + (index * (width - 2 * paddingX)) / Math.max(1, activeSemesters.length - 1);
    const y = height - paddingY - ((item.sgpa - minVal) / (maxVal - minVal)) * (height - 2 * paddingY);
    return { x, y, sem: item.name || item.sem, sgpa: item.sgpa };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
  const areaD = points.length > 0 ? `${pathD} L ${points[points.length - 1].x},${height - 15} L ${points[0].x},${height - 15} Z` : '';

  return (
    <div className="glass-card dashboard-card academic-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon-tag cyan">
            <GraduationCap size={18} />
          </div>
          <div>
            <h3 className="card-title">Academic Performance</h3>
            <p className="card-subtitle">{currentSem?.name || ACADEMIC_DATA.currentSemester} • B.Tech CSE</p>
          </div>
        </div>

        {/* Tab switcher: Overview vs Subjects */}
        <div className="card-pill-tabs">
          <button 
            className={`card-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Progression
          </button>
          <button 
            className={`card-tab-btn ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            Subjects
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="academic-stats-row">
        <div className="academic-stat-box">
          <span className="stat-box-label">Cumulative CGPA</span>
          <div className="stat-box-val-row">
            <span className="stat-big-number">{calculatedCgpa}</span>
            <span className="stat-max-label">/ 10.0</span>
          </div>
          <div className="stat-trend-tag positive">
            <TrendingUp size={12} />
            <span>Consistent Growth</span>
          </div>
        </div>

        <div className="academic-stat-box">
          <span className="stat-box-label">Percentage Equivalent</span>
          <div className="stat-box-val-row">
            <span className="stat-big-number">{calculatedPct}%</span>
          </div>
          <span className="stat-subtext">First Class with Distinction</span>
        </div>

        <div className="academic-stat-box">
          <span className="stat-box-label">Current Standing</span>
          <div className="stat-box-val-row">
            <span className="stat-highlight-text">Top 8%</span>
          </div>
          <span className="stat-subtext">Batch of 240 students</span>
        </div>
      </div>

      {activeTab === 'overview' ? (
        /* Semester Progression Graph */
        <div className="academic-graph-wrapper">
          <div className="graph-header">
            <span className="graph-title">SGPA Progression Across Semesters</span>
            <span className="graph-badge">Continuous Upward Growth</span>
          </div>

          <div className="svg-chart-container">
            <svg viewBox={`0 0 ${width} ${height}`} className="academic-svg-chart">
              <defs>
                <linearGradient id="academicGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={height - 20} x2={width - paddingX} y2={height - 20} stroke="rgba(255,255,255,0.1)" />

              {/* Area Fill */}
              <path d={areaD} fill="url(#academicGradient)" />

              {/* Line Stroke */}
              <path d={pathD} fill="none" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data Points and Labels */}
              {points.map((pt, i) => (
                <g key={pt.sem} className="chart-node">
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#0A0E17" stroke="#06B6D4" strokeWidth="2.5" />
                  <text x={pt.x} y={pt.y - 10} textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="600">
                    {pt.sgpa.toFixed(2)}
                  </text>
                  <text x={pt.x} y={height - 4} textAnchor="middle" fill="#94A3B8" fontSize="10">
                    {pt.sem}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      ) : (
        /* Subject-Wise Mastery Breakdown */
        <div className="subjects-breakdown-list">
          {ACADEMIC_DATA.subjects.map((subj) => (
            <div key={subj.name} className="subject-row-item">
              <div className="subject-meta-top">
                <span className="subject-name">{subj.name}</span>
                <div className="subject-score-badge">
                  <span className="subject-percentage">{subj.score}%</span>
                  <span className="grade-pill">{subj.grade}</span>
                </div>
              </div>

              <div className="subject-progress-track">
                <div 
                  className="subject-progress-fill" 
                  style={{ width: `${subj.score}%`, backgroundColor: subj.color }}
                />
              </div>

              <div className="subject-status-row">
                <span className="subject-status-tag" style={{ color: subj.color }}>
                  {subj.status}
                </span>
                <span className="subject-scale">Target: 90%+</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Card Action Link */}
      <div className="card-footer-action">
        <button 
          className="card-text-btn"
          onClick={() => onNavigate ? onNavigate('results') : onSelectFeature({ label: 'Academic Results & Marksheets', stage: 'Stage 4', icon: 'BarChart3' })}
        >
          <span>View detailed semester marksheets</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
