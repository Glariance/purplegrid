import React, { useState } from 'react';
import { UserPlus, LogIn, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

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
    setIsOpen(false);
  };

  const goTo = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/65 backdrop-blur-lg shadow-lg transition-colors duration-300 hover:bg-white/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
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
                onClick={() => goTo('/about')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => goTo('/contact')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => goTo('/blog')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Blog
              </button>
              <button
                type="button"
                onClick={() => goTo('/case-studies')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Case Studies
              </button>
              <button
                type="button"
                onClick={() => goTo('/process-flow')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Process Flow
              </button>
              <button
                type="button"
                onClick={() => goTo('/knowledge-base')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Knowledge Base
              </button>
            </nav>

            {/* CTA Buttons */}
            <div className="flex justify-center md:justify-end gap-3">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => goTo('/dashboard')}
                    className="inline-flex items-center gap-2 rounded-lg bg-purple-50 text-purple-800 px-4 py-2 font-semibold border border-purple-100 hover:bg-purple-100 transition-colors"
                  >
                    Welcome, {user.name}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <LogIn className="h-5 w-5 rotate-180" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => goTo('/sign-up')}
                    className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <UserPlus className="h-5 w-5" />
                    Sign Up
                  </button>
                  <button
                    onClick={() => goTo('/login')}
                    className="flex items-center gap-2 border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-purple-800 hover:bg-purple-50 transition-colors"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-3 rounded-2xl border border-purple-100 bg-white/95 shadow-lg backdrop-blur-md">
            <nav className="flex flex-col divide-y divide-purple-50">
              <button
                type="button"
                onClick={() => scrollToSection('home')}
                className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-purple-700 hover:bg-purple-50/80 transition-colors"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => goTo('/about')}
                className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-purple-700 hover:bg-purple-50/80 transition-colors"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => goTo('/contact')}
                className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-purple-700 hover:bg-purple-50/80 transition-colors"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => goTo('/blog')}
                className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-purple-700 hover:bg-purple-50/80 transition-colors"
              >
                Blog
              </button>
              <button
                type="button"
                onClick={() => goTo('/case-studies')}
                className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-purple-700 hover:bg-purple-50/80 transition-colors"
              >
                Case Studies
              </button>
              <button
                type="button"
                onClick={() => goTo('/process-flow')}
                className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-purple-700 hover:bg-purple-50/80 transition-colors"
              >
                Process Flow
              </button>
              <button
                type="button"
                onClick={() => goTo('/knowledge-base')}
                className="py-3 px-4 text-center text-gray-900 font-semibold hover:text-purple-700 hover:bg-purple-50/80 transition-colors"
              >
                Knowledge Base
              </button>
            </nav>
            <div className="grid grid-cols-1 gap-3 p-4">
              {user ? (
                <>
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-purple-50 text-purple-800 px-5 py-2 font-semibold border border-purple-100">
                    Welcome, {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <LogIn className="h-5 w-5 rotate-180" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => goTo('/sign-up')}
                    className="flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <UserPlus className="h-5 w-5" />
                    Sign Up
                  </button>
                  <button
                    onClick={() => goTo('/login')}
                    className="flex items-center justify-center gap-2 border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
