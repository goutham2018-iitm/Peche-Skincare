import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import BackToTop from "./components/BacktoToTop";
import AdminDashboard from "./components/AdminDashboard";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import CancellationRefunds from "./components/CancellationRefunds";
import ShippingPolicy from "./components/ShippingPolicy";
import { CartPage } from "./components/RazorpayButton";
import { pageview, GA_MEASUREMENT_ID } from "./lib/gtag";

const queryClient = new QueryClient();
const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      pageview(location.pathname + location.search);
    }
  }, [location]);
  return null;
};

const Layout = () => (
  <>
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
    <BackToTop />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Google Analytics Script */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            ></script>
            <script
              id="ga-init"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}

        <RouteTracker />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route
              path="/cancellation-refunds"
              element={<CancellationRefunds />}
            />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Vercel Analytics + Speed */}
      <VercelAnalytics />
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
