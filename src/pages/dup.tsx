// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import {
//   ShoppingCart,
//   Star,
//   Heart,
//   Check,
//   Gift,
//   Globe,
//   Shield,
//   Download,
//   Users,
//   Award,
//   Sparkles,
//   Quote,
//   ArrowRight,
//   Timer,
//   BookOpen,
//   MessageCircle,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { useState } from "react";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";

// const ProductPage = () => {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [activeFAQ, setActiveFAQ] = useState(null);

//   const handleBuyNow = () => {
//     window.open("#", "_blank");
//   };

//   const handleWishlist = () => {
//     setIsWishlisted(!isWishlisted);
//   };

//   const toggleFAQ = (index) => {
//     setActiveFAQ(activeFAQ === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-background overflow-x-hidden">
//       <Navigation />

//       {/* Hero Section - Optimized Layout */}
//       <section className="pt-24 pb-4 md:pt-32 md:pb-6 bg-gradient-to-br from-primary/10 via-background to-accent/10">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center min-h-[60vh] lg:min-h-[70vh]">
//             {/* Product Info - Now First on Mobile */}
//             <div className="space-y-3 md:space-y-4">
//               <Badge className="inline-flex bg-accent/20 text-accent-foreground py-1.5 px-4 text-sm font-medium">
//                 <Timer className="h-3.5 w-3.5 mr-1.5" />
//                 Limited Time: 76% OFF
//               </Badge>

//               <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
//                 34-Page Melanin-Rich Skin Glow Guide
//                 <span className="text-primary block mt-2 text-xl md:text-2xl lg:text-3xl">
//                   (+ 5 Free Bonuses)
//                 </span>
//               </h1>

//               <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
//                 You've tried expensive skincare, but your glow still isn't
//                 glowing? This digital guide shows what actually works from the
//                 inside out — specifically for melanin-rich skin.
//               </p>

//               <div className="flex flex-wrap items-center gap-4 md:gap-6">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-4 w-4 md:h-5 md:w-5 text-primary fill-current"
//                     />
//                   ))}
//                   <span className="text-sm md:text-base font-semibold text-foreground ml-2">
//                     4.9/5.0
//                   </span>
//                 </div>
//                 <div className="flex items-center text-sm md:text-base text-foreground/60">
//                   <Users className="h-4 w-4 md:h-5 md:w-5 mr-1.5" />
//                   10,000+ Women
//                 </div>
//               </div>

//               {/* Pricing Card */}
//               <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-3 md:p-5 border border-primary/10">
//                 <div className="flex items-center justify-between mb-4 md:mb-6">
//                   <div className="flex items-center gap-2 md:gap-3">
//                     <span className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground/50 line-through">
//                       $37
//                     </span>
//                     <Badge className="bg-red-500 text-white font-bold py-1 px-2 md:px-3 text-xs md:text-sm">
//                       76% OFF
//                     </Badge>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
//                       $9
//                     </div>
//                     <div className="text-xs md:text-sm text-foreground/60">
//                       Today Only
//                     </div>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={handleBuyNow}
//                   className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 md:py-4 text-sm md:text-base rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2" />
//                   Get Instant Access - $9
//                 </Button>

//                 <div className="grid grid-cols-3 gap-2 md:gap-4 text-center mt-4 md:mt-6">
//                   <div className="space-y-1">
//                     <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto" />
//                     <div className="text-[10px] md:text-xs text-foreground/70">
//                       Money Back
//                     </div>
//                   </div>
//                   <div className="space-y-1">
//                     <Download className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto" />
//                     <div className="text-[10px] md:text-xs text-foreground/70">
//                       Instant Access
//                     </div>
//                   </div>
//                   <div className="space-y-1">
//                     <Globe className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto" />
//                     <div className="text-[10px] md:text-xs text-foreground/70">
//                       Worldwide
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Product Images */}
//             <div className="relative">
//               <div className="relative group mb-3 md:mb-4">
//                 <img
//                   src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=500&q=80"
//                   alt="Skincare transformation results"
//                   className="w-full h-[250px] md:h-[300px] lg:h-[350px] object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <Badge className="bg-primary text-white font-semibold py-1 md:py-1.5 px-3 md:px-4 text-xs md:text-sm">
//                     <Award className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />
//                     Award Winner
//                   </Badge>
//                 </div>
//                 <Button
//                   onClick={handleWishlist}
//                   className="absolute top-4 right-4 rounded-full w-10 h-10 md:w-12 md:h-12 p-0 bg-white/90 hover:bg-white shadow-md transition-all"
//                   variant="outline"
//                 >
//                   <Heart
//                     className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${
//                       isWishlisted
//                         ? "fill-red-500 text-red-500"
//                         : "text-gray-600"
//                     }`}
//                   />
//                 </Button>
//               </div>

