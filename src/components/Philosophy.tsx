import { Leaf, Heart, Award, Shield, Sparkles } from 'lucide-react';

const Philosophy = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Melanin-Safe Ingredients',
      description: 'Carefully selected ingredients that work specifically for melanin-rich skin types.',
    },
    {
      icon: Heart,
      title: 'Inside-Out Healing',
      description: 'Heal your skin barrier naturally by understanding your unique triggers and patterns.',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Trusted by 10,000+ women worldwide. Winner of The Rising SME — Beauty & Wellness Products, 2020.',
    },
    {
      icon: Shield,
      title: 'Risk-Free Guarantee',
      description: 'If it doesn\'t help, just message me. I want you to feel confident, not confused.',
    },
  ];

  return (
   // Change the section padding at the very top of the return statement
<section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 via-pink-50 to-peach-50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch mb-16">
          {/* Text Content - Reduced size */}
          <div className="space-y-5 order-2 lg:order-1 flex flex-col justify-center py-4">
           <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 rounded-full animate-fadeIn w-max">
  <Sparkles className="h-4 w-4 text-orange-500" />
  <span className="text-sm font-medium text-orange-700">Our Philosophy</span>
</div>
            
            <div className="space-y-5 animate-slideInLeft">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Why I Created 
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent block mt-1">This</span>
              </h2>
              
              <div className="pl-3 border-l-2 border-orange-300/50">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed transition-all duration-700 hover:translate-x-2">
                  I used to feel ashamed of my bare skin — hiding behind filters and whitening creams that only made things worse.
                </p>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-3 transition-all duration-700 hover:translate-x-2 delay-100">
                  Skincare advice never spoke to us. So I made the thing I wish I had.
                </p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100/50 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fadeIn delay-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mr-2 text-white text-sm">✓</span>
                Why This Guide Works
              </h3>
              
              <div className="space-y-3 text-gray-700">
                {[
                  "Built for melanin-rich skin — not a copy-paste routine",
                  "Glow naturally by healing your skin barrier",
                  "No more expensive trial & error",
                  "Based on real results, not marketing hype",
                  "Download instantly — from anywhere in the world"
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
                  From India to Africa to Southeast Asia — we deserve to glow, naturally.
                  <span className="block font-semibold text-orange-600 mt-2">
                    A real, melanin-safe guide rooted in healing, not shame.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Image Section - Increased dimensions */}
          <div className="relative order-1 lg:order-2 flex items-center">
            <div className="relative group w-full h-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 h-full min-h-[500px]">
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
                  <span className="text-sm font-medium text-green-700">Eco-Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Grid with Cool Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 opacity-0 animate-slideInUp overflow-hidden cursor-pointer"
              style={{ 
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Animated gradient background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-orange-400/20 group-hover:via-pink-400/10 group-hover:to-purple-400/20 transition-all duration-700 rounded-3xl"></div>
              
              {/* Floating sparkles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute top-6 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute top-8 right-5 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" style={{ animationDelay: '0.6s' }}></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out skew-x-12"></div>
              
              <div className="relative z-10">
                {/* Enhanced Icon Container */}
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg group-hover:shadow-xl animate-float">
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"></div>
                    <feature.icon className="h-10 w-10 text-orange-500 group-hover:text-pink-500 transition-all duration-700 relative z-10 group-hover:scale-110" />
                  </div>
                </div>
                
                {/* Enhanced Title */}
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center transition-all duration-700 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:via-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transform group-hover:scale-105">
                  {feature.title}
                </h4>
                
                {/* Enhanced Description */}
                <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-all duration-700 transform group-hover:scale-105 group-hover:translate-y-1">
                  {feature.description}
                </p>
              </div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-orange-400/30 group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-5px) rotate(1deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(0deg); 
          }
          75% { 
            transform: translateY(-5px) rotate(-1deg); 
          }
        }
        
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .group:hover .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        /* Staggered entrance animations */
        .grid > div:nth-child(1) { animation-delay: 0ms; }
        .grid > div:nth-child(2) { animation-delay: 200ms; }
        .grid > div:nth-child(3) { animation-delay: 400ms; }
        .grid > div:nth-child(4) { animation-delay: 600ms; }
        
        /* Enhanced hover states */
        .group:hover {
          transform: translateY(-16px) scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default Philosophy;