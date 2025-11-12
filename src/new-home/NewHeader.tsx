import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, LogIn } from 'lucide-react';

const NewHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const normalizedId = sectionId.replace(/^#/, '');
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: normalizedId } });
      return;
    }
    const target = document.getElementById(normalizedId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/45 backdrop-blur-xl border-b border-[#5A00B0]/30 transition-opacity duration-300 hover:bg-black/35">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between lg:justify-start gap-3">
          <img
            src="/home-logo.png"
            alt="Purple Grid logo"
            className="h-40 w-40 object-contain drop-shadow-[0_0_35px_rgba(209,0,255,0.35)]"
          />
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 text-base">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="text-gray-200 hover:text-[#D100FF] transition-colors font-medium"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => navigate('/about')}
            className="text-gray-200 hover:text-[#D100FF] transition-colors font-medium"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="text-gray-200 hover:text-[#D100FF] transition-colors font-medium"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="text-gray-200 hover:text-[#D100FF] transition-colors font-medium"
          >
            Blog
          </button>
          <button
            type="button"
            onClick={() => navigate('/case-studies')}
            className="text-gray-200 hover:text-[#D100FF] transition-colors font-medium"
          >
            Case Studies
          </button>
          <button
            type="button"
            onClick={() => navigate('/process-flow')}
            className="text-gray-200 hover:text-[#D100FF] transition-colors font-medium"
          >
            Process Flow
          </button>
          <button
            type="button"
            onClick={() => navigate('/knowledge-base')}
            className="text-gray-200 hover:text-[#D100FF] transition-colors font-medium"
          >
            Knowledge Base
          </button>
        </nav>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-gradient-to-r from-[#5A00B0] to-[#D100FF] text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            <UserPlus className="h-5 w-5" />
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 border border-[#D100FF] text-white px-5 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LogIn className="h-5 w-5" />
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
