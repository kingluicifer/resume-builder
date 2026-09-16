'use client';

import { CVData, Experience, Education, Certification, Language, Project, ThemeColor } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface CVEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

const themeColors: { id: ThemeColor; label: string; bgClass: string }[] = [
  { id: 'indigo', label: 'Indigo', bgClass: 'bg-indigo-600' },
  { id: 'emerald', label: 'Emerald', bgClass: 'bg-emerald-600' },
  { id: 'rose', label: 'Rose', bgClass: 'bg-rose-600' },
  { id: 'amber', label: 'Amber', bgClass: 'bg-amber-600' },
  { id: 'blue', label: 'Blue', bgClass: 'bg-blue-600' },
];

export default function CVEditor({ data, onChange }: CVEditorProps) {
  const updatePersonal = (field: string, value: string) => {
    onChange({
      ...data,
      personal: { ...data.personal, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    const updated = data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
    onChange({ ...data, experience: updated });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(exp => exp.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: ''
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
    onChange({ ...data, education: updated });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(edu => edu.id !== id) });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    onChange({ ...data, certifications: [...(data.certifications || []), newCert] });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    const updated = (data.certifications || []).map(cert => cert.id === id ? { ...cert, [field]: value } : cert);
    onChange({ ...data, certifications: updated });
  };

  const removeCertification = (id: string) => {
    onChange({ ...data, certifications: (data.certifications || []).filter(cert => cert.id !== id) });
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: ''
    };
    onChange({ ...data, languages: [...(data.languages || []), newLang] });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    const updated = (data.languages || []).map(lang => lang.id === id ? { ...lang, [field]: value } : lang);
    onChange({ ...data, languages: updated });
  };

  const removeLanguage = (id: string) => {
    onChange({ ...data, languages: (data.languages || []).filter(lang => lang.id !== id) });
  };

  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      url: '',
      technologies: ''
    };
    onChange({ ...data, projects: [...(data.projects || []), newProj] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updated = (data.projects || []).map(proj => proj.id === id ? { ...proj, [field]: value } : proj);
    onChange({ ...data, projects: updated });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: (data.projects || []).filter(proj => proj.id !== id) });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    onChange({ ...data, skills: skillsArray });
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-xl space-y-8 max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
      
      {/* Template Switcher */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-indigo-400 uppercase tracking-wider">Choose Template</label>
        <div className="grid grid-cols-3 gap-2">
          {(['modern', 'classic', 'minimal'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...data, template: t })}
              className={`py-2 px-3 rounded-lg text-sm font-medium capitalize border transition ${
                data.template === t 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Color Customizer */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-indigo-400 uppercase tracking-wider">Theme Color</label>
        <div className="flex gap-3">
          {themeColors.map((color) => (
            <button
              key={color.id}
              onClick={() => onChange({ ...data, themeColor: color.id })}
              className={`w-8 h-8 rounded-full ${color.bgClass} transition transform ${
                data.themeColor === color.id ? 'ring-4 ring-white/80 scale-110' : 'opacity-70 hover:opacity-100'
              }`}
              title={color.label}
            />
          ))}
        </div>
      </div>

      {/* Personal Info & Photo */}
      <div className="col-span-full space-y-2">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Profile Photo</label>
        <div className="flex items-center gap-4">
          {data.personal.photo && (
            <img 
              src={data.personal.photo} 
              alt="Avatar preview" 
              className="w-12 h-12 rounded-full object-cover border border-slate-700" 
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  updatePersonal('photo', reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
          />
          {data.personal.photo && (
            <button
              type="button"
              onClick={() => updatePersonal('photo', '')}
              className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 bg-red-950/40 border border-red-900 rounded-lg"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Experience</h2>
          <button onClick={addExperience} className="flex items-center gap-1 text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg font-medium transition">
            <Plus size={14} /> Add Role
          </button>
        </div>
        {data.experience.map((exp) => (
          <div key={exp.id} className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl space-y-3 relative">
            <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-400 transition">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
              <input
                type="text"
                placeholder="Position / Title"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Start Date (e.g. 2022)"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="End Date (e.g. Present)"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <textarea
              placeholder="Key responsibilities and achievements..."
              rows={2}
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Education</h2>
          <button onClick={addEducation} className="flex items-center gap-1 text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg font-medium transition">
            <Plus size={14} /> Add School
          </button>
        </div>
        {data.education.map((edu) => (
          <div key={edu.id} className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl space-y-3 relative">
            <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-400 transition">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
              <input
                type="text"
                placeholder="Degree / Major"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Institution Name"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Start Year"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="End Year"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Projects</h2>
          <button onClick={addProject} className="flex items-center gap-1 text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg font-medium transition">
            <Plus size={14} /> Add Project
          </button>
        </div>
        {(data.projects || []).map((proj) => (
          <div key={proj.id} className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl space-y-3 relative">
            <button onClick={() => removeProject(proj.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-400 transition">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
              <input
                type="text"
                placeholder="Project Name"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Technologies (e.g. React, Node.js)"
                value={proj.technologies}
                onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Project URL / GitHub Link (Optional)"
                value={proj.url || ''}
                onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                className="col-span-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <textarea
              placeholder="Brief description of the project and your role..."
              rows={2}
              value={proj.description}
              onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Certifications</h2>
          <button onClick={addCertification} className="flex items-center gap-1 text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg font-medium transition">
            <Plus size={14} /> Add Cert
          </button>
        </div>
        {(data.certifications || []).map((cert) => (
          <div key={cert.id} className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl space-y-3 relative">
            <button onClick={() => removeCertification(cert.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-400 transition">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
              <input
                type="text"
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Issuing Organization"
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Date (e.g. 2023)"
                value={cert.date}
                onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Credential URL (Optional)"
                value={cert.url || ''}
                onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Languages</h2>
          <button onClick={addLanguage} className="flex items-center gap-1 text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg font-medium transition">
            <Plus size={14} /> Add Language
          </button>
        </div>
        {(data.languages || []).map((lang) => (
          <div key={lang.id} className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl space-y-3 relative">
            <button onClick={() => removeLanguage(lang.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-400 transition">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
              <input
                type="text"
                placeholder="Language (e.g. English)"
                value={lang.name}
                onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Proficiency (e.g. Native, Fluent)"
                value={lang.proficiency}
                onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Skills</h2>
        <input
          type="text"
          placeholder="Comma-separated (e.g. React, TypeScript, Node.js)"
          value={data.skills.join(', ')}
          onChange={handleSkillsChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

    </div>
  );
}