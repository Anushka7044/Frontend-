/**
 * Stage 6 — Career System Mock Data & Calculation Utilities
 * Powers GitHub, Resume Builder, LinkedIn Profile, and Career Readiness.
 */

export const INITIAL_GITHUB_DATA = {
  username: 'anushkaray',
  displayName: 'Anushka Ray',
  bio: 'CSE Student | Python | Web Development | Building practical software & developer tools',
  profileUrl: 'https://github.com/anushka-sharma',
  status: 'Connected', // 'Connected' | 'Syncing' | 'Disconnected'
  isConnected: true,
  stats: {
    repositories: 24,
    contributions: 186,
    stars: 42,
    followers: 128,
    following: 64
  },
  currentStreak: 14,
  longestStreak: 28,
  totalContributions: 186,
  // 26 weeks of contribution heatmap activity
  // Intensity: 0 = none, 1 = 1-2, 2 = 3-5, 3 = 6+
  heatmapWeeks: [
    { week: 1, days: [1, 2, 0, 1, 3, 2, 0] },
    { week: 2, days: [0, 1, 2, 2, 1, 0, 2] },
    { week: 3, days: [2, 3, 1, 0, 2, 1, 1] },
    { week: 4, days: [1, 0, 2, 3, 3, 2, 0] },
    { week: 5, days: [0, 2, 1, 2, 0, 3, 1] },
    { week: 6, days: [3, 2, 2, 1, 3, 0, 2] },
    { week: 7, days: [1, 1, 3, 2, 1, 2, 0] },
    { week: 8, days: [2, 0, 1, 3, 2, 1, 3] },
    { week: 9, days: [0, 2, 2, 1, 3, 2, 1] },
    { week: 10, days: [1, 3, 0, 2, 1, 0, 2] },
    { week: 11, days: [2, 1, 3, 3, 2, 1, 0] },
    { week: 12, days: [3, 2, 1, 0, 2, 3, 2] },
    { week: 13, days: [0, 1, 2, 3, 1, 2, 1] },
    { week: 14, days: [1, 2, 3, 2, 3, 0, 2] },
    { week: 15, days: [2, 3, 1, 1, 2, 3, 0] },
    { week: 16, days: [1, 0, 2, 2, 3, 1, 2] },
    { week: 17, days: [2, 1, 3, 0, 1, 2, 3] },
    { week: 18, days: [3, 2, 0, 3, 2, 1, 1] },
    { week: 19, days: [1, 3, 2, 2, 0, 3, 2] },
    { week: 20, days: [2, 1, 3, 1, 2, 2, 0] },
    { week: 21, days: [0, 2, 1, 3, 3, 1, 2] },
    { week: 22, days: [3, 1, 2, 2, 1, 0, 3] },
    { week: 23, days: [2, 3, 3, 1, 2, 3, 1] },
    { week: 24, days: [1, 2, 1, 3, 2, 2, 2] },
    { week: 25, days: [3, 2, 3, 2, 3, 1, 3] },
    { week: 26, days: [2, 3, 2, 3, 3, 2, 3] }
  ],
  repositories: [
    {
      id: 'repo-sgp',
      name: 'student-growth-platform',
      description: 'End-to-end student growth tracking platform connecting learning, projects, achievements and career profiles.',
      language: 'JavaScript',
      languageColor: '#FACC15',
      stars: 24,
      forks: 8,
      updatedDate: '2 days ago',
      topics: ['react', 'edtech', 'portfolio', 'vite', 'javascript'],
      isFeatured: true,
      githubUrl: 'https://github.com/anushka-sharma/student-growth-platform',
      isFromPlatform: true
    },
    {
      id: 'repo-py-fm',
      name: 'Python-File-Manager',
      description: 'Cross-platform CLI file organizer & automated directory categorization utility with SHA-256 duplicate hashing.',
      language: 'Python',
      languageColor: '#10B981',
      stars: 18,
      forks: 5,
      updatedDate: '1 week ago',
      topics: ['python', 'cli', 'automation', 'file-management'],
      isFeatured: true,
      githubUrl: 'https://github.com/anushka-sharma/Python-File-Manager',
      isFromPlatform: false
    },
    {
      id: 'repo-dsa',
      name: 'DSA-Practice',
      description: 'Comprehensive repository containing clean, well-commented solutions to 200+ algorithm and data structure problems.',
      language: 'C++',
      languageColor: '#06B6D4',
      stars: 32,
      forks: 12,
      updatedDate: '3 days ago',
      topics: ['dsa', 'algorithms', 'competitive-programming', 'cpp'],
      isFeatured: true,
      githubUrl: 'https://github.com/anushka-sharma/DSA-Practice',
      isFromPlatform: false
    },
    {
      id: 'repo-iot-mine',
      name: 'IoT-Mine-Monitoring',
      description: 'Hardware sensor telemetry monitor for environmental safety and gas detection with automated alert triggers.',
      language: 'Python',
      languageColor: '#10B981',
      stars: 15,
      forks: 4,
      updatedDate: '3 weeks ago',
      topics: ['iot', 'sensors', 'safety', 'telemetry'],
      isFeatured: false,
      githubUrl: 'https://github.com/anushka-sharma/IoT-Mine-Monitoring',
      isFromPlatform: false
    },
    {
      id: 'repo-weather',
      name: 'weather-dashboard-js',
      description: 'Real-time weather analytics application with OpenWeatherMap API, geolocation, and 5-day predictive forecasts.',
      language: 'JavaScript',
      languageColor: '#FACC15',
      stars: 12,
      forks: 3,
      updatedDate: '2 weeks ago',
      topics: ['javascript', 'weather-api', 'css-grid', 'async-js'],
      isFeatured: true,
      githubUrl: 'https://github.com/anushka-sharma/weather-dashboard-js',
      isFromPlatform: true
    },
    {
      id: 'repo-portfolio',
      name: 'developer-portfolio',
      description: 'Clean, accessible personal portfolio website showcasing verified academic achievements and project demos.',
      language: 'HTML',
      languageColor: '#F97316',
      stars: 14,
      forks: 2,
      updatedDate: '1 month ago',
      topics: ['portfolio', 'html5', 'responsive', 'dark-mode'],
      isFeatured: false,
      githubUrl: 'https://github.com/anushka-sharma/developer-portfolio',
      isFromPlatform: true
    }
  ]
};

