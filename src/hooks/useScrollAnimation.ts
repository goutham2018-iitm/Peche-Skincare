/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Enhanced intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered animation delays
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, index * 100);
          } else {
            // Optional: Remove animation class when element goes out of view
            // entry.target.classList.remove('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Parallax effect for background elements
    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const handleParallax = () => {
              const scrolled = window.pageYOffset;
              const rate = scrolled * -0.5;
              const element = entry.target as HTMLElement;
              
              if (element.classList.contains('parallax-slow')) {
                element.style.transform = `translateY(${rate * 0.3}px)`;
              } else if (element.classList.contains('parallax-medium')) {
                element.style.transform = `translateY(${rate * 0.6}px)`;
              }
            };
            
            window.addEventListener('scroll', handleParallax);
            
            // Cleanup function to remove event listener
            const cleanup = () => {
              window.removeEventListener('scroll', handleParallax);
            };
            
            // Store cleanup function on element for later use
            (entry.target as any).__parallaxCleanup = cleanup;
          } else {
            // Clean up parallax effect when element is out of view
            const cleanup = (entry.target as any).__parallaxCleanup;
            if (cleanup) {
              cleanup();
              delete (entry.target as any).__parallaxCleanup;
            }
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    // Mouse movement for 3D tilt effects
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const tiltElements = document.querySelectorAll('.hover-tilt');
      
      tiltElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Only apply effect if mouse is reasonably close to element
        if (distance < 2) {
          const tiltX = deltaY * 5;
          const tiltY = -deltaX * 5;
          
          (element as HTMLElement).style.transform = 
            `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
        }
      });
    };

    // Magnetic effect for magnetic elements
    const handleMagneticEffect = (e: MouseEvent) => {
      const magneticElements = document.querySelectorAll('.magnetic');
      
      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Apply magnetic effect within 100px radius
        if (distance < 100) {
          const force = (100 - distance) / 100;
          const moveX = (deltaX / distance) * force * 10;
          const moveY = (deltaY / distance) * force * 10;
          
          (element as HTMLElement).style.transform = 
            `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.1})`;
        } else {
          (element as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
        }
      });
    };

    // Smooth scroll for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Performance optimized scroll handler
    let ticking = false;
    const handleOptimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Update navigation progress bar
          const progressBars = document.querySelectorAll('.scroll-progress');
          const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
          
          progressBars.forEach((bar) => {
            (bar as HTMLElement).style.width = `${Math.min(scrollPercent, 100)}%`;
          });
          
          // Update floating elements based on scroll
          const floatingElements = document.querySelectorAll('.float-on-scroll');
          floatingElements.forEach((element, index) => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            const delay = index * 0.1;
            
            (element as HTMLElement).style.transform = 
              `translateY(${rate + delay * 50}px) rotate(${scrolled * 0.05}deg)`;
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initialize observers and event listeners
    const scrollElements = document.querySelectorAll('[data-scroll]');
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    scrollElements.forEach((el) => observer.observe(el));
    parallaxElements.forEach((el) => parallaxObserver.observe(el));
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mousemove', handleMagneticEffect);
    window.addEventListener('scroll', handleOptimizedScroll);
    
    anchorLinks.forEach((link) => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Intersection observer for fade-in animations with different directions
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            if (element.classList.contains('fade-in-up')) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            } else if (element.classList.contains('fade-in-left')) {
              element.style.opacity = '1';
              element.style.transform = 'translateX(0)';
            } else if (element.classList.contains('fade-in-right')) {
              element.style.opacity = '1';
              element.style.transform = 'translateX(0)';
            } else if (element.classList.contains('fade-in-scale')) {
              element.style.opacity = '1';
              element.style.transform = 'scale(1)';
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const fadeElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale'
    );
    fadeElements.forEach((el) => fadeInObserver.observe(el));

    // Initialize CSS for fade elements
    fadeElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.opacity = '0';
      el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      if (el.classList.contains('fade-in-up')) {
        el.style.transform = 'translateY(30px)';
      } else if (el.classList.contains('fade-in-left')) {
        el.style.transform = 'translateX(-30px)';
      } else if (el.classList.contains('fade-in-right')) {
        el.style.transform = 'translateX(30px)';
      } else if (el.classList.contains('fade-in-scale')) {
        el.style.transform = 'scale(0.9)';
      }
    });

    // Cleanup function
    return () => {
      scrollElements.forEach((el) => {
        observer.unobserve(el);
        const cleanup = (el as any).__parallaxCleanup;
        if (cleanup) {
          cleanup();
          delete (el as any).__parallaxCleanup;
        }
      });
      
      parallaxElements.forEach((el) => {
        parallaxObserver.unobserve(el);
      });
      
      fadeElements.forEach((el) => {
        fadeInObserver.unobserve(el);
      });
      
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mousemove', handleMagneticEffect);
      window.removeEventListener('scroll', handleOptimizedScroll);
      
      anchorLinks.forEach((link) => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);
};