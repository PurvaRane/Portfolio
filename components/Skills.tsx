
import React, { useState } from 'react';

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    { 
      name: "Languages", 
      icon: "",
      items: ["Python", "Java", "JavaScript", "C", "TypeScript", "SQL"] 
    },
    { 
      name: "Frameworks & Libraries", 
      icon: "",
      items: ["React", "React Native", "Flutter", "TensorFlow", "TensorFlow Lite", "Node.js", "Express.js", "Vite"] 
    },
    { 
      name: "Databases", 
      icon: "",
      items: ["MongoDB", "SQLite", "Firebase", "MySQL", "PostgreSQL"] 
    },
    { 
      name: "Tools & Platforms", 
      icon: "",
      items: ["GitHub", "AWS", "Android Studio", "Git", "Docker", "VS Code", "Postman"] 
    },
    { 
      name: "Core Areas", 
      icon: "",
      items: ["AI/ML", "Cybersecurity", "Problem Solving", "Digital Forensics", "Full-Stack Development"] 
    }
  ];

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">Technical Arsenal</h2>
      <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
        A comprehensive toolkit spanning multiple domains, from AI/ML to full-stack development
      </p>

      {/* Tab Navigation */}
      <div className="mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 md:gap-3 justify-start md:justify-center min-w-max md:min-w-0 px-4 md:px-0 pb-2">
          {categories.map((cat, index) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(index)}
              className={`
                px-4 py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-300 whitespace-nowrap
                flex items-center gap-2 border
                ${activeTab === index 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/30 scale-105' 
                  : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-700'
                }
              `}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.name}</span>
              <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative min-h-[300px] md:min-h-[250px]">
        {categories.map((cat, index) => (
          <div
            key={cat.name}
            className={`
              absolute inset-0 transition-all duration-500 ease-in-out
              ${activeTab === index 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 translate-y-4 pointer-events-none'
              }
            `}
          >
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/50">
                <span className="text-3xl md:text-4xl">{cat.icon}</span>
                <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  {cat.name}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {cat.items.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className="group relative bg-slate-950/50 border border-slate-800 px-3 py-3 md:px-4 md:py-4 rounded-xl text-center
                      hover:bg-gradient-to-br hover:from-blue-600/10 hover:to-indigo-600/10 
                      hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10
                      transition-all duration-300 hover:scale-105 cursor-default
                      animate-fade-in"
                    style={{ animationDelay: `${skillIndex * 50}ms` }}
                  >
                    <span className="text-slate-300 group-hover:text-blue-400 font-medium text-sm md:text-base transition-colors">
                      {skill}
                    </span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Skills;
