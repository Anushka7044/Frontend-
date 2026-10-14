import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, Bell, ChevronDown, User, Settings, LogOut, 
  Menu, Sparkles, CheckCheck, Clock, ExternalLink, ArrowRight,
  BookOpen, Brain, Target, Rocket, Trophy, Flame, FileText, 
  Github, Linkedin, Bot, X, MessageSquare
} from 'lucide-react';
import { NOTIFICATIONS } from '../../data/dashboardData';
import { INITIAL_NOTES } from '../../data/notesData';
import { INITIAL_SKILLS } from '../../data/skillsData';
import { INITIAL_CHALLENGES } from '../../data/challengesData';
import { INITIAL_PROJECTS } from '../../data/projectsData';
import { INITIAL_ACHIEVEMENTS } from '../../data/achievementsData';
import './Header.css';

const NOTIF_ICONS = {
  challenge: { icon: Target, color: '#10B981', route: 'challenges' },
  project: { icon: Rocket, color: '#A855F7', route: 'projects' },
  achievement: { icon: Trophy, color: '#F59E0B', route: 'achievements' },
  skill: { icon: Brain, color: '#6366F1', route: 'skills' },
  default: { icon: Sparkles, color: '#818CF8', route: 'progress' }
};

export default function Header({ 
  user, 
  onLogout, 
  onSelectFeature, 
  onToggleMobileSidebar,
  onNavigate,
  notes = [],
  skills = [],
  challenges = [],
  projects = [],
  achievements = []
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState(NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('3D');
  const [trackDropdownOpen, setTrackDropdownOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const trackRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
      if (trackRef.current && !trackRef.current.contains(event.target)) {
        setTrackDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif) => {
    setNotificationsList(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setNotificationsOpen(false);
    const config = NOTIF_ICONS[notif.type] || NOTIF_ICONS.default;
    if (onNavigate) {
      onNavigate(config.route);
    }
  };

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const studentFirstName = user?.name ? user.name.split(' ')[0] : 'Anushka';

  // Global search matching
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results = [];

    // 1. Pages & Primary Features
    const pages = [
      { title: 'AI Student Assistant', subtitle: 'Personalized study and career mentor', route: 'ai', category: 'AI', icon: Bot, badgeColor: '#818CF8' },
      { title: 'Resume Builder', subtitle: 'ATS-friendly resume builder and preview', route: 'resume', category: 'Career', icon: FileText, badgeColor: '#6366F1' },
      { title: 'GitHub Showcase', subtitle: 'Simulated repositories & coding streak', route: 'github', category: 'Career', icon: Github, badgeColor: '#0EA5E9' },
      { title: 'LinkedIn Optimizer', subtitle: 'Profile strength and headline recommendations', route: 'linkedin', category: 'Career', icon: Linkedin, badgeColor: '#0284C7' },
      { title: 'Progress & Consistency', subtitle: 'Active streaks and milestone timeline', route: 'progress', category: 'Growth', icon: Flame, badgeColor: '#F97316' },
      { title: 'Student Profile', subtitle: 'Personal information & career readiness summary', route: 'profile', category: 'Account', icon: User, badgeColor: '#A855F7' }
    ];

    pages.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)) {
        results.push(p);
      }
    });

    // 2. Search Notes
    const activeNotes = notes.length > 0 ? notes : INITIAL_NOTES;
    activeNotes.forEach(n => {
      if (n.title?.toLowerCase().includes(q) || n.subject?.toLowerCase().includes(q)) {
        results.push({
          title: n.title,
          subtitle: `${n.subject || 'Note'} • ${n.semester || 'Semester 4'}`,
          route: 'notes',
          category: 'Note',
          icon: BookOpen,
          badgeColor: '#6366F1'
        });
      }
    });

    // 3. Search Skills
    const activeSkills = skills.length > 0 ? skills : INITIAL_SKILLS;
    activeSkills.forEach(s => {
      if (s.name?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q)) {
        results.push({
          title: s.name,
          subtitle: `${s.category || 'Skill'} • ${s.level || 'Active'} (${s.progress || 0}%)`,
          route: 'skills',
          category: 'Skill',
          icon: Brain,
          badgeColor: '#10B981'
        });
      }
    });

    // 4. Search Challenges
    const activeChallenges = challenges.length > 0 ? challenges : INITIAL_CHALLENGES;
    activeChallenges.forEach(c => {
      if (c.title?.toLowerCase().includes(q) || c.skill?.toLowerCase().includes(q)) {
        results.push({
          title: c.title,
          subtitle: `Challenge • ${c.skill || 'Coding'}`,
          route: 'challenges',
          category: 'Challenge',
          icon: Target,
          badgeColor: '#10B981'
        });
      }
    });

    // 5. Search Projects
    const activeProjects = projects.length > 0 ? projects : INITIAL_PROJECTS;
    activeProjects.forEach(p => {
      if (p.title?.toLowerCase().includes(q) || p.relatedSkill?.toLowerCase().includes(q)) {
        results.push({
          title: p.title,
          subtitle: `Project • ${p.relatedSkill || 'Practical'}`,
          route: 'projects',
          category: 'Project',
          icon: Rocket,
          badgeColor: '#A855F7'
        });
      }
    });

    // 6. Search Achievements
    const activeAchievements = achievements.length > 0 ? achievements : INITIAL_ACHIEVEMENTS;
    activeAchievements.forEach(a => {
      if (a.title?.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q)) {
        results.push({
          title: a.title,
          subtitle: `Achievement • ${a.xp || 50} XP`,
          route: 'achievements',
          category: 'Badge',
          icon: Trophy,
          badgeColor: '#F59E0B'
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery, notes, skills, challenges, projects, achievements]);

  const handleSelectSearchResult = (result) => {
    setSearchQuery('');
    setSearchFocused(false);
    if (onNavigate) {
      onNavigate(result.route);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchFocused(false);
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      handleSelectSearchResult(searchResults[0]);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        {/* Mobile Hamburger Toggle */}
        <button 
          className="header-mobile-toggle"
          onClick={onToggleMobileSidebar}
          aria-label="Open sidebar menu"
        >
          <Menu size={22} />
        </button>

        {/* Reference Dashboard Title */}
        <div className="header-title-block">
          <h1 className="header-page-title">Dashboard</h1>
        </div>
      </div>

      <div className="header-right">
        {/* Global Live Search Box & Dropdown */}
        <div className="header-search-wrapper" ref={searchRef}>
          <div className={`header-search-box ${searchFocused ? 'is-focused' : ''}`}>
            <Search size={17} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search notes, skills, projects, career..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={handleSearchKeyDown}
              className="search-input"
              aria-label="Search dashboard"
            />
            {searchQuery ? (
              <button 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="search-shortcut">⌘K</span>
            )}
          </div>

          {/* Interactive Search Results Dropdown */}
          {searchFocused && searchQuery.trim().length > 0 && (
            <div className="search-results-panel glass-card" role="listbox">
              <div className="search-results-header">
                <span>Matching Resources</span>
                <span className="search-count-pill">{searchResults.length} found</span>
              </div>

              {searchResults.length > 0 ? (
                <div className="search-results-list">
                  {searchResults.map((res, i) => {
                    const ResIcon = (typeof res?.icon === 'function' || res?.icon?.$$typeof) ? res.icon : Sparkles;
                    return (
                      <button
                        key={i}
                        className="search-result-item"
                        onClick={() => handleSelectSearchResult(res)}
                      >
                        <div 
                          className="search-res-icon-wrap"
                          style={{ color: res.badgeColor, background: `${res.badgeColor}18` }}
                        >
                          <ResIcon size={16} />
                        </div>
                        <div className="search-res-text">
                          <span className="search-res-title">{res.title}</span>
                          <span className="search-res-sub">{res.subtitle}</span>
                        </div>
                        <span className="search-res-tag">{res.category}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="search-empty-state">
                  <p className="search-empty-text">No direct matches found for "{searchQuery}"</p>
                  <button 
                    className="btn btn-secondary btn-sm search-ai-fallback-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchFocused(false);
                      if (onNavigate) onNavigate('ai');
                    }}
                  >
                    <Bot size={14} style={{ color: '#818CF8' }} />
                    <span>Ask AI Assistant about this</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reference Track Dropdown Pill (e.g. 3D / Web / AI) */}
        <div className="header-track-wrapper" ref={trackRef}>
          <button 
            className="header-track-pill"
            onClick={() => setTrackDropdownOpen(!trackDropdownOpen)}
            aria-label="Select study track"
            aria-expanded={trackDropdownOpen}
          >
            <span className="track-pill-label">{selectedTrack}</span>
            <ChevronDown size={14} className={`track-pill-chevron ${trackDropdownOpen ? 'rotate' : ''}`} />
          </button>

          {trackDropdownOpen && (
            <div className="dropdown-panel track-dropdown-panel glass-card" role="menu">
              {['3D', 'Web Dev', 'AI & Data', 'Computer Science'].map(track => (
                <button 
                  key={track}
                  className={`track-dropdown-item ${selectedTrack === track ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTrack(track);
                    setTrackDropdownOpen(false);
                  }}
                >
                  <span>{track}</span>
                  {selectedTrack === track && <span className="track-check-dot" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reference Orange Circular Chat / AI Button */}
        <button 
          className="header-ai-chat-btn"
          onClick={() => {
            if (onNavigate) onNavigate('ai');
          }}
          title="Ask AI Student Assistant"
          aria-label="Open AI Assistant"
        >
          <MessageSquare size={17} />
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="header-action-wrapper" ref={notifRef}>
          <button 
            className={`header-icon-btn ${notificationsOpen ? 'active' : ''}`}
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="dropdown-panel notif-panel glass-card" role="menu">
              <div className="dropdown-header">
                <div className="notif-header-title">
                  <h4>Notifications</h4>
                  {unreadCount > 0 && <span className="notif-count-pill">{unreadCount} new</span>}
                </div>
                {unreadCount > 0 && (
                  <button className="mark-read-btn" onClick={markAllAsRead}>
                    <CheckCheck size={14} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="notif-list">
                {notificationsList.map(notif => {
                  const notifConfig = NOTIF_ICONS[notif.type] || NOTIF_ICONS.default;
                  const NotifIcon = (typeof notifConfig?.icon === 'function' || notifConfig?.icon?.$$typeof) ? notifConfig.icon : Sparkles;

                  return (
                    <div 
                      key={notif.id} 
                      className={`notif-item ${notif.read ? 'read' : 'unread'}`}
                      onClick={() => handleNotificationClick(notif)}
                    >
                      <div 
                        className="notif-type-icon-wrap"
                        style={{ color: notifConfig.color, background: `${notifConfig.color}15` }}
                      >
                        <NotifIcon size={16} />
                      </div>
                      <div className="notif-item-content">
                        <p className="notif-title">{notif.title}</p>
                        <p className="notif-detail">{notif.detail}</p>
                        <span className="notif-time">
                          <Clock size={12} />
                          <span>{notif.time}</span>
                        </span>
                      </div>
                      {!notif.read && <span className="unread-dot" />}
                    </div>
                  );
                })}
              </div>

              <div className="dropdown-footer">
                <button 
                  className="dropdown-footer-btn"
                  onClick={() => {
                    setNotificationsOpen(false);
                    if (onNavigate) onNavigate('progress');
                  }}
                >
                  <span>View Full Growth Milestones</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="header-action-wrapper" ref={profileRef}>
          <button 
            className={`header-profile-btn ${profileOpen ? 'active' : ''}`}
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            aria-label="User profile menu"
            aria-expanded={profileOpen}
          >
            <div className="header-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="header-avatar-img" />
              ) : (
                <span>{user?.name ? user.name.slice(0, 2).toUpperCase() : 'JL'}</span>
              )}
            </div>
            <div className="header-profile-meta">
              <span className="profile-name">{user?.name || 'Jane London'}</span>
              <span className="profile-location">{user?.location || 'New York, USA'}</span>
            </div>
            <ChevronDown size={14} className={`chevron-icon ${profileOpen ? 'rotate' : ''}`} />
          </button>

          {/* Profile Dropdown Panel */}
          {profileOpen && (
            <div className="dropdown-panel profile-panel glass-card" role="menu">
              <div className="profile-menu-header">
                <div className="profile-menu-avatar">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AS'}
                </div>
                <div className="profile-menu-details">
                  <p className="profile-menu-fullname">{user?.name || 'Anushka Sharma'}</p>
                  <p className="profile-menu-email">{user?.email || 'anushka.s@college.edu'}</p>
                  <span className="profile-menu-branch">{user?.course || 'B.Tech CSE'}</span>
                </div>
              </div>

              <div className="dropdown-divider" />

              <div className="profile-menu-actions">
                <button 
                  className="profile-menu-item"
                  onClick={() => {
                    setProfileOpen(false);
                    if (onNavigate) onNavigate('profile');
                  }}
                >
                  <User size={16} />
                  <span>My Profile & Career Readiness</span>
                </button>

                <button 
                  className="profile-menu-item"
                  onClick={() => {
                    setProfileOpen(false);
                    if (onNavigate) onNavigate('ai');
                  }}
                >
                  <Bot size={16} />
                  <span>AI Student Assistant</span>
                </button>

                <div className="dropdown-divider" />

                <button 
                  className="profile-menu-item logout-action"
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
