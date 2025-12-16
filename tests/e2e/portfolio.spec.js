const { test, expect } = require('@playwright/test');

test.describe('Portfolio Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/W3.CSS Template/);
  });

  test('should display hero section with logo', async ({ page }) => {
    const heroText = page.locator('.bgimg-1 .w3-display-middle span');
    await expect(heroText).toBeVisible();

    // Desktop view should show "CAPTURED HORIZONS"
    const desktopLogo = heroText.locator('.w3-hide-small');
    await expect(desktopLogo).toContainText('CAPTURED HORIZONS');
  });

  test('should have functional navigation links', async ({ page }) => {
    // Test About link
    await page.click('a[href="#about"]');
    await expect(page).toHaveURL(/#about$/);

    // Test Portfolio link
    await page.click('a[href="#portfolio"]');
    await expect(page).toHaveURL(/#portfolio$/);

    // Test Contact link
    await page.click('a[href="#contact"]');
    await expect(page).toHaveURL(/#contact$/);

    // Test Home link
    await page.click('a[href="#home"]');
    await expect(page).toHaveURL(/#home$/);
  });
});

test.describe('Modal Gallery Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open modal when clicking portfolio image', async ({ page }) => {
    // Wait for images to load
    await page.waitForLoadState('networkidle');

    // Click first portfolio image
    const firstImage = page.locator('#portfolio img').first();
    await firstImage.click();

    // Modal should be visible
    const modal = page.locator('#modal01');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveCSS('display', 'block');

    // Modal image should be displayed
    const modalImg = page.locator('#img01');
    await expect(modalImg).toBeVisible();

    // Caption should be displayed
    const caption = page.locator('#caption');
    await expect(caption).toBeVisible();
  });

  test('should display correct image and caption in modal', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Click sailboat image
    const sailboatImg = page.locator('img[alt="Sailboat on calm waters"]');
    const imgSrc = await sailboatImg.getAttribute('src');
    const imgAlt = await sailboatImg.getAttribute('alt');

    await sailboatImg.click();

    // Verify modal displays correct image
    const modalImg = page.locator('#img01');
    await expect(modalImg).toHaveAttribute('src', imgSrc);

    // Verify caption
    const caption = page.locator('#caption');
    await expect(caption).toHaveText(imgAlt);
  });

  test('should close modal when clicking outside', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Open modal
    await page.locator('#portfolio img').first().click();
    const modal = page.locator('#modal01');
    await expect(modal).toBeVisible();

    // Click on modal background to close
    await modal.click();

    // Modal should be hidden
    await expect(modal).toHaveCSS('display', 'none');
  });
});

