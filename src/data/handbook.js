// May 2026 term — all deadlines sourced from official IITM handbook
// https://docs.google.com/document/d/e/2PACX-1vT5PBOz4OH663W0IJPVGVjG_nfmYZGfFI7W1j-6wTLcex13O_7BZmf6a96Q6liO0W-mLZB5hOGZeNNl/pub

const GA_DEADLINES_DIPLOMA = [
  { week: 1,  deadline: '2026-06-24' },
  { week: 2,  deadline: '2026-07-01' },
  { week: 3,  deadline: '2026-07-08' },
  { week: 4,  deadline: '2026-07-15' },
  { week: 5,  deadline: '2026-07-22' },
  { week: 6,  deadline: '2026-07-29' },
  { week: 7,  deadline: '2026-08-05' },
  { week: 8,  deadline: '2026-08-12' },
  { week: 9,  deadline: '2026-08-19' },
  { week: 10, deadline: '2026-08-26' },
  { week: 11, deadline: '2026-09-02' },
  { week: 12, deadline: '2026-09-02' },
]

function weeklyGAs() {
  return GA_DEADLINES_DIPLOMA.map(({ week, deadline }) => ({
    week,
    deadline,
    label: `Week ${week} Assignment`,
  }))
}

export const COURSES = [
  {
    id: 'TDS',
    name: 'Tools in Data Science',
    level: 'diploma',
    gradingFormula: 'T = 0.2·GAA + 0.2·ROE + 0.2·P1 + 0.2·P2 + 0.2·F',
    assignments: weeklyGAs(),
    specialItems: [
      { id: 'ROE',  label: 'Remote Online Exam (ROE)', deadline: '2026-08-02', type: 'exam' },
      { id: 'P1',   label: 'Take-Home Project 1 (P1)', deadline: '2026-08-02', type: 'project' },
      { id: 'P2',   label: 'Take-Home Project 2 (P2)', deadline: '2026-08-30', type: 'project' },
      { id: 'OPPE', label: 'OPPE / Final Exam',        deadline: '2026-09-13', type: 'exam' },
    ],
    project: null,
  },
  {
    id: 'MLP',
    name: 'Machine Learning Practice',
    level: 'diploma',
    gradingFormula: 'T = 0.1·GAA + 0.30·F + 0.20·OPPE1 + 0.20·OPPE2 + 0.20·KA',
    assignments: weeklyGAs(),
    specialItems: [
      { id: 'KA1',   label: 'Kaggle Assignment 1 (KA1)', deadline: '2026-07-22', type: 'kaggle' },
      { id: 'KA2',   label: 'Kaggle Assignment 2 (KA2)', deadline: '2026-08-04', type: 'kaggle' },
      { id: 'KA3',   label: 'Kaggle Assignment 3 (KA3)', deadline: '2026-08-18', type: 'kaggle' },
      { id: 'OPPE1', label: 'OPPE 1',                    deadline: '2026-08-02', type: 'exam' },
      { id: 'OPPE2', label: 'OPPE 2',                    deadline: '2026-08-30', type: 'exam' },
    ],
    project: {
      milestones: [
        { label: 'Kaggle Competition Final Score', deadline: '2026-08-18' },
      ],
    },
  },
  {
    id: 'JAVA',
    name: 'Programming Concepts using Java',
    level: 'diploma',
    gradingFormula: 'T = 0.05·GAA + 0.2·max(PE1,PE2) + 0.45·F + max(0.2·max(Qz1,Qz2), 0.1·Qz1+0.2·Qz2) + 0.1·min(PE1,PE2)',
    assignments: weeklyGAs(),
    specialItems: [
      { id: 'PE1',  label: 'Programming Exam 1 (OPPE1)', deadline: '2026-08-02', type: 'exam' },
      { id: 'PE2',  label: 'Programming Exam 2 (OPPE2)', deadline: '2026-08-30', type: 'exam' },
      { id: 'QZ1',  label: 'Quiz 1 (in-person)',         deadline: '2026-07-19', type: 'quiz' },
      { id: 'QZ2',  label: 'Quiz 2 (in-person)',         deadline: '2026-08-16', type: 'quiz' },
    ],
    project: null,
  },
  {
    id: 'MAD2',
    name: 'Application Development 2',
    level: 'diploma',
    gradingFormula: 'T = 0.05·GAA + max(0.6·F + 0.25·max(Qz1,Qz2), 0.4·F + 0.25·Qz1 + 0.3·Qz2)',
    assignments: [
      { week: 1, deadline: '2026-06-24', label: 'Week 1 Programming Assignment' },
      { week: 2, deadline: '2026-07-01', label: 'Week 2 Programming Assignment' },
    ],
    specialItems: [
      { id: 'QZ1', label: 'Quiz 1 (in-person)', deadline: '2026-07-19', type: 'quiz' },
      { id: 'QZ2', label: 'Quiz 2 (in-person)', deadline: '2026-08-16', type: 'quiz' },
      { id: 'ET',  label: 'End Term Exam',       deadline: '2026-09-13', type: 'exam' },
    ],
    project: {
      milestones: [
        { label: 'MAD2 Project Submission', deadline: '2026-08-09' },
        { label: 'MAD2 Project Evaluation', deadline: '2026-08-09' },
      ],
    },
  },
  {
    id: 'BDM',
    name: 'Business Data Management',
    level: 'diploma',
    gradingFormula: 'T = 0.05·GAA + max(0.6·F + 0.25·max(Qz1,Qz2), 0.4·F + 0.25·Qz1 + 0.3·Qz2)',
    assignments: weeklyGAs(),
    specialItems: [
      { id: 'QZ1', label: 'Quiz 1 (in-person)', deadline: '2026-07-19', type: 'quiz' },
      { id: 'QZ2', label: 'Quiz 2 (in-person)', deadline: '2026-08-16', type: 'quiz' },
      { id: 'ET',  label: 'End Term Exam',       deadline: '2026-09-13', type: 'exam' },
    ],
    project: {
      milestones: [
        { label: 'BDM Project Report Submission', deadline: '2026-08-09' },
      ],
    },
  },
]

export const KEY_DATES = {
  quiz1:   { label: 'Quiz 1 (In-Person)',  date: '2026-07-19', time: '2pm–6pm' },
  quiz2:   { label: 'Quiz 2 (In-Person)',  date: '2026-08-16', time: '2pm–6pm' },
  oppe1:   { label: 'OPPE 1',              date: '2026-08-01', time: 'Aug 1–2' },
  oppe2:   { label: 'OPPE 2',              date: '2026-08-29', time: 'Aug 29–Sep 6' },
  endTerm: { label: 'End Term Exam',       date: '2026-09-13', time: '9am–5pm' },
}

export function getCourseById(id) {
  return COURSES.find(c => c.id === id) ?? null
}
