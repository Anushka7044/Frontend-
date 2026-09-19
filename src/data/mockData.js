export const FEATURES_DATA = [
  {
    id: 'notes',
    title: 'Study Notes',
    description: 'Create, organize, and revise your engineering subject notes with markdown support and tagging.',
    iconName: 'BookOpen',
    color: '#6366F1'
  },
  {
    id: 'results',
    title: 'Academic Results',
    description: 'Track your semester SGPA, CGPA, and subject-wise grades with visual performance analytics.',
    iconName: 'BarChart3',
    color: '#06B6D4'
  },
  {
    id: 'skills',
    title: 'Technical Skills',
    description: 'Build your skill tree across web development, languages, core CS, and track percentage mastery.',
    iconName: 'Brain',
    color: '#10B981'
  },
  {
    id: 'challenges',
    title: 'Time-Based Challenges',
    description: 'Turn your learning goals into focused 7-day, 14-day, or 30-day sprints with daily milestones.',
    iconName: 'Target',
    color: '#F59E0B'
  },
  {
    id: 'projects',
    title: 'Practical Projects',
    description: 'Apply every concept into tangible, portfolio-grade projects with live demo links and documentation.',
    iconName: 'Rocket',
    color: '#A855F7'
  },
  {
    id: 'achievements',
    title: 'Milestone Badges',
    description: 'Celebrate completed challenges, code streaks, and project submissions with verified credentials.',
    iconName: 'Trophy',
    color: '#EAB308'
  },
  {
    id: 'progress',
    title: 'Streak & Consistency',
    description: 'Monitor your continuous learning streak, daily activity heatmaps, and weekly commitment hours.',
    iconName: 'Flame',
    color: '#F97316'
  },
  {
    id: 'github',
    title: 'GitHub Activity',
    description: 'Sync your GitHub commits, repositories, and coding contributions into your student profile.',
    iconName: 'GitBranch',
    color: '#38BDF8'
  },
  {
    id: 'resume',
    title: 'Dynamic Resume',
    description: 'Auto-generate a recruiter-ready, proof-of-work resume backed by real completed projects.',
    iconName: 'FileText',
    color: '#EC4899'
  },
  {
    id: 'ai-assistant',
    title: 'AI Study Mentor',
    description: 'Get personalized explanations, study schedules, and project architecture advice on demand.',
    iconName: 'Bot',
    color: '#818CF8'
  }
];

export const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Learn Fundamentals',
    description: 'Pick a high-demand skill and master the core foundations through curated study modules.',
    iconName: 'BookOpen'
  },
  {
    step: '02',
    title: 'Set Challenge',
    description: 'Commit to a 7, 14, or 30-day learning sprint with clear checkpoints and daily focus.',
    iconName: 'Calendar'
  },
  {
    step: '03',
    title: 'Build Project',
    description: 'Apply the skills immediately by architecting and coding an actual practical project.',
    iconName: 'Code2'
  },
  {
    step: '04',
    title: 'Submit & Review',
    description: 'Push your source code to GitHub and submit your live link for verification.',
    iconName: 'CheckCircle2'
  },
  {
    step: '05',
    title: 'Unlock Achievement',
    description: 'Earn a verified badge added to your growth record and shareable portfolio.',
    iconName: 'Award'
  },
  {
    step: '06',
    title: 'Continuous Growth',
    description: 'Receive personalized AI suggestions for your next skill and keep leveling up.',
    iconName: 'TrendingUp'
  }
];

export const PROGRESS_METRICS = {
  skills: [
    { name: 'HTML & Semantic Web', level: 90, color: '#F97316' },
    { name: 'CSS & Modern Responsive Design', level: 75, color: '#38BDF8' },
    { name: 'JavaScript (ES6+ & DOM)', level: 65, color: '#FACC15' },
    { name: 'Python & Data Structures', level: 45, color: '#10B981' }
  ],
  streak: {
    current: 12,
    longest: 28,
    activityDays: 46
  },
  projects: {
    completed: 8,
    inProgress: 2,
    totalCommits: 247
  },
  achievementsCount: 12
};

export const EDUCATION_OPTIONS = {
  years: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
  semesters: [
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8'
  ],
  popularCourses: [
    'B.Tech Computer Science & Engineering',
    'B.Tech Information Technology',
    'B.Tech Artificial Intelligence & Data Science',
    'B.Tech Electronics & Communication',
    'B.Tech Electrical Engineering',
    'B.Tech Mechanical Engineering',
    'BCA (Bachelor of Computer Applications)',
    'B.Sc Computer Science'
  ]
};
