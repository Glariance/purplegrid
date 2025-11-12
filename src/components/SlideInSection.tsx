import React, { useRef } from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

interface SlideInSectionProps extends React.HTMLAttributes<HTMLElement> {}

const SlideInSection: React.FC<SlideInSectionProps> = ({ className = '', children, ...rest }) => {
  const sectionRef = useRef<HTMLElement>(null!);
  const isVisible = useRevealOnScroll(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`transition-all duration-[1100ms] ease-out transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      } ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
};

export default SlideInSection;
