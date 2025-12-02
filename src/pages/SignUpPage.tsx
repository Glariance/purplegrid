import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, User, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth, ApiError } from '../context/AuthContext';
import { toast } from '../lib/toast';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register, registering } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      toast.fire({ icon: 'error', title: 'Passwords do not match' });
      return;
    }

    const extractMessages = (error: unknown): string[] => {
      if (error instanceof ApiError) {
        const details = error.details as { errors?: Record<string, string[]> } | string | undefined;
        if (details && typeof details === 'object' && 'errors' in details && details.errors) {
          const allMessages = Object.values(details.errors)
            .flat()
            .filter((msg): msg is string => typeof msg === 'string');
          if (allMessages.length) {
            return allMessages;
          }
        }
        if (typeof details === 'string') return [details];
        return [error.message];
      }
      return ['Could not sign you up. Please try again.'];
    };

    try {
      await register(form);
      toast.fire({ icon: 'success', title: 'Account created. Welcome aboard!' });
      navigate('/dashboard');
    } catch (error) {
      const messages = extractMessages(error);
      toast.fire({ icon: 'error', html: messages.join('<br/>') });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900 text-white">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-24 left-1/4 w-[520px] h-[520px] bg-[#d100ff] opacity-25 blur-[200px] animate-pulse-glow" aria-hidden="true" />
          <div
            className="absolute -bottom-32 right-1/5 w-[560px] h-[560px] bg-[#5A00B0] opacity-30 blur-[220px] animate-pulse-glow"
            style={{ animationDelay: '1.5s' }}
            aria-hidden="true"
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-10">
                  <p className="text-sm uppercase tracking-[0.2em] text-purple-200 mb-3">Onboarding</p>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4">Create your Purple Grid account</h1>
                  <p className="text-lg text-purple-100 leading-relaxed mb-6">
                    Launch faster with a pod that ships strategy, creative, and ops in one place.
                    Create your account to get matched with your team and unlock your dashboard.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-purple-100 border border-white/15">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Secure setup with guided onboarding
                  </div>
                </div>
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-indigo-400/40 rounded-tl-[60px]" />
                  <img
                    src="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Team collaborating during onboarding"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-purple-200 mb-3">Create Account</p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join the Purple Grid</h2>
                <p className="text-lg text-purple-100 leading-relaxed mb-6">
                  Fill in the details below to reserve your spot and we&apos;ll pair you with the right pod.
                </p>
                <div className="space-y-4">
                  {[
                    'Unified login for client dashboard and transparency hub.',
                    'AI-assisted onboarding to map your workflows in minutes.',
                    'Human-led QA on every automation before it goes live.',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-purple-300" />
                      <p className="text-purple-100">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-xl">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Secure onboarding</p>
                    <h2 className="text-2xl font-semibold text-gray-900">Sign up to get started</h2>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <User className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Alex Morgan"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Work Email</label>
                    <div className="relative">
                      <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Company</label>
                    <div className="relative">
                      <Briefcase className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Purple Grid Marketing"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Password</label>
                      <div className="relative">
                        <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                      <div className="relative">
                        <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="password"
                          name="password_confirmation"
                          value={form.password_confirmation}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={registering}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200/50 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {registering ? 'Creating account...' : 'Create account'}
                  </button>
                </form>

                <p className="mt-6 text-sm text-gray-600 text-center">
                  Already with us? <a className="text-purple-600 font-semibold hover:text-purple-700" href="/login">Log in</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
