import React from 'react';
import { ArrowRight, Users, Zap, DollarSign, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative text-white py-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/banner.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          <div className="lg:max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI-Augmented
              <span className="text-purple-300"> Human</span>
              <br />
              as a Service
            </h1>
            <p className="text-xl mb-8 text-purple-100 leading-relaxed">
              Scale your business with our cost-efficient Human as a Service (HaaS) model. 
              Get dedicated professionals enhanced with AI tools to maximize productivity and results.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-12">
              <button className="bg-white text-purple-800 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-purple-300 text-purple-100 px-8 py-4 rounded-lg font-semibold hover:bg-purple-800 transition-colors">
                View Packages
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-left">
                <div className="bg-purple-800 p-3 rounded-full w-16 h-16 mb-3 flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <p className="text-sm text-purple-200">Expert Team</p>
              </div>
              <div className="text-left">
                <div className="bg-purple-800 p-3 rounded-full w-16 h-16 mb-3 flex items-center justify-center">
                  <Zap className="h-8 w-8" />
                </div>
                <p className="text-sm text-purple-200">AI-Enhanced</p>
              </div>
              <div className="text-left">
                <div className="bg-purple-800 p-3 rounded-full w-16 h-16 mb-3 flex items-center justify-center">
                  <DollarSign className="h-8 w-8" />
                </div>
                <p className="text-sm text-purple-200">Cost-Efficient</p>
              </div>
            </div>
          </div>

          <div className="relative lg:flex-shrink-0 lg:w-[420px] xl:w-[460px]">
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Scale?</h3>
                <p className="text-gray-600">Get matched with the perfect team member</p>
              </div>
              
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Business Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700">
                  <option>Select Service Needed</option>
                  <option>Social Media Assistant</option>
                  <option>SEO/Content VA</option>
                  <option>Clerical VA</option>
                  <option>Cold Caller / Closer</option>
                  <option>Ads Campaign Monitor</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Get Free Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
