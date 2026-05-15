development of personal portfolio website

## blog content pipeline (mdx)

blog posts live in:

- `src/app/content/blog/posts/*.mdx`

required frontmatter fields:

- `title`
- `summary`
- `date` (iso-like date, e.g. `2026-05-15`)
- `tags` (array)
- `source` (e.g. `journal`, `engineering`)
- `published` (`true` or `false`)

the app loads posts via `import.meta.glob` from:

- `src/app/content/blog/index.ts`

posts are automatically:

- filtered by `published !== false`
- sorted by `date` descending
- rendered in the `Blog` section
