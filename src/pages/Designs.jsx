import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import products from "../data/products.json";
import collections from "../data/collections.json";
import SectionLabel from "../components/SectionLabel";
import Reveal from "../components/Reveal";
import NoIndex from "../components/NoIndex";

const CATEGORIES = ["Tümü", "Yüzük", "Küpe", "Kolye", "Bilezik"];

export default function Designs() {
  const [category, setCategory] = useState("Tümü");
  const [collection, setCollection] = useState("all");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catOk = category === "Tümü" || p.category === category;
      const colOk = collection === "all" || p.collection === collection;
      return catOk && colOk;
    });
  }, [category, collection]);

  const collectionName = (id) => collections.find((c) => c.id === id)?.name ?? id;

  return (
    <>
      <NoIndex />
      <section className="pt-28 md:pt-40 pb-16 md:pb-20 bg-cream-gradient">
        <div className="container-luxury">
          <SectionLabel label="Tasarımlar · Sicil" />
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-display text-balance max-w-5xl">
              Atölyedeki her eser, <span className="serif-italic text-gold-deep">tek bir sicilde.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-body-lg text-ink/70">
              Şu an atölyede üretilen tüm eserlerin tek bir kataloğu. Form ya da koleksiyona göre filtreleyin. Her parça özel varyasyonlarla sipariş edilebilir — bizimle konuşun.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 bg-cream">
        <div className="container-luxury">
          <div className="sticky top-[68px] md:top-24 z-20 bg-cream/90 backdrop-blur-lg -mx-6 md:-mx-12 px-6 md:px-12 py-4 md:py-6 border-y border-ink/10 mb-10 md:mb-16">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-eyebrow mr-2">Form</span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-eyebrow px-3 md:px-4 py-1.5 md:py-2 rounded-full border transition-all duration-500 ${
                      category === cat
                        ? "bg-ink text-cream border-ink"
                        : "border-ink/20 text-ink hover:border-gold hover:text-gold-deep"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 md:gap-3 md:ml-auto">
                <span className="text-eyebrow hidden sm:inline">Koleksiyon</span>
                <select
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                  className="font-sans text-sm bg-transparent border border-ink/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full focus:border-gold focus:outline-none"
                >
                  <option value="all">Tüm koleksiyonlar</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="text-eyebrow ml-auto md:ml-0">
                {filtered.length} / {products.length} eser
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.button
                  layout
                  key={p.id}
                  onClick={() => setActive(p)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, delay: (i % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group text-left"
                >
                  <div className="image-frame aspect-[4/5] bg-bone relative overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
                    <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <span className="inline-flex items-center gap-2 bg-cream text-ink px-4 py-2 text-eyebrow">
                        Detayı Gör →
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-eyebrow-gold">{p.category}</p>
                      <h3 className="mt-2 font-display text-2xl group-hover:text-gold-deep transition-colors duration-500">{p.name}</h3>
                      <p className="mt-1 text-body-sm text-ink/60">{collectionName(p.collection)}</p>
                    </div>
                    <p className="font-display text-lg text-ink/70 whitespace-nowrap">{p.price}</p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-display italic text-3xl text-gold-deep">Bu filtrelerle eser bulunamadı.</p>
              <p className="mt-4 text-body text-ink/60">Filtreleri gevşetmeyi deneyin.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-md flex items-end md:items-center justify-center p-4 md:p-10"
            onClick={() => setActive(null)}
          >
            <motion.div
              key="panel"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-cream max-w-5xl w-full grid md:grid-cols-2 max-h-[90vh] overflow-auto no-scrollbar"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Kapat"
                className="absolute top-4 right-4 z-10 h-11 w-11 flex items-center justify-center bg-cream/70 backdrop-blur-md rounded-full border border-ink/10 hover:border-gold transition"
              >
                <span className="font-display text-2xl leading-none">×</span>
              </button>
              <div className="aspect-[4/5] md:aspect-auto bg-bone">
                <img src={active.image} alt={active.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-12 flex flex-col">
                <p className="text-eyebrow-gold">{active.category} · {collectionName(active.collection)}</p>
                <h3 className="mt-4 text-heading">{active.name}</h3>
                <p className="mt-4 font-display italic text-xl text-gold-deep">{active.price}</p>
                <p className="mt-6 text-body text-ink/75">{active.description}</p>
                <div className="mt-8 pt-8 border-t border-ink/10">
                  <p className="text-eyebrow">Malzemeler</p>
                  <p className="mt-2 text-body">{active.materials}</p>
                </div>
                <div className="mt-auto pt-10 flex flex-wrap gap-3">
                  <button className="btn-primary"><span>İletişime Geç</span></button>
                  <button className="btn-ghost">Atölye ziyareti →</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
