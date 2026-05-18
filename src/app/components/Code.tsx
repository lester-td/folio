import { Bot, CalendarDays, ExternalLink, FileText, Globe, Monitor, Wrench, type LucideIcon } from "lucide-react";
import aroltdBadge from "../../assets/badges/aroltd.gif";
import flashMoeBadge from "../../assets/badges/flash-moe.gif";
import flashiiBadge from "../../assets/badges/flashii.gif";
import kpw4Badge from "../../assets/badges/kpw4.gif";
import lachrymalBadge from "../../assets/badges/lachrymal.gif";
import lesterBadge from "../../assets/badges/lester.gif";
import neekopageBadge from "../../assets/badges/neekopage-badge.gif";
import nookZoneBadge from "../../assets/badges/nook-zone.gif";
import oskBadge from "../../assets/badges/osk.gif";
import saikuruBadge from "../../assets/badges/saikuru.gif";
import szylolBadge from "../../assets/badges/szylol.gif";
import tthewBadge from "../../assets/badges/tthew.space.gif";

const projects: Project[] = [
  {
    title: "Folio",
    description:
      "The website you are viewing right now!",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "MDX", "Fancybox"],
    repo: "https://github.com/lester-td/folio",
    label: "repo_01",
    source: "github",
    previewType: "icon",
    icon: Globe,
    iconTone: "bg-[#d4f2ff] text-[#0f4c81]",
    closedSource: false,
    workInProgress: false,
    published: true,
  },
  {
    title: "SUSS Planner",
    description:
      "Inspired by NUSmods, it is a web application that helps SUSS students plan their semester by providing an interactive timetable builder.",
    tech: ["JavaScript SPA", "Node", "Drizzle ORM", "PostgreSQL"],
    repo: "https://github.com/Simplificatedd/SUSSplanner",
    label: "repo_02",
    source: "github",
    previewType: "icon",
    icon: CalendarDays,
    iconTone: "bg-[#d8f8e4] text-[#116149]",
    closedSource: false,
    workInProgress: false,
    published: false,
  },
  {
    title: "RafflesGo (CS3213 Project)",
    description:
      "Inspired by NUSmods, it is a web application that helps SUSS students plan their semester by providing an interactive timetable builder.",
    tech: ["React", "Vite", "Tailwind CSS", "Fastify", "TypeScript", "Firebase", "OpenAPI"],
    repo: "https://github.com/",
    label: "repo_02",
    source: "github",
    previewType: "icon",
    icon: CalendarDays,
    iconTone: "bg-[#d8f8e4] text-[#116149]",
    closedSource: false,
    workInProgress: false,
    published: false,
  },
  {
    title: "PDIG Telegram Bot",
    description:
      "A telegram bot that automates event notifcations and attendance forecasting for the SUSS Production Interest Group.",
    tech: ["Python", "Telegram Bot API"],
    repo: "https://github.com/lester-td/pdig-telegram-bot",
    label: "repo_03",
    source: "github",
    previewType: "icon",
    icon: Bot,
    iconTone: "bg-[#dbe9ff] text-[#1f4fa0]",
    closedSource: false,
    workInProgress: true,
    published: true,
  },
  {
    title: "SUSS Scraper",
    description:
      "Scrapes SUSS course information and class schedules for easier integration with other applications and services. Output provided in JSON and SQL.",
    tech: ["Node.js", "TypeScript", "Python", "pdfplumber", "postgresql"],
    repo: "https://github.com/lester-td/suss-scraper",
    label: "repo_04",
    source: "github",
    previewType: "icon",
    icon: FileText,
    iconTone: "bg-[#ffeccf] text-[#8a4d00]",
    closedSource: false,
    workInProgress: false,
    published: true,
  },
  {
    title: "Win2K Web",
    description:
      "Win2K Web is a nostalgic throwback to 1990s UI, featuring a collection of mini-projects and experiments that capture the essence of that era's design.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://old.lester.page",
    repo: "https://github.com/lester-td/win2k-web",
    label: "repo_05",
    source: "github",
    previewType: "icon",
    icon: Monitor,
    iconTone: "bg-[#f1dcff] text-[#6b2aa0]",
    closedSource: false,
    workInProgress: false,
    published: true,
  },
  {
    title: "Flashii Chat Userscripts",
    description:
      "A collection of userscripts designed to extend the functionality of a friend's chat platform, adding various quality of life features.",
    tech: ["JavaScript", "HTML", "CSS"],
    repo: "https://patchii.net/lester/flashii-chat-userscripts",
    label: "repo_06",
    source: "patchii",
    previewType: "icon",
    icon: Wrench,
    iconTone: "bg-[#ffe1dc] text-[#8f311c]",
    closedSource: false,
    workInProgress: false,
    published: true
  },
];

