// editorial.jsx — Editorial preview of "how it works"
// Each card is a scaled-down rendering of the full desktop hero composition
// (person photo + branded UI). Shared image-slot IDs mean photos drop once
// (on the desktop hero) and propagate to every preview automatically.

// ─── Map slide ID → desktop hero component ─────────────────────────────
// Resolved lazily through `window` because component files are separate
// <script> blocks and module load order is not guaranteed.

const HERO_FOR_ID = {
  'diag-student': () => window.DiagnosticHeroScreen,
  'tr-tutor':     () => window.TutorRankingScreen,
  'zp-tutor':     () => window.ZoomPlanScreen,
};

function ScaledHero({ slideId, w }) {
  const Component = HERO_FOR_ID[slideId] && HERO_FOR_ID[slideId]();
  const h = Math.round(w * 900 / 1440);
  const scale = w / 1440;
  return (
    <div style={{
      width: w, height: h,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 14,
      background: ILL.bg,
      boxShadow: '0 2px 14px rgba(18,26,43,0.10)',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 1440, height: 900,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',  // prevents stray interaction inside scaled hero
      }}>
        {Component ? <Component /> : null}
      </div>
    </div>
  );
}

// HeroSlice — crops a vertical band of a desktop hero. If `h` is given,
// the slice is height-driven (scales to fit `h`, centered horizontally,
// trims at the sides). Otherwise it's width-driven (aspect preserved).
function HeroSlice({ slideId, w, h, y1, y2, radius = 12 }) {
  const Component = HERO_FOR_ID[slideId] && HERO_FOR_ID[slideId]();
  const sourceH = y2 - y1;
  let scale, sliceH, left;
  if (h != null) {
    scale = h / sourceH;
    sliceH = h;
    const renderedW = 1440 * scale;
    left = (w - renderedW) / 2;  // center horizontally; negative when cropped
  } else {
    scale = w / 1440;
    sliceH = Math.round(sourceH * scale);
    left = 0;
  }
  return (
    <div style={{
      width: w, height: sliceH,
      position: 'relative', overflow: 'hidden',
      borderRadius: radius,
      background: ILL.bg,
      boxShadow: '0 2px 14px rgba(18,26,43,0.08)',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute',
        top: -y1 * scale, left,
        width: 1440, height: 900,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',
      }}>
        {Component ? <Component /> : null}
      </div>
    </div>
  );
}

const EDITORIAL_SLIDES = [
  {
    id: 'diag-student',
    num: '01',
    label: 'Diagnose',
    caption: 'A 28-skill diagnostic finds every gap costing points.',
    placeholder: 'Drop a photo · student taking the diagnostic',
    totemImg: 'assets/step1-diagnose.png',
  },
  {
    id: 'tr-tutor',
    num: '02',
    label: 'Rank',
    caption: 'We sort gaps by score impact so the highest-leverage skills come first.',
    placeholder: 'Drop a photo · tutor reviewing ranked weaknesses',
    totemImg: 'assets/step2-rank.png',
  },
  {
    id: 'zp-tutor',
    num: '03',
    label: 'Plan',
    caption: 'We schedule tutoring sessions to cover each topic in depth.',
    placeholder: 'Drop a photo · tutor on the Zoom call',
    totemImg: 'assets/step3-plan.png',
  },
];

const ADVANCE_MS = 4500;

