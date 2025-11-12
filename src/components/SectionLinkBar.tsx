import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const baseLinks = [
  { label: 'Problem Resolved', href: '#problem-resolved' },
  { label: 'Brand Story', href: '#brand-story' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
];

const SectionLinkBar = () => {
  const [offset, setOffset] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const header = document.querySelector('header');
    const updateOffset = () => {
      if (header) {
        setOffset(header.getBoundingClientRect().height);
      }
    };

    let resizeObserver: ResizeObserver | undefined;
    updateOffset();
    window.addEventListener('resize', updateOffset);
    if (header && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateOffset);
      resizeObserver.observe(header);
    }
    return () => {
      window.removeEventListener('resize', updateOffset);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateBarHeight = () => {
      if (barRef.current) {
        setBarHeight(barRef.current.getBoundingClientRect().height);
      }
    };

    updateBarHeight();
    window.addEventListener('resize', updateBarHeight);

    let resizeObserver: ResizeObserver | undefined;
    if (barRef.current && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateBarHeight);
      resizeObserver.observe(barRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateBarHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const normalizedId = sectionId.replace(/^#/, '');
    const canStayOnPage =
      location.pathname === '/' || location.pathname === '/knowledge-base';
    if (!canStayOnPage) {
      navigate('/', { state: { scrollTo: normalizedId } });
      return;
    }
    const target = document.getElementById(normalizedId);
    if (target) {
      const spacing = offset + barHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - spacing;
      window.scrollTo({
        top: Math.max(top, 0),
        behavior: 'smooth'
      });
    }
  };

  const isKnowledgeBase = location.pathname === '/knowledge-base';
  const links = isKnowledgeBase ? [...baseLinks, { label: 'FAQs', href: '#faqs' }] : baseLinks;

  return (
    <div
      ref={barRef}
      data-section-link-bar
      className="sticky z-40 bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-700 text-white shadow-lg"
      style={{ top: offset }}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-12">
        <ul className="flex flex-wrap items-stretch justify-between gap-3 sm:gap-4 py-4 text-xs sm:text-sm md:text-base font-semibold tracking-wide uppercase">
          {links.map((link) => (
            <li key={link.href} className="flex-1 min-w-[140px]">
              <button
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="inline-flex h-full w-full items-center justify-center rounded-full bg-white/10 px-4 py-3 transition-all hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SectionLinkBar;
