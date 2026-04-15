export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  stack: string[]
  metric?: { label: string; value: string }
  github?: string
  year: string
}

export const projects: Project[] = [
  {
    id: 'gnn-misinformation',
    title: 'Social Media Misinformation Detection',
    tagline: 'Graph Neural Networks at scale',
    description:
      'Modeled social media platforms as graphs using GNNs to detect coordinated misinformation campaigns. Compared against TF-IDF, SVM, Naive Bayes, and Random Forest baselines — GNNs captured structural patterns baselines missed entirely.',
    stack: ['Python', 'PyTorch Geometric', 'GNN', 'NetworkX', 'Scikit-learn'],
    year: '2025',
  },
  {
    id: 'sageguard',
    title: 'SageGuard',
    tagline: 'AI vision · workplace safety · real-time',
    description:
      'Built at Sage IT INC. AI-powered workplace safety platform using YOLO for real-time detection — red zone intrusion, PPE compliance, worker tracking, fire & smoke. Detections are passed through a Qwen VLM acting as a reasoning brain, generating unified alerts with evidence clips per incident.',
    stack: ['Python', 'YOLO', 'Qwen VLM', 'OpenCV', 'FastAPI', 'FFmpeg'],
    metric: { label: 'Detectors', value: '5 live' },
    year: '2026',
  },
  {
    id: 'loan-verification',
    title: 'AI Loan Verification Platform',
    tagline: 'FastAPI · Azure OCR · Docker',
    description:
      'Built at Sage IT INC as AI Intern. Full-stack loan verification platform using FastAPI backend, React + Node.js frontend, n8n workflow automation, and Azure Document Intelligence OCR for document extraction.',
    stack: ['FastAPI', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Azure OCR', 'n8n'],
    year: '2026',
  },
]