function EditorialCarousel({ width = 346, gap = 16, Slide = EditorialSlide }) {
  const [idx, setIdx] = React.useState(0);
  const [drag, setDrag] = React.useState(null); // { startX, dx } | null
  const trackRef = React.useRef(null);

  // auto-advance (pause while user is dragging)
  React.useEffect(() => {
    if (drag) return;
    const t = setTimeout(() => {
      setIdx(i => (i + 1) % EDITORIAL_SLIDES.length);
    }, ADVANCE_MS);
    return () => clearTimeout(t);
  }, [idx, drag]);

  const onDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDrag({ startX: e.clientX, dx: 0 });
  };
  const onMove = (e) => {
    if (!drag) return;
    setDrag(d => ({ ...d, dx: e.clientX - d.startX }));
  };
  const onUp = (e) => {
    if (!drag) return;
    const threshold = 50;
    let next = idx;
    if (drag.dx > threshold && idx > 0) next = idx - 1;
    else if (drag.dx < -threshold && idx < EDITORIAL_SLIDES.length - 1) next = idx + 1;
    setIdx(next);
    setDrag(null);
  };

  const slideStep = width + gap;
  const baseX = -(idx * slideStep);
  const translate = baseX + (drag ? drag.dx : 0);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      minHeight: 0, overflow: 'hidden',
    }}>
      {/* track viewport */}
      <div
        style={{
          position: 'relative',
          overflow: 'visible',
          touchAction: 'pan-y',
          cursor: drag ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex', gap,
            transform: `translateX(${translate}px)`,
            transition: drag ? 'none' : 'transform 480ms cubic-bezier(0.22, 0.8, 0.2, 1)',
            willChange: 'transform',
          }}
        >
          {EDITORIAL_SLIDES.map((s, i) => (
            <Slide
              key={s.id}
              slide={s}
              width={width}
              active={i === idx}
            />
          ))}
        </div>
      </div>

      {/* pagination dots */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 8,
        padding: '20px 0 6px',
      }}>
        {EDITORIAL_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === idx ? 22 : 6,
              height: 6, padding: 0,
              borderRadius: 100,
              background: i === idx ? ILL.green : ILL.cardLine,
              border: 'none',
              transition: 'width 300ms ease, background 200ms',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function EditorialSlide({ slide, width, active }) {
  return (
    <div style={{
      flexShrink: 0, width,
      display: 'flex', flexDirection: 'column',
      opacity: active ? 1 : 0.5,
      transition: 'opacity 400ms ease',
    }}>
      <ScaledHero slideId={slide.id} w={width} />

      {/* label + caption block */}
      <div style={{ margin: '18px 4px 0' }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10.5,
          letterSpacing: '0.22em', color: ILL.green,
          textTransform: 'uppercase', fontWeight: 500,
          marginBottom: 4,
        }}>
          {slide.num}
        </div>
        <h3 style={{
          margin: 0,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 500, fontSize: 26, lineHeight: 1.12,
          letterSpacing: '-0.012em', color: ILL.ink,
          fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
        }}>
          {slide.label}
        </h3>
        <p style={{
          margin: '6px 0 0',
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: 13, lineHeight: 1.5, color: ILL.ink2,
        }}>
          {slide.caption}
        </p>
      </div>
    </div>
  );
}

function EditorialScreen() {
  return (
    <PhoneFrame>
      <AppHeader progress={0.62} />

      <div style={{
        flex: 1, overflow: 'hidden',
        padding: '32px 22px 0',
        display: 'flex', flexDirection: 'column',
        background: ILL.bg,
      }}>
        {/* headline */}
        <h1 style={{
          margin: '0 0 22px',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 500, fontSize: 23, lineHeight: 1.18,
          letterSpacing: '-0.012em', color: ILL.ink,
          fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
          textWrap: 'pretty',
        }}>
          3 steps to a personalized SAT plan that{' '}
          <GreenEm>actually gets their score up</GreenEm>.
        </h1>

        {/* carousel */}
        <EditorialCarousel />
      </div>

      <StickyCTA>Start their diagnostic</StickyCTA>
    </PhoneFrame>
  );
}

Object.assign(window, { EditorialScreen, EditorialStaticScreen, EditorialTotemScreen });

// ════════════════════════════════════════════════════════════════════════
// EditorialStaticScreen — non-carousel version, Hims-style asymmetric collage.
// One hero photo on top, two smaller side-by-side below. All visible at once.
// ════════════════════════════════════════════════════════════════════════

