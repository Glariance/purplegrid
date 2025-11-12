import React from 'react';
import {
  Users,
  Globe,
  Clock3,
  Workflow,
  Zap,
  Brain,
  Laptop,
  MessageSquare,
  ArrowRight,
  CalendarDays,
  Headphones,
  Sparkles,
  ShieldCheck,
  Home
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';

const teamMembers = [
  {
    name: 'Sarah Chen',
    title: 'Pod Lead · Growth Strategist',
    location: 'Singapore · GMT+8',
    bio: 'Leads overall campaign strategy, oversees creative testing, and runs daily pod huddles to prioritize hottest pipeline opportunities.',
    strengths: ['Funnel Architecture', 'Meta + TikTok Ads', 'Creative Direction'],
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Marcus Rodriguez',
    title: 'Outbound Specialist · Senior Caller',
    location: 'Austin, USA · GMT-5',
    bio: 'Owns first-touch conversations, qualifies leads, and logs detailed call notes for closers. Monitors AI alerts to ensure no hot lead goes untouched.',
    strengths: ['Cold Calling', 'Sales Playbooks', 'CRM Hygiene'],
    avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Priya Patel',
    title: 'Automation Architect · Marketing Ops',
    location: 'Mumbai, India · GMT+5:30',
    bio: 'Builds automations, sequences, and reporting dashboards. Ensures lead scoring, nurturing cadences, and notifications stay tuned to your goals.',
    strengths: ['GoHighLevel', 'HubSpot', 'Lifecycle Automation'],
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'James Wilson',
    title: 'Paid Media Analyst',
    location: 'London, UK · GMT+0',
    bio: 'Optimizes ad spend, launches creative refreshes, and coordinates with Sarah to reallocate budget toward the strongest performing channels.',
    strengths: ['Budget Optimization', 'Attribution Analysis', 'Creative QA'],
    avatar: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Elena Alvarez',
    title: 'Client Success Partner',
    location: 'Miami, USA · GMT-5',
    bio: 'Aligns with your internal stakeholders, communicates weekly wins, and captures feedback to feed directly into the pod’s next sprint.',
    strengths: ['Stakeholder Comms', 'Reporting', 'Retention'],
    avatar: 'https://images.pexels.com/photos/3184406/pexels-photo-3184406.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

const podRoutine = [
  {
    time: '7:30 AM GMT+8',
    title: 'Daily Pod Sync',
    detail: 'Sarah kicks off a 15-minute standup across time zones. Overnight performance data is reviewed, and hot leads are reassigned if needed.',
    icon: CalendarDays
  },
  {
    time: '9:00 AM GMT-5',
    title: 'Live Outreach Block',
    detail: 'Marcus and the outbound pod hit call queues prioritized by AI urgency scores. Human notes feed back into the CRM in real time.',
    icon: Headphones
  },
  {
    time: '1:00 PM GMT+5:30',
    title: 'Automation QA + Launch',
    detail: 'Priya updates nurturing workflows, tests new triggers, and deploys messaging variations based on the morning’s call intel.',
    icon: Workflow
  },
  {
    time: '3:00 PM GMT+0',
    title: 'Paid Media Sprint',
    detail: 'James refreshes creatives, reallocates budgets, and checks AI-flagged anomalies before the US evening traffic spike.',
    icon: Laptop
  },
  {
    time: '5:00 PM GMT-5',
    title: 'Client Handoff',
    detail: 'Elena prepares the daily digest: wins, risks, upcoming experiments, and next steps so you always know what’s running.',
    icon: MessageSquare
  }
];

const aiToolkit = [
  {
    name: 'ChatGPT Enterprise',
    description: 'Rapid message drafting, call script tweaks, and generating personalized follow-up sequences reviewed by the pod lead.',
    category: 'Content & Messaging'
  },
  {
    name: 'Jasper AI',
    description: 'Creates campaign-ready creative angles and UGC scripts. Paired with human editors for tone and compliance fit.',
    category: 'Creative Ideation'
  },
  {
    name: 'HubSpot AI Insights',
    description: 'Predictive lead scoring and churn risk alerts that sync straight to the daily pod dashboards.',
    category: 'Pipeline Intelligence'
  },
  {
    name: 'GoHighLevel Automations',
    description: 'One-click deployment of workflows, SMS cadences, and multi-step funnels overseen by our automation architect.',
    category: 'Lifecycle Orchestration'
  },
  {
    name: 'Grain Voice Intelligence',
    description: 'Automatically transcribes and highlights key call moments so every VA can learn from top performers.',
    category: 'QA & Coaching'
  },
  {
    name: 'Notion AI + Loom',
    description: 'Keeps playbooks fresh, documents pod wins, and sends quick Loom recaps for busy execs.',
    category: 'Knowledge Ops'
  }
];

const MeetYourGrid = () => {
  const { pathname } = useLocation();

  const navigationItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Meet the Team', href: '#team-profiles' },
    { label: 'Pod Routine', href: '#pod-routine' },
    { label: 'AI Toolkit', href: '#ai-toolkit' }
  ];

  const pageLinks = [
    { label: 'Transparency Hub', to: '/transparency-hub' },
    { label: 'CRM Snapshot', to: '/crm-snapshot' },
    { label: 'Meet Your Grid', to: '/meet-your-grid' },
    { label: 'Client Portal', to: '/client-portal' },
    { label: 'Logout', to: '/' }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <section id="overview" className="relative overflow-hidden text-white py-6 md:py-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#d100ff] opacity-30 blur-[180px] animate-pulse-glow" aria-hidden="true" />
          <div
            className="absolute -bottom-40 right-1/5 w-[520px] h-[520px] bg-[#5A00B0] opacity-30 blur-[200px] animate-pulse-glow"
            style={{ animationDelay: '1.5s' }}
            aria-hidden="true"
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-4">
              <img src="/home-logo.png" alt="Purple Grid logo" className="h-32 w-32 object-contain" />
            </div>
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full border border-blue-400/30 mb-6">
                <Users className="h-5 w-5 mr-2 text-blue-300" />
                <span className="text-blue-200 font-medium">Meet the Humans Behind the Pod</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Your Grid, Fully Transparent
              </h1>
              <p className="text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto mb-6">
                No faceless outsourcing. Every client works with a dedicated pod of specialists that blend human expertise with the best AI tools on the market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors">
                  Schedule Pod Introduction
                </button>
              <button className="px-6 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
                Download Team Playbook
              </button>
            </div>
            <div className="mt-6 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#9333EA] text-white hover:bg-purple-700 transition-colors"
                aria-label="Go to homepage"
              >
                <Home className="h-7 w-7" />
              </Link>
            </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:hidden mb-8 space-y-3">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {pageLinks.map((link) => {
                const isActive = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${isActive ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'border-slate-200 bg-white/70 text-slate-600 hover:text-purple-600 hover:border-purple-300'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap px-4 py-2 rounded-full border border-slate-200 bg-white/70 text-sm font-medium text-slate-600 hover:text-purple-600 hover:border-purple-300 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <aside className="hidden lg:block lg:w-72">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Dashboard Navigation</h3>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Dashboard Pages</p>
                    <div className="space-y-2 mb-5">
                      {pageLinks.map((link) => {
                        const isActive = pathname === link.to;
                        return (
                          <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'bg-purple-600 text-white shadow' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'}`}
                          >
                            <span>{link.label}</span>
                            <ArrowRight className={`h-4 w-4 ${isActive ? 'text-white' : ''}`} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pt-5 border-t border-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">This Page Sections</p>
                    <nav className="space-y-2">
                      {navigationItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-lg font-semibold mb-2">Want to Meet Them Live?</h4>
                  <p className="text-sm text-purple-100 mb-4">
                    We’ll schedule a pod introduction call so you can meet the people running your funnel.
                  </p>
                  <button className="w-full bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors">
                    Book Meet-and-Greet
                  </button>
                </div>
              </div>
            </aside>

            <div className="flex-1 space-y-12">
              <section id="team-profiles" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Your Dedicated Pod</h2>
                    <p className="text-slate-600 mt-2">
                      Every pod is cross-functional: strategy, outreach, automation, media, and success. They operate as an extension of your internal team.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
                    <Globe className="h-4 w-4 mr-2" />
                    Coverage across 4 time zones
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                      <div className="flex items-center mb-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{member.name}</h3>
                          <p className="text-sm text-slate-500">{member.title}</p>
                          <p className="text-xs text-slate-400 mt-1">{member.location}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">{member.bio}</p>
                      <div className="space-y-2">
                        {member.strengths.map((skill) => (
                          <div key={skill} className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium mr-2">
                            <Sparkles className="h-3 w-3 mr-1" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="pod-routine" className="mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800">How Your Pod Operates Daily</h2>
                      <p className="text-slate-600 mt-2">
                        A follow-the-sun routine ensures campaigns move forward around the clock. Here’s a typical day in the life.
                      </p>
                    </div>
                    <div className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium">
                      <Clock3 className="h-4 w-4" />
                      <span>Continuous coverage</span>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {podRoutine.map((event) => (
                      <div key={event.title} className="border border-slate-200 rounded-2xl p-5 bg-slate-50 hover:border-purple-200 transition-colors">
                        <div className="inline-flex items-center px-3 py-1 bg-white border border-purple-100 rounded-full text-xs font-semibold text-purple-600 mb-3">
                          {event.time}
                        </div>
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                            <event.icon className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-base font-semibold text-slate-800">{event.title}</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{event.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="ai-toolkit" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">The AI Toolkit They Leverage</h2>
                    <p className="text-slate-600 mt-2">
                      We pair human judgment with best-in-class tools. Every workflow is monitored and approved by your pod lead before anything touches your prospects.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
                    <Brain className="h-4 w-4 mr-2" />
                    AI + Human QA
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {aiToolkit.map((tool) => (
                    <div key={tool.name} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                          <Zap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{tool.name}</h3>
                          <p className="text-xs text-slate-400">{tool.category}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{tool.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <ShieldCheck className="h-10 w-10 text-white mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold">Human Verified. Always.</h3>
                      <p className="text-sm text-purple-100">
                        AI output is a starting point. Every message, funnel, and creative is reviewed by your pod before launch.
                      </p>
                    </div>
                  </div>
                  <button className="px-5 py-2 rounded-xl bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-colors">
                    Review SOP Library
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MeetYourGrid;
