import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Heart, Eye, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const navigate = useNavigate();

  const products = [
  {
    id: 1,
    name: '🖤 Module 1: The Truth About Melanin-Rich Skin',
    price: '$9',
    originalPrice: '$49',
    rating: 4.9,
    reviews: 342,
    badge: 'Best Seller',
    description:
      "Why most skincare routines don't work for us. Ingredients that secretly harm melanin. Decode skincare labels like a pro.",
    image: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', // Instagram logo
    features: ['Melanin-safe', 'Label decoding', 'Expert insights'],
  },
  {
    id: 2,
    name: '🧬 Module 2: Hormonal Balance & Skin Health',
    price: '$9',
    originalPrice: '$55',
    rating: 4.8,
    reviews: 189,
    badge: 'Popular',
    description:
      'Gut-skin connection, stress, sleep. Rituals that reset you from within for lasting glow.',
    image: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', // Facebook logo
    features: ['Gut health', 'Stress management', 'Hormonal balance'],
  },
  {
    id: 3,
    name: '💗 Module 3: Emotional Healing for Skin Confidence',
    price: '$9',
    originalPrice: '$47',
    rating: 4.9,
    reviews: 267,
    description:
      'Release skin shame & mirror trauma. Journal + inner child prompts for true healing.',
    image: 'https://cdn-icons-png.flaticon.com/512/3046/3046122.png', // TikTok logo
    features: ['Emotional healing', 'Self-confidence', 'Inner work'],
  },
];


  return (
<section id="products" className="pt-16 pb-2 md:pt-12 md:pb-4 bg-transparent relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl float-3d"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl float-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary-light/20 rounded-full blur-2xl float-gentle" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container-wide relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12" data-scroll>
          {/* <div className="inline-flex items-center space-x-2 mb-4 glass-card px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-medium text-primary">Premium Collection</span>
          </div> */}
          <h2 className="heading-lg text-gradient mb-6">UGC / Influencer Endorsement  / Social Proofs</h2>
    <p className="body-lg text-foreground/80 max-w-7xl mx-auto leading-[1.8] text-center">
  Showcased by real users and trusted influencers across Instagram and beyond, our modules are backed by genuine stories and community results. Join thousands who’ve shared their transformations and tagged us — <br />
  discover why social buzz can’t get enough of our science-backed glow.
</p>






        </div>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              data-scroll
              className="group glass-card rounded-3xl overflow-hidden shadow-float hover:shadow-xl transition-all duration-700 hover-lift depth-card perspective-1000 magnetic cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Enhanced Product Image Container */}
              <div className="relative overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-65 object-cover group-hover:scale-110 transition-transform duration-1000 shimmer"
                  />
                  
                  {/* Animated overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Floating particles on hover */}
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-0 particles opacity-30"></div>
                  )}
                </div>
                
                {/* Enhanced Badge with glow */}
                {product.badge && (
                  <div className="absolute top-4 left-4 animate-pulse">
                    <Badge className={`${
                      product.badge === 'Best Seller' 
                        ? 'bg-primary shadow-glow glow-pulse' 
                        : 'bg-accent shadow-glow glow-pulse'
                    } text-white font-medium backdrop-blur-md border-0`}>
                      {product.badge}
                    </Badge>
                  </div>
                )}

                {/* Enhanced Action Buttons Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    <Button 
                      size="sm"
                      className="glass-card text-foreground hover:bg-primary hover:text-primary-foreground transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-glow hover-tilt btn-3d"
                      style={{ transitionDelay: '0.1s' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm"
                      className="glass-card text-foreground hover:bg-primary hover:text-primary-foreground transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-glow hover-tilt btn-3d"
                      style={{ transitionDelay: '0.2s' }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {/* <Button 
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary-dark transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-glow hover-lift btn-3d"
                      style={{ transitionDelay: '0.3s' }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Quick Add
                    </Button> */}
                  </div>
                </div>

                {/* Animated corner accents */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Enhanced Product Info */}
              <div className="p-4 sm:p-6 relative">
                {/* Animated rating with individual star animations */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {/* {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className="h-4 w-4 text-primary fill-current transition-all duration-300 hover:scale-125 hover:rotate-12" 
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))} */}
                    {/* <span className="text-sm font-medium text-foreground ml-2">{product.rating}</span> */}
                  </div>
                  {/* <span className="text-sm text-foreground/60">({product.reviews} reviews)</span> */}
                </div>

                {/* Enhanced Product Name with gradient */}
                <h3 className="heading-sm text-foreground mb-2 group-hover:text-gradient transition-all duration-300">{product.name}</h3>
                
                {/* Enhanced Description */}
                <p className="text-foreground/70 mb-4 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">{product.description}</p>

                {/* Product Features Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.map((feature, i) => (
                    <span 
                      key={feature}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground transform hover:scale-105"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Enhanced Price and Action */}
                {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-3"> */}
                  {/* <div className="flex items-center space-x-2">
                    <span className="heading-sm text-primary font-semibold group-hover:text-gradient transition-all duration-300">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-foreground/50 line-through relative">
                        {product.originalPrice}
                       
                        <div className="absolute inset-0 bg-red-500/20 transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </span>
                    )}
                  </div> */}
                  {/* <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary-dark text-primary-foreground btn-3d hover-lift magnetic shadow-glow"
                  >
                    Add to Cart
                  </Button> */}
                {/* </div> */}

                {/* Animated accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced View All Button */}
        <div className="text-center mt-12" data-scroll>
          {/* <Button 
            size="lg" 
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-3d hover-lift magnetic shadow-glow group relative overflow-hidden"
          >
            <span className="relative z-10">View All Products</span>
            <Sparkles className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:rotate-180" />
            
       
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default Products;