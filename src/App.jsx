import { useEffect, useMemo, useState } from "react";

function App() {
  const [progress, setProgress] = useState(0); // 0 → 100 over time
  const [showCTA, setShowCTA] = useState(false);
  const [typedText, setTypedText] = useState("");

  const headline = "Global Daily — Your trusted source for unbiased news";

  // Typewriter effect for the headline
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(headline.slice(0, i + 1));
      i += 1;
      if (i >= headline.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  // Simple progress animation timer (controls when CTA appears)
  useEffect(() => {
    const duration = 3800; // ms
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else setShowCTA(true);
    };

    const r = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(r);
  }, []);

  const headlines = useMemo(
    () => [
      "Markets rally as inflation eases",
      "Breakthrough in clean energy storage",
      "Global leaders meet for climate summit",
      "Tech firms unveil next‑gen AI chips",
      "Historic art discovery stuns experts",
    ],
    []
  );

  const handleGoHome = () => {
    window.location.href = "http://www.nishkarsha.site/";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Soft grid/spotlight overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_60%_at_50%_10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(40%_40%_at_80%_80%,rgba(99,102,241,0.18),transparent_60%)]"></div>

      {/* Floating news cards for motion vibes */}
      <div className="absolute inset-0 -z-0 select-none">
        <FloatingCard className="left-[6%] top-[18%]" title={headlines[0]} accent="border-cyan-400/40" delay={0} />
        <FloatingCard className="right-[8%] top-[26%]" title={headlines[1]} accent="border-indigo-400/40" delay={250} />
        <FloatingCard className="left-[12%] bottom-[18%]" title={headlines[2]} accent="border-fuchsia-400/40" delay={500} />
        <FloatingCard className="right-[12%] bottom-[12%]" title={headlines[3]} accent="border-emerald-400/40" delay={750} />
      </div>

      {/* Centerpiece */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* Logo mark */}
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 shadow-[0_0_50px_rgba(56,189,248,0.35)] ring-1 ring-white/10 flex items-center justify-center scale-100 transition-transform duration-700 ease-out data-[done=true]:scale-105" data-done={showCTA}>
              <NewspaperIcon className="h-10 w-10 text-white drop-shadow" />
            </div>
            {/* Glow ring */}
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 blur-2xl"></div>
          </div>
        </div>

        {/* Animated headline */}
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {typedText}
          <span className="ml-0.5 inline-block h-[1.2em] w-0.5 animate-pulse bg-white/80 align-[-0.15em]" />
        </h1>
        <p className="mb-8 max-w-2xl text-balance text-lg text-slate-300/90">
          Stay ahead with crisp headlines, deep analysis, and real‑time updates from around the world.
        </p>

        {/* Progress bar */}
        {!showCTA && (
          <div className="mb-2 h-2 w-64 overflow-hidden rounded-full border border-white/10 bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-400 transition-[width] duration-150 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <p className="mb-10 text-sm text-slate-400/80">
          {showCTA ? "Welcome in." : "Preparing your personalized news feed…"}
        </p>

        {/* CTA appears after animation */}
        {showCTA && (
          <button
            onClick={handleGoHome}
            className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          >
            Take me to home
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Bottom subtle footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
  );
}

function FloatingCard({ className = "", title, accent = "", delay = 0 }) {
  return (
    <div
      className={`absolute ${className} w-60 rounded-xl border ${accent} bg-white/5 p-4 text-left text-slate-200 shadow-[0_10px_50px_rgba(0,0,0,0.35)] backdrop-blur transition-transform duration-[4000ms] ease-[cubic-bezier(0.22,1,0.36,1)] animate-float`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="mb-2 flex items-center gap-2 text-sm text-slate-300/80">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/80"></span>
        Live
      </div>
      <div className="text-sm font-medium leading-snug text-slate-100">
        {title}
      </div>
    </div>
  );
}

function NewspaperIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8h9M6 11h9M6 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="18" y="7" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowRight({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default App;

/* Tailwind keyframes for subtle floating */
/* Using arbitrary keyframes via @layer utilities injected here isn't possible without editing CSS, so we approximate with native animation names. */
// Inject a simple float animation by appending a style tag at runtime
if (typeof document !== "undefined" && !document.getElementById("float-anim")) {
  const style = document.createElement("style");
  style.id = "float-anim";
  style.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0px) }
      50% { transform: translateY(-10px) }
      100% { transform: translateY(0px) }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
  `;
  document.head.appendChild(style);
}
