import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LAUNCH = new Date("2026-09-01T00:00:00");

function useCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, LAUNCH - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

export default function Studio() {
  const { days, hours, mins, secs } = useCountdown();

  return (
    <section className="relative min-h-screen flex items-center bg-ink text-cream overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-noise opacity-40" />
      </div>

      <div aria-hidden className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-gold/10 blur-[160px]" />
      <div aria-hidden className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[140px]" />

      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vmin] w-[120vmin] rounded-full border border-gold/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vmin] w-[80vmin] rounded-full border border-gold/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-luxury relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-eyebrow text-gold"
        >
          Dalmann Atölyesi
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-display max-w-5xl mx-auto text-balance"
        >
          Tasarım stüdyosu ve <span className="serif-italic gold-text">özel atölye,</span> <br className="hidden md:block" />
          yakında açılıyor.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-2xl mx-auto text-body-lg text-cream/80"
        >
          Özel sipariş için ziyaretçilerini randevuyla kabul eden, yavaş ve bilinçli kararlar için hazırlanmış bir atölye. Yakında kapılarını açıyor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex justify-center gap-4 md:gap-8"
        >
          {[
            { v: days, l: "Gün" },
            { v: hours, l: "Saat" },
            { v: mins, l: "Dakika" },
            { v: secs, l: "Saniye" },
          ].map((t, i) => (
            <div key={t.l} className="flex flex-col items-center">
              <div className="relative">
                <div className="h-20 w-20 md:h-28 md:w-28 flex items-center justify-center border border-cream/15 bg-ink/50 backdrop-blur">
                  <span className="font-display text-4xl md:text-6xl gold-text">
                    {String(t.v).padStart(2, "0")}
                  </span>
                </div>
                {i < 3 && (
                  <span className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-gold/60 font-display text-2xl">·</span>
                )}
              </div>
              <span className="mt-4 text-eyebrow text-cream/60">{t.l}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-24 flex items-center justify-center gap-6 text-eyebrow text-cream/40"
        >
          <span className="h-px w-16 bg-cream/20" />
          <span>Nişantaşı · İstanbul</span>
          <span className="h-px w-16 bg-cream/20" />
        </motion.div>
      </div>
    </section>
  );
}
