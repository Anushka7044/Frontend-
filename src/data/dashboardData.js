/**
 * Mock Data Architecture for Stage 3 — Student Dashboard
 * Isolates all state, metrics, and academic records from UI components.
 */

export const STUDENT_PROFILE = {
  name: 'Anushka Sharma',
  displayName: 'Anushka',
  avatar: 'AS',
  email: 'anushka.s@college.edu',
  role: 'Engineering Student',
  college: 'Engineering Institute of Technology',
  course: 'B.Tech Computer Science & Engineering',
  year: '2nd Year',
  semester: 'Semester 4',
  joinDate: 'August 2024'
};

export const QUICK_STATS = [
  {
    id: 'streak',
    label: 'Current Streak',
    value: '12 Days',
    change: '+3 days this week',
    isPositive: true,
    icon: 'Flame',
    color: '#F97316'
  },
  {
    id: 'notes',
    label: 'Study Notes',
    value: '24 Notes',
    change: '5 subjects covered',
    isPositive: true,
    icon: 'BookOpen',
    color: '#6366F1'
  },
  {
    id: 'skills',
    label: 'Active Skills',
    value: '8 Skills',
    change: '3 Advanced level',
    isPositive: true,
    icon: 'Brain',
    color: '#10B981'
  },
  {
    id: 'projects',
    label: 'Projects',
    value: '5 Completed',
    change: '1 active project',
    isPositive: true,
    icon: 'Rocket',
    color: '#A855F7'
  },
  {
    id: 'achievements',
    label: 'Achievements',
    value: '12 Earned',
    change: 'Latest: Python Builder',
    isPositive: true,
    icon: 'Trophy',
    color: '#F59E0B'
  },
  {
    id: 'github',
    label: 'GitHub',
    value: '86 Commits',
    change: '12-day coding streak',
    isPositive: true,
    icon: 'GitBranch',
    color: '#06B6D4'
  }
];

export const ACADEMIC_DATA = {
  cgpa: '8.42',
  maxCgpa: '10.0',
  percentage: '84.2%',
  currentSemester: 'Semester 4',
  semesters: [
    { sem: 'Sem 1', sgpa: 7.40, percentage: 74.0 },
    { sem: 'Sem 2', sgpa: 7.80, percentage: 78.0 },
    { sem: 'Sem 3', sgpa: 8.10, percentage: 81.0 },
    { sem: 'Sem 4', sgpa: 8.42, percentage: 84.2 }
  ],
  subjects: [
    { name: 'Database Management Systems', score: 91, grade: 'O', status: 'Strong Area', color: '#10B981' },
    { name: 'Data Structures & Algorithms', score: 88, grade: 'A+', status: 'Strong Area', color: '#06B6D4' },
    { name: 'Computer Networks', score: 82, grade: 'A', status: 'Consistent', color: '#6366F1' },
    { name: 'Operating Systems', score: 79, grade: 'B+', status: 'Consistent', color: '#A855F7' },
    { name: 'Discrete Mathematics', score: 76, grade: 'B', status: 'Focus Area', color: '#F59E0B' }
  ]
};

export const SKILLS_DATA = [
  { id: 'python', name: 'Python', level: 'Advanced', progress: 90, color: '#10B981', category: 'Language' },
  { id: 'html', name: 'HTML5 & Semantic Web', level: 'Advanced', progress: 95, color: '#F97316', category: 'Frontend' },
  { id: 'css', name: 'CSS3 & Modern Layouts', level: 'Proficient', progress: 80, color: '#38BDF8', category: 'Styling' },
  { id: 'git', name: 'Git & GitHub Workflow', level: 'Proficient', progress: 70, color: '#EC4899', category: 'DevOps' },
  { id: 'javascript', name: 'JavaScript (ES6+)', level: 'Intermediate', progress: 60, color: '#FACC15', category: 'Frontend' }
];

export const CURRENT_CHALLENGE = {
  title: '30-Day Python Challenge',
  subtitle: 'Data Structures, OOP & Automation',
  progress: 40,
  currentDay: 12,
  totalDays: 30,
  daysRemaining: 18,
  streak: 12,
  tasks: [
    { id: 1, title: 'Revise Python functions & scope', completed: true },
    { id: 2, title: 'Practice list comprehension problems', completed: true },
    { id: 3, title: 'Solve 3 dictionary & set problems', completed: false },
    { id: 4, title: 'Complete mini challenge: Frequency analyzer', completed: false }
  ]
};

