import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      
      // Update active section based on scroll position
      const sections = ['home', 'products', 'philosophy', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#products' },
    { name: 'Your Skincare Guide', href: '#philosophy' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
   <nav className={`fixed top-0 w-full z-50 transition-all duration-700 shadow-md ${
  isScrolled 
    ? 'glass-card backdrop-blur-2xl border-b border-primary/10' 
    : 'bg-transparent'
}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Enhanced Logo with 3D effects */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow transition-all duration-300 group-hover:shadow-xl">
                <Sparkles className="h-5 w-5 text-primary-foreground transition-transform duration-300 group-hover:rotate-180" />
              </div>
            </div>
            <span className="text-base sm:text-lg md:text-xl font-light text-foreground group-hover:text-primary transition-all duration-300">
              Pêche
            </span>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative text-sm lg:text-base text-foreground/80 hover:text-primary transition-all duration-500 font-medium group hover-tilt magnetic ${
                  activeSection === item.href.slice(1) ? 'text-primary' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                
                {/* Enhanced underline animation */}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 shadow-glow ${
                  activeSection === item.href.slice(1) 
                    ? 'w-full opacity-100' 
                    : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                }`}></span>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-primary/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </a>
            ))}
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => navigate('/product')}
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium px-4 lg:px-6 text-sm lg:text-base shadow-glow hover:shadow-xl transition-all duration-500 hover-lift btn-3d magnetic relative overflow-hidden group"
            >
              <span className="relative z-10">Shop Now</span>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              {/* Sparkle effect */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
            </Button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-foreground hover:text-primary transition-all duration-300 hover-tilt magnetic relative"
          >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
              <Menu className={`h-6 w-6 absolute transition-all duration-500 ${
                isMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`} />
              <X className={`h-6 w-6 absolute transition-all duration-500 ${
                isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'
              }`} />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full glass-card border-t border-primary/20 shadow-xl backdrop-blur-2xl transition-all duration-700 transform origin-top ${
          isMenuOpen 
            ? 'opacity-100 scale-y-100 translate-y-0' 
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        }`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-1 sm:space-y-2">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`block text-foreground/80 hover:text-primary transition-all duration-500 font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-primary/5 magnetic relative group ${
                  activeSection === item.href.slice(1) ? 'text-primary bg-primary/5' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.5s ease-out ${index * 0.1}s`
                }}
              >
                {item.name}
                
                {/* Mobile active indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent transition-all duration-300 ${
                  activeSection === item.href.slice(1) ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}></div>
              </a>
            ))}
            
            {/* Mobile CTA Button */}
            <div className="pt-2 sm:pt-4">
              <Button 
                onClick={() => navigate('/product')}
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-medium shadow-glow hover:shadow-xl transition-all duration-500 btn-3d relative overflow-hidden group"
                style={{ 
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease-out 0.4s'
                }}
              >
                <span className="relative z-10">Shop Now</span>
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transform origin-left transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </nav>
  );
};

export default Navigation;