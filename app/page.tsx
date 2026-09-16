// app/page.tsx
'use client';

import Link from 'next/link';
import { FileText, Sparkles, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
            <FileText size={22} />
          </div>
          <span className="font-extrabold text-xl tracking-tight">ResumeForge <span className="text-indigo-400 text-xs uppercase px-2 py-0.5 bg-indigo-950 border border-indigo-800 rounded-full ml-1">Pro</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-sm text-slate-400 hover:text-slate-200 transition hidden sm:inline">Privacy Policy</Link>
          <Link 
            href="/builder" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
          >
            Build CV Free <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-semibold tracking-wide animate-pulse">
          <Sparkles size={14} /> Next-Generation AI-Ready Resume Platform
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white max-w-4xl">
          Craft Market-Ready Resumes That <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Get You Hired</span>
        </h1>
        
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          Build ATS-friendly, professionally designed CVs in minutes. Real-time preview, multiple expert templates, and instant PDF export with zero hassle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
          <Link 
            href="/builder" 
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-indigo-600/40 transition transform hover:scale-105"
          >
            Create Your Resume Now <ArrowRight size={18} />
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20 w-full text-left">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3 backdrop-blur">
            <div className="bg-indigo-950 text-indigo-400 p-3 rounded-xl w-fit border border-indigo-800/50">
              <Zap size={20} />
            </div>
            <h3 className="font-bold text-lg text-white">Instant Live Preview</h3>
            <p className="text-slate-400 text-sm leading-relaxed">See every change update immediately on a pixel-perfect resume canvas before exporting.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3 backdrop-blur">
            <div className="bg-purple-950 text-purple-400 p-3 rounded-xl w-fit border border-purple-800/50">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="font-bold text-lg text-white">ATS-Optimized Layouts</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Designed by recruitment experts to successfully pass Automated Tracking Systems used by top companies.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3 backdrop-blur">
            <div className="bg-pink-950 text-pink-400 p-3 rounded-xl w-fit border border-pink-800/50">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-lg text-white">100% Private & Secure</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Your data stays safe in your browser. No mandatory sign-ups or hidden data tracking.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 ResumeForge Pro. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link href="/builder" className="hover:text-slate-300 transition">Builder Tool</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}