//               <div className="grid grid-cols-3 gap-2 md:gap-4">
//                 {[
//                   "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
//                   "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
//                   "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
//                 ].map((src, index) => (
//                   <img
//                     key={index}
//                     src={src}
//                     alt={`Product image ${index + 1}`}
//                     className="w-full h-20 md:h-24 lg:h-32 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trust Indicators - Compact */}
//       <section className="py-2 md:py-3 bg-gradient-to-b from-primary/10 to-primary/5 border-y border-primary/10">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12">
//             {[
//               { text: "Secure Payment", icon: Shield },
//               { text: "100% Satisfaction", icon: Heart },
//               { text: "Digital Delivery", icon: Download },
//               { text: "24/7 Support", icon: MessageCircle },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 text-foreground/70"
//               >
//                 <item.icon className="h-4 w-4 md:h-5 md:w-5" />
//                 <span className="text-xs md:text-sm font-medium">
//                   {item.text}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* Transformation Results - Mobile Optimized */}
//       <section className="py-6 md:py-4 lg:py-8 bg-gradient-to-br from-primary/5 to-accent/5">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="text-center mb-8 md:mb-12 lg:mb-16">
//             <Badge className="inline-flex bg-primary/20 text-primary font-semibold mb-4 py-1.5 px-4">
//               <Award className="h-3 w-3 md:h-4 md:w-4 mr-2" />
//               Real Transformations
//             </Badge>
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
//               See The Glow Transformation
//             </h2>
//             <p className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
//               These women followed the guide and achieved the natural glow they
//               always wanted. No filters, no editing — just real results from
//               healing their skin naturally.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
//             {[
//               {
//                 name: "Priya S.",
//                 location: "Mumbai, India",
//                 testimonial:
//                   "I used to hide behind makeup every single day. This guide taught me that my skin didn't need more products — it needed healing.",
//                 timeframe: "3 weeks later",
//                 beforeImg:
//                   "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80",
//                 afterImg:
//                   "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80",
//               },
//               {
//                 name: "Adaora O.",
//                 location: "Lagos, Nigeria",
//                 testimonial:
//                   "I thought my dark spots were just something I had to live with. This guide completely changed my perspective.",
//                 timeframe: "6 weeks later",
//                 beforeImg:
//                   "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80",
//                 afterImg:
//                   "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80",
//               },
//               {
//                 name: "Thando W.",
//                 location: "Cape Town, South Africa",
//                 testimonial:
//                   "This isn't just about skincare — it's soul work. The guide helped me understand that my acne was connected to stress.",
//                 timeframe: "4 weeks later",
//                 beforeImg:
//                   "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80",
//                 afterImg:
//                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80",
//               },
//             ].map((item, index) => (
//               <Card
//                 key={index}
//                 className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0"
//               >
//                 <div className="relative h-48 md:h-60 lg:h-72">
//                   <div className="grid grid-cols-2 h-full">
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={item.beforeImg}
//                         alt="Before"
//                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
//                       />
//                       <Badge className="absolute top-2 left-2 bg-red-500/90 text-white text-xs">
//                         Before
//                       </Badge>
//                     </div>
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={item.afterImg}
//                         alt="After"
//                         className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
//                       />
//                       <Badge className="absolute top-2 right-2 bg-green-500/90 text-white text-xs">
//                         After
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//                 <CardContent className="p-4 md:p-6">
//                   <div className="flex items-center gap-3 mb-3 md:mb-4">
//                     <img
//                       src={item.afterImg}
//                       alt={item.name}
//                       className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-primary/20"
//                     />
//                     <div>
//                       <h4 className="font-bold text-sm md:text-base text-foreground">
//                         {item.name}
//                       </h4>
//                       <p className="text-xs md:text-sm text-foreground/60">
//                         {item.location}
//                       </p>
//                     </div>
//                   </div>
//                   <Quote className="h-4 w-4 md:h-5 md:w-5 text-primary mb-2 md:mb-3" />
//                   <blockquote className="text-foreground/90 italic mb-3 md:mb-4 leading-relaxed text-xs md:text-sm">
//                     "{item.testimonial}"
//                   </blockquote>
//                   <div className="flex items-center justify-between">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className="h-3 w-3 md:h-4 md:w-4 text-primary fill-current"
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs md:text-sm text-foreground/60">
//                       {item.timeframe}
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-4 md:p-8 bg-white/50 backdrop-blur rounded-2xl">
//             {[
//               { value: "10,000+", label: "Women Transformed" },
//               { value: "4.9★", label: "Average Rating" },
//               { value: "3-6", label: "Weeks to Results" },
//               { value: "97%", label: "Success Rate" },
//             ].map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs md:text-sm text-foreground/70">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* What Makes This Different - Compact */}
//       <section className="py-4 md:py-6 bg-gradient-to-b from-accent/5 to-background">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="text-center mb-6 md:mb-10">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
//               What Makes This Different?
//             </h2>
//             <p className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
//               This isn't a list of products. It's a blueprint to heal your skin
//               from the inside out — by understanding your triggers, patterns,
//               and emotions that affect your glow.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//             {[
//               {
//                 icon: Sparkles,
//                 title: "Melanin-Rich Focus",
//                 description:
//                   "Built specifically for melanin-rich, sensitive, or acne-prone skin",
//               },
//               {
//                 icon: Heart,
//                 title: "Natural Healing",
//                 description:
//                   "Glow naturally by healing your skin barrier — no filters or whitening",
//               },
//               {
//                 icon: Shield,
//                 title: "Proven Results",
//                 description:
//                   "Based on real results, not marketing hype — used by 10,000+ women",
//               },
//             ].map((item, index) => (
//               <Card
//                 key={index}
//                 className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white"
//               >
//                 <CardContent className="p-6 md:p-8 text-center">
//                   <div className="mb-4 md:mb-6 inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
//                     <item.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
//                   </div>
//                   <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

