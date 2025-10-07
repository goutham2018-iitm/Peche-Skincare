// components/Footer.jsx - Streamlined and improved
import { Sparkles, Instagram, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Custom TikTok Icon as a component
const TikTokIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="currentColor"
    {...props}
  >
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
  </svg>
);

const Footer = () => {
  const [lastUpdated, setLastUpdated] = useState('');
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address", {
        style: {
          background: '#FFF5F5',
          color: '#C53030',
          border: '1px solid #FED7D7',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#C53030',
          secondary: '#FFF5F5',
        },
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Welcome to the glow squad! Check your inbox for a special surprise ✨", {
          style: {
            background: 'linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)',
            color: '#5D3A29',
            border: '1px solid #F4C7B0',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(212, 130, 101, 0.15)',
          },
          iconTheme: {
            primary: '#D48265',
            secondary: '#FFF5F0',
          },
          duration: 4000,
        });
        setEmail("");
      } else {
        toast.error(data.message || "Oops! Something went wrong. Please try again.", {
          style: {
            background: '#FFF5F5',
            color: '#C53030',
            border: '1px solid #FED7D7',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          iconTheme: {
            primary: '#C53030',
            secondary: '#FFF5F5',
          },
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Connection issue. Please check your internet and try again.", {
        style: {
          background: '#FFF5F5',
          color: '#C53030',
          border: '1px solid #FED7D7',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#C53030',
          secondary: '#FFF5F5',
        },
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch('https://api.github.com/repos/goutham2018-iitm/Peche-Skincare/commits')
      .then((res) => res.json())
      .then((data) => {
        const lastCommit = data?.[0]?.commit?.author?.date;
        if (lastCommit) {
          const date = new Date(lastCommit);
          setLastUpdated(
            date.toLocaleString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          );
        } else {
          setLastUpdated(new Date().toLocaleString());
        }
      })
      .catch(() => {
        setLastUpdated(new Date().toLocaleString());
      });
  }, []);

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/official.peche/?hl=en',
      label: 'Instagram',
      color: 'hover:text-pink-500',
    },
    {
      icon: Mail,
      href: 'mailto:peche.purpose@gmail.com',
      label: 'Email',
      color: 'hover:text-blue-500',
    },
    {
      icon: TikTokIcon,
      href: 'https://www.tiktok.com/@official.peche',
      label: 'TikTok',
      color: 'hover:text-black',
    },
  ];

  return (
    <>
      {/* Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          style: {
            maxWidth: '500px',
          },
        }}
      />
      
      <footer className="bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground relative border-t border-border/20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Brand Section */}
              <div className="text-center lg:text-left space-y-6">
                <div className="space-y-4">
                  <div className="w-24 h-12 sm:w-28 sm:h-10 md:w-38 md:h-12 rounded-xl overflow-hidden shadow-glow transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                    <img 
                      src="https://res.cloudinary.com/dwit7nxav/image/upload/v1758915308/Gemini_Generated_Image_abgdngabgdngabgd_u0rzuu.png" 
                      alt="Pêche Logo"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <p className="text-lg text-secondary-foreground/80 leading-relaxed max-w-md mx-auto lg:mx-0">
                    Empowering melanin-rich skin with science-backed skincare solutions for your natural glow.
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex justify-center lg:justify-start items-center gap-6">
                  <span className="text-sm font-medium text-secondary-foreground/70">Connect with us:</span>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color} group`}
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 lg:p-8 border border-primary/20 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <div className="p-2 bg-primary/20 rounded-full">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-secondary-foreground">Stay Glowing</h4>
                  </div>
                  
                  <p className="text-secondary-foreground/70 leading-relaxed text-center lg:text-left">
                    Get exclusive skincare tips and early access to new products delivered to your inbox.
                  </p>
                  
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-secondary-foreground/50"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70"
                    >
                      {loading ? "Subscribing..." : "Subscribe Now"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border/20 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-secondary-foreground/60">
                <p>© 2025 Pêche. All rights reserved.</p>
                <div className="hidden sm:block w-1 h-1 bg-secondary-foreground/30 rounded-full"></div>
                <p>Made with care for radiant skin</p>
              </div>
              
              <div className="flex items-center justify-center sm:justify-end gap-4 text-sm text-secondary-foreground/50">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <div className="w-1 h-1 bg-secondary-foreground/30 rounded-full"></div>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                {lastUpdated && (
                  <>
                    <div className="w-1 h-1 bg-secondary-foreground/30 rounded-full hidden sm:block"></div>
                    <div className="text-xs text-secondary-foreground/50 ml-2 sm:ml-0">
                      <span className="hidden sm:inline">Last updated: </span>
                      <span className="sm:hidden">Updated: </span>
                      {lastUpdated}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;