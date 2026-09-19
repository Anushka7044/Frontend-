import React from 'react';
import { Rocket, Clock, CheckCircle, ExternalLink, Code2, Layers } from 'lucide-react';
import { CURRENT_PROJECT } from '../../data/dashboardData';
import './ProjectCard.css';

export default function ProjectCard({ onSelectFeature, projects = [], onNavigate }) {
  const activeProject = projects.find(p => p.status === 'in_progress') || projects[0] || CURRENT_PROJECT;
  
  const completedReqs = activeProject.requirements ? activeProject.requirements.filter(r => r.completed).length : (activeProject.tasksCompleted || 4);
  const totalReqs = activeProject.requirements ? activeProject.requirements.length : (activeProject.totalTasks || 6);
  const progressPct = activeProject.requirements ? Math.round((completedReqs / totalReqs) * 100) : (activeProject.progress || 65);

  return (
    <div className="glass-card dashboard-card project-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon-tag purple">
            <Rocket size={18} />
          </div>
          <div>
            <h3 className="card-title">{activeProject.title}</h3>
            <p className="card-subtitle">Proof of Work Portfolio</p>
          </div>
        </div>

        <span className={`project-status-pill ${activeProject.status || 'in-progress'}`}>
          {(activeProject.status || 'in_progress').replace('_', ' ')}
        </span>
      </div>

      {/* Tech Stack & Stage Metadata */}
      <div className="project-meta-box">
        <div className="project-stack-tag">
          <Code2 size={15} className="stack-icon" />
          <span>{activeProject.relatedSkill || activeProject.relatedSkills || 'Full Stack'}</span>
        </div>
        <div className="project-stage-tag">
          <Layers size={14} />
          <span>{activeProject.currentMilestone || activeProject.stage || 'Development'}</span>
        </div>
      </div>

      {/* Progress & Deadline Block */}
      <div className="project-progress-block">
        <div className="project-progress-header">
          <span className="p-progress-label">Milestone Completion</span>
          <span className="p-progress-pct">{progressPct}%</span>
        </div>

        <div className="p-progress-track">
          <div 
            className="p-progress-fill" 
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="project-timeline-row">
          <div className="deadline-badge">
            <Clock size={14} />
            <span>{activeProject.deadline || '5 days remaining'}</span>
          </div>
          <span className="tasks-count-label">
            {completedReqs} / {totalReqs} modules verified
          </span>
        </div>
      </div>

      {/* Live Preview Snippet */}
      <div className="project-preview-box">
        <div className="browser-mock-bar">
          <div className="browser-dots">
            <span className="b-dot red" />
            <span className="b-dot yellow" />
            <span className="b-dot green" />
          </div>
          <span className="browser-url">{activeProject.submission?.repoUrl || activeProject.liveUrl || 'https://github.com/anushka/project'}</span>
        </div>
        <div className="browser-mock-content">
          <span className="mock-site-title">{activeProject.title}</span>
          <span className="mock-site-badge">Verified Codebase</span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="project-action-row">
        <button 
          className="btn btn-primary btn-block"
          onClick={() => {
            if (onNavigate) {
              onNavigate('projects');
            } else if (onSelectFeature) {
              onSelectFeature({ label: activeProject.title, stage: 'Stage 5', icon: 'Rocket' });
            }
          }}
        >
          <ExternalLink size={16} />
          <span>View Project Workspace</span>
        </button>
      </div>
    </div>
  );
}
