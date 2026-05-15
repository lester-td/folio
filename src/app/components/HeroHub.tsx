import { motion } from "motion/react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export function HeroHub() {
  return (
    <motion.div
      className="w-full flex items-center justify-center px-3 py-8 sm:px-4 sm:py-12 lg:py-16"
    >
      <div className="relative w-full max-w-6xl">
        <div className="relative border border-[var(--dark-grey)] bg-[var(--secondary)] shadow-[4px_4px_0_0_#000]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)]">links</span>
          </div>

          <div className="grid md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_280px]">
            <div className="p-4 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-[var(--dark-grey)] bg-[var(--deep-black)]">
              <div className="flex flex-row items-stretch gap-4 sm:gap-5">
                <div className="order-2 flex-1 min-w-0">
                  <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-[var(--metallic-silver)]">
                    Lester Thomas
                  </h1>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed border-l-2 border-[var(--metallic-silver)] pl-4 max-w-xl">
                    Information and communication technology student with a passion for web development, photography, and design.
                  </p>
                  <div className="mt-4 sm:mt-6 border border-[var(--dark-grey)] bg-black/40 p-3 font-mono text-[11px] sm:text-xs text-[var(--metallic-accent)]">
                    &gt; what the fuck do i put here
                    <br />
                    &gt; sudo rm -rf /
                  </div>

                </div>

                <div className="order-1 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 self-start border border-[var(--dark-grey)] bg-[var(--card)] flex items-center justify-center">
                  <span className="font-mono text-xs tracking-wide text-[var(--muted-foreground)] uppercase">
                    Profile Photo
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-[var(--card)] flex items-center">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-3 w-full">
                <SocialButton href="https://github.com" icon={<Github className="w-5 h-5" />} label="Github" />
                <SocialButton
                  href="https://linkedin.com"
                  icon={<Linkedin className="w-5 h-5" />}
                  label="Linkedin"
                />
                <SocialButton
                  href="https://instagram.com"
                  icon={<Instagram className="w-5 h-5" />}
                  label="Instagram"
                />
                <SocialButton href="mailto:contact@example.com" icon={<Mail className="w-5 h-5" />} label="Email" />
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--dark-grey)] px-4 py-2 font-mono text-xs text-[var(--metallic-accent)] flex items-center justify-start gap-2">
            <span className="relative inline-flex h-5 w-8 items-center justify-center">
              <span className="absolute translate-y-[-2px] text-base text-[var(--metallic-silver)] opacity-80 scale-x-[2]">▼</span>
            </span>
            <span className="tracking-wide uppercase text-[11px] text-[var(--metallic-silver)]">scroll to explore</span>
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
