import React, { useEffect, useRef, useState } from 'react';
import {
  Minimize2,
  Smartphone,
  Monitor,
  RotateCcw,
  X,
} from 'lucide-react';
import {
  PORTFOLIO_PROJECTS,
  PortfolioProject,
} from './projectsData';

/**
 * Scaled live 1440x900 iframe overlay for the active/hovered card in the cascade.
 * Built with local Ollama (qwen2.5-coder:7b) assistance.
 * Keeps poster.jpg visible underneath until the live iframe finishes loading,
 * then fades in smoothly so all hero animations (videos, WebGL, kinetic type, marquees)
 * play live inside the card on both PC hover and Mobile touch/riffle.
 */
const LiveCardIframe: React.FC<{
  project: PortfolioProject;
  isLive: boolean;
}> = ({ project, isLive }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(0.4722);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLive) {
      setLoaded(false);
      return;
    }
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const w = el.clientWidth;
      if (w > 0) {
        setScale(w / 1440);
      }
    };
    updateScale();

    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isLive]);

  if (!isLive) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 overflow-hidden pointer-events-none select-none"
    >
      <iframe
        src={project.previewUrl}
        title={`${project.title} Live Preview`}
        onLoad={() => setLoaded(true)}
        tabIndex={-1}
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: '1440px',
          height: '900px',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          border: 'none',
          pointerEvents: 'none',
        }}
        className={`transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

/**
 * Computes the 3D cascade geometry for the 12 unique websites (no duplicates),
 * matching LE:MA (PORTFOLIO NUEVO.mp4 0:00–0:04), assisted by local Ollama (qwen2.5-coder:7b).
 *
 * - Hovering on PC (or tapping/sliding finger on Mobile) any card (`activeIndex`) immediately
 *   slides all cards below it (`index > activeIndex`) downward so the card's full 16:10 Hero
 *   and its live animations are revealed.
 */
function getTenCardCascadeStyle(
  index: number,
  total: number,
  activeIndex: number | null,
  isMobile: boolean
): React.CSSProperties {
  const scaleStart = isMobile ? 0.66 : 0.58;
  const scaleEnd = isMobile ? 0.98 : 0.98;
  const t = total > 1 ? index / (total - 1) : 1;
  let scale = scaleStart + (scaleEnd - scaleStart) * Math.pow(t, 0.92);

  const baseTop = isMobile ? 4 : 8;
  const stepY = isMobile ? 30 : 38;
  let y = baseTop + index * stepY;

  if (activeIndex !== null) {
    if (index < activeIndex) {
      // Slightly tighten cards above the hovered/active card
      const compressedStep = isMobile ? 20 : 25;
      y = baseTop + index * compressedStep - (isMobile ? 4 : 6);
    } else if (index === activeIndex) {
      // Active card lifts slightly and scales up cleanly inside the stack (0:03 of video)
      const compressedStep = isMobile ? 20 : 25;
      y = baseTop + index * compressedStep - (isMobile ? 2 : 4);
      scale = Math.max(scale, isMobile ? 0.92 : 0.88);
    } else {
      // Cards below the active card slide down smoothly to reveal the full Hero of the active card
      const compressedStep = isMobile ? 22 : 27;
      const revealOffset = isMobile ? 160 : 265;
      y = baseTop + index * compressedStep + revealOffset;
    }
  }

  return {
    transform: `translate3d(-50%, ${y}px, 0) scale(${scale})`,
    zIndex: 10 + index,
    transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
  };
}

export default function App() {
  // Hovered card index on Desktop (or tapped/swiped card index on Mobile)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Expanded website for full-screen live interactive experience (1 single full-screen iframe at a time)
  const [expandedProject, setExpandedProject] = useState<PortfolioProject | null>(null);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKeys, setIframeKeys] = useState<Record<string, number>>({});
  const [contactOpen, setContactOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });

    // Background prefetch of the 10 preview HTML entrypoints after initial paint
    const timer = setTimeout(() => {
      PORTFOLIO_PROJECTS.forEach((p) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = p.previewUrl;
        link.as = 'document';
        document.head.appendChild(link);
      });
    }, 1200);

    return () => {
      window.removeEventListener('resize', checkViewport);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (expandedProject) {
          setExpandedProject(null);
        } else {
          setActiveIndex(null);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expandedProject]);

  const reloadIframe = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIframeKeys((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // Touch-riffle handler on Mobile: sliding finger vertically across the stack opens cards in cascade
  const handleStackTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    const cardEl = target?.closest('[data-card-index]');
    if (cardEl) {
      const idx = Number(cardEl.getAttribute('data-card-index'));
      if (!Number.isNaN(idx) && idx !== activeIndex) {
        setActiveIndex(idx);
      }
    }
  };

  const activeHudProject =
    activeIndex !== null ? PORTFOLIO_PROJECTS[activeIndex] : null;

  // Which card shows live animations right inside the cascade stack?
  // When no modal is open: the hovered/tapped card (`activeIndex`), or the frontmost card (#10) by default.
  const liveCascadeIndex =
    expandedProject === null
      ? activeIndex !== null
        ? activeIndex
        : PORTFOLIO_PROJECTS.length - 1
      : null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white text-[#0a0a0a] font-geist select-none">
      {/* =====================================================================
          UNIFIED 100VH HERO CASCADE STAGE (DESKTOP & MOBILE — 1:1 LE:MA VIDEO)
          10 unique websites:
          - PC: Hovering any card opens it in the cascade & plays its live animations; clicking expands full screen.
          - Mobile: Tapping or sliding finger vertically opens cards & plays live animations; 2nd tap expands full screen.
         ===================================================================== */}
      <main
        className="relative w-full h-full overflow-hidden bg-white"
        onClick={() => setActiveIndex(null)}
      >
        {/* TOP NAVIGATION BAR */}
        <header className="fixed top-0 inset-x-0 z-40 h-12 sm:h-14 px-4 sm:px-7 flex items-center justify-between pointer-events-none">
          {/* Top-Left Logo: LE:MA */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
              setExpandedProject(null);
            }}
            className="pointer-events-auto text-[17px] sm:text-[19px] font-semibold tracking-[-0.04em] text-[#0a0a0a] cursor-pointer leading-none"
          >
            LE:MA
          </button>

          {/* Top-Center-Left Coordinates */}
          <div className="pointer-events-auto hidden sm:block md:absolute md:left-[28.5%] text-[9px] sm:text-[9.5px] font-geist-mono uppercase tracking-[0.04em] text-[#111111]">
            32.24.09.6N 110.57.51.8W
          </div>

          {/* Top-Center-Right Menu Links (Desktop) */}
          <nav className="pointer-events-auto hidden lg:flex absolute left-[50%] items-center gap-3.5 text-[9.5px] font-geist-mono uppercase tracking-[0.04em] text-[#71717a]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              className="text-[#0a0a0a] hover:opacity-60 cursor-pointer"
            >
              SHOWCASE
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedProject(PORTFOLIO_PROJECTS[0]);
              }}
              className="hover:text-[#0a0a0a] cursor-pointer"
            >
              SERVICES
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedProject(PORTFOLIO_PROJECTS[1]);
              }}
              className="hover:text-[#0a0a0a] cursor-pointer"
            >
              CASES
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setContactOpen(true);
              }}
              className="hover:text-[#0a0a0a] cursor-pointer"
            >
              TEAM
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setContactOpen(true);
              }}
              className="hover:text-[#0a0a0a] cursor-pointer"
            >
              CONTACT
            </button>
          </nav>

          {/* Top-Right Bordered Button: ↳ GET IN TOUCH */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setContactOpen(true);
            }}
            className="pointer-events-auto border border-[#d4d4d8] bg-white hover:border-[#0a0a0a] px-2 sm:px-2.5 py-1 text-[9px] sm:text-[9.5px] font-geist-mono uppercase tracking-[0.05em] text-[#0a0a0a] transition-colors cursor-pointer"
          >
            ↳ GET IN TOUCH
          </button>
        </header>

        {/* MIDDLE LEFT & RIGHT HUD LABELS */}
        <div
          className="
            fixed inset-x-0 z-40 px-4 sm:px-7 flex items-center justify-between pointer-events-none
            top-[52px] md:top-1/2 md:-translate-y-1/2
          "
        >
          {/* Left Dynamic Label: "List / Startups" -> "Art Studio / Tinta & Piel" */}
          <div className="pointer-events-auto flex flex-col">
            <span className="text-[10px] sm:text-[11px] text-[#8c8c8c] font-normal leading-tight">
              {activeHudProject ? activeHudProject.categoryLabel : 'List'}
            </span>
            <span className="text-[14px] sm:text-[16px] text-[#0a0a0a] font-normal tracking-[-0.02em] leading-tight mt-0.5">
              {activeHudProject ? activeHudProject.title : 'Startups'}
            </span>
          </div>

          {/* Right Counter: "10 projects" */}
          <div className="pointer-events-auto text-[13px] sm:text-[15px] text-[#0a0a0a] font-normal tracking-[-0.02em]">
            {String(PORTFOLIO_PROJECTS.length).padStart(2, '0')} projects
          </div>
        </div>

        {/* =================================================================
            CENTER FRAMELESS 3D CASCADE STACK (10 UNIQUE WEBSITES + LIVE PREVIEW)
           ================================================================= */}
        <div className="relative w-full h-full flex items-start justify-center overflow-hidden pt-[86px] md:pt-[22px]">
          <div
            className="relative w-full max-w-[760px] h-full mx-auto touch-none"
            onMouseLeave={() => {
              if (!isMobile) setActiveIndex(null);
            }}
            onTouchMove={handleStackTouchMove}
          >
            {PORTFOLIO_PROJECTS.map((project, index) => {
              const isHoveredOrOpen = activeIndex === index;
              const isCardLive = liveCascadeIndex === index;
              const style = getTenCardCascadeStyle(
                index,
                PORTFOLIO_PROJECTS.length,
                activeIndex,
                isMobile
              );

              return (
                <div
                  key={project.id}
                  data-card-index={index}
                  style={style}
                  onMouseEnter={() => {
                    // PC: hovering any card immediately opens it in the stack & plays its live animations
                    if (!isMobile) {
                      setActiveIndex(index);
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isMobile) {
                      // Mobile: 1st tap opens card in cascade with live animation; 2nd tap expands full screen
                      if (activeIndex === index) {
                        setExpandedProject(project);
                      } else {
                        setActiveIndex(index);
                      }
                    } else {
                      // Desktop: clicking any card expands full screen interactive website
                      setExpandedProject(project);
                    }
                  }}
                  className={`group absolute left-1/2 top-0 w-[92vw] max-w-[680px] aspect-[16/10] rounded-[2px] overflow-hidden cursor-pointer bg-[#111] border ${
                    isHoveredOrOpen
                      ? 'border-black/25 shadow-[0_24px_60px_rgba(0,0,0,0.22)]'
                      : 'border-black/10 shadow-[0_10px_28px_rgba(0,0,0,0.11)]'
                  }`}
                >
                  {/* High-DPI Static Poster Base (0ms instant paint while stack moves) */}
                  <img
                    src={project.posterUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                    loading="eager"
                    decoding="async"
                  />

                  {/* Live Animated Website Overlay on Active/Hovered Card (or Front Card #10) */}
                  <LiveCardIframe project={project} isLive={isCardLive} />

                  {/* Live status indicator + corner expand action badge when card is active/hovered */}
                  <div
                    className={`
                      absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5
                      transition-opacity
                      ${isHoveredOrOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    `}
                  >
                    <span className="px-2 py-1 bg-black/80 backdrop-blur-xs text-white text-[8.5px] font-geist-mono uppercase tracking-[0.08em] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedProject(project);
                      }}
                      className="px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-black/15 text-[#0a0a0a] text-[9px] sm:text-[9.5px] font-geist-mono uppercase tracking-[0.06em] shadow-sm hover:bg-[#0a0a0a] hover:text-white cursor-pointer"
                    >
                      ↳ EXPAND {project.title}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM LEFT & RIGHT HUD BAR */}
        <footer className="fixed bottom-0 inset-x-0 z-40 h-12 sm:h-14 px-4 sm:px-7 flex items-center justify-between pointer-events-none bg-gradient-to-t from-white/90 via-white/40 to-transparent md:bg-none">
          {/* Bottom-Left Two-Line Bold Motto */}
          <div className="pointer-events-auto text-[9px] sm:text-[9.5px] font-bold uppercase leading-[1.15] tracking-[-0.01em] text-[#0a0a0a]">
            <div>FLOW OF TIME.</div>
            <div>RATES OF QUALITY.</div>
          </div>

          {/* Bottom-Right Bordered Button: ↳ VIEW ALL WORKS */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedProject(
                activeHudProject || PORTFOLIO_PROJECTS[PORTFOLIO_PROJECTS.length - 1]
              );
            }}
            className="pointer-events-auto border border-[#d4d4d8] bg-white hover:border-[#0a0a0a] px-2 sm:px-2.5 py-1 text-[9px] sm:text-[9.5px] font-geist-mono uppercase tracking-[0.05em] text-[#0a0a0a] transition-colors cursor-pointer"
          >
            ↳ VIEW ALL WORKS
          </button>
        </footer>
      </main>

      {/* =====================================================================
          EXPANDED INTERACTIVE LIVE WEBSITE SANDBOX (60FPS — SINGLE IFRAME)
          Mounts ONLY the clicked website at 1:1 native scale so all animations,
          scroll effects, hover states and menus run smoothly without lag
         ===================================================================== */}
      {expandedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col p-0 sm:p-4"
          onClick={() => setExpandedProject(null)}
        >
          <div
            className="w-full h-full bg-white border border-black/15 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Minimal Top Control Bar */}
            <div className="bg-white border-b border-[#e5e5e5] px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
                <span className="font-geist-mono text-[11px] sm:text-xs font-semibold uppercase text-[#0a0a0a] shrink-0">
                  {expandedProject.num} // {expandedProject.title}
                </span>

                {/* Quick switcher between the 10 websites */}
                <div className="flex items-center gap-1 pl-2 sm:pl-3 border-l border-[#e5e5e5]">
                  {PORTFOLIO_PROJECTS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setExpandedProject(p)}
                      className={`px-2 py-1 text-[9.5px] sm:text-[10px] font-geist-mono uppercase transition-colors cursor-pointer shrink-0 ${
                        expandedProject.id === p.id
                          ? 'bg-[#0a0a0a] text-white font-semibold'
                          : 'text-[#71717a] hover:text-[#0a0a0a]'
                      }`}
                    >
                      {p.num} {p.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Desktop / Mobile Viewport Toggle */}
                <div className="hidden md:flex items-center border border-[#e5e5e5] text-[10px] font-geist-mono">
                  <button
                    type="button"
                    onClick={() => setDevicePreview('desktop')}
                    className={`px-2.5 py-1 flex items-center gap-1 cursor-pointer ${
                      devicePreview === 'desktop'
                        ? 'bg-[#0a0a0a] text-white font-medium'
                        : 'text-[#71717a] hover:text-[#0a0a0a]'
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevicePreview('mobile')}
                    className={`px-2.5 py-1 flex items-center gap-1 cursor-pointer ${
                      devicePreview === 'mobile'
                        ? 'bg-[#0a0a0a] text-white font-medium'
                        : 'text-[#71717a] hover:text-[#0a0a0a]'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => reloadIframe(expandedProject.id)}
                  className="px-2 sm:px-2.5 py-1 text-[10px] font-geist-mono uppercase border border-[#d4d4d8] hover:border-[#0a0a0a] flex items-center gap-1 cursor-pointer"
                  title="Reiniciar animaciones"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reiniciar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedProject(null)}
                  className="px-3 py-1 bg-[#0a0a0a] text-white text-[10px] font-geist-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:bg-neutral-800"
                >
                  <Minimize2 className="w-3 h-3" />
                  <span>Cerrar</span>
                </button>
              </div>
            </div>

            {/* Live Embedded Website Stage */}
            <div className="flex-1 bg-[#f4f4f5] flex items-center justify-center overflow-hidden relative">
              <div
                className={`h-full transition-all duration-300 overflow-hidden bg-white ${
                  devicePreview === 'mobile'
                    ? 'w-[390px] max-h-[844px] border border-black/15 shadow-xl my-auto'
                    : 'w-full h-full'
                }`}
              >
                <iframe
                  key={`expanded-live-${expandedProject.id}-${iframeKeys[expandedProject.id] || 0}`}
                  src={expandedProject.previewUrl}
                  title={expandedProject.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          CONTACT DRAWER
         ===================================================================== */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="bg-white border border-black p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="absolute top-5 right-5 text-[#71717a] hover:text-black cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="font-geist-mono text-[10px] uppercase tracking-widest text-[#71717a] mb-2">
              LE:MA — Interactive Web Architecture
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-3">
              Flow of Time. Rates of Quality.
            </h3>
            <p className="text-xs text-[#52525b] leading-relaxed mb-6">
              En PC, pasa el ratón por las 12 webs en cascada para desplegarlas y ver sus animaciones en vivo (o haz clic para pantalla completa). En móvil, desliza el dedo o toca una tarjeta para ver su animación en vivo, y vuelve a tocarla para abrirla entera.
            </p>
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="w-full py-3 bg-[#0a0a0a] text-white font-geist-mono text-xs uppercase tracking-widest cursor-pointer"
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
