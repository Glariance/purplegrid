import React from 'react';
import { MessageSquare, Search, FileText, Phone, BarChart3, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: MessageSquare,
      title: "Social Media Assistant",
      description: "AI-enhanced social media management with human creativity and strategic thinking.",
      features: [
        "Content creation & scheduling",
        "Community management",
        "Analytics & reporting",
        "Brand voice consistency",
        "Engagement optimization"
      ],
      pricing: "Starting at $899/month"
    },
    {
      icon: Search,
      title: "SEO/Content VA",
      description: "Expert content creation powered by AI research tools and human expertise.",
      features: [
        "SEO-optimized content writing",
        "Keyword research & analysis",
        "Content strategy development",
        "Blog management",
        "Technical SEO audits"
      ],
      pricing: "Starting at $799/month"
    },
    {
      icon: FileText,
      title: "Clerical VA",
      description: "Streamlined administrative support with AI-powered efficiency and human attention to detail.",
      features: [
        "Data entry & management",
        "Email management",
        "Calendar scheduling",
        "Document preparation",
        "Customer service support"
      ],
      pricing: "Starting at $599/month"
    },
    {
      icon: Phone,
      title: "Cold Caller / Closer",
      description: "AI-assisted lead qualification with human persuasion and relationship building.",
      features: [
        "Lead qualification calls",
        "Sales presentations",
        "Follow-up sequences",
        "CRM management",
        "Conversion optimization"
      ],
      pricing: "Starting at $1,299/month"
    },
    {
      icon: BarChart3,
      title: "Ads Campaign Monitor",
      description: "AI-powered campaign analysis with human strategic optimization and creative insights.",
      features: [
        "Campaign performance monitoring",
        "A/B testing management",
        "Budget optimization",
        "Creative asset development",
        "ROI analysis & reporting"
      ],
      pricing: "Starting at $999/month"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-[#F3E9FF] via-[#E5D4FF] to-[#D7BEFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our HaaS Service Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each service combines the best of human expertise with AI augmentation, 
            delivering superior results at a fraction of traditional costs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="bg-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-purple-200 pt-6">
                <p className="text-2xl font-bold text-purple-600 mb-4">{service.pricing}</p>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
