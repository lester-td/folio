import { useEffect, useState } from "react";
import { Github, Linkedin, Instagram, Mail, Code2, Camera } from "lucide-react";

interface HeroHubProps {
  onNavigate: (sectionId: "code" | "photo") => void;
}

export function HeroHub({ onNavigate }: HeroHubProps) {
  const [now, setNow] = useState(new Date());

  const getOrdinalDay = (day: number) => {
    if (day % 100 >= 11 && day % 100 <= 13) {
      return `${day}th`;
    }
    if (day % 10 === 1) {
      return `${day}st`;
    }
    if (day % 10 === 2) {
      return `${day}nd`;
    }
    if (day % 10 === 3) {
      return `${day}rd`;
    }
    return `${day}th`;
  };

  const formatLocalTime = (date: Date) => {
    const time = date.toLocaleTimeString("en-SG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const month = date.toLocaleString("en-SG", { month: "long" }).toLowerCase();
    const day = getOrdinalDay(date.getDate());
    return `${time} ${month} ${day}`;
  };

  useEffect(() => {
    const timerId = window.setInterval(() => setNow(new Date()), 1000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center px-3 py-3 sm:px-4 sm:py-4 md:py-12 lg:py-16">
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
                  <div className="mt-4 sm:mt-6 border border-[var(--dark-grey)] bg-black/40 p-3 font-mono text-[11px] sm:text-xs text-[var(--metallic-accent)] leading-relaxed break-all">
                    &gt; based in singapore
                    <br />
                    &gt; local time {formatLocalTime(now)}
                  </div>

                </div>

                <div className="order-1 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 self-start border border-[var(--dark-grey)] bg-[var(--card)] flex items-center justify-center">
                  <span className="font-mono text-xs tracking-wide text-[var(--muted-foreground)] uppercase">
                    Profile Photo
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 bg-[var(--card)] flex items-center">
              <div className="w-full space-y-2.5">
                <section className="border border-[var(--dark-grey)] bg-black/40">
                  <div className="h-6 border-b border-[var(--dark-grey)] px-2 flex items-center bg-[var(--deep-black)]">
                    <span className="font-mono text-[10px] tracking-wide uppercase text-[var(--metallic-silver)]">portfolios</span>
                  </div>
                  <div className="p-2 flex flex-wrap gap-2 sm:grid sm:grid-cols-2 sm:gap-2">
                    <PortfolioButton
                      icon={<Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      label="Code"
                      onClick={() => onNavigate("code")}
                      ariaLabel="Switch to code page"
                    />
                    <PortfolioButton
                      icon={<Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      label="Photo"
                      onClick={() => onNavigate("photo")}
                      ariaLabel="Switch to photo page"
                    />
                  </div>
                </section>

                <section className="border border-[var(--dark-grey)] bg-black/40">
                  <div className="h-6 border-b border-[var(--dark-grey)] px-2 flex items-center bg-[var(--deep-black)]">
                    <span className="font-mono text-[10px] tracking-wide uppercase text-[var(--metallic-silver)]">links</span>
                  </div>
                  <div className="p-2 flex flex-wrap gap-2 sm:grid sm:grid-cols-2 sm:gap-2">
                    <SocialButton href="https://github.com" icon={<Github className="w-4 h-4 sm:w-5 sm:h-5" />} label="Github" />
                    <SocialButton
                      href="https://linkedin.com"
                      icon={<Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />}
                      label="Linkedin"
                    />
                    <SocialButton
                      href="https://instagram.com"
                      icon={<Instagram className="w-4 h-4 sm:w-5 sm:h-5" />}
                      label="Instagram"
                    />
                    <SocialButton href="mailto:contact@example.com" icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />} label="Email" />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface PortfolioButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  ariaLabel: string;
}

function PortfolioButton({ icon, label, onClick, ariaLabel }: PortfolioButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mechanical-button w-auto sm:w-full px-1.5 py-1.5 sm:px-2 sm:py-2 font-mono text-[10px] sm:text-[11px] tracking-wide lowercase inline-flex items-center justify-start gap-1.5 sm:gap-2"
      aria-label={ariaLabel}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function SocialButton({ href, icon, label }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mechanical-button w-auto sm:w-full px-1.5 py-1.5 sm:px-2 sm:py-2 font-mono text-[10px] sm:text-[11px] tracking-wide lowercase inline-flex items-center justify-start gap-1.5 sm:gap-2"
    >
      <span className="text-[var(--deep-black)]">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