function StaticCard({ slide, w, labelSize = 18, captionSize = 11.5 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ScaledHero slideId={slide.id} w={w} />
      <div style={{ margin: '10px 2px 0' }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9.5,
          letterSpacing: '0.22em', color: ILL.green,
          textTransform: 'uppercase', fontWeight: 500,
          marginBottom: 2,
        }}>
          {slide.num}
        </div>
        <h3 style={{
          margin: 0,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 500, fontSize: labelSize, lineHeight: 1.1,
          letterSpacing: '-0.012em', color: ILL.ink,
          fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
        }}>
          {slide.label}
        </h3>
        <p style={{
          margin: '4px 0 0',
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          fontSize: captionSize, lineHeight: 1.4, color: ILL.ink2,
        }}>
          {slide.caption}
        </p>
      </div>
    </div>
  );
}

function EditorialStaticScreen() {
  const [hero, ...rest] = EDITORIAL_SLIDES;
  // Hero card matches mobile inner width 346; smaller cards split half each minus gap.
  return (
    <PhoneFrame>
      <AppHeader progress={0.62} />

      <div style={{
        flex: 1, overflow: 'hidden',
        padding: '26px 22px 0',
        display: 'flex', flexDirection: 'column',
        background: ILL.bg,
      }}>
        {/* headline */}
        <h1 style={{
          margin: '0 0 20px',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 500, fontSize: 22, lineHeight: 1.16,
          letterSpacing: '-0.012em', color: ILL.ink,
          fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
          textWrap: 'pretty',
        }}>
          3 steps to a personalized SAT plan that{' '}
          <GreenEm>actually gets their score up</GreenEm>.
        </h1>

        {/* hero card (Step 01) */}
        <StaticCard slide={hero} w={346} labelSize={26} captionSize={13} />

        {/* two smaller cards side by side */}
        <div style={{
          marginTop: 16,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        }}>
          <StaticCard slide={rest[0]} w={168} labelSize={18} captionSize={11.5} />
          <StaticCard slide={rest[1]} w={168} labelSize={18} captionSize={11.5} />
        </div>

        <div style={{ flex: 1, minHeight: 8 }} />
      </div>

      <StickyCTA>Start their diagnostic</StickyCTA>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════════════
// EditorialTotemScreen — tall vertical card per step.
// Heading → person photo → caption → UI screenshot. Whole card swipes
// together. Fills the available space; no half-empty space.
// ════════════════════════════════════════════════════════════════════════

function EditorialTotemSlide({ slide, width, active }) {
  // Edge-to-edge image with the step heading above it (overlay would cover
  // faces, especially the tutor in the slide 3 Zoom composition).
  return (
    <div style={{
      flexShrink: 0, width,
      display: 'flex', flexDirection: 'column',
      opacity: active ? 1 : 0.55,
      transition: 'opacity 400ms ease',
    }}>
      {/* heading above the image */}
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 10,
        padding: '14px 22px 12px',
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 11,
          letterSpacing: '0.22em', color: ILL.green,
          fontWeight: 500, textTransform: 'uppercase',
        }}>Step {slide.num}</span>
        <h2 style={{
          margin: 0,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 500, fontSize: 22, lineHeight: 1.1,
          letterSpacing: '-0.012em', color: ILL.ink,
          fontVariationSettings: '"opsz" 72, "SOFT" 0, "WONK" 0',
        }}>{slide.label}</h2>
      </div>

      {/* image — edge to edge, natural aspect */}
      <img
        src={slide.totemImg}
        alt={`Step ${slide.num} — ${slide.label}`}
        draggable={false}
        style={{
          display: 'block',
          width: '100%', height: 'auto',
          userSelect: 'none',
          WebkitUserDrag: 'none',
        }}
      />

      {/* caption */}
      <p style={{
        margin: '14px 22px 0',
        fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
        fontSize: 13, lineHeight: 1.5, color: ILL.ink2,
      }}>
        {slide.caption}
      </p>
    </div>
  );
}

function EditorialTotemScreen() {
  return (
    <PhoneFrame>
      <AppHeader progress={0.62} />

      <div style={{
        flex: 1, overflow: 'hidden',
        padding: 0,
        display: 'flex', flexDirection: 'column',
        background: ILL.bg,
      }}>
        <EditorialCarousel Slide={EditorialTotemSlide} width={390} gap={0} />
      </div>

      <StickyCTA>Start their diagnostic</StickyCTA>
    </PhoneFrame>
  );
}
