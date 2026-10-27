# Dan Elsaigh — Portfolio & Links Hub

Modern, minimalist portfolio and links hub for **Dan Elsaigh (Abdelrahman moh.)**, UI/UX & Brand Identity Designer based in Alexandria, Egypt.

## Features
- **Single-page Portfolio (`index.html`)**:
  - Hero introduction with clean aesthetic
  - About section with philosophy, experience, and skill bars
  - Selected work showcases (Logo Systems, ORO Café Packaging, Luna Bloom Luxury Identity, UI/UX Design System, Muammer Insights)
  - Links & contact section
  - Fixed responsive header with slide-in mobile hamburger navigation
  - Dark/Light mode theme switching with state persistence in `localStorage`
  - High-contrast gradient footer with pill-style link buttons

- **Links Hub (`links.html`)**:
  - Mobile-first link aggregator inspired by clean modern linktree designs
  - Top back-navigation to main portfolio
  - Integrated QR code generation for quick offline or mobile scanning
  - Native Web Share API integration + one-click clipboard copy with toast feedback
  - Categorized spotlight, case study, and direct contact cards

## Built With
- Semantic HTML5 & Modern Vanilla CSS (CSS Custom Properties, Flexbox, Grid)
- Vanilla JavaScript
- Font Awesome 6 Icons
- Google Fonts (Inter, Barlow, Barlow Condensed, Space Mono)

## Portfolio assets
Project artwork is stored in `assets/` and grouped by case study:

- `assets/logos/evoke/` — Evoke logo, inverse mark, and construction grid
- `assets/logos/gearlock/` — GearLock light, dark, and color variants
- `assets/oro-cafe/` — Oro Café wordmark, packaging, brand boards, workflow, and product photography
- `assets/luna-bloom/` — Lunaria logo variants and the Luna Bloom app flow
- `assets/muammer/` — Muammer Insights case-study board

The selected-work section uses these source files directly with descriptive alt text and lazy loading, so replacing an asset does not require changing the layout.