export const INITIAL_RESUME_DATA = {
  personalInfo: {
    fullName: 'Anushka Ray',
    headline: 'Computer Science Undergraduate | Aspiring Software Engineer',
    email: 'anushka.ray@college.edu',
    phone: '+91 98765 43210',
    location: 'Kolkata, West Bengal, India',
    github: 'github.com/anushka-sharma',
    linkedin: 'linkedin.com/in/anushka-ray',
    portfolio: 'anushka-dev.pages.dev'
  },
  professionalSummary:
    'Dedicated Computer Science undergraduate with practical experience in building performant web applications, Python automation tools, and scalable algorithms. Strong foundation in data structures, relational database design, and modern responsive UI development. Proven track record of academic consistency and hands-on project execution. Seeking software engineering internship opportunities to deliver real-world impact.',
  education: [
    {
      id: 'edu-1',
      college: 'Engineering Institute of Technology',
      degree: 'Bachelor of Technology (B.Tech)',
      course: 'Computer Science & Engineering',
      startYear: '2024',
      expectedGraduation: '2028',
      cgpa: '8.42 / 10.0',
      relevantCoursework: 'Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Discrete Mathematics, OOP'
    }
  ],
  selectedSkillIds: [
    'Python',
    'JavaScript',
    'HTML & Semantic Web',
    'CSS & Responsive Layouts',
    'SQL & Database Design',
    'Git & GitHub Workflow',
    'React',
    'C++'
  ],
  customSkills: 'REST APIs, Agile/Scrum, Tailwind CSS, Responsive Web Design',
  selectedProjectIds: [
    'proj-expense-tracker',
    'proj-weather-app',
    'proj-portfolio'
  ],
  customProjects: [],
  selectedAchievementIds: [
    'ach-python-builder',
    'ach-first-project',
    'ach-academic-excellence',
    'ach-consistency-7'
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Python for Data Science and Beyond',
      organization: 'DeepLearning.AI / Coursera',
      issueDate: 'August 2026',
      credentialLink: 'https://coursera.org/verify/demo-cert-1'
    },
    {
      id: 'cert-2',
      name: 'Responsive Web Design Certification',
      organization: 'freeCodeCamp',
      issueDate: 'July 2026',
      credentialLink: 'https://freecodecamp.org/certification/demo-cert-2'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      organization: 'Campus Developer Student Club (GDSC)',
      role: 'Technical Team Member & Web Contributor',
      startDate: 'Sep 2025',
      endDate: 'Present',
      description:
        'Coordinated peer learning workshops on Git branching and modern JavaScript fundamentals. Contributed to building event registration portals and open source project templates for student developers.'
    }
  ],
  extraSections: {
    languages: 'English (Professional), Hindi (Native), Bengali (Fluent)',
    interests: 'Open-Source Tooling, Distributed Systems, UI/UX Micro-Interactions, Competitive Coding',
    coursework: 'Database Management Systems, Advanced Data Structures, Web Technology',
    volunteer: 'Student Mentor for 1st Year Programming Lab at EIT'
  }
};

