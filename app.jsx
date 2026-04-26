// Roba International Group — main React app
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mapStyle": "topo",
  "mapAnimate": true,
  "accent": "#A8A862",
  "accentDark": "#8E8E4E",
  "background": "#F6F2E7",
  "showHeroGiant": true,
  "showStrip": true,
  "displayFont": "Instrument Serif",
  "bodyFont": "Outfit"
}/*EDITMODE-END*/;

// ─── Reusable bits ─────────────────────────────────────────────────────────
function Wordmark({ size = 28, color }) {
  // Recreate the "roba" wordmark with CSS — geometric, light weight
  return (
    <span
      className="roba-wordmark"
      style={{
        fontSize: size,
        color: color || "var(--olive)",
        letterSpacing: "-0.04em",
        fontWeight: 300,
        lineHeight: 1,
        fontFamily: "'Outfit', 'Century Gothic', sans-serif",
      }}
    >
      roba
    </span>
  );
}

function SectionLabel({ n, children }) {
  return (
    <div className="section-label">
      <span className="section-label__n">{n}</span>
      <span className="section-label__line" />
      <span className="section-label__txt">{children}</span>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#group", label: "Group" },
    { href: "#companies", label: "Companies" },
    { href: "#reach", label: "Reach" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#top" className="nav__brand" aria-label="Roba International Group">
        <Wordmark size={26} />
        <span className="nav__brand-tag">International Group</span>
      </a>
      <nav className="nav__links" aria-label="Primary">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="nav__link">
            {l.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="nav__cta">
        Get in touch
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      <button
        className="nav__menu-btn"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>
      {open && (
        <div className="nav__mobile" onClick={() => setOpen(false)}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav__mobile-link">{l.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────
function Hero({ showGiant = true, showStrip = true }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Indian/Maldives" };
      setTime(d.toLocaleTimeString("en-GB", opts));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero__meta hero__meta--tl">
        <span className="dot" /> Established · Maldives
      </div>
      <div className="hero__meta hero__meta--tr">
        Malé · {time} <span className="dot dot--soft" />
      </div>

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          A trading & lifestyle solutions group
        </div>
        <h1 className="hero__title">
          A quiet bridge<br/>
          between <em>brands</em><br/>
          and <em>consumers</em>.
        </h1>
        <p className="hero__lede">
          Roba International is a Maldives-headquartered group of six companies — distribution,
          logistics, sourcing, media, and sustainability — connecting global quality with local
          demand across South and Southeast Asia.
        </p>
        <div className="hero__ctas">
          <a href="#companies" className="btn btn--primary">
            Explore the group
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="#group" className="btn btn--ghost">What we do</a>
        </div>
      </div>

      {showGiant && (
        <div className="hero__giant" aria-hidden="true">
          <span>roba</span>
        </div>
      )}

      {showStrip && (
        <div className="hero__strip">
          <div className="hero__strip-inner">
            {["Distribution", "Logistics", "Sourcing", "Media", "Sustainability", "Origin Supply", "Distribution", "Logistics", "Sourcing", "Media", "Sustainability", "Origin Supply"].map((t, i) => (
              <span key={i} className="hero__strip-item">
                <span className="hero__strip-dot" />
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Group overview ───────────────────────────────────────────────────────
function GroupOverview() {
  const stats = [
    { k: "06", v: "Companies in the group" },
    { k: "03", v: "Countries of operation" },
    { k: "05+", v: "Verticals served" },
    { k: "01", v: "Shared standard of trust" },
  ];

  return (
    <section id="group" className="section group">
      <SectionLabel n="01">The Group</SectionLabel>
      <div className="group__grid">
        <h2 className="group__title">
          Six companies, one promise — <em>reliable, considered</em>,
          and rooted in long-term partnerships.
        </h2>
        <div className="group__body">
          <p>
            What began as a Maldives-based trading house has grown into a network spanning
            Thailand, Sri Lanka, and the Maldives — covering every step from origin sourcing
            and quality control to export logistics, in-market distribution, and brand
            building.
          </p>
          <p>
            Each company in the group operates with focused expertise. Together, they form
            a single, accountable supply chain — efficient, consistent, and responsive to
            the markets we serve.
          </p>
        </div>
      </div>
      <div className="group__stats">
        {stats.map((s, i) => (
          <div key={i} className="stat">
            <div className="stat__k">{s.k}</div>
            <div className="stat__v">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Companies (interactive accordion) ────────────────────────────────────
function Companies() {
  const [active, setActive] = useState("international");
  const items = window.COMPANIES;

  return (
    <section id="companies" className="section companies">
      <SectionLabel n="02">The Companies</SectionLabel>
      <h2 className="companies__title">
        A portfolio of <em>specialists</em>.
      </h2>
      <p className="companies__sub">
        Hover or tap a row to expand. Each company is independently accountable, but built to work in concert.
      </p>

      <div className="companies__list">
        {items.map((c, i) => {
          const isActive = active === c.id;
          return (
            <article
              key={c.id}
              className={`co ${isActive ? "co--active" : ""}`}
              onMouseEnter={() => setActive(c.id)}
              onClick={() => setActive(c.id)}
            >
              <div className="co__row">
                <span className="co__n">{c.n}</span>
                <div className="co__head">
                  <h3 className="co__name">
                    {c.name} <span className="co__legal">{c.legal}</span>
                  </h3>
                  <div className="co__meta">
                    <span className="co__region">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="2" fill="currentColor"/><circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeOpacity="0.4"/></svg>
                      {c.region}
                    </span>
                    <span className="co__sep">·</span>
                    <span className="co__role">{c.role}</span>
                  </div>
                </div>
                <span className="co__chev">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 11h12M17 11l-5-5M17 11l-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <div className="co__panel">
                <div className="co__panel-inner">
                  <div className="co__blurb-wrap">
                    <p className="co__blurb">{c.blurb}</p>
                    {c.website && (
                      <a
                        className="co__visit"
                        href={c.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="co__visit-label">Visit</span>
                        <span className="co__visit-url">{c.website.replace(/^https?:\/\//, "")}</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="co__caps">
                    <div className="co__caps-label">Capabilities</div>
                    <div className="co__caps-list">
                      {c.capabilities.map((cap) => (
                        <span key={cap} className="co__cap">{cap}</span>
                      ))}
                    </div>
                  </div>
                  <div className="co__partners">
                    <div className="co__caps-label">Key partners & markets</div>
                    <div className="co__partners-list">
                      {c.partners.map((p) => <span key={p}>{p}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ─── Reach (geography) ────────────────────────────────────────────────────
function Reach({ mapStyle = "topo", mapAnimate = true }) {
  const places = [
    { country: "Maldives", role: "Headquarters · Distribution · Logistics · Media · Agri-Marine", coords: "4.1755° N, 73.5093° E" },
    { country: "Thailand", role: "Sourcing & Trade Coordination Hub", coords: "13.7563° N, 100.5018° E" },
    { country: "Sri Lanka", role: "Origin Sourcing & Quality Assurance", coords: "6.9271° N, 79.8612° E" },
  ];

  return (
    <section id="reach" className="section reach">
      <SectionLabel n="03">Reach</SectionLabel>
      <div className="reach__grid">
        <div>
          <h2 className="reach__title">
            From <em>origin</em> to <em>doorstep</em> — across three countries.
          </h2>
          <p className="reach__sub">
            We move goods through one of Asia's busiest export corridors, with offices
            and trusted partners at every node of the chain.
          </p>
        </div>
        <div className="reach__list">
          {places.map((p, i) => (
            <div key={i} className="place">
              <div className="place__num">0{i+1}</div>
              <div className="place__body">
                <h4 className="place__country">{p.country}</h4>
                <p className="place__role">{p.role}</p>
                <p className="place__coords">{p.coords}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Original hand-styled map */}
      <div className="reach__map">
        <window.ReachMap style={mapStyle} animate={mapAnimate} />
      </div>
    </section>
  );
}

// ─── Values strip ─────────────────────────────────────────────────────────
function Values() {
  const items = [
    { k: "Reliability", d: "Consistent supply, predictable lead times, no surprises." },
    { k: "Partnership", d: "Long-term relationships with producers, brands, and buyers." },
    { k: "Market Insight", d: "Ground-level understanding of every market we operate in." },
    { k: "Responsibility", d: "Sustainable sourcing and resource recovery built into the group." },
  ];
  return (
    <section className="values">
      <div className="values__grid">
        {items.map((it, i) => (
          <div key={i} className="value">
            <div className="value__k">— {it.k}</div>
            <div className="value__d">{it.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact / Footer ─────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="section contact">
      <SectionLabel n="04">Contact</SectionLabel>
      <div className="contact__grid">
        <div>
          <h2 className="contact__title">
            Let's build a <em>reliable</em> bridge — together.
          </h2>
          <p className="contact__sub">
            Whether you're a brand looking to enter new markets, a producer seeking export
            channels, or a buyer in need of trusted sourcing — we'd like to hear from you.
          </p>
          <a href="mailto:hello@robagroup.com" className="contact__mail">
            hello@robagroup.com
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        <div className="contact__offices">
          <div className="office">
            <div className="office__country">Maldives <span>HQ</span></div>
            <div className="office__lines">
              <div>Roba International Pvt Ltd</div>
              <div>Malé, Republic of Maldives</div>
            </div>
          </div>
          <div className="office">
            <div className="office__country">Thailand</div>
            <div className="office__lines">
              <div>Roba International (Thailand) Co., Ltd.</div>
              <div>Bangkok, Thailand</div>
            </div>
          </div>
          <div className="office">
            <div className="office__country">Sri Lanka</div>
            <div className="office__lines">
              <div>Roba International Ceylon Ltd.</div>
              <div>Colombo, Sri Lanka</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <Wordmark size={120} />
      </div>
      <div className="footer__bot">
        <div>© {new Date().getFullYear()} Roba International Pvt Ltd. All rights reserved.</div>
        <div className="footer__links">
          <a href="#group">Group</a>
          <a href="#companies">Companies</a>
          <a href="#reach">Reach</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer__spacer" aria-hidden="true" />
      </div>
    </footer>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply CSS variable tweaks
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--olive", t.accent);
    r.style.setProperty("--olive-d", t.accentDark);
    r.style.setProperty("--cream", t.background);
    r.style.setProperty("--display-font", `'${t.displayFont}', serif`);
    r.style.setProperty("--body-font", `'${t.bodyFont}', system-ui, sans-serif`);
  }, [t.accent, t.accentDark, t.background, t.displayFont, t.bodyFont]);

  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakRadio = window.TweakRadio;
  const TweakSelect = window.TweakSelect;
  const TweakColor = window.TweakColor;
  const TweakToggle = window.TweakToggle;

  return (
    <>
      <Nav />
      <main>
        <Hero showGiant={t.showHeroGiant} showStrip={t.showStrip} />
        <GroupOverview />
        <Values />
        <Companies />
        <Reach mapStyle={t.mapStyle} mapAnimate={t.mapAnimate} />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Map" />
        <TweakRadio label="Map style" value={t.mapStyle}
          options={["topo", "silhouette", "blueprint"]}
          onChange={(v) => setTweak("mapStyle", v)} />
        <TweakToggle label="Animate trade routes" value={t.mapAnimate}
          onChange={(v) => setTweak("mapAnimate", v)} />

        <TweakSection label="Brand color" />
        <TweakColor label="Accent (olive)" value={t.accent}
          onChange={(v) => setTweak("accent", v)} />
        <TweakColor label="Accent — deep" value={t.accentDark}
          onChange={(v) => setTweak("accentDark", v)} />
        <TweakColor label="Background (cream)" value={t.background}
          onChange={(v) => setTweak("background", v)} />

        <TweakSection label="Hero" />
        <TweakToggle label="Giant 'roba' watermark" value={t.showHeroGiant}
          onChange={(v) => setTweak("showHeroGiant", v)} />
        <TweakToggle label="Capabilities marquee" value={t.showStrip}
          onChange={(v) => setTweak("showStrip", v)} />

        <TweakSection label="Typography" />
        <TweakSelect label="Display font" value={t.displayFont}
          options={["Instrument Serif", "Fraunces", "DM Serif Display", "Cormorant Garamond"]}
          onChange={(v) => setTweak("displayFont", v)} />
        <TweakSelect label="Body font" value={t.bodyFont}
          options={["Outfit", "Manrope", "DM Sans", "Geist"]}
          onChange={(v) => setTweak("bodyFont", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
