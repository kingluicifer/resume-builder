export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies: string;
}

export type TemplateStyle = 'modern' | 'classic' | 'minimal';
export type ThemeColor = 'indigo' | 'emerald' | 'rose' | 'amber' | 'blue';

export interface CVData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    photo?: string;
  };
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
  skills: string[];
  template: TemplateStyle;
  themeColor: ThemeColor;
}