/**
 * Stage 4: Skill Recommendation Engine Mock Data & Rules
 */

export const RECOMMENDATION_GROUPS = [
  {
    groupId: 'next',
    groupTitle: 'Next Suggested Skills',
    groupSubtitle: 'Directly follows your recently completed skills and academic strengths.',
    items: [
      {
        id: 'rec-js',
        name: 'JavaScript',
        category: 'Web Development',
        why: 'Builds on your completed HTML (95%) and CSS (85%) foundations to unlock interactive DOM manipulation and asynchronous web APIs.',
        difficulty: 'Intermediate',
        duration: '3–4 weeks',
        relatedProject: 'Interactive Portfolio Website',
        prerequisites: ['HTML5 Semantic Web', 'CSS3 Modern Layouts'],
        topics: ['ES6 Syntax', 'DOM Manipulation', 'Fetch & REST APIs', 'Async/Await & Promises'],
        color: '#FACC15',
        priority: 'High Priority'
      },
      {
        id: 'rec-react',
        name: 'React',
        category: 'Web Development',
        why: 'The industry-standard frontend library that builds immediately upon JavaScript ES6 to create component-driven web apps.',
        difficulty: 'Intermediate',
        duration: '4–6 weeks',
        relatedProject: 'Student Growth Command Center',
        prerequisites: ['JavaScript ES6+', 'HTML5 & CSS3'],
        topics: ['JSX Components', 'Props & State Management', 'Hooks (useState, useEffect)', 'React Router'],
        color: '#38BDF8',
        priority: 'Recommended Next'
      }
    ]
  },
  {
    groupId: 'related',
    groupTitle: 'Related Technical Skills',
    groupSubtitle: 'Complements your active coursework and projects.',
    items: [
      {
        id: 'rec-git',
        name: 'Git & GitHub Workflow',
        category: 'Tools',
        why: 'Crucial version control system to safeguard your projects and build verifiable proof of work for software recruiters.',
        difficulty: 'Beginner',
        duration: '2 weeks',
        relatedProject: 'Multi-Branch Git Portfolio Repository',
        prerequisites: ['Basic Command Line'],
        topics: ['Commits & Logs', 'Branching & Merging', 'Conflict Resolution', 'Pull Requests & Open Source'],
        color: '#EC4899',
        priority: 'Core Foundation'
      },
      {
        id: 'rec-sql',
        name: 'SQL & Database Architecture',
        category: 'Data',
        why: 'Directly reinforces your 91% mark in Database Management Systems and prepares you for backend data engineering.',
        difficulty: 'Intermediate',
        duration: '3 weeks',
        relatedProject: 'University Course Management Schema',
        prerequisites: ['Relational Model Basics'],
        topics: ['Complex JOINs', 'Window Functions', 'Indexing & Query Plans', 'Transactions & ACID'],
        color: '#6366F1',
        priority: 'Academic Boost'
      }
    ]
  },
  {
    groupId: 'explore',
    groupTitle: 'Skills to Explore',
    groupSubtitle: 'Broaden your computer science foundation into emerging domains.',
    items: [
      {
        id: 'rec-py-auto',
        name: 'Python Automation & Scripting',
        category: 'Programming',
        why: 'Extends your 30-Day Python Challenge into practical real-world utilities, file scrapers, and task bots.',
        difficulty: 'Intermediate',
        duration: '3 weeks',
        relatedProject: 'Automated Student Grade Scraper',
        prerequisites: ['Python Core Functions'],
        topics: ['Requests & BeautifulSoup', 'Regex Patterns', 'File Batch Automation', 'Task Scheduling'],
        color: '#10B981',
        priority: 'Applied Practice'
      },
      {
        id: 'rec-linux',
        name: 'Linux Terminal & Shell Scripting',
        category: 'Cybersecurity',
        why: 'Complements your Operating Systems course by giving you direct command over processes, file permissions, and streams.',
        difficulty: 'Beginner',
        duration: '2 weeks',
        relatedProject: 'Automated Server Backup Cron Script',
        prerequisites: ['None'],
        topics: ['Filesystem Navigation', 'Pipes & Redirections', 'Bash Loops & Functions', 'Cron Automation'],
        color: '#A855F7',
        priority: 'System Fluency'
      }
    ]
  }
];

export const LEARNING_PATH_STEPS = [
  {
    id: 'step-html',
    name: 'HTML5',
    status: 'completed',
    level: 'Advanced',
    label: 'Completed ✓'
  },
  {
    id: 'step-css',
    name: 'CSS3',
    status: 'completed',
    level: 'Advanced',
    label: 'Completed ✓'
  },
  {
    id: 'step-js',
    name: 'JavaScript (ES6+)',
    status: 'current',
    level: 'Intermediate',
    label: 'YOU ARE HERE'
  },
  {
    id: 'step-react',
    name: 'React.js',
    status: 'recommended',
    level: 'Intermediate',
    label: 'Recommended Next'
  },
  {
    id: 'step-capstone',
    name: 'Full Web Portfolio',
    status: 'locked',
    level: 'Advanced Project',
    label: 'Target Capstone'
  }
];
