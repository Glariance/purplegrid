import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import SectionLinkBar from '../../components/SectionLinkBar';
import ProblemResolved from '../../components/ProblemResolved';
import BrandStory from '../../components/BrandStory';
import SlidingBanner from '../../components/SlidingBanner';
import Services from '../../components/Services';
import Packages from '../../components/Packages';
import About from '../../components/About';
import Contact from '../../components/Contact';
import { faqs } from '../../data/faqs';

const KnowledgeBase = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <SectionLinkBar />
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-900/90" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(600px at 50% 0%, rgba(147, 51, 234, 0.35), transparent 55%), radial-gradient(600px at 80% 40%, rgba(59, 130, 246, 0.25), transparent 60%)'
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <ProblemResolved />
            <BrandStory />
            <SlidingBanner />
            <Services />
            <Packages />
            <About />
            <Contact />
          </div>
        </div>

        <div className="bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900 text-white">
          <section id="overview" className="relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
            <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] bg-[#d100ff] opacity-30 blur-[200px] animate-pulse-glow" aria-hidden="true" />
            <div
              className="absolute -bottom-40 right-1/5 w-[560px] h-[560px] bg-[#5A00B0] opacity-30 blur-[220px] animate-pulse-glow"
              style={{ animationDelay: '1.5s' }}
              aria-hidden="true"
            />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Knowledge Base & FAQs</h1>
              <p className="text-lg text-purple-100 max-w-3xl leading-relaxed">
                Transparency is part of the promise. Explore answers to the most common questions prospects ask before
                partnering with Purple Grid so you can make decisions with confidence.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-50 via-white to-purple-50 text-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
              <section id="faqs" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Frequently Asked Questions</h2>
                    <p className="text-slate-600 mt-2">Everything prospects ask before onboarding - answered upfront.</p>
                  </div>
                  <div className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
                    <Users className="h-4 w-4 mr-2" />
                    500+ pods deployed
                  </div>
                </div>

                <div className="space-y-8">
                  {faqs.map((group) => (
                    <div key={group.category} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                          <group.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800">{group.category}</h3>
                      </div>
                      <div className="space-y-5">
                        {group.questions.map((qa) => (
                          <div
                            key={qa.question}
                            className="border border-slate-200 rounded-2xl p-5 bg-slate-50 hover:border-purple-200 transition-colors"
                          >
                            <h4 className="text-lg font-semibold text-slate-800 mb-2">{qa.question}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">{qa.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="reassurance" className="mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-4">Everything is documented & measured</h2>
                      <p className="text-slate-600 mb-4">
                        You receive visibility into daily execution, access controls, and performance outcomes. Nothing happens in a black box.
                      </p>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                          Daily dashboards + weekly experiment recaps
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                          SLA-backed response times and escalation paths
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                          Quarterly pod health reviews with executive leadership
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-slate-900 text-white rounded-2xl p-6 shadow-lg">
                      <h3 className="text-xl font-semibold mb-3">Need proof points?</h3>
                      <p className="text-sm text-purple-100 mb-6">
                        We can share anonymized dashboards, example reports, and sample call QA so you know what to expect before you sign.
                      </p>
                      <button className="px-5 py-2 rounded-xl bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-colors">
                        Request Samples
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KnowledgeBase;
