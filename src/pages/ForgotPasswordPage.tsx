import React, { useState } from 'react';
import { Mail, ShieldCheck, Send, Copy } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestPasswordReset } from '../lib/api';
import { toast } from '../lib/toast';
import { ApiError } from '../context/AuthContext';

const ForgotPasswordPage = () => {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [issuedToken, setIssuedToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
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
      return ['Could not send reset link. Please try again.'];
    };

    setLoading(true);
    setIssuedToken(null);
    requestPasswordReset(email)
      .then((res) => {
        setStatus('sent');
        setIssuedToken(res.token ?? null);
        toast.fire({ icon: 'success', title: 'Reset link sent (check your email).' });
      })
      .catch((error) => {
        const messages = extractMessages(error);
        toast.fire({ icon: 'error', html: messages.join('<br/>') });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900 text-white">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-28 left-1/5 w-[520px] h-[520px] bg-[#d100ff] opacity-25 blur-[200px] animate-pulse-glow" aria-hidden="true" />
          <div
            className="absolute -bottom-36 right-1/6 w-[520px] h-[520px] bg-[#5A00B0] opacity-30 blur-[220px] animate-pulse-glow"
            style={{ animationDelay: '1.4s' }}
            aria-hidden="true"
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-10">
                  <p className="text-sm uppercase tracking-[0.2em] text-purple-200 mb-3">Reset access</p>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4">Forgot your password?</h1>
                  <p className="text-lg text-purple-100 leading-relaxed mb-6">
                    Enter the work email tied to your account. We will send a secure reset link so you can get back in quickly.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-purple-100 border border-white/15">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Security-checked reset flow
                  </div>
                </div>
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-indigo-400/40 rounded-tl-[60px]" />
                  <img
                    src="https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Team member receiving secure email"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-xl">
                    <Send className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Secure reset</p>
                    <h2 className="text-2xl font-semibold text-gray-900">Send reset link</h2>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Work Email</label>
                    <div className="relative">
                      <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                    {loading ? 'Sending...' : 'Email reset link'}
                  </button>
                </form>

                {status === 'sent' && (
                  <div className="mt-4 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-green-700 text-sm">
                    If that email exists, a reset link is on its way. Check your inbox and spam folders.
                  </div>
                )}

                {issuedToken && (
                  <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 text-purple-800 text-sm space-y-2">
                    <p className="font-semibold">Development helper:</p>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs break-all">{issuedToken}</code>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(issuedToken);
                          toast.fire({ icon: 'success', title: 'Token copied' });
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-white text-purple-700 px-3 py-1 border border-purple-200 hover:bg-purple-100 transition-colors text-xs"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                <p className="mt-6 text-sm text-gray-600 text-center">
                  Remembered it? <a className="text-purple-600 font-semibold hover:text-purple-700" href="/login">Log in</a>
                </p>
              </div>

              <div className="space-y-4 text-purple-100">
                {[
                  'We only send reset links to verified work emails.',
                  'Each link expires quickly for security; request a new one if needed.',
                  'Multi-factor prompts remain in place after reset.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-purple-200 mt-0.5" />
                    <p className="text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
