import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Products from '@/components/Products';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <div id="products" className="bg-gradient-to-b from-primary/5 via-background to-background">
        <Products />
      </div>
      <div className="bg-gradient-to-b from-background to-primary/5">
        <Testimonials />
      </div>
      <div id="philosophy" className="bg-gradient-to-b from-primary/5 to-background">
        <Philosophy />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
