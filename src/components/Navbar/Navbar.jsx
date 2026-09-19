import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onNavigate, currentPage, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (target, isSection = false) => {
    setMobileMenuOpen(false);
    if (isSection) {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.querySelector(target);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(target);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(target);
    }
  };

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <button 
          className="navbar-brand" 
          onClick={() => handleNavClick('home')}
          aria-label="StudyHub Home"
        >
          <div className="brand-icon-box">
            <Sparkles size={20} className="brand-icon" />
          </div>
          <span className="brand-name">
            Study<span className="brand-accent">Hub</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className="nav-link"
            onClick={() => handleNavClick('#features', true)}
          >
            Features
          </button>
          <button 
            className="nav-link"
            onClick={() => handleNavClick('#how-it-works', true)}
          >
            How It Works
          </button>
          <button 
            className="nav-link"
            onClick={() => handleNavClick('#preview', true)}
          >
            Growth Preview
          </button>
          {user && (
            <button 
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              Dashboard
            </button>
          )}
        </nav>

        {/* Auth CTA Actions */}
        <div className="desktop-auth-actions">
          {user ? (
            <div className="user-profile-badge">
              <div className="user-avatar">
                <User size={16} />
              </div>
              <span className="user-name">{user.name || 'Student'}</span>
              <button 
                className="btn btn-outline btn-sm logout-btn" 
                onClick={onLogout}
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => handleNavClick('login')}
              >
                Sign In
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => handleNavClick('signup')}
              >
                <span>Get Started</span>
                <ArrowRight size={15} />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-links">
            <button 
              className="mobile-nav-link" 
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button 
              className="mobile-nav-link" 
              onClick={() => handleNavClick('#features', true)}
            >
              Features
            </button>
            <button 
              className="mobile-nav-link" 
              onClick={() => handleNavClick('#how-it-works', true)}
            >
              How It Works
            </button>
            <button 
              className="mobile-nav-link" 
              onClick={() => handleNavClick('#preview', true)}
            >
              Growth Preview
            </button>
            {user && (
              <button 
                className="mobile-nav-link" 
                onClick={() => handleNavClick('dashboard')}
              >
                Dashboard
              </button>
            )}
          </div>

          <div className="mobile-drawer-auth">
            {user ? (
              <div className="mobile-user-box">
                <p className="mobile-user-greeting">Signed in as <strong>{user.name}</strong></p>
                <button className="btn btn-outline btn-block" onClick={() => { setMobileMenuOpen(false); onLogout(); }}>
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button 
                  className="btn btn-secondary btn-block"
                  onClick={() => handleNavClick('login')}
                >
                  Sign In
                </button>
                <button 
                  className="btn btn-primary btn-block"
                  onClick={() => handleNavClick('signup')}
                >
                  Create Free Account
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
