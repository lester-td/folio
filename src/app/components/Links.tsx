import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail, Code2, Camera, FileText } from "lucide-react";
import profilePic from "../../assets/images/profile.gif";

export function Links() {
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
      <div className="relative w-full max-w-5xl">
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
                  <img
                    src={profilePic}
                    alt="Profile picture of Lester Thomas"
                    className="w-full h-full object-cover block"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 bg-[var(--card)] flex items-center">
              <div className="w-full space-y-2.5">
                <section className="border border-[var(--dark-grey)] bg-black/40">
                  <div className="h-6 border-b border-[var(--dark-grey)] px-2 flex items-center bg-[var(--deep-black)]">
                    <span className="font-mono text-[10px] tracking-wide uppercase text-[var(--metallic-silver)]">site sections</span>
                  </div>
                  <div className="p-2 flex flex-wrap gap-2 md:grid md:grid-cols-2 md:gap-2">
                    <PortfolioLink
                      icon={<Code2 className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      label="Code"
                      to="/code"
                      ariaLabel="Go to code page"
                      toneClass="pastel-button !bg-[#f8d7e5] hover:!bg-[#f4c7db]"
                    />
                    <PortfolioLink
                      icon={<Camera className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      label="Photo"
                      to="/photo"
                      ariaLabel="Go to photo page"
                      toneClass="pastel-button !bg-[#d8f0ff] hover:!bg-[#c5e7ff]"
                    />
                    <PortfolioLink
                      icon={<FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      label="Blog"
                      to="/blog"
                      ariaLabel="Go to blog page"
                      toneClass="pastel-button !bg-[#dff5db] hover:!bg-[#cdeec7]"
                    />
                  </div>
                </section>

                <section className="border border-[var(--dark-grey)] bg-black/40">
                  <div className="h-6 border-b border-[var(--dark-grey)] px-2 flex items-center bg-[var(--deep-black)]">
                    <span className="font-mono text-[10px] tracking-wide uppercase text-[var(--metallic-silver)]">socials & links</span>
                  </div>
                  <div className="p-2 flex flex-wrap gap-2 md:grid md:grid-cols-2 md:gap-2">
                    <SocialButton href="https://github.com" icon={<Github className="w-4 h-4 md:w-5 md:h-5" />} label="Github" />
                    <SocialButton
                      href="https://linkedin.com"
                      icon={<Linkedin className="w-4 h-4 md:w-5 md:h-5" />}
                      label="Linkedin"
                    />
                    <SocialButton
                      href="https://instagram.com"
                      icon={<Instagram className="w-4 h-4 md:w-5 md:h-5" />}
                      label="Instagram"
                    />
                    <SocialButton href="mailto:contact@example.com" icon={<Mail className="w-4 h-4 md:w-5 md:h-5" />} label="Email" />
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

interface PortfolioLinkProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  ariaLabel: string;
  toneClass?: string;
}

function PortfolioLink({ icon, label, to, ariaLabel, toneClass = "" }: PortfolioLinkProps) {
  return (
    <Link
      to={to}
      className={`mechanical-button w-auto md:w-full pl-1 pr-1.5 py-1.5 md:px-2 md:py-2 font-mono text-[10px] md:text-[11px] tracking-wide lowercase inline-flex items-center justify-start gap-1 md:gap-1.5 ${toneClass}`}
      aria-label={ariaLabel}
    >
      {icon}
      <span className="font-bold">{label}</span>
    </Link>
  );
}

function SocialButton({ href, icon, label }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mechanical-button w-auto md:w-full pl-1 pr-1.5 py-1.5 md:px-2 md:py-2 font-mono text-[10px] md:text-[11px] tracking-wide lowercase inline-flex items-center justify-start gap-1 md:gap-1.5"
    >
      <span className="text-[var(--deep-black)]">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
