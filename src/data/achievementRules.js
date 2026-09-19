/**
 * Pure Rule Evaluation Engine for Student Achievements
 * Evaluates session state (completed challenges, completed projects, streaks, skills)
 * to determine if any locked achievements have met their unlock criteria.
 */

export function evaluateAchievementUnlocks({
  achievements,
  challenges = [],
  projects = [],
  streak = 12,
  skills = []
}) {
  const completedProjects = projects.filter(p => p.status === 'completed');
  const completedChallenges = challenges.filter(c => c.status === 'completed');
  const newlyUnlocked = [];

  const updatedAchievements = achievements.map(ach => {
    // If already unlocked, do nothing
    if (ach.unlocked) return ach;

    let shouldUnlock = false;
    let newProgress = ach.progress ? { ...ach.progress } : null;

    // Rule 1: Project Master (Complete 10 projects)
    if (ach.id === 'ach-project-master-10') {
      if (newProgress) newProgress.current = completedProjects.length;
      if (completedProjects.length >= 10) shouldUnlock = true;
    }

    // Rule 2: Skill Explorer (Complete 10 skills)
    if (ach.id === 'ach-skill-explorer-10') {
      const masteredSkills = skills.filter(s => (s.progress || 0) >= 80);
      if (newProgress) newProgress.current = masteredSkills.length;
      if (masteredSkills.length >= 10) shouldUnlock = true;
    }

    // Rule 3: 30-Day Warrior (Maintain a 30-day streak)
    if (ach.id === 'ach-warrior-30') {
      if (newProgress) newProgress.current = streak;
      if (streak >= 30) shouldUnlock = true;
    }

    // Rule 4: Dynamic Skill Builder (e.g. JavaScript, Python, etc.)
    // If any challenge is completed AND its related project is completed
    const hasCompletedChallengeAndProject = completedChallenges.some(c => 
      completedProjects.some(p => p.relatedSkill?.toLowerCase() === c.skill?.toLowerCase() || p.relatedChallengeId === c.id)
    );
    if (ach.id === 'ach-python-builder' && hasCompletedChallengeAndProject) {
      shouldUnlock = true;
    }

    // If unlocked by rule
    if (shouldUnlock) {
      const unlockedAch = {
        ...ach,
        unlocked: true,
        unlockedDate: 'Just now',
        badgeColor: '#F59E0B' // Golden unlock glow
      };
      newlyUnlocked.push(unlockedAch);
      return unlockedAch;
    }

    // Return with updated progress if any
    return newProgress ? { ...ach, progress: newProgress } : ach;
  });

  return {
    updatedAchievements,
    newlyUnlocked
  };
}
