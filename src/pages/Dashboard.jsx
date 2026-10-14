import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import AIAssistant from '../components/Dashboard/AIAssistant';
import FutureStageModal from '../components/Dashboard/FutureStageModal';
import { STUDENT_PROFILE } from '../data/dashboardData';
import { 
  calculateResumeCompleteness, 
  calculateLinkedInStrength, 
  calculateProfileCompleteness 
} from '../data/careerData';
import { getDashboardAIFocusItems } from '../services/aiService';
import { 
  Zap, Clock, TrendingUp, ChevronDown, Play, Check, 
  MoreHorizontal, ArrowRight, Briefcase, FileText, 
  Github, Linkedin, Bot, Sparkles, Plus, CheckSquare, Square
} from 'lucide-react';
import './Dashboard.css';

// 14-day productivity study breakdown dataset
const PRODUCTIVITY_DAYS = [
  { day: '01', modeling: 25, animation: 35, sculpting: 15, totalHours: '4.5h' },
  { day: '02', modeling: 20, animation: 30, sculpting: 10, totalHours: '3.6h' },
  { day: '03', modeling: 30, animation: 40, sculpting: 20, totalHours: '5.4h' },
  { day: '04', modeling: 15, animation: 20, sculpting: 10, totalHours: '2.7h' },
  { day: '05', modeling: 25, animation: 30, sculpting: 15, totalHours: '4.2h' },
  { day: '06', modeling: 35, animation: 35, sculpting: 15, totalHours: '5.1h' },
  { day: '07', modeling: 20, animation: 25, sculpting: 10, totalHours: '3.3h' },
  { day: '08', modeling: 30, animation: 45, sculpting: 20, totalHours: '5.7h' },
  { day: '09', modeling: 20, animation: 30, sculpting: 15, totalHours: '3.9h' },
  { day: '10', modeling: 25, animation: 35, sculpting: 20, totalHours: '4.8h' },
  { day: '11', modeling: 15, animation: 20, sculpting: 10, totalHours: '2.7h' },
  { day: '12', modeling: 30, animation: 30, sculpting: 15, totalHours: '4.5h' },
  { day: '13', modeling: 35, animation: 40, sculpting: 15, totalHours: '5.4h' },
  { day: '14', modeling: 25, animation: 35, sculpting: 15, totalHours: '4.5h' }
];

// Initial Tasks
const INITIAL_TASKS = [
  { id: 1, time: '07:00 - 07:45 AM', title: 'Rigging Character', lesson: 'Lesson 3', completed: true },
  { id: 2, time: '09:00 - 10:00 AM', title: 'Animation Basics', lesson: 'Lesson 1', completed: false },
  { id: 3, time: '11:30 - 12:15 PM', title: 'Lighting & Rendering', lesson: 'Lesson 5', completed: false },
  { id: 4, time: '02:00 - 03:00 PM', title: '3D Modeling Exercise', lesson: 'Lesson 2', completed: false }
];

