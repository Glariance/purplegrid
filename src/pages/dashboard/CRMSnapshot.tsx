import React from 'react';
import {
  BarChart3,
  Users,
  Workflow,
  MessageSquare,
  CalendarClock,
  BellRing,
  CheckCircle,
  Activity,
  ArrowRight,
  Brain,
  Sparkles,
  ClipboardCheck,
  Home,
  LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';

const crmScreens = [
  {
    title: 'Lead Pipeline',
    description: 'Every inquiry is automatically tagged by source, temperature, and assigned VA.',
    metrics: [
      { label: 'Hot Leads', value: 18, tone: 'bg-green-100 text-green-700' },
      { label: 'Warm Leads', value: 42, tone: 'bg-yellow-100 text-yellow-700' },
      { label: 'Cold Leads', value: 27, tone: 'bg-blue-100 text-blue-700' }
    ]
  },
  {
    title: 'Follow-up Automations',
    description: 'Sequenced SMS + email reminders trigger as soon as a lead engages.',
    metrics: [
      { label: 'Active Sequences', value: 6, tone: 'bg-purple-100 text-purple-700' },
      { label: 'Avg Response Time', value: '12m', tone: 'bg-indigo-100 text-indigo-700' },
      { label: 'Idle Leads Escalated', value: 9, tone: 'bg-rose-100 text-rose-700' }
    ]
  },
  {
    title: 'Pipeline Intelligence',
    description: 'AI highlights conversion risk and dynamically reprioritizes call lists.',
    metrics: [
      { label: 'Conversion Probability', value: '68%', tone: 'bg-slate-100 text-slate-700' },
      { label: 'Escalations Today', value: 4, tone: 'bg-orange-100 text-orange-700' },
      { label: 'Deals Closed', value: 5, tone: 'bg-emerald-100 text-emerald-700' }
    ]
  }
];

const journeySteps = [
  {
    title: 'Ad Click',
    detail: 'Prospect clicks paid or organic campaign and lands on custom intake page.',
    icon: <Sparkles className="h-5 w-5 text-purple-500" />
  },
  {
    title: 'Instant Intake',
    detail: 'Lead form pre-fills into CRM with tracking data, budget, service interest.',
    icon: <ClipboardCheck className="h-5 w-5 text-blue-500" />
  },
  {
    title: 'Smart Routing',
    detail: 'CRM assigns to a VA pod, triggers SMS acknowledgement and schedules call task.',
    icon: <Workflow className="h-5 w-5 text-indigo-500" />
  },
  {
    title: 'Follow-up Cadence',
    detail: 'Automated reminders escalate if no response within preset SLA windows.',
    icon: <CalendarClock className="h-5 w-5 text-amber-500" />
  },
  {
    title: 'Win + Nurture',
    detail: 'Closed deals move to nurture automations and reporting dashboards for clients.',
    icon: <CheckCircle className="h-5 w-5 text-emerald-500" />
  }
];

const automations = [
  {
    title: 'AI Lead Watchdog',
    description: 'If a hot lead sits untouched for 2 hours, Slack + SMS alerts ping the assigned closer and backup VA.',
    icon: BellRing
  },
  {
    title: 'Smart Cadence Adjustments',
    description: 'Engagement scores drop? The system automatically switches messaging tone and adds a manual call task.',
    icon: Brain
  },
  {
    title: 'Deal Desk Summaries',
    description: 'Every evening, AI compiles priority notes, pending contracts, and next-day focus items you can skim in 60 seconds.',
    icon: BarChart3
  }
];

const vaNotes = [
  {
    name: 'Sarah · Social Strategist',
    note: 'Lead #482 requested updated pricing sheet. Scheduled follow-up video call for tomorrow 10AM.',
    highlight: 'Attached curated content pack for their niche.'
  },
  {
    name: 'Marcus · Calling Lead',
    note: 'Spoke with new inbound real estate lead. Qualified budget and timeline — ready for closer handoff.',
    highlight: 'Left detailed call summary and marked urgency as high.'
  },
  {
    name: 'Priya · Automation Analyst',
    note: 'Reviewed abandoned cart flow. Updated delay logic after observing 15% higher re-engagement at 18 hours.',
    highlight: 'Flagged A/B test opportunity for next sprint.'
  }
];

const CRMSnapshot = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigationItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'CRM Screens', href: '#crm-screens' },
    { label: 'Lead Journey', href: '#lead-journey' },
    { label: 'Automations', href: '#automations' },
    { label: 'VA Oversight', href: '#va-oversight' }
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                <Activity className="h-5 w-5 mr-2 text-blue-300" />
                <span className="text-blue-200 font-medium">A Day Inside Your CRM</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                CRM Snapshot Walkthrough
              </h1>
              <p className="text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto mb-6">
                Peek behind the curtain. See the exact workflows, automations, and human touches your virtual marketing pod uses to nurture every lead.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors">
                  Download Sample Report
                </button>
              <button className="px-6 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
                Schedule Live Walkthrough
              </button>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#9333EA] text-white hover:bg-purple-700 transition-colors"
                  aria-label="Go to homepage"
                >
                  <Home className="h-7 w-7" />
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-white/50 text-white hover:bg-white/10 transition-colors"
                  aria-label="Log out"
                >
                  <LogOut className="h-7 w-7" />
                </button>
              </div>
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
                  <h4 className="text-lg font-semibold mb-2">Need a Live Demo?</h4>
                  <p className="text-sm text-purple-100 mb-4">
                    Join a strategist for a 15-minute deep dive inside the CRM to tailor it to your workflow.
                  </p>
                  <button className="w-full bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors">
                    Book a Session
                  </button>
                </div>
              </div>
            </aside>

            <div className="flex-1 space-y-12">
              <section id="crm-screens" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Inside the Live CRM</h2>
                    <p className="text-slate-600 mt-2">A snapshot of the views your pod uses to keep every lead accountable.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {crmScreens.map((panel, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-slate-800">{panel.title}</h3>
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <p className="text-slate-600 mb-5">{panel.description}</p>
                      <div className="space-y-3">
                        {panel.metrics.map((metric) => (
                          <div key={metric.label} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">{metric.label}</span>
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${metric.tone}`}>
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="lead-journey" className="mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                    <Workflow className="h-7 w-7 text-purple-500 mr-3" />
                    Lead Journey Visualization
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Follow the client journey from first click to revenue. Each step is tracked, timestamped, and owned by your marketing pod.
                  </p>
                  <div className="grid gap-6 md:grid-cols-5">
                    {journeySteps.map((step, idx) => (
                      <div key={step.title} className="relative bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-purple-200 transition-colors">
                        <div className="mb-3 inline-flex items-center justify-center h-12 w-12 rounded-full bg-white shadow">
                          {step.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h3>
                        <p className="text-sm text-slate-600">{step.detail}</p>
                        {idx !== journeySteps.length - 1 && (
                          <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                            <ArrowRight className="h-6 w-6 text-purple-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="automations" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Automations with Accountability</h2>
                    <p className="text-slate-600 mt-2">AI keeps your pipeline moving — but humans approve the final moves.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {automations.map((automation) => (
                    <div key={automation.title} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                      <div className="flex items-center mb-4">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                          <automation.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800">{automation.title}</h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{automation.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="va-oversight" className="mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                    <MessageSquare className="h-7 w-7 text-purple-500 mr-3" />
                    Notes from Your VA Pod
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Every campaign gets human oversight. Here are real note styles showing the context and care applied to each interaction.
                  </p>
                  <div className="space-y-6">
                    {vaNotes.map((entry) => (
                      <div key={entry.name} className="border border-slate-200 rounded-2xl p-6 hover:border-purple-200 transition-colors bg-slate-50">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3 text-white font-semibold">
                            {entry.name.split('·')[0].trim().charAt(0)}
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800">{entry.name}</h3>
                        </div>
                        <p className="text-slate-700 mb-3 leading-relaxed">{entry.note}</p>
                        <div className="text-sm font-medium text-purple-600 bg-purple-50 border border-purple-100 rounded-xl px-4 py-2 inline-flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          {entry.highlight}
                        </div>
                      </div>
                    ))}
                  </div>
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

export default CRMSnapshot;