// {/* Professional Modules Content - Original Text Styles */}
// <section className="py-16 md:py-12 bg-gradient-to-br from-orange-50 via-white to-rose-50/30 relative overflow-hidden">
//   {/* Background Pattern */}
//   <div className="absolute inset-0 bg-white/90 group-hover:bg-white/80 transition-colors duration-500" />
  
//   <div className="container mx-auto px-4 max-w-7xl relative">
//     <div className="text-center mb-16">
//        {/* <Badge className="inline-flex bg-primary/20 text-primary font-semibold mb-4 py-1.5 px-4">
//               <Award className="h-3 w-3 md:h-4 md:w-4 mr-2" />
//               Complete System
//             </Badge> */}
      
//       <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
//         What's Inside — Complete System
//       </h2>
      
//       <p className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
//         5 comprehensive modules + bonus materials worth $264
//       </p>
//     </div>

//     {/* Top 3 Modules */}
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//       {[
//   {
//     module: "Module 1",
//     title: "The Truth About Melanin-Rich Skin",
//     price: "$49",
//     features: [
//       "Why many routines harm melanin",
//       "Ingredients that harm melanin",
//       "Decode skincare labels with care",
//     ],
//     icon: "🖤",
//     gradient: "from-orange-400 to-rose-400",
//     bgPattern: "bg-orange-50",
//     badgeColor: "bg-orange-500",
//     backgroundImage: "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80')"
//   },
//   {
//     module: "Module 2", 
//     title: "Hormonal Balance & Skin Health",
//     price: "$55",
//     features: [
//       "Gut-skin connection mastery",
//       "Stress & sleep optimization", 
//       "Internal reset rituals",
//     ],
//     icon: "🧬",
//     gradient: "from-rose-400 to-orange-400",
//     bgPattern: "bg-rose-50",
//     badgeColor: "bg-rose-500",
//     backgroundImage: "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80')"
//   },
//   {
//     module: "Module 3",
//     title: "Emotional Healing for Confidence",
//     price: "$47", 
//     features: [
//       "Release skin shame & trauma",
//       "Confidence-building exercises",
//       "Inner healing prompts",
//     ],
//     icon: "💗",
//     gradient: "from-orange-300 to-rose-300",
//     bgPattern: "bg-orange-50",
//     badgeColor: "bg-orange-400",
//     backgroundImage: "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80')"
//   },
//   // {
//   //   module: "Module 4",
//   //   title: "Minimal Skincare That Works",
//   //   price: "$44",
//   //   features: [
//   //     "Melanin-safe ingredient layering",
//   //     "3-step routine system",
//   //     "No more product chaos",
//   //   ],
//   //   icon: "✨",
//   //   gradient: "from-orange-400 to-amber-400",
//   //   bgPattern: "bg-amber-50",
//   //   badgeColor: "bg-amber-500",
//   //   backgroundImage: "url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80')"
//   // },
//   // {
//   //   module: "Module 5", 
//   //   title: "Confident Bare-Faced Living",
//   //   price: "$50",
//   //   features: [
//   //     "Show up confidently without makeup",
//   //     "Daily glow affirmations",
//   //     "Boss-level confidence building",
//   //   ],
//   //   icon: "💼",
//   //   gradient: "from-rose-400 to-pink-400",
//   //   bgPattern: "bg-rose-50",
//   //   badgeColor: "bg-rose-500",
//   //   backgroundImage: "url('https://images.unsplash.com/photo-1494790108755-2616c27ca7ec?auto=format&fit=crop&w=700&q=80')"
//   // },
// ].map((module, index) => (
//        <div
//   key={index}
//   className="group relative bg-white rounded-2xl border border-orange-100 hover:border-orange-200 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/10 overflow-hidden"
//   style={{
//     backgroundImage: module.backgroundImage,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   }}
// >
//           {/* Card Header with Gradient */}
//   <div className={`h-2 bg-gradient-to-r ${module.gradient} relative z-10`} />
          
