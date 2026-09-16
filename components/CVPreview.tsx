import { CVData, ThemeColor } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
}

// Explicit helper function so Tailwind JIT compiler detects all class strings
function getThemeClasses(color: ThemeColor = 'indigo') {
  switch (color) {
    case 'emerald':
      return { border: 'border-emerald-600', text: 'text-emerald-600', bg: 'bg-emerald-600', badge: 'bg-emerald-50 text-emerald-700' };
    case 'rose':
      return { border: 'border-rose-600', text: 'text-rose-600', bg: 'bg-rose-600', badge: 'bg-rose-50 text-rose-700' };
    case 'amber':
      return { border: 'border-amber-600', text: 'text-amber-600', bg: 'bg-amber-600', badge: 'bg-amber-50 text-amber-700' };
    case 'blue':
      return { border: 'border-blue-600', text: 'text-blue-600', bg: 'bg-blue-600', badge: 'bg-blue-50 text-blue-700' };
    case 'indigo':
    default:
      return { border: 'border-indigo-600', text: 'text-indigo-600', bg: 'bg-indigo-600', badge: 'bg-indigo-50 text-indigo-700' };
  }
}

export default function CVPreview({ data }: CVPreviewProps) {
  const { personal, experience, education, certifications, languages, projects, skills, template, themeColor } = data;
  const theme = getThemeClasses(themeColor);

  return (
    <div 
      id="cv-print-area" 
      className="bg-white text-slate-800 shadow-2xl rounded-xl w-full max-w-[210mm] p-10 mx-auto print:shadow-none print:p-0 print:w-full"
    >
      {/* MODERN TEMPLATE */}
      {template === 'modern' && (
        <div className="space-y-6">
          <div className={`border-b-2 ${theme.border} pb-6 flex items-center justify-between gap-6`}>
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{personal.fullName || 'Your Name'}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                {personal.email && <span className="flex items-center gap-1"><Mail size={14} className={theme.text} />{personal.email}</span>}
                {personal.phone && <span className="flex items-center gap-1"><Phone size={14} className={theme.text} />{personal.phone}</span>}
                {personal.location && <span className="flex items-center gap-1"><MapPin size={14} className={theme.text} />{personal.location}</span>}
                {personal.website && <span className="flex items-center gap-1"><Globe size={14} className={theme.text} />{personal.website}</span>}
              </div>
            </div>
            {personal.photo && (
              <img 
                src={personal.photo} 
                alt={personal.fullName || 'Profile Photo'} 
                className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-slate-200 shrink-0" 
              />
            )}
          </div>

          {personal.summary && (
            <div>
              <h2 className={`text-lg font-bold ${theme.text} uppercase tracking-wider mb-2`}>Professional Summary</h2>
              <p className="text-slate-700 leading-relaxed text-sm">{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold ${theme.text} uppercase tracking-wider mb-3`}>Work Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-slate-900 text-base">{exp.position}</h3>
                      <span className="text-xs font-medium text-slate-500">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className={`${theme.text} font-medium text-sm`}>{exp.company}</p>
                    <p className="text-slate-600 text-sm mt-1 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold ${theme.text} uppercase tracking-wider mb-3`}>Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      {proj.url ? (
                        <a 
                          href={proj.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`font-semibold text-slate-900 hover:${theme.text} underline underline-offset-2 flex items-center gap-1 text-base`}
                        >
                          {proj.name} <ExternalLink size={12} className={theme.text} />
                        </a>
                      ) : (
                        <h3 className="font-semibold text-slate-900 text-base">{proj.name}</h3>
                      )}
                      {proj.technologies && <span className={`text-xs font-medium ${theme.text}`}>{proj.technologies}</span>}
                    </div>
                    <p className="text-slate-600 text-sm mt-1 whitespace-pre-line">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold ${theme.text} uppercase tracking-wider mb-3`}>Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">{edu.degree}</h3>
                      <p className={`${theme.text} text-xs`}>{edu.institution}</p>
                    </div>
                    <span className="text-xs text-slate-500">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold ${theme.text} uppercase tracking-wider mb-3`}>Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline text-sm">
                    <div className="flex items-center gap-1.5">
                      {cert.url ? (
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`font-semibold text-slate-900 hover:${theme.text} underline underline-offset-2 flex items-center gap-1`}
                        >
                          {cert.name} <ExternalLink size={12} className={theme.text} />
                        </a>
                      ) : (
                        <span className="font-semibold text-slate-900">{cert.name}</span>
                      )}
                      <span className="text-slate-600"> — {cert.issuer}</span>
                    </div>
                    <span className="text-xs text-slate-500">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold ${theme.text} uppercase tracking-wider mb-3`}>Languages</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <span className="font-semibold text-slate-900">{lang.name}</span>
                    <span className="text-slate-600"> — {lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold ${theme.text} uppercase tracking-wider mb-2`}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className={`${theme.badge} text-xs px-3 py-1 rounded-full font-medium`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CLASSIC TEMPLATE */}
      {template === 'classic' && (
        <div className="space-y-6 font-serif">
          <div className={`text-center border-b-2 ${theme.border} pb-6 space-y-3`}>
            {personal.photo && (
              <div className="flex justify-center">
                <img 
                  src={personal.photo} 
                  alt={personal.fullName || 'Profile Photo'} 
                  className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-slate-200" 
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-wide uppercase text-slate-900">{personal.fullName || 'Your Name'}</h1>
              <div className="flex justify-center flex-wrap gap-4 mt-2 text-xs text-slate-600">
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>• {personal.phone}</span>}
                {personal.location && <span>• {personal.location}</span>}
                {personal.website && <span>• {personal.website}</span>}
              </div>
            </div>
          </div>

          {personal.summary && (
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-widest ${theme.text} border-b border-slate-200 pb-1 mb-2`}>Summary</h2>
              <p className="text-slate-700 text-sm leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-widest ${theme.text} border-b border-slate-200 pb-1 mb-3`}>Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-semibold text-sm">
                      <span>{exp.position} — <span className={`font-normal italic ${theme.text}`}>{exp.company}</span></span>
                      <span className="text-xs text-slate-600">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-slate-700 text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-widest ${theme.text} border-b border-slate-200 pb-1 mb-3`}>Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between font-semibold text-sm">
                      <div>
                        {proj.url ? (
                          <a 
                            href={proj.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`hover:${theme.text} underline underline-offset-2 inline-flex items-center gap-1`}
                          >
                            {proj.name} <ExternalLink size={11} className={theme.text} />
                          </a>
                        ) : (
                          <span>{proj.name}</span>
                        )}
                        {proj.technologies && <span className={`font-normal italic text-slate-600`}> ({proj.technologies})</span>}
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-widest ${theme.text} border-b border-slate-200 pb-1 mb-3`}>Education</h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between text-sm">
                    <div>
                      <span className="font-semibold">{edu.degree}</span>, <span className={theme.text}>{edu.institution}</span>
                    </div>
                    <span className="text-xs text-slate-600">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-widest ${theme.text} border-b border-slate-200 pb-1 mb-3`}>Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between text-sm">
                    <div>
                      {cert.url ? (
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`font-semibold hover:${theme.text} underline underline-offset-2 inline-flex items-center gap-1`}
                        >
                          {cert.name} <ExternalLink size={11} className={theme.text} />
                        </a>
                      ) : (
                        <span className="font-semibold">{cert.name}</span>
                      )}
                      <span> — </span>
                      <span className={theme.text}>{cert.issuer}</span>
                    </div>
                    <span className="text-xs text-slate-600">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-widest ${theme.text} border-b border-slate-200 pb-1 mb-2`}>Languages</h2>
              <p className="text-sm text-slate-700">
                {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
              </p>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-widest ${theme.text} border-b border-slate-200 pb-1 mb-2`}>Skills</h2>
              <p className="text-sm text-slate-700">{skills.join(', ')}</p>
            </div>
          )}
        </div>
      )}

      {/* MINIMAL TEMPLATE */}
      {template === 'minimal' && (
        <div className="space-y-6 font-sans">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light text-slate-900">{personal.fullName || 'Your Name'}</h1>
              <p className={`text-xs ${theme.text} font-medium mt-1`}>
                {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).join(' | ')}
              </p>
            </div>
            {personal.photo && (
              <img 
                src={personal.photo} 
                alt={personal.fullName || 'Profile Photo'} 
                className="w-16 h-16 rounded-full object-cover border border-slate-200 shrink-0" 
              />
            )}
          </div>

          {personal.summary && (
            <p className="text-slate-600 text-sm leading-relaxed">{personal.summary}</p>
          )}

          {experience.length > 0 && (
            <div className="space-y-4">
              <h2 className={`text-xs font-semibold ${theme.text} uppercase tracking-widest`}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-4 gap-2">
                  <div className="text-xs text-slate-400 font-medium pt-0.5">
                    {exp.startDate} – {exp.endDate}
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-medium text-slate-900 text-sm">{exp.position} <span className={theme.text}>@ {exp.company}</span></h3>
                    <p className="text-slate-600 text-sm mt-1">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div className="space-y-4">
              <h2 className={`text-xs font-semibold ${theme.text} uppercase tracking-widest`}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} className="grid grid-cols-4 gap-2">
                  <div className="text-xs text-slate-400 font-medium pt-0.5">
                    {proj.technologies}
                  </div>
                  <div className="col-span-3">
                    {proj.url ? (
                      <a 
                        href={proj.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`font-medium text-slate-900 hover:${theme.text} underline underline-offset-2 inline-flex items-center gap-1 text-sm`}
                      >
                        {proj.name} <ExternalLink size={11} className={theme.text} />
                      </a>
                    ) : (
                      <h3 className="font-medium text-slate-900 text-sm">{proj.name}</h3>
                    )}
                    <p className="text-slate-600 text-sm mt-1">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div className="space-y-3">
              <h2 className={`text-xs font-semibold ${theme.text} uppercase tracking-widest`}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-4 gap-2">
                  <div className="text-xs text-slate-400 font-medium">
                    {edu.startDate} – {edu.endDate}
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-medium text-slate-900 text-sm">{edu.degree}</h3>
                    <p className={`${theme.text} text-xs`}>{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div className="space-y-3">
              <h2 className={`text-xs font-semibold ${theme.text} uppercase tracking-widest`}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="grid grid-cols-4 gap-2">
                  <div className="text-xs text-slate-400 font-medium">
                    {cert.date}
                  </div>
                  <div className="col-span-3">
                    {cert.url ? (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`font-medium text-slate-900 hover:${theme.text} underline underline-offset-2 inline-flex items-center gap-1 text-sm`}
                      >
                        {cert.name} <ExternalLink size={11} className={theme.text} />
                      </a>
                    ) : (
                      <h3 className="font-medium text-slate-900 text-sm">{cert.name}</h3>
                    )}
                    <p className={`${theme.text} text-xs`}>{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h2 className={`text-xs font-semibold ${theme.text} uppercase tracking-widest mb-2`}>Languages</h2>
              <div className="text-xs text-slate-700 leading-relaxed">
                {languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className={`text-xs font-semibold ${theme.text} uppercase tracking-widest mb-2`}>Skills</h2>
              <div className="text-xs text-slate-700 leading-relaxed">
                {skills.join(' • ')}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}