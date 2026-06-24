# Project Knowledge — TechVision S&S Portfolio

## Overview
- **Purpose:** Personal / agency portfolio showcasing services, projects, team, and multimedia (3D canvas).
- **App type:** Single-page React app (Vite) with anchor-based sections and client-side routing.

## Tech Stack
- **Framework:** React 18
- **Bundler:** Vite
- **Styling:** Tailwind CSS + utility classes in `src/styles.js`
- **Animation:** Framer Motion
- **3D / WebGL:** three, @react-three/fiber, @react-three/drei, maath
- **Utilities & UI:** react-router-dom, react-icons

## Run & Build
- Install: `npm install`
- Dev server: `npm run dev` (Vite)
- Build: `npm run build`
- Preview: `npm run preview`

## High-level structure
- **public/** — static assets, textures, and 3D assets used by the app.
- **src/** — application source
  - `assets/` — images, icons, and exported paths used across the site
  - `components/` — visual building blocks (Hero, About, Works, Navbar, Footer, etc.)
    - `canvas/` — 3D canvas components (HeroElements, Stars, Earth, Ball)
    - `enhanced/` — accessibility and performance-focused variants (OptimizedImage, ThemeToggle, NewsletterForm)
  - `constants/` — site data (navLinks, services, projects, experiences)
  - `hoc/` — higher-order SectionWrapper used for consistent section layout/animations
  - `utils/` — motion helpers and animations
  - `styles.js` — shared Tailwind class maps
  - `App.jsx` — main layout; assembles sections into a single-page flow
  - `main.jsx` — React entry

## Routing & Navigation
- Uses `react-router-dom` `BrowserRouter` but the app behaves as an anchored single page: sections are identified by ids (`#about`, `#work`, etc.) and `Navbar` scrolls smoothly to them.

## Key UI Patterns & Conventions
- **SectionWrapper (HOC):** Wraps page sections with motion container and padding (`src/hoc/SectionWrapper.jsx`).
- **Data-driven UI:** `src/constants/index.js` provides services, technologies, projects and experiences that components map into cards and lists.
- **Styling:** Tailwind-first; `src/styles.js` centralizes repeated class groups (heroHeadText, sectionHeadText, paddingX, etc.).
- **Animations:** Reusable variants live in `src/utils/motion.js` (fadeIn, textVariant, staggerContainer).
- **Accessibility:** `components/enhanced/AccessibleNav.jsx` exists; `Navbar` includes aria attributes and keyboard-friendly controls.

## 3D Canvas & Performance
- The hero includes an interactive Three.js scene: `HeroElements.jsx` (Shield, Satellite, EyeGlobe) using `@react-three/fiber` and `drei`.
- There is a `StarsCanvas` helper for background starfields.
- Canvas components use `Suspense` + `Preload` to manage assets, and `gl.preserveDrawingBuffer` is set for the hero Canvas.

## Notable Components
- `Navbar.jsx` — responsive nav with scroll spy, mobile drawer.
- `Hero.jsx` / `canvas/HeroElements.jsx` — hero text + 3D scene.
- `About.jsx` — animated service carousel using `AnimatePresence`.
- `Works.jsx` + `ProjectCard.jsx` — project gallery powered by `constants.projects`.
- `Experience.jsx` / `ExperienceCard.jsx` — timeline layout.
- `MediaServices.jsx` & `MediaServiceCard.jsx` — media-focused service items.

## Assets & Public Folder
- `public/` holds textures and other static files consumed by the canvas and site. Textures are used by the 3D components.

## Development Notes & Conventions
- Prefer data-driven additions: to add a new project or service, edit `src/constants/index.js` and provide image/icon in `src/assets`.
- Sections are anchored by id names matching `navLinks` in `src/constants/index.js`.
- Use `SectionWrapper` when adding new top-level sections so animation and padding remain consistent.
- Keep animations in `src/utils/motion.js` for re-use and consistency.

## Testing & Linting
- Linting: `npm run lint` (ESLint config present).
- No unit tests found in repository — consider adding tests for critical components.

## Known Dependencies (high level)
- React, Vite, Tailwind CSS, Framer Motion, three.js, @react-three/fiber, @react-three/drei, maath

## Quick How-tos
- Add a project: add object to `projects` in `src/constants/index.js` and add image to `src/assets`.
- Add a section: create component in `src/components`, export it from `src/components/index.js`, and add it into `App.jsx` inside desired order; wrap with `SectionWrapper`.

## TODOs / Suggestions
- Add tests and CI pipeline.
- Split large components or canvas pieces into smaller modules if more features are added.
- Add lazy-loading for heavy images and GLTF models (if added).
- Add documentation for adding 3D assets and model-loading conventions.

---
Generated on 2026-06-24 — concise guide to code structure, conventions, and how to extend the site.
