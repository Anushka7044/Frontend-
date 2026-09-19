import React from 'react';
import { Quote, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import './GrowthMessage.css';

export default function GrowthMessage({ onNavigate, user }) {
  return (
    <section className="section growth-message-section">
      <div className="container">
        <div className="manifesto-card">
          <div className="manifesto-glow" />

          <div className="manifesto-icon-box">
            <Quote size={28} className="quote-icon" />
          </div>

          <h2 className="manifesto-heading">
            "Don't just learn. <span className="gradient-text-accent">Build proof</span> of what you know."
          </h2>

          <p className="manifesto-body">
            In today's engineering job market, tutorial completion certificates don't get you hired. 
            Recruiters look for verifiable execution — deployed applications, consistent Git commits, 
            and solved challenges. StudyHub turns your academic study hours directly into a tangible, 
            verifiable record of personal and career growth.
          </p>

          <div className="manifesto-pipeline">
            <span className="pipe-pill">Daily Study</span>
            <span className="pipe-arrow">→</span>
            <span className="pipe-pill">Deep Skills</span>
            <span className="pipe-arrow">→</span>
            <span className="pipe-pill">Sprints</span>
            <span className="pipe-arrow">→</span>
            <span className="pipe-pill">Real Projects</span>
            <span className="pipe-arrow">→</span>
            <span className="pipe-pill">Verified Badges</span>
            <span className="pipe-arrow">→</span>
            <span className="pipe-pill career">Career Profile</span>
          </div>

          <div className="manifesto-cta">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate(user ? 'dashboard' : 'signup')}
            >
              <span>{user ? 'Go to Dashboard' : 'Start Your Proof of Work Today'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