export default function Dashboard({ 
  user, 
  onNavigate, 
  onLogout, 
  notes = [], 
  skills = [], 
  semesters = [], 
  challenges = [],
  projects = [],
  achievements = [],
  githubData,
  resumeData,
  linkedinData,
  onSelectFeature,
  embedded = false 
}) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [futureModalFeature, setFutureModalFeature] = useState(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [careerHubOpen, setCareerHubOpen] = useState(true);

  // Stateful interactive tasks (with local storage persistence)
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_ref_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const toggleTask = (taskId) => {
    setTasks(prev => {
      const updated = prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      try {
        localStorage.setItem('studyhub_ref_tasks', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save tasks', err);
      }
      return updated;
    });
  };

  // Active student user profile
  const activeUser = {
    ...STUDENT_PROFILE,
    ...user
  };

  const handleSelectFutureFeature = onSelectFeature || ((feature) => {
    setFutureModalFeature(feature);
  });

  const completedProjectsCount = projects.filter(p => p.status === 'completed').length;
  const earnedAchievementsCount = achievements.filter(a => a.unlocked).length;

  // Career Metrics for Dashboard
  const resumeCompleteness = useMemo(() => {
    return resumeData ? calculateResumeCompleteness(resumeData).percentage : 82;
  }, [resumeData]);

  const linkedinStrength = useMemo(() => {
    return linkedinData ? calculateLinkedInStrength(linkedinData).percentage : 72;
  }, [linkedinData]);

  const profileCompletion = useMemo(() => {
    return calculateProfileCompleteness(activeUser, resumeData, linkedinData, projects, skills).percentage;
  }, [activeUser, resumeData, linkedinData, projects, skills]);

  const githubStatus = githubData?.isConnected !== false ? 'Connected' : 'Disconnected';

  const aiFocusItems = useMemo(() => {
    return getDashboardAIFocusItems({
      skills,
      projects,
      challenges,
      resume: resumeData,
      github: githubData
    });
  }, [skills, projects, challenges, resumeData, githubData]);

  // Main Dashboard Content
  const dashboardContent = (
    <div className="dashboard-content-inner">
      <div className="dashboard-reference-grid">
        
        {/* ===================================================================
            ROW 1: LEARNING DAYS (3 CARDS) + PRODUCTIVITY (STACKED BAR CHART)
            =================================================================== */}
        <section className="ref-grid-row ref-row-1" aria-label="Learning metrics and productivity">
          
          {/* Left Column: 3 Compact Learning Days Cards */}
          <div className="learning-days-col">
            {/* Card 1: Days In A Row */}
            <div 
              className="learning-day-stat-card"
              onClick={() => onNavigate && onNavigate('progress')}
              role="button"
              tabIndex={0}
              aria-label="View activity streak"
            >
              <div className="day-stat-icon-wrap">
                <Zap size={22} />
              </div>
              <div className="day-stat-body">
                <span className="day-stat-label">Days In A Row</span>
                <span className="day-stat-value">{activeUser.streak || 44}</span>
              </div>
              <div className="day-stat-pill positive">
                <span>+35%</span>
              </div>
            </div>

            {/* Card 2: Days This Month */}
            <div 
              className="learning-day-stat-card"
              onClick={() => onNavigate && onNavigate('progress')}
              role="button"
              tabIndex={0}
              aria-label="View monthly learning days"
            >
              <div className="day-stat-icon-wrap">
                <Clock size={22} />
              </div>
              <div className="day-stat-body">
                <span className="day-stat-label">Days This Month</span>
                <span className="day-stat-value">19</span>
              </div>
              <div className="day-stat-pill negative">
                <span>-15%</span>
              </div>
            </div>

            {/* Card 3: Total Days */}
            <div 
              className="learning-day-stat-card"
              onClick={() => onNavigate && onNavigate('progress')}
              role="button"
              tabIndex={0}
              aria-label="View total learning days"
            >
              <div className="day-stat-icon-wrap">
                <TrendingUp size={22} />
              </div>
              <div className="day-stat-body">
                <span className="day-stat-label">Total Days</span>
                <span className="day-stat-value">115</span>
              </div>
              <div className="day-stat-pill positive">
                <span>+20%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Productivity Stacked Column Chart */}
          <div className="ref-card productivity-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Productivity</h3>
              
              <div className="productivity-header-actions">
                <div className="ref-legend-row">
                  <div className="ref-legend-item">
                    <span className="ref-legend-dot" style={{ background: '#2D664E' }} />
                    <span>Modeling</span>
                  </div>
                  <div className="ref-legend-item">
                    <span className="ref-legend-dot" style={{ background: '#78C9A0' }} />
                    <span>Animation</span>
                  </div>
                  <div className="ref-legend-item">
                    <span className="ref-legend-dot" style={{ background: '#F8B95B' }} />
                    <span>Sculpting</span>
                  </div>
                </div>

                <button className="ref-date-pill" aria-label="Select date range">
                  <span>01 - 14 May</span>
                  <ChevronDown size={13} style={{ color: '#71867A' }} />
                </button>
              </div>
            </div>

            {/* 14-day Stacked Column Chart */}
            <div className="productivity-bars-container" role="img" aria-label="Daily productivity 14-day stacked chart">
              {PRODUCTIVITY_DAYS.map((d, index) => (
                <div 
                  key={d.day} 
                  className="productivity-day-bar-wrap"
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {hoveredBarIndex === index && (
                    <div className="productivity-tooltip">
                      May {d.day}: {d.totalHours}
                    </div>
                  )}

                  <div className="productivity-bar-track">
                    <div 
                      className="bar-segment bar-segment-modeling" 
                      style={{ height: `${d.modeling}%` }} 
                      title={`Modeling: ${d.modeling}%`}
                    />
                    <div 
                      className="bar-segment bar-segment-animation" 
                      style={{ height: `${d.animation}%` }} 
                      title={`Animation: ${d.animation}%`}
                    />
                    <div 
                      className="bar-segment bar-segment-sculpting" 
                      style={{ height: `${d.sculpting}%` }} 
                      title={`Sculpting: ${d.sculpting}%`}
                    />
                  </div>
                  <span className="productivity-day-label">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ===================================================================
            ROW 2: PROGRESS (WAVY AREA CHART) + TASK (TODAY TIME SLOTS)
            =================================================================== */}
        <section className="ref-grid-row ref-row-2" aria-label="Study progress and tasks">
          
          {/* Left Column: Progress Area Chart Card */}
          <div className="ref-card progress-chart-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Progress</h3>

              <div className="ref-legend-row">
                <div className="ref-legend-item">
                  <span className="ref-legend-dot" style={{ background: '#FF965B' }} />
                  <span>Modeling</span>
                </div>
                <div className="ref-legend-item">
                  <span className="ref-legend-dot" style={{ background: '#398A69' }} />
                  <span>Animation</span>
                </div>

                <button className="ref-date-pill" aria-label="Select date range">
                  <span>01 - 07 June</span>
                  <ChevronDown size={13} style={{ color: '#71867A' }} />
                </button>
              </div>
            </div>

            {/* Area Chart Container */}
            <div className="progress-chart-container">
              {/* Friday Marker Tooltip */}
              <div className="progress-friday-marker">
                <span className="progress-marker-pill">3h 15m</span>
                <span className="progress-marker-pin" />
                <span className="progress-marker-line" />
              </div>

              <svg 
                className="progress-chart-svg" 
                viewBox="0 0 540 180" 
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  {/* Apricot / Coral Gradient */}
                  <linearGradient id="coralGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF965B" stopOpacity="0.38" />
                    <stop offset="85%" stopColor="#FF965B" stopOpacity="0.02" />
                  </linearGradient>

                  {/* Mint / Emerald Gradient */}
                  <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#398A69" stopOpacity="0.45" />
                    <stop offset="85%" stopColor="#398A69" stopOpacity="0.04" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Lines */}
                <line x1="30" y1="30" x2="520" y2="30" stroke="rgba(57, 138, 105, 0.12)" strokeDasharray="4 4" />
                <line x1="30" y1="65" x2="520" y2="65" stroke="rgba(57, 138, 105, 0.12)" strokeDasharray="4 4" />
                <line x1="30" y1="100" x2="520" y2="100" stroke="rgba(57, 138, 105, 0.12)" strokeDasharray="4 4" />
                <line x1="30" y1="135" x2="520" y2="135" stroke="rgba(57, 138, 105, 0.12)" strokeDasharray="4 4" />

                {/* Y-Axis Labels */}
                <text x="14" y="34" fill="#71867A" fontSize="10" fontWeight="600">5h</text>
                <text x="14" y="69" fill="#71867A" fontSize="10" fontWeight="600">4h</text>
                <text x="14" y="104" fill="#71867A" fontSize="10" fontWeight="600">3h</text>
                <text x="14" y="139" fill="#71867A" fontSize="10" fontWeight="600">2h</text>

                {/* Modeling Area (Coral Curve) */}
                <path 
                  d="M 40 125 C 90 95, 140 135, 190 75 C 240 25, 290 85, 340 60 C 385 45, 430 95, 475 70 C 495 60, 515 80, 520 85 L 520 150 L 40 150 Z" 
                  fill="url(#coralGrad)"
                />
                <path 
                  d="M 40 125 C 90 95, 140 135, 190 75 C 240 25, 290 85, 340 60 C 385 45, 430 95, 475 70 C 495 60, 515 80, 520 85" 
                  fill="none" 
                  stroke="#FF965B" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Animation Area (Emerald Curve) */}
                <path 
                  d="M 40 140 C 90 125, 140 145, 190 110 C 240 85, 290 115, 340 95 C 385 68, 430 110, 475 100 C 495 95, 515 110, 520 115 L 520 150 L 40 150 Z" 
                  fill="url(#emeraldGrad)"
                />
                <path 
                  d="M 40 140 C 90 125, 140 145, 190 110 C 240 85, 290 115, 340 95 C 385 68, 430 110, 475 100 C 495 95, 515 110, 520 115" 
                  fill="none" 
                  stroke="#398A69" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* X-Axis Day Labels */}
                <text x="45" y="172" fill="#71867A" fontSize="11" fontWeight="600">Mon</text>
                <text x="118" y="172" fill="#71867A" fontSize="11" fontWeight="600">Tue</text>
                <text x="195" y="172" fill="#71867A" fontSize="11" fontWeight="600">Wed</text>
                <text x="272" y="172" fill="#71867A" fontSize="11" fontWeight="600">Thu</text>
                <text x="370" y="172" fill="#24372E" fontSize="11" fontWeight="800">Fri</text>
                <text x="445" y="172" fill="#71867A" fontSize="11" fontWeight="600">Sat</text>
                <text x="500" y="172" fill="#71867A" fontSize="11" fontWeight="600">Sun</text>
              </svg>
            </div>
          </div>

          {/* Right Column: Task Section */}
          <div className="ref-card task-card">
            <div className="ref-card-header">
              <div className="task-header-wrap">
                <h3 className="ref-card-title">Task</h3>
                <span className="task-date-subtitle">TODAY | 29TH JUNE, 2023</span>
              </div>

              <button 
                className="btn-icon-subtle" 
                aria-label="Add new task"
                onClick={() => onNavigate && onNavigate('challenges')}
                style={{ background: 'none', border: 'none', color: '#71867A', cursor: 'pointer' }}
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Task Item Rows */}
            <div className="task-list-items" role="list">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className="task-item-row"
                  onClick={() => toggleTask(task.id)}
                  role="listitem"
                >
                  <span className="task-time-badge">{task.time}</span>
                  <div className="task-text-group">
                    <p className={`task-title ${task.completed ? 'is-completed' : ''}`}>
                      {task.title}
                    </p>
                    <span className="task-lesson-sub">{task.lesson}</span>
                  </div>
                  
                  <button 
                    className={`task-check-button ${task.completed ? 'is-checked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                    aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
                  >
                    {task.completed && <Check size={14} strokeWidth={3} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ===================================================================
            ROW 3: SKILLS (DONUT GAUGE) + CURRENT COURSES (PROGRESS RINGS)
            =================================================================== */}
        <section className="ref-grid-row ref-row-3" aria-label="Skills distribution and active courses">
          
          {/* Left Column: Skills Donut Chart Card */}
          <div className="ref-card skills-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Skills</h3>
              
              <button 
                aria-label="Skill details" 
                onClick={() => onNavigate && onNavigate('skills')}
                style={{ background: 'none', border: 'none', color: '#71867A', cursor: 'pointer' }}
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="skills-body-wrap">
              {/* Circular SVG Donut Chart */}
              <div className="skills-donut-container">
                <svg width="145" height="145" viewBox="0 0 145 145" aria-hidden="true">
                  {/* Background Track */}
                  <circle cx="72.5" cy="72.5" r="52" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="16" />
                  
                  {/* Donut Segments (circumference = 2 * PI * 52 ≈ 326.7) */}
                  {/* 1. Modelling (15/52 ≈ 28.8% -> stroke-dasharray="94 233") */}
                  <circle 
                    cx="72.5" cy="72.5" r="52" 
                    fill="none" 
                    stroke="#24372E" 
                    strokeWidth="16" 
                    strokeDasharray="94 233" 
                    strokeDashoffset="0"
                  />
                  {/* 2. Texturing (15/52 ≈ 28.8% -> stroke-dasharray="94 233") */}
                  <circle 
                    cx="72.5" cy="72.5" r="52" 
                    fill="none" 
                    stroke="#F8B95B" 
                    strokeWidth="16" 
                    strokeDasharray="94 233" 
                    strokeDashoffset="-94"
                  />
                  {/* 3. Animation (12/52 ≈ 23.1% -> stroke-dasharray="75 252") */}
                  <circle 
                    cx="72.5" cy="72.5" r="52" 
                    fill="none" 
                    stroke="#78C9A0" 
                    strokeWidth="16" 
                    strokeDasharray="75 252" 
                    strokeDashoffset="-188"
                  />
                  {/* 4. Sculpting (10/52 ≈ 19.2% -> stroke-dasharray="63 264") */}
                  <circle 
                    cx="72.5" cy="72.5" r="52" 
                    fill="none" 
                    stroke="#FF965B" 
                    strokeWidth="16" 
                    strokeDasharray="63 264" 
                    strokeDashoffset="-263"
                  />
                </svg>

                {/* Donut Center Count */}
                <div className="skills-donut-center-text">
                  <span className="donut-center-number">52</span>
                  <span className="donut-center-label">Total lessons</span>
                </div>
              </div>

              {/* Skills Breakdown Legend */}
              <div className="skills-legend-list">
                <div className="skills-legend-row">
                  <div className="skills-legend-left">
                    <span className="ref-legend-dot" style={{ background: '#78C9A0' }} />
                    <span>Animation</span>
                  </div>
                  <span className="skills-legend-count">12</span>
                </div>

                <div className="skills-legend-row">
                  <div className="skills-legend-left">
                    <span className="ref-legend-dot" style={{ background: '#398A69' }} />
                    <span>Rigging</span>
                  </div>
                  <span className="skills-legend-count">10</span>
                </div>

                <div className="skills-legend-row">
                  <div className="skills-legend-left">
                    <span className="ref-legend-dot" style={{ background: '#F8B95B' }} />
                    <span>Texturing</span>
                  </div>
                  <span className="skills-legend-count">15</span>
                </div>

                <div className="skills-legend-row">
                  <div className="skills-legend-left">
                    <span className="ref-legend-dot" style={{ background: '#FF965B' }} />
                    <span>Sculpting</span>
                  </div>
                  <span className="skills-legend-count">10</span>
                </div>

                <div className="skills-legend-row">
                  <div className="skills-legend-left">
                    <span className="ref-legend-dot" style={{ background: '#24372E' }} />
                    <span>Modelling</span>
                  </div>
                  <span className="skills-legend-count">15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Current Courses Card */}
          <div className="ref-card current-courses-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Current Courses</h3>

              <button 
                className="ref-date-pill"
                onClick={() => onNavigate && onNavigate('skills')}
                aria-label="View all courses"
              >
                <span>View all</span>
                <ArrowRight size={13} style={{ color: '#71867A' }} />
              </button>
            </div>

            {/* Courses List */}
            <div className="courses-grid-items">
              {/* Course 1: Animation (3/15) */}
              <div 
                className="course-item-row"
                onClick={() => onNavigate && onNavigate('projects')}
              >
                <div className="course-left-group">
                  <div className="course-ring-wrap">
                    <svg width="42" height="42" viewBox="0 0 42 42">
                      <circle cx="21" cy="21" r="17" fill="none" stroke="rgba(57,138,105,0.15)" strokeWidth="3" />
                      <circle 
                        cx="21" cy="21" r="17" 
                        fill="none" 
                        stroke="#398A69" 
                        strokeWidth="3" 
                        strokeDasharray="106.8" 
                        strokeDashoffset="85"
                        strokeLinecap="round" 
                      />
                    </svg>
                    <Play size={13} className="course-play-center" fill="#398A69" />
                  </div>
                  <div className="course-info-group">
                    <h4 className="course-name">Animation</h4>
                    <span className="course-ratio">3/15</span>
                  </div>
                </div>
                <ArrowRight size={15} className="course-action-arrow" />
              </div>

              {/* Course 2: Modelling (5/7) */}
              <div 
                className="course-item-row"
                onClick={() => onNavigate && onNavigate('projects')}
              >
                <div className="course-left-group">
                  <div className="course-ring-wrap">
                    <svg width="42" height="42" viewBox="0 0 42 42">
                      <circle cx="21" cy="21" r="17" fill="none" stroke="rgba(57,138,105,0.15)" strokeWidth="3" />
                      <circle 
                        cx="21" cy="21" r="17" 
                        fill="none" 
                        stroke="#398A69" 
                        strokeWidth="3" 
                        strokeDasharray="106.8" 
                        strokeDashoffset="31"
                        strokeLinecap="round" 
                      />
                    </svg>
                    <Play size={13} className="course-play-center" fill="#398A69" />
                  </div>
                  <div className="course-info-group">
                    <h4 className="course-name">Modelling</h4>
                    <span className="course-ratio">5/7</span>
                  </div>
                </div>
                <ArrowRight size={15} className="course-action-arrow" />
              </div>

              {/* Course 3: Sculpt (1/2) */}
              <div 
                className="course-item-row"
                onClick={() => onNavigate && onNavigate('projects')}
              >
                <div className="course-left-group">
                  <div className="course-ring-wrap">
                    <svg width="42" height="42" viewBox="0 0 42 42">
                      <circle cx="21" cy="21" r="17" fill="none" stroke="rgba(57,138,105,0.15)" strokeWidth="3" />
                      <circle 
                        cx="21" cy="21" r="17" 
                        fill="none" 
                        stroke="#398A69" 
                        strokeWidth="3" 
                        strokeDasharray="106.8" 
                        strokeDashoffset="53.4"
                        strokeLinecap="round" 
                      />
                    </svg>
                    <Play size={13} className="course-play-center" fill="#398A69" />
                  </div>
                  <div className="course-info-group">
                    <h4 className="course-name">Sculpt</h4>
                    <span className="course-ratio">1/2</span>
                  </div>
                </div>
                <ArrowRight size={15} className="course-action-arrow" />
              </div>
            </div>
          </div>

        </section>

        {/* ===================================================================
            SECTION 5 COMPLIANCE: PRESERVED CAREER & ACADEMIC MILESTONES HUB
            Preserves 100% of live student data, GitHub, Resume, LinkedIn & AI
            =================================================================== */}
        <section className="ref-career-hub-card" aria-label="Student career and academic milestones">
          <div className="career-hub-header">
            <div className="career-hub-title-group">
              <div className="career-hub-icon-wrap">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="ref-card-title">Professional Career & Academic Milestones</h3>
                <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: '#71867A' }}>
                  Real-time synchronization across Resume, GitHub streaks, LinkedIn profile, and Semester 4 marks.
                </p>
              </div>
            </div>

            <button 
              className="hub-btn secondary"
              onClick={() => setCareerHubOpen(!careerHubOpen)}
            >
              <span>{careerHubOpen ? 'Collapse' : 'Expand Details'}</span>
              <ChevronDown 
                size={14} 
                style={{ transform: careerHubOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} 
              />
            </button>
          </div>

          {careerHubOpen && (
            <>
              {/* 6 Real Student Metrics */}
              <div className="career-hub-metrics-grid">
                <div className="career-hub-metric-tile" onClick={() => onNavigate && onNavigate('resume')} role="button" tabIndex={0}>
                  <span className="career-tile-lbl">Resume</span>
                  <span className="career-tile-val" style={{ color: '#398A69' }}>{resumeCompleteness}%</span>
                </div>
                <div className="career-hub-metric-tile" onClick={() => onNavigate && onNavigate('github')} role="button" tabIndex={0}>
                  <span className="career-tile-lbl">GitHub</span>
                  <span className="career-tile-val" style={{ color: '#24372E' }}>{githubStatus}</span>
                </div>
                <div className="career-hub-metric-tile" onClick={() => onNavigate && onNavigate('linkedin')} role="button" tabIndex={0}>
                  <span className="career-tile-lbl">LinkedIn</span>
                  <span className="career-tile-val" style={{ color: '#398A69' }}>{linkedinStrength}%</span>
                </div>
                <div className="career-hub-metric-tile" onClick={() => onNavigate && onNavigate('profile')} role="button" tabIndex={0}>
                  <span className="career-tile-lbl">Profile</span>
                  <span className="career-tile-val" style={{ color: '#24372E' }}>{profileCompletion}%</span>
                </div>
                <div className="career-hub-metric-tile" onClick={() => onNavigate && onNavigate('projects')} role="button" tabIndex={0}>
                  <span className="career-tile-lbl">Projects</span>
                  <span className="career-tile-val">{completedProjectsCount || 4} Completed</span>
                </div>
                <div className="career-hub-metric-tile" onClick={() => onNavigate && onNavigate('achievements')} role="button" tabIndex={0}>
                  <span className="career-tile-lbl">Badges</span>
                  <span className="career-tile-val" style={{ color: '#F8B95B' }}>{earnedAchievementsCount || 7} Unlocked</span>
                </div>
              </div>

              {/* Action Buttons to all working modules */}
              <div className="career-hub-actions-row">
                <span style={{ fontSize: '0.82rem', color: '#71867A', fontWeight: 600 }}>
                  Quick Launch:
                </span>

                <div className="career-hub-btns">
                  <button className="hub-btn primary" onClick={() => onNavigate && onNavigate('resume')}>
                    <FileText size={14} />
                    <span>Resume Builder</span>
                  </button>
                  <button className="hub-btn secondary" onClick={() => onNavigate && onNavigate('github')}>
                    <Github size={14} />
                    <span>GitHub Repos</span>
                  </button>
                  <button className="hub-btn secondary" onClick={() => onNavigate && onNavigate('linkedin')}>
                    <Linkedin size={14} />
                    <span>LinkedIn Strength</span>
                  </button>
                  <button className="hub-btn secondary" onClick={() => onNavigate && onNavigate('ai')}>
                    <Bot size={14} style={{ color: '#398A69' }} />
                    <span>AI Mentor</span>
                  </button>
                  <button className="hub-btn secondary" onClick={() => onNavigate && onNavigate('results')}>
                    <TrendingUp size={14} />
                    <span>Academics & CGPA</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

      </div>
    </div>
  );

  // If embedded in App.jsx shell, return dashboardContent directly
  if (embedded) {
    return dashboardContent;
  }

  // Standalone mode with full window shell
  return (
    <div className="dashboard-app-layout">
      {/* Ambient Botanical Background Lighting */}
      <div className="ambient-mint-orb orb-1" aria-hidden="true" />
      <div className="ambient-mint-orb orb-2" aria-hidden="true" />

      {/* Large Floating Translucent Window Surface */}
      <div className="dashboard-window-surface">
        {/* 1. Sidebar Component */}
        <Sidebar 
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onSelectFeature={handleSelectFutureFeature}
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
          user={activeUser}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />

        {/* 2. Main Content Body */}
        <div className="dashboard-main-viewport">
          <Header 
            user={activeUser}
            onLogout={onLogout}
            onSelectFeature={handleSelectFutureFeature}
            onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            onNavigate={onNavigate}
            notes={notes}
            skills={skills}
            challenges={challenges}
            projects={projects}
            achievements={achievements}
          />

          <main className="dashboard-content-scroll">
            {dashboardContent}
          </main>
        </div>
      </div>

      {/* 3. Floating Interactive AI Assistant */}
      <AIAssistant onNavigate={onNavigate} />

      {/* 4. Future Stage Modal */}
      {futureModalFeature && (
        <FutureStageModal 
          feature={futureModalFeature}
          onClose={() => setFutureModalFeature(null)}
        />
      )}
    </div>
  );
}
