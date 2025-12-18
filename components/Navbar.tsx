
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-slate-950 shadow-xl border-b border-slate-800 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-bold tracking-tight text-white">
          PURVA<span className="text-blue-500">RANE</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-3">
          <a 
            href="/resume.pdf"
            download="Purva_Rane_Resume.pdf"
            className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-slate-500/20"
          >
            Download Resume
          </a>
          <a 
            href="mailto:purvarane.2623@gmail.com"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-blue-500/20"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-widest py-2"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
             <a 
                href="/resume.pdf"
                download="Purva_Rane_Resume.pdf"
                className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-slate-500/20 text-center"
              >
                Download Resume
              </a>


            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
