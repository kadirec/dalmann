import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import collections from "../data/collections.json";

const FBXGroupViewer = lazy(() => import("../components/FBXGroupViewer"));

const featured = collections.find((c) => c.featured);

function ViewerLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-ink/60 min-h-[360px]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border border-gold/20" />
          <div className="absolute inset-0 rounded-full border-t border-gold animate-spin" />
        </div>
        <p className="text-eyebrow text-gold">3B model yükleniyor</p>
      </div>
    </div>
  );
}

const SECTIONS = [
  {
    heading: "Mücevherin  ",
    headingItalic: "Sanatla Buluşması",
    body:"Dalmann Jewellery, mücevherleri; formun, ışığın ve anlamın kusursuz bir dengede buluştuğu zamansız sanat eserleri olarak tanımlar. Markanın varlık felsefesi, değerli taşların ve medenlerin doğasındaki cevheri, yüksek bir estetik disiplinle işleyerek yaşayan birer anlatıya dönüştürmek üzerine kuruludur.",
    image: "/dalmann/1.png",
    flip: false,
  },
  {
    heading: "Akademik Disiplin",
    headingItalic: "Zanaatkâr Ruh",
    body: "Dalmann Jewellery imzası taşıyan her eser, akademik bir tasarım disiplini ile geleneksel kuyumculuk sanatının usta ellerde nadide birleşimidir. Geleneksel mücevher zanaatkarlığının kadim teknikleri, günümüzün ileri düzey modelleme teknolojileriyle birleşerek hata payını ortadan kaldırır. Bu sentez, tasarımlara hem milimetrik bir hassasiyet hem de ancak insan ruhunun katabileceği o eşsiz derinliği kazandırır. Dalmann için kalite, mücevherin sadece görünen yüzünde değil, her bir detayında saklı olan kusursuz işçilikte yatar.",
    image: "/dalmann/2.png",
    flip: true,
  },
  {
    heading: "Geleceğin",
    headingItalic: "Mirası.",
    body: "Dalmann Jewellery mücevheri, sahibinin ruhuyla şekillenen sanat eserleri olarak tanımlar. Her insanın kendine has bir ışığı ve hikayesi olduğu gerçeğinden hareketle; tasarımlarında kişisel kimliği ve duyguları merkeze alır. Kimi zarif ve mesafeli, kimi sıcak ve parlak, kimi güçlü ve unutulmaz… Tasarım süreci çoğu zaman bu görünmeyen karakteri görünür kılma arzusuyla başlar. Bir çiçeğe duyulan bağlılık, eski bir hatıra, özel bir koku, çocukluktan kalan bir iz, güçlü bir yaşam hikâyesi… İlham çoğu zaman en kişisel yerlerden gelir.",
    body2: "Dalmann imzası taşıyan her eser, sahibinin karakterini tamamlayan, onunla bütünleşen ve zamanla anlamı daha da derinleşen birer giyilebilir sanat estetiğiyle hayat bulur.Bu nedenle bazı mücevherler takılmaz; taşınır.",
    image: "/dalmann/3.png",
    flip: false,
  },
  {
    heading: "Mücevher Bir Anlatıdır", 
    body: "Gerçek lüksün, doğaya ve emeğe duyulan derin saygıdan geçtiğine inanan Dalmann Jewellery, tüm süreçlerinde etik değerleri ön planda tutar. Kullanılan materyallerin kaynağından, atölyedeki üretim aşamalarına kadar her adımda 'bilinçli lüks' anlayışını benimser.",
    body2: "Geleceğin miraslarını şekillendirirken, bu mirasın üzerinde yükseleceği dünyaya karşı sorumluluk bilinciyle hareket etmek, markanın vazgeçilmez bir düsturudur. Dalmann Jewellery, sizi mücevherin sadece parıltısını değil, ruhunu da keşfetmeye davet ediyor.",
    image: "/dalmann/4.png",
    flip: true,
  },
  {
    heading: "Etik Değerler ve",
    headingItalic: "Sürdürülebilir Lüks",
    body: "Gerçek lüksün, doğaya ve emeğe duyulan derin saygıdan geçtiğine inanan Dalmann Jewellery, tüm süreçlerinde etik değerleri ön planda tutar. Kullanılan materyallerin kaynağından, atölyedeki üretim aşamalarına kadar her adımda 'bilinçli lüks' anlayışını benimser. Geleceğin miraslarını şekillendirirken, bu mirasın üzerinde yükseleceği dünyaya karşı sorumluluk bilinciyle hareket etmek, markanın vazgeçilmez bir düsturudur.",
    image: "/dalmann/5.png",
    flip: false,
  },
];

