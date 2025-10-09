/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ReactCountryFlag from "react-country-flag";
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
  RefreshCw,
  CheckCircle,
  Book,
  ChevronLeft,
  ChevronRight,
  Pause,
  ArrowDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import { Counter } from "@/components/Counter";
// import Testimonials from "@/components/Testimonials";

// Product Page Navigation Component
const ProductNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Update active section based on scroll position
      const sections = [
        "home",
        "transformations",
        "bonusecs",
        "bonuses",
        "faq",
        "contact",
      ];
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Transformations", href: "#transformations" },
    { name: "Modules", href: "#modules" },
    { name: "Five Bonuses", href: "#bonuses" },
    { name: "FAQ's", href: "#faq" },
    // { name: "Contact Us", href: "#contact" },
  ];
  const sparkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: [0, 1.5, 1],
      opacity: [0, 1, 0],
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 2,
      },
    }),
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 shadow-md ${
        isScrolled
          ? "glass-card backdrop-blur-2xl border-b border-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Enhanced Logo with Image */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              {/* Logo Image Container */}
             <div className="w-24 h-12 sm:w-28 sm:h-10 md:w-38 md:h-12 rounded-xl overflow-hidden shadow-glow transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
  <img 
    src="https://res.cloudinary.com/dwit7nxav/image/upload/v1758915308/Gemini_Generated_Image_abgdngabgdngabgd_u0rzuu.png" 
    alt="Pêche Logo"
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
  />
</div>

              
              {/* Optional overlay icon for branding */}
              {/* <div className="absolute inset-0 bg-primary/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"> */}
                {/* <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" /> */}
              {/* </div> */}
            </div>
            {/* <span className="text-base sm:text-lg md:text-xl font-light text-foreground group-hover:text-primary transition-all duration-300">
            Pêche 
            </span> */}
          </div>

          {/* Enhanced Desktop Navigation */}
<div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative text-sm lg:text-base text-foreground/80 hover:text-primary transition-all duration-500 font-medium group hover-tilt magnetic ${
                  activeSection === item.href.slice(1) ? "text-primary" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}

                {/* Enhanced underline animation */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 shadow-glow ${
                    activeSection === item.href.slice(1)
                      ? "w-full opacity-100"
                      : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
                  }`}
                ></span>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-primary/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </a>
            ))}
          </div>

 
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-foreground hover:text-primary transition-all duration-300 hover-tilt magnetic relative"
          >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
              <Menu
                className={`h-6 w-6 absolute transition-all duration-500 ${
                  isMenuOpen
                    ? "opacity-0 rotate-180 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`h-6 w-6 absolute transition-all duration-500 ${
                  isMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-180 scale-50"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full glass-card border-t border-primary/20 shadow-xl backdrop-blur-2xl transition-all duration-700 transform origin-top ${
            isMenuOpen
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }`}
        >
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
                  activeSection === item.href.slice(1)
                    ? "text-primary bg-primary/5"
                    : ""
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.5s ease-out ${index * 0.1}s`,
                }}
              >
                {item.name}

                {/* Mobile active indicator */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-50"
                  }`}
                ></div>
              </a>
            ))}

            {/* Mobile CTA Button */}
            <div className="pt-2 sm:pt-4">
              {/* <Button
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-medium shadow-glow hover:shadow-xl transition-all duration-500 btn-3d relative overflow-hidden group"
                style={{
                  transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.5s ease-out 0.4s",
                }}
              >
                <span className="relative z-10">Shop Now</span>


                <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Button> */}
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
      title: "Melanin-Safe Ingredients",
      description:
        "Carefully selected ingredients that work specifically for melanin-rich skin types.",
    },
    {
      icon: Heart,
      title: "Inside-Out Healing",
      description:
        "Heal your skin barrier naturally by understanding your unique triggers and patterns.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description:
        "Trusted by 10,000+ women worldwide. Winner of The Rising SME — Beauty & Wellness Products, 2020.",
    },
    {
      icon: Shield,
      title: "Risk-Free Guarantee",
      description:
        "If it doesn't help, just message me. I want you to feel confident, not confused.",
    },
  ];

  const sparkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: [0, 1.5, 1],
      opacity: [0, 1, 0],
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 2,
      },
    }),
  };

  return (
<section className="py-6 md:py-8 bg-gradient-to-br from-orange-50 via-pink-50 to-peach-50 relative overflow-hidden">
  {/* Subtle Background Pattern */}
  <div className="absolute inset-0 opacity-30">
    <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-2xl animate-pulse"></div>
    <div
      className="absolute bottom-10 left-20 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: "2s" }}
    ></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Main Content Section */}
    <div className="grid lg:grid-cols-2 gap-10 items-stretch mb-0 md:mb-0">
      {/* Text Content - Desktop: Match image height */}
      <div className="space-y-5 order-1 lg:order-1 lg:flex lg:flex-col lg:justify-between">
        <div className="space-y-5 animate-slideInLeft">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why I Created
           <span className="font-black text-black block mt-1">This</span>
          </h2>
        </div>

        {/* Testimonial Card - Mobile Only */}
        <div className="lg:hidden mt-6">
          <div className="relative group bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-orange-400/20 group-hover:via-pink-400/10 group-hover:to-purple-400/20 transition-all duration-700 rounded-3xl"></div>
            <div
              className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute top-6 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="absolute top-8 right-5 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
              style={{ animationDelay: "0.6s" }}
            ></div>

            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out skew-x-12"></div>

            <div className="relative z-10">
              <div className="relative h-80 md:h-96 rounded-t-3xl overflow-hidden">
                <div className="relative overflow-hidden h-full w-full bg-gradient-to-br from-orange-100/50 to-pink-100/50">
                  <img
                    src="https://res.cloudinary.com/dwit7nxav/image/upload/v1758218622/imgonline-com-ua-twotoone-EQZcPi0Qf3aQNW_wv0xai.jpg"
                    alt="Before and After transformation"
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-red-500/90 text-black text-xs font-medium px-3 py-1 rounded-full">
                    Before
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500/90 text-black text-xs font-medium px-3 py-1 rounded-full">
                    After
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-6">
                <blockquote className="text-gray-700 italic leading-relaxed text-sm">
                  "I used to hide behind makeup every single day. This guide taught me that my skin didn't need more products — it needed understanding of melanin skin."
                </blockquote>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-orange-400 fill-current"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.757 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-medium bg-gradient-to-r from-orange-100 to-pink-100 px-3 py-1 rounded-full">
                    3 weeks later
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining Text Content */}
        <div className="pl-3 border-l-2 border-orange-300/50 mt-5 space-y-3 lg:flex-grow">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed transition-all duration-700 hover:translate-x-2">
            I used to feel ashamed of my bare skin — hiding behind filters
            and whitening creams that only made things worse.
          </p>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-3 transition-all duration-700 hover:translate-x-2 delay-100">
            Skincare advice never spoke to us. So I made the thing I wish
            I had.
          </p>
        </div>

        {/* Why this guide works card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100/50 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fadeIn delay-300 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
            <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mr-2 text-white text-sm">
              ✓
            </span>
            Why This Guide Works
          </h3>

          <div className="space-y-3 text-gray-700">
            {[
              "Built for melanin-rich skin — not a copy-paste routine",
              "Glow naturally by healing your skin barrier",
              "No more expensive trial & error",
              "Based on real results, not marketing hype",
              "Download instantly — from anywhere in the world",
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

          <div className="mt-5 pt-4 border-t border-orange-100/50">
            <p className="text-gray-600 italic text-center text-base leading-relaxed transition-all duration-700 hover:scale-105">
              From India to Africa to Southeast Asia — we deserve to glow,
              naturally.
              <span className="block font-semibold text-primary mt-2">
                A real, melanin-safe guide rooted in healing, not shame.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Card - Desktop Only */}
      <div className="relative hidden lg:block order-2 lg:h-full">
        <div className="relative group bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 overflow-hidden cursor-pointer h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-orange-400/20 group-hover:via-pink-400/10 group-hover:to-purple-400/20 transition-all duration-700 rounded-3xl"></div>
          <div
            className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="absolute top-6 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="absolute top-8 right-5 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
            style={{ animationDelay: "0.6s" }}
          ></div>

          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out skew-x-12"></div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="relative flex-grow rounded-t-3xl overflow-hidden">
              <div className="relative overflow-hidden h-full w-full bg-gradient-to-br from-orange-100/50 to-pink-100/50">
                <img
                  src="https://res.cloudinary.com/dwit7nxav/image/upload/v1758218622/imgonline-com-ua-twotoone-EQZcPi0Qf3aQNW_wv0xai.jpg"
                  alt="Before and After transformation"
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-all duration-500 bg-white/20"
                />
                <div className="absolute top-3 left-3 bg-red-500/90 text-black text-xs font-medium px-3 py-1 rounded-full">
                  Before
                </div>
                <div className="absolute top-3 right-3 bg-green-500/90 text-black text-xs font-medium px-3 py-1 rounded-full">
                  After
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-6 flex-shrink-0">
              <blockquote className="text-gray-700 italic leading-relaxed text-sm">
                "I used to hide behind makeup every single day. This guide taught me that my skin didn't need more products — it needed understanding of melanin skin."
              </blockquote>

              <div className="flex items-center justify-between mt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-orange-400 fill-current"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.757 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-600 font-medium bg-gradient-to-r from-orange-100 to-pink-100 px-3 py-1 rounded-full">
                  3 weeks later
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>{`
    @keyframes float {0%,100%{transform:translateY(0) rotate(0deg);}25%{transform:translateY(-5px) rotate(1deg);}50%{transform:translateY(-10px) rotate(0deg);}75%{transform:translateY(-5px) rotate(-1deg);}}
    @keyframes slideInUp {0%{opacity:0; transform:translateY(50px) scale(0.9);}100%{opacity:1; transform:translateY(0) scale(1);}}
    @keyframes slideInLeft {0%{opacity:0; transform:translateX(-30px);}100%{opacity:1; transform:translateX(0);}}
    @keyframes fadeIn {0%{opacity:0;}100%{opacity:1;}}
    .animate-float{animation:float 4s ease-in-out infinite;}
    .animate-slideInUp{animation:slideInUp 0.8s cubic-bezier(0.4,0,0.2,1);}
    .animate-slideInLeft{animation:slideInLeft 0.8s cubic-bezier(0.4,0,0.2,1);}
    .animate-fadeIn{animation:fadeIn 1s ease-out forwards;}
  `}</style>
</section>



  );
};

const ProductPage = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
 const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(2);
  const intervalRef = useRef(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  const testimonials = [
    {
      name: "Maysa.",
      location: "Bamako, Mali",
      countryCode: "ML",
      testimonial:
        "I used to hide behind makeup every single day. This guide taught me that my skin didn't need more products — it needed healing.",
      timeframe: "3 weeks later",
      image:
        "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218678/IMG_3688_ntxicl.jpg",
    },
    {
      name: "Keisha M.",
      location: "Atlanta, USA",
      countryCode: "US",
      testimonial:
        "Finally, a guide that understands my skin! The emotional healing part was just as important as the skincare routine.",
      timeframe: "5 weeks later",
      image:
        "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218619/IMG_5652_bdhenw.jpg",
    },
    {
      name: "Adaora O.",
      location: "Lagos, Nigeria",
      countryCode: "NG",
      testimonial:
        "I thought my acne dark spots were just something I had to live with. This guide completely changed my perspective.",
      timeframe: "6 weeks later",
      image:
        "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218650/Untitled_design.zip_-_4_k47sik.png",
    },
  ];

  // Create duplicated array for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.innerWidth >= 768 ? 2 : 1);
    };
    
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          // Reset to beginning when we reach the end of original items
          if (nextIndex >= testimonials.length) {
            return 0;
          }
          return nextIndex;
        });
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, testimonials.length]);

  // Smooth animation with infinite loop effect
  useEffect(() => {
    const cardWidth = 100 / cardsPerView;
    const targetX = -currentIndex * cardWidth;
    
    controls.start({
      x: `${targetX}%`,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
      }
    });
  }, [currentIndex, cardsPerView, controls]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= testimonials.length) {
        return 0;
      }
      return nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return testimonials.length - 1;
      }
      return prev - 1;
    });
  };
 

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const sparkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: [0, 1.5, 1],
      opacity: [0, 1, 0],
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 2,
      },
    }),
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };
  // Razorpay handler
  // --- Razorpay script loader (keep once) ---
  useEffect(() => {
    const id = "razorpay-checkout-js";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ProductNavigation />

      {/* Hero Section - Optimized Layout */}
<section
        id="home"
        className="pt-20 pb-8 md:pt-36 md:pb-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start min-h-[60vh] lg:min-h-[70vh]">
            {/* Product Info - Now First on Mobile */}
            <div className="space-y-4 lg:space-y-8">
              {/* <Badge className="inline-flex bg-accent/20 text-accent-foreground py-2 px-4 text-sm font-medium">
                <Timer className="h-4 w-4 mr-2" />
                Limited Time: 76% OFF
              </Badge> */}

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
<div className="bg-gradient-to-r from-primary/15 to-accent/15 rounded-xl p-3 md:p-4 border border-primary/20 w-full max-w-[340px] md:max-w-none mx-auto">
      {/* Header */}
      <div className="relative mb-1 md:mb-2">
        {/* Somewhat left-aligned Price with Today Only beside it */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 mr-16">
            <div className="text-xl md:text-3xl font-extrabold text-primary leading-tight animate-pulse">
              ₹800
            </div>
            <div className="text-[12px] md:text-xs text-black font-bold ">
              Today Only
            </div>
          </div>
        </div>

        {/* Old Price + Discount (top-right) */}
        <div className="absolute top-0 right-0 text-right">
          <span className="text-xl md:text-xl font-semibold text-muted-foreground line-through">
            ₹3288
          </span>
          <Badge className="bg-destructive text-destructive-foreground font-bold py-0.5 px-1 text-[9px] md:text-[14px] ml-1 animate-pulse">
            76% OFF
          </Badge>
        </div>
      </div>


{/* Buy Button */}
{/* <Button
  onClick={handleBuyNow}
  className="w-full mt-2 md:mt-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-semibold py-2 md:py-2.5 text-xs md:text-sm rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2"
>
  <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
  Download PDF (5MB)
  <ArrowDown className="h-3 w-3 md:h-4 md:w-4 smooth-bounce" />
</Button> */}
 <RazorpayButton amount={800} productName="34-Page E-book" />


      {/* Features - Closer spacing between items */}
      <div className="flex justify-center items-start mt-2 w-full gap-2">
        {[
          {
            text: "100% Satisfaction",
            icon: Heart,
            animation: "animate-float [animation-delay:200ms]",
            align: "left"
          },
          {
            text: "Instant Access",
            icon: Download,
            animation: "animate-float [animation-delay:400ms]",
            align: "center"
          },
          {
            text: "24/7 Support",
            icon: MessageCircle,
            animation: "animate-float [animation-delay:600ms]",
            align: "right"
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center flex-1"
          >
            <item.icon className="h-3 w-3 md:h-5 md:w-5 text-primary animate-pulse mb-0.5" />
            <span className="text-[10px] md:text-xs font-medium text-muted-foreground leading-tight text-center">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.7; }
        }
            @keyframes smoothBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(4px); }
  }

  .smooth-bounce {
    animation: smoothBounce 1.2s ease-in-out infinite;
  }
      `}</style>