//           <div className="p-8">
//             {/* Module Badge & Price */}
//             <div className="flex items-start justify-between mb-4 md:mb-6">
//               <div className="flex items-center space-x-3">
//                 <div className={`w-12 h-12 rounded-xl ${module.bgPattern} flex items-center justify-center text-3xl md:text-4xl border border-orange-100`}>
//                   {module.icon}
//                 </div>
//                 <div>
//                   <span className={`inline-block px-3 py-1 ${module.badgeColor} text-white text-sm font-bold rounded-full uppercase tracking-wider`}>
//                     {module.module}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="text-right">
//                 <span className="text-2xl font-bold text-gray-800">{module.price}</span>
//                 <p className="text-xs text-gray-500 font-medium">Value</p>
//               </div>
//             </div>

//             {/* Title */}
//             <div className="mb-4 md:mb-6 flex-grow">
//               <span className="text-sm text-primary font-bold uppercase tracking-wider">
//                 {/* {module.module} */}
//               </span>
//               <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mt-1 md:mt-2 group-hover:text-gray-700 transition-colors">
//                 {module.title}
//               </h3>
//             </div>

//             {/* Features */}
//             <ul className="space-y-3 md:space-y-4">
//               {module.features.map((feature, i) => (
//                 <li key={i} className="flex items-start text-sm md:text-base text-foreground/80">
//                   <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${module.gradient} flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
//                     <Check className="h-4 w-4 md:h-5 md:w-5 text-white" />
//                   </div>
//                   <span className="leading-relaxed">{feature}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Hover Effect */}
//           <div className="absolute inset-0 bg-gradient-to-t from-transparent to-orange-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
//         </div>
//       ))}
//     </div>

