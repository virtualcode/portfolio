# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Captured Horizons** - A photography portfolio website featuring parallax scrolling effects. Built with vanilla HTML, CSS, and JavaScript. No build system or framework required.

## Development Commands

**Run local server:**
```bash
python3 -m http.server 8000
# or
npx serve
# or
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## Deployment

**Google Cloud App Engine:**
```bash
gcloud app deploy
```

The site is configured for deployment to Google Cloud App Engine using the `app.yaml` configuration file.

## Architecture

This is a single-page static website with main content in `index.html`:

- **No build process**: HTML/CSS/JS served directly
- **CSS Framework**: W3.CSS (local copy in `css/w3.css`)
- **Icons**: Font Awesome 4.7.0 (local copy in `css/font-awesome.min.css` with fonts in `/fonts/`)
- **Typography**: Lato font loaded from Google Fonts CDN
- **Images**: All referenced with relative paths from `images/` directory
- **Additional Pages**: `pages/about.html` contains full about content

### HTML Structure

The page is divided into sections accessible via anchor links:
- `#home` - Hero section with parallax background (fallcolor.jpg) and "CAPTURED HORIZONS" logo
- `#about` - About section with Michael Perry profile, photography and sailing description
- `#portfolio` - Portfolio gallery with 7 images and modal viewer
- `#contact` - Contact form and location (Lower Chesapeake Bay, Virginia)

### JavaScript Functionality

Three main functions defined in the inline `<script>` block:
1. `onClick(element)` - Opens modal gallery for portfolio images
2. `myFunction()` - Changes navbar style on scroll:
   - At top: White text on transparent background (`w3-text-white`)
   - When scrolled >100px: Dark text on white card background (`w3-white w3-card w3-animate-top`)
3. `toggleFunction()` - Toggles mobile navigation menu visibility

### Styling Approach

Custom styles are inline in the `<head>`:
- Parallax backgrounds use `background-attachment: fixed`
- Responsive breakpoint at `max-width: 768px` disables parallax on mobile devices
- Three parallax images:
  - Hero (bgimg-1): `fallcolor.jpg`
  - Portfolio section (bgimg-2): `horizon.jpg`
  - Contact section (bgimg-3): `mobjack.jpg`

### Branding

- **Site Name**: Captured Horizons
- **Logo Text**:
  - Desktop: "CAPTURED HORIZONS"
  - Mobile: "IMAGINE"
- **Owner**: Michael Perry
- **Location**: Lower Chesapeake Bay, Virginia
- **Focus**: Landscape photography combined with sailing

## Image Assets

Current images in `/images/`:
- `fallcolor.jpg` - Hero parallax background
- `horizon.jpg` - Portfolio section parallax background and contact map
- `mobjack.jpg` - Contact section parallax background
- `osprey.jpg` - Profile photo in About section
- `sailboat.jpg`, `seagull.jpg`, `cherryblosom.jpg` - Portfolio gallery
- Plus additional portfolio images

## Important Notes

- All paths use relative URLs (no leading `/`) for portability
- Contact form submits to `/action_page.php` (placeholder, not implemented)
- Font Awesome fonts located in `/fonts/` directory
- Skills bars show: Photography (90%), Web Design (85%)
- Footer includes "To the top" button and w3.css attribution
- Navbar search button is decorative only
