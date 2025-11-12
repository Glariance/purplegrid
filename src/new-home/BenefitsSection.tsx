import React from 'react';
import { Clock, Database, Phone, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: '24/7 Lead Follow-Up',
    description: 'Never miss an opportunity with round-the-clock human engagement powered by AI optimization.'
  },
  {
    icon: Database,
    title: 'Centralized CRM Grid',
    description: 'All your data, contacts, and campaigns unified in one intelligent system.'
  },
  {
    icon: Phone,
    title: 'AI-Augmented Cold Calling',
    description: 'Human connection enhanced with real-time AI insights and conversation intelligence.'
  },
  {
    icon: BarChart3,
    title: 'Transparent Results Dashboard',
    description: 'Monitor performance metrics in real time with full visibility into your marketing ROI.'
  }
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#2D0052] to-black" />

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D100FF] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D100FF] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Why{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A00B0] to-[#D100FF]">
              Purple Grid
            </span>
            ?
          </h2>
          <p className="text-2xl text-[#E0E0E0] font-light">Built for performance. Powered by humans.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative bg-gradient-to-br from-[#1B0032]/50 to-black/50 backdrop-blur-sm border border-[#5A00B0]/30 rounded-2xl p-10 hover:border-[#D100FF] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D100FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10 flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#5A00B0] to-[#D100FF] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-[#E0E0E0] font-light leading-relaxed">{benefit.description}</p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D100FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
