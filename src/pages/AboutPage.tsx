import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900 text-white">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] bg-[#d100ff] opacity-30 blur-[200px] animate-pulse-glow" aria-hidden="true" />
          <div
            className="absolute -bottom-40 right-1/5 w-[560px] h-[560px] bg-[#5A00B0] opacity-30 blur-[220px] animate-pulse-glow"
            style={{ animationDelay: '1.5s' }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Purple Grid Marketing</h1>
            <p className="text-lg text-purple-100 max-w-3xl leading-relaxed">
              Learn more about the team powering Purple Grid Marketing and how our AI-augmented pods partner with
              ambitious founders to scale their growth engine.
            </p>
          </div>
        </section>
        <div className="relative z-10">
          <About />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
