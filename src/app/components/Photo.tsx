import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import { AnimatePresence, motion } from "motion/react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface GalleryImageAsset {
  thumb: string;
  full: string;
}

interface Gallery {
  id: string;
  title: string;
  description: string;
  images: GalleryImageAsset[];
}

// Optional manual gallery order. Use folder ids from src/assets/gallery/<id>/.
// Leave empty to use default sort (featured first, then alphabetical).
const customGalleryOrder: string[] = ["featured", "portraits", "automotive", "streets", "events", "film", "mockups"];

const galleryImageModules = import.meta.glob("/src/assets/gallery/*/*.{avif,gif,jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const galleryThumbModules = import.meta.glob("/src/assets/gallery-thumbs/*/*.{avif,gif,jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const galleries = buildGalleries(galleryImageModules, galleryThumbModules);

function buildGalleries(imageMap: Record<string, string>, thumbMap: Record<string, string>): Gallery[] {
  const grouped = new Map<string, GalleryImageAsset[]>();

  for (const [path, fullImageUrl] of Object.entries(imageMap)) {
    const match = path.match(/\/gallery\/([^/]+)\//);
    if (!match) {
      continue;
    }

    const galleryId = match[1];
    const thumbPath = path.replace("/gallery/", "/gallery-thumbs/");
    const thumbImageUrl = thumbMap[thumbPath] ?? fullImageUrl;

    const existing = grouped.get(galleryId) ?? [];
    existing.push({ thumb: thumbImageUrl, full: fullImageUrl });
    grouped.set(galleryId, existing);
  }

  const orderedGalleries = Array.from(grouped.entries())
    .sort(([a], [b]) => {
      const aIsFeatured = a.toLowerCase() === "featured";
      const bIsFeatured = b.toLowerCase() === "featured";

      if (aIsFeatured && !bIsFeatured) {
        return -1;
      }

      if (!aIsFeatured && bIsFeatured) {
        return 1;
      }

      return a.localeCompare(b);
    })
    .map(([id, images]) => ({
      id,
      title: id.replace(/[-_]+/g, " ").toUpperCase(),
      description: `LOCAL_ASSET_GALLERY :: ${id.toUpperCase()}`,
      images: images.sort((a, b) => a.full.localeCompare(b.full)),
    }));

  if (customGalleryOrder.length === 0) {
    return orderedGalleries;
  }

  const rank = new Map(customGalleryOrder.map((id, index) => [id, index]));

  return orderedGalleries.sort((a, b) => {
    const aRank = rank.get(a.id);
    const bRank = rank.get(b.id);

    if (aRank !== undefined && bRank !== undefined) {
      return aRank - bRank;
    }

    if (aRank !== undefined) {
      return -1;
    }

    if (bRank !== undefined) {
      return 1;
    }

    return 0;
  });
}

export function Photo() {
  const [currentGallery, setCurrentGallery] = useState(0);

  const activeGallery = useMemo(() => {
    if (galleries.length === 0) {
      return null;
    }

    return galleries[Math.min(currentGallery, galleries.length - 1)];
  }, [currentGallery]);
  const columnCount = useResponsiveColumns();
  const imageAspectRatios = useImageAspectRatios(activeGallery?.images ?? []);
  const balancedColumns = useMemo(() => {
    if (!activeGallery) {
      return [];
    }

    return buildBalancedColumns(activeGallery.images, columnCount, imageAspectRatios);
  }, [activeGallery, columnCount, imageAspectRatios]);

  const openLightbox = useCallback(
    (startIndex: number) => {
      if (!activeGallery) {
        return;
      }

      Fancybox.show(
        activeGallery.images.map((image) => ({
          src: image.full,
          type: "image",
        })),
        {
          startIndex,
          fadeEffect: false,
          zoomEffect: false,
          dragToClose: false,
          closeButton: false,
          Carousel: {
            infinite: false,
            Arrows: true,
            Thumbs: false,
            Toolbar: {
              display: {
                left: [],
                middle: [],
                right: ["close"],
              },
            },
          },
        },
      );
    },
    [activeGallery],
  );

  const nextGallery = () => {
    if (galleries.length === 0) {
      return;
    }

    setCurrentGallery((prev) => (prev + 1) % galleries.length);
  };

  const prevGallery = () => {
    if (galleries.length === 0) {
      return;
    }

    setCurrentGallery((prev) => (prev - 1 + galleries.length) % galleries.length);
  };

  return (
    <div className="w-full">
      <div>
        <div className="sticky top-10 md:top-0 z-20 border border-[var(--dark-grey)] bg-[var(--background)]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)] lowercase">
              photo | {activeGallery?.title ?? "no galleries"} | {activeGallery?.images.length ?? 0} items
            </span>
          </div>

          <div className="bg-[var(--card)] px-2 py-2 sm:px-3 flex items-stretch gap-2 shrink-0">
            <button onClick={prevGallery} className="mechanical-button px-1.5 py-0.5 shrink-0 self-stretch" disabled={galleries.length === 0}>
              <ChevronLeft className="w-5 h-5 text-[var(--metallic-accent)]" />
            </button>

            <div className="flex-1 min-w-0 grid grid-cols-4 min-[850px]:grid-cols-7 gap-1.5 sm:gap-2">
              {galleries.map((gallery, index) => (
                <button
                  key={gallery.id}
                  onClick={() => setCurrentGallery(index)}
                  className={`group relative px-2 sm:px-2.5 py-1 border font-mono text-[10px] sm:text-xs transition-all ${
                    currentGallery === index
                      ? "border-[var(--metallic-silver)] bg-[var(--dark-grey)] text-[var(--metallic-silver)]"
                      : "border-[var(--dark-grey)] bg-[var(--secondary)] text-[var(--metallic-accent)] hover:border-[var(--metallic-accent)]"
                  }`}
                >
                  <span className="lowercase">{gallery.title}</span>
                  {currentGallery === index && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--metallic-silver)]" />
                  )}
                </button>
              ))}
            </div>

            <button onClick={nextGallery} className="mechanical-button px-1.5 py-0.5 shrink-0 self-stretch" disabled={galleries.length === 0}>
              <ChevronRight className="w-5 h-5 text-[var(--metallic-accent)]" />
            </button>
          </div>
        </div>

        <div className="relative border-x border-b border-[var(--dark-grey)] bg-[var(--background)] shadow-[4px_4px_0_0_#000]">
          <div>
            {!activeGallery && (
              <div className="p-6 font-mono text-xs text-[var(--metallic-accent)]">
                Add images under <code>src/assets/gallery/&lt;gallery-name&gt;/</code> to populate this page.
              </div>
            )}

            {activeGallery && (
              <div className="overflow-x-hidden">
                <AnimatePresence
                  mode="wait"
                  onExitComplete={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                  }}
                >
                  <motion.div
                    key={activeGallery.id}
                    initial={{ opacity: 0, y: 14, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 1.01 }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="grid gap-[10px]"
                    style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
                  >
                    {balancedColumns.map((column, columnIndex) => (
                      <div key={columnIndex} className="flex flex-col gap-[10px]">
                        {column.map((item) => (
                          <GalleryImage
                            key={item.index}
                            thumbSrc={item.image.thumb}
                            fullSrc={item.image.full}
                            index={item.index}
                            onOpenLightbox={openLightbox}
                          />
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ColumnItem {
  image: GalleryImageAsset;
  index: number;
}

function buildBalancedColumns(images: GalleryImageAsset[], columnCount: number, ratios: Record<string, number>) {
  const safeColumnCount = Math.max(1, columnCount);
  const columns: ColumnItem[][] = Array.from({ length: safeColumnCount }, () => []);
  const columnHeights = Array.from({ length: safeColumnCount }, () => 0);

  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];
    const ratio = ratios[image.thumb] ?? 1;
    const estimatedHeight = 1 / ratio;
    let targetColumn = 0;

    for (let i = 1; i < safeColumnCount; i += 1) {
      if (columnHeights[i] < columnHeights[targetColumn]) {
        targetColumn = i;
      }
    }

    columns[targetColumn].push({ image, index });
    // Include a tiny fixed card chrome offset to improve balancing for portrait-heavy sets.
    columnHeights[targetColumn] += estimatedHeight + 0.06;
  }

  return columns;
}

function useResponsiveColumns() {
  const getColumns = useCallback((width: number) => {
    if (width >= 1280) {
      return 4;
    }

    if (width >= 900) {
      return 3;
    }

    return 2;
  }, []);

  const [columns, setColumns] = useState(() => {
    if (typeof window === "undefined") {
      return 4;
    }

    return getColumns(window.innerWidth);
  });

  useEffect(() => {
    const onResize = () => setColumns(getColumns(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getColumns]);

  return columns;
}

function useImageAspectRatios(images: GalleryImageAsset[]) {
  const [ratios, setRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;

    const missingImages = images.map((image) => image.thumb).filter((src) => ratios[src] === undefined);
    if (missingImages.length === 0) {
      return;
    }

    const loadRatios = async () => {
      const entries = await Promise.all(
        missingImages.map(
          (src) =>
            new Promise<[string, number]>((resolve) => {
              const image = new Image();
              image.onload = () => {
                const width = image.naturalWidth || 1;
                const height = image.naturalHeight || 1;
                resolve([src, width / height]);
              };
              image.onerror = () => resolve([src, 1]);
              image.src = src;
            }),
        ),
      );

      if (cancelled) {
        return;
      }

      setRatios((prev) => {
        const next = { ...prev };
        for (const [src, ratio] of entries) {
          next[src] = ratio;
        }
        return next;
      });
    };

    loadRatios();

    return () => {
      cancelled = true;
    };
  }, [images, ratios]);

  return ratios;
}

interface GalleryImageProps {
  thumbSrc: string;
  fullSrc: string;
  index: number;
  onOpenLightbox: (startIndex: number) => void;
}

function GalleryImage({ thumbSrc, fullSrc, index, onOpenLightbox }: GalleryImageProps) {
  const fileName = `img_${String(index + 1).padStart(3, "0")}`;

  return (
    <div className="group relative w-full overflow-hidden border border-[var(--dark-grey)] bg-[var(--card)] hover:border-[var(--metallic-silver)] transition-all duration-300">
      <div className="h-6 bg-[var(--primary)] border-b border-black px-2 flex items-center">
        <span className="font-mono text-[11px] text-[var(--deep-black)]">{fileName}</span>
      </div>

      <a
        href={fullSrc}
        className="block w-full cursor-zoom-in"
        onClick={(event) => {
          event.preventDefault();
          onOpenLightbox(index);
        }}
      >
        <img
          src={thumbSrc}
          alt={`Gallery image ${index + 1}`}
          className="w-full h-auto block opacity-85 group-hover:opacity-100"
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  );
}
