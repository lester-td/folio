import type { BlogFrontmatter, BlogMdxModule, BlogPost } from "./types";

const postModules = import.meta.glob<BlogMdxModule>("./posts/*.mdx", { eager: true });

const requiredFields: Array<keyof BlogFrontmatter> = [
  "title",
  "summary",
  "date",
  "tags",
  "category",
];

function slugFromPath(path: string) {
  return path.split("/").pop()?.replace(/\.mdx$/i, "") ?? path;
}

function hasRequiredFields(frontmatter: Partial<BlogFrontmatter>, slug: string) {
  for (const field of requiredFields) {
    if (frontmatter[field] === undefined || frontmatter[field] === null) {
      throw new Error(`Missing required frontmatter field "${field}" in blog post "${slug}.mdx".`);
    }
  }
}

function requireString(value: unknown, field: string, slug: string) {
  if (typeof value !== "string") {
    throw new Error(`Frontmatter field "${field}" in blog post "${slug}.mdx" must be a string.`);
  }

  return value;
}

function requireOptionalString(value: unknown, field: string, slug: string) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error(`Frontmatter field "${field}" in blog post "${slug}.mdx" must be a string when provided.`);
  }

  return value;
}

function requireStringArray(value: unknown, field: string, slug: string) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Frontmatter field "${field}" in blog post "${slug}.mdx" must be a string array.`);
  }

  return value;
}

function normalizePost(path: string, module: BlogMdxModule): BlogPost | null {
  const slug = slugFromPath(path);

  try {
    const frontmatter = module.frontmatter ?? {};
    hasRequiredFields(frontmatter, slug);

    if (frontmatter.published === false) {
      return null;
    }

    return {
      slug,
      title: requireString(frontmatter.title, "title", slug),
      summary: requireString(frontmatter.summary, "summary", slug),
      date: requireString(frontmatter.date, "date", slug),
      time: requireOptionalString(frontmatter.time, "time", slug),
      tags: requireStringArray(frontmatter.tags, "tags", slug),
      category: requireString(frontmatter.category, "category", slug),
      Content: module.default,
    };
  } catch (error) {
    console.error(`[blog] Skipping post "${slug}" due to invalid content.`, error);
    return null;
  }
}

function toTimestamp(date: string, time?: string) {
  const isoLike = time ? `${date}T${time}` : date;
  const timestamp = Date.parse(isoLike);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export const blogPosts = Object.entries(postModules)
  .map(([path, module]) => normalizePost(path, module))
  .filter((post): post is BlogPost => post !== null)
  .sort((a, b) => toTimestamp(b.date, b.time) - toTimestamp(a.date, a.time));
