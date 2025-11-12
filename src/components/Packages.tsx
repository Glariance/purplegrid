import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

const Packages = () => {
  const packages = [
    {
      name: "Starter",
      price: "$599",
      period: "/month",
      description: "Perfect for small businesses getting started with HaaS",
      features: [
        "1 Dedicated VA (20 hours/week)",
        "Basic AI tool access",
        "Email & chat support",
        "Weekly progress reports",
        "1 service specialization",
        "Standard onboarding"
      ],
      popular: false,
      cta: "Start Small"
    },
    {
      name: "Growth",
      price: "$1,299",
      period: "/month",
      description: "Ideal for growing businesses ready to scale operations",
      features: [
        "2 Dedicated VAs (40 hours/week total)",
        "Advanced AI tool suite",
        "Priority support",
        "Bi-weekly strategy calls",
        "2-3 service specializations",
        "Custom workflow setup",
        "Performance analytics dashboard"
      ],
      popular: true,
      cta: "Scale Up"
    },
    {
      name: "Enterprise",
      price: "$2,499",
      period: "/month",
      description: "Comprehensive solution for established businesses",
      features: [
        "4+ Dedicated team members",
        "Full AI platform access",
        "24/7 dedicated support",
        "Weekly strategy sessions",
        "All service specializations",
        "Custom integrations",
        "Advanced reporting & analytics",
        "Dedicated account manager"
      ],
      popular: false,
      cta: "Go Enterprise"
    }
  ];

  const addOns = [
    {
      name: "Additional VA Hours",
      price: "$15/hour",
      description: "Scale your team capacity as needed"
    },
    {
      name: "Premium AI Tools",
      price: "$199/month",
      description: "Access to cutting-edge AI platforms"
    },
    {
      name: "Custom Integration",
      price: "$499/setup",
      description: "Connect with your existing tools"
    },
    {
      name: "Training & Onboarding",
      price: "$299/session",
      description: "Accelerate team productivity"
    }
  ];

  return (
    <section id="packages" className="py-20 bg-gradient-to-br from-[#F3E9FF] via-[#E5D4FF] to-[#D7BEFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your HaaS Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible packages designed to grow with your business. All plans include AI augmentation, 
            dedicated team members, and our commitment to your success.
          </p>
        </div>

        {/* Main Packages */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div key={index} className={`relative bg-white rounded-2xl shadow-lg p-8 ${pkg.popular ? 'ring-4 ring-purple-600 scale-105' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-purple-600">{pkg.price}</span>
                  <span className="text-gray-600 ml-2">{pkg.period}</span>
                </div>
                <p className="text-gray-600">{pkg.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                pkg.popular 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }`}>
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Enhance Your Package
            </h3>
            <p className="text-gray-600">
              Customize your HaaS experience with these powerful add-ons
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="border border-purple-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <Zap className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">{addon.name}</h4>
                </div>
                <p className="text-2xl font-bold text-purple-600 mb-2">{addon.price}</p>
                <p className="text-sm text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-xl mb-8 text-purple-100">
              Join hundreds of businesses already scaling with our HaaS model
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Schedule Free Consultation
              </button>
              <button className="border-2 border-purple-300 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
