// components/BackToTop.jsx
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Handle scroll animation state
  const handleScroll = () => {
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 150);
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-6 right-6 z-50 
            w-12 h-12 sm:w-14 sm:h-14
            bg-gradient-to-r from-primary to-primary/90 
            hover:from-primary/90 hover:to-primary/80
            text-white rounded-full shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out
            hover:scale-110 active:scale-95
            group
            ${isScrolling ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}
          `}
          aria-label="Back to top"
        >
          <ArrowUp 
            className={`
              h-5 w-5 sm:h-6 sm:w-6 mx-auto
              transition-transform duration-300
              group-hover:-translate-y-0.5 group-active:translate-y-0
            `} 
          />
          
          {/* Animated ring effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />
          
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
        </button>
      )}
    </>
  );
};

export default BackToTop;