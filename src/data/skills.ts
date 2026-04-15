export interface Skill {
  name: string
  level: number // 0-1
  category: 'languages' | 'ml' | 'web' | 'tools' | 'visualization'
}

export const skills: Skill[] = [
  // Languages
  { name: 'Python',      level: 0.92, category: 'languages' },
  { name: 'JavaScript', level: 0.88, category: 'languages' },
  { name: 'C++',         level: 0.75, category: 'languages' },
  { name: 'Java',        level: 0.70, category: 'languages' },
  { name: 'SQL',         level: 0.82, category: 'languages' },
  { name: 'R',           level: 0.65, category: 'languages' },

  // ML / Data Science
  { name: 'Scikit-learn',      level: 0.88, category: 'ml' },
  { name: 'PyTorch Geometric', level: 0.78, category: 'ml' },
  { name: 'Statsmodels',       level: 0.72, category: 'ml' },
  { name: 'Time Series',       level: 0.75, category: 'ml' },
  { name: 'NLP',               level: 0.70, category: 'ml' },

  // Web Dev
  { name: 'React',      level: 0.90, category: 'web' },
  { name: 'Node.js',    level: 0.82, category: 'web' },
  { name: 'FastAPI',    level: 0.80, category: 'web' },
  { name: 'MongoDB',    level: 0.72, category: 'web' },
  { name: 'PostgreSQL', level: 0.75, category: 'web' },
  { name: 'REST APIs',  level: 0.85, category: 'web' },

  // Tools
  { name: 'Docker',    level: 0.72, category: 'tools' },
  { name: 'Git',       level: 0.88, category: 'tools' },
  { name: 'Postman',   level: 0.80, category: 'tools' },
  { name: 'Streamlit', level: 0.82, category: 'tools' },
  { name: 'VS Code',   level: 0.92, category: 'tools' },

  // Visualization
  { name: 'Matplotlib', level: 0.85, category: 'visualization' },
  { name: 'Tableau',    level: 0.80, category: 'visualization' },
  { name: 'Power BI',   level: 0.72, category: 'visualization' },
]

export const categoryLabels: Record<Skill['category'], string> = {
  languages:     '// Languages',
  ml:            '// ML & Data',
  web:           '// Web Dev',
  tools:         '// Tools',
  visualization: '// Visualization',
}
