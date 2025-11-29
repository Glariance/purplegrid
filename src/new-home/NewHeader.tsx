import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, LogIn, Menu, X } from 'lucide-react';

const NewHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/home-logo.png"
              alt="Purple Grid logo"
              className="
                      h-15 w-20 object-contain            /* mobile default (small) */
                      sm:h-12 sm:w-16                     /* small phones / large phones */
                      md:h-16 md:w-20                     /* tablets */
                      lg:h-20 lg:w-24                     /* laptops */
                      xl:h-24 xl:w-32                     /* desktops (normal/larger) */
                    "
            />
          </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
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

          <div className="flex items-center justify-center gap-3">
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

        {/* Mobile burger */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md border border-[#d3b7e6] bg-white/85 p-2 text-[#5A00B0] hover:bg-white transition-colors shadow-sm"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-5 w-5" strokeWidth={1.6} /> : <Menu className="h-5 w-5" strokeWidth={1.6} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute left-3 right-3 mt-2 rounded-2xl border border-[#d3b7e6] bg-white/95 shadow-xl backdrop-blur-md">
          <nav className="flex flex-col divide-y divide-[#f0e7f8]">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-[#5A00B0] hover:bg-[#f7f1fc] transition-colors"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigate('/about')}
              className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-[#5A00B0] hover:bg-[#f7f1fc] transition-colors"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-[#5A00B0] hover:bg-[#f7f1fc] transition-colors"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-[#5A00B0] hover:bg-[#f7f1fc] transition-colors"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => navigate('/case-studies')}
              className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-[#5A00B0] hover:bg-[#f7f1fc] transition-colors"
            >
              Case Studies
            </button>
            <button
              type="button"
              onClick={() => navigate('/process-flow')}
              className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-[#5A00B0] hover:bg-[#f7f1fc] transition-colors"
            >
              Process Flow
            </button>
            <button
              type="button"
              onClick={() => navigate('/knowledge-base')}
              className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-[#5A00B0] hover:bg-[#f7f1fc] transition-colors"
            >
              Knowledge Base
            </button>
          </nav>
          <div className="grid grid-cols-1 gap-3 p-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#5A00B0] to-[#D100FF] text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform"
            >
              <UserPlus className="h-5 w-5" />
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 border border-[#D100FF] text-[#5A00B0] px-5 py-2 rounded-lg hover:bg-[#f7f1fc] transition-colors"
            >
              <LogIn className="h-5 w-5" />
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NewHeader;
