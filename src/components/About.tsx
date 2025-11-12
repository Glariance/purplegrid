import React from 'react';
import { Target, Users, Zap, Award, TrendingUp, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "500+", label: "Businesses Served", icon: Users },
    { number: "98%", label: "Client Satisfaction", icon: Award },
    { number: "40%", label: "Average Cost Savings", icon: TrendingUp },
    { number: "25+", label: "Countries Represented", icon: Globe }
  ];

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every team member is focused on delivering measurable outcomes for your business growth."
    },
    {
      icon: Users,
      title: "Human-Centric",
      description: "We believe in the power of human creativity and intuition, enhanced by AI technology."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Constantly evolving our processes and tools to stay ahead of industry trends."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-[#F3E9FF] via-[#E5D4FF] to-[#D7BEFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Revolutionizing Business Operations
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Purple Grid Marketing pioneered the Human as a Service (HaaS) model, combining the irreplaceable 
            value of human expertise with cutting-edge AI augmentation. We're not just a service provider – 
            we're your strategic partner in scaling efficiently and cost-effectively.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="h-10 w-10 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2020, Purple Grid Marketing emerged from a simple observation: businesses were 
                struggling to find the right balance between cost-effective operations and high-quality output.
              </p>
              <p>
                Traditional outsourcing often meant sacrificing quality, while in-house teams were expensive 
                and difficult to scale. We saw an opportunity to create something better – a model that 
                combines the best of both worlds.
              </p>
              <p>
                Today, we're proud to serve over 500 businesses across 25 countries, helping them achieve 
                an average of 40% cost savings while improving operational efficiency and output quality.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration"
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-purple-600 opacity-10 rounded-2xl"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="bg-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            To democratize access to world-class talent by creating a sustainable, scalable, and 
            cost-effective model that empowers businesses to focus on what they do best while we 
            handle the rest with unmatched expertise and AI-enhanced efficiency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