</div>
</div>

            {/* Product Images - Match left card height exactly */}
            <div className="relative flex flex-col">
              {/* Skip badge to align with heading */}
              <div className="h-0 mb-2"></div>

              <div className="flex-1 flex flex-col">
                <div className="relative group mb-0">
                  <img
                    src="https://res.cloudinary.com/dwit7nxav/image/upload/v1758218700/DTP_3061_wf2a7v.jpg"
                    alt="Skincare transformation results"
                    className="w-full h-[420px] md:h-[480px] lg:h-[500px] object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Compact with Animations */}
      {/* <section className="py-0 md:py-6 bg-gradient-to-b from-accent/10 to-accent/5 border-y border-accent/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {[
              // {
              //   text: "Secure Payment",
              //   icon: Shield,
              //   animation: "animate-float",
              // },
              {
                text: "100% Satisfaction",
                icon: Heart,
                animation: "animate-float [animation-delay:200ms]",
              },
              {
                text: "Instant Access",
                icon: Download,
                animation: "animate-float [animation-delay:400ms]",
              },
              {
                text: "24/7 Support",
                icon: MessageCircle,
                animation: "animate-float [animation-delay:600ms]",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-muted-foreground ${item.animation}`}
              >
                <item.icon className="h-5 w-5 text-primary animate-pulse-glow" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* Transformation Results - Mobile Optimized */}
      <section
        id="transformations"
        className="py-0 md:py-10 bg-gradient-to-br from-background via-accent/5 to-primary/5"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10 md:mb-10">
            <motion.div
              initial={{ scale: 0, rotate: -15, opacity: 0 }}
              whileInView={{
                scale: [0, 1.3, 1],
                rotate: [0, 8, -5, 0],
                opacity: 1,
              }}
              transition={{ duration: 1, ease: "easeOut", bounce: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
              className="relative inline-block"
            >
              {/* Badge */}
              <Badge className="inline-flex bg-primary/20 text-primary font-semibold text-base md:text-lg lg:text-xl mb-6 py-2 px-4 shadow-md">
                <Award className="h-4 w-4 mr-2" />
                Real Transformations
              </Badge>

              {/* Sparkles */}
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={sparkVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              See The Glow Transformation
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
              These women followed the guide & achieved the natural glow. No filters, no editing, just real results from
              healing their skin naturally.
            </p>
          </div>

          {/* Premium Cards Grid */}
    <div className="grid md:grid-cols-2 gap-8 mb-12 md:mb-16">
  {[
    {
      name: "Melrose",
      location: "Malaysia",
      countryCode: "MY", // ISO country code
      testimonial:
        "I used to think my dark spots were permanent, but this guide completely transformed how I view and treat them.",
      timeframe: "6 weeks later",
      image:
        "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218619/IMG_5649_wwilbh.jpg",
    },
    {
      name: "Chinwe",
      location: "Nigeria",
      countryCode: "NG",
      testimonial:
        "This isn't just skincare — it's soul work. The guide showed me my acne was tied to stress.",
      timeframe: "4 weeks later",
      image:
        "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218638/Untitled_design.zip_-_1_lze2nw.png",
    },
    {
      name: "Aisha.",
      location: "India",
      countryCode: "IN",
      testimonial:
        "Finally, a guide that understands my skin! The emotional healing part was just as important as the skincare routine.",
      timeframe: "5 weeks later",
      image:
        "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218619/IMG_6569_eaoxzn.jpg",
    },
     {
          name: "Thando W.",
          location: "Cape Town, SA",
          countryCode: "ZA",
          testimonial:
            "This isn't just about skincare — it's soul work. The guide helped me understand that my acne was connected to my gut health.",
          timeframe: "4 weeks later",
          image:
            "https://res.cloudinary.com/dwit7nxav/image/upload/v1758218698/Untitled_design.zip_-_3_potxtv.png",
        },
  ].map((item, index) => (
    <div
      key={index}
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 opacity-0 animate-slideInUp overflow-hidden cursor-pointer"
      style={{
        animationDelay: `${index * 200}ms`,
        animationFillMode: "forwards",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-orange-400/20 group-hover:via-pink-400/10 group-hover:to-purple-400/20 transition-all duration-700 rounded-3xl"></div>

      {/* Card Content */}
      <div className="relative z-10">
        {/* Large Image - Updated for better visibility */}
        <div className="relative h-80 md:h-96 rounded-t-3xl overflow-hidden">
          <div className="relative overflow-hidden h-full w-full bg-gradient-to-br from-orange-100/50 to-pink-100/50">
            <img
              src={item.image}
              alt="Before and After transformation"
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-all duration-500 bg-white/20"
            />
            <div className="absolute top-3 left-3 bg-red-500/90 text-black text-xs font-medium px-3 py-1 rounded-full">
              Before
            </div>
            <div className="absolute top-3 right-3 bg-green-500/90 text-black text-xs font-medium px-3 py-1 rounded-full">
              After
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className="px-6 pb-6 pt-6">
          <div className="flex items-center gap-4">
            {/* Profile */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-24">
              <div className="text-center space-y-1"> 
                {/* Name */}
                <h4 className="font-bold text-sm text-gray-800 leading-tight 
                  group-hover:bg-gradient-to-r group-hover:from-orange-600 
                  group-hover:via-pink-600 group-hover:to-purple-600 
                  group-hover:bg-clip-text group-hover:text-transparent 
                  transition-all duration-700">
                  {item.name}
                </h4>

                {/* Country name */}
                <p className="text-xs text-gray-600">
                  {item.location}
                </p>

                {/* Flag */}
                <div className="flex items-center justify-center mt-1">
                  <ReactCountryFlag
                    countryCode={item.countryCode}
                    svg
                    style={{
                      width: "1.8em",
                      height: "1.8em",
                    }}
                    title={item.location}
                  />
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <Quote className="h-5 w-5 text-orange-500 mb-2 flex-shrink-0" />
                <blockquote className="text-gray-700 italic leading-relaxed text-sm group-hover:text-gray-800 transition-all duration-700">
                  "{item.testimonial}"
                </blockquote>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-orange-400 fill-current group-hover:text-pink-400 transition-all duration-700"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 font-medium bg-gradient-to-r from-orange-100 to-pink-100 px-3 py-1 rounded-full">
                  {item.timeframe}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

    .animate-float { animation: float 4s ease-in-out infinite; }
    .animate-slideInUp { animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1); }

    .group:hover .animate-float { animation: float 2s ease-in-out infinite; }
  `}</style>
      </section>

      {/* What Makes This Different - Compact */}
      <section className="py-6 md:py-8 bg-gradient-to-b from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Who Is It for? & What Makes It Unique? 
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
              It's a <strong>blueprint</strong>{" "}
              to heal your skin from the <em>inside out</em> - by understanding
              your triggers, patterns, and emotions that affect your glow.
            </p>
          </div>

          <div className="mb-2 md:mb-2">
            {/* <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
        Who's It For?
      </h3> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "Melanin-Rich Skin",
                  description:
                    "Women with melanin-rich, acne-prone, or sensitive skin",
                },
                {
                  icon: RefreshCw,
                  title: "Tried Everything",
                  description:
                    "Those who've 'tried everything' and still feel stuck",
                },
                {
                  icon: Heart,
                  title: "Natural Glow",
                  description:
                    "Anyone ready to glow naturally — without filters or whitening creams",
                },
                {
                  icon: Globe,
                  title: "Global Community",
                  description:
                    "You — whether you're in Malaysia, Nigeria, India, or anywhere in the world ",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 opacity-0 animate-slideInUp overflow-hidden cursor-pointer"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-orange-400/20 group-hover:via-pink-400/10 group-hover:to-purple-400/20 transition-all duration-700 rounded-3xl"></div>

                  {/* Floating sparkles */}
                  <div
                    className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="absolute top-6 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <div
                    className="absolute top-8 right-5 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500"
                    style={{ animationDelay: "0.6s" }}
                  ></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out skew-x-12"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg group-hover:shadow-xl animate-float">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"></div>
                        <item.icon className="h-10 w-10 text-orange-500 group-hover:text-pink-500 transition-all duration-700 relative z-10 group-hover:scale-110" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-gray-800 mb-4 text-center transition-all duration-700 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:via-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transform group-hover:scale-105">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-all duration-700 transform group-hover:scale-105 group-hover:translate-y-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-orange-400/30 group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-all duration-700"></div>
                </div>
              ))}
            </div>
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
      {/* Professional Modules Content */}
      {/* Professional Modules Content */}
      <section
        id="modules"
        className="py-6 md:py-8 bg-gradient-to-br from-accent/5 via-background to-primary/5"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -15, opacity: 0 }}
              whileInView={{
                scale: [0, 1.3, 1],
                rotate: [0, 8, -5, 0],
                opacity: 1,
              }}
              transition={{ duration: 1, ease: "easeOut", bounce: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
              className="relative inline-block"
            >
              <Badge className="inline-flex bg-primary/20 text-primary font-semibold text-base md:text-lg lg:text-xl mb-6 py-2 px-4 shadow-md">
                <Award className="h-4 w-4 mr-2" />
                Complete System
              </Badge>

              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={sparkVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </motion.div>

       <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 md:mb-4">
  What's Inside - <span className="font-black text-primary">₹23,458</span> Value Pack
</h2>




           {/* // Professional animated text flipper with elegant boxes - Replace your static <p> tag with this: */}

<div className="text-center max-w-4xl mx-auto">
  <div className="relative h-24 overflow-hidden">
    <div className="absolute inset-0 flex flex-col animate-text-flip">
       <div className="h-24 flex items-center justify-center shrink-0 px-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-8 py-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold text-gray-700 mb-1">
              💎 Premium Value Package
            </div>
            <div className="text-base md:text-lg text-gray-600">
              Worth <span className="line-through text-gray-400 font-bold">₹23,458</span> 
              <span className="ml-2 text-green-600 font-bold">Now Just ₹800!</span>
            </div>
          </div>
        </div>
      </div>
      {/* Text 1: 5 Comprehensive Modules */}
      
      <div className="h-24 flex items-center justify-center shrink-0 px-4">
        <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200 rounded-xl px-8 py-4 shadow-sm hover:shadow-md transition-all duration-300">
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 text-transparent bg-clip-text">
            ✨ 5 Comprehensive Modules
          </span>
        </div>
      </div>
      
      {/* Text 2: Exclusive Bonus Materials */}
      <div className="h-24 flex items-center justify-center shrink-0 px-4">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl px-8 py-4 shadow-sm hover:shadow-md transition-all duration-300">
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text">
            🎁 + Exclusive Bonus Materials
          </span>
        </div>
      </div>
      
      {/* Text 3: Premium Value Package */}
      {/* <div className="h-24 flex items-center justify-center shrink-0 px-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-8 py-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold text-gray-700 mb-1">
              💎 Premium Value Package
            </div>
            <div className="text-base md:text-lg text-gray-600">
              Worth <span className="line-through text-gray-400 font-medium">$264</span> 
              <span className="ml-2 text-green-600 font-bold">Now Just $9!</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  </div>

  <style jsx>{`
    @keyframes textFlip {
      0%, 30% {
        transform: translateY(0);
      }
      33.33%, 63.33% {
        transform: translateY(-6rem);
      }
      66.66%, 96.66% {
        transform: translateY(-12rem);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    .animate-text-flip {
      animation: textFlip 7s ease-in-out infinite;
    }
  `}</style>
</div>
          </div>

          {/* Top 3 Modules */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                module: "Module 1",
                title: "The Truth About Melanin-Rich Skin",
                price: "₹4354",
                features: [
                  "Why many routines harm melanin",
                  "Ingredients that harm melanin",
                  "Decode skincare labels like a pro",
                ],
                icon: "🖤",
                backgroundImage:
                  "url('https://img.freepik.com/free-photo/natural-young-woman-posing_23-2148994737.jpg')",
              },
              {
                module: "Module 2",
                title: "Hormonal Balance & Skin Health",
                price: "₹4887",
                features: [
                  "Gut-skin connection mastery",
                  "Stress & sleep optimization",
                  "Internal reset rituals",
                ],
                icon: "🧬",
                backgroundImage:
                  "url('https://img.freepik.com/free-photo/young-lady-doing-meditation-grey-t-shirt-looking-peaceful_176474-17981.jpg')",
              },
              {
                module: "Module 3",
                title: "Emotional Healing for Confidence",
                price: "₹4176",
                features: [
                  "Release skin shame & trauma",
                  "Confidence-building exercises",
                  "Inner healing prompts",
                ],
                icon: "💗",
                backgroundImage:
                  "url('https://img.freepik.com/free-photo/person-conducting-reiki-therapy_23-2149403937.jpg')",
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
                      <span className="text-2xl font-bold text-gray-900">
                        {module.price}
                      </span>
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
                      <li
                        key={i}
                        className="flex items-start text-base text-gray-700"
                      >
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
                price: "₹3910",
                features: [
                  "Melanin-safe ingredient layering",
                  "3-step routine system",
                  "No more product chaos",
                ],
                icon: "✨",
                backgroundImage:
                  "url(' https://img.freepik.com/premium-photo/graceful-young-indian-woman-white-top-gently-touching-her-face_116547-100434.jpg?w=1480')",
              },
              {
                module: "Module 5",
                title: "From Bare Skin to Boss Moves ",
                price: "₹3443",
                features: [
                  "Show up confidently without makeup",
                  "Daily glow affirmations",
                  "Boss-level confidence building",
                ],
                icon: "💼",
                backgroundImage:
                  "url('https://static.vecteezy.com/system/resources/previews/007/485/896/non_2x/cropped-shot-of-tender-good-looking-woman-holds-slice-of-fresh-lemon-over-eye-recommends-organic-cosmetics-undergoes-beauty-procedures-stands-bare-shouldered-indoor-natural-treatment-concept-free-photo.jpg')",
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
                      <span className="text-2xl font-bold text-gray-900">
                        {module.price}
                      </span>
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
                      <li
                        key={i}
                        className="flex items-start text-base text-gray-700"
                      >
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
      {/* <Testimonials /> */}
      {/* Professional Bonuses Section */}
    <section id="bonuses" className="py-6 md:py-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-6 md:mb-6">
            <div className="relative inline-block mb-2 md:mb-0">
              <Badge className="inline-flex bg-primary/20 text-primary font-semibold text-base md:text-lg lg:text-xl mb-6 py-2 px-4 shadow-md rounded-full">
                <Gift className="w-6 h-6 mr-2" />
                Exclusive Bonus Materials
              </Badge>

              {/* Animated sparkles */}
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary opacity-0 animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              5 Premium Resources
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Accelerate your melanin-rich skin transformation with these
              professionally crafted bonus materials
            </p>
          </div>

          {/* Bonuses Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12 md:mb-10">
            {/* Bonus 1 */}
            <div className="group">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Daily Progress Tracker
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Comprehensive progress journal with skin metrics tracking
                      system designed specifically for melanin-rich skin tones.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Daily assessment templates
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        Daily checklist
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Peche Mini-Course
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                     Discover professional tips and proven strategies on how to use it effectively, ensuring you achieve the best possible results
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          3-step optimization system
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                         Add-on for maximum glow
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Bonus 2 */}
                       <div className="group">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Curated Product list
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Comprehensive collection of tested and approved skincare
                      products specifically formulated for melanin-rich skin.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        From drugstore to luxe
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        Product list based on skincare steps
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bonus 3 */}
           <div className="group">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Utensils className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Acne-Safe Meal & Snack Guide
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Science-backed meal plans and recipes designed to reduce
                      inflammation and promote clear, healthy skin from within.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                       Free hassle acne-friendly meal ideas
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        Delicious snack lists
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Bonus 4 - Centered and wider on desktop */}
          <div className="lg:max-w-6xl lg:mx-auto mb-12 md:mb-10">
            <div className="group">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Gut-Skin Connection Optimization Protocol
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Advanced checklist and protocols to optimize gut health for radiant melanin-rich skin through natural methods.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        Gut health checklist
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        Gut health quick check result
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
          {/* Learning Outcomes Section */}
          <div className="mb-2 md:mb-0">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-10 border-2 border-primary/20 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  You'll Learn How To:
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    Decode skincare labels like a pro
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    Calm inflammation + acne from the inside out
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    Build a 3-step melanin-safe routine
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    Heal emotional triggers blocking your glow
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Utensils className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    Eat for gut + skin health — without stress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Transformations Section - After Bonuses */}
<section className="py-6 md:py-8 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            whileInView={{
              scale: [0, 1.3, 1],
              rotate: [0, 8, -5, 0],
              opacity: 1,
            }}
            transition={{ duration: 1, ease: "easeOut", bounce: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
            className="relative inline-block"
          >
            <Badge className="inline-flex bg-primary/20 text-primary font-semibold text-base md:text-lg lg:text-xl mb-6 py-2 px-4 shadow-md">
              <Award className="h-4 w-4 mr-2" />
              More Success Stories
            </Badge>

            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={sparkVariants}
                initial="hidden"
                animate="visible"
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Join Thousands of Happy Customers
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real women, real results. See how our guide has transformed lives
            across the globe.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-0 md:mb-0">
          {/* Navigation Controls */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={togglePlayPause}
              className="bg-background/95 backdrop-blur-sm hover:bg-background shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110 border border-primary/20"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-primary" />
              ) : (
                <Play className="h-4 w-4 text-primary" />
              )}
            </button>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/95 backdrop-blur-sm hover:bg-background shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 border border-primary/20 hover:border-primary/40 hover:shadow-primary/10"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/95 backdrop-blur-sm hover:bg-background shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 border border-primary/20 hover:border-primary/40 hover:shadow-primary/10"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>

          {/* Carousel Track */}
          <div 
            className="overflow-hidden rounded-xl"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <motion.div
              className="flex"
              animate={controls}
              style={{ x }}
            >
              {duplicatedTestimonials.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  className="flex-none w-full md:w-1/2 px-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-2 border-primary/20 hover:border-primary/40 bg-card shadow-lg hover:-translate-y-2 hover:bg-card/95 h-full">
                    {/* Single Image with Before/After Labels */}
                    <div className="relative h-64 md:h-80">
                      <div className="relative overflow-hidden h-full w-full bg-gradient-to-br from-background/50 to-accent/5">
                        <motion.img
                          src={item.image}
                          alt="Before and After transformation"
                          className="w-full h-full object-cover transition-all duration-700"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                        <Badge className="absolute top-3 left-3 bg-destructive/90 text-white text-xs font-medium px-2 py-1 backdrop-blur-sm">
                          Before
                        </Badge>
                        <Badge className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-medium px-2 py-1 backdrop-blur-sm">
                          After
                        </Badge>
                        
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>

                    {/* Card Content - Horizontal Layout */}
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Left Side - Profile (Centered) */}
                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-24">
  <div className="text-center space-y-1">
    {/* Name */}
    <h4
      className="font-bold text-sm text-gray-800 leading-tight 
      group-hover:bg-gradient-to-r group-hover:from-orange-600 
      group-hover:via-pink-600 group-hover:to-purple-600 
      group-hover:bg-clip-text group-hover:text-transparent 
      transition-all duration-700"
    >
      {item.name}
    </h4>

    {/* Country name */}
    <p className="text-xs text-gray-600">{item.location}</p>

    {/* Flag */}
    <div className="flex items-center justify-center mt-1">
      <ReactCountryFlag
        countryCode={item.countryCode}
        svg
        style={{
          width: "1.8em",
          height: "1.8em",
        }}
        title={item.location}
      />
    </div>
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
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1 + 0.5 }}
                                >
                                  <Star className="h-3 w-3 text-primary fill-current" />
                                </motion.div>
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
                </motion.div>
              ))}
            </motion.div>
          </div>

       {/* Enhanced Progress Bar */}
<div className="flex justify-center mt-8 mb-6 space-x-4"> 
  {testimonials.map((_, index) => (
    <button
      key={index}
      onClick={() => goToSlide(index)}
      className="group relative"
    >
      <div
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === currentIndex
            ? 'bg-primary shadow-lg shadow-primary/30'
            : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
        }`}
      />
      {index === currentIndex && isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </button>
  ))}
</div>

{/* Auto-play Progress Indicator */}
{isPlaying && (
  <div className="relative w-full h-1 bg-muted-foreground/20 rounded-full overflow-hidden mt-4"> 
    <motion.div
      className="h-full bg-primary rounded-full"
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </div>
)}

        </div>
      </div>
    </section>

      
      {/* Philosophy Section */}
      <Philosophy />
      {/* Final CTA - Compact */}
      <section className="py-6 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-3 max-w-sm">
          <div className="bg-card rounded-lg p-4 shadow-md border border-border text-center space-y-3">
            {/* Title */}
            {/* Title */}
<h3 className="text-lg font-bold text-foreground leading-snug whitespace-nowrap">
  Just ₹800 Today — No Upsells. No Fluff.
</h3>


            {/* Price Section */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-bold text-muted-foreground line-through">
                ₹3288
              </span>
              <ArrowRight className="h-4 w-4 text-primary" />
              <span className="text-3xl font-extrabold text-primary">₹800</span>
            </div>
           <p className="text-xs font-bold text-black">
  Today Only — Returns to ₹3288 Soon
</p>



            {/* Risk-Free Box */}
            <div className="bg-primary/5 rounded-md p-3 border border-primary/20">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary text-sm">
                  Risk-Free
                </span>
              </div>
              <p className="text-xs text-foreground/80 leading-snug">
                If it doesn't help, DM me. Feel confident, not confused.
              </p>
            </div>

            {/* Buy Button */}
            {/* <Button
              onClick={handleBuyNow}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 text-sm rounded-md shadow hover:shadow-lg transition-all duration-200"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              👉 Start Your Glow Journey Now
            </Button> */}
             <RazorpayButton amount={800} productName="34-Page E-book" />

            {/* Bottom Message */}
            <p className="text-xs text-muted-foreground italic leading-snug">
              Your skin (and your wallet) will thank you.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ - Compact with Smooth Transition */}
      <section
        id="faq"
        className="py-8 md:py-4 bg-gradient-to-br from-accent/5 to-primary/5"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-6 md:mb-8">
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
                    className="flex items-center justify-between w-full p-6 text-left hover:bg-accent/10 transition-colors"
                  >
                    <span className="font-semibold text-lg text-foreground pr-4">
                      {faq.q}
                    </span>
                    {activeFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300" />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      activeFAQ === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 py-2 pb-2 text-muted-foreground border-t border-border leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
