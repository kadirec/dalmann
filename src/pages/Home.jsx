import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import collections from "../data/collections.json";
import products from "../data/products.json";
import SectionLabel from "../components/SectionLabel";
import Reveal from "../components/Reveal";

const featuredCollection = collections.find((c) => c.featured) ?? collections[0];
const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

const MARQUEE = [
  "Akademik Disiplin ile Zanaatın Buluşması",
  "Formun, Işığın ve Anlamın Kusursuz Dengesi",
  "Gerçek Lüks, Hayatı Var Eden Değerlere Duyulan Bilinçtir",
  "Her Eser Bir Anlatıdır",
  "İstanbul Atölyesinden Dünyaya",
  "Zamansız Güzellik, Bilinçli İşçilik",
  "Taşınan Değil, Yaşanan Mücevher",
  "Milimetrik Hassasiyet, İnsani Derinlik",
];

const EASE_SILK = [0.16, 1, 0.3, 1];

function CausticRays({ opacity = 0.35, scaleX = 1 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMin slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "soft-light", opacity, transform: `scaleX(${scaleX})` }}
    >
      <defs>
        <radialGradient id="ray-g" cx="50%" cy="0%" r="55%" fx="50%" fy="0%">
          <stop offset="0%" stopColor="#fff8d8" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="ray-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <g filter="url(#ray-blur)">
        <ellipse cx="210"  cy="-40" rx="120" ry="520" fill="url(#ray-g)" transform="rotate(6 210 0)" />
        <ellipse cx="480"  cy="-60" rx="90"  ry="620" fill="url(#ray-g)" transform="rotate(-4 480 0)" />
        <ellipse cx="760"  cy="-40" rx="140" ry="560" fill="url(#ray-g)" transform="rotate(3 760 0)" />
        <ellipse cx="1020" cy="-60" rx="100" ry="620" fill="url(#ray-g)" transform="rotate(-6 1020 0)" />
      </g>
    </svg>
  );
}

function Bubbles({ count = 10 }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 11 + 5) % 96}%`,
        size: 5 + ((i * 5) % 14),
        duration: 18 + ((i * 7) % 14),
        delay: -((i * 2.4) % 20),
        opacity: 0.45 + ((i * 13) % 30) / 100,
      })),
    [count]
  );
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="hero-loop absolute bottom-[-10%] rounded-full bg-cream blur-[1.5px]"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animation: `bubble-rise ${b.duration}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Miras blokları — yumuşak lacivert–antrasit gradyen, tek minimal hat (karışık vektörler kaldırıldı) */
function HeritageJewelleryBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#131822] via-[#0e1018] to-[#080a0f]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#12151f]/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_50%_at_50%_-15%,rgba(198,172,128,0.09),transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_90%_95%,rgba(95,108,140,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_5%_60%,rgba(165,145,118,0.05),transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />

      <svg
        aria-hidden
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none text-[#a89b82] opacity-[0.045]"
      >
        <defs>
          <linearGradient id="herit-soft-arc" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="none"
          stroke="url(#herit-soft-arc)"
          strokeWidth="0.85"
          strokeLinecap="round"
          d="M-20 560 Q600 460 1220 560"
        />
      </svg>
    </>
  );
}

function IconTrophyAward({ className = "h-14 w-14" }) {
  return (
    <svg viewBox="0 0 56 56" className={className} fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 20h20v6c0 7-4.5 12-10 12s-10-5-10-12v-6z" />
      <path d="M16 20h-2v4c0 3 2 5 4 5M40 20h2v4c0 3-2 5-4 5" />
      <path d="M22 38v6h12v-6M24 44h8v6" />
      <path d="M28 26l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z" />
    </svg>
  );
}

function IconDesignConsult({ className = "h-14 w-14" }) {
  return (
    <svg viewBox="0 0 56 56" className={className} fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 24h26v18H12V24z" />
      <path d="M12 24L28 14l14 10" />
      <path d="M38 14l8-2 2 8-6 4" />
      <path d="M42 10l6 6" />
      <ellipse cx="25" cy="33" rx="5.5" ry="3.8" transform="rotate(-8 25 33)" />
      <path d="M16 28h10M16 32h6" opacity="0.5" />
    </svg>
  );
}

function IconMasterCraft({ className = "h-14 w-14" }) {
  return (
    <svg viewBox="0 0 56 56" className={className} fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <ellipse cx="28" cy="40" rx="9" ry="4.5" />
      <path d="M19 18 L26 34" />
      <path d="M37 18 L30 34" />
      <circle cx="28" cy="31" r="2.8" />
      <path d="M16 36c4 2 8 3 12 3s8-1 12-3" opacity="0.45" />
    </svg>
  );
}

