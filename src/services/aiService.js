/**
 * AI Student Assistant Service Abstraction
 * Isolates AI reasoning, student context interpretation, and response generation.
 * Ready for future backend / LLM API integration.
 */

/**
 * Main query function to get personalized AI guidance
 * @param {string} message - The student's message or prompt
 * @param {Object} context - Complete student context from platform state
 * @returns {Promise<Object>} - Formatted response object
 */
export async function getAIResponse(message, context = {}) {
  // Simulate network/API latency for realism (400ms - 600ms)
  await new Promise(resolve => setTimeout(resolve, 450));

  try {
    const query = message.trim().toLowerCase();
    const {
      profile = {},
      skills = [],
      results = {},
      challenges = [],
      projects = [],
      achievements = [],
      progress = {},
      github = {},
      resume = {},
      linkedin = {}
    } = context;

    const studentName = profile.name ? profile.name.split(' ')[0] : 'Anushka';

    // 1. WHAT SHOULD I LEARN NEXT / SKILL ROADMAP
    if (
      query.includes('learn next') || 
      query.includes('what skill') || 
      query.includes('roadmap') || 
      query.includes('learning path')
    ) {
      const pythonSkill = skills.find(s => s.name?.toLowerCase().includes('python'));
      const jsSkill = skills.find(s => s.name?.toLowerCase().includes('javascript'));
      const reactSkill = skills.find(s => s.name?.toLowerCase().includes('react'));

      return {
        category: 'skills',
        text: `Hi ${studentName}! Based on your current progress:\n\n` +
          `1. **JavaScript & Modern Web (Highest Priority)**: You have completed HTML5 and modern responsive CSS, and JavaScript is currently at ${jsSkill?.progress || 60}%. Mastering Async/Await, Fetch APIs, and DOM manipulation is the critical bridge to unlocking dynamic applications.\n\n` +
          `2. **React Ecosystem**: Your React foundations are at ${reactSkill?.progress || 25}%. Moving from vanilla JS into component state and hook lifecycles will elevate your web portfolio to production standard.\n\n` +
          `3. **Python Capstone**: Your Python is already advanced (${pythonSkill?.progress || 90}%). We recommend pairing it with REST API development (FastAPI or Flask) to become full-stack capable!`,
        suggestedFollowUps: [
          'Create a 3-week JavaScript roadmap',
          'Suggest a practical JavaScript project',
          'Why is React important for internships?'
        ],
        actionRoute: 'skills',
        actionLabel: 'Explore Skills Directory'
      };
    }

    // 2. HELP ME PLAN TODAY / STUDY SCHEDULE
    if (
      query.includes('plan today') || 
      query.includes('today\'s plan') || 
      query.includes('study plan') || 
      query.includes('schedule') ||
      query.includes('routine')
    ) {
      const inProgressProject = projects.find(p => p.status === 'in_progress') || projects[0];

      return {
        category: 'study',
        text: `Here is your high-impact 90-minute growth plan for today, ${studentName}:\n\n` +
          `• **Session 1 (30 mins) — Skill Practice**: Solve the 2 remaining dictionary & set algorithmic problems in your active 30-Day Python Challenge.\n` +
          `• **Session 2 (40 mins) — Practical Building**: Work on your "${inProgressProject?.title || 'Student Expense Tracker'}" project. Complete the expense categorization and monthly summary checklist items.\n` +
          `• **Session 3 (20 mins) — Academic Revision**: Revise Discrete Mathematics lecture notes on recurrence relations (currently at 76% in Semester 4).\n\n` +
          `Consistency Tip: Committing your code today will extend your continuous streak to 13 days!`,
        suggestedFollowUps: [
          'Open active Python Challenge',
          'View project requirements',
          'Review Discrete Mathematics notes'
        ],
        actionRoute: 'challenges',
        actionLabel: 'Go to Daily Challenge'
      };
    }

    // 3. PROJECT ASSISTANCE & SUGGESTIONS
    if (
      query.includes('suggest a project') || 
      query.includes('project idea') || 
      query.includes('what should i build') ||
      query.includes('my project') ||
      query.includes('milestone')
    ) {
      const activeProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'assigned');

      if (activeProjects.length > 0) {
        return {
          category: 'projects',
          text: `You currently have ${activeProjects.length} project(s) underway, including **${activeProjects[0].title}**!\n\n` +
            `Instead of starting another project from scratch, we recommend finishing the current milestone:\n` +
            `• **Current Focus**: ${activeProjects[0].title} (${activeProjects[0].relatedSkill})\n` +
            `• **Action Item**: Complete the remaining requirements and push your repository to GitHub.\n\n` +
            `Once submitted, you will unlock the **Project Master** milestone achievement and have another verified proof-of-work link ready for your resume!`,
          suggestedFollowUps: [
            'Break this project into milestones',
            'How should I format the README on GitHub?',
            'Suggest next project after this'
          ],
          actionRoute: 'projects',
          actionLabel: 'Continue Active Project'
        };
      }

      return {
        category: 'projects',
        text: `Based on your verified skills in Python and Web Technologies, here are top 3 project ideas:\n\n` +
          `1. **Algorithm Visualizer (JavaScript + HTML5 Canvas)**: Visualize sorting and pathfinding algorithms dynamically. High recruiter appeal!\n` +
          `2. **Distributed Student Task Queue (Python CLI)**: A multi-threaded task scheduler storing tasks in SQLite.\n` +
          `3. **Developer Markdown Knowledge Hub (React)**: Local-first notes application with full-text search and tag filtering.`,
        suggestedFollowUps: [
          'How do I start the Algorithm Visualizer?',
          'What technologies should I use for backend?'
        ],
        actionRoute: 'projects',
        actionLabel: 'Explore Projects'
      };
    }

    // 4. REVIEW PROGRESS & STREAK
    if (
      query.includes('progress') || 
      query.includes('streak') || 
      query.includes('how am i doing') ||
      query.includes('my performance')
    ) {
      const completedCount = projects.filter(p => p.status === 'completed').length;
      const achievementsCount = achievements.filter(a => a.unlocked).length;

      return {
        category: 'progress',
        text: `Here is your growth telemetry snapshot, ${studentName}:\n\n` +
          `🔥 **Learning Streak**: 12 Days (Longest: 28 Days) — You are in the top 5% consistency tier this month!\n` +
          `💻 **Technical Skills**: ${skills.length} skills tracked (${skills.filter(s => s.progress >= 80).length} Advanced level)\n` +
          `🚀 **Practical Projects**: ${completedCount} completed, 2 in active progress\n` +
          `🏆 **Achievements**: ${achievementsCount} milestone badges earned\n` +
          `📈 **Academics**: 8.42 cumulative CGPA across 4 completed semesters\n\n` +
          `Your daily momentum is outstanding. Completing 1 project this week will raise your overall Career Readiness score above 80%!`,
        suggestedFollowUps: [
          'What is my Career Readiness score?',
          'How do I earn the next achievement?',
          'View my growth timeline'
        ],
        actionRoute: 'progress',
        actionLabel: 'View Detailed Progress'
      };
    }

    // 5. RESUME ASSISTANCE
    if (
      query.includes('resume') || 
      query.includes('cv') || 
      query.includes('ats')
    ) {
      return {
        category: 'career',
        text: `Analyzing your resume configuration:\n\n` +
          `• **Completeness Score**: ~82% (Strong candidate foundation)\n` +
          `• **Key Strengths**: Verified skills (Python, SQL, JavaScript) and Stage 5 practical projects are already mapped into clean bullet points.\n\n` +
          `**Top Recommendations for 100% ATS Readiness**:\n` +
          `1. **Certifications**: Add your verified Python Data Science or Web Design course certificate links.\n` +
          `2. **Quantifiable Metrics**: In your experience bullet points, mention numbers (e.g. "Mentored 150+ students in Git workshops").\n` +
          `3. **GitHub & LinkedIn**: Ensure both URLs are populated in your personal contact line!`,
        suggestedFollowUps: [
          'Open Resume Builder',
          'Preview ATS-friendly resume',
          'How to phrase project bullets for internships?'
        ],
        actionRoute: 'resume',
        actionLabel: 'Open Resume Builder'
      };
    }

    // 6. GITHUB ASSISTANCE
    if (
      query.includes('github') || 
      query.includes('repository') || 
      query.includes('repositories') ||
      query.includes('git')
    ) {
      return {
        category: 'career',
        text: `Your simulated GitHub profile shows **186 contributions** and a **14-day coding streak**!\n\n` +
          `**3 Tips to Make Your GitHub Stand Out to Recruiters**:\n` +
          `1. **Star / Pin Your Best Repos**: Feature your capstones — \`student-growth-platform\`, \`Python-File-Manager\`, and \`weather-dashboard-js\`.\n` +
          `2. **Comprehensive READMEs**: Every repository should have: (a) 1-sentence purpose, (b) Architecture diagram, (c) Installation steps, and (d) Live preview URL.\n` +
          `3. **Commit Messages**: Use semantic commit hygiene (e.g. \`feat: add dark mode\`, \`fix: handle api timeout\`).`,
        suggestedFollowUps: [
          'View GitHub Showcase',
          'How do I write a good README?',
          'Connect my platform projects to GitHub'
        ],
        actionRoute: 'github',
        actionLabel: 'Go to GitHub Showcase'
      };
    }

    // 7. LINKEDIN ASSISTANCE
    if (
      query.includes('linkedin') || 
      query.includes('headline') || 
      query.includes('networking')
    ) {
      return {
        category: 'career',
        text: `Your LinkedIn profile strength is currently at **72%** (Intermediate tier).\n\n` +
          `**Actionable Steps to Reach All-Star Status**:\n` +
          `• **Headline**: Change to a targeted format: *"CSE Student @ EIT | Full-Stack & Python Developer | Open Source Contributor | Seeking Summer 2027 Internships"*\n` +
          `• **Featured Section**: Pin live URLs to your Developer Portfolio and GitHub repositories.\n` +
          `• **Skills & Endorsements**: Add Python, JavaScript, and React from your platform skills so recruiters searching for those keywords discover your profile.`,
        suggestedFollowUps: [
          'Update LinkedIn profile',
          'What career interests should I set?',
          'How to reach out to recruiters'
        ],
        actionRoute: 'linkedin',
        actionLabel: 'Open LinkedIn Optimizer'
      };
    }

    // 8. INTERVIEW PREPARATION
    if (
      query.includes('interview') || 
      query.includes('internship') || 
      query.includes('recruiter')
    ) {
      return {
        category: 'career',
        text: `Here is your targeted Software Engineering Internship preparation checklist:\n\n` +
          `1. **Technical Foundations (DSA)**: Focus on Arrays, Hashmaps, Two Pointers, and Binary Search (leveraging your \`DSA-Practice\` repo).\n` +
          `2. **System & Web Basics**: Be ready to explain HTTP verbs, REST APIs, and database indexing.\n` +
          `3. **Project Deep-Dives**: For each project on your resume, prepare the STAR method story:\n` +
          `   - *Situation*: What problem did you solve?\n` +
          `   - *Task*: What was your role?\n` +
          `   - *Action*: Why did you pick this architecture?\n` +
          `   - *Result*: What was the performance or deployment outcome?`,
        suggestedFollowUps: [
          'Generate 3 mock technical interview questions',
          'How to explain my Portfolio project in an interview',
          'Review academic fundamentals'
        ],
        actionRoute: 'profile',
        actionLabel: 'Review Career Profile'
      };
    }

    // 9. EXPLAIN A TOPIC (Educational Query)
    if (
      query.includes('explain') || 
      query.includes('what is') || 
      query.includes('difference between') ||
      query.includes('how does')
    ) {
      return {
        category: 'study',
        text: `Great conceptual question! In computer science, mastering the underlying mechanisms makes you a far better engineer:\n\n` +
          `• **Core Idea**: Focus on time complexity ($O(n)$ vs $O(1)$) and memory locality.\n` +
          `• **Mental Model**: Break the problem down into inputs, state mutations, and predictable outputs.\n` +
          `• **Hands-on Verification**: The fastest way to internalize this topic is to write a small 10-line CLI demonstration or unit test.\n\n` +
          `Would you like to generate a practice problem or see how this connects to your Semester 4 coursework?`,
        suggestedFollowUps: [
          'Show a code example in Python',
          'Show a code example in JavaScript',
          'Add this concept to my subject notes'
        ],
        actionRoute: 'notes',
        actionLabel: 'Open Subject Notes'
      };
    }

    // 10. GENERAL / PERSONALIZED FALLBACK
    return {
      category: 'general',
      text: `Hello ${studentName}! I have reviewed your student profile, academic records (Semester 4, 8.42 CGPA), and active projects.\n\n` +
        `I am your dedicated student growth mentor. I can help you with:\n` +
        `• **Academics & Study Plans**: Target your syllabus and exam preparation.\n` +
        `• **Technical Skills**: Recommend optimal next technologies and coding sprints.\n` +
        `• **Practical Projects**: Guide development milestones and GitHub repository structuring.\n` +
        `• **Career Readiness**: Optimize your resume, LinkedIn profile, and interview prep.\n\n` +
        `What area would you like to focus on right now?`,
      suggestedFollowUps: [
        'What should I learn next?',
        'Help me plan today',
        'Suggest a project',
        'Review my resume'
      ],
      actionRoute: 'dashboard',
      actionLabel: 'Back to Dashboard'
    };
  } catch (error) {
    return {
      category: 'error',
      text: 'Something went wrong while analyzing your student context. Please try asking your question again.',
      suggestedFollowUps: ['What should I learn next?', 'Help me plan today'],
      isError: true
    };
  }
}

