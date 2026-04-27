import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SeoHead from "./components/SeoHead";

const Home = lazy(() => import("./pages/Home"));
const Dalmann = lazy(() => import("./pages/Dalmann"));
const Collections = lazy(() => import("./pages/Collections"));
const Designer = lazy(() => import("./pages/Designer"));
const Spotlight = lazy(() => import("./pages/Spotlight"));
const Studio = lazy(() => import("./pages/Studio"));

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-ink text-cream/50">
      <div className="h-8 w-8 rounded-full border border-gold/25 border-t-gold animate-spin" aria-hidden />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/dalmann-jewellery" element={<Dalmann />} />
            <Route path="/collections" element={<Collections />} />

            <Route path="/aleyna-nur-ozdemir" element={<Designer />} />
            <Route path="/in-the-press" element={<Spotlight />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SeoHead />
      <ScrollToTop />
      <Navigation />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
