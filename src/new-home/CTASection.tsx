import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate('/contact');
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1B0032] to-black" />

      <div className="absolute inset-0 opacity-10">
        <img src="/Purple grid-02.png" alt="Purple Grid Background" className="w-full h-full object-contain opacity-30" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#D100FF] rounded-full blur-[180px] opacity-20 animate-pulse-glow" />
        <div
          className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-[#5A00B0] rounded-full blur-[180px] opacity-20 animate-pulse-glow"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          Ready to Power Your Business
          <span className="block mt-2">
            with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A00B0] to-[#D100FF] text-glow">
              The Grid
            </span>
            ?
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-[#E0E0E0] mb-12 font-light max-w-3xl mx-auto">
          Let's build your marketing engine - efficient, intelligent, and human.
        </p>

        <button
          type="button"
          onClick={handleCTA}
          className="group relative px-14 py-6 text-xl font-semibold text-white bg-gradient-to-r from-[#5A00B0] to-[#D100FF] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 btn-glow"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Get Started with HaaS
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#D100FF] to-[#5A00B0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </section>
  );
};

export default CTASection;
