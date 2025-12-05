import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfServicePage = () => {
  const sections = [
    {
      title: 'Agreement',
      body: 'By using our site or services, you agree to these terms. If you do not agree, please discontinue use.',
    },
    {
      title: 'Services',
      body: 'We provide Human-as-a-Service marketing and operations support. Specific scopes are defined in individual agreements or SOWs.',
    },
    {
      title: 'User Responsibilities',
      body: 'You agree to provide accurate information, maintain account security, and use our services in compliance with applicable laws.',
    },
    {
      title: 'Payments',
      body: 'Unless otherwise specified in an agreement, fees are due per the billing schedule provided. Late payments may incur service suspension.',
    },
    {
      title: 'Intellectual Property',
      body: 'We retain rights to our platform, templates, and processes. You retain rights to your brand assets and provided materials.',
    },
    {
      title: 'Limitations of Liability',
      body: 'To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from use of our services.',
    },
    {
      title: 'Termination',
      body: 'Either party may terminate per the notice in your agreement. Outstanding fees remain payable for work performed.',
    },
    {
      title: 'Changes to Terms',
      body: 'We may update these terms; material changes will be posted here with an updated date.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900 text-white">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-28 left-1/5 w-[500px] h-[500px] bg-[#d100ff] opacity-25 blur-[200px]" aria-hidden="true" />
          <div className="absolute -bottom-36 right-1/6 w-[520px] h-[520px] bg-[#5A00B0] opacity-30 blur-[220px]" aria-hidden="true" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-purple-100 max-w-3xl leading-relaxed">
              Please review these terms before using our site or services.
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

export default TermsOfServicePage;
