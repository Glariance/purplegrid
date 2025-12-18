import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Zap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../lib/toast';

interface LoginPopupProps {
  onClose: () => void;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isClosing, setIsClosing] = useState(false);
  const [csrfLoading, setCsrfLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // Show popup after 2 second delay
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [isOpen]);

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async (): Promise<void> => {
      try {
        // Determine base URL
        let baseUrl = import.meta.env.DEV 
          ? (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api')
          : (import.meta.env.VITE_API_BASE_URL || 'https://admin.purplegridmarketing.com/api');
        
        baseUrl = baseUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
        
        if (!baseUrl || baseUrl.includes('/api')) {
          baseUrl = import.meta.env.DEV ? 'http://localhost:8000' : 'https://admin.purplegridmarketing.com';
        }

        const csrfUrl = `${baseUrl}/csrf-token`;
        console.log('🔑 Fetching CSRF token from:', csrfUrl);

        const response = await fetch(csrfUrl, {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });

        console.log('📡 CSRF token response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ CSRF token received:', data.csrf_token ? `Yes (${data.csrf_token.substring(0, 10)}...)` : 'No');
          if (data.csrf_token) {
            setCsrfToken(data.csrf_token);
            setCsrfLoading(false);
          } else {
            console.error('❌ CSRF token is empty in response');
            setCsrfLoading(false);
          }
        } else {
          const errorText = await response.text().catch(() => 'Could not read error');
          console.error('❌ CSRF token fetch failed:', response.status, errorText);
          setCsrfLoading(false);
        }
      } catch (error) {
        console.error('❌ Failed to fetch CSRF token:', error);
        setCsrfLoading(false);
      }
    };

    fetchCsrfToken();
  }, []);

  const validateForm = (): string[] | null => {
    const errors: string[] = [];

    if (!formData.email || formData.email.trim() === '') {
      errors.push('Please enter your email address');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
      }
    }

    if (!formData.password || formData.password.trim() === '') {
      errors.push('Please enter your password');
    }

    if (errors.length > 0) {
      return errors;
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Client-side validation
    const validationErrors = validateForm();
    if (validationErrors) {
      const errorsHtml = validationErrors.map(error => `• ${error}`).join('<br>');
      toast.fire({
        icon: 'error',
        title: 'Please complete all required fields',
        html: errorsHtml,
      });
      return;
    }

    if (!csrfToken && !csrfLoading) {
      toast.fire({
        icon: 'error',
        title: 'CSRF token not loaded',
        html: 'Please refresh the page and try again.',
      });
      return;
    }

    if (csrfLoading) {
      toast.fire({
        icon: 'info',
        title: 'Loading...',
        html: 'Please wait while we prepare the login form.',
        timer: 2000,
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Determine base URL (admin login is a web route, not API route)
      // Remove /api from the URL if present
      let baseUrl = import.meta.env.DEV 
        ? (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api')
        : (import.meta.env.VITE_API_BASE_URL || 'https://admin.purplegridmarketing.com/api');
      
      // Remove /api from the end if it exists
      baseUrl = baseUrl.replace(/\/api\/?$/, '');
      
      // Ensure no trailing slash
      baseUrl = baseUrl.replace(/\/$/, '');
      
      // If still empty or invalid, use defaults
      if (!baseUrl || baseUrl.includes('/api')) {
        baseUrl = import.meta.env.DEV ? 'http://localhost:8000' : 'https://admin.purplegridmarketing.com';
      }

      // Use API route to avoid guest middleware redirect issues
      const apiBaseUrl = import.meta.env.DEV 
        ? (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api')
        : (import.meta.env.VITE_API_BASE_URL || 'https://admin.purplegridmarketing.com/api');
      
      const apiUrl = apiBaseUrl.replace(/\/$/, '');
      
      // Create JSON payload for API route (no CSRF token needed for API routes)
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      // Check response status first
      console.log('Login response status:', response.status, response.statusText);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      console.log('Set-Cookie header:', response.headers.get('set-cookie'));
      console.log('All cookies:', document.cookie);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type') || '';
      let data;
      
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Response is HTML (likely an error page or redirect)
        const text = await response.text();
        console.error('Non-JSON response received. Status:', response.status);
        console.error('Response preview:', text.substring(0, 500));
        
        // Determine error message based on status code
        let errorMessage = 'Login failed. Please try again.';
        if (response.status === 419) {
          errorMessage = 'CSRF token mismatch. Please refresh the page and try again.';
        } else if (response.status === 422) {
          errorMessage = 'Validation error. Please check your credentials.';
        } else if (response.status === 302 || response.status === 301) {
          errorMessage = 'Unexpected redirect. Please check your credentials.';
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        toast.fire({
          icon: 'error',
          title: 'Login failed',
          html: errorMessage,
        });
        return;
      }

      if (response.ok && data.success) {
        // Close popup with animation
        handleClose();
        
        // Show success message briefly
        toast.fire({ 
          icon: 'success', 
          title: 'Logged in successfully',
          timer: 1000,
        });
        
        // Get redirect URL - use web base URL for redirect (not API)
        const webBaseUrl = apiBaseUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
        const redirectUrl = data.redirect_to || 
          (data.user_type === 'admin' ? `${webBaseUrl}/admin/dashboard` : `${webBaseUrl}/dashboard`);
        
        // Wait longer to ensure session cookie is fully set and saved
        // The session cookie needs time to be set by the browser
        setTimeout(() => {
          console.log('Redirecting to:', redirectUrl);
          console.log('Cookies before redirect:', document.cookie);
          
          // Check if session cookie is present (check for both possible cookie names)
          const hasSessionCookie = document.cookie.includes('purple_grid_marketing_session') || 
                                   document.cookie.includes('laravel_session') || 
                                   document.cookie.includes('XSRF-TOKEN');
          
          if (!hasSessionCookie) {
            console.warn('Session cookie not found, waiting a bit longer...');
            setTimeout(() => {
              window.location.replace(redirectUrl);
            }, 500);
          } else {
            // Use window.location.replace to avoid adding to history
            window.location.replace(redirectUrl);
          }
        }, 1500);
        
        return; // Exit early to prevent further execution
      } else {
        const errorMessage = data.errors || data.message || 'Invalid email or password';
        const errorText = typeof errorMessage === 'string' ? errorMessage : 'Invalid email or password';
        toast.fire({
          icon: 'error',
          title: 'Login failed',
          html: errorText,
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.fire({
        icon: 'error',
        title: 'An error occurred',
        html: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500); // Match bounce-out animation duration
  };

  if (!isOpen && !isClosing) return null;
  if (!showPopup && !isClosing) return null;

  return (
    <div 
      className={`fixed inset-0 z-40 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 ${
        isClosing 
          ? 'bg-black/0 opacity-0 pointer-events-none' 
          : 'bg-black/70 opacity-100'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-lg md:max-w-2xl overflow-hidden rounded-3xl flex flex-col md:flex-row ${
          isClosing
            ? 'animate-bounce-out'
            : showPopup
            ? 'animate-bounce-in'
            : 'opacity-0 scale-50 translate-y-[-100px]'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(to right, #1B0032 0%, #D100FF 100%)',
          border: '2px solid rgba(209, 0, 255, 0.5)',
          boxShadow: '0 0 40px rgba(209, 0, 255, 0.6), 0 0 80px rgba(27, 0, 50, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
        }}
      >
        
        {/* Left Side: Visual/Context (Hidden on Mobile) */}
        <div className="hidden md:flex md:w-1/3 p-8 flex-col justify-between relative overflow-hidden" style={{
          background: 'linear-gradient(180deg, rgba(27, 0, 50, 0.5) 0%, rgba(209, 0, 255, 0.3) 100%)',
        }}>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(209, 0, 255, 0.5) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}></div>
          <div className="z-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center mb-4 border border-white/30" style={{
              boxShadow: '0 0 15px rgba(209, 0, 255, 0.5)',
            }}>
              <Zap className="text-white w-5 h-5" style={{ filter: 'drop-shadow(0 0 5px rgba(209, 0, 255, 1))' }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ textShadow: '0 0 10px rgba(209, 0, 255, 0.8)' }}>Purple Grid</h3>
            <p className="text-white/80 text-sm">Real-time Amazon intelligence powered by proprietary grid systems.</p>
          </div>
          <div className="z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center" style={{
                boxShadow: '0 0 10px rgba(209, 0, 255, 0.5)',
              }}>
                <CheckCircle2 className="w-4 h-4 text-white" style={{ filter: 'drop-shadow(0 0 3px rgba(209, 0, 255, 1))' }} />
              </div>
              <span className="text-xs text-white font-medium">8.2x Avg. ROAS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center" style={{
                boxShadow: '0 0 10px rgba(209, 0, 255, 0.5)',
              }}>
                <Users className="w-4 h-4 text-white" style={{ filter: 'drop-shadow(0 0 3px rgba(209, 0, 255, 1))' }} />
              </div>
              <span className="text-xs text-white font-medium">500+ Stores Scaled</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 p-8 md:p-10 relative">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            style={{
              boxShadow: '0 0 10px rgba(209, 0, 255, 0.3)',
            }}
          >
            <X className="w-5 h-5" />
          </button>

          <header className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight" style={{
              textShadow: '0 0 15px rgba(209, 0, 255, 0.8), 0 0 30px rgba(139, 0, 255, 0.5)',
            }}>
              Unlock Winning Products Now
            </h2>
            <p className="text-white/80">
              Get data-validated product ideas and expert Amazon store guidance.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                id="email"
                placeholder="jane@company.com"
                className="w-full bg-white/10 backdrop-blur-sm border border-white/30 focus:border-[#D100FF] focus:ring-2 focus:ring-[#D100FF]/50 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/50 text-white"
                style={{
                  boxShadow: '0 0 10px rgba(209, 0, 255, 0.2)',
                }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                id="password"
                placeholder="Enter your password"
                className="w-full bg-white/10 backdrop-blur-sm border border-white/30 focus:border-[#D100FF] focus:ring-2 focus:ring-[#D100FF]/50 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-white/50 text-white"
                style={{
                  boxShadow: '0 0 10px rgba(209, 0, 255, 0.2)',
                }}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
                style={{
                  background: 'linear-gradient(to right, #1B0032 0%, #D100FF 100%)',
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    "Get My Winning Products"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D100FF] to-[#5A00B0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <p className="text-center text-xs text-white/70 mt-3 font-medium">
                No obligation. Just insights.
              </p>
              
              {/* Links below button */}
              <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    setTimeout(() => navigate('/sign-up'), 300);
                  }}
                  className="text-white/80 hover:text-white transition-colors font-medium"
                  style={{
                    textShadow: '0 0 5px rgba(209, 0, 255, 0.5)',
                  }}
                >
                  Register
                </button>
                <span className="text-white/50">•</span>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    setTimeout(() => navigate('/forgot-password'), 300);
                  }}
                  className="text-white/80 hover:text-white transition-colors font-medium"
                  style={{
                    textShadow: '0 0 5px rgba(209, 0, 255, 0.5)',
                  }}
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </form>

          <footer className="mt-8 pt-6 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" style={{ filter: 'drop-shadow(0 0 3px rgba(209, 0, 255, 0.8))' }} />
              <span className="text-[10px] text-white/70 leading-tight">Amazon-focused specialists</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0" style={{
                boxShadow: '0 0 8px rgba(209, 0, 255, 0.5)',
              }}>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
              <span className="text-[10px] text-white/70 leading-tight">No spam. 100% confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white shrink-0" style={{ filter: 'drop-shadow(0 0 3px rgba(209, 0, 255, 0.8))' }} />
              <span className="text-[10px] text-white/70 leading-tight">Real humans. Real data.</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

