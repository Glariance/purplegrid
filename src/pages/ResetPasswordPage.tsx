import React, { useState } from 'react';
import { Lock, Shield, CheckCircle, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { resetPassword } from '../lib/api';
import { toast } from '../lib/toast';
import { ApiError } from '../context/AuthContext';

const ResetPasswordPage = () => {
  const [status, setStatus] = useState<'idle' | 'saved'>('idle');
  const [form, setForm] = useState({
    email: '',
    token: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);

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
          if (messages.length) return messages;
        }
        if (typeof details === 'string') return [details];
        return [error.message];
      }
      return ['Could not reset password. Please try again.'];
    };

    setLoading(true);
    try {
      await resetPassword(form);
      setStatus('saved');
      toast.fire({ icon: 'success', title: 'Password reset successfully. Please log in.' });
    } catch (error) {
      const messages = extractMessages(error);
      toast.fire({ icon: 'error', html: messages.join('<br/>') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900 text-white">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-24 left-1/4 w-[520px] h/[520px] bg-[#d100ff] opacity-25 blur/[200px] animate-pulse-glow" aria-hidden="true" />
          <div
            className="absolute -bottom-36 right-1/6 w/[520px] h/[520px] bg-[#5A00B0] opacity-30 blur/[220px] animate-pulse-glow"
            style={{ animationDelay: '1.4s' }}
            aria-hidden="true"
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-10">
                  <p className="text-sm uppercase tracking-[0.2em] text-purple-200 mb-3">Reset password</p>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4">Set a new password</h1>
                  <p className="text-lg text-purple-100 leading-relaxed mb-6">
                    Choose a strong password to protect your account. Once saved, you will be directed to log in again.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-purple-100 border border-white/15">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Token-validated reset flow
                  </div>
                </div>
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-indigo-400/40 rounded-tl/[60px]" />
                  <img
                    src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Secure password update"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-xl">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Secure update</p>
                    <h2 className="text-2xl font-semibold text-gray-900">Enter new password</h2>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Reset Token</label>
                    <input
                      type="text"
                      name="token"
                      required
                      value={form.token}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Paste the token from your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                      <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        name="password"
                        required
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
                        required
                        value={form.password_confirmation}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200/50 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Save new password'}
                  </button>
                </form>

                {status === 'saved' && (
                  <div className="mt-4 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-green-700 text-sm">
                    Password updated. You can now sign in with your new credentials.
                  </div>
                )}

                <p className="mt-6 text-sm text-gray-600 text-center">
                  Back to <a className="text-purple-600 font-semibold hover:text-purple-700" href="/login">Login</a>
                </p>
              </div>

              <div className="space-y-4 text-purple-100">
                {[
                  'Do not share your reset token; it expires after one use.',
                  'Use at least 12 characters with a mix of letters, numbers, and symbols.',
                  'We will prompt for multi-factor where enabled after reset.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-purple-200 mt-0.5" />
                    <p className="text-base leading-relaxed">{item}</p>
                  </div>
                ))}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <CheckCircle className="h-6 w-6 text-emerald-300" />
                  <div>
                    <p className="text-purple-100 font-semibold">Stay protected</p>
                    <p className="text-sm text-purple-200/80">
                      We monitor for unusual access and will alert you if anything looks off.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
