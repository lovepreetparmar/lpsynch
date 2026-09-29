# LPSynch — Phase 1 Repository Audit

**Date:** 2026-09-29  
**Branch:** `redesign` (in progress; production entry remains on `main`)  
**Auditor:** Cursor (Phase 1 only — no production files deleted or overwritten)

---

## 1. Executive summary

The repository is a **single-page PHP marketing site** (Onita/Confer-style template) with two entry variants (`index.php` light, `index-dark.php` dark). There are **no separate PHP route files**; navigation uses in-page anchors. A **`mail.php`** endpoint exists for contact email but **no visible HTML contact form** is wired on the primary `index.php`. A **work-in-progress React app** lives under `web/` on the `redesign` branch; it already mirrors much of the verified content but **does not yet implement the Digital Flow interaction system** described in the new master plan, and contains a few items that must be corrected in Phase 2+ (see §10).

**Content rule for all future work:** only facts present in this audit (or directly quoted from `index.php` / `index-dark.php` / `mail.php`) may appear as LPSynch claims. The brand name in source copy is **`LPSynch`** (never store `LPSYNCH` in data; use CSS uppercase for display only).

---

## 2. Repository inventory

### 2.1 Production / legacy (repository root)

| Path | Role |
|------|------|
| `index.php` | **Production-style light theme** — main content source |
| `index-dark.php` | Alternate dark theme; includes **Contact Us** section copy not present on light `index.php` |
| `mail.php` | POST mail handler → `info@lpsynch.com` |
| `style.css` | Compiled/custom styles for template |
| `css/`, `js/` | Bootstrap, jQuery, plugins, template assets |
| `fonts/` | Icon/font bundles (Font Awesome, Elegant Icons, etc.) |
| `img/` | Photography, icons, logos (74 files under `img/`) |

**Not found in repo:** `package.json` at root, CMS, database, API layer, portfolio/case-study pages, blog, separate `/about.php` routes.

### 2.2 New frontend (in progress)

| Path | Role |
|------|------|
| `web/` | Vite + React + TypeScript + Tailwind + Framer Motion |
| `web/src/data/*.ts` | Structured content extracted from PHP (primary source for React copy) |
| `web/deploy/.htaccess` | SPA fallback template for Hostinger |
| `README.md` | Dev/deploy notes |

### 2.3 Git state (at audit time)

- Branch: **`redesign`**
- Modified: `.gitignore`, `mail.php` (subject-line fix)
- Untracked: `web/`, `README.md`, `docs/` (this file)

Production on `main` is unchanged unless merged.

---

## 3. Existing URLs and information architecture

### 3.1 Live PHP site (anchor-based)

The public site behaves as **one document** with hash sections:

| Nav label (index.php) | Anchor ID | Section |
|----------------------|-----------|---------|
| Home | `#home` | Welcome / hero |
| About Us | `#about` | About Us |
| Our Approach | `#work` | Our Approach (3 steps) |
| Our Services | `#services` | Six services |
| Our People | `#team` | Team |
| Contact Us | `#contact` | **Missing on `index.php`** (nav link is broken on light theme) |

**Canonical domain referenced in markup:** `https://lpsynch.com/`  
**No path-based URLs** (`/about`, etc.) exist in the legacy PHP app.

### 3.2 Recommended React routes (master plan)

Align with content areas (new paths; optional redirects from old hashes later):

```
/
/about
/approach
/services
/people
/contact
```

Preserve `mail.php` at site root for the contact form POST.

### 3.3 Third-party embeds

| Service | Location | Notes |
|---------|----------|--------|
| Tawk.to live chat | `index.php`, `index-dark.php` | Widget ID in script URL — **decision needed** for React site (keep/remove) |

---

## 4. Branding and visual assets

### 4.1 Logo and favicon

| Asset | Path | Notes |
|-------|------|--------|
| Primary logo (light bg) | `img/core-img/logo-2.png` | Used in `index.php` nav (~172px wide) |
| Logo (dark bg) | `img/core-img/logo-2-white.png` | `index-dark.php` |
| Alternate logos | `img/core-img/logo.png`, `logo-2.png` | Older variants |
| Favicon | `img/core-img/favicon.ico`, `favicon.png` | |

**React copies:** `web/public/logo.png` (from `logo-2.png`), `web/public/favicon.ico`.

**Rule:** Use `<img src="...">` for the wordmark; do not re-type “LPSynch” as a substitute logo.

