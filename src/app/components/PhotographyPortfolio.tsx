import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface PhotographyPortfolioProps {
  scrollProgress: number;
}

const galleries = [
  {
    id: "production",
    title: "PRODUCTION",
    description: "STAGE_LIGHTING :: CONCERT_COVERAGE :: TECHNICAL_DIRECTION",
    images: [
      "https://images.unsplash.com/photo-1777671291459-111add7d4e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwcHJvZHVjdGlvbiUyMHN0YWdlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc4NjkyMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1763560595910-0141a43e06ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb25jZXJ0JTIwcHJvZHVjdGlvbiUyMHN0YWdlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc4NjkyMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1770460098659-df02b4ba9fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjb25jZXJ0JTIwcHJvZHVjdGlvbiUyMHN0YWdlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc4NjkyMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1777466927084-32ad641d12d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb25jZXJ0JTIwcHJvZHVjdGlvbiUyMHN0YWdlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc4NjkyMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1768739538840-9c6d88d38656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjb25jZXJ0JTIwcHJvZHVjdGlvbiUyMHN0YWdlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc4NjkyMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1765277873864-5234fa063cab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxjb25jZXJ0JTIwcHJvZHVjdGlvbiUyMHN0YWdlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc4NjkyMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1696946908408-4b435f6c367a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxjb25jZXJ0JTIwcHJvZHVjdGlvbiUyMHN0YWdlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc4NjkyMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1696946920402-395088c320bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxjb25jZXJ0JTIwcHJvZHVjdGlvbiUyMHN0YWdlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc4NjkyMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "events",
    title: "CORPORATE_EVENTS",
    description: "BUSINESS_COVERAGE :: CONFERENCES :: AWARD_CEREMONIES",
    images: [
      "https://images.unsplash.com/photo-1768851244529-39180171a168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1772690445981-78b22eacda4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb3Jwb3JhdGUlMjBldmVudCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1768508663007-997685a1ff01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBldmVudCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1759560270562-468e8ba866e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjb3Jwb3JhdGUlMjBldmVudCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1763429338698-439aa108e7fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxjb3Jwb3JhdGUlMjBldmVudCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1772196775062-48c49fc0a43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxjb3Jwb3JhdGUlMjBldmVudCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1777756307032-14f9aca6240f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxjb3Jwb3JhdGUlMjBldmVudCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "portraits",
    title: "PORTRAITS",
    description: "PROFESSIONAL_HEADSHOTS :: CREATIVE_SESSIONS :: EDITORIAL",
    images: [
      "https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3ODU5NTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1600366249664-acd65e33e5d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3ODU5NTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1594171549465-a28ba0220a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3ODU5NTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659303388053-6078a001ea21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3ODU5NTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659303388060-c11a6b055397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3ODU5NTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659303388076-de1535159d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3ODU5NTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659303388050-6340719de9d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3ODU5NTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "street",
    title: "STREET_URBAN",
    description: "CITY_LIFE :: CANDID_MOMENTS :: ARCHITECTURAL_DETAILS",
    images: [
      "https://images.unsplash.com/photo-1598087216773-d02ad98034f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1670612099626-3aa3f4505ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1675282500942-151fc0a73565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1649024040566-d00036b8c40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1682936189834-9e03bf5a61af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1687786281093-a063b016ac81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1698879339002-2a1fbfe6de42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1627638156941-7c724ddbbec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1552564273-8706ec2f9500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3ODY5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

export function PhotographyPortfolio({ scrollProgress }: PhotographyPortfolioProps) {
  const [currentGallery, setCurrentGallery] = useState(0);
  const isVisible = scrollProgress > 0.55;
  const opacity = isVisible ? Math.min(1, (scrollProgress - 0.55) * 3) : 0;

  const nextGallery = () => {
    setCurrentGallery((prev) => (prev + 1) % galleries.length);
  };

  const prevGallery = () => {
    setCurrentGallery((prev) => (prev - 1 + galleries.length) % galleries.length);
  };

  return (
    <motion.div
      className="min-h-screen py-16 px-4 md:px-8"
      style={{
        opacity,
      }}
    >
      <div className="max-w-[2000px] mx-auto">
        <div className="border border-[var(--dark-grey)]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)] lowercase">photo | {galleries[currentGallery].title}</span>
          </div>

          {/* Album selector */}
          <div className="mb-3 bg-[var(--secondary)] px-3 py-2 flex items-center gap-2 overflow-x-auto">
            <button onClick={prevGallery} className="mechanical-button px-2 py-0.5 shrink-0">
              <ChevronLeft className="w-5 h-5 text-[var(--metallic-accent)]" />
            </button>

            <div className="flex gap-2 min-w-max">
              {galleries.map((gallery, index) => (
                <button
                  key={gallery.id}
                  onClick={() => setCurrentGallery(index)}
                  className={`group relative px-4 py-1.5 border font-mono text-sm transition-all ${
                    currentGallery === index
                      ? "border-[var(--metallic-silver)] bg-[var(--dark-grey)] text-[var(--metallic-silver)]"
                      : "border-[var(--dark-grey)] bg-[var(--secondary)] text-[var(--metallic-accent)] hover:border-[var(--metallic-accent)]"
                  }`}
                >
                  <span className="hidden md:inline lowercase">{gallery.title}</span>
                  <span className="md:hidden">{index + 1}</span>
                  {currentGallery === index && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--metallic-silver)]" />
                  )}
                </button>
              ))}
            </div>

            <button onClick={nextGallery} className="mechanical-button px-2 py-0.5 shrink-0">
              <ChevronRight className="w-5 h-5 text-[var(--metallic-accent)]" />
            </button>
          </div>

          <div className="overflow-hidden">
            <motion.div
              key={currentGallery}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="p-3"
            >
              <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 768: 2, 1024: 3, 1280: 4 }}>
                <Masonry gutter="10px">
                  {galleries[currentGallery].images.map((image, index) => (
                    <GalleryImage key={index} src={image} index={index} />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface GalleryImageProps {
  src: string;
  index: number;
}

function GalleryImage({ src, index }: GalleryImageProps) {
  const isPortrait = index % 2 === 0;

  return (
    <motion.div
      initial={false}
      className="group relative w-full overflow-hidden border border-[var(--dark-grey)] bg-[var(--card)] hover:border-[var(--metallic-silver)] transition-all duration-300"
    >
      <div className="h-6 bg-[var(--primary)] border-b border-black px-2 flex items-center">
        <span className="font-mono text-[11px] text-[var(--deep-black)]">img_{String(index + 1).padStart(3, "0")}.jpeg</span>
      </div>

      <div style={{ aspectRatio: isPortrait ? "3 / 4" : "4 / 3" }}>
        <img
          src={src}
          alt={`Gallery image ${index + 1}`}
          className="w-full h-full object-cover block opacity-85 group-hover:opacity-100"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
