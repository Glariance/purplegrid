import React from 'react';
import { UserPlus, LogIn } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
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
    <header className="sticky top-0 z-50 bg-white/65 backdrop-blur-lg shadow-lg transition-colors duration-300 hover:bg-white/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <img
              src="/logo.png"
              alt="Purple Grid logo"
              className="h-40 w-40 object-contain"
            />
            {/* <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-purple-800 leading-none">Purple Grid</h1>
              <p className="text-sm text-purple-600">Marketing</p>
            </div> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-base">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigate('/about')}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
          >
            Blog
          </button>
          <button
            type="button"
            onClick={() => navigate('/case-studies')}
            className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
          >
            Case Studies
          </button>
          <button
            type="button"
            onClick={() => navigate('/process-flow')}
            className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
          >
            Process Flow
          </button>
          <button
            type="button"
            onClick={() => navigate('/knowledge-base')}
            className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
          >
            Knowledge Base
          </button>
        </nav>

          {/* CTA Buttons */}
          <div className="flex justify-center md:justify-end gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <UserPlus className="h-5 w-5" />
              Sign Up
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <LogIn className="h-5 w-5" />
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
