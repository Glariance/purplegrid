import React, { useState } from 'react';
import { LogIn, Mail, Lock, Shield } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth, ApiError } from '../context/AuthContext';
import { toast } from '../lib/toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loggingIn } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const extractMessages = (error: unknown): string[] => {
      if (error instanceof ApiError) {
        const details = error.details as { errors?: Record<string, string[]> } | string | undefined;
        if (details && typeof details === 'object' && 'errors' in details && details.errors) {
          const messages = Object.values(details.errors)
            .flat()
            .filter((msg): msg is string => typeof msg === 'string');
          if (messages.length) {
            return messages;
          }
        }
        if (typeof details === 'string') return [details];
        return [error.message];
      }
      return ['Login failed. Check your credentials.'];
    };

    try {
      await login(form.email, form.password);
      toast.fire({ icon: 'success', title: 'Logged in successfully' });
      setForm({ email: '', password: '' });
      const destination =
        (location.state as { from?: string } | null)?.from && typeof (location.state as { from?: string }).from === 'string'
          ? (location.state as { from: string }).from
          : '/dashboard';
      navigate(destination, { replace: true });
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0120] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-28 left-1/5 w-[500px] h-[500px] bg-[#d100ff] opacity-25 blur-[200px] animate-pulse-glow" aria-hidden="true" />
          <div
            className="absolute -bottom-36 right-1/6 w-[520px] h-[520px] bg-[#5A00B0] opacity-30 blur-[220px] animate-pulse-glow"
            style={{ animationDelay: '1.4s' }}
            aria-hidden="true"
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-10">
                  <p className="text-sm uppercase tracking-[0.2em] text-purple-200 mb-3">Client Access</p>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4">Log back into your pod</h1>
                  <p className="text-lg text-purple-100 leading-relaxed mb-6">
                    Access transparency hub, live dashboards, and task pipelines in one place.
                    We keep every login secured with modern encryption and role-based controls.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-purple-100 border border-white/15">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Encrypted access with activity alerts
                  </div>
                </div>
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-indigo-400/40 rounded-tl-[60px]" />
                  <img
                    src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Secure workspace login"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-purple-200 mb-3">Client Access</p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Log in to your pod</h2>
                <p className="text-lg text-purple-100 leading-relaxed mb-6">
                  Use your work email to continue to the dashboard and transparency hub.
                </p>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <Shield className="h-10 w-10 text-purple-200" />
                  <div>
                    <p className="text-purple-100 font-semibold">Security-first</p>
                    <p className="text-sm text-purple-200/80">
                      Sessions are device-bound with alerts for unusual activity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-xl">
                    <LogIn className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Welcome back</p>
                    <h2 className="text-2xl font-semibold text-gray-900">Log in to continue</h2>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
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

                  <div className="flex items-center justify-between text-sm">
                    <label className="inline-flex items-center gap-2 text-gray-600">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      Keep me signed in
                    </label>
                    <a className="text-purple-600 font-semibold hover:text-purple-700" href="/forgot-password">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={loggingIn}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200/50 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loggingIn ? 'Signing in...' : 'Log in'}
                  </button>
                </form>

                <p className="mt-6 text-sm text-gray-600 text-center">
                  New here? <a className="text-purple-600 font-semibold hover:text-purple-700" href="/sign-up">Create an account</a>
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

export default LoginPage;
