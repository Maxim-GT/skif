
import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      style={{
        left: 'calc(100vw - 110px)',
       }}
      onClick={scrollToTop}
      className={`h-[4rem] w-[4rem] fixed bottom-10 p-3 rounded-full z-50 bg-skif-gold hover:bg-skif-gold text-white shadow-lg transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-10 w-10" />
    </button>
  );
};

export default ScrollToTop;
