/**
 * Kanonik site adresi (https, sonunda / yok).
 * Üretimde sabit alan adı için repoda `.env` içinde `VITE_SITE_URL` tanımlayın.
 * Tanımsızsa tarayıcıda çalışırken `window.location.origin` kullanılır (localhost uyumu).
 */
export function getSiteOrigin() {
  const raw = import.meta.env.VITE_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  if (typeof window !== "undefined") {
    return window.location.origin.replace(/\/+$/, "");
  }
  return "https://dalmannjewellery.com";
}
