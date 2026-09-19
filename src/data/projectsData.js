/**
 * Mock Data for Stage 5 — Project System
 * Contains projects in assigned, in_progress, submitted, and completed states.
 * Connects directly to completed challenges.
 */

export const PROJECT_MILESTONES = [
  { id: 'planning', label: 'Planning', order: 1 },
  { id: 'development', label: 'Development', order: 2 },
  { id: 'testing', label: 'Testing', order: 3 },
  { id: 'documentation', label: 'Documentation', order: 4 },
  { id: 'submission', label: 'Submission', order: 5 }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-expense-tracker',
    title: 'Student Expense Tracker',
    description: 'Build a Python application that allows students to record, categorize, and analyze personal expenses with monthly budget projections.',
    relatedSkill: 'Python',
    relatedChallengeId: 'chal-python-30',
    difficulty: 'Beginner',
    durationDays: 7,
    startDate: '2026-09-12',
    deadline: '2026-09-19',
    daysRemaining: 3,
    status: 'in_progress', // 'assigned' | 'in_progress' | 'submitted' | 'completed'
    currentMilestone: 'Development',
    requirements: [
      { id: 'req-1', text: 'Create clean project directory structure and virtualenv', completed: true },
      { id: 'req-2', text: 'Implement CLI user input for daily expenses', completed: true },
      { id: 'req-3', text: 'Add expense categorization (Food, Books, Travel, Tuition)', completed: true },
      { id: 'req-4', text: 'Calculate total expenses & filter by date range', completed: true },
      { id: 'req-5', text: 'Add monthly summary report and budget alert warnings', completed: false },
      { id: 'req-6', text: 'Write automated unit tests for calculation modules', completed: false }
    ],
    submission: {
      repoUrl: '',
      liveDemoUrl: '',
      whatILearned: '',
      submittedDate: null
    }
  },
  {
    id: 'proj-kanban-board',
    title: 'Interactive Kanban Task Board',
    description: 'Create a drag-and-drop web task board with local state persistence, priority tagging, and task search filtering.',
    relatedSkill: 'JavaScript',
    relatedChallengeId: 'chal-js-14',
    difficulty: 'Intermediate',
    durationDays: 10,
    startDate: '2026-09-15',
    deadline: '2026-09-25',
    daysRemaining: 9,
    status: 'assigned',
    currentMilestone: 'Planning',
    requirements: [
      { id: 'req-k1', text: 'Setup vanilla HTML, CSS flexbox layout with columns', completed: false },
      { id: 'req-k2', text: 'Implement HTML5 drag and drop API listeners', completed: false },
      { id: 'req-k3', text: 'Sync state with browser localStorage', completed: false },
      { id: 'req-k4', text: 'Add modal for task creation & editing', completed: false },
      { id: 'req-k5', text: 'Filter cards by tag and priority', completed: false }
    ],
    submission: {
      repoUrl: '',
      liveDemoUrl: '',
      whatILearned: '',
      submittedDate: null
    }
  },
  {
    id: 'proj-weather-app',
    title: 'Real-Time Weather & Air Quality App',
    description: 'Fetch weather telemetry from OpenWeatherMap API with 5-day forecasts, geolocation lookup, and animated temperature graphs.',
    relatedSkill: 'JavaScript',
    relatedChallengeId: null,
    difficulty: 'Intermediate',
    durationDays: 7,
    startDate: '2026-09-05',
    deadline: '2026-09-12',
    daysRemaining: 0,
    status: 'submitted',
    currentMilestone: 'Submission',
    requirements: [
      { id: 'req-w1', text: 'Fetch current weather and 5-day forecast from API', completed: true },
      { id: 'req-w2', text: 'Handle geolocation and search by city name', completed: true },
      { id: 'req-w3', text: 'Display air quality index metrics and recommendations', completed: true },
      { id: 'req-w4', text: 'Build responsive glassmorphism weather dashboard', completed: true },
      { id: 'req-w5', text: 'Handle offline state with service worker caching', completed: true }
    ],
    submission: {
      repoUrl: 'https://github.com/anushka-sharma/weather-dashboard-js',
      liveDemoUrl: 'https://anushka-weather.netlify.app',
      whatILearned: 'Learned asynchronous JavaScript flow, handling API rate limits gracefully, and parsing nested JSON weather telemetry payloads.',
      submittedDate: '2026-09-12'
    }
  },
  {
    id: 'proj-portfolio',
    title: 'Personal Developer Portfolio',
    description: 'Architect a responsive student portfolio showcasing technical skills, academic results, live projects, and verified certificates.',
    relatedSkill: 'HTML & CSS',
    relatedChallengeId: 'chal-html-7',
    difficulty: 'Beginner',
    durationDays: 7,
    startDate: '2026-08-25',
    deadline: '2026-09-01',
    daysRemaining: 0,
    status: 'completed',
    currentMilestone: 'Submission',
    requirements: [
      { id: 'req-pf1', text: 'Design responsive multi-section landing page', completed: true },
      { id: 'req-pf2', text: 'Implement dark/light mode toggle with CSS custom properties', completed: true },
      { id: 'req-pf3', text: 'Showcase project grid with live preview links', completed: true },
      { id: 'req-pf4', text: 'Add accessible contact form with validation', completed: true },
      { id: 'req-pf5', text: 'Deploy to GitHub Pages with custom domain', completed: true }
    ],
    submission: {
      repoUrl: 'https://github.com/anushka-sharma/developer-portfolio',
      liveDemoUrl: 'https://anushka-dev.pages.dev',
      whatILearned: 'Mastered responsive CSS Grid layouts, semantic accessible markup, and deploying static sites via GitHub Pages.',
      submittedDate: '2026-09-01',
      completedDate: '2026-09-02'
    }
  },
  {
    id: 'proj-git-collab',
    title: 'Open Source Contribution Walkthrough',
    description: 'Fork a public documentation repository, fix broken markdown links, implement contributor guidelines, and submit an accepted pull request.',
    relatedSkill: 'Git & GitHub',
    relatedChallengeId: 'chal-git-7',
    difficulty: 'Beginner',
    durationDays: 5,
    startDate: '2026-08-18',
    deadline: '2026-08-23',
    daysRemaining: 0,
    status: 'completed',
    currentMilestone: 'Submission',
    requirements: [
      { id: 'req-gc1', text: 'Fork and clone upstream open-source repo', completed: true },
      { id: 'req-gc2', text: 'Create dedicated topic branch for bug fixes', completed: true },
      { id: 'req-gc3', text: 'Run pre-commit linters and markdown tests', completed: true },
      { id: 'req-gc4', text: 'Open detailed PR linking resolved issues', completed: true }
    ],
    submission: {
      repoUrl: 'https://github.com/anushka-sharma/docs-contribution',
      liveDemoUrl: '',
      whatILearned: 'Learned collaborative Git branching hygiene, rebasing against upstream master, and writing effective PR descriptions.',
      submittedDate: '2026-08-23',
      completedDate: '2026-08-24'
    }
  }
];

