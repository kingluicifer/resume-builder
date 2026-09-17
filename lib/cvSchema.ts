// lib/cvSchema.ts
import { z } from 'zod';

export const cvSchema = z.object({
  personal: z.object({
    fullName: z.string().min(2, 'Full name is required (at least 2 characters).'),
    email: z.string().email('Please enter a valid email address.'),
    phone: z.string().min(5, 'A valid phone number is required.'),
    location: z.string().min(2, 'Location is required.'),
    website: z.string().url('Website must be a valid URL.').optional().or(z.literal('')),
    summary: z.string().min(10, 'Professional summary should be at least 10 characters long.'),
    photo: z.string().optional(),
  }),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string().min(1, 'Company name is required.'),
    position: z.string().min(1, 'Position title is required.'),
    startDate: z.string().min(1, 'Start date is required.'),
    endDate: z.string().min(1, 'End date is required.'),
    description: z.string().min(1, 'Experience description is required.'),
  })),
  education: z.array(z.object({
    id: z.string(),
    institution: z.string().min(1, 'Institution name is required.'),
    degree: z.string().min(1, 'Degree is required.'),
    startDate: z.string().min(1, 'Start date is required.'),
    endDate: z.string().min(1, 'End date is required.'),
  })),
  certifications: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Certification name is required.'),
    issuer: z.string().min(1, 'Issuer is required.'),
    date: z.string().min(1, 'Date is required.'),
    url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  })).optional(),
  languages: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Language name is required.'),
    proficiency: z.string().min(1, 'Proficiency level is required.'),
  })).optional(),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Project name is required.'),
    description: z.string().min(1, 'Description is required.'),
    url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    technologies: z.string().optional(),
  })).optional(),
  skills: z.array(z.string()),
  template: z.enum(['modern', 'classic', 'minimal']),
  themeColor: z.enum(['indigo', 'emerald', 'rose', 'amber', 'blue']),
});