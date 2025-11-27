import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, PenTool } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { blogPosts, latestPosts } from './blogData';

const articleHighlights = [
  {
    title: 'Automation Without Losing the Human Touch',
    description:
      'Build workflows that keep your brand voice front and center while automating the tedious parts of customer engagement.',
  },
  {
    title: 'From Idea to Iteration in Days',
    description:
      'How our sprint methodology keeps feedback loops tight so your marketing collateral and funnels evolve with your audience.',
  },
  {
    title: 'Transparent Metrics You Can Trust',
    description:
      'See the impact of every campaign with dashboards that surface the KPIs that matter to leadership teams and operators alike.',
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <section className="relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080018] via-[#2b0050] to-[#d100ff]" aria-hidden="true" />
          <div className="absolute -top-28 left-1/4 w-[520px] h-[520px] bg-[#d100ff] opacity-30 blur-[200px] animate-pulse-glow" aria-hidden="true" />
          <div
            className="absolute -bottom-40 right-1/5 w-[560px] h-[560px] bg-[#5A00B0] opacity-30 blur-[220px] animate-pulse-glow"
            style={{ animationDelay: '1.5s' }}
            aria-hidden="true"
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-purple-200 bg-purple-800/60 px-3 py-1 rounded-full border border-purple-700">
                  <PenTool className="h-4 w-4" />
                  Insights & Ideas
                </span>
                <h1 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight">
                  Fuel your marketing strategy with growth-ready ideas
                </h1>
                <p className="mt-4 text-lg text-purple-100 leading-relaxed">
                  Follow along as the Purple Grid team shares frameworks, playbooks, and behind-the-scenes
                  learnings from building AI-augmented marketing squads for fast-moving brands.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-purple-500/40 rounded-2xl p-6 lg:w-[340px]">
                <h2 className="text-xl font-semibold mb-4">Stay in the know</h2>
                <p className="text-sm text-purple-100">
                  Join founders, CMOs, and growth operators receiving actionable guidance every month.
                </p>
                <form className="mt-6 space-y-4">
                  <input
                    type="email"
                    placeholder="Business email"
                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder:text-purple-400 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-purple-800 font-semibold py-3 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col rounded-2xl border border-purple-100 bg-white shadow-md shadow-purple-900/5 overflow-hidden"
              >
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500" aria-hidden="true" />
                <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="aspect-video w-full overflow-hidden bg-purple-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-purple-600">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{post.summary}</p>
                  </div>
                  <div className="px-6 py-4 border-t border-purple-50 bg-purple-50/60">
                    <div className="flex items-center gap-2 text-sm font-semibold text-purple-700 group-hover:text-purple-800">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-1 text-xs text-purple-500">{post.readTime}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white/90 shadow-lg shadow-purple-900/5">
            <div className="border-b border-purple-100 px-6 py-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Latest on the Blog</h2>
                <p className="mt-1 text-sm text-purple-600">
                  Fresh playbooks and experiments from the Purple Grid marketing floor.
                </p>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="divide-y divide-purple-100">
              {latestPosts.map((post) => (
                <li
                  key={post.slug}
                  className="group px-6 py-5 hover:bg-purple-50/60 transition-colors"
                >
                  <Link to={`/blog/${post.slug}`} className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="h-20 w-full sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-purple-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-wide text-purple-600 font-semibold">
                            {post.category}
                          </p>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 leading-snug">
                            {post.title}
                          </h3>
                        </div>
                        <ArrowRight className="h-5 w-5 text-purple-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{post.summary}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-800 text-white p-10 shadow-2xl shadow-purple-900/30">
            <div className="grid gap-10 md:grid-cols-3">
              {articleHighlights.map((highlight) => (
                <div key={highlight.title} className="space-y-3">
                  <h3 className="text-xl font-semibold">{highlight.title}</h3>
                  <p className="text-sm text-purple-100 leading-relaxed">{highlight.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-lg font-semibold">Need traction faster?</p>
                <p className="text-sm text-purple-200">
                  Explore how our embedded marketing pods become a force multiplier for your in-house team.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-purple-800 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-100 transition-colors"
              >
                Connect With Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
