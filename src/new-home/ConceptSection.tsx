import React from 'react';
import { Brain, Users, TrendingUp } from 'lucide-react';

const ConceptSection = () => {
  const concepts = [
    {
      icon: Brain,
      title: 'Human + AI Synergy',
      description: 'Combining human creativity and empathy with AI-powered efficiency and scale.'
    },
    {
      icon: Users,
      title: 'Cost Efficiency',
      description: 'Optimize resources without sacrificing quality or human connection.'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Marketing Teams',
      description: 'Grow your marketing capacity seamlessly with our hybrid workforce model.'
    }
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1B0032] to-black" />

      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(209, 0, 255, 0.3) 49px, rgba(209, 0, 255, 0.3) 50px)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            What is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A00B0] to-[#D100FF]">HaaS</span>?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#5A00B0] to-[#D100FF] mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {concepts.map((concept, index) => (
            <div
              key={concept.title}
              className="group relative bg-gradient-to-b from-[#1B0032] to-black border border-[#5A00B0]/30 rounded-2xl p-8 hover:border-[#D100FF] transition-all duration-500 hover:box-glow"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D100FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5A00B0] to-[#D100FF] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <concept.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{concept.title}</h3>
                <p className="text-[#E0E0E0] font-light leading-relaxed">{concept.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