//     {/* Bottom 2 Modules - Enhanced Layout */}
//     <div className="grid md:grid-cols-2 gap-8">
//       {[

//         {
//           module: "Module 4",
//           title: "Minimal Skincare That Works",
//           price: "$44",
//           features: [
//             "Melanin-safe ingredient layering",
//             "3-step routine system",
//             "No more product chaos",
//           ],
//           icon: "✨",
//           gradient: "from-orange-400 to-amber-400",
//           bgPattern: "bg-amber-50",
//           badgeColor: "bg-amber-500",
//           backgroundImage: "url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=500&q=80')"
//         },
//         {
//           module: "Module 5", 
//           title: "Confident Bare-Faced Living",
//           price: "$50",
//           features: [
//             "Show up confidently without makeup",
//             "Daily glow affirmations",
//             "Boss-level confidence building",
//           ],
//           icon: "💼",
//           gradient: "from-rose-400 to-pink-400",
//           bgPattern: "bg-rose-50",
//           badgeColor: "bg-rose-500",
//           backgroundImage: "url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=500&q=80')"
//         },
//       ].map((module, index) => (
//         <div
//   key={index}
//   className="group relative bg-white rounded-2xl border border-orange-100 hover:border-orange-200 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/10 overflow-hidden"
//   style={{
//     backgroundImage: module.backgroundImage,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   }}
// >
//           {/* Card Header with Gradient */}
//           <div className={`h-2 bg-gradient-to-r ${module.gradient}`} />
          
//           <div className="p-8">
//             {/* Module Badge & Price */}
//             <div className="flex items-start justify-between mb-4 md:mb-6">
//               <div className="flex items-center space-x-3">
//                 <div className={`w-12 h-12 rounded-xl ${module.bgPattern} flex items-center justify-center text-3xl md:text-4xl border border-orange-100`}>
//                   {module.icon}
//                 </div>
//                 <div>
//                   <span className={`inline-block px-3 py-1 ${module.badgeColor} text-white text-sm font-bold rounded-full uppercase tracking-wider`}>
//                     {module.module}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="text-right">
//                 <span className="text-2xl font-bold text-gray-800">{module.price}</span>
//                 <p className="text-xs text-gray-500 font-medium">Value</p>
//               </div>
//             </div>

//             {/* Title */}
//             <div className="mb-4 md:mb-6 flex-grow">
//               <span className="text-sm text-primary font-bold uppercase tracking-wider">
//                 {/* {module.module} */}
//               </span>
//               <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mt-1 md:mt-2 group-hover:text-gray-700 transition-colors">
//                 {module.title}
//               </h3>
//             </div>

//             {/* Features */}
//             <ul className="space-y-3 md:space-y-4">
//               {module.features.map((feature, i) => (
//                 <li key={i} className="flex items-start text-sm md:text-base text-foreground/80">
//                   <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${module.gradient} flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
//                     <Check className="h-4 w-4 md:h-5 md:w-5 text-white" />
//                   </div>
//                   <span className="leading-relaxed">{feature}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Hover Effect */}
//           <div className="absolute inset-0 bg-gradient-to-t from-transparent to-orange-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
//         </div>
//       ))}
//     </div>

//     {/* Total Value Display - Original Style */}
//     {/* <div className="mt-16 text-center"> */}
//       {/* <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <span className="mr-2">🎯</span>
//         Total Value: $264 • Complete System
//       </div> */}
//     {/* </div> */}
//   </div>
// </section>

//     {/* Professional Bonuses Section */}

// <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
//   <div className="container mx-auto px-4 max-w-7xl">
//     {/* Header */}
//     <div className="text-center mb-12 md:mb-16">
//       <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 font-semibold mb-6 py-2 px-6 rounded-full text-sm border border-orange-200">
//         <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//         Exclusive Bonus Materials
//       </div>
//       <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
//         5 Premium Resources
//       </h2>
//       <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//         Accelerate your melanin-rich skin transformation with these professionally crafted bonus materials
//       </p>
//     </div>

