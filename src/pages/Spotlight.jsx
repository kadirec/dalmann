import Reveal from "../components/Reveal";

const PRESS_FEATURE = {
  headline: "Mücevher Dünyasında Zarif Bir Yükseliş",
  body:
    "Dalmann Jewellery çatısı altında çok özel tasarımlara imza atan kreatif direktör Aleyna Nur Özdemir, ödüllü yüzük tasarımıyla dikkatleri üzerine çekiyor. Duvar Reklamları ve Billboardların yaratıcısı Bülent Sarıgül'ün Büyük Kulüp içinde yer alan ekranlarda hazırlattığı reklam tanıtımı ile İstanbul'da sürpriz bir görünürlük kazanan projesi Gündüz Kaptanoğlu ve Sami Ezber'in büyük beğenisini topladı… Usta tasarımcının yeni projeleri ise yolda.",
  attribution: "Babmagazinetr & Atılay Kandemir",
  image: "/press-in-the-news.jpg",
  imageAlt:
    "Aleyna Nur Özdemir ve ekibi; basında yer alan Dalmann Jewellery tanıtımı için çekilmiş grup fotoğrafı.",
};

export default function Spotlight() {
  return (
    <>
      <section className="pt-28 md:pt-40 pb-16 md:pb-20 bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/hero-dalmann.png" alt="" className="w-full h-full object-cover object-center opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
        </div>
        <div className="container-luxury relative">
          <Reveal delay={0.1}>
            <h1 className="text-display text-balance max-w-5xl text-cream">
              Dalmann hakkında <span className="serif-italic text-gold">söylenenler,</span> yazılanlar.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Basın özeti — arka plan + görsel + metin */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src="/hero-dalmann.png"
            alt=""
            className="h-full w-full object-cover object-center opacity-[0.22] blur-[1px] scale-[1.03] [filter:sepia(0.25)_saturate(0.85)]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/94 to-[#15100c]" />
          <div className="absolute inset-0 bg-noise opacity-[0.18]" />
        </div>

        <div className="container-luxury relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            <Reveal className="lg:col-span-5" y={36} duration={0.95}>
              <div className="image-frame mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-bone shadow-[0_28px_80px_-24px_rgba(0,0,0,0.55)] lg:mx-0 lg:max-w-none">
                <img
                  src={PRESS_FEATURE.image}
                  alt={PRESS_FEATURE.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={0.1} y={36} duration={0.95}>
              <p className="font-display text-5xl leading-none text-cream/20 md:text-6xl" aria-hidden>
                &ldquo;
              </p>
              <h2 className="mt-1 text-balance font-display text-2xl tracking-tight text-cream md:text-3xl lg:text-[2rem] lg:leading-snug">
                {PRESS_FEATURE.headline}
              </h2>
              <p className="mt-6 max-w-2xl text-body-lg leading-relaxed text-cream/85">
                {PRESS_FEATURE.body}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-12 shrink-0 bg-gold/45" />
                <p className="text-eyebrow tracking-[0.12em] text-cream/55">{PRESS_FEATURE.attribution}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
