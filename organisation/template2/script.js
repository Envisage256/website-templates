document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  // Newsletter Validation (Additional Enhancement)
  const newsletterForm = document.querySelector('section form');
  if (newsletterForm && newsletterForm.querySelector('button')?.textContent.includes('Mailing List')) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        alert('Successfully joined our mailing list! Check your inbox for confirmation.');
        this.reset();
      }
    });
  }

  // Sticky Header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Donation Calculator (on Donate page)
  const donationButtons = document.querySelectorAll('.donation-btn');
  const customAmountInput = document.getElementById('custom-amount');
  const totalDisplay = document.getElementById('donation-total');
  
  if (donationButtons.length > 0) {
    donationButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all
        donationButtons.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');
        // Update input if fixed amount
        const amount = this.dataset.amount;
        if (amount && customAmountInput) {
          customAmountInput.value = amount;
          updateImpactMessage(amount);
        }
      });
    });

    if (customAmountInput) {
      customAmountInput.addEventListener('input', function() {
        donationButtons.forEach(b => b.classList.remove('active'));
        updateImpactMessage(this.value);
      });
    }
  }

  function updateImpactMessage(amount) {
    const impactText = document.getElementById('impact-text');
    if (!impactText) return;

    amount = parseFloat(amount);
    if (!amount || amount <= 0) {
      impactText.textContent = "Every contribution makes a difference.";
      return;
    }

    if (amount < 50) {
      impactText.textContent = `$${amount} can provide scholastic materials for a child.`;
    } else if (amount < 100) {
      impactText.textContent = `$${amount} can support a family with basic food supplies for a month.`;
    } else if (amount < 500) {
      impactText.textContent = `$${amount} can fund a skills training workshop for women.`;
    } else {
      impactText.textContent = `$${amount} creates significant long-term community impact.`;
    }
  }

  // Simple Form Validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '#ddd';
        }
      });

      if (isValid) {
        alert('Thank you! Your submission has been received.');
        this.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .stat-item, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

  // Helper for animation visibility
  const style = document.createElement('style');
  style.innerHTML = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
