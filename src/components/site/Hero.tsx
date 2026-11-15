import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { img } from "./data";
import { VideoModal } from "./VideoModal";

/**
 * Two-slide hero recreated from the original layered slider. Every layer uses the
 * original grid coordinates for three levels (desktop 1280x1000, tablet 778x570,
 * mobile 480x370); the stage scales down to fit narrower screens.
 */
const LEVELS = [
  { min: 1240, gw: 1280, gh: 1000 },
  { min: 778, gw: 778, gh: 570 },
  { min: 0, gw: 480, gh: 370 },
] as const;

type L = 0 | 1 | 2;
const v = <T,>(arr: readonly T[], l: L): T => arr[l] as T;

const S1 = {
  title: { x: [-3, 29, 26], y: [357, 102, 53], fs: [80, 48, 36], lh: [62, 37, 27] },
  sub: { x: [-1, 30, 27], y: [597, 246, 152], fs: [30, 18, 13], lh: [40, 24, 16] },
  play: { x: [6, 26, 26], y: [765, 361, 230], d: [90, 54, 44], icon: [24, 14, 11], ring: [10, 6, 4] },
  link: { x: [140, 108, 0], y: [777, 370, 0], fs: [22, 12, 7], lh: [32, 18, 11] },
  shapes: {
    x: [
      [817, 496, 306],
      [967, 587, 362],
      [1117, 678, 418],
    ],
    y: [-7, -3, -1],
    w: [2000, 1215, 749],
    h: [1100, 668, 412],
  },
  man: { x: [350, 263, 173], y: [181, 108, 66], w: [900, 547, 337], h: [830, 504, 310] },
};

const S2 = {
  navy: { fs: [52, 31, 19], pad: [[40, 60, 80, 60], [24, 36, 49, 36], [15, 22, 30, 22]], yo: [10, 6, 3] },
  gold: { fs: [40, 24, 14], pad: [[40, 60, 40, 60], [24, 36, 24, 36], [15, 22, 15, 22]], yo: [120, 72, 44] },
};

const EASE = [0.215, 0.61, 0.355, 1] as const;
const SLIDE_MS = 9000;

