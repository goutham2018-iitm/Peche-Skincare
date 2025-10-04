import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, Award, Shield, Truck, 
  RefreshCw, Users, Globe, Download, Play, FileText, Gift, Minus, Plus, 
  ZoomIn, ChevronLeft, ChevronRight, MessageCircle, ThumbsUp, X
} from 'lucide-react';

// --- MOCK PRODUCT DATA ---
// In a real app, this would come from an API/state management
const product = {
    id: 1,
    name: "The Complete Melanin-Rich Skin Healing Guide",
    subtitle: "34-Page Digital Guide • Instant Download • Worldwide Access",
    price: 9,
    originalPrice: 264,
    currency: "$",
    rating: 4.9,
    reviews: 10000,
    badge: "🔥 Limited Time - 97% Off",
    inStock: true,
    sku: "SKIN-GUIDE-001",
    category: "Digital Guides",
    description: "Transform your skincare journey with our comprehensive guide designed specifically for melanin-rich skin. This isn't just another product list—it's a complete system for understanding, healing, and maintaining healthy, glowing skin from the inside out.",
    keyFeatures: [
      "34-page comprehensive digital guide",
      "5 detailed modules covering skin science to emotional healing", 
      "Instant PDF download - no waiting",
      "Lifetime access - download anytime",
      "Mobile-friendly format",
      "5 bonus materials worth over \$50 included free"
    ],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80"
    ],
    perfectFor: [
      "Women with melanin-rich, sensitive, or acne-prone skin",
      "Anyone tired of wasting money on routines that weren't made for our skin", 
      "Those ready to heal naturally — no filters, no whitening, no overwhelm",
      "Anyone looking to understand their skin better and build confidence"
    ],
    modules: [
      { number: 1, title: "The Truth About Melanin-Rich Skin", value: 49, pages: 8, description: "Understand why conventional skincare fails melanin-rich skin", features: ["Science behind melanin and skin structure", "Harmful ingredients to avoid at all costs", "How to decode skincare labels like a pro", "Common myths that damage our skin"] },
      { number: 2, title: "Hormonal Balance & Skin Health", value: 55, pages: 7, description: "The connection between internal health and external glow", features: ["Gut-skin axis and digestive health", "Stress management for clearer skin", "Sleep optimization for skin repair", "Hormonal triggers and solutions"] },
      { number: 3, title: "Emotional Healing for Skin Confidence", value: 47, pages: 6, description: "Heal the emotional wounds that affect your skin", features: ["Release skin shame and mirror trauma", "Inner child healing prompts", "Confidence-building exercises", "Journaling templates for self-discovery"] },
      { number: 4, title: "Minimal Skincare Routine That Works", value: 44, pages: 8, description: "Build a simple, effective routine for your skin type", features: ["3-step routine that actually works", "Melanin-safe active ingredient layering", "Product recommendations by budget", "Troubleshooting common issues"] },
      { number: 5, title: "From Bare Skin to Boss Moves", value: 50, pages: 5, description: "Build unshakeable confidence in your natural skin", features: ["Showing up bare-faced with confidence", "Daily affirmations for self-love", "Building a positive self-image", "Embracing your natural beauty"] }
    ],
    bonuses: [
      { icon: FileText, title: "Printable Glow Tracker", description: "Track your skin's progress with our beautiful, printable tracker.", value: 7 },
      { icon: Play, title: "Video: How to Use Products Effectively", description: "Short video guide on proper application techniques.", value: 12 },
      { icon: Users, title: "Melanin-Safe Product Database", description: "Curated list from drugstore to luxury options.", value: 15 },
      { icon: ShoppingCart, title: "Acne-Safe Meal Guide", description: "Foods that heal vs. foods that harm your skin.", value: 10 },
      { icon: Check, title: "Gut Health Checklist", description: "Identify habits secretly damaging your gut and skin.", value: 8 }
    ],
    testimonials: [
      { name: "Priya S.", location: "Mumbai, India", rating: 5, text: "This guide taught me my skin didn't need more products—it needed healing. My hyperpigmentation has faded so much in just 3 weeks!", verified: true, helpful: 127, date: "2 weeks ago" },
      { name: "Adaora O.", location: "Lagos, Nigeria", rating: 5, text: "I thought my dark spots were permanent. This guide changed everything. Finally, advice made for US, not against us.", verified: true, helpful: 89, date: "1 month ago" },
      { name: "Thando W.", location: "Cape Town, South Africa", rating: 5, text: "It's not just skincare—it's soul work. Every melanin queen needs this. My confidence has completely transformed.", verified: true, helpful: 156, date: "3 weeks ago" }
    ],
    faqs: [
      { question: "Will this work for my skin type?", answer: "Yes! This guide is specifically designed for melanin-rich skin of all types - whether you're dealing with acne, sensitivity, hyperpigmentation, or just want to maintain healthy skin." },
      { question: "What makes this different from other skincare advice?", answer: "Unlike generic skincare guides, this was created specifically for melanin-rich skin. It addresses the unique challenges we face and provides solutions that actually work for our skin structure." },
      { question: "Is this available worldwide?", answer: "Yes! This is a digital download, so you can access it immediately from anywhere in the world. No shipping required." },
      { question: "What if it doesn't help me?", answer: "We're so confident in this guide that if you don't see value, just message us and we'll make it right. Your success is our priority." }
    ]
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // --- NEW --- State for lightbox and sticky CTA
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  // --- NEW --- Calculate total value for value stack
  const totalModulesValue = product.modules.reduce((sum, module) => sum + module.value, 0);
  const totalBonusesValue = product.bonuses.reduce((sum, bonus) => sum + bonus.value, 0);
  const totalValue = totalModulesValue + totalBonusesValue;

  // Handlers
  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.name} (${quantity}x) added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? "Item removed from your wishlist" : "Item saved to your wishlist",
    });
  };

  const nextImage = (e) => {
    e.stopPropagation(); // Prevent opening lightbox when clicking nav arrows
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- NEW --- Effect for sticky CTA bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('product-hero-cta');
      if (heroSection) {
        const { bottom } = heroSection.getBoundingClientRect();
        setShowStickyCta(bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NEW --- Effect for lightbox key handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* --- Breadcrumb Section --- */}
        <section className="py-4 border-b border-border bg-secondary/30">
          <div className="container-wide">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
                <span>/</span>
                <button onClick={() => navigate('/#products')} className="hover:text-primary">Products</button>
                <span>/</span>
                <span className="text-foreground">{product.category}</span>
              </div>
              <Button variant="ghost" onClick={() => navigate(-1)} className="hover:bg-secondary">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
            </div>
          </div>
        </section>

        {/* --- Product Hero Section --- */}
        <section className="py-8">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* --- Product Images Gallery --- 
                  Could be a separate component e.g., <ProductImageGallery />
              */}
              <div className="space-y-6">
                <div className="relative group">
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary shadow-float cursor-pointer" onClick={openLightbox}>
                    <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background z-10"><ChevronLeft className="h-5 w-5" /></button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background z-10"><ChevronRight className="h-5 w-5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); openLightbox(); }} className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background z-10"><ZoomIn className="h-4 w-4" /></button>
                    <div className="absolute top-4 left-4"><Badge className="bg-primary text-primary-foreground font-medium animate-pulse">{product.badge}</Badge></div>
                  </div>
                  <div className="flex justify-center space-x-2 mt-4">
                    {product.images.map((_, index) => (<button key={index} onClick={() => setSelectedImage(index)} className={`w-2 h-2 rounded-full transition-colors ${selectedImage === index ? 'bg-primary' : 'bg-muted'}`} />))}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-primary shadow-glow' : 'border-transparent hover:border-primary/30'}`}><img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" /></button>
                  ))}
                </div>
              </div>

              {/* --- Product Info & CTA --- 
                  Could be a separate component e.g., <ProductPrimaryInfo />
              */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-primary border-primary">Digital Guide</Badge>
                    <div className="flex items-center space-x-4">
                      <button onClick={handleWishlist} className={`p-2 rounded-full transition-colors ${isWishlisted ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}><Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} /></button>
                      <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"><Share2 className="h-5 w-5" /></button>
                    </div>
                  </div>
                  <h1 className="heading-lg text-foreground mb-3">{product.name}</h1>
                  <p className="text-lg text-muted-foreground mb-4">{product.subtitle}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 text-primary fill-current" />))}</div>
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-primary">{product.currency}{product.price}</span>
                    <span className="text-2xl text-muted-foreground line-through">{product.currency}{product.originalPrice}</span>
                    <Badge className="bg-destructive text-destructive-foreground text-lg px-3 py-1">Save 97%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">That's less than the cost of one wrong product you might regret buying.</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">In Stock - Instant Digital Download</span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">What you'll get:</h3>
                  <div className="grid gap-2">{product.keyFeatures.map((feature, index) => (<div key={index} className="flex items-start space-x-3"><Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="text-sm text-foreground">{feature}</span></div>))}</div>
                </div>

                <Card id="product-hero-cta" className="p-6 space-y-4">
                  <Button onClick={handleAddToCart} size="lg" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-medium shadow-glow group">
                    <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                    Get Instant Access - {product.currency}{product.price * quantity}
                  </Button>
                  <div className="grid grid-cols-3 gap-4 text-xs text-center text-muted-foreground">
                    <div className="flex flex-col items-center space-y-1"><Shield className="h-4 w-4" /><span>Risk-Free</span></div>
                    <div className="flex flex-col items-center space-y-1"><Download className="h-4 w-4" /><span>Instant Download</span></div>
                    <div className="flex flex-col items-center space-y-1"><Globe className="h-4 w-4" /><span>Worldwide Access</span></div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW: Value Stack Section --- 
            A high-impact section to show total value vs price.
            Could be a separate component e.g., <ValueStack />
        */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container-narrow text-center">
            <h2 className="heading-lg mb-4">Get Everything You Need For Glowing Skin</h2>
            <p className="body-lg text-muted-foreground mb-12">
              Stop guessing and start healing. This complete system gives you the exact blueprint for melanin-rich skin health.
            </p>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <span className="font-medium">5-Module Healing Guide</span>
                  <span className="text-muted-foreground line-through">${totalModulesValue}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <span className="font-medium">5 Free Bonus Resources</span>
                  <span className="text-muted-foreground line-through">${totalBonusesValue}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-dashed">
                  <span className="font-medium">Total Value</span>
                  <span className="text-muted-foreground line-through">${totalValue}</span>
                </div>
              </div>
              <Card className="p-8 bg-gradient-warm shadow-glow">
                <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-2">LIMITED TIME OFFER</p>
                <p className="text-lg text-foreground mb-4">Get It All Today For Just</p>
                <p className="text-6xl font-bold text-primary mb-6">${product.price}</p>
                <Button onClick={handleAddToCart} size="lg" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-medium group">
                  <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Claim My 97% Discount
                </Button>
              </Card>
            </div>
          </div>
        </section>
        
        {/* --- Product Details Tabs Section --- */}
        <section className="py-12">
          <div className="container-wide">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="modules">What's Inside</TabsTrigger><TabsTrigger value="reviews">Reviews</TabsTrigger><TabsTrigger value="faq">FAQ</TabsTrigger></TabsList>
              <TabsContent value="overview" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                  <div>
                    <h3 className="heading-md mb-6">About This Guide</h3>
                    <p className="text-foreground/90 leading-relaxed mb-6">{product.description}</p>
                    <p className="text-foreground/80 leading-relaxed">Created by skincare experts who understand the unique needs of melanin-rich skin, this guide cuts through the noise and gives you exactly what you need to achieve healthy, glowing skin naturally.</p>
                  </div>
                  <div>
                    <h3 className="heading-md mb-6">This Is Perfect For You If...</h3>
                    <div className="space-y-4">{product.perfectFor.map((item, index) => (<div key={index} className="flex items-start space-x-3"><Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><span className="text-foreground/90">{item}</span></div>))}</div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="modules" className="space-y-8">
                <div>
                  <h3 className="heading-md text-center mb-8">A Look Inside The 5-Module Guide</h3>
                  <div className="grid gap-6 max-w-5xl mx-auto">{product.modules.map((module) => (<Card key={module.number} className="p-8 hover:shadow-glow transition-all duration-300"><div className="flex items-start justify-between mb-4"><div className="flex items-center space-x-4"><div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"><span className="font-bold text-primary text-xl">{module.number}</span></div><div><h4 className="heading-sm">{module.title}</h4><p className="text-sm text-muted-foreground">{module.pages} pages • Value: ${module.value}</p></div></div><Badge variant="outline">${module.value}</Badge></div><p className="text-foreground/80 mb-4">{module.description}</p><div className="grid md:grid-cols-2 gap-2">{module.features.map((feature, index) => (<div key={index} className="flex items-center space-x-2"><Check className="h-4 w-4 text-primary flex-shrink-0" /><span className="text-sm text-foreground/90">{feature}</span></div>))}</div></Card>))}</div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-8">
                <div>
                  <div className="text-center mb-12"><h3 className="heading-md mb-4">Real Results from Real Women</h3><div className="flex items-center justify-center space-x-4"><div className="flex items-center space-x-1">{[...Array(5)].map((_, i) => (<Star key={i} className="h-6 w-6 text-primary fill-current" />))}</div><span className="text-2xl font-bold">{product.rating}</span><span className="text-muted-foreground">based on {product.reviews.toLocaleString()} reviews</span></div></div>
                  <div className="space-y-6 max-w-4xl mx-auto">{product.testimonials.map((testimonial, index) => (<Card key={index} className="p-6"><div className="flex items-start justify-between mb-4"><div className="flex items-center space-x-3"><div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">{testimonial.name.charAt(0)}</div><div><h4 className="font-semibold flex items-center space-x-2"><span>{testimonial.name}</span>{testimonial.verified && (<Badge variant="outline" className="text-xs text-green-600 border-green-300"><Check className="h-3 w-3 mr-1" />Verified Buyer</Badge>)}</h4><p className="text-sm text-muted-foreground">{testimonial.location}</p></div></div><div className="text-right"><div className="flex items-center space-x-1 mb-1">{[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="h-4 w-4 text-primary fill-current" />))}</div><p className="text-xs text-muted-foreground">{testimonial.date}</p></div></div><p className="text-foreground/90 leading-relaxed mb-4 text-lg">"{testimonial.text}"</p><div className="flex items-center space-x-4 text-sm text-muted-foreground"><button className="flex items-center space-x-1 hover:text-foreground transition-colors"><ThumbsUp className="h-4 w-4" /><span>Helpful ({testimonial.helpful})</span></button><button className="flex items-center space-x-1 hover:text-foreground transition-colors"><MessageCircle className="h-4 w-4" /><span>Reply</span></button></div></Card>))}</div>
                </div>
              </TabsContent>
              <TabsContent value="faq" className="space-y-8">
                <div><h3 className="heading-md text-center mb-8">Frequently Asked Questions</h3><div className="space-y-6 max-w-4xl mx-auto">{product.faqs.map((faq, index) => (<Card key={index} className="p-6"><h4 className="font-semibold text-foreground mb-3">{faq.question}</h4><p className="text-foreground/90 leading-relaxed">{faq.answer}</p></Card>))}</div></div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* --- NEW: Bonuses Section --- 
            A dedicated section to highlight free bonuses.
            Could be a separate component e.g., <BonusesSection />
        */}
        <section className="py-12 bg-gradient-subtle">
          <div className="container-wide text-center">
            <Badge className="bg-primary/10 text-primary font-semibold mb-4">AND THERE'S MORE...</Badge>
            <h2 className="heading-lg mb-4">Get 5 FREE Bonuses Today (Value: ${totalBonusesValue})</h2>
            <p className="body-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
              To ensure you have everything you need, you'll also get instant access to these powerful resources when you order today.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {product.bonuses.map((bonus, index) => (
                <Card key={index} className="p-6 text-left hover:shadow-glow transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <bonus.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline">Value: ${bonus.value}</Badge>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{bonus.title}</h4>
                  <p className="text-sm text-muted-foreground">{bonus.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- Final CTA Section --- */}
        <section className="py-12 bg-gradient-warm">
          <div className="container-narrow text-center">
            <h2 className="heading-lg text-gradient mb-6">Ready to Transform Your Skin?</h2>
            <p className="body-lg text-foreground/90 mb-8">Join 10,000+ women who've already started their glow journey. Get instant access for just ${product.price} (normally ${product.originalPrice}).</p>
            <Button onClick={handleAddToCart} size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium shadow-glow group mb-6"><Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />Yes, I Want The Guide! - ${product.price}</Button>
            <p className="text-sm text-foreground/70">💸 Limited time offer • 🔒 Risk-free guarantee • 📱 Instant download</p>
          </div>
        </section>
      </main>

      <Footer />

      {/* --- NEW: Image Lightbox --- */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/80 hover:text-white z-50"><X className="h-8 w-8" /></button>
          <div className="relative w-full max-w-4xl aspect-square" onClick={(e) => e.stopPropagation()}>
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-contain" />
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30"><ChevronLeft className="h-6 w-6" /></button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30"><ChevronRight className="h-6 w-6" /></button>
          </div>
        </div>
      )}

      {/* --- NEW: Sticky CTA Bar --- */}
      {showStickyCta && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border p-4 z-40 animate-slide-up">
          <div className="container-wide flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover hidden sm:block" />
              <div>
                <h4 className="font-semibold text-sm truncate max-w-[200px] md:max-w-none">{product.name}</h4>
                <p className="text-lg font-bold text-primary">${product.price} <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span></p>
              </div>
            </div>
            <Button onClick={handleAddToCart} className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium shadow-glow group whitespace-nowrap">
              <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              Get Instant Access
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;