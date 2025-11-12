import React from 'react';
import {
  PhoneIncoming,
  NotebookPen,
  Users,
  Rocket,
  LineChart,
  Workflow,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  Brain,
  MessageCircle
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const steps = [
  {
    title: 'Discovery Call',
    description: 'Clarify goals, current funnel performance, and success metrics. Outline immediate quick wins and campaign roadmap.',
    icon: PhoneIncoming,
    deliverables: ['Pod introduction', 'Goal alignment', 'Audit checklist']
  },
  {
    title: 'Brand Onboarding & SOP Setup',
    description: 'Gather assets, tone of voice, scripts, and process preferences. Build a shared playbook in Notion + Loom for approval.',
    icon: NotebookPen,
    deliverables: ['Messaging matrix', 'Channel access', 'Approval workflows']
  },
  {
    title: 'Team Allocation (with AI tools)',
    description: 'Select the right pod members, configure AI stack access, and assign responsibilities across strategy, outreach, and ops.',
    icon: Users,
    deliverables: ['Pod roster', 'AI toolkit mapped', 'Coverage calendar']
  },
  {
    title: 'Launch & Daily Reporting',
    description: 'Activate campaigns, automations, and live dashboards. Share daily performance digest and prioritized action items.',
    icon: Rocket,
    deliverables: ['Campaign launch', 'Live dashboards', 'Daily digest']
  },
  {
    title: 'Monthly ROI Review & Optimization',
    description: 'Review ROI against goals, highlight big wins, and plan next experiments. Update SOPs based on what’s working best.',
    icon: LineChart,
    deliverables: ['ROI scorecard', 'Experiment roadmap', 'SOP updates']
  }
];

const flowNodes = [
  {
    title: 'Client Vision',
    detail: 'Discovery call captures objectives, markets, and KPIs.',
    accent: 'from-purple-500 to-blue-500',
    icon: Sparkles
  },
  {
    title: 'Shared Playbook',
    detail: 'Onboarding converts your brand into SOPs, scripts, and asset libraries.',
    accent: 'from-blue-500 to-indigo-500',
    icon: ClipboardList
  },
  {
    title: 'Pod + AI Stack',
    detail: 'Specialists + AI automations orchestrate outreach, ads, and workflows.',
    accent: 'from-indigo-500 to-slate-500',
    icon: Brain
  },
  {
    title: 'Daily Execution',
    detail: 'Campaigns run, leads are nurtured, and reports highlight wins and risks.',
    accent: 'from-slate-500 to-emerald-500',
    icon: Workflow
  },
  {
    title: 'Results & Iteration',
    detail: 'Monthly ROI reviews feed insights back, optimizing the entire loop.',
    accent: 'from-emerald-500 to-purple-500',
    icon: LineChart
  }
];

const ProcessFlow = () => {
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">The Process Flow</h1>
            <p className="text-lg text-purple-100 max-w-3xl leading-relaxed">
              Understand every phase after onboarding—from your discovery call through monthly ROI reviews—so you know
              exactly how Purple Grid’s pods turn strategy into measurable execution.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
              <section id="steps" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Step-by-Step Flow</h2>
                    <p className="text-slate-600 mt-2">
                      Each phase is owned by your pod with clear deliverables, so you always know what’s happening and what’s next.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Go-live in as little as 14 days
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {steps.map((step, index) => (
                    <div key={step.title} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:border-purple-200 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                          <step.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-slate-400">Step {index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">{step.description}</p>
                      <div className="space-y-2">
                        {step.deliverables.map((item) => (
                          <div key={item} className="flex items-center text-sm text-purple-600 font-medium">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="flow-diagram" className="mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                    <Workflow className="h-7 w-7 text-purple-500 mr-3" />
                    Workstream Diagram: From Client to Results
                  </h2>
                  <p className="text-slate-600 mb-8 max-w-3xl">
                    This linear journey keeps every stakeholder aligned. As assets move from discovery to execution, AI assists each stage while humans sign off on quality.
                  </p>
                  <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-8 text-white shadow-xl">
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {flowNodes.map((node, idx) => (
                        <div key={node.title} className="relative">
                          <div className={`rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 h-full`}>
                            <div className={`inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br ${node.accent} mb-4`}>
                              <node.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{node.title}</h3>
                            <p className="text-sm text-white/80 leading-relaxed">{node.detail}</p>
                          </div>
                          {idx !== flowNodes.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                              <ArrowRight className="h-6 w-6 text-white/60" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section id="deliverables" className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">What You Receive at Every Stage</h2>
                    <p className="text-slate-600 mt-2">
                      Transparent outcomes and communication. No guesswork — just clear deliverables and ownership from day one.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 font-semibold rounded-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Daily + Monthly touchpoints
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Launch Week</h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                        Full audit + strategy roadmap
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                        Pod roster & communication channel setup
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                        AI automations configured and tested
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Ongoing Execution</h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                        Daily performance digest + dashboard
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                        Live Slack / email updates on hot leads and campaign shifts
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                        Weekly experiment recap from pod lead
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Monthly Optimization</h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                        ROI review meeting + scorecard
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                        Updated experiment backlog + roadmap
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                        SOP and automation enhancements
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProcessFlow;
