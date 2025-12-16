import { useState, useEffect } from 'react';
import { Package, Search, TrendingUp, MessageSquare, BarChart3, Boxes, CheckCircle, ArrowRight, Download, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { submitAmazonForm, ApiError } from '../lib/api';
import { toast } from '../lib/toast';

function AmazonPage() {
  const [formData, setFormData] = useState({
    niche: '',
    location: '',
    revenue: '',
    adBudget: '',
    businessType: '',
    gridTeam: [] as string[],
    email: '',
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    '/amazone-banner1.png',
    '/amazone-banner2.png',
    '/amazone-banner3.png',
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleTeamToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      gridTeam: prev.gridTeam.includes(role)
        ? prev.gridTeam.filter(r => r !== role)
        : [...prev.gridTeam, role]
    }));
  };

  const validateForm = (): string[] | null => {
    const errors: string[] = [];

    if (!formData.niche || formData.niche.trim() === '') {
      errors.push('Please select a niche');
    }

    if (!formData.location || formData.location.trim() === '') {
      errors.push('Please select a target location');
    }

    if (!formData.revenue || formData.revenue.trim() === '') {
      errors.push('Please select your anticipated monthly revenue');
    }

    if (!formData.adBudget || formData.adBudget.trim() === '') {
      errors.push('Please select your monthly ad budget');
    }

    if (!formData.businessType || formData.businessType.trim() === '') {
      errors.push('Please select your business type');
    }

    if (formData.gridTeam.length === 0) {
      errors.push('Please select at least one Grid team member');
    }

    // Validate email format if provided
    if (formData.email && formData.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
      }
    }

    if (errors.length > 0) {
      return errors;
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Client-side validation
    const validationErrors = validateForm();
    if (validationErrors) {
      // Format errors as HTML list for better display
      const errorsHtml = validationErrors.map(error => `• ${error}`).join('<br>');
      
      toast.fire({
        icon: 'error',
        title: 'Please complete all required fields',
        html: errorsHtml,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitAmazonForm({
        niche: formData.niche || undefined,
        location: formData.location || undefined,
        revenue: formData.revenue || undefined,
        adBudget: formData.adBudget || undefined,
        businessType: formData.businessType || undefined,
        gridTeam: formData.gridTeam.length > 0 ? formData.gridTeam : undefined,
        email: formData.email || undefined,
        name: formData.name || undefined,
        phone: formData.phone || undefined,
      });

      toast.fire({
        icon: 'success',
        title: response.message || 'Thank you! Your custom Grid plan is being generated.',
      });

      // Reset form
      setFormData({
        niche: '',
        location: '',
        revenue: '',
        adBudget: '',
        businessType: '',
        gridTeam: [],
        email: '',
        name: '',
        phone: ''
      });
    } catch (error) {
      const message = error instanceof ApiError 
        ? error.message 
        : 'Something went wrong. Please try again.';
      
      toast.fire({
        icon: 'error',
        title: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
      {/* SECTION 1 - BANNER SLIDER */}
      <section className="relative w-full h-[550px] md:h-[650px] overflow-hidden pt-16">
        <div className="relative w-full h-full">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ backgroundImage: `url('${banner}')` }}
            ></div>
          ))}
        </div>
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2 - WHAT MAKES THIS DIFFERENT */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-[#1B0032]">
              Not a VA. Not an Agency. <span className="text-[#D100FF]">A Working Grid.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Grid is a team of AI-augmented humans working 9 hours a day, managing all daily store tasks. Every role is assigned, every task is tracked, and your store grows predictably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Product Research', desc: 'AI-powered market analysis finds profitable opportunities daily' },
              { icon: Package, title: 'Listing SEO', desc: 'Optimized titles, bullets, and backend keywords for maximum visibility' },
              { icon: TrendingUp, title: 'PPC Optimization', desc: 'Daily campaign management to lower ACOS and increase ROI' },
              { icon: MessageSquare, title: 'Customer Support', desc: 'Instant responses to messages, reviews, and returns' },
              { icon: Boxes, title: 'Inventory Management', desc: 'Stock tracking and reorder alerts to prevent stockouts' },
              { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Weekly insights and strategic recommendations' }
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="bg-gradient-to-br from-[#1B0032] to-[#D100FF] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#1B0032]">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - CUSTOMER INPUT FORM */}
      <section id="builder" className="py-24 bg-gradient-to-br from-[#1B0032] to-[#3d0066]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 text-white">Build Your Store Grid</h2>
            <p className="text-xl text-gray-300">Answer a few questions to get your custom Amazon store strategy</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="space-y-8">
              {/* Niche Selection */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-[#1B0032]">
                  Which niche do you want to sell in?
                </label>
                <select
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D100FF] focus:outline-none text-lg"
                >
                  <option value="">Select a niche...</option>
                  <option value="home-kitchen">Home & Kitchen</option>
                  <option value="beauty">Beauty</option>
                  <option value="fitness">Fitness</option>
                  <option value="electronics">Electronics</option>
                  <option value="pet-supplies">Pet Supplies</option>
                  <option value="baby">Baby</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-[#1B0032]">
                  Which audience location do you want to target?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['USA', 'UK', 'UAE', 'Europe', 'Global'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setFormData({ ...formData, location: loc })}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        formData.location === loc
                          ? 'bg-[#D100FF] text-white border-[#D100FF]'
                          : 'border-gray-200 hover:border-[#D100FF]'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Revenue */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-[#1B0032]">
                  How much revenue do you anticipate monthly?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['$5k-$20k', '$20k-$50k', '$50k-$100k', '$100k+'].map((rev) => (
                    <button
                      key={rev}
                      type="button"
                      onClick={() => setFormData({ ...formData, revenue: rev })}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        formData.revenue === rev
                          ? 'bg-[#D100FF] text-white border-[#D100FF]'
                          : 'border-gray-200 hover:border-[#D100FF]'
                      }`}
                    >
                      {rev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ad Budget */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-[#1B0032]">
                  What is your monthly budget for ads?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Under $1,000', '$1,000-$3,000', '$3,000-$10,000', '$10,000+'].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData({ ...formData, adBudget: budget })}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        formData.adBudget === budget
                          ? 'bg-[#D100FF] text-white border-[#D100FF]'
                          : 'border-gray-200 hover:border-[#D100FF]'
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-[#1B0032]">
                  Are you building a full-time brand or a part-time business?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Full Time', 'Part Time'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, businessType: type })}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        formData.businessType === type
                          ? 'bg-[#D100FF] text-white border-[#D100FF]'
                          : 'border-gray-200 hover:border-[#D100FF]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Team */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-[#1B0032]">
                  How many people do you want in your Grid?
                </label>
                <div className="space-y-3">
                  {[
                    'Product Researcher',
                    'Listing Optimizer',
                    'PPC Manager',
                    'Customer Support VA',
                    'Inventory Manager',
                    'Full Grid (recommended)'
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleTeamToggle(role)}
                      className={`w-full py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                        formData.gridTeam.includes(role)
                          ? 'bg-[#D100FF] text-white border-[#D100FF]'
                          : 'border-gray-200 hover:border-[#D100FF]'
                      }`}
                    >
                      <span>{role}</span>
                      {formData.gridTeam.includes(role) && <CheckCircle className="w-5 h-5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Contact Information */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-semibold mb-4 text-[#1B0032]">Contact Information (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D100FF] focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D100FF] focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D100FF] focus:outline-none"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#1B0032] to-[#D100FF] text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate My Grid Plan
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* SECTION 4 - THE GRID TEAM */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-[#1B0032]">
              Meet Your <span className="text-[#D100FF]">Grid Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each role is staffed by experts working together to scale your Amazon business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Search,
                title: 'Product Hunter',
                desc: 'Finds profitable items using AI-powered market research and competitor analysis',
                bg: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                icon: Package,
                title: 'Listing Optimizer',
                desc: 'Crafts compelling titles, keywords, SEO, and A+ content that converts browsers into buyers',
                bg: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                icon: TrendingUp,
                title: 'PPC Specialist',
                desc: 'Daily Amazon Ads optimization to reduce ACOS and maximize return on ad spend',
                bg: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                icon: MessageSquare,
                title: 'Customer Support VA',
                desc: 'Handles messages, reviews, returns, and customer inquiries within hours',
                bg: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                icon: Boxes,
                title: 'Inventory Coordinator',
                desc: 'Tracks stock levels, manages reorders, and prevents costly stockouts',
                bg: 'https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                icon: BarChart3,
                title: 'Reporting Analyst',
                desc: 'Provides weekly insights, performance metrics, and strategic growth recommendations',
                bg: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=800'
              }
            ].map((member, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden shadow-xl group h-80">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${member.bg}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B0032] via-[#1B0032]/80 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="bg-[#D100FF] w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <member.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{member.title}</h3>
                  <p className="text-gray-200">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - HIGH-RES IMAGES SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 text-[#1B0032]">
              From Research to Delivery, <span className="text-[#D100FF]">We Handle It All</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your Grid works across research, operations, support, and optimization — every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Fulfillment Centers' },
              { img: 'https://images.pexels.com/photos/4246088/pexels-photo-4246088.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Package Processing' },
              { img: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Quality Control' },
              { img: 'https://images.pexels.com/photos/4246076/pexels-photo-4246076.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Inventory Management' },
              { img: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Order Fulfillment' },
              { img: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Delivery Logistics' }
            ].map((item, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden shadow-lg group h-64">
                <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url('${item.img}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B0032]/80 to-transparent"></div>
                <div className="relative h-full flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - BEFORE / AFTER */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16 text-center text-[#1B0032]">
            The <span className="text-[#D100FF]">Transformation</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Before */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-10 border-2 border-red-200">
              <h3 className="text-3xl font-bold mb-8 text-red-900">Before Grid</h3>
              <div className="space-y-4">
                {[
                  'Random freelancers with no accountability',
                  'Missed customer messages and reviews',
                  'Poor SEO and low conversion rates',
                  'Expensive ACOS eating into margins',
                  'Slow response times to market changes',
                  'Inconsistent sales and revenue'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✕</span>
                    </div>
                    <p className="text-lg text-red-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-10 border-2 border-green-200">
              <h3 className="text-3xl font-bold mb-8 text-green-900">After Grid</h3>
              <div className="space-y-4">
                {[
                  'Daily listing management and optimization',
                  'Controlled ACOS with profitable campaigns',
                  'Instant follow-ups and 5-star service',
                  'Clean product data and SEO rankings',
                  'Higher conversion and customer retention',
                  'Predictable revenue and scaling systems'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg text-green-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - PRICING TEASER */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-[#1B0032] to-[#3d0066]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Simple Monthly Pricing — <span className="text-[#D100FF]">Less Than 1 Employee</span>
            </h2>
            <p className="text-xl text-gray-300">Choose the Grid that fits your growth stage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter Grid',
                price: '$2,499',
                desc: 'Perfect for launching your first Amazon store',
                features: ['Product Research', 'Listing Optimization', 'Basic PPC Management', 'Email Support', 'Monthly Reports']
              },
              {
                name: 'Growth Grid',
                price: '$4,999',
                desc: 'Scale to 6-figures with full operational support',
                features: ['Everything in Starter', 'Advanced PPC Optimization', 'Customer Support VA', 'Inventory Management', 'Weekly Strategy Calls'],
                popular: true
              },
              {
                name: 'Elite Grid',
                price: '$9,999',
                desc: 'Multi-brand management and rapid expansion',
                features: ['Everything in Growth', 'Dedicated Account Manager', 'Multi-marketplace Support', 'Brand Strategy', 'Daily Performance Updates']
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-8 ${
                  plan.popular ? 'ring-4 ring-[#D100FF] transform scale-105' : ''
                } hover:shadow-2xl transition-all`}
              >
                {plan.popular && (
                  <div className="bg-[#D100FF] text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-[#1B0032] mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-[#1B0032]">{plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#D100FF] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-[#D100FF] text-white hover:bg-[#1B0032]'
                    : 'bg-gray-100 text-[#1B0032] hover:bg-[#D100FF] hover:text-white'
                }`}>
                  See Full Pricing
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - FINAL CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#1B0032]">
            Ready to Build Your Amazon Store the <span className="text-[#D100FF]">Right Way?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Your Grid is ready. Choose your niche, define your audience, and let us run your store fully.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-[#1B0032] to-[#D100FF] text-white px-10 py-5 rounded-full text-lg font-semibold hover:shadow-2xl transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Book Your Strategy Call
            </button>
            <button className="bg-gray-100 text-[#1B0032] px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#D100FF] hover:text-white transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Full Service PDF
            </button>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

export default AmazonPage;

