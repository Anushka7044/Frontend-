import React from 'react';
import { Compass, ArrowRight, Zap, Target, Rocket, FileText, CheckCircle2 } from 'lucide-react';
import './NextStepCard.css';

export default function NextStepCard({ 
  projects = [], 
  challenges = [], 
  skills = [], 
  resumeData, 
  onNavigate 
}) {
  // Determine the highest impact next step dynamically
  const inProgressProject = projects.find(p => p.status === 'in_progress');
  const activeChallenge = challenges.find(c => c.status === 'in_progress' || (c.progress > 0 && c.progress < 100));

  let nextAction = {
    type: 'project',
    tag: 'Highest Impact',
    icon: Rocket,
    iconColor: '#A855F7',
    iconBg: 'rgba(168, 85, 247, 0.15)',
    title: inProgressProject ? `Advance "${inProgressProject.title}"` : 'Continue Active Project',
    description: inProgressProject 
      ? `You have pending milestones in ${inProgressProject.relatedSkill || 'Web Dev'}. Push progress to showcase on GitHub.`
      : 'Finish active project to build verified proof-of-work for your resume.',
    time: '45 mins',
    reward: '+100 XP',
    route: 'projects',
    buttonText: 'Resume Project'
  };

  if (!inProgressProject && activeChallenge) {
    nextAction = {
      type: 'challenge',
      tag: 'Daily Streak',
      icon: Target,
      iconColor: '#10B981',
      iconBg: 'rgba(16, 185, 129, 0.15)',
      title: `Complete Day ${activeChallenge.currentDay || 12} Challenge`,
      description: `Solve remaining algorithmic tasks for "${activeChallenge.title}" to protect your 12-day streak!`,
      time: '30 mins',
      reward: '+50 XP',
      route: 'challenges',
      buttonText: 'Solve Tasks'
    };
  } else if (!inProgressProject && !activeChallenge) {
    nextAction = {
      type: 'career',
      tag: 'Career Ready',
      icon: FileText,
      iconColor: '#818CF8',
      iconBg: 'rgba(99, 102, 241, 0.15)',
      title: 'Polish Resume for Summer Internships',
      description: 'Add your latest project repository links and certifications to achieve 100% ATS readiness.',
      time: '20 mins',
      reward: '+75 XP',
      route: 'resume',
      buttonText: 'Edit Resume'
    };
  }

  const Icon = (typeof nextAction?.icon === 'function' || nextAction?.icon?.$$typeof) ? nextAction.icon : Compass;

  return (
    <div className="glass-card next-step-card">
      <div className="next-step-top">
        <div className="next-step-badge">
          <Zap size={13} />
          <span>{nextAction.tag}</span>
        </div>
        <div className="next-step-meta">
          <span className="meta-time">{nextAction.time}</span>
          <span className="meta-reward">{nextAction.reward}</span>
        </div>
      </div>

      <div className="next-step-body">
        <div 
          className="next-step-icon-wrap" 
          style={{ background: nextAction.iconBg, color: nextAction.iconColor }}
        >
          <Icon size={22} />
        </div>

        <div className="next-step-content">
          <span className="next-step-prefix">Smart Recommendation</span>
          <h4 className="next-step-title">{nextAction.title}</h4>
          <p className="next-step-desc">{nextAction.description}</p>
        </div>
      </div>

      <div className="next-step-footer">
        <button 
          className="btn btn-primary btn-sm next-step-cta"
          onClick={() => onNavigate && onNavigate(nextAction.route)}
        >
          <span>{nextAction.buttonText}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
