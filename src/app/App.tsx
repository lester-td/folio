import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link2, Code2, Camera } from "lucide-react";
import { HeroHub } from "./components/HeroHub";
import { SoftwarePortfolio } from "./components/SoftwarePortfolio";
import { PhotographyPortfolio } from "./components/PhotographyPortfolio";

type SectionId = "links" | "code" | "photo";

interface ScrollStageProps {
  sectionId: SectionId;
  sectionRef: React.RefObject<HTMLElement>;
  isActive?: boolean;
  isMobileLayout?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  children: React.ReactNode;
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function interpolateProgress(progress: number, stops: number[], values: number[]) {
  if (stops.length !== values.length || stops.length === 0) return values[0] ?? 0;
  if (progress <= stops[0]) return values[0];

  for (let index = 1; index < stops.length; index += 1) {
    if (progress <= stops[index]) {
      const segmentStart = stops[index - 1];
      const segmentEnd = stops[index];
      const segmentProgress = segmentEnd === segmentStart ? 0 : (progress - segmentStart) / (segmentEnd - segmentStart);
      const valueStart = values[index - 1];
      const valueEnd = values[index];
      return valueStart + (valueEnd - valueStart) * segmentProgress;
    }
  }

  return values[values.length - 1];
}

function ScrollStage({
  sectionId,
  sectionRef,
  isActive = false,
  isMobileLayout = false,
  isFirst = false,
  isLast = false,
  children,
}: ScrollStageProps) {
  const [stageProgress, setStageProgress] = useState(0);
  const stops = [0.08, 0.22, 0.78, 0.92];
  const opacityValues = isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0];
  const scaleValues = isFirst ? [1, 1, 1, 0.9] : isLast ? [1.06, 1, 1, 1] : [1.06, 1, 1, 0.9];

  useEffect(() => {
    if (isMobileLayout) {
      setStageProgress(0.5);
      return;
    }

    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      const node = sectionRef.current;
      if (!node) return;

      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const absoluteTop = node.getBoundingClientRect().top + window.scrollY;
      const stageRange = Math.max(node.offsetHeight - viewportHeight, 1);
      const nextProgress = clamp((window.scrollY - absoluteTop) / stageRange);

      setStageProgress((current) => (Math.abs(current - nextProgress) < 0.001 ? current : nextProgress));
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.visualViewport?.addEventListener("resize", requestUpdate);
    window.visualViewport?.addEventListener("scroll", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.visualViewport?.removeEventListener("resize", requestUpdate);
      window.visualViewport?.removeEventListener("scroll", requestUpdate);
    };
  }, [isMobileLayout, sectionRef]);

  // Keep animation strictly within the sticky-pinned center window so it never pans upward.
  const opacity = isMobileLayout ? 1 : interpolateProgress(stageProgress, stops, opacityValues);
  const scale = isMobileLayout ? 1 : interpolateProgress(stageProgress, stops, scaleValues);
  const overlapClass = isMobileLayout ? "" : isFirst ? "" : "-mt-[115svh]";
  const stageZClass = isActive ? "z-30" : "z-10";
  const stageHeightClass = isMobileLayout ? (isFirst ? "min-h-[100svh]" : "min-h-0") : "min-h-[180svh]";
  const stickinessClass = isMobileLayout ? (isFirst ? "relative h-[100svh]" : "relative h-auto") : "sticky top-0 h-[100svh]";
  const alignmentClass = isMobileLayout ? (isFirst ? "items-center" : "items-start") : "items-center";
  const mobileGapClass =
    isMobileLayout && sectionId === "code" ? "mb-20 md:mb-24" : isMobileLayout && !isLast ? "mb-6 md:mb-8" : "";

  return (
    <section
      ref={sectionRef}
      data-section-id={sectionId}
      className={`relative overflow-x-clip ${stageHeightClass} ${overlapClass} ${stageZClass} ${mobileGapClass}`}
    >
      <div className={`${stickinessClass} flex ${alignmentClass} justify-center overflow-x-clip`}>
        <motion.div
          style={{
            opacity,
            scale,
            transformOrigin: "center center",
            willChange: "opacity, transform",
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const softwareSectionRef = useRef<HTMLElement>(null);
  const photoSectionRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("links");
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobileLayout(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isMobileLayout) {
      setActiveSection("links");
      return;
    }

    const sections: Array<{ id: SectionId; ref: React.RefObject<HTMLElement> }> = [
      { id: "links", ref: heroSectionRef },
      { id: "code", ref: softwareSectionRef },
      { id: "photo", ref: photoSectionRef },
    ];
    const stops = [0.08, 0.22, 0.78, 0.92];

    let ticking = false;

    const updateActiveSection = () => {
      ticking = false;
      const currentScrollY = window.scrollY;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      let nextActive: SectionId = sections[0].id;
      let highestOpacity = -1;

      for (const [index, section] of sections.entries()) {
        const node = section.ref.current;
        if (!node) continue;
        const absoluteTop = node.getBoundingClientRect().top + window.scrollY;
        const stageRange = Math.max(node.offsetHeight - viewportHeight, 1);
        const stageProgress = clamp((currentScrollY - absoluteTop) / stageRange);
        const isFirst = index === 0;
        const isLast = index === sections.length - 1;
        const opacityValues = isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0];
        const sectionOpacity = interpolateProgress(stageProgress, stops, opacityValues);

        if (sectionOpacity > highestOpacity) {
          highestOpacity = sectionOpacity;
          nextActive = section.id;
        }
      }

      setActiveSection((current) => (current === nextActive ? current : nextActive));
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isMobileLayout]);

  const scrollToSection = (sectionId: SectionId) => {
    const map = {
      links: heroSectionRef,
      code: softwareSectionRef,
      photo: photoSectionRef,
    } as const;
    const target = map[sectionId].current;
    if (!target) return;

    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const absoluteTop = target.getBoundingClientRect().top + window.scrollY;
    const stageRange = Math.max(target.offsetHeight - viewportHeight, 0);
    const centeredStageY = absoluteTop + stageRange * 0.5;

    window.scrollTo({ top: centeredStageY, behavior: "smooth" });
  };

  const sidebarButtonClass = (sectionId: SectionId) =>
    `w-9 h-9 border flex items-center justify-center transition-colors ${
      activeSection === sectionId
        ? "border-[var(--metallic-silver)] bg-[var(--dark-grey)] text-[var(--metallic-silver)]"
        : "border-[var(--dark-grey)] text-[var(--metallic-accent)] hover:border-[var(--metallic-accent)]"
    }`;

  return (
    <div className="relative">
      {/* Background grid pattern */}
      <div className="fixed inset-0 opacity-50 pointer-events-none z-0">
        <div
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
          <img src="/icons/world.ico" alt="" aria-hidden="true" className="w-5 h-5" />
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
      <main className="relative overflow-x-clip md:ml-16">
        <ScrollStage
          sectionId="links"
          sectionRef={heroSectionRef}
          isActive={activeSection === "links"}
          isMobileLayout={isMobileLayout}
          isFirst
        >
          <HeroHub />
        </ScrollStage>

        <ScrollStage
          sectionId="code"
          sectionRef={softwareSectionRef}
          isActive={activeSection === "code"}
          isMobileLayout={isMobileLayout}
        >
          <SoftwarePortfolio />
        </ScrollStage>

        <ScrollStage
          sectionId="photo"
          sectionRef={photoSectionRef}
          isActive={activeSection === "photo"}
          isMobileLayout={isMobileLayout}
          isLast
        >
          <PhotographyPortfolio />
        </ScrollStage>
      </main>
    </div>
  );
}
