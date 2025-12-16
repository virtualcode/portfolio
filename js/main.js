/**
 * Modal Image Gallery
 * Opens a modal with the clicked image
 * @param {HTMLElement} element - The image element that was clicked
 */
function onClick(element) {
  if (!element || !element.src) {
    console.error('onClick: Invalid element provided');
    return;
  }

  const modal = document.getElementById("modal01");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");

  if (!modal || !modalImg || !captionText) {
    console.error('onClick: Required modal elements not found');
    return;
  }

  modalImg.src = element.src;
  modal.style.display = "block";
  captionText.innerHTML = element.alt || '';
}

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Change style of navbar on scroll
 * Adds white background when scrolled down, transparent when at top
 */
function myFunction() {
  const navbar = document.getElementById("myNavbar");

  if (!navbar) {
    console.error('myFunction: Navbar element not found');
    return;
  }

  const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

  if (scrollPosition > 100) {
    navbar.className = "w3-bar w3-card w3-animate-top w3-white";
  } else {
    navbar.className = "w3-bar w3-text-white";
  }
}

/**
 * Toggle the mobile navigation menu
 * Shows/hides the menu on small screens
 */
function toggleFunction() {
  const navDemo = document.getElementById("navDemo");

  if (!navDemo) {
    console.error('toggleFunction: Navigation demo element not found');
    return;
  }

  if (navDemo.className.indexOf("w3-show") === -1) {
    navDemo.className += " w3-show";
  } else {
    navDemo.className = navDemo.className.replace(" w3-show", "");
  }
}

// Initialize scroll listener with debouncing
if (typeof window !== 'undefined') {
  window.onscroll = debounce(myFunction, 10);
}

// Export functions for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    onClick,
    myFunction,
    toggleFunction,
    debounce
  };
}
