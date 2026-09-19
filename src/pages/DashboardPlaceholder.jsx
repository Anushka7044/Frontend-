import React from 'react';
import { Sparkles, ArrowLeft, LogOut, CheckCircle2, LayoutDashboard, Clock } from 'lucide-react';
import './DashboardPlaceholder.css';

export default function DashboardPlaceholder({ user, onNavigate, onLogout }) {
  return (
    <div className="dashboard-placeholder-page">
      <div className="container">
        <div className="glass-card placeholder-card">
          <div className="placeholder-top-badge">
            <span className="badge badge-primary">
              <Sparkles size={14} />
              <span>Stage 2 Complete — Authentication Simulated</span>
            </span>
          </div>

          <div className="placeholder-user-card">
            <div className="placeholder-avatar">
              {user?.name?.slice(0, 2).toUpperCase() || 'ST'}
            </div>
            <div>
              <h2>Welcome, {user?.name || 'Student'}! 👋</h2>
              <p className="placeholder-meta">
                {user?.course || 'B.Tech CSE'} • {user?.year || '2nd Year'} • {user?.college || 'Engineering Institute'}
              </p>
            </div>
          </div>

          <div className="status-box">
            <div className="status-box-header">
              <CheckCircle2 size={20} className="success-icon" />
              <h4>Account Successfully Initialized</h4>
            </div>
            <p>
              Your frontend profile is active for this session. Stage 2 (Login + Signup UI & validation) is complete.
            </p>
          </div>

          <div className="stage3-preview-box">
            <div className="stage3-tag">
              <Clock size={16} />
              <span>Next Up: Stage 3</span>
            </div>
            <h3>Student Dashboard & Command Center</h3>
            <p>
              In Stage 3, we will build the actual student dashboard containing your real daily study streak, 
              subject-wise notes organizer, academic semester GPA tracker, and active challenge milestones.
            </p>
          </div>

          <div className="placeholder-actions">
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('home')}
            >
              <ArrowLeft size={16} />
              <span>Explore Home Landing Page</span>
            </button>
            <button 
              className="btn btn-outline"
              onClick={onLogout}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
