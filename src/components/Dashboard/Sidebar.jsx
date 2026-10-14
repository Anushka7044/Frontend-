import React, { useState } from 'react';
import { 
  Sparkles, LayoutGrid, BookOpen, Brain, 
  Target, Rocket, Trophy, Flame, FileText, 
  Bot, User, Settings, LogOut, ChevronLeft, ChevronRight, X, Home,
  Github, Linkedin, Calendar, PlaySquare, HelpCircle, Sun, Moon,
  ChevronDown, BarChart3, Layers
} from 'lucide-react';
import { SIDEBAR_ITEMS } from '../../data/dashboardData';
import './Sidebar.css';

// Primary nav items directly matching the reference image
const REFERENCE_PRIMARY_NAV = [
  { id: 'profile', label: 'Profile', icon: User, route: 'profile' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, route: 'dashboard' },
  { id: 'challenges', label: 'Schedule', icon: Calendar, route: 'challenges' },
  { id: 'skills', label: 'Courses', icon: PlaySquare, route: 'skills' },
  { id: 'achievements', label: 'Achievements', icon: Trophy, route: 'achievements' }
];

export default function Sidebar({ 
  activeNav, 
  setActiveNav, 
  onSelectFeature, 
  isCollapsed, 
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  user,
  onNavigate,
  onLogout
}) {
  const [showAllModules, setShowAllModules] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleNavClick = (routeId) => {
    if (setActiveNav) setActiveNav(routeId);
    if (onNavigate) onNavigate(routeId);
    if (mobileOpen && setMobileOpen) setMobileOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="sidebar-mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`dashboard-sidebar selfstudy-sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand / Logo Area */}
        <div className="sidebar-brand">
          <button 
            className="brand-link" 
            onClick={() => handleNavClick('dashboard')}
            title="SelfStudy Dashboard"
          >
            <div className="brand-logo-mark">
              <span className="brand-leaf-dot"></span>
            </div>
            {!isCollapsed && (
              <span className="selfstudy-brand-name">
                <span className="brand-green">Self</span>Study
              </span>
            )}
          </button>

          {/* Close button on mobile */}
          <button 
            className="mobile-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Reference Primary Navigation List */}
        <nav className="sidebar-nav" aria-label="Dashboard Navigation">
          <ul className="sidebar-menu primary-ref-menu">
            {REFERENCE_PRIMARY_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id || (item.id === 'challenges' && activeNav === 'recommendations') || (item.id === 'skills' && activeNav === 'projects');

              return (
                <li key={item.id}>
                  <button
                    className={`sidebar-item ref-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.route)}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className="item-icon-wrapper">
                      <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                    </span>
                    {!isCollapsed && (
                      <span className="item-label">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Secondary Tools Toggle to preserve full access to all 14 pages */}
          {!isCollapsed && (
            <div className="sidebar-tools-accordion">
              <button 
                className="tools-toggle-btn"
                onClick={() => setShowAllModules(!showAllModules)}
                aria-expanded={showAllModules}
              >
                <span className="tools-toggle-title">
                  <Layers size={14} />
                  <span>More Modules</span>
                </span>
                <ChevronDown size={14} className={`tools-chevron ${showAllModules ? 'rotated' : ''}`} />
              </button>

              {showAllModules && (
                <div className="tools-dropdown-list">
                  <button 
                    className={`tools-item-btn ${activeNav === 'notes' ? 'active' : ''}`}
                    onClick={() => handleNavClick('notes')}
                  >
                    <BookOpen size={15} />
                    <span>Study Notes</span>
                  </button>
                  <button 
                    className={`tools-item-btn ${activeNav === 'results' ? 'active' : ''}`}
                    onClick={() => handleNavClick('results')}
                  >
                    <BarChart3 size={15} />
                    <span>Academic Results</span>
                  </button>
                  <button 
                    className={`tools-item-btn ${activeNav === 'projects' ? 'active' : ''}`}
                    onClick={() => handleNavClick('projects')}
                  >
                    <Rocket size={15} />
                    <span>Projects</span>
                  </button>
                  <button 
                    className={`tools-item-btn ${activeNav === 'progress' ? 'active' : ''}`}
                    onClick={() => handleNavClick('progress')}
                  >
                    <Flame size={15} />
                    <span>Progress Journey</span>
                  </button>
                  <button 
                    className={`tools-item-btn ${activeNav === 'github' ? 'active' : ''}`}
                    onClick={() => handleNavClick('github')}
                  >
                    <Github size={15} />
                    <span>GitHub Integration</span>
                  </button>
                  <button 
                    className={`tools-item-btn ${activeNav === 'resume' ? 'active' : ''}`}
                    onClick={() => handleNavClick('resume')}
                  >
                    <FileText size={15} />
                    <span>Resume Builder</span>
                  </button>
                  <button 
                    className={`tools-item-btn ${activeNav === 'linkedin' ? 'active' : ''}`}
                    onClick={() => handleNavClick('linkedin')}
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </button>
                  <button 
                    className={`tools-item-btn ${activeNav === 'ai' ? 'active' : ''}`}
                    onClick={() => handleNavClick('ai')}
                  >
                    <Bot size={15} />
                    <span>AI Assistant</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bottom Group Matching Reference Image */}
          <div className="sidebar-bottom-group">
            <ul className="sidebar-menu secondary-ref-menu">
              <li>
                <button
                  className="sidebar-item ref-nav-item"
                  onClick={() => onSelectFeature ? onSelectFeature({ label: 'Platform Settings', stage: 'Config' }) : null}
                  title="Settings"
                >
                  <span className="item-icon-wrapper">
                    <Settings size={18} strokeWidth={1.8} />
                  </span>
                  {!isCollapsed && <span className="item-label">Settings</span>}
                </button>
              </li>
              <li>
                <button
                  className="sidebar-item ref-nav-item"
                  onClick={() => handleNavClick('ai')}
                  title="Help & Support"
                >
                  <span className="item-icon-wrapper">
                    <HelpCircle size={18} strokeWidth={1.8} />
                  </span>
                  {!isCollapsed && <span className="item-label">Help</span>}
                </button>
              </li>
              <li>
                <button
                  className="sidebar-item ref-nav-item logout-item"
                  onClick={onLogout}
                  title="Log out"
                >
                  <span className="item-icon-wrapper">
                    <LogOut size={18} strokeWidth={1.8} />
                  </span>
                  {!isCollapsed && <span className="item-label">Log out</span>}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer: Day/Night Mode Switch Pill Matching Reference */}
        <div className="sidebar-footer-controls">
          {!isCollapsed && (
            <div className="theme-toggle-pill-wrap">
              <button 
                className={`theme-mode-pill ${isDarkMode ? 'dark-active' : 'light-active'}`}
                onClick={toggleTheme}
                aria-label="Toggle day and night mode"
                title="Toggle day/night theme"
              >
                <Sun size={15} className={`theme-icon sun-icon ${!isDarkMode ? 'active' : ''}`} />
                <div className={`theme-switch-slider ${isDarkMode ? 'slider-right' : 'slider-left'}`}>
                  <span className="theme-slider-thumb"></span>
                </div>
                <Moon size={15} className={`theme-icon moon-icon ${isDarkMode ? 'active' : ''}`} />
              </button>
            </div>
          )}

          {/* Collapse Toggle */}
          <button 
            className="sidebar-collapse-toggle-clean"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </aside>
    </>
  );
}
