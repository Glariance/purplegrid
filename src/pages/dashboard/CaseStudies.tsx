import React from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  Percent,
  Target,
  Activity,
  BarChart3,
  Users,
  Sparkles,
  ArrowRight,
  Quote,
  Star,
  ShieldCheck
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const beforeAfterStats = [
  {
    metric: 'Qualified Lead-to-Call Rate',
    before: '21%',
    after: '46%',
    lift: '+119%',
    detail: 'Improved nurture cadences, VA accountability, and AI triage of hot opportunities.'
  },
  {
    metric: 'First Response Time',
    before: '3h 40m',
    after: '14m',
    lift: '-90%',
    detail: 'Automated alerts, shared playbooks, and pod-based scheduling keep replies instant.'
  },
  {
    metric: 'Pipeline Velocity',
    before: '9.2 days',
    after: '4.1 days',
    lift: '-55%',
    detail: 'Daily pipeline huddles with VAs and automated risk flags accelerate closings.'
  }
];

const spendOptimization = [
  {
    title: 'Budget Reallocation Framework',
    description: 'We merged overlapping cold audiences and shifted 35% of spend to retargeting pods, generating a 54% lift in lead quality while reducing overall spend.',
    highlight: 'Result: 50% less spend with 18% more booked appointments.'
  },
  {
    title: 'Creative Refresh Cadence',
    description: 'Automated creative fatigue alerts and VA-driven UGC refresh cycles every 9 days kept CPMs consistent even while budgets dropped.',
    highlight: 'Result: 27% lower CPM and consistent CTR above 2.9%.'
  },
  {
    title: 'AI Bid Guard',
    description: 'AI monitors hourly performance. When lead cost spikes, automations pause low-performing ad sets and alert the pod to deploy proven assets.',
    highlight: 'Result: Prevented runaway spend 14 times in the last quarter.'
  }
];

const gridCaseStudy = {
  headline: 'The Grid in Action: Real Estate Agency 2.5x Lead Growth',
  bullets: [
    'Custom intake script plus Pod outreach moved response rate from 18% to 47%.',
    'VA cold callers logged 412 calls in 3 weeks, maintaining 92% quality scores.',
    'AI follow-up automations saved 12 manual hours per week for the broker team.',
    'Live dashboards let the client monitor appointments, cost per lead, and pod workloads in real-time.'
  ],
  quote: {
    text: '“Purple Grid gave us a fully managed pipeline. In 30 days, we were nurturing more high-intent buyers than the previous six months combined.”',
    author: 'Jamie Reynolds, Managing Broker · Lighthouse Realty'
  }
};

