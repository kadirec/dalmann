import { Link } from "react-router-dom";
import { MAIN_NAV_LINKS } from "../data/navLinks";

function IconLinkedIn({ className = "" }) {
  return (
    <svg className={`h-[1.05em] w-[1.05em] shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-12h4v2" />
      <rect x="2" y="9" width="4" height="11" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconInstagram({ className = "" }) {
  return (
    <svg className={`h-[1.05em] w-[1.05em] shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

function IconFacebook({ className = "" }) {
  return (
    <svg className={`h-[1.05em] w-[1.05em] shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
    </svg>
  );
}

function IconYoutube({ className = "" }) {
  return (
    <svg className={`h-[1.05em] w-[1.05em] shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 00-1.96-2C18.88 4 12 4 12 4s-6.88 0-8.58.42a2.78 2.78 0 00-1.96 2A29.94 29.94 0 001 11.75c0 1.87.16 3.73.46 5.33a2.78 2.78 0 002 2C5.12 20 12 20 12 20s6.88 0 8.58-.42a2.78 2.78 0 002-2c.3-1.6.46-3.46.46-5.33 0-1.87-.16-3.73-.46-5.33z" />
      <path d="M10 9l6 3.5L10 16V9z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIAL_ROWS = [
  { label: "Linkedin", Icon: IconLinkedIn },
  { label: "Instagram", Icon: IconInstagram },
  { label: "Facebook", Icon: IconFacebook },
  { label: "Youtube", Icon: IconYoutube },
];

const COLUMNS = [
  {
    title: "Hızlı Erişim",
    links: [...MAIN_NAV_LINKS],
  },
  {
    title: "Sosyal Medya",
    socialRows: SOCIAL_ROWS,
  },
  {
    title: "İletişim",
    links: [
      { label: "info@dalmannjewellery.com", href: "mailto:info@dalmannjewellery.com" },
      { label: "Binbirdirek Mah. Dizdariye Çeşmesi Sok. No:55/1 Çemberlitaş · Fatih · İstanbul", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink text-cream overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/footer-bg.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink/80" />
      </div>
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-deep/45 to-transparent" />

      <div className="container-luxury relative">
        {/* Mektuplaşma blogu — geçici olarak gizlendi */}
        <div className="border-b border-cream/10" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.95fr)_minmax(0,1.15fr)] gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14 items-start py-14 md:py-20">
          <div className="max-w-md lg:max-w-none">
            <div className="inline-block origin-left scale-x-[1.08]">
              <img src="/logo.svg" alt="Dalmann Jewellery" className="h-11 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="mt-5 text-body-sm md:text-body text-cream/70 max-w-sm leading-relaxed">
              Akademik tasarım disiplini ile geleneksel kuyumculuk sanatının buluştuğu, İstanbul'dan dünyaya uzanan bir mücevher evi.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="min-w-0">
              <p className="font-sans text-sm sm:text-[0.9375rem] md:text-base font-semibold uppercase tracking-[0.12em] text-gold-deep">
                {col.title}
              </p>
              <ul className="mt-4 space-y-0">
                {col.socialRows ? (
                  col.socialRows.map(({ label, Icon }) => (
                    <li key={label}>
                      <span className="inline-flex items-center gap-2 py-1 font-serif text-[0.9375rem] sm:text-base font-medium text-cream/90 leading-snug">
                        <Icon className="text-cream/60" />
                        {label}
                      </span>
                    </li>
                  ))
                ) : (
                  col.links.map((l) => (
                    <li key={l.label}>
                      {l.to ? (
                        <Link
                          to={l.to}
                          className="inline-flex items-center py-1.5 font-serif text-[0.9375rem] sm:text-base font-medium text-cream/90 hover:text-gold-deep transition-colors duration-500 leading-snug"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          className="inline-flex items-center py-1.5 font-serif text-[0.9375rem] sm:text-base font-medium text-cream/90 hover:text-gold-deep transition-colors duration-500 leading-snug"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 border-t border-cream/10 text-center text-eyebrow text-cream/50">
          <span>© {new Date().getFullYear()} Dalmann Jewellery. Tüm hakları saklıdır.</span>
        </div>
      </div>
    </footer>
  );
}
