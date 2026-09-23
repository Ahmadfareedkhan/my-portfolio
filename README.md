# Ahmad Fareed Khan — Portfolio

Personal portfolio site for AI/ML engineering work: production LLM applications,
workflow automation, data pipelines, and computer vision.

Live site: https://ahmadfareedkhan.tech

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** with **shadcn/ui** (Radix primitives)
- **next-themes** for light/dark mode
- Contact delivery via [FormSubmit](https://formsubmit.co) AJAX endpoint, with a `mailto:` fallback

## Local development

Requires Node.js 18+ and npm.

```sh
npm install
npm run dev        # dev server on http://localhost:8080
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build, then sitemap + prerender to static HTML |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over `src/` |
| `npm run typecheck` | TypeScript check (`vite build` does **not** typecheck) |
| `npm run audit` | Build, then render in headless Chrome and check it (see below) |
| `npm run audit:shots` | Same, plus screenshots of every route/theme/viewport into `.audit/` |

Run `npm run lint && npm run typecheck && npm run audit` before deploying.
(`audit` builds first, so it covers `build` too.)

## Auditing

`npm run audit` renders the production build in headless Chrome and fails the
command (exit 1) on real defects, so it works as a pre-deploy gate or in CI.
It has no dependencies -- it drives Chrome over the DevTools Protocol and
starts/stops `vite preview` itself. Needs Node 22+ and a local Chrome or Edge.

Every route is checked in both themes at desktop and phone width for:

- text colours failing WCAG AA, measured on the **rendered** pixels with alpha
  composited over the real backdrop (an `rgba()` colour measured raw reports
  the opaque value and hides the failure)
- console errors and React warnings
- heading-level skips, `<h1>` count, missing `<main>`, empty `<title>`,
  missing meta description
- images without `alt`, links and buttons with no accessible name
- **same-page anchors whose target does not exist on that page** (a bare
  `#work` in the shared header resolves to `/work/<slug>#work` on a case study
  and silently does nothing - use `/#work`), and absolute links like `/#work`
  whose target does not exist on the route they point at
- internal links pointing at paths that are not known routes
- horizontal overflow at phone width
- the theme toggle switching on the **first** click for a dark-OS visitor
- **SEO**: title length (max 60), meta description length (120-160), canonical
  present, complete Open Graph tags, valid structured data, and that titles,
  descriptions and canonicals are **unique across routes** (duplicates are the
  default failure mode of a client-rendered SPA)

Routes live in `scripts/routes.mjs`, shared by the audit and the sitemap
generator so a new page cannot be checked but unlisted, or listed but unchecked.
`npm run build` regenerates `dist/sitemap.xml` and `dist/robots.txt` from it.

Note that React strips its dev warnings from production builds, so some issues
only surface against the dev server:

```sh
npm run dev
node scripts/audit.mjs --url=http://127.0.0.1:8080
```

## Configuration

Contact form delivery defaults to FormSubmit using `profile.email` from
`src/data/profile.ts` (the form lives in `src/components/ContactSection.tsx`).
To route submissions elsewhere, copy
`.env.example` to `.env` and set:

```
VITE_CONTACT_FORM_ENDPOINT=https://your-endpoint.example/submit
```

The endpoint must accept a JSON `POST` and return JSON.

## Content

Content lives in two data files, separate from layout — there is no CMS:

- `src/data/projects.ts` — every project and case study. `featured: true` puts a
  project in the numbered index on the home page; a `study` object gives it a
  page at `/work/<slug>`. Add that route to `scripts/routes.mjs` too — the
  audit fails if the two disagree.
- `src/data/profile.ts` — identity and contact details, roles, capabilities,
  education.

The home page is assembled in `src/pages/Index.tsx` from `Intro`, `Work`,
`Roles`, `About` and `ContactSection`; case studies render through
`src/pages/CaseStudy.tsx`.

## Prerendering

`npm run build` renders every route to static HTML in `dist/`:

```
dist/index.html
dist/work/<slug>.html
```

Case studies are flat `.html` files rather than `<slug>/index.html` folders:
Netlify serves both at `/work/<slug>`, but answers a folder with a 301 to
`/work/<slug>/`, which would put a redirect behind every link and canonical URL.

A client-rendered SPA otherwise serves `<div id="root"></div>` to any crawler
that does not execute JavaScript, which makes every per-page title, description
and JSON-LD block invisible to them. `scripts/prerender.mjs` serves the build,
drives headless Chrome over the DevTools Protocol, waits for each route to
finish rendering, and writes the resulting DOM to disk. No extra dependencies.

The app still boots normally over the static markup, so client-side routing,
the theme toggle and the contact form are unchanged.

Two details worth knowing before changing this:

- The theme class is **stripped** before serialising. Baking in whichever theme
  the prerenderer used would flash the wrong colours at every visitor with the
  opposite preference. The inline script in `index.html` re-applies the correct
  one before first paint — keep it inline and synchronous.
- `npm run audit` fails if a route stops being prerendered, loses its `<h1>`,
  drops below 120 words of text, or gains a baked-in theme class.

## Deployment

Static build; any static host works. `public/_redirects` contains the SPA
rewrite rule for Netlify (`/* /index.html 200`). On other hosts, configure the
equivalent history fallback so client-side routes resolve.
