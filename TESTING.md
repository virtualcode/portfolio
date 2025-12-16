# Testing Documentation

Comprehensive testing suite for Captured Horizons portfolio website.

## Table of Contents

- [Overview](#overview)
- [Test Coverage](#test-coverage)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Continuous Integration](#continuous-integration)
- [Writing New Tests](#writing-new-tests)

## Overview

This project uses a comprehensive testing strategy including:

- **Unit Tests**: Jest for testing JavaScript functions
- **E2E Tests**: Playwright for end-to-end testing across browsers
- **Accessibility Tests**: axe-core for WCAG 2.1 AA compliance
- **Linting**: ESLint for code quality

## Test Coverage

### Current Coverage Areas

#### Unit Tests (`tests/unit/`)
- ✅ `onClick()` - Modal gallery functionality
- ✅ `myFunction()` - Navbar scroll behavior
- ✅ `toggleFunction()` - Mobile menu toggle
- ✅ `debounce()` - Utility function for performance

**Coverage Goals**: 90%+ for functions, lines, and statements

#### E2E Tests (`tests/e2e/portfolio.spec.js`)
- ✅ Homepage loading and hero section
- ✅ Navigation links (Home, About, Portfolio, Contact)
- ✅ Modal gallery (open, display, close)
- ✅ Navbar scroll behavior
- ✅ Mobile navigation menu
- ✅ Contact form fields and validation
- ✅ Content sections visibility
- ✅ Footer and "To the top" button
- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Mobile responsive testing (iOS, Android)

#### Accessibility Tests (`tests/e2e/accessibility.spec.js`)
- ✅ WCAG 2.1 AA compliance
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Image alt text
- ✅ Form labels and accessibility
- ✅ Color contrast ratios
- ✅ Heading hierarchy
- ✅ Modal dialog accessibility
- ✅ Touch target sizes (mobile)
- ✅ Reduced motion support

## Running Tests

### Prerequisites

Install dependencies:
```bash
npm install
```

Install Playwright browsers (first time only):
```bash
npx playwright install
```

### Unit Tests

Run all unit tests:
```bash
npm test
```

Run with coverage report:
```bash
npm run test:coverage
```

Watch mode for development:
```bash
npm run test:watch
```

### E2E Tests

Run all E2E tests:
```bash
npm run test:e2e
```

Run in headed mode (see browser):
```bash
npm run test:e2e:headed
```

Run with UI mode (interactive):
```bash
npm run test:e2e:ui
```

Run specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run specific test file:
```bash
npx playwright test accessibility.spec.js
```

### All Tests

Run all tests (unit + E2E):
```bash
npm run test:all
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Test Structure

```
portfolio/
├── js/
│   └── main.js                 # Main JavaScript functions (testable)
├── tests/
│   ├── setup.js                # Jest setup
│   ├── unit/
│   │   └── main.test.js        # Unit tests for JS functions
│   └── e2e/
│       ├── portfolio.spec.js   # E2E tests for user flows
│       └── accessibility.spec.js # Accessibility tests
├── jest.config.js              # Jest configuration
├── playwright.config.js        # Playwright configuration
├── .eslintrc.js               # ESLint configuration
└── package.json               # Dependencies and scripts
```

## Continuous Integration

Tests run automatically on:
- Every push to `main`, `develop`, or `claude/**` branches
- Every pull request to `main` or `develop`

### CI Pipeline

1. **Unit Tests**: Jest runs on Node.js 18
2. **E2E Tests**: Playwright runs on Chromium, Firefox, and WebKit
3. **Accessibility Tests**: axe-core scans all pages
4. **Linting**: ESLint checks code quality

View CI status in GitHub Actions tab.

### Coverage Reports

Coverage reports are uploaded to Codecov after each CI run:
- Overall coverage percentage
- Line-by-line coverage
- Coverage trends over time

## Writing New Tests

### Unit Tests

Create test files in `tests/unit/` with `.test.js` extension:

```javascript
const { functionName } = require('../../js/main');

describe('Function Name', () => {
  beforeEach(() => {
    // Setup DOM or mocks
  });

  test('should do something', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

### E2E Tests

Create test files in `tests/e2e/` with `.spec.js` extension:

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform action', async ({ page }) => {
    // Arrange
    const element = page.locator('#element-id');

    // Act
    await element.click();

    // Assert
    await expect(element).toHaveClass('active');
  });
});
```

### Accessibility Tests

Add accessibility checks to E2E tests:

```javascript
const AxeBuilder = require('@axe-core/playwright').default;

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

## Test Best Practices

1. **Isolation**: Each test should be independent
2. **Clarity**: Use descriptive test names
3. **Arrange-Act-Assert**: Follow the AAA pattern
4. **Error Handling**: Test both success and failure cases
5. **Performance**: Use `beforeEach` for common setup
6. **Accessibility**: Always test with keyboard and screen readers
7. **Mobile**: Test responsive behavior on mobile viewports

## Debugging Tests

### Unit Tests
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### E2E Tests
```bash
# Debug mode (pauses on failure)
npx playwright test --debug

# Run with browser visible
npx playwright test --headed

# Interactive UI mode
npx playwright test --ui
```

## Coverage Thresholds

Current thresholds (enforced in CI):
- **Branches**: 80%
- **Functions**: 90%
- **Lines**: 90%
- **Statements**: 90%

## Known Issues and Future Improvements

### Current Limitations
- Contact form submission not tested (backend not implemented)
- Parallax scrolling performance not measured
- Visual regression tests not yet implemented
- No performance budgets enforced

### Future Enhancements
1. Add visual regression testing (Percy, Chromatic)
2. Add performance testing (Lighthouse CI)
3. Add load testing for production
4. Add screenshot comparison tests
5. Add API mocking for form submission
6. Add mobile device testing (BrowserStack)

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For issues or questions about testing:
1. Check test output for detailed error messages
2. Review this documentation
3. Check CI logs in GitHub Actions
4. Create an issue with test failure details
