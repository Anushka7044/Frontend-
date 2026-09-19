/**
 * Mock Data for Stage 5 — Achievement System
 * Contains 20 student milestone badges (12 unlocked, 8 locked),
 * XP gamification tallies, and unlock criteria.
 */

export const ACHIEVEMENT_CATEGORIES = ['All', 'Mastery', 'Consistency', 'Projects', 'Academic'];

export const INITIAL_ACHIEVEMENTS = [
  // --- Unlocked Achievements (12) ---
  {
    id: 'ach-python-builder',
    title: 'Python Builder',
    description: 'Completed a Python challenge and built a functional practical project.',
    requirement: 'Complete 1 Python challenge + submit 1 Python project',
    category: 'Mastery',
    icon: 'Trophy',
    badgeColor: '#F59E0B',
    xp: 150,
    unlocked: true,
    unlockedDate: '12 Sep 2026',
    relatedSkillOrProject: 'Python / Student Expense Tracker'
  },
  {
    id: 'ach-consistency-7',
    title: 'Consistency Champion',
    description: 'Maintained an unbroken 7-day learning streak.',
    requirement: 'Maintain a 7-day streak',
    category: 'Consistency',
    icon: 'Flame',
    badgeColor: '#F97316',
    xp: 100,
    unlocked: true,
    unlockedDate: '10 Sep 2026',
    relatedSkillOrProject: 'Daily Habit Loop'
  },
  {
    id: 'ach-first-project',
    title: 'Project Builder',
    description: 'Completed and deployed your first practical web project.',
    requirement: 'Complete 1 practical project',
    category: 'Projects',
    icon: 'Rocket',
    badgeColor: '#A855F7',
    xp: 100,
    unlocked: true,
    unlockedDate: '05 Sep 2026',
    relatedSkillOrProject: 'Personal Developer Portfolio'
  },
  {
    id: 'ach-html-css-master',
    title: 'Responsive Designer',
    description: 'Mastered responsive CSS Grid and Flexbox with 100% sprint completion.',
    requirement: 'Complete HTML & CSS Sprint',
    category: 'Mastery',
    icon: 'Award',
    badgeColor: '#10B981',
    xp: 100,
    unlocked: true,
    unlockedDate: '03 Sep 2026',
    relatedSkillOrProject: 'HTML & CSS Sprint'
  },
  {
    id: 'ach-git-collaborator',
    title: 'Git Collaborator',
    description: 'Successfully resolved merge conflicts and submitted open source PR.',
    requirement: 'Complete Git & GitHub workflow challenge',
    category: 'Mastery',
    icon: 'GitBranch',
    badgeColor: '#EC4899',
    xp: 100,
    unlocked: true,
    unlockedDate: '26 Aug 2026',
    relatedSkillOrProject: 'Git & GitHub Challenge'
  },
  {
    id: 'ach-first-note',
    title: 'Diligent Scribe',
    description: 'Created 10 comprehensive subject study summaries.',
    requirement: 'Organize 10 study notes',
    category: 'Academic',
    icon: 'BookOpen',
    badgeColor: '#6366F1',
    xp: 75,
    unlocked: true,
    unlockedDate: '20 Aug 2026',
    relatedSkillOrProject: 'Study Notes Library'
  },
  {
    id: 'ach-academic-excellence',
    title: 'Dean’s Honor Roll',
    description: 'Achieved an SGPA higher than 8.50 in Semester 4 examinations.',
    requirement: 'Achieve SGPA >= 8.5 in any semester',
    category: 'Academic',
    icon: 'GraduationCap',
    badgeColor: '#38BDF8',
    xp: 150,
    unlocked: true,
    unlockedDate: '15 Jul 2026',
    relatedSkillOrProject: 'Semester 4 Results (8.94 SGPA)'
  },
  {
    id: 'ach-challenge-starter',
    title: 'Challenge Initiate',
    description: 'Accepted and commenced your first time-boxed learning challenge.',
    requirement: 'Start 1 learning challenge',
    category: 'Consistency',
    icon: 'Target',
    badgeColor: '#F43F5E',
    xp: 50,
    unlocked: true,
    unlockedDate: '10 Aug 2026',
    relatedSkillOrProject: 'First Sprint Enrolled'
  },
  {
    id: 'ach-code-enthusiast',
    title: 'Code Enthusiast',
    description: 'Logged 50 active coding practice sessions across the platform.',
    requirement: 'Accumulate 50 practice milestones',
    category: 'Consistency',
    icon: 'Zap',
    badgeColor: '#EAB308',
    xp: 125,
    unlocked: true,
    unlockedDate: '01 Sep 2026',
    relatedSkillOrProject: 'Student Activity Log'
  },
  {
    id: 'ach-skills-collector',
    title: 'Skill Collector',
    description: 'Added and tracked 5 distinct technical competencies.',
    requirement: 'Track 5 active skills',
    category: 'Mastery',
    icon: 'Brain',
    badgeColor: '#14B8A6',
    xp: 75,
    unlocked: true,
    unlockedDate: '18 Aug 2026',
    relatedSkillOrProject: 'Technical Skills Directory'
  },
  {
    id: 'ach-curriculum-explorer',
    title: 'Pathway Navigator',
    description: 'Explored and enrolled in an AI-curated skill recommendation pathway.',
    requirement: 'Add a recommended skill to active profile',
    category: 'Mastery',
    icon: 'Compass',
    badgeColor: '#8B5CF6',
    xp: 75,
    unlocked: true,
    unlockedDate: '08 Sep 2026',
    relatedSkillOrProject: 'JavaScript Pathway'
  },
  {
    id: 'ach-speed-demon',
    title: 'Sprint Finisher',
    description: 'Completed a 7-day challenge ahead of the scheduled deadline.',
    requirement: 'Finish a 7-day challenge with 100% tasks',
    category: 'Consistency',
    icon: 'CheckCircle2',
    badgeColor: '#10B981',
    xp: 150,
    unlocked: true,
    unlockedDate: '03 Sep 2026',
    relatedSkillOrProject: 'HTML Sprint'
  },

  // --- Locked Achievements (8) ---
  {
    id: 'ach-skill-explorer-10',
    title: 'Skill Explorer',
    description: 'Complete 10 distinct technical skills across frontend, backend, and data.',
    requirement: 'Complete 10 skills',
    category: 'Mastery',
    icon: 'Brain',
    badgeColor: '#6B7280',
    xp: 200,
    unlocked: false,
    progress: { current: 8, target: 10 },
    relatedSkillOrProject: 'Technical Skills Directory'
  },
  {
    id: 'ach-project-master-10',
    title: 'Project Master',
    description: 'Architect, develop, and deploy 10 practical portfolio projects.',
    requirement: 'Complete 10 practical projects',
    category: 'Projects',
    icon: 'Rocket',
    badgeColor: '#6B7280',
    xp: 250,
    unlocked: false,
    progress: { current: 5, target: 10 },
    relatedSkillOrProject: 'Projects Management'
  },
  {
    id: 'ach-warrior-30',
    title: '30-Day Warrior',
    description: 'Maintain an unbroken daily learning streak for 30 consecutive days.',
    requirement: 'Reach a 30-day streak',
    category: 'Consistency',
    icon: 'Flame',
    badgeColor: '#6B7280',
    xp: 300,
    unlocked: false,
    progress: { current: 12, target: 30 },
    relatedSkillOrProject: 'Daily Habit Loop'
  },
  {
    id: 'ach-fullstack-dev',
    title: 'Full-Stack Craftsman',
    description: 'Complete both a Frontend and Backend challenge and connect them via REST APIs.',
    requirement: 'Complete Frontend & Backend projects',
    category: 'Mastery',
    icon: 'Layers',
    badgeColor: '#6B7280',
    xp: 250,
    unlocked: false,
    progress: { current: 1, target: 2 },
    relatedSkillOrProject: 'Full-Stack Capstone'
  },
  {
    id: 'ach-centurion-streak',
    title: 'Centurion of Code',
    description: 'Accumulate 100 total active learning days on the platform.',
    requirement: 'Reach 100 active days',
    category: 'Consistency',
    icon: 'Zap',
    badgeColor: '#6B7280',
    xp: 500,
    unlocked: false,
    progress: { current: 42, target: 100 },
    relatedSkillOrProject: 'Learning Consistency'
  },
  {
    id: 'ach-perfect-grade',
    title: 'Summa Cum Laude',
    description: 'Achieve a cumulative degree CGPA above 9.0 across all semesters.',
    requirement: 'Cumulative CGPA >= 9.0',
    category: 'Academic',
    icon: 'Award',
    badgeColor: '#6B7280',
    xp: 300,
    unlocked: false,
    progress: { current: 8.64, target: 9.0 },
    relatedSkillOrProject: 'Academic Marksheets'
  },
  {
    id: 'ach-open-source-hero',
    title: 'Open Source Contributor',
    description: 'Have 3 pull requests merged into public open-source software repositories.',
    requirement: '3 merged pull requests',
    category: 'Projects',
    icon: 'GitBranch',
    badgeColor: '#6B7280',
    xp: 250,
    unlocked: false,
    progress: { current: 1, target: 3 },
    relatedSkillOrProject: 'GitHub Integration'
  },
  {
    id: 'ach-grandmaster',
    title: 'Grandmaster Student',
    description: 'Earn 2,000 total platform XP and achieve Level 5 Scholar status.',
    requirement: 'Accumulate 2,000 XP',
    category: 'Mastery',
    icon: 'Trophy',
    badgeColor: '#6B7280',
    xp: 500,
    unlocked: false,
    progress: { current: 1250, target: 2000 },
    relatedSkillOrProject: 'Platform Scholar Status'
  }
];

/**
 * Calculate total XP accumulated from all unlocked achievements
 */
export function calculateTotalXP(achievements) {
  return achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + (a.xp || 0), 0);
}
