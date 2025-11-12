import React from 'react';
import { Sparkles, Grid3X3, Users, Zap, Target, Heart } from 'lucide-react';

const BrandStory = () => {
  return (
    <section id="brand-story" className="py-20 bg-gradient-to-br from-[#F3E9FF] via-[#E5D4FF] to-[#D7BEFF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Purple Grid Marketing – Brand Story
          </h1>
        </div>

        {/* Opening Statement */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <p className="text-xl text-gray-700 leading-relaxed text-center">
            In the noisy digital world, most businesses struggle not because they lack ideas —
            but because they can't consistently execute those ideas, day after day.
          </p>
          <p className="text-2xl font-bold text-purple-600 text-center mt-6">
            That's why we created Purple Grid Marketing.
          </p>
        </div>

        {/* Why Purple Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold">🔮 Why "Purple"?</h2>
          </div>
          <div className="space-y-4 text-lg">
            <p>Purple has always stood for creativity, wisdom, and innovation.</p>
            <p className="text-purple-100">
              It's the color of imagination turned into action — the spark that makes brands memorable.
            </p>
          </div>
        </div>

        {/* Why Grid Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Grid3X3 className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">🧩 Why "Grid"?</h2>
          </div>
          <div className="space-y-4 text-lg text-gray-700">
            <p>A grid is more than lines: it's connection and structure.</p>
            <p>
              Our marketing execution teams don't work in silos — they're interconnected like a smart grid:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="font-semibold text-purple-800">Daily social media posts</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="font-semibold text-purple-800">SEO updates</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="font-semibold text-purple-800">Campaign monitoring</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="font-semibold text-purple-800">Lead follow-ups</p>
              </div>
            </div>
            
            <p className="text-center font-medium text-purple-600">
              all wired together, powered by AI, and managed by real humans.
            </p>
          </div>
        </div>

        {/* AI meets Humanity Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <Heart className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold">🤝 Where AI meets humanity</h2>
          </div>
          <div className="space-y-4 text-lg">
            <p>
              At Purple Grid, we don't believe in choosing between human touch and automation.
            </p>
            <p className="text-gray-200">
              We built a model where dedicated specialists use AI tools as co-pilots — combining speed, creativity, and authentic voice.
            </p>
            
            <div className="bg-white/10 p-6 rounded-xl mt-6">
              <h3 className="text-2xl font-bold mb-4 text-center">The result?</h3>
              <p className="text-xl text-center text-gray-100">
                Consistent, high-quality marketing work that keeps your pipeline alive — at a cost you can scale.
              </p>
            </div>
          </div>
        </div>

        {/* Our Promise Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">🚀 Our promise</h2>
          </div>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              We're not just another "offshore team" or a collection of freelancers.
            </p>
            <p className="font-semibold text-purple-600 text-xl">
              We are your Purple Grid:
            </p>
            <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
              <p className="text-lg leading-relaxed">
                A living network of AI‑augmented humans, fully plugged into your brand,
                working every day to move your marketing forward — so you can focus on what matters most.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white p-3 rounded-lg mr-4">
              <Grid3X3 className="h-10 w-10 text-purple-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold">Purple Grid Marketing</h3>
              <p className="text-xl text-purple-200 mt-2">
                Empowered businesses with AI Augmented Human execution
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors text-lg">
              Start Your Purple Grid Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
