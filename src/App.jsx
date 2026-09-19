import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Results from './pages/Results';
import Skills from './pages/Skills';
import Recommendations from './pages/Recommendations';
import Challenges from './pages/Challenges';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Progress from './pages/Progress';
import GitHub from './pages/GitHub';
import Resume from './pages/Resume';
import LinkedIn from './pages/LinkedIn';
import Profile from './pages/Profile';
import AI from './pages/AI';
import Sidebar from './components/Dashboard/Sidebar';
import Header from './components/Dashboard/Header';
import AIAssistant from './components/Dashboard/AIAssistant';
import FutureStageModal from './components/Dashboard/FutureStageModal';
import AchievementUnlockModal from './components/Common/AchievementUnlockModal';
import ErrorBoundary from './components/Common/ErrorBoundary';
import { STUDENT_PROFILE } from './data/dashboardData';
import { INITIAL_NOTES } from './data/notesData';
import { INITIAL_SEMESTERS } from './data/resultsData';
import { INITIAL_SKILLS } from './data/skillsData';
import { INITIAL_CHALLENGES } from './data/challengesData';
import { INITIAL_PROJECTS, createProjectFromChallenge } from './data/projectsData';
import { INITIAL_ACHIEVEMENTS } from './data/achievementsData';
import { evaluateAchievementUnlocks } from './data/achievementRules';
import { INITIAL_GROWTH_TIMELINE } from './data/growthData';
import { 
  INITIAL_GITHUB_DATA, 
  INITIAL_RESUME_DATA, 
  INITIAL_LINKEDIN_DATA 
} from './data/careerData';
import './pages/Dashboard.css';

const AUTH_PAGES = [
  'dashboard', 
  'notes', 
  'results', 
  'skills', 
  'recommendations', 
  'challenges', 
  'projects', 
  'achievements', 
  'progress',
  'github',
  'resume',
  'linkedin',
  'profile',
  'ai',
  'settings'
];

