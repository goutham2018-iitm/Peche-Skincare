// App.jsx - Updated with global BackToTop component
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import BackToTop from "./components/BacktoToTop"; 

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <BackToTop /> 
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductPage />} />
            <Route path="/product" element={<ProductPage />} />
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;




// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import ProductDetail from "./pages/ProductDetail";
// import ProductPage from "./pages/ProductPage";
// import NotFound from "./pages/NotFound";
// import { useScrollAnimation } from "./hooks/useScrollAnimation";

// const queryClient = new QueryClient();

// const AppContent = () => {
//   useScrollAnimation();
//   return <Index />;
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//   <Route path="/product" element={<AppContent />} />
//   <Route path="/product/:id" element={<ProductDetail />} />
//   <Route path="*" element={<NotFound />} />
// </Routes>

//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
