import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#2D0052]" />

      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-[#D100FF] rounded-full blur-[200px] opacity-10 animate-pulse-glow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="relative bg-gradient-to-br from-[#1B0032]/80 to-black/80 backdrop-blur-sm border border-[#D100FF]/30 rounded-3xl p-12 md:p-16 box-glow">
          <div className="absolute -top-6 left-12">
            <div className="w-12 h-12 bg-gradient-to-br from-[#5A00B0] to-[#D100FF] rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </div>

          <blockquote className="text-center">
            <p className="text-3xl md:text-4xl font-light text-white mb-8 leading-relaxed">
              &quot;Our marketing finally runs like a machine - with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A00B0] to-[#D100FF] font-semibold">
                real humans
              </span>{' '}
              behind it.&quot;
            </p>
            <footer className="text-[#E0E0E0] text-lg">
              <span className="font-semibold">Sarah Mitchell</span>
              <span className="mx-2">•</span>
              <span className="font-light">CEO, TechVentures Global</span>
            </footer>
          </blockquote>

          <div className="absolute -bottom-6 right-12">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D100FF] to-[#5A00B0] rounded-full flex items-center justify-center rotate-180">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