function fromLeft(delay: number, dist = 50) {
  return {
    initial: { opacity: 0, x: -dist },
    animate: { opacity: 1, x: 0, transition: { duration: 1, delay, ease: EASE } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };
}
function fromRight(delay: number, duration = 1) {
  return {
    initial: { x: 2200 },
    animate: { x: 0, transition: { duration, delay, ease: EASE } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };
}
function fromBelow(delay: number) {
  return {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, delay, ease: EASE } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };
}

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1440);
  const [slide, setSlide] = useState(0);
  const [video, setVideo] = useState(false);
  const dragX = useRef<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0]?.contentRect.width ?? el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const go = useCallback((dir: number) => setSlide((s) => (s + dir + 2) % 2), []);

  useEffect(() => {
    if (video) return;
    const t = setTimeout(() => go(1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [slide, video, go]);

  const level = Math.max(0, LEVELS.findIndex((l) => width >= l.min)) as L;
  const { gw, gh } = LEVELS[level] ?? LEVELS[0];
  const scale = Math.min(1, width / gw);
  const height = gh * scale;

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative w-full touch-pan-y select-none overflow-hidden bg-background"
      style={{ height }}
      onPointerDown={(e) => (dragX.current = e.clientX)}
      onPointerUp={(e) => {
        if (dragX.current === null) return;
        const dx = e.clientX - dragX.current;
        dragX.current = null;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
      }}
      aria-roledescription="carousel"
      aria-label="Highlights"
    >
      <AnimatePresence mode="sync">
        {slide === 0 ? (
          <motion.div
            key="s1"
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            aria-roledescription="slide"
            aria-label="1 of 2"
          >
            <Stage gw={gw} gh={gh} scale={scale}>
              {/* Skewed gold bands (z order kept from the original) */}
              {[0, 1, 2].map((i) => {
                const delay = [0, 0.28, 0.63][i] ?? 0;
                return (
                  <motion.div
                    key={i}
                    {...fromRight(delay)}
                    className="absolute"
                    style={{
                      left: v(S1.shapes.x[i] ?? [], level),
                      top: v(S1.shapes.y, level),
                      width: v(S1.shapes.w, level),
                      height: v(S1.shapes.h, level),
                      zIndex: [5, 11, 13][i],
                    }}
                  >
                    <div
                      className="hero-skew h-full w-full"
                      style={{ background: i === 2 ? "var(--gold)" : "var(--gold-tint)" }}
                    />
                  </motion.div>
                );
              })}
              <motion.img
                {...fromRight(0.75, 1.69)}
                src={img.manModel}
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: v(S1.man.x, level),
                  top: v(S1.man.y, level),
                  width: v(S1.man.w, level),
                  height: v(S1.man.h, level),
                  zIndex: 14,
                }}
              />
              <motion.h1
                {...fromLeft(0)}
                className="absolute z-20 whitespace-nowrap font-bold text-navy"
                style={{
                  left: v(S1.title.x, level),
                  top: v(S1.title.y, level),
                  fontSize: v(S1.title.fs, level),
                  lineHeight: `${v(S1.title.lh, level)}px`,
                }}
              >
                START
                <br />
                NEW
                <br />
                <span className="text-gold">PROJECTS</span>
              </motion.h1>
              <motion.p
                {...fromLeft(0.35)}
                className="absolute z-20 font-hero text-navy"
                style={{
                  left: v(S1.sub.x, level),
                  top: v(S1.sub.y, level),
                  fontSize: v(S1.sub.fs, level),
                  lineHeight: `${v(S1.sub.lh, level)}px`,
                  width: level === 2 ? 213 : "auto",
                  whiteSpace: level === 2 ? "normal" : "nowrap",
                }}
              >
                Don’t get framed by the competition, <br />
                trust our solid reputation.
              </motion.p>
              <motion.button
                {...fromLeft(0.62)}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setVideo(true)}
                aria-label="Watch video: Why choose us?"
                className="animate-play-pulse absolute z-20 flex items-center justify-center rounded-full bg-ink text-gold transition-colors hover:bg-gold hover:text-ink"
                style={{
                  left: v(S1.play.x, level),
                  top: v(S1.play.y, level),
                  width: v(S1.play.d, level),
                  height: v(S1.play.d, level),
                  outline: `${v(S1.play.ring, level)}px solid var(--ring-light)`,
                }}
              >
                <Play fill="currentColor" style={{ width: v(S1.play.icon, level), height: v(S1.play.icon, level) }} />
              </motion.button>
              {level !== 2 && (
                <motion.button
                  {...fromLeft(0.87)}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setVideo(true)}
                  className="absolute z-20 text-left font-hero text-navy transition-colors hover:text-gold"
                  style={{
                    left: v(S1.link.x, level),
                    top: v(S1.link.y, level),
                    fontSize: v(S1.link.fs, level),
                    lineHeight: `${v(S1.link.lh, level)}px`,
                  }}
                >
                  <span className="text-steel" style={{ fontSize: 18 }}>Watch video</span>
                  <br />
                  <b>Why choose us?</b>
                </motion.button>
              )}
            </Stage>
          </motion.div>
        ) : (
          <motion.div
            key="s2"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img.slide2})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            aria-roledescription="slide"
            aria-label="2 of 2"
          >
            <Stage gw={gw} gh={gh} scale={scale}>
              <Centered yo={v(S2.navy.yo, level)} gh={gh} z={8}>
                <motion.div
                  {...fromBelow(0.12)}
                  className="whitespace-nowrap bg-navy font-hero font-bold text-gold"
                  style={{ fontSize: v(S2.navy.fs, level), lineHeight: `${v(S2.navy.fs, level)}px`, padding: v(S2.navy.pad, level).map((p) => `${p}px`).join(" ") }}
                >
                  Committed to superior quality and results
                </motion.div>
              </Centered>
              <Centered yo={v(S2.gold.yo, level)} gh={gh} z={9}>
                <motion.div
                  {...fromBelow(0.45)}
                  className="whitespace-nowrap bg-gold font-hero font-bold text-navy"
                  style={{ fontSize: v(S2.gold.fs, level), lineHeight: `${v(S2.gold.fs, level)}px`, padding: v(S2.gold.pad, level).map((p) => `${p}px`).join(" ") }}
                >
                  We'll get it done, like us there are none
                </motion.div>
              </Centered>
            </Stage>
          </motion.div>
        )}
      </AnimatePresence>
      <VideoModal open={video} onClose={() => setVideo(false)} />
    </section>
  );
}

function Stage({ gw, gh, scale, children }: { gw: number; gh: number; scale: number; children: React.ReactNode }) {
  return (
    <div
      className="absolute left-1/2 top-0"
      style={{ width: gw, height: gh, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
    >
      {children}
    </div>
  );
}

function Centered({ yo, gh, z, children }: { yo: number; gh: number; z: number; children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-[-400px] flex justify-center" style={{ top: gh / 2 + yo, transform: "translateY(-50%)", zIndex: z }}>
      {children}
    </div>
  );
}
