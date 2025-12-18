
import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">Work Experience</h2>
      <div className="space-y-12">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="relative pl-8 border-l-2 border-slate-800">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-slate-950"></div>
            <div className="mb-2 flex flex-wrap justify-between items-center gap-2">
              <h3 className="text-xl font-bold text-white">{exp.role}</h3>
              <span className="text-blue-400 font-mono text-sm">{exp.duration}</span>
            </div>
            <div className="text-blue-400/80 font-semibold mb-4">{exp.company}, {exp.location}</div>
            
            <ul className="space-y-3 mb-6">
              {exp.responsibilities.map((task, i) => (
                <li key={i} className="text-slate-400 flex items-start">
                  <span className="text-blue-500/50 mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {task}
                </li>
              ))}
            </ul>
            
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
              <p className="text-sm italic text-slate-300">
                <strong className="text-blue-400 not-italic">Outcome:</strong> {exp.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
