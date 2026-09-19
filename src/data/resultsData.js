/**
 * Stage 4: Academic Results Mock Data & Calculation Utilities
 */

export const GRADE_POINTS = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'P': 4,
  'F': 0
};

export const INITIAL_SEMESTERS = [
  {
    id: 'sem-1',
    name: 'Semester 1',
    sgpa: 7.40,
    credits: 20,
    percentage: 74.0,
    academicYear: '2024-2025 (Odd)',
    subjects: [
      { id: 's1-1', name: 'Engineering Mathematics I', marks: 72, grade: 'B+', credits: 4 },
      { id: 's1-2', name: 'Engineering Physics', marks: 74, grade: 'B+', credits: 4 },
      { id: 's1-3', name: 'Problem Solving & C Programming', marks: 80, grade: 'A', credits: 4 },
      { id: 's1-4', name: 'Basic Electrical Engineering', marks: 68, grade: 'B', credits: 3 },
      { id: 's1-5', name: 'Engineering Graphics & Design', marks: 78, grade: 'B+', credits: 3 },
      { id: 's1-6', name: 'Programming Lab in C', marks: 84, grade: 'A', credits: 2 }
    ]
  },
  {
    id: 'sem-2',
    name: 'Semester 2',
    sgpa: 7.80,
    credits: 22,
    percentage: 78.0,
    academicYear: '2024-2025 (Even)',
    subjects: [
      { id: 's2-1', name: 'Engineering Mathematics II', marks: 75, grade: 'B+', credits: 4 },
      { id: 's2-2', name: 'Engineering Chemistry', marks: 76, grade: 'B+', credits: 4 },
      { id: 's2-3', name: 'Object Oriented Programming with C++', marks: 84, grade: 'A', credits: 4 },
      { id: 's2-4', name: 'Basic Electronics & Communication', marks: 72, grade: 'B+', credits: 3 },
      { id: 's2-5', name: 'Environmental Science', marks: 82, grade: 'A', credits: 2 },
      { id: 's2-6', name: 'C++ OOP Laboratory', marks: 88, grade: 'A+', credits: 3 },
      { id: 's2-7', name: 'Technical English Communication', marks: 80, grade: 'A', credits: 2 }
    ]
  },
  {
    id: 'sem-3',
    name: 'Semester 3',
    sgpa: 8.10,
    credits: 24,
    percentage: 81.0,
    academicYear: '2025-2026 (Odd)',
    subjects: [
      { id: 's3-1', name: 'Discrete Mathematics & Graph Theory', marks: 74, grade: 'B+', credits: 4 },
      { id: 's3-2', name: 'Data Structures & Algorithms', marks: 85, grade: 'A', credits: 4 },
      { id: 's3-3', name: 'Digital Logic & Computer Organization', marks: 80, grade: 'A', credits: 4 },
      { id: 's3-4', name: 'Python Programming Essentials', marks: 90, grade: 'O', credits: 3 },
      { id: 's3-5', name: 'Software Engineering Fundamentals', marks: 78, grade: 'B+', credits: 3 },
      { id: 's3-6', name: 'Data Structures Laboratory', marks: 92, grade: 'O', credits: 3 },
      { id: 's3-7', name: 'Universal Human Values', marks: 82, grade: 'A', credits: 3 }
    ]
  },
  {
    id: 'sem-4',
    name: 'Semester 4',
    sgpa: 8.42,
    credits: 22,
    percentage: 84.2,
    academicYear: '2025-2026 (Even)',
    subjects: [
      { id: 's4-1', name: 'Database Management Systems', marks: 91, grade: 'O', credits: 4 },
      { id: 's4-2', name: 'Advanced Data Structures & Algorithms', marks: 88, grade: 'A+', credits: 4 },
      { id: 's4-3', name: 'Computer Networks', marks: 82, grade: 'A', credits: 3 },
      { id: 's4-4', name: 'Operating Systems', marks: 79, grade: 'B+', credits: 3 },
      { id: 's4-5', name: 'Probability, Statistics & Numerical Methods', marks: 76, grade: 'B', credits: 4 },
      { id: 's4-6', name: 'DBMS & SQL Laboratory', marks: 94, grade: 'O', credits: 2 },
      { id: 's4-7', name: 'Operating Systems System Call Lab', marks: 86, grade: 'A+', credits: 2 }
    ]
  }
];

/**
 * Calculates semester SGPA based on subject credits and grades.
 */
export function calculateSemesterSGPA(subjects) {
  if (!subjects || subjects.length === 0) return 0;
  let totalPoints = 0;
  let totalCredits = 0;

  subjects.forEach(sub => {
    const cred = Number(sub.credits) || 0;
    const pts = GRADE_POINTS[sub.grade] ?? 7;
    totalPoints += pts * cred;
    totalCredits += cred;
  });

  return totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
}

/**
 * Calculates cumulative CGPA across all semesters.
 */
export function calculateCumulativeCGPA(semesters) {
  if (!semesters || semesters.length === 0) return 0;
  let totalPoints = 0;
  let totalCredits = 0;

  semesters.forEach(sem => {
    const semCred = sem.credits || sem.subjects?.reduce((a, b) => a + Number(b.credits), 0) || 20;
    totalPoints += (sem.sgpa || 0) * semCred;
    totalCredits += semCred;
  });

  return totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
}

/**
 * Generates descriptive insights based purely on the mock dataset.
 */
export function generateAcademicInsights(semesters) {
  if (!semesters || semesters.length === 0) return [];

  const firstSem = semesters[0];
  const lastSem = semesters[semesters.length - 1];
  
  // Find highest & lowest scoring subject in the latest semester
  const currentSubjects = lastSem.subjects || [];
  let highest = currentSubjects[0];
  let lowest = currentSubjects[0];

  currentSubjects.forEach(s => {
    if (s.marks > (highest?.marks || 0)) highest = s;
    if (s.marks < (lowest?.marks || 100)) lowest = s;
  });

  return [
    {
      id: 'trend',
      title: 'Semester Trend',
      description: `Your recorded semester SGPA increased steadily from ${firstSem.sgpa.toFixed(2)} in ${firstSem.name} to ${lastSem.sgpa.toFixed(2)} in ${lastSem.name}.`,
      type: 'positive'
    },
    {
      id: 'strongest',
      title: 'Subject Overview',
      description: highest ? `${highest.name} has the highest recorded mark in your current session at ${highest.marks}% (Grade ${highest.grade}).` : 'Consistently strong performance across core technical labs.',
      type: 'highlight'
    },
    {
      id: 'focus',
      title: 'Focus Area',
      description: lowest ? `${lowest.name} has a lower recorded mark (${lowest.marks}%) relative to your other listed subjects.` : 'Review Discrete Mathematics problem sets before semester finals.',
      type: 'neutral'
    }
  ];
}
