import React from 'react';
import {
  Lock,
  BarChart3,
  MessageCircle,
  FileText,
  Download,
  ShieldCheck,
  ClipboardList,
  ArrowRight,
  Users,
  Activity,
  CalendarDays,
  Home
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';

const portalFeatures = [
  {
    title: 'Live CRM Access',
    description: 'Log in to the Transparency Hub for real-time pipeline visibility, lead notes, and pod activity.',
    icon: BarChart3,
    badge: 'Realtime'
  },
  {
    title: 'Weekly Reports & Insights',
    description: 'Auto-delivered PDF + Loom recap curated by your Pod Leader — key experiments, wins, and next moves.',
    icon: ClipboardList,
    badge: 'Every Friday'
  },
  {
    title: 'Chat & Feedback Module',
    description: 'Centralized communications hub for quick questions, approvals, and escalation requests.',
    icon: MessageCircle,
    badge: 'Always-on'
  },
  {
    title: 'Monthly Summary Downloads',
    description: 'Exportable scorecards, KPI rollups, and financial breakdowns for stakeholder sharing.',
    icon: Download,
    badge: 'Executive View'
  }
];

const futureRoadmap = [
  {
    title: 'Role-Based Access Control',
    detail: 'Invite internal stakeholders with granular permissions (read, comment, approve).',
    icon: ShieldCheck
  },
  {
    title: 'In-Portal Scheduling',
    detail: 'Book strategy sessions, pod standups, and performance reviews without leaving the portal.',
    icon: CalendarDays
  },
  {
    title: 'AI Insights Feed',
    detail: 'Automated alerts summarizing anomalies, win stories, and next best actions for your funnel.',
    icon: Activity
  }
];

const ClientPortal = () => {
  const { pathname } = useLocation();

  const navigationItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Key Features', href: '#features' },
    { label: 'Security & Access', href: '#security' },
    { label: 'Roadmap', href: '#roadmap' }
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
                <Lock className="h-5 w-5 mr-2 text-blue-300" />
                <span className="text-blue-200 font-medium">Your Private Command Center</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Client Portal Login
              </h1>
              <p className="text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto mb-6">
                Centralize collaboration, analytics, and approvals. Step into the same environment your Purple Grid pod works in every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors">
                  Request Portal Access
                </button>
              <button className="px-6 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
                Watch Portal Demo
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
                  <h4 className="text-lg font-semibold mb-2">Want early access?</h4>
                  <p className="text-sm text-purple-100 mb-4">
                    We’re rolling out portal accounts in waves. Join the waitlist to be among the first.
                  </p>
                  <button className="w-full bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors">
                    Join the Waitlist
                  </button>
                </div>
              </div>
            </aside>

            <div className="flex-1 space-y-12">
              <section id="features" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Portal Features</h2>
                    <p className="text-slate-600 mt-2">Everything you need to inspect the pipeline, communicate fast, and download reports.</p>
                  </div>
                  <div className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
                    <Users className="h-4 w-4 mr-2" />
                    Pod + client alignment
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {portalFeatures.map((feature) => (
                    <div key={feature.title} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                          <feature.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
                          {feature.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="security" className="mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-4">Security & Access</h2>
                      <p className="text-slate-600 mb-4">
                        The portal inherits the same trust standards as the rest of Purple Grid. Only verified users receive access, and trails are maintained on every interaction.
                      </p>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                          SSO + 2FA via your identity provider
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                          Role-based permissions for internal stakeholders
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                          Audit logs for downloads, comments, and approvals
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-slate-900 text-white rounded-2xl p-6 shadow-lg">
                      <h3 className="text-xl font-semibold mb-3">What’s available today?</h3>
                      <p className="text-sm text-purple-100 mb-6">
                        Live dashboards, file downloads, and chat integration are in private beta. Client-managed user roles and in-portal scheduling launch in the next phase.
                      </p>
                      <button className="px-5 py-2 rounded-xl bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-colors">
                        See Security Overview
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section id="roadmap" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Coming Soon to the Portal</h2>
                    <p className="text-slate-600 mt-2">We’re building deeper controls and AI-driven assistance.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {futureRoadmap.map((item) => (
                    <div key={item.title} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
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

export default ClientPortal;
