export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  status: 'completed' | 'in-progress' | 'planned';
  demoAvailable?: boolean;
}

export type ProjectStatus = Project['status'];

