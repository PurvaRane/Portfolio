
import React from 'react';
import { CERTIFICATIONS } from '../constants';

const Certifications: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">Certifications & Training</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {CERTIFICATIONS.map((cert, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{cert.date}</span>
              </div>
              <div className="text-blue-400 font-semibold mb-4">{cert.issuer}</div>
              <ul className="space-y-2">
                {cert.details.map((detail, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start">
                    <span className="text-blue-500 mr-2">✦</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
