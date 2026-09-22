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
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over `src/` |
| `npm run typecheck` | TypeScript check (`vite build` does **not** typecheck) |

Run `npm run lint && npm run typecheck && npm run build` before deploying.

## Configuration

Contact form delivery defaults to FormSubmit using the address in
`src/components/Contact.tsx`. To route submissions elsewhere, copy
`.env.example` to `.env` and set:

```
VITE_CONTACT_FORM_ENDPOINT=https://your-endpoint.example/submit
```

The endpoint must accept a JSON `POST` and return JSON.

## Content

Site content is colocated with the components that render it — there is no CMS:

- `src/components/Hero.tsx` — positioning, headline stats, service blocks
- `src/components/Experience.tsx` — roles, in challenge → build → impact form
- `src/components/Projects.tsx` — project/case-study cards
- `src/components/Skills.tsx` — capability groups and proficiency labels
- `src/components/Education.tsx` — degree and certifications

## Deployment

Static build; any static host works. `public/_redirects` contains the SPA
rewrite rule for Netlify (`/* /index.html 200`). On other hosts, configure the
equivalent history fallback so client-side routes resolve.