### 4.2 Brand colors (from existing site)

| Signal | Value | Source |
|--------|--------|--------|
| User-selected theme | `teal` | `index.php` — `#cor9` clicked on load |
| Custom accent overlay | `#f1ac2f` (gold, 32% alpha on team hover) | Inline CSS in `index.php` |
| Dark theme accent (alternate file) | `#21c87a` | `index-dark.php` contact headings |

**Recommendation for Phase 3:** Treat **gold `#f1ac2f`** as primary accent (matches logo/customization on light production page). Document teal/green only as legacy alternate theme reference, not as a second competing accent unless brand review says otherwise.

### 4.3 Reusable imagery (factual use)

| Asset | Used for |
|-------|----------|
| `img/bg-img/w-1.png` | Hero illustration (`index.php`) — copied to `web/public/hero.png` |
| `img/bg-img/1.jpg` | About section background — copied to `web/public/about.jpg` |
| `img/bg-img/icon-1.png` … `icon-3.png` | Approach step icons |
| `img/bg-img/7.jpg`, `8.jpg`, `9.jpg`, `30–32.jpg` | Service card backgrounds (decorative) |
| `img/bg-img/15.jpg`, `16.jpg`, `17.jpg`, `18.jpg`, `40.png` | **Real team photos** |
| Service stock photos | Many unused JPGs in `img/bg-img/` — optional optimization only |

**Do not** replace team photos with generated portraits.

---

## 5. Page content extraction (source of truth)

All strings below are **verbatim from the PHP site** (light `index.php` unless noted).

### 5.1 Home / Hero (`#home`)

- **Headline:** “Elevate your **business** with cutting-edge technology”
- **Supporting:** “Leveraging modern innovation, efficiency, and growth to transform your digital landscapes with sustainable solutions”
- **CTA:** “Read More” → `#about`

### 5.2 About Us (`#about`)

- **Heading:** “About Us”
- **Body:** “We are a leading IT firm specializing in comprehensive web design, development, and software solutions. Our dedicated team crafts innovative web designs, develops cutting-edge software, and creates custom solutions tailored to meet diverse client needs.We are committed to synchronizing language proficiency with advanced technologies.We aim to empower businesses with advanced digital solutions, ensuring seamless integration, user-centric experiences, and driving success in today's dynamic technological landscape.”

*(Note: missing space after first sentence in source — fix only as typography, not meaning.)*

### 5.3 Our Approach (`#work`)

- **Heading:** “Our Approach”
- **Subheading:** “We are here to support your business success with our 3-step approach.”

| Step | Title | Description |
|------|--------|-------------|
| 1 | Understanding Business Requirements | Identifying and Assessing your unique business requirements to tailor the advanced solutions with increased productivity and efficiency |
| 2 | Implementing Advanced Solutions | Unlocking modern digital strategies, deploying cutting-edge technologies, and ensuring seamless integrations to cater your business requirements |
| 3 | Ensuring Sustained Success | Turning your business vision into reality by ensuring unified solutions tailored with constantly evolving technologies and digital support |

### 5.4 Our Services (`#services`) — exactly six

| # | Title | Description |
|---|--------|-------------|
| 1 | Digital Marketing | Cultivate brand success with our tailored, high-impact digital marketing services and strategies for your unique business growth. |
| 2 | Website Development | Crafting responsive, dynamic websites that elevate your online presence and drive business growth through our seamless development services. |
| 3 | Application Development | Transforming ideas into powerful, user-centric applications with our development services and seamless functionality for success. |
| 4 | Custom Software Development | Tailored software solutions to streamline operations, enhance efficiency, and drive business growth through our development services. |
| 5 | Brand Identity | Designing captivating logos, websites, and posters that elevate your brand's visual identity through our creative design services. |
| 6 | Domain and Hosting Management | Efficiently manage domains and hosting for seamless online presence, ensuring reliability through our management services. |

**Not in PHP:** AI agents, RAG, LLM integration, cloud product engineering as a service line, portfolio/case studies.

### 5.5 Our People (`#team`)

**Intro (site copy):**

- “Meet the collaborative minds behind success: Our Team crafting innovative web solutions tailored to elevate your business”
- “Our diverse team of expert developers, designers, and strategists collaborate to bring your vision to life. With a passion for innovation and expertise in web development, we work together to craft tailored solutions for your business's success.”

**Team (verified names & titles):**

