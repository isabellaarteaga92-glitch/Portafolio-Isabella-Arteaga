/* Interfaz del portafolio (React + htm, sin compilación). El contenido está en content.js */
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const S = window.SITE;
  const C = S.config;

  /* Texto con [[pendientes]] resaltados */
  function Rich({ text }) {
    if (text === undefined || text === null) return null;
    const parts = String(text).split(/(\[\[.*?\]\])/g);
    return parts.map((p, i) =>
      p.startsWith('[[') ? html`<span key=${i} className="pend" title="Pendiente por completar">${p.slice(2, -2)}</span>` : p
    );
  }

  /* Aparición suave al hacer scroll */
  function Reveal({ children, className = '', delay = 0, as = 'div' }) {
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); }
      }, { threshold: 0.12 });
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return React.createElement(as, { ref, className: 'reveal ' + className, style: { transitionDelay: delay + 'ms' } }, children);
  }

  /* Curvas de nivel: motivo gráfico de la marca */
  function Contours({ className = '', lines = 14, seed = 1 }) {
    const paths = useMemo(() => {
      const out = [];
      const cx = 400, cy = 300;
      for (let k = 1; k <= lines; k++) {
        const r0 = 24 + k * 22;
        let d = '';
        const n = 72;
        for (let i = 0; i <= n; i++) {
          const a = (i / n) * Math.PI * 2;
          const wob =
            Math.sin(a * 3 + seed + k * 0.22) * (6 + k * 1.6) +
            Math.cos(a * 2 - seed * 1.7 + k * 0.15) * (4 + k * 1.2) +
            Math.sin(a * 5 + k * 0.4) * 3;
          const r = r0 + wob;
          d += (i === 0 ? 'M' : 'L') + (cx + Math.cos(a) * r * 1.35).toFixed(1) + ' ' + (cy + Math.sin(a) * r * 0.9).toFixed(1);
        }
        out.push(d + 'Z');
      }
      return out;
    }, [lines, seed]);
    return html`
      <svg viewBox="0 0 800 600" className=${className} aria-hidden="true" preserveAspectRatio="xMidYMid slice" fill="none">
        ${paths.map((d, i) => html`<path key=${i} className="contour" d=${d} stroke="currentColor" strokeWidth=${i % 5 === 0 ? 1.6 : 0.9} opacity=${i % 5 === 0 ? 0.9 : 0.55} />`)}
      </svg>`;
  }

  /* Monograma (o logo propio si lo configuras) */
  function Logo({ size = 36 }) {
    if (C.logo) return html`<img src=${C.logo} alt=${S.brand.name} style=${{ height: size }} />`;
    return html`
      <svg width=${size} height=${size} viewBox="0 0 48 48" role="img" aria-label="Monograma IA">
        <rect width="48" height="48" rx="12" fill="#1E1E1E" />
        <g fill="none" stroke="#FCBCD4" strokeWidth="1.1" opacity=".9">
          <path d="M-2 31 C 10 23, 20 37, 32 29 S 44 23, 50 27" />
          <path d="M-2 37 C 10 29, 20 43, 32 35 S 44 29, 50 33" />
          <path d="M-2 43 C 10 35, 20 49, 32 41 S 44 35, 50 39" />
        </g>
        <text x="24" y="28" textAnchor="middle" fontFamily="Source Serif 4, Georgia, serif" fontSize="19" fontWeight="600" fill="#FFFFFF">IA</text>
        <circle cx="38" cy="11" r="2.8" fill="#E13526" />
      </svg>`;
  }

  function Section({ id, eyebrow, title, lead, children, tone = 'cream', className = '' }) {
    const tones = {
      cream: 'bg-cream',
      mint: 'bg-sky-100',
      sky: 'bg-sky-200',
      white: 'bg-white'
    };
    return html`
      <section id=${id} className=${tones[tone] + ' text-ink py-20 sm:py-24 relative overflow-hidden ' + className}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 relative">
          <${Reveal} className="max-w-2xl mb-12">
            ${eyebrow && html`<span className="inline-block bg-sky-700 text-white px-3 py-1 text-sm uppercase tracking-widest font-medium mb-4">${eyebrow}</span>`}
            <h2 className="font-display text-4xl sm:text-6xl leading-[1.02] text-ink">${title}</h2>
            ${lead && html`<p className="mt-5 text-lg text-ink/75 leading-relaxed"><${Rich} text=${lead} /></p>`}
          <//>
          ${children}
        </div>
      </section>`;
  }

  /* ---------- Navegación ---------- */
  function Nav() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('inicio');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const onScroll = () => {
        setScrolled(window.scrollY > 24);
        let cur = S.nav[0][0];
        for (const [id] of S.nav) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 120) cur = id;
        }
        setActive(cur);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const go = () => setOpen(false);
    return html`
      <header className=${'fixed top-0 inset-x-0 z-40 transition-all duration-300 ' + (scrolled || open ? 'bg-white/90 backdrop-blur border-b border-mint-200' : 'bg-transparent')}>
        <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between" aria-label="Principal">
          <a href="#inicio" className="flex items-center gap-3" onClick=${go}>
            <${Logo} />
            <span className="font-display text-lg text-ink">${S.brand.name}</span>
          </a>
          <ul className="hidden lg:flex items-center gap-1">
            ${S.nav.slice(1, -1).map(([id, label]) => html`
              <li key=${id}><a href=${'#' + id}
                className=${'px-3 py-2 text-sm transition-colors ' + (active === id ? 'bg-mint-200 text-ink' : 'text-ink/70 hover:text-ink hover:bg-mint-100')}>${label}</a></li>`)}
            <li><a href="#contacto" className="ml-2 px-5 py-2 text-sm bg-sky-700 text-white font-medium hover:bg-ink transition">Contactar</a></li>
          </ul>
          <button className="lg:hidden p-2 text-ink" aria-expanded=${open} aria-label="Abrir menú" onClick=${() => setOpen(!open)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              ${open ? html`<path d="M6 6l12 12M18 6L6 18" />` : html`<path d="M4 7h16M4 12h16M4 17h16" />`}
            </svg>
          </button>
        </nav>
        ${open && html`
          <ul className="lg:hidden px-5 pb-5 bg-white/95 border-t border-mint-200">
            ${S.nav.map(([id, label]) => html`
              <li key=${id}><a href=${'#' + id} onClick=${go} className="block py-3 text-ink border-b border-mint-100">${label}</a></li>`)}
          </ul>`}
      </header>`;
  }

  /* ---------- Inicio ---------- */
  function Photo({ src, alt, className = '' }) {
    return html`<div className=${'photo overflow-hidden ' + className}><img src=${src} alt=${alt} loading="lazy" className="w-full h-full object-cover" /></div>`;
  }

  function Hero() {
    const h = S.hero;
    const cutout = !!C.photoCutout;
    const src = C.photoCutout || C.photo;
    // La palabra se dibuja dos veces: detrás de la foto y, solo la última línea, delante (cubre la mano)
    const bigText = (front) => html`<div aria-hidden="true" className=${'absolute left-5 sm:left-8 top-20 font-poster uppercase text-sky-700 select-none pointer-events-none ' + (front ? 'z-20' : 'z-0')}
      style=${{ fontSize: 'clamp(5.2rem, 20vw, 16.5rem)', lineHeight: 0.86, clipPath: front ? 'inset(66% 0 0 0)' : undefined }}>
      <span className="block">Por</span><span className="block">Tafo</span><span className="block">Lio</span>
    </div>`;
    return html`
      <section id="inicio" className="relative overflow-hidden bg-sky-200">
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-20 h-[86svh] min-h-[540px] max-h-[820px]">
          <h1 className="sr-only">${S.brand.name}. ${h.title}</h1>

          ${bigText(false)}

          <figure className=${'absolute bottom-0 z-10 ' + (cutout ? 'right-[-17%] sm:right-[11%] w-[104%] sm:w-[74%] max-w-[800px]' : 'right-[4%] sm:right-[12%] w-[56%] sm:w-[38%] max-w-[430px]')}>
            ${src
              ? html`<img src=${src} alt=${'Retrato de ' + S.brand.name} style=${cutout ? { WebkitMaskImage: 'none', maskImage: 'none' } : undefined} className=${'w-full block object-cover ' + (cutout ? 'aspect-[1500/1360] object-bottom' : 'aspect-[3/4] object-top')} />`
              : html`<div className="aspect-[3/4] bg-white flex items-center justify-center"><${Logo} size=${72} /></div>`}
            <svg aria-hidden="true" viewBox="0 0 120 120" className=${'absolute w-[34%] text-white ' + (cutout ? 'left-[6%] top-[8%] w-[17%]' : '-left-[26%] top-[8%]')} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M8 22 L48 36" /><path d="M2 52 L40 54" /><path d="M10 84 L46 70" /><path d="M96 14 L72 36" />
            </svg>
            <div className=${'absolute font-cond uppercase leading-none ' + (cutout ? 'left-0 bottom-[12%] sm:left-[36%] sm:bottom-[8%]' : '-left-[34%] sm:-left-[40%] bottom-[16%]')}>
              <span className="block bg-sky-700 text-white px-3 py-1.5 text-lg sm:text-3xl font-light w-max">Ingeniera sanitaria</span>
              <span className="block bg-sky-700 text-white px-3 py-1.5 mt-1.5 text-lg sm:text-3xl font-semibold w-max ml-6">y ambiental</span>
            </div>
          </figure>
          

          ${cutout && bigText(true)}

          <p aria-hidden="true" className="hidden sm:block absolute right-2 top-28 font-cond uppercase text-sm tracking-[0.55em] text-ink/55 [writing-mode:vertical-rl]">${S.brand.name}</p>
        </div>

        <div className="bg-white">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">${h.eyebrow}</p>
              <p className="font-display text-3xl sm:text-4xl leading-tight text-ink">${S.brand.name}</p>
              <p className="mt-3 text-lg text-ink/75 max-w-xl">${h.subtitle}</p>
              <p className="mt-5 font-display text-2xl text-sky-700 no-justify">“${S.brand.tagline}”</p>
            </div>
            <div>
              <ul className="flex flex-wrap gap-2" aria-label="Ámbitos de trabajo">
                ${h.problems.map((p, i) => html`<li key=${p} className=${'text-sm px-4 py-1.5 ' + (i % 2 ? 'bg-sky-100 text-sky-700' : 'bg-mint-200 text-mint-700')}>${p}</li>`)}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#servicios" className="px-6 py-3 uppercase tracking-widest text-sm font-medium bg-sky-700 text-white font-medium hover:bg-ink transition">Conoce mis servicios</a>
                <a href="#proyectos" className="px-6 py-3 uppercase tracking-widest text-sm font-medium bg-white border border-ink/30 text-ink hover:bg-sky-100 transition">Explora mis proyectos</a>
                <a href="#contacto" className="px-6 py-3 uppercase tracking-widest text-sm font-medium text-ink underline underline-offset-4 decoration-accent">Contactar</a>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-ink/65">
                ${h.facts.map((f) => html`<li key=${f} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent"></span>${f}</li>`)}
              </ul>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ---------- Modal accesible ---------- */
  function Modal({ onClose, label, children, wide }) {
    const ref = useRef(null);
    useEffect(() => {
      const prev = document.activeElement;
      const onKey = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'Tab' && ref.current) {
          const f = ref.current.querySelectorAll('a[href],button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      ref.current && ref.current.focus();
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
        prev && prev.focus && prev.focus();
      };
    }, []);
    return html`
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-ink/50 backdrop-blur-sm" onClick=${onClose}>
        <div ref=${ref} tabIndex="-1" role="dialog" aria-modal="true" aria-label=${label}
          className=${'modal-in bg-cream w-full max-h-[92vh] overflow-y-auto   shadow-2xl outline-none ' + (wide ? 'sm:max-w-md' : 'sm:max-w-3xl')}
          onClick=${(e) => e.stopPropagation()}>
          <div className="sticky top-0 z-10 flex justify-end p-3">
            <button onClick=${onClose} aria-label="Cerrar" className="w-9 h-9 bg-white border border-mint-200 hover:bg-mint-100 flex items-center justify-center shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div className="px-6 sm:px-9 pb-9 -mt-2">${children}</div>
        </div>
      </div>`;
  }

  function Detail({ label, children }) {
    return html`<div className="py-4 border-t border-mint-200">
      <h4 className="font-sans font-semibold text-xs uppercase tracking-widest text-sky-700 mb-1.5">${label}</h4>
      <div className="text-ink/85 leading-relaxed">${children}</div></div>`;
  }
  const List = ({ items }) => html`<ul className="list-disc pl-5 space-y-1">${items.map((x, i) => html`<li key=${i}><${Rich} text=${x} /></li>`)}</ul>`;

  /* ---------- Sobre mí (con segunda foto recortada) + valores + galería ---------- */
  function About() {
    const a = S.about, g = S.gallery;
    const [img, setImg] = useState(null);
    const photo2 = C.photoCutout2 || C.photoCutout || C.photo;
    return html`
      <${React.Fragment}>
        <section id="sobre-mi" className="relative bg-sky-200 text-ink overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-end">
            <div className="relative h-[460px] sm:h-[600px] lg:h-[680px]">
              <div aria-hidden="true" className="absolute left-0 top-2 font-poster uppercase text-sky-700 select-none pointer-events-none"
                style=${{ fontSize: 'clamp(5rem, 17vw, 11.5rem)', lineHeight: 1.04 }}>
                <span className="block">Sobre</span><span className="block">mí</span>
              </div>
              ${photo2 && html`
                <div className="absolute bottom-0 right-0 sm:right-[4%] w-[92%] sm:w-[84%] max-w-[600px] aspect-[1500/1330] overflow-hidden">
                  <img src=${photo2} alt=${'Retrato de ' + S.brand.name + ' en una visita técnica'} className="absolute bottom-0 left-0 w-full block"
                    style=${C.photoCutout2 ? { clipPath: 'polygon(49.3% 35%, 100% 35%, 100% 100%, 46.7% 100%, 46.7% 79%, 26.7% 76%, 26.7% 69%, 40% 63%, 44% 56.5%, 46.7% 55%, 49.3% 55%)' } : undefined} />
                  <div className="absolute left-0 top-[61%] font-cond uppercase leading-none">
                    <span className="block bg-sky-700 text-white px-3 py-1.5 text-base sm:text-xl font-light w-max">Disciplina · Responsabilidad</span>
                    <span className="block bg-sky-700 text-white px-3 py-1.5 mt-1.5 text-base sm:text-xl font-semibold w-max ml-5">y empatía</span>
                  </div>
                </div>`}
            </div>
            <${Reveal} className="pb-12 lg:pb-20">
              <span className="inline-block bg-sky-700 text-white px-3 py-1 text-sm uppercase tracking-widest font-medium mb-4">01 · Quién soy</span>
              <p className="text-xl sm:text-2xl leading-snug font-normal"><${Rich} text=${a.lead} /></p>
              <div className="mt-5 space-y-4 leading-relaxed text-ink/85">
                ${a.paragraphs.map((p, i) => html`<p key=${i}><${Rich} text=${p} /></p>`)}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                ${C.cv ? html`<a href=${C.cv} download className="px-6 py-3 bg-ink text-white text-sm font-medium uppercase tracking-widest hover:bg-sky-700 transition">Descargar hoja de vida</a>`
                       : null}
              </div>
            <//>
          </div>
        </section>

        <${Section} id="valores" tone="white" eyebrow="Mi forma de trabajar" title="Valores">
          <div className="grid md:grid-cols-3 gap-5">
            ${a.values.map(([t, d], i) => html`
              <${Reveal} key=${t} delay=${i * 90} className=${'p-7 ' + ['bg-sky-700 text-white', 'bg-ink text-white', 'bg-sky-200 text-ink'][i % 3]}>
                <h3 className="font-display text-2xl lg:text-3xl break-words">${t}</h3>
                <p className="mt-3 leading-relaxed">${d}</p>
              <//>`)}
          </div>
          <div className="mt-20">
            <${Reveal} className="mb-8 max-w-2xl">
              <h3 className="font-display text-3xl sm:text-5xl">${g.title}</h3>
              <p className="mt-3 text-ink/75"><${Rich} text=${g.lead} /></p>
            <//>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              ${g.items.map((it, i) => html`
                <${Reveal} key=${it.src} delay=${i * 90}>
                  <button onClick=${() => setImg(it)} className=${'photo group block w-full text-left overflow-hidden relative ' + (i % 2 ? 'sm:mt-8' : '')} aria-label=${'Ampliar: ' + it.caption.replace(/\[\[|\]\]/g, '')}>
                    <div className="aspect-[3/4]"><img src=${it.src} alt=${it.alt} loading="lazy" className="w-full h-full object-cover" /></div>
                    <span className="absolute left-0 bottom-3 bg-sky-700 text-white px-3 py-1.5 text-sm uppercase tracking-wide max-w-[90%]"><${Rich} text=${it.caption} /></span>
                  </button>
                <//>`)}
            </div>
          </div>
          ${img && html`
            <${Modal} onClose=${() => setImg(null)} label=${img.caption} wide=${true}>
              <img src=${img.src} alt=${img.alt} className="w-full" />
              <p className="mt-3 text-center text-ink/80 no-justify"><${Rich} text=${img.caption} /></p>
            <//>`}
        <//>
      <//>`;
  }

  /* ---------- Formación y trayectoria ---------- */
  function Timeline() {
    const t = S.timeline;
    return html`
      <${Section} id="trayectoria" tone="mint" eyebrow="Trayectoria" title=${t.title} lead=${t.lead}>
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-14">
          <div className="space-y-10">
            <${Reveal}>
              <h3 className="font-display text-2xl bg-sky-700 text-white px-4 py-2 mb-5">${t.educationTitle}</h3>
              ${t.education.map((e) => html`
                <div key=${e.title} className="flex gap-4">
                  <span className="font-display text-xl text-sky-700 w-28 shrink-0">${e.years}</span>
                  <div><p className="font-medium text-lg no-justify">${e.title}</p><p className="text-ink/75 no-justify">${e.place}</p></div>
                </div>`)}
            <//>
            <${Reveal} delay=${100}>
              <h3 className="font-display text-2xl bg-sky-700 text-white px-4 py-2 mb-5">${t.interestsTitle}</h3>
              <ul className="space-y-2 list-disc pl-5 text-ink/85 no-justify">${t.interests.map((x) => html`<li key=${x}>${x}</li>`)}</ul>
            <//>
          </div>
          <${Reveal} delay=${80}>
            <h3 className="font-display text-2xl bg-sky-700 text-white px-4 py-2 mb-5">${t.experienceTitle}</h3>
            <div className="space-y-7">
              ${t.experience.map((e) => html`
                <div key=${e.title} className="flex gap-4 sm:gap-6">
                  <span className="font-display text-2xl text-sky-700 w-16 shrink-0">${e.year}</span>
                  <div>
                    <p className="font-semibold text-lg uppercase tracking-wide no-justify">${e.title}</p>
                    <p className="mt-1 text-ink/85">${e.text}</p>
                    ${e.bullets && html`<ul className="mt-2 space-y-1 list-disc pl-5 text-ink/80 no-justify">${e.bullets.map((b) => html`<li key=${b}>${b}</li>`)}</ul>`}
                  </div>
                </div>`)}
            </div>
          <//>
        </div>
      <//>`;
  }

  /* ---------- Enfoque ---------- */
  function Specialization() {
    const s = S.specialization;
    const bgs = ['bg-sky-700 text-white border-sky-700', 'bg-mint-100 border-mint-200', 'bg-sky-100 border-sky-200'];
    return html`
      <${Section} id="enfoque" tone="white" eyebrow="02 · Especialización" title=${s.title} lead=${s.intro}>
        <div className="grid md:grid-cols-3 gap-5">
          ${s.levels.map((l, i) => html`
            <${Reveal} key=${l.tag} delay=${i * 100} className=${'p-7 border ' + bgs[i]}>
              <p className=${'font-sans font-semibold text-xs tracking-widest uppercase ' + (i === 0 ? 'text-mint-200' : 'text-sky-700')}>${l.tag}</p>
              <h3 className="mt-3 font-display text-2xl">${l.title}</h3>
              <p className=${'mt-3 leading-relaxed ' + (i === 0 ? 'text-white/90' : 'text-ink/75')}>${l.text}</p>
            <//>`)}
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <${Reveal}>
            <h3 className="font-display text-xl mb-4">Campos de aplicación</h3>
            <ul className="flex flex-wrap gap-2">${s.fields.map((f) => html`<li key=${f} className="px-4 py-2 bg-mint-200 text-mint-700 text-sm font-medium">${f}</li>`)}</ul>
          <//>
          <${Reveal} delay=${100}>
            <h3 className="font-display text-xl mb-4">Herramientas</h3>
            <ul className="flex flex-wrap gap-2">${s.tools.map(([n, r]) => html`<li key=${n} className="px-4 py-2 bg-sky-100 text-ink text-sm"><strong>${n}</strong> <span className="text-ink/60">· ${r}</span></li>`)}</ul>
            ${s.toolsNote && html`<p className="mt-3 text-sm"><${Rich} text=${s.toolsNote} /></p>`}
          <//>
        </div>
      <//>`;
  }

  /* ---------- Propuesta de valor ---------- */
  function Value() {
    const v = S.value;
    return html`
      <${Section} id="valor" tone="sky" eyebrow="03 · Propuesta de valor" title=${v.title} lead=${v.lead}>
        <${Contours} className="absolute -right-40 top-0 w-[900px] max-w-none text-sky-200 opacity-70 pointer-events-none" lines=${10} seed=${5} />
        <div className="relative grid sm:grid-cols-2 gap-5">
          ${v.blocks.map(([t, d], i) => html`
            <${Reveal} key=${t} delay=${i * 90} className="p-7 bg-white/90 border border-sky-200 shadow-sm">
              <h3 className="font-display text-xl text-sky-700">${t}</h3>
              <p className="mt-2 text-ink/80 leading-relaxed">${d}</p>
            <//>`)}
        </div>
        <p className="relative mt-8 text-sm text-ink/70 max-w-2xl border-l-2 border-accent pl-4">${v.note}</p>
      <//>`;
  }

  /* ---------- Servicios ---------- */
  function Services() {
    const [level, setLevel] = useState(1);
    const [sel, setSel] = useState(null);
    const list = S.services.filter((s) => s.level === level);
    return html`
      <${Section} id="servicios" eyebrow="04 · Servicios" title="Qué puedo ofrecer hoy y hacia dónde voy"
        lead="Cinco servicios principales según mi nivel real: tres que puedo hacer ahora y dos con apoyo profesional. Además, una hoja de ruta de lo que incorporaré con más formación.">
        <div role="tablist" aria-label="Nivel de servicio" className="flex flex-wrap gap-2 mb-8">
          ${[1, 2, 3].map((n) => html`
            <button key=${n} role="tab" aria-selected=${level === n} onClick=${() => setLevel(n)}
              className=${'px-5 py-3 text-left transition border ' + (level === n ? 'bg-sky-700 text-white border-sky-700' : 'bg-white border-mint-200 hover:border-sky-300')}>
              <span className="block font-medium">${S.serviceLevels[n].label}</span>
              <span className=${'block text-xs ' + (level === n ? 'text-sky-100' : 'text-ink/60')}>${S.serviceLevels[n].desc}</span>
            </button>`)}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${list.map((s, i) => html`
            <${Reveal} key=${s.name} delay=${i * 70}>
              <button onClick=${() => setSel(s)} className="group text-left h-full w-full p-6 bg-white border border-mint-200 hover:border-sky-300 hover:shadow-lg hover:-translate-y-0.5 transition">
                <span className=${'inline-block w-10 h-1.5 mb-4 ' + ['bg-mint-300', 'bg-sky-300', 'bg-accent/60'][level - 1]}></span>
                <h3 className="font-display text-xl text-ink">${s.name}</h3>
                <p className="mt-2 text-ink/70 text-sm leading-relaxed">${s.problem}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 group-hover:gap-2 transition-all">Ver detalle <span aria-hidden="true">→</span></span>
              </button>
            <//>`)}
        </div>
        <${Reveal} className="mt-10 p-6 bg-mint-100 border border-mint-200">
          <h3 className="font-display text-lg text-mint-700">Límites de mi práctica</h3>
          <ul className="mt-2 text-ink/80 list-disc pl-5 space-y-1">${S.servicesLimits.map((l) => html`<li key=${l}>${l}</li>`)}</ul>
        <//>
        ${sel && html`
          <${Modal} onClose=${() => setSel(null)} label=${sel.name}>
            <p className="font-sans font-semibold text-xs uppercase tracking-widest text-accent">${S.serviceLevels[sel.level].label}</p>
            <h3 className="font-display text-3xl text-ink mt-1 mb-4">${sel.name}</h3>
            <${Detail} label="Problema que atiende"><${Rich} text=${sel.problem} /><//>
            <${Detail} label="Público"><${Rich} text=${sel.audience} /><//>
            <${Detail} label="Alcance"><${Rich} text=${sel.scope} /><//>
            <${Detail} label="Actividades"><${List} items=${sel.activities} /><//>
            <${Detail} label="Entregables posibles"><${List} items=${sel.deliverables} /><//>
            <${Detail} label="Herramientas"><${Rich} text=${sel.tools.join(' · ')} /><//>
            <${Detail} label="Requisitos y condiciones"><${Rich} text=${sel.requirements} /><//>
            <a href="#contacto" onClick=${() => setSel(null)} className="mt-4 inline-block px-6 py-3 uppercase tracking-widest text-sm font-medium bg-sky-700 text-white font-medium hover:bg-ink transition">Consultar este servicio</a>
          <//>`}
      <//>`;
  }

  /* ---------- Cumplimiento normativo ---------- */
  function Compliance() {
    const c = S.compliance;
    const tint = ['bg-sky-700 text-white', 'bg-ink text-white', 'bg-sky-200 text-ink'];
    return html`
      <${Section} id="normativa" tone="white" eyebrow="Marco legal" title=${c.title} lead=${c.lead}>
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
          <div className="grid gap-4">
            ${c.principles.map(([t, d], i) => html`
              <${Reveal} key=${t} delay=${i * 90} className=${'p-6 ' + tint[i % 3]}>
                <h3 className="font-display text-2xl">${t}</h3>
                <p className="mt-2 leading-relaxed">${d}</p>
              <//>`)}
          </div>
          <${Reveal} delay=${100}>
            <h3 className="font-display text-2xl bg-sky-700 text-white px-4 py-2">${c.frameworkTitle}</h3>
            <ul className="divide-y divide-sky-200 border border-sky-200 border-t-0 no-justify">
              ${c.framework.map(([a, b]) => html`
                <li key=${a} className="p-4 grid sm:grid-cols-[13rem_1fr] gap-1 sm:gap-4">
                  <span className="font-semibold uppercase tracking-wide text-sky-700">${a}</span>
                  <span className="text-ink/85">${b}</span>
                </li>`)}
            </ul>
            ${c.note && html`<p className="mt-4 text-sm text-ink/75 no-justify"><${Rich} text=${c.note} /></p>`}
          <//>
        </div>
      <//>`;
  }

  /* ---------- Proyectos ---------- */
  function Projects() {
    const [type, setType] = useState('Todos');
    const [area, setArea] = useState('Todas');
    const [sel, setSel] = useState(null);
    const [zoom, setZoom] = useState(null);
    const list = S.projects.filter((p) => (type === 'Todos' || p.type === type) && (area === 'Todas' || p.areas.includes(area)));
    const chip = (active) => 'px-4 py-2 text-sm border transition ' + (active ? 'bg-sky-700 text-white border-sky-700' : 'bg-white border-mint-200 hover:border-sky-300');
    const tints = ['bg-mint-200 text-mint-300', 'bg-sky-200 text-sky-300', 'bg-mint-100 text-mint-300', 'bg-sky-100 text-sky-300'];
    return html`
      <${Section} id="proyectos" tone="mint" eyebrow="05 · Evidencia" title="Proyectos"
        lead="Proyectos de investigación, de aula y de campo en los que he trabajado durante mi formación.">
        <div className="space-y-3 mb-8" aria-label="Filtros de proyectos">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
            ${S.projectTypes.map((t) => html`<button key=${t} aria-pressed=${type === t} className=${chip(type === t)} onClick=${() => setType(t)}>${t}</button>`)}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por área">
            ${['Todas', ...S.projectAreas].map((t) => html`<button key=${t} aria-pressed=${area === t} className=${chip(area === t)} onClick=${() => setArea(t)}>${t}</button>`)}
          </div>
        </div>
        ${list.length === 0 && html`<p className="py-10 text-ink/60">No hay proyectos con esa combinación de filtros.</p>`}
        <div className="grid md:grid-cols-2 gap-6" aria-live="polite">
          ${list.map((p, i) => html`
            <${Reveal} key=${p.id} delay=${i * 80}>
              <article className="photo h-full flex flex-col overflow-hidden border border-mint-200 bg-white hover:shadow-xl transition">
                <div className=${'relative overflow-hidden ' + (p.imageFit === 'contain' ? 'h-60 bg-white border-b border-sky-200' : 'h-44 ' + tints[i % 4].split(' ')[0])}>
                  ${p.image
                    ? html`<button type="button" onClick=${() => setZoom(p)} className="block w-full h-full" aria-label=${'Ampliar imagen: ' + p.title}><img src=${p.image} alt=${p.imageAlt || ('Imagen de ' + p.title)} loading="lazy" className=${'w-full h-full ' + (p.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover object-top')} /></button>`
                    : html`<${Contours} className=${'absolute inset-0 w-full h-full ' + tints[i % 4].split(' ')[1]} lines=${9} seed=${i * 2 + 1} />`}
                  <span className="absolute left-4 bottom-3 font-sans font-semibold text-xs px-3 py-1 bg-white/95 text-ink shadow-sm">${p.type}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl text-ink leading-snug">${p.title}</h3>
                  <p className="mt-2 text-sm text-ink/70 flex-1">${p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">${p.areas.map((a) => html`<span key=${a} className="text-xs px-2.5 py-1 bg-sky-100 text-sky-700">${a}</span>`)}</div>
                  ${p.detail ? html`<button onClick=${() => setSel(p)} className="mt-5 self-start text-sm font-medium text-sky-700 hover:underline underline-offset-4">Ver caso de estudio →</button>` : html`<p className="mt-5 text-sm font-semibold uppercase tracking-wide text-sky-700 no-justify">${p.status}</p>`}
                </div>
              </article>
            <//>`)}
        </div>
        ${zoom && html`<${Modal} onClose=${() => setZoom(null)} label=${zoom.title}>
            <img src=${zoom.image} alt=${zoom.imageAlt || zoom.title} className="w-full bg-white" />
            <p className="mt-3 text-center text-ink/80 no-justify">${zoom.title}</p>
          <//>`}
        ${sel && html`
          <${Modal} onClose=${() => setSel(null)} label=${sel.title}>
            ${sel.image && html`<img src=${sel.image} alt=${'Imagen de ' + sel.title} className="w-full max-h-80 object-cover object-top mb-5" />`}
            <p className="font-sans font-semibold text-xs uppercase tracking-widest text-accent">${sel.type} · ${sel.status}</p>
            <h3 className="font-display text-3xl text-ink mt-1 mb-4 leading-tight">${sel.title}</h3>
            <${Detail} label="Contexto y problemática"><${Rich} text=${sel.context} /><//>
            <${Detail} label="Objetivo"><${Rich} text=${sel.objective} /><//>
            <${Detail} label="Mi participación"><${Rich} text=${sel.role} /><//>
            <${Detail} label="Metodología"><${Rich} text=${sel.method} /><//>
            <${Detail} label="Herramientas"><${Rich} text=${sel.tools.join(' · ')} /><//>
            <${Detail} label="Resultados o avances"><${Rich} text=${sel.results} /><//>
            <${Detail} label="Aprendizajes"><${Rich} text=${sel.learnings} /><//>
            <${Detail} label="Valor potencial"><${Rich} text=${sel.value} /><//>
            ${sel.link && html`<a href=${sel.link} target="_blank" rel="noopener" className="mt-4 inline-block px-6 py-3 uppercase tracking-widest text-sm font-medium bg-sky-700 text-white">Ver documento del proyecto</a>`}
          <//>`}
      <//>`;
  }

  /* ---------- Metodología ---------- */
  function Method() {
    const m = S.method;
    const dots = ['bg-mint-300', 'bg-sky-300', 'bg-mint-300', 'bg-sky-300'];
    return html`
      <${Section} id="metodologia" tone="white" eyebrow="06 · Cómo trabajo" title=${m.title} lead=${m.lead}>
        <ol className="grid md:grid-cols-4 gap-5">
          ${m.steps.map(([n, t, d], i) => html`
            <${Reveal} as="li" key=${n} delay=${i * 110} className="relative p-6 bg-cream border border-mint-200">
              <span className=${'inline-flex items-center justify-center w-10 h-10 font-sans font-semibold text-sm text-ink ' + dots[i]}>${n}</span>
              <h3 className="font-display text-xl text-ink mt-4">${t}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">${d}</p>
            <//>`)}
        </ol>
        <${Reveal} className="mt-16">
          <h3 className="font-display text-2xl sm:text-3xl mb-6">${m.clientTitle}</h3>
          <ol className="grid md:grid-cols-4 gap-4">
            ${m.clientFlow.map(([n, t, d]) => html`
              <li key=${n} className="p-5 bg-sky-50 border border-sky-200">
                <span className="text-xs font-semibold uppercase tracking-widest text-sky-700">Paso ${n}</span>
                <h4 className="font-display text-lg mt-1">${t}</h4>
                <p className="mt-1 text-sm text-ink/70">${d}</p>
              </li>`)}
          </ol>
        <//>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <${Reveal} className="p-6 bg-mint-100 border border-mint-200">
            <h3 className="font-display text-xl">${m.modality.title}</h3>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-ink/80">${m.modality.items.map((x, i) => html`<li key=${i}><${Rich} text=${x} /></li>`)}</ul>
          <//>
          <${Reveal} delay=${100} className="p-6 bg-sky-100 border border-sky-200">
            <h3 className="font-display text-xl">${m.rates.title}</h3>
            <p className="mt-3 text-ink/80">${m.rates.text}</p>
            ${m.rates.note && html`<p className="mt-3 text-sm"><${Rich} text=${m.rates.note} /></p>`}
          <//>
        </div>
      <//>`;
  }

  /* ---------- Visión ---------- */
  function Vision() {
    const v = S.vision;
    return html`
      <${Section} id="vision" tone="sky" eyebrow="07 · Hacia dónde voy" title=${v.title}>
        <${Contours} className="absolute -left-40 -bottom-20 w-[900px] max-w-none text-mint-200 opacity-80 pointer-events-none" lines=${10} seed=${8} />
        <${Reveal} className="relative max-w-3xl">
          <p className="font-sans font-semibold text-xs uppercase tracking-widest text-accent mb-3">Misión</p>
          <p className="font-display text-2xl sm:text-3xl leading-snug">${v.mission}</p>
        <//>
        <div className="relative mt-12 grid md:grid-cols-3 gap-5">
          ${v.horizons.map(([t, d], i) => html`
            <${Reveal} key=${t} delay=${i * 100} className="p-6 bg-white/90 border border-sky-200">
              <h3 className="font-display text-xl text-sky-700">${t}</h3>
              <p className="mt-2 text-ink/80 leading-relaxed"><${Rich} text=${d} /></p>
            <//>`)}
        </div>
      <//>`;
  }

  /* ---------- Contacto ---------- */
  function Contact() {
    const [f, setF] = useState({ name: '', email: '', topic: S.contact.topics[0], msg: '', hp: '' });
    const [status, setStatus] = useState(null);
    const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

    const submit = async (e) => {
      e.preventDefault();
      if (f.hp) return;
      if (C.formEndpoint) {
        setStatus({ t: 'info', m: 'Enviando…' });
        try {
          const r = await fetch(C.formEndpoint, {
            method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name: f.name, email: f.email, motivo: f.topic, message: f.msg, _subject: 'Portafolio: ' + f.topic + ' · ' + f.name, _template: 'table' })
          });
          const res = await r.json().catch(() => ({}));
          if (!r.ok || res.success === false || res.success === 'false') throw new Error(res.message || 'error');
          setStatus({ t: 'ok', m: 'Mensaje enviado. Gracias por escribir.' });
          setF({ ...f, name: '', email: '', msg: '' });
        } catch { setStatus({ t: 'err', m: 'No se pudo enviar. Intenta de nuevo o escribe directamente al correo.' }); }
      } else if (C.whatsapp) {
        const num = String(C.whatsapp).replace(/\D/g, '');
        const text = `Hola Isabella, soy ${f.name} (${f.email}). Motivo: ${f.topic}.\n\n${f.msg}`;
        window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
        setStatus({ t: 'info', m: 'Se abrió WhatsApp con tu mensaje listo. Pulsa enviar para que me llegue.' });
      } else if (C.email) {
        const body = encodeURIComponent(`${f.msg}\n\n— ${f.name} (${f.email})`);
        window.location.href = `mailto:${C.email}?subject=${encodeURIComponent(f.topic)}&body=${body}`;
        setStatus({ t: 'info', m: 'Se abrió tu programa de correo con el mensaje listo para enviar.' });
      } else {
        setStatus({ t: 'err', m: 'El envío desde el formulario no está disponible por ahora. Intenta de nuevo más tarde.' });
      }
    };

    const field = 'w-full px-4 py-3 bg-white border border-mint-200 focus:border-sky-500 focus:outline-none';
    const links = [
      C.whatsapp && { label: 'WhatsApp', href: 'https://wa.me/' + String(C.whatsapp).replace(/\D/g, ''), text: 'Escríbeme por WhatsApp' },
      C.email && { label: 'Correo', href: 'mailto:' + C.email, text: C.email },
      C.linkedin && { label: 'LinkedIn', href: C.linkedin, text: 'Ver perfil' },
      ...C.otherLinks.map((l) => ({ label: l.label, href: l.href, text: l.href }))
    ].filter(Boolean);

    return html`
      <${Section} id="contacto" tone="mint" eyebrow="08 · Hablemos" title=${S.contact.title} lead=${S.contact.lead}>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <${Reveal} className="space-y-6">
            <div>
              <p className="font-sans font-semibold text-xs uppercase tracking-widest text-sky-700">Ubicación</p>
              <p className="mt-1 text-lg">${C.location}</p>
            </div>
            <ul className="space-y-3">
              ${links.map((l) => html`<li key=${l.label}><span className="block font-sans font-semibold text-xs uppercase tracking-widest text-sky-700">${l.label}</span>
                <a className="text-lg text-sky-700 underline underline-offset-4 break-all" href=${l.href} target=${l.href.startsWith('http') ? '_blank' : undefined} rel="noopener">${l.text}</a></li>`)}
            </ul>
            ${C.cv && html`<a href=${C.cv} download className="inline-block px-6 py-3 uppercase tracking-widest text-sm font-medium bg-white border border-sky-300 hover:bg-sky-100 transition text-sm font-medium">Descargar hoja de vida (PDF)</a>`}
          <//>
          <${Reveal} delay=${100}>
            <form onSubmit=${submit} className="space-y-4 p-6 sm:p-8 bg-white border border-mint-200 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block text-sm">Nombre<input required className=${field + ' mt-1'} value=${f.name} onChange=${set('name')} autoComplete="name" /></label>
                <label className="block text-sm">Correo<input required type="email" className=${field + ' mt-1'} value=${f.email} onChange=${set('email')} autoComplete="email" /></label>
              </div>
              <label className="block text-sm">Motivo
                <select className=${field + ' mt-1'} value=${f.topic} onChange=${set('topic')}>${S.contact.topics.map((t) => html`<option key=${t}>${t}</option>`)}</select></label>
              <label className="block text-sm">Mensaje<textarea required rows="5" className=${field + ' mt-1'} value=${f.msg} onChange=${set('msg')}></textarea></label>
              <input type="text" tabIndex="-1" autoComplete="off" value=${f.hp} onChange=${set('hp')} className="hidden" aria-hidden="true" />
              <p className="text-xs text-ink/70 no-justify">${S.contact.privacy}</p>
              <button type="submit" className="px-6 py-3 uppercase tracking-widest text-sm font-medium bg-sky-700 text-white font-medium hover:bg-ink transition">${C.whatsapp && !C.formEndpoint ? 'Enviar por WhatsApp' : 'Enviar mensaje'}</button>
              ${status && html`<p role="status" className=${'text-sm ' + (status.t === 'err' ? 'text-red-700' : status.t === 'ok' ? 'text-mint-700' : 'text-sky-700')}>${status.m}</p>`}
            </form>
          <//>
        </div>
        <${Reveal} className="mt-12 p-6 sm:p-8 bg-white border border-mint-300">
          <h3 className="font-display text-xl sm:text-2xl">${S.contact.ethics.title}</h3>
          <ul className="mt-4 grid md:grid-cols-2 gap-x-8 gap-y-3 text-ink/80 text-sm leading-relaxed list-disc pl-5">
            ${S.contact.ethics.items.map((x, i) => html`<li key=${i}>${x}</li>`)}
          </ul>
        <//>
      <//>`;
  }

  function Footer() {
    return html`
      <footer className="bg-white border-t border-mint-200 text-ink/70 py-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm">
          <div className="flex items-center gap-3"><${Logo} size=${30} /><span>${S.brand.name} · ${S.brand.descriptor}</span></div>
          <p className="font-display italic text-ink/80">${S.brand.tagline}</p>
          <p>© ${new Date().getFullYear()}</p>
        </div>
      </footer>`;
  }

  function App() {
    return html`<${React.Fragment}>
      <a href="#sobre-mi" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2">Saltar al contenido</a>
      <${Nav} /><main><${Hero} /><${About} /><${Timeline} /><${Specialization} /><${Value} /><${Services} /><${Compliance} /><${Projects} /><${Method} /><${Vision} /><${Contact} /></main><${Footer} />
    <//>`;
  }

  ReactDOM.createRoot(document.getElementById('root')).render(html`<${App} />`);
})();

