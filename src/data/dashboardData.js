/**
 * Application Data Architecture — Student Dashboard
 * Contains initial schemas, UI navigation items, and empty state defaults.
 * No hardcoded or fabricated mock data.
 */

export const STUDENT_PROFILE = {
  name: '',
  displayName: '',
  avatar: '',
  email: '',
  role: 'Student',
  college: '',
  course: '',
  year: '',
  semester: '',
  joinDate: ''
};

export const QUICK_STATS = [
  {
    id: 'streak',
    label: 'Current Streak',
    value: '0 Days',
    change: 'No active streak yet',
    isPositive: false,
    icon: 'Flame',
    color: '#F97316'
  },
  {
    id: 'notes',
    label: 'Study Notes',
    value: '0 Notes',
    change: 'No notes created',
    isPositive: false,
    icon: 'BookOpen',
    color: '#6366F1'
  },
  {
    id: 'skills',
    label: 'Active Skills',
    value: '0 Skills',
    change: 'No skills added',
    isPositive: false,
    icon: 'Brain',
    color: '#10B981'
  },
  {
    id: 'projects',
    label: 'Projects',
    value: '0 Completed',
    change: 'No projects submitted',
    isPositive: false,
    icon: 'Rocket',
    color: '#A855F7'
  },
  {
    id: 'achievements',
    label: 'Achievements',
    value: '0 Earned',
    change: 'No badges earned yet',
    isPositive: false,
    icon: 'Trophy',
    color: '#F59E0B'
  },
  {
    id: 'github',
    label: 'GitHub',
    value: '0 Commits',
    change: 'Not connected',
    isPositive: false,
    icon: 'GitBranch',
    color: '#06B6D4'
  }
];

export const ACADEMIC_DATA = {
  cgpa: '0.00',
  maxCgpa: '10.0',
  percentage: '0.0%',
  currentSemester: '',
  semesters: [],
  subjects: []
};

export const SKILLS_DATA = [];

export const CURRENT_CHALLENGE = null;

export const STREAK_DATA = {
  currentStreak: 0,
  longestStreak: 0,
  totalDaysActive: 0,
  rankingMessage: 'Start your daily learning streak',
  heatmapWeeks: [],
  dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

export const RECOMMENDED_SKILL = null;

export const CURRENT_PROJECT = null;

export const GITHUB_ACTIVITY = {
  contributions: 0,
  streakDays: 0,
  repositoriesCount: 0,
  primaryLanguage: '',
  languageBreakdown: [],
  recentCommits: []
};

export const RECENT_ACHIEVEMENTS = [];

export const GROWTH_SUMMARY = {
  metrics: [
    { label: 'Skills Completed', value: 0 },
    { label: 'Projects Completed', value: 0 },
    { label: 'Challenges Completed', value: 0 },
    { label: 'Achievements', value: 0 },
    { label: 'Learning Streak', value: '0 days' },
    { label: 'GitHub Contributions', value: 0 }
  ],
  quote: 'Every completed skill and project adds another piece to your learning portfolio.'
};

export const NOTIFICATIONS = [];

export const AI_SUGGESTIONS = [];

export const SIDEBAR_ITEMS = [
  // Dashboard
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', isImplemented: true, category: 'Main' },

  // Learning
  { id: 'notes', label: 'Notes', icon: 'BookOpen', isImplemented: true, category: 'Learning' },
  { id: 'results', label: 'Results', icon: 'BarChart3', isImplemented: true, category: 'Learning' },
  { id: 'skills', label: 'Skills', icon: 'Brain', isImplemented: true, category: 'Learning' },
  { id: 'recommendations', label: 'AI Pathways', icon: 'Sparkles', isImplemented: true, category: 'Learning' },

  // Growth
  { id: 'challenges', label: 'Challenges', icon: 'Target', isImplemented: true, category: 'Growth' },
  { id: 'projects', label: 'Projects', icon: 'Rocket', isImplemented: true, category: 'Growth' },
  { id: 'achievements', label: 'Achievements', icon: 'Trophy', isImplemented: true, category: 'Growth' },
  { id: 'progress', label: 'Progress', icon: 'Flame', isImplemented: true, category: 'Growth' },

  // Career
  { id: 'github', label: 'GitHub', icon: 'Github', isImplemented: true, category: 'Career' },
  { id: 'resume', label: 'Resume', icon: 'FileText', isImplemented: true, category: 'Career' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', isImplemented: true, category: 'Career' },

  // Account
  { id: 'profile', label: 'Profile', icon: 'User', isImplemented: true, category: 'Account' },
  { id: 'settings', label: 'Settings', icon: 'Settings', isImplemented: false, stage: 'Future', category: 'Account' },

  // AI Assistant
  { id: 'ai', label: 'AI Assistant', icon: 'Bot', isImplemented: true, category: 'AI Assistant' }
];
