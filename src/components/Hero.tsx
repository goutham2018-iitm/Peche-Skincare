import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const Hero = () => {
  const navigate = useNavigate();
  const imageRef = useRef<HTMLDivElement>(null);
  // const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add a gentle pulsing animation to the image container
    if (imageRef.current) {
      imageRef.current.style.animation = 'floatGentle 6s ease-in-out infinite';
    }
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center bg-gradient-warm overflow-hidden pt-16 pb-4 px-4 sm:px-6 lg:px-8"
    >
      {/* Enhanced Background Elements with more dynamic animations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl float-3d morph-blob"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/20 rounded-full blur-2xl float-bounce morph-blob" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-primary-light/20 rounded-full blur-lg float-gentle morph-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-primary/10 rounded-full blur-2xl float-3d morph-blob" style={{ animationDelay: '3s' }}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-md float-bounce" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-20 right-1/3 w-16 h-16 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-lg float-gentle" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 particles opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10 py-2 sm:py-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Enhanced Content with staggered animations */}
          <div data-scroll className="space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Enhanced Trust Badge with glow effect */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-primary mb-2 sm:mb-4 glow-pulse">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-3 w-3 sm:h-4 sm:w-4 fill-current transition-all duration-500 hover:scale-125 hover:rotate-12" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-foreground/70 animate-pulse transition-all duration-500 hover:text-primary">
                🏆 Trusted by 10,000+ Women Worldwide
              </span>
            </div>

            {/* Enhanced Main Headline with gradient text */}
           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-gradient transition-all duration-700 hover:scale-105">
  Tried expensive skincare —
  <br />
  <span className="text-primary transition-all duration-700 hover:tracking-wider block mt-1 lg:mt-4">
    but still no glow?
  </span>
</h1>


            {/* Enhanced Subtitle with typewriter effect */}
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground/80 max-w-lg transition-all duration-500 hover:text-foreground/90" data-scroll>
  This <span className="font-semibold">$9</span> guide shows what actually works for melanin-rich skin — from the inside out.
</p>


            {/* Enhanced CTA Buttons with 3D effects */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start" data-scroll>
  <Button 
    size="lg" 
    className="px-8 py-4 text-lg bg-primary hover:bg-primary-dark text-primary-foreground font-medium group btn-3d hover-lift magnetic shadow-glow transition-all duration-500"
   onClick={() => navigate('/product')}
  >
    BUY PDF
    <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
  </Button>
  
  <Button 
    size="lg" 
    variant="outline" 
    className="px-8 py-4 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium glass-card hover-tilt magnetic transition-all duration-500"
  >
    Learn More
    <Sparkles className="ml-2 h-5 w-5 transition-all duration-300 group-hover:rotate-180" />
  </Button>
</div>

          </div>

          {/* Enhanced Hero Image with elegant animations */}
          <div data-scroll className="relative">
            <div 
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-float depth-card transition-all duration-700 hover:scale-105 perspective-2000 max-w-md mx-auto lg:max-w-none"
              style={{ 
                transform: 'perspective(1200px) rotateY(-5deg) rotateX(3deg)',
                transition: 'transform 1.2s cubic-bezier(0.17, 0.67, 0.83, 0.67), box-shadow 0.8s ease'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1400&q=80" 
                alt="Melanin-rich skin transformation guide"
                className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover object-center transition-transform duration-1000 shimmer"
                style={{ transform: 'scale(1.02)', objectPosition: 'center top' }}
              />
              
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/10 transition-opacity duration-700 hover:opacity-80"></div>
              
              {/* Subtle border glow on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500 hover:border-primary/20"></div>
            </div>

            {/* Enhanced Floating Elements with elegant animations */}
            {/* <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 shadow-glow float-gentle hover-lift magnetic transition-all duration-500"> */}
              {/* <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse transition-all duration-500 hover:scale-125"></div>
                <span className="text-sm font-medium text-foreground transition-all duration-500 hover:tracking-wider">100% Natural</span>
              </div> */}
              {/* Sparkle effect */}
              {/* <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></div> */}
            {/* </div> */}

            {/* <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-glow float-bounce hover-lift magnetic transition-all duration-500" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse transition-all duration-500 hover:scale-125"></div>
                <span className="text-sm font-medium text-foreground transition-all duration-500 hover:tracking-wider">Dermatologist Tested</span>
              </div>
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div> */}

            {/* Additional floating badge */}
            {/* <div className="absolute top-1/2 -left-8 glass-card rounded-full p-3 shadow-deep float-gentle hover-lift magnetic transition-all duration-500" style={{ animationDelay: '2.5s' }}>
              <Sparkles className="h-5 w-5 text-primary transition-all duration-500 hover:rotate-180" />
            </div> */}

            {/* Animated light rays */}
            <div className="absolute top-0 left-1/2 w-1 h-12 sm:h-20 bg-gradient-to-b from-primary/30 to-transparent transform -translate-x-1/2 animate-pulse transition-all duration-500 hover:h-16 sm:hover:h-24"></div>
            <div className="absolute bottom-0 right-1/4 w-1 h-10 sm:h-16 bg-gradient-to-t from-accent/30 to-transparent animate-pulse transition-all duration-500 hover:h-12 sm:hover:h-20" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator with more dynamic animation */}
      {/* <div className="absolute bottom-8 left-1/2 tran5sform -translate-x-1/2 animate-bounce hover-lift cursor-pointer transition-all duration-500">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center glass-card hover:shadow-glow transition-all duration-300">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse transition-all duration-500 hover:scale-125"></div>
        </div>
        <div className="text-xs text-primary/70 mt-2 text-center animate-pulse transition-all duration-500 hover:text-primary">Scroll</div>
      </div> */}

      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary via-transparent to-accent mix-blend-overlay transition-all duration-1000 hover:opacity-10"></div>

      <style>{`
        @keyframes shimmerEffect {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shimmerEffect 3s infinite;
        }
        
        /* Enhanced tilt animation */
        .perspective-2000 {
          perspective: 2000px;
        }
        
        .depth-card:hover {
          transform: perspective(1200px) rotateY(-8deg) rotateX(5deg) translateZ(20px) !important;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 15px 35px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .depth-card:hover {
            transform: perspective(1200px) rotateY(-3deg) rotateX(2deg) translateZ(10px) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;