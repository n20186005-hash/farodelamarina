"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { LangProvider, useLang } from "@/components/LangProvider";
import { useTheme } from "next-themes";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import galleryImagesData from "@/gallery-data.json";
import { siteConfig } from "@/site.config";
import { entityContent } from "@/i18n/entity";
import { deepContent } from "@/i18n/deep";
import type { Locale } from "@/i18n/translations";

const MAPS_URL = siteConfig.mapsShareUrl;

const GOOGLE_REVIEWS = [
  { name: "Carlos M.", avatar: "CM", rating: 5, date: "2024-12-10", text: "令人惊叹的地方。太平洋的景色十分壮观，尤其是日落时分。非常推荐来这里拍照。" },
  { name: "Sarah J.", avatar: "SJ", rating: 5, date: "2024-11-15", text: "利马必去的观景点！建于1900年的历史灯塔令人着迷，360度的海景令人叹为观止。" },
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
  const { t, locale } = useLang();
  const dc = deepContent[(locale as Locale) || "es"] || deepContent.es;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
            Faro de la Marina
          </span>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {siteConfig.attractionFullName}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <div className="nav-links">
          <a href="#history">{t.nav.history}</a>
          <a href="#architecture">{t.nav.architecture}</a>
          <a href="#science">{dc.nav.science}</a>
          <a href="#monuments">{t.nav.monuments}</a>
          <a href="#legends">{dc.nav.legends}</a>
          <a href="#visiting">{t.nav.visiting}</a>
          <a href="#amenities">{dc.nav.amenities}</a>
          <a href="#transportation">{t.nav.transportation}</a>
          <a href="#gallery">{t.nav.gallery}</a>
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
  const { t, locale } = useLang();
  const entity = entityContent[(locale as Locale) || "es"] || entityContent.es;
  // 首屏主视觉以 siteConfig.heroImage 为唯一来源（og:image 与 JSON-LD 同源），
  // 再从图库清单取对应尺寸与全尺寸 WebP，避免「展示图」与「声明图」两处硬编码后漂移。
  // 注意用 web/ 而非 thumbs/：首屏是 object-fit: cover 的全视口铺满，
  // 720px 缩略图在 1920px 屏上会被放大 2.67 倍而发虚。
  const hero = galleryImagesData.find((img) => img.src === siteConfig.heroImage) ?? galleryImagesData[0];
  return (
    <section className="hero">
      <div className="hero-bg">
        <picture>
          {hero?.webp && <source srcSet={hero.webp} type="image/webp" />}
          <img
            src={hero?.src ?? siteConfig.heroImage}
            alt={`${siteConfig.attractionFullName} - Main view in ${siteConfig.city}, ${siteConfig.country}`}
            width={hero?.width}
            height={hero?.height}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <div className="hero-texture" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-tagline">{t.hero.tagline}</p>
        <h1 className="hero-title">
          {t.hero.title}
          <span className="hero-title-official">{entity.heroOfficialName}</span>
        </h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <a href="#overview" className="hero-cta">
          {t.hero.cta}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="hero-meta">
          <div className="hero-rating">{siteConfig.ratingValue}</div>
          <div className="hero-stars">★ ★ ★ ★ ★</div>
          <div className="hero-reviews">{siteConfig.reviewCountDisplay} {t.rating.reviews} · {t.rating.source}</div>
        </div>
      </a>
    </section>
  );
}