export const INITIAL_LINKEDIN_DATA = {
  basicInfo: {
    fullName: 'Anushka Ray',
    headline: 'CSE Student @ EIT | Full-Stack & Python Developer | Open Source Contributor',
    location: 'Kolkata, West Bengal, India',
    about:
      'Passionate Computer Science student with a strong drive for building functional software and practical tools. Experienced with Python, JavaScript, React, SQL, and responsive CSS. Proven track record of consistent daily learning streaks and building projects with clean version control. Actively seeking software engineering internship opportunities.',
    linkedinUrl: 'https://linkedin.com/in/anushka-ray',
    profilePhotoUrl: ''
  },
  careerInterests: {
    interestedRoles: 'Software Engineering Intern, Frontend Developer, Full-Stack Developer, Python Developer',
    preferredDomains: 'Web Applications, Developer Tools, Cloud Infrastructure, EdTech',
    preferredWorkType: 'Internship / Hybrid / Remote',
    careerGoal: 'Secure a high-impact engineering internship and contribute to production-grade distributed applications.'
  },
  selectedSkillIds: [
    'Python',
    'JavaScript',
    'HTML & Semantic Web',
    'CSS & Responsive Layouts',
    'SQL & Database Design',
    'Git & GitHub Workflow',
    'React'
  ],
  selectedProjectIds: [
    'proj-expense-tracker',
    'proj-weather-app',
    'proj-portfolio'
  ],
  selectedAchievementIds: [
    'ach-python-builder',
    'ach-first-project',
    'ach-academic-excellence'
  ],
  certifications: [
    {
      id: 'lcert-1',
      name: 'Python for Data Science and Beyond',
      organization: 'DeepLearning.AI',
      issueDate: 'August 2026',
      credentialLink: 'https://coursera.org/verify/demo-cert-1'
    }
  ]
};

/**
 * Calculates resume completeness score and identifies missing fields
 */
export function calculateResumeCompleteness(resumeData) {
  if (!resumeData) return { percentage: 0, missingItems: ['Personal Information'] };

  const checks = [
    { label: 'Full Name', valid: Boolean(resumeData.personalInfo?.fullName?.trim()) },
    { label: 'Professional Headline', valid: Boolean(resumeData.personalInfo?.headline?.trim()) },
    { label: 'Contact Email', valid: Boolean(resumeData.personalInfo?.email?.trim()) },
    { label: 'Phone Number', valid: Boolean(resumeData.personalInfo?.phone?.trim()) },
    { label: 'Location', valid: Boolean(resumeData.personalInfo?.location?.trim()) },
    { label: 'Professional Summary', valid: Boolean(resumeData.professionalSummary?.trim()?.length > 40) },
    { label: 'Education Entry', valid: Boolean(resumeData.education && resumeData.education.length > 0) },
    { label: 'Technical Skills (at least 3)', valid: Boolean(resumeData.selectedSkillIds?.length >= 3) },
    { label: 'Projects (at least 1)', valid: Boolean(resumeData.selectedProjectIds?.length >= 1) },
    { label: 'Achievements or Honors', valid: Boolean(resumeData.selectedAchievementIds?.length >= 1) },
    { label: 'Certifications', valid: Boolean(resumeData.certifications?.length >= 1) },
    { label: 'Experience or Leadership', valid: Boolean(resumeData.experience?.length >= 1) },
    { label: 'GitHub Profile Link', valid: Boolean(resumeData.personalInfo?.github?.trim()) },
    { label: 'LinkedIn Profile Link', valid: Boolean(resumeData.personalInfo?.linkedin?.trim()) }
  ];

  const completed = checks.filter(c => c.valid).length;
  const percentage = Math.round((completed / checks.length) * 100);
  const missingItems = checks.filter(c => !c.valid).map(c => c.label);

  return { percentage, missingItems, totalChecks: checks.length, completedChecks: completed };
}

/**
 * Calculates LinkedIn profile strength score and actionable improvement suggestions
 */
