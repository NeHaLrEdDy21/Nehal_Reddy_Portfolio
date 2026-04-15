export interface Experience {
  id: string
  role: string
  org: string
  period: string
  type: 'work' | 'leadership' | 'achievement' | 'academic'
  bullets: string[]
  highlight?: string
}

export const experiences: Experience[] = [
  {
    id: 'sage-it',
    role: 'AI Intern',
    org: 'Sage IT INC',
    period: 'Feb 2026',
    type: 'work',
    bullets: [
      'Built loan verification platform with FastAPI + React + Node.js',
      'Integrated Azure Document Intelligence OCR for automated data extraction',
      'Orchestrated n8n workflows for document processing automation',
      'Managed PostgreSQL via SQLAlchemy; containerized with Docker',
    ],
  },
  {
    id: 'profolio',
    role: '2nd Place — Profolio 2025',
    org: 'Inter-college Competition',
    period: 'Mar 2025',
    type: 'achievement',
    highlight: '2nd / 200+',
    bullets: [
      'Built a dynamic portfolio web app with React, Framer Motion, Tailwind CSS',
      'Competed against 200+ participants across colleges',
    ],
  },
  {
    id: 'la-culina',
    role: 'Founder & General Secretary',
    org: 'La Culina Culinary Club',
    period: 'Sept 2025 – Present',
    type: 'leadership',
    bullets: [
      'Founded the culinary club from scratch — organized cooking events, workshops, and food festivals',
      'Managed a team driving community engagement around food culture and creativity',
    ],
  },
  {
    id: 'mun',
    role: 'Delegate & Chair',
    org: 'Model United Nations',
    period: '2023 – Present',
    type: 'leadership',
    highlight: 'Top 4 / 5 MUNs',
    bullets: [
      'Chaired committees and competed as delegate across 5 MUN conferences',
      'Earned top positions (Best Delegate / High Commendation) in 4 out of 5 conferences',
    ],
  },
  {
    id: 'stentorian',
    role: 'Active Member',
    org: 'Stentorian Literature Club',
    period: '2023 – Present',
    type: 'leadership',
    bullets: [
      'Participated in 10+ literary events — debates, creative writing, public speaking',
    ],
  },
  {
    id: 'dsa',
    role: 'DSA — Diamond Certificate',
    org: 'Smart Interviews',
    period: '2024',
    type: 'achievement',
    highlight: '100+ Problems',
    bullets: [
      'Solved 100+ DSA problems across coding platforms',
      'Earned Diamond Certificate in Data Structures and Algorithms',
    ],
  },
]
