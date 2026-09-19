import React from 'react';
import { Sparkles, ArrowLeft, CheckCircle, Code2, Rocket, Trophy } from 'lucide-react';
import './AuthLayout.css';

export default function AuthLayout({ children, onNavigate, activePage }) {
  return (
    <div className="auth-page-container">
      {/* Top Mobile Bar to Return Home */}
      <div className="auth-top-nav">
        <button 
          className="back-home-btn" 
          onClick={() => onNavigate('home')}
          aria-label="Return to Homepage"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="auth-split-grid">
        {/* Left Side: Brand Narrative & Student Growth Showcase */}
        <div className="auth-branding-panel">
          <div className="auth-panel-glow" />

          <button 
            className="auth-brand-header" 
            onClick={() => onNavigate('home')}
          >
            <div className="brand-icon-box">
              <Sparkles size={20} />
            </div>
            <span className="brand-name">
              Study<span className="brand-accent">Hub</span>
            </span>
          </button>

          <div className="auth-hero-copy">
            <span className="badge badge-primary auth-badge">
              Student Growth Ecosystem
            </span>

            <h1 className="auth-panel-title">
              Your growth journey <span className="gradient-text-accent">starts here.</span>
            </h1>

            <p className="auth-panel-sub">
              Stop learning in silos. Turn every semester into practical projects, 
              verifiable coding activity, and career-defining milestones.
            </p>

            <div className="auth-feature-bullets">
              <div className="auth-bullet-item">
                <div className="bullet-icon-box">
                  <Code2 size={16} />
                </div>
                <div>
                  <h4>Master Modern Technical Skills</h4>
                  <p>Structured skill tracks across frontend, backend, and core CS.</p>
                </div>
              </div>

              <div className="auth-bullet-item">
                <div className="bullet-icon-box rocket">
                  <Rocket size={16} />
                </div>
                <div>
                  <h4>Build Proof-of-Work Projects</h4>
                  <p>Practical apps with live demos to stand out to tech recruiters.</p>
                </div>
              </div>

              <div className="auth-bullet-item">
                <div className="bullet-icon-box gold">
                  <Trophy size={16} />
                </div>
                <div>
                  <h4>Automated Resume & Portfolio</h4>
                  <p>Your validated achievements turn automatically into your resume.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-panel-footer">
            <p>© 2026 StudyHub Platform. Built for engineering students.</p>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="auth-form-panel">
          <div className="auth-form-card glass-card">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
