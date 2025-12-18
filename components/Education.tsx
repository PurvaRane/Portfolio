
import React from 'react';
import { EDUCATION } from '../constants';

const Education: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">Education</h2>
      <div className="space-y-8">
        {EDUCATION.map((edu, idx) => (
          <div key={idx} className="group relative p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-900 transition-all">
            <div className="flex flex-wrap justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-blue-400">{edu.degree}</h3>
              <span className="text-sm font-mono text-slate-500">{edu.duration}</span>
            </div>
            <div className="text-white font-medium mb-2">{edu.institution}</div>
            {edu.percentage && (
              <div className="text-green-400 font-bold text-sm mb-2">Result: {edu.percentage}</div>
            )}
            {edu.details && (
              <p className="text-slate-400 text-sm leading-relaxed">{edu.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
