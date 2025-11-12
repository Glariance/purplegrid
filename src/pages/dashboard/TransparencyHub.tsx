import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3, 
  Brain,
  Calendar,
  CheckCircle, 
  Clock, 
  DollarSign,
  Eye,
  FileText,
  Globe,
  Home,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Target, 
  TrendingUp, 
  User,
  Users, 
  Zap
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import SlideInSection from '../../components/SlideInSection';
import AnimatedNumber from '../../components/AnimatedNumber';
import { faqs } from '../../data/faqs';

const TransparencyHub = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedVA, setSelectedVA] = useState('all');
  const location = useLocation();
  const { pathname } = location;

  const overallStats = {
    totalTasks: 847,
    completedTasks: 782,
    activeCampaigns: 12,
    totalLeads: 156,
    conversionRate: 23.4
  };

  const weeklyMetrics = [
    { day: 'Mon', tasks: 45, calls: 32, posts: 8, leads: 12 },
    { day: 'Tue', tasks: 52, calls: 28, posts: 12, leads: 15 },
    { day: 'Wed', tasks: 38, calls: 35, posts: 10, leads: 9 },
    { day: 'Thu', tasks: 61, calls: 42, posts: 15, leads: 18 },
    { day: 'Fri', tasks: 48, calls: 38, posts: 11, leads: 14 },
    { day: 'Sat', tasks: 25, calls: 15, posts: 6, leads: 7 },
    { day: 'Sun', tasks: 18, calls: 8, posts: 4, leads: 3 }
  ];

  const getPerformanceColor = (value: number, threshold: number) => {
    if (value >= threshold) return 'text-green-600';
    if (value >= threshold * 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceIcon = (value: number, threshold: number) => {
    return value >= threshold ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const vaPerformance = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Social Media Assistant',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
      stats: {
        postsCreated: 45,
        engagement: 12.8,
        tasksCompleted: 89,
        efficiency: 94
      },
      recentActivity: [
        'Created 5 Instagram posts for client campaign',
        'Responded to 23 comments and DMs',
        'Scheduled 12 posts for next week'
      ]
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Cold Caller / Closer',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
      stats: {
        callsMade: 127,
        contactRate: 68,
        appointmentsSet: 23,
        conversionRate: 18.1
      },
      recentActivity: [
        'Made 35 cold calls today',
        'Set 4 qualified appointments',
        'Updated CRM with 28 lead statuses'
      ]
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'SEO/Content VA',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
      stats: {
        articlesWritten: 12,
        keywordsRanked: 34,
        organicTraffic: 156,
        contentScore: 92
      },
      recentActivity: [
        'Published 3 blog articles this week',
        'Optimized 8 existing pages for SEO',
        'Researched 25 new target keywords'
      ]
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Ads Campaign Monitor',
      avatar: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=150',
      stats: {
        campaignsManaged: 8,
        adSpend: 4250,
        roas: 3.2,
        optimizations: 15
      },
      recentActivity: [
        'Optimized 3 Facebook ad campaigns',
        'Paused 2 underperforming ad sets',
        'Created 5 new ad variations'
      ]
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Clerical VA',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=150',
      stats: {
        dataEntries: 234,
        emailsProcessed: 156,
        documentsCreated: 28,
        accuracy: 98.5
      },
      recentActivity: [
        'Processed 45 customer inquiries',
        'Updated CRM with 67 new contacts',
        'Created 8 client reports'
      ]
    }
  ];

  // Mock data for demonstration
  const taskStats = {
    completed: 32,
    inProgress: 8,
    pendingReview: 3,
    totalHours: 156
  };

  const leadFlow = [
    { stage: 'New Leads', count: 47, change: '+15%', color: 'blue' },
    { stage: 'Contacted', count: 38, change: '+8%', color: 'purple' },
    { stage: 'Follow-ups', count: 29, change: '+12%', color: 'orange' },
    { stage: 'Conversions', count: 11, change: '+23%', color: 'green' }
  ];

  const campaignHealth = [
    {
      platform: 'Facebook',
      status: 'Healthy',
      cpc: '$0.87',
      ctr: '3.2%',
      cpa: '$24.50',
      trend: 'up',
      color: 'green'
    },
    {
      platform: 'Google',
      status: 'Needs Attention',
      cpc: '$1.45',
      ctr: '2.1%',
      cpa: '$38.20',
      trend: 'down',
      color: 'yellow'
    },
    {
      platform: 'TikTok',
      status: 'Healthy',
      cpc: '$0.62',
      ctr: '4.8%',
      cpa: '$19.30',
      trend: 'up',
      color: 'green'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'Social Media Specialist',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
      hoursLogged: 38,
      productivity: 94,
      tasksCompleted: 12
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Cold Caller',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
      hoursLogged: 35,
      productivity: 89,
      tasksCompleted: 15
    },
    {
      name: 'Priya Patel',
      role: 'Content Specialist',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
      hoursLogged: 40,
      productivity: 96,
      tasksCompleted: 8
    }
  ];

  const aiHumanBreakdown = {
    aiHandled: 65,
    humanOptimized: 35,
    aiTasks: [
      'Content scheduling',
      'Lead scoring',
      'Data entry',
      'Report generation'
    ],
    humanTasks: [
      'Creative strategy',
      'Client communication',
      'Campaign optimization',
      'Relationship building'
    ]
  };

  const recentActivities = [
    { time: '2 hours ago', activity: 'Facebook campaign optimized - CPA reduced by 15%', type: 'success' },
    { time: '4 hours ago', activity: 'New lead qualification completed - 3 hot prospects identified', type: 'info' },
    { time: '6 hours ago', activity: 'Content calendar updated for next week', type: 'info' },
    { time: '1 day ago', activity: 'Google Ads budget reallocation - improved ROAS by 12%', type: 'success' },
    { time: '1 day ago', activity: 'Weekly client report generated and sent', type: 'info' }
  ];

  const navigationItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Task Snapshot', href: '#task-snapshot' },
    { label: 'Key Metrics', href: '#key-metrics' },
    { label: 'Lead Pipeline', href: '#lead-pipeline' },
    { label: 'Campaign Health', href: '#campaign-health' },
    { label: 'Performance Trends', href: '#performance-trends' },
    { label: 'Team Performance', href: '#team-performance' },
    { label: 'VA Spotlight', href: '#va-performance' },
    { label: 'AI vs Human', href: '#ai-human' },
    { label: 'Activity Timeline', href: '#activity-timeline' },
    { label: 'Alerts & Insights', href: '#alerts' },
    { label: 'Client Access', href: '#client-access' }
  ];

  const pageLinks = [
    { label: 'Transparency Hub', to: '/transparency-hub' },
    { label: 'CRM Snapshot', to: '/crm-snapshot' },
    { label: 'Meet Your Grid', to: '/meet-your-grid' },
    { label: 'Client Portal', to: '/client-portal' },
    { label: 'Logout', to: '/' }
  ];

  const scrollAccountContentIntoView = useCallback(() => {
    const anchor = document.getElementById('task-snapshot');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const shouldAutoScrollToAccountContent = Boolean(
    (location.state as { scrollToAccountContent?: boolean } | null)?.scrollToAccountContent
  );

  useEffect(() => {
    if (!shouldAutoScrollToAccountContent) return;

    const timeout = window.setTimeout(() => {
      scrollAccountContentIntoView();
    }, 150);

    return () => window.clearTimeout(timeout);
  }, [shouldAutoScrollToAccountContent, pathname, scrollAccountContentIntoView]);

  const handleAccountPageLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetPath: string
  ) => {
    if (pathname === targetPath) {
      event.preventDefault();
      scrollAccountContentIntoView();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'text-green-600 bg-green-100';
      case 'Needs Attention': return 'text-yellow-600 bg-yellow-100';
      case 'Paused': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <ArrowUp className="h-4 w-4 text-green-500" /> : <ArrowDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <SlideInSection id="overview" className="relative overflow-hidden text-white py-6 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
        <div className="absolute -top-28 left-1/4 w-[500px] h-[500px] bg-[#d100ff] opacity-30 blur-[180px] animate-pulse-glow" aria-hidden="true" />
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
              <Eye className="h-5 w-5 mr-2 text-blue-300" />
              <span className="text-blue-200 font-medium">Live Transparency Dashboard</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Transparency in Action
            </h1>
            <p className="text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto mb-6">
              Real-time insights into your campaigns, leads, and team performance.
              See exactly what we're doing to grow your business, updated daily.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <BarChart3 className="inline-block mr-2 h-5 w-5" />
              View My Dashboard
            </button>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-3 border border-white/40 rounded-xl bg-white/10 text-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="day" className="text-slate-900">Today</option>
                <option value="week" className="text-slate-900">This Week</option>
                <option value="month" className="text-slate-900">This Month</option>
                <option value="quarter" className="text-slate-900">This Quarter</option>
              </select>
              <select
                value={selectedVA}
                onChange={(e) => setSelectedVA(e.target.value)}
                className="px-4 py-3 border border-white/40 rounded-xl bg-white/10 text-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="all" className="text-slate-900">All VAs</option>
                <option value="social" className="text-slate-900">Social Media</option>
                <option value="caller" className="text-slate-900">Cold Caller</option>
                <option value="seo" className="text-slate-900">SEO/Content</option>
                <option value="ads" className="text-slate-900">Ads Monitor</option>
                <option value="clerical" className="text-slate-900">Clerical</option>
              </select>
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
      </SlideInSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:hidden mb-8 space-y-3">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {pageLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  state={{ scrollToAccountContent: true }}
                  onClick={(event) => handleAccountPageLinkClick(event, link.to)}
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
                          state={{ scrollToAccountContent: true }}
                          onClick={(event) => handleAccountPageLinkClick(event, link.to)}
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
                <h4 className="text-lg font-semibold mb-2">Need Help?</h4>
                <p className="text-sm text-purple-100 mb-4">
                  Connect with your account strategist for a live walkthrough of your metrics.
                </p>
                <button className="w-full bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors">
                  Request Call
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {/* Task Snapshot */}
        <SlideInSection id="task-snapshot" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            Task Snapshot
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-slate-800">
                  <AnimatedNumber value={taskStats.completed} />
                </span>
              </div>
              <p className="text-slate-600 font-medium">Tasks Completed</p>
              <div className="mt-3 bg-green-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-slate-800">
                  <AnimatedNumber value={taskStats.inProgress} />
                </span>
              </div>
              <p className="text-slate-600 font-medium">In Progress</p>
              <div className="mt-3 bg-blue-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-slate-800">
                  <AnimatedNumber value={taskStats.pendingReview} />
                </span>
              </div>
              <p className="text-slate-600 font-medium">Pending Review</p>
              <div className="mt-3 bg-yellow-100 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-slate-800">
                  <AnimatedNumber value={taskStats.totalHours} />
                </span>
              </div>
              <p className="text-slate-600 font-medium">Hours This Week</p>
              <div className="mt-3 bg-purple-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </SlideInSection>

        {/* Key Metrics */}
        <SlideInSection id="key-metrics" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Key Metrics Overview</h2>
              <p className="text-slate-600 mt-2">Snapshot of performance for the selected timeframe and team focus.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Tasks</p>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedNumber value={overallStats.totalTasks} />
                </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                +12% from last week
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Completion Rate</p>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedNumber
                    value={(overallStats.completedTasks / overallStats.totalTasks) * 100}
                    decimals={1}
                    suffix="%"
                  />
                </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                +3.2% from last week
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Active Campaigns</p>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedNumber value={overallStats.activeCampaigns} />
                </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                +2 new this week
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Leads</p>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedNumber value={overallStats.totalLeads} />
                </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                +18% from last week
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-900">
                  <AnimatedNumber value={overallStats.conversionRate} suffix="%" />
                </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                +5.3% from last week
              </div>
            </div>
          </div>
        </SlideInSection>

        {/* Lead Flow Overview */}
        <SlideInSection id="lead-pipeline" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
            <Target className="h-8 w-8 text-blue-600 mr-3" />
            Lead Flow Overview
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="grid md:grid-cols-4 gap-6">
              {leadFlow.map((stage, index) => (
                <div key={index} className="text-center relative">
                  <div className={`bg-${stage.color}-100 p-6 rounded-2xl mb-4 hover:shadow-lg transition-shadow`}>
                    <div className={`text-3xl font-bold text-${stage.color}-600 mb-2`}>
                      <AnimatedNumber value={stage.count} />
                    </div>
                    <p className="text-slate-700 font-medium">{stage.stage}</p>
                    <div className={`inline-flex items-center mt-2 px-3 py-1 bg-${stage.color}-200 rounded-full`}>
                      <ArrowUp className={`h-4 w-4 text-${stage.color}-600 mr-1`} />
                      <span className={`text-sm font-medium text-${stage.color}-700`}>{stage.change}</span>
                    </div>
                  </div>
                  {index < leadFlow.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <div className="w-6 h-0.5 bg-slate-300"></div>
                      <div className="w-0 h-0 border-l-4 border-l-slate-300 border-t-2 border-t-transparent border-b-2 border-b-transparent absolute -right-1 top-1/2 transform -translate-y-1/2"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SlideInSection>

        {/* Campaign Health */}
        <SlideInSection id="campaign-health" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
            <BarChart3 className="h-8 w-8 text-green-600 mr-3" />
            Campaign Health Monitor
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {campaignHealth.map((campaign, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Globe className="h-6 w-6 text-slate-600 mr-2" />
                    <h3 className="text-xl font-bold text-slate-800">{campaign.platform}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">CPC</span>
                    <div className="flex items-center">
                      <span className="font-bold text-slate-800 mr-2">{campaign.cpc}</span>
                      {getTrendIcon(campaign.trend)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">CTR</span>
                    <div className="flex items-center">
                      <span className="font-bold text-slate-800 mr-2">{campaign.ctr}</span>
                      {getTrendIcon(campaign.trend)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">CPA</span>
                    <div className="flex items-center">
                      <span className="font-bold text-slate-800 mr-2">{campaign.cpa}</span>
                      {getTrendIcon(campaign.trend)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className={`h-2 ${campaign.color === 'green' ? 'bg-green-100' : campaign.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'} rounded-full`}>
                    <div className={`h-2 ${campaign.color === 'green' ? 'bg-green-500' : campaign.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'} rounded-full transition-all duration-500`} 
                         style={{ width: campaign.color === 'green' ? '85%' : campaign.color === 'yellow' ? '60%' : '40%' }}>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SlideInSection>

        {/* Performance Trends */}
        <SlideInSection id="performance-trends" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Performance Trends</h2>
            <p className="text-slate-600 mb-6">Daily breakdown of task volume, call activity, content output, and lead generation.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {weeklyMetrics.map((day, index) => (
                <div key={index} className="text-center bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-sm font-medium text-slate-600 mb-4">{day.day}</p>
                  <div className="space-y-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <p className="text-xs text-blue-600">Tasks</p>
                      <p className="font-bold text-blue-900">{day.tasks}</p>
                    </div>
                    <div className="bg-green-100 p-2 rounded">
                      <p className="text-xs text-green-600">Calls</p>
                      <p className="font-bold text-green-900">{day.calls}</p>
                    </div>
                    <div className="bg-purple-100 p-2 rounded">
                      <p className="text-xs text-purple-600">Posts</p>
                      <p className="font-bold text-purple-900">{day.posts}</p>
                    </div>
                    <div className="bg-orange-100 p-2 rounded">
                      <p className="text-xs text-orange-600">Leads</p>
                      <p className="font-bold text-orange-900">{day.leads}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideInSection>

        {/* Team Performance */}
        <SlideInSection id="team-performance" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
            <Users className="h-8 w-8 text-purple-600 mr-3" />
            Team Performance Snapshot
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-slate-800">{member.name}</h3>
                    <p className="text-slate-600 text-sm">{member.role}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">Hours Logged</span>
                      <span className="font-bold text-slate-800">{member.hoursLogged}h</span>
                    </div>
                    <div className="bg-blue-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                           style={{ width: `${(member.hoursLogged / 40) * 100}%` }}>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">Productivity</span>
                      <span className="font-bold text-slate-800">{member.productivity}%</span>
                    </div>
                    <div className="bg-green-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                           style={{ width: `${member.productivity}%` }}>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Tasks Completed</span>
                      <span className="font-bold text-green-600">{member.tasksCompleted}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SlideInSection>

        {/* VA Spotlight */}
        <SlideInSection id="va-performance" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">VA Performance Spotlight</h2>
                <p className="text-slate-600 mt-2">Role-specific highlights and output metrics for each team member.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {vaPerformance.map((va) => (
                <div key={va.id} className="border rounded-2xl p-5 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={va.avatar}
                        alt={va.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">{va.name}</h4>
                        <p className="text-sm text-slate-500">{va.role}</p>
                      </div>
                    </div>
                    <div className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Top Performer
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase mb-1">Primary Metric</p>
                      <p className="text-lg font-bold text-slate-900">
                        {va.role === 'Social Media Assistant' && `${va.stats.postsCreated} Posts`}
                        {va.role === 'Cold Caller / Closer' && `${va.stats.callsMade} Calls`}
                        {va.role === 'SEO/Content VA' && `${va.stats.articlesWritten} Articles`}
                        {va.role === 'Ads Campaign Monitor' && `${va.stats.campaignsManaged} Campaigns`}
                        {va.role === 'Clerical VA' && `${va.stats.dataEntries} Entries`}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">Primary output delivered</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase mb-1">Success Metric</p>
                      <p className="text-lg font-bold text-slate-900">
                        {va.role === 'Social Media Assistant' && `${va.stats.engagement}% Engagement`}
                        {va.role === 'Cold Caller / Closer' && `${va.stats.conversionRate}% Close Rate`}
                        {va.role === 'SEO/Content VA' && `${va.stats.keywordsRanked} Keywords`}
                        {va.role === 'Ads Campaign Monitor' && `${va.stats.roas}x ROAS`}
                        {va.role === 'Clerical VA' && `${va.stats.accuracy}% Accuracy`}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">Quality or efficiency metric</p>
                    </div>
                  </div>

                  {va.role === 'Social Media Assistant' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <MessageSquare className="h-5 w-5 text-purple-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.postsCreated, 40)}`}>
                            {getPerformanceIcon(va.stats.postsCreated, 40)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.postsCreated}</p>
                        <p className="text-xs text-slate-600">Posts Created</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.engagement, 10)}`}>
                            {getPerformanceIcon(va.stats.engagement, 10)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.engagement}%</p>
                        <p className="text-xs text-slate-600">Engagement Rate</p>
                      </div>
                    </div>
                  )}

                  {va.role === 'Cold Caller / Closer' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Phone className="h-5 w-5 text-green-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.callsMade, 100)}`}>
                            {getPerformanceIcon(va.stats.callsMade, 100)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.callsMade}</p>
                        <p className="text-xs text-slate-600">Calls Made</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Calendar className="h-5 w-5 text-orange-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.appointmentsSet, 20)}`}>
                            {getPerformanceIcon(va.stats.appointmentsSet, 20)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.appointmentsSet}</p>
                        <p className="text-xs text-slate-600">Appointments Set</p>
                      </div>
                    </div>
                  )}

                  {va.role === 'SEO/Content VA' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-indigo-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <FileText className="h-5 w-5 text-indigo-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.articlesWritten, 10)}`}>
                            {getPerformanceIcon(va.stats.articlesWritten, 10)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.articlesWritten}</p>
                        <p className="text-xs text-slate-600">Articles Written</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Search className="h-5 w-5 text-green-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.keywordsRanked, 30)}`}>
                            {getPerformanceIcon(va.stats.keywordsRanked, 30)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.keywordsRanked}</p>
                        <p className="text-xs text-slate-600">Keywords Ranked</p>
                      </div>
                    </div>
                  )}

                  {va.role === 'Ads Campaign Monitor' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <BarChart3 className="h-5 w-5 text-red-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.campaignsManaged, 5)}`}>
                            {getPerformanceIcon(va.stats.campaignsManaged, 5)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.campaignsManaged}</p>
                        <p className="text-xs text-slate-600">Campaigns Managed</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.roas, 3)}`}>
                            {getPerformanceIcon(va.stats.roas, 3)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.roas}x</p>
                        <p className="text-xs text-slate-600">ROAS</p>
                      </div>
                    </div>
                  )}

                  {va.role === 'Clerical VA' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.dataEntries, 200)}`}>
                            {getPerformanceIcon(va.stats.dataEntries, 200)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.dataEntries}</p>
                        <p className="text-xs text-slate-600">Data Entries</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Mail className="h-5 w-5 text-green-600" />
                          <span className={`text-sm font-medium ${getPerformanceColor(va.stats.emailsProcessed, 150)}`}>
                            {getPerformanceIcon(va.stats.emailsProcessed, 150)}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mt-1">{va.stats.emailsProcessed}</p>
                        <p className="text-xs text-slate-600">Emails Processed</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h5 className="font-medium text-slate-900 mb-2">Recent Activity</h5>
                    <div className="space-y-2">
                      {va.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-slate-600">{activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideInSection>

        {/* AI + Human Breakdown */}
        <SlideInSection id="ai-human" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
            <Zap className="h-8 w-8 text-yellow-600 mr-3" />
            AI + Human Breakdown
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="text-center mb-8">
              <p className="text-xl text-slate-600 mb-6">AI streamlines, Humans perfect</p>
              <div className="flex justify-center items-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{aiHumanBreakdown.aiHandled}%</div>
                  <p className="text-slate-600">AI-Handled</p>
                </div>
                <div className="w-px h-16 bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{aiHumanBreakdown.humanOptimized}%</div>
                  <p className="text-slate-600">Human-Optimized</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-bold text-slate-800">AI-Handled Tasks</h3>
                </div>
                <ul className="space-y-3">
                  {aiHumanBreakdown.aiTasks.map((task, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-slate-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <User className="h-6 w-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-bold text-slate-800">Human-Optimized Efforts</h3>
                </div>
                <ul className="space-y-3">
                  {aiHumanBreakdown.humanTasks.map((task, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-slate-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SlideInSection>

        {/* Recent Activity Timeline */}
        <SlideInSection id="activity-timeline" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
            <Activity className="h-8 w-8 text-green-600 mr-3" />
            Recent Activity Timeline
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="space-y-6">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-3 h-3 rounded-full mt-2 mr-4 ${activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium">{activity.activity}</p>
                    <p className="text-slate-500 text-sm mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideInSection>

        {/* Alerts & Insights */}
        <SlideInSection id="alerts" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Alerts & Insights</h2>
            <p className="text-slate-600 mb-6">Automated signals highlighting wins, risks, and opportunities.</p>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-green-50 rounded-xl border border-green-100">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Excellent Performance</p>
                  <p className="text-sm text-green-700">Sarah Chen exceeded her social media engagement target by 28% this week.</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Attention Needed</p>
                  <p className="text-sm text-yellow-700">Ad campaign #3 has a declining ROAS. James is optimizing targeting parameters.</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-blue-50 rounded-xl border border-blue-100">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Growth Opportunity</p>
                  <p className="text-sm text-blue-700">Lead conversion rate increased 15% after implementing new follow-up sequences.</p>
                </div>
              </div>
            </div>
          </div>
        </SlideInSection>

        {/* FAQs */}
        <SlideInSection id="faqs" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">Frequently Asked Questions</h2>
                <p className="text-slate-600 mt-2 max-w-2xl">
                  The same answers we give prospects before onboarding so everyone knows how pods operate, communicate, and report.
                </p>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full">
                <Users className="h-4 w-4 mr-2" />
                500+ pods deployed
              </div>
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {faqs.map((group) => (
                <div key={group.category} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                      <group.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">{group.category}</h3>
                  </div>

                  <div className="space-y-5">
                    {group.questions.map((qa) => (
                      <div key={qa.question} className="border border-slate-200 rounded-2xl p-5 bg-white hover:border-purple-200 transition-colors">
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">{qa.question}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{qa.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideInSection>

        {/* Client Access */}
        <SlideInSection id="client-access" className="mb-12 scroll-mt-32 lg:scroll-mt-40">
          <div className="bg-gradient-to-r from-slate-800 to-blue-900 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Access Your Full Dashboard</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Your data, updated daily — accessible 24/7. Get deeper insights, detailed reports, 
              and real-time notifications about your campaigns and team performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-slate-800 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
                <Eye className="inline-block mr-2 h-5 w-5" />
                Client Login
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                <Calendar className="inline-block mr-2 h-5 w-5" />
                Schedule Demo
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-6">
              Powered by advanced CRM integration • Updated every 15 minutes
            </p>
          </div>
        </SlideInSection>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default TransparencyHub;