| # | Name | Role | Photo | Instagram (personal) |
|---|------|------|-------|----------------------|
| 1 | Lovepreet Parmar | Founder & Senior Software Developer | `15.jpg` | lovepreetparmarr |
| 2 | Rajat Rana | Senior .Net Developer | `16.jpg` | rajatrana05 |
| 3 | Vasu Sharma | Senior Software Developer | `18.jpg` | iam_vasu |
| 4 | Ketan Kapania | Senior Business Analyst | `17.jpg` | ketankapania |
| 5 | Bhanu Pratap | Senior Project Manager | `40.png` | _0bliviate___ |

### 5.6 Contact (`index-dark.php` `#contact`)

- **Heading:** “Contact Us”
- **Body:** “Ready to transform your web ideas into reality? We're eager to hear from you! Whether it's about development, design, or collaboration, let's discuss your project. Get in touch with our expert team today for innovative solutions.”
- **Email block:** “Email Us At” / `info@lpsynch.com`

**Not found in repository:** phone number, street address, office locations, contact form HTML on `index.php`.

### 5.7 Footer (`index.php`)

- **Company blurb:** “At LPSynch, our passion lies in delivering exceptional IT services to elevate your business. With years of experience and an unwavering commitment to excellence, we provide quality solutions tailored to meet your unique needs.”
- **Services list:** same six service names (links to `#services`)
- **Useful links:** About Us → `#about`
- **Contact:** `info@lpsynch.com`, Facebook, LinkedIn, Instagram (company)
- **Copyright:** “LPSynch.” (dynamic year in PHP)

### 5.8 Social links (verified)

| Platform | URL |
|----------|-----|
| Facebook | https://www.facebook.com/profile.php?id=61553276523299 |
| LinkedIn | https://linkedin.com/company/lpsynch |
| Instagram (company) | https://www.instagram.com/lpsynch/ |

---

## 6. `mail.php` — contact endpoint audit

| Item | Detail |
|------|--------|
| Method | `POST` only; else **403** + plain text |
| Required fields | `name`, `email`, `message` (valid email) |
| Optional fields | `subject`, `number` |
| Recipient | `info@lpsynch.com` |
| Subject | User `subject` if non-empty; else `"New Message from {name}"` |
| Success | **200** + `Thanks! Message has been sent successfully.` |
| Validation failure | **400** + `Oops! Message Not Send.` |
| Mail failure | **500** + generic error |
| Headers | `From: {name} <{email}>` |
| Spam / rate limit | **None** in current script |
| CORS | Same-origin only (typical Hostinger deploy) |

**Legacy JS:** `js/default-assets/plugins.js` expects `#main_contact_form` and AJAX POST — **no matching form** in `index.php` / `index-dark.php` at audit time.

**React integration (Phase 9):** POST `application/x-www-form-urlencoded` with field names `name`, `email`, `subject`, `number`, `message` to `/mail.php`.

---

## 7. Content explicitly NOT in repository

Do **not** add as factual LPSynch content without new verified sources:

- Client logos, testimonials, case studies, project portfolio
- Statistics (project counts, users, revenue, satisfaction %)
- Awards, certifications, partnerships
- Office addresses, “global offices,” countries beyond what company prose implies
- Dedicated AI practice / AI product lines (generic “cutting-edge technology” in hero is existing copy — do not expand into AI company positioning)
- Hindi or other locales (no i18n in PHP site)
- Phone number, physical address

---

## 8. Technical notes (legacy)

- **Stack:** PHP templates, Bootstrap, jQuery, WOW.js, particles, preloader, optional color switcher (hidden)
- **Performance:** Large `js/bundle.js`, many plugins — replacement with Vite bundle is a major win
- **SEO (legacy):** `<title>LPSynch</title>` only; minimal meta
- **Accessibility:** Template-era markup; React rebuild should improve semantics

---

## 9. Proposed migration structure (Phase 2+)

Keep legacy at repo root until Hostinger cutover. Build the **Digital Flow** experience inside `web/`:

