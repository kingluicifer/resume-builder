import { CVData } from '@/types/cv';

export const initialCVData: CVData = {
  personal: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    summary: 'Passionate Software Engineer with 5+ years of experience building scalable web applications using React, Next.js, and cloud technologies.',
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Developer',
      startDate: '2022-01',
      endDate: 'Present',
      description: 'Led a team of 4 developers to rebuild the core SaaS dashboard, improving performance by 40% and user engagement by 25%.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      startDate: '2016',
      endDate: '2020'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      url: 'https://aws.amazon.com'
    }
  ],
  languages: [
    {
      id: '1',
      name: 'English',
      proficiency: 'Native'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'DevFlow SaaS',
      description: 'An AI-powered developer workflow automation tool built with React and Node.js.',
      url: 'https://github.com/example/devflow',
      technologies: 'React, TypeScript, Node.js'
    }
  ],
  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git'],
  template: 'modern',
  themeColor: 'indigo',
};