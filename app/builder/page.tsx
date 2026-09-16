// app/builder/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { CVData } from '@/types/cv';
import { initialCVData } from '@/data/initialData';
import CVEditor from '@/components/CVEditor';
import CVPreview from '@/components/CVPreview';
import { Download, FileText, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BuilderPage() {
  const [cvData, setCvData] = useState<CVData>(initialCVData);

  // Load saved CV from localStorage once on mount safely
  useEffect(() => {
    const saved = localStorage.getItem('pro_cv_data');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCvData({
          ...initialCVData,
          ...parsedData,
          themeColor: parsedData.themeColor || initialCVData.themeColor,
          personal: { ...initialCVData.personal, ...(parsedData.personal || {}) },
        });
      } catch (e) {
        console.error('Failed to load saved CV', e);
      }
    }
  }, []);

  // Save to localStorage on change
  const handleDataChange = (newData: CVData) => {
    setCvData(newData);
    localStorage.setItem('pro_cv_data', JSON.stringify(newData));
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your CV data to defaults?')) {
      setCvData(initialCVData);
      localStorage.removeItem('pro_cv_data');
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 px-3 py-2 rounded-xl transition border border-slate-700">
            <ArrowLeft size={14} /> Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
              <FileText size={18} />
            </div>
            <span className="font-bold text-base tracking-tight hidden sm:inline">ResumeForge <span className="text-indigo-400 text-xs uppercase px-2 py-0.5 bg-indigo-950 border border-indigo-800 rounded-full ml-1">Workspace</span></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl transition border border-slate-700"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition transform hover:scale-105 cursor-pointer"
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </header>

      {/* Split Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1700px] mx-auto w-full">
        {/* Editor Column */}
        <div className="lg:col-span-5">
          <CVEditor data={cvData} onChange={handleDataChange} />
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-7 flex justify-center bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl overflow-y-auto">
          <CVPreview data={cvData} />
        </div>
      </div>
    </main>
  );
}