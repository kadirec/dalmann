import { lazy, Suspense, useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import collections from "../data/collections.json";
import Reveal from "../components/Reveal";

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center text-cream/70 hover:text-cream text-eyebrow tracking-widest transition-colors px-3"
      >
        ✕ KAPAT
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 md:left-8 text-cream/50 hover:text-cream text-3xl transition-colors p-4"
      >
        ←
      </button>

      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl max-h-[85vh] px-4 sm:px-10 md:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current]}
          alt=""
          className="max-h-[85vh] max-w-full object-contain"
        />
        <p className="mt-4 text-center text-eyebrow text-cream/40">
          {current + 1} / {images.length}
        </p>
      </motion.div>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 md:right-8 text-cream/50 hover:text-cream text-3xl transition-colors p-4"
      >
        →
      </button>
    </motion.div>
  );
}

const FBXViewer = lazy(() => import("../components/FBXViewer"));
const FBXGroupViewer = lazy(() => import("../components/FBXGroupViewer"));

function ViewerLoading({ height }) {
  return (
    <div style={{ height }} className="w-full flex items-center justify-center bg-ink/60">
      <div className="flex flex-col items-center">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border border-gold/20" />
          <div className="absolute inset-0 rounded-full border-t border-gold animate-spin" />
        </div>
        <p className="mt-4 text-eyebrow text-gold">3B modül yükleniyor</p>
      </div>
    </div>
  );
}

export default function Collections() {
  const location = useLocation();
  const refs = useRef({});

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = refs.current[id];
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
      }
    }
  }, [location.hash]);

  return (
    <>
      {/* HEADER */}
      <section className="pt-28 md:pt-40 pb-16 md:pb-24 bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/hero-dalmann.png" alt="" className="w-full h-full object-cover object-center opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
        </div>
        <div className="container-luxury relative">
          <Reveal delay={0.1}>
            <h1 className="text-display text-balance max-w-5xl text-cream">
              Bir mirasın <span className="serif-italic text-gold">şekillenişi.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-body-lg text-cream/75">
              Dalmann Jewellery dünyasında her koleksiyon, bir ilhamın olgunlaşması, bir fikrin biçim kazanması ve güçlü bir anlatının mücevhere dönüşmesiyle hayat bulur.
            </p>
          </Reveal>
        </div>
      </section>

      {/* COLLECTIONS LIST */}
      <section className="bg-cream">
        {/* Şimdilik sadece featured koleksiyon gösteriliyor */}
        {collections.filter((c) => c.featured).map((c, i) => (
          <CollectionBlock
            key={c.id}
            collection={c}
            index={i}
            refCb={(el) => (refs.current[c.id] = el)}
          />
        ))}
        {/*
        {collections.map((c, i) => (
          <CollectionBlock
            key={c.id}
            collection={c}
            index={i}
            refCb={(el) => (refs.current[c.id] = el)}
          />
        ))}
        */}
      </section>
    </>
  );
}

