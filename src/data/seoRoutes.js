/** @typedef {{ title: string; description: string; ogImage?: string }} SeoEntry */

const DEFAULT_OG = "/logo.svg";

/** @type {Record<string, SeoEntry>} */
export const SEO_BY_PATH = {
  "/": {
    title: "Dalmann Jewellery · Zamansız Mücevher, İstanbul Atölyesinden",
    description:
      "Dalmann Jewellery — formun, ışığın ve anlamın kusursuz bir dengede buluştuğu zamansız mücevherler. İstanbul atölyesinden dünyaya.",
    ogImage: DEFAULT_OG,
  },
  "/dalmann-jewellery": {
    title: "Dalmann Jewellery Markası · Vizyon ve Miras",
    description:
      "Dalmann Jewellery’in hikâyesi, değerleri ve mücevher sanatına yaklaşımı. Akademik disiplin ile ustalığın bir araya geldiği marka dünyası.",
    ogImage: DEFAULT_OG,
  },
  "/collections": {
    title: "Koleksiyonlar · Dalmann Jewellery",
    description:
      "Ödüllü ve öne çıkan koleksiyonlar, malzemeler ve her parçanın arkasındaki anlatı. Dalmann Jewellery koleksiyonlarını keşfedin.",
    ogImage: DEFAULT_OG,
  },
  "/aleyna-nur-ozdemir": {
    title: "Aleyna Nur Özdemir · Tasarımcı | Dalmann Jewellery",
    description:
      "Dalmann Jewellery tasarımcısı Aleyna Nur Özdemir: ilham, temalar ve mücevher tasarımına akademik ve sanatsal bakış.",
    ogImage: DEFAULT_OG,
  },
  "/in-the-press": {
    title: "Basında Dalmann · In the Press",
    description:
      "Dalmann Jewellery’nin basında yer aldığı haberler, röportajlar ve öne çıkan yansımalar.",
    ogImage: DEFAULT_OG,
  },
  "/studio": {
    title: "Tasarım Stüdyosu ve Atölye · Dalmann Jewellery",
    description:
      "Çemberlitaş, Fatih, İstanbul’daki Dalmann tasarım stüdyosu ve atölye. Kişiye özel mücevher yolculuğu ve zanaat.",
    ogImage: DEFAULT_OG,
  },
};

/** Bilinmeyen path (404 benzeri) için — yine indexlenebilir ana mesaj */
export const SEO_FALLBACK = SEO_BY_PATH["/"];

/**
 * @param {string} pathname
 * @returns {SeoEntry}
 */
export function getSeoForPath(pathname) {
  const key = pathname.endsWith("/") && pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return SEO_BY_PATH[key] ?? SEO_FALLBACK;
}
