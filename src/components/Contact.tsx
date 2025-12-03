import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactInquiry, ApiError } from '../lib/api';
import { toast } from '../lib/toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: 'Website Inquiry',
        service: formData.service,
        company: formData.company,
        message: formData.message.trim()
      });

      setStatus('success');
      setIsSubmitted(true);
      toast.fire({ icon: 'success', title: 'Message sent! We will reply within 24 hours.' });
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setStatus('idle');
      }, 3000);
    } catch (error) {
      const message = (() => {
        if (error instanceof ApiError) {
          const details = error.details as { errors?: Record<string, string[]> } | string | undefined;
          if (details && typeof details === 'object' && 'errors' in details && details.errors) {
            const all = Object.values(details.errors)
              .flat()
              .filter((msg): msg is string => typeof msg === 'string');
            if (all.length) return all.join('<br/>');
          }
          if (typeof details === 'string') return details;
          return error.message;
        }
        if (error instanceof Error) return error.message;
        return 'Something went wrong. Please try again.';
      })();

      setStatus('error');
      setErrorMessage(message);
      toast.fire({ icon: 'error', html: message });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@purplegridmarketing.com",
      subtext: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: { label: "+44 (7304) 322-465", href: "tel:+447304322465" },
      details2: { label: "+1 (646) 814-3137", href: "tel:+16468143137" },
      subtext: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: "Unit A and B Farringdon Avenue Business Center,",
      subtext: "Romford East London RM3 8EN"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "< 24 hours",
      subtext: "Average first response"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#F3E9FF] via-[#E5D4FF] to-[#D7BEFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's discuss how our HaaS model can transform your business operations. 
            Get a free consultation and custom proposal tailored to your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h4>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    placeholder="+1 (234) 567-8901"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">Select a service</option>
                    <option value="Social Media Assistant">Social Media Assistant</option>
                    <option value="SEO/Content VA">SEO/Content VA</option>
                    <option value="Clerical VA">Clerical VA</option>
                    <option value="Cold Caller / Closer">Cold Caller / Closer</option>
                    <option value="Ads Campaign Monitor">Ads Campaign Monitor</option>
                    <option value="Multiple Services">Multiple Services</option>
                    <option value="Custom Solution">Custom Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your needs
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    placeholder="Describe your current challenges and what you're looking to achieve..."
                  />
                </div>

                {/* {status === 'error' && errorMessage && (
                  <div className="flex items-start space-x-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    <AlertCircle className="mt-0.5 h-5 w-5" />
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                )} */}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
              <p className="text-gray-600 mb-8">
                We're here to help you scale your business with our innovative HaaS model. 
                Reach out through any of these channels, and let's start the conversation.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <info.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
                    {info.title === 'Email Us' ? (
                      <p className="text-purple-600 font-medium mb-1">
                        <a href={`mailto:${info.details}`} className="hover:underline">
                          {info.details}
                        </a>
                      </p>
                    ) : (
                      <>
                        <p className="text-purple-600 font-medium mb-1">
                          <a href={(info.details as { href: string }).href} className="hover:underline">
                            {(info.details as { label: string }).label}
                          </a>
                        </p>
                        {info.details2 && (
                          <p className="text-purple-600 font-medium mb-1">
                            <a href={(info.details2 as { href: string }).href} className="hover:underline">
                              {(info.details2 as { label: string }).label}
                            </a>
                          </p>
                        )}
                      </>
                    )}
                    <p className="text-sm text-gray-500">{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Free Consultation Available</h4>
              <p className="mb-6">
                Schedule a 30-minute call to discuss your specific needs and see how 
                our HaaS model can benefit your business.
              </p>
              <button
                type="button"
                onClick={() => {
                  const tawkAPI = (window as any).Tawk_API;
                  if (tawkAPI && typeof tawkAPI.toggle === 'function') {
                    tawkAPI.toggle();
                  }
                }}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Book Free Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