function CollectionBlock({ collection: c, index: i, refCb }) {
  const isFeatured = c.featured;
  const flip = i % 2 === 1;
  const [view, setView] = useState("full");
  const [lightbox, setLightbox] = useState(null);

  const allImages = [c.cover, ...(c.gallery || [])];
  const THUMB_LIMIT = 3;
  const extraCount = (c.gallery?.length || 0) - THUMB_LIMIT;

  return (
    <article
      id={c.id}
      ref={refCb}
      className={`section-padding relative ${isFeatured ? "bg-ink-gradient text-cream" : i % 2 === 1 ? "bg-cream-deep" : "bg-cream"}`}
    >
      {isFeatured && <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />}
      {isFeatured && (
        <div aria-hidden className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gold/10 blur-[140px] pointer-events-none" />
      )}

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={allImages} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      <div className="container-luxury relative">

        {/* TITLE — tam genişlik, ortalı */}
        <div className="text-center mb-12">
          <Reveal delay={0.05}>
            <h2 className={`text-heading text-balance ${isFeatured ? "text-cream" : "text-ink"}`}>
              {c.name}
            </h2>
          </Reveal>
          {c.nameTr && (
            <Reveal delay={0.1}>
              <p className={`mt-2 font-display italic text-xl ${isFeatured ? "text-gold-soft" : "text-ash"}`}>
                {c.nameTr}
              </p>
            </Reveal>
          )}
        </div>

        {/* GÖRSEL + METİN */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>

          {/* Sol: Kapak + thumbnails */}
          <div>
            <Reveal y={60} duration={1.2}>
              <div
                className="image-frame aspect-[5/4] bg-bone cursor-zoom-in relative"
                onClick={() => setLightbox(0)}
              >
                <img src={c.cover} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
                {isFeatured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -6 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-3 left-3 bg-gold-gradient text-[#111] px-3 py-1.5 flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Dönen mücevher ikonu */}
                    <motion.svg
                      animate={{ rotate: [0, 8, -8, 4, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                      width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
                    >
                      <path d="M6.5 2h11l4 6-9.5 14L2.5 8l4-6zm1 1L4.2 7.5h4.3L11 3H7.5zm9 0H13l1.5 4.5h4.3L16.5 3zM3.5 8.5l8 11.7 8-11.7H3.5zM9.7 8.5h4.6L12 4.1 9.7 8.5z"/>
                    </motion.svg>
                    <motion.span
                      className="text-eyebrow font-bold"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {c.status}
                    </motion.span>
                  </motion.div>
                )}
              </div>
            </Reveal>
            {c.gallery?.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {c.gallery.slice(0, THUMB_LIMIT).map((g, gi) => {
                  const isLast = gi === THUMB_LIMIT - 1 && extraCount > 0;
                  return (
                    <motion.div
                      key={g}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 + gi * 0.08 }}
                      className="image-frame aspect-square bg-bone relative cursor-zoom-in overflow-hidden"
                      onClick={() => setLightbox(gi + 1)}
                    >
                      <img src={g} alt="" className="w-full h-full object-cover" loading="lazy" />
                      {isLast && (
                        <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
                          <span className="font-display text-2xl text-cream">+{extraCount}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sağ: Metin */}
          <div>
            <div>
              <Reveal delay={0.2}>
                <p className={`font-display italic text-xl ${isFeatured ? "text-gold" : "text-gold-deep"}`}>
                  {c.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className={`mt-8 text-body ${isFeatured ? "text-cream/80" : "text-ink/75"}`}>
                  {c.story}
                </p>
              </Reveal>
              {c.storyLong && (
                <Reveal delay={0.35}>
                  <p className={`mt-4 text-body ${isFeatured ? "text-cream/70" : "text-ink/65"}`}>
                    {c.storyLong}
                  </p>
                </Reveal>
              )}
              <Reveal delay={0.4}>
                <blockquote className={`mt-8 border-l-2 pl-5 italic font-display text-xl ${isFeatured ? "border-gold text-gold" : "border-gold-deep/60 text-ink"}`}>
                  "{c.designerNote || c.concept}"
                  <footer className={`mt-3 not-italic text-eyebrow ${isFeatured ? "text-cream/50" : "text-ash"}`}>— Tasarımcı Notu</footer>
                </blockquote>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.45}>
                <div className={`mt-8 pt-8 border-t grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 ${isFeatured ? "border-cream/15" : "border-ink/10"}`}>
                  <div>
                    <p className={`text-eyebrow ${isFeatured ? "text-gold" : "text-gold-deep"}`}>Malzemeler</p>
                    <ul className={`mt-3 space-y-1 text-body-sm ${isFeatured ? "text-cream/75" : "text-ink/75"}`}>
                      {c.materials.map((m) => <li key={m}>{m}</li>)}
                    </ul>
                  </div>
                  {c.awards?.length > 0 && (
                    <div>
                      <p className={`text-eyebrow ${isFeatured ? "text-gold" : "text-gold-deep"}`}>Ödüller</p>
                      <ul className={`mt-3 space-y-1 text-body-sm ${isFeatured ? "text-cream/75" : "text-ink/75"}`}>
                        {c.awards.map((a) => <li key={a}>· {a}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="mt-10 flex flex-wrap gap-4">
                  {isFeatured && (
                    <Link to="/aleyna-nur-ozdemir" className="btn-ghost text-cream hover:text-gold">Tasarımcı hakkında →</Link>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* 3D VIEWER — featured only */}
        {isFeatured && c.model && (
          <div className="mt-16 md:mt-24 lg:mt-32">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-6 md:mb-10">
              <div>
                <p className="text-eyebrow text-gold">Üç Boyutlu İnceleme</p>
                <h3 className="mt-3 md:mt-4 text-subheading text-cream text-balance max-w-2xl">
                  Eseri her açıdan, her <span className="serif-italic text-gold">parçasıyla</span> inceleyin.
                </h3>
              </div>
              <div className="flex gap-2 self-start md:self-auto">
                <button
                  onClick={() => setView("full")}
                  className={`text-eyebrow px-4 py-3 min-h-[44px] rounded-full border transition-all duration-500 ${
                    view === "full"
                      ? "bg-gold text-ink border-gold"
                      : "border-cream/30 text-cream hover:border-gold hover:text-gold"
                  }`}
                >
                  Tam Eser
                </button>
                <button
                  onClick={() => setView("parts")}
                  className={`text-eyebrow px-4 py-3 min-h-[44px] rounded-full border transition-all duration-500 ${
                    view === "parts"
                      ? "bg-gold text-ink border-gold"
                      : "border-cream/30 text-cream hover:border-gold hover:text-gold"
                  }`}
                >
                  Parçalar
                </button>
              </div>
            </div>

            {view === "full" ? (
              <div className="relative border border-cream/10">
                <Suspense fallback={<ViewerLoading height={620} />}>
                  {c.model.parts ? (
                    <FBXGroupViewer
                      key="full"
                      parts={c.model.parts}
                      height={620}
                      autoRotate
                      showControls={false}
                      hint="Sürükleyerek döndürün · iki parmakla yakınlaştırın"
                    />
                  ) : (
                    <FBXViewer
                      url={c.model.full}
                      height={620}
                      autoRotate
                      tint="#e8c247"
                      hint="Sürükleyerek döndürün · iki parmakla yakınlaştırın"
                    />
                  )}
                </Suspense>
              </div>
            ) : (
              <div className="relative border border-cream/10 p-3 md:p-6 bg-ink/40">
                <Suspense fallback={<ViewerLoading height={580} />}>
                  <FBXGroupViewer
                    key="parts"
                    parts={c.model.parts}
                    height={580}
                    autoRotate
                  />
                </Suspense>
              </div>
            )}

            {/* <p className="mt-4 md:mt-6 text-body-sm text-cream/60 max-w-2xl">
              Modeller atölyenin 3B arşivinden gerçek FBX dosyaları olarak yüklenir. Her parça, eserin yapımında kullanılan malzemeyi temsil eden tonlarla görüntülenir.
            </p> */}
          </div>
        )}
      </div>
    </article>
  );
}