export function calculateLinkedInStrength(linkedinData) {
  if (!linkedinData) return { percentage: 0, checks: [], suggestions: [] };

  const checks = [
    { key: 'name', label: 'Name', valid: Boolean(linkedinData.basicInfo?.fullName?.trim()) },
    { key: 'headline', label: 'Headline', valid: Boolean(linkedinData.basicInfo?.headline?.trim()) },
    { key: 'about', label: 'About', valid: Boolean(linkedinData.basicInfo?.about?.trim()?.length > 30) },
    { key: 'location', label: 'Location', valid: Boolean(linkedinData.basicInfo?.location?.trim()) },
    { key: 'skills', label: 'Skills (3+)', valid: Boolean(linkedinData.selectedSkillIds?.length >= 3) },
    { key: 'projects', label: 'Projects (2+)', valid: Boolean(linkedinData.selectedProjectIds?.length >= 2) },
    { key: 'awards', label: 'Honors & Awards', valid: Boolean(linkedinData.selectedAchievementIds?.length >= 1) },
    { key: 'certifications', label: 'Certifications', valid: Boolean(linkedinData.certifications?.length >= 1) },
    { key: 'interests', label: 'Career Interests', valid: Boolean(linkedinData.careerInterests?.interestedRoles?.trim()) },
    { key: 'url', label: 'LinkedIn URL', valid: Boolean(linkedinData.basicInfo?.linkedinUrl?.includes('linkedin.com')) }
  ];

  const completed = checks.filter(c => c.valid).length;
  const percentage = Math.round((completed / checks.length) * 100);

  const suggestions = [];
  if (!checks.find(c => c.key === 'headline')?.valid) {
    suggestions.push('Add a professional headline highlighting your student status and target role.');
  }
  if (!checks.find(c => c.key === 'projects')?.valid) {
    suggestions.push('Showcase at least 2 completed practical projects on your profile.');
  }
  if (!checks.find(c => c.key === 'certifications')?.valid) {
    suggestions.push('Add verified course certifications to enhance industry credibility.');
  }
  if (!checks.find(c => c.key === 'about')?.valid) {
    suggestions.push('Write a comprehensive summary detailing your background and coding passion.');
  }
  if (!checks.find(c => c.key === 'url')?.valid) {
    suggestions.push('Connect your public LinkedIn profile URL.');
  }
  if (suggestions.length === 0) {
    suggestions.push('Your LinkedIn profile is optimized! Share recent project updates to increase visibility.');
  }

  return { percentage, checks, suggestions };
}

/**
 * Calculates central profile completion percentage and check items
 */
export function calculateProfileCompleteness(user, resumeData, linkedinData, projects = [], skills = []) {
  const checks = [
    { label: 'Basic Information', valid: Boolean(user?.name && user?.email && user?.course) },
    { label: 'Academic Details', valid: Boolean(user?.college && user?.year && user?.semester) },
    { label: 'Technical Skills Tracked', valid: skills.length >= 3 },
    { label: 'Completed Projects', valid: projects.filter(p => p.status === 'completed').length >= 1 },
    { label: 'Resume Profile Built', valid: Boolean(resumeData && calculateResumeCompleteness(resumeData).percentage >= 60) },
    { label: 'LinkedIn Profile Configured', valid: Boolean(linkedinData && calculateLinkedInStrength(linkedinData).percentage >= 50) },
    { label: 'GitHub Presence Synced', valid: true },
    { label: 'Portfolio Link Set', valid: Boolean(resumeData?.personalInfo?.portfolio) }
  ];

  const completed = checks.filter(c => c.valid).length;
  const percentage = Math.round((completed / checks.length) * 100);

  return { percentage, checks };
}

/**
 * Calculates student Career Readiness across the 6 core pillars
 */