```text
lpsynch/
├── index.php, mail.php, img/, css/, js/   # preserved until production switch
├── docs/
│   └── audit.md                            # this file
└── web/
    ├── public/                             # logo, favicon, optimized images
    ├── src/
    │   ├── data/                           # services.ts, people.ts, navigation.ts, site copy modules
    │   ├── systems/
    │   │   ├── digital-flow/               # engine + types + canvas/SVG layer
    │   │   ├── cursor/CursorSystem.tsx
    │   │   ├── scroll/ScrollSystem.ts
    │   │   └── motion/MotionSystem.ts
    │   ├── components/                     # Navbar, Footer, Button, Container, …
    │   ├── sections/                       # Hero, About, Approach, Services, People, ContactCTA
    │   ├── pages/                          # Home + internal pages
    │   ├── hooks/                          # mouse, scroll, reduced motion, media query
    │   └── styles/                         # tokens, fonts (self-hosted)
    ├── deploy/.htaccess                    # SPA + exclude mail.php
    └── dist/                               # build output → Hostinger public_html
```

### 9.1 Digital Flow (Phase 4 prototype before full page build)

- Implement typed `SiteState`: `home | about | approach | services | people | contact`
- Prefer **SVG or Canvas** + TypeScript math; no WebGL by default
- Hero: interactive nodes/lines; touch = gentle auto-motion
- Rename/remove any “System topology” labeling (forbidden by master plan)
- All motion behind `prefers-reduced-motion` and `IntersectionObserver` pause

### 9.2 Signature details (Phase 7 — prioritized)

1. Synch loader (sessionStorage, skippable)  
2. Command palette (existing routes/services only)  
3. Flow spine + metadata strip (real browser state only)  
4. Service glyphs + preview panel  
5. Cursor-reactive headline (if performance allows)

### 9.3 i18n

**Deprioritize.** Remove or ignore `web/src/i18n/` legacy files from the first product-engineering iteration (they contain **invented AI positioning** not in PHP). English only unless requested later.

### 9.4 Hostinger deployment

```text
npm run build  →  web/dist/*  →  public_html
mail.php       →  document root (unchanged)
.htaccess      →  SPA fallback, exclude existing files + mail.php
```

Staging host recommended: `new.lpsynch.com` before replacing production.

---

## 10. Gap analysis — current `web/` vs master plan

| Topic | Status |
|-------|--------|
| Verified content in `web/src/data/*` | Largely aligned with PHP |
| Routes `/about`, `/approach`, … | Present |
| Digital Flow system | **Not implemented** (static SVG hero only) |
| Hero label “System topology” | **Must remove/rename** → Digital Flow |
| `SiteState` engine | **Not implemented** |
| Custom cursor, command palette, flow spine | **Not implemented** |
| Legacy `web/src/i18n/*.json` | Contains **non-PHP AI/product claims** — remove in Phase 2 |
| Contact form → `mail.php` | Wired in React; test on staging with PHP |
| Brand casing `LPSynch` | Mostly correct; fix any `LPSYNCH` in leftover i18n files |
| Tawk.to | Not ported — product decision |

---

## 11. Risks and decisions for stakeholder approval

1. **Contact on light `index.php`:** Nav points to `#contact` but section absent — React site should implement full contact using `index-dark.php` copy + form.  
2. **Tawk.to:** Include in React footer or omit?  
3. **Accent color:** Confirm gold `#f1ac2f` vs dark-theme green for unified brand.  
4. **“Years of experience”** in footer: present in PHP — may keep as verified copy.  
5. **Instagram links on team:** personal URLs in PHP — keep as optional links on People section?  
6. **Existing `web/` work:** Continue on `redesign` branch vs fresh `systems/` layer — recommend **evolve `web/`** per §9, not restart repo.

---

## 12. Phase 1 completion checklist

- [x] Inspected repository structure, PHP pages, assets, `mail.php`  
- [x] Extracted services, approach, people, about, hero, contact, footer, social  
- [x] Documented URLs (legacy anchors vs proposed React routes)  
- [x] Identified reusable logos, photos, brand colors  
- [x] Listed content that must not be invented  
- [x] Proposed migration / architecture for Digital Flow  
- [x] Did **not** delete or overwrite production PHP entry files  

---

## 13. Implementation status (post Phase 2–12)

Phases 2–11 implemented on branch `redesign` under `web/`:

- Digital Flow engine + canvas hero (`systems/digital-flow/`)
- `SiteState` via `data-flow-section` + `SectionObserver`
- Verified content in `src/data/*`; removed legacy i18n / invented AI sections
- Signature layer (prioritized): Synch loader, command palette (⌘K), flow spine, metadata strip, service glyphs, custom cursor, theme toggle (T), keyboard shortcuts (1–6, L, ?)
- Contact → `mail.php`; SEO files; staging guide in [staging.md](staging.md)

**Phase 12:** deploy `web/dist/` to staging per [staging.md](staging.md) before production cutover.
