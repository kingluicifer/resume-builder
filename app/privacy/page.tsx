// app/privacy/page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Privacy Policy</h1>
        <p className="text-slate-400 text-sm">Last updated: September 2026</p>
        
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            At ResumeForge Pro, accessible from our web platform, your privacy is a top priority. This Privacy Policy document outlines the types of information collected and recorded by ResumeForge Pro and how we use it.
          </p>
          <h2 className="text-lg font-bold text-indigo-400 pt-4">Data Storage & Local Privacy</h2>
          <p>
            Our CV generator operates primarily client-side. Your resume data is stored securely in your browser's local storage (`localStorage`) to ensure you never lose your progress. We do not sell, rent, or trade your personal resume information to third parties.
          </p>
          <h2 className="text-lg font-bold text-indigo-400 pt-4">Cookies and Web Beacons</h2>
          <p>
            Like any other website, ResumeForge Pro uses cookies to store visitor preferences and optimize user experience. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.
          </p>
          <h2 className="text-lg font-bold text-indigo-400 pt-4">Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </div>
        <div className="pt-6">
          <a href="/" className="text-indigo-400 hover:underline text-sm font-medium">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}