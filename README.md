# Captured Horizons - Photography Portfolio

A responsive photography portfolio website showcasing landscape photography combined with sailing adventures. Features parallax scrolling effects and an immersive gallery experience.

## About

**Captured Horizons** is the personal portfolio of Michael Perry, featuring landscape photography from the Lower Chesapeake Bay region and beyond. The site combines beautiful imagery with smooth parallax effects to create an engaging visual experience.

## Features

- Responsive parallax scrolling design
- Mobile-optimized layout with adaptive logo text
- Interactive portfolio gallery with modal viewer
- Smooth navigation with dynamic navbar styling
- Contact form integration ready
- Fast loading with locally hosted assets

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **CSS Framework**: W3.CSS (local)
- **Icons**: Font Awesome 4.7.0 (local)
- **Fonts**: Google Fonts (Lato)
- **Hosting**: Google Cloud App Engine ready

## Project Structure

```
portfolio/
├── index.html              # Main page
├── pages/
│   └── about.html         # Extended about content
├── css/
│   ├── w3.css             # W3.CSS framework
│   └── font-awesome.min.css # Font Awesome icons
├── fonts/                  # Font Awesome web fonts
├── images/                 # Photography portfolio
│   ├── fallcolor.jpg      # Hero background
│   ├── horizon.jpg        # Portfolio section background
│   ├── mobjack.jpg        # Contact section background
│   └── [portfolio images]
├── app.yaml               # Google Cloud App Engine config
├── .gcloudignore          # GCP deployment exclusions
├── .gitignore             # Git exclusions
├── README.md              # This file
└── CLAUDE.md              # Development guide for Claude Code
```

## Local Development

Run a local web server:

**Python:**
```bash
python3 -m http.server 8000
```

**Node.js:**
```bash
npx serve
```

**PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

### Google Cloud App Engine

1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)

2. Initialize your project:
```bash
gcloud init
```

3. Deploy to App Engine:
```bash
gcloud app deploy
```

4. View your site:
```bash
gcloud app browse
```

## Key Features Explained

### Parallax Effect
- Hero section uses fall colors background
- Portfolio section uses horizon ocean view
- Contact section uses Mobjack Bay image
- Automatically disabled on mobile devices (<768px) for performance

### Responsive Branding
- Desktop/Large screens: "CAPTURED HORIZONS"
- Mobile/Small screens: "IMAGINE"

### Dynamic Navigation
- Transparent with white text at page top
- Transforms to white card with dark text when scrolling
- Mobile-friendly hamburger menu

### Portfolio Gallery
- 7 curated landscape and nature photographs
- Click to expand in modal view
- Responsive grid layout (4 columns → 1 column on mobile)

## Content

- **Owner**: Michael Perry
- **Location**: Lower Chesapeake Bay, Virginia
- **Specialties**: Landscape photography, sailing photography
- **Skills**: Photography (90%), Web Design (85%)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

All dependencies are included locally for fast loading and offline capability:
- W3.CSS 5.0
- Font Awesome 4.7.0
- Lato font (loaded from Google Fonts CDN)

## License

Photography and content © Michael Perry. W3.CSS template from W3Schools.

## Contributing

This is a personal portfolio project. For questions or collaboration inquiries, please use the contact form on the website.
