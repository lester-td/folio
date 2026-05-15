import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link2, Code2, Camera } from "lucide-react";
import { HeroHub } from "./components/HeroHub";
import { SoftwarePortfolio } from "./components/SoftwarePortfolio";
import { PhotographyPortfolio } from "./components/PhotographyPortfolio";

type SectionId = "links" | "code" | "photo";

const NAV_ITEMS = [
  { id: "links" as const, label: "links", icon: Link2 },
  { id: "code" as const, label: "code", icon: Code2 },
  { id: "photo" as const, label: "photo", icon: Camera },
];

function SectionContent({
  sectionId,
  onNavigate,
}: {
  sectionId: SectionId;
  onNavigate: (sectionId: "code" | "photo") => void;
}) {
  if (sectionId === "links") {
    return (
      <section>
        <div className="overflow-hidden md:min-h-[100svh] md:h-auto flex items-center h-[calc(100dvh-2.5rem)]">
          <HeroHub onNavigate={onNavigate} />
        </div>
      </section>
    );
  }

  if (sectionId === "code") {
    return (
      <section>
        <SoftwarePortfolio />
      </section>
    );
  }

  return (
    <section>
      <PhotographyPortfolio />
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("links");
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const applyScrollLock = () => {
      const shouldLock = activeSection === "links" && window.innerWidth < 768;
      document.body.style.overflowY = shouldLock ? "hidden" : "";
      document.body.style.overscrollBehaviorY = shouldLock ? "none" : "";
      document.documentElement.style.overscrollBehaviorY = shouldLock ? "none" : "";
    };

    applyScrollLock();
    window.addEventListener("resize", applyScrollLock);

    return () => {
      window.removeEventListener("resize", applyScrollLock);
      document.body.style.overflowY = "";
      document.body.style.overscrollBehaviorY = "";
      document.documentElement.style.overscrollBehaviorY = "";
    };
  }, [activeSection]);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    if (window.innerWidth >= 768) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    touchStartX.current = null;
    touchStartY.current = null;

    // Ignore short or mostly vertical gestures to preserve natural page scrolling.
    if (absX < 48 || absX <= absY) {
      return;
    }

    const currentIndex = NAV_ITEMS.findIndex((item) => item.id === activeSection);
    if (currentIndex === -1) {
      return;
    }

    if (deltaX < 0 && currentIndex < NAV_ITEMS.length - 1) {
      setActiveSection(NAV_ITEMS[currentIndex + 1].id);
      return;
    }

    if (deltaX > 0 && currentIndex > 0) {
      setActiveSection(NAV_ITEMS[currentIndex - 1].id);
    }
  };

  const sidebarButtonClass = (sectionId: SectionId) =>
    `w-9 h-20 border flex flex-col items-center justify-center gap-1 transition-colors ${
      activeSection === sectionId
        ? "border-[var(--metallic-silver)] bg-[var(--dark-grey)] text-[var(--metallic-silver)]"
        : "border-[var(--dark-grey)] text-[var(--metallic-accent)] hover:border-[var(--metallic-accent)]"
    }`;

  const mobileButtonClass = (sectionId: SectionId) =>
    `h-7 px-2 border inline-flex items-center justify-center gap-1 transition-colors font-mono text-[10px] lowercase ${
      activeSection === sectionId
        ? "border-[var(--metallic-silver)] bg-[var(--dark-grey)] text-[var(--metallic-silver)]"
        : "border-[var(--dark-grey)] text-[var(--metallic-accent)]"
    }`;
  return (
    <div className="relative min-h-[100svh]">
      <div className="fixed inset-0 opacity-80 pointer-events-none z-0">
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

      <div className="fixed inset-0 pointer-events-none z-[999] opacity-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "linear-gradient(transparent 50%, rgba(192, 192, 192, 0.12) 50%)",
            backgroundSize: "100% 4px",
          }}
        />
      </div>

      <motion.header
        key="mobile-topbar"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 h-10 border-b border-[var(--dark-grey)] bg-[var(--deep-black)] md:hidden"
      >
        <div className="h-full px-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSection("links")}
            className="text-[var(--metallic-silver)]"
            aria-label="Switch to links page"
          >
            <img src="/icons/world.ico" alt="" aria-hidden="true" className="w-4 h-4" />
          </button>

          <span className="font-mono text-[10px] tracking-wide text-[var(--metallic-silver)]">&copy; 2026 lester thomas</span>

          <div className="ml-auto flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={mobileButtonClass(item.id)}
                  aria-label={`Switch to ${item.label} page`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.header>
      

      <motion.aside
        key="desktop-sidebar"
        initial={{ x: -26, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 z-40 h-[100svh] w-16 border-r border-[var(--dark-grey)] bg-[var(--deep-black)] hidden md:flex flex-col items-center py-6"
      >
        <button
          type="button"
          onClick={() => setActiveSection("links")}
          className="mb-10 text-[var(--metallic-silver)]"
          aria-label="Switch to links page"
        >
          <img src="/icons/world.ico" alt="" aria-hidden="true" className="w-5 h-5" />
        </button>
        <div className="flex flex-col gap-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={sidebarButtonClass(item.id)}
                aria-label={`Switch to ${item.label} page`}
              >
                <span className="font-mono text-[12px] uppercase leading-none [writing-mode:vertical-rl] rotate-180">
                  {item.label}
                </span>

                <Icon className="w-4 h-4 mt-1 rotate-270" />
              </button>
            );
          })}
        </div>
        <div className="mt-auto font-mono text-[12px] text-[var(--metallic-accent)] [writing-mode:vertical-rl] rotate-180">
          <span className="text-[var(--metallic-silver)]">&copy; 2026</span> :: lester thomas
        </div>
      </motion.aside>

      <main
        className="relative mt-10 md:mt-0 md:ml-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <SectionContent sectionId={activeSection} onNavigate={setActiveSection} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