function renderText(text: string) {
  if (!text) return null;
  // Replace **text** with <strong>text</strong>
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * 首屏核心参数看板
 * ------------------------------------------------------------------
 * 用 <dl> 输出「名称 / 高度 / 射程 / 材质 / 位置 / 坐标 / Plus Code」，
 * 让访客在首屏即可拿到 Height、Range、Location 类问题的直接答案。
 * 数值全部来自 site.config，与 JSON-LD 结构化数据同源，
 * 保证「页面可见内容」与「结构化数据」始终一致。
 */
function KeyFacts() {
  const { t } = useLang();
  const kf = t.keyFacts;

  return (
    <section id="key-facts" className="section" aria-labelledby="key-facts-title">
      <ScrollReveal>
        <h2 id="key-facts-title" className="section-title">{kf.title}</h2>
        <p className="section-subtitle">{kf.subtitle}</p>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <dl className="key-facts-grid">
          {kf.items.map((item) => (
            <div className="key-fact" key={item.label}>
              <dt className="key-fact-label">{item.label}</dt>
              <dd className="key-fact-value">{item.value}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>
      {/* 关键词锚文本内链：把首屏流量导向站内核心区块 */}
      <ScrollReveal>
        <nav className="key-facts-links" aria-label={kf.title}>
          {kf.links.map((link) => (
            <a className="key-facts-link" href={link.href} key={link.href}>
              {link.label}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          ))}
        </nav>
      </ScrollReveal>
    </section>
  );
}

function Breadcrumbs() {
  const { locale } = useLang();
  const entity = entityContent[(locale as Locale) || "es"] || entityContent.es;
  const items = entity.breadcrumb;
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index > 0 && <span className="breadcrumb-separator">→</span>}
            {index === 0 ? (
              <Link href={`/${locale}`} className="breadcrumb-link">
                {item}
              </Link>
            ) : index === items.length - 1 ? (
              <span className="breadcrumb-current">{item}</span>
            ) : (
              <span className="breadcrumb-text">{item}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function EntityOverview() {
  const { locale } = useLang();
  const entity = entityContent[(locale as Locale) || "es"] || entityContent.es;
  return (
    <section id="overview" className="section">
      <ScrollReveal>
        <p className="section-label">{entity.breadcrumbLabel}</p>
        <Breadcrumbs />
        <div className="entity-welcome about-text" style={{ marginTop: "1.5rem", marginBottom: "3rem" }}>
          {renderText(entity.welcome)}
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="entity-grid">
          <article className="entity-card">
            <h2 className="entity-title">{entity.about.title}</h2>
            <p className="entity-text">{renderText(entity.about.content)}</p>
          </article>
          <article className="entity-card">
            <h2 className="entity-title">{entity.location.title}</h2>
            <p className="entity-text">{renderText(entity.location.content)}</p>
          </article>
          <article className="entity-card">
            <h2 className="entity-title">{entity.landmarks.title}</h2>
            <p className="entity-text">{renderText(entity.landmarks.content)}</p>
          </article>
          <article className="entity-card">
            <h2 className="entity-title">{entity.history.title}</h2>
            <p className="entity-text">{renderText(entity.history.content)}</p>
          </article>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Sources() {
  const { locale } = useLang();
  const entity = entityContent[(locale as Locale) || "es"] || entityContent.es;
  const dc = deepContent[(locale as Locale) || "es"] || deepContent.es;
  return (
    <section id="sources" style={{ background: "rgba(0,0,0,0.02)" }}>
      <div className="section">
        <ScrollReveal>
          <p className="section-label">14</p>
          <h2 className="section-title">{entity.sources.title}</h2>
          <div className="section-divider" />
        </ScrollReveal>
        <ScrollReveal>
          <p className="about-text" style={{ marginBottom: "2rem" }}>{renderText(entity.sources.intro)}</p>
        </ScrollReveal>
        <ScrollReveal>
          <div className="sources-grid">
            {entity.sources.items.map((source, i) => (
              <a key={i} href={source.url} target="_blank" rel="noopener noreferrer" className="source-card">
                <span className="source-number">{i + 1}</span>
                <span className="source-name">{source.name}</span>
              </a>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <p className="about-text" style={{ marginTop: "2.5rem" }}>
            {entity.sources.officialUpdate}{" "}
            <a href={siteConfig.govtTourismUrl} target="_blank" rel="noopener noreferrer" className="inline-link">
              {entity.sources.officialUpdateLink}
            </a>
            .
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p className="content-review">{dc.review}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function History() {
  const { t } = useLang();

  return (
    <section id="history" className="section">
      <ScrollReveal>
        <p className="section-label">01</p>
        <h2 className="section-title">{t.history.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <p className="about-text" style={{ whiteSpace: "pre-line", marginBottom: "2rem" }}>{renderText(t.history.intro)}</p>
      </ScrollReveal>
      <ScrollReveal>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "1rem" }}>
          {renderText(t.history.originTitle)}
        </h3>
        <p className="about-text" style={{ whiteSpace: "pre-line", marginBottom: "3rem" }}>{renderText(t.history.originContent)}</p>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ padding: "2rem", background: "var(--color-cream)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10px", right: "-10px", opacity: 0.05, transform: "rotate(15deg)" }}>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.5rem" }}>💡</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-deep)", margin: 0 }}>
              {t.history.legendCard.title}
            </h3>
          </div>
          <p style={{ fontSize: "1rem", color: "var(--color-earth-soft)", lineHeight: "1.6", margin: 0, position: "relative", zIndex: 1 }}>
            {renderText(t.history.legendCard.content)}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Architecture() {
  const { t } = useLang();
  
  return (
    <section id="architecture" className="section" style={{ background: "rgba(0,0,0,0.02)" }}>
      <ScrollReveal>
        <p className="section-label">02</p>
        <h2 className="section-title">{t.architecture.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      
      <ScrollReveal>
        <p className="about-text" style={{ whiteSpace: "pre-line", marginBottom: "3rem" }}>{renderText(t.architecture.intro)}</p>
      </ScrollReveal>
      
      <ScrollReveal>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginBottom: "3rem" }}>
          {Object.entries(t.architecture.specs).map(([key, spec]: [string, any]) => (
            <div key={key} style={{ padding: "1.5rem", background: "#fff", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {key === "structure" ? "🏗️" : key === "design" ? "⚙️" : "✨"} {spec.title}
              </h4>
              <p style={{ fontSize: "0.95rem", color: "var(--color-earth-soft)", lineHeight: "1.6" }}>{renderText(spec.content)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "2rem", border: "1px solid rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "1.5rem" }}>
            {t.architecture.plaque.title}
          </h3>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            {t.architecture.plaque.items.map((item: { label: string; value: string }, i: number) => (
              <div key={i} style={{ padding: "1rem", background: "rgba(0,0,0,0.02)", borderRadius: "6px", borderLeft: "3px solid var(--color-gold)" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--color-earth-soft)", marginBottom: "0.25rem", fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: "0.95rem", color: "var(--color-deep)", fontWeight: 500 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Monuments() {
  const { t } = useLang();
  
  return (
    <section id="monuments" className="section">
      <ScrollReveal>
        <p className="section-label">04</p>
        <h2 className="section-title">{t.monuments.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      
      <ScrollReveal>
        <p className="about-text" style={{ whiteSpace: "pre-line", marginBottom: "2rem" }}>{renderText(t.monuments.intro)}</p>
      </ScrollReveal>
      
      <ScrollReveal>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {t.monuments.items.map((item: { name: string; description: string }, i: number) => (
            <div key={i} style={{ padding: "1.5rem", background: "#f8f9fa", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--color-gold)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>
                {i + 1}
              </div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "0.75rem" }}>
                {item.name}
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", lineHeight: "1.6", whiteSpace: "pre-line" }}>{renderText(item.description)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

function Visiting({ weatherSlot }: { weatherSlot?: React.ReactNode }) {
  const { t } = useLang();
  const cards = [
    { title: t.visiting.hours.title, content: t.visiting.hours.content, note: t.visiting.hours.note, icon: "🌅" },
    { title: t.visiting.price.title, content: t.visiting.price.content, note: t.visiting.price.note, icon: "🎟️" },
    { title: t.visiting.duration.title, content: t.visiting.duration.content, note: t.visiting.duration.note, icon: "🛡️" },
  ];

  return (
    <section id="visiting" style={{ background: "linear-gradient(180deg, var(--color-cream) 0%, #eee8dd 100%)" }}>
      <div className="section">
        <ScrollReveal>
          <p className="section-label">08</p>
          <h2 className="section-title">{t.visiting.title}</h2>
          <div className="section-divider" />
        </ScrollReveal>
        
        <ScrollReveal>
          <p className="about-text" style={{ whiteSpace: "pre-line", marginBottom: "3rem" }}>{renderText(t.visiting.intro)}</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="info-grid">
            {cards.map((c, i) => (
              <div className="info-card" key={i}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{c.icon}</div>
                <div className="info-card-title">{c.title}</div>
                <div className="info-card-content" style={{ whiteSpace: "pre-line" }}>{renderText(c.content)}</div>
                <div className="info-card-note">{renderText(c.note)}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bring-section" style={{ marginTop: "3rem" }}>
            <div className="bring-title">{t.visiting.tips.title}</div>
            <ul className="bring-list">
              {t.visiting.tips.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          {weatherSlot}
        </ScrollReveal>
      </div>
    </section>
  );
}

function Transportation() {
  const { t } = useLang();

  const sections = [
    {
      title: t.transportation.airport.title,
      content: t.transportation.airport.content,
      options: t.transportation.airport.options
    },
    ...(t.transportation.publicTransport ? [{
      title: t.transportation.publicTransport.title,
      content: t.transportation.publicTransport.content,
      options: t.transportation.publicTransport.options
    }] : []),
    ...(t.transportation.cycling ? [{
      title: t.transportation.cycling.title,
      content: t.transportation.cycling.content,
      options: []
    }] : []),
    {
      title: t.transportation.city.title,
      content: t.transportation.city.content,
      steps: t.transportation.city.steps
    }
  ];

  return (
    <section id="transportation" className="section">
      <ScrollReveal>
        <p className="section-label">10</p>
        <h2 className="section-title">{t.transportation.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <div className="faq-list">
          {sections.map((sec, i) => (
            <div className="faq-item expanded" key={i}>
              <div
                className="faq-question"
                style={{ cursor: "default" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ color: "var(--color-deep)", fontWeight: 600 }}>{sec.title}</span>
                </div>
              </div>
              <div className="faq-answer">
                <p style={{ whiteSpace: "pre-line", marginBottom: "1.5rem" }}>{renderText(sec.content)}</p>
                
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
                          <p style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", marginBottom: "0.5rem" }}>{renderText(opt.description)}</p>
                        )}
                        {opt.steps && opt.steps.length > 0 && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {opt.steps.map((step: string, k: number) => (
                              <div key={k} style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", lineHeight: "1.5" }}>
                                • {renderText(step)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {sec.steps && sec.steps.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", background: "rgba(0,0,0,0.02)", padding: "1.25rem", borderRadius: "6px", marginTop: "1rem" }}>
                    {sec.steps.map((step: string, j: number) => (
                      <div key={j} style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", lineHeight: "1.5" }}>
                        • {renderText(step)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(0,0,0,0.02)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "1rem" }}>
            💡 {t.transportation.tips.title}
          </h3>
          <ul style={{ paddingLeft: "1.5rem", color: "var(--color-earth-soft)", lineHeight: "1.8" }}>
            {t.transportation.tips.items.map((tip: string, i: number) => (
              <li key={i}>{renderText(tip)}</li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Gallery() {
  const { t, locale } = useLang();
  const entity = entityContent[(locale as Locale) || "es"] || entityContent.es;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryImages = galleryImagesData;

  // 图片 Alt 语义绑定：主图 = 全称 + 城市 + 国家；其余 = 全称 + 城市 + 序号
  const imageAlt = (index: number) =>
    index === 0
      ? `${siteConfig.attractionFullName} - Main view in ${siteConfig.city}, ${siteConfig.country}`
      : `${siteConfig.attractionFullName} (${siteConfig.attractionShortName}) in ${siteConfig.city} - view ${index + 1}`;

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

  // 灯箱说明与缩略图使用同一套语义化描述，保证无障碍属性与可见文案一致
  const currentCaption = lightboxIndex !== null ? imageAlt(lightboxIndex) : "";

  return (
    <section id="gallery" className="section">
      <ScrollReveal>
        <p className="section-label">11</p>
        <h2 className="section-title">{t.gallery.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <div className="gallery-grid">
          {galleryImages.map((item, i) => (
            <div className="gallery-item" key={i} onClick={() => setLightboxIndex(i)}>
              <picture>
                <source srcSet={item.thumbWebp} type="image/webp" />
                <img
                  src={item.thumb}
                  alt={imageAlt(i)}
                  width={item.thumbWidth}
                  height={item.thumbHeight}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <p className="gallery-copyright">{entity.galleryCopyright}</p>
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
          <picture>
            <source srcSet={galleryImages[lightboxIndex].webp} type="image/webp" />
            <img
              src={galleryImages[lightboxIndex].src}
              alt={imageAlt(lightboxIndex)}
              width={galleryImages[lightboxIndex].width}
              height={galleryImages[lightboxIndex].height}
              className="lightbox-img"
              decoding="async"
            />
          </picture>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryImages.length); }}>›</button>
          {currentCaption && (
            <div className="lightbox-info">
              <p className="lightbox-caption">{currentCaption}</p>
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
    <section id="reviews" className="section" style={{ background: "linear-gradient(180deg, var(--color-cream) 0%, #e8e2d6 100%)" }}>
      <ScrollReveal>
        <p className="section-label">12</p>
        <h2 className="section-title">{t.reviews.title}</h2>
        <p className="section-subtitle">{t.reviews.subtitle}</p>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <div className="reviews-grid" style={{ marginBottom: "4rem" }}>
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
        <div style={{ background: "#fff", borderRadius: "12px", padding: "2.5rem", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "1rem", textAlign: "center" }}>
            {t.reviews.nearbyTitle}
          </h3>
          <p style={{ textAlign: "center", color: "var(--color-earth-soft)", marginBottom: "2rem" }}>{renderText(t.reviews.nearbyIntro)}</p>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            {t.reviews.nearbyItems.map((item: { name: string; description: string }, i: number) => (
              <div key={i} style={{ padding: "1.5rem", background: "rgba(0,0,0,0.02)", borderRadius: "8px" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-deep)", marginBottom: "0.5rem" }}>
                  📍 {item.name}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--color-earth-soft)", lineHeight: "1.5" }}>{renderText(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
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
        <p className="section-label">13</p>
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
                      <p key={j}>{renderText(paragraph)}</p>
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
  const { t, locale } = useLang();
  const entity = entityContent[(locale as Locale) || "es"] || entityContent.es;
  return (
    <section id="location" className="section">
      <ScrollReveal>
        <p className="section-label">15</p>
        <h2 className="section-title">{t.location.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <div className="location-section">
          <div className="location-map-container">
            <iframe
              src={siteConfig.mapsEmbedSrc}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Navy Lighthouse Location Map"
            />
          </div>
          <div className="location-info">
            <p className="location-address">{t.location.address}</p>
            <p className="location-pluscode" style={{ fontSize: "0.85rem", color: "var(--color-stone)", marginBottom: "1rem" }}>
              {entity.plusCode}
            </p>
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
  const { t, locale } = useLang();
  const entity = entityContent[(locale as Locale) || "es"] || entityContent.es;
  return (
    <footer className="site-footer">
      {/* NAP 一致性区块：与 Google 地图资料完全一致的名称 / 地址 / Plus Code */}
      <div className="footer-nap">
        <p className="footer-links-title">{entity.nap.title}</p>
        <p className="footer-nap-name">{entity.nap.name}</p>
        <p className="footer-nap-address">{entity.nap.address}</p>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="footer-nap-map">
          {entity.nap.maps}
        </a>
      </div>
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
      {/* 图片产权与版权声明 */}
      <p className="footer-copyright-note">{entity.galleryCopyright}</p>
    </footer>
  );
}

function Science() {
  const { locale } = useLang();
  const dc = deepContent[(locale as Locale) || "es"] || deepContent.es;
  return (
    <section id="science" className="section">
      <ScrollReveal>
        <p className="section-label">{dc.science.label}</p>
        <h2 className="section-title">{dc.science.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <p className="about-text" style={{ marginBottom: "2.5rem" }}>{dc.science.intro}</p>
      </ScrollReveal>
      <ScrollReveal>
        <div className="deep-grid">
          {dc.science.items.map((item, i) => (
            <article className="deep-card" key={i}>
              <div className="deep-icon" aria-hidden="true">{item.icon}</div>
              <h3 className="deep-card-title">{item.title}</h3>
              <p className="deep-card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

function Timeline() {
  const { locale } = useLang();
  const dc = deepContent[(locale as Locale) || "es"] || deepContent.es;
  return (
    <section id="timeline" className="section" style={{ background: "rgba(0,0,0,0.02)" }}>
      <ScrollReveal>
        <p className="section-label">{dc.timeline.label}</p>
        <h2 className="section-title">{dc.timeline.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <p className="about-text" style={{ marginBottom: "2.5rem" }}>{dc.timeline.intro}</p>
      </ScrollReveal>
      <ScrollReveal>
        <ol className="timeline-list">
          {dc.timeline.entries.map((entry, i) => (
            <li className="timeline-item" key={i}>
              <div className="timeline-year">{entry.year}</div>
              <div className="timeline-body">
                <h3 className="timeline-title">{entry.title}</h3>
                <p className="timeline-text">{entry.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </ScrollReveal>
    </section>
  );
}

function Legends() {
  const { locale } = useLang();
  const dc = deepContent[(locale as Locale) || "es"] || deepContent.es;
  return (
    <section id="legends" className="section">
      <ScrollReveal>
        <p className="section-label">{dc.legends.label}</p>
        <h2 className="section-title">{dc.legends.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <p className="about-text" style={{ marginBottom: "1.5rem" }}>{dc.legends.intro}</p>
        <p className="disclaimer-note">{dc.legends.note}</p>
      </ScrollReveal>
      <ScrollReveal>
        <div className="deep-grid">
          {dc.legends.items.map((item, i) => (
            <article className="deep-card legend-card" key={i}>
              <div className="deep-icon" aria-hidden="true">{item.icon}</div>
              <h3 className="deep-card-title">{item.title}</h3>
              <p className="deep-card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

function Nature() {
  const { locale } = useLang();
  const dc = deepContent[(locale as Locale) || "es"] || deepContent.es;
  return (
    <section id="nature" className="section" style={{ background: "rgba(0,0,0,0.02)" }}>
      <ScrollReveal>
        <p className="section-label">{dc.nature.label}</p>
        <h2 className="section-title">{dc.nature.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <p className="about-text" style={{ marginBottom: "2.5rem" }}>{dc.nature.intro}</p>
      </ScrollReveal>
      <ScrollReveal>
        <div className="deep-grid">
          {dc.nature.items.map((item, i) => (
            <article className="deep-card" key={i}>
              <div className="deep-icon" aria-hidden="true">{item.icon}</div>
              <h3 className="deep-card-title">{item.title}</h3>
              <p className="deep-card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="photo-block">
          <h3 className="photo-block-title">{dc.photo.title}</h3>
          <p className="photo-block-intro">{dc.photo.intro}</p>
          <div className="photo-grid">
            {dc.photo.items.map((item, i) => (
              <div className="photo-item" key={i}>
                <div className="photo-item-title">{item.title}</div>
                <p className="photo-item-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Amenities() {
  const { locale } = useLang();
  const dc = deepContent[(locale as Locale) || "es"] || deepContent.es;
  return (
    <section id="amenities" className="section">
      <ScrollReveal>
        <p className="section-label">{dc.amenities.label}</p>
        <h2 className="section-title">{dc.amenities.title}</h2>
        <div className="section-divider" />
      </ScrollReveal>
      <ScrollReveal>
        <p className="about-text" style={{ marginBottom: "1.5rem" }}>{dc.amenities.intro}</p>
        <p className="disclaimer-note" style={{ marginBottom: "2.5rem" }}>{dc.amenities.neutral}</p>
      </ScrollReveal>
      <ScrollReveal>
        <div className="deep-grid">
          {dc.amenities.groups.map((item, i) => (
            <article className="deep-card amenity-card" key={i}>
              <div className="deep-icon" aria-hidden="true">{item.icon}</div>
              <h3 className="deep-card-title">{item.title}</h3>
              <p className="deep-card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <p className="updated-note">{dc.amenities.updated}</p>
      </ScrollReveal>
    </section>
  );
}

export default function HomeClient({
  locale,
  weatherSlot,
}: {
  locale: string;
  weatherSlot?: React.ReactNode;
}) {
  return (
    <LangProvider initialLocale={locale as "en" | "zh" | "es" | "qu"}>
      <Nav />
      <Hero />
      <KeyFacts />
      <EntityOverview />
      <History />
      <Architecture />
      <Science />
      <Monuments />
      <Timeline />
      <Legends />
      <Nature />
      <Visiting weatherSlot={weatherSlot} />
      <Amenities />
      <Transportation />
      <Gallery />
      <Reviews />
      <FAQ />
      <Sources />
      <Location />
      <Footer />
    </LangProvider>
  );
}