const testimonials = [
  {
    name: 'Samantha Lee',
    role: 'CMO · Velocity Fitness',
    feedback: '“Within two weeks the HaaS pod rewired our funnel. We hit record demos booked while cutting ad waste in half.”',
    metric: '3.1x ROAS',
    iconTone: 'bg-purple-100 text-purple-600'
  },
  {
    name: 'Andre Martin',
    role: 'Founder · Growth Forge Labs',
    feedback: '“Their VAs aren’t generalists — they operate like an embedded growth team. The reporting made it easy to trust every decision.”',
    metric: '62% more SQLs',
    iconTone: 'bg-blue-100 text-blue-600'
  },
  {
    name: 'Elena Alvarez',
    role: 'Director of Sales · NestHome Realty',
    feedback: '“We finally have visibility. From first click to signed contract, the pod knew exactly where to intervene.”',
    metric: '2.5x appointments',
    iconTone: 'bg-amber-100 text-amber-600'
  }
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900 text-white">
      <Header />
      <main className="pt-16">
        <section id="overview" className="relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] bg-[#d100ff] opacity-30 blur-[200px] animate-pulse-glow" aria-hidden="true" />
          <div
            className="absolute -bottom-40 right-1/5 w-[560px] h-[560px] bg-[#5A00B0] opacity-30 blur-[220px] animate-pulse-glow"
            style={{ animationDelay: '1.5s' }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Case Studies & Results</h1>
            <p className="text-lg text-purple-100 max-w-3xl leading-relaxed">
              Real campaigns. Real results. Explore how Purple Grid’s HaaS pods plug into marketing and sales pipelines to
              amplify conversions without inflating spend.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
              <section id="lead-conversion" className="mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800">Lead Conversion Before & After HaaS</h2>
                      <p className="text-slate-600 mt-3 max-w-2xl">
                        When a dedicated pod integrates with your CRM, every handoff — from first click to booked appointment — becomes predictable and measurable.
                      </p>
                    </div>
                    <div className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium">
                      <Percent className="h-4 w-4" />
                      <span>Avg. 87% lift in conversion speed</span>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {beforeAfterStats.map((row) => (
                      <div key={row.metric} className="border border-slate-200 rounded-2xl p-6 bg-slate-50 hover:border-purple-200 transition-colors">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">{row.metric}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-slate-500">
                            <span>Before</span>
                            <span className="font-semibold text-slate-700">{row.before}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-slate-500">
                            <span>After</span>
                            <span className="font-semibold text-purple-600">{row.after}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between bg-white border border-purple-100 rounded-xl px-4 py-2">
                          <span className="text-sm font-medium text-purple-600">{row.lift}</span>
                          <ArrowUpRight className="h-4 w-4 text-purple-500" />
                        </div>
                        <p className="text-sm text-slate-600 mt-4 leading-relaxed">{row.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="spend-optimization" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Cutting Ad Spend while Boosting Responses</h2>
                    <p className="text-slate-600 mt-2">
                      Here’s how we delivered more leads with half the budget, blending creative oversight, AI guardrails, and daily pod execution.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
                    <Target className="h-4 w-4 mr-2" />
                    50% spend reduction case study
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {spendOptimization.map((item) => (
                    <div key={item.title} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                          <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800">{item.title}</h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
                      <div className="text-sm font-medium text-purple-600 bg-purple-50 border border-purple-100 rounded-xl px-4 py-2 inline-flex items-center">
                        <Sparkles className="h-4 w-4 mr-2" />
                        {item.highlight}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="grid-in-action" className="mb-12">
                <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-slate-800 text-white rounded-3xl p-10 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent)]"></div>
                  <div className="relative">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 border border-white/30 text-sm font-semibold mb-4">
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Real Estate Spotlight
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 max-w-2xl">{gridCaseStudy.headline}</h2>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <ul className="space-y-4">
                        {gridCaseStudy.bullets.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                              <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                            <p className="text-sm font-medium leading-relaxed">{item}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                        <Quote className="h-10 w-10 text-white/70 mb-4" />
                        <p className="text-lg font-semibold leading-relaxed mb-4">{gridCaseStudy.quote.text}</p>
                        <div className="text-sm text-white/80 font-medium">{gridCaseStudy.quote.author}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="proof-gallery" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Proof Points & Testimonials</h2>
                    <p className="text-slate-600 mt-2">Screenshots and voices from clients whose pipelines we transformed.</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center space-x-1 text-amber-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-5 w-5" />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-slate-600 h-40 relative">
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium uppercase tracking-wide opacity-80">Pipeline Snapshot</p>
                        <p className="text-xl font-bold">Blurred Lead Dashboard</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-slate-600">
                        Real-time view of lead stages, last-touch timestamps, and pod owner — blurred for confidentiality, but identical to the dashboards clients access daily.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 h-40 relative">
                      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium uppercase tracking-wide opacity-80">Ad Manager View</p>
                        <p className="text-xl font-bold">Spend Optimization Report</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-slate-600">
                        Shows the exact budget reallocations, CPL improvements, and paused campaigns that produced a 50% spend reduction without sacrificing lead flow.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 h-40 relative">
                      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium uppercase tracking-wide opacity-80">Call Center QA</p>
                        <p className="text-xl font-bold">VA Performance Report</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-slate-600">
                        QA dashboard with call scores, scripts adherence, and next coaching actions — demonstrating the human oversight that supports the automations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((card) => (
                    <div key={card.name} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${card.iconTone}`}>
                        <Users className="h-5 w-5" />
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed mb-4">“{card.feedback}”</p>
                      <div className="text-sm font-semibold text-purple-600 mb-1">{card.metric}</div>
                      <div className="text-sm text-slate-500">{card.name}</div>
                      <div className="text-xs text-slate-400">{card.role}</div>
                    </div>
                  ))}
                </div>
              </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
