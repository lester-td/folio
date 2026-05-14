import { motion } from "motion/react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

interface HeroHubProps {
  scrollProgress: number;
}

export function HeroHub({ scrollProgress }: HeroHubProps) {
  const opacity = Math.max(0, 1 - scrollProgress * 3);
  const scale = Math.max(0.8, 1 - scrollProgress * 0.5);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
      style={{
        opacity,
        scale,
      }}
    >
      <div className="relative pointer-events-auto w-full max-w-5xl px-4">
        <div className="relative border border-[var(--dark-grey)] bg-[var(--secondary)] shadow-[4px_4px_0_0_#000]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-3 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">ARCHIVE_01</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)]">SYSTEM.INIT</span>
          </div>

          <div className="grid md:grid-cols-[1fr_270px]">
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[var(--dark-grey)] bg-[var(--deep-black)]">
              <h1 className="text-3xl md:text-5xl tracking-tight text-[var(--metallic-silver)]">
                Lester Thomas
              </h1>
              <p className="mt-6 text-[var(--muted-foreground)] leading-relaxed border-l-2 border-[var(--metallic-silver)] pl-4 max-w-xl">
                Executing high-performance code and capturing structural aesthetics. Bridging logic and visual composition.
              </p>
              <div className="mt-6 border border-[var(--dark-grey)] bg-black/40 p-3 font-mono text-xs text-[var(--metallic-accent)]">
                &gt; SYSTEM.QUERY(USER_SKILLS);
                <br />
                &gt; [LOADING MODULES...]
                <br />
                <span className="text-[var(--metallic-silver)]">REACT.JS, NODE_ENV, RAW_PROCESSING</span>
              </div>
            </div>

            <div className="p-6 bg-[var(--card)]">
              <p className="font-mono text-xs text-[var(--metallic-accent)] mb-3 text-center">EXTERNAL_LINKS</p>
              <div className="grid gap-3">
                <SocialButton href="https://github.com" icon={<Github className="w-5 h-5" />} label="GIT_HUB" />
                <SocialButton
                  href="https://linkedin.com"
                  icon={<Linkedin className="w-5 h-5" />}
                  label="LINKED_IN"
                />
                <SocialButton
                  href="https://instagram.com"
                  icon={<Instagram className="w-5 h-5" />}
                  label="INSTAGRAM"
                />
                <SocialButton href="mailto:contact@example.com" icon={<Mail className="w-5 h-5" />} label="EMAIL_COMMS" />
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--dark-grey)] px-4 py-2 font-mono text-xs text-[var(--metallic-accent)] flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--metallic-accent)] animate-pulse" />
            SCROLL TO EXPLORE
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialButton({ href, icon, label }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mechanical-button px-4 py-3 font-mono text-xs tracking-wide uppercase flex items-center justify-between gap-2"
    >
      <span>{label}</span>
      <span className="text-[var(--deep-black)]">{icon}</span>
    </a>
  );
}