export const STREAK_DATA = {
  currentStreak: 12,
  longestStreak: 28,
  totalDaysActive: 46,
  rankingMessage: 'Top 5% consistency this month among peers',
  // 4 weeks of heatmap data (Mon - Sun)
  // Values: 0 = no activity, 1 = light, 2 = medium, 3 = heavy
  heatmapWeeks: [
    { week: 'Week 1', days: [2, 3, 2, 3, 3, 0, 2] },
    { week: 'Week 2', days: [3, 2, 3, 2, 0, 3, 3] },
    { week: 'Week 3', days: [3, 3, 3, 3, 2, 3, 3] },
    { week: 'Week 4', days: [3, 3, 3, 3, 3, 2, 3] }
  ],
  dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

export const RECOMMENDED_SKILL = {
  name: 'JavaScript',
  tagline: 'Modern JavaScript (ES6+ & Async Programming)',
  reason: 'Because you have completed HTML and CSS.',
  difficulty: 'Intermediate',
  duration: '3–4 weeks',
  relatedProject: 'Dynamic Interactive Portfolio Website',
  status: 'Not Started',
  progress: 0,
  topics: ['ES6 Syntax', 'DOM Manipulation', 'Fetch & APIs', 'Async/Await']
};

export const CURRENT_PROJECT = {
  title: 'Portfolio Website',
  relatedSkills: 'HTML + CSS + JavaScript',
  progress: 72,
  deadline: '5 days remaining',
  status: 'In Progress',
  stage: 'Stage 3 of 4: Interactive UI & Dark Mode',
  liveUrl: 'https://portfolio-preview.dev',
  tasksCompleted: 9,
  totalTasks: 12
};

export const GITHUB_ACTIVITY = {
  contributions: 86,
  streakDays: 12,
  repositoriesCount: 14,
  primaryLanguage: 'JavaScript',
  languageBreakdown: [
    { name: 'JavaScript', percentage: 64, color: '#FACC15' },
    { name: 'Python', percentage: 26, color: '#10B981' },
    { name: 'CSS/HTML', percentage: 10, color: '#38BDF8' }
  ],
  recentCommits: [
    { repo: 'studyhub-frontend', msg: 'feat: add student dashboard shell', time: '2 hours ago' },
    { repo: 'python-30-days', msg: 'solution: day 12 dictionary algorithms', time: 'Yesterday' },
    { repo: 'portfolio-v2', msg: 'style: glassmorphism card components', time: '3 days ago' }
  ]
};

export const RECENT_ACHIEVEMENTS = [
  {
    id: 'python-builder',
    title: 'Python Builder',
    description: 'Completed Python challenge + practical CLI project',
    date: 'Earned 2 days ago',
    icon: 'Trophy',
    badgeColor: '#F59E0B'
  },
  {
    id: 'consistency-champ',
    title: 'Consistency Champion',
    description: 'Maintained an unbroken 7-day learning streak',
    date: 'Earned 5 days ago',
    icon: 'Flame',
    badgeColor: '#F97316'
  },
  {
    id: 'project-builder',
    title: 'Project Builder',
    description: 'Architected and completed first practical web project',
    date: 'Earned Sep 10, 2026',
    icon: 'Rocket',
    badgeColor: '#A855F7'
  }
];

export const GROWTH_SUMMARY = {
  metrics: [
    { label: 'Skills Completed', value: 8 },
    { label: 'Projects Completed', value: 5 },
    { label: 'Challenges Completed', value: 6 },
    { label: 'Achievements', value: 12 },
    { label: 'Learning Streak', value: '12 days' },
    { label: 'GitHub Contributions', value: 86 }
  ],
  quote: 'Keep going. Every completed skill becomes part of your career profile.'
};

export const NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'challenge',
    title: '🎉 You completed a challenge!',
    detail: 'Day 11 of 30-Day Python Challenge is verified.',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'notif-2',
    type: 'project',
    title: '🚀 Your project deadline is approaching',
    detail: 'Portfolio Website is scheduled for completion in 5 days.',
    time: '4 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    type: 'achievement',
    title: '🏆 New achievement unlocked!',
    detail: 'You earned the "Python Builder" milestone badge.',
    time: '1 day ago',
    read: true
  },
  {
    id: 'notif-4',
    type: 'skill',
    title: '💡 A new skill has been recommended',
    detail: 'Master JavaScript to build rich interactive web apps.',
    time: '2 days ago',
    read: true
  }
];

export const AI_SUGGESTIONS = [
  {
    query: 'What should I learn next?',
    reply: 'Based on your completed HTML & CSS foundations, JavaScript is your optimal next step! It will unlock dynamic interactivity for your current Portfolio Website project.'
  },
  {
    query: 'Explain my weak areas.',
    reply: 'Looking at your Semester 4 academics, Discrete Mathematics is at 76%. Dedicating 25 minutes daily to graph theory and recurrence relations will lift your score into the A range!'
  },
  {
    query: 'Help me plan today\'s study.',
    reply: 'Here is your personalized 90-minute roadmap for today:\n1. 30 mins: Solve the 2 remaining Python dictionary problems.\n2. 40 mins: Style the navbar for your Portfolio Website.\n3. 20 mins: Revise Computer Networks lecture notes.'
  },
  {
    query: 'Give me project ideas.',
    reply: 'Top 3 project ideas matching your skill level:\n1. Algorithm Visualizer (JS + DOM)\n2. Student Grade Calculator (Python CLI or Web)\n3. Developer Bookmark Vault with Markdown preview'
  }
];

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

  // Career (Stage 6)
  { id: 'github', label: 'GitHub', icon: 'Github', isImplemented: true, category: 'Career' },
  { id: 'resume', label: 'Resume', icon: 'FileText', isImplemented: true, category: 'Career' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', isImplemented: true, category: 'Career' },

  // Account
  { id: 'profile', label: 'Profile', icon: 'User', isImplemented: true, category: 'Account' },
  { id: 'settings', label: 'Settings', icon: 'Settings', isImplemented: false, stage: 'Future', category: 'Account' },

  // AI Assistant (Stage 7)
  { id: 'ai', label: 'AI Assistant', icon: 'Bot', isImplemented: true, category: 'AI Assistant' }
];
