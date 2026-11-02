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

The About section introduces the person behind the work through a personal note, music and food photo links, and gaming interests. Experience is presented as a numbered timeline with a highlight for every role and expandable supporting detail. Education uses compact notebook-style cards with expandable honors and community involvement. A grouped toolkit and a small “What I’m up to” section round out the homepage; learning goals are clearly distinguished from completed work. A postcard-style contact section offers email and social links, followed by a small footer connecting Music, Travel, and the top of the page.

### Music · `/music`

My journey as a violist, with a performance showcase, a timeline of musical milestones, and a photo gallery.

### Travel · `/travel`

An interactive Mapbox map and photo gallery connecting places, food, and adventures. Selecting a gallery location focuses the map. Trip journals are a placeholder for future writing.

## Visual identity

The design is intentionally playful and personal. **Sour Gummy** gives the entire site its character. Warm cream, deep green, sunny yellow, and coral accents frame expressive headings, taped-photo details, and project previews. A complementary dark palette preserves the same personality.

The shared navigation connects the three parts of the site. Theme preference is stored locally. The homepage hero and selected work adapt to smaller screens, and the project dialog supports keyboard navigation through native dialog behavior, including Escape to close and focus containment.

## How the project is organized

| Location | Purpose |
| --- | --- |
| `app/` | Next.js App Router pages, shared layout, and global visual styles |
| `components/` | Shared navigation, homepage sections, and reusable UI |
| `src/data/education.ts` | Degrees, dates, honors, communities, and study-abroad details |
| `src/data/experiences.ts` | Role highlights, dates, and detailed professional experience |
| `src/data/projects.ts` | Project descriptions, featured selection, image paths, and external links |
| `src/data/locations.json` | Travel GeoJSON: coordinates, photo paths, original filenames, and capture dates |
| `public/data/music-gallery.json` | Ordered list of music gallery image URLs |
| `public/images/` | Images organized by subject, with lowercase, hyphenated filenames |
| `public/Austyn_Nguyen_Resume.pdf` | Downloadable résumé; its existing public URL is preserved |
| `scripts/sync-dropbox.mjs` | Travel photo import: reads GPS metadata, downloads JPEG thumbnails, and updates the map data |
| `hooks/` | Shared React hooks |

## Image library

Images live together under `public/images/`:

- `portraits/` — personal portraits, named by person and context.
- `projects/` — screenshots, posters, and project previews with descriptive project names.
- `education/` — school logos and campus imagery.
- `organizations/` — employer and research organization logos.
- `music/timeline/` — images associated with musical milestones.
- `music/gallery/` — ordered gallery photographs (`music-gallery-01.png`, etc.).
- `travel/` — imported photographs (`travel-img-9023.jpg`, etc.).

Use lowercase kebab-case names, preserve the actual file extension, and keep image URLs synchronized with their component or data entry. Gallery sequence numbers describe ordering; travel filenames preserve normalized source identifiers rather than guessing the location or subject of a photograph. Original Dropbox names remain in the GeoJSON for duplicate detection, while the importer applies the same naming convention to new local images. The photo content is preserved during organization.

## Technology

Built with **Next.js, React, TypeScript, and Tailwind CSS**, with custom CSS for the visual identity. Framer Motion powers animations in supporting sections, Mapbox GL and React Map GL power the travel map, and Lucide/React Icons provide interface icons. The travel import uses Dropbox and EXIF metadata. Hosting is on Vercel.

## Content and attribution

Personal project descriptions reflect my contributions. Organization names, logos, and third-party page screenshots identify the work and its context; they do not imply endorsement. External links lead to their respective owners’ websites.
