import React from 'react';
import { 
  BookOpen, Calendar, Code2, CheckCircle2, Award, TrendingUp, ArrowRight 
} from 'lucide-react';
import { TIMELINE_STEPS } from '../../data/mockData';
import './HowItWorks.css';

const ICON_MAP = {
  BookOpen,
  Calendar,
  Code2,
  CheckCircle2,
  Award,
  TrendingUp
};

export default function HowItWorks() {
  return (
    <section className="section how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">Proven Growth Loop</span>
          <h2>
            How <span className="gradient-text">StudyHub Works</span>
          </h2>
          <p>
            Traditional studying leaves you with passive knowledge. 
            Our structured 6-step loop transforms what you learn directly into verified proof of work.
          </p>
        </div>

        {/* 6-Step Visual Journey */}
        <div className="timeline-grid">
          {TIMELINE_STEPS.map((item, index) => {
            const IconComp = ICON_MAP[item.iconName] || BookOpen;
            return (
              <div key={item.step} className="timeline-card-wrapper">
                <div className="glass-card timeline-card">
                  <div className="timeline-card-header">
                    <span className="step-number">{item.step}</span>
                    <div className="step-icon-box">
                      <IconComp size={20} />
                    </div>
                  </div>

                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-desc">{item.description}</p>
                </div>

                {index < TIMELINE_STEPS.length - 1 && (
                  <div className="timeline-connector">
                    <ArrowRight size={18} className="connector-arrow" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Motivational Sub-Bar */}
        <div className="growth-loop-banner">
          <div className="loop-item">Learn</div>
          <span className="loop-separator">→</span>
          <div className="loop-item">Challenge</div>
          <span className="loop-separator">→</span>
          <div className="loop-item">Build</div>
          <span className="loop-separator">→</span>
          <div className="loop-item">Submit</div>
          <span className="loop-separator">→</span>
          <div className="loop-item">Achieve</div>
          <span className="loop-separator">→</span>
          <div className="loop-item highlight">Grow 🚀</div>
        </div>
      </div>
    </section>
  );
}
