/**
 * Mock Data for Stage 5 — Challenge System
 * Contains pre-populated active, completed, and upcoming challenges,
 * daily task definitions, timeline tracking, and streak statistics.
 */

export const CHALLENGE_DURATIONS = [
  { id: '7', label: '7 Days', days: 7, desc: 'Quick sprint for core fundamentals' },
  { id: '14', label: '14 Days', days: 14, desc: 'Balanced deep dive with mini-projects' },
  { id: '30', label: '30 Days', days: 30, desc: 'Comprehensive mastery challenge' },
  { id: 'custom', label: 'Custom', days: null, desc: 'Define your own pacing (3–90 days)' }
];

export const CHALLENGE_DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

export const STREAK_STATS = {
  currentStreak: 12,
  longestStreak: 28,
  totalActiveDays: 42,
  weeklyActivity: [true, true, true, true, true, true, true],
  lastActiveDate: '2026-09-16'
};

export const INITIAL_CHALLENGES = [
  {
    id: 'chal-python-30',
    title: '30-Day Python Challenge',
    skill: 'Python',
    goal: 'Build strong Python fundamentals and solve 20 practice algorithm problems.',
    difficulty: 'Beginner',
    durationDays: 30,
    currentDay: 12,
    daysRemaining: 18,
    progress: 40,
    streak: 12,
    status: 'active', // 'active' | 'completed' | 'paused'
    startDate: '2026-09-04',
    endDate: '2026-10-04',
    color: '#3B82F6',
    dailyCommitment: '30–60 minutes',
    relatedProject: 'Student Expense Tracker',
    todayTasks: [
      { id: 'task-p1', title: 'Revise Python dictionary comprehensions', completed: true },
      { id: 'task-p2', title: 'Practice function arguments (*args, **kwargs)', completed: true },
      { id: 'task-p3', title: 'Solve 3 dictionary search algorithmic problems', completed: false },
      { id: 'task-p4', title: 'Complete mini CLI practice exercise', completed: false }
    ],
    timeline: Array.from({ length: 30 }, (_, i) => {
      const dayNum = i + 1;
      let state = 'upcoming';
      if (dayNum < 12) state = 'completed';
      else if (dayNum === 12) state = 'current';
      return {
        day: dayNum,
        state, // 'completed' | 'current' | 'upcoming'
        date: `Day ${dayNum}`,
        taskCount: 4,
        completedCount: dayNum < 12 ? 4 : dayNum === 12 ? 2 : 0
      };
    })
  },
  {
    id: 'chal-js-14',
    title: '14-Day JavaScript DOM Mastery',
    skill: 'JavaScript',
    goal: 'Master asynchronous DOM manipulation, Event Loop, and Fetch APIs.',
    difficulty: 'Intermediate',
    durationDays: 14,
    currentDay: 6,
    daysRemaining: 8,
    progress: 43,
    streak: 6,
    status: 'active',
    startDate: '2026-09-10',
    endDate: '2026-09-24',
    color: '#F59E0B',
    dailyCommitment: '45 minutes',
    relatedProject: 'Interactive Kanban Task Board',
    todayTasks: [
      { id: 'task-j1', title: 'Understand Promises vs Async/Await', completed: true },
      { id: 'task-j2', title: 'Handle API network error boundaries', completed: true },
      { id: 'task-j3', title: 'Build a dynamic filterable product list', completed: false }
    ],
    timeline: Array.from({ length: 14 }, (_, i) => {
      const dayNum = i + 1;
      let state = 'upcoming';
      if (dayNum < 6) state = 'completed';
      else if (dayNum === 6) state = 'current';
      return {
        day: dayNum,
        state,
        date: `Day ${dayNum}`,
        taskCount: 3,
        completedCount: dayNum < 6 ? 3 : dayNum === 6 ? 2 : 0
      };
    })
  },
  {
    id: 'chal-html-7',
    title: '7-Day HTML & CSS Responsive Sprint',
    skill: 'HTML & CSS',
    goal: 'Learn Flexbox, CSS Grid, and responsive layout patterns.',
    difficulty: 'Beginner',
    durationDays: 7,
    currentDay: 7,
    daysRemaining: 0,
    progress: 100,
    streak: 7,
    status: 'completed',
    startDate: '2026-08-28',
    endDate: '2026-09-03',
    color: '#10B981',
    dailyCommitment: '30 minutes',
    relatedProject: 'Personal Developer Portfolio',
    todayTasks: [
      { id: 'task-h1', title: 'CSS Grid template areas', completed: true },
      { id: 'task-h2', title: 'Mobile viewport meta queries', completed: true },
      { id: 'task-h3', title: 'Deploy landing page to GitHub Pages', completed: true }
    ],
    timeline: Array.from({ length: 7 }, (_, i) => ({
      day: i + 1,
      state: 'completed',
      date: `Day ${i + 1}`,
      taskCount: 3,
      completedCount: 3
    }))
  },
  {
    id: 'chal-git-7',
    title: '7-Day Git & GitHub Workflow',
    skill: 'Git & GitHub',
    goal: 'Learn branching, pull requests, resolving merge conflicts, and Git rebase.',
    difficulty: 'Beginner',
    durationDays: 7,
    currentDay: 7,
    daysRemaining: 0,
    progress: 100,
    streak: 7,
    status: 'completed',
    startDate: '2026-08-20',
    endDate: '2026-08-26',
    color: '#EC4899',
    dailyCommitment: '25 minutes',
    relatedProject: 'Open Source Contribution Walkthrough',
    todayTasks: [
      { id: 'task-g1', title: 'Branch management and feature isolation', completed: true },
      { id: 'task-g2', title: 'Merge conflict resolution techniques', completed: true },
      { id: 'task-g3', title: 'Create interactive PR with issue links', completed: true }
    ],
    timeline: Array.from({ length: 7 }, (_, i) => ({
      day: i + 1,
      state: 'completed',
      date: `Day ${i + 1}`,
      taskCount: 3,
      completedCount: 3
    }))
  }
];

/**
 * Generate default daily tasks when a student starts a new challenge
 */
export function generateDefaultTasks(skill, dayNum = 1) {
  return [
    { id: `task-${Date.now()}-1`, title: `Learn ${skill} Day ${dayNum} core concepts & syntax`, completed: false },
    { id: `task-${Date.now()}-2`, title: `Complete 2 interactive code challenges in ${skill}`, completed: false },
    { id: `task-${Date.now()}-3`, title: `Review and document key takeaways in Study Notes`, completed: false }
  ];
}

/**
 * Generate visual timeline array for a given duration
 */
export function generateTimeline(durationDays) {
  return Array.from({ length: durationDays }, (_, i) => {
    const dayNum = i + 1;
    return {
      day: dayNum,
      state: dayNum === 1 ? 'current' : 'upcoming',
      date: `Day ${dayNum}`,
      taskCount: 3,
      completedCount: 0
    };
  });
}
