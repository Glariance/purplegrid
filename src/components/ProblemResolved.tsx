import React from 'react';
import { DollarSign, TrendingDown, Users, Zap, CheckCircle, ArrowRight, Phone, Lightbulb } from 'lucide-react';

const ProblemResolved = () => {
  const problems = [
    "Leads come in",
    "You chase some", 
    "But many go cold",
    "And the cost keeps climbing"
  ];

  const teamMembers = [
    "A dedicated social media assistant to keep your brand alive daily",
    "A cold caller to follow up leads the same day they come in", 
    "A clerical VA to keep your CRM clean and lists fresh",
    "A content & SEO assistant to feed the organic funnel",
    "An ad campaign monitor to adjust bids and pause underperformers"
  ];

  const benefits = [
    "You catch leads faster",
    "You nurture them longer", 
    "You stretch your ad dollars further"
  ];

  const aiHumanTasks = [
    {
      ai: "AI drafts emails & captions",
      human: "humans fine-tune tone"
    },
    {
      ai: "AI summarizes call notes", 
      human: "humans decide next steps"
    },
    {
      ai: "AI flags low-performing ads",
      human: "humans pause & pivot"
    }
  ];

  const frustrations = [
    "Spending thousands on ads that barely convert",
    "Leads going cold because your team is too small",
    "Watching competitors with bigger teams outperform you"
  ];

  const solutions = [
    "5 AI-augmented marketing specialists",
    "Daily execution, follow-ups & campaign tweaks", 
    "For the cost of hiring just one local employee"
  ];

  return (
    <section
      id="problem-resolved"
      className="relative py-20 overflow-hidden text-gray-900"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-purple-200"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(600px at 0% 0%, rgba(147, 51, 234, 0.18), transparent 50%), radial-gradient(500px at 100% 0%, rgba(14, 165, 233, 0.2), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Problem Resolved
          </h1>
        </div>

        {/* Why Small Businesses Burn Cash */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <DollarSign className="h-8 w-8 text-red-500 mr-3" />
            Why most small businesses burn cash on ads
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            If you're a one-person shop or a small team spending thousands each month on Google, Facebook, or TikTok ads… you've probably noticed:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {problems.map((problem, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <p className="text-red-800 font-medium">{problem}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-100 p-6 rounded-xl">
            <p className="text-xl font-semibold text-center text-gray-800">Sound familiar?</p>
          </div>
        </div>

        {/* The Real Problem */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white mb-8">
          <p className="text-xl mb-6">
            That isn't because ads don't work — it's because <span className="text-yellow-300 font-semibold">marketing is an everyday grind.</span>
          </p>
          <p className="text-lg text-gray-200 mb-6">
            It's daily posts, quick replies, smart follow-ups, campaign tweaks, and real human engagement that turns cold traffic into real revenue.
          </p>
          <div className="bg-red-600 p-6 rounded-xl">
            <p className="text-xl font-semibold">But here's the catch:</p>
            <p className="text-lg mt-2">
              hiring the full team you need in the US costs <span className="text-yellow-300 font-bold">$4,000–$6,000 per person per month</span> — before payroll taxes, insurance, and overhead.
            </p>
            <p className="text-lg mt-4 font-medium">Most small businesses simply can't scale like that.</p>
          </div>
        </div>

        {/* Introducing HaaS */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center mb-6">
            <Zap className="h-10 w-10 mr-4" />
            <h2 className="text-3xl font-bold">Introducing HaaS: Human as a Service — powered by AI</h2>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl mb-8">
            <h3 className="text-2xl font-bold mb-4">Imagine this instead:</h3>
            <p className="text-xl">
              For the salary of hiring just one US employee, you get a <span className="text-yellow-300 font-bold">team of five trained human specialists</span> — each using AI tools to do twice the work, twice as fast.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xl font-semibold mb-4">We're talking about:</p>
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-300 mr-3 mt-1 flex-shrink-0" />
                <p className="text-lg">{member}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/10 p-6 rounded-xl mt-8">
            <p className="text-xl text-center">
              All connected in what we call a <span className="text-yellow-300 font-bold">Purple Grid</span>: a human-powered marketing engine, boosted by AI, working for you every day — so leads never go cold again.
            </p>
          </div>
        </div>

        {/* Cost Cutting Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <TrendingDown className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">How it cuts your costs — without cutting leads</h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-6">
            Ad platforms like Google and Facebook charge you for every click.
            But what really matters is what you do after the click:
          </p>

          <div className="bg-yellow-50 p-6 rounded-xl mb-8 border-l-4 border-yellow-400">
            <ul className="space-y-3 text-lg text-gray-800">
              <li>• Are you calling or texting leads within minutes?</li>
              <li>• Are you following up daily, not just once?</li>
              <li>• Are you running A/B tests, pausing bad ads, and adjusting budgets?</li>
            </ul>
            <p className="text-lg font-semibold text-red-600 mt-4">
              Most small teams can't do this consistently — so your cost per conversion skyrockets.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl mb-6">
            <p className="text-lg font-semibold text-green-800 mb-4">By plugging in our AI-augmented human team:</p>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <p className="text-green-800">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-600 p-8 rounded-xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">The result?</h3>
            <p className="text-xl mb-4">
              Even if you keep the same ad spend, your conversion rate improves — effectively cutting your cost per sale by <span className="text-yellow-300 font-bold">up to 50%</span>.
            </p>
            <p className="text-lg">
              Or, keep the same number of sales and cut your ad spend in half. <span className="font-semibold">Your choice.</span>
            </p>
          </div>
        </div>

        {/* AI + Humans Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center mb-6">
            <Users className="h-10 w-10 mr-4" />
            <h2 className="text-3xl font-bold">AI + Humans = The new way to scale marketing</h2>
          </div>
          
          <p className="text-xl mb-8">
            This isn't about replacing humans with AI.<br />
            It's about giving real people the tools to work smarter:
          </p>

          <div className="space-y-6 mb-8">
            {aiHumanTasks.map((task, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="text-blue-200">
                    <span className="font-semibold">AI:</span> {task.ai}
                  </div>
                  <ArrowRight className="h-6 w-6 mx-4" />
                  <div className="text-yellow-300">
                    <span className="font-semibold">Human:</span> {task.human}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <p className="text-xl text-center">
              You still get the nuance, empathy, and brand voice of real people — at the speed & cost-efficiency only AI can unlock.
            </p>
          </div>
        </div>

        {/* Bottom Line Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingDown className="h-8 w-8 text-purple-600 mr-3" />
            The bottom line
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">If you're tired of:</p>
          
          <div className="space-y-4 mb-8">
            {frustrations.map((frustration, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <p className="text-red-800">• {frustration}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-600 p-8 rounded-xl text-white">
            <p className="text-xl font-semibold mb-6 text-center">It's time to plug into the HaaS model:</p>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3" />
                  <p className="text-lg">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-4">🟣 Ready to see what this looks like?</h3>
            <p className="text-xl">
              Let's talk about how Purple Grid Marketing can help your business grow — not your payroll.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              Book a free consultation
            </button>
            <button className="border-2 border-purple-300 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center">
              <Lightbulb className="mr-2 h-5 w-5" />
              Get a custom ROI forecast
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemResolved;
