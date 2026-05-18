# folio

Personal portfolio site built with React + Vite.

## stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- MDX (blog posts)
- Fancybox (image lightbox for photo/blog images)

## run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Generate gallery thumbnails:

```bash
npm run thumbs
```

## site structure

The app is routed in `src/app/App.tsx` and currently has 4 top-level pages:

- `/` -> `src/app/components/Links.tsx`: intro card, social links
- `/code` -> `src/app/components/Code.tsx`: code section with project cards and friends wall
- `/photo` -> `src/app/components/Photo.tsx`: galleries with lightbox
- `/blog` -> `src/app/components/Blog.tsx`: blog list with post detail and navigation
- `/blog/:slug` -> blog post detail page from `Blog.tsx`

`App.tsx` also handles:

- mobile + desktop navigation chrome
- swipe navigation between top-level pages on mobile
- animated route transitions
- initial thumbnail preloading on the links page

## code section

`src/app/components/Code.tsx`

- Projects are declared in a local `projects` array.
- Only projects with `published: true` are rendered.
- Card status supports:
  - `workInProgress: true` -> Work in Progress badge
  - `closedSource: true` -> Closed Source badge
- Cards can show:
  - repo link (`repo`)
  - optional live demo button (`demo`)
- Friend badges are declared in `friendBadges` and rendered as external links.

To add a new project, append one object to the `projects` array in `Code.tsx`.

## photo section

`src/app/components/Photo.tsx`

Photo galleries are generated automatically from assets.

- Source images: `src/assets/gallery/<gallery-id>/*`
- Thumbnails: `src/assets/gallery-thumbs/<gallery-id>/*`
- Images are loaded with `import.meta.glob`.
- If a thumbnail is missing, full image is used as fallback.
- Clicking an image opens Fancybox with full-resolution files.
- Gallery order is controlled by `customGalleryOrder` in `Photo.tsx`.

`npm run thumbs` creates/updates thumbnails:

- scans `src/assets/gallery`
- writes matching `.webp` files to `src/assets/gallery-thumbs`
- max width `640`, quality `70`

### adding more photos

1. Pick an existing album folder in `src/assets/gallery` (example: `src/assets/gallery/portraits`).
2. Convert new JPEGs to full-resolution WebP files.
3. Add those WebP files into the album folder.
4. Run `npm run thumbs` to generate/update thumbnails.
5. Start or refresh the dev server (`npm run dev`) and open `/photo`.

Notes:

- Supported source extensions are `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
- New photos are discovered automatically through `import.meta.glob`.
- If a thumbnail is missing, the full-size image is still shown.

### creating new albums

1. Create a new folder under `src/assets/gallery`, for example `src/assets/gallery/travel-japan`.
2. Convert your source JPEGs to full-resolution WebP files.
3. Add those WebP files into that folder.
4. Run `npm run thumbs` so `src/assets/gallery-thumbs/travel-japan` is generated.
5. Open `/photo`; the new folder appears as a new album tab automatically.

Album naming behavior:

- Folder name becomes album id.
- Display title is auto-generated from folder name by replacing `-`/`_` with spaces.
- Example: `travel-japan_2026` -> `travel japan 2026`.

### album order control

- Album order is defined in `customGalleryOrder` inside `src/app/components/Photo.tsx`.
- Add your new album id to that array to pin its position.
- Albums not listed there are appended after listed albums.

## blog section

`src/app/components/Blog.tsx`
`src/app/content/blog/posts/*.mdx`.

Required frontmatter:

- `title` (string)
- `summary` (string)
- `date` (string, recommended `YYYY-MM-DD`)
- `tags` (string[])
- `category` (string)

Optional frontmatter:

- `time` (string, example `14:30`)
- `published` (boolean, set `false` to hide a post)

Processing behavior (`src/app/content/blog/index.ts`):

- invalid frontmatter posts are skipped and logged
- unpublished posts are filtered out
- posts are sorted newest-first by `date` + optional `time`

Minimal post example:

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

## extending the website

To add a new top-level page (for example `/notes`):

1. Create a new component, for example `src/app/components/Notes.tsx`.
2. Update `src/app/App.tsx`:
   - import the new component and icon
   - extend `SectionId` union
   - add a new entry in `NAV_ITEMS`
   - update `resolveSection()` so `/notes` resolves correctly
   - add `<Route path="/notes" element={<Notes />} />`
3. Optional: add a shortcut button in `src/app/components/Links.tsx` under `site sections`.
4. If the page should participate in mobile swipe navigation, keep it as a top-level route and include it in `NAV_ITEMS`.

Example route/nav additions in `App.tsx`:

```tsx
type SectionId = "links" | "code" | "photo" | "blog" | "notes";

const NAV_ITEMS = [
  { id: "links", label: "links", icon: Link2, path: "/" },
  { id: "code", label: "code", icon: Code2, path: "/code" },
  { id: "photo", label: "photo", icon: Camera, path: "/photo" },
  { id: "blog", label: "blog", icon: FileText, path: "/blog" },
  { id: "notes", label: "notes", icon: NotebookText, path: "/notes" },
];

function resolveSection(pathname: string): SectionId {
  if (pathname.startsWith("/notes")) return "notes";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/photo")) return "photo";
  if (pathname.startsWith("/code")) return "code";
  return "links";
}
```

For nested content under a page (example `/notes/:slug`), add additional `<Route>` entries and keep the top-level route (`/notes`) as the section root.
