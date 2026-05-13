document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (navMenu) navMenu.classList.remove('active'); // Close mobile menu
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'btn btn-primary';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '2rem';
    backToTopButton.style.right = '2rem';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.display = 'none'; // Hidden by default
    backToTopButton.style.zIndex = '999';
    backToTopButton.style.border = 'none';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form Validation (Generic)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#E5E7EB';
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Thank you! Your message has been sent successfully.');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });

    // Testimonial Slider (Auto-play)
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        // Initially hide all except first if not using a grid
        // This is a simple implementation, for grid layouts we might want a different approach
        // but sticking to the request for vanilla JS slider features
    }

    // Donation Calculator
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const totalDisplay = document.getElementById('donation-total');

    if (amountButtons && totalDisplay) {
        amountButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                amountButtons.forEach(b => b.classList.remove('active', 'btn-primary'));
                amountButtons.forEach(b => b.classList.add('btn-outline')); // Reset to outline
                
                // Add active to clicked
                btn.classList.add('active', 'btn-primary');
                btn.classList.remove('btn-outline');
                
                // Update total
                const amount = btn.getAttribute('data-amount');
                if (customAmountInput) customAmountInput.value = '';
                totalDisplay.textContent = `$${amount}`;
            });
        });

        if (customAmountInput) {
            customAmountInput.addEventListener('input', (e) => {
                amountButtons.forEach(b => b.classList.remove('active', 'btn-primary'));
                amountButtons.forEach(b => b.classList.add('btn-outline'));
                
                const val = e.target.value;
                totalDisplay.textContent = val ? `$${val}` : '$0';
            });
        }
    }
});