export default function Dalmann() {
  return (
    <>
      {/* HERO */}
      <section className="pt-28 md:pt-36 pb-0 bg-ink text-cream relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/hero-dalmann.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
        </div>

        <div className="container-luxury relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <div className="pb-16 md:pb-24">
              <Reveal delay={0.1}>
                <h1 className="text-display text-balance text-cream">
                  Mücevherin{" "}
                  <span className="serif-italic text-gold">Sanatla Buluşması.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-body-lg text-cream/75">
                  Dalmann Jewellery, mücevherleri; formun, ışığın ve anlamın kusursuz
                  bir dengede buluştuğu zamansız sanat eserleri olarak tanımlar.
                  Markanın varlık felsefesi, değerli taşların ve madenlerin doğasındaki
                  cevheri, yüksek bir estetik disiplinle işleyerek yaşayan birer
                  anlatıya dönüştürmek üzerine kuruludur.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/collections" className="btn-gold"><span>Koleksiyonları Keşfet</span></Link>
                  <Link to="/aleyna-nur-ozdemir" className="btn-ghost text-cream hover:text-gold">Tasarımcıyla tanışın →</Link>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="mt-8 text-eyebrow text-gold/70">
                  {featured?.name} · {featured?.year}
                </p>
              </Reveal>
            </div>

            {/* Right — FBX viewer */}
            <div className="relative w-full border border-cream/10">
              <Suspense fallback={<ViewerLoading />}>
                <FBXGroupViewer
                  parts={featured.model.parts}
                  height={620}
                  autoRotate
                  showControls={false}
                  hint="Sürükleyerek döndürün · iki parmakla yakınlaştırın"
                />
              </Suspense>
            </div>

          </div>
        </div>
      </section>

      {/* ZIGZAG SECTIONS */}
      {SECTIONS.map((s) => (
        <ZigzagSection key={s.heading} section={s} />
      ))}

      {/* MISSION / VISION */}
      <section className="section-padding bg-ink-gradient text-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div aria-hidden className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="container-luxury relative">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 lg:gap-32">
            <Reveal>
              <p className="text-eyebrow text-gold">Misyon</p>
              <h3 className="mt-6 text-heading text-cream text-balance">
                Formun, ışığın ve anlamın <span className="serif-italic text-gold">kusursuz dengesi.</span>
              </h3>
              <p className="mt-8 text-body-lg text-cream/70 max-w-md">
                Mücevherleri; formun, ışığın ve anlamın kusursuz bir dengede buluştuğu zamansız sanat eserleri yaratmak.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-eyebrow text-gold">Vizyon</p>
              <h3 className="mt-6 text-heading text-cream text-balance">
                Akademik disiplin ile <span className="serif-italic text-gold">zanaatın buluşması.</span>
              </h3>
              <p className="mt-8 text-body-lg text-cream/70 max-w-md">
                Akademik disiplin ile geleneksel kuyumculuk sanatının usta ellerde nadide birleşimini sağlamak.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <div className="mt-24 pt-16 border-t border-cream/10 text-center">
              <p className="font-display italic text-2xl md:text-3xl text-gold max-w-3xl mx-auto text-balance">
                "Gerçek lüks, hayatı var eden değerlere duyulan bilinçtir."
              </p>
              <p className="mt-6 text-eyebrow text-cream/50">— Aleyna Nur Özdemir</p>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}

function ZigzagSection({ section: s }) {
  return (
    <section className={`section-padding ${s.flip ? "bg-cream-deep" : "bg-cream"} overflow-hidden`}>
      <div className="container-luxury">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${s.flip ? "lg:[&>*:first-child]:order-2" : ""}`}>

          {/* Image */}
          <Reveal y={50} duration={1.2}>
            <div className="image-frame aspect-[4/3] md:aspect-[5/4] bg-bone">
              <img
                src={s.image}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <Reveal delay={0.1}>
              <h2 className="text-heading text-balance">
                {s.heading}{" "}
                <span className="serif-italic text-gold-deep">{s.headingItalic}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-body-lg text-ink/80">{s.body}</p>
            </Reveal>
            {s.body2 && (
              <Reveal delay={0.3}>
                <p className="mt-4 text-body text-ink/70">{s.body2}</p>
              </Reveal>
            )}
            <Reveal delay={0.35}>
              <div className="mt-8 h-px w-16 bg-gold/50" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
