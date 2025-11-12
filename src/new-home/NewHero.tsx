import React, { useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

const NewHero = () => {
  const scrollToContact = useCallback(() => {
    const target = document.getElementById('contact');
    if (target) {
      const header = document.querySelector('header');
      const offset = header ? header.getBoundingClientRect().height : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B0032] via-[#2D0052] to-black grid-pattern animate-grid-flow opacity-40" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D100FF] rounded-full blur-[150px] opacity-20 animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5A00B0] rounded-full blur-[150px] opacity-20 animate-pulse-glow"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-24">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          <span className="block mb-2">Empowering Businesses with</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A00B0] via-[#D100FF] to-[#5A00B0] text-glow">
            AI-Augmented Humans
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-[#E0E0E0] mb-12 max-w-3xl mx-auto font-light">
          Where human intelligence meets AI efficiency.
        </p>

        <button
          type="button"
          onClick={scrollToContact}
          className="group relative px-12 py-5 text-lg font-semibold text-white bg-gradient-to-r from-[#5A00B0] to-[#D100FF] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 btn-glow"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Plug Into The Grid
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#D100FF] to-[#5A00B0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#D100FF] rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-[#D100FF] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default NewHero;
