import React from 'react';
import { 
  Sparkles, LayoutDashboard, BookOpen, BarChart3, Brain, 
  Target, Rocket, GitBranch, Trophy, Flame, FileText, 
  Bot, User, Settings, LogOut, ChevronLeft, ChevronRight, X, Home,
  Github, Linkedin
} from 'lucide-react';
import { SIDEBAR_ITEMS } from '../../data/dashboardData';
import './Sidebar.css';

const ICON_COMPONENTS = {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Brain,
  Sparkles,
  Target,
  Rocket,
  GitBranch,
  Trophy,
  Flame,
  FileText,
  Bot,
  User,
  Settings,
  Github,
  Linkedin
};

const CATEGORIES = ['Main', 'Learning', 'Growth', 'Career', 'Account', 'AI Assistant'];

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
  const handleItemClick = (item) => {
    if (item.isImplemented) {
      if (setActiveNav) setActiveNav(item.id);
      if (onNavigate) onNavigate(item.id);
    } else {
      if (onSelectFeature) onSelectFeature(item);
    }
    if (mobileOpen && setMobileOpen) {
      setMobileOpen(false);
    }
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

      <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand / Logo Area */}
        <div className="sidebar-brand">
          <button 
            className="brand-link" 
            onClick={() => onNavigate('home')}
            title="StudyHub Home"
          >
            <div className="brand-icon-box">
              <Sparkles size={20} className="brand-icon" />
            </div>
            {!isCollapsed && (
              <span className="brand-name">
                Study<span className="brand-accent">Hub</span>
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

        {/* Navigation Item List Grouped by Category */}
        <nav className="sidebar-nav" aria-label="Dashboard Navigation">
          {CATEGORIES.map(category => {
            const items = SIDEBAR_ITEMS.filter(item => item.category === category);
            if (!items.length) return null;

            return (
              <div key={category} className="sidebar-category-group">
                {!isCollapsed && category !== 'Main' && (
                  <div className="nav-group-label">{category}</div>
                )}

                <ul className="sidebar-menu">
                  {items.map((item) => {
                    const Icon = ICON_COMPONENTS[item.icon] || Sparkles;
                    const isActive = activeNav === item.id;

                    return (
                      <li key={item.id}>
                        <button
                          className={`sidebar-item ${isActive ? 'active' : ''} ${!item.isImplemented ? 'future-item' : ''}`}
                          onClick={() => handleItemClick(item)}
                          title={isCollapsed ? item.label : undefined}
                        >
                          <span className="item-icon-wrapper">
                            <Icon size={18} />
                          </span>
                          {!isCollapsed && (
                            <span className="item-label">{item.label}</span>
                          )}
                          {!isCollapsed && !item.isImplemented && (
                            <span className="item-badge-stage">{item.stage}</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer & Collapse Toggle */}
        <div className="sidebar-footer">
          {/* Collapse Toggle for Desktop / Tablet */}
          <button 
            className="sidebar-collapse-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : (
              <>
                <ChevronLeft size={18} />
                <span className="collapse-text">Collapse Menu</span>
              </>
            )}
          </button>

          {/* Quick User Card / Return to Home */}
          {!isCollapsed ? (
            <div className="sidebar-user-card">
              <div className="sidebar-user-avatar">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AS'}
              </div>
              <div className="sidebar-user-info">
                <span className="user-name-text">{user?.name || 'Anushka Sharma'}</span>
                <span className="user-role-text">{user?.course ? 'Student' : 'CSE 2nd Year'}</span>
              </div>
              <button 
                className="user-home-btn"
                onClick={() => onNavigate('home')}
                title="Go to Landing Page"
              >
                <Home size={16} />
              </button>
            </div>
          ) : (
            <button 
              className="sidebar-mini-avatar-btn"
              onClick={() => onNavigate('home')}
              title="Return to Home"
            >
              <Home size={18} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
