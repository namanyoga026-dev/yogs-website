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
      showError(name, 'error-name', 'कृपया अपना नाम लिखें');
      isValid = false;
    }

    // Validate Email
    if (!email.value.trim()) {
      showError(email, 'error-email', 'कृपया अपना ईमेल लिखें');
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'error-email', 'कृपया सही ईमेल पता लिखें');
      isValid = false;
    }

    // Validate Subject
    if (!subject.value.trim()) {
      showError(subject, 'error-subject', 'कृपया विषय लिखें');
      isValid = false;
    }

    // Validate Message
    if (!message.value.trim()) {
      showError(message, 'error-message', 'कृपया अपना संदेश लिखें');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, 'error-message', 'संदेश कम से कम 10 अक्षरों का होना चाहिए');
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const btn = document.getElementById('submit-btn');
      btn.textContent = 'भेजा जा रहा है...';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
        btn.textContent = 'संदेश भेजें →';
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
