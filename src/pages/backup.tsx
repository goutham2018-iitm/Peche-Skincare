/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import RazorpayButton from "@/components/RazorpayButton";
import {
  ShoppingCart,
  Star,
  Heart,
  Check,
  Gift,
  Globe,
  Shield,
  Download,
  Users,
  Award,
  Sparkles,
  Quote,
  ArrowRight,
  Timer,
  BookOpen,
  MessageCircle,
  ChevronDown,
  Leaf,
  ChevronUp,
  Menu,
  X,
  FileText,
  Play,
  Database,
  Utensils,
  Activity,
} from "lucide-react";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { Counter } from "@/components/Counter";

// Product Page Navigation Component
const ProductNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      
      // Update active section based on scroll position
      const sections = ['home', 'transformations','bonusecs', 'bonuses', 'faq', 'contact'];
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
    { name: 'Transformations', href: '#transformations' },
    { name: 'Modules', href: '#bonusecs' },
    { name: 'Five Bonuses', href: '#bonuses' },
    { name: 'FAQ\'s', href: '#faq' },
    { name: 'Contact Us', href: '#contact' }
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
              Peche Skincare
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


const Philosophy = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Melanin-Safe Ingredients',
      description:
        'Carefully selected ingredients that work specifically for melanin-rich skin types.',
    },
    {
      icon: Heart,
      title: 'Inside-Out Healing',
      description:
        'Heal your skin barrier naturally by understanding your unique triggers and patterns.',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description:
        'Trusted by 10,000+ women worldwide. Winner of The Rising SME — Beauty & Wellness Products, 2020.',
    },
    {
      icon: Shield,
      title: 'Risk-Free Guarantee',
      description:
        "If it doesn't help, just message me. I want you to feel confident, not confused.",
    },
  ];

  return (
    <section className="py-12 md:py-8 bg-gradient-to-br from-orange-50 via-pink-50 to-peach-50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-10 left-20 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
          {/* Text Content */}
          <div className="space-y-5 order-2 lg:order-1">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 rounded-full animate-fadeIn w-max">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">
                Our Philosophy
              </span>
            </div>

            <div className="space-y-5 animate-slideInLeft">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Why I Created
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent block mt-1">
                  This
                </span>
              </h2>

              <div className="pl-3 border-l-2 border-orange-300/50">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed transition-all duration-700 hover:translate-x-2">
                  I used to feel ashamed of my bare skin — hiding behind filters
                  and whitening creams that only made things worse.
                </p>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-3 transition-all duration-700 hover:translate-x-2 delay-100">
                  Skincare advice never spoke to us. So I made the thing I wish I
                  had.
                </p>
              </div>
            </div>

            {/* Why this guide works card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100/50 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fadeIn delay-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                  ✓
                </span>
                Why This Guide Works
              </h3>

              <div className="space-y-3 text-gray-700">
                {[
                  'Built for melanin-rich skin — not a copy-paste routine',
                  'Glow naturally by healing your skin barrier',
                  'No more expensive trial & error',
                  'Based on real results, not marketing hype',
                  'Download instantly — from anywhere in the world',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 transition-all duration-500 hover:translate-x-2"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <span className="flex-shrink-0 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    </span>
                    <span className="text-base">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-orange-100/50">
                <p className="text-gray-600 italic text-center text-base leading-relaxed transition-all duration-700 hover:scale-105">
                  From India to Africa to Southeast Asia — we deserve to glow,
                  naturally.
                  <span className="block font-semibold text-orange-600 mt-2">
                    A real, melanin-safe guide rooted in healing, not shame.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Image Section - Aligned to start at "Why I Created" */}
          <div className="relative order-1 lg:order-2 lg:mt-16">
            <div className="relative group w-full h-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 h-full min-h-[600px]">
                <img
                  src="https://thumbs.dreamstime.com/b/woman-face-beauty-skin-care-beautiful-girl-healthy-make-up-touching-makeup-hands-natural-skincare-treatment-woman-face-168156522.jpg"
                  alt="Natural skincare for melanin-rich skin"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-pink-500/10"></div>
              </div>

              {/* Eco-Friendly Badge */}
              <div className="absolute -top-3 -right-3 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-green-200/50 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">
                    Eco-Friendly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 opacity-0 animate-slideInUp overflow-hidden cursor-pointer"
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards',
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-orange-400/20 group-hover:via-pink-400/10 group-hover:to-purple-400/20 transition-all duration-700 rounded-3xl"></div>

              {/* Floating sparkles */}
              <div
                className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className="absolute top-6 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
                style={{ animationDelay: '0.4s' }}
              ></div>
              <div
                className="absolute top-8 right-5 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
                style={{ animationDelay: '0.6s' }}
              ></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out skew-x-12"></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg group-hover:shadow-xl animate-float">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"></div>
                    <feature.icon className="h-10 w-10 text-orange-500 group-hover:text-pink-500 transition-all duration-700 relative z-10 group-hover:scale-110" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center transition-all duration-700 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:via-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transform group-hover:scale-105">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-all duration-700 transform group-hover:scale-105 group-hover:translate-y-1">
                  {feature.description}
                </p>
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-orange-400/30 group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
          75% { transform: translateY(-5px) rotate(-1deg); }
        }

        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(50px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slideInUp { animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-slideInLeft { animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }

        .group:hover .animate-float { animation: float 2s ease-in-out infinite; }

        .grid > div:nth-child(1) { animation-delay: 0ms; }
        .grid > div:nth-child(2) { animation-delay: 200ms; }
        .grid > div:nth-child(3) { animation-delay: 400ms; }
        .grid > div:nth-child(4) { animation-delay: 600ms; }
      `}</style>
    </section>
  );
};

const ProductPage = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // const handleBuyNow = () => {
  //   window.open("#", "_blank");
  // };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };
   // Razorpay handler
  const handleBuyNow = () => {
    const options: any = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Razorpay key from .env
      amount: 900, // ₹9 in paise
      currency: "INR",
      name: "Your Company Name",
      description: "Complete System Access",
      handler: (response: any) => {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // Optionally call backend API to verify payment
      },
      theme: { color: "#2563EB" }, // Tailwind primary color
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", (response: any) => {
      alert("Payment Failed! Reason: " + response.error.description);
    });

    rzp.open();
  };

  // Make sure Razorpay script is loaded
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ProductNavigation />

      {/* Hero Section - Optimized Layout */}
      <section id="home" className="pt-24 pb-8 md:pt-30 md:pb-10 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start min-h-[60vh] lg:min-h-[70vh]">
            {/* Product Info - Now First on Mobile */}
            <div className="space-y-4">
              <Badge className="inline-flex bg-accent/20 text-accent-foreground py-2 px-4 text-sm font-medium">
                <Timer className="h-4 w-4 mr-2" />
                Limited Time: 76% OFF
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                34-Page Melanin-Rich Skin Glow Guide
                <span className="text-primary block mt-2 text-2xl md:text-3xl lg:text-4xl">
                  (+ 5 Free Bonuses)
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                You've tried expensive skincare, but your glow still isn't
                glowing? This digital guide shows what actually works from the
                inside out — specifically for melanin-rich skin.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-primary fill-current"
                    />
                  ))}
                  <span className="text-base font-semibold text-foreground ml-2">
                    4.9/5.0
                  </span>
                </div>
                <div className="flex items-center text-base text-muted-foreground">
                  <Users className="h-5 w-5 mr-2" />
                  10,000+ Women
                </div>
              </div>

              {/* Pricing Card - Ultra Compact */}
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-3 border border-primary/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-xl font-bold text-muted-foreground line-through">
                      $37
                    </span>
                    <Badge className="bg-destructive text-destructive-foreground font-bold py-0.5 px-2 text-xs">
                      76% OFF
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-bold text-primary">
                      $9
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Today Only
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBuyNow}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 text-sm rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center mb-2"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Get Instant Access
                </Button>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-0.5">
                    <Shield className="h-4 w-4 text-primary mx-auto" />
                    <div className="text-xs text-muted-foreground">
                      Money Back
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <Download className="h-4 w-4 text-primary mx-auto" />
                    <div className="text-xs text-muted-foreground">
                      Instant Access
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <Globe className="h-4 w-4 text-primary mx-auto" />
                    <div className="text-xs text-muted-foreground">
                      Worldwide
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Images - Starting at Heading Level and Ending at Card Level */}
            <div className="relative flex flex-col">
              {/* Skip badge to align with heading */}
              <div className="h-10 mb-2"></div>
              
              <div className="flex-1 flex flex-col">
                <div className="relative group flex-1 mb-3 md:mb-4">
                  <img
                    src="https://res.cloudinary.com/dwit7nxav/image/upload/v1758218698/DTP_3252_g6199c.jpg"
                    alt="Skincare transformation results"
                    className="w-full h-full object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white font-semibold py-1 md:py-1.5 px-3 md:px-4 text-xs md:text-sm">
                      <Award className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />
                      Award Winner
                    </Badge>
                  </div>
                  <Button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 rounded-full w-10 h-10 md:w-12 md:h-12 p-0 bg-white/90 hover:bg-white shadow-md transition-all"
                    variant="outline"
                  >
                    <Heart
                      className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${
                        isWishlisted
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {[
                    "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218700/DTP_3061_wf2a7v.jpg",
                    "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218700/DTP_3061_wf2a7v.jpg",
                   "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218700/DTP_3061_wf2a7v.jpg",
                  ].map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-16 md:h-20 lg:h-24 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Trust Indicators - Compact with Animations */}
      <section className="py-6 bg-gradient-to-b from-accent/10 to-accent/5 border-y border-accent/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {[
              { text: "Secure Payment", icon: Shield, animation: "animate-float" },
              { text: "100% Satisfaction", icon: Heart, animation: "animate-float [animation-delay:200ms]" },
              { text: "Digital Delivery", icon: Download, animation: "animate-float [animation-delay:400ms]" },
              { text: "24/7 Support", icon: MessageCircle, animation: "animate-float [animation-delay:600ms]" },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-muted-foreground ${item.animation}`}
              >
                <item.icon className="h-5 w-5 text-primary animate-pulse-glow" />
                <span className="text-sm font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
   {/* Transformation Results - Mobile Optimized */}
<section id="transformations" className="py-16 md:py-10 bg-gradient-to-br from-background via-accent/5 to-primary/5">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="text-center mb-16 md:mb-10">
      <Badge className="inline-flex bg-primary/20 text-primary font-semibold text-base md:text-lg lg:text-xl mb-6 py-2 px-4">
        <Award className="h-4 w-4 mr-2" />
        Real Transformations
      </Badge>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
        See The Glow Transformation
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        These women followed the guide and achieved the natural glow they
        always wanted. No filters, no editing — just real results from
        healing their skin naturally.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
      {[
        {
          name: "Priya S.",
          location: "Mumbai, India",
          testimonial:
            "I used to hide behind makeup every single day. This guide taught me that my skin didn't need more products — it needed healing.",
          timeframe: "3 weeks later",
          image:
            "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218622/imgonline-com-ua-twotoone-EQZcPi0Qf3aQNW_wv0xai.jpg",
        },
        {
          name: "Adaora O.",
          location: "Lagos, Nigeria",
          testimonial:
            "I thought my dark spots were just something I had to live with. This guide completely changed my perspective.",
          timeframe: "6 weeks later",
          image:
            "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218619/IMG_5649_wwilbh.jpg",
        },
        {
          name: "Thando W.",
          location: "Cape Town, South Africa",
          testimonial:
            "This isn't just about skincare — it's soul work. The guide helped me understand that my acne was connected to stress.",
          timeframe: "4 weeks later",
          image:
            "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218619/IMG_5652_bdhenw.jpg",
        },
        {
          name: "Keisha M.",
          location: "Atlanta, USA",
          testimonial:
            "Finally, a guide that understands my skin! The emotional healing part was just as important as the skincare routine.",
          timeframe: "5 weeks later",
          image:
            "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218619/IMG_6569_eaoxzn.jpg",
        },
      ].map((item, index) => (
        <Card
          key={index}
          className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-2 border-primary/20 hover:border-primary/40 bg-card shadow-lg hover:-translate-y-2 hover:bg-card/95"
        >
          {/* Single Image with Before/After Labels */}
          <div className="relative h-64 md:h-80">
            <div className="relative overflow-hidden h-full w-full bg-gradient-to-br from-background/50 to-accent/5">
              <img
                src={item.image}
                alt="Before and After transformation"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              {/* Before label - Left top */}
              <Badge className="absolute top-3 left-3 bg-destructive/90 text-white text-xs font-medium px-2 py-1">
                Before
              </Badge>
              {/* After label - Right top */}
              <Badge className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-medium px-2 py-1">
                After
              </Badge>
            </div>
          </div>

          {/* Card Content - Horizontal Layout */}
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Left Side - Profile */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="mt-2 text-center">
                  <h4 className="font-bold text-sm text-foreground leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.location}
                  </p>
                </div>
              </div>
              
              {/* Right Side - Testimonial and Details */}
              <div className="flex-1 min-w-0">
                <div className="mb-3">
                  <Quote className="h-4 w-4 text-primary mb-2 flex-shrink-0" />
                  <blockquote className="text-foreground/90 italic leading-relaxed text-sm">
                    "{item.testimonial}"
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-primary fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {item.timeframe}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

   {/* Stats Grid with Counter Animation */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-8 bg-card/50 backdrop-blur rounded-2xl border border-border">
      {[
        { value: 10000, label: "Women Transformed", suffix: "+" },
        { value: 4.9, label: "Average Rating", suffix: "★", decimal: 1 },
        { value: 3, label: "Weeks to Results", suffix: "-6" },
        { value: 97, label: "Success Rate", suffix: "%" },
      ].map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
            <Counter 
              value={stat.value} 
              suffix={stat.suffix}
              decimal={stat.decimal}
              delay={index * 200} // Stagger the animation
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* What Makes This Different - Compact */}
      <section className="py-16 md:py-4 bg-gradient-to-b from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Makes This Different?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              This isn't a list of products. It's a blueprint to heal your skin
              from the inside out — by understanding your triggers, patterns,
              and emotions that affect your glow.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Melanin-Rich Focus",
                description:
                  "Built specifically for melanin-rich, sensitive, or acne-prone skin",
              },
              {
                icon: Heart,
                title: "Natural Healing",
                description:
                  "Glow naturally by healing your skin barrier — no filters or whitening",
              },
              {
                icon: Shield,
                title: "Proven Results",
                description:
                  "Based on real results, not marketing hype — used by 10,000+ women",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-border bg-card"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

{/* Professional Modules Content */}
{/* Professional Modules Content */}
<section id="bonusecs" className="py-16 md:py-8 bg-gradient-to-br from-accent/5 via-background to-primary/5">
  <div className="container mx-auto px-4 max-w-7xl">
    <div className="text-center mb-8">
    <Badge className="inline-flex bg-primary/20 text-primary font-semibold text-base md:text-lg lg:text-xl mb-6 py-2 px-4">
  <Award className="h-4 w-4 mr-2" />
  Complete System
</Badge>

      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
        What's Inside — Complete System
      </h2>
      
     <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-bold animate-pulse">
  5 comprehensive modules + bonus materials worth $264
</p>

    </div>

   {/* Top 3 Modules */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
  {[
    {
      module: "Module 1",
      title: "The Truth About Melanin-Rich Skin",
      price: "$49",
      features: [
        "Why many routines harm melanin",
        "Ingredients that harm melanin",
        "Decode skincare labels with care",
      ],
      icon: "🖤",
     backgroundImage: "url('https://img.freepik.com/free-photo/natural-young-woman-posing_23-2148994737.jpg')"
    },
    {
      module: "Module 2", 
      title: "Hormonal Balance & Skin Health",
      price: "$55",
      features: [
        "Gut-skin connection mastery",
        "Stress & sleep optimization", 
        "Internal reset rituals",
      ],
      icon: "🧬",
      backgroundImage: "url('https://img.freepik.com/free-photo/young-lady-doing-meditation-grey-t-shirt-looking-peaceful_176474-17981.jpg')"
    },
    {
      module: "Module 3",
      title: "Emotional Healing for Confidence",
      price: "$47", 
      features: [
        "Release skin shame & trauma",
        "Confidence-building exercises",
        "Inner healing prompts",
      ],
      icon: "💗",
      backgroundImage: "url('https://img.freepik.com/free-photo/person-conducting-reiki-therapy_23-2149403937.jpg')"
    },
  ].map((module, index) => (
    <div
      key={index}
      className="group relative rounded-2xl border-2 border-orange-200 hover:border-orange-300 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/10 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: module.backgroundImage }}
      />
      {/* Light overlay matching page colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white/60 to-orange-100/70 group-hover:from-orange-50/70 group-hover:via-white/50 group-hover:to-orange-100/60 transition-all duration-500" />

      {/* Content */}
      <div className="relative p-8 z-10 text-gray-800">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-primary/30 flex items-center justify-center text-3xl border border-orange-200">
              {module.icon}
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full uppercase tracking-wider">
                {module.module}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">{module.price}</span>
            <p className="text-xs font-medium text-gray-700">Value</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold leading-tight text-gray-900 group-hover:text-primary transition-colors">
            {module.title}
          </h3>
        </div>

        <ul className="space-y-4">
          {module.features.map((feature, i) => (
            <li key={i} className="flex items-start text-base text-gray-700">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</div>


    {/* Bottom 2 Modules */}
    <div className="grid md:grid-cols-2 gap-8">
      {[
        {
          module: "Module 4",
          title: "Minimal Skincare That Works",
          price: "$44",
          features: [
            "Melanin-safe ingredient layering",
            "3-step routine system",
            "No more product chaos",
          ],
          icon: "✨",
          backgroundImage: "url(' https://img.freepik.com/premium-photo/graceful-young-indian-woman-white-top-gently-touching-her-face_116547-100434.jpg?w=1480')"
          
         
        },
        {
          module: "Module 5", 
          title: "From Bare Skin to Boss Moves ",
          price: "$50",
          features: [
            "Show up confidently without makeup",
            "Daily glow affirmations",
            "Boss-level confidence building",
          ],
          icon: "💼",
          backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/007/485/896/non_2x/cropped-shot-of-tender-good-looking-woman-holds-slice-of-fresh-lemon-over-eye-recommends-organic-cosmetics-undergoes-beauty-procedures-stands-bare-shouldered-indoor-natural-treatment-concept-free-photo.jpg')"
        },
      ].map((module, index) => (
        <div
          key={index}
          className="group relative rounded-2xl border-2 border-orange-200 hover:border-orange-300 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/10 overflow-hidden"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: module.backgroundImage }}
          />
          {/* Light overlay matching page colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white/60 to-orange-100/70 group-hover:from-orange-50/70 group-hover:via-white/50 group-hover:to-orange-100/60 transition-all duration-500" />

          {/* Content */}
          <div className="relative p-8 z-10 text-gray-800">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-primary/30 flex items-center justify-center text-3xl border border-orange-200">
                  {module.icon}
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full uppercase tracking-wider">
                    {module.module}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">{module.price}</span>
                <p className="text-xs font-medium text-gray-700">Value</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold leading-tight text-gray-900 group-hover:text-primary transition-colors">
                {module.title}
              </h3>
            </div>

            <ul className="space-y-4">
              {module.features.map((feature, i) => (
                <li key={i} className="flex items-start text-base text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


     {/* Transformations Section - After Bonuses */}
<section className="py-16 md:py-2 bg-gradient-to-br from-background via-accent/5 to-primary/5">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="text-center mb-16">
     <Badge className="inline-flex bg-primary/20 text-primary font-semibold text-base md:text-lg lg:text-xl mb-6 py-2 px-4">
  <Award className="h-4 w-4 mr-2" />
  More Success Stories
</Badge>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
        Join Thousands of Happy Customers
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Real women, real results. See how our guide has transformed lives across the globe.
      </p>
    </div>

   {/* Cards Grid */}
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
      {[
        {
          name: "Amara K.",
          location: "London, UK",
          testimonial:
            "The gut-skin connection module was a game changer. I never realized how much my diet was affecting my breakouts.",
          timeframe: "4 weeks later",
          image:
            "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218638/Untitled_design.zip_-_1_lze2nw.png",
        },
        {
          name: "Zara A.",
          location: "Dubai, UAE",
          testimonial:
            "Finally found a routine that works in this climate! My skin has never looked better, and I feel so confident now.",
          timeframe: "6 weeks later",
          image:
            "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218678/IMG_3688_ntxicl.jpg",
        },
        {
          name: "Maya P.",
          location: "Toronto, Canada",
          testimonial:
            "The emotional healing aspect was unexpected but so needed. This guide healed more than just my skin.",
          timeframe: "5 weeks later",
          image:
            "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218650/Untitled_design.zip_-_4_k47sik.png",
        },
        {
          name: "Fatima S.",
          location: "Casablanca, Morocco",
          testimonial:
            "As someone with sensitive melanin-rich skin, this guide was exactly what I needed. No more guessing games!",
          timeframe: "7 weeks later",
          image:
            "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218698/Untitled_design.zip_-_3_potxtv.png",
        },
      ].map((item, index) => (
        <Card
          key={index}
          className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-2 border-primary/20 hover:border-primary/40 bg-card shadow-lg hover:-translate-y-2 hover:bg-card/95"
        >
          {/* Single Image with Before/After Labels */}
          <div className="relative h-64 md:h-80">
            <div className="relative overflow-hidden h-full w-full bg-gradient-to-br from-background/50 to-accent/5">
              <img
                src={item.image}
                alt="Before and After transformation"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              {/* Before label - Left top */}
              <Badge className="absolute top-3 left-3 bg-destructive/90 text-white text-xs font-medium px-2 py-1">
                Before
              </Badge>
              {/* After label - Right top */}
              <Badge className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-medium px-2 py-1">
                After
              </Badge>
            </div>
          </div>

          {/* Card Content - Horizontal Layout */}
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Left Side - Profile */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="mt-2 text-center">
                  <h4 className="font-bold text-sm text-foreground leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.location}
                  </p>
                </div>
              </div>
              
              {/* Right Side - Testimonial and Details */}
              <div className="flex-1 min-w-0">
                <div className="mb-3">
                  <Quote className="h-4 w-4 text-primary mb-2 flex-shrink-0" />
                  <blockquote className="text-foreground/90 italic leading-relaxed text-sm">
                    "{item.testimonial}"
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-primary fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {item.timeframe}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Stats Grid */}
    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-8 bg-card/50 backdrop-blur rounded-2xl border border-border"> */}
      {/* {[
        { value: "15,000+", label: "Happy Customers" },
        { value: "4.9★", label: "Average Rating" },
        { value: "98%", label: "Would Recommend" },
        { value: "50+", label: "Countries Served" },
      ].map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))} */}
    {/* </div> */}
  </div>
</section>


      {/* Philosophy Section */}
      <Philosophy />
{/* Final CTA - Compact */}
      <section  className="py-16 md:py-10 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 max-w-md mx-auto shadow-2xl border border-border">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-3xl font-bold text-muted-foreground line-through">
                  $37
                </span>
                <ArrowRight className="h-6 w-6 text-primary" />
                <span className="text-5xl font-bold text-primary">$9</span>
              </div>
              <Badge className="bg-destructive text-destructive-foreground mb-6 py-2 px-4">
                Today Only - Returns to $37 Soon
              </Badge>

              <Button
                onClick={handleBuyNow}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mb-6"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Start Your Glow Journey Now
              </Button>
              

              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-2" />
                30-Day Money Back Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ - Compact */}
      <section id="faq" className="py-16 md:py-4 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Will this work for my skin type?",
                a: "Yes — especially if your skin is melanin-rich, sensitive, or acne-prone. The guide is specifically designed to address the unique needs of melanin-rich skin, focusing on healing from within rather than surface-level treatments.",
              },
              {
                q: "What makes this different from other skincare guides?",
                a: "This guide doesn't push products — it teaches you how to understand and heal your skin. We focus on the root causes of skin issues rather than just symptoms, with a holistic approach that includes emotional healing and lifestyle adjustments.",
              },
              {
                q: "Can I buy it from anywhere in the world?",
                a: "Yes! This is 100% digital — available worldwide instantly. Once payment is confirmed, you'll receive immediate access to download the guide and all bonus materials from any device.",
              },
              {
                q: "What if it doesn't help me?",
                a: "Just message us. We stand behind this guide fully with our 30-day money-back guarantee. If you don't see improvements in your skin's health and appearance after implementing the strategies, we'll refund your purchase.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="border-border shadow-md overflow-hidden bg-card"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex items-center justify-between w-full p-6 text-left hover:bg-accent/5 transition-colors"
                  >
                    <span className="font-semibold text-lg text-foreground pr-4">
                      {faq.q}
                    </span>
                    {activeFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                  {activeFAQ === index && (
                    <div className="px-6 pb-6 text-muted-foreground border-t border-border leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      

      {/* <Footer /> */}
    </div>
  );
};

export default ProductPage;
