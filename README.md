# Austyn Nguyen — Portfolio

A personal home on the web for my work in product management, engineering, and research—and the music, food, and travel that keep me curious. The portfolio is deployed on **Vercel**.

## What’s inside

### Portfolio · `/`

An introduction to who I am, followed by selected projects, my background, experience, education, technical toolkit, current interests, and ways to connect.

The featured work brings together three different kinds of problem-solving:

- **Capital One account verification:** end-to-end design and launch of a customer-facing Help Center page, alongside final-stage UAT for the underlying feature. The testing effort included a 125+ case test plan and 20 associate testers. [Explore the published page](https://www.capitalone.com/help-center/checking-savings/account-verification-document/).
- **Electricity Price Hybrid Forecaster:** a three-tier model combining LightGBM, NGBoost, and XGBoost for CAISO electricity pricing across nine load centers.
- **Infusion Workflow Optimization:** process mapping and observation of medication order checking at Brighton Center for Specialty Care to identify workflow bottlenecks.

A supporting project collection includes wearable hardware, robotics, economic policy, research metadata, biology, and the portfolio itself. Project dialogs provide fuller descriptions and available links to presentations, source code, and published work.

The About section introduces the person behind the work through a personal note, music and food photo links, and gaming interests. Experience follows a winding route with company logos as stops and text placed directly on the page. Roles alternate sides on desktop, with highlights and expandable details. On phones, the career route moves to one side and the content follows a single column. The route adjusts when details expand or text wraps. Education uses pinned sheets of ruled paper with school logos, degrees, and expandable honors and activities. A clipped Yonsei study-abroad slip sits on Michigan’s sheet. The papers stack straight on phones. A grouped toolkit and a small “What I’m up to” section round out the homepage; learning goals are clearly distinguished from completed work. A postcard-style contact section offers email and social links, followed by a small footer connecting Music, Travel, and the top of the page.

### Music · `/music`

A personal recital program: a portrait with my viola, one featured YouTube player controlled by a selectable program list, a Spotify listening rotation, and dated notes from my musical journey. The listening section shows up to eight top tracks from the past four weeks, with album covers, an embedded player, and a profile link. Spotify data refreshes hourly on the server; visitors do not connect their accounts. [Connect Spotify](docs/spotify-listening.md) to replace the initial placeholder with live tracks. Performance selection preserves each recording’s starting timestamp; on phones, a pointer selection brings the player back into view. The layout and restrained animations adapt to smaller screens and reduced-motion preferences.

### Travel · `/travel`

A photo diary with a taped-photo introduction, monthly receipt labels, and portrait/landscape photographs in their natural proportions. Photos open in a keyboard- and swipe-friendly viewer with dates and optional map links. A fold-out Mapbox map follows the diary, matches the current theme, and groups nearby photographs. The navigation follows this page order. There are no empty trip-journal placeholders.

## Visual identity

The design is intentionally playful and personal. **Sour Gummy** gives the entire site its character. Muted parchment, deep green, soft sage, ochre, and coral accents frame expressive headings, taped-photo details, and project previews. A complementary dark palette preserves the same personality.

The shared navigation connects the three parts of the site and lists every homepage section in page order. It collapses into a menu below 1280px. Theme preference is stored locally, with a rotating sun/moon transition. Pinned education sheets pivot gently on hover, the Yonsei paperclip wiggles once per interaction, directional link icons nudge, and native details unfold with interruptible height and opacity animations. The career route draws as it enters the viewport, with subtle logo entrances. Reduced-motion preferences disable these movements. The homepage hero and selected work adapt to smaller screens, and the project dialog supports keyboard navigation through native dialog behavior, including Escape to close and focus containment.

## How the project is organized

| Location | Purpose |
| --- | --- |
| `app/` | Next.js App Router pages, shared layout, and global visual styles |
| `components/` | Shared navigation, homepage sections, and reusable UI |
| `src/data/education.ts` | Degrees, dates, honors, communities, and study-abroad details |
| `src/data/experiences.ts` | Role highlights, dates, and detailed professional experience |
| `src/data/projects.ts` | Project descriptions, featured selection, image paths, and external links |
| `src/data/locations.json` | Photo catalog: optional coordinates, photo paths, capture dates, dimensions, and Dropbox IDs/revisions |
| `public/images/` | Images organized by subject, with lowercase, hyphenated filenames |
| `public/Austyn_Nguyen_Resume.pdf` | Downloadable résumé; its existing public URL is preserved |
| `scripts/sync-dropbox.mjs` | Photo import: refreshes Dropbox authorization, processes previews, and updates the diary and map |

## Image library

Images live together under `public/images/`:

- `portraits/` — personal portraits, named by person and context.
- `projects/` — screenshots, posters, and project previews with descriptive project names.
- `education/` — school logos and campus imagery.
- `organizations/` — employer and research organization logos.
- `music/timeline/` — images associated with musical milestones.
- `travel/` — imported photographs (`travel-img-9023.jpg`, etc.).

Use lowercase kebab-case names, preserve the actual file extension, and keep image URLs synchronized with their component or data entry. Travel filenames preserve normalized source identifiers rather than guessing the location or subject of a photograph. Original Dropbox names remain as internal metadata. Stable Dropbox IDs and revisions distinguish same-named uploads and detect edits; new preview filenames include a short hash. Photos without GPS are included in the diary. The importer preserves published photos when source files move or disappear.

## Technology

Built with **Next.js, React, TypeScript, and Tailwind CSS**, with custom CSS for the visual identity. Framer Motion powers restrained entrances in supporting sections, Mapbox GL and React Map GL power the travel map, and Lucide/React Icons provide interface icons. The travel import uses Dropbox and EXIF metadata. Hosting is on Vercel.

## Development setup

Use **Node.js 26 LTS** and npm. `.nvmrc`, `package.json`, and GitHub Actions select the same Node major version; Vercel reads `engines.node` for future deployments. With nvm installed:

```sh
nvm install
nvm use
npm ci
npm run dev
```

VS Code is configured to offer the project's installed TypeScript version. Copy `.env.example` to `.env.local` and configure the services you need using the linked Dropbox and Spotify guides; keep credentials out of Git.

Before shipping changes, run:

```sh
npm run lint
npm run typecheck
npm test
npm run photos:validate
npm run build
```

Check `npm outdated` and `npm audit` when maintaining dependencies. Keep Next.js and `eslint-config-next` on the same release and React and React DOM on the same release. Review breaking upgrades to animation, icons, and TypeScript separately from routine dependency updates.

GitHub Actions runs these checks on pull requests and pushes to `main`, without service credentials. Dependabot proposes dependency and action updates weekly, grouping related framework packages for review.

The scoped `minimatch` override patches [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) in TypeScript ESLint's project-service glob matching. Remove it once `@typescript-eslint/typescript-estree` requires a patched release itself. ESLint stays on version 9 because the current React lint plugin does not yet declare compatibility with version 10; TypeScript stays on version 5 within TypeScript ESLint's supported range.

## Content and attribution

Personal project descriptions reflect my contributions. Organization names, logos, and third-party page screenshots identify the work and its context; they do not imply endorsement. External links lead to their respective owners’ websites.

## Dropbox publishing

[Setup and maintenance guide](docs/dropbox-photos.md) covers refresh-token authorization, GitHub Actions secrets, Vercel deployment, and clean rebuilds. Automatic pulls run on the first of each month at 12:07 UTC and publish only photo changes. Manual runs remain available; upload webhooks do not trigger imports. Account secrets must be configured before it runs.

```sh
npm run dev
npm run test:photos
npm run photos:validate
npm run lint
npm run build
```
