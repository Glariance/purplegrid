import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import FloatingChatButtons from './components/FloatingChatButtons';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/dashboard/Dashboard';
import TransparencyHub from './pages/dashboard/TransparencyHub';
import CRMSnapshot from './pages/dashboard/CRMSnapshot';
import CaseStudies from './pages/dashboard/CaseStudies';
import MeetYourGrid from './pages/dashboard/MeetYourGrid';
import ProcessFlow from './pages/dashboard/ProcessFlow';
import KnowledgeBase from './pages/dashboard/KnowledgeBase';
import ClientPortal from './pages/dashboard/ClientPortal';
import Blog from './pages/blog/Blog';
import NewHeader from './new-home/NewHeader';
import NewHero from './new-home/NewHero';
import ConceptSection from './new-home/ConceptSection';
import CarouselSection from './new-home/CarouselSection';
import BenefitsSection from './new-home/BenefitsSection';
import TestimonialSection from './new-home/TestimonialSection';
import CTASection from './new-home/CTASection';

const ScrollToHash = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hash, pathname } = location;
  const scrollState = (location.state as { scrollTo?: string } | null)?.scrollTo;

  useEffect(() => {
    const selector = hash || (scrollState ? `#${scrollState.replace(/^#/, '')}` : '');

    const getScrollOffset = () => {
      const header = document.querySelector('header');
      const linkBar = document.querySelector('[data-section-link-bar]');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const barHeight = linkBar ? linkBar.getBoundingClientRect().height : 0;
      return headerHeight + barHeight + 16;
    };

    const scrollToTarget = (element: Element) => {
      const totalOffset = getScrollOffset();
      const targetTop = element.getBoundingClientRect().top + window.scrollY - totalOffset;
      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      });
    };

    if (selector) {
      const target = document.querySelector(selector);
      if (target) {
        scrollToTarget(target);
      }
    } else if (!hash && !scrollState) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (hash) {
      window.history.replaceState(null, '', pathname + window.location.search);
    }

    if (scrollState) {
      const locationState = location.state as Record<string, unknown> | null;
      const restState =
        locationState && typeof locationState === 'object' ? { ...locationState } : {};
      delete restState.scrollTo;
      navigate(pathname, {
        replace: true,
        state: Object.keys(restState).length ? restState : undefined,
      });
    }
  }, [hash, pathname, scrollState, navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <ScrollToHash />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transparency-hub" element={<TransparencyHub />} />
          <Route path="/crm-snapshot" element={<CRMSnapshot />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/meet-your-grid" element={<MeetYourGrid />} />
          <Route path="/process-flow" element={<ProcessFlow />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-black text-white">
                <NewHeader />
                <main>
                  <NewHero />
                  <ConceptSection />
                  <CarouselSection />
                  <BenefitsSection />
                  <TestimonialSection />
                  <CTASection />
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
        <FloatingChatButtons />
      </div>
    </Router>
  );
}

export default App;