//     {/* Bonuses Grid */}
//     <div className="grid lg:grid-cols-2 gap-8 mb-12">
//       {/* Bonus 1 */}
//       <div className="group">
//         <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
//           <div className="flex items-start gap-6">
//             <div className="flex-shrink-0">
//               <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//                   <div className="w-4 h-4 bg-orange-500 rounded"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                   VALUE $19
//                 </span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Daily Progress Tracker
//               </h3>
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 Comprehensive progress journal with skin metrics tracking system designed specifically for melanin-rich skin tones.
//               </p>
//               <ul className="text-sm text-gray-500 space-y-2">
//                 <li className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
//                   Weekly assessment templates
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
//                   Photo comparison guides
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

    //   {/* Bonus 2 */}
    //   <div className="group">
    //     <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
    //       <div className="flex items-start gap-6">
    //         <div className="flex-shrink-0">
    //           <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
    //             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
    //               <div className="w-4 h-4 bg-rose-500 rounded"></div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex-1">
    //           <div className="flex items-center gap-3 mb-4">
    //             <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
    //               VALUE $29
    //             </span>
    //           </div>
    //           <h3 className="text-xl font-bold text-gray-900 mb-3">
    //             Video Tutorial Series
    //           </h3>
    //           <p className="text-gray-600 leading-relaxed mb-4">
    //             Step-by-step application techniques and professional tips demonstrated on various melanin-rich skin tones.
    //           </p>
    //           <ul className="text-sm text-gray-500 space-y-2">
    //             <li className="flex items-center gap-2">
    //               <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
    //               10+ technique demonstrations
    //             </li>
    //             <li className="flex items-center gap-2">
    //               <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
    //               Common mistake corrections
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

//       {/* Bonus 3 */}
//       <div className="group">
//         <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
//           <div className="flex items-start gap-6">
//             <div className="flex-shrink-0">
//               <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//                   <div className="w-4 h-4 bg-amber-500 rounded"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                   VALUE $25
//                 </span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Curated Product Database
//               </h3>
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 Comprehensive collection of tested and approved skincare products specifically formulated for melanin-rich skin.
//               </p>
//               <ul className="text-sm text-gray-500 space-y-2">
//                 <li className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
//                   50+ vetted products
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
//                   Price comparison tools
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bonus 4 */}
//       <div className="group">
//         <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
//           <div className="flex items-start gap-6">
//             <div className="flex-shrink-0">
//               <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//                   <div className="w-4 h-4 bg-emerald-500 rounded"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                   VALUE $32
//                 </span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Anti-Inflammatory Nutrition Guide
//               </h3>
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 Science-backed meal plans and recipes designed to reduce inflammation and promote clear, healthy skin from within.
//               </p>
//               <ul className="text-sm text-gray-500 space-y-2">
//                 <li className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
//                   21-day meal planning system
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
//                   Shopping lists included
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Bonus 5 - Featured */}
    // <div className="mb-12">
    //   <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl p-8 md:p-10 border-2 border-orange-200">
    //     <div className="flex flex-col lg:flex-row items-center gap-8">
    //       <div className="flex-shrink-0">
    //         <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center">
    //           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
    //             <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-rose-500 rounded"></div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex-1 text-center lg:text-left">
    //         <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
    //           <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full">
    //             VALUE $22
    //           </span>
    //           <span className="bg-white text-orange-600 text-sm font-bold px-4 py-2 rounded-full border border-orange-200">
    //             PREMIUM BONUS
    //           </span>
    //         </div>
    //         <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
    //           Gut-Skin Connection Optimization Protocol
    //         </h3>
    //         <p className="text-lg text-gray-600 leading-relaxed">
    //           Advanced checklist and protocols to optimize your gut health for clearer, more radiant melanin-rich skin through natural methods and targeted interventions.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

