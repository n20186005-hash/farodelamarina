"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { LangProvider, useLang } from "@/components/LangProvider";
import { useTheme } from "next-themes";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { WeatherWidget } from "@/components/WeatherWidget";
import { StructuredData } from "@/components/StructuredData";
import galleryImagesData from "@/gallery-data.json";

const MAPS_URL = "https://maps.app.goo.gl/7FXLGcATHHeRnALv8";

const GOOGLE_REVIEWS = [
  { name: "Carlos M.", avatar: "CM", rating: 5, date: "2024-12-10", text: "El Faro de la Marina es un lugar impresionante. Las vistas del Pacífico son espectaculares, especialmente al atardecer. Muy recomendado para fotos." },
  { name: "Sarah J.", avatar: "SJ", rating: 5, date: "2024-11-15", text: "Navy Lighthouse is a must-visit viewpoint in Lima! The historic lighthouse from 1900 is fascinating, and the panoramic ocean views are breathtaking." },
  { name: "Luis H.", avatar: "LH", rating: 5, date: "2024-10-20", text: "Un mirador excelente en Miraflores. El faro tiene mucha historia y las placas conmemorativas son muy interesantes. Vistas de 360 grados." },
  { name: "王大明", avatar: "王", rating: 5, date: "2024-09-25", text: "海军灯塔是利马最美的观景点之一！灯塔建于1900年，历史悠久。可以俯瞰整个太平洋，非常壮观！" },
  { name: "Ana T.", avatar: "AT", rating: 5, date: "2024-08-18", text: "Hermoso mirador en Miraflores. El Faro de la Marina tiene una historia muy interesante. Las vistas del océano son increíbles." },
  { name: "Robert K.", avatar: "RK", rating: 5, date: "2024-07-05", text: "Fantastic viewpoint! The Navy Lighthouse is a historic landmark with amazing stories. Great place for sunset photos and learning about Peruvian naval history." }
];

function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ width: "24px", height: "24px" }} />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="theme-toggle-btn"
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        padding: "0.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {theme === "dark" ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>
          Navy Lighthouse
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <div className="nav-links">
          <a href="#about">{t.nav.about}</a>
          {t.nav.inscriptions && <a href="#inscriptions">{t.nav.inscriptions}</a>}
          <a href="#visiting">{t.nav.visiting}</a>
          <a href="#transportation">{t.nav.transportation}</a>
          <a href="#tips">{t.nav.tips}</a>
          <a href="#gallery">{t.gallery.title}</a>
          <a href="#reviews">{t.nav.reviews}</a>
          <a href="#faq">{t.nav.faq}</a>
          <a href="#location">{t.nav.location}</a>
        </div>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-texture" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-tagline">{t.hero.tagline}</p>
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <a href="#about" className="hero-cta">
          {t.hero.cta}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="hero-meta">
          <div className="hero-rating">4.7</div>
          <div className="hero-stars">★ ★ ★ ★ ★</div>
          <div className="hero-reviews">6,599 {t.rating.reviews} · {t.rating.source}</div>
        </div>
      </a>
    </section>
  );
}

