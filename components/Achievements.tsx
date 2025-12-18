
import React from 'react';

const Achievements: React.FC = () => {
  const awards = [
    { title: "SIH 2025 Grand Finalist", subtitle: "National Level Hackathon", desc: "Runner-Up in a 36-hour challenge." },
    { title: "1st Rank - SHODH 2024", subtitle: "Digital Forensics", desc: "Secured top position in technical paper presentation." },
    { title: "1st Rank - TechExplorer 2025", subtitle: "Project Presentation", desc: "Recognized for leading winning technical project." },
    { title: "Taekwondo Black Belt", subtitle: "1st Dan (A+ Grade)", desc: "Certified from South Korea; martial arts discipline." }
  ];

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">Achievements & Activities</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {awards.map((award, idx) => (
          <div key={idx} className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-xl hover:border-blue-500/50 transition">
            <div className="text-blue-500 mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{award.title}</h3>
            <div className="text-blue-400 text-xs font-bold uppercase mb-3 tracking-wider">{award.subtitle}</div>
            <p className="text-slate-400 text-sm">{award.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-6">Additional Engagement</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-blue-400 font-bold text-xs uppercase mb-3">Hackathons</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>• CodeCratz 2025: Built event system with QR attendance.</li>
              <li>• CodeBits 3.0: AI-powered education ecosystem developer.</li>
              <li>• Smart India Hackathon 2024: Proposed WiseTrack system.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-blue-400 font-bold text-xs uppercase mb-3">Interests</h4>
            <ul className="flex flex-wrap gap-2">
              {["Debating", "Cybersecurity", "Public Speaking", "Event Management", "Exploring VR/AI"].map(item => (
                <li key={item} className="bg-slate-950 px-2 py-1 rounded border border-slate-800 text-xs text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