/**
 * Calculate dynamic project progress percentage based on completed checklist items
 */
export function calculateProjectProgress(requirements) {
  if (!requirements || requirements.length === 0) return 0;
  const completed = requirements.filter(r => r.completed).length;
  return Math.round((completed / requirements.length) * 100);
}

/**
 * Generate a new project assignment when a challenge completes
 */
export function createProjectFromChallenge(challenge) {
  const skill = challenge.skill;
  const projectName = `${skill} Capstone Solution`;
  
  return {
    id: `proj-${Date.now()}`,
    title: challenge.relatedProject || projectName,
    description: `Practical application applying everything learned during the ${challenge.title}. Build, verify, and submit your working solution.`,
    relatedSkill: skill,
    relatedChallengeId: challenge.id,
    difficulty: challenge.difficulty || 'Intermediate',
    durationDays: 7,
    startDate: new Date().toISOString().split('T')[0],
    deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    daysRemaining: 7,
    status: 'assigned',
    currentMilestone: 'Planning',
    requirements: [
      { id: `req-${Date.now()}-1`, text: `Architect core structure and setup repository for ${skill}`, completed: false },
      { id: `req-${Date.now()}-2`, text: 'Implement key application logic and user interaction flows', completed: false },
      { id: `req-${Date.now()}-3`, text: 'Perform edge-case testing and code cleanup', completed: false },
      { id: `req-${Date.now()}-4`, text: 'Write complete README with architecture diagram & instructions', completed: false }
    ],
    submission: {
      repoUrl: '',
      liveDemoUrl: '',
      whatILearned: '',
      submittedDate: null
    }
  };
}
