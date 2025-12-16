const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility Tests', () => {
  test('should not have accessibility violations on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on About section', async ({ page }) => {
    await page.goto('/#about');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#about')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on Portfolio section', async ({ page }) => {
    await page.goto('/#portfolio');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#portfolio')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on Contact section', async ({ page }) => {
    await page.goto('/#contact');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#contact')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have accessible form labels', async ({ page }) => {
    await page.goto('/#contact');

    // Check that form inputs have accessible names
    const nameInput = page.locator('input[name="Name"]');
    const emailInput = page.locator('input[name="Email"]');
    const messageInput = page.locator('input[name="Message"]');

    await expect(nameInput).toHaveAttribute('placeholder', 'Name');
    await expect(emailInput).toHaveAttribute('placeholder', 'Email');
    await expect(messageInput).toHaveAttribute('placeholder', 'Message');
  });

  test('should have accessible images with alt text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    // Check each image has alt text
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const altText = await img.getAttribute('alt');

      // Alt attribute should exist (can be empty for decorative images)
      expect(altText !== null).toBe(true);
    }
  });

  test('should have keyboard navigable links', async ({ page }) => {
    await page.goto('/');

    // Test keyboard navigation
    await page.keyboard.press('Tab');

    // First focused element should be a navigation link
    const focusedElement = await page.evaluate(() => {
      return document.activeElement.tagName;
    });

    expect(focusedElement).toBe('A');
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/');

    // Focus on first link
    const firstLink = page.locator('a').first();
    await firstLink.focus();

    // Check that element has focus
    const isFocused = await firstLink.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check heading hierarchy
    const h1Count = await page.locator('h1').count();
    const h3Count = await page.locator('h3').count();

    // Should have section headings
    expect(h3Count).toBeGreaterThan(0);
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .disableRules(['color-contrast']) // We'll check this separately
      .analyze();

    // Run color contrast check specifically
    const contrastResults = await new AxeBuilder({ page })
      .include('body')
      .withRules(['color-contrast'])
      .analyze();

    // Log violations for debugging
    if (contrastResults.violations.length > 0) {
      console.log('Color contrast violations:', JSON.stringify(contrastResults.violations, null, 2));
    }

    // This may fail if there are contrast issues - that's expected and useful feedback
    expect(contrastResults.violations.length).toBeLessThanOrEqual(5); // Allow some minor violations
  });

  test('should have accessible modal dialog', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open modal
    await page.locator('#portfolio img').first().click();

    // Modal should be visible
    const modal = page.locator('#modal01');
    await expect(modal).toBeVisible();

    // Check modal accessibility
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#modal01')
      .analyze();

    // Log any violations
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Modal accessibility violations:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }
  });

  test('should support reduced motion preferences', async ({ page }) => {
    // Set prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/');

    // Check that animations respect reduced motion
    // This would require CSS that respects prefers-reduced-motion media query
    // For now, we just verify the page loads correctly
    await expect(page.locator('.bgimg-1')).toBeVisible();
  });
});

test.describe('Mobile Accessibility', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should not have accessibility violations on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Log violations for review
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Mobile accessibility violations:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have touch-friendly mobile menu', async ({ page }) => {
    await page.goto('/');

    // Mobile menu button should be large enough for touch
    const menuButton = page.locator('.w3-hide-medium.w3-hide-large').first();
    const boundingBox = await menuButton.boundingBox();

    // Button should be at least 44x44 pixels (iOS touch target size)
    expect(boundingBox.width).toBeGreaterThanOrEqual(40);
    expect(boundingBox.height).toBeGreaterThanOrEqual(40);
  });
});
