import designer from "../data/designer.json";
import Reveal from "../components/Reveal";
import { motion } from "framer-motion";

export default function Designer() {
  return (
    <>
      {/* HERO */}
      <section className="pt-28 md:pt-40 pb-16 md:pb-24 bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/hero-dalmann.png" alt="" className="w-full h-full object-cover object-center opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
        </div>
        <div className="container-luxury relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal delay={0.1}>
              <h1 className="mt-4 text-display text-balance text-cream">
                {designer.name.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="serif-italic text-gold">{designer.name.split(" ").slice(-1)}.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-8 font-display italic text-2xl text-cream/80 max-w-xl text-balance">
                "{designer.statement}"
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal y={60} duration={1.2}>
              <div className="image-frame aspect-[4/5] bg-bone relative">
                <img src={designer.portrait} alt={designer.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between items-end gap-2 text-cream font-display italic text-sm">
                  <span className="bg-ink/60 backdrop-blur-md px-3 py-1 max-w-[60%] leading-snug">{designer.philosophy}</span>
                  <span className="bg-ink/60 backdrop-blur-md px-3 py-1">İstanbul</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BLOCK 1 — Görsel Sol / Metin Sağ */}
      <section className="section-padding bg-cream">
        <div className="container-luxury grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal y={40} duration={1.1} className="lg:col-span-5">
            <div className="image-frame aspect-[3/2] bg-bone overflow-hidden">
              <img src="/aleyna-nur-1.png" alt="Aleyna Nur Özdemir" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.1}>
              <p className="text-body-lg text-ink/85">
                Aleyna Nur Özdemir'in dünyasında mücevher; zamansız bir anlatının, incelikle işlenmiş bir hafızanın ve yaşayan bir sanat eserinin ta kendisidir. Özdemir, yaratıcı yolculuğunda değerli materyalleri estetik bir dille yorumlarken, insan ruhundaki o görünmez ışığı somutlaştıran çağdaş bir tasarım anlayışı ortaya koyar.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BLOCK 2 — Metin Sol / Görsel Sağ */}
      <section className="section-padding bg-cream-deep">
        <div className="container-luxury grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <h2 className="text-heading text-balance">
                Mücevher Sanatında Bir <span className="serif-italic text-gold-deep">"Modern Simya"</span> Hikâyesi
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body text-ink/75">
                Aleyna Nur Özdemir'in hikâyesini özgün kılan, tasarımın rasyonel temellerini bir laboratuvar titizliğiyle kurgulamış olmasıdır. Akademik yolculuğuna Kimya bilimiyle başlaması, onun maddeyi sadece bir yüzey olarak değil, özündeki yapı taşlarıyla tanımasını sağladı. Maddenin istihalesine ve doğadaki kusursuz dengeye duyduğu bu merak, zamanla tasarımın estetik diliyle birleşti. Mücevher Tasarımı ile Moda ve Tekstil Tasarımı alanlarında gerçekleştirdiği çift ana dal eğitimini yüksek onur derecesiyle taçlandırması, bugün eserlerinde hissettiğimiz o kusursuz ölçü, oran ve malzeme hassasiyetinin en büyük kanıtı.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-body text-ink/70">
                Bilimsel merakı, bugün hâlâ tasarımlarının sessiz ama etkili bir parçası. IGSL (International Gemological Science Laboratory) Diamond Grading uzmanlığı ile pırlantanın en derin detaylarına hakim olan Özdemir, bir yandan da hobi olarak sürdürdüğü deneysel mücevher üretim süreci teknikleriyle mücevherin geleceğine dair Ar-Ge çalışmalarını adeta bir "modern simyacı" tutkusuyla sürdürüyor.
              </p>
            </Reveal>
          </div>
          <Reveal y={40} duration={1.1}>
            <div className="image-frame aspect-[4/5] bg-bone overflow-hidden">
              <img src="/aleyna-nur-2.png" alt="Aleyna Nur Özdemir atölyede" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOCK 3 — Görsel Sol / Metin Sağ */}
      <section className="section-padding bg-cream">
        <div className="container-luxury grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal y={40} duration={1.1}>
            <div className="image-frame aspect-[4/5] bg-bone overflow-hidden">
              <img src="/aleyna-nur-3.png" alt="Aleyna Nur Özdemir zanaat" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <h2 className="text-heading text-balance">
                On Yıllık Bir Zanaat Serüveni: <span className="serif-italic text-gold-deep">Tezgâhın Tozundan Küresel Vizyona.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body text-ink/75">
                On yılı aşkın süredir mücevher sektörünün farklı katmanlarında edindiği tecrübe, onun tasarım diline güçlü bir derinlik kazandırmıştır. Üretim tezgâhının disiplininden vitrinin inceliklerine, taşın değerini belirleyen detaylardan özel müşteri beklentilerine, koleksiyon geliştirme süreçlerinden uluslararası ticaret dinamiklerine kadar sektörün birçok alanında aktif olarak yer almıştır. Bu birikim, ona yalnızca güzel görünen değil; iyi kurgulanmış, doğru üretilmiş ve kalıcı değere sahip parçalar yaratma anlayışı kazandırmıştır.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BLOCK 4 — Tam Genişlik Metin */}
      <section className="section-padding bg-cream-deep">
        <div className="container-luxury text-center">
          <Reveal delay={0.1}>
            <h2 className="text-heading text-balance">
              İnsanı ve Doğayı Merkeze Alan Bir <span className="serif-italic text-gold-deep">Farkındalık</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-body-lg text-ink/80 max-w-5xl mx-auto">
              Aleyna Nur Özdemir'in tasarım dünyasında en dikkat çekici nokta, insanı merkeze alan yaklaşımıdır. Ona göre her insanın kendine ait görünmez bir tonu, kendine özgü bir ışığı vardır. Bu nedenle kişiye özel tasarım süreci çoğu zaman taşla değil, insanla başlar. Bir bakışın zarafeti, güçlü bir duruş, sevilen bir çiçeğin inceliği, hafızada yer eden bir koku ya da anlatılmayan ama hissedilen bir hikâye…
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-5 font-display italic text-xl text-gold-deep">
              Tasarım, bu izlerin değerli materyallerle yeniden yorumlanmasıdır.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 text-body text-ink/70 max-w-5xl mx-auto">
              Bu sanatsal duyarlılık, doğa ile kurulan derin bağda da kendini gösterir. Denizle iç içe büyüyen bir çocukluğun estetik mirası olan suyun hareketi, ışığın yüzeyde bıraktığı izler, organik formlar ve doğal ritim; çalışmalarında sıkça hissedilen unsurlardır. Uluslararası alanda ödüle layık görülen <em>The Breath of the Deep</em> tasarımı da bu duyarlılığın güçlü bir yansımasıdır. Yaşamın kaynağı olan denizlere ve ekolojik dengeye dikkat çeken bu eser, mücevherin aynı zamanda bir farkındalık dili olabileceğini gösterir.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THEMES */}
      <section className="section-padding bg-ink-gradient text-cream relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/zamansiz-bg.png" alt="" className="w-full h-full object-cover object-center opacity-50" />
          <div className="absolute inset-0 bg-ink/50" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
        <div aria-hidden className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gold/10 blur-[140px]" />
        <div className="container-luxury relative">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal delay={0.1}>
              <h2 className="text-heading text-cream text-balance">
                Tüm işin içinden geçen <span className="serif-italic text-gold">üç düşünce hattı.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-10">
            {designer.themes.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-8 border border-cream/10 hover:border-gold/50 transition-colors duration-700 group"
              >
                <span className="absolute top-4 right-6 font-display italic text-gold/40 text-5xl group-hover:text-gold transition-colors duration-700">
                  0{i + 1}
                </span>
                <h3 className="text-subheading text-cream">{t.title}</h3>
                <p className="mt-6 text-body text-cream/70">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
