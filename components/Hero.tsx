
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-12 lg:pt-24 flex flex-col items-center text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 mb-8 shadow-2xl">
       <img 
  src="/profile.jpg"
  alt="Purva Rane" 
  className="w-full h-full rounded-full object-cover border-4 border-slate-950"
/>

      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
        Purva <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Rane</span>
      </h1>

      <p className="text-xl md:text-2xl text-blue-400 font-medium mb-8 max-w-2xl">
        B.Tech Computer Science Student • AI/ML Enthusiast • Full-Stack Developer
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm flex items-center">
           Pune / Chiplun
        </span>
        <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm flex items-center">
           purvarane.2623@gmail.com
        </span>
        <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm flex items-center">
           1st Dan Black Belt (Taekwondo)
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
          View Projects
        </a>
        <a href="https://www.linkedin.com/in/purva-rane26/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-bold transition-all border border-slate-700">
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Hero;
