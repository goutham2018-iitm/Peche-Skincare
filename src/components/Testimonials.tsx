// import { Star, Quote, Sparkles } from 'lucide-react';

// const Testimonials = () => {
//   const testimonials = [
//     {
//       id: 1,
//       name: "Priya",
//       location: "🇮🇳 Mumbai",
//       avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//       rating: 5,
//       text: "This guide taught me my skin didn't need more — it needed healing.",
//       transformation: "After healing naturally — no more filters needed"
//     },
//     {
//       id: 2,
//       name: "Adaora", 
//       location: "🇳🇬 Lagos",
//       avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//       rating: 5,
//       text: "I thought hyperpigmentation was normal. This changed everything.",
//       transformation: "From irritated skin to calm, clear confidence"
//     },
//     {
//       id: 3,
//       name: "Thando",
//       location: "🇿🇦 Cape Town", 
//       avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//       rating: 5,
//       text: "It's not just skincare it's soul work. Every melanin queen needs this.",
//       transformation: "Glow results in 3 weeks — without harsh actives"
//     }
//   ];

//   return (
//     <section className="py-6 md:py-8 bg-gradient-subtle relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-20 left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl float-3d"></div>
//         <div className="absolute bottom-20 right-20 w-60 h-60 bg-accent/30 rounded-full blur-3xl float-3d" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary-light/20 rounded-full blur-2xl float-3d" style={{ animationDelay: '4s' }}></div>
//       </div>

//       <div className="container-wide relative z-10">
//         {/* Section Header */}
//         <div className="text-center mb-8" data-scroll>
//           <div className="inline-flex items-center space-x-2 mb-3 glass-card px-4 py-2 rounded-full">
//             <Quote className="h-4 w-4 text-primary" />
//             <span className="text-sm font-medium text-primary">Real Transformations</span>
//           </div>
//           <h2 className="heading-lg text-gradient mb-4">What Melanin Queens Are Saying</h2>
//           <p className="body-lg text-foreground/80 max-w-2xl mx-auto">
//             Rel transformations from women who've healed their melanin-rich skin naturally.
//           </p>
//         </div>

//         {/* Testimonials Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//           {testimonials.map((testimonial, index) => (
//             <div 
//               key={testimonial.id}
//               data-scroll
//               className="group glass-card rounded-3xl p-5 sm:p-6 shadow-float hover:shadow-glow transition-all duration-700 hover-lift depth-card perspective-1000 flex flex-col"
//               style={{ animationDelay: `${index * 0.15}s` }}
//             >
//               {/* User Info with Larger Avatar */}
//               <div className="flex flex-col items-center mb-4">
//                 <div className="relative mb-3">
//                   <img 
//                     src={testimonial.avatar}
//                     alt={testimonial.name}
//                     className="w-25 h-25 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
//                   />
//                   <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
//                     <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
//                     {testimonial.name}
//                   </h4>
//                   <p className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300">
//                     {testimonial.location}
//                   </p>
//                 </div>
//               </div>

//               {/* Testimonial Text */}
//               <blockquote className="text-center mb-4 flex-grow">
//                 <p className="body-base text-foreground/90 leading-relaxed group-hover:text-foreground transition-colors duration-300">
//                   "{testimonial.text}"
//                 </p>
//               </blockquote>

//               {/* Transformation Badge */}
//               <div className="text-center mb-4">
//                 <span className="inline-flex items-center px-3 py-1 bg-gradient-primary text-primary-foreground text-sm font-medium rounded-full shadow-glow">
//                   <Sparkles className="h-3 w-3 mr-1" />
//                   {testimonial.transformation}
//                 </span>
//               </div>

//               {/* Stars - Moved to bottom of card */}
//               <div className="flex justify-center space-x-1 mt-auto pt-3">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <Star 
//                     key={i}
//                     className="h-5 w-5 text-primary fill-current transition-all duration-300 hover:scale-125 hover:rotate-12" 
//                     style={{ animationDelay: `${i * 0.1}s` }}
//                   />
//                 ))}
//               </div>

//               {/* Animated border glow */}
//               <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-500"></div>
              
//               {/* Corner accents */}
//               <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-3xl"></div>
//               <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl"></div>
//             </div>
//           ))}
//         </div>

//         {/* Trust Indicators */}
//         <div className="mt-10 text-center" data-scroll>
//           <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 glass-card px-4 sm:px-8 py-3 rounded-full text-center sm:text-left">
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
//               <span className="text-sm font-medium text-foreground">Trusted by 10,000+ Women</span>
//             </div>
//             <div className="w-px h-4 bg-border"></div>
//             <div className="flex items-center space-x-2">
//               <Star className="h-4 w-4 text-primary fill-current" />
//               <span className="text-sm font-medium text-foreground">4.9/5 Average Rating</span>
//             </div>
//             <div className="w-px h-4 bg-border"></div>
//             <div className="flex items-center space-x-2">
//               <Sparkles className="h-4 w-4 text-primary" />
//               <span className="text-sm font-medium text-foreground">Worldwide Community</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

