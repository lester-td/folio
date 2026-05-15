# folio

personal portfolio site built with React + Vite.

## stack

- React 18
- TypeScript
- Vite
- Tailwind CSS 4
- MDX (blog posts)
- Fancybox (image lightbox)

## local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## project structure

- `src/app/components/Photo.tsx`: photo galleries page and lightbox behavior
- `src/app/components/Blog.tsx`: blog list and blog post page UI
- `src/app/content/blog/index.ts`: MDX import, validation, filtering, sorting
- `src/app/content/blog/posts/*.mdx`: blog content files
- `src/assets/gallery/<gallery-id>/*`: full-size gallery images
- `src/assets/gallery-thumbs/<gallery-id>/*`: generated gallery thumbnails
- `scripts/generate-thumbs.mjs`: thumbnail generation script

## photos

Photo galleries are auto-built from folders inside `src/assets/gallery`.

- Each folder becomes one gallery tab (example: `portraits`, `events`, `film`)
- Images are loaded with `import.meta.glob`
- If a thumbnail exists in `src/assets/gallery-thumbs`, it is used in grid view
- If no thumbnail exists, the full image is used as fallback
- Clicking a photo opens the lightbox with full-resolution images

### gallery ordering

Gallery tab order is set manually in `customGalleryOrder` in `src/app/components/Photo.tsx`.
Any gallery not listed there is appended after the listed galleries.

### generating thumbnails

Run:

```bash
npm run thumbs
```

This script:

- scans `src/assets/gallery`
- creates matching files in `src/assets/gallery-thumbs`
- converts output to `.webp` (max width `640`, quality `70`)

## blog posts (MDX)

Create posts in `src/app/content/blog/posts` using `.mdx`.

Required frontmatter fields:

- `title` (string)
- `summary` (string)
- `date` (string, recommended format: `YYYY-MM-DD`)
- `tags` (string array)
- `category` (string)

Optional frontmatter fields:

- `time` (string, example: `14:30`)
- `published` (boolean; set `false` to hide a post)

Behavior:

- Posts with invalid frontmatter are skipped (and logged in console)
- Posts with `published: false` are hidden
- Posts are sorted newest-first using `date` + optional `time`

Minimal example:

```mdx
---
title: "My Post"
summary: "What this post is about."
date: "2026-05-15"
time: "14:30"
tags: ["react", "vite"]
category: "engineering"
published: true
---

Post body goes here.
```
