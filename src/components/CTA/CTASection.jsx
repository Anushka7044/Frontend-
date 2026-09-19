import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import './CTASection.css';

export default function CTASection({ onNavigate, user }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section cta-section">
      <div className="container">
        <div className="glass-card cta-card">
          <div className="cta-glow-effect" />
          
          <div className="badge badge-primary cta-badge">
            <Sparkles size={14} />
            <span>Join Ambitious Engineering Students</span>
          </div>

          <h2 className="cta-title">
            Start Building Your <span className="gradient-text">Future Today</span>
          </h2>

          <p className="cta-subtitle">
            Take control of your technical journey. Learn consistently, build real projects, 
            track your verified growth, and land high-paying career opportunities.
          </p>

          <div className="cta-buttons">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate(user ? 'dashboard' : 'signup')}
            >
              <span>{user ? 'Go to Dashboard' : 'Get Started Free'}</span>
              <ArrowRight size={18} />
            </button>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={scrollToTop}
            >
              Explore Platform
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
