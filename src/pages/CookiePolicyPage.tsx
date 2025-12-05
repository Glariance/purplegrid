import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiePolicyPage = () => {
  const sections = [
    {
      title: 'What Are Cookies',
      body: 'Cookies are small text files stored on your device to help the site function and improve your experience.',
    },
    {
      title: 'How We Use Cookies',
      body: 'We use essential cookies for site functionality, preference cookies to remember your settings, and analytics cookies to understand site usage.',
    },
    {
      title: 'Managing Cookies',
      body: 'You can disable cookies in your browser settings. Note that some features may not work correctly if cookies are disabled.',
    },
    {
      title: 'Third-Party Cookies',
      body: 'Some analytics and chat tools may set their own cookies. These are governed by their respective privacy policies.',
    },
    {
      title: 'Updates',
      body: 'We may update this policy; changes will be reflected with an updated date below.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900 text-white">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-28 left-1/5 w-[500px] h-[500px] bg-[#d100ff] opacity-25 blur-[200px]" aria-hidden="true" />
          <div className="absolute -bottom-36 right-1/6 w-[520px] h/[520px] bg-[#5A00B0] opacity-30 blur/[220px]" aria-hidden="true" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-lg text-purple-100 max-w-3xl leading-relaxed">
              How we use cookies and how you can control them.
            </p>
          </div>
        </section>

        <section className="relative z-10 bg-white text-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.body}</p>
              </div>
            ))}
            <p className="text-sm text-gray-500">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
