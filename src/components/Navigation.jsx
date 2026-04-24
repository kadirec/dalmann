import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MAIN_NAV_LINKS } from "../data/navLinks";

const LINKS = MAIN_NAV_LINKS;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,box-shadow,padding] duration-700 ${
          scrolled || menuOpen
            ? "bg-cream/90 backdrop-blur-xl shadow-[0_1px_0_rgba(26,26,26,0.06)] py-3"
            : "bg-[#323232]/60 backdrop-blur-md border-b border-white/10 py-5"
        }`}
      >
        <div className="container-luxury flex items-center justify-between">
          <Link
            to="/"
            aria-label="Dalmann Jewellery anasayfa"
          >
            <img
              src="/logo.svg"
              alt="Dalmann Jewellery"
              className={`h-8 w-auto object-contain transition-[filter] duration-500 ${!scrolled && !menuOpen ? "brightness-0 invert" : ""}`}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} ${!scrolled && !menuOpen ? "!text-white hover:!text-white/70" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((m) => !m)}
            className="lg:hidden flex flex-col justify-center items-center h-11 w-11 gap-[6px]"
          >
            <span className={`block h-px w-6 transition-all duration-500 ${menuOpen ? "translate-y-[3.5px] rotate-45 bg-ink" : scrolled ? "bg-ink" : "bg-white"}`} />
            <span className={`block h-px w-6 transition-all duration-500 ${menuOpen ? "-translate-y-[3.5px] -rotate-45 bg-ink" : scrolled ? "bg-ink" : "bg-white"}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden bg-cream"
          >
            <div className="h-full flex flex-col pt-28 pb-12 px-6">
              <nav className="flex-1 flex flex-col justify-center gap-4">
                {LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) => `block font-display text-2xl sm:text-4xl tracking-tight py-2 ${isActive ? "text-gold-deep italic" : "text-ink"}`}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8 border-t border-ink/10 pt-6 flex flex-col gap-3 text-eyebrow">
                <a href="mailto:info@dalmannjewellery.com" className="hover:text-gold-deep transition-colors duration-300">info@dalmannjewellery.com</a>
                <span>Çemberlitaş · Fatih · İstanbul</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