test.describe('Navbar Scroll Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should change navbar style on scroll', async ({ page }) => {
    const navbar = page.locator('#myNavbar');

    // At top, navbar should have transparent style
    const initialClass = await navbar.getAttribute('class');
    expect(initialClass).toContain('w3-text-white');

    // Scroll down more than 100px
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(100); // Wait for scroll event

    // Navbar should have white background
    const scrolledClass = await navbar.getAttribute('class');
    expect(scrolledClass).toContain('w3-white');
    expect(scrolledClass).toContain('w3-card');

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    // Navbar should be transparent again
    const backToTopClass = await navbar.getAttribute('class');
    expect(backToTopClass).toContain('w3-text-white');
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // Mobile viewport

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display mobile menu button', async ({ page }) => {
    const menuButton = page.locator('.w3-hide-medium.w3-hide-large .fa-bars');
    await expect(menuButton).toBeVisible();
  });

  test('should toggle mobile menu on button click', async ({ page }) => {
    const menuButton = page.locator('.w3-hide-medium.w3-hide-large');
    const mobileNav = page.locator('#navDemo');

    // Initially hidden
    const initialClass = await mobileNav.getAttribute('class');
    expect(initialClass).toContain('w3-hide');

    // Click to show
    await menuButton.click();
    await page.waitForTimeout(100);

    const shownClass = await mobileNav.getAttribute('class');
    expect(shownClass).toContain('w3-show');

    // Click to hide again
    await menuButton.click();
    await page.waitForTimeout(100);

    const hiddenClass = await mobileNav.getAttribute('class');
    expect(hiddenClass).not.toContain('w3-show');
  });

  test('should hide mobile menu when clicking nav link', async ({ page }) => {
    const menuButton = page.locator('.w3-hide-medium.w3-hide-large');
    const mobileNav = page.locator('#navDemo');

    // Open menu
    await menuButton.click();
    await expect(mobileNav).toHaveClass(/w3-show/);

    // Click About link
    await mobileNav.locator('a[href="#about"]').click();

    // Menu should close
    await page.waitForTimeout(100);
    const finalClass = await mobileNav.getAttribute('class');
    expect(finalClass).not.toContain('w3-show');
  });

  test('should display mobile logo text', async ({ page }) => {
    const mobileLogo = page.locator('.bgimg-1 .w3-hide-medium.w3-hide-large');
    await expect(mobileLogo).toBeVisible();
    await expect(mobileLogo).toHaveText('IMAGINE');
  });
});

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
  });

  test('should display embedded Google Form iframe', async ({ page }) => {
    const iframe = page.locator('iframe[title="Contact Form"]');

    // Iframe should be visible
    await expect(iframe).toBeVisible();

    // Should have correct source (Google Forms embed URL)
    await expect(iframe).toHaveAttribute('src', /docs\.google\.com\/forms/);

    // Should have proper dimensions
    await expect(iframe).toHaveAttribute('width', '100%');
    await expect(iframe).toHaveAttribute('height', '650');
  });

  test('should display fallback link to open form in new tab', async ({ page }) => {
    const fallbackLink = page.locator('a[href="https://forms.gle/AFkAkUEYD6VirSJB7"]');

    // Link should be visible
    await expect(fallbackLink).toBeVisible();

    // Should link to Google Form
    await expect(fallbackLink).toHaveAttribute('href', 'https://forms.gle/AFkAkUEYD6VirSJB7');

    // Should open in new tab
    await expect(fallbackLink).toHaveAttribute('target', '_blank');

    // Should have security attributes
    await expect(fallbackLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have accessible iframe with title attribute', async ({ page }) => {
    const iframe = page.locator('iframe[title="Contact Form"]');

    // Should have title for accessibility
    await expect(iframe).toHaveAttribute('title', 'Contact Form');
  });
});

test.describe('Content Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display About section content', async ({ page }) => {
    await page.goto('/#about');

    await expect(page.locator('#about h3')).toHaveText('ABOUT ME');
    await expect(page.locator('#about')).toContainText('Michael Perry');
    await expect(page.locator('#about')).toContainText('Captured Horizons');
  });

  test('should display Portfolio section with images', async ({ page }) => {
    await page.goto('/#portfolio');

    await expect(page.locator('#portfolio h3')).toHaveText('MY WORK');

    // Check that portfolio images are present
    const portfolioImages = page.locator('#portfolio img');
    const count = await portfolioImages.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have functional "LOAD MORE" button linking to Pictorem gallery', async ({ page }) => {
    await page.goto('/#portfolio');

    const loadMoreButton = page.locator('a:has-text("LOAD MORE")');

    // Button should be visible
    await expect(loadMoreButton).toBeVisible();

    // Should have correct href
    await expect(loadMoreButton).toHaveAttribute('href', 'https://www.pictorem.com/gallery/MPerry');

    // Should open in new tab
    await expect(loadMoreButton).toHaveAttribute('target', '_blank');

    // Should have security attributes
    await expect(loadMoreButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should display Contact section', async ({ page }) => {
    await page.goto('/#contact');

    await expect(page.locator('#contact h3')).toHaveText('WHERE I WORK');
    await expect(page.locator('#contact')).toContainText('Lower Chesapeake Bay, Virginia');
  });
});

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display footer with "To the top" button', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const toTopButton = page.locator('footer a[href="#home"]');
    await expect(toTopButton).toBeVisible();
    await expect(toTopButton).toContainText('To the top');
  });

  test('should scroll to top when clicking "To the top" button', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Click "To the top"
    await page.locator('footer a[href="#home"]').click();

    // Wait for scroll
    await page.waitForTimeout(500);

    // Should be at or near top
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeLessThan(100);
  });
});
