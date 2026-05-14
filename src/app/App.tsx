import { useRef, useState, useEffect } from "react";
import { useScroll, motion } from "motion/react";
import { Terminal, Link2, Code2, Camera } from "lucide-react";
import { HeroHub } from "./components/HeroHub";
import { SoftwarePortfolio } from "./components/SoftwarePortfolio";
import { PhotographyPortfolio } from "./components/PhotographyPortfolio";

type SectionId = "links" | "code" | "photo";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const softwareSectionRef = useRef<HTMLElement>(null);
  const photoSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("links");
  const pendingSectionRef = useRef<SectionId | null>(null);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const sections = [
      { id: "links" as const, ref: heroSectionRef },
      { id: "code" as const, ref: softwareSectionRef },
      { id: "photo" as const, ref: photoSectionRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (pendingSectionRef.current) return;

        if (visible[0]) {
          const id = visible[0].target.getAttribute("data-section-id") as SectionId | null;
          if (id) setActiveSection(id);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    for (const section of sections) {
      if (section.ref.current) observer.observe(section.ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const map = {
      links: heroSectionRef,
      code: softwareSectionRef,
      photo: photoSectionRef,
    } as const;
    const target = map[sectionId].current;
    if (!target) return;
    pendingSectionRef.current = sectionId;
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    const settle = () => {
      const el = map[sectionId].current;
      if (!el) {
        pendingSectionRef.current = null;
        return;
      }

      const top = el.getBoundingClientRect().top;
      const arrived = Math.abs(top) <= 6;

      if (arrived) {
        setActiveSection(sectionId);
        pendingSectionRef.current = null;
        return;
      }

      window.requestAnimationFrame(settle);
    };

    window.requestAnimationFrame(settle);
  };

  const sidebarButtonClass = (sectionId: SectionId) =>
    `w-9 h-9 border flex items-center justify-center transition-colors ${
      activeSection === sectionId
        ? "border-[var(--metallic-silver)] bg-[var(--dark-grey)] text-[var(--metallic-silver)]"
        : "border-[var(--dark-grey)] text-[var(--metallic-accent)] hover:border-[var(--metallic-accent)]"
    }`;

  return (
    <div ref={containerRef} className="relative">
      {/* Background grid pattern */}
      <div className="fixed inset-0 opacity-50 pointer-events-none z-0">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(var(--grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Global scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "linear-gradient(transparent 50%, rgba(192, 192, 192, 0.12) 50%)",
            backgroundSize: "100% 4px",
          }}
        />
      </div>

      <aside className="fixed left-0 top-0 z-40 h-screen w-16 border-r border-[var(--dark-grey)] bg-[var(--deep-black)] hidden md:flex flex-col items-center py-6">
        <button
          type="button"
          onClick={() => scrollToSection("links")}
          className="mb-10 text-[var(--metallic-silver)]"
          aria-label="Jump to links section"
        >
          <Terminal className="w-5 h-5" />
        </button>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => scrollToSection("links")}
            className={sidebarButtonClass("links")}
            aria-label="Jump to links area"
          >
            <Link2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("code")}
            className={sidebarButtonClass("code")}
            aria-label="Jump to code area"
          >
            <Code2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("photo")}
            className={sidebarButtonClass("photo")}
            aria-label="Jump to photo area"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-auto font-mono text-[12px] text-[var(--metallic-accent)] [writing-mode:vertical-rl] rotate-180">
          <span className="text-[var(--metallic-silver)]">&copy; 2026</span> :: lester thomas
        </div>
      </aside>

      {/* Main content */}
      <main className="relative md:ml-16">

        {/* Hero Hub - State 1 */}
        <section ref={heroSectionRef} data-section-id="links" className="min-h-[calc(100vh-2.5rem)] flex items-center justify-center relative">
          <HeroHub scrollProgress={scrollProgress} />
        </section>

        {/* Software Portfolio - State 2 */}
        <section ref={softwareSectionRef} data-section-id="code" className="min-h-screen relative">
          <SoftwarePortfolio scrollProgress={scrollProgress} />
        </section>

        {/* Photography Portfolio - State 3 */}
        <section ref={photoSectionRef} data-section-id="photo" className="min-h-screen relative">
          <PhotographyPortfolio scrollProgress={scrollProgress} />
        </section>
      </main>
    </div>
  );
}