//     {/* Value Summary */}
//     <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-gray-100 shadow-2xl">
//       <div className="text-center">
//         <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
//           <div className="text-center">
//             <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
//               Total Individual Value
//             </div>
//             <div className="text-3xl md:text-4xl font-bold text-gray-400 line-through">
//               $127
//             </div>
//           </div>
//           <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-gray-200 to-orange-200"></div>
//           <div className="w-full md:hidden h-0.5 bg-gradient-to-r from-gray-200 to-orange-200"></div>
//           <div className="text-center">
//             <div className="text-sm font-medium text-orange-600 uppercase tracking-wide mb-2">
//               Your Investment Today
//             </div>
//             <div className="text-4xl md:text-5xl font-bold text-orange-600">
//               FREE
//             </div>
//           </div>
//         </div>
//         <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3 px-8 rounded-full text-lg">
//           <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//           All Resources Included Automatically
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//       {/* FAQ - Compact */}
//       <section className="py-6 md:py-8 bg-gradient-to-br from-primary/5 to-accent/5">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
//               Frequently Asked Questions
//             </h2>
//           </div>

//           <div className="space-y-4">
//             {[
//               {
//                 q: "Will this work for my skin type?",
//                 a: "Yes — especially if your skin is melanin-rich, sensitive, or acne-prone. The guide is specifically designed to address the unique needs of melanin-rich skin, focusing on healing from within rather than surface-level treatments.",
//               },
//               {
//                 q: "What makes this different from other skincare guides?",
//                 a: "This guide doesn't push products — it teaches you how to understand and heal your skin. We focus on the root causes of skin issues rather than just symptoms, with a holistic approach that includes emotional healing and lifestyle adjustments.",
//               },
//               {
//                 q: "Can I buy it from anywhere in the world?",
//                 a: "Yes! This is 100% digital — available worldwide instantly. Once payment is confirmed, you'll receive immediate access to download the guide and all bonus materials from any device.",
//               },
//               {
//                 q: "What if it doesn't help me?",
//                 a: "Just message us. We stand behind this guide fully with our 30-day money-back guarantee. If you don't see improvements in your skin's health and appearance after implementing the strategies, we'll refund your purchase.",
//               },
//             ].map((faq, index) => (
//               <Card
//                 key={index}
//                 className="border-0 shadow-md overflow-hidden bg-white"
//               >
//                 <CardContent className="p-0">
//                   <button
//                     onClick={() => toggleFAQ(index)}
//                     className="flex items-center justify-between w-full p-6 text-left hover:bg-primary/5 transition-colors"
//                   >
//                     <span className="font-semibold text-lg text-foreground pr-4">
//                       {faq.q}
//                     </span>
//                     {activeFAQ === index ? (
//                       <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
//                     ) : (
//                       <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
//                     )}
//                   </button>
//                   {activeFAQ === index && (
//                     <div className="px-6 pb-6 text-foreground/80 border-t leading-relaxed">
//                       {faq.a}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA - Compact */}
//       <section className="py-6 md:py-8 bg-gradient-to-br from-primary/10 to-accent/10">
//         <div className="container mx-auto px-4 max-w-4xl text-center">
//           <div className="space-y-6">
//             <div className="bg-white rounded-2xl p-6 max-w-md mx-auto shadow-2xl border border-primary/10">
//               <div className="flex items-center justify-center gap-4 mb-6">
//                 <span className="text-3xl font-bold text-foreground/50 line-through">
//                   $37
//                 </span>
//                 <ArrowRight className="h-6 w-6 text-primary" />
//                 <span className="text-5xl font-bold text-primary">$9</span>
//               </div>
//               <Badge className="bg-red-500 text-white mb-6 py-1.5 px-4">
//                 Today Only - Returns to $37 Soon
//               </Badge>

//               <Button
//                 onClick={handleBuyNow}
//                 className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mb-6"
//               >
//                 <ShoppingCart className="h-5 w-5 mr-2" />
//                 Start Your Glow Journey Now
//               </Button>

//               <div className="flex items-center justify-center text-sm text-foreground/60">
//                 <Shield className="h-4 w-4 mr-1.5" />
//                 30-Day Money Back Guarantee
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default ProductPage;
