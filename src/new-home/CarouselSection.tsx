import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/Generated Image November 11, 2025 - 11_55PM (1).png',
    caption: 'One Connected Grid. Infinite Possibilities.'
  },
  {
    image: '/Generated Image November 11, 2025 - 11_55PM (2).png',
    caption: 'Cut Costs. Boost Performance.'
  },
  {
    image: '/Generated Image November 11, 2025 - 11_55PM.png',
    caption: 'Human-as-a-Service'
  },
  {
    image: '/Generated Image November 11, 2025 - 11_56PM.png',
    caption: 'Work Globally. Operate Seamlessly.'
  }
];

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden box-glow">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            {slides.map((slide, index) => (
              <div
                key={slide.caption}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img src={slide.image} alt={slide.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white text-xl md:text-2xl font-light">{slide.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1B0032]/80 hover:bg-[#5A00B0] border border-[#D100FF]/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1B0032]/80 hover:bg-[#5A00B0] border border-[#D100FF]/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.caption}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#D100FF] w-8' : 'bg-[#E0E0E0]/30 hover:bg-[#E0E0E0]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
