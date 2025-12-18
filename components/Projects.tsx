
import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-12">
        <div className="h-px bg-blue-500/30 flex-grow mr-4"></div>
        <h2 className="text-3xl font-bold text-white whitespace-nowrap uppercase tracking-widest">Projects</h2>
        <div className="h-px bg-blue-500/30 flex-grow ml-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <div 
            key={idx} 
            className="group bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-blue-500 transition-all duration-300"></div>
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition">{project.title}</h3>
              <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">{project.date}</span>
            </div>
            
            <p className="text-slate-400 mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>

            <ul className="space-y-2 mb-4">
              {project.achievements.map((item, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