export function calculateCareerReadiness({
  skills = [],
  projects = [],
  achievements = [],
  githubData,
  resumeCompleteness = 85,
  linkedinStrength = 75
}) {
  // 1. Skills Score: average progress of top skills
  const avgSkillProgress = skills.length > 0 
    ? Math.round(skills.reduce((acc, s) => acc + (s.progress || 0), 0) / skills.length) 
    : 70;
  const skillsScore = Math.min(100, Math.max(40, avgSkillProgress));

  // 2. Projects Score: completed projects vs target (target: 3+)
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'submitted').length;
  const projectsScore = Math.min(100, Math.round(((completedProjects * 30) + (inProgressProjects * 15)) + 20));

  // 3. Achievements Score: unlocked achievements (12 out of 20 = 60-70%)
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const achievementsScore = Math.min(100, Math.round((unlockedAchievements / Math.max(achievements.length, 1)) * 100));

  // 4. GitHub Score: streak + repos
  const githubScore = githubData?.isConnected ? 75 : 20;

  // 5. Resume Score
  const resumeScore = resumeCompleteness;

  // 6. LinkedIn Score
  const linkedinScore = linkedinStrength;

  // Overall Weighted Score
  const overall = Math.round(
    skillsScore * 0.2 +
    projectsScore * 0.25 +
    achievementsScore * 0.15 +
    githubScore * 0.15 +
    resumeScore * 0.15 +
    linkedinScore * 0.1
  );

  let readinessLevel = 'Early Stage';
  let badgeColor = '#F59E0B';
  if (overall >= 80) {
    readinessLevel = 'Internship Ready';
    badgeColor = '#10B981';
  } else if (overall >= 65) {
    readinessLevel = 'Profile Strong';
    badgeColor = '#6366F1';
  } else if (overall >= 50) {
    readinessLevel = 'In Progress';
    badgeColor = '#06B6D4';
  }

  return {
    overall,
    readinessLevel,
    badgeColor,
    pillars: [
      { name: 'Skills', score: skillsScore, color: '#10B981', target: '80%+' },
      { name: 'Projects', score: projectsScore, color: '#A855F7', target: '3+ Built' },
      { name: 'Achievements', score: achievementsScore, color: '#F59E0B', target: '10+ Badges' },
      { name: 'GitHub', score: githubScore, color: '#06B6D4', target: 'Active Streak' },
      { name: 'Resume', score: resumeScore, color: '#6366F1', target: 'ATS Ready' },
      { name: 'LinkedIn', score: linkedinScore, color: '#0EA5E9', target: '70%+ Strength' }
    ]
  };
}

/**
 * Generates the 9-step Career Preparation Checklist with direct navigation targets
 */
export function getCareerChecklist({
  skills = [],
  challenges = [],
  projects = [],
  achievements = [],
  resumeData,
  linkedinData
}) {
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const completedChallenges = challenges.filter(c => c.status === 'completed' || c.progress === 100).length;
  const resumeComp = calculateResumeCompleteness(resumeData).percentage;
  const linkedinStr = calculateLinkedInStrength(linkedinData).percentage;

  return [
    {
      id: 'chk-profile',
      title: 'Complete Profile Information',
      description: 'Fill academic branch, college, year, and professional bio.',
      completed: true,
      route: 'profile',
      actionLabel: 'View Profile'
    },
    {
      id: 'chk-skills',
      title: 'Learn Core Technical Skills',
      description: 'Master at least 3 foundational programming languages and frameworks.',
      completed: skills.filter(s => s.progress >= 70).length >= 3,
      route: 'skills',
      actionLabel: 'Explore Skills'
    },
    {
      id: 'chk-challenge',
      title: 'Complete a Learning Challenge',
      description: 'Finish a time-boxed skill challenge with 100% completed tasks.',
      completed: completedChallenges >= 1,
      route: 'challenges',
      actionLabel: 'Go to Challenges'
    },
    {
      id: 'chk-project',
      title: 'Build a Practical Project',
      description: 'Convert your verified skills into an end-to-end working application.',
      completed: completedProjects >= 1,
      route: 'projects',
      actionLabel: 'View Projects'
    },
    {
      id: 'chk-github',
      title: 'Upload Project to GitHub',
      description: 'Showcase your code repositories and commit streak publicly.',
      completed: true,
      route: 'github',
      actionLabel: 'Check GitHub'
    },
    {
      id: 'chk-resume',
      title: 'Create Professional Resume',
      description: 'Build an ATS-friendly software developer resume with auto-synced skills and projects.',
      completed: resumeComp >= 75,
      route: 'resume',
      actionLabel: 'Build Resume'
    },
    {
      id: 'chk-linkedin',
      title: 'Complete LinkedIn Profile',
      description: 'Prepare headline, about summary, and career preferences for recruiters.',
      completed: linkedinStr >= 70,
      route: 'linkedin',
      actionLabel: 'Update LinkedIn'
    },
    {
      id: 'chk-cert',
      title: 'Add Verified Certifications',
      description: 'Attach certificates from recognized technical learning platforms.',
      completed: Boolean(resumeData?.certifications?.length >= 1),
      route: 'resume',
      actionLabel: 'Add Certificate'
    },
    {
      id: 'chk-portfolio',
      title: 'Deploy Live Web Portfolio',
      description: 'Host your personal developer portfolio for recruiters and peers.',
      completed: Boolean(projects.some(p => p.submission?.liveDemoUrl)),
      route: 'projects',
      actionLabel: 'View Portfolio'
    }
  ];
}
