import React, { useState, useMemo } from 'react';
import { 
  Github, GitBranch, Star, GitFork, Flame, Calendar, 
  ExternalLink, Edit3, Plus, Check, RefreshCw, Unlink, 
  Sparkles, X, Layers, Code2, Users, BookOpen
} from 'lucide-react';
import './GitHub.css';

export default function GitHub({ 
  githubData, 
  setGithubData, 
  projects = [], 
  onNavigate 
}) {
  // Active Tab for Repositories ('all' | 'featured' | 'platform')
  const [activeTab, setActiveTab] = useState('all');

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: githubData?.displayName || 'Anushka Ray',
    username: githubData?.username || 'anushkaray',
    bio: githubData?.bio || '',
    profileUrl: githubData?.profileUrl || 'https://github.com/anushka-sharma',
    status: githubData?.status || 'Connected'
  });

  // Add Repository Modal State
  const [isAddRepoModalOpen, setIsAddRepoModalOpen] = useState(false);
  const [newRepoForm, setNewRepoForm] = useState({
    name: '',
    description: '',
    language: 'JavaScript',
    topics: ''
  });

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Hovered Heatmap Cell Info
  const [hoveredCell, setHoveredCell] = useState(null);

  // Auto-connect Stage 5 projects to GitHub repository list
  const combinedRepositories = useMemo(() => {
    const baseRepos = githubData?.repositories || [];

    // Identify completed or submitted projects that have repo links
    const platformRepos = projects
      .filter(p => (p.status === 'completed' || p.status === 'submitted') && p.submission?.repoUrl)
      .map(p => {
        const repoName = p.submission.repoUrl.split('/').pop() || p.title.toLowerCase().replace(/\s+/g, '-');
        return {
          id: `platform-${p.id}`,
          name: repoName,
          description: p.description,
          language: p.relatedSkill || 'JavaScript',
          languageColor: p.relatedSkill === 'Python' ? '#10B981' : p.relatedSkill === 'C++' ? '#06B6D4' : '#FACC15',
          stars: 10,
          forks: 2,
          updatedDate: 'Recently verified',
          topics: [p.relatedSkill?.toLowerCase() || 'web', 'student-project', 'portfolio'],
          isFeatured: true,
          githubUrl: p.submission.repoUrl,
          isFromPlatform: true,
          projectId: p.id
        };
      });

    // Merge without duplicating existing IDs
    const existingIds = new Set(baseRepos.map(r => r.id));
    const newFromPlatform = platformRepos.filter(pr => !existingIds.has(pr.id));
    return [...baseRepos, ...newFromPlatform];
  }, [githubData?.repositories, projects]);

  // Filtered repositories according to active tab
  const filteredRepos = useMemo(() => {
    if (activeTab === 'featured') {
      return combinedRepositories.filter(r => r.isFeatured);
    }
    if (activeTab === 'platform') {
      return combinedRepositories.filter(r => r.isFromPlatform);
    }
    return combinedRepositories;
  }, [combinedRepositories, activeTab]);

  // Toggle Featured status for a repository
  const handleToggleFeatured = (repoId) => {
    setGithubData(prev => ({
      ...prev,
      repositories: prev.repositories.map(r => 
        r.id === repoId ? { ...r, isFeatured: !r.isFeatured } : r
      )
    }));
    showToast('Updated featured repository status!');
  };

  // Handle Edit Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setGithubData(prev => ({
      ...prev,
      displayName: editForm.displayName,
      username: editForm.username,
      bio: editForm.bio,
      profileUrl: editForm.profileUrl,
      status: editForm.status,
      isConnected: editForm.status !== 'Disconnected'
    }));
    setIsEditModalOpen(false);
    showToast('GitHub career profile updated successfully!');
  };

  // Handle Add Repository Submit
  const handleAddRepository = (e) => {
    e.preventDefault();
    if (!newRepoForm.name.trim()) return;

    const newRepo = {
      id: `repo-${Date.now()}`,
      name: newRepoForm.name.trim().replace(/\s+/g, '-'),
      description: newRepoForm.description.trim() || 'Software project repository built by student.',
      language: newRepoForm.language,
      languageColor: newRepoForm.language === 'Python' ? '#10B981' : newRepoForm.language === 'C++' ? '#06B6D4' : '#FACC15',
      stars: 1,
      forks: 0,
      updatedDate: 'Just now',
      topics: newRepoForm.topics.split(',').map(t => t.trim()).filter(Boolean),
      isFeatured: true,
      githubUrl: `https://github.com/${githubData?.username || 'anushkaray'}/${newRepoForm.name.trim().replace(/\s+/g, '-')}`,
      isFromPlatform: false
    };

    setGithubData(prev => ({
      ...prev,
      repositories: [newRepo, ...(prev.repositories || [])],
      stats: {
        ...prev.stats,
        repositories: (prev.stats?.repositories || 0) + 1
      }
    }));

    setNewRepoForm({ name: '', description: '', language: 'JavaScript', topics: '' });
    setIsAddRepoModalOpen(false);
    showToast(`Added repository "${newRepo.name}"!`);
  };

  // Toggle connection for demonstration
  const handleToggleConnection = () => {
    const nextState = !githubData?.isConnected;
    setGithubData(prev => ({
      ...prev,
      isConnected: nextState,
      status: nextState ? 'Connected' : 'Disconnected'
    }));
    showToast(nextState ? 'GitHub account reconnected!' : 'GitHub profile disconnected for demonstration.');
  };

  const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];

  return (
    <div className="github-page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="github-toast" role="status">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Card */}
      <section className="glass-card github-hero-card" aria-label="GitHub Profile Summary">
        <div className="github-profile-identity">
          <div className="github-avatar-box">
            <span>{githubData?.displayName ? githubData.displayName.slice(0, 2).toUpperCase() : 'AR'}</span>
            <div className="github-avatar-badge">
              <Github size={15} />
            </div>
          </div>

          <div className="github-info-col">
            <div className="github-name-row">
              <h1 className="github-display-name">{githubData?.displayName || 'Anushka Ray'}</h1>
              <span className="github-handle">@{githubData?.username || 'anushkaray'}</span>
              <span className={`github-status-pill ${githubData?.isConnected ? 'connected' : 'disconnected'}`}>
                <span className="status-dot" />
                {githubData?.status || (githubData?.isConnected ? 'Connected' : 'Disconnected')}
              </span>
            </div>

            <p className="github-bio-text">
              {githubData?.bio || 'CSE Student | Python | Web Development | Building open-source developer tooling'}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="github-hero-actions">
          {githubData?.isConnected ? (
            <>
              <a 
                href={githubData?.profileUrl || 'https://github.com/anushka-sharma'} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-outline btn-sm"
              >
                <Github size={15} />
                <span>View GitHub Profile</span>
                <ExternalLink size={13} />
              </a>

              <button 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setEditForm({
                    displayName: githubData?.displayName || 'Anushka Ray',
                    username: githubData?.username || 'anushkaray',
                    bio: githubData?.bio || '',
                    profileUrl: githubData?.profileUrl || 'https://github.com/anushka-sharma',
                    status: githubData?.status || 'Connected'
                  });
                  setIsEditModalOpen(true);
                }}
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </button>

              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleToggleConnection}
                title="Toggle connected/disconnected view"
              >
                <RefreshCw size={13} />
                <span>Disconnect</span>
              </button>
            </>
          ) : (
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleToggleConnection}
            >
              <Github size={15} />
              <span>Connect GitHub</span>
            </button>
          )}
        </div>
      </section>

      {/* Disconnected Empty State Banner */}
      {!githubData?.isConnected ? (
        <section className="github-disconnected-banner" aria-label="GitHub Disconnected State">
          <div className="disconnected-icon-circle">
            <Unlink size={30} />
          </div>
          <h2 className="disconnected-title">Connect your GitHub profile</h2>
          <p className="disconnected-desc">
            Add your GitHub username to showcase your coding activity, contribution heatmaps, 
            and practical repositories directly to recruiters and peers.
          </p>
          <button 
            className="btn btn-primary"
            onClick={handleToggleConnection}
          >
            <Github size={17} />
            <span>Connect GitHub Profile</span>
          </button>
        </section>
      ) : (
        <>
          {/* GitHub 5 Statistics Cards */}
          <section className="github-stats-grid" aria-label="GitHub Statistics">
            <div className="github-stat-card">
              <div className="github-stat-top">
                <span className="github-stat-label">Repositories</span>
                <div className="github-stat-icon purple">
                  <BookOpen size={16} />
                </div>
              </div>
              <div className="github-stat-val">{combinedRepositories.length}</div>
              <span className="github-stat-sub">Public codebase repos</span>
            </div>

            <div className="github-stat-card">
              <div className="github-stat-top">
                <span className="github-stat-label">Contributions</span>
                <div className="github-stat-icon emerald">
                  <GitBranch size={16} />
                </div>
              </div>
              <div className="github-stat-val">{githubData?.stats?.contributions || 186}</div>
              <span className="github-stat-sub">Commits & PRs this year</span>
            </div>

            <div className="github-stat-card">
              <div className="github-stat-top">
                <span className="github-stat-label">Stars</span>
                <div className="github-stat-icon amber">
                  <Star size={16} />
                </div>
              </div>
              <div className="github-stat-val">{githubData?.stats?.stars || 42}</div>
              <span className="github-stat-sub">Community stargazers</span>
            </div>

            <div className="github-stat-card">
              <div className="github-stat-top">
                <span className="github-stat-label">Followers</span>
                <div className="github-stat-icon cyan">
                  <Users size={16} />
                </div>
              </div>
              <div className="github-stat-val">{githubData?.stats?.followers || 128}</div>
              <span className="github-stat-sub">Developer network</span>
            </div>

            <div className="github-stat-card">
              <div className="github-stat-top">
                <span className="github-stat-label">Following</span>
                <div className="github-stat-icon indigo">
                  <Users size={16} />
                </div>
              </div>
              <div className="github-stat-val">{githubData?.stats?.following || 64}</div>
              <span className="github-stat-sub">Engineers followed</span>
            </div>
          </section>

          {/* GitHub-Style Contribution Heatmap */}
          <section className="glass-card github-heatmap-card" aria-label="Contribution Activity Heatmap">
            <div className="heatmap-header-row">
              <div className="heatmap-title-block">
                <h3>Contribution Activity</h3>
                <p>
                  {githubData?.totalContributions || 186} contributions in the last 6 months
                </p>
              </div>

              <div className="heatmap-streak-stats">
                <div className="streak-metric-badge highlight">
                  <Flame size={16} color="#F97316" />
                  <div>
                    <span className="streak-metric-val">{githubData?.currentStreak || 14} Days</span>
                    <span className="streak-metric-lbl"> Current Streak</span>
                  </div>
                </div>

                <div className="streak-metric-badge">
                  <Calendar size={16} color="#10B981" />
                  <div>
                    <span className="streak-metric-val">{githubData?.longestStreak || 28} Days</span>
                    <span className="streak-metric-lbl"> Longest Streak</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap Matrix Grid */}
            <div className="heatmap-scroll-wrapper">
              <div className="heatmap-matrix-box">
                <div className="heatmap-days-legend">
                  {dayLabels.map((lbl, i) => (
                    <span key={i}>{lbl}</span>
                  ))}
                </div>

                <div className="heatmap-columns-container">
                  {(githubData?.heatmapWeeks || []).map((weekObj, wIdx) => (
                    <div key={wIdx} className="heatmap-week-column">
                      {weekObj.days.map((intensity, dIdx) => (
                        <div 
                          key={dIdx}
                          className={`heatmap-cell level-${intensity}`}
                          onMouseEnter={() => setHoveredCell({ week: wIdx + 1, day: dIdx + 1, intensity })}
                          onMouseLeave={() => setHoveredCell(null)}
                          title={`${intensity === 0 ? 'No' : intensity * 2} contributions on Week ${wIdx + 1}, Day ${dIdx + 1}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Heatmap Legend & Footer */}
            <div className="heatmap-footer-row">
              <span>
                {hoveredCell 
                  ? `${hoveredCell.intensity === 0 ? 'No' : hoveredCell.intensity * 2 + ' contributions'} logged on this day.` 
                  : 'Consistent daily commits demonstrate software engineering discipline.'}
              </span>

              <div className="heatmap-legend-scale">
                <span>Less</span>
                <span className="legend-cell level-0" />
                <span className="legend-cell level-1" />
                <span className="legend-cell level-2" />
                <span className="legend-cell level-3" />
                <span className="legend-cell level-4" />
                <span>More</span>
              </div>
            </div>
          </section>

          {/* Repositories Section */}
          <section className="github-repos-section" aria-label="Repositories Showcase">
            <div className="repos-section-header">
              <div>
                <h2>Repositories</h2>
                <p>Public open-source software, university assignments, and practical projects</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div className="repos-tabs-group" role="tablist">
                  <button 
                    role="tab"
                    aria-selected={activeTab === 'all'}
                    className={`repo-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                  >
                    <span>All</span>
                    <span className="tab-badge">{combinedRepositories.length}</span>
                  </button>

                  <button 
                    role="tab"
                    aria-selected={activeTab === 'featured'}
                    className={`repo-tab-btn ${activeTab === 'featured' ? 'active' : ''}`}
                    onClick={() => setActiveTab('featured')}
                  >
                    <Star size={13} />
                    <span>Featured</span>
                    <span className="tab-badge">{combinedRepositories.filter(r => r.isFeatured).length}</span>
                  </button>

                  <button 
                    role="tab"
                    aria-selected={activeTab === 'platform'}
                    className={`repo-tab-btn ${activeTab === 'platform' ? 'active' : ''}`}
                    onClick={() => setActiveTab('platform')}
                  >
                    <Layers size={13} />
                    <span>From Platform</span>
                    <span className="tab-badge">{combinedRepositories.filter(r => r.isFromPlatform).length}</span>
                  </button>
                </div>

                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setIsAddRepoModalOpen(true)}
                >
                  <Plus size={15} />
                  <span>New Repository</span>
                </button>
              </div>
            </div>

            {/* Repositories Grid */}
            <div className="repos-cards-grid">
              {filteredRepos.map((repo) => (
                <article key={repo.id} className={`repo-card ${repo.isFeatured ? 'featured-card' : ''}`}>
                  <div className="repo-card-top">
                    <div className="repo-title-row">
                      <a 
                        href={repo.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="repo-name-link"
                      >
                        <span>{repo.name}</span>
                        <ExternalLink size={13} />
                      </a>
                      {repo.isFromPlatform && (
                        <span className="repo-platform-badge">Stage 5 Project</span>
                      )}
                    </div>

                    <button 
                      className={`repo-star-btn ${repo.isFeatured ? 'is-featured' : ''}`}
                      onClick={() => handleToggleFeatured(repo.id)}
                      title={repo.isFeatured ? 'Unmark from featured' : 'Mark as featured'}
                      aria-label="Toggle featured"
                    >
                      <Star size={15} fill={repo.isFeatured ? '#F59E0B' : 'none'} />
                      <span>{repo.isFeatured ? 'Featured' : 'Star'}</span>
                    </button>
                  </div>

                  <p className="repo-desc">{repo.description}</p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="repo-topics-row">
                      {repo.topics.map((tag, idx) => (
                        <span key={idx} className="repo-topic-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="repo-card-bottom">
                    <div className="repo-meta-left">
                      <span className="repo-lang-indicator">
                        <span className="lang-circle" style={{ backgroundColor: repo.languageColor || '#38BDF8' }} />
                        <span>{repo.language}</span>
                      </span>

                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={13} />
                        <span>{repo.stars}</span>
                      </span>

                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <GitFork size={13} />
                        <span>{repo.forks}</span>
                      </span>
                    </div>

                    <span>Updated {repo.updatedDate}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Modal: Edit GitHub Profile */}
      {isEditModalOpen && (
        <div className="github-modal-backdrop" role="dialog" aria-modal="true">
          <div className="github-modal-card">
            <div className="github-modal-header">
              <h3>Edit GitHub Career Profile</h3>
              <button 
                className="modal-close-icon"
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="github-modal-body">
                <div className="github-form-group">
                  <label htmlFor="edit-name">Display Name</label>
                  <input 
                    id="edit-name"
                    type="text" 
                    className="github-input"
                    value={editForm.displayName}
                    onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                    required
                  />
                </div>

                <div className="github-form-group">
                  <label htmlFor="edit-username">GitHub Username</label>
                  <input 
                    id="edit-username"
                    type="text" 
                    className="github-input"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    required
                  />
                </div>

                <div className="github-form-group">
                  <label htmlFor="edit-bio">Short Bio</label>
                  <textarea 
                    id="edit-bio"
                    className="github-textarea"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="github-form-group">
                  <label htmlFor="edit-url">Profile URL</label>
                  <input 
                    id="edit-url"
                    type="url" 
                    className="github-input"
                    value={editForm.profileUrl}
                    onChange={(e) => setEditForm({ ...editForm, profileUrl: e.target.value })}
                  />
                </div>

                <div className="github-form-group">
                  <label htmlFor="edit-status">Connection Status</label>
                  <select 
                    id="edit-status"
                    className="github-select"
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  >
                    <option value="Connected">Connected</option>
                    <option value="Syncing">Syncing</option>
                    <option value="Disconnected">Disconnected</option>
                  </select>
                </div>
              </div>

              <div className="github-modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Repository */}
      {isAddRepoModalOpen && (
        <div className="github-modal-backdrop" role="dialog" aria-modal="true">
          <div className="github-modal-card">
            <div className="github-modal-header">
              <h3>Create Mock Repository</h3>
              <button 
                className="modal-close-icon"
                onClick={() => setIsAddRepoModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddRepository}>
              <div className="github-modal-body">
                <div className="github-form-group">
                  <label htmlFor="new-repo-name">Repository Name *</label>
                  <input 
                    id="new-repo-name"
                    type="text" 
                    className="github-input"
                    placeholder="e.g. distributed-task-queue"
                    value={newRepoForm.name}
                    onChange={(e) => setNewRepoForm({ ...newRepoForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="github-form-group">
                  <label htmlFor="new-repo-desc">Description</label>
                  <textarea 
                    id="new-repo-desc"
                    className="github-textarea"
                    placeholder="Short summary of this project..."
                    value={newRepoForm.description}
                    onChange={(e) => setNewRepoForm({ ...newRepoForm, description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="github-form-group">
                  <label htmlFor="new-repo-lang">Primary Language</label>
                  <select 
                    id="new-repo-lang"
                    className="github-select"
                    value={newRepoForm.language}
                    onChange={(e) => setNewRepoForm({ ...newRepoForm, language: e.target.value })}
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="C++">C++</option>
                    <option value="HTML">HTML / CSS</option>
                    <option value="SQL">SQL</option>
                  </select>
                </div>

                <div className="github-form-group">
                  <label htmlFor="new-repo-topics">Topics (comma-separated)</label>
                  <input 
                    id="new-repo-topics"
                    type="text" 
                    className="github-input"
                    placeholder="algorithms, web, react, cli"
                    value={newRepoForm.topics}
                    onChange={(e) => setNewRepoForm({ ...newRepoForm, topics: e.target.value })}
                  />
                </div>
              </div>

              <div className="github-modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setIsAddRepoModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  Create Repository
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
