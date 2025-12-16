/**
 * Unit tests for main.js functions
 */

const { onClick, myFunction, toggleFunction, debounce } = require('../../js/main');

describe('onClick - Modal Gallery', () => {
  beforeEach(() => {
    // Set up DOM elements
    document.body.innerHTML = `
      <div id="modal01" style="display: none;">
        <img id="img01" src="">
        <p id="caption"></p>
      </div>
    `;
    console.error.mockClear();
  });

  test('should open modal with correct image and caption', () => {
    const mockElement = {
      src: 'images/test.jpg',
      alt: 'Test Image'
    };

    onClick(mockElement);

    const modal = document.getElementById('modal01');
    const modalImg = document.getElementById('img01');
    const caption = document.getElementById('caption');

    expect(modal.style.display).toBe('block');
    expect(modalImg.src).toContain('images/test.jpg');
    expect(caption.innerHTML).toBe('Test Image');
  });

  test('should handle missing alt text gracefully', () => {
    const mockElement = {
      src: 'images/test.jpg'
    };

    onClick(mockElement);

    const caption = document.getElementById('caption');
    expect(caption.innerHTML).toBe('');
  });

  test('should log error when element is null', () => {
    onClick(null);

    expect(console.error).toHaveBeenCalledWith('onClick: Invalid element provided');
    const modal = document.getElementById('modal01');
    expect(modal.style.display).toBe('none');
  });

  test('should log error when element has no src', () => {
    const mockElement = { alt: 'Test' };

    onClick(mockElement);

    expect(console.error).toHaveBeenCalledWith('onClick: Invalid element provided');
  });

  test('should log error when modal elements are missing', () => {
    document.body.innerHTML = ''; // Remove modal elements

    const mockElement = {
      src: 'images/test.jpg',
      alt: 'Test Image'
    };

    onClick(mockElement);

    expect(console.error).toHaveBeenCalledWith('onClick: Required modal elements not found');
  });
});

describe('myFunction - Navbar Scroll Behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="myNavbar" class="w3-bar w3-text-white"></div>
    `;
    console.error.mockClear();
  });

  test('should add white background when scrolled more than 100px', () => {
    // Mock scroll position
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 150
    });

    myFunction();

    const navbar = document.getElementById('myNavbar');
    expect(navbar.className).toBe('w3-bar w3-card w3-animate-top w3-white');
  });

  test('should keep transparent background when scrolled less than 100px', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 50
    });

    myFunction();

    const navbar = document.getElementById('myNavbar');
    expect(navbar.className).toBe('w3-bar w3-text-white');
  });

  test('should keep transparent background when at top (0px)', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0
    });

    myFunction();

    const navbar = document.getElementById('myNavbar');
    expect(navbar.className).toBe('w3-bar w3-text-white');
  });

  test('should handle body.scrollTop for browser compatibility', () => {
    Object.defineProperty(document.body, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 150
    });

    myFunction();

    const navbar = document.getElementById('myNavbar');
    expect(navbar.className).toBe('w3-bar w3-card w3-animate-top w3-white');
  });

  test('should log error when navbar element is missing', () => {
    document.body.innerHTML = ''; // Remove navbar

    myFunction();

    expect(console.error).toHaveBeenCalledWith('myFunction: Navbar element not found');
  });
});

describe('toggleFunction - Mobile Navigation Menu', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="navDemo" class="w3-bar-block w3-white w3-hide"></div>
    `;
    console.error.mockClear();
  });

  test('should add w3-show class when menu is hidden', () => {
    const navDemo = document.getElementById('navDemo');
    expect(navDemo.className).not.toContain('w3-show');

    toggleFunction();

    expect(navDemo.className).toContain('w3-show');
  });

  test('should remove w3-show class when menu is visible', () => {
    const navDemo = document.getElementById('navDemo');
    navDemo.className += ' w3-show';

    toggleFunction();

    expect(navDemo.className).not.toContain('w3-show');
  });

  test('should toggle menu multiple times correctly', () => {
    const navDemo = document.getElementById('navDemo');

    // First toggle - show
    toggleFunction();
    expect(navDemo.className).toContain('w3-show');

    // Second toggle - hide
    toggleFunction();
    expect(navDemo.className).not.toContain('w3-show');

    // Third toggle - show again
    toggleFunction();
    expect(navDemo.className).toContain('w3-show');
  });

  test('should log error when navDemo element is missing', () => {
    document.body.innerHTML = ''; // Remove navDemo

    toggleFunction();

    expect(console.error).toHaveBeenCalledWith('toggleFunction: Navigation demo element not found');
  });
});

describe('debounce - Utility Function', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should debounce function calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    // Call multiple times rapidly
    debouncedFn();
    debouncedFn();
    debouncedFn();

    // Function should not be called yet
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(100);

    // Function should be called once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('should reset timer on subsequent calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    jest.advanceTimersByTime(50);

    debouncedFn(); // Resets timer
    jest.advanceTimersByTime(50);

    // Should not be called yet (timer reset)
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);

    // Now it should be called
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('should pass arguments to debounced function', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1', 'arg2', 'arg3');
    jest.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });
});
