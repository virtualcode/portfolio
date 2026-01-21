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

/**
 * Contact Form Configuration
 * Replace YOUR_CLOUD_FUNCTION_URL with your deployed Cloud Function URL
 */
const CONTACT_FORM_URL = 'https://us-east1-horizon-capture.cloudfunctions.net/save-contact';

/**
 * Handle contact form submission
 * Sends form data to Google Cloud Function and stores in Firestore
 */
function submitContactForm(event) {
  event.preventDefault();

  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  const statusDiv = document.getElementById('contact-status');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  if (!form || !submitBtn || !statusDiv || !nameInput || !emailInput) {
    console.error('submitContactForm: Required form elements not found');
    return;
  }

  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin w3-margin-right"></i>SENDING...';

  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput ? messageInput.value.trim() : ''
  };

  fetch(CONTACT_FORM_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        statusDiv.className = 'w3-section w3-panel w3-pale-green w3-border-green w3-border';
        statusDiv.innerHTML = '<i class="fa fa-check w3-margin-right"></i>' + data.message;
        form.reset();
      } else {
        statusDiv.className = 'w3-section w3-panel w3-pale-red w3-border-red w3-border';
        statusDiv.innerHTML = '<i class="fa fa-exclamation-triangle w3-margin-right"></i>' + (data.error || 'An error occurred.');
      }
      statusDiv.style.display = 'block';
    })
    .catch(error => {
      console.error('Contact form error:', error);
      statusDiv.className = 'w3-section w3-panel w3-pale-red w3-border-red w3-border';
      statusDiv.innerHTML = '<i class="fa fa-exclamation-triangle w3-margin-right"></i>Unable to send message. Please try again.';
      statusDiv.style.display = 'block';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa fa-paper-plane w3-margin-right"></i>SEND MESSAGE';
    });
}

// Initialize contact form listener
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', submitContactForm);
    }
  });
}

// Export functions for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    onClick,
    myFunction,
    toggleFunction,
    debounce,
    submitContactForm
  };
}