/**
 * Generates dynamic, context-aware suggestions for the Dashboard AI Widget
 */
export function getDashboardAIFocusItems(context = {}) {
  const {
    skills = [],
    projects = [],
    challenges = [],
    resume = {},
    github = {}
  } = context;

  const items = [];

  // Check 1: In-progress projects
  const inProgressProject = projects.find(p => p.status === 'in_progress');
  if (inProgressProject) {
    items.push({
      id: 'focus-proj',
      text: `Advance milestone on "${inProgressProject.title}" (${inProgressProject.relatedSkill})`,
      route: 'projects',
      category: 'Project'
    });
  }

  // Check 2: Active challenge
  const activeChallenge = challenges.find(c => c.status === 'in_progress' || (c.progress > 0 && c.progress < 100));
  if (activeChallenge) {
    items.push({
      id: 'focus-chal',
      text: `Complete today's coding sprint tasks for "${activeChallenge.title}"`,
      route: 'challenges',
      category: 'Challenge'
    });
  } else {
    items.push({
      id: 'focus-chal-new',
      text: 'Enroll in 14-Day JavaScript Sprint to expand frontend skills',
      route: 'challenges',
      category: 'Challenge'
    });
  }

  // Check 3: Next skill
  const jsSkill = skills.find(s => s.name?.toLowerCase().includes('javascript'));
  if (jsSkill && jsSkill.progress < 80) {
    items.push({
      id: 'focus-skill',
      text: 'Practice asynchronous JavaScript and Fetch API requests',
      route: 'skills',
      category: 'Skill'
    });
  }

  // Check 4: Career / Resume
  items.push({
    id: 'focus-career',
    text: 'Attach verified certifications to reach 100% Resume Completeness',
    route: 'resume',
    category: 'Career'
  });

  return items;
}