// Helper to read authenticated user from localStorage
const getStoredUser = () => {
  try {
    const saved = localStorage.getItem('studyhub_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// Helper to extract clean route from URL (hash or pathname)
const getCleanRoute = () => {
  let hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (!hash) {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
    if (path) {
      hash = path;
    }
  }
  return hash;
};

// Helper to determine destination route based on auth status
const resolveRoute = (rawRoute, user) => {
  const isAuth = !!user;

  // Explicit public pages
  if (rawRoute === 'home') return 'home';
  if (rawRoute === 'login') return isAuth ? 'dashboard' : 'login';
  if (rawRoute === 'signup') return isAuth ? 'dashboard' : 'signup';

  // Private protected pages
  if (AUTH_PAGES.includes(rawRoute)) {
    if (isAuth) {
      return rawRoute;
    }
    // Protected route when logged out -> Redirect to 'login'
    return 'login';
  }

  // Fallback for root / empty / unknown routes
  return isAuth ? 'dashboard' : 'home';
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [currentPage, setCurrentPage] = useState(() => {
    const initialUser = getStoredUser();
    const route = resolveRoute(getCleanRoute(), initialUser);
    if (window.location.hash.replace(/^#\/?/, '').trim() !== route) {
      window.location.hash = route;
    }
    return route;
  });

  // Stage 4 Learning System Shared State
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_notes');
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  const [semesters, setSemesters] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_semesters');
      return saved ? JSON.parse(saved) : INITIAL_SEMESTERS;
    } catch {
      return INITIAL_SEMESTERS;
    }
  });

  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_skills');
      return saved ? JSON.parse(saved) : INITIAL_SKILLS;
    } catch {
      return INITIAL_SKILLS;
    }
  });

  // Stage 5 Action, Challenges, Projects & Growth State
  const [challenges, setChallenges] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_challenges');
      return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
    } catch {
      return INITIAL_CHALLENGES;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_achievements');
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  const [growthTimeline, setGrowthTimeline] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_growth_timeline');
      return saved ? JSON.parse(saved) : INITIAL_GROWTH_TIMELINE;
    } catch {
      return INITIAL_GROWTH_TIMELINE;
    }
  });

  // Global Celebration Modals & Growth Flow Helpers
  const [unlockedModalAchievement, setUnlockedModalAchievement] = useState(null);
  const [skillToStartChallenge, setSkillToStartChallenge] = useState(null);

  // App Layout Shell State (Sidebar / Modals)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [futureModalFeature, setFutureModalFeature] = useState(null);

  // Persistence to localStorage
  useEffect(() => {
    try { localStorage.setItem('studyhub_notes', JSON.stringify(notes)); } catch (e) {}
  }, [notes]);

  useEffect(() => {
    try { localStorage.setItem('studyhub_semesters', JSON.stringify(semesters)); } catch (e) {}
  }, [semesters]);

  useEffect(() => {
    try { localStorage.setItem('studyhub_skills', JSON.stringify(skills)); } catch (e) {}
  }, [skills]);

  useEffect(() => {
    try { localStorage.setItem('studyhub_challenges', JSON.stringify(challenges)); } catch (e) {}
  }, [challenges]);

  useEffect(() => {
    try { localStorage.setItem('studyhub_projects', JSON.stringify(projects)); } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try { localStorage.setItem('studyhub_achievements', JSON.stringify(achievements)); } catch (e) {}
  }, [achievements]);

  useEffect(() => {
    try { localStorage.setItem('studyhub_growth_timeline', JSON.stringify(growthTimeline)); } catch (e) {}
  }, [growthTimeline]);

  // Stage 6 Career System Shared State
  const [githubData, setGithubData] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_github');
      return saved ? JSON.parse(saved) : INITIAL_GITHUB_DATA;
    } catch {
      return INITIAL_GITHUB_DATA;
    }
  });

  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_resume');
      return saved ? JSON.parse(saved) : INITIAL_RESUME_DATA;
    } catch {
      return INITIAL_RESUME_DATA;
    }
  });

  const [linkedinData, setLinkedinData] = useState(() => {
    try {
      const saved = localStorage.getItem('studyhub_linkedin');
      return saved ? JSON.parse(saved) : INITIAL_LINKEDIN_DATA;
    } catch {
      return INITIAL_LINKEDIN_DATA;
    }
  });

  useEffect(() => {
    try { localStorage.setItem('studyhub_github', JSON.stringify(githubData)); } catch (e) {}
  }, [githubData]);

  useEffect(() => {
    try { localStorage.setItem('studyhub_resume', JSON.stringify(resumeData)); } catch (e) {}
  }, [resumeData]);

  useEffect(() => {
    try { localStorage.setItem('studyhub_linkedin', JSON.stringify(linkedinData)); } catch (e) {}
  }, [linkedinData]);

  // Sync route changes with URL hash and auth protection
  const navigate = (page) => {
    const activeSession = currentUser || getStoredUser();
    const target = resolveRoute(page, activeSession);
    setCurrentPage(target);
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for hash changes (browser back/forward buttons, manual URL entry)
  useEffect(() => {
    const handleHashChange = () => {
      const rawRoute = getCleanRoute();
      const activeSession = currentUser || getStoredUser();
      const target = resolveRoute(rawRoute, activeSession);
      setCurrentPage(target);
      if (window.location.hash.replace(/^#\/?/, '').trim() !== target) {
        window.location.hash = target;
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  // Watchdog: If user is logged out while currently on a private route, redirect to login
  useEffect(() => {
    if (!currentUser && AUTH_PAGES.includes(currentPage)) {
      setCurrentPage('login');
      window.location.hash = 'login';
    }
  }, [currentUser, currentPage]);

  // Growth Loop Step 1: Skill -> Start Challenge
  const handleStartChallengeForSkill = (skillName) => {
    setSkillToStartChallenge(skillName);
    navigate('challenges');
  };

  // Growth Loop Step 2: Complete Challenge -> Assign Project + Update Skill + Evaluate Achievements
  const handleChallengeCompleted = (completedChallenge) => {
    // 1. Assign practical project
    const newProject = createProjectFromChallenge(completedChallenge);
    setProjects(prev => [newProject, ...prev]);

    // 2. Update skill progress to 100%
    setSkills(prev => prev.map(s => 
      s.name.toLowerCase() === completedChallenge.skill.toLowerCase() 
        ? { ...s, progress: 100, status: 'Completed' } 
        : s
    ));

    // 3. Add to Growth Timeline
    const growthItem = {
      id: `grow-${Date.now()}`,
      date: 'Today',
      title: `${completedChallenge.title} Completed`,
      subtitle: `Skill sprint finished. Unlocked practical project: ${newProject.title}.`,
      category: 'challenge',
      icon: 'Target',
      badgeColor: '#10B981'
    };
    setGrowthTimeline(prev => [growthItem, ...prev]);

    // 4. Evaluate achievement unlocks
    const { updatedAchievements, newlyUnlocked } = evaluateAchievementUnlocks({
      achievements,
      challenges: challenges.map(c => c.id === completedChallenge.id ? completedChallenge : c),
      projects: [newProject, ...projects],
      streak: 12,
      skills
    });

    if (newlyUnlocked.length > 0) {
      setAchievements(updatedAchievements);
      setUnlockedModalAchievement(newlyUnlocked[0]);
    }
  };

  // Growth Loop Step 3: Complete Project -> Unlock Achievement + Update Timeline
  const handleProjectCompleted = (completedProject) => {
    // 1. Add to Growth Timeline
    const growthItem = {
      id: `grow-${Date.now()}`,
      date: 'Today',
      title: `${completedProject.title} Completed`,
      subtitle: `Submitted practical solution for ${completedProject.relatedSkill}. Verified proof-of-work project!`,
      category: 'project',
      icon: 'Rocket',
      badgeColor: '#A855F7'
    };
    setGrowthTimeline(prev => [growthItem, ...prev]);

    // 2. Evaluate achievement unlocks
    const { updatedAchievements, newlyUnlocked } = evaluateAchievementUnlocks({
      achievements,
      challenges,
      projects: projects.map(p => p.id === completedProject.id ? completedProject : p),
      streak: 12,
      skills
    });

    if (newlyUnlocked.length > 0) {
      setAchievements(updatedAchievements);
      setUnlockedModalAchievement(newlyUnlocked[0]);
    }
  };

  // Auth Handlers (Frontend mock)
  const handleLoginSuccess = (userData) => {
    const updated = { ...STUDENT_PROFILE, ...userData };
    setCurrentUser(updated);
    localStorage.setItem('studyhub_user', JSON.stringify(updated));
    setCurrentPage('dashboard');
    window.location.hash = 'dashboard';
  };

  const handleSignupSuccess = (userData) => {
    const updated = { ...STUDENT_PROFILE, ...userData };
    setCurrentUser(updated);
    localStorage.setItem('studyhub_user', JSON.stringify(updated));
    setCurrentPage('dashboard');
    window.location.hash = 'dashboard';
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('studyhub_user');
    setCurrentPage('home');
    window.location.hash = 'home';
  };

  const handleSelectFutureFeature = (feature) => {
    setFutureModalFeature(feature);
  };

  const activeUser = currentUser || STUDENT_PROFILE;

  return (
    <div className="app-root">
      {/* Route: Home Landing Page */}
      {currentPage === 'home' && (
        <>
          <Navbar 
            currentPage={currentPage}
            onNavigate={navigate}
            user={currentUser}
            onLogout={handleLogout}
          />
          <Home onNavigate={navigate} user={currentUser} />
          <Footer onNavigate={navigate} user={currentUser} />
        </>
      )}

      {/* Route: Login Page */}
      {currentPage === 'login' && (
        <Login 
          onNavigate={navigate} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      {/* Route: Signup Page */}
      {currentPage === 'signup' && (
        <Signup 
          onNavigate={navigate} 
          onSignupSuccess={handleSignupSuccess} 
        />
      )}

      {/* Routes: Dashboard + Learning System + Action & Growth (Unified App Shell) */}
      {currentUser && AUTH_PAGES.includes(currentPage) && (
        <div className="dashboard-app-layout">
          {/* Responsive Persistent Sidebar */}
          <Sidebar 
            activeNav={currentPage}
            setActiveNav={navigate}
            onSelectFeature={handleSelectFutureFeature}
            isCollapsed={sidebarCollapsed}
            setIsCollapsed={setSidebarCollapsed}
            mobileOpen={mobileSidebarOpen}
            setMobileOpen={setMobileSidebarOpen}
            user={activeUser}
            onNavigate={navigate}
            onLogout={handleLogout}
          />

          {/* Main Content Body */}
          <div className="dashboard-main-viewport">
            {/* Top Header */}
            <Header 
              user={activeUser}
              onLogout={handleLogout}
              onSelectFeature={handleSelectFutureFeature}
              onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              onNavigate={navigate}
              notes={notes}
              skills={skills}
              challenges={challenges}
              projects={projects}
              achievements={achievements}
            />

            {/* Scrollable Viewport Content */}
            <main className="dashboard-content-scroll">
              <ErrorBoundary>
                {currentPage === 'dashboard' && (
                <Dashboard 
                  embedded={true}
                  user={activeUser}
                  onNavigate={navigate} 
                  onLogout={handleLogout}
                  notes={notes}
                  skills={skills}
                  semesters={semesters}
                  challenges={challenges}
                  projects={projects}
                  achievements={achievements}
                  githubData={githubData}
                  resumeData={resumeData}
                  linkedinData={linkedinData}
                  onSelectFeature={handleSelectFutureFeature}
                />
              )}

              {currentPage === 'notes' && (
                <Notes 
                  notes={notes}
                  setNotes={setNotes}
                  onNavigate={navigate}
                  onSelectFeature={handleSelectFutureFeature}
                />
              )}

              {currentPage === 'results' && (
                <Results 
                  semesters={semesters}
                  setSemesters={setSemesters}
                  onNavigate={navigate}
                  onSelectFeature={handleSelectFutureFeature}
                />
              )}

              {currentPage === 'skills' && (
                <Skills 
                  skills={skills}
                  setSkills={setSkills}
                  onNavigate={navigate}
                  onSelectFeature={handleSelectFutureFeature}
                  onStartChallengeForSkill={handleStartChallengeForSkill}
                />
              )}

              {currentPage === 'recommendations' && (
                <Recommendations 
                  skills={skills}
                  setSkills={setSkills}
                  onNavigate={navigate}
                />
              )}

              {currentPage === 'challenges' && (
                <Challenges 
                  challenges={challenges}
                  setChallenges={setChallenges}
                  skills={skills}
                  onNavigate={navigate}
                  onChallengeCompleted={handleChallengeCompleted}
                  initialSkillToStart={skillToStartChallenge}
                />
              )}

              {currentPage === 'projects' && (
                <Projects 
                  projects={projects}
                  setProjects={setProjects}
                  onNavigate={navigate}
                  onProjectCompleted={handleProjectCompleted}
                />
              )}

              {currentPage === 'achievements' && (
                <Achievements 
                  achievements={achievements}
                />
              )}

              {currentPage === 'progress' && (
                <Progress 
                  challenges={challenges}
                  projects={projects}
                  skills={skills}
                  achievements={achievements}
                  growthTimeline={growthTimeline}
                  githubData={githubData}
                  resumeData={resumeData}
                  linkedinData={linkedinData}
                  onNavigate={navigate}
                />
              )}

              {/* Stage 6: Career System Routes */}
              {currentPage === 'github' && (
                <GitHub 
                  githubData={githubData}
                  setGithubData={setGithubData}
                  projects={projects}
                  onNavigate={navigate}
                />
              )}

              {currentPage === 'resume' && (
                <Resume 
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                  skills={skills}
                  projects={projects}
                  achievements={achievements}
                  user={activeUser}
                />
              )}

              {currentPage === 'linkedin' && (
                <LinkedIn 
                  linkedinData={linkedinData}
                  setLinkedinData={setLinkedinData}
                  skills={skills}
                  projects={projects}
                  achievements={achievements}
                  user={activeUser}
                  onNavigate={navigate}
                />
              )}

              {currentPage === 'profile' && (
                <Profile 
                  user={activeUser}
                  setUser={setCurrentUser}
                  skills={skills}
                  challenges={challenges}
                  projects={projects}
                  achievements={achievements}
                  semesters={semesters}
                  githubData={githubData}
                  resumeData={resumeData}
                  linkedinData={linkedinData}
                  onNavigate={navigate}
                />
              )}

              {/* Stage 7: AI Student Assistant Route */}
              {currentPage === 'ai' && (
                <AI 
                  user={activeUser}
                  skills={skills}
                  projects={projects}
                  challenges={challenges}
                  achievements={achievements}
                  semesters={semesters}
                  notes={notes}
                  githubData={githubData}
                  resumeData={resumeData}
                  linkedinData={linkedinData}
                  onNavigate={navigate}
                />
              )}

              {/* Stage 8: Settings Route (Maps to Profile and Account Management) */}
              {currentPage === 'settings' && (
                <Profile 
                  user={activeUser}
                  setUser={setCurrentUser}
                  skills={skills}
                  challenges={challenges}
                  projects={projects}
                  achievements={achievements}
                  semesters={semesters}
                  githubData={githubData}
                  resumeData={resumeData}
                  linkedinData={linkedinData}
                  onNavigate={navigate}
                />
              )}
              </ErrorBoundary>
            </main>
          </div>

          {/* Floating Interactive AI Assistant */}
          <AIAssistant 
            onNavigate={navigate}
            studentContext={{
              profile: activeUser,
              skills,
              projects,
              challenges,
              achievements,
              semesters,
              notes,
              github: githubData,
              resume: resumeData,
              linkedin: linkedinData
            }}
          />

          {/* Future Stage Informational Modal */}
          {futureModalFeature && (
            <FutureStageModal 
              feature={futureModalFeature}
              onClose={() => setFutureModalFeature(null)}
            />
          )}

          {/* Celebratory Achievement Unlock Modal */}
          {unlockedModalAchievement && (
            <AchievementUnlockModal 
              achievement={unlockedModalAchievement}
              onClose={() => setUnlockedModalAchievement(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}