function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section">
      <ScrollReveal>
        <p className="section-label">01</p>
        <h2 className="section-title">{t.about.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ marginBottom: "3rem", padding: "1.5rem", background: "#f8f9fa", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "1rem" }}>
            {t.about.highlights.title}
          </h3>
          <div className="highlights-grid">
            {t.about.highlights.items.map((item: string, i: number) => (
              <div className="highlight-item" key={i}>
                <div className="highlight-icon" />
                <span className="highlight-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <p className="about-text" style={{ whiteSpace: "pre-line" }}>{t.about.p1}</p>
        <p className="about-text" style={{ whiteSpace: "pre-line" }}>{t.about.p2}</p>
      </ScrollReveal>
    </section>
  );
}

function Inscriptions() {
  const { t } = useLang();
  if (!t.inscriptions) return null;
  
  return (
    <section id="inscriptions" className="section">
      <ScrollReveal>
        <p className="section-label">02</p>
        <h2 className="section-title">{t.inscriptions.title}</h2>
        <p className="section-subtitle">{t.inscriptions.subtitle}</p>
        <div className="section-divider" />
      </ScrollReveal>
      
      <ScrollReveal>
        <div style={{ marginBottom: "3rem", padding: "1.5rem", background: "#f8f9fa", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "1rem" }}>
            {t.inscriptions.intro.title}
          </h3>
          <p className="about-text" style={{ whiteSpace: "pre-line" }}>{t.inscriptions.intro.content}</p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "1.5rem" }}>
            {t.inscriptions.plaque.title}
          </h3>
          <p className="about-text" style={{ whiteSpace: "pre-line", marginBottom: "1.5rem" }}>{t.inscriptions.plaque.content}</p>
          <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {t.inscriptions.plaque.items.map((item: { label: string; value: string }, i: number) => (
              <div key={i} style={{ padding: "1rem", background: "rgba(0,0,0,0.03)", borderRadius: "6px", borderLeft: "3px solid var(--color-gold)" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--color-earth-soft)", marginBottom: "0.25rem", fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: "0.95rem", color: "var(--color-deep)", fontWeight: 500 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "1.5rem" }}>
            {t.inscriptions.monuments.title}
          </h3>
          <p className="about-text" style={{ whiteSpace: "pre-line", marginBottom: "2rem" }}>{t.inscriptions.monuments.content}</p>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {t.inscriptions.monuments.items.map((item: { name: string; description: string }, i: number) => (
              <div key={i} style={{ padding: "1.5rem", background: "#f8f9fa", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "0.75rem" }}>
                  {item.name}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", lineHeight: "1.6", whiteSpace: "pre-line" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Visiting() {
  const { t } = useLang();
  const cards = [
    { title: t.visiting.hours.title, content: t.visiting.hours.content, note: t.visiting.hours.note },
    { title: t.visiting.price.title, content: t.visiting.price.content, note: t.visiting.price.note },
    { title: t.visiting.duration.title, content: t.visiting.duration.content, note: t.visiting.duration.note },
  ];

  return (
    <section id="visiting" style={{ background: "linear-gradient(180deg, var(--color-cream) 0%, #eee8dd 100%)" }}>
      <div className="section">
        <ScrollReveal>
          <p className="section-label">03</p>
          <h2 className="section-title">{t.visiting.title}</h2>
          <div className="section-divider" />
        </ScrollReveal>
        <ScrollReveal>
          <div className="info-grid">
            {cards.map((c, i) => (
              <div className="info-card" key={i}>
                <div className="info-card-title">{c.title}</div>
                <div className="info-card-content">{c.content}</div>
                <div className="info-card-note">{c.note}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bring-section">
            <div className="bring-title">{t.visiting.tips.title}</div>
            <ul className="bring-list">
              {t.visiting.tips.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <WeatherWidget />
        </ScrollReveal>
      </div>
    </section>
  );
}

function Transportation() {
  const { t } = useLang();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const sections = [
    {
      icon: "✈️",
      title: t.transportation.airport.title,
      content: t.transportation.airport.content,
      options: t.transportation.airport.options
    },
    ...(t.transportation.publicTransport ? [{
      icon: "🚌",
      title: t.transportation.publicTransport.title,
      content: t.transportation.publicTransport.content,
      options: t.transportation.publicTransport.options
    }] : []),
    ...(t.transportation.cycling ? [{
      icon: "🚲",
      title: t.transportation.cycling.title,
      content: t.transportation.cycling.content,
      options: []
    }] : []),
    ...(t.transportation.localTransport ? [{
      icon: "🚐",
      title: t.transportation.localTransport.title,
      content: t.transportation.localTransport.description || t.transportation.localTransport.content,
      steps: t.transportation.localTransport.steps
    }] : []),
    {
      icon: "🚶",
      title: t.transportation.city.title,
      content: t.transportation.city.content,
      steps: t.transportation.city.steps
    }
  ];

  return (
    <section id="transportation" className="section">
      <ScrollReveal>
        <p className="section-label">04</p>
        <h2 className="section-title">{t.transportation.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <div className="faq-list">
          {sections.map((sec, i) => (
            <div className={`faq-item ${expandedIndex === i ? "expanded" : ""}`} key={i}>
              <button
                className="faq-question"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{sec.icon}</span>
                  <span style={{ color: "var(--color-deep)", fontWeight: 600 }}>{sec.title}</span>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`faq-icon ${expandedIndex === i ? "rotated" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {expandedIndex === i && (
                <div className="faq-answer">
                  <p style={{ whiteSpace: "pre-line", marginBottom: "1.5rem" }}>{sec.content}</p>
                  
                  {sec.options && sec.options.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {sec.options.map((opt: any, j: number) => (
                        <div key={j} style={{ padding: "1.25rem", background: "rgba(0,0,0,0.03)", borderRadius: "6px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <strong style={{ color: "var(--color-deep)", fontSize: "1.05rem" }}>{opt.name}</strong>
                          </div>
                          {(opt.price || opt.time) && (
                            <div style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                              {opt.price && <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>{opt.price}</span>}
                              {opt.time && <span>⏱️ {opt.time}</span>}
                            </div>
                          )}
                          {opt.description && (
                            <p style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", marginBottom: "0.5rem" }}>{opt.description}</p>
                          )}
                          {opt.steps && opt.steps.length > 0 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {opt.steps.map((step: string, k: number) => (
                                <div key={k} style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", lineHeight: "1.5" }}>
                                  • {step}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.steps && sec.steps.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", background: "rgba(0,0,0,0.02)", padding: "1.25rem", borderRadius: "6px" }}>
                      {sec.steps.map((step: string, j: number) => (
                        <div key={j} style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", lineHeight: "1.5" }}>
                          • {step}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

function Tips() {
  const { t } = useLang();
  return (
    <section id="tips" style={{ background: "linear-gradient(180deg, var(--color-cream) 0%, #e8e2d6 100%)" }}>
      <div className="section">
        <ScrollReveal>
          <p className="section-label">05</p>
          <h2 className="section-title">{t.tips.title}</h2>
          <div className="section-divider" />
        </ScrollReveal>
        
        <ScrollReveal>
          <ul className="tips-list">
            {t.tips.items.map((tip: string, i: number) => (
              <li className="tip-item" key={i}>
                <span className="tip-number">{String(i + 1).padStart(2, "0")}</span>
                <span className="tip-text">{tip}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Gallery() {
  const { t, locale } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryImages = galleryImagesData.map((src: string) => ({
    src,
    caption: {} as Record<string, string>,
    story: {} as Record<string, string>,
  }));

  useEffect(() => {
    if (lightboxIndex !== null && galleryImages.length > 0) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight") setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : null));
        if (e.key === "ArrowLeft") setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null));
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [lightboxIndex, galleryImages.length]);

  const currentImage = lightboxIndex !== null ? galleryImages[lightboxIndex] : null;
  const currentCaption = currentImage?.caption?.[locale] || "";
  const currentStory = currentImage?.story?.[locale] || "";

  return (
    <section id="gallery" className="section">
      <ScrollReveal>
        <p className="section-label">06</p>
        <h2 className="section-title">{t.gallery.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <div className="gallery-grid">
          {galleryImages.map((item, i) => (
            <div className="gallery-item" key={i} onClick={() => setLightboxIndex(i)}>
              <img src={item.src} alt={item.caption?.[locale] || `Gallery image ${i + 1}`} loading="lazy" />
              {item.caption && (
                <div className="gallery-caption-overlay">
                  <p className="gallery-caption-text">{item.caption[locale] || item.caption.en || ""}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="google-maps-btn">
            {t.gallery.viewMore}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </ScrollReveal>
      {lightboxIndex !== null && galleryImages.length > 0 && (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>×</button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length); }}>‹</button>
          <img src={galleryImages[lightboxIndex].src} alt={currentCaption || `Gallery image ${lightboxIndex + 1}`} className="lightbox-img" />
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryImages.length); }}>›</button>
          {(currentCaption || currentStory) && (
            <div className="lightbox-info">
              {currentCaption && <p className="lightbox-caption">{currentCaption}</p>}
              {currentStory && (
                <div className="lightbox-story">
                  {currentStory.split("\n").map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function Reviews() {
  const { t } = useLang();

  return (
    <section id="reviews" className="section">
      <ScrollReveal>
        <p className="section-label">07</p>
        <h2 className="section-title">{t.reviews.title}</h2>
        <p className="section-subtitle">{t.reviews.subtitle}</p>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <div className="reviews-grid">
          {GOOGLE_REVIEWS.map((review, i) => (
            <div className="review-card" key={i}>
              <div className="review-header">
                <div className="review-avatar">{review.avatar}</div>
                <div className="review-info">
                  <div className="review-name">{review.name}</div>
                  <div className="review-date">{review.date}</div>
                </div>
                <div className="review-rating">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="review-text">{review.text}</p>
              <div className="review-source">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4285F4"/>
                </svg>
                Google
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="google-maps-btn">
            {t.reviews.viewMore}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

function FAQ() {
  const { t } = useLang();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqItems = t.faq.items;

  return (
    <section id="faq" className="section">
      <div className="section">
        <ScrollReveal>
        <p className="section-label">08</p>
        <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
          <div className="section-divider" />
        </ScrollReveal>
        <ScrollReveal>
          <div className="faq-list">
            {faqItems.map((item: { question: string; answer: string }, i: number) => (
              <div className={`faq-item ${expandedIndex === i ? "expanded" : ""}`} key={i}>
                <button
                  className="faq-question"
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                >
                  <span style={{ color: "var(--color-deep)", fontWeight: 600 }}>{item.question}</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`faq-icon ${expandedIndex === i ? "rotated" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {expandedIndex === i && (
                  <div className="faq-answer">
                    {item.answer.split("\n\n").map((paragraph: string, j: number) => (
                      <p key={j}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Location() {
  const { t } = useLang();
  return (
    <section id="location" className="section">
      <ScrollReveal>
        <p className="section-label">09</p>
        <h2 className="section-title">{t.location.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <div className="location-section">
          <div className="location-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.547747015476!2d-77.0297049!3d-12.1264389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7c0e2c7d1d1%3A0xf1f1f1f1f1f1f1f1!2sFaro%20de%20la%20Marina%2C%20Miraflores!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="800"
              height="600"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Navy Lighthouse Location Map"
            />
          </div>
          <div className="location-info">
            <p className="location-address">{t.location.address}</p>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="maps-link">
              {t.location.openMaps}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <p className="footer-links-title">{t.footer.linksTitle}</p>
        <div className="footer-links-grid">
          {t.footer.links.map((link: { name: string; url: string }, i: number) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="footer-link-item">
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-legal" style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem 2rem 0", textAlign: "center" }}>
        <Link href="/privacy" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.8rem", marginRight: "1.5rem" }}>
          Privacy Policy
        </Link>
        <Link href="/terms" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.8rem", marginRight: "1.5rem" }}>
          Terms of Service
        </Link>
        <Link href="/cookies" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.8rem" }}>
          Cookie Settings
        </Link>
      </div>
      <p className="footer-text" style={{ marginTop: "2rem", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-gold)" }}>
        {t.footer.callToAction}
      </p>
      <p className="footer-text" style={{ marginTop: "1rem", whiteSpace: "pre-line" }}>{t.footer.text}</p>
    </footer>
  );
}

export default function Home(props: { params: Promise<{ locale: string }> }) {
  const params = React.use(props.params);
  return (
    <LangProvider initialLocale={params.locale as "en" | "zh" | "es" | "qu"}>
      <StructuredData />
      <Nav />
      <Hero />
      <About />
      <Inscriptions />
      <Visiting />
      <Transportation />
      <Tips />
      <Gallery />
      <Reviews />
      <FAQ />
      <Location />
      <Footer />
    </LangProvider>
  );
}
