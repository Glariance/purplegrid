import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { blogPosts, latestPosts } from './blogData';

const BlogDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);
  const recentPosts = (latestPosts.length ? latestPosts : blogPosts)
    .filter((item) => item.slug !== slug)
    .slice(0, 4);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white border border-red-100 text-red-700 rounded-2xl p-10 shadow-sm">
            <h1 className="text-2xl font-semibold mb-4">Article not found</h1>
            <p className="text-gray-700 mb-6">
              We couldn't find the article you're looking for. Try heading back to the blog.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Go back
              </button>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              >
                Browse blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center gap-3">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          <article className="w-full lg:col-span-8 bg-white border border-purple-100 rounded-3xl shadow-lg shadow-purple-900/5 overflow-hidden">
            <div className="relative h-72 w-full overflow-hidden bg-purple-100">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 text-sm text-white">
                <span className="inline-flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                  <Tag className="h-4 w-4" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-10 space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
              <p className="text-lg text-gray-700 leading-relaxed">{post.summary}</p>
              <div className="border-t border-purple-50 pt-6 space-y-4">
                {post.content.map((block, index) =>
                  block.isHeading ? (
                    <h2 key={index} className="text-2xl font-semibold text-gray-900 pt-4">
                      {block.text}
                    </h2>
                  ) : (
                    <p key={index} className="text-gray-800 leading-relaxed text-base sm:text-lg">
                      {block.text}
                    </p>
                  )
                )}
              </div>
            </div>
          </article>

          <aside className="space-y-4 w-full lg:col-span-4 lg:col-start-9">
            <div className="w-full bg-white border border-purple-100 rounded-2xl shadow-md shadow-purple-900/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Recent Posts</h3>
                <Link to="/blog" className="text-sm font-semibold text-purple-700 hover:text-purple-900">
                  View all
                </Link>
              </div>
              <ul className="space-y-4">
                {recentPosts.map((recent) => (
                  <li key={recent.slug} className="group">
                    <Link
                      to={`/blog/${recent.slug}`}
                      className="flex gap-3 items-start rounded-xl border border-transparent hover:border-purple-100 hover:bg-purple-50/60 p-2 transition-colors"
                    >
                      <div className="h-16 w-24 md:w-28 rounded-lg overflow-hidden bg-purple-100 flex-shrink-0">
                        <img
                          src={recent.image}
                          alt={recent.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-purple-600 font-semibold">{recent.category}</p>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-700 leading-snug">
                          {recent.title}
                        </p>
                        <p className="text-xs text-gray-500">{recent.date}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
