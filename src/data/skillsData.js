/**
 * Stage 4: Technical Skills System Mock Data
 */

export const SKILL_CATEGORIES = [
  'All',
  'Programming',
  'Web Development',
  'Data',
  'AI / ML',
  'Cybersecurity',
  'Tools'
];

export const SKILL_STATUSES = ['All', 'Completed', 'In Progress', 'Not Started'];
export const SKILL_LEVELS = ['All', 'Beginner', 'Elementary', 'Intermediate', 'Advanced'];

export const INITIAL_SKILLS = [
  {
    id: 'skill-1',
    name: 'Python',
    category: 'Programming',
    level: 'Advanced',
    progress: 90,
    status: 'In Progress',
    color: '#10B981',
    relatedChallenge: '30-Day Python Challenge',
    relatedProject: 'CLI Expense Tracker & Analyzer',
    completedCheckpoints: ['Syntax & Data Structures', 'Object Oriented Programming', 'Generators & Iterators', 'File I/O & Exception Handling'],
    roadmap: [
      { step: 1, title: 'Basics & Data Types', done: true },
      { step: 2, title: 'OOP & Modules', done: true },
      { step: 3, title: 'Data Structures & Algorithms', done: true },
      { step: 4, title: 'Concurrency & Multiprocessing', done: false },
      { step: 5, title: 'Production Capstone CLI', done: false }
    ]
  },
  {
    id: 'skill-2',
    name: 'HTML & Semantic Web',
    category: 'Web Development',
    level: 'Advanced',
    progress: 95,
    status: 'Completed',
    color: '#F97316',
    relatedChallenge: '7-Day Accessible Web Sprint',
    relatedProject: 'Semantic Tech Documentation Site',
    completedCheckpoints: ['Semantic Tags (header, nav, article)', 'SEO Meta & Accessibility ARIA', 'Audio, Video & Media Embedding', 'Forms & Native Validation'],
    roadmap: [
      { step: 1, title: 'HTML Document Hierarchy', done: true },
      { step: 2, title: 'Semantic Architecture', done: true },
      { step: 3, title: 'Forms & Accessibility (A11y)', done: true },
      { step: 4, title: 'Audio & Video Elements', done: true },
      { step: 5, title: 'Verified Proof of Work Site', done: true }
    ]
  },
  {
    id: 'skill-3',
    name: 'CSS & Responsive Layouts',
    category: 'Web Development',
    level: 'Advanced',
    progress: 85,
    status: 'Completed',
    color: '#38BDF8',
    relatedChallenge: '14-Day Flex & Grid Mastery',
    relatedProject: 'Modern SaaS Landing Page',
    completedCheckpoints: ['CSS Box Model & Specificity', 'Flexbox & CSS Grid Mastery', 'Media Queries & Mobile-First Design', 'CSS Keyframe Animations & Glassmorphism'],
    roadmap: [
      { step: 1, title: 'Selectors & Box Model', done: true },
      { step: 2, title: 'Flexbox Layouts', done: true },
      { step: 3, title: 'CSS Grid System', done: true },
      { step: 4, title: 'Animations & Glassmorphism', done: true },
      { step: 5, title: 'Responsive Portfolio Layout', done: false }
    ]
  },
  {
    id: 'skill-4',
    name: 'JavaScript',
    category: 'Web Development',
    level: 'Intermediate',
    progress: 60,
    status: 'In Progress',
    color: '#FACC15',
    relatedChallenge: '30-Day JavaScript Coding Sprint',
    relatedProject: 'Portfolio Website',
    completedCheckpoints: ['ES6 Syntax & Arrow Functions', 'DOM Selection & Event Listeners', 'Promises & Async/Await', 'Local Storage Persistence'],
    roadmap: [
      { step: 1, title: 'JavaScript Fundamentals', done: true },
      { step: 2, title: 'DOM & Events Manipulation', done: true },
      { step: 3, title: 'Async JS & Fetch APIs', done: true },
      { step: 4, title: 'ES Modules & Closures', done: false },
      { step: 5, title: 'Interactive Single Page App', done: false }
    ]
  },
  {
    id: 'skill-5',
    name: 'C++',
    category: 'Programming',
    level: 'Intermediate',
    progress: 70,
    status: 'Completed',
    color: '#06B6D4',
    relatedChallenge: 'Competitive Programming Kickstart',
    relatedProject: 'Custom STL Vector Implementation',
    completedCheckpoints: ['Pointers & Dynamic Memory', 'Classes, Constructors & Destructors', 'Inheritance & Polymorphism', 'STL Templates (vector, map, set)'],
    roadmap: [
      { step: 1, title: 'Syntax & Functions', done: true },
      { step: 2, title: 'Pointers & References', done: true },
      { step: 3, title: 'OOP & Operator Overloading', done: true },
      { step: 4, title: 'Standard Template Library (STL)', done: true },
      { step: 5, title: 'Algorithm Speed Challenges', done: false }
    ]
  },
  {
    id: 'skill-6',
    name: 'Git & GitHub Workflow',
    category: 'Tools',
    level: 'Intermediate',
    progress: 75,
    status: 'Completed',
    color: '#EC4899',
    relatedChallenge: 'Open Source Contribution Sprint',
    relatedProject: 'Multi-Branch Git Workflow Repo',
    completedCheckpoints: ['git init, commit & status', 'Branching, Merging & Fast-Forward', 'Rebase, Cherry-pick & Merge Conflicts', 'Pull Requests & Code Reviews'],
    roadmap: [
      { step: 1, title: 'Version Control Basics', done: true },
      { step: 2, title: 'Branching & Merging', done: true },
      { step: 3, title: 'Remote Repositories & GitHub', done: true },
      { step: 4, title: 'Conflict Resolution & Rebase', done: true },
      { step: 5, title: 'Open Source PR Submission', done: false }
    ]
  },
  {
    id: 'skill-7',
    name: 'SQL & Database Design',
    category: 'Data',
    level: 'Advanced',
    progress: 88,
    status: 'Completed',
    color: '#6366F1',
    relatedChallenge: 'SQL Query Solving Sprint',
    relatedProject: 'University Course Management Schema',
    completedCheckpoints: ['DDL & DML Commands', 'Complex Joins (INNER, LEFT, FULL)', 'Window Functions (DENSE_RANK, LEAD)', 'Subqueries & Indexing Performance'],
    roadmap: [
      { step: 1, title: 'Relational Model & Keys', done: true },
      { step: 2, title: 'CRUD & Filtering Queries', done: true },
      { step: 3, title: 'Multi-Table Joins', done: true },
      { step: 4, title: 'Subqueries & Aggregations', done: true },
      { step: 5, title: 'Schema Optimization & Indexes', done: false }
    ]
  },
  {
    id: 'skill-8',
    name: 'React',
    category: 'Web Development',
    level: 'Beginner',
    progress: 25,
    status: 'In Progress',
    color: '#38BDF8',
    relatedChallenge: 'React 14-Day Foundations',
    relatedProject: 'Student Growth Platform Dashboard',
    completedCheckpoints: ['JSX Syntax & Component Composition', 'Props & State with useState', 'useEffect Lifecycle Hooks'],
    roadmap: [
      { step: 1, title: 'Components & JSX', done: true },
      { step: 2, title: 'State & Event Handling', done: true },
      { step: 3, title: 'Side Effects & Fetching', done: false },
      { step: 4, title: 'Context & Routing', done: false },
      { step: 5, title: 'Production Web App Capstone', done: false }
    ]
  },
  {
    id: 'skill-9',
    name: 'Pandas & NumPy',
    category: 'Data',
    level: 'Elementary',
    progress: 40,
    status: 'In Progress',
    color: '#10B981',
    relatedChallenge: 'Python Data Analysis Sprint',
    relatedProject: 'Student Grade Analytics Notebook',
    completedCheckpoints: ['NumPy 1D/2D Array Operations', 'Pandas DataFrame Creation', 'Filtering, GroupBy & Aggregations'],
    roadmap: [
      { step: 1, title: 'NumPy Ndarray Operations', done: true },
      { step: 2, title: 'Pandas Series & DataFrames', done: true },
      { step: 3, title: 'Data Cleaning & Imputation', done: false },
      { step: 4, title: 'Exploratory Data Analysis', done: false },
      { step: 5, title: 'Interactive Data Visualizer', done: false }
    ]
  },
  {
    id: 'skill-10',
    name: 'Linux & Shell Scripting',
    category: 'Cybersecurity',
    level: 'Intermediate',
    progress: 50,
    status: 'In Progress',
    color: '#A855F7',
    relatedChallenge: 'Linux Terminal 7-Day Sprint',
    relatedProject: 'Automated Backup Shell Script',
    completedCheckpoints: ['File System Navigation & Permissions (chmod, chown)', 'Grep, Sed, Awk Text Processing', 'Bash Scripting & Loops'],
    roadmap: [
      { step: 1, title: 'CLI Navigation & Filesystem', done: true },
      { step: 2, title: 'Permissions & User Roles', done: true },
      { step: 3, title: 'Streams, Pipes & Redirection', done: true },
      { step: 4, title: 'Bash Automation Scripts', done: false },
      { step: 5, title: 'Server Hardening & SSH', done: false }
    ]
  },
  {
    id: 'skill-11',
    name: 'Machine Learning Fundamentals',
    category: 'AI / ML',
    level: 'Beginner',
    progress: 15,
    status: 'Not Started',
    color: '#F43F5E',
    relatedChallenge: 'ML Math & Algorithms Sprint',
    relatedProject: 'House Price Prediction Model',
    completedCheckpoints: ['Linear Regression Concept', 'Training vs Testing Split'],
    roadmap: [
      { step: 1, title: 'Linear Algebra & Calculus Prep', done: true },
      { step: 2, title: 'Supervised Learning (Regression)', done: false },
      { step: 3, title: 'Classification (Logistic, Trees)', done: false },
      { step: 4, title: 'Evaluation Metrics (MSE, F1)', done: false },
      { step: 5, title: 'End-to-End Scikit-Learn Model', done: false }
    ]
  },
  {
    id: 'skill-12',
    name: 'Docker & Containerization',
    category: 'Tools',
    level: 'Beginner',
    progress: 10,
    status: 'Not Started',
    color: '#0EA5E9',
    relatedChallenge: 'Container Foundations Sprint',
    relatedProject: 'Multi-Service Web App Dockerfile',
    completedCheckpoints: ['Container vs Virtual Machine Concepts'],
    roadmap: [
      { step: 1, title: 'Docker Architecture & Images', done: true },
      { step: 2, title: 'Writing Dockerfiles', done: false },
      { step: 3, title: 'Docker Compose Services', done: false },
      { step: 4, title: 'Volumes & Networking', done: false },
      { step: 5, title: 'Container Deployment Pipeline', done: false }
    ]
  }
];
