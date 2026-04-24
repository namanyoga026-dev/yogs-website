/* ============================================
   Contact Form Validation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const subject = document.getElementById('contact-subject');
    const message = document.getElementById('contact-message');
    let isValid = true;

    // Validate Name
    if (!name.value.trim()) {
      showError(name, 'error-name', 'Please enter your name');
      isValid = false;
    }

    // Validate Email
    if (!email.value.trim()) {
      showError(email, 'error-email', 'Please enter your email');
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'error-email', 'Please enter a valid email address');
      isValid = false;
    }

    // Validate Subject
    if (!subject.value.trim()) {
      showError(subject, 'error-subject', 'Please enter a subject');
      isValid = false;
    }

    // Validate Message
    if (!message.value.trim()) {
      showError(message, 'error-message', 'Please enter your message');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, 'error-message', 'Message must be at least 10 characters');
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const btn = document.getElementById('submit-btn');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
        btn.textContent = 'Send Message →';
        btn.disabled = false;
      }, 1200);
    }
  });

  // Real-time validation: remove error on input
  const inputs = form.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorEl = input.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.textContent = '';
    });
  });
}

function showError(input, errorId, message) {
  input.classList.add('error');
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));
  document.querySelectorAll('.form-error').forEach(e => e.textContent = '');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
