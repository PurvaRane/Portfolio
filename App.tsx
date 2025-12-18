
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Reviews from './components/Reviews';
import { trackPageView } from './services/analytics';

const App: React.FC = () => {
  // Track page view on mount
  useEffect(() => {
    trackPageView({ page: 'portfolio' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Hero />
        
        <section id="about" className="py-20 scroll-mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">About Me</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Computer Science undergraduate at <strong>COEP Technological University</strong> with strong hands-on experience in AI-driven systems, full-stack development, and real-world problem solving. 
              I am passionate about building deployable, scalable solutions and have a proven record in national-level hackathons and research-focused projects.
            </p>
          </div>
        </section>

        <section id="experience" className="py-20 scroll-mt-16">
          <Experience />
        </section>

        <section id="projects" className="py-20 scroll-mt-16">
          <Projects />
        </section>

        <section id="skills" className="py-20 scroll-mt-16">
          <Skills />
        </section>

        <section id="education" className="py-20 scroll-mt-16">
          <Education />
        </section>

        <section id="achievements" className="py-20 scroll-mt-16">
          <Achievements />
        </section>

        <section id="certifications" className="py-20 scroll-mt-16">
          <Certifications />
        </section>

        <section id="reviews" className="py-20 scroll-mt-16">
          <Reviews />
        </section>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          {/* Contact Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center text-blue-400 mb-6">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {/* Personal Email */}
              <a 
                href="mailto:purvarane.2623@gmail.com" 
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 p-4 rounded-lg transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400 text-xl"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 mb-1">Personal Email</p>
                    <p className="text-sm text-slate-200 group-hover:text-blue-400 transition truncate">purvarane.2623@gmail.com</p>
                  </div>
                </div>
              </a>

              {/* College Email */}
              <a 
                href="mailto:ranepn25.comp@coeptech.ac.in" 
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 p-4 rounded-lg transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400 text-xl"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 mb-1">College Email</p>
                    <p className="text-sm text-slate-200 group-hover:text-blue-400 transition truncate">ranepn25.comp@coeptech.ac.in</p>
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/purva-rane" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 p-4 rounded-lg transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400 text-xl"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 mb-1">LinkedIn</p>
                    <p className="text-sm text-slate-200 group-hover:text-blue-400 transition">View Profile</p>
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/PurvaRane" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 p-4 rounded-lg transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400 text-xl"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 mb-1">GitHub</p>
                    <p className="text-sm text-slate-200 group-hover:text-blue-400 transition">View Repositories</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
