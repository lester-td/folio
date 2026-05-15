import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link2, Code2, Camera, FileText } from "lucide-react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Links } from "./components/Links";
import { Code } from "./components/Code";
import { Photo } from "./components/Photo";
import { Blog, BlogPostPage } from "./components/Blog";

type SectionId = "links" | "code" | "photo" | "blog";

interface NavItem {
  id: SectionId;
  label: string;
  icon: typeof Link2;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "links", label: "links", icon: Link2, path: "/" },
  { id: "code", label: "code", icon: Code2, path: "/code" },
  { id: "photo", label: "photo", icon: Camera, path: "/photo" },
  { id: "blog", label: "blog", icon: FileText, path: "/blog" },
];

const galleryThumbModules = import.meta.glob("/src/assets/gallery-thumbs/*/*.{avif,gif,jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const galleryThumbUrls = Object.values(galleryThumbModules).sort((a, b) => a.localeCompare(b));

function resolveSection(pathname: string): SectionId {
  if (pathname.startsWith("/blog")) {
    return "blog";
  }

  if (pathname.startsWith("/photo")) {
    return "photo";
  }

  if (pathname.startsWith("/code")) {
    return "code";
  }

  return "links";
}

function isTopLevelPath(pathname: string) {
  return NAV_ITEMS.some((item) => item.path === pathname);
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = resolveSection(location.pathname);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const hasPreloadedThumbs = useRef(false);

  useEffect(() => {
    if (location.pathname !== "/" || hasPreloadedThumbs.current) {
      return;
    }

    hasPreloadedThumbs.current = true;

    galleryThumbUrls.forEach((src) => {
      const image = new Image();
      image.decoding = "sync";
      image.loading = "eager";
      image.setAttribute("fetchpriority", "high");
      image.src = src;
    });
  }, [location.pathname]);

  useEffect(() => {
    const applyScrollLock = () => {
      const shouldLock =
        activeSection === "links" && location.pathname === "/" && window.innerWidth < 900;
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
  }, [activeSection, location.pathname]);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    if (window.innerWidth >= 900 || !isTopLevelPath(location.pathname)) {
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
      navigate(NAV_ITEMS[currentIndex + 1].path);
      return;
    }

    if (deltaX > 0 && currentIndex > 0) {
      navigate(NAV_ITEMS[currentIndex - 1].path);
    }
  };

  const sidebarButtonClass = (isActive: boolean) =>
    `w-9 h-20 border flex flex-col items-center justify-center gap-1 transition-colors ${
      isActive
        ? "border-[var(--metallic-silver)] bg-[var(--dark-grey)] text-[var(--metallic-silver)]"
        : "border-[var(--dark-grey)] text-[var(--metallic-accent)] hover:border-[var(--metallic-accent)]"
    }`;

  const mobileButtonClass = (isActive: boolean) =>
    `h-7 px-2 border inline-flex items-center justify-center gap-1 transition-colors font-mono text-[10px] lowercase ${
      isActive
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
        className="fixed inset-x-0 top-0 z-50 h-10 border-b border-[var(--dark-grey)] bg-[var(--deep-black)] min-[900px]:hidden"
      >
        <div className="h-full px-2 flex items-center gap-2">
          <Link to="/" className="font-mono text-[12px] tracking-wide text-[var(--metallic-silver)]" aria-label="Go to links page">
            lester thomas
          </Link>
          <div className="ml-auto flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={mobileButtonClass(isActive)}
                  aria-label={`Go to ${item.label} page`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </Link>
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
        className="fixed left-0 top-0 z-40 h-[100svh] w-16 border-r border-[var(--dark-grey)] bg-[var(--deep-black)] hidden min-[900px]:flex flex-col items-center py-6"
      >
        <Link to="/" className="mb-10 text-[var(--metallic-silver)]" aria-label="Go to links page">
          <img src="/icons/world.ico" alt="" aria-hidden="true" className="w-5 h-5" />
        </Link>
        <div className="flex flex-col gap-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={sidebarButtonClass(isActive)}
                aria-label={`Go to ${item.label} page`}
              >
                <span className="font-mono text-[12px] uppercase leading-none [writing-mode:vertical-rl] rotate-180">
                  {item.label}
                </span>

                <Icon className="w-4 h-4 mt-1 rotate-270" />
              </Link>
            );
          })}
        </div>
        <div className="mt-auto font-mono text-[12px] text-[var(--metallic-accent)] [writing-mode:vertical-rl] rotate-180">
          <span className="text-[var(--metallic-silver)]">&copy; 2026</span> :: lester thomas
        </div>
      </motion.aside>

      <main
        className="relative mt-10 min-[900px]:mt-0 min-[900px]:ml-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <div className="overflow-hidden min-[900px]:min-h-[100svh] min-[900px]:h-auto flex items-center h-[calc(100dvh-2.5rem)]">
                      <Links />
                    </div>
                  }
                />
                <Route path="/code" element={<Code />} />
                <Route path="/photo" element={<Photo />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