const friendBadges: FriendBadge[] = [
  { href: "https://lester.page", imageSrc: lesterBadge, imageAlt: "lester.page" },
  { href: "https://flash.moe", imageSrc: flashMoeBadge, imageAlt: "flash.moe",},
  { href: "http://dev.aroltd.com", imageSrc: aroltdBadge, imageAlt: "aroltd" },
  { href: "https://kpworld.xyz", imageSrc: kpw4Badge, imageAlt: "kpworld" },
  { href: "https://lachrymal.net", imageSrc: lachrymalBadge, imageAlt: "lachrymal" },
  { href: "https://tthew.space", imageSrc: tthewBadge, imageAlt: "tthew.space" },
  { href: "https://neeko.page", imageSrc: neekopageBadge, imageAlt: "neeko.page" },
  { href: "https://nook.zone", imageSrc: nookZoneBadge, imageAlt: "nook.zone" },
  { href: "https://osk.sh", imageSrc: oskBadge, imageAlt: "osk.sh badge" },
  { href: "https://saikuru.net", imageSrc: saikuruBadge, imageAlt: "saikuru" },
  { href: "https://szy.lol", imageSrc: szylolBadge, imageAlt: "szy.lol" },
  { href: "https://flashii.net", imageSrc: flashiiBadge, imageAlt: "flashii" },
];

export function Code() {
  const visibleProjects = projects.filter((project) => project.published);

  return (
    <div className="w-full px-3 py-6 sm:px-4 sm:py-8 md:px-8 md:py-10 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative border border-[var(--dark-grey)] bg-[var(--secondary)] shadow-[4px_4px_0_0_#000]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)]">code</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--dark-grey)]">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        <aside className="mt-4 sm:mt-5 md:mt-6 w-full md:w-[395px] lg:w-[600px] md:ml-auto border border-[var(--dark-grey)] bg-[var(--card)] shadow-[4px_4px_0_0_#000]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)]">88x31 badges</span>
          </div>

          <section className="border-t border-[var(--dark-grey)] bg-black/40">
            <div className="h-6 border-b border-[var(--dark-grey)] px-2 flex items-center bg-[var(--deep-black)]">
              <span className="font-mono text-[10px] tracking-wide uppercase text-[var(--metallic-silver)]">check out my friends</span>
            </div>
            <div className="p-2 flex flex-wrap gap-2 lg:grid lg:grid-cols-6 lg:gap-2">
              {friendBadges.map((badge) => (
                <FriendBadgeLink key={badge.href} badge={badge} />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  demo?: string;
  repo: string;
  label: string;
  source: string;
  previewType: "icon" | "image";
  icon: LucideIcon;
  iconTone: string;
  published: boolean;
  workInProgress?: boolean;
  closedSource?: boolean;
  image?: string;
  imageAlt?: string;
}

interface FriendBadge {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title?: string;
}

interface FriendBadgeLinkProps {
  badge: FriendBadge;
}

interface ProjectCardProps {
  project: Project;
}

interface StatusIconProps {
  className?: string;
}

function WorkInProgressIcon({ className }: StatusIconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334" />
    </svg>
  );
}

function ClosedSourceIcon({ className }: StatusIconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
    </svg>
  );
}

function FriendBadgeLink({ badge }: FriendBadgeLinkProps) {
  return (
    <a
      href={badge.href}
      title={badge.title}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center"
    >
      <img src={badge.imageSrc} alt={badge.imageAlt} className="w-[88px] h-[31px] object-contain [image-rendering:pixelated]" loading="lazy" />
    </a>
  );
}

function ProjectCard({ project }: ProjectCardProps) {
  const Icon = project.icon;
  const showImagePreview = project.previewType === "image" && Boolean(project.image);
  const status = project.closedSource
    ? { label: "Closed Source", icon: ClosedSourceIcon }
    : project.workInProgress
      ? { label: "Work in Progress", icon: WorkInProgressIcon }
      : null;
  const StatusIcon = status?.icon;

  return (
    <div className="group relative bg-[var(--deep-black)] hover:bg-black transition-colors duration-300 md:min-h-[300px] lg:min-h-[320px] flex flex-col">
      <div className="h-6 bg-[var(--primary)] border-b border-black px-2 flex items-center justify-between">
        <span className="font-mono text-[11px] text-[var(--deep-black)]">{project.label}</span>
        <span className="font-mono text-[11px] text-[var(--deep-black)]">{project.source}</span>
      </div>

      <div className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-mono text-lg sm:text-xl text-[var(--metallic-silver)]">{project.title}</h3>
        </div>

        <div className="flex items-start gap-3 lg:items-stretch">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 self-start shrink-0 overflow-hidden border border-[var(--dark-grey)] flex items-center justify-center ${
              showImagePreview ? "bg-black/40" : project.iconTone
            }`}
          >
            {showImagePreview ? (
              <img
                src={project.image}
                alt={project.imageAlt ?? `${project.title} preview`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <Icon
                aria-hidden="true"
                className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.8}
              />
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="border border-[var(--dark-grey)] bg-[var(--card)] p-2">
              <p className="text-[var(--muted-foreground)] text-[11px] sm:text-xs leading-relaxed font-mono">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-0.5 bg-black border border-[var(--dark-grey)] font-mono text-[11px] text-[var(--metallic-accent)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-2 border-t border-dashed border-[var(--dark-grey)] flex items-center justify-end gap-2">
          {status && StatusIcon ? (
            <span
              className="px-3 py-1 font-mono text-[11px] inline-flex items-center gap-1 border border-[var(--dark-grey)] bg-black/40 text-[var(--metallic-accent)]"
              aria-label={status.label}
            >
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          ) : (
            <>
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mechanical-button px-3 py-1 font-mono text-[11px] inline-flex items-center gap-1"
                >
                  Demo <ExternalLink className="w-3 h-3" />
                </a>
              ) : null}
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="mechanical-button px-3 py-1 font-mono text-[11px] inline-flex items-center gap-1">
                View <ExternalLink className="w-3 h-3" />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
