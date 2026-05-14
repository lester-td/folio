import { useRef, useState, useEffect } from "react";
import { useScroll, motion } from "motion/react";
import { Terminal, Grid3X3, Images } from "lucide-react";
import { HeroHub } from "./components/HeroHub";
import { SoftwarePortfolio } from "./components/SoftwarePortfolio";
import { PhotographyPortfolio } from "./components/PhotographyPortfolio";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative">
      {/* Background grid pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(var(--grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: Math.max(0.3, 1 - scrollProgress * 2),
          }}
        />
      </div>

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "linear-gradient(transparent 50%, rgba(192, 192, 192, 0.1) 50%)",
            backgroundSize: "100% 4px",
          }}
        />
      </div>

      <aside className="fixed left-0 top-0 z-40 h-screen w-16 border-r border-[var(--dark-grey)] bg-[var(--deep-black)] hidden md:flex flex-col items-center py-6">
        <div className="mb-10 text-[var(--metallic-silver)]">
          <Terminal className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-8 text-[var(--metallic-accent)]">
          <Grid3X3 className="w-5 h-5" />
          <Images className="w-5 h-5" />
        </div>
        <div className="mt-auto font-mono text-[10px] text-[var(--metallic-accent)] [writing-mode:vertical-rl] rotate-180">
          ARCHIVE_01
        </div>
      </aside>

      {/* Main content */}
      <main className="relative md:ml-16">
        <header className="h-10 border-b border-[var(--dark-grey)] bg-[var(--secondary)] px-4 flex items-center">
          <span className="font-mono text-xs md:text-sm text-[var(--deep-black)]">
            SYS.INIT // USER_TERMINAL_ACTIVE
          </span>
          <span className="ml-auto font-mono text-xs text-[var(--deep-black)]">V.2026.A</span>
        </header>
        {/* Hero Hub - State 1 */}
        <section className="min-h-[calc(100vh-2.5rem)] flex items-center justify-center relative">
          <HeroHub scrollProgress={scrollProgress} />
        </section>

        {/* Software Portfolio - State 2 */}
        <section className="min-h-screen relative bg-gradient-to-b from-[var(--deep-black)] to-[var(--background)]">
          <SoftwarePortfolio scrollProgress={scrollProgress} />
        </section>

        {/* Photography Portfolio - State 3 */}
        <section className="min-h-screen relative">
          <PhotographyPortfolio scrollProgress={scrollProgress} />
        </section>

        {/* Footer */}
        <footer className="relative bg-[var(--deep-black)] border-t border-[var(--dark-grey)] py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="font-mono text-sm text-[var(--metallic-accent)]">
                <span className="text-[var(--metallic-silver)]">&copy; 2026</span> :: SYSTEM.PORTFOLIO
                :: v1.0.0
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 animate-pulse" />
                <span className="font-mono text-xs text-[var(--muted-foreground)]">
                  STATUS: ONLINE
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
