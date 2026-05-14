import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

interface SoftwarePortfolioProps {
  scrollProgress: number;
}

const projects = [
  {
    title: "Lorem Ipsum Alpha",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tech: ["Lorem", "Ipsum", "Dolor", "Sit"],
    repo: "https://github.com",
    label: "repo_01",
    source: "github",
    image: "https://picsum.photos/seed/repo-01/800/450",
  },
  {
    title: "Dolor Sit Beta",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tech: ["Amet", "Consectetur", "Adipiscing", "Elit"],
    repo: "https://github.com",
    label: "repo_02",
    source: "gitlab",
    image: "https://picsum.photos/seed/repo-02/800/450",
  },
  {
    title: "Amet Gamma",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tech: ["Tempor", "Incididunt", "Labore", "Magna"],
    repo: "https://github.com",
    label: "repo_03",
    source: "patchii",
    image: "https://picsum.photos/seed/repo-03/800/450",
  },
  {
    title: "Consectetur Delta",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tech: ["Aliqua", "Veniam", "Nostrud", "Exercitation"],
    repo: "https://github.com",
    label: "repo_04",
    source: "github",
    image: "https://picsum.photos/seed/repo-04/800/450",
  },
  {
    title: "Adipiscing Epsilon",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    tech: ["Ullamco", "Laboris", "Commodo", "Consequat"],
    repo: "https://github.com",
    label: "repo_05",
    source: "gitlab",
    image: "https://picsum.photos/seed/repo-05/800/450",
  },
  {
    title: "Tempor Zeta",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
    tech: ["Reprehenderit", "Voluptate", "Fugiat", "Pariatur"],
    repo: "https://github.com",
    label: "repo_06",
    source: "patchii",
    image: "https://picsum.photos/seed/repo-06/800/450",
  },
];

export function SoftwarePortfolio({ scrollProgress }: SoftwarePortfolioProps) {
  const fadeInStart = 0.15;
  const fadeInEnd = 0.3;
  const fadeOutStart = 0.45;
  const fadeOutEnd = 0.62;

  const fadeInProgress = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
  const fadeOutProgress = (fadeOutEnd - scrollProgress) / (fadeOutEnd - fadeOutStart);

  const opacity = Math.min(1, Math.max(0, fadeInProgress), Math.max(0, fadeOutProgress));

  return (
    <motion.div
      className="min-h-screen py-16 px-4 md:px-8 lg:px-10"
      style={{
        opacity,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="border border-[var(--dark-grey)]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)]">code</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--dark-grey)]">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  repo: string;
  label: string;
  source: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-[var(--deep-black)] hover:bg-black transition-colors duration-300 min-h-[320px] flex flex-col"
    >
      <div className="h-6 bg-[var(--primary)] border-b border-black px-2 flex items-center justify-between">
        <span className="font-mono text-[11px] text-[var(--deep-black)]">{project.label}</span>
        <span className="font-mono text-[11px] text-[var(--deep-black)]">{project.source}</span>
      </div>

      <div className="p-3 space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-mono text-xl text-[var(--metallic-silver)]">{project.title}</h3>
        </div>

        <div className="flex items-stretch gap-3">
          <div className="w-28 shrink-0 overflow-hidden border border-[var(--dark-grey)] bg-black/40">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="border border-[var(--dark-grey)] bg-[var(--card)] p-2">
              <p className="text-[var(--muted-foreground)] text-xs leading-relaxed font-mono">{project.description}</p>
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
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="mechanical-button px-3 py-1 font-mono text-[11px] inline-flex items-center gap-1">
            View <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
