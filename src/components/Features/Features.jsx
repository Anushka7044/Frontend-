import React from 'react';
import { 
  BookOpen, BarChart3, Brain, Target, Rocket, 
  Trophy, Flame, GitBranch, FileText, Bot, ArrowUpRight 
} from 'lucide-react';
import { FEATURES_DATA } from '../../data/mockData';
import './Features.css';

// Dynamic icon mapping to Lucide React components
const ICON_MAP = {
  BookOpen,
  BarChart3,
  Brain,
  Target,
  Rocket,
  Trophy,
  Flame,
  GitBranch,
  FileText,
  Bot
};

export default function Features({ onNavigate, user }) {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-primary">Core Capabilities</span>
          <h2>
            Everything You Need to <span className="gradient-text">Grow as a Student</span>
          </h2>
          <p>
            From daily lecture notes to building real-world projects and generating an ATS-ready resume —
            manage your entire engineering journey in one integrated hub.
          </p>
        </div>

        {/* 10 Features Grid */}
        <div className="features-grid">
          {FEATURES_DATA.map((feature) => {
            const IconComponent = ICON_MAP[feature.iconName] || BookOpen;
            return (
              <div 
                key={feature.id} 
                className="glass-card feature-card"
                tabIndex="0"
              >
                <div className="feature-top-row">
                  <div 
                    className="feature-icon-wrapper"
                    style={{ 
                      backgroundColor: `${feature.color}15`, 
                      color: feature.color,
                      borderColor: `${feature.color}30`
                    }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <span className="feature-tag">Feature</span>
                </div>

                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>

                <div className="feature-footer">
                  <button 
                    className="feature-learn-more"
                    onClick={() => onNavigate(user ? 'dashboard' : 'signup')}
                    aria-label={`Learn more about ${feature.title}`}
                  >
                    <span>Explore in platform</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
