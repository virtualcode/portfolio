# AGENTS.md

This file provides guidance for agentic coding agents working on the Captured Horizons portfolio website.

## Project Overview

**Captured Horizons** - A photography portfolio website featuring parallax scrolling effects. Built with vanilla HTML, CSS, and JavaScript. No build system or framework required.

## Development Commands

### Local Development
```bash
npm run serve                    # Start local server (python3 -m http.server 8000)
# Alternative servers:
npx serve                        # Node.js serve
php -S localhost:8000           # PHP built-in server
```

### Testing Commands
```bash
npm test                         # Run all unit tests
npm run test:watch              # Run unit tests in watch mode
npm run test:coverage           # Run unit tests with coverage report
npm run test:e2e                # Run E2E tests (Playwright)
npm run test:e2e:headed         # Run E2E tests with visible browser
npm run test:e2e:ui             # Run E2E tests with Playwright UI
npm run test:all                # Run all tests (unit + E2E)
```

### Running Single Tests
```bash
# Single unit test file
npx jest tests/unit/main.test.js

# Single unit test with watch
npx jest tests/unit/main.test.js --watch

# Single test case by name
npx jest --testNamePattern="onClick - Modal Gallery"

# Single E2E test file
npx playwright test tests/e2e/portfolio.spec.js

# Single E2E test with specific browser
npx playwright test tests/e2e/portfolio.spec.js --project=chromium
```

### Code Quality
```bash
npm run lint                     # Run ESLint on JS files
npx eslint js/**/*.js tests/**/*.js  # Manual ESLint with custom paths
```

## Code Style Guidelines

### JavaScript Standards
- **ES Version**: ES2021+ (modern JavaScript features allowed)
- **Modules**: CommonJS for Node.js compatibility, no ES modules in main code
- **Formatting**: 2-space indentation, no trailing whitespace
- **Quotes**: Single quotes for strings, double quotes for HTML attributes
- **Semicolons**: Required at end of statements
- **Variable Declaration**: Use `const` by default, `let` only when reassignment needed

### Function Documentation
All functions must include JSDoc comments:
```javascript
/**
 * Brief description of what the function does
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 */
function exampleFunction(param) {
  // Implementation
}
```

### Error Handling
- Always validate inputs and DOM elements
- Use descriptive error messages with function context
- Log errors using `console.error()` with context prefix
- Return early on errors to prevent cascading issues

```javascript
function exampleFunction(element) {
  if (!element || !element.src) {
    console.error('exampleFunction: Invalid element provided');
    return;
  }
  // Continue with valid input
}
```

### DOM Manipulation
- Cache DOM element references at function start
- Use `getElementById()` for single elements (performance)
- Validate element existence before manipulation
- Use descriptive variable names for DOM elements

### Browser Compatibility
- Support both `document.body.scrollTop` and `document.documentElement.scrollTop`
- Use feature detection for browser-specific APIs
- Test mobile responsiveness (max-width: 768px breakpoint)

### Testing Patterns
- **Unit Tests**: Test individual functions in isolation
- **DOM Setup**: Use `beforeEach()` to set up required DOM elements
- **Mocking**: Mock `console.error` and verify error logging
- **Coverage**: Maintain 90%+ function coverage, 80%+ branch coverage
- **Test Structure**: Group related tests in `describe()` blocks

### File Organization
```
js/main.js                    # Main application JavaScript
tests/unit/                   # Unit tests
tests/e2e/                    # End-to-end tests
css/                          # Stylesheets
images/                       # Image assets
fonts/                        # Font files
```

### Import/Export Patterns
- Use CommonJS `require()` for test imports
- Export functions for testing using conditional `module.exports`
- Keep main code browser-compatible (no ES modules)

```javascript
// At end of main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    functionName1,
    functionName2
  };
}
```

### Naming Conventions
- **Functions**: camelCase, descriptive verbs (e.g., `toggleFunction`, `openModal`)
- **Variables**: camelCase, descriptive nouns (e.g., `modalElement`, `scrollPosition`)
- **Constants**: UPPER_SNAKE_CASE for configuration values
- **DOM Elements**: Include element type in name (e.g., `navbarDiv`, `modalImg`)

### CSS/HTML Guidelines
- Use W3.CSS framework classes consistently
- Maintain semantic HTML structure
- Use relative paths for all assets (no leading `/`)
- Include proper alt text for images
- Use responsive design patterns (mobile-first)

### Performance Considerations
- Debounce scroll events (10ms delay recommended)
- Cache DOM queries to avoid repeated lookups
- Use event delegation for multiple similar elements
- Optimize image loading with appropriate formats

### Git Workflow
- Commit frequently with descriptive messages
- Run tests before committing (`npm run test:all`)
- Use conventional commit format: `type: description`
- Never commit secrets or sensitive data

## Project-Specific Notes

### Parallax Implementation
- Three parallax sections: hero, portfolio, contact
- Disable parallax on mobile devices (max-width: 768px)
- Use `background-attachment: fixed` for desktop parallax effect

### Modal Gallery
- Portfolio images open in modal overlay
- Include error handling for missing elements
- Support keyboard navigation (ESC to close)

### Navigation Behavior
- Navbar changes style on scroll (>100px threshold)
- Mobile menu toggle functionality
- Smooth scrolling to anchor links

### Contact Form
- Uses embedded Google Form with fallback link
- No server-side processing required
- Include proper form validation

## Testing Requirements

### Before Submitting Changes
1. Run `npm run lint` - fix all ESLint warnings/errors
2. Run `npm run test:coverage` - ensure coverage thresholds met
3. Run `npm run test:e2e` - verify cross-browser functionality
4. Test manually in mobile and desktop viewports

### Coverage Thresholds
- Functions: 90%
- Lines: 90%
- Branches: 80%
- Statements: 90%

### Browser Testing Matrix
- Chrome (Desktop & Mobile)
- Firefox (Desktop)
- Safari (Desktop & Mobile)
- Edge (Desktop)

## Deployment

### Google Cloud App Engine
```bash
gcloud app deploy
```

The site is configured for static deployment with `app.yaml` configuration.

### Production Checklist
- [ ] All tests pass
- [ ] Linting clean
- [ ] Images optimized
- [ ] Links functional
- [ ] Mobile responsive
- [ ] Accessibility compliant