
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  date: string;
  achievements: string[];
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
  outcome: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  percentage?: string;
  details?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  details: string[];
}
