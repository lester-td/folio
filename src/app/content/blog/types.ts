import type { ComponentType } from "react";

export interface BlogFrontmatter {
  title: string;
  summary: string;
  date: string;
  time?: string;
  tags: string[];
  category: string;
  published?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  time?: string;
  tags: string[];
  category: string;
  Content: ComponentType;
}

export interface BlogMdxModule {
  default: ComponentType;
  frontmatter?: Partial<BlogFrontmatter>;
}