const HERITAGE_TRUST_BLOCKS = [
  {
    key: "award",
    Icon: IconTrophyAward,
    text: "2026 Uluslararası Mücevher Tasarım Yarışması Ödülü",
  },
  {
    key: "consult",
    Icon: IconDesignConsult,
    text: "Kişiye Özel Tasarım Danışmanlığı",
  },
  {
    key: "craft",
    Icon: IconMasterCraft,
    text: "Usta Zanaatkarlar Tarafından Hayata Geçirilen Eserler",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink text-cream">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          {/* Underwater camera drift — slow pan + tilt + breathe */}
          <motion.div
            className="absolute inset-0"
            animate={reduceMotion ? undefined : {
              rotate: [-1.2, 1.2, -0.6, 0.8, -1.2],
              x: ["-1.8%", "1.8%", "-1%", "1.4%", "-1.8%"],
              y: ["-0.8%", "0.6%", "-1.2%", "0.4%", "-0.8%"],
            }}
            transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Base image with deep breath */}
            <motion.div
              className="absolute inset-0"
              animate={reduceMotion ? undefined : { scale: [1, 1.06, 1.02, 1.07, 1] }}
              transition={reduceMotion ? undefined : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/hero-slide.png"
                alt=""
                loading="eager"
                fetchpriority="high"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Caustic light rays — layer A */}
            <motion.div
              className="absolute inset-0"
              animate={reduceMotion ? undefined : { x: ["-4%", "4%", "-4%"], opacity: [0.25, 0.55, 0.25] }}
              transition={reduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: EASE_SILK }}
            >
              <CausticRays opacity={0.45} />
            </motion.div>

            {/* Caustic light rays — layer B (offset phase, mirrored) */}
            <motion.div
              className="absolute inset-0"
              animate={reduceMotion ? undefined : { x: ["3%", "-3%", "3%"], opacity: [0.15, 0.4, 0.15] }}
              transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: EASE_SILK, delay: -2 }}
            >
              <CausticRays opacity={0.3} scaleX={-1} />
            </motion.div>
          </motion.div>

          {/* Rising bubbles */}
          {!reduceMotion && <Bubbles count={8} />}

          {/* Existing ink gradient + noise for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/90" />
          <div className="absolute inset-0 bg-noise opacity-50" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative w-full flex flex-col items-center justify-center min-h-[100svh]">
          <motion.img
            src="/hero-logo.png"
            alt="Dalmann Jewellery"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-auto max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[860px] px-6"
          />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-20 lg:mt-28 flex flex-col items-center gap-5 px-6 text-center"
          >
            <p className="text-body-lg text-cream/80 max-w-xl">
              Dalmann, mücevherleri; formun, ışığın ve anlamın kusursuz bir dengede buluştuğu zamansız sanat eserleri olarak tanımlar.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Link to="/collections" className="btn-gold"><span>Koleksiyonları Keşfet</span></Link>
              <Link to="/aleyna-nur-ozdemir" className="btn-ghost text-cream hover:text-gold">Tasarımcıyla tanışın →</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute bottom-10 sm:bottom-16 flex items-center gap-3 bg-[#323232]/60 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 text-eyebrow text-cream/80"
          >
            <span>Kaydır</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              ↓
            </motion.span>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="relative overflow-hidden bg-cream border-y border-ink/10 marquee-gradient">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex gap-10 md:gap-16 py-6 md:py-8 whitespace-nowrap"
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="font-display italic text-2xl md:text-4xl lg:text-5xl text-ink/30 flex items-center gap-10 md:gap-16">
              {w}
              <span className="inline-block h-2 w-2 rounded-full bg-gold/60" />
            </span>
          ))}
        </motion.div>
      </section>

      {/* Miras — marquee altı; siyah zemin, çizgisel mücevher tasarımı + metin */}
      <section className="relative overflow-hidden bg-[#080a0f] text-cream py-14 md:py-20 border-t border-white/[0.08]">
        <HeritageJewelleryBackdrop />
        <div className="container-luxury relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-display text-[clamp(1.65rem,4.5vw,2.75rem)] leading-[1.1] text-balance text-gold tracking-tight">
              Bir Mirasın Şekillenişi
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 md:mt-6 max-w-2xl mx-auto text-body-lg text-cream/75 leading-relaxed">
              Dalmann Jewellery dünyasında her koleksiyon, bir ilhamın olgunlaşması, bir fikrin biçim kazanması ve güçlü bir anlatının mücevhere dönüşmesiyle hayat bulur.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 md:mt-6 font-display italic text-lg md:text-xl text-cream/60 max-w-xl mx-auto">
              Koleksiyonlarımız, çok yakında sizlerle buluşacak.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="section-padding bg-cream-gradient relative overflow-hidden">
        {/* Dekoratif arka plan çizgisi */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

        <div className="container-luxury grid lg:grid-cols-12 gap-12 items-center">

          {/* Sol — görsel kompozisyon */}
          <div className="lg:col-span-6">

            {/* MOBİL: tek görsel + 2. görsel yan yana */}
            <div className="lg:hidden">
              <Reveal y={40} duration={1.1}>
                <div className="image-frame aspect-[4/5] bg-bone shadow-luxe">
                  <img
                    src={featuredCollection.cover}
                    alt={featuredCollection.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Reveal delay={0.1}>
                  <div className="image-frame aspect-square bg-bone shadow-soft">
                    <img src={featuredCollection.gallery[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="image-frame aspect-square bg-bone shadow-soft relative">
                    <img src={featuredCollection.gallery[1]} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-gold-gradient flex items-center justify-center text-ink font-display shadow-luxe">
                      <div className="text-center leading-tight">
                        <p className="text-[0.4rem] tracking-wide-luxe uppercase">Ödül</p>
                        <p className="text-xs italic">24</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* MASAÜSTÜ: çok katmanlı animasyonlu kompozisyon */}
            <div className="hidden lg:block relative min-h-[620px]">

              {/* Ana görsel */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                animate={{ y: [0, -8, 0] }}
                style={{ animationDuration: "7s" }}
                className="absolute left-0 top-0 w-[65%] image-frame shadow-luxe"
              >
                <img
                  src={featuredCollection.cover}
                  alt={featuredCollection.name}
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Sağ üst — 2. görsel */}
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                animate={{ y: [0, 10, 0] }}
                style={{ animationDuration: "9s" }}
                className="absolute right-0 top-[5%] w-[42%] image-frame shadow-luxe"
              >
                <img
                  src={featuredCollection.gallery[0]}
                  alt=""
                  className="w-full aspect-[4/5] object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Sol alt — 3. görsel */}
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                animate={{ y: [0, -12, 0] }}
                style={{ animationDuration: "11s" }}
                className="absolute left-[12%] bottom-0 w-[38%] image-frame shadow-luxe"
              >
                <img
                  src={featuredCollection.gallery[1]}
                  alt=""
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Sağ alt — 4. görsel küçük */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                animate={{ y: [0, 8, 0] }}
                style={{ animationDuration: "8s" }}
                className="absolute right-[2%] bottom-[8%] w-[28%] image-frame shadow-luxe"
              >
                <img
                  src={featuredCollection.gallery[2]}
                  alt=""
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Ödül rozeti */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                animate={{ rotate: [-6, -4, -6] }}
                style={{ animationDuration: "6s" }}
                className="absolute left-[55%] top-[40%] z-10 h-20 w-20 rounded-full bg-gold-gradient flex items-center justify-center text-ink font-display shadow-luxe"
              >
                <div className="text-center leading-tight">
                  <p className="text-[0.5rem] tracking-wide-luxe uppercase">Ödüllü</p>
                  <p className="mt-0.5 text-lg italic">2026</p>
                </div>
              </motion.div>

              {/* Dekoratif altın çizgi */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top" }}
                className="absolute left-[64%] top-[12%] w-px h-[30%] bg-gradient-to-b from-gold/60 to-transparent"
              />
            </div>
          </div>

          {/* Sağ — metin */}
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionLabel index="02" label="Öne Çıkan Koleksiyon" />
            <Reveal delay={0.1}>
              <h2 className="mt-8 text-heading text-balance">
                {featuredCollection.name}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 font-display italic text-xl text-gold-deep">
                {featuredCollection.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 text-body text-ink/75">
                {featuredCollection.story}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-2">
                {featuredCollection.materials.map((m) => (
                  <span key={m} className="text-eyebrow border border-ink/20 rounded-full px-4 py-2">{m}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to={`/collections#${featuredCollection.id}`} className="btn-primary"><span>Koleksiyonu Keşfet</span></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Takipte kal — öne çıkan koleksiyon altı (miras bloğu ile aynı çizgisel arka plan) */}
      <section className="relative overflow-hidden bg-[#080a0f] text-cream py-14 md:py-20 border-t border-ink/15">
        <HeritageJewelleryBackdrop />
        <div className="container-luxury relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-10 md:space-y-12">
          <Reveal>
            <p className="font-display text-xl md:text-2xl lg:text-[1.65rem] leading-snug text-cream/90 text-balance max-w-2xl mx-auto">
              Zamanın ruhunu hapseden, kişisel hikâyenize eşlik edecek o eşsiz parçayı keşfetmek için takipte kalın.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-body-sm md:text-body text-cream/65 leading-relaxed max-w-xl mx-auto">
              Bu yolculuğun bir parçası olun. Koleksiyonlarımız yayınlandığında haberdar olmak için topluluğumuza katılın.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Link
              to="/studio"
              className="inline-flex items-center justify-center min-h-[48px] px-8 md:px-10 border border-cream/85 text-eyebrow tracking-[0.18em] text-cream uppercase hover:bg-cream/10 hover:border-cream transition-colors duration-500"
            >
              Haber ver / Kayıt ol
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Üç güven sütunu — beyaz kartlar, ikon ve metin antrasit */}
      <section className="relative overflow-hidden border-t border-ink/10 bg-white py-12 md:py-16">
        <div className="container-luxury relative z-10 max-w-6xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
              {HERITAGE_TRUST_BLOCKS.map(({ key, Icon, text }) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center gap-5 rounded-sm border border-stone-400/45 bg-white px-5 py-8 md:py-10 text-center min-h-[200px] md:min-h-[220px] shadow-sm"
                >
                  <Icon className="h-14 w-14 shrink-0 text-[#3d424c]" />
                  <p className="font-sans text-sm md:text-[0.9375rem] leading-snug text-[#454a54] text-balance max-w-[14rem] mx-auto">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PIECES — geçici olarak gizlendi */}
    </>
  );
}
