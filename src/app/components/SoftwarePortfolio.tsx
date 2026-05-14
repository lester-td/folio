import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

interface SoftwarePortfolioProps {
  scrollProgress: number;
}

const projects = [
  {
    title: "RafflesGo",
    description:
      "High-performance raffle management system with real-time participant tracking and automated winner selection",
    tech: ["Python", "Flask", "Redis", "PostgreSQL"],
    repo: "https://github.com",
    label: "APP_01",
    metric: "COMMITS: 842",
  },
  {
    title: "Infrastructure Automation",
    description:
      "Container orchestration pipeline with automated deployment, monitoring, and rollback capabilities",
    tech: ["Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    repo: "https://github.com",
    label: "SYS_02",
    metric: "UPTIME: 99.9%",
  },
  {
    title: "API Gateway",
    description:
      "Scalable API gateway with rate limiting, authentication, and request routing for microservices architecture",
    tech: ["Nginx", "Node.js", "Redis", "OAuth2"],
    repo: "https://github.com",
    label: "API_03",
    metric: "REQ/S: 14.2K",
  },
  {
    title: "Data Pipeline",
    description:
      "ETL pipeline for processing and analyzing large-scale event data with real-time streaming capabilities",
    tech: ["Python", "Apache Kafka", "Spark", "Airflow"],
    repo: "https://github.com",
    label: "ETL_04",
    metric: "JOBS/DAY: 320",
  },
  {
    title: "Monitoring Stack",
    description:
      "Comprehensive observability platform with custom metrics, logging aggregation, and alerting system",
    tech: ["Prometheus", "Grafana", "ELK Stack", "Alert Manager"],
    repo: "https://github.com",
    label: "MON_05",
    metric: "ALERTS: 42",
  },
  {
    title: "CI/CD Platform",
    description:
      "End-to-end continuous integration and deployment platform with multi-environment support and rollback",
    tech: ["Jenkins", "ArgoCD", "Docker", "Kubernetes"],
    repo: "https://github.com",
    label: "CI_06",
    metric: "DEPLOYS/WK: 61",
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
        <div className="h-14 border border-[var(--dark-grey)] bg-[var(--card)] px-4 flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="font-mono text-lg md:text-2xl text-[var(--metallic-silver)]">SOFTWARE_PORTFOLIO</h2>
            <div className="h-4 w-px bg-[var(--dark-grey)]" />
            <span className="font-mono text-xs text-[var(--metallic-accent)]">DIR: /PROJECTS/ACTIVE</span>
          </div>
          <span className="font-mono text-xs text-[var(--metallic-accent)]">STATUS: ONLINE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--dark-grey)] border border-[var(--dark-grey)]">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
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
  metric: string;
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
        <span className="font-mono text-[11px] text-[var(--deep-black)]">min</span>
      </div>

      <div className="p-4 space-y-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-mono text-xl text-[var(--metallic-silver)]">{project.title}</h3>
          <span className="px-2 py-0.5 border border-[var(--dark-grey)] bg-[var(--card)] font-mono text-[11px] text-[var(--muted-foreground)]">
            LIVE
          </span>
        </div>

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

        <div className="mt-auto pt-3 border-t border-dashed border-[var(--dark-grey)] flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-[var(--muted-foreground)]">{project.metric}</span>
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="mechanical-button px-3 py-1 font-mono text-[11px] inline-flex items-center gap-1">
            VIEW_REPO <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
